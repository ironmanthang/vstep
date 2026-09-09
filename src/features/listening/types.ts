import type { ListeningTest } from '../../types/schemas';

export type ListeningMode = 'practice' | 'exam';

export type DictationTokenStatus = 'correct' | 'misspelled' | 'missing' | 'extra';

export interface DictationToken {
  text: string;
  status: DictationTokenStatus;
  expected?: string;
}

export interface DictationDiffResult {
  tokens: DictationToken[];
  isExactMatch: boolean;
  accuracyPercentage: number;
}

export interface UserAnswerState {
  selectedKey?: 'A' | 'B' | 'C' | 'D';
  isFlagged?: boolean;
}

export interface ListeningScoreResult {
  totalQuestions: number;
  correctCount: number;
  scoreOutOf10: number;
  timeSpentSeconds: number;
  completedAt: number;
}

export type ActivePracticeTab = 'questions' | 'dictation' | 'transcript';

export interface ListeningAudioState {
  isPlaying: boolean;
  currentTime: number; // in seconds
  duration: number; // in seconds
  playbackRate: number; // 0.75, 1.0, 1.25
  isMuted: boolean;
  activeSubtitleIndex: number;
}

export type { ListeningTest };
