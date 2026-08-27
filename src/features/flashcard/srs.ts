import type { FlashcardItem, SRSRating } from '../../types/schemas';

const ONE_DAY_MS = 86400000; // 24 * 60 * 60 * 1000

/**
 * Filter and prioritize cards due for review today.
 * Priority order:
 * 1. Overdue cards (oldest next_review_timestamp first)
 * 2. Unreviewed 'new' cards (never reviewed)
 */
export function getReviewQueue(cards: FlashcardItem[], now: number = Date.now()): FlashcardItem[] {
  return cards
    .filter(card => card.srs_metadata.next_review_timestamp <= now)
    .sort((a, b) => {
      // New cards first if timestamp is 0, else sort by oldest due timestamp
      if (a.srs_metadata.status === 'new' && b.srs_metadata.status !== 'new') return -1;
      if (b.srs_metadata.status === 'new' && a.srs_metadata.status !== 'new') return 1;
      return a.srs_metadata.next_review_timestamp - b.srs_metadata.next_review_timestamp;
    });
}

/**
 * Pure Spaced Repetition (SRS) State Transition.
 * Standard interval progression:
 * - 'forgot' (Quên): Reset interval to 1 day, decrease ease factor.
 * - 'remembered' (Nhớ): Multiply interval by ease factor (~2.5), step: 1 -> 3 -> 7 -> 14 -> 30 days.
 * - 'easy' (Rất dễ): Multiply interval by ease factor * 1.3, increase ease factor, step to longer intervals.
 */
export function reviewCard(
  card: FlashcardItem,
  rating: SRSRating,
  now: number = Date.now()
): FlashcardItem {
  const meta = card.srs_metadata;
  let newIntervalDays: number;
  let newEaseFactor = meta.ease_factor;
  let newRepetitionCount = meta.repetition_count;
  let newStatus: 'new' | 'learning' | 'mastered' = meta.status;

  if (rating === 'forgot') {
    // Reset back to 1 day interval
    newIntervalDays = 1;
    newEaseFactor = Math.max(1.3, Number((meta.ease_factor - 0.2).toFixed(2)));
    newStatus = 'learning';
    // repetition_count stays or increments to track attempts
    newRepetitionCount += 1;
  } else if (rating === 'remembered') {
    newRepetitionCount += 1;
    if (meta.interval_days === 0 || meta.status === 'new') {
      newIntervalDays = 1;
    } else if (meta.interval_days === 1) {
      newIntervalDays = 3;
    } else if (meta.interval_days === 3) {
      newIntervalDays = 7;
    } else if (meta.interval_days <= 7) {
      newIntervalDays = 14;
    } else {
      newIntervalDays = Math.min(30, Math.round(meta.interval_days * meta.ease_factor));
    }

    newStatus = newRepetitionCount >= 4 || newIntervalDays >= 14 ? 'mastered' : 'learning';
  } else {
    // 'easy' rating - faster graduation
    newRepetitionCount += 1;
    newEaseFactor = Math.min(3.0, Number((meta.ease_factor + 0.15).toFixed(2)));

    if (meta.interval_days === 0 || meta.status === 'new') {
      newIntervalDays = 3;
    } else if (meta.interval_days <= 1) {
      newIntervalDays = 7;
    } else if (meta.interval_days <= 3) {
      newIntervalDays = 14;
    } else {
      newIntervalDays = 30;
    }

    newStatus = newRepetitionCount >= 2 || newIntervalDays >= 14 ? 'mastered' : 'learning';
  }

  const nextTimestamp = now + newIntervalDays * ONE_DAY_MS;

  return {
    ...card,
    srs_metadata: {
      repetition_count: newRepetitionCount,
      interval_days: newIntervalDays,
      ease_factor: newEaseFactor,
      last_reviewed_at: now,
      next_review_timestamp: nextTimestamp,
      status: newStatus,
    },
  };
}

/**
 * Aggregates statistics for the user's deck.
 */
export function getSRSDeckStats(cards: FlashcardItem[]) {
  const total = cards.length;
  const mastered = cards.filter(c => c.srs_metadata.status === 'mastered').length;
  const learning = cards.filter(c => c.srs_metadata.status === 'learning').length;
  const newCards = cards.filter(c => c.srs_metadata.status === 'new').length;

  return {
    total,
    mastered,
    learning,
    newCards,
    masteryPercentage: total > 0 ? Math.round((mastered / total) * 100) : 0,
  };
}
