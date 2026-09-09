import type { ListeningTest } from '../../../types/schemas';
import { HCMUE_LISTENING_PART2_01 } from './drills/hcmue/part2/hcmuePart2_01';
import { HCMUE_LISTENING_PART2_02 } from './drills/hcmue/part2/hcmuePart2_02';
import { HCMUE_LISTENING_PART2_03 } from './drills/hcmue/part2/hcmuePart2_03';
import { HCMUE_LISTENING_PART2_04 } from './drills/hcmue/part2/hcmuePart2_04';
import { HCMUE_LISTENING_PART2_05 } from './drills/hcmue/part2/hcmuePart2_05';

export {
  HCMUE_LISTENING_PART2_01,
  HCMUE_LISTENING_PART2_02,
  HCMUE_LISTENING_PART2_03,
  HCMUE_LISTENING_PART2_04,
  HCMUE_LISTENING_PART2_05,
};

export const ALL_LISTENING_PART2_TESTS: ListeningTest[] = [
  HCMUE_LISTENING_PART2_01,
  HCMUE_LISTENING_PART2_02,
  HCMUE_LISTENING_PART2_03,
  HCMUE_LISTENING_PART2_04,
  HCMUE_LISTENING_PART2_05,
];
