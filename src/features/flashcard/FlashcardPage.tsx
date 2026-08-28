import React, { useState } from 'react';
import { useFlashcardStore } from './useFlashcardStore';
import { FlashcardCard } from './FlashcardCard';
import type { SRSRating } from '../../types/schemas';
import { CheckCircleIcon, RefreshIcon } from '../../components/Icons';
import { useNotification } from '../../hooks/useNotification';
import { Toast } from '../../components/common/Toast';
import { useUserStore } from '../../services/user/userStore';
import './FlashcardPage.css';

export const FlashcardPage: React.FC = () => {
  const {
    cards,
    filteredCards,
    reviewQueue,
    stats,
    topics,
    selectedTopic,
    setSelectedTopic,
    reviewedToday,
    isCloudSyncing,
    submitReview,
    resetDeck,
  } = useFlashcardStore();

  const { userDisplayName } = useUserStore();
  const { statusMessage, showNotification, clearNotification } = useNotification();

  const [activeTab, setActiveTab] = useState<'queue' | 'browse'>('queue');
  const [currentQueueIndex, setCurrentQueueIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Active card in queue
  const currentCard = reviewQueue[currentQueueIndex] || null;

  const handleReview = (cardId: string, rating: SRSRating) => {
    submitReview(cardId, rating);
    setIsFlipped(false);

    if (reviewQueue.length <= 1) {
      showNotification('🎉 Tuyệt vời! Bạn đã hoàn thành toàn bộ bài ôn hôm nay!', 'success');
    }

    // Move to next card or stay if queue updates
    if (currentQueueIndex >= reviewQueue.length - 1) {
      setCurrentQueueIndex(0);
    }
  };

  const handleReset = () => {
    resetDeck();
    setCurrentQueueIndex(0);
    setIsFlipped(false);
    showNotification('✓ Đã đặt lại toàn bộ thẻ về trạng thái ban đầu.', 'info');
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
            onClick={handleReset}
            title="Đặt lại tiến độ thẻ về ban đầu để kiểm thử"
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
          <span className="stat-label">Đang ghi nhớ</span>
          <span className="stat-val stat-gold">{stats.learning} từ</span>
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
                  onClick={handleReset}
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
                    card.srs_metadata.status === 'mastered'
                      ? 'badge-emerald'
                      : card.srs_metadata.status === 'learning'
                      ? 'badge-gold'
                      : 'badge-primary'
                  }`}>
                    {card.srs_metadata.status === 'mastered'
                      ? 'Đã làm chủ'
                      : card.srs_metadata.status === 'learning'
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
                    Khoảng cách: {card.srs_metadata.interval_days} ngày
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
