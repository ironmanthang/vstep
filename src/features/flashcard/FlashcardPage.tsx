import React, { useState, useRef, useEffect } from 'react';
import { useFlashcardStore } from './useFlashcardStore';
import { FlashcardCard } from './FlashcardCard';
import type { SRSRating } from '../../types/schemas';
import { CheckCircleIcon, RefreshIcon, FilterIcon, ChevronDownIcon } from '../../components/Icons';
import { useNotification } from '../../hooks/useNotification';
import { Toast } from '../../components/common/Toast';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { useUserStore } from '../../services/user/userStore';
import { ReminderSettingsModal } from './components/ReminderSettingsModal';
import { WordInspectorModal, type WordInspectorFilter } from './components/WordInspectorModal';
import './FlashcardPage.css';

export const FlashcardPage: React.FC = () => {
  const {
    cards,
    reviewQueue,
    totalDueCount,
    stats,
    topics,
    selectedTopic,
    setSelectedTopic,
    levels,
    selectedLevel,
    setSelectedLevel,
    reviewedToday,
    isCloudSyncing,
    isOnline,
    submitReview,
    resetDeck,
  } = useFlashcardStore();

  const { userDisplayName } = useUserStore();
  const { statusMessage, showNotification, clearNotification } = useNotification();

  const [inspectorFilter, setInspectorFilter] = useState<WordInspectorFilter | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isTopicDropdownOpen, setIsTopicDropdownOpen] = useState(false);
  const topicDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isTopicDropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (topicDropdownRef.current && !topicDropdownRef.current.contains(e.target as Node)) {
        setIsTopicDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsTopicDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isTopicDropdownOpen]);

  // Active card in queue (always the head of the priority queue)
  const currentCard = reviewQueue[0] || null;

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


  const handleReview = async (cardId: string, rating: SRSRating) => {
    if (!isOnline) {
      showNotification('Mất kết nối Internet — Tạm dừng ôn tập để bảo đảm tiến độ được lưu vào tài khoản đám mây.', 'error');
      return;
    }

    // Immediately unflip so incoming card enters from front face
    setIsFlipped(false);

    const res = await submitReview(cardId, rating);
    if (!res.success) {
      showNotification(res.error || 'Lỗi kết nối — Không thể lưu thẻ lên máy chủ.', 'error');
      return;
    }

    if (reviewQueue.length <= 1 && rating === 'correct') {
      showNotification('🎉 Tuyệt vời! Bạn đã hoàn thành toàn bộ bài ôn hôm nay!', 'success');
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

      {/* Stats Dashboard (Collapses on Mobile during Review Queue to lift card above the fold) */}
      <div className="header-stats-wrapper compact-mobile">
        {/* Stats Summary Bar - Interactive to inspect word list */}
        <div className="stats-grid">
          <div
            className="stat-card clickable-stat"
            role="button"
            tabIndex={0}
            onClick={() => setInspectorFilter('mastered')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setInspectorFilter('mastered'); }}
            title="Bấm để xem danh sách từ vựng đã thuộc"
          >
            <span className="stat-label">Đã thuộc</span>
            <span className="stat-val stat-emerald">{stats.mastered} từ ({stats.masteryPercentage}%)</span>
          </div>
          <div
            className="stat-card clickable-stat"
            role="button"
            tabIndex={0}
            onClick={() => setInspectorFilter('learning')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setInspectorFilter('learning'); }}
            title="Bấm để xem danh sách từ vựng đang học"
          >
            <span className="stat-label">Đang học</span>
            <span className="stat-val stat-gold">{stats.learning} từ</span>
          </div>
          <div
            className="stat-card clickable-stat"
            role="button"
            tabIndex={0}
            onClick={() => setInspectorFilter('reviewedToday')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setInspectorFilter('reviewedToday'); }}
            title="Bấm để xem danh sách từ vựng đã ôn hôm nay"
          >
            <span className="stat-label">Hôm nay đã ôn</span>
            <span className="stat-val stat-primary">
              {reviewedToday} thẻ
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Compact Study Bar (Visible only on mobile in queue mode) */}
      <div className="mobile-study-bar">
        <div className="mobile-study-stats">
          <button
            className="mobile-stat-pill stat-emerald clickable-pill"
            onClick={() => setInspectorFilter('mastered')}
            title="Xem từ đã thuộc"
          >
            <strong>{stats.mastered}</strong> đã thuộc
          </button>
          <button
            className="mobile-stat-pill stat-gold clickable-pill"
            onClick={() => setInspectorFilter('learning')}
            title="Xem từ đang học"
          >
            <strong>{stats.learning}</strong> đang học
          </button>
          <button
            className="mobile-stat-pill stat-primary clickable-pill"
            onClick={() => setInspectorFilter('reviewedToday')}
            title="Xem từ đã ôn hôm nay"
          >
            ✓ <strong>{reviewedToday}</strong> đã ôn
          </button>
        </div>
        <div className="mobile-study-actions">
          {isCloudSyncing && (
            <span className="mobile-sync-badge" title="Đang đồng bộ Cloud...">
              🔄
            </span>
          )}
          <button
            className="mobile-icon-btn"
            onClick={() => setIsReminderModalOpen(true)}
            title="Cài đặt thông báo nhắc nhở SRS"
            aria-label="Cài đặt nhắc nhở SRS"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
          <button
            className="mobile-icon-btn mobile-reset-btn"
            onClick={() => setIsResetModalOpen(true)}
            disabled={isResetting}
            title="Đặt lại toàn bộ Deck từ vựng"
            aria-label="Đặt lại toàn bộ Deck từ vựng"
          >
            <RefreshIcon size={16} />
          </button>
        </div>
      </div>

      {/* Topic & Level Filters (1-Line Compact Toolbar) */}
      <div className="controls-row">
        <div className="filter-levels-row">
          <div className="filter-levels-group">
            <span className="filter-section-title">Bậc CEFR:</span>
            <div className="level-pills-wrapper" role="group" aria-label="Lọc theo bậc năng lực CEFR">
              {levels.map(lvl => (
                <button
                  key={lvl}
                  className={`level-pill ${selectedLevel === lvl ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedLevel(lvl);
                    setIsFlipped(false);
                  }}
                >
                  {lvl === 'Tất cả' ? 'Tất cả Bậc' : `Bậc ${lvl}`}
                </button>
              ))}
            </div>

            {/* Topic Filter Dropdown */}
            <div className="topic-dropdown-container" ref={topicDropdownRef}>
              <button
                type="button"
                className={`topic-dropdown-btn ${selectedTopic !== 'Tất cả' ? 'has-filter' : ''}`}
                onClick={() => setIsTopicDropdownOpen(prev => !prev)}
                aria-haspopup="listbox"
                aria-expanded={isTopicDropdownOpen}
                title="Lọc từ vựng theo chủ đề"
              >
                <FilterIcon size={14} className="filter-btn-icon" />
                <span className="topic-dropdown-label">
                  {selectedTopic === 'Tất cả' ? 'Chủ đề: Tất cả' : selectedTopic}
                </span>
                <ChevronDownIcon size={12} className={`chevron-icon ${isTopicDropdownOpen ? 'open' : ''}`} />
              </button>

              {isTopicDropdownOpen && (
                <div className="topic-dropdown-menu" role="listbox" aria-label="Danh sách chủ đề từ vựng">
                  {topics.map(topic => {
                    const isSelected = selectedTopic === topic;
                    return (
                      <button
                        key={topic}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        className={`topic-dropdown-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedTopic(topic);
                          setIsFlipped(false);
                          setIsTopicDropdownOpen(false);
                        }}
                      >
                        <span className="topic-item-name">{topic}</span>
                        {isSelected && <span className="topic-item-check">✓</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="filter-actions-group">
            {isCloudSyncing && (
              <span className="cloud-sync-badge badge-gold" title="Đang đồng bộ tiến độ với Supabase Cloud">
                🔄 Đang đồng bộ Cloud...
              </span>
            )}
            <button
              className="secondary-btn reminder-btn"
              onClick={() => setIsReminderModalOpen(true)}
              title="Cài đặt thông báo nhắc nhở ôn tập SRS"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span>Nhắc nhở SRS</span>
            </button>
            <button
              type="button"
              className="secondary-btn flashcard-reset-btn"
              onClick={() => setIsResetModalOpen(true)}
              disabled={isResetting}
              title="Đặt lại toàn bộ Deck từ vựng"
            >
              <RefreshIcon size={14} />
              <span>Đặt lại Deck</span>
            </button>
          </div>
        </div>
      </div>

      {/* ACTIVE RECALL PRACTICE QUEUE */}
      <div className="queue-section">
        {currentCard ? (
          <div className="review-workspace">
            {/* Card Component */}
            <FlashcardCard
              card={currentCard}
              onReview={handleReview}
              isFlipped={isFlipped}
              onFlip={() => setIsFlipped(prev => !prev)}
              disabled={!isOnline || isCloudSyncing}
            />
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
                onClick={() => setInspectorFilter('reviewedToday')}
              >
                Xem các từ đã ôn hôm nay
              </button>
              {selectedTopic !== 'Tất cả' && (
                <button
                  className="secondary-btn"
                  onClick={() => {
                    setSelectedTopic('Tất cả');
                    setSelectedLevel('Tất cả');
                  }}
                >
                  Học các chủ đề khác
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Sổ tay từ vựng Inspector Modal */}
      {inspectorFilter && (
        <WordInspectorModal
          isOpen={true}
          onClose={() => setInspectorFilter(null)}
          initialFilter={inspectorFilter}
          cards={cards}
          reviewedTodayCount={reviewedToday}
        />
      )}

      {/* SRS Reminder Notification Settings Modal */}
      <ReminderSettingsModal
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
        dueCount={totalDueCount}
        onNotify={showNotification}
      />



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
