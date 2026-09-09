import React, { useState, useEffect, useRef } from 'react';
import type { ListeningTest } from '../types';
import './TranscriptPanel.css';

interface TranscriptPanelProps {
  test: ListeningTest;
  activeSubtitleIndex: number;
  showClues?: boolean;
  onPlaySegment: (index: number) => void;
}

function formatTimestamp(ms: number): string {
  const totalSecs = Math.floor(ms / 1000);
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export const TranscriptPanel: React.FC<TranscriptPanelProps> = ({
  test,
  activeSubtitleIndex,
  showClues = false,
  onPlaySegment,
}) => {
  const [showVietnamese, setShowVietnamese] = useState(true);
  const activeLineRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll active subtitle line into view
  useEffect(() => {
    if (activeLineRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [activeSubtitleIndex]);

  return (
    <div>
      <div className="transcript-controls-bar">
        <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', fontWeight: 600 }}>
          Nhấn vào từng dòng để phát đúng đoạn đó
        </span>
        <button
          className="secondary-btn"
          onClick={() => setShowVietnamese(prev => !prev)}
          style={{ padding: '2px 8px', fontSize: 'var(--fs-xs)' }}
        >
          {showVietnamese ? 'Ẩn Dịch Tiếng Việt' : 'Hiện Dịch Tiếng Việt'}
        </button>
      </div>

      <div className="transcript-panel">
        {test.transcript.map((line, idx) => {
          const isActive = idx === activeSubtitleIndex;
          const hasClue = showClues && Boolean(line.is_clue_for_question);

          return (
            <div
              key={idx}
              ref={isActive ? activeLineRef : null}
              className={`transcript-line-card ${isActive ? 'active-line' : ''}`}
              onClick={() => onPlaySegment(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onPlaySegment(idx);
                }
              }}
              aria-label={`Dòng thoại ${idx + 1} lúc ${formatTimestamp(line.start_ms)}`}
            >
              <div className="transcript-line-header">
                <span className="transcript-timestamp">
                  [{formatTimestamp(line.start_ms)} - {formatTimestamp(line.end_ms)}]
                </span>
                {hasClue && (
                  <span className="clue-tag">
                    🎯 Chứa Manh Mối ({line.is_clue_for_question})
                  </span>
                )}
              </div>

              <p className="transcript-text-en">{line.text_en}</p>

              {showVietnamese && line.text_vi && (
                <p className="transcript-text-vi">{line.text_vi}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
