export * from './hcmueReadingTest01';
export * from './hcmueReadingTest02';
export * from './hcmueReadingTest03';
export * from './hcmueReadingTest04';
export * from './hcmueReadingTest05';

import { HCMUE_READING_TEST_01 } from './hcmueReadingTest01';
import { HCMUE_READING_TEST_02 } from './hcmueReadingTest02';
import { HCMUE_READING_TEST_03 } from './hcmueReadingTest03';
import { HCMUE_READING_TEST_04 } from './hcmueReadingTest04';
import { HCMUE_READING_TEST_05 } from './hcmueReadingTest05';
import type { ReadingTest } from '../../../../../types/schemas';

export const HCMUE_READING_TESTS: ReadingTest[] = [
  HCMUE_READING_TEST_01,
  HCMUE_READING_TEST_02,
  HCMUE_READING_TEST_03,
  HCMUE_READING_TEST_04,
  HCMUE_READING_TEST_05,
];
