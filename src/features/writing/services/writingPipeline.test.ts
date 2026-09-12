import { describe, it, expect } from 'vitest';
import { countWords, computePromptCopyingRatio, detectVietlishSurfacePatterns, runTier1Precalc } from './writingTier1';
import { roundToMoetHalfBand, calculateTaskScore, calculateWritingCompositeScore } from './writingTier3';

describe('Writing Tier 1: Deterministic Word Counter', () => {
  it('handles empty and whitespace strings', () => {
    expect(countWords('')).toBe(0);
    expect(countWords('   \n\t  ')).toBe(0);
  });

  it('accurately counts standard sentences', () => {
    expect(countWords('Hello world')).toBe(2);
    expect(countWords('I am preparing for the VSTEP exam at Van Lang University.')).toBe(11);
  });

  it('handles contractions and punctuation', () => {
    expect(countWords("Don't worry, it's totally fine!")).toBe(5);
  });
});

describe('Writing Tier 1: Anti-Copying Tri-gram Ratio', () => {
  const prompt = 'You should write a letter to your friend David to invite him to visit your hometown next summer. Tell him about local places and weather.';

  it('ignores standard greeting and epistolary phrases without false flags', () => {
    const candidate = 'Dear David, I am writing this letter to tell you that my city is wonderful. We can explore ancient pagodas and taste fresh street food. The climate is warm and pleasant.';
    const ratio = computePromptCopyingRatio(candidate, prompt);
    // Should be low because greeting words and common stop words are filtered out
    expect(ratio).toBeLessThan(0.20);
  });

  it('flags heavy verbatim prompt copying', () => {
    // Verbatim copying of prompt instructions
    const candidate = 'Write a letter to your friend David to invite him to visit your hometown next summer. Tell him about local places and weather.';
    const ratio = computePromptCopyingRatio(candidate, prompt);
    expect(ratio).toBeGreaterThanOrEqual(0.80);
  });
});

describe('Writing Tier 1: Vietlish Surface Regex Filter', () => {
  it('detects Although... but... double conjunction', () => {
    const text = 'Although he practiced writing every single day, but he failed the exam.';
    const detections = detectVietlishSurfacePatterns(text);
    expect(detections.some(d => d.type === 'double_conjunction' && d.pattern.includes('Although'))).toBe(true);
  });

  it('detects Because... so... double conjunction', () => {
    const text = 'Because the tuition fee is very high, so many students need to work part-time.';
    const detections = detectVietlishSurfacePatterns(text);
    expect(detections.some(d => d.type === 'double_conjunction' && d.pattern.includes('Because'))).toBe(true);
  });

  it('detects missing existential "There is / There are"', () => {
    const text = 'In modern society have many technological problems.';
    const detections = detectVietlishSurfacePatterns(text);
    expect(detections.some(d => d.type === 'missing_existential')).toBe(true);
  });

  it('does not flag clean English sentences', () => {
    const text = 'Although he practiced writing every day, he failed the exam. In modern society, there are many problems.';
    const detections = detectVietlishSurfacePatterns(text);
    expect(detections.length).toBe(0);
  });
});

describe('Writing Tier 1: Orchestrator runTier1Precalc', () => {
  it('returns unified precalc status', () => {
    const prompt = 'Write an essay about living in cities.';
    const candidate = 'Living in big cities has advantages and disadvantages.';
    const res = runTier1Precalc(candidate, prompt, 250);
    expect(res.word_count).toBe(8);
    expect(res.min_words).toBe(250);
    expect(res.meets_word_count).toBe(false);
    expect(res.is_copying_flagged).toBe(false);
  });
});

describe('Writing Tier 3: Official MOET 0.5 Rounding & Formulas', () => {
  it('rounds fraction < 0.25 down to .0', () => {
    expect(roundToMoetHalfBand(4.0)).toBe(4.0);
    expect(roundToMoetHalfBand(4.15)).toBe(4.0);
    expect(roundToMoetHalfBand(4.24)).toBe(4.0);
    expect(roundToMoetHalfBand(6.12)).toBe(6.0);
  });

  it('rounds fraction between 0.25 and < 0.75 to .5', () => {
    expect(roundToMoetHalfBand(4.25)).toBe(4.5);
    expect(roundToMoetHalfBand(4.50)).toBe(4.5);
    expect(roundToMoetHalfBand(4.68)).toBe(4.5);
    expect(roundToMoetHalfBand(4.74)).toBe(4.5);
    expect(roundToMoetHalfBand(6.33)).toBe(6.5);
  });

  it('rounds fraction >= 0.75 up to next whole number', () => {
    expect(roundToMoetHalfBand(4.75)).toBe(5.0);
    expect(roundToMoetHalfBand(4.88)).toBe(5.0);
    expect(roundToMoetHalfBand(6.75)).toBe(7.0);
    expect(roundToMoetHalfBand(8.80)).toBe(9.0);
  });

  it('computes task criteria average correctly', () => {
    const score = calculateTaskScore({
      task_fulfillment: 5.0,
      organization: 5.5,
      vocabulary: 4.5,
      grammar: 5.0
    });
    expect(score).toBe(5.0);
  });

  it('computes official composite score (Task 1 + 2 * Task 2) / 3 and B1 pass status', () => {
    // Case 1: Solid B1 pass (Task 1: 4.5, Task 2: 5.0) -> (4.5 + 10) / 3 = 4.83 -> rounded 5.0 (B1)
    const res1 = calculateWritingCompositeScore(4.5, 5.0);
    expect(res1.rawScore).toBe(4.83);
    expect(res1.roundedScore).toBe(5.0);
    expect(res1.band).toBe('B1');
    expect(res1.isB1Passed).toBe(true);

    // Case 2: Under B1 fail (Task 1: 3.5, Task 2: 3.5) -> 3.5 -> rounded 3.5 (UNDER_B1)
    const res2 = calculateWritingCompositeScore(3.5, 3.5);
    expect(res2.roundedScore).toBe(3.5);
    expect(res2.band).toBe('UNDER_B1');
    expect(res2.isB1Passed).toBe(false);

    // Case 3: B2 pass (Task 1: 6.0, Task 2: 6.5) -> (6 + 13)/3 = 6.33 -> rounded 6.5 (B2)
    const res3 = calculateWritingCompositeScore(6.0, 6.5);
    expect(res3.roundedScore).toBe(6.5);
    expect(res3.band).toBe('B2');
    expect(res3.isB1Passed).toBe(true);
  });
});
