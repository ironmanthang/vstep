import React, { useState } from 'react';
import {
  ALL_LISTENING_PART1_TESTS,
  ALL_LISTENING_PART2_TESTS,
  ALL_LISTENING_PART3_TESTS,
  ALL_VSTEP_LISTENING_MOCK_TESTS,
} from './data';
import { ListeningRunner } from './ListeningRunner';
import type { ListeningMode } from './types';
import './ListeningStudioPage.css';

export const ListeningStudioPage: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<number>(0);
  const [testIndex, setTestIndex] = useState<number>(0);
  const [mode, setMode] = useState<ListeningMode>('practice');

  const getAvailableTestsForPart = (part: number) => {
    switch (part) {
      case 1:
        return ALL_LISTENING_PART1_TESTS;
      case 2:
        return ALL_LISTENING_PART2_TESTS;
      case 3:
        return ALL_LISTENING_PART3_TESTS;
      case 0:
      default:
        return ALL_VSTEP_LISTENING_MOCK_TESTS;
    }
  };

  const availableTests = getAvailableTestsForPart(selectedPart);
  const currentTest = availableTests[testIndex] || availableTests[0];

  const partSummaries = [
    {
      part: 1,
      name: 'Part 1: Thông Báo & Hướng Dẫn',
      count: '8 Câu hỏi',
      time: '~4–5 phút',
      difficulty: 'B1',
      desc: 'Rèn luyện bắt thông tin chi tiết (con số, địa điểm, thời gian, thay đổi đột xuất).',
      badgeColor: 'badge-primary',
    },
    {
      part: 2,
      name: 'Part 2: Đoạn Hội Thoại Đời Sống',
      count: '12 Câu hỏi (3 Đoạn)',
      time: '~6–8 phút',
      difficulty: 'B2',
      desc: 'Rèn luyện nhận diện từ khóa chuyển hướng (however, actually) và quan hệ nhân vật.',
      badgeColor: 'badge-emerald',
    },
    {
      part: 3,
      name: 'Part 3: Bài Giảng Học Thuật',
      count: '15 Câu hỏi (3 Bài)',
      time: '~10–12 phút',
      difficulty: 'C1',
      desc: 'Rèn luyện ghi chú nhanh (Note-taking) và nắm bắt cấu trúc triển khai luận điểm khoa học.',
      badgeColor: 'badge-gold',
    },
    {
      part: 0,
      name: 'Mock Test: Sửa Đề & Luyện Sâu',
      count: '35 Câu hỏi (Trọn Bộ)',
      time: '~40 phút',
      difficulty: 'B1–C1',
      desc: '7 Bộ đề thi thử chuẩn ĐHQGHN với audio phòng thi gốc, chữa đề và chép chính tả 35 câu.',
      badgeColor: 'badge-purple',
    },
  ];

  return (
    <div className="listening-studio-page">
      {/* Studio Header */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <div>
            <h1 style={{ fontSize: 'var(--fs-2xl)', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Phòng Luyện Nghe Chủ Động (Listening Studio)
            </h1>
            <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', marginTop: 4 }}>
              Audio player thông minh tua ±5s, chỉnh tốc độ, chép chính tả và phụ đề song ngữ gạch chân manh mối.
            </p>
          </div>

          {/* Mode Switcher */}
          <div style={{ display: 'flex', background: 'var(--bg-subtle)', padding: 3, borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <button
              className={`secondary-btn ${mode === 'practice' ? 'active' : ''}`}
              onClick={() => setMode('practice')}
              style={{
                padding: '6px 12px',
                fontSize: 'var(--fs-xs)',
                fontWeight: 700,
                border: 'none',
                background: mode === 'practice' ? 'var(--primary)' : 'transparent',
                color: mode === 'practice' ? '#141210' : 'var(--text-secondary)',
              }}
            >
              🛠️ Chế Độ Luyện Tập
            </button>
            <button
              className={`secondary-btn ${mode === 'exam' ? 'active' : ''}`}
              onClick={() => setMode('exam')}
              style={{
                padding: '6px 12px',
                fontSize: 'var(--fs-xs)',
                fontWeight: 700,
                border: 'none',
                background: mode === 'exam' ? 'var(--gold)' : 'transparent',
                color: mode === 'exam' ? '#141210' : 'var(--text-secondary)',
              }}
            >
              ⏱️ Thi Thử (Exam)
            </button>
          </div>
        </div>
      </div>

      {/* 3-Part Selection Cards */}
      <div className="studio-parts-grid">
        {partSummaries.map((p) => {
          const isSelected = selectedPart === p.part;
          return (
            <div
              key={p.part}
              className={`studio-part-card ${isSelected ? 'active' : ''}`}
              onClick={() => {
                setSelectedPart(p.part);
                setTestIndex(0);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedPart(p.part);
                  setTestIndex(0);
                }
              }}
              aria-label={`Chọn ${p.name}`}
            >
              <div className="studio-part-card-header">
                <span className={`badge ${p.badgeColor}`}>Bậc {p.difficulty}</span>
                <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', fontWeight: 600 }}>
                  {p.count} • {p.time}
                </span>
              </div>
              <h3 className="studio-part-title">{p.name}</h3>
              <p className="studio-part-desc">{p.desc}</p>
              <div style={{ marginTop: 'auto', paddingTop: 'var(--space-2)', fontSize: 'var(--fs-xs)', fontWeight: 700, color: isSelected ? 'var(--primary)' : 'var(--text-muted)' }}>
                {isSelected ? '● Đang chọn luyện phần này' : 'Nhấn để chọn →'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Test Edition Selector */}
      {availableTests.length > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-1) 0', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--text-secondary)' }}>
            Chọn Bộ Đề:
          </span>
          {availableTests.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setTestIndex(idx)}
              className={`secondary-btn ${testIndex === idx ? 'active' : ''}`}
              style={{
                padding: '6px 14px',
                fontSize: 'var(--fs-xs)',
                fontWeight: 700,
                borderRadius: 'var(--radius-full)',
                background: testIndex === idx ? 'var(--primary)' : 'var(--bg-subtle)',
                color: testIndex === idx ? '#141210' : 'var(--text-secondary)',
                border: testIndex === idx ? '1px solid var(--primary)' : '1px solid var(--border)',
                cursor: 'pointer',
              }}
            >
              📖 Đề {idx + 1} ({t.questions.length} câu)
            </button>
          ))}
        </div>
      )}

      {/* Unified Listening Runner for Selected Part */}
      {currentTest ? (
        <ListeningRunner
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
          <div style={{ fontSize: 'var(--fs-2xl)', marginBottom: 'var(--space-2)' }}>🎧</div>
          <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-1)' }}>
            Chưa có bài luyện tập riêng lẻ cho phần này
          </h3>
          <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', maxWidth: '460px', margin: '0 auto var(--space-4)' }}>
            Hiện tại các bài nghe authentic được tích hợp đầy đủ trong 7 Bộ đề thi thử (Mock Test). Vui lòng chọn Mock Test trọn bộ để luyện tập cùng audio gốc và đáp án chi tiết.
          </p>
          <button
            className="primary-btn"
            onClick={() => setSelectedPart(0)}
            style={{ margin: '0 auto' }}
          >
            Chuyển Sang Mock Test (7 Đề Thi Thử) →
          </button>
        </div>
      )}
    </div>
  );
};
