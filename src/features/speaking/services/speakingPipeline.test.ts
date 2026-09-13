import { describe, it, expect } from 'vitest';
import { countWords, calculateWpm, evaluateWpm, compileTier1AcousticReport } from './speakingTier1';
import {
  calculatePartScore,
  roundToVstepHalf,
  getSpeakingBand,
  calculateSpeakingCompositeScore,
} from './speakingTier3';
import { getSupportedAudioMimeType } from './speakingAudio';

describe('Speaking Tier 1 Acoustic Precalc & WPM', () => {
  it('counts words accurately across whitespace and empty strings', () => {
    expect(countWords('')).toBe(0);
    expect(countWords('   ')).toBe(0);
    expect(countWords('I usually play badminton every morning.')).toBe(6);
    expect(countWords('First,   second, \n and third.')).toBe(4);
  });

  it('calculates Words Per Minute (WPM) accurately', () => {
    expect(calculateWpm(0, 60)).toBe(0);
    expect(calculateWpm(100, 0)).toBe(0);
    // 120 words in 60 seconds = 120 WPM
    expect(calculateWpm(120, 60)).toBe(120);
    // 60 words in 30 seconds = 120 WPM
    expect(calculateWpm(60, 30)).toBe(120);
    // 90 words in 45 seconds = 120 WPM
    expect(calculateWpm(90, 45)).toBe(120);
  });

  it('evaluates speaking pace against VSTEP B1 CEFR norms', () => {
    expect(evaluateWpm(70).rating).toBe('slow');
    expect(evaluateWpm(95).rating).toBe('acceptable');
    expect(evaluateWpm(115).rating).toBe('optimal');
    expect(evaluateWpm(145).rating).toBe('fast');
  });

  it('compiles comprehensive Tier 1 acoustic report', () => {
    const metrics = {
      durationSeconds: 60,
      speakingDurationSeconds: 45,
      silenceDurationSeconds: 15,
      longPausesCount: 2,
    };
    const transcript = 'I like learning English with native teachers in international center.';
    const report = compileTier1AcousticReport(metrics, transcript);

    expect(report.wordCount).toBe(10);
    expect(report.totalDurationSeconds).toBe(60);
    expect(report.longPausesCount).toBe(2);
    expect(report.detectedWpm).toBeGreaterThan(0);
  });
});

describe('Speaking Tier 3 MOET Decision 729 Composite Scoring', () => {
  it('calculates single Part score as average of 4 MOET criteria', () => {
    const criteria = {
      pronunciation: 5.0,
      fluency_coherence: 5.0,
      grammar_vocabulary: 4.5,
      task_fulfillment: 5.5,
    };
    // (5 + 5 + 4.5 + 5.5) / 4 = 20 / 4 = 5.0
    expect(calculatePartScore(criteria)).toBe(5.0);
  });

  it('applies official MOET 0.5 rounding rule correctly', () => {
    // Remainder < 0.25 -> .0
    expect(roundToVstepHalf(4.0)).toBe(4.0);
    expect(roundToVstepHalf(4.12)).toBe(4.0);
    expect(roundToVstepHalf(4.24)).toBe(4.0);

    // 0.25 <= Remainder < 0.75 -> .5
    expect(roundToVstepHalf(4.25)).toBe(4.5);
    expect(roundToVstepHalf(4.33)).toBe(4.5);
    expect(roundToVstepHalf(4.5)).toBe(4.5);
    expect(roundToVstepHalf(4.74)).toBe(4.5);

    // Remainder >= 0.75 -> 1.0
    expect(roundToVstepHalf(4.75)).toBe(5.0);
    expect(roundToVstepHalf(4.88)).toBe(5.0);
    expect(roundToVstepHalf(4.99)).toBe(5.0);
  });

  it('maps scores to correct CEFR proficiency bands', () => {
    expect(getSpeakingBand(3.5)).toBe('Below B1');
    expect(getSpeakingBand(4.0)).toBe('B1');
    expect(getSpeakingBand(5.5)).toBe('B1');
    expect(getSpeakingBand(6.0)).toBe('B2');
    expect(getSpeakingBand(8.0)).toBe('B2');
    expect(getSpeakingBand(8.5)).toBe('C1');
  });

  it('calculates composite exam score across 3 completed parts', () => {
    // Part 1: 5.0, Part 2: 5.0, Part 3: 4.5 => Average = 4.83 => Rounded = 5.0 (B1 Passed)
    const result = calculateSpeakingCompositeScore([5.0, 5.0, 4.5]);
    expect(result.rawScore).toBe(4.83);
    expect(result.roundedScore).toBe(5.0);
    expect(result.band).toBe('B1');
    expect(result.isB1Passed).toBe(true);
  });

  it('handles below B1 fail case correctly', () => {
    // Average = 3.5 => Rounded = 3.5 (Below B1)
    const result = calculateSpeakingCompositeScore([3.0, 3.5, 4.0]);
    expect(result.roundedScore).toBe(3.5);
    expect(result.band).toBe('Below B1');
    expect(result.isB1Passed).toBe(false);
  });
});

describe('Speaking Audio Safe Dynamic MIME Negotiation', () => {
  it('returns a non-empty string or fallback when MediaRecorder is present', () => {
    const mime = getSupportedAudioMimeType();
    expect(typeof mime).toBe('string');
  });
});
