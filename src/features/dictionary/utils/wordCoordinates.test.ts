import { describe, it, expect } from 'vitest';
import { sanitizeLookupWord } from './wordCoordinates';

describe('wordCoordinates utility', () => {
  it('correctly strips non-alphabetic characters and normalizes words', () => {
    expect(sanitizeLookupWord(' "biodiversity," ')).toBe('biodiversity');
    expect(sanitizeLookupWord('ecosystem.')).toBe('ecosystem');
    expect(sanitizeLookupWord('123hello456')).toBe('hello');
    expect(sanitizeLookupWord('(sustainable)')).toBe('sustainable');
    expect(sanitizeLookupWord('---')).toBe('');
  });
});
