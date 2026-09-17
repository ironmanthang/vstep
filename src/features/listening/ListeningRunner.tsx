import React, { useState, useRef, useEffect } from 'react';
import type { ListeningTest, ListeningMode, ListeningScoreResult } from './types';
import { useAudioPlayer } from './useAudioPlayer';
import { CustomAudioPlayer } from './components/CustomAudioPlayer';
import { PassageGroupHeader } from './components/PassageGroupHeader';
import { QuestionCard } from './components/QuestionCard';
import { QuestionPalette } from './components/QuestionPalette';
import { ListeningHeader } from './components/ListeningHeader';
import { ListeningResetModal } from './components/ListeningResetModal';
import { useDictionaryExamLock } from '../dictionary';
import { useUserStore } from '../../services/user/userStore';
import { useAuth } from '../../services/supabase/authStore';
import { fetchTestSubmission, upsertTestSubmission, deleteTestSubmission } from '../../services/supabase/testSubmissionSync';
import { getQuestionTranscriptContext } from './transcriptContext';
import {
  loadListeningSession,
  saveListeningSession,
  clearListeningSession,
  hydrateListeningSessionFromCloud,
} from './listeningStorage';
import './ListeningRunner.css';

function toggleInSet(set: Set<string>, item: string): Set<string> {
  const next = new Set(set);
  if (next.has(item)) next.delete(item);
  else next.add(item);
  return next;
}

interface ListeningRunnerProps {
  test: ListeningTest;
  mode?: ListeningMode;
  onComplete?: (result: ListeningScoreResult) => void;
}

export const ListeningRunner: React.FC<ListeningRunnerProps> = ({
  test,
  mode = 'practice',
  onComplete,
}) => {
  const isExam = mode === 'exam';
  useDictionaryExamLock(isExam);
  const { user } = useAuth();
  const userId = user?.id;
  const { recordStudyActivity, incrementExercisesCompleted } = useUserStore();

  const [initialSession] = useState(() => loadListeningSession(test.id, mode, userId));
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>(
    () => initialSession?.answers ?? {}
  );
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(
    () => new Set(initialSession?.flaggedQuestions ?? [])
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(
    () => initialSession?.isSubmitted ?? false
  );
  const [scoreResult, setScoreResult] = useState<ListeningScoreResult | null>(
    () => initialSession?.scoreResult ?? null
  );
  const [notes, setNotes] = useState<Record<string, string>>(
    () => initialSession?.notes ?? {}
  );
  const [syncWarning, setSyncWarning] = useState<string | null>(null);
  const [expandedTranscripts, setExpandedTranscripts] = useState<Set<string>>(new Set());
  const [showVietnamese, setShowVietnamese] = useState<Record<string, boolean>>({});
  const [collapsedPassages, setCollapsedPassages] = useState<Set<string>>(new Set());
  const [collapsedQuestions, setCollapsedQuestions] = useState<Set<string>>(new Set());
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (!userId) return;
    saveListeningSession(
      test.id,
      mode,
      {
        answers,
        flaggedQuestions: Array.from(flaggedQuestions),
        notes,
        isSubmitted,
        scoreResult,
      },
      userId
    );
  }, [test.id, mode, answers, flaggedQuestions, notes, isSubmitted, scoreResult, userId]);

  // Cross-device hydration and remote reset reconciliation
  useEffect(() => {
    if (!userId) return;
    let isCancelled = false;

    async function syncFromCloud() {
      if (!userId) return;
      try {
        const cloudData = await fetchTestSubmission(userId, test.id, mode);
        if (isCancelled) return;

        if (cloudData) {
          const hydrated = hydrateListeningSessionFromCloud(test.id, mode, cloudData, userId);
          if (isCancelled) return;
          setAnswers(hydrated.answers);
          setFlaggedQuestions(new Set(hydrated.flaggedQuestions));
          setNotes(hydrated.notes);
          setIsSubmitted(true);
          setScoreResult(hydrated.scoreResult);
        } else {
          // If cloud submission was deleted/reset on another device, reset local state too
          if (initialSession?.isSubmitted) {
            clearListeningSession(test.id, mode, userId);
            if (isCancelled) return;
            setAnswers({});
            setFlaggedQuestions(new Set());
            setNotes({});
            setIsSubmitted(false);
            setScoreResult(null);
          }
        }
      } catch (err) {
        console.warn('Failed to sync test submission from cloud:', err);
      }
    }

    syncFromCloud();

    return () => {
      isCancelled = true;
    };
  }, [userId, test.id, mode, initialSession?.isSubmitted]);

  const {
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    togglePlay,
    seekBy,
    seekTo,
    setPlaybackRate,
  } = useAudioPlayer({
    test,
    mode,
    onAudioEnded: () => {
      if (isExam && !isSubmitted) handleSubmit();
    },
  });

  const handleSelectOption = (questionId: string, optionKey: 'A' | 'B' | 'C' | 'D') => {
    if (!isSubmitted) setAnswers(prev => ({ ...prev, [questionId]: optionKey }));
  };

  const handleToggleFlag = (id: string) => {
    if (!isSubmitted) setFlaggedQuestions(prev => toggleInSet(prev, id));
  };
  const handleToggleTranscript = (id: string) => setExpandedTranscripts(prev => toggleInSet(prev, id));
  const handleToggleVietnamese = (id: string) => {
    setShowVietnamese(prev => ({ ...prev, [id]: prev[id] === undefined ? false : !prev[id] }));
  };
  const handleTogglePassageCollapse = (id: string) => setCollapsedPassages(prev => toggleInSet(prev, id));
  const handleToggleQuestionCollapse = (id: string) => setCollapsedQuestions(prev => toggleInSet(prev, id));

  const scrollToQuestion = (questionId: string) => {
    const { groupId } = getQuestionTranscriptContext(test, questionId);
    if (groupId) {
      setCollapsedPassages(prev => (!prev.has(groupId) ? prev : toggleInSet(prev, groupId)));
    }
    setCollapsedQuestions(prev => (!prev.has(questionId) ? prev : toggleInSet(prev, questionId)));

    setTimeout(() => {
      const el = questionRefs.current[questionId];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('active-target');
        setTimeout(() => el.classList.remove('active-target'), 1500);
      }
    }, 60);
  };

  const handleSubmit = async () => {
    const total = test.questions.length;
    const correct = test.questions.filter((q) => answers[q.id] === q.correct_key).length;
    const scoreOutOf10 = total > 0 ? Number(((correct / total) * 10).toFixed(1)) : 0;
    const timeSpent = Math.round(currentTime);
    const result: ListeningScoreResult = {
      totalQuestions: total,
      correctCount: correct,
      scoreOutOf10,
      timeSpentSeconds: timeSpent,
      completedAt: Date.now(),
    };

    setIsSubmitted(true);
    setScoreResult(result);
    setSyncWarning(null);
    recordStudyActivity();
    incrementExercisesCompleted(1);
    onComplete?.(result);

    // Cloud on Commit: upsert submission snapshot to Supabase
    if (user?.id) {
      const res = await upsertTestSubmission({
        user_id: user.id,
        test_id: test.id,
        skill: 'listening',
        mode,
        score: scoreOutOf10,
        correct_count: correct,
        total_questions: total,
        time_spent_seconds: timeSpent,
        answers,
        notes,
        flagged_questions: Array.from(flaggedQuestions),
        completed_at: new Date(result.completedAt).toISOString(),
      });

      if (!res.success) {
        setSyncWarning('Không thể đồng bộ lên đám mây (đã lưu kết quả an toàn trên thiết bị này).');
      }
    }
  };

  const handleConfirmReset = async () => {
    setIsResetting(true);
    try {
      if (userId) {
        await deleteTestSubmission(userId, test.id, mode);
        clearListeningSession(test.id, mode, userId);
      } else {
        clearListeningSession(test.id, mode);
      }
      setAnswers({});
      setFlaggedQuestions(new Set());
      setIsSubmitted(false);
      setScoreResult(null);
      setNotes({});
      setSyncWarning(null);
      setExpandedTranscripts(new Set());
      setCollapsedPassages(new Set());
      setCollapsedQuestions(new Set());
      seekTo(0);
      setIsResetModalOpen(false);
    } catch (err) {
      console.error('Failed to reset listening test:', err);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="listening-runner">
      <ListeningHeader
        title={test.title}
        difficulty={test.difficulty}
        syncWarning={syncWarning}
        isSubmitted={isSubmitted}
        scoreResult={scoreResult}
        onReset={() => setIsResetModalOpen(true)}
      />

      {/* Main Content Workspace */}
      <div className="runner-workspace-grid">
        {/* Left Column: Player + Unified Questions Stream */}
        <div className="main-question-area">
          {/* Sticky Custom Audio Player */}
          <CustomAudioPlayer
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            playbackRate={playbackRate}
            mode={mode}
            onTogglePlay={togglePlay}
            onSeekBy={seekBy}
            onSeekTo={seekTo}
            onSetRate={setPlaybackRate}
          />

          {/* Unified Question List */}
          <div className="questions-stream-container">
            {test.questions.map((q, idx) => {
              const { segment, isFirstInGroup, groupTitle, groupId } = getQuestionTranscriptContext(test, q.id);
              const isPassageCollapsed = Boolean(groupId && collapsedPassages.has(groupId));

              return (
                <React.Fragment key={q.id}>
                  {/* Passage Group Header for Multi-Question Conversations/Lectures */}
                  {isFirstInGroup && segment && (
                    <PassageGroupHeader
                      title={groupTitle}
                      startMs={segment.start_ms}
                      endMs={segment.end_ms}
                      isExam={isExam}
                      isCollapsed={isPassageCollapsed}
                      onPlayPassage={() => seekTo(segment.start_ms / 1000)}
                      onToggleCollapse={() => handleTogglePassageCollapse(groupId)}
                    />
                  )}

                  {!isPassageCollapsed && (
                    <QuestionCard
                      ref={(el) => { questionRefs.current[q.id] = el; }}
                      question={q}
                      questionIndex={idx}
                      selectedKey={answers[q.id]}
                      isFlagged={flaggedQuestions.has(q.id)}
                      isSubmitted={isSubmitted}
                      isExam={isExam}
                      isCollapsed={collapsedQuestions.has(q.id)}
                      onToggleCollapse={() => handleToggleQuestionCollapse(q.id)}
                      onSelectOption={(optionKey) => handleSelectOption(q.id, optionKey)}
                      onToggleFlag={() => handleToggleFlag(q.id)}
                      segment={segment}
                      onSeekTo={seekTo}
                      note={notes[q.id] || ''}
                      onChangeNote={(val) => setNotes(prev => ({ ...prev, [q.id]: val }))}
                      isTranscriptOpen={expandedTranscripts.has(q.id)}
                      onToggleTranscript={() => handleToggleTranscript(q.id)}
                      isVietnameseOpen={showVietnamese[q.id] !== false}
                      onToggleVietnamese={() => handleToggleVietnamese(q.id)}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Right Column: Question Palette Sidebar */}
        <QuestionPalette
          questions={test.questions}
          answers={answers}
          flaggedQuestions={flaggedQuestions}
          isSubmitted={isSubmitted}
          onSelectQuestion={scrollToQuestion}
          onSubmit={handleSubmit}
          onReset={() => setIsResetModalOpen(true)}
          isExam={isExam}
        />
      </div>

      <ListeningResetModal
        isOpen={isResetModalOpen}
        isLoading={isResetting}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleConfirmReset}
      />
    </div>
  );
};
