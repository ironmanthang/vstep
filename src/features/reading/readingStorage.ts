import type { ReadingMode, ReadingScoreResult } from './types';
import { getUserStorageKey } from '../../services/storage/userStorage';

export interface StoredReadingSession {
  answers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  flaggedQuestions: string[];
  notes: Record<string, string>;
  isSubmitted: boolean;
  scoreResult: ReadingScoreResult | null;
  savedAt: number;
}

export function getReadingStorageKey(testId: string, mode: ReadingMode, userId?: string): string {
  if (userId) {
    return getUserStorageKey(userId, `reading_session_${testId}_${mode}`);
  }
  return `vstep_reading_session_${testId}_${mode}`;
}

export function loadReadingSession(
  testId: string,
  mode: ReadingMode,
  userId?: string
): StoredReadingSession | null {
  try {
    if (typeof localStorage === 'undefined') return null;
    const raw = localStorage.getItem(getReadingStorageKey(testId, mode, userId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredReadingSession;
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveReadingSession(
  testId: string,
  mode: ReadingMode,
  session: Omit<StoredReadingSession, 'savedAt'>,
  userId?: string
): void {
  try {
    if (typeof localStorage === 'undefined') return;
    const payload: StoredReadingSession = {
      ...session,
      savedAt: Date.now(),
    };
    localStorage.setItem(getReadingStorageKey(testId, mode, userId), JSON.stringify(payload));
  } catch {
    // Ignore storage quota or access errors
  }
}

export function clearReadingSession(testId: string, mode: ReadingMode, userId?: string): void {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.removeItem(getReadingStorageKey(testId, mode, userId));
  } catch {
    // Ignore
  }
}

export interface CloudReadingPayload {
  answers: Record<string, string>;
  notes: Record<string, string>;
  flagged_questions: string[];
  score: number;
  correct_count: number;
  total_questions: number;
  time_spent_seconds: number;
  completed_at?: string;
}

export function hydrateReadingSessionFromCloud(
  testId: string,
  mode: ReadingMode,
  cloudData: CloudReadingPayload,
  userId?: string
): StoredReadingSession {
  const completedTimestamp = cloudData.completed_at
    ? new Date(cloudData.completed_at).getTime()
    : Date.now();

  const scoreResult: ReadingScoreResult = {
    totalQuestions: cloudData.total_questions,
    correctCount: cloudData.correct_count,
    scoreOutOf10: cloudData.score,
    timeSpentSeconds: cloudData.time_spent_seconds,
    completedAt: completedTimestamp,
  };

  const session: StoredReadingSession = {
    answers: cloudData.answers as Record<string, 'A' | 'B' | 'C' | 'D'>,
    flaggedQuestions: Array.isArray(cloudData.flagged_questions) ? cloudData.flagged_questions : [],
    notes: cloudData.notes || {},
    isSubmitted: true,
    scoreResult,
    savedAt: completedTimestamp,
  };

  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(getReadingStorageKey(testId, mode, userId), JSON.stringify(session));
    }
  } catch {
    // Ignore storage quota errors
  }

  return session;
}
