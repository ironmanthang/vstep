import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { SpeakingTest } from '../../types/schemas';
import type {
  SpeakingMode,
  SpeakingEvaluationResult as ISpeakingEvaluationResult,
  PartEvaluation,
} from './types';
import {
  saveAudioBlob,
  loadSpeakingSession,
  saveSpeakingSession,
} from './speakingStorage';
import {
  AudioRecordingSession,
  playStartRecordingBeep,
  playStopRecordingBeep,
} from './services/speakingAudio';
import { evaluateSpeakingPart } from './services/speakingTier2';
import { calculateSpeakingCompositeScore } from './services/speakingTier3';
import { getSpeakingPartPromptData } from './services/speakingPromptHelper';
import { useSpeakingAudioStorage } from './useSpeakingAudioStorage';
import { SpeakingEvaluationResult } from './components/SpeakingEvaluationResult';
import { SpeakingPromptViewer } from './components/SpeakingPromptViewer';
import { SpeakingWaveform } from './components/SpeakingWaveform';
import { SpeakingControls } from './components/SpeakingControls';
import { SpeakingHeader } from './components/SpeakingHeader';
import { SpeakingPartTabs } from './components/SpeakingPartTabs';
import { SpeakingFooter } from './components/SpeakingFooter';
import { useAuth } from '../../services/supabase/authStore';
import { useUserStore } from '../../services/user/userStore';
import { upsertTestSubmission } from '../../services/supabase/testSubmissionSync';
import './SpeakingRunner.css';

interface SpeakingRunnerProps {
  test: SpeakingTest;
  mode?: SpeakingMode;
  userId?: string;
  onComplete?: (result: ISpeakingEvaluationResult) => void;
  onExit?: () => void;
}

export const SpeakingRunner: React.FC<SpeakingRunnerProps> = ({
  test,
  mode = 'practice',
  userId: propUserId,
  onComplete,
  onExit,
}) => {
  const { user } = useAuth();
  const userId = propUserId || user?.id;
  const { recordStudyActivity, incrementExercisesCompleted } = useUserStore();

  const [activePart, setActivePart] = useState<1 | 2 | 3>(() => {
    const saved = loadSpeakingSession(test.id, mode, userId);
    return saved?.activePart || 1;
  });

  const [recordingState, setRecordingState] = useState<'idle' | 'recording' | 'recorded'>('idle');
  const [isPreparing, setIsPreparing] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(() => (mode === 'exam' ? 180 : 0));
  const [isScaffoldOpen, setIsScaffoldOpen] = useState(false);

  const handleRecordedFound = useCallback(() => {
    setRecordingState('recorded');
  }, []);

  const {
    audioBlobs,
    setAudioBlobs,
    audioUrls,
    setAudioUrls,
    clientMetrics,
    setClientMetrics,
  } = useSpeakingAudioStorage(test.id, activePart, handleRecordedFound);

  const [partEvaluations, setPartEvaluations] = useState<Record<number, PartEvaluation>>({});
  const [evaluationResult, setEvaluationResult] = useState<ISpeakingEvaluationResult | null>(() => {
    return loadSpeakingSession(test.id, mode, userId)?.evaluationResult || null;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);

  const sessionRef = useRef<AudioRecordingSession | null>(null);
  const [currentSession, setCurrentSession] = useState<AudioRecordingSession | null>(null);

  const handleFinalizeSpeaking = useCallback(
    (fullResult: ISpeakingEvaluationResult, isExamSubmit: boolean) => {
      setEvaluationResult(fullResult);
      setIsResultOpen(true);

      const completedParts = [1, 2, 3].filter((p) => !!fullResult[`part${p as 1 | 2 | 3}`]);

      saveSpeakingSession(
        test.id,
        mode,
        {
          activePart,
          completedParts,
          secondsRemaining,
          isSubmitted: isExamSubmit,
          evaluationResult: fullResult,
          audioDurations: {},
        },
        userId
      );

      recordStudyActivity();
      incrementExercisesCompleted(1);

      if (userId) {
        upsertTestSubmission({
          user_id: userId,
          test_id: test.id,
          skill: 'speaking',
          mode,
          score: fullResult.compositeScore.roundedScore,
          correct_count: fullResult.compositeScore.isB1Passed ? 1 : 0,
          total_questions: 3,
          time_spent_seconds: mode === 'exam' ? Math.max(0, 720 - secondsRemaining) : 720,
          answers: {
            part1: fullResult.part1?.transcript || '',
            part2: fullResult.part2?.transcript || '',
            part3: fullResult.part3?.transcript || '',
          },
          notes: {},
          flagged_questions: [],
          completed_at: new Date(fullResult.evaluatedAt).toISOString(),
        }).catch((err) => {
          console.warn('Failed to sync speaking submission to cloud:', err);
        });
      }

      if (onComplete) onComplete(fullResult);
    },
    [test.id, mode, activePart, secondsRemaining, userId, recordStudyActivity, incrementExercisesCompleted, onComplete]
  );

  // Submit all parts (Exam Mode)
  const handleExamSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const partsToEval: Array<1 | 2 | 3> = [1, 2, 3];
      const evals: Record<number, PartEvaluation> = {};

      for (const p of partsToEval) {
        const blob = audioBlobs[p];
        if (blob) {
          const metrics = clientMetrics[p] || {
            durationSeconds: 120,
            speakingDurationSeconds: 100,
            silenceDurationSeconds: 20,
            longPausesCount: 2,
          };

          const { partTitle, promptDescription, sampleResponse } = getSpeakingPartPromptData(test, p);

          evals[p] = await evaluateSpeakingPart({
            partIndex: p,
            partTitle,
            promptDescription,
            audioBlob: blob,
            clientMetrics: metrics,
            sampleResponse,
          });
        }
      }

      const partScores = Object.values(evals).map((e) => e.partScore);
      const compositeScore = calculateSpeakingCompositeScore(partScores);

      const fullResult: ISpeakingEvaluationResult = {
        part1: evals[1],
        part2: evals[2],
        part3: evals[3],
        compositeScore,
        evaluatedAt: Date.now(),
      };

      handleFinalizeSpeaking(fullResult, true);
    } catch (err) {
      console.error('Exam evaluation error:', err);
    } finally {
      setIsSubmitting(false);
    }
  }, [audioBlobs, clientMetrics, test, handleFinalizeSpeaking]);

  // Stop current recording
  const handleStopRecording = useCallback(async () => {
    if (!sessionRef.current) return;

    playStopRecordingBeep();
    const { blob, metrics } = await sessionRef.current.stop();
    sessionRef.current = null;
    setCurrentSession(null);

    setAudioBlobs((prev) => ({ ...prev, [activePart]: blob }));
    setClientMetrics((prev) => ({ ...prev, [activePart]: metrics }));
    const objectUrl = URL.createObjectURL(blob);
    setAudioUrls((prev) => ({ ...prev, [activePart]: objectUrl }));
    setRecordingState('recorded');

    // Save directly to IndexedDB
    await saveAudioBlob(test.id, activePart, blob);
  }, [activePart, test.id, setAudioBlobs, setClientMetrics, setAudioUrls]);

  // Time Expiration Handler in Exam Mode
  const handleTimeExpired = useCallback(async () => {
    if (mode === 'exam') {
      if (isPreparing) {
        setIsPreparing(false);
        playStartRecordingBeep();
        const session = new AudioRecordingSession();
        await session.start();
        sessionRef.current = session;
        setCurrentSession(session);
        setRecordingState('recording');
        setSecondsRemaining(180);
      } else if (recordingState === 'recording') {
        await handleStopRecording();
        if (activePart < 3) {
          const nextPart = (activePart + 1) as 1 | 2 | 3;
          setActivePart(nextPart);
          setIsPreparing(true);
          setSecondsRemaining(60);
          setRecordingState('idle');
        } else {
          await handleExamSubmit();
        }
      }
    } else if (recordingState === 'recording') {
      await handleStopRecording();
    }
  }, [mode, isPreparing, recordingState, activePart, handleStopRecording, handleExamSubmit]);

  // Timer Tick Hook for Exam Mode & Recording
  useEffect(() => {
    if (mode === 'practice' && recordingState !== 'recording') return;
    if (secondsRemaining <= 0) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [mode, recordingState, secondsRemaining, handleTimeExpired]);

  // Start Recording Handler
  const handleStartRecording = async () => {
    try {
      playStartRecordingBeep();
      const session = new AudioRecordingSession();
      await session.start();
      sessionRef.current = session;
      setCurrentSession(session);
      setRecordingState('recording');
      setSecondsRemaining(mode === 'exam' ? 180 : 0);
    } catch (err) {
      alert('Không thể kích hoạt micro. Vui lòng cấp quyền truy cập micro trong trình duyệt.');
      console.error(err);
    }
  };

  // Re-record current part (Practice Mode)
  const handleReRecord = () => {
    setRecordingState('idle');
  };

  // Evaluate single part on demand (Practice Mode)
  const handleEvaluateCurrentPart = async () => {
    const currentBlob = audioBlobs[activePart];
    if (!currentBlob || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const metrics = clientMetrics[activePart] || {
        durationSeconds: 60,
        speakingDurationSeconds: 50,
        silenceDurationSeconds: 10,
        longPausesCount: 1,
      };

      const { partTitle, promptDescription, sampleResponse } = getSpeakingPartPromptData(test, activePart);

      const evalResult = await evaluateSpeakingPart({
        partIndex: activePart,
        partTitle,
        promptDescription,
        audioBlob: currentBlob,
        clientMetrics: metrics,
        sampleResponse,
      });

      const updatedEvals = { ...partEvaluations, [activePart]: evalResult };
      setPartEvaluations(updatedEvals);

      const partScores = Object.values(updatedEvals).map((e) => e.partScore);
      const compositeScore = calculateSpeakingCompositeScore(partScores);

      const fullResult: ISpeakingEvaluationResult = {
        part1: updatedEvals[1],
        part2: updatedEvals[2],
        part3: updatedEvals[3],
        compositeScore,
        evaluatedAt: Date.now(),
      };

      handleFinalizeSpeaking(fullResult, false);
    } catch (err) {
      alert('Đã xảy ra lỗi khi chấm bài thi nói. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="speaking-runner">
      <SpeakingHeader
        title={test.title}
        mode={mode}
        isPreparing={isPreparing}
        secondsRemaining={secondsRemaining}
        evaluationResult={evaluationResult}
        onOpenResult={() => setIsResultOpen(true)}
        onExit={onExit}
      />

      {/* Main Workspace */}
      <div className="speaking-workspace-grid">
        {/* Left: Prompt & Scaffolds */}
        <div className="speaking-prompt-pane">
          {mode === 'practice' && (
            <SpeakingPartTabs
              activePart={activePart}
              onSelectPart={(part) => {
                setActivePart(part);
                setRecordingState(audioBlobs[part] ? 'recorded' : 'idle');
              }}
            />
          )}

          <SpeakingPromptViewer
            test={test}
            activePart={activePart}
            mode={mode}
            isScaffoldOpen={isScaffoldOpen}
            onToggleScaffold={() => setIsScaffoldOpen(!isScaffoldOpen)}
          />
        </div>

        {/* Right: Studio Controls & Canvas Waveform */}
        <div className="speaking-studio-pane">
          <SpeakingWaveform session={currentSession} recordingState={recordingState} />

          <SpeakingControls
            mode={mode}
            activePart={activePart}
            recordingState={recordingState}
            audioUrl={audioUrls[activePart]}
            isSubmitting={isSubmitting}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
            onReRecord={handleReRecord}
            onEvaluateCurrentPart={handleEvaluateCurrentPart}
          />
        </div>
      </div>

      <SpeakingFooter />

      {/* Evaluation Result Modal */}
      {evaluationResult && (
        <SpeakingEvaluationResult
          isOpen={isResultOpen}
          onClose={() => setIsResultOpen(false)}
          result={evaluationResult}
          audioUrls={audioUrls}
        />
      )}
    </div>
  );
};
