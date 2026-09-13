import React, { useState } from 'react';
import { ALL_ULIS_SPEAKING_TESTS } from './data/mockTests';
import { SpeakingRunner } from './SpeakingRunner';
import type { SpeakingMode } from './speakingStorage';
import './SpeakingStudioPage.css';

export const SpeakingStudioPage: React.FC = () => {
  const [testIndex, setTestIndex] = useState<number>(0);
  const [mode, setMode] = useState<SpeakingMode>('practice');
  const [micStatus, setMicStatus] = useState<'unchecked' | 'ready' | 'error'>('unchecked');

  const currentTest = ALL_ULIS_SPEAKING_TESTS[testIndex] || ALL_ULIS_SPEAKING_TESTS[0];

  const handleTestMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((t) => t.stop());
      setMicStatus('ready');
    } catch {
      setMicStatus('error');
    }
  };

  return (
    <div className="speaking-studio-page">
      {/* Studio Header */}
      <div className="speaking-studio-header">
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>
            Phòng Thu Luyện Nói VSTEP (Speaking Studio)
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary, #a8a29e)', marginTop: 4, margin: 0 }}>
            Mô phỏng phòng thi máy tính Bộ GD&ĐT • Đích nhắm: <strong>Bậc 3 (B1) Đạt chuẩn đầu ra Đại học</strong>
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="speaking-studio-mode-toggle">
          <button
            type="button"
            className={`speaking-mode-btn ${mode === 'practice' ? 'active' : ''}`}
            onClick={() => setMode('practice')}
          >
            Chế Độ Luyện Tập (Scaffolding)
          </button>
          <button
            type="button"
            className={`speaking-mode-btn ${mode === 'exam' ? 'active' : ''}`}
            onClick={() => setMode('exam')}
          >
            Phòng Thi Chuẩn 12 Phút (Exam)
          </button>
        </div>
      </div>

      {/* Test Edition Selector Bar */}
      {ALL_ULIS_SPEAKING_TESTS.length > 0 && (
        <div className="speaking-edition-selector-bar">
          <span className="speaking-edition-label">Bộ Đề ULIS:</span>
          {ALL_ULIS_SPEAKING_TESTS.map((t, idx) => (
            <button
              key={t.id || idx}
              type="button"
              onClick={() => setTestIndex(idx)}
              className={`speaking-edition-btn ${testIndex === idx ? 'active' : ''}`}
            >
              Đề {idx + 1} (3 Part)
            </button>
          ))}

          <button type="button" className="speaking-mic-check-btn" onClick={handleTestMic}>
            {micStatus === 'ready' ? '✓ Micro sẵn sàng' : micStatus === 'error' ? '✕ Lỗi micro' : 'Kiểm tra micro'}
          </button>
        </div>
      )}

      {/* Unified Speaking Runner */}
      {currentTest && (
        <SpeakingRunner
          key={`${currentTest.id}_${mode}`}
          test={currentTest}
          mode={mode}
        />
      )}
    </div>
  );
};
