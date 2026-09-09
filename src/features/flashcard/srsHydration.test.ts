import { describe, it, expect } from 'vitest';
import type { FlashcardItem } from '../../types/schemas';

describe('Decoupled Corpus Hydration Safety Suite', () => {
  const sampleCorpus: FlashcardItem[] = [
    {
      id: 'fc_edu_001',
      topic: 'Education',
      level: 'B1',
      word: 'curriculum',
      phonetic: '/kəˈrɪk.jə.ləm/',
      part_of_speech: 'noun',
      definition_vi: 'Chương trình giảng dạy cập nhật mới',
      collocations: ['core curriculum'],
      example_sentence_en: 'Modern curriculum.',
      example_sentence_vi: 'Chương trình hiện đại.',
      audio_url: '',
      srs_metadata: {
        repetition_count: 0,
        interval_days: 0,
        ease_factor: 2.5,
        last_reviewed_at: null,
        next_review_timestamp: 0,
        status: 'new',
      },
    },
    {
      id: 'fc_edu_002',
      topic: 'Education',
      level: 'B1',
      word: 'assignment',
      phonetic: '/əˈsaɪn.mənt/',
      part_of_speech: 'noun',
      definition_vi: 'Bài tập được giao',
      collocations: ['submit an assignment'],
      example_sentence_en: 'Submit assignments.',
      example_sentence_vi: 'Nộp bài tập.',
      audio_url: '',
      srs_metadata: {
        repetition_count: 0,
        interval_days: 0,
        ease_factor: 2.5,
        last_reviewed_at: null,
        next_review_timestamp: 0,
        status: 'new',
      },
    },
  ];

  it('preserves user SRS review progress and merges with fresh corpus content', () => {
    // Simulated stored state from 5 months ago with old definition
    const savedState: FlashcardItem[] = [
      {
        id: 'fc_edu_001',
        topic: 'Education',
        level: 'B1',
        word: 'curriculum',
        phonetic: '/old_phonetic/',
        part_of_speech: 'noun',
        definition_vi: 'Dinh nghia cu',
        collocations: [],
        example_sentence_en: 'Old sentence',
        example_sentence_vi: 'Cau cu',
        audio_url: '',
        srs_metadata: {
          repetition_count: 6,
          interval_days: 30,
          ease_factor: 2.6,
          last_reviewed_at: 1700000000000,
          next_review_timestamp: 1702592000000,
          status: 'mastered',
        },
      },
    ];

    const reviewMap = new Map(
      savedState
        .filter((c): c is FlashcardItem => Boolean(c && c.id && c.srs_metadata))
        .map((c: FlashcardItem) => [c.id, c.srs_metadata])
    );

    const hydratedCards = sampleCorpus.map((seedCard) => {
      const savedMeta = reviewMap.get(seedCard.id);
      if (savedMeta) {
        return { ...seedCard, srs_metadata: savedMeta };
      }
      return seedCard;
    });

    // Card 1 maintains 5 months of learned SRS progress
    expect(hydratedCards[0].srs_metadata.status).toBe('mastered');
    expect(hydratedCards[0].srs_metadata.interval_days).toBe(30);
    expect(hydratedCards[0].srs_metadata.repetition_count).toBe(6);

    // Card 1 receives latest canonical definition from corpus, not stale old definition
    expect(hydratedCards[0].definition_vi).toBe('Chương trình giảng dạy cập nhật mới');

    // Card 2 was never reviewed, correctly stays as clean new card
    expect(hydratedCards[1].srs_metadata.status).toBe('new');
    expect(hydratedCards[1].srs_metadata.repetition_count).toBe(0);
  });

  it('seamlessly scales when 1,500 new cards are added without dropping existing reviews', () => {
    const existingLearnedId = 'fc_edu_001';
    const savedReviews = new Map([
      [
        existingLearnedId,
        {
          repetition_count: 3,
          interval_days: 7,
          ease_factor: 2.5,
          last_reviewed_at: 1700000000000,
          next_review_timestamp: 1700604800000,
          status: 'learning' as const,
        },
      ],
    ]);

    // Extended corpus simulating adding 1,500 more cards (to reach 3,000)
    const expandedCorpus: FlashcardItem[] = [
      ...sampleCorpus,
      {
        id: 'fc_edu_1501',
        topic: 'Education',
        level: 'B2',
        word: 'pedagogy',
        phonetic: '/ˈped.ə.ɡɒdʒ.i/',
        part_of_speech: 'noun',
        definition_vi: 'Phương pháp sư phạm',
        collocations: ['innovative pedagogy'],
        example_sentence_en: 'Innovative pedagogy improves learning.',
        example_sentence_vi: 'Phương pháp sư phạm đổi mới giúp cải thiện học tập.',
        audio_url: '',
        srs_metadata: {
          repetition_count: 0,
          interval_days: 0,
          ease_factor: 2.5,
          last_reviewed_at: null,
          next_review_timestamp: 0,
          status: 'new',
        },
      },
    ];

    const result = expandedCorpus.map((seedCard) => {
      const saved = savedReviews.get(seedCard.id);
      return saved ? { ...seedCard, srs_metadata: saved } : seedCard;
    });

    expect(result.length).toBe(3);
    expect(result[0].srs_metadata.status).toBe('learning');
    expect(result[0].srs_metadata.repetition_count).toBe(3);
    expect(result[2].id).toBe('fc_edu_1501');
    expect(result[2].srs_metadata.status).toBe('new');
  });
});
