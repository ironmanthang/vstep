import { describe, it, expect } from 'vitest';
import { ALL_SPEAKING_PRACTICE_TESTS } from './speakingBank';
import { ALL_ULIS_SPEAKING_TESTS } from './mockTests';

describe('Speaking Practice Bank Integrity', () => {
  it('should have 7 authentic ULIS tests and total 12 practice tests', () => {
    expect(ALL_ULIS_SPEAKING_TESTS.length).toBe(7);
    expect(ALL_SPEAKING_PRACTICE_TESTS.length).toBe(12);
  });

  it('each ULIS exam session should have complete 3 parts and authentic sample responses', () => {
    ALL_ULIS_SPEAKING_TESTS.forEach((exam, idx) => {
      expect(exam.id).toBe(`ulis_spk_test_0${idx + 1}`);
      expect(exam.title).toBeTruthy();

      // Part 1
      expect(exam.part1.topics.length).toBe(2);
      exam.part1.topics.forEach((t) => {
        expect(t.questions.length).toBe(3);
      });
      expect(exam.part1.sample_response?.text).toBeTruthy();

      // Part 2
      expect(exam.part2.situation).toBeTruthy();
      expect(exam.part2.options.length).toBe(3);
      expect(exam.part2.sample_response?.text).toBeTruthy();

      // Part 3
      expect(exam.part3.topic).toBeTruthy();
      expect(exam.part3.mindmap_ideas.length).toBeGreaterThanOrEqual(3);
      expect(exam.part3.sample_response?.text).toBeTruthy();
    });
  });

  it('all exams in practice bank should have complete 3 parts', () => {
    ALL_SPEAKING_PRACTICE_TESTS.forEach((exam) => {
      expect(exam.id).toBeTruthy();
      expect(exam.title).toBeTruthy();

      // Part 1
      expect(exam.part1.topics.length).toBe(2);
      exam.part1.topics.forEach((t) => {
        expect(t.questions.length).toBe(3);
      });

      // Part 2
      expect(exam.part2.situation).toBeTruthy();
      expect(exam.part2.options.length).toBe(3);

      // Part 3
      expect(exam.part3.topic).toBeTruthy();
      expect(exam.part3.mindmap_ideas.length).toBeGreaterThanOrEqual(3);
    });
  });
});
