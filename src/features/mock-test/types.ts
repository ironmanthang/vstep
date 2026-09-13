import type { ListeningScoreResult } from '../listening/types';
import type { ReadingScoreResult } from '../reading/types';
import type { WritingEvaluationResult } from '../writing/writingStorage';
import type { SpeakingEvaluationResult } from '../speaking/speakingStorage';

export type MockTestSkillSection = 'listening' | 'reading' | 'writing' | 'speaking';
export type MockTestSection = MockTestSkillSection | 'result';

export type VstepCefrBand = 'Below B1' | 'B1' | 'B2' | 'C1';

export interface MoetBandInfo {
  band: VstepCefrBand;
  bandLevelNumber: number; // 0 for Below B1, 3 for B1, 4 for B2, 5 for C1
  bandNameVi: string;
  descriptionVi: string;
  qualificationSummary: string;
  badgeClass: string;
}

export interface MockTestCompositeScore {
  listeningScore: number;
  readingScore: number;
  writingScore: number;
  speakingScore: number;
  rawOverall: number;
  roundedOverall: number;
  bandInfo: MoetBandInfo;
  completedAt: number;
  blurCount: number;
}

export interface MockTestSession {
  testId: string;
  activeSection: MockTestSection;
  completedSections: MockTestSkillSection[];
  startedAt: number;
  totalSecondsRemaining: number;
  blurCount: number;
  listeningResult: ListeningScoreResult | null;
  readingResult: ReadingScoreResult | null;
  writingResult: WritingEvaluationResult | null;
  speakingResult: SpeakingEvaluationResult | null;
  compositeResult: MockTestCompositeScore | null;
  isSubmitted: boolean;
}

export interface MockTestHistoryRecord {
  id: string;
  testId: string;
  testTitle: string;
  overallScore: number;
  band: VstepCefrBand;
  bandNameVi: string;
  listeningScore: number;
  readingScore: number;
  writingScore: number;
  speakingScore: number;
  blurCount: number;
  completedAt: number;
  dateStr: string;
}
