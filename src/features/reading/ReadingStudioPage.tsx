import React, { useState } from 'react';
import { ALL_VSTEP_READING_MOCK_TESTS, HCMUE_READING_TESTS } from './data';
import { ReadingRunner } from './ReadingRunner';
import './ReadingStudioPage.css';

export const ReadingStudioPage: React.FC = () => {
  const [selectedCollection, setSelectedCollection] = useState<'ulis' | 'hcmue'>('hcmue');
  const [testIndex, setTestIndex] = useState<number>(0);

  const availableTests = selectedCollection === 'ulis' ? ALL_VSTEP_READING_MOCK_TESTS : HCMUE_READING_TESTS;
  const currentTest = availableTests[testIndex] || availableTests[0];

  const collectionSummaries = [
    {
      id: 'ulis' as const,
      name: 'Bộ Đề Thi Thử ULIS (ĐHQGHN)',
      count: '7 Bộ Đề (280 Câu)',
      time: '~60 phút/đề',
      desc: '7 Bộ đề thi thử chuẩn ĐHQGHN với 100% dẫn chứng verbatim, highlight câu chứa đáp án và phân tích paraphrase chuyên sâu.',
      badgeColor: 'badge-purple',
    },
    {
      id: 'hcmue' as const,
      name: 'Bộ Đề Luyện Tập HCMUE (ĐH Sư Phạm TP.HCM)',
      count: '5 Bộ Đề (200 Câu)',
      time: '~60 phút/đề',
      desc: '5 Bộ đề thi chuẩn ĐH Sư Phạm TP.HCM, rèn luyện kỹ năng đọc hiểu chuyên sâu với hệ thống từ vựng phân hóa cao.',
      badgeColor: 'badge-emerald',
    },
  ];

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
        <div className="reading-edition-selector-bar">
          <span className="reading-edition-label">
            {selectedCollection === 'ulis' ? 'Bộ Đề ULIS:' : 'Bộ Đề HCMUE:'}
          </span>
          {availableTests.map((t, idx) => {
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

