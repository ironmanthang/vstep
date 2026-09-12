import type { ReadingTest, ReadingPassage } from '../../types/schemas';

export type ReadingMode = 'practice' | 'exam';

export interface ReadingScoreResult {
  totalQuestions: number;
  correctCount: number;
  scoreOutOf10: number;
  timeSpentSeconds: number;
  completedAt: number;
}

export type ReaderTheme = 'warm-sepia' | 'obsidian-dark' | 'cream-light';

export interface ReaderSettings {
  fontSize: number; // e.g. 14 - 22
  lineHeight: number; // e.g. 1.5, 1.8, 2.0
  theme: ReaderTheme;
}

export type { ReadingTest, ReadingPassage };
