import { useRef, useEffect } from 'react';
import type { ReadingPassage, ReaderSettings } from '../types';
import { useDictionary } from '../../dictionary';
import { getWordAtCoordinates } from '../../dictionary/utils/wordCoordinates';
import { renderInlineMarkdown } from '../utils/inlineMarkdown';
import './PassagePanel.css';

interface PassagePanelProps {
  passage: ReadingPassage;
  activeClueSentence?: string;
  readerSettings: ReaderSettings;
  onChangeReaderSettings: (settings: Partial<ReaderSettings>) => void;
  onWordSelect?: (word: string, position: { x: number; y: number; bottom?: number }) => void;
}

export const PassagePanel: React.FC<PassagePanelProps> = ({
  passage,
  activeClueSentence,
  readerSettings,
  onChangeReaderSettings,
  onWordSelect,
}) => {
  const { lookupWord } = useDictionary();
  const handleWordSelect = onWordSelect ?? lookupWord;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const evidenceRef = useRef<HTMLElement | null>(null);
  const touchStartPos = useRef<{ x: number; y: number; time: number } | null>(null);

  // Auto-scroll passage to evidence highlight when activeClueSentence changes
  useEffect(() => {
    if (evidenceRef.current && activeClueSentence) {
      evidenceRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeClueSentence]);

  // Touch handlers for seamless 1-tap word lookup on mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartPos.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now(),
      };
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartPos.current || e.changedTouches.length === 0) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartPos.current.x;
    const dy = touch.clientY - touchStartPos.current.y;
    const dt = Date.now() - touchStartPos.current.time;
    touchStartPos.current = null;

    // Distinguish a clean tap from a scroll/swipe or long-press
    if (Math.hypot(dx, dy) > 8 || dt > 400) {
      return;
    }

    const resolved = getWordAtCoordinates(touch.clientX, touch.clientY);
    if (resolved) {
      handleWordSelect(resolved.word, {
        x: resolved.rect.left + resolved.rect.width / 2,
        y: resolved.rect.top,
        bottom: resolved.rect.bottom,
      });
    }
  };

  // Handle desktop mouse text selection
  const handleTextInteraction = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const selectedText = selection.toString().trim();
    if (selectedText && selectedText.length <= 32 && !selectedText.includes(' ') && !selectedText.includes('\n')) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      handleWordSelect(selectedText, {
        x: rect.left + rect.width / 2,
        y: rect.top,
        bottom: rect.bottom,
      });
    }
  };

  // Handle desktop double click
  const handleDoubleClick = (e: React.MouseEvent) => {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim();
    if (selectedText && selectedText.length <= 32 && !selectedText.includes(' ')) {
      const range = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
      const rect = range ? range.getBoundingClientRect() : null;
      handleWordSelect(selectedText, {
        x: rect ? rect.left + rect.width / 2 : e.clientX,
        y: rect ? rect.top : e.clientY,
        bottom: rect ? rect.bottom : e.clientY + 22,
      });
    }
  };

  const renderParagraphContent = (text: string) => {
    // Check if this paragraph contains the active evidence clue
    const hasClue = activeClueSentence && text.includes(activeClueSentence);

    // If clue sentence exists in this paragraph, highlight it
    if (hasClue && activeClueSentence) {
      const clueIndex = text.indexOf(activeClueSentence);
      const before = text.slice(0, clueIndex);
      const clue = text.slice(clueIndex, clueIndex + activeClueSentence.length);
      const after = text.slice(clueIndex + activeClueSentence.length);

      return (
        <>
          {renderInlineMarkdown(before, true)}
          <mark
            ref={evidenceRef}
            className="clue-evidence-highlight"
            title="Dẫn chứng cho câu hỏi đang chọn"
          >
            {renderInlineMarkdown(clue, true)}
          </mark>
          {renderInlineMarkdown(after, true)}
        </>
      );
    }

    return renderInlineMarkdown(text, true);
  };

  return (
    <div className="passage-panel-wrapper">
      {/* Reader Toolbar */}
      <div className="reader-toolbar">
        <div className="reader-meta-tag">
          <span className="reader-word-count">~{passage.word_count} từ</span>
        </div>

        <div className="reader-controls-cluster">
          {/* Font Size controls */}
          <div className="reader-btn-group" title="Cỡ chữ bài đọc">
            <button
              type="button"
              className="reader-tool-btn"
              onClick={() =>
                onChangeReaderSettings({
                  fontSize: Math.max(14, readerSettings.fontSize - 1),
                })
              }
              disabled={readerSettings.fontSize <= 14}
              aria-label="Giảm cỡ chữ"
            >
              A-
            </button>
            <span className="reader-val-indicator">{readerSettings.fontSize}px</span>
            <button
              type="button"
              className="reader-tool-btn"
              onClick={() =>
                onChangeReaderSettings({
                  fontSize: Math.min(22, readerSettings.fontSize + 1),
                })
              }
              disabled={readerSettings.fontSize >= 22}
              aria-label="Tăng cỡ chữ"
            >
              A+
            </button>
          </div>
        </div>
      </div>

      {/* Main Passage Content Body */}
      <div
        ref={containerRef}
        className="passage-content-container"
        style={{
          fontSize: `${readerSettings.fontSize}px`,
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseUp={handleTextInteraction}
        onDoubleClick={handleDoubleClick}
      >
        <h2 className="passage-main-title">{passage.title}</h2>
        {passage.topic && (
          <div className="passage-topic-tag">Chủ đề: {passage.topic}</div>
        )}

        <article className="passage-paragraphs-flow">
          {passage.content_paragraphs.map((pText, pIdx) => (
            <p key={pIdx} className="passage-paragraph-text">
              {renderParagraphContent(pText)}
            </p>
          ))}
        </article>
      </div>
    </div>
  );
};
