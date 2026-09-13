import React from 'react';
import type { MockTestSkillSection } from '../types';

interface MockTestHeaderProps {
  testTitle: string;
  activeSection: MockTestSkillSection | 'result';
  completedSections: MockTestSkillSection[];
  totalSecondsRemaining: number;
  blurCount: number;
  onEarlySubmit: () => void;
  onExit: () => void;
}

const SECTION_CONFIG: {
  id: MockTestSkillSection;
  order: number;
  titleVi: string;
  durationLabel: string;
}[] = [
  { id: 'listening', order: 1, titleVi: '1. Nghe (Listening)', durationLabel: '40p • 35 câu' },
  { id: 'reading', order: 2, titleVi: '2. Đọc (Reading)', durationLabel: '60p • 40 câu' },
  { id: 'writing', order: 3, titleVi: '3. Viết (Writing)', durationLabel: '60p • 2 tasks' },
  { id: 'speaking', order: 4, titleVi: '4. Nói (Speaking)', durationLabel: '12p • 3 parts' },
];

function formatTimeRemaining(totalSecs: number): string {
  const h = Math.floor(totalSecs / 3600);
  const m = Math.floor((totalSecs % 3600) / 60);
  const s = totalSecs % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export const MockTestHeader: React.FC<MockTestHeaderProps> = ({
  testTitle,
  activeSection,
  completedSections,
  totalSecondsRemaining,
  blurCount,
  onEarlySubmit,
  onExit,
}) => {
  return (
    <header className="mock-test-header card-surface">
      <div className="mock-test-header-top">
        <div className="mock-test-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span className="badge badge-gold">Phòng Thi Máy Tính Chuẩn MOET</span>
            {blurCount > 0 && (
              <span className="badge badge-coral" title="Số lần rời khỏi cửa sổ làm bài">
                Rời màn hình: {blurCount} lần
              </span>
            )}
          </div>
          <h1 style={{ fontSize: 'var(--fs-lg)', fontWeight: 800, margin: '2px 0 0 0', color: 'var(--text-primary)' }}>
            {testTitle}
          </h1>
        </div>

        <div className="mock-test-controls-group">
          <div className="mock-test-timer-badge" aria-label="Thời gian thi còn lại toàn bài">
            <span className="timer-label">Toàn bài:</span>
            <span className="timer-value">{formatTimeRemaining(totalSecondsRemaining)}</span>
          </div>

          <button
            type="button"
            className="secondary-btn"
            onClick={onEarlySubmit}
            style={{ fontSize: 'var(--fs-xs)', padding: 'var(--space-2) var(--space-3)' }}
          >
            Nộp Toàn Bài
          </button>

          <button
            type="button"
            className="secondary-btn"
            onClick={onExit}
            style={{ fontSize: 'var(--fs-xs)', padding: 'var(--space-2) var(--space-3)' }}
            title="Thoát phòng thi về trang chủ"
          >
            Thoát
          </button>
        </div>
      </div>

      {/* 4 Skill Stepper Bar */}
      <nav className="mock-test-section-nav" aria-label="Tiến trình các phần thi">
        {SECTION_CONFIG.map((sec) => {
          const isActive = activeSection === sec.id;
          const isCompleted = completedSections.includes(sec.id);

          let itemClass = 'section-nav-item';
          if (isActive) itemClass += ' active';
          if (isCompleted) itemClass += ' completed';

          return (
            <div key={sec.id} className={itemClass}>
              <div className="section-nav-circle">
                {isCompleted ? '✓' : sec.order}
              </div>
              <div className="section-nav-text">
                <span className="section-nav-title">{sec.titleVi}</span>
                <span className="section-nav-meta">{sec.durationLabel}</span>
              </div>
            </div>
          );
        })}
      </nav>
    </header>
  );
};
