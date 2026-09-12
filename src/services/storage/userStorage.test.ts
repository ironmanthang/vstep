import { describe, it, expect, beforeEach } from 'vitest';
import {
  getUserStorageKey,
  loadUserItem,
  saveUserItem,
  removeUserItem,
  purgeAllUserData,
  purgeLegacyGlobalKeys,
} from './userStorage';

describe('userStorage service', () => {
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

  it('builds namespaced keys with user ID prefix', () => {
    expect(getUserStorageKey('user_123', 'profile')).toBe('vstep_user_123_profile');
    expect(getUserStorageKey('user_abc', 'deck')).toBe('vstep_user_abc_deck');
  });

  it('throws when userId is empty', () => {
    expect(() => getUserStorageKey('', 'profile')).toThrow();
  });

  it('saves and loads user-scoped data cleanly', () => {
    saveUserItem('user_1', 'theme_pref', { mode: 'dark' });
    const loaded = loadUserItem('user_1', 'theme_pref', { mode: 'light' });
    expect(loaded).toEqual({ mode: 'dark' });

    // Different user cannot see user_1's data
    const user2Data = loadUserItem('user_2', 'theme_pref', { mode: 'light' });
    expect(user2Data).toEqual({ mode: 'light' });
  });

  it('removes single user item without affecting others', () => {
    saveUserItem('user_1', 'card_state', { cardId: 'c1' });
    saveUserItem('user_1', 'other_state', { foo: 'bar' });
    saveUserItem('user_2', 'card_state', { cardId: 'c2' });

    removeUserItem('user_1', 'card_state');

    expect(loadUserItem('user_1', 'card_state', null)).toBeNull();
    expect(loadUserItem('user_1', 'other_state', null)).toEqual({ foo: 'bar' });
    expect(loadUserItem('user_2', 'card_state', null)).toEqual({ cardId: 'c2' });
  });

  it('purges all keys belonging to User A without touching User B or global keys', () => {
    saveUserItem('user_A', 'deck', [1, 2, 3]);
    saveUserItem('user_A', 'quota', 5);
    saveUserItem('user_B', 'deck', [4, 5, 6]);
    globalThis.localStorage.setItem('vstep_theme', 'dark');

    purgeAllUserData('user_A');

    expect(loadUserItem('user_A', 'deck', null)).toBeNull();
    expect(loadUserItem('user_A', 'quota', null)).toBeNull();
    expect(loadUserItem('user_B', 'deck', null)).toEqual([4, 5, 6]);
    expect(globalThis.localStorage.getItem('vstep_theme')).toBe('dark');
  });

  it('purges legacy un-scoped global keys', () => {
    globalThis.localStorage.setItem('vstep_flashcard_deck_v3', 'old_deck');
    globalThis.localStorage.setItem('vstep_listening_session_test1_practice', 'old_test');
    globalThis.localStorage.setItem('vstep_user_A_listening_session_test1_practice', 'scoped_test');

    purgeLegacyGlobalKeys();

    expect(globalThis.localStorage.getItem('vstep_flashcard_deck_v3')).toBeNull();
    expect(globalThis.localStorage.getItem('vstep_listening_session_test1_practice')).toBeNull();
    expect(globalThis.localStorage.getItem('vstep_user_A_listening_session_test1_practice')).toBe('scoped_test');
  });
});
