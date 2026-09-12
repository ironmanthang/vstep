import { describe, it, expect } from 'vitest';
import {
  WRITING_TASK1_BANK,
  WRITING_TASK2_BANK,
  ALL_WRITING_PRACTICE_PROMPTS,
} from './writingBank';
import { ALL_ULIS_WRITING_TESTS, ULIS_WRITING_TESTS_MAP } from './mockTests';

describe('Writing Practice Bank Integrity', () => {
  it('should export non-empty Task 1 and Task 2 collections', () => {
    expect(WRITING_TASK1_BANK.length).toBeGreaterThanOrEqual(2);
    expect(WRITING_TASK2_BANK.length).toBeGreaterThanOrEqual(2);
    expect(ALL_WRITING_PRACTICE_PROMPTS.length).toBe(
      WRITING_TASK1_BANK.length + WRITING_TASK2_BANK.length
    );
  });

  it('each Task 1 letter prompt should meet VSTEP B1-B2 exam standards', () => {
    WRITING_TASK1_BANK.forEach((prompt) => {
      expect(prompt.id).toBeTruthy();
      expect(prompt.task_type).toBe('task1_letter');
      expect(prompt.time_allowed_minutes).toBe(20);
      expect(prompt.min_words).toBe(120);
      expect(prompt.prompt_text.trim().length).toBeGreaterThan(50);
      expect(prompt.sample_response).toBeDefined();
      expect(prompt.sample_response?.text.trim().length).toBeGreaterThan(100);
      expect(prompt.sample_response?.band).toBeTruthy();
    });
  });

  it('each Task 2 essay prompt should meet VSTEP B1-B2 exam standards', () => {
    WRITING_TASK2_BANK.forEach((prompt) => {
      expect(prompt.id).toBeTruthy();
      expect(prompt.task_type).toBe('task2_essay');
      expect(prompt.time_allowed_minutes).toBe(40);
      expect(prompt.min_words).toBe(250);
      expect(prompt.prompt_text.trim().length).toBeGreaterThan(50);
      expect(prompt.sample_response).toBeDefined();
      expect(prompt.sample_response?.text.trim().length).toBeGreaterThan(150);
      expect(prompt.sample_response?.band).toBeTruthy();
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

  it('each ULIS test has verified Task 1 letter with B1 sample answer', () => {
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

  it('each ULIS test has verified Task 2 essay with B1 sample answer', () => {
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
