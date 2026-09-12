import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { FlashcardItem, SRSRating } from '../../types/schemas';
import { VolumeIcon } from '../../components/Icons';
import { getNextIntervalPreview, formatInterval } from './srs';
import './FlashcardCard.css';

interface FlashcardCardProps {
  card: FlashcardItem;
  onReview: (cardId: string, rating: SRSRating) => void;
  isFlipped: boolean;
  onFlip: () => void;
  disabled?: boolean;
}

const SWIPE_THRESHOLD = 90;

export const FlashcardCard: React.FC<FlashcardCardProps> = ({
  card,
  onReview,
  isFlipped,
  onFlip,
  disabled = false,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isExiting, setIsExiting] = useState<'wrong' | 'correct' | null>(null);

  const touchStartPos = useRef<{ x: number; y: number } | null>(null);
  const isScrollDirection = useRef<boolean | null>(null);
  const hasMovedFarEnough = useRef<boolean>(false);

  // Freeze card data during exit animation so new card content never flashes on exiting face
  const [frozenCard, setFrozenCard] = useState<FlashcardItem | null>(null);
  const displayCard = isExiting && frozenCard ? frozenCard : card;

  // Play natural pronunciation using Web Speech API
  const playAudio = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(displayCard.word);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  }, [displayCard.word]);

  const handlePlayAudioClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playAudio();
  };

  const handleRating = useCallback((rating: SRSRating, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (disabled) return;

    setFrozenCard(card);
    setIsExiting(rating === 'wrong' ? 'wrong' : 'correct');
    setTimeout(() => {
      onReview(card.id, rating);
      setIsExiting(null);
      setFrozenCard(null);
      setDragOffset(0);
    }, 180);
  }, [card, disabled, onReview]);

  // Global Keyboard Shortcuts for Laptop/Desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable ||
          target.closest('.reminder-modal-card') ||
          target.closest('.confirm-modal-box'))
      ) {
        return;
      }

      if (disabled) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleRating('wrong');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleRating('correct');
      } else if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        onFlip();
      } else if (e.key.toLowerCase() === 'a' || e.key.toLowerCase() === 'p') {
        e.preventDefault();
        playAudio();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [disabled, handleRating, onFlip, playAudio]);

  // Proportional Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled || isExiting) return;
    touchStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    isScrollDirection.current = null;
    hasMovedFarEnough.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartPos.current || disabled || isExiting) return;

    const deltaX = e.touches[0].clientX - touchStartPos.current.x;
    const deltaY = e.touches[0].clientY - touchStartPos.current.y;

    // Detect if this gesture is vertical page scrolling or horizontal card swipe
    if (isScrollDirection.current === null) {
      if (Math.abs(deltaX) > 7 || Math.abs(deltaY) > 7) {
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          // Vertical scroll detected — let browser handle scrolling normally
          isScrollDirection.current = true;
          return;
        } else {
          // Horizontal card swipe detected
          isScrollDirection.current = false;
        }
      } else {
        return;
      }
    }

    if (isScrollDirection.current === true) {
      return;
    }

    // Proportional drag tracking
    hasMovedFarEnough.current = true;
    setIsDragging(true);
    // Dampen drag slightly beyond threshold for organic resistance
    const dampedDelta = Math.sign(deltaX) * Math.min(Math.abs(deltaX), 240);
    setDragOffset(dampedDelta);
  };

  const handleTouchEnd = () => {
    if (!touchStartPos.current || disabled || isExiting) {
      touchStartPos.current = null;
      setIsDragging(false);
      return;
    }

    if (isScrollDirection.current === true) {
      touchStartPos.current = null;
      setIsDragging(false);
      setDragOffset(0);
      return;
    }

    const currentOffset = dragOffset;
    touchStartPos.current = null;
    setIsDragging(false);

    if (Math.abs(currentOffset) >= SWIPE_THRESHOLD) {
      // Swiped all the way past threshold
      handleRating(currentOffset < 0 ? 'wrong' : 'correct');
    } else {
      // Released before threshold: spring back
      setDragOffset(0);
    }
  };

  const handleTouchCancel = () => {
    touchStartPos.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleCardClick = () => {
    // Only flip if not currently dragging or exiting
    if (!hasMovedFarEnough.current && !isExiting) {
      onFlip();
    }
  };

  // Preview the next interval for the Correct button
  const nextIntervalDays = getNextIntervalPreview(displayCard);
  const intervalLabel = formatInterval(nextIntervalDays);

  return (
    <div
      className="flashcard-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    >
      <div
        className={`flashcard-swipe-track ${isDragging ? 'is-dragging' : ''} ${
          isExiting ? `exiting-${isExiting}` : ''
        }`}
        style={{
          transform: isExiting
            ? isExiting === 'wrong'
              ? 'translateX(-125%) rotate(-12deg)'
              : 'translateX(125%) rotate(12deg)'
            : isDragging
            ? `translateX(${dragOffset}px) rotate(${dragOffset * 0.05}deg)`
            : 'none',
          transition: isDragging
            ? 'none'
            : isExiting
            ? 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)'
            : 'transform 0.28s cubic-bezier(0.175, 0.885, 0.32, 1.15)',
        }}
      >
        {/* Real-time Proportional Swipe Stamps */}
        <div
          className="swipe-stamp stamp-wrong"
          style={{
            opacity: dragOffset < -12 ? Math.min(1, Math.abs(dragOffset) / 80) : 0,
          }}
        >
          ✗ SAI
        </div>
        <div
          className="swipe-stamp stamp-correct"
          style={{
            opacity: dragOffset > 12 ? Math.min(1, dragOffset / 80) : 0,
          }}
        >
          ✓ ĐÚNG
        </div>

        <div
          className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`}
          onClick={handleCardClick}
          role="button"
          tabIndex={0}
          aria-label={`Thẻ từ vựng: ${displayCard.word}. Nhấn hoặc phím Space để lật thẻ`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onFlip();
            }
          }}
        >
          {/* FRONT OF CARD */}
          <div className="card-face card-front">
            <div className="card-header">
              <span className="badge badge-primary">{displayCard.topic}</span>
              <span className="badge badge-gold">Bậc {displayCard.level}</span>
            </div>

            <div className="card-main-word">
              <h2 className="word-text">{displayCard.word}</h2>
              <div className="phonetic-row">
                <span className="phonetic-text">{displayCard.phonetic}</span>
                <button
                  className={`audio-btn ${isPlayingAudio ? 'playing' : ''}`}
                  onClick={handlePlayAudioClick}
                  title="Phát âm chuẩn tiếng Anh (Phím A hoặc P)"
                  aria-label="Nghe phát âm"
                >
                  <VolumeIcon size={18} />
                </button>
              </div>
              <span className="pos-badge">{displayCard.part_of_speech}</span>
            </div>

            <div className="card-footer-hint">
              <span className="flip-instruction">
                Chạm để xem nghĩa • Vuốt trái <strong>Sai</strong> • Vuốt phải <strong>Đúng</strong>
              </span>
            </div>
          </div>

          {/* BACK OF CARD — Streamlined & Centered Ergonomics */}
          <div className="card-face card-back">
            <div className="card-header back-header-minimal">
              <span className="badge badge-gold">Bậc {displayCard.level}</span>
              <span className="keyboard-flip-hint">Space để lật lại</span>
            </div>

            {/* Vietnamese Meaning Centered at Optical Horizon */}
            <div className="card-main-def">
              <h2 className="def-text-center">{displayCard.definition_vi}</h2>
              <span className="pos-badge">{displayCard.part_of_speech}</span>
            </div>

            {/* Context & Usage Section */}
            <div className="card-context-section">
              {displayCard.collocations && displayCard.collocations.length > 0 && (
                <div className="collocations-box">
                  <div className="colloc-chips">
                    {displayCard.collocations.map((colloc, idx) => (
                      <span key={idx} className="colloc-chip">
                        {colloc}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="example-box">
                <p className="example-en">"{displayCard.example_sentence_en}"</p>
                <p className="example-vi">{displayCard.example_sentence_vi}</p>
              </div>
            </div>

            {/* BINARY SRS RATING BUTTONS */}
            <div className="srs-action-bar">
              <button
                className="srs-btn srs-btn-wrong"
                onClick={(e) => handleRating('wrong', e)}
                disabled={disabled}
                title={
                  disabled
                    ? 'Vui lòng kết nối Internet để tiếp tục ôn tập'
                    : 'Trả lời sai (Phím ← hoặc Vuốt trái) — Ôn lại ngay'
                }
              >
                <span className="srs-btn-label">
                  <span className="key-badge">←</span> ✗ Sai
                </span>
                <span className="srs-btn-interval">Ôn lại ngay</span>
              </button>

              <button
                className="srs-btn srs-btn-correct"
                onClick={(e) => handleRating('correct', e)}
                disabled={disabled}
                title={
                  disabled
                    ? 'Vui lòng kết nối Internet để tiếp tục ôn tập'
                    : `Trả lời đúng (Phím → hoặc Vuốt phải) — Ôn lại sau ${intervalLabel}`
                }
              >
                <span className="srs-btn-label">
                  <span className="key-badge">→</span> ✓ Đúng
                </span>
                <span className="srs-btn-interval">{intervalLabel}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
