import React from 'react';

interface PassageGroupHeaderProps {
  title: string;
  startMs: number;
  endMs: number;
  isExam: boolean;
  onPlayPassage?: () => void;
  onScrollToFirst?: () => void;
}

function formatTime(ms: number): string {
  const totalSecs = Math.floor(ms / 1000);
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export const PassageGroupHeader: React.FC<PassageGroupHeaderProps> = ({
  title,
  startMs,
  endMs,
  isExam,
  onPlayPassage,
  onScrollToFirst,
}) => {
  return (
    <div className="passage-group-card">
      <div className="passage-group-content">
        <div
          className="passage-group-title-wrap"
          onClick={onScrollToFirst}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onScrollToFirst?.();
            }
          }}
          title="Nhấn để cuộn đến câu đầu tiên của đoạn"
        >
          <span className="passage-badge-icon">🎧</span>
          <span className="passage-group-title">{title}</span>
          {!isExam && (
            <span className="passage-group-time-pill">
              {formatTime(startMs)} – {formatTime(endMs)}
            </span>
          )}
        </div>

        {!isExam && onPlayPassage && (
          <button
            type="button"
            className="passage-group-play-btn"
            onClick={(e) => {
              e.stopPropagation();
              onPlayPassage();
            }}
            aria-label={`Phát audio ${title}`}
          >
            <span className="play-triangle">▶</span>
            <span>Nghe đoạn này</span>
          </button>
        )}
      </div>
    </div>
  );
};
