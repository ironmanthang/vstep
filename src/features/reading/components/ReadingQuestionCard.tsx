import { useRef, useLayoutEffect, useEffect, useCallback, forwardRef } from 'react';
import type { ReadingPassage } from '../types';
import { renderInlineMarkdown } from '../utils/inlineMarkdown';
import './ReadingQuestionCard.css';

type QuestionItem = ReadingPassage['questions'][0];

interface ReadingQuestionCardProps {
  question: QuestionItem;
  questionIndex: number; // 0 to 39
  selectedKey?: 'A' | 'B' | 'C' | 'D';
  isFlagged: boolean;
  isSubmitted: boolean;
  isExam: boolean;
  isActive: boolean;
  isClueRevealed: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onSelectOption: (key: 'A' | 'B' | 'C' | 'D') => void;
  onToggleFlag: () => void;
  onToggleClue: () => void;
  note: string;
  onChangeNote: (note: string) => void;
}

const QUESTION_TYPE_LABELS: Record<QuestionItem['type'], { label: string; badgeClass: string }> = {
  main_idea: { label: 'Ý chính', badgeClass: 'badge-primary' },
  vocab_in_context: { label: 'Từ vựng ngữ cảnh', badgeClass: 'badge-emerald' },
  factual_detail: { label: 'Chi tiết bài đọc', badgeClass: 'badge-purple' },
  negative_fact: { label: 'Thông tin không đúng (NOT/EXCEPT)', badgeClass: 'badge-gold' },
  inference: { label: 'Suy luận', badgeClass: 'badge-primary' },
  author_attitude: { label: 'Thái độ tác giả', badgeClass: 'badge-gold' },
  sentence_insertion: { label: 'Chèn câu [A]-[D]', badgeClass: 'badge-emerald' },
};

export const ReadingQuestionCard = forwardRef<HTMLDivElement, ReadingQuestionCardProps>(
  (
    {
      question,
      questionIndex,
      selectedKey,
      isFlagged,
      isSubmitted,
      isExam,
      isActive,
      isClueRevealed,
      isCollapsed,
      onToggleCollapse,
      onSelectOption,
      onToggleFlag,
      onToggleClue,
      note,
      onChangeNote,
    },
    ref
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = useCallback(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 220)}px`;
    }, []);

    useLayoutEffect(() => {
      adjustHeight();
    }, [note, adjustHeight]);

    useEffect(() => {
      window.addEventListener('resize', adjustHeight);
      return () => window.removeEventListener('resize', adjustHeight);
    }, [adjustHeight]);

    const typeMeta = QUESTION_TYPE_LABELS[question.type] || {
      label: 'Câu hỏi đọc hiểu',
      badgeClass: 'badge-primary',
    };

    const isCorrect = isSubmitted && selectedKey === question.correct_key;
    const isWrong = isSubmitted && selectedKey && selectedKey !== question.correct_key;

    const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const optionClickTimerRef = useRef<{
      timer: ReturnType<typeof setTimeout>;
      key: 'A' | 'B' | 'C' | 'D';
    } | null>(null);

    useEffect(() => {
      return () => {
        if (clickTimerRef.current) {
          clearTimeout(clickTimerRef.current);
        }
        if (optionClickTimerRef.current) {
          clearTimeout(optionClickTimerRef.current.timer);
        }
      };
    }, []);

    const handleClick = (e: React.MouseEvent) => {
      // If user is double-clicking, cancel pending collapse so double-click (e.g. dictionary lookup) proceeds
      if (e.detail > 1) {
        if (clickTimerRef.current) {
          clearTimeout(clickTimerRef.current);
          clickTimerRef.current = null;
        }
        return;
      }

      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
      }

      clickTimerRef.current = setTimeout(() => {
        clickTimerRef.current = null;
        // If user was highlighting/selecting text (e.g. for dictionary lookup), don't collapse
        const sel = window.getSelection();
        if (sel && !sel.isCollapsed && sel.toString().trim()) {
          return;
        }
        onToggleCollapse();
      }, 220);
    };

    const handleDoubleClick = () => {
      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
        clickTimerRef.current = null;
      }
    };

    const handleOptionClick = (
      e: React.MouseEvent,
      key: 'A' | 'B' | 'C' | 'D'
    ) => {
      e.stopPropagation();
      if (isSubmitted) return;

      const target = e.target as HTMLElement;
      const isKeyBadge = Boolean(target.closest('.rq-option-key'));
      const isText = Boolean(target.closest('.rq-option-text'));

      // If clicking the letter badge or outside the text (instant selection with 0ms delay)
      if (isKeyBadge || !isText) {
        if (optionClickTimerRef.current) {
          clearTimeout(optionClickTimerRef.current.timer);
          optionClickTimerRef.current = null;
        }
        onSelectOption(key);
        return;
      }

      // If clicking on the option text, debounce (220ms) so double-clicking to translate doesn't toggle answer
      if (e.detail > 1) {
        if (optionClickTimerRef.current) {
          clearTimeout(optionClickTimerRef.current.timer);
          optionClickTimerRef.current = null;
        }
        return;
      }

      if (optionClickTimerRef.current) {
        clearTimeout(optionClickTimerRef.current.timer);
      }

      optionClickTimerRef.current = {
        key,
        timer: setTimeout(() => {
          optionClickTimerRef.current = null;
          onSelectOption(key);
        }, 220),
      };
    };

    const cancelOptionTimer = () => {
      if (optionClickTimerRef.current) {
        clearTimeout(optionClickTimerRef.current.timer);
        optionClickTimerRef.current = null;
      }
    };

    return (
      <div
        ref={ref}
        id={`reading-question-${question.id}`}
        className={`reading-question-card ${isActive ? 'card-active' : ''} ${
          isCollapsed ? 'card-collapsed' : ''
        } ${
          isSubmitted ? (isCorrect ? 'result-correct' : isWrong ? 'result-wrong' : 'result-unanswered') : ''
        }`}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        title={isCollapsed ? 'Nhấn để mở rộng câu hỏi' : 'Nhấn để thu gọn câu hỏi'}
      >
        {/* Card Header */}
        <div className="rq-header">
          <div className="rq-header-left">
            <span className="rq-collapse-icon" aria-hidden="true">
              {isCollapsed ? '▶' : '▼'}
            </span>
            <span className="rq-number">Câu {questionIndex + 1}</span>
            <span className={`badge ${typeMeta.badgeClass} rq-type-badge`}>
              {typeMeta.label}
            </span>
            {isCollapsed && selectedKey && (
              <span className="rq-collapsed-selected-badge">
                Đã chọn: {selectedKey}
              </span>
            )}
          </div>

          <div className="rq-header-actions">
            {/* Clue button: Jump to clue in passage (Hidden during timed exam) */}
            {(!isExam || isSubmitted) && question.clue_sentence && (
              <button
                type="button"
                className={`rq-clue-btn ${isClueRevealed ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleClue();
                }}
                title={isClueRevealed ? 'Ẩn dẫn chứng' : 'Xem dẫn chứng tương ứng trong bài đọc'}
              >
                🔍 Xem dẫn chứng
              </button>
            )}

            {/* Flag Button */}
            {!isSubmitted && (
              <button
                type="button"
                className={`rq-flag-btn ${isFlagged ? 'flagged' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFlag();
                }}
                title={isFlagged ? 'Bỏ cắm cờ xem lại' : 'Cắm cờ xem lại'}
                aria-label="Cắm cờ xem lại"
              >
                {isFlagged ? '🚩 Đã gắn cờ' : '🏳 Cắm cờ'}
              </button>
            )}
          </div>
        </div>

        {/* Question Prompt */}
        <div className="rq-prompt">{renderInlineMarkdown(question.question_text, false)}</div>

        {/* Collapsible Content: Options, Explanations, Scratchpad Notes */}
        {!isCollapsed && (
          <>
            {/* 4 Multiple Choice Options */}
            <div className="rq-options-list">
              {question.options.map((opt) => {
                const isSelected = selectedKey === opt.key;
                const isThisCorrect = isSubmitted && opt.key === question.correct_key;
                const isThisWrongSelected = isSubmitted && isSelected && !isThisCorrect;

                let optionClass = '';
                if (isSelected) optionClass += ' selected';
                if (isThisCorrect) optionClass += ' option-correct';
                if (isThisWrongSelected) optionClass += ' option-wrong';

                return (
                  <button
                    key={opt.key}
                    type="button"
                    className={`rq-option-row ${optionClass}`}
                    onClick={(e) => handleOptionClick(e, opt.key)}
                    onMouseDown={(e) => {
                      if (e.detail > 1) cancelOptionTimer();
                    }}
                    onDoubleClick={cancelOptionTimer}
                    disabled={isSubmitted}
                  >
                    <span className="rq-option-key">{opt.key}</span>
                    <span className="rq-option-text">{opt.text}</span>
                    {isThisCorrect && <span className="rq-feedback-mark">✓</span>}
                    {isThisWrongSelected && <span className="rq-feedback-mark">✗</span>}
                  </button>
                );
              })}
            </div>

            {/* Submitted Explanations & Paraphrase Analysis */}
            {isSubmitted && (
              <div
                className="rq-explanation-box"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="rq-explanation-title">
                  💡 Giải Thích Đáp Án: <strong>{question.correct_key}</strong>
                </div>
                <div className="rq-explanation-content">{question.explanation_vi}</div>

                {/* Paraphrase Mapping */}
                {question.paraphrase_analysis && (
                  <div className="rq-paraphrase-card">
                    <div className="rq-paraphrase-header">Phân Tích Paraphrase (Đối chiếu từ vựng):</div>
                    <div className="rq-paraphrase-grid">
                      <div className="rq-paraphrase-col">
                        <span className="rq-col-label">Trong câu hỏi:</span>
                        <span className="rq-col-val">{question.paraphrase_analysis.question_phrase}</span>
                      </div>
                      <div className="rq-paraphrase-arrow">⇄</div>
                      <div className="rq-paraphrase-col">
                        <span className="rq-col-label">Trong bài đọc:</span>
                        <span className="rq-col-val">{question.paraphrase_analysis.passage_phrase}</span>
                      </div>
                    </div>
                    {question.paraphrase_analysis.explanation && (
                      <p className="rq-paraphrase-note">{question.paraphrase_analysis.explanation}</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Scratchpad Note-Taking (Practice Mode Only - Parity with Listening) */}
            {!isExam && (
              <div
                className="rq-notes-wrapper"
                onClick={(e) => e.stopPropagation()}
              >
                <textarea
                  ref={textareaRef}
                  className="rq-note-textarea"
                  placeholder="📝 Ghi chú nháp từ khóa... (Enter để xuống dòng)"
                  rows={1}
                  value={note}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    onChangeNote(e.target.value);
                    adjustHeight();
                  }}
                  aria-label={`Ghi chú cho câu ${questionIndex + 1}`}
                />
              </div>
            )}
          </>
        )}
      </div>
    );
  }
);

ReadingQuestionCard.displayName = 'ReadingQuestionCard';
