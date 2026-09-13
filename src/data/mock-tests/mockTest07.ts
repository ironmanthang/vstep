import type { MockTest } from '../../types/schemas';
import { VSTEP_LISTENING_MOCK_TEST_07 } from '../../features/listening/data';
import { ULIS_READING_TEST_07 } from '../../features/reading/data';
import { ULIS_WRITING_TEST_07_TASK1, ULIS_WRITING_TEST_07_TASK2 } from '../../features/writing/data';
import { ULIS_SPEAKING_TEST_07 } from '../../features/speaking/data';

export const VSTEP_MOCK_TEST_07: MockTest = {
  id: 'vstep_mock_test_07',
  test_number: 7,
  title: 'VSTEP Authentic Full Mock Test 07 (Chuẩn ĐHNN - ĐHQGHN)',
  institution: 'ULIS - ĐHQGHN / VNU Test Standard',
  total_duration_minutes: 180,
  listening: VSTEP_LISTENING_MOCK_TEST_07,
  reading: ULIS_READING_TEST_07,
  writing: {
    task1: ULIS_WRITING_TEST_07_TASK1,
    task2: ULIS_WRITING_TEST_07_TASK2,
  },
  speaking: ULIS_SPEAKING_TEST_07,
};
