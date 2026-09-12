import { VSTEP_MOCK_TEST_01 } from './mockTest01';
import { VSTEP_MOCK_TEST_02 } from './mockTest02';
import { VSTEP_MOCK_TEST_03 } from './mockTest03';
import { VSTEP_MOCK_TEST_04 } from './mockTest04';
import { VSTEP_MOCK_TEST_05 } from './mockTest05';
import { VSTEP_MOCK_TEST_06 } from './mockTest06';
import { VSTEP_MOCK_TEST_07 } from './mockTest07';
import type { MockTest } from '../../types/schemas';

export * from './mockTest01';
export * from './mockTest02';
export * from './mockTest03';
export * from './mockTest04';
export * from './mockTest05';
export * from './mockTest06';
export * from './mockTest07';

export const ALL_MOCK_TESTS: MockTest[] = [
  VSTEP_MOCK_TEST_01,
  VSTEP_MOCK_TEST_02,
  VSTEP_MOCK_TEST_03,
  VSTEP_MOCK_TEST_04,
  VSTEP_MOCK_TEST_05,
  VSTEP_MOCK_TEST_06,
  VSTEP_MOCK_TEST_07,
];


