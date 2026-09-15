import { describe, it, expect, beforeEach } from 'vitest';
import { recordStudyDateInStorage } from './userStore';
import { getUserStorageKey } from '../storage/userStorage';

describe('userStore and profile storage utilities', () => {

  const store = new Map<string, string>();

  beforeEach(() => {
    store.clear();
    const mockStorage = {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, val: string) => { store.set(key, String(val)); },
      removeItem: (key: string) => { store.delete(key); },
      clear: () => { store.clear(); },
    };
    Object.defineProperty(globalThis, 'localStorage', {
      value: mockStorage,
      writable: true,
      configurable: true,
    });
  });

  it('records study date into localStorage profile cleanly', () => {
    recordStudyDateInStorage('2026-08-28');
    const raw = globalThis.localStorage.getItem('vstep_user_learning_profile_v2');
    expect(raw).toBeTruthy();
    const parsed = JSON.parse(raw!);
    expect(parsed.study_dates).toContain('2026-08-28');
  });

  it('deduplicates identical study dates', () => {
    recordStudyDateInStorage('2026-08-28');
    recordStudyDateInStorage('2026-08-28');
    const raw = globalThis.localStorage.getItem('vstep_user_learning_profile_v2');
    const parsed = JSON.parse(raw!);
    expect(parsed.study_dates).toEqual(['2026-08-28']);
  });

  it('accumulates multiple distinct study dates', () => {
    recordStudyDateInStorage('2026-08-27');
    recordStudyDateInStorage('2026-08-28');
    const raw = globalThis.localStorage.getItem('vstep_user_learning_profile_v2');
    const parsed = JSON.parse(raw!);
    expect(parsed.study_dates).toEqual(['2026-08-27', '2026-08-28']);
  });

  it('records study date into user-scoped storage when userId is provided', () => {
    recordStudyDateInStorage('2026-09-01', 'user-123');
    const key = getUserStorageKey('user-123', 'user_learning_profile_v2');
    const raw = globalThis.localStorage.getItem(key);
    expect(raw).toBeTruthy();
    const parsed = JSON.parse(raw!);
    expect(parsed.study_dates).toContain('2026-09-01');
  });
});

