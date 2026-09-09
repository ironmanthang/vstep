import { describe, it, expect } from 'vitest';
import {
  normalizeToken,
  tokenizeSentence,
  levenshteinDistance,
  compareDictation,
} from './dictationUtils';

describe('dictationUtils', () => {
  describe('normalizeToken', () => {
    it('should lowercase and strip punctuation from token boundaries', () => {
      expect(normalizeToken('Hello,')).toBe('hello');
      expect(normalizeToken('"world!"')).toBe('world');
      expect(normalizeToken("don't")).toBe("don't");
      expect(normalizeToken('state-of-the-art.')).toBe('state-of-the-art');
    });
  });

  describe('tokenizeSentence', () => {
    it('should split words correctly by whitespace', () => {
      expect(tokenizeSentence('The quick brown fox.')).toEqual(['The', 'quick', 'brown', 'fox.']);
      expect(tokenizeSentence('   Multiple   spaces   here  ')).toEqual(['Multiple', 'spaces', 'here']);
    });
  });

  describe('levenshteinDistance', () => {
    it('should compute exact edit distance', () => {
      expect(levenshteinDistance('kitten', 'sitting')).toBe(3);
      expect(levenshteinDistance('book', 'back')).toBe(2);
      expect(levenshteinDistance('word', 'word')).toBe(0);
      expect(levenshteinDistance('', 'test')).toBe(4);
    });
  });

  describe('compareDictation', () => {
    it('should return 100% match for exact matching text with differing casing/punctuation', () => {
      const target = 'Attention passengers on flight VN123, please proceed to gate 4.';
      const user = 'attention passengers on flight VN123 please proceed to gate 4';
      const result = compareDictation(user, target);

      expect(result.isExactMatch).toBe(true);
      expect(result.accuracyPercentage).toBe(100);
      expect(result.tokens.every(t => t.status === 'correct')).toBe(true);
    });

    it('should handle completely empty user input', () => {
      const target = 'Welcome to the university lecture.';
      const result = compareDictation('', target);

      expect(result.isExactMatch).toBe(false);
      expect(result.accuracyPercentage).toBe(0);
      expect(result.tokens.every(t => t.status === 'missing')).toBe(true);
      expect(result.tokens.length).toBe(5);
    });

    it('should identify misspelled words', () => {
      const target = 'The conference will discuss environmental protection.';
      const user = 'The conference will discuss enviromental protection.';
      const result = compareDictation(user, target);

      expect(result.isExactMatch).toBe(false);
      const typoToken = result.tokens.find(t => t.status === 'misspelled');
      expect(typoToken).toBeDefined();
      expect(typoToken?.text).toBe('enviromental');
      expect(typoToken?.expected).toBe('environmental');
    });

    it('should handle omitted words at beginning, middle, and end', () => {
      const target = 'The student asked for a detailed explanation.';
      const user = 'The asked for explanation';
      const result = compareDictation(user, target);

      expect(result.isExactMatch).toBe(false);
      expect(result.accuracyPercentage).toBeLessThan(100);
      const missingTokens = result.tokens.filter(t => t.status === 'missing');
      expect(missingTokens.length).toBeGreaterThan(0);
    });

    it('should identify extra words inserted by user', () => {
      const target = 'Please turn off your phones.';
      const user = 'Please kindly turn off all your mobile phones.';
      const result = compareDictation(user, target);

      expect(result.isExactMatch).toBe(false);
      const extraTokens = result.tokens.filter(t => t.status === 'extra');
      expect(extraTokens.length).toBeGreaterThan(0);
    });
  });
});
