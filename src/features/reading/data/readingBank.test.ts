import { describe, it, expect } from 'vitest';
import { ULIS_READING_TEST_01 } from './mockTests/ulisReadingTest01';

const OFFICIAL_KEYS = [
  'B', 'A', 'B', 'B', 'B', 'B', 'C', 'D', 'C', 'B', // 1-10
  'A', 'D', 'A', 'B', 'C', 'A', 'D', 'C', 'A', 'D', // 11-20
  'A', 'C', 'D', 'B', 'C', 'D', 'B', 'A', 'C', 'D', // 21-30
  'A', 'B', 'A', 'B', 'A', 'C', 'D', 'C', 'D', 'B', // 31-40
];

describe('Authentic ULIS Reading Test 1 Integrity', () => {
  it('should have exactly 4 passages totaling 40 questions', () => {
    expect(ULIS_READING_TEST_01.passages.length).toBe(4);
    const totalQ = ULIS_READING_TEST_01.passages.reduce((acc, p) => acc + p.questions.length, 0);
    expect(totalQ).toBe(40);
  });

  it('each question should have 4 choices, valid key and non-empty explanation', () => {
    ULIS_READING_TEST_01.passages.forEach((p) => {
      expect(p.content_paragraphs.length).toBeGreaterThan(3);
      expect(p.questions.length).toBe(10);
      p.questions.forEach((q) => {
        expect(q.options.length).toBe(4);
        expect(['A', 'B', 'C', 'D']).toContain(q.correct_key);
        expect(q.explanation_vi).toBeTruthy();
      });
    });
  });

  it('all 40 questions must match the official answer key from PDF page 131', () => {
    const allQuestions = ULIS_READING_TEST_01.passages.flatMap((p) => p.questions);
    allQuestions.forEach((q, idx) => {
      expect(q.correct_key).toBe(OFFICIAL_KEYS[idx]);
    });
  });

  it('every clue_sentence must be an exact verbatim substring of its paragraph', () => {
    ULIS_READING_TEST_01.passages.forEach((p) => {
      p.questions.forEach((q) => {
        const paragraph = p.content_paragraphs[q.clue_paragraph_index];
        expect(paragraph).toBeDefined();
        expect(q.clue_sentence.length).toBeGreaterThan(5);
        expect(paragraph.includes(q.clue_sentence)).toBe(true);
      });
    });
  });
});
