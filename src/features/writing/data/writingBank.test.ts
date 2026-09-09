import { describe, it, expect } from 'vitest';
import {
  WRITING_TASK1_BANK,
  WRITING_TASK2_BANK,
  ALL_WRITING_PRACTICE_PROMPTS,
} from './writingBank';

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

  it('each Task 2 essay prompt should meet VSTEP B2-C1 exam standards', () => {
    WRITING_TASK2_BANK.forEach((prompt) => {
      expect(prompt.id).toBeTruthy();
      expect(prompt.task_type).toBe('task2_essay');
      expect(prompt.time_allowed_minutes).toBe(40);
      expect(prompt.min_words).toBe(250);
      expect(prompt.prompt_text.trim().length).toBeGreaterThan(50);
      expect(prompt.sample_response).toBeDefined();
      expect(prompt.sample_response?.text.trim().length).toBeGreaterThan(200);
      expect(prompt.sample_response?.band).toBeTruthy();
    });
  });
});
