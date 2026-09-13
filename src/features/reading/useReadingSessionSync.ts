import { useEffect } from 'react';
import type { ReadingMode, ReadingScoreResult } from './types';
import { fetchTestSubmission } from '../../services/supabase/testSubmissionSync';
import {
  saveReadingSession,
  clearReadingSession,
  hydrateReadingSessionFromCloud,
} from './readingStorage';

interface UseReadingSessionSyncOptions {
  testId: string;
  mode: ReadingMode;
  userId?: string;
  answers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  flaggedQuestions: Set<string>;
  notes: Record<string, string>;
  isSubmitted: boolean;
  scoreResult: ReadingScoreResult | null;
  initialSubmitted?: boolean;
  onHydrate: (hydrated: {
    answers: Record<string, 'A' | 'B' | 'C' | 'D'>;
    flaggedQuestions: Set<string>;
    notes: Record<string, string>;
    scoreResult: ReadingScoreResult | null;
  }) => void;
  onRemoteReset: () => void;
}

export function useReadingSessionSync({
  testId,
  mode,
  userId,
  answers,
  flaggedQuestions,
  notes,
  isSubmitted,
  scoreResult,
  initialSubmitted,
  onHydrate,
  onRemoteReset,
}: UseReadingSessionSyncOptions) {
  // Persist session to local storage
  useEffect(() => {
    if (!userId) return;
    saveReadingSession(
      testId,
      mode,
      {
        answers,
        flaggedQuestions: Array.from(flaggedQuestions),
        notes,
        isSubmitted,
        scoreResult,
      },
      userId
    );
  }, [testId, mode, answers, flaggedQuestions, notes, isSubmitted, scoreResult, userId]);

  // Cross-device cloud sync and remote reset reconciliation
  useEffect(() => {
    if (!userId) return;
    let isCancelled = false;

    async function syncFromCloud() {
      if (!userId) return;
      try {
        const cloudData = await fetchTestSubmission(userId, testId, mode);
        if (isCancelled) return;

        if (cloudData) {
          const hydrated = hydrateReadingSessionFromCloud(testId, mode, cloudData, userId);
          if (isCancelled) return;
          onHydrate({
            answers: hydrated.answers,
            flaggedQuestions: new Set(hydrated.flaggedQuestions),
            notes: hydrated.notes,
            scoreResult: hydrated.scoreResult,
          });
        } else if (initialSubmitted) {
          clearReadingSession(testId, mode, userId);
          if (isCancelled) return;
          onRemoteReset();
        }
      } catch (err) {
        console.warn('Failed to sync reading test submission from cloud:', err);
      }
    }

    syncFromCloud();

    return () => {
      isCancelled = true;
    };
  }, [userId, testId, mode, initialSubmitted, onHydrate, onRemoteReset]);
}
