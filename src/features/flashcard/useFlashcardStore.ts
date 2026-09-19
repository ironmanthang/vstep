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
  getTodayString,
  notifyDeckChanged,
  addDeckListener,
  hasUserSyncedInSession,
  markUserSyncedInSession,
  clearSRSSessionSync,
  getCardsForUser,
  getReviewedTodayForUser,
  setDeckCache,
  setReviewedTodayCache,
  resetDeckStorage,
  syncCloudReviewsOntoUserDeck,
} from './flashcardDeckStorage';

export { clearSRSSessionSync };

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
    return addDeckListener(handleUpdate);
  }, [userId]);

  // Adjust state during render when userId changes (official React pattern)
  const [prevUserId, setPrevUserId] = useState(userId);
  if (prevUserId !== userId) {
    setPrevUserId(userId);
    setCards(getCardsForUser(userId));
    setReviewedToday(getReviewedTodayForUser(userId));
  }

  const [selectedTopic, setSelectedTopicState] = useState<string>(() => {
    if (typeof localStorage === 'undefined') return 'Tất cả';
    const saved = localStorage.getItem('vstep_flashcard_selected_topic');
    if (saved && (saved === 'Tất cả' || VSTEP_CORPUS.some((c) => c.topic === saved))) {
      return saved;
    }
    return 'Tất cả';
  });

  const setSelectedTopic = useCallback((topic: string) => {
    setSelectedTopicState(topic);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('vstep_flashcard_selected_topic', topic);
    }
  }, []);

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

    if (hasUserSyncedInSession(userId)) {
      return;
    }

    markUserSyncedInSession(userId);
    let isMounted = true;
    const today = getTodayString();

    async function syncWithCloud() {
      if (!userId) return;
      setIsCloudSyncing(true);

      try {
        const [cloudReviews, cloudDailyCount] = await Promise.all([
          fetchUserCardReviews(userId),
          fetchUserDailyReviewCount(userId, today),
        ]);

        if (!isMounted) return;

        const nextCards = syncCloudReviewsOntoUserDeck(userId, cloudReviews);
        setCards(nextCards);

        if (cloudDailyCount > 0) {
          setReviewedTodayCache(userId, cloudDailyCount, today, false);
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
      setReviewedTodayCache(userId, next, today, Boolean(userId));
      if (userId) {
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

      const targetCard = cards.find((c) => c.id === cardId);
      if (!targetCard) {
        return { success: false, error: 'Không tìm thấy thẻ từ vựng' };
      }

      const { updatedCard } = reviewCard(targetCard, rating);

      setCards((prevCards) => {
        const next = prevCards.map((c) => (c.id === cardId ? updatedCard : c));
        setDeckCache(userId, next, Boolean(userId));
        return next;
      });
      notifyDeckChanged();

      incrementDailyCount();

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
    }

    resetDeckStorage(userId, today);

    setCards(VSTEP_CORPUS);
    setReviewedToday(0);
    setSelectedTopicState('Tất cả');
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('vstep_flashcard_selected_topic', 'Tất cả');
    }
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
