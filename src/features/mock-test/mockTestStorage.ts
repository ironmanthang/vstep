import { getUserStorageKey } from '../../services/storage/userStorage';
import type { MockTestSession, MockTestHistoryRecord } from './types';

export function getMockTestSessionKey(testId: string, userId?: string): string {
  if (userId) {
    return getUserStorageKey(userId, `mock_test_session_${testId}`);
  }
  return `vstep_mock_test_session_${testId}`;
}

export function getMockTestHistoryKey(userId?: string): string {
  if (userId) {
    return getUserStorageKey(userId, 'mock_test_history');
  }
  return 'vstep_mock_test_history';
}

export function loadMockTestSession(testId: string, userId?: string): MockTestSession | null {
  try {
    if (typeof localStorage === 'undefined') return null;
    const raw = localStorage.getItem(getMockTestSessionKey(testId, userId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as MockTestSession;
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveMockTestSession(session: MockTestSession, userId?: string): void {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(
      getMockTestSessionKey(session.testId, userId),
      JSON.stringify(session)
    );
  } catch {
    // Ignore storage quota or access errors
  }
}

export function clearMockTestSession(testId: string, userId?: string): void {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.removeItem(getMockTestSessionKey(testId, userId));
  } catch {
    // Ignore
  }
}

export function getMockTestHistory(userId?: string): MockTestHistoryRecord[] {
  try {
    if (typeof localStorage === 'undefined') return [];
    const raw = localStorage.getItem(getMockTestHistoryKey(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as MockTestHistoryRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveMockTestHistoryRecord(record: MockTestHistoryRecord, userId?: string): void {
  try {
    if (typeof localStorage === 'undefined') return;
    const existing = getMockTestHistory(userId);
    // Keep most recent first, max 20 entries
    const updated = [record, ...existing.filter((r) => r.id !== record.id)].slice(0, 20);
    localStorage.setItem(getMockTestHistoryKey(userId), JSON.stringify(updated));
  } catch {
    // Ignore
  }
}

export function getLatestMockTestAttempt(
  testId: string,
  userId?: string
): MockTestHistoryRecord | null {
  const history = getMockTestHistory(userId);
  return history.find((h) => h.testId === testId) || null;
}
