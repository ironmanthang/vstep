import React, { useState, useRef } from 'react';
import type { ListeningTest, ListeningMode, ListeningScoreResult } from './types';
import { useAudioPlayer } from './useAudioPlayer';
import { CustomAudioPlayer } from './components/CustomAudioPlayer';
import { PassageGroupHeader } from './components/PassageGroupHeader';
import { useUserStore } from '../../services/user/userStore';
import './ListeningRunner.css';

interface ListeningRunnerProps {
  test: ListeningTest;
  mode?: ListeningMode;
  onComplete?: (result: ListeningScoreResult) => void;
}

function formatTimestamp(ms: number): string {
  const totalSecs = Math.floor(ms / 1000);
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export const ListeningRunner: React.FC<ListeningRunnerProps> = ({
  test,
  mode = 'practice',
  onComplete,
}) => {
  const isExam = mode === 'exam';
  const { recordStudyActivity, incrementExercisesCompleted } = useUserStore();

  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [scoreResult, setScoreResult] = useState<ListeningScoreResult | null>(null);

  // Scratchpad notes per question (practice mode only)
  const [notes, setNotes] = useState<Record<string, string>>({});

  // Inline collapsible transcript states per question
  const [expandedTranscripts, setExpandedTranscripts] = useState<Set<string>>(new Set());
  const [showVietnamese, setShowVietnamese] = useState<Record<string, boolean>>({});

  // Collapsible passage groups (keyed by groupId)
  const [collapsedPassages, setCollapsedPassages] = useState<Set<string>>(new Set());

  // Collapsible individual questions (keyed by questionId)
  const [collapsedQuestions, setCollapsedQuestions] = useState<Set<string>>(new Set());

  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});

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

  const handleToggleTranscript = (questionId: string) => {
    setExpandedTranscripts(prev => {
      const next = new Set(prev);
      if (next.has(questionId)) {
        next.delete(questionId);
      } else {
        next.add(questionId);
      }
      return next;
    });
  };

  const handleToggleVietnamese = (questionId: string) => {
    setShowVietnamese(prev => ({
      ...prev,
      [questionId]: prev[questionId] === undefined ? false : !prev[questionId],
    }));
  };

  const handleTogglePassageCollapse = (groupId: string) => {
    setCollapsedPassages(prev => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  };

  const handleToggleQuestionCollapse = (questionId: string) => {
    setCollapsedQuestions(prev => {
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
    // If the target question belongs to a collapsed passage, auto-expand it
    const { groupId } = getQuestionTranscriptContext(questionId);
    if (groupId) {
      setCollapsedPassages(prev => {
        if (prev.has(groupId)) {
          const next = new Set(prev);
          next.delete(groupId);
          return next;
        }
        return prev;
      });
    }

    // Also uncollapse the individual question so the options are visible
    setCollapsedQuestions(prev => {
      if (prev.has(questionId)) {
        const next = new Set(prev);
        next.delete(questionId);
        return next;
      }
      return prev;
    });

    setTimeout(() => {
      const el = questionRefs.current[questionId];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('active-target');
        setTimeout(() => el.classList.remove('active-target'), 1500);
      }
    }, 60);
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
    setNotes({});
    setExpandedTranscripts(new Set());
    setCollapsedPassages(new Set());
    setCollapsedQuestions(new Set());
    seekTo(0);
  };

  const answeredCount = Object.keys(answers).length;

  // Helper to find transcript segment and group context for any question
  const getQuestionTranscriptContext = (questionId: string) => {
    const segment = test.transcript.find(t => {
      if (!t.is_clue_for_question) return false;
      const ids = t.is_clue_for_question.split(',').map(s => s.trim());
      return ids.includes(questionId);
    });

    if (!segment) {
      return { segment: null, isFirstInGroup: false, groupTitle: '', groupQuestionIds: [], groupId: '' };
    }

    const groupQuestionIds = segment.is_clue_for_question
      ? segment.is_clue_for_question.split(',').map(s => s.trim())
      : [];

    const isGroup = groupQuestionIds.length > 1;
    const isFirstInGroup = isGroup && groupQuestionIds[0] === questionId;
    const groupId = isGroup ? groupQuestionIds[0] : '';

    let groupTitle = '';
    if (isFirstInGroup) {
      const firstQIndex = test.questions.findIndex(q => q.id === groupQuestionIds[0]) + 1;
      const lastQIndex = test.questions.findIndex(q => q.id === groupQuestionIds[groupQuestionIds.length - 1]) + 1;

      const textLower = segment.text_en.toLowerCase();
      if (textLower.includes('conversation') || (firstQIndex >= 9 && lastQIndex <= 20)) {
        const convIndex = Math.ceil((firstQIndex - 8) / 4);
        groupTitle = `Đoạn Hội Thoại ${convIndex > 0 ? convIndex : ''} (Câu ${firstQIndex} – ${lastQIndex})`;
      } else if (textLower.includes('lecture') || textLower.includes('talk') || firstQIndex >= 21) {
        const lecIndex = Math.ceil((firstQIndex - 20) / 5);
        groupTitle = `Bài Giảng Học Thuật ${lecIndex > 0 ? lecIndex : ''} (Câu ${firstQIndex} – ${lastQIndex})`;
      } else {
        groupTitle = `Đoạn Nghe (Câu ${firstQIndex} – ${lastQIndex})`;
      }
    }

    return {
      segment,
      isFirstInGroup,
      groupTitle,
      groupQuestionIds,
      groupId,
    };
  };

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
        </div>
      )}

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
              const selectedKey = answers[q.id];
              const isFlagged = flaggedQuestions.has(q.id);
              const isCorrect = selectedKey === q.correct_key;
              const { segment, isFirstInGroup, groupTitle, groupId } = getQuestionTranscriptContext(q.id);
              const isTranscriptOpen = expandedTranscripts.has(q.id);
              const isViOpen = showVietnamese[q.id] !== false; // Default true
              const isPassageCollapsed = Boolean(groupId && collapsedPassages.has(groupId));
              const isQuestionCollapsed = collapsedQuestions.has(q.id);

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
                    <div
                      ref={(el) => { questionRefs.current[q.id] = el; }}
                      className={`question-card ${isQuestionCollapsed ? 'question-card-collapsed' : ''}`}
                    >
                      {/* Card Header with Question Badge and Jump Button */}
                      <div
                        className="question-card-header"
                        onClick={() => handleToggleQuestionCollapse(q.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleToggleQuestionCollapse(q.id);
                          }
                        }}
                        title={isQuestionCollapsed ? 'Nhấn để mở rộng câu hỏi' : 'Nhấn để thu gọn câu hỏi'}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className="question-collapse-icon" aria-hidden="true">
                            {isQuestionCollapsed ? '▶' : '▼'}
                          </span>
                          <span className="question-number-badge">Câu {idx + 1}</span>

                          {/* Audio Jump Button on Question Badge in Practice Mode */}
                          {!isExam && segment && (
                            <button
                              type="button"
                              className="question-audio-jump-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                seekTo(segment.start_ms / 1000);
                              }}
                              title={`Nhảy tới đoạn nghe câu này [${formatTimestamp(segment.start_ms)}]`}
                              aria-label={`Nghe đoạn audio câu ${idx + 1}`}
                            >
                              <span className="play-triangle-small">▶</span>
                              <span>{formatTimestamp(segment.start_ms)}</span>
                            </button>
                          )}

                          {isQuestionCollapsed && selectedKey && (
                            <span className="collapsed-selected-badge">
                              Đã chọn: {selectedKey}
                            </span>
                          )}
                        </div>

                        {!isSubmitted && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleFlag(q.id);
                            }}
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

                      {/* Question Prompt */}
                      <p className="question-prompt-text">{q.question_text}</p>

                      {/* Options & Details: Collapsible */}
                      {!isQuestionCollapsed && (
                        <>
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

                          {/* Scratchpad Note-Taking (Practice Mode Only) */}
                          {!isExam && (
                            <div className="question-scratchpad-wrap">
                              <textarea
                                className="question-scratchpad-input"
                                placeholder="📝 Ghi chú nháp từ khóa... (Enter để xuống dòng)"
                                rows={1}
                                value={notes[q.id] || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setNotes(prev => ({ ...prev, [q.id]: val }));
                                  // Dynamic auto-expansion
                                  e.target.style.height = 'auto';
                                  e.target.style.height = `${Math.min(e.target.scrollHeight, 220)}px`;
                                }}
                                aria-label={`Ghi chú cho câu ${idx + 1}`}
                              />
                            </div>
                          )}

                          {/* Inline Collapsible Transcript & Clue (Practice Mode Only) */}
                          {!isExam && segment && (
                            <div className="inline-transcript-container">
                              <button
                                type="button"
                                className="inline-transcript-toggle-btn"
                                onClick={() => handleToggleTranscript(q.id)}
                                aria-expanded={isTranscriptOpen}
                              >
                                <span className="toggle-chevron">{isTranscriptOpen ? '▼' : '▶'}</span>
                                <span>{isTranscriptOpen ? 'Ẩn Lời Thoại & Manh Mối' : 'Xem Lời Thoại & Manh Mối'}</span>
                                {isSubmitted && <span className="clue-tag-subtle">🎯 Xem giải thích</span>}
                              </button>

                              {isTranscriptOpen && (
                                <div className="inline-transcript-box">
                                  <div className="inline-transcript-toolbar">
                                    <span className="transcript-time-pill">
                                      [{formatTimestamp(segment.start_ms)} – {formatTimestamp(segment.end_ms)}]
                                    </span>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                      <button
                                        type="button"
                                        className="secondary-btn"
                                        onClick={() => seekTo(segment.start_ms / 1000)}
                                        style={{ padding: '4px 10px', fontSize: 'var(--fs-xs)', fontWeight: 600 }}
                                      >
                                        ▶ Nghe đoạn này
                                      </button>
                                      <button
                                        type="button"
                                        className="secondary-btn"
                                        onClick={() => handleToggleVietnamese(q.id)}
                                        style={{ padding: '4px 10px', fontSize: 'var(--fs-xs)', fontWeight: 600 }}
                                      >
                                        {isViOpen ? 'Ẩn Bản Dịch' : 'Hiện Bản Dịch'}
                                      </button>
                                    </div>
                                  </div>

                                  <div className="inline-transcript-text-body">
                                    <p className="transcript-body-en">{segment.text_en}</p>
                                    {isViOpen && segment.text_vi && (
                                      <p className="transcript-body-vi">{segment.text_vi}</p>
                                    )}
                                  </div>

                                  {/* Question Clue Highlight Box */}
                                  <div className="inline-clue-highlight">
                                    <span className="clue-highlight-title">🎯 Manh mối Câu {idx + 1}:</span>
                                    <span className="clue-highlight-content">{q.explanation_vi}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
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
