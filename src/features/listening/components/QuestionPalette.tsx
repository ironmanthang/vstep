import React from 'react';
import type { ListeningTest } from '../types';
import './QuestionPalette.css';

export interface QuestionPaletteProps {
  questions: ListeningTest['questions'];
  answers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  flaggedQuestions: Set<string>;
  isSubmitted: boolean;
  onSelectQuestion: (questionId: string) => void;
  onSubmit: () => void;
  onReset: () => void;
  isExam?: boolean;
}

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  questions,
  answers,
  flaggedQuestions,
  isSubmitted,
  onSelectQuestion,
  onSubmit,
  onReset,
  isExam = false,
}) => {
  const answeredCount = Object.keys(answers).length;

  return (
    <aside className="palette-sidebar">
      <div className="card-surface" style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 700 }}>Danh Sách Câu Hỏi</span>
          <span className="badge badge-primary" style={{ fontSize: '10px' }}>
            {answeredCount}/{questions.length}
          </span>
        </div>

        <div className="palette-grid">
          {questions.map((q, idx) => {
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
                onClick={() => onSelectQuestion(q.id)}
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

        {/* Action Button: Sticky Submit or Retake */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--space-2)' }}>
          {isSubmitted ? (
            <button
              type="button"
              className="secondary-btn"
              onClick={onReset}
              style={{ width: '100%', justifyContent: 'center', fontWeight: 700, fontSize: 'var(--fs-xs)' }}
            >
              🔄 Làm Lại Bài Này
            </button>
          ) : (
            <button
              type="button"
              className="primary-btn"
              onClick={onSubmit}
              disabled={answeredCount === 0 && !isExam}
              style={{ width: '100%', justifyContent: 'center', fontWeight: 700, fontSize: 'var(--fs-xs)' }}
            >
              Nộp Bài ({answeredCount}/{questions.length})
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
