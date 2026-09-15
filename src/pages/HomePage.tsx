import React, { useState } from 'react';
import { useUserStore } from '../services/user/userStore';
import { useFlashcardStore } from '../features/flashcard/useFlashcardStore';
import { useAuth } from '../services/supabase/authStore';
import { useNotification } from '../hooks/useNotification';
import { Toast } from '../components/common/Toast';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const {
    userDisplayName,
    avatarInitial,
    avatarUrl,
    setUserName,
    completedExercisesCount,
    latestMockTest,
  } = useUserStore();

  const { stats } = useFlashcardStore();
  const { user } = useAuth();
  const { statusMessage, showNotification, clearNotification } = useNotification();

  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userDisplayName);

  const handleSaveName = () => {
    const trimmed = tempName.trim();
    if (trimmed) {
      setUserName(trimmed);
      setIsEditingName(false);
      showNotification('Đã cập nhật tên người học thành công!', 'success');
    }
  };

  return (
    <div className="home-container">
      <Toast message={statusMessage} onClose={clearNotification} />

      {/* User Profile Card */}
      <div className="card-surface home-profile-card">
        <div className="home-profile-avatar-wrap">
          {avatarUrl ? (
            <img src={avatarUrl} alt={userDisplayName} className="home-profile-avatar-img" />
          ) : (
            <div className="home-profile-avatar-fallback">{avatarInitial}</div>
          )}
        </div>

        <div className="home-profile-info">
          <div className="home-profile-name-row">
            {isEditingName ? (
              <div className="home-profile-edit-box">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Nhập tên của bạn"
                  className="home-profile-input"
                  autoFocus
                />
                <button className="primary-btn home-profile-btn-sm" onClick={handleSaveName}>
                  Lưu
                </button>
                <button
                  className="secondary-btn home-profile-btn-sm"
                  onClick={() => {
                    setTempName(userDisplayName);
                    setIsEditingName(false);
                  }}
                >
                  Hủy
                </button>
              </div>
            ) : (
              <div className="home-profile-name-display">
                <h2 className="home-profile-name">{userDisplayName}</h2>
                <button
                  onClick={() => {
                    setTempName(userDisplayName);
                    setIsEditingName(true);
                  }}
                  className="home-profile-edit-btn"
                >
                  Đổi tên
                </button>
              </div>
            )}
          </div>

          <div className="home-profile-sub-row">
            {user?.email && <span className="home-profile-email">{user.email}</span>}
          </div>
        </div>
      </div>

      {/* 4 Key Metrics Grid */}
      <div className="card-surface home-metrics-grid">
        {/* Metric 1: Từ vựng đang học */}
        <div className="home-metric-item">
          <span className="home-metric-label">Từ Vựng Đang Học</span>
          <span className="home-metric-val metric-gold">{stats.learning}</span>
        </div>

        {/* Metric 2: Từ đã thuộc */}
        <div className="home-metric-item">
          <span className="home-metric-label">Từ Đã Thuộc</span>
          <span className="home-metric-val metric-emerald">{stats.mastered}</span>
        </div>

        {/* Metric 3: Bài đã luyện */}
        <div className="home-metric-item">
          <span className="home-metric-label">Bài Đã Luyện</span>
          <span className={`home-metric-val ${completedExercisesCount > 0 ? 'metric-primary' : 'metric-muted'}`}>
            {completedExercisesCount > 0 ? `${completedExercisesCount} bài` : 'Chưa có'}
          </span>
        </div>

        {/* Metric 4: Thi thử gần nhất */}
        <div className="home-metric-item">
          <span className="home-metric-label">Thi Thử Gần Nhất</span>
          <span className={`home-metric-val ${latestMockTest ? 'metric-coral' : 'metric-muted'}`}>
            {latestMockTest ? `${latestMockTest.score}/10 (${latestMockTest.achieved_band})` : 'Chưa thi'}
          </span>
        </div>
      </div>

    </div>
  );
};
