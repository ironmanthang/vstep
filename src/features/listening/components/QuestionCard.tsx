import React from 'react';
import type { ListeningTest } from '../types';

export interface QuestionCardProps {
  question: ListeningTest['questions'][number];
  questionIndex: number;
  selectedKey?: 'A' | 'B' | 'C' | 'D';
  isFlagged: boolean;
  isSubmitted: boolean;
  isExam: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onSelectOption: (optionKey: 'A' | 'B' | 'C' | 'D') => void;
  onToggleFlag: () => void;
  segment?: ListeningTest['transcript'][number] | null;
  onSeekTo: (seconds: number) => void;
  note: string;
  onChangeNote: (note: string) => void;
  isTranscriptOpen: boolean;
  onToggleTranscript: () => void;
  isVietnameseOpen: boolean;
  onToggleVietnamese: () => void;
  ref?: React.Ref<HTMLDivElement>;
}

function formatTimestamp(ms: number): string {
  const totalSecs = Math.floor(ms / 1000);
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question: q,
  questionIndex: idx,
  selectedKey,
  isFlagged,
  isSubmitted,
  isExam,
  isCollapsed,
  onToggleCollapse,
  onSelectOption,
  onToggleFlag,
  segment,
  onSeekTo,
  note,
  onChangeNote,
  isTranscriptOpen,
  onToggleTranscript,
  isVietnameseOpen,
  onToggleVietnamese,
  ref,
}) => {
  const isCorrect = selectedKey === q.correct_key;

  return (
    <div
      ref={ref}
      className={`question-card ${isCollapsed ? 'question-card-collapsed' : ''}`}
    >
      {/* Card Header with Question Badge and Jump Button */}
      <div
        className="question-card-header"
        onClick={onToggleCollapse}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggleCollapse();
          }
        }}
        title={isCollapsed ? 'Nhấn để mở rộng câu hỏi' : 'Nhấn để thu gọn câu hỏi'}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="question-collapse-icon" aria-hidden="true">
            {isCollapsed ? '▶' : '▼'}
          </span>
          <span className="question-number-badge">Câu {idx + 1}</span>

          {/* Audio Jump Button on Question Badge in Practice Mode */}
          {!isExam && segment && (
            <button
              type="button"
              className="question-audio-jump-btn"
              onClick={(e) => {
                e.stopPropagation();
                onSeekTo(segment.start_ms / 1000);
              }}
              title={`Nhảy tới đoạn nghe câu này [${formatTimestamp(segment.start_ms)}]`}
              aria-label={`Nghe đoạn audio câu ${idx + 1}`}
            >
              <span className="play-triangle-small">▶</span>
              <span>{formatTimestamp(segment.start_ms)}</span>
            </button>
          )}

          {isCollapsed && selectedKey && (
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
              onToggleFlag();
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
      {!isCollapsed && (
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
                  onClick={() => onSelectOption(opt.key)}
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
                value={note}
                onChange={(e) => {
                  onChangeNote(e.target.value);
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
                onClick={onToggleTranscript}
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
                        onClick={() => onSeekTo(segment.start_ms / 1000)}
                        style={{ padding: '4px 10px', fontSize: 'var(--fs-xs)', fontWeight: 600 }}
                      >
                        ▶ Nghe đoạn này
                      </button>
                      <button
                        type="button"
                        className="secondary-btn"
                        onClick={onToggleVietnamese}
                        style={{ padding: '4px 10px', fontSize: 'var(--fs-xs)', fontWeight: 600 }}
                      >
                        {isVietnameseOpen ? 'Ẩn Bản Dịch' : 'Hiện Bản Dịch'}
                      </button>
                    </div>
                  </div>

                  <div className="inline-transcript-text-body">
                    <p className="transcript-body-en">{segment.text_en}</p>
                    {isVietnameseOpen && segment.text_vi && (
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
  );
};
