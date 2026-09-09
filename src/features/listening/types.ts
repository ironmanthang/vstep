import type { ListeningTest } from '../../types/schemas';

export type ListeningMode = 'practice' | 'exam';

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

export interface ListeningAudioState {
  isPlaying: boolean;
  currentTime: number; // in seconds
  duration: number; // in seconds
  playbackRate: number; // 0.75, 1.0, 1.25
  isMuted: boolean;
  activeSubtitleIndex: number;
}

export interface PassageGroupInfo {
  passageId: string;
  title: string;
  startMs: number;
  endMs: number;
  questionIds: string[];
}

export type { ListeningTest };
