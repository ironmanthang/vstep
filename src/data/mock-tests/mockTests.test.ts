import { describe, it, expect } from 'vitest';
import { ALL_MOCK_TESTS } from './index';

describe('VSTEP Full Mock Tests Integrity', () => {
  it('should export valid ALL_MOCK_TESTS array containing Tests 1 to 5', () => {
    expect(ALL_MOCK_TESTS.length).toBeGreaterThanOrEqual(5);
  });

  it.each(ALL_MOCK_TESTS)('Mock Test $test_number ($id) should satisfy all 4 skill requirements', (test) => {
    expect(test.total_duration_minutes).toBe(180);

    // Listening (35 questions)
    expect(test.listening.questions.length).toBe(35);
    test.listening.questions.forEach((q) => {
      expect(q.options.length).toBe(4);
      expect(['A', 'B', 'C', 'D']).toContain(q.correct_key);
      expect(q.question_text).toBeTruthy();
    });

    // Reading (4 passages, 40 questions total)
    expect(test.reading.passages.length).toBe(4);
    const totalReadingQuestions = test.reading.passages.reduce((acc, p) => acc + p.questions.length, 0);
    expect(totalReadingQuestions).toBe(40);
    test.reading.passages.forEach((p) => {
      expect(p.questions.length).toBe(10);
      p.questions.forEach((q) => {
        expect(q.options.length).toBe(4);
        expect(['A', 'B', 'C', 'D']).toContain(q.correct_key);
      });
    });

    // Writing (Task 1 & Task 2)
    expect(test.writing.task1.task_type).toBe('task1_letter');
    expect(test.writing.task1.min_words).toBe(120);
    expect(test.writing.task2.task_type).toBe('task2_essay');
    expect(test.writing.task2.min_words).toBe(250);

    // Speaking (3 parts)
    expect(test.speaking.part1.topics.length).toBe(2);
    expect(test.speaking.part2.options.length).toBe(3);
    expect(test.speaking.part3.mindmap_ideas.length).toBeGreaterThanOrEqual(3);
  });
});
