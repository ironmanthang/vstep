import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { WritingPrompt } from '../../types/schemas';
import type { WritingMode, WritingEvaluationResult as IWritingEvaluationResult } from './writingStorage';
import { loadWritingSession, saveWritingSession } from './writingStorage';
import { countWords, runTier1Precalc } from './services/writingTier1';
import { evaluateWritingTask } from './services/writingTier2';
import { calculateWritingCompositeScore } from './services/writingTier3';
import { WritingEvaluationResult } from './components/WritingEvaluationResult';
import './WritingRunner.css';

export interface WritingTestInput {
  id: string;
  test_number: number;
  title: string;
  institution: string;
  total_duration_minutes: number;
  task1: WritingPrompt;
  task2: WritingPrompt;
}

interface WritingRunnerProps {
  test: WritingTestInput;
  mode: WritingMode;
  userId?: string;
  onComplete?: (result: IWritingEvaluationResult) => void;
  onExit?: () => void;
}

export const WritingRunner: React.FC<WritingRunnerProps> = ({
  test,
  mode,
  userId,
  onComplete,
  onExit,
}) => {
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

      if (onComplete) {
        onComplete(fullResult);
      }
    } catch (err) {
      console.error('Submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting, task1Text, task2Text, test, activeTab, secondsRemaining, mode, userId, onComplete]);

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

  // Format timer MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Show 20-minute pacing warning if on Task 1 and under 40 minutes remaining
  const showPacingAlert = mode === 'exam' && !pacingDismissed && activeTab === 'task1' && secondsRemaining <= 40 * 60;

  return (
    <div className="writing-runner">
      {/* Top Header */}
      <div className="writing-runner-header">
        <div className="writing-header-title-box">
          <h1>{test.title}</h1>
          <div className="writing-header-subtitle">
            {test.institution} • Thời lượng: {test.total_duration_minutes} phút • Barem B1 Bộ GD&ĐT
          </div>
        </div>

        <div className="writing-header-controls">
          {mode === 'exam' && (
            <div className={`writing-timer-widget ${secondsRemaining <= 300 ? 'urgent' : ''}`}>
              <span>⏱️ Thời gian còn:</span>
              <span className="writing-timer-digits">{formatTime(secondsRemaining)}</span>
            </div>
          )}

          {onExit && (
            <button className="writing-save-btn" onClick={onExit}>
              ✕ Thoát
            </button>
          )}
        </div>
      </div>

      {/* Pacing Alert Banner */}
      {showPacingAlert && (
        <div className="writing-pacing-banner">
          <span>⚠️ <strong>Nhắc nhở phân bổ thời gian:</strong> Đã hết 20 phút dành cho Task 1. Bạn nên chuyển sang Task 2 để bảo vệ 67% tổng điểm của bài thi!</span>
          <button
            className="writing-pacing-btn"
            onClick={() => {
              setActiveTab('task2');
              setPacingDismissed(true);
            }}
          >
            Chuyển sang Task 2 ➔
          </button>
        </div>
      )}

      {/* Task Switcher Navigation */}
      <div className="writing-nav-bar">
        <button
          className={`writing-nav-tab ${activeTab === 'task1' ? 'active' : ''}`}
          onClick={() => setActiveTab('task1')}
        >
          <span>Task 1: Thư / Email (≥120 từ, 1/3 điểm)</span>
          <span className="writing-nav-word-pill">{countWords(task1Text)} từ</span>
        </button>
        <button
          className={`writing-nav-tab ${activeTab === 'task2' ? 'active' : ''}`}
          onClick={() => setActiveTab('task2')}
        >
          <span>Task 2: Bài Luận (≥250 từ, 2/3 điểm)</span>
          <span className="writing-nav-word-pill">{countWords(task2Text)} từ</span>
        </button>
      </div>

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

          {/* Scaffolding in Practice Mode */}
          {mode === 'practice' && (
            <div className="writing-scaffold-box">
              <h4 className="writing-scaffold-title">💡 Gợi ý cấu trúc viết chuẩn B1:</h4>
              <div className="writing-scaffold-content">
                {activeTab === 'task1' ? (
                  <>
                    • <strong>Mở thư:</strong> Dear [Name], / I am writing this email to...<br />
                    • <strong>Thân thư:</strong> Trả lời lần lượt đủ 3 ý gợi ý trong đề bài.<br />
                    • <strong>Kết thư:</strong> I hope to hear from you soon. / Best regards, [Your Name]
                  </>
                ) : (
                  <>
                    • <strong>Đoạn 1 (Intro):</strong> Nêu chủ đề + quan điểm cá nhân (Thesis Statement).<br />
                    • <strong>Đoạn 2 (Body 1):</strong> Luận điểm 1 + Ví dụ (On the one hand...).<br />
                    • <strong>Đoạn 3 (Body 2):</strong> Luận điểm 2 + Ví dụ (On the other hand...).<br />
                    • <strong>Đoạn 4 (Conclusion):</strong> Khẳng định lại quan điểm (To sum up...).
                  </>
                )}
              </div>
            </div>
          )}
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
                  <span>{mode === 'exam' ? '📤 Nộp Bài Thi' : '✨ Chấm Bài AI (Chuẩn B1)'}</span>
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
