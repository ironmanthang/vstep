import type { SpeakingBand } from './services/speakingTier3';

export type SpeakingMode = 'practice' | 'exam';

export interface SpeakingCriteriaScores {
  pronunciation: number;         // 0.0 - 10.0
  fluency_coherence: number;     // 0.0 - 10.0
  grammar_vocabulary: number;    // 0.0 - 10.0
  task_fulfillment: number;      // 0.0 - 10.0
}

export interface PhoneticErrorItem {
  word: string;
  expected_ipa: string;
  detected_error: string;
  explanation_vi: string;
  severity?: 'low' | 'medium' | 'critical';
}

export interface PartEvaluation {
  partIndex: number;
  partTitle: string;
  criteriaScores: SpeakingCriteriaScores;
  partScore: number;
  transcript: string;
  detectedWpm: number;
  promptCoverage: string;
  priorityActionItems: string[];
  phoneticErrors: PhoneticErrorItem[];
  justifications: {
    pronunciation: string;
    fluency_coherence: string;
    grammar_vocabulary: string;
    task_fulfillment: string;
  };
  aiFixedB1Speech: string;
  sampleResponse?: {
    band?: string;
    text: string;
    analysis_vi?: string;
  };
}

export interface SpeakingEvaluationResult {
  part1?: PartEvaluation;
  part2?: PartEvaluation;
  part3?: PartEvaluation;
  compositeScore: {
    rawScore: number;
    roundedScore: number;
    band: SpeakingBand;
    isB1Passed: boolean;
  };
  evaluatedAt: number;
}

export interface StoredSpeakingSession {
  activePart: 1 | 2 | 3;
  completedParts: number[];
  secondsRemaining: number;
  isSubmitted: boolean;
  evaluationResult: SpeakingEvaluationResult | null;
  audioDurations: Record<number, number>;
  savedAt: number;
}
