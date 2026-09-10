import { describe, it, expect, beforeEach } from 'vitest';
import {
  ALL_LISTENING_PART1_TESTS,
  ALL_LISTENING_PART2_TESTS,
  ALL_LISTENING_PART3_TESTS,
  ALL_VSTEP_LISTENING_MOCK_TESTS,
} from './data';
import { getQuestionTranscriptContext } from './transcriptContext';
import {
  saveListeningSession,
  loadListeningSession,
  clearListeningSession,
  hydrateListeningSessionFromCloud,
} from './listeningStorage';

function calculateVStepScore(correct: number, total: number): number {
  if (total === 0 || correct === 0) return 0.0;
  return Number(((correct / total) * 10).toFixed(1));
}

describe('VSTEP Listening Studio Data Integrity & Specifications', () => {
  it('should validate discrete part practice bank arrays exist', () => {
    expect(Array.isArray(ALL_LISTENING_PART1_TESTS)).toBe(true);
    expect(Array.isArray(ALL_LISTENING_PART2_TESTS)).toBe(true);
    expect(Array.isArray(ALL_LISTENING_PART3_TESTS)).toBe(true);

    // Validate HCMUE Part 1 drills (8 questions each, Tests 01-05)
    expect(ALL_LISTENING_PART1_TESTS.length).toBe(5);
    const p1Keys = [
      ['C', 'B', 'D', 'A', 'C', 'A', 'C', 'B'], // Test 01 (Q6/Q7 aligned with studio audio)
      ['B', 'A', 'B', 'B', 'B', 'C', 'C', 'B'], // Test 02
      ['D', 'B', 'B', 'A', 'D', 'C', 'D', 'B'], // Test 03
      ['A', 'D', 'B', 'A', 'A', 'A', 'C', 'A'], // Test 04
      ['C', 'D', 'C', 'D', 'B', 'B', 'D', 'B'], // Test 05
    ];
    ALL_LISTENING_PART1_TESTS.forEach((p1, idx) => {
      expect(p1.part).toBe(1);
      expect(p1.questions.length).toBe(8);
      expect(p1.transcript.length).toBeGreaterThan(0);
      expect(p1.questions.map(q => q.correct_key)).toEqual(p1Keys[idx]);
    });

    // Validate HCMUE Part 2 drills (12 questions each, Tests 01-05)
    expect(ALL_LISTENING_PART2_TESTS.length).toBe(5);
    const p2Keys = [
      ['C', 'B', 'A', 'B', 'B', 'A', 'C', 'C', 'C', 'B', 'B', 'B'], // Test 01
      ['B', 'B', 'C', 'C', 'C', 'B', 'A', 'B', 'B', 'C', 'A', 'C'], // Test 02
      ['B', 'B', 'A', 'D', 'B', 'C', 'C', 'D', 'C', 'B', 'D', 'D'], // Test 03
      ['D', 'B', 'D', 'C', 'B', 'A', 'B', 'A', 'C', 'D', 'A', 'A'], // Test 04
      ['B', 'D', 'B', 'C', 'B', 'B', 'A', 'C', 'A', 'A', 'B', 'B'], // Test 05
    ];
    ALL_LISTENING_PART2_TESTS.forEach((p2, idx) => {
      expect(p2.part).toBe(2);
      expect(p2.questions.length).toBe(12);
      expect(p2.transcript.length).toBeGreaterThan(0);
      expect(p2.questions.map(q => q.correct_key)).toEqual(p2Keys[idx]);
    });

    // Validate HCMUE Part 3 drills (15 questions each, Tests 01-05)
    expect(ALL_LISTENING_PART3_TESTS.length).toBe(5);
    const p3Keys = [
      ['C', 'B', 'D', 'B', 'B', 'C', 'C', 'C', 'A', 'D', 'C', 'B', 'A', 'A', 'C'], // Test 01
      ['B', 'B', 'C', 'B', 'C', 'C', 'A', 'A', 'D', 'B', 'B', 'A', 'A', 'A', 'B'], // Test 02
      ['B', 'C', 'A', 'A', 'B', 'D', 'C', 'D', 'B', 'D', 'B', 'C', 'D', 'A', 'C'], // Test 03
      ['B', 'C', 'D', 'D', 'D', 'D', 'D', 'A', 'D', 'B', 'C', 'B', 'A', 'A', 'A'], // Test 04
      ['A', 'D', 'B', 'D', 'A', 'C', 'A', 'A', 'C', 'B', 'B', 'A', 'D', 'B', 'D'], // Test 05
    ];
    ALL_LISTENING_PART3_TESTS.forEach((p3, idx) => {
      expect(p3.part).toBe(3);
      expect(p3.questions.length).toBe(15);
      expect(p3.transcript.length).toBeGreaterThan(0);
      expect(p3.questions.map(q => q.correct_key)).toEqual(p3Keys[idx]);
    });

    // Validate monotonic transcript timestamps and non-empty texts for all drills
    const allDrillTests = [
      ...ALL_LISTENING_PART1_TESTS,
      ...ALL_LISTENING_PART2_TESTS,
      ...ALL_LISTENING_PART3_TESTS,
    ];
    expect(allDrillTests.length).toBe(15);
    allDrillTests.forEach(test => {
      expect(test.duration_seconds).toBeGreaterThan(0);
      expect(test.audio_url.length).toBeGreaterThan(0);
      for (let i = 0; i < test.transcript.length; i++) {
        const seg = test.transcript[i];
        expect(seg.start_ms).toBeGreaterThanOrEqual(0);
        expect(seg.end_ms).toBeGreaterThan(seg.start_ms);
        expect(seg.text_en.trim().length).toBeGreaterThan(0);
        expect(seg.text_vi.trim().length).toBeGreaterThan(0);
        if (i > 0) {
          expect(seg.start_ms).toBeGreaterThanOrEqual(test.transcript[i - 1].start_ms);
        }
      }
    });
  });

  it('should validate all 7 official mock tests contain exactly 35 questions and continuous audio', () => {
    expect(ALL_VSTEP_LISTENING_MOCK_TESTS.length).toBe(7);

    ALL_VSTEP_LISTENING_MOCK_TESTS.forEach((test, idx) => {
      const testNum = idx + 1;
      expect(test.id).toBe(`vstep_mock0${testNum}_lis`);
      expect(test.questions.length).toBe(35);
      expect(test.audio_url).toBe(`/audio/listening/test${testNum}/vstep-test-${testNum}.mp3`);
      expect(test.duration_seconds).toBeGreaterThan(1000);
      expect(test.transcript.length).toBeGreaterThan(0);

      // Verify transcript timestamps are sequential and monotonic
      for (let i = 0; i < test.transcript.length; i++) {
        const line = test.transcript[i];
        expect(line.start_ms).toBeGreaterThanOrEqual(0);
        expect(line.end_ms).toBeGreaterThan(line.start_ms);
        expect(line.text_en.trim().length).toBeGreaterThan(0);
        expect(line.text_vi.trim().length).toBeGreaterThan(0);

        if (i > 0) {
          expect(line.start_ms).toBeGreaterThanOrEqual(test.transcript[i - 1].start_ms);
        }
      }

      // Verify question keys
      for (const q of test.questions) {
        expect(q.options.length).toBe(4);
        expect(['A', 'B', 'C', 'D']).toContain(q.correct_key);
        expect(q.explanation_vi.trim().length).toBeGreaterThan(0);
      }
    });
  });

  it('should match exact official answer keys for Mock Test 01 (35 questions)', () => {
    const expectedKeys = [
      'B', 'C', 'C', 'C', 'C', 'B', 'C', 'A',
      'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D',
      'B', 'C', 'C', 'A', 'B', 'D', 'C', 'B', 'A', 'D', 'B', 'D', 'D', 'D', 'C',
    ];
    expect(ALL_VSTEP_LISTENING_MOCK_TESTS[0].questions.map(q => q.correct_key)).toEqual(expectedKeys);
  });

  it('should match exact official answer keys for Mock Test 02 (35 questions)', () => {
    const expectedKeys = [
      'A', 'B', 'B', 'B', 'C', 'A', 'B', 'A',
      'B', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'B', 'D', 'A', 'A',
      'C', 'B', 'C', 'A', 'D', 'A', 'B', 'D', 'D', 'C', 'D', 'B', 'A', 'A', 'C',
    ];
    expect(ALL_VSTEP_LISTENING_MOCK_TESTS[1].questions.map(q => q.correct_key)).toEqual(expectedKeys);
  });

  it('should match exact official answer keys for Mock Test 03 (35 questions)', () => {
    const expectedKeys = [
      'B', 'A', 'C', 'C', 'C', 'A', 'B', 'B',
      'D', 'C', 'D', 'B', 'A', 'B', 'A', 'B', 'D', 'A', 'B', 'A',
      'B', 'B', 'C', 'C', 'A', 'C', 'A', 'D', 'C', 'B', 'B', 'B', 'B', 'A', 'B',
    ];
    expect(ALL_VSTEP_LISTENING_MOCK_TESTS[2].questions.map(q => q.correct_key)).toEqual(expectedKeys);
  });

  it('should match exact official answer keys for Mock Test 04 (35 questions)', () => {
    const expectedKeys = [
      'C', 'B', 'A', 'A', 'C', 'A', 'C', 'C',
      'D', 'D', 'B', 'C', 'A', 'B', 'C', 'B', 'D', 'C', 'A', 'A',
      'C', 'D', 'D', 'A', 'A', 'C', 'D', 'A', 'D', 'D', 'C', 'A', 'B', 'B', 'B',
    ];
    expect(ALL_VSTEP_LISTENING_MOCK_TESTS[3].questions.map(q => q.correct_key)).toEqual(expectedKeys);
  });

  it('should match exact official answer keys for Mock Test 05 (35 questions)', () => {
    const expectedKeys = [
      'C', 'B', 'B', 'C', 'C', 'C', 'B', 'A',
      'C', 'C', 'C', 'D', 'A', 'C', 'B', 'B', 'B', 'D', 'C', 'B',
      'D', 'B', 'A', 'D', 'B', 'A', 'C', 'C', 'D', 'D', 'C', 'A', 'D', 'A', 'B',
    ];
    expect(ALL_VSTEP_LISTENING_MOCK_TESTS[4].questions.map(q => q.correct_key)).toEqual(expectedKeys);
  });

  it('should match exact official answer keys for Mock Test 06 (35 questions)', () => {
    const expectedKeys = [
      'B', 'A', 'C', 'C', 'A', 'B', 'B', 'C',
      'B', 'D', 'C', 'C', 'B', 'C', 'A', 'C', 'B', 'C', 'C', 'A',
      'D', 'C', 'A', 'D', 'C', 'A', 'A', 'C', 'B', 'B', 'A', 'B', 'D', 'C', 'A',
    ];
    expect(ALL_VSTEP_LISTENING_MOCK_TESTS[5].questions.map(q => q.correct_key)).toEqual(expectedKeys);
  });

  it('should match exact official answer keys for Mock Test 07 (35 questions)', () => {
    const expectedKeys = [
      'B', 'B', 'B', 'A', 'C', 'B', 'C', 'B',
      'C', 'C', 'B', 'A', 'B', 'C', 'C', 'B', 'C', 'C', 'B', 'D',
      'D', 'B', 'B', 'A', 'D', 'C', 'C', 'A', 'C', 'A', 'B', 'B', 'C', 'A', 'B',
    ];
    expect(ALL_VSTEP_LISTENING_MOCK_TESTS[6].questions.map(q => q.correct_key)).toEqual(expectedKeys);
  });

  it('should compute exact VSTEP listening scores out of 10.0 correctly', () => {
    expect(calculateVStepScore(35, 35)).toBe(10.0);
    expect(calculateVStepScore(28, 35)).toBe(8.0);
    expect(calculateVStepScore(18, 35)).toBe(5.1);
    expect(calculateVStepScore(5, 8)).toBe(6.3);
    expect(calculateVStepScore(0, 35)).toBe(0.0);
  });

  it('should resolve question transcript context and group headers accurately', () => {
    const mock1 = ALL_VSTEP_LISTENING_MOCK_TESTS[0];

    // Part 1: Question 1 is a single question (not a group)
    const q1Context = getQuestionTranscriptContext(mock1, mock1.questions[0].id);
    expect(q1Context.segment).not.toBeNull();
    expect(q1Context.isFirstInGroup).toBe(false);

    // Part 2: Question 9 is first in conversation group
    const q9Context = getQuestionTranscriptContext(mock1, mock1.questions[8].id);
    expect(q9Context.isFirstInGroup).toBe(true);
    expect(q9Context.groupTitle).toContain('Đoạn Hội Thoại 1');
    expect(q9Context.groupId).toBe(mock1.questions[8].id);

    // Non-existent question returns empty context
    const unknownContext = getQuestionTranscriptContext(mock1, 'non_existent_id');
    expect(unknownContext.segment).toBeNull();
    expect(unknownContext.isFirstInGroup).toBe(false);
    expect(unknownContext.groupTitle).toBe('');
  });

  describe('Listening Session Storage Persistence', () => {
    const memoryStore = new Map<string, string>();

    beforeEach(() => {
      memoryStore.clear();
      const mockStorage = {
        getItem: (key: string) => memoryStore.get(key) ?? null,
        setItem: (key: string, val: string) => { memoryStore.set(key, String(val)); },
        removeItem: (key: string) => { memoryStore.delete(key); },
        clear: () => { memoryStore.clear(); },
      };
      Object.defineProperty(globalThis, 'localStorage', {
        value: mockStorage,
        writable: true,
        configurable: true,
      });
    });

    it('persists and restores listening drafts and results cleanly', () => {
      const testId = 'vstep_mock01_lis';
      saveListeningSession(testId, 'practice', {
        answers: { q1: 'B', q2: 'C' },
        flaggedQuestions: ['q1'],
        notes: { q1: 'speaker mentioned Tuesday' },
        isSubmitted: false,
        scoreResult: null,
      });

      const loaded = loadListeningSession(testId, 'practice');
      expect(loaded).not.toBeNull();
      expect(loaded?.answers).toEqual({ q1: 'B', q2: 'C' });
      expect(loaded?.flaggedQuestions).toEqual(['q1']);
      expect(loaded?.notes).toEqual({ q1: 'speaker mentioned Tuesday' });
      expect(loaded?.isSubmitted).toBe(false);
      expect(loaded?.savedAt).toBeGreaterThan(0);
    });

    it('clears listening session cleanly on test reset', () => {
      const testId = 'vstep_mock01_lis';
      saveListeningSession(testId, 'practice', {
        answers: { q1: 'B' },
        flaggedQuestions: [],
        notes: {},
        isSubmitted: true,
        scoreResult: {
          totalQuestions: 35,
          correctCount: 28,
          scoreOutOf10: 8.0,
          timeSpentSeconds: 1200,
          completedAt: 123456789,
        },
      });

      expect(loadListeningSession(testId, 'practice')).not.toBeNull();
      clearListeningSession(testId, 'practice');
      expect(loadListeningSession(testId, 'practice')).toBeNull();
    });

    it('hydrates listening session from cloud snapshot and sets isSubmitted true', () => {
      const testId = 'vstep_mock01_lis';
      // Simulate existing incomplete local draft
      saveListeningSession(testId, 'practice', {
        answers: { q1: 'A' },
        flaggedQuestions: [],
        notes: {},
        isSubmitted: false,
        scoreResult: null,
      });

      // Hydrate completed cloud submission
      const session = hydrateListeningSessionFromCloud(testId, 'practice', {
        answers: { q1: 'B', q2: 'C' },
        notes: { q1: 'confirmed' },
        flagged_questions: ['q2'],
        score: 9.0,
        correct_count: 32,
        total_questions: 35,
        time_spent_seconds: 1500,
        completed_at: '2026-09-10T12:00:00.000Z',
      });

      expect(session.isSubmitted).toBe(true);
      expect(session.answers).toEqual({ q1: 'B', q2: 'C' });
      expect(session.notes).toEqual({ q1: 'confirmed' });
      expect(session.flaggedQuestions).toEqual(['q2']);
      expect(session.scoreResult?.scoreOutOf10).toBe(9.0);

      // Verify saved in localStorage
      const loaded = loadListeningSession(testId, 'practice');
      expect(loaded?.isSubmitted).toBe(true);
      expect(loaded?.answers).toEqual({ q1: 'B', q2: 'C' });
      expect(loaded?.scoreResult?.correctCount).toBe(32);
    });
  });
});
