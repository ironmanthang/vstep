import { supabase, isSupabaseConfigured } from './client';
import type { FlashcardItem } from '../../types/schemas';

export interface UserCardReviewRecord {
  card_id: string;
  repetition_count: number;
  interval_days: number;
  ease_factor: number;
  last_reviewed_at: number | null;
  next_review_timestamp: number;
  status: 'new' | 'learning' | 'mastered';
}

/**
 * Fetch all saved card review states for a specific user.
 */
export async function fetchUserCardReviews(userId: string): Promise<Record<string, UserCardReviewRecord>> {
  if (!isSupabaseConfigured() || !userId) return {};

  try {
    const { data, error } = await supabase
      .from('user_flashcard_reviews')
      .select('card_id, repetition_count, interval_days, ease_factor, last_reviewed_at, next_review_timestamp, status')
      .eq('user_id', userId);

    if (error) {
      console.warn('Failed to fetch user flashcard reviews:', error.message);
      return {};
    }

    const reviewMap: Record<string, UserCardReviewRecord> = {};
    (data || []).forEach(row => {
      reviewMap[row.card_id] = {
        card_id: row.card_id,
        repetition_count: row.repetition_count,
        interval_days: row.interval_days,
        ease_factor: Number(row.ease_factor),
        last_reviewed_at: row.last_reviewed_at ? Number(row.last_reviewed_at) : null,
        next_review_timestamp: Number(row.next_review_timestamp),
        status: row.status as 'new' | 'learning' | 'mastered',
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
    const payload = {
      user_id: userId,
      card_id: card.id,
      repetition_count: card.srs_metadata.repetition_count,
      interval_days: card.srs_metadata.interval_days,
      ease_factor: card.srs_metadata.ease_factor,
      last_reviewed_at: card.srs_metadata.last_reviewed_at,
      next_review_timestamp: card.srs_metadata.next_review_timestamp,
      status: card.srs_metadata.status,
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
