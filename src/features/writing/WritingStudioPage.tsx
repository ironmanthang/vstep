import React, { useState } from 'react';
import { ALL_ULIS_WRITING_TESTS } from './data/mockTests';
import { HCMUE_WRITING_TESTS } from './data/drills/hcmue';
import { WritingRunner } from './WritingRunner';
import type { WritingMode } from './writingStorage';
import './WritingStudioPage.css';

export const WritingStudioPage: React.FC = () => {
  const [selectedCollection, setSelectedCollection] = useState<'ulis' | 'hcmue'>('ulis');
  const [testIndex, setTestIndex] = useState<number>(0);
  const [mode, setMode] = useState<WritingMode>('practice');

  const availableTests = selectedCollection === 'ulis' ? ALL_ULIS_WRITING_TESTS : HCMUE_WRITING_TESTS;
  const currentTest = availableTests[testIndex] || availableTests[0];

  const collectionSummaries = [
    {
      id: 'ulis' as const,
      name: 'Bộ Đề Thi Thử ULIS (ĐHQGHN)',
      count: '7 Bộ Đề (14 Bài)',
      time: '~60 phút/đề',
      desc: '7 Bộ đề thi thử chuẩn ĐHQGHN (Thư & Luận) kèm barem chấm điểm và bài mẫu đối chiếu.',
      badgeColor: 'badge-purple',
    },
    {
      id: 'hcmue' as const,
      name: 'Bộ Đề Luyện Tập HCMUE (ĐH Sư Phạm TP.HCM)',
      count: '5 Bộ Đề (10 Bài)',
      time: '~60 phút/đề',
      desc: '5 Bộ đề thi chuẩn ĐH Sư Phạm TP.HCM (Thư & Luận) kèm dàn ý, bài mẫu đối chiếu và tiêu chí phân tích chuyên sâu.',
      badgeColor: 'badge-emerald',
    },
  ];

  return (
    <div className="writing-studio-page">
      {/* Studio Header */}
      <div className="writing-studio-header">
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>
            Phòng Luyện Viết VSTEP (Writing Studio)
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary, #a8a29e)', marginTop: 4, margin: 0 }}>
            Mô phỏng thi máy chuẩn Đại học Văn Lang & Bộ GD&ĐT
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

      {/* Collection Selection Cards */}
      <div className="studio-parts-grid">
        {collectionSummaries.map((col) => {
          const isSelected = selectedCollection === col.id;
          return (
            <div
              key={col.id}
              className={`studio-part-card ${isSelected ? 'active' : ''}`}
              onClick={() => {
                setSelectedCollection(col.id);
                setTestIndex(0);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedCollection(col.id);
                  setTestIndex(0);
                }
              }}
              aria-label={`Chọn ${col.name}`}
            >
              <div className="studio-part-card-header">
                <span className={`badge ${col.badgeColor}`}>{col.count}</span>
                <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', fontWeight: 600 }}>
                  {col.time}
                </span>
              </div>
              <h3 className="studio-part-title">{col.name}</h3>
              <p className="studio-part-desc">{col.desc}</p>
              <div style={{ marginTop: 'auto', paddingTop: 'var(--space-2)', fontSize: 'var(--fs-xs)', fontWeight: 700, color: isSelected ? 'var(--primary)' : 'var(--text-muted)' }}>
                {isSelected ? '● Đang chọn bộ này' : 'Nhấn để chọn →'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Test Edition Selector Bar */}
      {availableTests.length > 0 && (
        <div className="writing-edition-selector-bar">
          <span className="writing-edition-label">
            {selectedCollection === 'ulis' ? 'Bộ Đề ULIS:' : 'Bộ Đề HCMUE:'}
          </span>
          {availableTests.map((t, idx) => (
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

