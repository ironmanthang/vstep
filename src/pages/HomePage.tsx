import React, { useState } from 'react';
import { RefreshIcon } from '../components/Icons';
import { useUserStore } from '../services/user/userStore';
import { useFlashcardStore } from '../features/flashcard/useFlashcardStore';
import { useAuth } from '../services/supabase/authStore';
import { useNotification } from '../hooks/useNotification';
import { Toast } from '../components/common/Toast';
import { ConfirmModal } from '../components/common/ConfirmModal';
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

  const { stats, resetDeck } = useFlashcardStore();
  const { user } = useAuth();
  const { statusMessage, showNotification, clearNotification } = useNotification();

  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userDisplayName);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleSaveName = () => {
    const trimmed = tempName.trim();
    if (trimmed) {
      setUserName(trimmed);
      setIsEditingName(false);
      showNotification('Đã cập nhật tên người học thành công!', 'success');
    }
  };

  const handleConfirmResetDeck = async () => {
    setIsResetting(true);
    const res = await resetDeck();
    setIsResetting(false);
    setIsResetModalOpen(false);

    if (res.success) {
      showNotification('✓ Đã đặt lại toàn bộ thẻ và số thẻ đã ôn hôm nay về 0.', 'info');
    } else {
      showNotification(res.error || 'Không thể đặt lại tiến độ trên đám mây. Vui lòng thử lại.', 'error');
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

      {/* SRS Deck Data Management Card */}
      <div className="card-surface home-settings-card">
        <div className="home-settings-row">
          <span className="home-settings-label">Dữ liệu flashcard SRS:</span>
          <button
            type="button"
            className="secondary-btn home-reset-btn"
            onClick={() => setIsResetModalOpen(true)}
            disabled={isResetting}
          >
            <RefreshIcon size={14} />
            <span>Đặt lại toàn bộ Deck từ vựng</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal for Deck Reset */}
      <ConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => {
          if (!isResetting) setIsResetModalOpen(false);
        }}
        onConfirm={handleConfirmResetDeck}
        isLoading={isResetting}
        title="Đặt lại toàn bộ Deck từ vựng?"
        description={
          <>
            Hành động này sẽ <strong>xóa vĩnh viễn</strong> toàn bộ tiến độ Spaced Repetition (SRS) của{' '}
            <strong>3.000 từ vựng</strong> và đưa bộ đếm ôn tập hôm nay về <strong>0 thẻ</strong> trên cả thiết bị này và
            tài khoản đám mây của bạn.
          </>
        }
        warningText="Dữ liệu đã xóa không thể khôi phục lại. Bạn sẽ cần bắt đầu học lại từ đầu."
        confirmLabel="Xác nhận xóa & Đặt lại"
        cancelLabel="Hủy bỏ (Giữ tiến độ)"
      />
    </div>
  );
};
