import { VSTEP_MOCK_TEST_01 } from './mockTest01';
import { VSTEP_MOCK_TEST_02 } from './mockTest02';
import { VSTEP_MOCK_TEST_03 } from './mockTest03';
import type { MockTest } from '../../types/schemas';

export * from './mockTest01';
export * from './mockTest02';
export * from './mockTest03';

export const ALL_MOCK_TESTS: MockTest[] = [
  VSTEP_MOCK_TEST_01,
  VSTEP_MOCK_TEST_02,
  VSTEP_MOCK_TEST_03,
];


