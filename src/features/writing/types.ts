import type { WritingPrompt } from '../../types/schemas';
import type { CriteriaScores, VstepBand } from './services/writingTier3';

export type WritingMode = 'practice' | 'exam';

export interface WritingTestInput {
  id: string;
  test_number: number;
  title: string;
  institution: string;
  total_duration_minutes: number;
  task1: WritingPrompt;
  task2: WritingPrompt;
}

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
