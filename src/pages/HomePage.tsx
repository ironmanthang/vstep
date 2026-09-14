import React from 'react';
import { Link } from 'react-router';
import {
  FlashcardIcon,
  PracticeIcon,
  MockTestIcon
} from '../components/Icons';
import { useUserStore } from '../services/user/userStore';
import { useFlashcardStore } from '../features/flashcard/useFlashcardStore';

export const HomePage: React.FC = () => {
  const {
    completedExercisesCount,
    latestMockTest,
  } = useUserStore();

  const { cards, stats } = useFlashcardStore();
  const learnedCount = stats.mastered + stats.learning;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', height: '100%', justifyContent: 'center' }}>
      {/* 3 Main Functional Hub Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-4)' }}>
        {/* Card 1: Flashcard SRS */}
        <Link
          to="/flashcard"
          className="card-surface"
          style={{
            padding: 'var(--space-5)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'all 0.2s ease',
            border: '1px solid var(--border)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--primary-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <FlashcardIcon size={24} />
            </div>
            <span className="badge badge-primary">SRS Flashcard</span>
          </div>
          <h2 style={{ fontSize: 'var(--fs-lg)', fontWeight: 800, margin: 'var(--space-1) 0 0 0', color: 'var(--text-primary)' }}>
            Từ Vựng SRS
          </h2>
          <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
            {cards.length} từ vựng trích xuất từ đề thi thật. Thuật toán FSRS tự động lên lịch nhắc lại.
          </p>
          <div style={{ marginTop: 'auto', paddingTop: 'var(--space-2)', color: 'var(--primary)', fontWeight: 700, fontSize: 'var(--fs-xs)' }}>
            Vào phòng ôn tập →
          </div>
        </Link>

        {/* Card 2: Skill Practice */}
        <Link
          to="/practice"
          className="card-surface"
          style={{
            padding: 'var(--space-5)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'all 0.2s ease',
            border: '1px solid var(--border)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--emerald-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--emerald)' }}>
              <PracticeIcon size={24} />
            </div>
            <span className="badge badge-emerald">4 Kỹ Năng</span>
          </div>
          <h2 style={{ fontSize: 'var(--fs-lg)', fontWeight: 800, margin: 'var(--space-1) 0 0 0', color: 'var(--text-primary)' }}>
            Luyện Kỹ Năng
          </h2>
          <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
            Nghe tua ±5s, Đọc tra từ 1 chạm, Viết giàn giáo hỗ trợ, Nói phòng thu tương tác.
          </p>
          <div style={{ marginTop: 'auto', paddingTop: 'var(--space-2)', color: 'var(--emerald)', fontWeight: 700, fontSize: 'var(--fs-xs)' }}>
            Chọn kỹ năng luyện →
          </div>
        </Link>

        {/* Card 3: Mock Test */}
        <Link
          to="/mock-test"
          className="card-surface"
          style={{
            padding: 'var(--space-5)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'all 0.2s ease',
            border: '1px solid var(--border)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--gold-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}>
              <MockTestIcon size={24} />
            </div>
            <span className="badge badge-gold">180 Phút</span>
          </div>
          <h2 style={{ fontSize: 'var(--fs-lg)', fontWeight: 800, margin: 'var(--space-1) 0 0 0', color: 'var(--text-primary)' }}>
            Phòng Thi Thử
          </h2>
          <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
            Mô phỏng thi máy chuẩn Bộ GD&ĐT. Tự động tính điểm và làm tròn 0.5 chính thức.
          </p>
          <div style={{ marginTop: 'auto', paddingTop: 'var(--space-2)', color: 'var(--gold-hover)', fontWeight: 700, fontSize: 'var(--fs-xs)' }}>
            Xem danh sách đề →
          </div>
        </Link>
      </div>

      {/* Target Progress Bar */}
      <div className="card-surface" style={{ padding: 'var(--space-4) var(--space-5)', border: '1px solid var(--border)' }}>
        <h3 style={{ fontSize: 'var(--fs-sm)', fontWeight: 700, margin: '0 0 var(--space-3) 0', color: 'var(--text-secondary)' }}>
          Tiến Độ Học Tập
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-3)' }}>
          <div style={{ padding: 'var(--space-3)', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Từ Vựng Đã Thuộc</span>
            <div style={{ fontSize: 'var(--fs-lg)', fontWeight: 700, color: 'var(--primary)' }}>
              {learnedCount} / {cards.length} từ
            </div>
          </div>
          <div style={{ padding: 'var(--space-3)', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Bài Luyện Đã Làm</span>
            <div style={{ fontSize: 'var(--fs-lg)', fontWeight: 700, color: completedExercisesCount > 0 ? 'var(--emerald)' : 'var(--text-secondary)' }}>
              {completedExercisesCount > 0 ? `${completedExercisesCount} bài tập` : 'Chưa có bài tập'}
            </div>
          </div>
          <div style={{ padding: 'var(--space-3)', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Điểm Thi Thử Gần Nhất</span>
            <div style={{ fontSize: 'var(--fs-lg)', fontWeight: 700, color: latestMockTest ? 'var(--gold)' : 'var(--text-secondary)' }}>
              {latestMockTest ? `${latestMockTest.score} / 10 (${latestMockTest.achieved_band})` : 'Chưa có bài thi'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
