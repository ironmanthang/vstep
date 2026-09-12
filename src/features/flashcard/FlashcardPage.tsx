import React, { useState } from 'react';
import { useFlashcardStore } from './useFlashcardStore';
import { FlashcardCard } from './FlashcardCard';
import type { SRSRating } from '../../types/schemas';
import { NEW_CARDS_PER_DAY } from './srs';
import { CheckCircleIcon, RefreshIcon } from '../../components/Icons';
import { useNotification } from '../../hooks/useNotification';
import { Toast } from '../../components/common/Toast';
import { useUserStore } from '../../services/user/userStore';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { ReminderSettingsModal } from './components/ReminderSettingsModal';
import './FlashcardPage.css';

export const FlashcardPage: React.FC = () => {
  const {
    cards,
    filteredCards,
    reviewQueue,
    totalDueCount,
    stats,
    topics,
    selectedTopic,
    setSelectedTopic,
    reviewedToday,
    newCardsToday,
    isCloudSyncing,
    isOnline,
    submitReview,
    resetDeck,
  } = useFlashcardStore();

  const { userDisplayName } = useUserStore();
  const { statusMessage, showNotification, clearNotification } = useNotification();

  const [activeTab, setActiveTab] = useState<'queue' | 'browse'>('queue');
  const [currentQueueIndex, setCurrentQueueIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);

  // Active card in queue
  const currentCard = reviewQueue[currentQueueIndex] || null;

  const handleReview = async (cardId: string, rating: SRSRating) => {
    if (!isOnline) {
      showNotification('Mất kết nối Internet — Tạm dừng ôn tập để bảo đảm tiến độ được lưu vào tài khoản đám mây.', 'error');
      return;
    }

    const res = await submitReview(cardId, rating);
    if (!res.success) {
      showNotification(res.error || 'Lỗi kết nối — Không thể lưu thẻ lên máy chủ.', 'error');
      return;
    }

    setIsFlipped(false);

    if (rating === 'wrong') {
      showNotification('Sẽ ôn lại từ này sau ít phút.', 'info');
    }

    if (reviewQueue.length <= 1 && rating === 'correct') {
      showNotification('🎉 Tuyệt vời! Bạn đã hoàn thành toàn bộ bài ôn hôm nay!', 'success');
    }

    // Move to next card or wrap around
    if (currentQueueIndex >= reviewQueue.length - 1) {
      setCurrentQueueIndex(0);
    }
  };

  const handleConfirmReset = async () => {
    setIsResetting(true);
    const res = await resetDeck();
    setIsResetting(false);
    setIsResetModalOpen(false);

    if (res.success) {
      setCurrentQueueIndex(0);
      setIsFlipped(false);
      showNotification('✓ Đã đặt lại toàn bộ thẻ và số thẻ đã ôn hôm nay về 0.', 'info');
    } else {
      showNotification(res.error || 'Không thể đặt lại tiến độ trên đám mây. Vui lòng thử lại.', 'error');
    }
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    if (currentQueueIndex < reviewQueue.length - 1) {
      setCurrentQueueIndex(prev => prev + 1);
    } else {
      setCurrentQueueIndex(0);
    }
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    if (currentQueueIndex > 0) {
      setCurrentQueueIndex(prev => prev - 1);
    }
  };

  return (
    <div className="flashcard-page">
      {/* Toast Notification Container */}
      <Toast message={statusMessage} onClose={clearNotification} />

      {/* Offline Alert Banner */}
      {!isOnline && (
        <div className="offline-alert-banner" role="alert">
          <div className="offline-alert-content">
            <span className="offline-alert-badge">Ngoại tuyến</span>
            <span>Bạn đang ngoại tuyến. Hệ thống tạm dừng ghi nhận ôn tập để bảo đảm toàn bộ từ vựng được lưu vĩnh viễn trên tài khoản đám mây của bạn.</span>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="page-header-row">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 className="page-title">Từ Vựng VSTEP SRS</h1>
            {isCloudSyncing && (
              <span className="badge badge-gold" style={{ fontSize: '0.75rem', animation: 'pulse 1.5s infinite' }}>
                🔄 Đang đồng bộ Cloud...
              </span>
            )}
          </div>
          <p className="page-subtitle">
            Kho 1.500 từ vựng học thuật Spaced Repetition (SRS) bám sát 8 chủ đề đề thi VSTEP B1–B2–C1.
          </p>
        </div>
        <div className="header-actions">
          <button
            className="secondary-btn"
            onClick={() => setIsReminderModalOpen(true)}
            title="Cài đặt thông báo nhắc nhở ôn tập SRS"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            Nhắc nhở SRS
          </button>
          <button
            className="secondary-btn"
            onClick={() => setIsResetModalOpen(true)}
            title="Đặt lại toàn bộ tiến độ học của Deck"
            disabled={isResetting}
          >
            <RefreshIcon size={16} /> Đặt lại Deck
          </button>
        </div>
      </div>

      {/* Stats Summary Bar */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Cần ôn hôm nay</span>
          <span className="stat-val stat-primary">{reviewQueue.length} thẻ</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Đã làm chủ</span>
          <span className="stat-val stat-emerald">{stats.mastered} từ ({stats.masteryPercentage}%)</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Từ mới hôm nay</span>
          <span className="stat-val stat-gold">{newCardsToday}/{NEW_CARDS_PER_DAY}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Hôm nay đã ôn</span>
          <span className="stat-val stat-emerald">
            {reviewedToday} thẻ
          </span>
        </div>
      </div>

      {/* View Tabs & Topic Filter */}
      <div className="controls-row">
        <div className="tab-group">
          <button
            className={`tab-btn ${activeTab === 'queue' ? 'active' : ''}`}
            onClick={() => { setActiveTab('queue'); setCurrentQueueIndex(0); setIsFlipped(false); }}
          >
            Hàng đợi ôn tập ({reviewQueue.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'browse' ? 'active' : ''}`}
            onClick={() => setActiveTab('browse')}
          >
            Kho từ vựng ({cards.length})
          </button>
        </div>

        {/* Topic Filter Pills */}
        <div className="topic-pills-wrapper">
          {topics.map(topic => (
            <button
              key={topic}
              className={`topic-pill ${selectedTopic === topic ? 'active' : ''}`}
              onClick={() => {
                setSelectedTopic(topic);
                setCurrentQueueIndex(0);
                setIsFlipped(false);
              }}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: DAILY REVIEW QUEUE */}
      {activeTab === 'queue' && (
        <div className="queue-section">
          {currentCard ? (
            <div className="review-workspace">
              {/* Queue Progress Indicator */}
              <div className="queue-progress-bar-container">
                <div className="progress-info">
                  <span className="progress-text">
                    Thẻ <strong>{currentQueueIndex + 1}</strong> trên <strong>{reviewQueue.length}</strong>
                  </span>
                  <span className="queue-remaining-badge">
                    Còn {reviewQueue.length - currentQueueIndex} thẻ
                  </span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${((currentQueueIndex + 1) / reviewQueue.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Card Component */}
              <FlashcardCard
                card={currentCard}
                onReview={handleReview}
                isFlipped={isFlipped}
                onFlip={() => setIsFlipped(prev => !prev)}
                disabled={!isOnline || isCloudSyncing || isResetting}
              />

              {/* Navigation arrows for convenience */}
              <div className="card-nav-controls">
                <button
                  className="nav-btn"
                  onClick={handlePrevCard}
                  disabled={currentQueueIndex === 0}
                >
                  ← Thẻ trước
                </button>
                <button
                  className="nav-btn"
                  onClick={handleNextCard}
                  disabled={currentQueueIndex >= reviewQueue.length - 1}
                >
                  Thẻ tiếp theo →
                </button>
              </div>
            </div>
          ) : (
            /* Empty Queue State */
            <div className="empty-queue-card">
              <div className="empty-icon-circle">
                <CheckCircleIcon size={44} color="#10B981" />
              </div>
              <h2 className="empty-title">Tuyệt vời, {userDisplayName} đã hoàn thành mục tiêu hôm nay!</h2>
              <p className="empty-desc">
                Không còn thẻ nào cần ôn trong hàng đợi của chủ đề này. Thuật toán SRS đã tự động lên lịch nhắc lại cho các ngày tiếp theo.
              </p>
              <div className="empty-actions">
                <button
                  className="primary-btn"
                  onClick={() => {
                    setSelectedTopic('Tất cả');
                    setActiveTab('browse');
                  }}
                >
                  Duyệt kho từ vựng toàn bộ
                </button>
                <button
                  className="secondary-btn"
                  onClick={() => setIsResetModalOpen(true)}
                  disabled={isResetting}
                >
                  <RefreshIcon size={16} /> Ôn tập lại từ đầu (Reset)
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: BROWSE ALL VOCABULARY */}
      {activeTab === 'browse' && (
        <div className="browse-section">
          <div className="vocab-grid">
            {filteredCards.map((card) => (
              <div key={card.id} className="vocab-item-card">
                <div className="vocab-card-top">
                  <span className="badge badge-primary">{card.topic}</span>
                  <span className={`badge ${
                    card.srs_metadata.state === 2 && card.srs_metadata.reps >= 3
                      ? 'badge-emerald'
                      : card.srs_metadata.reps > 0
                      ? 'badge-gold'
                      : 'badge-primary'
                  }`}>
                    {card.srs_metadata.state === 2 && card.srs_metadata.reps >= 3
                      ? 'Đã làm chủ'
                      : card.srs_metadata.reps > 0
                      ? 'Đang học'
                      : 'Mới'}
                  </span>
                </div>
                <h3 className="vocab-word">{card.word}</h3>
                <span className="vocab-phonetic">{card.phonetic}</span>
                <p className="vocab-def">{card.definition_vi}</p>
                <div className="vocab-footer">
                  <span className="vocab-level">Bậc {card.level} • {card.part_of_speech}</span>
                  <span className="vocab-interval">
                    {card.srs_metadata.reps > 0
                      ? `Đã ôn ${card.srs_metadata.reps} lần • Độ bền ${Math.round(card.srs_metadata.stability)}d`
                      : 'Chưa học'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strict Confirmation Modal for Deck Reset */}
      <ConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => {
          if (!isResetting) setIsResetModalOpen(false);
        }}
        onConfirm={handleConfirmReset}
        isLoading={isResetting}
        title="Đặt lại toàn bộ Deck từ vựng?"
        description={
          <>
            Hành động này sẽ <strong>xóa vĩnh viễn</strong> toàn bộ tiến độ Spaced Repetition (SRS) của <strong>1.500 từ vựng</strong> và đưa bộ đếm ôn tập hôm nay về <strong>0 thẻ</strong> trên cả thiết bị này và tài khoản đám mây của bạn.
          </>
        }
        warningText="Dữ liệu đã xóa không thể khôi phục lại. Bạn sẽ cần bắt đầu học lại từ đầu."
        confirmLabel="Xác nhận xóa & Đặt lại"
        cancelLabel="Hủy bỏ (Giữ tiến độ)"
      />

      {/* SRS Reminder Notification Settings Modal */}
      <ReminderSettingsModal
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
        dueCount={totalDueCount}
        onNotify={showNotification}
      />
    </div>
  );
};
