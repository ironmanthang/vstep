import type { FlashcardItem, SRSRating, SRSMetadata } from '../../types/schemas';
import { DEFAULT_SRS_METADATA } from '../../types/schemas';
import {
  fsrs,
  createEmptyCard,
  Rating,
  State,
  type Card,
  type FSRS,
  type Grade,
} from 'ts-fsrs';

// ─── FSRS Scheduler Instance ───────────────────────────────────────────────
const scheduler: FSRS = fsrs({
  request_retention: 0.90,   // 90% target recall probability
  maximum_interval: 365,     // 1 year max interval
  enable_fuzz: true,         // ±5% interval randomization to prevent clustering
  enable_short_term: false,  // Clean daily spaced repetition without in-session 10m limbo
});

// ─── Conversion Helpers ────────────────────────────────────────────────────

/** Convert our stored SRSMetadata → ts-fsrs Card object */
function metadataToCard(meta: SRSMetadata): Card {
  if (meta.state === 0 && meta.reps === 0) {
    return createEmptyCard();
  }

  return {
    due: new Date(meta.next_review_timestamp),
    stability: meta.stability,
    difficulty: meta.difficulty,
    elapsed_days: 0, // Recalculated by ts-fsrs on review
    scheduled_days: 0,
    learning_steps: 0,
    reps: meta.reps,
    lapses: meta.lapses,
    state: meta.state as State,
    last_review: meta.last_reviewed_at ? new Date(meta.last_reviewed_at) : undefined,
  };
}

/** Convert ts-fsrs Card → our stored SRSMetadata */
function cardToMetadata(card: Card): SRSMetadata {
  return {
    stability: card.stability,
    difficulty: card.difficulty,
    reps: card.reps,
    lapses: card.lapses,
    last_reviewed_at: card.last_review ? card.last_review.getTime() : null,
    next_review_timestamp: card.due.getTime(),
    state: card.state as 0 | 1 | 2 | 3,
  };
}

/** Map our binary rating to ts-fsrs Rating enum */
function ratingToFSRS(rating: SRSRating): Grade {
  return (rating === 'correct' ? Rating.Good : Rating.Again) as Grade;
}

// ─── Core SRS Functions ────────────────────────────────────────────────────

/**
 * Build the review queue with correct priority ordering:
 *  1. Due review cards (previously learned, overdue, sorted by most overdue first)
 *  2. New cards (never seen, uncapped for continuous learning)
 */
export function getReviewQueue(
  cards: FlashcardItem[],
  now?: number,
): FlashcardItem[] {
  const currentTime = now ?? Date.now();
  const dueReviews: FlashcardItem[] = [];
  const newCards: FlashcardItem[] = [];

  for (const card of cards) {
    const meta = card.srs_metadata;

    if (meta.state === State.New && meta.reps === 0) {
      newCards.push(card);
    } else if (meta.next_review_timestamp <= currentTime) {
      dueReviews.push(card);
    }
  }

  // Sort due reviews: most overdue first (lowest next_review_timestamp)
  dueReviews.sort(
    (a, b) => a.srs_metadata.next_review_timestamp - b.srs_metadata.next_review_timestamp
  );

  return [...dueReviews, ...newCards];
}

/**
 * Count how many cards are genuinely due for review (excluding unreviewed new cards).
 */
export function getDueReviewCount(
  cards: FlashcardItem[],
  now?: number,
): number {
  const currentTime = now ?? Date.now();
  return cards.filter(
    (c) => c.srs_metadata.reps > 0 && c.srs_metadata.next_review_timestamp <= currentTime
  ).length;
}

/**
 * Pure Spaced Repetition state transition using FSRS v6.
 * Binary input: 'correct' → Rating.Good, 'wrong' → Rating.Again
 *
 * Returns updated FlashcardItem with deterministic daily interval.
 */
export function reviewCard(
  card: FlashcardItem,
  rating: SRSRating,
  now: number = Date.now(),
): { updatedCard: FlashcardItem } {
  const fsrsCard = metadataToCard(card.srs_metadata);
  const fsrsRating = ratingToFSRS(rating);
  const reviewDate = new Date(now);

  const result = scheduler.next(fsrsCard, reviewDate, fsrsRating);
  const newMeta = cardToMetadata(result.card);

  const updatedCard: FlashcardItem = {
    ...card,
    srs_metadata: newMeta,
  };

  return { updatedCard };
}

/**
 * Compute the next interval preview (in days) for display on the rating buttons.
 */
export function getNextIntervalPreview(card: FlashcardItem, rating: SRSRating = 'correct'): number {
  if (rating === 'wrong') {
    return 1;
  }
  const fsrsCard = metadataToCard(card.srs_metadata);
  const preview = scheduler.repeat(fsrsCard, new Date());
  const goodCard = preview[Rating.Good].card;
  const intervalMs = goodCard.due.getTime() - Date.now();
  return Math.max(1, Math.round(intervalMs / 86400000));
}

/**
 * Format interval as human-readable Vietnamese string.
 */
export function formatInterval(days: number): string {
  if (days < 1) return '1 ngày';
  if (days === 1) return '1 ngày';
  if (days < 30) return `${days} ngày`;
  if (days < 365) {
    const months = Math.round(days / 30);
    return months === 1 ? '1 tháng' : `${months} tháng`;
  }
  return '1 năm';
}

/**
 * Aggregates statistics for the user's deck.
 * Invariant: total === mastered + learning + newCards
 */
export function getSRSDeckStats(cards: FlashcardItem[]) {
  const total = cards.length;
  const mastered = cards.filter(
    (c) => c.srs_metadata.state === State.Review && c.srs_metadata.reps >= 3
  ).length;
  const learning = cards.filter(
    (c) =>
      c.srs_metadata.reps > 0 &&
      !(c.srs_metadata.state === State.Review && c.srs_metadata.reps >= 3)
  ).length;
  const newCards = cards.filter(
    (c) => c.srs_metadata.state === State.New && c.srs_metadata.reps === 0
  ).length;
  const leeches = cards.filter((c) => c.srs_metadata.lapses >= 8).length;

  return {
    total,
    mastered,
    learning,
    newCards,
    leeches,
    masteryPercentage: total > 0 ? Math.round((mastered / total) * 100) : 0,
  };
}

export { DEFAULT_SRS_METADATA };
