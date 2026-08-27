import React, { useState } from 'react';
import type { FlashcardItem, SRSRating } from '../../types/schemas';
import { VolumeIcon } from '../../components/Icons';
import './FlashcardCard.css';

interface FlashcardCardProps {
  card: FlashcardItem;
  onReview: (cardId: string, rating: SRSRating) => void;
  isFlipped: boolean;
  onFlip: () => void;
}

export const FlashcardCard: React.FC<FlashcardCardProps> = ({
  card,
  onReview,
  isFlipped,
  onFlip,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Play natural pronunciation using Web Speech API
  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(card.word);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleRating = (rating: SRSRating, e: React.MouseEvent) => {
    e.stopPropagation();
    onReview(card.id, rating);
  };

  return (
    <div className="flashcard-container">
      <div
        className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`}
        onClick={onFlip}
        role="button"
        tabIndex={0}
        aria-label={`Thẻ từ vựng: ${card.word}. Nhấn để lật thẻ`}
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
            <span className="badge badge-primary">{card.topic}</span>
            <span className="badge badge-gold">Bậc {card.level}</span>
          </div>

          <div className="card-main-word">
            <h2 className="word-text">{card.word}</h2>
            <div className="phonetic-row">
              <span className="phonetic-text">{card.phonetic}</span>
              <button
                className={`audio-btn ${isPlayingAudio ? 'playing' : ''}`}
                onClick={handlePlayAudio}
                title="Phát âm chuẩn tiếng Anh"
                aria-label="Nghe phát âm"
              >
                <VolumeIcon size={18} />
              </button>
            </div>
            <span className="pos-badge">{card.part_of_speech}</span>
          </div>

          <div className="card-footer-hint">
            <span className="flip-instruction">Nhấn vào thẻ để xem nghĩa và ví dụ</span>
          </div>
        </div>

        {/* BACK OF CARD */}
        <div className="card-face card-back">
          <div className="card-header">
            <span className="back-word-title">{card.word}</span>
            <span className="badge badge-primary">{card.topic}</span>
          </div>

          <div className="definition-box">
            <span className="def-label">Định nghĩa tiếng Việt:</span>
            <p className="def-text">{card.definition_vi}</p>
          </div>

          {card.collocations && card.collocations.length > 0 && (
            <div className="collocations-box">
              <span className="colloc-label">Cụm từ thường gặp (Collocations):</span>
              <div className="colloc-chips">
                {card.collocations.map((colloc, idx) => (
                  <span key={idx} className="colloc-chip">{colloc}</span>
                ))}
              </div>
            </div>
          )}

          <div className="example-box">
            <span className="example-label">Ví dụ thực tế VSTEP:</span>
            <p className="example-en">"{card.example_sentence_en}"</p>
            <p className="example-vi">{card.example_sentence_vi}</p>
          </div>

          {/* SRS RATING BUTTONS */}
          <div className="srs-action-bar">
            <button
              className="srs-btn srs-btn-forgot"
              onClick={(e) => handleRating('forgot', e)}
              title="Cần ôn lại trong ngày mai (1 ngày)"
            >
              <span className="srs-btn-label">Quên</span>
              <span className="srs-btn-interval">1 ngày</span>
            </button>

            <button
              className="srs-btn srs-btn-remembered"
              onClick={(e) => handleRating('remembered', e)}
              title="Nhớ được từ, ôn lại sau vài ngày"
            >
              <span className="srs-btn-label">Nhớ</span>
              <span className="srs-btn-interval">3–7 ngày</span>
            </button>

            <button
              className="srs-btn srs-btn-easy"
              onClick={(e) => handleRating('easy', e)}
              title="Từ rất dễ / Đã nắm chắc, giãn lịch ôn dài"
            >
              <span className="srs-btn-label">Rất dễ</span>
              <span className="srs-btn-interval">14–30 ngày</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
