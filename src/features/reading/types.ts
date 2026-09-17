import type { ReadingTest, ReadingPassage } from '../../types/schemas';

export type ReadingMode = 'practice' | 'exam';

export interface ReadingScoreResult {
  totalQuestions: number;
  correctCount: number;
  scoreOutOf10: number;
  timeSpentSeconds: number;
  completedAt: number;
}

export interface ReaderSettings {
  fontSize: number; // e.g. 14 - 22
}

export type { ReadingTest, ReadingPassage };
