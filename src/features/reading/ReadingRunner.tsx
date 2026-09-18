import React, { useState, useRef, useCallback, useEffect } from 'react';
import type { ReadingTest, ReadingMode, ReadingScoreResult } from './types';
import { PassagePanel } from './components/PassagePanel';
import { ReadingBottomBar } from './components/ReadingBottomBar';
import { useDictionaryExamLock } from '../dictionary';
import { ReadingHeader } from './components/ReadingHeader';
import { ReadingPassageNavBar } from './components/ReadingPassageNavBar';
import { ReadingQuestionsStream } from './components/ReadingQuestionsStream';
import { ReadingResetModal } from './components/ReadingResetModal';
import { useReadingTimer } from './useReadingTimer';
import { useReaderSettings } from './useReaderSettings';
import { useReadingSessionSync } from './useReadingSessionSync';
import { useUserStore } from '../../services/user/userStore';
import { useAuth } from '../../services/supabase/authStore';
import {
  upsertTestSubmission,
  deleteTestSubmission,
} from '../../services/supabase/testSubmissionSync';
import {
  loadReadingSession,
  clearReadingSession,
} from './readingStorage';
import './ReadingRunner.css';

interface ReadingRunnerProps {
  test: ReadingTest;
  mode?: ReadingMode;
  onComplete?: (result: ReadingScoreResult) => void;
}

function toggleInSet(set: Set<string>, item: string): Set<string> {
  const next = new Set(set);
  if (next.has(item)) next.delete(item);
  else next.add(item);
  return next;
}

export const ReadingRunner: React.FC<ReadingRunnerProps> = ({
  test,
  mode = 'practice',
  onComplete,
}) => {
  const isExam = mode === 'exam';
  useDictionaryExamLock(isExam);
  const { user } = useAuth();
  const userId = user?.id;
  const { recordStudyActivity, incrementExercisesCompleted } = useUserStore();

  const [initialSession] = useState(() => loadReadingSession(test.id, mode, userId));
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>(
    () => initialSession?.answers ?? {}
  );
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(
    () => new Set(initialSession?.flaggedQuestions ?? [])
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(
    () => initialSession?.isSubmitted ?? false
  );
  const [scoreResult, setScoreResult] = useState<ReadingScoreResult | null>(
    () => initialSession?.scoreResult ?? null
  );
  const [notes, setNotes] = useState<Record<string, string>>(
    () => initialSession?.notes ?? {}
  );
  const [syncWarning, setSyncWarning] = useState<string | null>(null);

  // Active Passage & Active Question
  const [activePassageIndex, setActivePassageIndex] = useState<number>(0);
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [isBottomBarCollapsed, setIsBottomBarCollapsed] = useState<boolean>(false);

  // Mobile Tab Toggle State ('passage' vs 'questions')
  const [mobileTab, setMobileTab] = useState<'passage' | 'questions'>('passage');
  const passagePaneRef = useRef<HTMLDivElement | null>(null);
  const questionsPaneRef = useRef<HTMLDivElement | null>(null);
  const passageScrollPosRef = useRef<number>(0);
  const questionsScrollPosRef = useRef<number>(0);

  // Reader Settings
  const { readerSettings, updateReaderSettings } = useReaderSettings(userId);

  // Reset Modal State
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Flattened questions array
  const allQuestions = test.passages.flatMap((p) => p.questions);
  const currentPassage = test.passages[activePassageIndex] || test.passages[0];

  // Active clue sentence for evidence highlighting
  const activeQuestion = allQuestions.find((q) => q.id === activeQuestionId);
  const activeClueSentence = activeQuestion?.clue_sentence;

  // Session Persistence and Cloud Synchronization
  useReadingSessionSync({
    testId: test.id,
    mode,
    userId,
    answers,
    flaggedQuestions,
    notes,
    isSubmitted,
    scoreResult,
    initialSubmitted: initialSession?.isSubmitted,
    onHydrate: (hydrated) => {
      setAnswers(hydrated.answers);
      setFlaggedQuestions(hydrated.flaggedQuestions);
      setNotes(hydrated.notes);
      setIsSubmitted(true);
      setScoreResult(hydrated.scoreResult);
    },
    onRemoteReset: () => {
      setAnswers({});
      setFlaggedQuestions(new Set());
      setNotes({});
      setIsSubmitted(false);
      setScoreResult(null);
    },
  });

  const handleSubmitRef = useRef<() => void>(() => {});

  // Timer Hook
  const { examSecondsRemaining, resetTimer } = useReadingTimer({
    isExam,
    durationMinutes: test.duration_minutes,
    isSubmitted,
    onAutoSubmit: () => handleSubmitRef.current(),
  });

  const handleSubmit = useCallback(async () => {
    const total = allQuestions.length;
    const correct = allQuestions.filter((q) => answers[q.id] === q.correct_key).length;
    const scoreOutOf10 = total > 0 ? Number(((correct / total) * 10).toFixed(1)) : 0;
    const timeSpent = isExam
      ? (test.duration_minutes ? test.duration_minutes * 60 : 3600) - examSecondsRemaining
      : 0;

    const completedTimestamp = Date.now();
    const result: ReadingScoreResult = {
      totalQuestions: total,
      correctCount: correct,
      scoreOutOf10,
      timeSpentSeconds: isExam ? Math.max(1, timeSpent) : 0,
      completedAt: completedTimestamp,
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
        skill: 'reading',
        mode,
        score: scoreOutOf10,
        correct_count: correct,
        total_questions: total,
        time_spent_seconds: Math.max(1, timeSpent),
        answers,
        notes,
        flagged_questions: Array.from(flaggedQuestions),
        completed_at: new Date(completedTimestamp).toISOString(),
      });

      if (!res.success) {
        setSyncWarning(
          'Không thể đồng bộ lên đám mây (đã lưu kết quả an toàn trên thiết bị này).'
        );
      }
    }
  }, [
    allQuestions,
    answers,
    examSecondsRemaining,
    flaggedQuestions,
    incrementExercisesCompleted,
    isExam,
    mode,
    notes,
    onComplete,
    recordStudyActivity,
    test.duration_minutes,
    test.id,
    user,
  ]);

  useEffect(() => {
    handleSubmitRef.current = handleSubmit;
  }, [handleSubmit]);

  // Mobile Tab Switching with Scroll Position Memory
  const handleSwitchMobileTab = (newTab: 'passage' | 'questions') => {
    if (mobileTab === 'passage' && passagePaneRef.current) {
      passageScrollPosRef.current = passagePaneRef.current.scrollTop;
    } else if (mobileTab === 'questions' && questionsPaneRef.current) {
      questionsScrollPosRef.current = questionsPaneRef.current.scrollTop;
    }

    setMobileTab(newTab);

    // Restore scroll in next tick
    requestAnimationFrame(() => {
      if (newTab === 'passage' && passagePaneRef.current) {
        passagePaneRef.current.scrollTop = passageScrollPosRef.current;
      } else if (newTab === 'questions' && questionsPaneRef.current) {
        questionsPaneRef.current.scrollTop = questionsScrollPosRef.current;
      }
    });
  };

  const handleSelectOption = (questionId: string, optionKey: 'A' | 'B' | 'C' | 'D') => {
    if (!isSubmitted) {
      setAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
    }
  };

  const handleToggleFlag = (id: string) => {
    if (!isSubmitted) setFlaggedQuestions((prev) => toggleInSet(prev, id));
  };

  const handleFocusQuestion = (questionId: string) => {
    setActiveQuestionId(questionId);

    const passageIdx = test.passages.findIndex((p) =>
      p.questions.some((q) => q.id === questionId)
    );
    if (passageIdx !== -1 && passageIdx !== activePassageIndex) {
      setActivePassageIndex(passageIdx);
    }

    setTimeout(() => {
      const el = questionRefs.current[questionId];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 50);
  };

  const handleSelectPassage = (pIdx: number) => {
    setActivePassageIndex(pIdx);
    const p = test.passages[pIdx];
    if (p?.questions[0]) {
      setActiveQuestionId(p.questions[0].id);
    }
  };

  const handleConfirmReset = async () => {
    setIsResetting(true);
    try {
      if (userId) {
        await deleteTestSubmission(userId, test.id, mode);
        clearReadingSession(test.id, mode, userId);
      } else {
        clearReadingSession(test.id, mode);
      }
      setAnswers({});
      setFlaggedQuestions(new Set());
      setIsSubmitted(false);
      setScoreResult(null);
      setNotes({});
      setSyncWarning(null);
      resetTimer();
      setIsResetModalOpen(false);
    } catch (err) {
      console.error('Failed to reset reading test:', err);
    } finally {
      setIsResetting(false);
    }
  };

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="reading-runner">
      <ReadingHeader
        title={test.title}
        isExam={isExam}
        examSecondsRemaining={examSecondsRemaining}
        syncWarning={syncWarning}
        isSubmitted={isSubmitted}
        scoreResult={scoreResult}
        onReset={() => setIsResetModalOpen(true)}
      />

      <ReadingPassageNavBar
        passages={test.passages}
        activePassageIndex={activePassageIndex}
        answers={answers}
        totalAnsweredCount={answeredCount}
        totalQuestionsCount={allQuestions.length}
        mobileTab={mobileTab}
        onSelectPassage={handleSelectPassage}
        onSwitchMobileTab={handleSwitchMobileTab}
      />

      {/* Main Split-Pane Workspace Grid */}
      <div className={`reading-workspace-grid ${isBottomBarCollapsed ? 'bottom-collapsed' : ''}`}>
        {/* Left Column: Passage Panel */}
        <div
          ref={passagePaneRef}
          className={`reading-passage-pane ${
            mobileTab !== 'passage' ? 'mobile-hidden' : ''
          }`}
        >
          {currentPassage && (
            <PassagePanel
              passage={currentPassage}
              passageIndex={activePassageIndex}
              activeClueSentence={activeClueSentence}
              readerSettings={readerSettings}
              onChangeReaderSettings={updateReaderSettings}
            />
          )}
        </div>

        {/* Middle Column: Question Cards Stream for Current Passage */}
        <ReadingQuestionsStream
          currentPassage={currentPassage}
          allQuestions={allQuestions}
          answers={answers}
          flaggedQuestions={flaggedQuestions}
          notes={notes}
          isSubmitted={isSubmitted}
          isExam={isExam}
          activeQuestionId={activeQuestionId}
          mobileHidden={mobileTab !== 'questions'}
          questionRefs={questionRefs}
          paneRef={questionsPaneRef}
          onSelectOption={handleSelectOption}
          onToggleFlag={handleToggleFlag}
          onFocusQuestion={handleFocusQuestion}
          onChangeNote={(qId, val) =>
            setNotes((prev) => ({ ...prev, [qId]: val }))
          }
        />
      </div>

      {/* Modern Bottom Navigation Bar with Passage Switcher & Question Track */}
      <ReadingBottomBar
        passages={test.passages}
        activePassageIndex={activePassageIndex}
        answers={answers}
        flaggedQuestions={flaggedQuestions}
        activeQuestionId={activeQuestionId}
        isSubmitted={isSubmitted}
        isExam={isExam}
        isCollapsed={isBottomBarCollapsed}
        onToggleCollapse={setIsBottomBarCollapsed}
        onSelectPassage={handleSelectPassage}
        onSelectQuestion={handleFocusQuestion}
        onSubmit={handleSubmit}
        onReset={() => setIsResetModalOpen(true)}
      />

      {/* Confirmation Modal for Resetting Test */}
      <ReadingResetModal
        isOpen={isResetModalOpen}
        isLoading={isResetting}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleConfirmReset}
      />
    </div>
  );
};
