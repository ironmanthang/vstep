export * from './ulisReadingTest01';
export * from './ulisReadingTest02';
export * from './ulisReadingTest03';
export * from './ulisReadingTest04';
export * from './ulisReadingTest05';

import type { ReadingTest } from '../../../../types/schemas';
import { ULIS_READING_TEST_01 } from './ulisReadingTest01';
import { ULIS_READING_TEST_02 } from './ulisReadingTest02';
import { ULIS_READING_TEST_03 } from './ulisReadingTest03';
import { ULIS_READING_TEST_04 } from './ulisReadingTest04';
import { ULIS_READING_TEST_05 } from './ulisReadingTest05';

export const ALL_VSTEP_READING_MOCK_TESTS: ReadingTest[] = [
  ULIS_READING_TEST_01,
  ULIS_READING_TEST_02,
  ULIS_READING_TEST_03,
  ULIS_READING_TEST_04,
  ULIS_READING_TEST_05,
];


