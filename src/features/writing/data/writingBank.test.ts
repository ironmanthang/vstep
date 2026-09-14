import { describe, it, expect } from 'vitest';
import {
  WRITING_TASK1_BANK,
  WRITING_TASK2_BANK,
  ALL_WRITING_PRACTICE_PROMPTS,
  ALL_PRACTICE_WRITING_TESTS,
  HCMUE_WRITING_TESTS,
  HCMUE_WRITING_TESTS_MAP,
} from './writingBank';
import { ALL_ULIS_WRITING_TESTS, ULIS_WRITING_TESTS_MAP } from './mockTests';

describe('Writing Practice Bank (HCMUE 01–05) Integrity', () => {
  it('should export exactly 5 authentic Task 1 and Task 2 prompts', () => {
    expect(WRITING_TASK1_BANK.length).toBe(5);
    expect(WRITING_TASK2_BANK.length).toBe(5);
    expect(ALL_WRITING_PRACTICE_PROMPTS.length).toBe(10);
    expect(HCMUE_WRITING_TESTS.length).toBe(5);
    expect(ALL_PRACTICE_WRITING_TESTS.length).toBe(5);
  });

  it('each Task 1 letter prompt should meet VSTEP B1-B2 exam standards', () => {
    WRITING_TASK1_BANK.forEach((prompt, idx) => {
      expect(prompt.id).toBe(`hcmue_writing_test_0${idx + 1}_t1`);
      expect(prompt.task_type).toBe('task1_letter');
      expect(prompt.time_allowed_minutes).toBe(20);
      expect(prompt.min_words).toBe(120);
      expect(prompt.prompt_text.trim().length).toBeGreaterThan(50);
      expect(prompt.sample_response).toBeDefined();
      expect(prompt.sample_response?.text.trim().length).toBeGreaterThan(100);
      expect(['B1', 'B2', 'C1']).toContain(prompt.sample_response?.band);
    });
  });

  it('each Task 2 essay prompt should meet VSTEP B1-B2 exam standards', () => {
    WRITING_TASK2_BANK.forEach((prompt, idx) => {
      expect(prompt.id).toBe(`hcmue_writing_test_0${idx + 1}_t2`);
      expect(prompt.task_type).toBe('task2_essay');
      expect(prompt.time_allowed_minutes).toBe(40);
      expect(prompt.min_words).toBe(250);
      expect(prompt.prompt_text.trim().length).toBeGreaterThan(50);
      expect(prompt.sample_response).toBeDefined();
      expect(prompt.sample_response?.text.trim().length).toBeGreaterThan(150);
      expect(['B1', 'B2', 'C1']).toContain(prompt.sample_response?.band);
    });
  });

  it('HCMUE_WRITING_TESTS should export 5 valid complete tests with Task 1 and Task 2', () => {
    HCMUE_WRITING_TESTS.forEach((test, idx) => {
      const numStr = String(idx + 1).padStart(2, '0');
      expect(test.id).toBe(`hcmue_writing_test_${numStr}`);
      expect(test.test_number).toBe(idx + 1);
      expect(test.institution).toBe('HCMUE - ĐH Sư phạm TP.HCM');
      expect(test.total_duration_minutes).toBe(60);
      expect(test.task1.task_type).toBe('task1_letter');
      expect(test.task2.task_type).toBe('task2_essay');
      expect(test.task1.sample_response).toBeDefined();
      expect(test.task2.sample_response).toBeDefined();
      expect(HCMUE_WRITING_TESTS_MAP[test.id]).toBe(test);
    });
  });
});

describe('Authentic ULIS Writing Tests 01–07 Integrity', () => {
  it('should export exactly 7 authentic ULIS Writing tests', () => {
    expect(ALL_ULIS_WRITING_TESTS.length).toBe(7);
    for (let i = 1; i <= 7; i++) {
      const numStr = String(i).padStart(2, '0');
      const test = ULIS_WRITING_TESTS_MAP[`ulis_writing_test_${numStr}`];
      expect(test).toBeDefined();
      expect(test.test_number).toBe(i);
      expect(test.total_duration_minutes).toBe(60);
    }
  });

  it('each ULIS test has verified Task 1 letter with sample answer', () => {
    ALL_ULIS_WRITING_TESTS.forEach((test) => {
      const t1 = test.task1;
      expect(t1.task_type).toBe('task1_letter');
      expect(t1.min_words).toBe(120);
      expect(t1.time_allowed_minutes).toBe(20);
      expect(t1.prompt_text.length).toBeGreaterThan(50);
      expect(t1.sample_response).toBeDefined();
      expect(t1.sample_response?.text.length).toBeGreaterThan(100);
      expect(['B1', 'B2', 'C1']).toContain(t1.sample_response?.band);
    });
  });

  it('each ULIS test has verified Task 2 essay with sample answer', () => {
    ALL_ULIS_WRITING_TESTS.forEach((test) => {
      const t2 = test.task2;
      expect(t2.task_type).toBe('task2_essay');
      expect(t2.min_words).toBe(250);
      expect(t2.time_allowed_minutes).toBe(40);
      expect(t2.prompt_text.length).toBeGreaterThan(50);
      expect(t2.sample_response).toBeDefined();
      expect(t2.sample_response?.text.length).toBeGreaterThan(150);
      expect(['B1', 'B2', 'C1']).toContain(t2.sample_response?.band);
    });
  });
});
