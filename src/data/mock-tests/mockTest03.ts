import type { MockTest } from '../../types/schemas';
import { VSTEP_LISTENING_MOCK_TEST_03 } from '../../features/listening/data';
import { ULIS_READING_TEST_03 } from '../../features/reading/data';
import { ULIS_WRITING_TEST_03_TASK1, ULIS_WRITING_TEST_03_TASK2 } from '../../features/writing/data';
import { SPEAKING_EXAM_MAY_20 } from '../../features/speaking/data';

export const VSTEP_MOCK_TEST_03: MockTest = {
  id: 'vstep_mock_test_03',
  test_number: 3,
  title: 'VSTEP Authentic Full Mock Test 03 (Chuẩn ĐHNN - ĐHQGHN)',
  institution: 'ULIS - ĐHQGHN / VNU Test Standard',
  total_duration_minutes: 180,
  listening: VSTEP_LISTENING_MOCK_TEST_03,
  reading: ULIS_READING_TEST_03,
  writing: {
    task1: ULIS_WRITING_TEST_03_TASK1,
    task2: ULIS_WRITING_TEST_03_TASK2,
  },
  speaking: SPEAKING_EXAM_MAY_20,
};
