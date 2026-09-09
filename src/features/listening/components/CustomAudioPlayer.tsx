import React from 'react';
import type { ListeningMode } from '../types';
import './CustomAudioPlayer.css';

interface CustomAudioPlayerProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackRate: number;
  mode: ListeningMode;
  onTogglePlay: () => void;
  onSeekBy: (seconds: number) => void;
  onSeekTo: (seconds: number) => void;
  onSetRate: (rate: number) => void;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export const CustomAudioPlayer: React.FC<CustomAudioPlayerProps> = ({
  isPlaying,
  currentTime,
  duration,
  playbackRate,
  mode,
  onTogglePlay,
  onSeekBy,
  onSeekTo,
  onSetRate,
}) => {
  const isExam = mode === 'exam';
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isExam) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    onSeekTo(ratio * duration);
  };

  return (
    <div className={`custom-audio-player ${isExam ? 'exam-locked' : ''}`} role="region" aria-label="Bộ điều khiển bài nghe">
      {/* Progress Track & Timers */}
      <div className="audio-progress-row">
        <span className="audio-time-label">{formatTime(currentTime)}</span>
        <div
          className="audio-progress-track"
          onClick={handleTrackClick}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={currentTime}
          aria-label="Thanh tiến trình bài nghe"
        >
          <div className="audio-progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
        <span className="audio-time-label">{formatTime(duration)}</span>
      </div>

      {/* Main Controls Row */}
      <div className="audio-controls-row">
        <div className="playback-buttons-group">
          {/* Rewind -5s */}
          <button
            className="audio-btn-circle"
            onClick={() => onSeekBy(-5)}
            disabled={isExam}
            title={isExam ? 'Chế độ thi: Khóa tua audio' : 'Tua lại 5 giây (←)'}
            aria-label="Tua lùi 5 giây"
          >
            -5s
          </button>

          {/* Main Play / Pause Button */}
          <button
            className="audio-btn-circle play-main"
            onClick={onTogglePlay}
            title="Phát / Tạm dừng (Phím cách)"
            aria-label={isPlaying ? 'Tạm dừng audio' : 'Phát audio'}
          >
            {isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 3l14 9-14 9V3z" />
              </svg>
            )}
          </button>

          {/* Forward +5s */}
          <button
            className="audio-btn-circle"
            onClick={() => onSeekBy(5)}
            disabled={isExam}
            title={isExam ? 'Chế độ thi: Khóa tua audio' : 'Tua tới 5 giây (→)'}
            aria-label="Tua tiến 5 giây"
          >
            +5s
          </button>
        </div>

        {/* Speed & Keyboard Shortcuts */}
        <div className="audio-extra-controls">
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--fs-xs)' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Tốc độ:</span>
            <select
              className="speed-select"
              value={playbackRate}
              onChange={(e) => onSetRate(parseFloat(e.target.value))}
              disabled={isExam}
              aria-label="Chỉnh tốc độ phát audio"
            >
              <option value="0.5">0.5x</option>
              <option value="0.75">0.75x</option>
              <option value="1">1.0x (Chuẩn)</option>
              <option value="1.5">1.5x</option>
              <option value="2">2.0x</option>
            </select>
          </label>

          {!isExam && (
            <div className="desktop-shortcut-hint" title="Phím tắt trên máy tính">
              <span>Phím:</span>
              <kbd className="kbd-badge">Space</kbd>
              <kbd className="kbd-badge">←/→</kbd>
            </div>
          )}

          {isExam && (
            <span className="badge badge-gold" style={{ fontSize: '11px' }}>
              Quy chế thi: Phát 1 lần liên tục
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
