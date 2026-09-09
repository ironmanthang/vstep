import { describe, it, expect } from 'vitest';
import { ALL_SPEAKING_PRACTICE_TESTS } from './speakingBank';

describe('Speaking Practice Bank Integrity', () => {
  it('should have 5 authentic exam sessions', () => {
    expect(ALL_SPEAKING_PRACTICE_TESTS.length).toBe(5);
  });

  it('each exam session should have complete 3 parts', () => {
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
      expect(exam.part3.follow_up_questions.length).toBeGreaterThanOrEqual(2);
    });
  });
});
