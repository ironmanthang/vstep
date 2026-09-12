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
  enable_short_term: true,   // Enable learning steps for failed cards
  learning_steps: ['10m'],   // Re-show failed card after 10 minutes (in-session)
  relearning_steps: ['10m'], // Same for lapsed mature cards
});

const NEW_CARDS_PER_DAY = 20;

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
 *  1. Re-learning cards (answered wrong in session, re-queued)
 *  2. Due review cards (overdue, sorted by most overdue first)
 *  3. New cards (never seen, uncapped by default for continuous learning)
 */
export function getReviewQueue(
  cards: FlashcardItem[],
  now?: number,
  newCardsRemaining?: number,
): FlashcardItem[] {
  const currentTime = now ?? Date.now();
  const relearning: FlashcardItem[] = [];
  const dueReviews: FlashcardItem[] = [];
  const newCards: FlashcardItem[] = [];

  for (const card of cards) {
    const meta = card.srs_metadata;

    if (meta.state === State.New && meta.reps === 0) {
      // Never reviewed — new card
      newCards.push(card);
    } else if (meta.next_review_timestamp <= currentTime) {
      // Due for review
      if (meta.state === State.Relearning || meta.state === State.Learning) {
        relearning.push(card);
      } else {
        dueReviews.push(card);
      }
    }
    // else: not due yet, skip
  }

  // Sort due reviews: most overdue first (lowest next_review_timestamp)
  dueReviews.sort((a, b) =>
    a.srs_metadata.next_review_timestamp - b.srs_metadata.next_review_timestamp
  );

  // Sort relearning: oldest failure first
  relearning.sort((a, b) =>
    a.srs_metadata.next_review_timestamp - b.srs_metadata.next_review_timestamp
  );

  // If newCardsRemaining is specified, cap new cards; otherwise serve all new cards uncapped
  const eligibleNewCards = typeof newCardsRemaining === 'number'
    ? newCards.slice(0, Math.max(0, newCardsRemaining))
    : newCards;

  return [...relearning, ...dueReviews, ...eligibleNewCards];
}

/**
 * Pure Spaced Repetition state transition using FSRS v6.
 * Binary input: 'correct' → Rating.Good, 'wrong' → Rating.Again
 *
 * Returns updated FlashcardItem + a flag indicating if the card
 * should be re-queued in the current session (wrong → re-learn).
 */
export function reviewCard(
  card: FlashcardItem,
  rating: SRSRating,
  now: number = Date.now(),
): { updatedCard: FlashcardItem; shouldRequeue: boolean } {
  const fsrsCard = metadataToCard(card.srs_metadata);
  const fsrsRating = ratingToFSRS(rating);
  const reviewDate = new Date(now);

  const result = scheduler.next(fsrsCard, reviewDate, fsrsRating);
  const newMeta = cardToMetadata(result.card);

  const updatedCard: FlashcardItem = {
    ...card,
    srs_metadata: newMeta,
  };

  // Re-queue in current session if the card entered Learning or Relearning state
  const shouldRequeue = rating === 'wrong' && (
    newMeta.state === State.Learning ||
    newMeta.state === State.Relearning
  );

  return { updatedCard, shouldRequeue };
}

/**
 * Compute the next interval preview (in days) for display on the Correct button.
 */
export function getNextIntervalPreview(card: FlashcardItem): number {
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
  if (days < 1) return 'Ôn lại ngay';
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
 */
export function getSRSDeckStats(cards: FlashcardItem[]) {
  const total = cards.length;
  const mastered = cards.filter(c => c.srs_metadata.state === State.Review && c.srs_metadata.reps >= 3).length;
  const learning = cards.filter(c =>
    c.srs_metadata.state === State.Learning ||
    c.srs_metadata.state === State.Relearning ||
    (c.srs_metadata.state === State.Review && c.srs_metadata.reps < 3)
  ).length;
  const newCards = cards.filter(c => c.srs_metadata.state === State.New && c.srs_metadata.reps === 0).length;
  const leeches = cards.filter(c => c.srs_metadata.lapses >= 8).length;

  return {
    total,
    mastered,
    learning,
    newCards,
    leeches,
    masteryPercentage: total > 0 ? Math.round((mastered / total) * 100) : 0,
  };
}

export { NEW_CARDS_PER_DAY, DEFAULT_SRS_METADATA };
