import { describe, it, expect } from 'vitest';
import { VSTEP_READING_TEST_11 } from './readingBank';

describe('Reading Practice Bank Integrity', () => {
  it('should have 4 passages totaling 40 questions', () => {
    expect(VSTEP_READING_TEST_11.passages.length).toBe(4);
    const totalQ = VSTEP_READING_TEST_11.passages.reduce((acc, p) => acc + p.questions.length, 0);
    expect(totalQ).toBe(40);
  });

  it('each question should have 4 choices, valid key and explanation', () => {
    VSTEP_READING_TEST_11.passages.forEach((p) => {
      expect(p.content_paragraphs.length).toBeGreaterThan(3);
      expect(p.questions.length).toBe(10);
      p.questions.forEach((q) => {
        expect(q.options.length).toBe(4);
        expect(['A', 'B', 'C', 'D']).toContain(q.correct_key);
        expect(q.explanation_vi).toBeTruthy();
      });
    });
  });
});
