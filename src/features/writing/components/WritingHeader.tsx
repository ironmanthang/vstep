import React from 'react';
import type { WritingMode } from '../types';

interface WritingHeaderProps {
  title: string;
  institution: string;
  totalDurationMinutes: number;
  mode: WritingMode;
  secondsRemaining: number;
  onExit?: () => void;
}

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export const WritingHeader: React.FC<WritingHeaderProps> = ({
  title,
  institution,
  totalDurationMinutes,
  mode,
  secondsRemaining,
  onExit,
}) => {
  return (
    <div className="writing-runner-header">
      <div className="writing-header-title-box">
        <h1>{title}</h1>
        <div className="writing-header-subtitle">
          {institution} • Thời lượng: {totalDurationMinutes} phút • Barem B1 Bộ GD&ĐT
        </div>
      </div>

      <div className="writing-header-controls">
        {mode === 'exam' && (
          <div className={`writing-timer-widget ${secondsRemaining <= 300 ? 'urgent' : ''}`}>
            <span>⏱️ Thời gian còn:</span>
            <span className="writing-timer-digits">{formatTime(secondsRemaining)}</span>
          </div>
        )}

        {onExit && (
          <button type="button" className="writing-save-btn" onClick={onExit}>
            ✕ Thoát
          </button>
        )}
      </div>
    </div>
  );
};
