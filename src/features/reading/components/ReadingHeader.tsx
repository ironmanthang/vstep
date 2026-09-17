import React from 'react';
import type { ReadingScoreResult } from '../types';

interface ReadingHeaderProps {
  title: string;
  difficulty: string | number;
  passageCount: number;
  isExam: boolean;
  examSecondsRemaining: number;
  syncWarning: string | null;
  isSubmitted: boolean;
  scoreResult: ReadingScoreResult | null;
  onReset: () => void;
}

function formatSeconds(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export const ReadingHeader: React.FC<ReadingHeaderProps> = ({
  title,
  difficulty,
  passageCount,
  isExam,
  examSecondsRemaining,
  syncWarning,
  isSubmitted,
  scoreResult,
  onReset,
}) => {
  return (
    <>
      {/* Runner Top Header */}
      <div className="reading-runner-header">
        <div className="reading-title-group">
          <div className="reading-meta-row">
            <span className="badge badge-emerald">Bậc {difficulty}</span>
            <span className="badge badge-purple">{passageCount} Bài Đọc</span>
          </div>
          <h2 className="reading-main-title">{title}</h2>
        </div>

        {/* Timer Widget - Exam mode only */}
        {isExam && (
          <div
            className={`reading-timer-widget ${
              examSecondsRemaining < 300 ? 'exam-urgent' : ''
            }`}
          >
            <span>⏳ Còn lại:</span>
            <span className="timer-digits">
              {formatSeconds(examSecondsRemaining)}
            </span>
          </div>
        )}
      </div>

      {/* Sync Warning */}
      {syncWarning && (
        <div
          style={{
            padding: '8px 14px',
            background: 'var(--bg-subtle)',
            borderLeft: '3px solid var(--gold)',
            borderRadius: 'var(--radius-sm)',
            fontSize: 'var(--fs-xs)',
            color: 'var(--text-secondary)',
          }}
        >
          {syncWarning}
        </div>
      )}

      {/* Score Result Card if submitted */}
      {isSubmitted && scoreResult && (
        <div className="score-result-card">
          <span className="badge badge-emerald" style={{ fontSize: 'var(--fs-xs)' }}>
            Kết Quả Chấm Điểm
          </span>
          <div className="score-number-display">{scoreResult.scoreOutOf10} / 10</div>
          <p style={{ margin: 0, fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>
            Đúng <strong>{scoreResult.correctCount}</strong> trên tổng số{' '}
            <strong>{scoreResult.totalQuestions}</strong> câu hỏi.
            {isExam && scoreResult.timeSpentSeconds > 0 && (
              <>
                {' '}Thời gian làm bài:{' '}
                <strong>{formatSeconds(scoreResult.timeSpentSeconds)}</strong>.
              </>
            )}
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
