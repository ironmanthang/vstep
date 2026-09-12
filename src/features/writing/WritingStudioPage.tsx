import React, { useState } from 'react';
import { ALL_ULIS_WRITING_TESTS } from './data/mockTests';
import { WritingRunner } from './WritingRunner';
import type { WritingMode } from './writingStorage';
import './WritingStudioPage.css';

export const WritingStudioPage: React.FC = () => {
  const [testIndex, setTestIndex] = useState<number>(0);
  const [mode, setMode] = useState<WritingMode>('practice');

  const currentTest = ALL_ULIS_WRITING_TESTS[testIndex] || ALL_ULIS_WRITING_TESTS[0];

  return (
    <div className="writing-studio-page">
      {/* Studio Header */}
      <div className="writing-studio-header">
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>
            Phòng Luyện Viết VSTEP (Writing Studio)
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary, #a8a29e)', marginTop: 4, margin: 0 }}>
            Mô phỏng thi máy chuẩn Đại học Văn Lang & Bộ GD&ĐT • Đích nhắm: <strong>Bậc 3 (B1) Đạt chuẩn đầu ra</strong>
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="writing-studio-mode-toggle">
          <button
            type="button"
            className={`writing-mode-btn ${mode === 'practice' ? 'active' : ''}`}
            onClick={() => setMode('practice')}
          >
            🛠️ Chế Độ Luyện Tập
          </button>
          <button
            type="button"
            className={`writing-mode-btn ${mode === 'exam' ? 'active' : ''}`}
            onClick={() => setMode('exam')}
          >
            ⏱️ Thi Thử 60 Phút (Exam)
          </button>
        </div>
      </div>

      {/* Test Edition Selector Bar */}
      {ALL_ULIS_WRITING_TESTS.length > 0 && (
        <div className="writing-edition-selector-bar">
          <span className="writing-edition-label">Bộ Đề ULIS:</span>
          {ALL_ULIS_WRITING_TESTS.map((t, idx) => (
            <button
              key={t.id || idx}
              type="button"
              onClick={() => setTestIndex(idx)}
              className={`writing-edition-btn ${testIndex === idx ? 'active' : ''}`}
            >
              ✍️ Đề {idx + 1} (Thư & Luận)
            </button>
          ))}
        </div>
      )}

      {/* Unified Writing Runner */}
      {currentTest && (
        <WritingRunner
          key={`${currentTest.id}_${mode}`}
          test={currentTest}
          mode={mode}
        />
      )}
    </div>
  );
};
