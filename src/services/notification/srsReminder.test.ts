import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import {
  isReminderDue,
  formatDateKey,
  getReminderPrefs,
  saveReminderPrefs,
  REMINDER_PREFS_KEY,
  DEFAULT_REMINDER_PREFS,
} from './srsReminderService';
import { setBadge, clearBadge } from './badgeService';

describe('SRS Reminder Service', () => {
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
    vi.restoreAllMocks();
  });

  afterEach(() => {
    store.clear();
  });

  describe('formatDateKey', () => {
    it('should format dates as YYYY-MM-DD with zero-padding', () => {
      const d = new Date(2026, 8, 12); // Month is 0-indexed (8 = September)
      expect(formatDateKey(d)).toBe('2026-09-12');

      const d2 = new Date(2026, 0, 5); // January 5
      expect(formatDateKey(d2)).toBe('2026-01-05');
    });
  });

  describe('isReminderDue', () => {
    it('should return false if dueCount is 0 or negative', () => {
      const now = new Date(2026, 8, 12, 10, 0); // 10:00 AM
      expect(isReminderDue(now, '09:00', null, 0)).toBe(false);
      expect(isReminderDue(now, '09:00', null, -5)).toBe(false);
    });

    it('should return false if already notified today', () => {
      const now = new Date(2026, 8, 12, 10, 0);
      expect(isReminderDue(now, '09:00', '2026-09-12', 15)).toBe(false);
    });

    it('should return true if dueCount > 0, current time >= reminder time, and last notified is previous day', () => {
      const now = new Date(2026, 8, 12, 10, 0); // 10:00 AM
      expect(isReminderDue(now, '09:00', '2026-09-11', 10)).toBe(true);
      expect(isReminderDue(now, '10:00', null, 1)).toBe(true);
    });

    it('should return false if current time is before reminder time', () => {
      const now = new Date(2026, 8, 12, 8, 30); // 08:30 AM
      expect(isReminderDue(now, '09:00', null, 10)).toBe(false);
      expect(isReminderDue(now, '20:00', '2026-09-11', 5)).toBe(false);
    });

    it('should return false for malformed reminder time', () => {
      const now = new Date(2026, 8, 12, 10, 0);
      expect(isReminderDue(now, 'invalid', null, 10)).toBe(false);
      expect(isReminderDue(now, '12', null, 10)).toBe(false);
    });
  });

  describe('Reminder Preferences Storage', () => {
    it('should return default preferences when nothing is stored', () => {
      const prefs = getReminderPrefs();
      expect(prefs).toEqual(DEFAULT_REMINDER_PREFS);
    });

    it('should persist and retrieve updated preferences', () => {
      saveReminderPrefs({
        enabled: true,
        reminderTime: '20:30',
        lastNotifiedDate: '2026-09-12',
      });

      const retrieved = getReminderPrefs();
      expect(retrieved.enabled).toBe(true);
      expect(retrieved.reminderTime).toBe('20:30');
      expect(retrieved.lastNotifiedDate).toBe('2026-09-12');
    });

    it('should recover gracefully from corrupted localStorage JSON', () => {
      globalThis.localStorage.setItem(REMINDER_PREFS_KEY, '{ invalid_json');
      const prefs = getReminderPrefs();
      expect(prefs).toEqual(DEFAULT_REMINDER_PREFS);
    });
  });

  describe('Badge Service', () => {
    it('should call navigator.setAppBadge with positive count', async () => {
      const setAppBadgeMock = vi.fn().mockResolvedValue(undefined);
      const clearAppBadgeMock = vi.fn().mockResolvedValue(undefined);

      vi.stubGlobal('navigator', {
        setAppBadge: setAppBadgeMock,
        clearAppBadge: clearAppBadgeMock,
      });

      await setBadge(12);
      expect(setAppBadgeMock).toHaveBeenCalledWith(12);
      expect(clearAppBadgeMock).not.toHaveBeenCalled();
    });

    it('should call navigator.clearAppBadge when count is 0 or negative', async () => {
      const setAppBadgeMock = vi.fn().mockResolvedValue(undefined);
      const clearAppBadgeMock = vi.fn().mockResolvedValue(undefined);

      vi.stubGlobal('navigator', {
        setAppBadge: setAppBadgeMock,
        clearAppBadge: clearAppBadgeMock,
      });

      await setBadge(0);
      expect(clearAppBadgeMock).toHaveBeenCalled();

      clearAppBadgeMock.mockClear();
      await clearBadge();
      expect(clearAppBadgeMock).toHaveBeenCalled();
    });

    it('should not throw if badging API is unsupported or navigator is undefined', async () => {
      vi.stubGlobal('navigator', {});
      await expect(setBadge(5)).resolves.not.toThrow();
      await expect(clearBadge()).resolves.not.toThrow();
    });
  });
});
