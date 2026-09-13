import { getUserStorageKey } from '../../services/storage/userStorage';
export type {
  WritingMode,
  WritingTestInput,
  WritingErrorItem,
  TaskEvaluation,
  WritingEvaluationResult,
  StoredWritingSession,
} from './types';
import type { WritingMode, StoredWritingSession } from './types';

export function getWritingStorageKey(testId: string, mode: WritingMode, userId?: string): string {
  if (userId) {
    return getUserStorageKey(userId, `writing_session_${testId}_${mode}`);
  }
  return `vstep_writing_session_${testId}_${mode}`;
}

export function loadWritingSession(
  testId: string,
  mode: WritingMode,
  userId?: string
): StoredWritingSession | null {
  try {
    if (typeof localStorage === 'undefined') return null;
    const raw = localStorage.getItem(getWritingStorageKey(testId, mode, userId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredWritingSession;
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveWritingSession(
  testId: string,
  mode: WritingMode,
  session: Omit<StoredWritingSession, 'savedAt'>,
  userId?: string
): void {
  try {
    if (typeof localStorage === 'undefined') return;
    const payload: StoredWritingSession = {
      ...session,
      savedAt: Date.now(),
    };
    localStorage.setItem(getWritingStorageKey(testId, mode, userId), JSON.stringify(payload));
  } catch {
    // Ignore storage quota or access errors
  }
}

export function clearWritingSession(testId: string, mode: WritingMode, userId?: string): void {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.removeItem(getWritingStorageKey(testId, mode, userId));
  } catch {
    // Ignore
  }
}
