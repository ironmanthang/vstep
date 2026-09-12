import type { ListeningMode, ListeningScoreResult } from './types';
import { getUserStorageKey } from '../../services/storage/userStorage';

export interface StoredListeningSession {
  answers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  flaggedQuestions: string[];
  notes: Record<string, string>;
  isSubmitted: boolean;
  scoreResult: ListeningScoreResult | null;
  savedAt: number;
}

export function getListeningStorageKey(testId: string, mode: ListeningMode, userId?: string): string {
  if (userId) {
    return getUserStorageKey(userId, `listening_session_${testId}_${mode}`);
  }
  return `vstep_listening_session_${testId}_${mode}`;
}

export function loadListeningSession(
  testId: string,
  mode: ListeningMode,
  userId?: string
): StoredListeningSession | null {
  try {
    if (typeof localStorage === 'undefined') return null;
    const raw = localStorage.getItem(getListeningStorageKey(testId, mode, userId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredListeningSession;
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveListeningSession(
  testId: string,
  mode: ListeningMode,
  session: Omit<StoredListeningSession, 'savedAt'>,
  userId?: string
): void {
  try {
    if (typeof localStorage === 'undefined') return;
    const payload: StoredListeningSession = {
      ...session,
      savedAt: Date.now(),
    };
    localStorage.setItem(getListeningStorageKey(testId, mode, userId), JSON.stringify(payload));
  } catch {
    // Ignore storage quota or access errors
  }
}

export function clearListeningSession(testId: string, mode: ListeningMode, userId?: string): void {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.removeItem(getListeningStorageKey(testId, mode, userId));
  } catch {
    // Ignore
  }
}

export interface CloudListeningPayload {
  answers: Record<string, string>;
  notes: Record<string, string>;
  flagged_questions: string[];
  score: number;
  correct_count: number;
  total_questions: number;
  time_spent_seconds: number;
  completed_at?: string;
}

export function hydrateListeningSessionFromCloud(
  testId: string,
  mode: ListeningMode,
  cloudData: CloudListeningPayload,
  userId?: string
): StoredListeningSession {
  const completedTimestamp = cloudData.completed_at
    ? new Date(cloudData.completed_at).getTime()
    : Date.now();

  const scoreResult: ListeningScoreResult = {
    totalQuestions: cloudData.total_questions,
    correctCount: cloudData.correct_count,
    scoreOutOf10: cloudData.score,
    timeSpentSeconds: cloudData.time_spent_seconds,
    completedAt: completedTimestamp,
  };

  const session: StoredListeningSession = {
    answers: cloudData.answers as Record<string, 'A' | 'B' | 'C' | 'D'>,
    flaggedQuestions: Array.isArray(cloudData.flagged_questions) ? cloudData.flagged_questions : [],
    notes: cloudData.notes || {},
    isSubmitted: true,
    scoreResult,
    savedAt: completedTimestamp,
  };

  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(getListeningStorageKey(testId, mode, userId), JSON.stringify(session));
    }
  } catch {
    // Ignore storage quota errors
  }

  return session;
}
