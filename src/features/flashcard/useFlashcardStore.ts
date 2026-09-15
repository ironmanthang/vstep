import { useState, useEffect, useMemo, useCallback } from 'react';
import type { FlashcardItem, SRSRating } from '../../types/schemas';
import { VSTEP_CORPUS } from './corpus';
import { getReviewQueue, reviewCard, getSRSDeckStats, getDueReviewCount } from './srs';
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

// Module-level memory cache for the active user's deck to eliminate re-parsing and duplicate state
let cachedDeckUserId: string | null = null;
let cachedDeckCards: FlashcardItem[] | null = null;
let cachedReviewedToday = 0;
let cachedReviewedDate: string | null = null;
const deckListeners = new Set<() => void>();

function notifyDeckChanged(): void {
  deckListeners.forEach((listener) => listener());
}

// Module-level set of user IDs who have completed cloud sync in this app session
const syncedSRSUserIds = new Set<string>();

export function clearSRSSessionSync(): void {
  syncedSRSUserIds.clear();
  cachedDeckUserId = null;
  cachedDeckCards = null;
  cachedReviewedToday = 0;
  cachedReviewedDate = null;
}

function getCardsForUser(userId?: string): FlashcardItem[] {
  if (!userId) {
    return VSTEP_CORPUS;
  }
  if (cachedDeckUserId === userId && cachedDeckCards) {
    return cachedDeckCards;
  }
  const cached = loadUserItem<FlashcardItem[] | null>(userId, 'flashcard_deck_v3', null);
  if (cached && Array.isArray(cached) && cached.length > 0) {
    const reviewMap = new Map(cached.map((c) => [c.id, c.srs_metadata]));
    const hydrated = VSTEP_CORPUS.map((seedCard) => {
      const savedMeta = reviewMap.get(seedCard.id);
      return savedMeta ? { ...seedCard, srs_metadata: savedMeta } : seedCard;
    });
    cachedDeckUserId = userId;
    cachedDeckCards = hydrated;
    return hydrated;
  }
  cachedDeckUserId = userId;
  cachedDeckCards = VSTEP_CORPUS;
  return VSTEP_CORPUS;
}

function getReviewedTodayForUser(userId?: string): number {
  if (!userId) {
    return 0;
  }
  const today = getTodayString();
  if (cachedDeckUserId === userId && cachedReviewedDate === today) {
    return cachedReviewedToday;
  }
  const savedDate = loadUserItem<string | null>(userId, 'last_review_date_v3', null);
  if (savedDate === today) {
    const count = loadUserItem<number>(userId, 'reviewed_today_count_v3', 0);
    cachedReviewedToday = count;
    cachedReviewedDate = today;
    return count;
  }
  cachedReviewedToday = 0;
  cachedReviewedDate = today;
  return 0;
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

  // Initialize cards synchronously from memory cache or local user storage
  const [cards, setCards] = useState<FlashcardItem[]>(() => getCardsForUser(userId));
  const [reviewedToday, setReviewedToday] = useState<number>(() => getReviewedTodayForUser(userId));

  // Cross-component synchronizer (e.g. HomePage <-> FlashcardPage)
  useEffect(() => {
    const handleUpdate = () => {
      setCards(getCardsForUser(userId));
      setReviewedToday(getReviewedTodayForUser(userId));
    };
    deckListeners.add(handleUpdate);
    return () => {
      deckListeners.delete(handleUpdate);
    };
  }, [userId]);

  // Adjust state during render when userId changes (official React pattern)
  const [prevUserId, setPrevUserId] = useState(userId);
  if (prevUserId !== userId) {
    setPrevUserId(userId);
    setCards(getCardsForUser(userId));
    setReviewedToday(getReviewedTodayForUser(userId));
  }

  const [selectedTopic, setSelectedTopic] = useState<string>('Tất cả');
  const [selectedLevel, setSelectedLevelState] = useState<'Tất cả' | 'B1' | 'B2' | 'C1'>(() => {
    const saved = localStorage.getItem('vstep_flashcard_cefr_level');
    if (saved === 'B1' || saved === 'B2' || saved === 'C1' || saved === 'Tất cả') {
      return saved;
    }
    return 'Tất cả';
  });

  const setSelectedLevel = useCallback((level: 'Tất cả' | 'B1' | 'B2' | 'C1') => {
    setSelectedLevelState(level);
    localStorage.setItem('vstep_flashcard_cefr_level', level);
  }, []);

  // Synchronize with Supabase Cloud ONCE per user session (app boot or user account switch)
  useEffect(() => {
    if (!isAuthenticated || !userId) {
      return;
    }

    if (syncedSRSUserIds.has(userId)) {
      return;
    }

    syncedSRSUserIds.add(userId);
    let isMounted = true;

    const today = getTodayString();

    // Hydrate ground truth from Supabase Cloud in background
    async function syncWithCloud() {
      if (!userId) return;
      setIsCloudSyncing(true);

      try {
        const [cloudReviews, cloudDailyCount] = await Promise.all([
          fetchUserCardReviews(userId),
          fetchUserDailyReviewCount(userId, today),
        ]);

        if (!isMounted) return;

        // Existing local cache for this user (if any)
        const localCached = loadUserItem<FlashcardItem[] | null>(userId, 'flashcard_deck_v3', null) || [];
        const localMetaMap = new Map(localCached.map((c) => [c.id, c.srs_metadata]));

        // Uniform projection flow: merge cloud reviews and local cached reviews onto VSTEP_CORPUS
        const nextCards = VSTEP_CORPUS.map((seedCard) => {
          const cloudRecord = cloudReviews[seedCard.id];
          const localMeta = localMetaMap.get(seedCard.id);

          // If both exist, pick whichever review is more recent / has higher reps
          if (cloudRecord && localMeta && localMeta.reps > 0) {
            const cloudTimestamp = cloudRecord.last_reviewed_at ? Number(cloudRecord.last_reviewed_at) : 0;
            const localTimestamp = localMeta.last_reviewed_at || 0;
            if (localTimestamp > cloudTimestamp || localMeta.reps > (cloudRecord.reps ?? 0)) {
              return { ...seedCard, srs_metadata: localMeta };
            }
          }

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

          if (localMeta && localMeta.reps > 0) {
            return { ...seedCard, srs_metadata: localMeta };
          }

          return seedCard;
        });

        cachedDeckUserId = userId;
        cachedDeckCards = nextCards;
        setCards(nextCards);
        saveUserItem(userId, 'flashcard_deck_v3', nextCards);

        if (cloudDailyCount > 0) {
          cachedReviewedToday = Math.max(cachedReviewedToday, cloudDailyCount);
          cachedReviewedDate = today;
          setReviewedToday((prev) => Math.max(prev, cloudDailyCount));
        }
        notifyDeckChanged();
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
      cachedReviewedToday = next;
      cachedReviewedDate = today;
      if (userId) {
        saveUserItem(userId, 'last_review_date_v3', today);
        saveUserItem(userId, 'reviewed_today_count_v3', next);
        incrementUserDailyCountInCloud(userId, today, next);
      }
      notifyDeckChanged();
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

  // Total due review cards across the entire deck (for app badging & notifications)
  const totalDueCount = useMemo(() => {
    return getDueReviewCount(cards);
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

  // Action: Review a card with binary rating
  const submitReview = useCallback(
    async (
      cardId: string,
      rating: SRSRating
    ): Promise<{ success: boolean; error?: string }> => {
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        return { success: false, error: 'Mất kết nối Internet' };
      }

      // 1. Synchronously find the target card and calculate review transition
      const targetCard = cards.find((c) => c.id === cardId);
      if (!targetCard) {
        return { success: false, error: 'Không tìm thấy thẻ từ vựng' };
      }

      const { updatedCard } = reviewCard(targetCard, rating);

      // 2. Immediately update React state & local storage & module cache
      setCards((prevCards) => {
        const next = prevCards.map((c) => (c.id === cardId ? updatedCard : c));
        cachedDeckUserId = userId ?? null;
        cachedDeckCards = next;
        if (userId) {
          saveUserItem(userId, 'flashcard_deck_v3', next);
        }
        return next;
      });
      notifyDeckChanged();

      // 3. Increment daily review count
      incrementDailyCount();

      // 4. Directly sync updated card review to Supabase Cloud
      if (userId) {
        const syncRes = await syncCardReviewToCloud(userId, updatedCard);
        if (!syncRes.success) {
          console.warn('Failed to sync card review to cloud:', syncRes.error);
        }
      }

      return { success: true };
    },
    [cards, incrementDailyCount, userId]
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

    cachedDeckUserId = userId ?? null;
    cachedDeckCards = VSTEP_CORPUS;
    cachedReviewedToday = 0;
    cachedReviewedDate = today;

    setCards(VSTEP_CORPUS);
    setReviewedToday(0);
    clearBadge();
    notifyDeckChanged();

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
