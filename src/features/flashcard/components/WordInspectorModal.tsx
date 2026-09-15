import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import type { FlashcardItem } from '../../../types/schemas';
import './WordInspectorModal.css';

export type WordInspectorFilter = 'mastered' | 'learning' | 'reviewedToday';

export interface WordInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFilter?: WordInspectorFilter;
  cards: FlashcardItem[];
  reviewedTodayCount: number;
}

export const WordInspectorModal: React.FC<WordInspectorModalProps> = ({
  isOpen,
  onClose,
  initialFilter = 'mastered',
  cards,
  reviewedTodayCount,
}) => {
  const [activeFilter, setActiveFilter] = useState<WordInspectorFilter>(initialFilter);
  const [searchQuery, setSearchQuery] = useState('');
  const [playingWordId, setPlayingWordId] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Play audio pronunciation
  const handlePlayAudio = useCallback((card: FlashcardItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(card.word);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.onstart = () => setPlayingWordId(card.id);
      utterance.onend = () => setPlayingWordId(null);
      utterance.onerror = () => setPlayingWordId(null);
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  // Compute category counts
  const { masteredCards, learningCards, reviewedTodayCards } = useMemo(() => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const startOfTodayMs = startOfToday.getTime();

    const mastered: FlashcardItem[] = [];
    const learning: FlashcardItem[] = [];
    const today: FlashcardItem[] = [];

    for (const card of cards) {
      const meta = card.srs_metadata;
      if (meta.state === 2 && meta.reps >= 3) {
        mastered.push(card);
      } else if (meta.reps > 0) {
        learning.push(card);
      }

      if (meta.last_reviewed_at && meta.last_reviewed_at >= startOfTodayMs) {
        today.push(card);
      }
    }

    return {
      masteredCards: mastered,
      learningCards: learning,
      reviewedTodayCards: today,
    };
  }, [cards]);

  // Active list based on selected filter
  const currentList = useMemo(() => {
    switch (activeFilter) {
      case 'mastered':
        return masteredCards;
      case 'learning':
        return learningCards;
      case 'reviewedToday':
        return reviewedTodayCards;
      default:
        return masteredCards;
    }
  }, [activeFilter, masteredCards, learningCards, reviewedTodayCards]);

  // Filtered by search query
  const displayedCards = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return currentList;
    return currentList.filter(
      (c) =>
        c.word.toLowerCase().includes(q) ||
        c.definition_vi.toLowerCase().includes(q) ||
        c.topic.toLowerCase().includes(q)
    );
  }, [currentList, searchQuery]);

  if (!isOpen) return null;

  return (
    <div
      className="word-inspector-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="word-inspector-title"
    >
      <div className="word-inspector-card">
        {/* Header */}
        <div className="word-inspector-header">
          <div>
            <h2 id="word-inspector-title" className="word-inspector-title">
              Sổ tay từ vựng
            </h2>
            <p className="word-inspector-subtitle">
              Xem chi tiết danh sách từ vựng theo trạng thái học tập của bạn
            </p>
          </div>
          <button
            className="word-inspector-close-btn"
            onClick={onClose}
            aria-label="Đóng sổ tay từ vựng"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="word-inspector-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={activeFilter === 'mastered'}
            className={`inspector-tab-btn ${activeFilter === 'mastered' ? 'active-emerald' : ''}`}
            onClick={() => {
              setActiveFilter('mastered');
              setSearchQuery('');
            }}
          >
            Đã thuộc ({masteredCards.length})
          </button>
          <button
            role="tab"
            aria-selected={activeFilter === 'learning'}
            className={`inspector-tab-btn ${activeFilter === 'learning' ? 'active-gold' : ''}`}
            onClick={() => {
              setActiveFilter('learning');
              setSearchQuery('');
            }}
          >
            Đang học ({learningCards.length})
          </button>
          <button
            role="tab"
            aria-selected={activeFilter === 'reviewedToday'}
            className={`inspector-tab-btn ${activeFilter === 'reviewedToday' ? 'active-primary' : ''}`}
            onClick={() => {
              setActiveFilter('reviewedToday');
              setSearchQuery('');
            }}
          >
            Hôm nay đã ôn ({reviewedTodayCards.length || reviewedTodayCount})
          </button>
        </div>

        {/* Search Bar */}
        <div className="word-inspector-search-row">
          <div className="inspector-search-input-wrap">
            <svg className="inspector-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              className="inspector-search-input"
              placeholder="Tìm theo từ tiếng Anh hoặc nghĩa tiếng Việt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="inspector-search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Xóa tìm kiếm"
              >
                ✕
              </button>
            )}
          </div>
          <span className="inspector-count-label">
            {displayedCards.length} từ
          </span>
        </div>

        {/* Word List Area */}
        <div className="word-inspector-list">
          {displayedCards.length > 0 ? (
            displayedCards.map((card) => (
              <div key={card.id} className="inspector-word-row">
                <div className="inspector-word-main">
                  <div className="inspector-word-heading">
                    <span className="inspector-word-text">{card.word}</span>
                    <button
                      className={`inspector-audio-btn ${playingWordId === card.id ? 'playing' : ''}`}
                      onClick={(e) => handlePlayAudio(card, e)}
                      title={`Phát âm từ "${card.word}"`}
                      aria-label={`Phát âm từ "${card.word}"`}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      </svg>
                    </button>
                    <span className="inspector-phonetic">{card.phonetic}</span>
                  </div>

                  <p className="inspector-def">{card.definition_vi}</p>

                  {card.collocations && card.collocations.length > 0 && (
                    <div className="inspector-collocations">
                      <span className="inspector-collocations-label">Cụm từ:</span>
                      <span className="inspector-collocations-text">
                        {card.collocations.slice(0, 2).join(' • ')}
                      </span>
                    </div>
                  )}
                </div>

                <div className="inspector-word-meta">
                  <div className="inspector-badges">
                    <span className="inspector-badge badge-topic">{card.topic}</span>
                    <span className="inspector-badge badge-level">Bậc {card.level}</span>
                  </div>
                  <span className="inspector-srs-info">
                    {card.srs_metadata.reps > 0
                      ? `Đã ôn ${card.srs_metadata.reps} lần • Độ bền ${Math.round(card.srs_metadata.stability)} ngày`
                      : 'Chưa học'}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="inspector-empty-state">
              <p className="inspector-empty-title">
                {searchQuery
                  ? 'Không tìm thấy từ vựng nào khớp với từ khóa'
                  : activeFilter === 'mastered'
                  ? 'Chưa có từ vựng nào đạt mốc đã thuộc'
                  : activeFilter === 'learning'
                  ? 'Chưa có từ vựng nào đang trong chu kỳ học'
                  : 'Chưa có từ vựng nào được ôn trong ngày hôm nay'}
              </p>
              <p className="inspector-empty-desc">
                {searchQuery
                  ? 'Hãy thử tìm bằng từ khóa khác hoặc xóa ô tìm kiếm.'
                  : 'Hãy tiếp tục lật thẻ trong Hàng đợi học tập để củng cố và tích lũy từ vựng.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
