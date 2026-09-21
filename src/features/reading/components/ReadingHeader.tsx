import React from 'react';

interface ReadingHeaderProps {
  title: string;
  isExam: boolean;
  examSecondsRemaining: number;
  syncWarning: string | null;
}

function formatSeconds(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export const ReadingHeader: React.FC<ReadingHeaderProps> = ({
  title,
  isExam,
  examSecondsRemaining,
  syncWarning,
}) => {
  return (
    <>
      {/* Runner Top Header - Rendered in Exam mode only */}
      {isExam && (
        <div className="reading-runner-header">
          <div className="reading-title-group">
            <h2 className="reading-main-title">{title}</h2>
          </div>

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
        </div>
      )}

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
    </>
  );
};
