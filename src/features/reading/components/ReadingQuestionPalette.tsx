import React from 'react';
import type { ReadingPassage } from '../types';
import './ReadingQuestionPalette.css';

export interface ReadingQuestionPaletteProps {
  passages: ReadingPassage[];
  answers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  flaggedQuestions: Set<string>;
  isSubmitted: boolean;
  isExam?: boolean;
  activeQuestionId: string | null;
  activePassageIndex: number;
  onSelectPassage: (index: number) => void;
  onSelectQuestion: (questionId: string) => void;
  onSubmit: () => void;
  onReset: () => void;
}

export const ReadingQuestionPalette: React.FC<ReadingQuestionPaletteProps> = ({
  passages,
  answers,
  flaggedQuestions,
  isSubmitted,
  isExam = false,
  activeQuestionId,
  activePassageIndex,
  onSelectPassage,
  onSelectQuestion,
  onSubmit,
  onReset,
}) => {
  // Flatten all questions with their passage index and question index
  const allQuestions = passages.flatMap((p, pIdx) =>
    p.questions.map((q, qLocalIdx) => ({
      ...q,
      passageIndex: pIdx,
      localIndex: qLocalIdx,
    }))
  );

  const answeredCount = Object.keys(answers).length;
  const totalCount = allQuestions.length;

  return (
    <aside className="reading-palette-sidebar">
      <div className="reading-palette-card">
        {/* Header */}
        <div className="r-palette-header">
          <span className="r-palette-title">Bảng Câu Hỏi</span>
          <span className="badge badge-primary r-palette-badge">
            {answeredCount} / {totalCount}
          </span>
        </div>

        {/* Passage Quick-Switcher Tabs */}
        <div className="r-palette-passage-tabs">
          {passages.map((p, pIdx) => {
            const passageQuestions = p.questions;
            const passageAnswered = passageQuestions.filter((q) => Boolean(answers[q.id])).length;
            const isCurrentPassage = activePassageIndex === pIdx;

            return (
              <button
                key={p.id || pIdx}
                type="button"
                className={`r-palette-ptab ${isCurrentPassage ? 'active' : ''}`}
                onClick={() => onSelectPassage(pIdx)}
                title={p.title}
              >
                <span>Bài {pIdx + 1}</span>
                <span className="r-ptab-count">
                  {passageAnswered}/{passageQuestions.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* 40-Question Palette Grid */}
        <div className="r-palette-grid">
          {allQuestions.map((q, globalIdx) => {
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
                className={`r-palette-btn ${isAnswered ? 'answered' : ''} ${
                  isFlagged ? 'flagged' : ''
                } ${isActive ? 'active' : ''} ${scoreClass}`}
                onClick={() => {
                  onSelectPassage(q.passageIndex);
                  onSelectQuestion(q.id);
                }}
                title={`Câu ${globalIdx + 1} (Bài ${q.passageIndex + 1})`}
                aria-label={`Chuyển đến câu ${globalIdx + 1}`}
              >
                {globalIdx + 1}
              </button>
            );
          })}
        </div>

        {/* Visual Legend */}
        <div className="r-palette-legend">
          <div className="r-legend-item">
            <span className="r-legend-dot answered" />
            <span>Đã trả lời</span>
          </div>
          <div className="r-legend-item">
            <span className="r-legend-dot flagged" />
            <span>Đã cắm cờ</span>
          </div>
          {isSubmitted && (
            <>
              <div className="r-legend-item">
                <span className="r-legend-dot correct" />
                <span>Đúng</span>
              </div>
              <div className="r-legend-item">
                <span className="r-legend-dot wrong" />
                <span>Sai</span>
              </div>
            </>
          )}
        </div>

        {/* Action Button: Nộp bài / Làm lại */}
        <div className="r-palette-action-wrap">
          {isSubmitted ? (
            <button
              type="button"
              className="secondary-btn r-submit-btn"
              onClick={onReset}
            >
              🔄 Làm Lại Bài Này
            </button>
          ) : (
            <button
              type="button"
              className="primary-btn r-submit-btn"
              onClick={onSubmit}
              disabled={answeredCount === 0 && !isExam}
            >
              Nộp Bài ({answeredCount}/{totalCount})
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
