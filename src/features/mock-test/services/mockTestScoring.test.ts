import { describe, it, expect } from 'vitest';
import {
  roundToMoetHalf,
  getMoetBandInfo,
  calculateListeningScore,
  calculateReadingScore,
  calculateMockTestComposite,
} from './mockTestScoring';

describe('VSTEP MOET Decision 729 Scoring & Rounding Engine', () => {
  describe('roundToMoetHalf', () => {
    it('rounds down to .0 when fractional remainder is strictly less than 0.25', () => {
      expect(roundToMoetHalf(6.20)).toBe(6.0);
      expect(roundToMoetHalf(5.12)).toBe(5.0);
      expect(roundToMoetHalf(3.24)).toBe(3.0);
      expect(roundToMoetHalf(8.00)).toBe(8.0);
      expect(roundToMoetHalf(7.15)).toBe(7.0);
    });

    it('rounds to .5 when fractional remainder is between 0.25 and 0.74', () => {
      expect(roundToMoetHalf(6.25)).toBe(6.5);
      expect(roundToMoetHalf(6.70)).toBe(6.5);
      expect(roundToMoetHalf(3.50)).toBe(3.5);
      expect(roundToMoetHalf(4.25)).toBe(4.5);
      expect(roundToMoetHalf(7.74)).toBe(7.5);
    });

    it('rounds up to 1.0 when fractional remainder is greater than or equal to 0.75', () => {
      expect(roundToMoetHalf(3.75)).toBe(4.0);
      expect(roundToMoetHalf(6.75)).toBe(7.0);
      expect(roundToMoetHalf(8.80)).toBe(9.0);
      expect(roundToMoetHalf(5.95)).toBe(6.0);
    });

    it('handles boundary values cleanly (0, 10, negative, NaN)', () => {
      expect(roundToMoetHalf(0)).toBe(0);
      expect(roundToMoetHalf(10)).toBe(10);
      expect(roundToMoetHalf(10.5)).toBe(10);
      expect(roundToMoetHalf(-2)).toBe(0);
      expect(roundToMoetHalf(NaN)).toBe(0);
    });
  });

  describe('calculateListeningScore', () => {
    it('calculates proportional score on scale 0.0 - 10.0', () => {
      expect(calculateListeningScore(0, 35)).toBe(0);
      expect(calculateListeningScore(35, 35)).toBe(10);
      // 17.5 / 35 * 10 = 5.0
      expect(calculateListeningScore(18, 35)).toBe(5.1);
      expect(calculateListeningScore(28, 35)).toBe(8.0);
    });
  });

  describe('calculateReadingScore', () => {
    it('calculates proportional score on scale 0.0 - 10.0', () => {
      expect(calculateReadingScore(0, 40)).toBe(0);
      expect(calculateReadingScore(40, 40)).toBe(10);
      expect(calculateReadingScore(20, 40)).toBe(5.0);
      expect(calculateReadingScore(32, 40)).toBe(8.0);
    });
  });

  describe('getMoetBandInfo', () => {
    it('categorizes scores into correct CEFR bands', () => {
      expect(getMoetBandInfo(3.5).band).toBe('Below B1');
      expect(getMoetBandInfo(4.0).band).toBe('B1');
      expect(getMoetBandInfo(5.5).band).toBe('B1');
      expect(getMoetBandInfo(6.0).band).toBe('B2');
      expect(getMoetBandInfo(8.0).band).toBe('B2');
      expect(getMoetBandInfo(8.5).band).toBe('C1');
      expect(getMoetBandInfo(10.0).band).toBe('C1');
    });
  });

  describe('calculateMockTestComposite', () => {
    it('computes 4-skill composite average and applies MOET 0.5 rounding', () => {
      // (6.0 + 6.5 + 6.0 + 6.0) / 4 = 24.5 / 4 = 6.125 => remainder 0.125 < 0.25 => 6.0
      const res1 = calculateMockTestComposite({
        listeningScore: 6.0,
        readingScore: 6.5,
        writingScore: 6.0,
        speakingScore: 6.0,
      });
      expect(res1.rawOverall).toBe(6.13);
      expect(res1.roundedOverall).toBe(6.0);
      expect(res1.bandInfo.band).toBe('B2');

      // (6.0 + 6.5 + 6.5 + 6.0) / 4 = 25.0 / 4 = 6.25 => remainder 0.25 => 6.5
      const res2 = calculateMockTestComposite({
        listeningScore: 6.0,
        readingScore: 6.5,
        writingScore: 6.5,
        speakingScore: 6.0,
      });
      expect(res2.rawOverall).toBe(6.25);
      expect(res2.roundedOverall).toBe(6.5);
      expect(res2.bandInfo.band).toBe('B2');

      // (3.5 + 4.0 + 4.0 + 3.5) / 4 = 15.0 / 4 = 3.75 => remainder 0.75 => 4.0 (B1 achieved!)
      const res3 = calculateMockTestComposite({
        listeningScore: 3.5,
        readingScore: 4.0,
        writingScore: 4.0,
        speakingScore: 3.5,
      });
      expect(res3.rawOverall).toBe(3.75);
      expect(res3.roundedOverall).toBe(4.0);
      expect(res3.bandInfo.band).toBe('B1');
    });
  });
});
