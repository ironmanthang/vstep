import React, { useState } from 'react';
import { ALL_ULIS_SPEAKING_TESTS } from './data/mockTests';
import { ALL_MAY_SPEAKING_TESTS } from './data/speakingBank';
import { SpeakingRunner } from './SpeakingRunner';
import type { SpeakingMode } from './speakingStorage';
import './SpeakingStudioPage.css';

export const SpeakingStudioPage: React.FC = () => {
  const [selectedCollection, setSelectedCollection] = useState<'ulis' | 'may_exams'>('ulis');
  const [testIndex, setTestIndex] = useState<number>(0);
  const [mode, setMode] = useState<SpeakingMode>('practice');
  const [micStatus, setMicStatus] = useState<'unchecked' | 'ready' | 'error'>('unchecked');

  const availableTests = selectedCollection === 'ulis' ? ALL_ULIS_SPEAKING_TESTS : ALL_MAY_SPEAKING_TESTS;
  const currentTest = availableTests[testIndex] || availableTests[0];

  const collectionSummaries = [
    {
      id: 'ulis' as const,
      name: 'Bộ Đề Thi Thử ULIS (ĐHQGHN)',
      count: '7 Bộ Đề (21 Phần)',
      time: '~12 phút/đề',
      difficulty: 'B1–C1',
      desc: '7 Bộ đề thi thử chuẩn ĐHQGHN với đầy đủ 3 phần: Tương tác xã hội, Thảo luận giải pháp, và Phát triển chủ đề.',
      badgeColor: 'badge-purple',
    },
    {
      id: 'may_exams' as const,
      name: 'Bộ Đề Thi Thật Tháng 5 (Authentic May Sessions)',
      count: '5 Kỳ Thi Thật (15 Phần)',
      time: '~12 phút/đề',
      difficulty: 'B1–B2',
      desc: '5 Đề thi thật phòng máy từ Trung tâm Khảo thí (Ngày 05/05, 16/05, 20/05, 24/05, 30/05) với chủ đề cập nhật sát thực tế.',
      badgeColor: 'badge-gold',
    },
  ];

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
                <span className={`badge ${col.badgeColor}`}>Bậc {col.difficulty}</span>
                <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', fontWeight: 600 }}>
                  {col.count} • {col.time}
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
        <div className="speaking-edition-selector-bar">
          <span className="speaking-edition-label">
            {selectedCollection === 'ulis' ? 'Bộ Đề ULIS:' : 'Kỳ Thi Tháng 5:'}
          </span>
          {availableTests.map((t, idx) => (
            <button
              key={t.id || idx}
              type="button"
              onClick={() => setTestIndex(idx)}
              className={`speaking-edition-btn ${testIndex === idx ? 'active' : ''}`}
            >
              🎙️ {selectedCollection === 'ulis' ? `Đề ${idx + 1}` : `Ngày ${t.exam_date || idx + 1}`} (3 Part)
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

