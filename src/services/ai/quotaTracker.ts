// Daily AI Evaluation Quota Tracker
import { formatDateToLocalISO } from '../../lib/streakUtils';
import { loadUserItem, saveUserItem, removeUserItem } from '../storage/userStorage';

const QUOTA_STORAGE_KEY = 'vstep_ai_daily_quota_v1';
export const DEFAULT_DAILY_AI_QUOTA = 5;

export interface AIQuotaStatus {
  date: string;
  usedCount: number;
  maxCount: number;
  remaining: number;
  isExhausted: boolean;
  percentageUsed: number;
}

interface StoredQuota {
  date: string;
  usedCount: number;
}

function safeGetItem(key: string): string | null {
  try {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    }
  } catch {
    // Ignore
  }
  return null;
}

function safeSetItem(key: string, value: string): void {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    }
  } catch {
    // Ignore
  }
}

/**
 * Get current daily AI quota usage status.
 * Polymorphic: accepts either (userId, maxLimit) or (maxLimit).
 */
export function getDailyAIQuotaStatus(
  userIdOrMaxLimit?: string | number,
  maxLimit: number = DEFAULT_DAILY_AI_QUOTA
): AIQuotaStatus {
  const userId = typeof userIdOrMaxLimit === 'string' ? userIdOrMaxLimit : undefined;
  const effectiveLimit = typeof userIdOrMaxLimit === 'number' ? userIdOrMaxLimit : maxLimit;
  const todayStr = formatDateToLocalISO(new Date());

  try {
    let parsed: StoredQuota | null = null;
    if (userId) {
      parsed = loadUserItem<StoredQuota | null>(userId, 'ai_daily_quota_v1', null);
    } else {
      const raw = safeGetItem(QUOTA_STORAGE_KEY);
      if (raw) parsed = JSON.parse(raw);
    }

    if (parsed && parsed.date === todayStr && typeof parsed.usedCount === 'number') {
      const usedCount = Math.max(0, parsed.usedCount);
      const remaining = Math.max(0, effectiveLimit - usedCount);
      return {
        date: todayStr,
        usedCount,
        maxCount: effectiveLimit,
        remaining,
        isExhausted: usedCount >= effectiveLimit,
        percentageUsed: Math.min(100, Math.round((usedCount / effectiveLimit) * 100)),
      };
    }
  } catch {
    // Fall back to clean state
  }

  return {
    date: todayStr,
    usedCount: 0,
    maxCount: effectiveLimit,
    remaining: effectiveLimit,
    isExhausted: false,
    percentageUsed: 0,
  };
}

/**
 * Record an AI evaluation usage count.
 * Polymorphic: accepts either (incrementBy, userId, maxLimit) or (incrementBy, maxLimit).
 */
export function recordAIUsage(
  incrementBy: number = 1,
  userIdOrMaxLimit?: string | number,
  maxLimit: number = DEFAULT_DAILY_AI_QUOTA
): AIQuotaStatus {
  const userId = typeof userIdOrMaxLimit === 'string' ? userIdOrMaxLimit : undefined;
  const effectiveLimit = typeof userIdOrMaxLimit === 'number' ? userIdOrMaxLimit : maxLimit;
  const current = getDailyAIQuotaStatus(userId, effectiveLimit);
  const todayStr = formatDateToLocalISO(new Date());
  const newUsed = current.usedCount + incrementBy;

  const payload: StoredQuota = {
    date: todayStr,
    usedCount: newUsed,
  };

  if (userId) {
    saveUserItem(userId, 'ai_daily_quota_v1', payload);
  } else {
    safeSetItem(QUOTA_STORAGE_KEY, JSON.stringify(payload));
  }

  return getDailyAIQuotaStatus(userId, effectiveLimit);
}

/**
 * Reset today's quota (useful for testing or dev mode).
 */
export function resetDailyAIQuota(userId?: string): void {
  if (typeof localStorage === 'undefined') return;
  try {
    if (userId) {
      removeUserItem(userId, 'ai_daily_quota_v1');
    }
    localStorage.removeItem(QUOTA_STORAGE_KEY);
  } catch {
    // Ignore
  }
}
