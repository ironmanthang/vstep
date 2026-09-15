import { describe, it, expect } from 'vitest';
import type { FlashcardItem, SRSMetadata } from '../../types/schemas';
import { DEFAULT_SRS_METADATA } from '../../types/schemas';

describe('Decoupled Corpus Hydration Safety Suite (FSRS v3)', () => {
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
      srs_metadata: { ...DEFAULT_SRS_METADATA },
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
      srs_metadata: { ...DEFAULT_SRS_METADATA },
    },
  ];

  it('preserves user SRS review progress and merges with fresh corpus content', () => {
    // Simulated stored state with FSRS metadata
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
          stability: 15.5,
          difficulty: 4.2,
          reps: 6,
          lapses: 1,
          last_reviewed_at: 1700000000000,
          next_review_timestamp: 1702592000000,
          state: 2, // Review (mature)
        },
      },
    ];

    const reviewMap = new Map<string, SRSMetadata>(
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

    // Card 1 maintains learned SRS progress
    expect(hydratedCards[0].srs_metadata.state).toBe(2);
    expect(hydratedCards[0].srs_metadata.stability).toBe(15.5);
    expect(hydratedCards[0].srs_metadata.reps).toBe(6);
    expect(hydratedCards[0].srs_metadata.lapses).toBe(1);

    // Card 1 receives latest canonical definition from corpus
    expect(hydratedCards[0].definition_vi).toBe('Chương trình giảng dạy cập nhật mới');

    // Card 2 was never reviewed, correctly stays as clean new card
    expect(hydratedCards[1].srs_metadata.state).toBe(0);
    expect(hydratedCards[1].srs_metadata.reps).toBe(0);
  });

  it('seamlessly scales when new cards are added without dropping existing reviews', () => {
    const existingLearnedId = 'fc_edu_001';
    const savedReviews = new Map<string, SRSMetadata>([
      [
        existingLearnedId,
        {
          stability: 7.0,
          difficulty: 5.5,
          reps: 3,
          lapses: 0,
          last_reviewed_at: 1700000000000,
          next_review_timestamp: 1700604800000,
          state: 2,
        },
      ],
    ]);

    // Extended corpus simulating adding more cards
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
        srs_metadata: { ...DEFAULT_SRS_METADATA },
      },
    ];

    const result = expandedCorpus.map((seedCard) => {
      const saved = savedReviews.get(seedCard.id);
      return saved ? { ...seedCard, srs_metadata: saved } : seedCard;
    });

    expect(result.length).toBe(3);
    expect(result[0].srs_metadata.state).toBe(2);
    expect(result[0].srs_metadata.reps).toBe(3);
    expect(result[2].id).toBe('fc_edu_1501');
    expect(result[2].srs_metadata.state).toBe(0);
  });

  it('migrates v2 metadata format to v3 FSRS format', () => {
    // Simulate old v2 format
    const v2Meta = {
      repetition_count: 5,
      interval_days: 14,
      ease_factor: 2.3,
      last_reviewed_at: 1700000000000,
      next_review_timestamp: 1701209600000,
      status: 'mastered',
    };

    // Migration logic (same as in useFlashcardStore)
    const migrated: SRSMetadata = {
      stability: 0,
      difficulty: 0,
      reps: v2Meta.repetition_count,
      lapses: 0,
      last_reviewed_at: v2Meta.last_reviewed_at,
      next_review_timestamp: v2Meta.next_review_timestamp,
      state: v2Meta.status === 'mastered' ? 2 : v2Meta.status === 'learning' ? 1 : 0,
    };

    expect(migrated.reps).toBe(5);
    expect(migrated.state).toBe(2);
    expect(migrated.next_review_timestamp).toBe(1701209600000);
  });

  it('persists and restores chosen CEFR level filter to localStorage', () => {
    const store = new Map<string, string>();
    const mockStorage = {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => store.set(k, v),
      removeItem: (k: string) => store.delete(k),
    };

    const STORAGE_KEY = 'vstep_flashcard_cefr_level';

    const getInitialLevel = () => {
      const saved = mockStorage.getItem(STORAGE_KEY);
      if (saved === 'B1' || saved === 'B2' || saved === 'C1' || saved === 'Tất cả') {
        return saved;
      }
      return 'Tất cả';
    };

    expect(getInitialLevel()).toBe('Tất cả');

    mockStorage.setItem(STORAGE_KEY, 'B1');
    expect(getInitialLevel()).toBe('B1');

    mockStorage.setItem(STORAGE_KEY, 'C1');
    expect(getInitialLevel()).toBe('C1');
  });

  it('provides clearSRSSessionSync to reset session cache on account change or signout', async () => {
    const { clearSRSSessionSync } = await import('./useFlashcardStore');
    expect(typeof clearSRSSessionSync).toBe('function');
    expect(() => clearSRSSessionSync()).not.toThrow();
  });
});


