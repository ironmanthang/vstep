import React from 'react';
import './PassageGroupHeader.css';

interface PassageGroupHeaderProps {
  title: string;
  startMs: number;
  endMs: number;
  isExam: boolean;
  isCollapsed?: boolean;
  onPlayPassage?: () => void;
  onToggleCollapse?: () => void;
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
  isCollapsed = false,
  onPlayPassage,
  onToggleCollapse,
}) => {
  return (
    <div
      className="passage-group-card"
      onClick={onToggleCollapse}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggleCollapse?.();
        }
      }}
      title={isCollapsed ? 'Nhấn để mở rộng nhóm câu hỏi' : 'Nhấn để thu gọn nhóm câu hỏi'}
    >
      <div className="passage-group-content">
        <div
          className="passage-group-title-wrap"
          onClick={(e) => {
            e.stopPropagation();
            if (!isExam) {
              onPlayPassage?.();
            }
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              if (!isExam) {
                onPlayPassage?.();
              }
            }
          }}
          title={!isExam ? `Nhấn để nghe đoạn này [${formatTime(startMs)} – ${formatTime(endMs)}]` : undefined}
        >
          <span className="passage-badge-icon">🎧</span>
          <span className="passage-group-title">{title}</span>
          {!isExam && (
            <span className="passage-group-time-pill">
              {formatTime(startMs)} – {formatTime(endMs)}
            </span>
          )}
        </div>

        <div className="passage-group-collapse-cue">
          <span className="passage-toggle-chevron">{isCollapsed ? '▶' : '▼'}</span>
          <span className="passage-toggle-text">{isCollapsed ? 'Mở rộng' : 'Thu gọn'}</span>
        </div>
      </div>
    </div>
  );
};
