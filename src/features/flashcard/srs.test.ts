import { describe, it, expect } from 'vitest';
import { reviewCard, getReviewQueue, getSRSDeckStats, formatInterval, getNextIntervalPreview } from './srs';
import type { FlashcardItem } from '../../types/schemas';
import { DEFAULT_SRS_METADATA } from '../../types/schemas';

const mockCard: FlashcardItem = {
  id: 'fc_test_001',
  topic: 'Environment',
  level: 'B1',
  word: 'biodegradable',
  phonetic: '/ˌbaɪ.əʊ.dɪˈɡreɪ.də.bəl/',
  part_of_speech: 'adjective',
  definition_vi: 'Có thể phân hủy sinh học tự nhiên',
  collocations: ['biodegradable waste'],
  example_sentence_en: 'Plastic bags are not biodegradable.',
  example_sentence_vi: 'Túi nhựa không thể phân hủy sinh học.',
  audio_url: '',
  srs_metadata: { ...DEFAULT_SRS_METADATA },
};

describe('FSRS Binary SRS Algorithm Suite', () => {
  const baseTime = 1700000000000;

  it('queues new cards (state=0, reps=0) as eligible', () => {
    const queue = getReviewQueue([mockCard], baseTime, 20);
    expect(queue.length).toBe(1);
    expect(queue[0].id).toBe('fc_test_001');
  });

  it('caps new cards at daily limit', () => {
    const manyCards = Array.from({ length: 50 }, (_, i) => ({
      ...mockCard,
      id: `fc_test_${String(i + 1).padStart(3, '0')}`,
      srs_metadata: { ...DEFAULT_SRS_METADATA },
    }));

    const queue = getReviewQueue(manyCards, baseTime, 20);
    expect(queue.length).toBe(20);
  });

  it('reviews a new card with correct rating — transitions to learning/review', () => {
    const { updatedCard, shouldRequeue } = reviewCard(mockCard, 'correct', baseTime);

    expect(updatedCard.srs_metadata.reps).toBeGreaterThanOrEqual(1);
    expect(updatedCard.srs_metadata.next_review_timestamp).toBeGreaterThan(baseTime);
    expect(updatedCard.srs_metadata.lapses).toBe(0);
    expect(shouldRequeue).toBe(false);
  });

  it('reviews a new card with wrong rating — triggers re-learning', () => {
    const { updatedCard, shouldRequeue } = reviewCard(mockCard, 'wrong', baseTime);

    expect(updatedCard.srs_metadata.reps).toBeGreaterThanOrEqual(1);
    // Should be in Learning or Relearning state
    expect([1, 3]).toContain(updatedCard.srs_metadata.state);
    expect(shouldRequeue).toBe(true);
  });

  it('progressive correct reviews increase interval', () => {
    const step1 = reviewCard(mockCard, 'correct', baseTime);
    const step2 = reviewCard(step1.updatedCard, 'correct', baseTime + 86400000);
    const step3 = reviewCard(step2.updatedCard, 'correct', baseTime + 86400000 * 4);

    // Each correct review should push the next review further into the future
    expect(step2.updatedCard.srs_metadata.next_review_timestamp)
      .toBeGreaterThan(step1.updatedCard.srs_metadata.next_review_timestamp);
    expect(step3.updatedCard.srs_metadata.next_review_timestamp)
      .toBeGreaterThan(step2.updatedCard.srs_metadata.next_review_timestamp);
  });

  it('wrong answer after correct streak resets stability', () => {
    // Build up some correct streak
    const step1 = reviewCard(mockCard, 'correct', baseTime);
    const step2 = reviewCard(step1.updatedCard, 'correct', baseTime + 86400000);
    // Now fail
    const step3 = reviewCard(step2.updatedCard, 'wrong', baseTime + 86400000 * 4);

    expect(step3.updatedCard.srs_metadata.lapses).toBeGreaterThanOrEqual(1);
    expect(step3.shouldRequeue).toBe(true);
  });

  it('max interval does not exceed 365 days', () => {
    // Simulate many correct reviews
    let card = mockCard;
    let time = baseTime;
    for (let i = 0; i < 15; i++) {
      const result = reviewCard(card, 'correct', time);
      card = result.updatedCard;
      // Jump forward past the next review date
      time = card.srs_metadata.next_review_timestamp + 1;
    }

    const intervalMs = card.srs_metadata.next_review_timestamp - (card.srs_metadata.last_reviewed_at ?? 0);
    const intervalDays = intervalMs / 86400000;
    expect(intervalDays).toBeLessThanOrEqual(366); // 365 + fuzz margin
  });

  it('queue priority: due reviews before new cards', () => {
    const now = baseTime + 86400000 * 10;

    const dueCard: FlashcardItem = {
      ...mockCard,
      id: 'fc_due_001',
      srs_metadata: {
        stability: 5,
        difficulty: 5,
        reps: 3,
        lapses: 0,
        last_reviewed_at: baseTime,
        next_review_timestamp: baseTime + 86400000 * 3, // Due 7 days ago
        state: 2, // Review
      },
    };

    const newCard: FlashcardItem = {
      ...mockCard,
      id: 'fc_new_001',
      srs_metadata: { ...DEFAULT_SRS_METADATA },
    };

    const queue = getReviewQueue([newCard, dueCard], now, 20);

    expect(queue.length).toBe(2);
    // Due review card should come before new card
    expect(queue[0].id).toBe('fc_due_001');
    expect(queue[1].id).toBe('fc_new_001');
  });

  it('aggregates deck statistics accurately', () => {
    const reviewed = reviewCard(mockCard, 'correct', baseTime);
    const stats = getSRSDeckStats([mockCard, reviewed.updatedCard]);

    expect(stats.total).toBe(2);
    expect(stats.newCards).toBe(1);
  });

  it('formatInterval returns correct Vietnamese strings', () => {
    expect(formatInterval(0)).toBe('Ôn lại ngay');
    expect(formatInterval(1)).toBe('1 ngày');
    expect(formatInterval(7)).toBe('7 ngày');
    expect(formatInterval(30)).toBe('1 tháng');
    expect(formatInterval(90)).toBe('3 tháng');
    expect(formatInterval(365)).toBe('1 năm');
  });

  it('getNextIntervalPreview returns a positive number for new cards', () => {
    const preview = getNextIntervalPreview(mockCard);
    expect(preview).toBeGreaterThanOrEqual(1);
  });
});
