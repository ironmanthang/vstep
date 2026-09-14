import { describe, it, expect } from 'vitest';
import {
  ALL_SPEAKING_PRACTICE_TESTS,
  HCMUE_SPEAKING_TESTS,
  HCMUE_SPEAKING_TESTS_MAP,
} from './speakingBank';
import { ALL_ULIS_SPEAKING_TESTS } from './mockTests';

describe('Speaking Practice Bank (HCMUE 01–05) Integrity', () => {
  it('should have 7 authentic ULIS tests, 5 HCMUE tests, and total 12 practice tests', () => {
    expect(ALL_ULIS_SPEAKING_TESTS.length).toBe(7);
    expect(HCMUE_SPEAKING_TESTS.length).toBe(5);
    expect(ALL_SPEAKING_PRACTICE_TESTS.length).toBe(12);
  });

  it('each HCMUE exam session should have a valid id, test_number, and 3 complete parts with sample responses', () => {
    HCMUE_SPEAKING_TESTS.forEach((exam, idx) => {
      const numStr = String(idx + 1).padStart(2, '0');
      expect(exam.id).toBe(`hcmue_spk_test_${numStr}`);
      expect(exam.test_number).toBe(idx + 1);
      expect(exam.title).toContain(`HCMUE Authentic VSTEP Speaking Test ${numStr}`);

      // Part 1
      expect(exam.part1.topics.length).toBe(2);
      exam.part1.topics.forEach((t: { topic_name: string; questions: string[] }) => {
        expect(t.questions.length).toBe(3);
        expect(t.topic_name).toBeTruthy();
      });
      expect(exam.part1.sample_response?.text).toBeTruthy();
      expect(exam.part1.sample_response?.band).toBeTruthy();

      // Part 2
      expect(exam.part2.situation).toBeTruthy();
      expect(exam.part2.options.length).toBe(3);
      expect(exam.part2.sample_response?.text).toBeTruthy();
      expect(exam.part2.sample_response?.band).toBeTruthy();

      // Part 3
      expect(exam.part3.topic).toBeTruthy();
      expect(exam.part3.mindmap_ideas.length).toBe(3);
      expect(exam.part3.follow_up_questions.length).toBe(3);
      expect(exam.part3.sample_response?.text).toBeTruthy();
      expect(exam.part3.sample_response?.band).toBeTruthy();

      expect(HCMUE_SPEAKING_TESTS_MAP[exam.id]).toBe(exam);
    });
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
