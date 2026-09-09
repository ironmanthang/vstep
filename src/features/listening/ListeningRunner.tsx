import React, { useState, useRef } from 'react';
import type { ListeningTest, ListeningMode, ActivePracticeTab, ListeningScoreResult } from './types';
import { useAudioPlayer } from './useAudioPlayer';
import { CustomAudioPlayer } from './components/CustomAudioPlayer';
import { DictationPanel } from './components/DictationPanel';
import { TranscriptPanel } from './components/TranscriptPanel';
import { useUserStore } from '../../services/user/userStore';
import './ListeningRunner.css';

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
  const { recordStudyActivity, incrementExercisesCompleted } = useUserStore();

  const [activeTab, setActiveTab] = useState<ActivePracticeTab>('questions');
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [scoreResult, setScoreResult] = useState<ListeningScoreResult | null>(null);

  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const {
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    activeSubtitleIndex,
    togglePlay,
    seekBy,
    seekTo,
    setPlaybackRate,
    playSegment,
  } = useAudioPlayer({
    test,
    mode,
    onAudioEnded: () => {
      if (isExam && !isSubmitted) {
        handleSubmit();
      }
    },
  });

  const handleSelectOption = (questionId: string, optionKey: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: optionKey }));
  };

  const handleToggleFlag = (questionId: string) => {
    if (isSubmitted) return;
    setFlaggedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(questionId)) {
        next.delete(questionId);
      } else {
        next.add(questionId);
      }
      return next;
    });
  };

  const scrollToQuestion = (questionId: string) => {
    setActiveTab('questions');
    const el = questionRefs.current[questionId];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('active-target');
      setTimeout(() => el.classList.remove('active-target'), 1500);
    }
  };

  const handleSubmit = () => {
    let correct = 0;
    const total = test.questions.length;

    test.questions.forEach((q) => {
      if (answers[q.id] === q.correct_key) {
        correct += 1;
      }
    });

    const scoreOutOf10 = total > 0 ? Number(((correct / total) * 10).toFixed(1)) : 0;
    const result: ListeningScoreResult = {
      totalQuestions: total,
      correctCount: correct,
      scoreOutOf10,
      timeSpentSeconds: Math.round(currentTime),
      completedAt: Date.now(),
    };

    setIsSubmitted(true);
    setScoreResult(result);
    recordStudyActivity();
    incrementExercisesCompleted(1);

    onComplete?.(result);
  };

  const handleReset = () => {
    setAnswers({});
    setFlaggedQuestions(new Set());
    setIsSubmitted(false);
    setScoreResult(null);
    seekTo(0);
  };

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="listening-runner">
      {/* Header */}
      <div className="runner-header">
        <div className="runner-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className={`badge ${isExam ? 'badge-gold' : 'badge-primary'}`}>
              {isExam ? 'Chế Độ Thi Thử (Exam Mode)' : 'Chế Độ Luyện Tập (Practice)'}
            </span>
            <span className="badge badge-emerald">Bậc {test.difficulty}</span>
          </div>
          <h2 style={{ fontSize: 'var(--fs-xl)', fontWeight: 800, margin: '4px 0 0 0' }}>
            {test.title}
          </h2>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          {isSubmitted ? (
            <button className="secondary-btn" onClick={handleReset}>
              🔄 Làm Lại Bài Này
            </button>
          ) : (
            <button
              className="primary-btn"
              onClick={handleSubmit}
              disabled={answeredCount === 0 && !isExam}
            >
              Nộp Bài & Chấm Điểm ({answeredCount}/{test.questions.length})
            </button>
          )}
        </div>
      </div>

      {/* Score Result Banner if submitted */}
      {isSubmitted && scoreResult && (
        <div className="score-result-card">
          <span className="badge badge-emerald" style={{ fontSize: 'var(--fs-xs)' }}>
            Kết Quả Chấm Điểm
          </span>
          <div className="score-number-display">{scoreResult.scoreOutOf10} / 10</div>
          <p style={{ margin: 0, fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>
            Đúng <strong>{scoreResult.correctCount}</strong> trên tổng số <strong>{scoreResult.totalQuestions}</strong> câu hỏi.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
            <button
              className="primary-btn"
              onClick={() => setActiveTab('transcript')}
            >
              Xem Lời Thoại & Manh Mối 🎯
            </button>
          </div>
        </div>
      )}

      {/* Main Content Workspace */}
      <div className="runner-workspace-grid">
        {/* Left Column: Player + Tabs + Questions / Dictation / Transcript */}
        <div className="main-question-area">
          {/* Sticky Custom Audio Player (Scoped to Left Column so Palette on right is never occluded) */}
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

          {/* Practice Scaffolding Tabs (Practice mode only) */}
          {!isExam && (
            <div className="runner-tab-bar">
              <button
                className={`runner-tab-btn ${activeTab === 'questions' ? 'active' : ''}`}
                onClick={() => setActiveTab('questions')}
              >
                📋 Câu Hỏi Trắc Nghiệm ({test.questions.length})
              </button>
              <button
                className={`runner-tab-btn ${activeTab === 'dictation' ? 'active' : ''}`}
                onClick={() => setActiveTab('dictation')}
              >
                ✍️ Chép Chính Tả (Dictation)
              </button>
              <button
                className={`runner-tab-btn ${activeTab === 'transcript' ? 'active' : ''}`}
                onClick={() => setActiveTab('transcript')}
              >
                📜 Lời Thoại & Manh Mối {isSubmitted && '🎯'}
              </button>
            </div>
          )}

          {activeTab === 'questions' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {test.questions.map((q, idx) => {
                const selectedKey = answers[q.id];
                const isFlagged = flaggedQuestions.has(q.id);
                const isCorrect = selectedKey === q.correct_key;

                return (
                  <div
                    key={q.id}
                    ref={(el) => { questionRefs.current[q.id] = el; }}
                    className="question-card"
                  >
                    <div className="question-card-header">
                      <span className="question-number-badge">Câu {idx + 1}</span>
                      {!isSubmitted && (
                        <button
                          onClick={() => handleToggleFlag(q.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: 'var(--fs-xs)',
                            color: isFlagged ? 'var(--gold-text)' : 'var(--text-muted)',
                            fontWeight: 600,
                          }}
                        >
                          {isFlagged ? '🚩 Đã gắn cờ' : '🏳 Cắm cờ'}
                        </button>
                      )}
                    </div>

                    <p className="question-prompt-text">{q.question_text}</p>

                    {/* Options */}
                    <div className="options-list">
                      {q.options.map((opt) => {
                        const isSelected = selectedKey === opt.key;
                        let resultClass = '';
                        if (isSubmitted) {
                          if (opt.key === q.correct_key) {
                            resultClass = 'result-correct';
                          } else if (isSelected) {
                            resultClass = 'result-wrong';
                          }
                        }

                        return (
                          <button
                            key={opt.key}
                            className={`option-choice-btn ${isSelected ? 'selected' : ''} ${resultClass}`}
                            onClick={() => handleSelectOption(q.id, opt.key)}
                            disabled={isSubmitted}
                            aria-label={`Phương án ${opt.key}: ${opt.text}`}
                          >
                            <span className="option-key-bubble">{opt.key}</span>
                            <span style={{ flex: 1 }}>{opt.text}</span>
                            {isSubmitted && opt.key === q.correct_key && <span>✓</span>}
                          </button>
                        );
                      })}
                    </div>

                    {/* Post-submission explanation */}
                    {isSubmitted && (
                      <div className="question-explanation-box">
                        <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: isCorrect ? 'var(--emerald-text)' : 'var(--coral-text)' }}>
                          {isCorrect ? '✓ Bạn đã chọn đúng!' : `✕ Đáp án đúng là: ${q.correct_key}`}
                        </div>
                        <p style={{ margin: '4px 0 0 0', fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                          {q.explanation_vi}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'dictation' && (
            <DictationPanel
              test={test}
              currentSubtitleIndex={activeSubtitleIndex}
              onPlaySegment={playSegment}
            />
          )}

          {activeTab === 'transcript' && (
            <TranscriptPanel
              test={test}
              activeSubtitleIndex={activeSubtitleIndex}
              showClues={isSubmitted || !isExam}
              onPlaySegment={playSegment}
            />
          )}
        </div>

        {/* Right Column: Question Palette Sidebar */}
        <aside className="palette-sidebar">
          <div className="card-surface" style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 700 }}>Danh Sách Câu Hỏi</span>
              <span className="badge badge-primary" style={{ fontSize: '10px' }}>
                {answeredCount}/{test.questions.length}
              </span>
            </div>

            <div className="palette-grid">
              {test.questions.map((q, idx) => {
                const isAnswered = Boolean(answers[q.id]);
                const isFlagged = flaggedQuestions.has(q.id);

                let scoreClass = '';
                if (isSubmitted) {
                  scoreClass = answers[q.id] === q.correct_key ? 'score-correct' : 'score-wrong';
                }

                return (
                  <button
                    key={q.id}
                    className={`palette-btn ${isAnswered ? 'answered' : ''} ${isFlagged ? 'flagged' : ''} ${scoreClass}`}
                    onClick={() => scrollToQuestion(q.id)}
                    title={`Câu ${idx + 1}`}
                    aria-label={`Chuyển đến câu ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--space-2)', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '10px', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)' }} />
                <span>Đã trả lời</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)' }} />
                <span>Đã cắm cờ xem lại</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
