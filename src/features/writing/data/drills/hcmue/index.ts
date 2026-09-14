export * from './hcmueWritingTest01';
export * from './hcmueWritingTest02';
export * from './hcmueWritingTest03';
export * from './hcmueWritingTest04';
export * from './hcmueWritingTest05';

import { HCMUE_WRITING_TEST_01 } from './hcmueWritingTest01';
import { HCMUE_WRITING_TEST_02 } from './hcmueWritingTest02';
import { HCMUE_WRITING_TEST_03 } from './hcmueWritingTest03';
import { HCMUE_WRITING_TEST_04 } from './hcmueWritingTest04';
import { HCMUE_WRITING_TEST_05 } from './hcmueWritingTest05';
import type { WritingTestInput } from '../../../types';

export const HCMUE_WRITING_TESTS: WritingTestInput[] = [
  HCMUE_WRITING_TEST_01,
  HCMUE_WRITING_TEST_02,
  HCMUE_WRITING_TEST_03,
  HCMUE_WRITING_TEST_04,
  HCMUE_WRITING_TEST_05,
];

export const HCMUE_WRITING_TESTS_MAP = Object.fromEntries(
  HCMUE_WRITING_TESTS.map((t) => [t.id, t])
);
