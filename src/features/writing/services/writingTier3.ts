/**
 * Tier 3: Deterministic Composite Scoring & MOET Standard Rounding
 * Implements Decision 729/QĐ-BGDĐT official scoring formulas.
 */

export interface CriteriaScores {
  task_fulfillment: number;
  organization: number;
  vocabulary: number;
  grammar: number;
}

export type VstepBand = 'UNDER_B1' | 'B1' | 'B2' | 'C1';

/**
 * Computes individual Task score (average of 4 criteria).
 */
export function calculateTaskScore(criteria: CriteriaScores): number {
  const sum = criteria.task_fulfillment + criteria.organization + criteria.vocabulary + criteria.grammar;
  return Number((sum / 4).toFixed(2));
}

/**
 * Official MOET 0.5 Rounding Rule:
 * - Fractional part < 0.25 -> round down to .0
 * - Fractional part from 0.25 to < 0.75 -> round to .5
 * - Fractional part >= 0.75 -> round up to next whole integer (1.0)
 */
export function roundToMoetHalfBand(rawScore: number): number {
  if (isNaN(rawScore) || rawScore < 0) return 0;
  if (rawScore > 10) return 10;

  const integerPart = Math.floor(rawScore);
  const fractionalPart = Number((rawScore - integerPart).toFixed(4));

  if (fractionalPart < 0.25) {
    return integerPart;
  } else if (fractionalPart < 0.75) {
    return integerPart + 0.5;
  } else {
    return integerPart + 1.0;
  }
}

/**
 * Official MOET Writing Composite Formula:
 * Overall Writing = (Task 1 + Task 2 * 2) / 3
 * Task 1: 1/3 weight (33.3%)
 * Task 2: 2/3 weight (66.7%)
 */
export function calculateWritingCompositeScore(task1Score: number, task2Score: number): {
  rawScore: number;
  roundedScore: number;
  band: VstepBand;
  isB1Passed: boolean;
} {
  const raw = Number(((task1Score + task2Score * 2) / 3).toFixed(2));
  const rounded = roundToMoetHalfBand(raw);

  let band: VstepBand = 'UNDER_B1';
  if (rounded >= 8.5) {
    band = 'C1';
  } else if (rounded >= 6.0) {
    band = 'B2';
  } else if (rounded >= 4.0) {
    band = 'B1';
  }

  return {
    rawScore: raw,
    roundedScore: rounded,
    band,
    isB1Passed: rounded >= 4.0
  };
}
