import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import type { FlashcardItem, SRSRating } from '../../types/schemas';
import { VSTEP_CORPUS } from './corpus';
import { getReviewQueue, reviewCard as applySRS, getSRSDeckStats } from './srs';
import { useAuth } from '../../services/supabase/authStore';
import {
  fetchUserCardReviews,
  syncCardReviewToCloud,
  fetchUserDailyReviewCount,
  incrementUserDailyCountInCloud,
  resetUserDeckInCloud
} from '../../services/supabase/srsSync';
import { recordStudyDateInStorage } from '../../services/user/userStore';

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
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const reviewMap = new Map(
            parsed
              .filter((c): c is FlashcardItem => Boolean(c && c.id && c.srs_metadata))
              .map((c: FlashcardItem) => [c.id, c.srs_metadata])
          );

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
  const submitReview = useCallback(async (cardId: string, rating: SRSRating): Promise<{ success: boolean; error?: string }> => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      return { success: false, error: 'Mất kết nối Internet' };
    }

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
      const syncRes = await syncCardReviewToCloud(user.id, updatedCard);
      if (!syncRes.success) {
        return syncRes;
      }
    }

    return { success: true };
  }, [incrementDailyCount, user]);

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
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(REVIEW_COUNT_KEY);
      localStorage.removeItem(LAST_REVIEW_DATE_KEY);
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
    isCloudSyncing,
    isOnline,
    submitReview,
    resetDeck,
  };
}
