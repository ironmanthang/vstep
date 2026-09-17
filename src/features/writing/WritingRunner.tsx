import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { WritingMode, WritingEvaluationResult as IWritingEvaluationResult, WritingTestInput } from './types';
import { loadWritingSession, saveWritingSession } from './writingStorage';
import { countWords, runTier1Precalc } from './services/writingTier1';
import { evaluateWritingTask } from './services/writingTier2';
import { calculateWritingCompositeScore } from './services/writingTier3';
import { WritingEvaluationResult } from './components/WritingEvaluationResult';
import { WritingHeader } from './components/WritingHeader';
import { WritingPacingBanner } from './components/WritingPacingBanner';
import { WritingTaskTabs } from './components/WritingTaskTabs';
import { WritingScaffoldBox } from './components/WritingScaffoldBox';
import { useAuth } from '../../services/supabase/authStore';
import { useUserStore } from '../../services/user/userStore';
import { upsertTestSubmission } from '../../services/supabase/testSubmissionSync';
import { useDictionaryExamLock } from '../dictionary';
import './WritingRunner.css';

export type { WritingTestInput };

interface WritingRunnerProps {
  test: WritingTestInput;
  mode?: WritingMode;
  userId?: string;
  onComplete?: (result: IWritingEvaluationResult) => void;
  onExit?: () => void;
}

export const WritingRunner: React.FC<WritingRunnerProps> = ({
  test,
  mode = 'practice',
  userId: propUserId,
  onComplete,
  onExit,
}) => {
  useDictionaryExamLock(mode === 'exam');
  const { user } = useAuth();
  const userId = propUserId || user?.id;
  const { recordStudyActivity, incrementExercisesCompleted } = useUserStore();
  const [task1Text, setTask1Text] = useState(() => loadWritingSession(test.id, mode, userId)?.task1Text || '');
  const [task2Text, setTask2Text] = useState(() => loadWritingSession(test.id, mode, userId)?.task2Text || '');
  const [activeTab, setActiveTab] = useState<'task1' | 'task2'>(() => loadWritingSession(test.id, mode, userId)?.activeTab || 'task1');
  const [secondsRemaining, setSecondsRemaining] = useState(() => {
    const saved = loadWritingSession(test.id, mode, userId);
    return (mode === 'exam' && typeof saved?.secondsRemaining === 'number')
      ? saved.secondsRemaining
      : test.total_duration_minutes * 60;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<IWritingEvaluationResult | null>(() => loadWritingSession(test.id, mode, userId)?.evaluationResult || null);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [pacingDismissed, setPacingDismissed] = useState(false);
  const [task1SavedAt, setTask1SavedAt] = useState<string | null>(null);
  const [task2SavedAt, setTask2SavedAt] = useState<string | null>(null);

  // Periodic Auto-save every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (isSubmitting) return;
      saveWritingSession(
        test.id,
        mode,
        {
          task1Text,
          task2Text,
          task1WordCount: countWords(task1Text),
          task2WordCount: countWords(task2Text),
          activeTab,
          secondsRemaining,
          isSubmitted: !!evaluationResult,
          evaluationResult,
        },
        userId
      );
    }, 5000);
    return () => clearInterval(timer);
  }, [test.id, mode, task1Text, task2Text, activeTab, secondsRemaining, evaluationResult, isSubmitting, userId]);

  // Submit Handler declaration
  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // 1. Run Tier 1 Precalc
      const t1Precalc = runTier1Precalc(task1Text, test.task1.prompt_text, test.task1.min_words);
      const t2Precalc = runTier1Precalc(task2Text, test.task2.prompt_text, test.task2.min_words);

      // 2. Run Tier 2 AI Evaluator in parallel
      const [t1Eval, t2Eval] = await Promise.all([
        evaluateWritingTask({
          taskType: 'task1_letter',
          promptTitle: test.task1.title,
          promptText: test.task1.prompt_text,
          minWords: test.task1.min_words,
          candidateText: task1Text,
          tier1Result: t1Precalc,
        }),
        evaluateWritingTask({
          taskType: 'task2_essay',
          promptTitle: test.task2.title,
          promptText: test.task2.prompt_text,
          minWords: test.task2.min_words,
          candidateText: task2Text,
          tier1Result: t2Precalc,
        }),
      ]);

      // 3. Run Tier 3 Composite Scoring & Rounding
      const compositeScore = calculateWritingCompositeScore(t1Eval.taskScore, t2Eval.taskScore);

      const fullResult: IWritingEvaluationResult = {
        task1: t1Eval,
        task2: t2Eval,
        compositeScore,
        evaluatedAt: Date.now(),
      };

      setEvaluationResult(fullResult);
      setIsResultOpen(true);

      saveWritingSession(
        test.id,
        mode,
        {
          task1Text,
          task2Text,
          task1WordCount: t1Precalc.word_count,
          task2WordCount: t2Precalc.word_count,
          activeTab,
          secondsRemaining,
          isSubmitted: true,
          evaluationResult: fullResult,
        },
        userId
      );

      recordStudyActivity();
      incrementExercisesCompleted(1);

      if (userId) {
        upsertTestSubmission({
          user_id: userId,
          test_id: test.id,
          skill: 'writing',
          mode,
          score: compositeScore.roundedScore,
          correct_count: compositeScore.isB1Passed ? 1 : 0,
          total_questions: 2,
          time_spent_seconds: Math.max(0, (test.total_duration_minutes * 60) - secondsRemaining),
          answers: { task1: task1Text, task2: task2Text },
          notes: {},
          flagged_questions: [],
          completed_at: new Date(fullResult.evaluatedAt).toISOString(),
        }).catch((err) => {
          console.warn('Failed to sync writing submission to cloud:', err);
        });
      }

      if (onComplete) {
        onComplete(fullResult);
      }
    } catch (err) {
      console.error('Submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting, task1Text, task2Text, test, activeTab, secondsRemaining, mode, userId, onComplete, recordStudyActivity, incrementExercisesCompleted]);

  // Exam Countdown Timer
  const submitRef = useRef(handleSubmit);
  useEffect(() => {
    submitRef.current = handleSubmit;
  }, [handleSubmit]);

  useEffect(() => {
    if (mode !== 'exam' || evaluationResult) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mode, evaluationResult]);

  // Manual save for current task
  const handleManualSave = (task: 'task1' | 'task2') => {
    const timeStr = new Date().toLocaleTimeString('vi-VN');
    if (task === 'task1') {
      setTask1SavedAt(timeStr);
    } else {
      setTask2SavedAt(timeStr);
    }
    saveWritingSession(
      test.id,
      mode,
      {
        task1Text,
        task2Text,
        task1WordCount: countWords(task1Text),
        task2WordCount: countWords(task2Text),
        activeTab,
        secondsRemaining,
        isSubmitted: !!evaluationResult,
        evaluationResult,
      },
      userId
    );
  };

  const activePrompt = activeTab === 'task1' ? test.task1 : test.task2;
  const currentText = activeTab === 'task1' ? task1Text : task2Text;
  const currentSetter = activeTab === 'task1' ? setTask1Text : setTask2Text;
  const currentWords = countWords(currentText);
  const currentMinWords = activePrompt.min_words;
  const currentLastSaved = activeTab === 'task1' ? task1SavedAt : task2SavedAt;

  // Show 20-minute pacing warning if on Task 1 and under 40 minutes remaining
  const showPacingAlert = mode === 'exam' && !pacingDismissed && activeTab === 'task1' && secondsRemaining <= 40 * 60;

  return (
    <div className="writing-runner">
      <WritingHeader
        title={test.title}
        institution={test.institution}
        totalDurationMinutes={test.total_duration_minutes}
        mode={mode}
        secondsRemaining={secondsRemaining}
        onExit={onExit}
      />

      {showPacingAlert && (
        <WritingPacingBanner
          onSwitchToTask2={() => {
            setActiveTab('task2');
            setPacingDismissed(true);
          }}
        />
      )}

      <WritingTaskTabs
        activeTab={activeTab}
        task1WordCount={countWords(task1Text)}
        task2WordCount={countWords(task2Text)}
        onSelectTab={(tab) => setActiveTab(tab)}
      />

      {/* Split Screen Container */}
      <div className="writing-split-container">
        {/* Left Panel: Prompt */}
        <div className="writing-prompt-panel">
          <div className="writing-prompt-badge-row">
            <span className="writing-prompt-badge">
              {activeTab === 'task1' ? 'TASK 1 (20 PHÚT)' : 'TASK 2 (40 PHÚT)'}
            </span>
            {activePrompt.context_info && (
              <span className="writing-prompt-badge">{activePrompt.context_info}</span>
            )}
          </div>

          <h3 style={{ margin: 0, fontSize: 16 }}>{activePrompt.title}</h3>

          <div className="writing-prompt-text">
            {activePrompt.prompt_text}
          </div>

          {mode === 'practice' && <WritingScaffoldBox activeTab={activeTab} />}
        </div>

        {/* Right Panel: Editor */}
        <div className="writing-editor-panel">
          <div className="writing-editor-top-bar">
            <div className={`writing-word-counter ${currentWords >= currentMinWords ? 'met' : 'unmet'}`}>
              <span>Số từ: {currentWords} / {currentMinWords}</span>
              {currentWords >= currentMinWords && <span>✓ Đạt độ dài</span>}
            </div>

            <div className="writing-save-status">
              {currentLastSaved ? `Đã lưu: ${currentLastSaved}` : 'Tự động lưu mỗi 5s'}
            </div>
          </div>

          <textarea
            className="writing-textarea"
            placeholder={
              activeTab === 'task1'
                ? 'Nhập nội dung thư/email của bạn tại đây (tối thiểu 120 từ)...'
                : 'Nhập nội dung bài luận của bạn tại đây (tối thiểu 250 từ)...'
            }
            value={currentText}
            onChange={(e) => currentSetter(e.target.value)}
            disabled={isSubmitting}
            spellCheck={false}
          />

          <div className="writing-editor-actions">
            <button
              className="writing-save-btn"
              onClick={() => handleManualSave(activeTab)}
              disabled={isSubmitting}
            >
              💾 Lưu bài
            </button>

            {evaluationResult ? (
              <button
                className="writing-submit-btn"
                onClick={() => setIsResultOpen(true)}
              >
                📊 Xem Lại Kết Quả ({evaluationResult.compositeScore.roundedScore.toFixed(1)})
              </button>
            ) : (
              <button
                className="writing-submit-btn"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>⏳ Đang Chấm Bài AI...</span>
                ) : (
                  <span>{mode === 'exam' ? '📤 Nộp Bài Thi' : '✨ Chấm Bài AI'}</span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Evaluation Result Modal */}
      {evaluationResult && (
        <WritingEvaluationResult
          isOpen={isResultOpen}
          onClose={() => setIsResultOpen(false)}
          result={evaluationResult}
          task1Prompt={test.task1}
          task2Prompt={test.task2}
          candidateTask1Text={task1Text}
          candidateTask2Text={task2Text}
        />
      )}
    </div>
  );
};
