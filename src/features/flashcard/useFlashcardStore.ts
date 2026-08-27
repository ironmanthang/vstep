import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import type { FlashcardItem, SRSRating } from '../../types/schemas';
import { INITIAL_FLASHCARD_SEED } from './seed-data';
import { getReviewQueue, reviewCard as applySRS, getSRSDeckStats } from './srs';
import { useAuth } from '../../services/supabase/authStore';
import {
  fetchUserCardReviews,
  syncCardReviewToCloud,
  fetchUserDailyReviewCount,
  incrementUserDailyCountInCloud
} from '../../services/supabase/srsSync';

const STORAGE_KEY = 'vstep_flashcard_deck_v2';
const REVIEW_COUNT_KEY = 'vstep_reviewed_today_count_v2';
const LAST_REVIEW_DATE_KEY = 'vstep_last_review_date_v2';

function getTodayString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function useFlashcardStore() {
  const { user, isAuthenticated } = useAuth();
  const [isCloudSyncing, setIsCloudSyncing] = useState<boolean>(false);

  // Initialize cards: combine seed with local storage if available
  const [cards, setCards] = useState<FlashcardItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // If stored cards count is smaller than current seed (e.g. old 15 vs 1500), merge reviews
          if (parsed.length < INITIAL_FLASHCARD_SEED.length) {
            const reviewMap = new Map(parsed.map((c: FlashcardItem) => [c.id, c.srs_metadata]));
            return INITIAL_FLASHCARD_SEED.map((seedCard) => {
              const savedMeta = reviewMap.get(seedCard.id);
              if (savedMeta) {
                return { ...seedCard, srs_metadata: savedMeta };
              }
              return seedCard;
            });
          }
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved flashcards, using default seed:', e);
    }
    return INITIAL_FLASHCARD_SEED;
  });

  const [selectedTopic, setSelectedTopic] = useState<string>('Tất cả');

  // Daily reviewed count
  const [reviewedToday, setReviewedToday] = useState<number>(() => {
    try {
      const today = getTodayString();
      const savedDate = localStorage.getItem(LAST_REVIEW_DATE_KEY);
      if (savedDate === today) {
        return parseInt(localStorage.getItem(REVIEW_COUNT_KEY) || '0', 10);
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
                    repetition_count: cloudRecord.repetition_count,
                    interval_days: cloudRecord.interval_days,
                    ease_factor: cloudRecord.ease_factor,
                    last_reviewed_at: cloudRecord.last_reviewed_at,
                    next_review_timestamp: cloudRecord.next_review_timestamp,
                    status: cloudRecord.status,
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

  // Filtered cards by topic
  const filteredCards = useMemo(() => {
    if (selectedTopic === 'Tất cả') return cards;
    return cards.filter((c) => c.topic === selectedTopic);
  }, [cards, selectedTopic]);

  // Review queue for the filtered topic
  const reviewQueue = useMemo(() => {
    return getReviewQueue(filteredCards);
  }, [filteredCards]);

  // Deck statistics
  const stats = useMemo(() => {
    return getSRSDeckStats(cards);
  }, [cards]);

  // Available topics
  const topics = useMemo(() => {
    const topicSet = new Set(cards.map((c) => c.topic));
    return ['Tất cả', ...Array.from(topicSet)];
  }, [cards]);

  // Action: Review a card
  const submitReview = useCallback((cardId: string, rating: SRSRating) => {
    let updatedCard: FlashcardItem | null = null;

    setCards((prevCards) => {
      return prevCards.map((c) => {
        if (c.id === cardId) {
          const reviewed = applySRS(c, rating);
          updatedCard = reviewed;
          return reviewed;
        }
        return c;
      });
    });

    incrementDailyCount();

    if (user?.id && updatedCard) {
      syncCardReviewToCloud(user.id, updatedCard);
    }
  }, [incrementDailyCount, user]);

  // Action: Reset deck for demo/practice
  const resetDeck = useCallback(() => {
    setCards(INITIAL_FLASHCARD_SEED);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    cards,
    filteredCards,
    reviewQueue,
    stats,
    topics,
    selectedTopic,
    setSelectedTopic,
    reviewedToday,
    isCloudSyncing,
    submitReview,
    resetDeck,
  };
}
