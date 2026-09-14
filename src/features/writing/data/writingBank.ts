import type { WritingPrompt } from '../../../types/schemas';
import type { WritingTestInput } from '../types';
import { HCMUE_WRITING_TESTS } from './drills/hcmue';

export * from './drills/hcmue';

/**
 * Authentic VSTEP Writing Practice Bank (HCMUE 01–05)
 * Sourced from "VSTEP Collection: 20 Mock Tests" (NXB ĐH Sư Phạm TP.HCM, 2017)
 */

export const WRITING_TASK1_BANK: WritingPrompt[] = HCMUE_WRITING_TESTS.map((t) => t.task1);

export const WRITING_TASK2_BANK: WritingPrompt[] = HCMUE_WRITING_TESTS.map((t) => t.task2);

export const ALL_WRITING_PRACTICE_PROMPTS: WritingPrompt[] = [
  ...WRITING_TASK1_BANK,
  ...WRITING_TASK2_BANK,
];

export const ALL_PRACTICE_WRITING_TESTS: WritingTestInput[] = HCMUE_WRITING_TESTS;
