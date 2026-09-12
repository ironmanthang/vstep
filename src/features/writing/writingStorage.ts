import { getUserStorageKey } from '../../services/storage/userStorage';
import type { CriteriaScores, VstepBand } from './services/writingTier3';

export type WritingMode = 'practice' | 'exam';

export interface WritingErrorItem {
  type: 'grammar' | 'vietlish' | 'vocabulary' | 'spelling';
  original_text: string;
  suggested_replacement: string;
  explanation_vi: string;
}

export interface TaskEvaluation {
  criteriaScores: CriteriaScores;
  taskScore: number;
  prompt_points_analysis: string[];
  thesis_statement?: string;
  priority_action_items: string[];
  error_catalog: WritingErrorItem[];
  praise_highlights: string[];
  ai_fixed_b1_essay: string;
  justifications: {
    task_fulfillment: string;
    organization: string;
    vocabulary: string;
    grammar: string;
  };
}

export interface WritingEvaluationResult {
  task1: TaskEvaluation;
  task2: TaskEvaluation;
  compositeScore: {
    rawScore: number;
    roundedScore: number;
    band: VstepBand;
    isB1Passed: boolean;
  };
  evaluatedAt: number;
}

export interface StoredWritingSession {
  task1Text: string;
  task2Text: string;
  task1WordCount: number;
  task2WordCount: number;
  task1SavedAt?: number;
  task2SavedAt?: number;
  activeTab: 'task1' | 'task2';
  secondsRemaining: number;
  isSubmitted: boolean;
  evaluationResult: WritingEvaluationResult | null;
  savedAt: number;
}

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
