import { supabase, isSupabaseConfigured } from './client';
import type { FlashcardItem } from '../../types/schemas';

export interface UserCardReviewRecord {
  card_id: string;
  stability: number;
  difficulty: number;
  reps: number;
  lapses: number;
  last_reviewed_at: number | null;
  next_review_timestamp: number;
  state: 0 | 1 | 2 | 3;
  // Legacy v2 fields for backward compat during migration
  repetition_count?: number;
  interval_days?: number;
  ease_factor?: number;
  status?: string;
}

/**
 * Fetch all saved card review states for a specific user.
 */
export async function fetchUserCardReviews(userId: string): Promise<Record<string, UserCardReviewRecord>> {
  if (!isSupabaseConfigured() || !userId) return {};

  try {
    const { data, error } = await supabase
      .from('user_flashcard_reviews')
      .select('card_id, stability, difficulty, reps, lapses, last_reviewed_at, next_review_timestamp, state, repetition_count, interval_days, ease_factor, status')
      .eq('user_id', userId);

    if (error) {
      console.warn('Failed to fetch user flashcard reviews:', error.message);
      return {};
    }

    const reviewMap: Record<string, UserCardReviewRecord> = {};
    (data || []).forEach(row => {
      reviewMap[row.card_id] = {
        card_id: row.card_id,
        stability: row.stability ?? 0,
        difficulty: row.difficulty ?? 0,
        reps: row.reps ?? row.repetition_count ?? 0,
        lapses: row.lapses ?? 0,
        last_reviewed_at: row.last_reviewed_at ? Number(row.last_reviewed_at) : null,
        next_review_timestamp: Number(row.next_review_timestamp),
        state: (row.state ?? 0) as 0 | 1 | 2 | 3,
        // Keep legacy fields for reference
        repetition_count: row.repetition_count,
        interval_days: row.interval_days,
        ease_factor: row.ease_factor ? Number(row.ease_factor) : undefined,
        status: row.status,
      };
    });

    return reviewMap;
  } catch (err) {
    console.error('Error fetching card reviews from Supabase:', err);
    return {};
  }
}

/**
 * Persist a card review to Supabase.
 */
export async function syncCardReviewToCloud(userId: string, card: FlashcardItem): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured() || !userId) return { success: true };

  try {
    const meta = card.srs_metadata;
    const payload = {
      user_id: userId,
      card_id: card.id,
      stability: meta.stability,
      difficulty: meta.difficulty,
      reps: meta.reps,
      lapses: meta.lapses,
      last_reviewed_at: meta.last_reviewed_at,
      next_review_timestamp: meta.next_review_timestamp,
      state: meta.state,
      // Keep legacy fields populated for backward compat
      repetition_count: meta.reps,
      interval_days: 0,
      ease_factor: 2.5,
      status: meta.state === 0 ? 'new' : meta.state === 2 ? 'mastered' : 'learning',
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('user_flashcard_reviews')
      .upsert(payload, { onConflict: 'user_id,card_id' });

    if (error) {
      console.warn('Failed to sync card review to Supabase:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Error syncing card review to Supabase:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

/**
 * Fetch today's reviewed count from Supabase.
 */
export async function fetchUserDailyReviewCount(userId: string, dateStr: string): Promise<number> {
  if (!isSupabaseConfigured() || !userId) return 0;

  try {
    const { data, error } = await supabase
      .from('user_daily_stats')
      .select('reviewed_count')
      .eq('user_id', userId)
      .eq('review_date', dateStr)
      .maybeSingle();

    if (error || !data) return 0;
    return data.reviewed_count || 0;
  } catch {
    return 0;
  }
}

/**
 * Increment today's reviewed count in Supabase.
 */
export async function incrementUserDailyCountInCloud(userId: string, dateStr: string, currentCount: number): Promise<void> {
  if (!isSupabaseConfigured() || !userId) return;

  try {
    const payload = {
      user_id: userId,
      review_date: dateStr,
      reviewed_count: currentCount,
      updated_at: new Date().toISOString(),
    };

    await supabase
      .from('user_daily_stats')
      .upsert(payload, { onConflict: 'user_id,review_date' });
  } catch (err) {
    console.error('Error updating daily stats in Supabase:', err);
  }
}

/**
 * Reset all user card reviews and today's daily count in Supabase.
 */
export async function resetUserDeckInCloud(userId: string, dateStr: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured() || !userId) {
    return { success: true };
  }

  try {
    const [reviewsRes, statsRes] = await Promise.all([
      supabase.from('user_flashcard_reviews').delete().eq('user_id', userId),
      supabase.from('user_daily_stats').delete().eq('user_id', userId).eq('review_date', dateStr),
    ]);

    if (reviewsRes.error) {
      console.warn('Failed to delete user flashcard reviews in cloud:', reviewsRes.error.message);
      return { success: false, error: reviewsRes.error.message };
    }
    if (statsRes.error) {
      console.warn('Failed to reset user daily stats in cloud:', statsRes.error.message);
    }

    return { success: true };
  } catch (err) {
    console.error('Error resetting user deck in cloud:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}
