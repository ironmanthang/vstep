import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import type { FlashcardItem, SRSRating } from '../../types/schemas';
import { VSTEP_CORPUS } from './corpus';
import { getReviewQueue, reviewCard, getSRSDeckStats } from './srs';
import { useAuth } from '../../services/supabase/authStore';
import {
  fetchUserCardReviews,
  syncCardReviewToCloud,
  fetchUserDailyReviewCount,
  incrementUserDailyCountInCloud,
  resetUserDeckInCloud,
} from '../../services/supabase/srsSync';
import { recordStudyDateInStorage } from '../../services/user/userStore';
import { setBadge, clearBadge } from '../../services/notification/badgeService';
import { checkAndTriggerDueReminder } from '../../services/notification/srsReminderService';
import {
  loadUserItem,
  saveUserItem,
  removeUserItem,
} from '../../services/storage/userStorage';

function getTodayString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function useFlashcardStore() {
  const { user, isAuthenticated } = useAuth();
  const userId = user?.id;

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

  // Initialize cards: canonical VSTEP_CORPUS
  const [cards, setCards] = useState<FlashcardItem[]>(() => {
    if (userId) {
      const cached = loadUserItem<FlashcardItem[] | null>(userId, 'flashcard_deck_v3', null);
      if (cached && Array.isArray(cached) && cached.length > 0) {
        const reviewMap = new Map(cached.map((c) => [c.id, c.srs_metadata]));
        return VSTEP_CORPUS.map((seedCard) => {
          const savedMeta = reviewMap.get(seedCard.id);
          return savedMeta ? { ...seedCard, srs_metadata: savedMeta } : seedCard;
        });
      }
    }
    return VSTEP_CORPUS;
  });

  const [selectedTopic, setSelectedTopic] = useState<string>('Tất cả');
  const [selectedLevel, setSelectedLevel] = useState<'Tất cả' | 'B1' | 'B2' | 'C1'>('Tất cả');

  // Daily reviewed count
  const [reviewedToday, setReviewedToday] = useState<number>(() => {
    if (userId) {
      const today = getTodayString();
      const savedDate = loadUserItem<string | null>(userId, 'last_review_date_v3', null);
      if (savedDate === today) {
        return loadUserItem<number>(userId, 'reviewed_today_count_v3', 0);
      }
    }
    return 0;
  });

  // Track if cloud sync has been completed for current user
  const syncedUserIdRef = useRef<string | null>(null);

  // Synchronize with Supabase Cloud upon user sign-in or account switch
  useEffect(() => {
    if (!isAuthenticated || !userId) {
      syncedUserIdRef.current = null;
      return;
    }

    if (syncedUserIdRef.current === userId) {
      return;
    }

    syncedUserIdRef.current = userId;
    let isMounted = true;
    setIsCloudSyncing(true);

    const today = getTodayString();

    // Hydrate ground truth from Supabase Cloud
    async function syncWithCloud() {
      if (!userId) return;

      try {
        const [cloudReviews, cloudDailyCount] = await Promise.all([
          fetchUserCardReviews(userId),
          fetchUserDailyReviewCount(userId, today),
        ]);

        if (!isMounted) return;

        // Uniform projection flow: project cloud reviews directly onto VSTEP_CORPUS
        // If cloudReviews is empty (new account or reset deck), nextCards cleanly equals VSTEP_CORPUS
        const nextCards = VSTEP_CORPUS.map((seedCard) => {
          const cloudRecord = cloudReviews[seedCard.id];
          if (cloudRecord) {
            return {
              ...seedCard,
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
          return seedCard;
        });

        setCards(nextCards);
        saveUserItem(userId, 'flashcard_deck_v3', nextCards);

        if (cloudDailyCount > 0) {
          setReviewedToday((prev) => Math.max(prev, cloudDailyCount));
        }
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
  }, [isAuthenticated, userId]);

  // Track daily count
  const incrementDailyCount = useCallback(() => {
    const today = getTodayString();
    if (userId) {
      recordStudyDateInStorage(today, userId);
    }
    setReviewedToday((prev) => {
      const next = prev + 1;
      if (userId) {
        saveUserItem(userId, 'last_review_date_v3', today);
        saveUserItem(userId, 'reviewed_today_count_v3', next);
        incrementUserDailyCountInCloud(userId, today, next);
      }
      return next;
    });
  }, [userId]);

  // Filtered cards by topic and CEFR level
  const filteredCards = useMemo(() => {
    return cards.filter((c) => {
      const matchesTopic = selectedTopic === 'Tất cả' || c.topic === selectedTopic;
      const matchesLevel = selectedLevel === 'Tất cả' || c.level === selectedLevel;
      return matchesTopic && matchesLevel;
    });
  }, [cards, selectedTopic, selectedLevel]);

  // Review queue for the filtered topic (uncapped continuous learning)
  const reviewQueue = useMemo(() => {
    return getReviewQueue(filteredCards);
  }, [filteredCards]);

  // Total due cards across the entire deck (for app badging & notifications)
  const totalDueCount = useMemo(() => {
    return getReviewQueue(cards).length;
  }, [cards]);

  // Synchronize PWA App Badge with total due cards
  useEffect(() => {
    setBadge(totalDueCount);
  }, [totalDueCount]);

  // Periodic heartbeat for scheduled review reminders
  useEffect(() => {
    checkAndTriggerDueReminder(totalDueCount);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkAndTriggerDueReminder(totalDueCount);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    const intervalId = setInterval(() => {
      checkAndTriggerDueReminder(totalDueCount);
    }, 5 * 60 * 1000);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(intervalId);
    };
  }, [totalDueCount]);

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
  const submitReview = useCallback(
    async (
      cardId: string,
      rating: SRSRating
    ): Promise<{ success: boolean; error?: string; shouldRequeue?: boolean }> => {
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        return { success: false, error: 'Mất kết nối Internet' };
      }

      let updatedCard: FlashcardItem | null = null;
      let shouldRequeue = false;

      setCards((prevCards) => {
        const next = prevCards.map((c) => {
          if (c.id === cardId) {
            const result = reviewCard(c, rating);
            updatedCard = result.updatedCard;
            shouldRequeue = result.shouldRequeue;
            return result.updatedCard;
          }
          return c;
        });

        if (userId) {
          saveUserItem(userId, 'flashcard_deck_v3', next);
        }

        return next;
      });

      incrementDailyCount();

      if (userId && updatedCard) {
        const syncRes = await syncCardReviewToCloud(userId, updatedCard);
        if (!syncRes.success) {
          return syncRes;
        }
      }

      return { success: true, shouldRequeue };
    },
    [incrementDailyCount, userId]
  );

  // Action: Reset deck for user
  const resetDeck = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    const today = getTodayString();

    if (userId) {
      const cloudRes = await resetUserDeckInCloud(userId, today);
      if (!cloudRes.success) {
        return cloudRes;
      }
      removeUserItem(userId, 'flashcard_deck_v3');
      removeUserItem(userId, 'reviewed_today_count_v3');
      removeUserItem(userId, 'last_review_date_v3');
    }

    setCards(VSTEP_CORPUS);
    setReviewedToday(0);
    clearBadge();

    return { success: true };
  }, [userId]);

  return {
    cards,
    filteredCards,
    reviewQueue,
    totalDueCount,
    stats,
    topics,
    selectedTopic,
    setSelectedTopic,
    levels: ['Tất cả', 'B1', 'B2', 'C1'] as const,
    selectedLevel,
    setSelectedLevel,
    reviewedToday,
    isCloudSyncing,
    isOnline,
    submitReview,
    resetDeck,
  };
}
