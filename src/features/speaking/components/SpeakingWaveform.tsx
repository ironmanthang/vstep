import React, { useEffect, useRef } from 'react';
import type { AudioRecordingSession } from '../services/speakingAudio';

interface SpeakingWaveformProps {
  session: AudioRecordingSession | null;
  recordingState: 'idle' | 'recording' | 'recorded';
}

export const SpeakingWaveform: React.FC<SpeakingWaveformProps> = ({ session, recordingState }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (recordingState !== 'recording' || !session) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      // Draw flat baseline
      ctx.fillStyle = '#141210';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#475569';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
      return;
    }

    const analyser = session.getAnalyser();
    if (!analyser) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      analyser.getByteTimeDomainData(dataArray);

      ctx.fillStyle = '#141210';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#ef4444';
      ctx.beginPath();

      const sliceWidth = (canvas.width * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [recordingState, session]);

  return (
    <div className="speaking-waveform-card">
      <canvas ref={canvasRef} width={360} height={120} className="speaking-waveform-canvas" />
      <div className="speaking-record-indicator">
        <span className={`speaking-record-dot ${recordingState === 'recording' ? 'recording' : ''}`} />
        <span>
          {recordingState === 'recording'
            ? 'Đang thu âm microphone thời gian thực...'
            : recordingState === 'recorded'
            ? 'Đã hoàn tất đoạn thu âm'
            : 'Sẵn sàng ghi âm'}
        </span>
      </div>
    </div>
  );
};
