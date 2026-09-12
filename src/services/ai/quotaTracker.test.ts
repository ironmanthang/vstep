import { describe, it, expect, beforeEach } from 'vitest';
import { getDailyAIQuotaStatus, recordAIUsage, resetDailyAIQuota } from './quotaTracker';

describe('AI Quota Tracker Multi-Account Isolation Suite', () => {
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

  it('provides default full quota for fresh user', () => {
    const status = getDailyAIQuotaStatus('user_1', 5);
    expect(status.usedCount).toBe(0);
    expect(status.remaining).toBe(5);
    expect(status.isExhausted).toBe(false);
  });

  it('records quota usage per user without contaminating another user', () => {
    // User 1 uses 4 evaluations
    recordAIUsage(4, 'user_1', 5);
    const u1Status = getDailyAIQuotaStatus('user_1', 5);
    expect(u1Status.usedCount).toBe(4);
    expect(u1Status.remaining).toBe(1);

    // User 2 on the same device still has full quota
    const u2Status = getDailyAIQuotaStatus('user_2', 5);
    expect(u2Status.usedCount).toBe(0);
    expect(u2Status.remaining).toBe(5);
    expect(u2Status.isExhausted).toBe(false);
  });

  it('marks quota exhausted only for the user who exceeded limit', () => {
    recordAIUsage(5, 'user_1', 5);
    expect(getDailyAIQuotaStatus('user_1', 5).isExhausted).toBe(true);
    expect(getDailyAIQuotaStatus('user_2', 5).isExhausted).toBe(false);
  });

  it('resets quota for specific user cleanly', () => {
    recordAIUsage(3, 'user_1', 5);
    resetDailyAIQuota('user_1');
    expect(getDailyAIQuotaStatus('user_1', 5).usedCount).toBe(0);
  });
});
