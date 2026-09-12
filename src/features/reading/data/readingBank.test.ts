import { describe, it, expect } from 'vitest';
import { ULIS_READING_TEST_01 } from './mockTests/ulisReadingTest01';
import { ULIS_READING_TEST_02 } from './mockTests/ulisReadingTest02';
import { ULIS_READING_TEST_03 } from './mockTests/ulisReadingTest03';
import { ULIS_READING_TEST_04 } from './mockTests/ulisReadingTest04';

const TEST1_OFFICIAL_KEYS = [
  'B', 'A', 'B', 'B', 'B', 'B', 'C', 'D', 'C', 'B', // 1-10
  'A', 'D', 'A', 'B', 'C', 'A', 'D', 'C', 'A', 'D', // 11-20
  'A', 'C', 'D', 'B', 'C', 'D', 'B', 'A', 'C', 'D', // 21-30
  'A', 'B', 'A', 'B', 'A', 'C', 'D', 'C', 'D', 'B', // 31-40
];

const TEST2_OFFICIAL_KEYS = [
  'D', 'A', 'D', 'B', 'C', 'B', 'A', 'D', 'C', 'C', // 1-10
  'A', 'B', 'D', 'A', 'D', 'C', 'A', 'B', 'C', 'D', // 11-20
  'A', 'C', 'A', 'B', 'B', 'D', 'B', 'C', 'D', 'B', // 21-30
  'D', 'B', 'D', 'B', 'C', 'A', 'C', 'A', 'B', 'D', // 31-40
];

const TEST3_OFFICIAL_KEYS = [
  'B', 'C', 'D', 'C', 'B', 'B', 'C', 'D', 'C', 'A', // 1-10
  'D', 'C', 'A', 'D', 'C', 'A', 'D', 'C', 'B', 'B', // 11-20
  'C', 'B', 'C', 'A', 'C', 'A', 'D', 'D', 'C', 'D', // 21-30
  'B', 'B', 'D', 'D', 'A', 'B', 'A', 'A', 'D', 'C', // 31-40
];

const TEST4_OFFICIAL_KEYS = [
  'B', 'C', 'A', 'A', 'D', 'D', 'C', 'D', 'B', 'A', // 1-10
  'D', 'A', 'B', 'C', 'D', 'A', 'C', 'B', 'D', 'D', // 11-20
  'C', 'A', 'D', 'C', 'C', 'B', 'D', 'B', 'D', 'A', // 21-30
  'B', 'B', 'B', 'C', 'C', 'A', 'D', 'D', 'A', 'D', // 31-40
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
      expect(q.correct_key).toBe(TEST1_OFFICIAL_KEYS[idx]);
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

describe('Authentic ULIS Reading Test 2 Integrity', () => {
  it('should have exactly 4 passages totaling 40 questions', () => {
    expect(ULIS_READING_TEST_02.passages.length).toBe(4);
    const totalQ = ULIS_READING_TEST_02.passages.reduce((acc, p) => acc + p.questions.length, 0);
    expect(totalQ).toBe(40);
  });

  it('each question should have 4 choices, valid key and non-empty explanation', () => {
    ULIS_READING_TEST_02.passages.forEach((p) => {
      expect(p.content_paragraphs.length).toBeGreaterThan(3);
      expect(p.questions.length).toBe(10);
      p.questions.forEach((q) => {
        expect(q.options.length).toBe(4);
        expect(['A', 'B', 'C', 'D']).toContain(q.correct_key);
        expect(q.explanation_vi).toBeTruthy();
      });
    });
  });

  it('all 40 questions must match the official answer key from PDF page 136', () => {
    const allQuestions = ULIS_READING_TEST_02.passages.flatMap((p) => p.questions);
    allQuestions.forEach((q, idx) => {
      expect(q.correct_key).toBe(TEST2_OFFICIAL_KEYS[idx]);
    });
  });

  it('every clue_sentence must be an exact verbatim substring of its paragraph', () => {
    ULIS_READING_TEST_02.passages.forEach((p) => {
      p.questions.forEach((q) => {
        const paragraph = p.content_paragraphs[q.clue_paragraph_index];
        expect(paragraph).toBeDefined();
        expect(q.clue_sentence.length).toBeGreaterThan(5);
        expect(paragraph.includes(q.clue_sentence)).toBe(true);
      });
    });
  });
});

describe('Authentic ULIS Reading Test 3 Integrity', () => {
  it('should have exactly 4 passages totaling 40 questions', () => {
    expect(ULIS_READING_TEST_03.passages.length).toBe(4);
    const totalQ = ULIS_READING_TEST_03.passages.reduce((acc, p) => acc + p.questions.length, 0);
    expect(totalQ).toBe(40);
  });

  it('each question should have 4 choices, valid key and non-empty explanation', () => {
    ULIS_READING_TEST_03.passages.forEach((p) => {
      expect(p.content_paragraphs.length).toBeGreaterThan(1);
      expect(p.questions.length).toBe(10);
      p.questions.forEach((q) => {
        expect(q.options.length).toBe(4);
        expect(['A', 'B', 'C', 'D']).toContain(q.correct_key);
        expect(q.explanation_vi).toBeTruthy();
      });
    });
  });

  it('all 40 questions must match the official answer key from PDF page 140', () => {
    const allQuestions = ULIS_READING_TEST_03.passages.flatMap((p) => p.questions);
    allQuestions.forEach((q, idx) => {
      expect(q.correct_key).toBe(TEST3_OFFICIAL_KEYS[idx]);
    });
  });

  it('every clue_sentence must be an exact verbatim substring of its paragraph', () => {
    ULIS_READING_TEST_03.passages.forEach((p) => {
      p.questions.forEach((q) => {
        const paragraph = p.content_paragraphs[q.clue_paragraph_index];
        expect(paragraph).toBeDefined();
        expect(q.clue_sentence.length).toBeGreaterThan(5);
        expect(paragraph.includes(q.clue_sentence)).toBe(true);
      });
    });
  });
});

describe('Authentic ULIS Reading Test 4 Integrity', () => {
  it('should have exactly 4 passages totaling 40 questions', () => {
    expect(ULIS_READING_TEST_04.passages.length).toBe(4);
    const totalQ = ULIS_READING_TEST_04.passages.reduce((acc, p) => acc + p.questions.length, 0);
    expect(totalQ).toBe(40);
  });

  it('each question should have 4 choices, valid key and non-empty explanation', () => {
    ULIS_READING_TEST_04.passages.forEach((p) => {
      expect(p.content_paragraphs.length).toBeGreaterThan(1);
      expect(p.questions.length).toBe(10);
      p.questions.forEach((q) => {
        expect(q.options.length).toBe(4);
        expect(['A', 'B', 'C', 'D']).toContain(q.correct_key);
        expect(q.explanation_vi).toBeTruthy();
      });
    });
  });

  it('all 40 questions must match the official answer key from PDF page 145', () => {
    const allQuestions = ULIS_READING_TEST_04.passages.flatMap((p) => p.questions);
    allQuestions.forEach((q, idx) => {
      expect(q.correct_key).toBe(TEST4_OFFICIAL_KEYS[idx]);
    });
  });

  it('every clue_sentence must be an exact verbatim substring of its paragraph', () => {
    ULIS_READING_TEST_04.passages.forEach((p) => {
      p.questions.forEach((q) => {
        const paragraph = p.content_paragraphs[q.clue_paragraph_index];
        expect(paragraph).toBeDefined();
        expect(q.clue_sentence.length).toBeGreaterThan(5);
        expect(paragraph.includes(q.clue_sentence)).toBe(true);
      });
    });
  });
});



