import type { MockTest } from '../../types/schemas';
import { VSTEP_LISTENING_MOCK_TEST_01 } from '../../features/listening/data';
import { ULIS_READING_TEST_01 } from '../../features/reading/data';
import { ULIS_WRITING_TEST_01_TASK1, ULIS_WRITING_TEST_01_TASK2 } from '../../features/writing/data';
import { ULIS_SPEAKING_TEST_01 } from '../../features/speaking/data';

export const VSTEP_MOCK_TEST_01: MockTest = {
  id: 'vstep_mock_test_01',
  test_number: 1,
  title: 'VSTEP Authentic Full Mock Test 01 (Chuẩn ĐHNN - ĐHQGHN)',
  institution: 'ULIS - ĐHQGHN / VNU Test Standard',
  total_duration_minutes: 180,
  listening: VSTEP_LISTENING_MOCK_TEST_01,
  reading: ULIS_READING_TEST_01,
  writing: {
    task1: ULIS_WRITING_TEST_01_TASK1,
    task2: ULIS_WRITING_TEST_01_TASK2,
  },
  speaking: ULIS_SPEAKING_TEST_01,
};
