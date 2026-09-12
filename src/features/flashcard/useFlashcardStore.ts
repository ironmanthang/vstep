import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import type { FlashcardItem, SRSRating, SRSMetadata } from '../../types/schemas';
import { VSTEP_CORPUS } from './corpus';
import { getReviewQueue, reviewCard, getSRSDeckStats, NEW_CARDS_PER_DAY } from './srs';
import { useAuth } from '../../services/supabase/authStore';
import {
  fetchUserCardReviews,
  syncCardReviewToCloud,
  fetchUserDailyReviewCount,
  incrementUserDailyCountInCloud,
  resetUserDeckInCloud
} from '../../services/supabase/srsSync';
import { recordStudyDateInStorage } from '../../services/user/userStore';

const STORAGE_KEY = 'vstep_flashcard_deck_v3';
const REVIEW_COUNT_KEY = 'vstep_reviewed_today_count_v3';
const LAST_REVIEW_DATE_KEY = 'vstep_last_review_date_v3';
const NEW_CARDS_TODAY_KEY = 'vstep_new_cards_today_v3';

function getTodayString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Migrate old v2 SRS metadata (repetition_count/interval_days/ease_factor/status)
 * to new v3 FSRS format (stability/difficulty/reps/lapses/state).
 * Returns null if already in v3 format or not a valid v2 record.
 */
function migrateV2Metadata(meta: Record<string, unknown>): SRSMetadata | null {
  if (typeof meta.stability === 'number') return null; // Already v3
  if (typeof meta.repetition_count !== 'number') return null;

  const status = meta.status as string;
  const repCount = meta.repetition_count as number;

  // Map old status to FSRS state
  let state: 0 | 1 | 2 | 3 = 0;
  if (status === 'new') state = 0;
  else if (status === 'learning') state = 1;
  else if (status === 'mastered') state = 2;

  return {
    stability: 0,
    difficulty: 0,
    reps: repCount,
    lapses: 0,
    last_reviewed_at: (meta.last_reviewed_at as number | null) ?? null,
    next_review_timestamp: (meta.next_review_timestamp as number) ?? 0,
    state,
  };
}

export function useFlashcardStore() {
  const { user, isAuthenticated } = useAuth();
  const [isCloudSyncing, setIsCloudSyncing] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });

  // Track network connectivity changes
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Initialize cards: canonical VSTEP_CORPUS combined with saved SRS metadata
  const [cards, setCards] = useState<FlashcardItem[]>(() => {
    try {
      // Try v3 first, then fall back to v2 with migration
      const saved = localStorage.getItem(STORAGE_KEY)
        || localStorage.getItem('vstep_flashcard_deck_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const reviewMap = new Map<string, SRSMetadata>();
          parsed
            .filter((c): c is FlashcardItem => Boolean(c && c.id && c.srs_metadata))
            .forEach((c: FlashcardItem) => {
              // Attempt migration from v2 format
              const migrated = migrateV2Metadata(c.srs_metadata as unknown as Record<string, unknown>);
              reviewMap.set(c.id, migrated ?? c.srs_metadata);
            });

          return VSTEP_CORPUS.map((seedCard) => {
            const savedMeta = reviewMap.get(seedCard.id);
            if (savedMeta) {
              return { ...seedCard, srs_metadata: savedMeta };
            }
            return seedCard;
          });
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved flashcards, using default seed:', e);
    }
    return VSTEP_CORPUS;
  });

  const [selectedTopic, setSelectedTopic] = useState<string>('Tất cả');

  // Daily reviewed count
  const [reviewedToday, setReviewedToday] = useState<number>(() => {
    try {
      const today = getTodayString();
      const savedDate = localStorage.getItem(LAST_REVIEW_DATE_KEY)
        || localStorage.getItem('vstep_last_review_date_v2');
      if (savedDate === today) {
        return parseInt(
          localStorage.getItem(REVIEW_COUNT_KEY)
          || localStorage.getItem('vstep_reviewed_today_count_v2')
          || '0',
          10
        );
      }
    } catch {
      // fallback
    }
    return 0;
  });

  // Track new cards introduced today
  const [newCardsToday, setNewCardsToday] = useState<number>(() => {
    try {
      const today = getTodayString();
      const savedDate = localStorage.getItem(LAST_REVIEW_DATE_KEY);
      if (savedDate === today) {
        return parseInt(localStorage.getItem(NEW_CARDS_TODAY_KEY) || '0', 10);
      }
    } catch {
      // fallback
    }
    return 0;
  });

  // Track if initial cloud sync has been completed for current user
  const syncedUserIdRef = useRef<string | null>(null);

  // Synchronize with Supabase Cloud upon user sign-in
  useEffect(() => {
    if (!isAuthenticated || !user?.id) {
      syncedUserIdRef.current = null;
      return;
    }

    if (syncedUserIdRef.current === user.id) {
      return;
    }

    let isMounted = true;
    setIsCloudSyncing(true);

    async function syncWithCloud() {
      if (!user) return;
      const today = getTodayString();

      try {
        const [cloudReviews, cloudDailyCount] = await Promise.all([
          fetchUserCardReviews(user.id),
          fetchUserDailyReviewCount(user.id, today)
        ]);

        if (!isMounted) return;

        if (cloudReviews && Object.keys(cloudReviews).length > 0) {
          setCards((prevCards) => {
            return prevCards.map((card) => {
              const cloudRecord = cloudReviews[card.id];
              if (cloudRecord) {
                return {
                  ...card,
                  srs_metadata: {
                    stability: cloudRecord.stability ?? 0,
                    difficulty: cloudRecord.difficulty ?? 0,
                    reps: cloudRecord.reps ?? cloudRecord.repetition_count ?? 0,
                    lapses: cloudRecord.lapses ?? 0,
                    last_reviewed_at: cloudRecord.last_reviewed_at,
                    next_review_timestamp: cloudRecord.next_review_timestamp,
                    state: cloudRecord.state ?? 0,
                  },
                };
              }
              return card;
            });
          });
        }

        if (cloudDailyCount > 0) {
          setReviewedToday((prev) => Math.max(prev, cloudDailyCount));
        }

        syncedUserIdRef.current = user.id;
      } catch (err) {
        console.error('Failed to sync flashcard progress with cloud:', err);
      } finally {
        if (isMounted) {
          setIsCloudSyncing(false);
        }
      }
    }

    syncWithCloud();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, user]);

  // Save cards to localStorage on state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    } catch (e) {
      console.error('Failed to save flashcards to localStorage:', e);
    }
  }, [cards]);

  // Track daily count
  const incrementDailyCount = useCallback(() => {
    const today = getTodayString();
    recordStudyDateInStorage(today);
    setReviewedToday((prev) => {
      const next = prev + 1;
      localStorage.setItem(LAST_REVIEW_DATE_KEY, today);
      localStorage.setItem(REVIEW_COUNT_KEY, next.toString());
      if (user?.id) {
        incrementUserDailyCountInCloud(user.id, today, next);
      }
      return next;
    });
  }, [user]);

  // Track new cards introduced
  const incrementNewCardCount = useCallback(() => {
    setNewCardsToday((prev) => {
      const next = prev + 1;
      localStorage.setItem(NEW_CARDS_TODAY_KEY, next.toString());
      return next;
    });
  }, []);

  // Filtered cards by topic
  const filteredCards = useMemo(() => {
    if (selectedTopic === 'Tất cả') return cards;
    return cards.filter((c) => c.topic === selectedTopic);
  }, [cards, selectedTopic]);

  // Review queue for the filtered topic (with daily new card cap)
  const newCardsRemaining = Math.max(0, NEW_CARDS_PER_DAY - newCardsToday);
  const reviewQueue = useMemo(() => {
    return getReviewQueue(filteredCards, undefined, newCardsRemaining);
  }, [filteredCards, newCardsRemaining]);

  // Deck statistics
  const stats = useMemo(() => {
    return getSRSDeckStats(cards);
  }, [cards]);

  // Available topics
  const topics = useMemo(() => {
    const topicSet = new Set(cards.map((c) => c.topic));
    return ['Tất cả', ...Array.from(topicSet)];
  }, [cards]);

  // Action: Review a card with binary rating + same-session re-queue
  const submitReview = useCallback(async (cardId: string, rating: SRSRating): Promise<{ success: boolean; error?: string; shouldRequeue?: boolean }> => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      return { success: false, error: 'Mất kết nối Internet' };
    }

    let updatedCard: FlashcardItem | null = null;
    let shouldRequeue = false;

    // Check if this is a new card being reviewed for the first time
    const targetCard = cards.find(c => c.id === cardId);
    const isNewCard = targetCard?.srs_metadata.state === 0 && targetCard?.srs_metadata.reps === 0;

    setCards((prevCards) => {
      return prevCards.map((c) => {
        if (c.id === cardId) {
          const result = reviewCard(c, rating);
          updatedCard = result.updatedCard;
          shouldRequeue = result.shouldRequeue;
          return result.updatedCard;
        }
        return c;
      });
    });

    // Track new card introduction
    if (isNewCard) {
      incrementNewCardCount();
    }

    incrementDailyCount();

    if (user?.id && updatedCard) {
      const syncRes = await syncCardReviewToCloud(user.id, updatedCard);
      if (!syncRes.success) {
        return syncRes;
      }
    }

    return { success: true, shouldRequeue };
  }, [incrementDailyCount, incrementNewCardCount, user, cards]);

  // Action: Reset deck for user
  const resetDeck = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    const today = getTodayString();

    if (user?.id) {
      const cloudRes = await resetUserDeckInCloud(user.id, today);
      if (!cloudRes.success) {
        return cloudRes;
      }
    }

    setCards(VSTEP_CORPUS);
    setReviewedToday(0);
    setNewCardsToday(0);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(REVIEW_COUNT_KEY);
      localStorage.removeItem(LAST_REVIEW_DATE_KEY);
      localStorage.removeItem(NEW_CARDS_TODAY_KEY);
      // Clean up old v2 keys
      localStorage.removeItem('vstep_flashcard_deck_v2');
      localStorage.removeItem('vstep_reviewed_today_count_v2');
      localStorage.removeItem('vstep_last_review_date_v2');
    } catch {
      // Ignore local storage error
    }

    return { success: true };
  }, [user]);

  return {
    cards,
    filteredCards,
    reviewQueue,
    stats,
    topics,
    selectedTopic,
    setSelectedTopic,
    reviewedToday,
    newCardsToday,
    isCloudSyncing,
    isOnline,
    submitReview,
    resetDeck,
  };
}
