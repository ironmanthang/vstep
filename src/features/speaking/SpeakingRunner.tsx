import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { SpeakingTest } from '../../types/schemas';
import type {
  SpeakingMode,
  SpeakingEvaluationResult as ISpeakingEvaluationResult,
  PartEvaluation,
} from './types';
import {
  saveAudioBlob,
  getAllAudioBlobs,
  loadSpeakingSession,
  saveSpeakingSession,
} from './speakingStorage';
import {
  AudioRecordingSession,
  playStartRecordingBeep,
  playStopRecordingBeep,
  type ClientAudioMetrics,
} from './services/speakingAudio';
import { evaluateSpeakingPart } from './services/speakingTier2';
import { calculateSpeakingCompositeScore } from './services/speakingTier3';
import { SpeakingEvaluationResult } from './components/SpeakingEvaluationResult';
import { SpeakingPromptViewer } from './components/SpeakingPromptViewer';
import { SpeakingWaveform } from './components/SpeakingWaveform';
import { SpeakingControls } from './components/SpeakingControls';
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
  const [audioBlobs, setAudioBlobs] = useState<Record<number, Blob>>({});
  const [audioUrls, setAudioUrls] = useState<Record<number, string>>({});
  const [clientMetrics, setClientMetrics] = useState<Record<number, ClientAudioMetrics>>({});
  const [isScaffoldOpen, setIsScaffoldOpen] = useState(false);

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

  // Load existing audio blobs from IndexedDB on mount
  useEffect(() => {
    let isMounted = true;
    getAllAudioBlobs(test.id).then((blobs) => {
      if (!isMounted) return;
      setAudioBlobs(blobs);
      const urls: Record<number, string> = {};
      for (const [part, b] of Object.entries(blobs)) {
        urls[Number(part)] = URL.createObjectURL(b);
      }
      setAudioUrls(urls);
      if (blobs[activePart]) {
        setRecordingState('recorded');
      }
    });

    return () => {
      isMounted = false;
    };
  }, [test.id, activePart]);

  // Cleanup Object URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(audioUrls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [audioUrls]);

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

          const pDesc =
            p === 1
              ? `Topics:\n${test.part1.topics.map((t) => `${t.topic_name}: ${t.questions.join('; ')}`).join('\n')}`
              : p === 2
              ? `Situation: ${test.part2.situation}\nOptions:\n${test.part2.options.map((o) => `${o.title}: ${o.description}`).join('\n')}`
              : `Topic: ${test.part3.topic}\nMindmap: ${test.part3.mindmap_ideas.join(', ')}`;

          const sResp = p === 1 ? test.part1.sample_response : p === 2 ? test.part2.sample_response : test.part3.sample_response;

          evals[p] = await evaluateSpeakingPart({
            partIndex: p,
            partTitle: p === 1 ? 'Social Interaction' : p === 2 ? 'Solution Discussion' : 'Topic Development',
            promptDescription: pDesc,
            audioBlob: blob,
            clientMetrics: metrics,
            sampleResponse: sResp,
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
  }, [activePart, test.id]);

  // Time Expiration Handler in Exam Mode
  const handleTimeExpired = useCallback(async () => {
    if (mode === 'exam') {
      if (isPreparing) {
        // Transition from Preparation to Speaking
        setIsPreparing(false);
        playStartRecordingBeep();
        const session = new AudioRecordingSession();
        await session.start();
        sessionRef.current = session;
        setCurrentSession(session);
        setRecordingState('recording');
        setSecondsRemaining(180); // 3 minutes speaking
      } else if (recordingState === 'recording') {
        // Speaking time ended
        await handleStopRecording();
        if (activePart < 3) {
          // Advance to next part
          const nextPart = (activePart + 1) as 1 | 2 | 3;
          setActivePart(nextPart);
          setIsPreparing(true);
          setSecondsRemaining(60); // 1 min prep
          setRecordingState('idle');
        } else {
          // End of Part 3: Auto-submit whole exam
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

      let promptDesc = '';
      let sampleResp = undefined;

      if (activePart === 1) {
        promptDesc = `Topics:\n${test.part1.topics.map((t) => `${t.topic_name}: ${t.questions.join('; ')}`).join('\n')}`;
        sampleResp = test.part1.sample_response;
      } else if (activePart === 2) {
        promptDesc = `Situation: ${test.part2.situation}\nOptions:\n${test.part2.options.map((o) => `${o.title}: ${o.description}`).join('\n')}`;
        sampleResp = test.part2.sample_response;
      } else {
        promptDesc = `Topic: ${test.part3.topic}\nMindmap Ideas: ${test.part3.mindmap_ideas.join(', ')}\nFollow-ups: ${test.part3.follow_up_questions.join('; ')}`;
        sampleResp = test.part3.sample_response;
      }

      const evalResult = await evaluateSpeakingPart({
        partIndex: activePart,
        partTitle: activePart === 1 ? 'Social Interaction' : activePart === 2 ? 'Solution Discussion' : 'Topic Development',
        promptDescription: promptDesc,
        audioBlob: currentBlob,
        clientMetrics: metrics,
        sampleResponse: sampleResp,
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

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="speaking-runner">
      {/* Header */}
      <div className="speaking-runner-header">
        <div className="speaking-header-title-box">
          <h1>{test.title}</h1>
          <div className="speaking-header-subtitle">
            {mode === 'exam' ? 'Phòng thi máy tính chuẩn VSTEP (12 phút)' : 'Chế độ luyện tập tương tác (Scaffolding B1)'}
          </div>
        </div>

        <div className="speaking-header-controls">
          {mode === 'exam' && (
            <div className={`speaking-timer-widget ${isPreparing ? 'prep-phase' : 'speaking-phase'}`}>
              <span>{isPreparing ? 'Chuẩn bị:' : 'Ghi âm:'}</span>
              <span className="speaking-timer-digits">{formatTime(secondsRemaining)}</span>
            </div>
          )}

          {evaluationResult && (
            <button className="speaking-btn-evaluate" onClick={() => setIsResultOpen(true)}>
              Xem Kết Quả ({evaluationResult.compositeScore.roundedScore.toFixed(1)})
            </button>
          )}

          {onExit && (
            <button className="speaking-re-record-btn" onClick={onExit}>
              Thoát
            </button>
          )}
        </div>
      </div>

      {/* Main Workspace */}
      <div className="speaking-workspace-grid">
        {/* Left: Prompt & Scaffolds */}
        <div className="speaking-prompt-pane">
          {mode === 'practice' && (
            <div className="speaking-part-tabs">
              <button
                className={`speaking-part-tab-btn ${activePart === 1 ? 'active' : ''}`}
                onClick={() => {
                  setActivePart(1);
                  setRecordingState(audioBlobs[1] ? 'recorded' : 'idle');
                }}
              >
                Part 1: Social
              </button>
              <button
                className={`speaking-part-tab-btn ${activePart === 2 ? 'active' : ''}`}
                onClick={() => {
                  setActivePart(2);
                  setRecordingState(audioBlobs[2] ? 'recorded' : 'idle');
                }}
              >
                Part 2: Solution
              </button>
              <button
                className={`speaking-part-tab-btn ${activePart === 3 ? 'active' : ''}`}
                onClick={() => {
                  setActivePart(3);
                  setRecordingState(audioBlobs[3] ? 'recorded' : 'idle');
                }}
              >
                Part 3: Topic
              </button>
            </div>
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

      {/* Footer */}
      <div className="speaking-runner-footer">
        <span>VSTEP Interactive Speaking Studio • Quyết định 729/QĐ-BGDĐT</span>
        <span>MIME Codec: WebM / MP4 Opus Safe Detection</span>
      </div>

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
