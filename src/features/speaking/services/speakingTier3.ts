// Tier 3: Deterministic Composite Scoring & MOET 0.5 Rounding Engine
import type { SpeakingCriteriaScores } from '../speakingStorage';

export type SpeakingBand = 'Below B1' | 'B1' | 'B2' | 'C1';

export interface SpeakingCompositeScoreResult {
  rawScore: number;
  roundedScore: number;
  band: SpeakingBand;
  isB1Passed: boolean;
}

/**
 * Calculate single Part score from 4 MOET criteria:
 * Part Score = (Pronunciation + Fluency + GrammarVocab + TaskFulfillment) / 4
 */
export function calculatePartScore(criteria: SpeakingCriteriaScores): number {
  const sum =
    Number(criteria.pronunciation || 0) +
    Number(criteria.fluency_coherence || 0) +
    Number(criteria.grammar_vocabulary || 0) +
    Number(criteria.task_fulfillment || 0);
  return Math.round((sum / 4) * 10) / 10;
}

/**
 * Official MOET VSTEP 0.5 rounding algorithm:
 * - Fractional remainder < 0.25 => round down to .0
 * - 0.25 <= remainder < 0.75 => round to .5
 * - remainder >= 0.75 => round up to 1.0
 */
export function roundToVstepHalf(rawScore: number): number {
  const integerPart = Math.floor(rawScore);
  const remainder = Math.round((rawScore - integerPart) * 100) / 100;

  if (remainder < 0.25) {
    return integerPart;
  }
  if (remainder < 0.75) {
    return integerPart + 0.5;
  }
  return integerPart + 1.0;
}

/**
 * Map VSTEP numeric score to CEFR proficiency band according to Decision 729:
 * - < 4.0: Below B1 (Dưới B1 / Không đạt chuẩn tốt nghiệp)
 * - 4.0 - 5.5: B1 (Bậc 3 / Đạt chuẩn tốt nghiệp Đại học)
 * - 6.0 - 8.0: B2 (Bậc 4)
 * - 8.5 - 10.0: C1 (Bậc 5)
 */
export function getSpeakingBand(score: number): SpeakingBand {
  if (score < 4.0) return 'Below B1';
  if (score <= 5.5) return 'B1';
  if (score <= 8.0) return 'B2';
  return 'C1';
}

/**
 * Calculate overall composite Speaking score across completed parts.
 */
export function calculateSpeakingCompositeScore(partScores: number[]): SpeakingCompositeScoreResult {
  const validScores = partScores.filter((s) => typeof s === 'number' && !isNaN(s));
  if (validScores.length === 0) {
    return {
      rawScore: 0,
      roundedScore: 0,
      band: 'Below B1',
      isB1Passed: false,
    };
  }

  const sum = validScores.reduce((acc, score) => acc + score, 0);
  const rawScore = Math.round((sum / validScores.length) * 100) / 100;
  const roundedScore = roundToVstepHalf(rawScore);
  const band = getSpeakingBand(roundedScore);

  return {
    rawScore,
    roundedScore,
    band,
    isB1Passed: roundedScore >= 4.0,
  };
}
