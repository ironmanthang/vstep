import type { MockTest } from '../../types/schemas';
import { VSTEP_LISTENING_MOCK_TEST_05 } from '../../features/listening/data';
import { ULIS_READING_TEST_05 } from '../../features/reading/data';
import { ULIS_WRITING_TEST_05_TASK1, ULIS_WRITING_TEST_05_TASK2 } from '../../features/writing/data';
import { ULIS_SPEAKING_TEST_05 } from '../../features/speaking/data';

export const VSTEP_MOCK_TEST_05: MockTest = {
  id: 'vstep_mock_test_05',
  test_number: 5,
  title: 'VSTEP Authentic Full Mock Test 05 (Chuẩn ĐHNN - ĐHQGHN)',
  institution: 'ULIS - ĐHQGHN / VNU Test Standard',
  total_duration_minutes: 180,
  listening: VSTEP_LISTENING_MOCK_TEST_05,
  reading: ULIS_READING_TEST_05,
  writing: {
    task1: ULIS_WRITING_TEST_05_TASK1,
    task2: ULIS_WRITING_TEST_05_TASK2,
  },
  speaking: ULIS_SPEAKING_TEST_05,
};
