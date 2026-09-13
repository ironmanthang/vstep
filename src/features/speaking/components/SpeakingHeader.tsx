import React from 'react';
import type { SpeakingMode, SpeakingEvaluationResult as ISpeakingEvaluationResult } from '../types';

interface SpeakingHeaderProps {
  title: string;
  mode: SpeakingMode;
  isPreparing: boolean;
  secondsRemaining: number;
  evaluationResult: ISpeakingEvaluationResult | null;
  onOpenResult: () => void;
  onExit?: () => void;
}

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export const SpeakingHeader: React.FC<SpeakingHeaderProps> = ({
  title,
  mode,
  isPreparing,
  secondsRemaining,
  evaluationResult,
  onOpenResult,
  onExit,
}) => {
  return (
    <div className="speaking-runner-header">
      <div className="speaking-header-title-box">
        <h1>{title}</h1>
        <div className="speaking-header-subtitle">
          {mode === 'exam'
            ? 'Phòng thi máy tính chuẩn VSTEP (12 phút)'
            : 'Chế độ luyện tập tương tác (Scaffolding B1)'}
        </div>
      </div>

      <div className="speaking-header-controls">
        {mode === 'exam' && (
          <div
            className={`speaking-timer-widget ${
              isPreparing ? 'prep-phase' : 'speaking-phase'
            }`}
          >
            <span>{isPreparing ? 'Chuẩn bị:' : 'Ghi âm:'}</span>
            <span className="speaking-timer-digits">{formatTime(secondsRemaining)}</span>
          </div>
        )}

        {evaluationResult && (
          <button className="speaking-btn-evaluate" onClick={onOpenResult}>
            Xem Kết Quả ({evaluationResult.compositeScore.roundedScore.toFixed(1)})
          </button>
        )}

        {onExit && (
          <button className="speaking-re-record-btn" onClick={onExit}>
            Thoát
          </button>
        )}
      </div>
    </div>
  );
};
