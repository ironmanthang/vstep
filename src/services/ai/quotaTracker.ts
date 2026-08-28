// Daily AI Evaluation Quota Tracker
import { formatDateToLocalISO } from '../../lib/streakUtils';

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
 */
export function getDailyAIQuotaStatus(maxLimit: number = DEFAULT_DAILY_AI_QUOTA): AIQuotaStatus {
  const todayStr = formatDateToLocalISO(new Date());

  try {
    const raw = safeGetItem(QUOTA_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.date === todayStr && typeof parsed.usedCount === 'number') {
        const usedCount = Math.max(0, parsed.usedCount);
        const remaining = Math.max(0, maxLimit - usedCount);
        return {
          date: todayStr,
          usedCount,
          maxCount: maxLimit,
          remaining,
          isExhausted: usedCount >= maxLimit,
          percentageUsed: Math.min(100, Math.round((usedCount / maxLimit) * 100)),
        };
      }
    }
  } catch {
    // Fall back to clean state
  }

  return {
    date: todayStr,
    usedCount: 0,
    maxCount: maxLimit,
    remaining: maxLimit,
    isExhausted: false,
    percentageUsed: 0,
  };
}

/**
 * Record an AI evaluation usage count.
 */
export function recordAIUsage(incrementBy: number = 1, maxLimit: number = DEFAULT_DAILY_AI_QUOTA): AIQuotaStatus {
  const current = getDailyAIQuotaStatus(maxLimit);
  const todayStr = formatDateToLocalISO(new Date());
  const newUsed = current.usedCount + incrementBy;

  safeSetItem(
    QUOTA_STORAGE_KEY,
    JSON.stringify({
      date: todayStr,
      usedCount: newUsed,
    })
  );

  return getDailyAIQuotaStatus(maxLimit);
}

/**
 * Reset today's quota (useful for testing or dev mode).
 */
export function resetDailyAIQuota(): void {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
  try {
    localStorage.removeItem(QUOTA_STORAGE_KEY);
  } catch {
    // Ignore
  }
}
