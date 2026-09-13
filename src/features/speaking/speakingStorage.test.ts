import { describe, it, expect, beforeEach } from 'vitest';
import {
  getSpeakingStorageKey,
  loadSpeakingSession,
  saveSpeakingSession,
  clearSpeakingSession,
} from './speakingStorage';
import type { SpeakingMode, StoredSpeakingSession } from './types';

describe('speakingStorage', () => {
  const testId = 'ulis_speak_test_01';
  const mode: SpeakingMode = 'practice';
  const userId = 'user_speak_123';
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
    const keyWithUser = getSpeakingStorageKey(testId, mode, userId);
    expect(keyWithUser).toBe(`vstep_${userId}_speaking_session_${testId}_${mode}`);

    const keyWithoutUser = getSpeakingStorageKey(testId, mode);
    expect(keyWithoutUser).toBe(`vstep_speaking_session_${testId}_${mode}`);
  });

  it('saves and loads speaking session correctly with user isolation', () => {
    const sessionPayload: Omit<StoredSpeakingSession, 'savedAt'> = {
      activePart: 2,
      completedParts: [1],
      secondsRemaining: 720,
      isSubmitted: false,
      evaluationResult: null,
      audioDurations: { 1: 45 },
    };

    saveSpeakingSession(testId, mode, sessionPayload, userId);

    const loaded = loadSpeakingSession(testId, mode, userId);
    expect(loaded).not.toBeNull();
    expect(loaded?.activePart).toBe(2);
    expect(loaded?.completedParts).toEqual([1]);
    expect(loaded?.audioDurations).toEqual({ 1: 45 });
    expect(loaded?.isSubmitted).toBe(false);

    // Other user cannot read it
    const otherUser = loadSpeakingSession(testId, mode, 'other_user_456');
    expect(otherUser).toBeNull();
  });

  it('clears speaking session properly', () => {
    saveSpeakingSession(
      testId,
      mode,
      {
        activePart: 1,
        completedParts: [],
        secondsRemaining: 720,
        isSubmitted: false,
        evaluationResult: null,
        audioDurations: {},
      },
      userId
    );

    expect(loadSpeakingSession(testId, mode, userId)).not.toBeNull();
    clearSpeakingSession(testId, mode, userId);
    expect(loadSpeakingSession(testId, mode, userId)).toBeNull();
  });
});
