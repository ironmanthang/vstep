import { useRef, useEffect } from 'react';
import type { ReadingPassage, ReaderSettings, ReaderTheme } from '../types';
import './PassagePanel.css';

interface PassagePanelProps {
  passage: ReadingPassage;
  passageIndex: number;
  totalPassages: number;
  activeClueSentence?: string;
  readerSettings: ReaderSettings;
  onChangeReaderSettings: (settings: Partial<ReaderSettings>) => void;
  onWordSelect: (word: string, position: { x: number; y: number }) => void;
}

const THEME_LABELS: Record<ReaderTheme, { label: string; icon: string }> = {
  'warm-sepia': { label: 'Sepia Ấm', icon: '📜' },
  'obsidian-dark': { label: 'Obsidian Tối', icon: '🌑' },
  'cream-light': { label: 'Giấy Sáng', icon: '☀️' },
};

/**
 * Resolves the English word and its bounding rectangle at a specific client coordinate.
 * Works natively on touch and click without requiring OS text selection.
 */
function getWordAtCoordinates(x: number, y: number): { word: string; rect: DOMRect } | null {
  let textNode: Node | null = null;
  let offset = 0;

  type DocWithCaret = Document & {
    caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node; offset: number } | null;
    caretRangeFromPoint?: (x: number, y: number) => Range | null;
  };
  const doc = document as DocWithCaret;

  if (doc.caretPositionFromPoint) {
    const pos = doc.caretPositionFromPoint(x, y);
    if (pos) {
      textNode = pos.offsetNode;
      offset = pos.offset;
    }
  } else if (doc.caretRangeFromPoint) {
    const range = doc.caretRangeFromPoint(x, y);
    if (range) {
      textNode = range.startContainer;
      offset = range.startOffset;
    }
  }

  if (!textNode || textNode.nodeType !== Node.TEXT_NODE || !textNode.textContent) {
    return null;
  }

  const text = textNode.textContent;
  if (offset < 0 || offset > text.length) return null;

  const isWordChar = (char: string) => /[a-zA-Z0-9'-]/.test(char);

  let start = offset;
  let end = offset;

  // If tapped right at the trailing boundary of a word
  if (start > 0 && !isWordChar(text[start]) && isWordChar(text[start - 1])) {
    start--;
    end--;
  }

  if (!isWordChar(text[start])) {
    return null;
  }

  while (start > 0 && isWordChar(text[start - 1])) {
    start--;
  }
  while (end < text.length && isWordChar(text[end])) {
    end++;
  }

  const word = text.slice(start, end).trim();
  if (!word || word.length > 32) return null;

  try {
    const wordRange = document.createRange();
    wordRange.setStart(textNode, start);
    wordRange.setEnd(textNode, end);
    const rect = wordRange.getBoundingClientRect();
    return { word, rect };
  } catch {
    return null;
  }
}

export const PassagePanel: React.FC<PassagePanelProps> = ({
  passage,
  passageIndex,
  totalPassages,
  activeClueSentence,
  readerSettings,
  onChangeReaderSettings,
  onWordSelect,
}) => {
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
      onWordSelect(resolved.word, {
        x: resolved.rect.left + resolved.rect.width / 2,
        y: resolved.rect.top,
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
      onWordSelect(selectedText, {
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
    }
  };

  // Handle desktop double click
  const handleDoubleClick = (e: React.MouseEvent) => {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim();
    if (selectedText && selectedText.length <= 32 && !selectedText.includes(' ')) {
      onWordSelect(selectedText, { x: e.clientX, y: e.clientY });
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
          {renderInsertionMarkers(before)}
          <mark
            ref={evidenceRef}
            className="clue-evidence-highlight"
            title="Dẫn chứng cho câu hỏi đang chọn"
          >
            {renderInsertionMarkers(clue)}
          </mark>
          {renderInsertionMarkers(after)}
        </>
      );
    }

    return renderInsertionMarkers(text);
  };

  // Convert [A], [B], [C], [D] into interactive styled insertion markers
  const renderInsertionMarkers = (text: string) => {
    const markerRegex = /(\[[A-D]\])/g;
    const parts = text.split(markerRegex);

    return parts.map((part, i) => {
      if (/^\[[A-D]\]$/.test(part)) {
        const letter = part.replace(/[[\]]/g, '');
        return (
          <span
            key={i}
            className="insertion-point-marker"
            data-marker={letter}
            title={`Vị trí chèn câu [${letter}]`}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className={`passage-panel-wrapper theme-${readerSettings.theme}`}>
      {/* Reader Customization Bar */}
      <div className="reader-toolbar">
        <div className="reader-meta-tag">
          <span className="badge badge-primary">
            Bài {passageIndex + 1}/{totalPassages}
          </span>
          <span className="badge badge-emerald">Bậc {passage.difficulty}</span>
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

          {/* Line Height Selector */}
          <div className="reader-btn-group" title="Khoảng cách dòng">
            {([1.5, 1.8, 2.0] as const).map((lh) => (
              <button
                key={lh}
                type="button"
                className={`reader-tool-btn ${readerSettings.lineHeight === lh ? 'active' : ''}`}
                onClick={() => onChangeReaderSettings({ lineHeight: lh })}
                aria-label={`Dãn dòng ${lh}`}
              >
                {lh}x
              </button>
            ))}
          </div>

          {/* Theme Selector */}
          <div className="reader-btn-group" title="Chủ đề màu nền">
            {(Object.keys(THEME_LABELS) as ReaderTheme[]).map((thm) => (
              <button
                key={thm}
                type="button"
                className={`reader-tool-btn ${readerSettings.theme === thm ? 'active' : ''}`}
                onClick={() => onChangeReaderSettings({ theme: thm })}
                title={THEME_LABELS[thm].label}
                aria-label={THEME_LABELS[thm].label}
              >
                {THEME_LABELS[thm].icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tra từ nhanh hint */}
      <div className="reader-dictionary-hint">
        💡 <em>Chạm vào từ bất kỳ trong bài để tra từ điển tiếng Việt tức thì</em>
      </div>

      {/* Main Passage Content Body */}
      <div
        ref={containerRef}
        className="passage-content-container"
        style={{
          fontSize: `${readerSettings.fontSize}px`,
          lineHeight: readerSettings.lineHeight,
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
            <div key={pIdx} className="passage-paragraph-row">
              <span className="paragraph-order-pill" aria-hidden="true">
                [{pIdx + 1}]
              </span>
              <p className="passage-paragraph-text">
                {renderParagraphContent(pText)}
              </p>
            </div>
          ))}
        </article>
      </div>
    </div>
  );
};
