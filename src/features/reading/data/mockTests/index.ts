export * from './ulisReadingTest01';
export * from './ulisReadingTest02';
export * from './ulisReadingTest03';

import type { ReadingTest } from '../../../../types/schemas';
import { ULIS_READING_TEST_01 } from './ulisReadingTest01';
import { ULIS_READING_TEST_02 } from './ulisReadingTest02';
import { ULIS_READING_TEST_03 } from './ulisReadingTest03';

export const ALL_VSTEP_READING_MOCK_TESTS: ReadingTest[] = [
  ULIS_READING_TEST_01,
  ULIS_READING_TEST_02,
  ULIS_READING_TEST_03,
];


