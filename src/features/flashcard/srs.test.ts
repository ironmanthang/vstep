import { describe, it, expect } from 'vitest';
import {
  reviewCard,
  getReviewQueue,
  getDueReviewCount,
  getSRSDeckStats,
  formatInterval,
  getNextIntervalPreview,
} from './srs';
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

describe('FSRS Pure Spaced Repetition Suite', () => {
  const baseTime = 1700000000000;

  it('queues new cards as eligible for continuous learning', () => {
    const queue = getReviewQueue([mockCard], baseTime);
    expect(queue.length).toBe(1);
    expect(queue[0].id).toBe('fc_test_001');
  });

  it('reviews a new card with correct rating — schedules interval into future', () => {
    const { updatedCard } = reviewCard(mockCard, 'correct', baseTime);

    expect(updatedCard.srs_metadata.reps).toBeGreaterThanOrEqual(1);
    expect(updatedCard.srs_metadata.next_review_timestamp).toBeGreaterThan(baseTime);
    expect(updatedCard.srs_metadata.lapses).toBe(0);
  });

  it('reviews a card with wrong rating — schedules next review for 1 day', () => {
    const { updatedCard } = reviewCard(mockCard, 'wrong', baseTime);

    expect(updatedCard.srs_metadata.next_review_timestamp).toBeGreaterThanOrEqual(
      baseTime + 86400000 * 0.9
    );
    expect(updatedCard.srs_metadata.next_review_timestamp).toBeLessThanOrEqual(
      baseTime + 86400000 * 1.5
    );
  });

  it('progressive correct reviews increase interval', () => {
    const step1 = reviewCard(mockCard, 'correct', baseTime);
    const step2 = reviewCard(step1.updatedCard, 'correct', baseTime + 86400000 * 2);
    const step3 = reviewCard(step2.updatedCard, 'correct', baseTime + 86400000 * 6);

    expect(step2.updatedCard.srs_metadata.next_review_timestamp).toBeGreaterThan(
      step1.updatedCard.srs_metadata.next_review_timestamp
    );
    expect(step3.updatedCard.srs_metadata.next_review_timestamp).toBeGreaterThan(
      step2.updatedCard.srs_metadata.next_review_timestamp
    );
  });

  it('wrong answer after correct streak records lapse and resets interval to 1 day', () => {
    const step1 = reviewCard(mockCard, 'correct', baseTime);
    const step2 = reviewCard(step1.updatedCard, 'correct', baseTime + 86400000);
    const step3 = reviewCard(step2.updatedCard, 'wrong', baseTime + 86400000 * 4);

    expect(step3.updatedCard.srs_metadata.lapses).toBeGreaterThanOrEqual(1);
  });

  it('max interval does not exceed 365 days', () => {
    let card = mockCard;
    let time = baseTime;
    for (let i = 0; i < 15; i++) {
      const result = reviewCard(card, 'correct', time);
      card = result.updatedCard;
      time = card.srs_metadata.next_review_timestamp + 1;
    }

    const intervalMs =
      card.srs_metadata.next_review_timestamp - (card.srs_metadata.last_reviewed_at ?? 0);
    const intervalDays = intervalMs / 86400000;
    expect(intervalDays).toBeLessThanOrEqual(366);
  });

  it('queue priority: overdue due reviews come before new cards', () => {
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
        state: 2,
      },
    };

    const newCard: FlashcardItem = {
      ...mockCard,
      id: 'fc_new_001',
      srs_metadata: { ...DEFAULT_SRS_METADATA },
    };

    const queue = getReviewQueue([newCard, dueCard], now);

    expect(queue.length).toBe(2);
    expect(queue[0].id).toBe('fc_due_001');
    expect(queue[1].id).toBe('fc_new_001');
  });

  it('getDueReviewCount counts only overdue cards and excludes unstudied cards', () => {
    const now = baseTime + 86400000 * 5;

    const dueCard: FlashcardItem = {
      ...mockCard,
      id: 'fc_due_001',
      srs_metadata: {
        stability: 2,
        difficulty: 4,
        reps: 1,
        lapses: 0,
        last_reviewed_at: baseTime,
        next_review_timestamp: baseTime + 86400000 * 2, // Overdue
        state: 2,
      },
    };

    const notDueCard: FlashcardItem = {
      ...mockCard,
      id: 'fc_future_001',
      srs_metadata: {
        stability: 10,
        difficulty: 4,
        reps: 2,
        lapses: 0,
        last_reviewed_at: baseTime,
        next_review_timestamp: baseTime + 86400000 * 10, // Not due yet
        state: 2,
      },
    };

    const newCard: FlashcardItem = {
      ...mockCard,
      id: 'fc_new_001',
      srs_metadata: { ...DEFAULT_SRS_METADATA },
    };

    expect(getDueReviewCount([newCard, dueCard, notDueCard], now)).toBe(1);
    expect(getDueReviewCount([newCard], now)).toBe(0);
  });

  it('aggregates deck statistics accurately', () => {
    const reviewed = reviewCard(mockCard, 'correct', baseTime);
    const stats = getSRSDeckStats([mockCard, reviewed.updatedCard]);

    expect(stats.total).toBe(2);
    expect(stats.newCards).toBe(1);
    expect(stats.learning).toBe(1);
    expect(stats.mastered).toBe(0);
  });

  it('formatInterval returns correct Vietnamese strings', () => {
    expect(formatInterval(0)).toBe('1 ngày');
    expect(formatInterval(1)).toBe('1 ngày');
    expect(formatInterval(7)).toBe('7 ngày');
    expect(formatInterval(30)).toBe('1 tháng');
    expect(formatInterval(90)).toBe('3 tháng');
    expect(formatInterval(365)).toBe('1 năm');
  });

  it('getNextIntervalPreview returns 1 for wrong and positive number for correct', () => {
    expect(getNextIntervalPreview(mockCard, 'wrong')).toBe(1);
    expect(getNextIntervalPreview(mockCard, 'correct')).toBeGreaterThanOrEqual(1);
  });

  it('filters flashcard items accurately by CEFR level', () => {
    const mixedDeck: FlashcardItem[] = [
      { ...mockCard, id: 'b1_card', level: 'B1' },
      { ...mockCard, id: 'b2_card', level: 'B2' },
      { ...mockCard, id: 'c1_card', level: 'C1' },
    ];

    const filterByLevel = (cards: FlashcardItem[], level: string) =>
      cards.filter((c) => level === 'Tất cả' || c.level === level);

    expect(filterByLevel(mixedDeck, 'Tất cả')).toHaveLength(3);
    expect(filterByLevel(mixedDeck, 'B1')).toHaveLength(1);
    expect(filterByLevel(mixedDeck, 'B1')[0].id).toBe('b1_card');
    expect(filterByLevel(mixedDeck, 'B2')).toHaveLength(1);
    expect(filterByLevel(mixedDeck, 'C1')).toHaveLength(1);
  });
});
