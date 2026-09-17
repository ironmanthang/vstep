/**
 * Resolves the English word and its bounding rectangle at a specific client coordinate.
 * Works natively on touch and click without requiring OS text selection.
 */
export function getWordAtCoordinates(x: number, y: number): { word: string; rect: DOMRect } | null {
  if (typeof document === 'undefined') return null;

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

/**
 * Sanitizes a raw word string for dictionary lookup: trims whitespace,
 * converts to lowercase, and strips leading/trailing non-alphabetic characters.
 */
export function sanitizeLookupWord(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, '');
}
