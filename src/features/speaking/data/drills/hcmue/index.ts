export * from './hcmueSpeakingTest01';
export * from './hcmueSpeakingTest02';
export * from './hcmueSpeakingTest03';
export * from './hcmueSpeakingTest04';
export * from './hcmueSpeakingTest05';

import { HCMUE_SPEAKING_TEST_01 } from './hcmueSpeakingTest01';
import { HCMUE_SPEAKING_TEST_02 } from './hcmueSpeakingTest02';
import { HCMUE_SPEAKING_TEST_03 } from './hcmueSpeakingTest03';
import { HCMUE_SPEAKING_TEST_04 } from './hcmueSpeakingTest04';
import { HCMUE_SPEAKING_TEST_05 } from './hcmueSpeakingTest05';
import type { SpeakingTest } from '../../../../../types/schemas';

export const HCMUE_SPEAKING_TESTS: SpeakingTest[] = [
  HCMUE_SPEAKING_TEST_01,
  HCMUE_SPEAKING_TEST_02,
  HCMUE_SPEAKING_TEST_03,
  HCMUE_SPEAKING_TEST_04,
  HCMUE_SPEAKING_TEST_05,
];

export const HCMUE_SPEAKING_TESTS_MAP = Object.fromEntries(
  HCMUE_SPEAKING_TESTS.map((t) => [t.id, t])
);
