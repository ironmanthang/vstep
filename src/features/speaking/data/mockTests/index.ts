import type { SpeakingTest } from '../../../../types/schemas';
import { ULIS_SPEAKING_TEST_01 } from './ulisSpeakingTest01';
import { ULIS_SPEAKING_TEST_02 } from './ulisSpeakingTest02';
import { ULIS_SPEAKING_TEST_03 } from './ulisSpeakingTest03';
import { ULIS_SPEAKING_TEST_04 } from './ulisSpeakingTest04';
import { ULIS_SPEAKING_TEST_05 } from './ulisSpeakingTest05';
import { ULIS_SPEAKING_TEST_06 } from './ulisSpeakingTest06';
import { ULIS_SPEAKING_TEST_07 } from './ulisSpeakingTest07';

export {
  ULIS_SPEAKING_TEST_01,
  ULIS_SPEAKING_TEST_02,
  ULIS_SPEAKING_TEST_03,
  ULIS_SPEAKING_TEST_04,
  ULIS_SPEAKING_TEST_05,
  ULIS_SPEAKING_TEST_06,
  ULIS_SPEAKING_TEST_07,
};

export const ALL_ULIS_SPEAKING_TESTS: SpeakingTest[] = [
  ULIS_SPEAKING_TEST_01,
  ULIS_SPEAKING_TEST_02,
  ULIS_SPEAKING_TEST_03,
  ULIS_SPEAKING_TEST_04,
  ULIS_SPEAKING_TEST_05,
  ULIS_SPEAKING_TEST_06,
  ULIS_SPEAKING_TEST_07,
];

export const ULIS_SPEAKING_TESTS_MAP = Object.fromEntries(
  ALL_ULIS_SPEAKING_TESTS.map((t) => [t.id, t])
);
