import { describe, it, expect } from 'vitest';
import { getSRSDeckStats, getReviewQueue, getDueReviewCount, reviewCard } from './srs';
import { VSTEP_CORPUS } from './corpus';
import type { FlashcardItem } from '../../types/schemas';

describe('All Words Mastered Simulation', () => {
  // Simulate all 3,000 words being mastered:
  // state: 2 (Review), reps: 5, stability: 60, due: in 30 days
  const futureTimestamp = Date.now() + 30 * 24 * 60 * 60 * 1000;
  const masteredCorpus: FlashcardItem[] = VSTEP_CORPUS.map(c => ({
    ...c,
    srs_metadata: {
      stability: 60,
      difficulty: 3,
      reps: 5,
      lapses: 0,
      last_reviewed_at: Date.now() - 24 * 60 * 60 * 1000,
      next_review_timestamp: futureTimestamp,
      state: 2 // State.Review
    }
  }));

  it('computes exactly 3000 mastered and 100% mastery percentage without division by zero or errors', () => {
    const stats = getSRSDeckStats(masteredCorpus);
    expect(stats.total).toBe(3000);
    expect(stats.mastered).toBe(3000);
    expect(stats.masteryPercentage).toBe(100);
    expect(stats.learning).toBe(0);
    expect(stats.newCards).toBe(0);
    expect(stats.leeches).toBe(0);
  });

  it('returns an empty queue cleanly when all words are mastered and none are due today', () => {
    const queue = getReviewQueue(masteredCorpus);
    expect(queue).toEqual([]);
    expect(queue.length).toBe(0);

    const dueCount = getDueReviewCount(masteredCorpus);
    expect(dueCount).toBe(0);
  });

  it('correctly schedules reviews when mastered cards reach their future due dates', () => {
    // Simulate time advancing 31 days into the future
    const thirtyOneDaysLater = futureTimestamp + 24 * 60 * 60 * 1000;
    const dueQueue = getReviewQueue(masteredCorpus, thirtyOneDaysLater);
    expect(dueQueue.length).toBe(3000);

    const dueCount = getDueReviewCount(masteredCorpus, thirtyOneDaysLater);
    expect(dueCount).toBe(3000);
  });

  it('allows reviewing a mastered card without crashing and updates stability', () => {
    const sampleCard = masteredCorpus[0];
    const { updatedCard } = reviewCard(sampleCard, 'correct');
    expect(updatedCard.srs_metadata.reps).toBe(6);
    expect(updatedCard.srs_metadata.stability).toBeGreaterThanOrEqual(sampleCard.srs_metadata.stability);
    expect(updatedCard.srs_metadata.next_review_timestamp).toBeGreaterThan(Date.now());
  });

  it('handles a mastered card answered incorrectly by increasing lapses and dropping interval', () => {
    const sampleCard = masteredCorpus[0];
    const { updatedCard } = reviewCard(sampleCard, 'wrong');
    expect(updatedCard.srs_metadata.lapses).toBe(1);
    // When wrong, FSRS schedules for next day (1 day interval)
    expect(updatedCard.srs_metadata.next_review_timestamp).toBeGreaterThan(Date.now());
  });
});
