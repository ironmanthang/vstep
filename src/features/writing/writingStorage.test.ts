import { describe, it, expect, beforeEach } from 'vitest';
import {
  getWritingStorageKey,
  loadWritingSession,
  saveWritingSession,
  clearWritingSession,
} from './writingStorage';
import type { WritingMode, StoredWritingSession } from './types';

describe('writingStorage', () => {
  const testId = 'ulis_write_test_01';
  const mode: WritingMode = 'practice';
  const userId = 'user_write_123';
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
    const keyWithUser = getWritingStorageKey(testId, mode, userId);
    expect(keyWithUser).toBe(`vstep_${userId}_writing_session_${testId}_${mode}`);

    const keyWithoutUser = getWritingStorageKey(testId, mode);
    expect(keyWithoutUser).toBe(`vstep_writing_session_${testId}_${mode}`);
  });

  it('saves and loads writing session correctly with user isolation', () => {
    const sessionPayload: Omit<StoredWritingSession, 'savedAt'> = {
      task1Text: 'Dear Mr. Davis, I am writing to express my appreciation...',
      task2Text: 'Educational video games can promote problem-solving...',
      task1WordCount: 140,
      task2WordCount: 260,
      activeTab: 'task1',
      secondsRemaining: 3600,
      isSubmitted: false,
      evaluationResult: null,
    };

    saveWritingSession(testId, mode, sessionPayload, userId);

    const loaded = loadWritingSession(testId, mode, userId);
    expect(loaded).not.toBeNull();
    expect(loaded?.task1Text).toBe(sessionPayload.task1Text);
    expect(loaded?.task2Text).toBe(sessionPayload.task2Text);
    expect(loaded?.task1WordCount).toBe(140);
    expect(loaded?.isSubmitted).toBe(false);

    // Other user cannot read it
    const otherUser = loadWritingSession(testId, mode, 'other_user_456');
    expect(otherUser).toBeNull();
  });

  it('clears writing session properly', () => {
    saveWritingSession(
      testId,
      mode,
      {
        task1Text: 'Draft to clear',
        task2Text: '',
        task1WordCount: 3,
        task2WordCount: 0,
        activeTab: 'task1',
        secondsRemaining: 3600,
        isSubmitted: false,
        evaluationResult: null,
      },
      userId
    );

    expect(loadWritingSession(testId, mode, userId)).not.toBeNull();
    clearWritingSession(testId, mode, userId);
    expect(loadWritingSession(testId, mode, userId)).toBeNull();
  });
});
