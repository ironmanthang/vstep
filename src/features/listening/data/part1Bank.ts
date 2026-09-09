import type { ListeningTest } from '../../../types/schemas';
import { HCMUE_LISTENING_PART1_01 } from './drills/hcmue/part1/hcmuePart1_01';
import { HCMUE_LISTENING_PART1_02 } from './drills/hcmue/part1/hcmuePart1_02';
import { HCMUE_LISTENING_PART1_03 } from './drills/hcmue/part1/hcmuePart1_03';
import { HCMUE_LISTENING_PART1_04 } from './drills/hcmue/part1/hcmuePart1_04';
import { HCMUE_LISTENING_PART1_05 } from './drills/hcmue/part1/hcmuePart1_05';

export {
  HCMUE_LISTENING_PART1_01,
  HCMUE_LISTENING_PART1_02,
  HCMUE_LISTENING_PART1_03,
  HCMUE_LISTENING_PART1_04,
  HCMUE_LISTENING_PART1_05,
};

export const ALL_LISTENING_PART1_TESTS: ListeningTest[] = [
  HCMUE_LISTENING_PART1_01,
  HCMUE_LISTENING_PART1_02,
  HCMUE_LISTENING_PART1_03,
  HCMUE_LISTENING_PART1_04,
  HCMUE_LISTENING_PART1_05,
];
