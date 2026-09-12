import { useState, useRef, useEffect, useCallback } from 'react';
import type { ReadingTest, ReadingMode, ReadingScoreResult, ReaderSettings } from './types';
import { PassagePanel } from './components/PassagePanel';
import { ReadingQuestionCard } from './components/ReadingQuestionCard';
import { ReadingQuestionPalette } from './components/ReadingQuestionPalette';
import { DictionaryTooltip } from './components/DictionaryTooltip';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { useUserStore } from '../../services/user/userStore';
import { useAuth } from '../../services/supabase/authStore';
import {
  fetchTestSubmission,
  upsertTestSubmission,
  deleteTestSubmission,
} from '../../services/supabase/testSubmissionSync';
import {
  loadReadingSession,
  saveReadingSession,
  clearReadingSession,
  hydrateReadingSessionFromCloud,
} from './readingStorage';
import { loadUserItem, saveUserItem } from '../../services/storage/userStorage';
import './ReadingRunner.css';

interface ReadingRunnerProps {
  test: ReadingTest;
  mode?: ReadingMode;
  onComplete?: (result: ReadingScoreResult) => void;
}

const DEFAULT_READER_SETTINGS: ReaderSettings = {
  fontSize: 16,
  lineHeight: 1.8,
  theme: 'warm-sepia',
};

function toggleInSet(set: Set<string>, item: string): Set<string> {
  const next = new Set(set);
  if (next.has(item)) next.delete(item);
  else next.add(item);
  return next;
}

function formatSeconds(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export const ReadingRunner: React.FC<ReadingRunnerProps> = ({
  test,
  mode = 'practice',
  onComplete,
}) => {
  const isExam = mode === 'exam';
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

  // Mobile Tab Toggle State ('passage' vs 'questions')
  const [mobileTab, setMobileTab] = useState<'passage' | 'questions'>('passage');
  const passagePaneRef = useRef<HTMLDivElement | null>(null);
  const questionsPaneRef = useRef<HTMLDivElement | null>(null);
  const passageScrollPosRef = useRef<number>(0);
  const questionsScrollPosRef = useRef<number>(0);

  // Reader Settings
  const [readerSettings, setReaderSettings] = useState<ReaderSettings>(() => {
    return loadUserItem<ReaderSettings>(
      userId || 'guest_reader',
      'reading_reader_settings',
      DEFAULT_READER_SETTINGS
    );
  });

  const handleUpdateReaderSettings = (updates: Partial<ReaderSettings>) => {
    setReaderSettings((prev) => {
      const next = { ...prev, ...updates };
      saveUserItem(userId || 'guest_reader', 'reading_reader_settings', next);
      return next;
    });
  };

  // Dictionary Tooltip State
  const [dictTooltip, setDictTooltip] = useState<{
    word: string | null;
    position: { x: number; y: number } | null;
  }>({ word: null, position: null });

  // Reset Modal State
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  // Timer State
  // Practice: stopwatch in seconds; Exam: 60min countdown (3600 seconds)
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [examSecondsRemaining, setExamSecondsRemaining] = useState<number>(
    test.duration_minutes ? test.duration_minutes * 60 : 3600
  );

  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Flattened questions array
  const allQuestions = test.passages.flatMap((p) => p.questions);
  const currentPassage = test.passages[activePassageIndex] || test.passages[0];

  // Active clue sentence for evidence highlighting
  const activeQuestion = allQuestions.find((q) => q.id === activeQuestionId);
  const activeClueSentence = activeQuestion?.clue_sentence;

  // Persist session to local storage
  useEffect(() => {
    if (!userId) return;
    saveReadingSession(
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

  // Cross-device cloud sync and remote reset reconciliation
  useEffect(() => {
    if (!userId) return;
    let isCancelled = false;

    async function syncFromCloud() {
      if (!userId) return;
      try {
        const cloudData = await fetchTestSubmission(userId, test.id, mode);
        if (isCancelled) return;

        if (cloudData) {
          const hydrated = hydrateReadingSessionFromCloud(test.id, mode, cloudData, userId);
          if (isCancelled) return;
          setAnswers(hydrated.answers);
          setFlaggedQuestions(new Set(hydrated.flaggedQuestions));
          setNotes(hydrated.notes);
          setIsSubmitted(true);
          setScoreResult(hydrated.scoreResult);
        } else {
          if (initialSession?.isSubmitted) {
            clearReadingSession(test.id, mode, userId);
            if (isCancelled) return;
            setAnswers({});
            setFlaggedQuestions(new Set());
            setNotes({});
            setIsSubmitted(false);
            setScoreResult(null);
          }
        }
      } catch (err) {
        console.warn('Failed to sync reading test submission from cloud:', err);
      }
    }

    syncFromCloud();

    return () => {
      isCancelled = true;
    };
  }, [userId, test.id, mode, initialSession?.isSubmitted]);

  const handleSubmit = useCallback(async () => {
    const total = allQuestions.length;
    const correct = allQuestions.filter((q) => answers[q.id] === q.correct_key).length;
    const scoreOutOf10 = total > 0 ? Number(((correct / total) * 10).toFixed(1)) : 0;
    const timeSpent = isExam
      ? (test.duration_minutes ? test.duration_minutes * 60 : 3600) - examSecondsRemaining
      : elapsedSeconds;

    const completedTimestamp = Date.now();
    const result: ReadingScoreResult = {
      totalQuestions: total,
      correctCount: correct,
      scoreOutOf10,
      timeSpentSeconds: Math.max(1, timeSpent),
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
    elapsedSeconds,
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

  // Timer Tick
  useEffect(() => {
    if (isSubmitted) return;

    const timerId = setInterval(() => {
      if (isExam) {
        setExamSecondsRemaining((prev) => Math.max(0, prev - 1));
      } else {
        setElapsedSeconds((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [isSubmitted, isExam]);

  // Auto-submit when exam time expires
  useEffect(() => {
    if (isExam && !isSubmitted && examSecondsRemaining === 0) {
      queueMicrotask(() => {
        handleSubmit();
      });
    }
  }, [isExam, isSubmitted, examSecondsRemaining, handleSubmit]);

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

    // Find which passage this question belongs to
    const passageIdx = test.passages.findIndex((p) =>
      p.questions.some((q) => q.id === questionId)
    );
    if (passageIdx !== -1 && passageIdx !== activePassageIndex) {
      setActivePassageIndex(passageIdx);
    }

    // Scroll question card smoothly into view
    setTimeout(() => {
      const el = questionRefs.current[questionId];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 50);
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
      setElapsedSeconds(0);
      setExamSecondsRemaining(test.duration_minutes ? test.duration_minutes * 60 : 3600);
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
      {/* Runner Top Header */}
      <div className="reading-runner-header">
        <div className="reading-title-group">
          <div className="reading-meta-row">
            <span className={`badge ${isExam ? 'badge-gold' : 'badge-primary'}`}>
              {isExam ? 'Chế Độ Thi Thử (Exam)' : 'Chế Độ Luyện Tập (Practice)'}
            </span>
            <span className="badge badge-emerald">Bậc {test.difficulty}</span>
            <span className="badge badge-purple">{test.passages.length} Bài Đọc</span>
          </div>
          <h2 className="reading-main-title">{test.title}</h2>
        </div>

        {/* Timer Widget */}
        <div
          className={`reading-timer-widget ${
            isExam && examSecondsRemaining < 300 ? 'exam-urgent' : ''
          }`}
        >
          <span>{isExam ? '⏳ Còn lại:' : '⏱️ Thời gian:'}</span>
          <span className="timer-digits">
            {isExam ? formatSeconds(examSecondsRemaining) : formatSeconds(elapsedSeconds)}
          </span>
          {!isExam && (
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
              (Khuyến nghị: 15:00 / bài)
            </span>
          )}
        </div>
      </div>

      {/* Sync Warning */}
      {syncWarning && (
        <div
          style={{
            padding: '8px 14px',
            background: 'var(--bg-subtle)',
            borderLeft: '3px solid var(--gold)',
            borderRadius: 'var(--radius-sm)',
            fontSize: 'var(--fs-xs)',
            color: 'var(--text-secondary)',
          }}
        >
          {syncWarning}
        </div>
      )}

      {/* Score Result Card if submitted */}
      {isSubmitted && scoreResult && (
        <div className="score-result-card">
          <span className="badge badge-emerald" style={{ fontSize: 'var(--fs-xs)' }}>
            Kết Quả Chấm Điểm
          </span>
          <div className="score-number-display">{scoreResult.scoreOutOf10} / 10</div>
          <p style={{ margin: 0, fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>
            Đúng <strong>{scoreResult.correctCount}</strong> trên tổng số{' '}
            <strong>{scoreResult.totalQuestions}</strong> câu hỏi. Thời gian làm bài:{' '}
            <strong>{formatSeconds(scoreResult.timeSpentSeconds)}</strong>.
          </p>
          <div className="score-actions-inline">
            <button
              type="button"
              className="secondary-btn score-reset-btn"
              onClick={() => setIsResetModalOpen(true)}
            >
              🔄 Làm Lại Bài Này
            </button>
          </div>
        </div>
      )}

      {/* Passage Selector Bar */}
      <div className="reading-passage-nav-bar">
        {test.passages.map((p, pIdx) => {
          const passageAnswered = p.questions.filter((q) => Boolean(answers[q.id])).length;
          const isCurrent = activePassageIndex === pIdx;

          return (
            <button
              key={p.id || pIdx}
              type="button"
              className={`reading-pnav-btn ${isCurrent ? 'active' : ''}`}
              onClick={() => {
                setActivePassageIndex(pIdx);
                // When selecting passage, set active question to first in that passage
                if (p.questions[0]) {
                  setActiveQuestionId(p.questions[0].id);
                }
              }}
            >
              <span>Bài Đọc {pIdx + 1}</span>
              <span className="reading-pnav-badge">
                {passageAnswered}/{p.questions.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile Tab Switcher (<768px) */}
      <div className="reading-mobile-tab-bar">
        <div className="reading-mobile-tab-group">
          <button
            type="button"
            className={`reading-mobile-tab-btn ${mobileTab === 'passage' ? 'active' : ''}`}
            onClick={() => handleSwitchMobileTab('passage')}
          >
            📖 Bài Đọc {activePassageIndex + 1}
          </button>
          <button
            type="button"
            className={`reading-mobile-tab-btn ${mobileTab === 'questions' ? 'active' : ''}`}
            onClick={() => handleSwitchMobileTab('questions')}
          >
            📝 Câu Hỏi ({answeredCount}/{allQuestions.length})
          </button>
        </div>
      </div>

      {/* Main Split-Pane Workspace Grid */}
      <div className="reading-workspace-grid">
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
              totalPassages={test.passages.length}
              activeClueSentence={activeClueSentence}
              readerSettings={readerSettings}
              onChangeReaderSettings={handleUpdateReaderSettings}
              onWordSelect={(word, pos) => setDictTooltip({ word, position: pos })}
            />
          )}
        </div>

        {/* Middle Column: Question Cards Stream for Current Passage */}
        <div
          ref={questionsPaneRef}
          className={`reading-questions-pane ${
            mobileTab !== 'questions' ? 'mobile-hidden' : ''
          }`}
        >
          <div className="reading-questions-stream">
            {currentPassage?.questions.map((q) => {
              const globalIndex = allQuestions.findIndex((item) => item.id === q.id);

              return (
                <ReadingQuestionCard
                  key={q.id}
                  ref={(el) => {
                    questionRefs.current[q.id] = el;
                  }}
                  question={q}
                  questionIndex={globalIndex >= 0 ? globalIndex : 0}
                  selectedKey={answers[q.id]}
                  isFlagged={flaggedQuestions.has(q.id)}
                  isSubmitted={isSubmitted}
                  isExam={isExam}
                  isActive={activeQuestionId === q.id}
                  onSelectOption={(key) => handleSelectOption(q.id, key)}
                  onToggleFlag={() => handleToggleFlag(q.id)}
                  onFocusQuestion={() => handleFocusQuestion(q.id)}
                  note={notes[q.id] || ''}
                  onChangeNote={(val) =>
                    setNotes((prev) => ({ ...prev, [q.id]: val }))
                  }
                />
              );
            })}
          </div>
        </div>

        {/* Right Column: Question Palette Sidebar */}
        <div className="reading-palette-pane">
          <ReadingQuestionPalette
            passages={test.passages}
            answers={answers}
            flaggedQuestions={flaggedQuestions}
            isSubmitted={isSubmitted}
            isExam={isExam}
            activeQuestionId={activeQuestionId}
            activePassageIndex={activePassageIndex}
            onSelectPassage={(idx) => setActivePassageIndex(idx)}
            onSelectQuestion={(qId) => handleFocusQuestion(qId)}
            onSubmit={handleSubmit}
            onReset={() => setIsResetModalOpen(true)}
          />
        </div>
      </div>

      {/* Dictionary Tooltip Overlay */}
      <DictionaryTooltip
        word={dictTooltip.word}
        position={dictTooltip.position}
        onClose={() => setDictTooltip({ word: null, position: null })}
      />

      {/* Confirmation Modal for Resetting Test */}
      <ConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => {
          if (!isResetting) setIsResetModalOpen(false);
        }}
        onConfirm={handleConfirmReset}
        isLoading={isResetting}
        title="Làm lại bài thi Reading này?"
        description={
          <>
            Hành động này sẽ{' '}
            <strong>xóa toàn bộ câu trả lời, ghi chú và kết quả làm bài</strong> của bài thi
            này trên thiết bị và tài khoản đám mây để bạn bắt đầu lại từ đầu.
          </>
        }
        warningText="Kết quả đã nộp trước đó sẽ bị xóa vĩnh viễn khỏi lịch sử làm bài."
        confirmLabel="Xác nhận làm lại"
        cancelLabel="Giữ kết quả hiện tại"
      />
    </div>
  );
};
