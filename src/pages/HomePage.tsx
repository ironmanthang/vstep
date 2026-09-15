import React from 'react';
import { Link } from 'react-router';
import {
  FlashcardIcon,
  PracticeIcon,
  MockTestIcon
} from '../components/Icons';
import { useUserStore } from '../services/user/userStore';
import { useFlashcardStore } from '../features/flashcard/useFlashcardStore';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const {
    completedExercisesCount,
    latestMockTest,
  } = useUserStore();

  const { cards, stats } = useFlashcardStore();
  const learnedCount = stats.mastered + stats.learning;

  return (
    <div className="home-container">
      {/* 3 Main Functional Hub Cards */}
      <div className="home-hub-grid">
        {/* Card 1: Flashcard SRS */}
        <Link to="/flashcard" className="card-surface home-hub-card">
          <div className="home-hub-icon" style={{ background: 'var(--primary-subtle)', color: 'var(--primary)' }}>
            <FlashcardIcon size={22} />
          </div>
          <div className="home-hub-content">
            <div className="home-hub-header">
              <h2 className="home-hub-title">Từ Vựng SRS</h2>
              <span className="badge badge-primary">SRS Flashcard</span>
            </div>
            <p className="home-hub-desc">
              {cards.length} từ vựng chuẩn đề thi FSRS
            </p>
          </div>
        </Link>

        {/* Card 2: Skill Practice */}
        <Link to="/practice" className="card-surface home-hub-card">
          <div className="home-hub-icon" style={{ background: 'var(--emerald-subtle)', color: 'var(--emerald)' }}>
            <PracticeIcon size={22} />
          </div>
          <div className="home-hub-content">
            <div className="home-hub-header">
              <h2 className="home-hub-title">Luyện Kỹ Năng</h2>
              <span className="badge badge-emerald">4 Kỹ Năng</span>
            </div>
            <p className="home-hub-desc">
              Phòng luyện Nghe, Đọc, Viết, Nói chuẩn cấu trúc VSTEP
            </p>
          </div>
        </Link>

        {/* Card 3: Mock Test */}
        <Link to="/mock-test" className="card-surface home-hub-card">
          <div className="home-hub-icon" style={{ background: 'var(--gold-subtle)', color: 'var(--gold)' }}>
            <MockTestIcon size={22} />
          </div>
          <div className="home-hub-content">
            <div className="home-hub-header">
              <h2 className="home-hub-title">Phòng Thi Thử</h2>
              <span className="badge badge-gold">180 Phút</span>
            </div>
            <p className="home-hub-desc">
              Mô phỏng thi máy chuẩn Bộ GD&ĐT, tự động tính điểm
            </p>
          </div>
        </Link>
      </div>

      {/* Target Progress Bar */}
      <div className="card-surface home-progress-bar">
        <div className="home-stat-item">
          <span className="home-stat-label">Từ Vựng Đã Thuộc</span>
          <span className="home-stat-val" style={{ color: 'var(--primary)' }}>
            {learnedCount} / {cards.length}
          </span>
        </div>
        <div className="home-stat-item">
          <span className="home-stat-label">Bài Đã Luyện</span>
          <span className="home-stat-val" style={{ color: completedExercisesCount > 0 ? 'var(--emerald)' : 'var(--text-secondary)' }}>
            {completedExercisesCount > 0 ? `${completedExercisesCount} bài` : 'Chưa có'}
          </span>
        </div>
        <div className="home-stat-item">
          <span className="home-stat-label">Thi Thử Gần Nhất</span>
          <span className="home-stat-val" style={{ color: latestMockTest ? 'var(--gold)' : 'var(--text-secondary)' }}>
            {latestMockTest ? `${latestMockTest.score}/10 (${latestMockTest.achieved_band})` : 'Chưa thi'}
          </span>
        </div>
      </div>
    </div>
  );
};
