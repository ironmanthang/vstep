import React from 'react';
import type { ListeningScoreResult } from '../types';

interface ListeningHeaderProps {
  title: string;
  difficulty: string | number;
  isExam: boolean;
  syncWarning: string | null;
  isSubmitted: boolean;
  scoreResult: ListeningScoreResult | null;
  onReset: () => void;
}

export const ListeningHeader: React.FC<ListeningHeaderProps> = ({
  title,
  difficulty,
  isExam,
  syncWarning,
  isSubmitted,
  scoreResult,
  onReset,
}) => {
  return (
    <>
      {/* Header */}
      <div className="runner-header">
        <div className="runner-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className={`badge ${isExam ? 'badge-gold' : 'badge-primary'}`}>
              {isExam ? 'Chế Độ Thi Thử (Exam Mode)' : 'Chế Độ Luyện Tập (Practice)'}
            </span>
            <span className="badge badge-emerald">Bậc {difficulty}</span>
          </div>
          <h2 style={{ fontSize: 'var(--fs-xl)', fontWeight: 800, margin: '4px 0 0 0' }}>
            {title}
          </h2>
        </div>
      </div>

      {/* Non-blocking sync warning if network failed */}
      {syncWarning && (
        <div
          style={{
            padding: '8px 14px',
            background: 'var(--bg-subtle)',
            borderLeft: '3px solid var(--gold)',
            borderRadius: 'var(--radius-sm)',
            fontSize: 'var(--fs-xs)',
            color: 'var(--text-secondary)',
            marginBottom: 'var(--space-3)',
          }}
        >
          {syncWarning}
        </div>
      )}

      {/* Score Result Banner if submitted */}
      {isSubmitted && scoreResult && (
        <div className="score-result-card">
          <span className="badge badge-emerald" style={{ fontSize: 'var(--fs-xs)' }}>
            Kết Quả Chấm Điểm
          </span>
          <div className="score-number-display">{scoreResult.scoreOutOf10} / 10</div>
          <p style={{ margin: 0, fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>
            Đúng <strong>{scoreResult.correctCount}</strong> trên tổng số{' '}
            <strong>{scoreResult.totalQuestions}</strong> câu hỏi.
          </p>
          <div className="score-actions-inline">
            <button
              type="button"
              className="secondary-btn score-reset-btn"
              onClick={onReset}
            >
              🔄 Làm Lại Bài Này
            </button>
          </div>
        </div>
      )}
    </>
  );
};
