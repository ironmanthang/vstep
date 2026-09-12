import React, { useState } from 'react';
import { ALL_VSTEP_READING_MOCK_TESTS } from './data';
import { ReadingRunner } from './ReadingRunner';
import type { ReadingMode } from './types';
import './ReadingStudioPage.css';

export const ReadingStudioPage: React.FC = () => {
  const [testIndex, setTestIndex] = useState<number>(0);
  const [mode, setMode] = useState<ReadingMode>('practice');

  const currentTest = ALL_VSTEP_READING_MOCK_TESTS[testIndex] || ALL_VSTEP_READING_MOCK_TESTS[0];

  return (
    <div className="reading-studio-page">
      {/* Studio Header */}
      <div className="reading-studio-header">
        <div>
          <h1 style={{ fontSize: 'var(--fs-2xl)', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Phòng Luyện Đọc Chủ Động (Reading Studio)
          </h1>
          <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', marginTop: 4 }}>
            Giao diện Split-Pane chia đôi màn hình, tra từ điển tiếng Việt 1 chạm, và phân tích dẫn chứng theo từng câu.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="reading-studio-mode-toggle">
          <button
            type="button"
            className={`reading-mode-btn practice ${mode === 'practice' ? 'active' : ''}`}
            onClick={() => setMode('practice')}
          >
            🛠️ Chế Độ Luyện Tập
          </button>
          <button
            type="button"
            className={`reading-mode-btn exam ${mode === 'exam' ? 'active' : ''}`}
            onClick={() => setMode('exam')}
          >
            ⏱️ Thi Thử (Exam)
          </button>
        </div>
      </div>

      {/* Test Edition Selector Bar */}
      {ALL_VSTEP_READING_MOCK_TESTS.length > 0 && (
        <div className="reading-edition-selector-bar">
          <span className="reading-edition-label">Chọn Bộ Đề:</span>
          {ALL_VSTEP_READING_MOCK_TESTS.map((t, idx) => {
            const questionCount = t.passages.reduce((sum, p) => sum + p.questions.length, 0);
            return (
              <button
                key={t.id || idx}
                type="button"
                onClick={() => setTestIndex(idx)}
                className={`reading-edition-btn ${testIndex === idx ? 'active' : ''}`}
              >
                📖 Đề {idx + 1} ({questionCount} câu)
              </button>
            );
          })}
        </div>
      )}

      {/* Unified Reading Runner */}
      {currentTest ? (
        <ReadingRunner
          key={`${currentTest.id}_${mode}`}
          test={currentTest}
          mode={mode}
        />
      ) : (
        <div
          className="studio-empty-state"
          style={{
            textAlign: 'center',
            padding: 'var(--space-10) var(--space-4)',
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px dashed var(--border-strong)',
            marginTop: 'var(--space-4)',
          }}
        >
          <div style={{ fontSize: 'var(--fs-2xl)', marginBottom: 'var(--space-2)' }}>📖</div>
          <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-1)' }}>
            Chưa có bộ đề đọc nào sẵn sàng
          </h3>
          <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', maxWidth: '460px', margin: '0 auto' }}>
            Hệ thống đang tải dữ liệu đề thi chuẩn ĐHQGHN. Vui lòng quay lại sau giây lát.
          </p>
        </div>
      )}
    </div>
  );
};
