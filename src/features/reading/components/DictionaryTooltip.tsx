import React, { useEffect, useState, useRef } from 'react';
import { DICTIONARY_VI } from '../data/dictionaryVi';
import './DictionaryTooltip.css';

interface DictionaryTooltipProps {
  word: string | null;
  position: { x: number; y: number } | null;
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

  // Tier 1: Derive local definition directly during render (0ms, no cascading render)
  const localDef = cleanWord ? DICTIONARY_VI[cleanWord] || null : null;

  // Tier 2: State for asynchronous remote fallback lookup
  const [remoteDef, setRemoteDef] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Only run network fetch if cleanWord is valid and not found in local dictionary
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
          setRemoteDef(translatedText);
        } else {
          setRemoteDef('Không tìm thấy định nghĩa tiếng Việt phù hợp.');
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setRemoteDef('Không thể kết nối đến từ điển trực tuyến.');
        }
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [cleanWord, localDef]);

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

  const definition = localDef || remoteDef;
  const source = localDef ? 'vstep' : remoteDef ? 'mymemory' : null;

  // Viewport bounds calculation
  const cardWidth = 260;
  const clampedX = Math.max(12, Math.min(window.innerWidth - cardWidth - 12, position.x - cardWidth / 2));
  const clampedY = Math.max(48, position.y);

  return (
    <div className="dictionary-tooltip-overlay">
      <div
        ref={cardRef}
        className="dictionary-tooltip-card"
        style={{
          top: `${clampedY}px`,
          left: `${clampedX}px`,
          width: `${cardWidth}px`,
        }}
        role="dialog"
        aria-label={`Từ điển: ${cleanWord}`}
      >
        <div className="dict-header">
          <span className="dict-word-title">{cleanWord}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {source === 'vstep' && (
              <span className="dict-source-badge vstep">VSTEP Core</span>
            )}
            {source === 'mymemory' && (
              <span className="dict-source-badge">Dịch tự động</span>
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
            <span>⏳ Đang tra cứu nghĩa tiếng Việt...</span>
          </div>
        )}

        {!isLoading && definition && (
          <div className="dict-definition-body">{definition}</div>
        )}
      </div>
    </div>
  );
};
