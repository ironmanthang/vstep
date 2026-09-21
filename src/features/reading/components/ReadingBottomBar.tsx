import React, { useState, useEffect, useRef } from 'react';
import type { ReadingPassage, ReadingScoreResult } from '../types';
import { ReadingQuestionPalette } from './ReadingQuestionPalette';
import './ReadingBottomBar.css';

export interface ReadingBottomBarProps {
  passages: ReadingPassage[];
  activePassageIndex: number;
  answers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  flaggedQuestions: Set<string>;
  activeQuestionId: string | null;
  isSubmitted: boolean;
  scoreResult?: ReadingScoreResult | null;
  isExam?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
  onSelectPassage: (index: number) => void;
  onSelectQuestion: (questionId: string) => void;
  onSubmit: () => void;
  onReset: () => void;
}

export const ReadingBottomBar: React.FC<ReadingBottomBarProps> = ({
  passages,
  activePassageIndex,
  answers,
  flaggedQuestions,
  activeQuestionId,
  isSubmitted,
  scoreResult,
  isExam = false,
  isCollapsed: controlledCollapsed,
  onToggleCollapse,
  onSelectPassage,
  onSelectQuestion,
  onSubmit,
  onReset,
}) => {
  const [isOverviewOpen, setIsOverviewOpen] = useState<boolean>(false);
  const [internalCollapsed, setInternalCollapsed] = useState<boolean>(false);
  const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

  const handleToggle = (next: boolean) => {
    if (onToggleCollapse) {
      onToggleCollapse(next);
    } else {
      setInternalCollapsed(next);
    }
  };

  const currentPassage = passages[activePassageIndex] || passages[0];
  const answeredCount = Object.keys(answers).length;
  const totalCount = passages.reduce((acc, p) => acc + p.questions.length, 0);

  // Calculate starting index offset for current passage questions
  const passageStartOffset = passages
    .slice(0, activePassageIndex)
    .reduce((acc, p) => acc + p.questions.length, 0);

  const questionsSectionRef = useRef<HTMLDivElement>(null);

  // Reset horizontal track scroll when changing passages
  useEffect(() => {
    if (questionsSectionRef.current) {
      questionsSectionRef.current.scrollLeft = 0;
    }
  }, [activePassageIndex]);

  // Ensure active question stays within visible viewport
  useEffect(() => {
    if (!questionsSectionRef.current || !activeQuestionId) return;
    const activeBtn = questionsSectionRef.current.querySelector<HTMLButtonElement>('.r-bbar-qbtn.active');
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
  }, [activeQuestionId, activePassageIndex]);

  // Close modal on Escape key
  useEffect(() => {
    if (!isOverviewOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOverviewOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOverviewOpen]);

  return (
    <>
      {isCollapsed ? (
        /* Floating Compact Corner Pill - Zero document flow blockage */
        <div className="r-bbar-collapsed-floater">
          <button
            type="button"
            className="r-bbar-floating-trigger"
            onClick={() => handleToggle(false)}
            title="Mở rộng thanh câu hỏi"
            aria-label="Mở rộng thanh câu hỏi"
          >
            <span className="r-bbar-float-arrow">▲</span>
            <span className="r-bbar-float-text">Bài {activePassageIndex + 1}</span>
            <span className={`r-bbar-float-badge ${isSubmitted && scoreResult ? 'score' : ''}`}>
              {isSubmitted && scoreResult
                ? `${scoreResult.scoreOutOf10}/10`
                : `${answeredCount}/${totalCount}`}
            </span>
          </button>
        </div>
      ) : (
        /* Expanded Full Bar */
        <nav className="reading-bottom-bar-wrapper" aria-label="Điều hướng đề thi đọc">
          <div className="reading-bottom-bar-content">
            {/* Question Track for Current Passage */}
            <div className="r-bbar-questions-section" ref={questionsSectionRef}>
              <div className="r-bbar-questions-list">
                {currentPassage?.questions.map((q, qIdx) => {
                  const globalNumber = passageStartOffset + qIdx + 1;
                  const isAnswered = Boolean(answers[q.id]);
                  const isFlagged = flaggedQuestions.has(q.id);
                  const isActive = activeQuestionId === q.id;

                  let scoreClass = '';
                  if (isSubmitted) {
                    scoreClass = answers[q.id] === q.correct_key ? 'score-correct' : 'score-wrong';
                  }

                  return (
                    <button
                      key={q.id}
                      type="button"
                      className={`r-bbar-qbtn ${isAnswered ? 'answered' : ''} ${
                        isFlagged ? 'flagged' : ''
                      } ${isActive ? 'active' : ''} ${scoreClass}`}
                      onClick={() => onSelectQuestion(q.id)}
                      title={`Câu ${globalNumber} (Bài ${activePassageIndex + 1})`}
                      aria-label={`Chuyển đến câu ${globalNumber}`}
                    >
                      {globalNumber}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Right: All-Questions Overview & Submit Actions */}
            <div className="r-bbar-actions">
              {isSubmitted && scoreResult && (
                <div
                  className="r-bbar-score-badge"
                  title={`Điểm: ${scoreResult.scoreOutOf10}/10 • Đúng ${scoreResult.correctCount}/${scoreResult.totalQuestions} câu`}
                >
                  <span className="r-bbar-score-label">Điểm</span>
                  <span className="r-bbar-score-val">{scoreResult.scoreOutOf10}/10</span>
                  <span className="r-bbar-score-detail">
                    ({scoreResult.correctCount}/{scoreResult.totalQuestions})
                  </span>
                </div>
              )}

              <button
                type="button"
                className="r-bbar-overview-btn"
                onClick={() => setIsOverviewOpen(true)}
                title="Xem bảng tổng quan toàn bộ 40 câu hỏi"
              >
                <span>⊞ Bảng 40 câu</span>
                <span className="r-bbar-overview-badge">
                  {answeredCount}/{totalCount}
                </span>
              </button>

              {isSubmitted ? (
                <button
                  type="button"
                  className="secondary-btn r-bbar-submit-btn"
                  onClick={onReset}
                >
                  🔄 Làm Lại
                </button>
              ) : (
                <button
                  type="button"
                  className="primary-btn r-bbar-submit-btn"
                  onClick={onSubmit}
                  disabled={answeredCount === 0 && !isExam}
                >
                  Nộp Bài ({answeredCount}/{totalCount})
                </button>
              )}

              <button
                type="button"
                className="r-bbar-toggle-btn collapse"
                onClick={() => handleToggle(true)}
                title="Thu gọn thanh câu hỏi"
                aria-label="Thu gọn thanh câu hỏi"
              >
                <span className="r-bbar-arrow-icon">▼</span>
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* 4. Full 40-Question Modal Drawer */}
      {isOverviewOpen && (
        <div
          className="reading-all-questions-modal"
          onClick={() => setIsOverviewOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="reading-all-questions-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="reading-all-dialog-header">
              <span className="reading-all-dialog-title">
                Bảng Câu Hỏi Toàn Bộ ({totalCount} Câu)
              </span>
              <button
                type="button"
                className="reading-all-dialog-close"
                onClick={() => setIsOverviewOpen(false)}
                aria-label="Đóng"
              >
                ✕
              </button>
            </div>
            <div className="reading-all-dialog-body">
              <ReadingQuestionPalette
                passages={passages}
                answers={answers}
                flaggedQuestions={flaggedQuestions}
                isSubmitted={isSubmitted}
                isExam={isExam}
                activeQuestionId={activeQuestionId}
                activePassageIndex={activePassageIndex}
                onSelectPassage={(idx) => onSelectPassage(idx)}
                onSelectQuestion={(qId) => {
                  onSelectQuestion(qId);
                  setIsOverviewOpen(false);
                }}
                onSubmit={() => {
                  setIsOverviewOpen(false);
                  onSubmit();
                }}
                onReset={() => {
                  setIsOverviewOpen(false);
                  onReset();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
