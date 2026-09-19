import type { FlashcardItem } from '../../types/schemas';
import type { UserCardReviewRecord } from '../../services/supabase/srsSync';
import { VSTEP_CORPUS } from './corpus';
import {
  loadUserItem,
  saveUserItem,
  removeUserItem,
} from '../../services/storage/userStorage';

export function getTodayString(): string {
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

export function notifyDeckChanged(): void {
  deckListeners.forEach((listener) => listener());
}

export function addDeckListener(listener: () => void): () => void {
  deckListeners.add(listener);
  return () => {
    deckListeners.delete(listener);
  };
}

// Module-level set of user IDs who have completed cloud sync in this app session
const syncedSRSUserIds = new Set<string>();

export function hasUserSyncedInSession(userId: string): boolean {
  return syncedSRSUserIds.has(userId);
}

export function markUserSyncedInSession(userId: string): void {
  syncedSRSUserIds.add(userId);
}

export function clearSRSSessionSync(): void {
  syncedSRSUserIds.clear();
  cachedDeckUserId = null;
  cachedDeckCards = null;
  cachedReviewedToday = 0;
  cachedReviewedDate = null;
}

export function getCardsForUser(userId?: string): FlashcardItem[] {
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

export function getReviewedTodayForUser(userId?: string): number {
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

export function setDeckCache(userId: string | null | undefined, cards: FlashcardItem[], persist: boolean): void {
  cachedDeckUserId = userId ?? null;
  cachedDeckCards = cards;
  if (persist && userId) {
    saveUserItem(userId, 'flashcard_deck_v3', cards);
  }
}

export function setReviewedTodayCache(
  userId: string | null | undefined,
  count: number,
  today: string,
  persist: boolean
): void {
  cachedReviewedToday = count;
  cachedReviewedDate = today;
  if (persist && userId) {
    saveUserItem(userId, 'last_review_date_v3', today);
    saveUserItem(userId, 'reviewed_today_count_v3', count);
  }
}

export function resetDeckStorage(userId: string | undefined, today: string): void {
  if (userId) {
    removeUserItem(userId, 'flashcard_deck_v3');
    removeUserItem(userId, 'reviewed_today_count_v3');
    removeUserItem(userId, 'last_review_date_v3');
  }
  cachedDeckUserId = userId ?? null;
  cachedDeckCards = VSTEP_CORPUS;
  cachedReviewedToday = 0;
  cachedReviewedDate = today;
}

export function projectCloudReviewsOntoDeck(
  corpus: FlashcardItem[],
  cloudReviews: Record<string, UserCardReviewRecord>,
  localCached: FlashcardItem[]
): FlashcardItem[] {
  const localMetaMap = new Map(localCached.map((c) => [c.id, c.srs_metadata]));

  return corpus.map((seedCard) => {
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
}

export function syncCloudReviewsOntoUserDeck(
  userId: string,
  cloudReviews: Record<string, UserCardReviewRecord>
): FlashcardItem[] {
  const localCached = loadUserItem<FlashcardItem[] | null>(userId, 'flashcard_deck_v3', null) || [];
  const nextCards = projectCloudReviewsOntoDeck(VSTEP_CORPUS, cloudReviews, localCached);
  setDeckCache(userId, nextCards, true);
  return nextCards;
}

