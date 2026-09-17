import { describe, it, expect } from 'vitest';
import { sanitizeLookupWord, getWordAtCoordinates } from '../utils/wordCoordinates';

describe('Dictionary Context & Utilities', () => {
  it('sanitizes words correctly by stripping non-alphabetic edges and trimming', () => {
    expect(sanitizeLookupWord('  "Photosynthesis"  ')).toBe('photosynthesis');
    expect(sanitizeLookupWord("it's")).toBe("it's");
    expect(sanitizeLookupWord('[ecosystem]')).toBe('ecosystem');
    expect(sanitizeLookupWord('123')).toBe('');
  });

  it('safely handles coordinate resolution when document or text nodes are missing', () => {
    expect(getWordAtCoordinates(0, 0)).toBe(null);
    expect(getWordAtCoordinates(999, 999)).toBe(null);
  });
});
