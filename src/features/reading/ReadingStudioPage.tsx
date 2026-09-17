import React, { useState } from 'react';
import { ALL_VSTEP_READING_MOCK_TESTS, HCMUE_READING_TESTS } from './data';
import { ReadingRunner } from './ReadingRunner';
import './ReadingStudioPage.css';

export const ReadingStudioPage: React.FC = () => {
  const [selectedCollection, setSelectedCollection] = useState<'ulis' | 'hcmue'>('hcmue');
  const [testIndex, setTestIndex] = useState<number>(0);

  const availableTests = selectedCollection === 'ulis' ? ALL_VSTEP_READING_MOCK_TESTS : HCMUE_READING_TESTS;
  const currentTest = availableTests[testIndex] || availableTests[0];

  return (
    <div className="reading-studio-page">
      {/* Sleek Minimalist Studio Toolbar */}
      <div className="reading-studio-topbar">
        {/* Collection Source Segmented Control */}
        <div className="reading-source-switch">
          <button
            type="button"
            className={`reading-source-btn ${selectedCollection === 'hcmue' ? 'active' : ''}`}
            onClick={() => {
              setSelectedCollection('hcmue');
              setTestIndex(0);
            }}
          >
            ĐH Sư Phạm TP.HCM (5 Đề)
          </button>
          <button
            type="button"
            className={`reading-source-btn ${selectedCollection === 'ulis' ? 'active' : ''}`}
            onClick={() => {
              setSelectedCollection('ulis');
              setTestIndex(0);
            }}
          >
            ULIS ĐHQGHN (7 Đề)
          </button>
        </div>

        {/* Edition Selector Cluster */}
        <div className="reading-edition-cluster">
          {availableTests.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setTestIndex(idx)}
              className={`reading-edition-pill ${testIndex === idx ? 'active' : ''}`}
            >
              Đề {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Unified Reading Runner */}
      {currentTest ? (
        <ReadingRunner
          key={`${currentTest.id}_practice`}
          test={currentTest}
          mode="practice"
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
            Hệ thống đang tải dữ liệu đề thi. Vui lòng quay lại sau giây lát.
          </p>
        </div>
      )}
    </div>
  );
};
