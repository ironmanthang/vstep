import type { ListeningTest } from '../../../types/schemas';
import { HCMUE_LISTENING_PART3_01 } from './drills/hcmue/part3/hcmuePart3_01';
import { HCMUE_LISTENING_PART3_02 } from './drills/hcmue/part3/hcmuePart3_02';
import { HCMUE_LISTENING_PART3_03 } from './drills/hcmue/part3/hcmuePart3_03';
import { HCMUE_LISTENING_PART3_04 } from './drills/hcmue/part3/hcmuePart3_04';
import { HCMUE_LISTENING_PART3_05 } from './drills/hcmue/part3/hcmuePart3_05';

export {
  HCMUE_LISTENING_PART3_01,
  HCMUE_LISTENING_PART3_02,
  HCMUE_LISTENING_PART3_03,
  HCMUE_LISTENING_PART3_04,
  HCMUE_LISTENING_PART3_05,
};

export const ALL_LISTENING_PART3_TESTS: ListeningTest[] = [
  HCMUE_LISTENING_PART3_01,
  HCMUE_LISTENING_PART3_02,
  HCMUE_LISTENING_PART3_03,
  HCMUE_LISTENING_PART3_04,
  HCMUE_LISTENING_PART3_05,
];
