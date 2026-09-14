import type { SpeakingTest } from '../../../types/schemas';
import { ALL_ULIS_SPEAKING_TESTS } from './mockTests';
import { HCMUE_SPEAKING_TESTS } from './drills/hcmue';

export * from './drills/hcmue';

/**
 * Authentic VSTEP Speaking Practice Bank (HCMUE 01–05)
 * Sourced from "VSTEP Collection: 20 Mock Tests" (NXB ĐH Sư Phạm TP.HCM, 2017)
 */

export const ALL_HCMUE_SPEAKING_TESTS: SpeakingTest[] = HCMUE_SPEAKING_TESTS;

/** Backwards-compatibility alias for legacy callers */
export const ALL_MAY_SPEAKING_TESTS: SpeakingTest[] = HCMUE_SPEAKING_TESTS;

export const ALL_SPEAKING_PRACTICE_TESTS: SpeakingTest[] = [
  ...ALL_ULIS_SPEAKING_TESTS,
  ...HCMUE_SPEAKING_TESTS,
];
