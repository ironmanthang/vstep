import React from 'react';
import type { MockTestSkillSection } from '../types';

interface MockTestTransitionModalProps {
  isOpen: boolean;
  completedSection: MockTestSkillSection;
  nextSection: MockTestSkillSection | null;
  onProceed: () => void;
}

const SECTION_DETAILS: Record<
  MockTestSkillSection,
  { nameVi: string; durationVi: string; descriptionVi: string; tipsVi: string }
> = {
  listening: {
    nameVi: 'Nghe (Listening)',
    durationVi: '40 phút',
    descriptionVi: '35 câu hỏi trắc nghiệm qua 3 phần audio phát liên tục.',
    tipsVi: 'Audio nghe 1 lần duy nhất, không có thời gian dừng giữa chừng.',
  },
  reading: {
    nameVi: 'Đọc (Reading)',
    durationVi: '60 phút',
    descriptionVi: '4 bài đọc học thuật với 40 câu hỏi trắc nghiệm.',
    tipsVi: 'Phân bổ thời gian: 15 phút cho mỗi bài đọc. Khóa toàn bộ công cụ tra từ trong chế độ thi.',
  },
  writing: {
    nameVi: 'Viết (Writing)',
    durationVi: '60 phút',
    descriptionVi: '2 bài viết: Task 1 viết thư (≥ 120 từ) và Task 2 bài luận (≥ 250 từ).',
    tipsVi: 'Gợi ý phân bổ: 20 phút cho Task 1 (1/3 điểm) và 40 phút cho Task 2 (2/3 điểm).',
  },
  speaking: {
    nameVi: 'Nói (Speaking)',
    durationVi: '12 phút',
    descriptionVi: '3 phần thu âm trực tiếp trên máy tính với đồng hồ đếm ngược và âm báo BEEP.',
    tipsVi: 'Kiểm tra micrô và nói to, rõ ràng theo đúng tín hiệu BEEP chuẩn Bộ GD&ĐT.',
  },
};

export const MockTestTransitionModal: React.FC<MockTestTransitionModalProps> = ({
  isOpen,
  completedSection,
  nextSection,
  onProceed,
}) => {
  if (!isOpen) return null;

  const finishedInfo = SECTION_DETAILS[completedSection];
  const nextInfo = nextSection ? SECTION_DETAILS[nextSection] : null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-content card-surface" style={{ maxWidth: 560, padding: 'var(--space-6)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: 'var(--radius-full)',
              background: 'var(--emerald-subtle)',
              color: 'var(--emerald)',
              fontSize: 'var(--fs-xl)',
              fontWeight: 800,
              marginBottom: 'var(--space-2)',
            }}
          >
            ✓
          </span>
          <h2 style={{ fontSize: 'var(--fs-xl)', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
            Hoàn Thành Phần Thi {finishedInfo.nameVi}
          </h2>
          <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', marginTop: 4 }}>
            Hệ thống đã tự động lưu trữ câu trả lời của bạn an toàn.
          </p>
        </div>

        {nextInfo ? (
          <div
            style={{
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-4)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-5)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge badge-primary">Phần Thi Kế Tiếp</span>
              <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--primary)' }}>
                Thời gian: {nextInfo.durationVi}
              </span>
            </div>
            <div style={{ fontSize: 'var(--fs-base)', fontWeight: 700, color: 'var(--text-primary)' }}>
              {nextInfo.nameVi}
            </div>
            <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>
              {nextInfo.descriptionVi}
            </div>
            <div
              style={{
                fontSize: 'var(--fs-xs)',
                color: 'var(--text-muted)',
                background: 'var(--bg-surface)',
                padding: 'var(--space-2) var(--space-3)',
                borderRadius: 'var(--radius-sm)',
                borderLeft: '3px solid var(--primary)',
                marginTop: 'var(--space-1)',
              }}
            >
              Mẹo: {nextInfo.tipsVi}
            </div>
          </div>
        ) : (
          <div
            style={{
              background: 'var(--gold-subtle)',
              border: '1px solid var(--gold)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-4)',
              textAlign: 'center',
              marginBottom: 'var(--space-5)',
            }}
          >
            <div style={{ fontSize: 'var(--fs-md)', fontWeight: 700, color: 'var(--primary-text)' }}>
              Chúc Mừng! Bạn Đã Hoàn Thành Toàn Bộ 4 Phần Thi
            </div>
            <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 4 }}>
              Nhấn tiếp tục để tổng hợp kết quả và xem bảng điểm chuẩn Barem Bộ GD&amp;ĐT.
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
          <button
            type="button"
            className="primary-btn"
            onClick={onProceed}
            style={{ width: '100%', justifyContent: 'center', padding: 'var(--space-3)' }}
          >
            {nextInfo ? `Bắt Đầu Phần Thi ${nextInfo.nameVi}` : 'Xem Kết Quả Đánh Giá & Barem 0.5'}
          </button>
        </div>
      </div>
    </div>
  );
};
