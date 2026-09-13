import React from 'react';
import type { SpeakingMode } from '../speakingStorage';

interface SpeakingControlsProps {
  mode: SpeakingMode;
  activePart: 1 | 2 | 3;
  recordingState: 'idle' | 'recording' | 'recorded';
  audioUrl?: string;
  isSubmitting: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onReRecord: () => void;
  onEvaluateCurrentPart: () => void;
}

export const SpeakingControls: React.FC<SpeakingControlsProps> = ({
  mode,
  activePart,
  recordingState,
  audioUrl,
  isSubmitting,
  onStartRecording,
  onStopRecording,
  onReRecord,
  onEvaluateCurrentPart,
}) => {
  return (
    <div className="speaking-controls-bar">
      {recordingState === 'idle' && mode === 'practice' && (
        <button className="speaking-btn-record" onClick={onStartRecording}>
          Bắt Đầu Thu Âm Part {activePart}
        </button>
      )}

      {recordingState === 'recording' && (
        <button className="speaking-btn-stop" onClick={onStopRecording}>
          Dừng Thu Âm & Lưu Đoạn Nói
        </button>
      )}

      {recordingState === 'recorded' && (
        <div className="speaking-audio-preview">
          {audioUrl && <audio controls src={audioUrl} className="speaking-audio-player" />}
          {mode === 'practice' && (
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="speaking-re-record-btn" onClick={onReRecord}>
                Thu âm lại
              </button>
              <button
                className="speaking-btn-evaluate"
                style={{ flex: 1 }}
                onClick={onEvaluateCurrentPart}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'AI Đang Chấm Điểm...' : `Chấm Điểm Part ${activePart} (AI)`}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
