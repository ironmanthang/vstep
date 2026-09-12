import { describe, it, expect, beforeEach } from 'vitest';
import {
  getReadingStorageKey,
  loadReadingSession,
  saveReadingSession,
  clearReadingSession,
  hydrateReadingSessionFromCloud,
} from './readingStorage';
import type { ReadingMode } from './types';

describe('readingStorage', () => {
  const testId = 'ulis_read_test_01';
  const mode: ReadingMode = 'practice';
  const userId = 'user_abc_123';
  const store = new Map<string, string>();

  beforeEach(() => {
    store.clear();
    Object.defineProperty(globalThis, 'localStorage', {
      value: {
        getItem: (k: string) => store.get(k) ?? null,
        setItem: (k: string, v: string) => store.set(k, v),
        removeItem: (k: string) => store.delete(k),
        clear: () => store.clear(),
        key: (i: number) => Array.from(store.keys())[i] ?? null,
        get length() {
          return store.size;
        },
      },
      writable: true,
      configurable: true,
    });
  });

  it('generates user-isolated storage keys when userId is present', () => {
    const keyWithUser = getReadingStorageKey(testId, mode, userId);
    expect(keyWithUser).toBe(`vstep_${userId}_reading_session_${testId}_${mode}`);

    const keyWithoutUser = getReadingStorageKey(testId, mode);
    expect(keyWithoutUser).toBe(`vstep_reading_session_${testId}_${mode}`);
  });

  it('saves and loads reading session correctly with user isolation', () => {
    saveReadingSession(
      testId,
      mode,
      {
        answers: { q1: 'A', q2: 'B' },
        flaggedQuestions: ['q1'],
        notes: { q1: 'check again' },
        isSubmitted: false,
        scoreResult: null,
      },
      userId
    );

    const loaded = loadReadingSession(testId, mode, userId);
    expect(loaded).not.toBeNull();
    expect(loaded?.answers).toEqual({ q1: 'A', q2: 'B' });
    expect(loaded?.flaggedQuestions).toEqual(['q1']);
    expect(loaded?.notes).toEqual({ q1: 'check again' });
    expect(loaded?.isSubmitted).toBe(false);

    // Another user cannot access it
    const otherUser = loadReadingSession(testId, mode, 'other_user');
    expect(otherUser).toBeNull();
  });

  it('clears reading session properly', () => {
    saveReadingSession(
      testId,
      mode,
      {
        answers: { q1: 'C' },
        flaggedQuestions: [],
        notes: {},
        isSubmitted: true,
        scoreResult: null,
      },
      userId
    );

    clearReadingSession(testId, mode, userId);
    expect(loadReadingSession(testId, mode, userId)).toBeNull();
  });

  it('hydrates reading session from cloud payload', () => {
    const cloudPayload = {
      answers: { q1: 'D', q2: 'A' },
      notes: { q1: 'note from cloud' },
      flagged_questions: ['q2'],
      score: 8.5,
      correct_count: 34,
      total_questions: 40,
      time_spent_seconds: 2400,
      completed_at: '2026-09-12T10:00:00.000Z',
    };

    const hydrated = hydrateReadingSessionFromCloud(testId, mode, cloudPayload, userId);
    expect(hydrated.isSubmitted).toBe(true);
    expect(hydrated.scoreResult?.scoreOutOf10).toBe(8.5);
    expect(hydrated.scoreResult?.correctCount).toBe(34);
    expect(hydrated.scoreResult?.totalQuestions).toBe(40);
    expect(hydrated.answers).toEqual({ q1: 'D', q2: 'A' });

    // Local storage should also have it cached
    const cached = loadReadingSession(testId, mode, userId);
    expect(cached).toEqual(hydrated);
  });
});
