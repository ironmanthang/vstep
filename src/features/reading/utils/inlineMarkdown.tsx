import type { ReactNode } from 'react';

/**
 * Lightweight inline markdown tokenizer that converts **bold** tokens into <strong>
 * and optionally [A]-[D] insertion markers into styled interactive elements.
 * Preserves native DOM text nodes for Tap-to-Translate dictionary coordinate resolution.
 */
export function renderInlineMarkdown(
  text: string,
  enableInsertionMarkers = false
): ReactNode[] {
  const tokenRegex = enableInsertionMarkers
    ? /(\*\*[^*]+\*\*|\[[A-D]\])/g
    : /(\*\*[^*]+\*\*)/g;

  const parts = text.split(tokenRegex);

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (enableInsertionMarkers && /^\[[A-D]\]$/.test(part)) {
      const letter = part.slice(1, 2);
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
}
