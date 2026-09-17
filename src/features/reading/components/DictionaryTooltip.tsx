import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { lookupDictionary, type DictEntry } from '../data/dictionaryVi';
import './DictionaryTooltip.css';

interface DictionaryTooltipProps {
  word: string | null;
  position: { x: number; y: number; bottom?: number } | null;
  onClose: () => void;
}

export const DictionaryTooltip: React.FC<DictionaryTooltipProps> = ({
  word,
  position,
  onClose,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const cleanWord = word
    ? word.trim().toLowerCase().replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, '')
    : '';

  // Tier 1: 0ms instant local dictionary lookup with automatic lemmatization fallback
  const localResult = useMemo(() => {
    return cleanWord ? lookupDictionary(cleanWord) : null;
  }, [cleanWord]);

  const localDef: DictEntry | null = localResult?.entry ?? null;
  const lemma = localResult?.lemma;
  const phonetic = localDef?.p;

  // Tier 2: State for asynchronous remote fallback lookup
  const [remoteLookup, setRemoteLookup] = useState<{
    word: string;
    text: string | null;
  }>({ word: '', text: null });

  useEffect(() => {
    // Only fetch remote if word is valid and not found in local dictionary
    if (!cleanWord || localDef) {
      return;
    }

    let isCancelled = false;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(cleanWord)}&langpair=en|vi`,
      { signal: controller.signal }
    )
      .then((res) => res.json())
      .then((data) => {
        clearTimeout(timeoutId);
        if (isCancelled) return;
        const translatedText = data?.responseData?.translatedText;
        if (
          translatedText &&
          translatedText.toLowerCase() !== cleanWord &&
          !translatedText.includes('MYMEMORY WARNING')
        ) {
          // Clean possible noise prefixes like "F1:" or quotes
          const cleanedText = translatedText
            .replace(/^[A-Z0-9]+:/, '')
            .trim();
          setRemoteLookup({ word: cleanWord, text: cleanedText });
        } else {
          setRemoteLookup({
            word: cleanWord,
            text: 'Không tìm thấy định nghĩa tiếng Việt phù hợp.',
          });
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setRemoteLookup({
            word: cleanWord,
            text: 'Không thể kết nối đến từ điển trực tuyến.',
          });
        }
      });

    return () => {
      isCancelled = true;
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [cleanWord, localDef]);

  // Derived state during render (0 cascading renders)
  const isLoading = Boolean(cleanWord && !localDef && remoteLookup.word !== cleanWord);
  const remoteDef = remoteLookup.word === cleanWord ? remoteLookup.text : null;

  // Audio pronunciation via native Web Speech API
  const playPronunciation = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || !cleanWord) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cleanWord);
      utterance.lang = 'en-US';
      utterance.rate = 0.88;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('SpeechSynthesis error:', err);
    }
  }, [cleanWord]);

  // Click outside and Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('touchstart', handlePointerDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('touchstart', handlePointerDown);
    };
  }, [onClose]);

  if (!word || !position || !cleanWord) return null;

  const source = localDef ? 'vstep' : remoteDef ? 'mymemory' : null;

  // Viewport bounds calculation and Smart Flip Positioning
  const cardWidth = 290;
  const clampedX = Math.max(
    12,
    Math.min(window.innerWidth - cardWidth - 12, position.x - cardWidth / 2)
  );

  // Flip below word if tapped in upper 210px of viewport to avoid blocking titles or clipping top
  const isFlippedBelow = position.y < 210;
  const targetY = isFlippedBelow
    ? (position.bottom ? position.bottom + 8 : position.y + 26)
    : position.y;

  return (
    <div className="dictionary-tooltip-overlay">
      <div
        ref={cardRef}
        className={`dictionary-tooltip-card ${isFlippedBelow ? 'flip-below' : 'flip-above'}`}
        style={{
          top: `${targetY}px`,
          left: `${clampedX}px`,
          width: `${cardWidth}px`,
        }}
        role="dialog"
        aria-label={`Từ điển: ${cleanWord}`}
      >
        <div className="dict-header">
          <div className="dict-title-cluster">
            <span className="dict-word-title">{cleanWord}</span>
            {lemma && (
              <span className="dict-lemma-tag" title={`Từ gốc: ${lemma}`}>
                ← {lemma}
              </span>
            )}
            {phonetic && <span className="dict-phonetic">{phonetic}</span>}
            <button
              type="button"
              className="dict-audio-btn"
              onClick={playPronunciation}
              aria-label="Phát âm tiếng Anh"
              title="Nghe phát âm"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            </button>
          </div>

          <div className="dict-header-actions">
            {source === 'vstep' && (
              <span className="dict-source-badge vstep">VSTEP Core</span>
            )}
            {source === 'mymemory' && (
              <span className="dict-source-badge remote">Dịch máy</span>
            )}
            <button
              type="button"
              className="dict-close-btn"
              onClick={onClose}
              aria-label="Đóng tra từ"
            >
              ✕
            </button>
          </div>
        </div>

        {isLoading && !localDef && (
          <div className="dict-loading-state">
            <span>⏳ Đang tra cứu trực tuyến...</span>
          </div>
        )}

        {!isLoading && localDef && (
          <div className="dict-senses-body">
            {localDef.m.map((sense, sIdx) => (
              <div key={sIdx} className="dict-pos-section">
                <span className="dict-pos-pill">{sense.pos}</span>
                <ol className="dict-def-list">
                  {sense.def.map((d, dIdx) => (
                    <li key={dIdx} className="dict-def-item">
                      {d}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        )}

        {!isLoading && !localDef && remoteDef && (
          <div className="dict-machine-body">
            <div className="dict-machine-text">{remoteDef}</div>
          </div>
        )}
      </div>
    </div>
  );
};
