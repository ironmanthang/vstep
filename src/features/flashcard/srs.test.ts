import { describe, it, expect } from 'vitest';
import { reviewCard, getReviewQueue, getSRSDeckStats } from './srs';
import type { FlashcardItem } from '../../types/schemas';

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
  srs_metadata: {
    repetition_count: 0,
    interval_days: 0,
    ease_factor: 2.5,
    last_reviewed_at: null,
    next_review_timestamp: 0,
    status: 'new',
  },
};

describe('Flashcard SRS Algorithm Suite', () => {
  const baseTime = 1700000000000;

  it('correctly queues new and due cards', () => {
    const queue = getReviewQueue([mockCard], baseTime);
    expect(queue.length).toBe(1);
    expect(queue[0].id).toBe('fc_test_001');
  });

  it('resets interval to 1 day on forgot rating', () => {
    const forgotCard = reviewCard(mockCard, 'forgot', baseTime);
    expect(forgotCard.srs_metadata.interval_days).toBe(1);
    expect(forgotCard.srs_metadata.status).toBe('learning');
    expect(forgotCard.srs_metadata.ease_factor).toBeLessThanOrEqual(2.3);
  });

  it('progresses interval naturally on remembered rating (1 -> 3 -> 7 -> 14)', () => {
    const step1 = reviewCard(mockCard, 'remembered', baseTime);
    expect(step1.srs_metadata.interval_days).toBe(1);

    const step2 = reviewCard(step1, 'remembered', baseTime + 86400000);
    expect(step2.srs_metadata.interval_days).toBe(3);

    const step3 = reviewCard(step2, 'remembered', baseTime + 86400000 * 3);
    expect(step3.srs_metadata.interval_days).toBe(7);

    const step4 = reviewCard(step3, 'remembered', baseTime + 86400000 * 7);
    expect(step4.srs_metadata.interval_days).toBe(14);
    expect(step4.srs_metadata.status).toBe('mastered');
  });

  it('accelerates interval and ease factor on easy rating', () => {
    const easyCard = reviewCard(mockCard, 'easy', baseTime);
    expect(easyCard.srs_metadata.interval_days).toBe(3);
    expect(easyCard.srs_metadata.ease_factor).toBeGreaterThan(2.5);
  });

  it('aggregates deck statistics accurately', () => {
    const forgotCard = reviewCard(mockCard, 'forgot', baseTime);
    const easyCard = reviewCard(mockCard, 'easy', baseTime);
    const stats = getSRSDeckStats([mockCard, forgotCard, easyCard]);

    expect(stats.total).toBe(3);
    expect(stats.learning).toBe(2);
    expect(stats.newCards).toBe(1);
  });
});
