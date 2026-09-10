import { supabase, isSupabaseConfigured } from './client';
import type { DbTestSubmission, TestMode } from '../../types/schemas';

export type TestSubmissionInput = Omit<DbTestSubmission, 'id' | 'created_at'>;

/**
 * Fetch the stored submission for a given user, test, and mode from public.user_test_submissions.
 */
export async function fetchTestSubmission(
  userId: string,
  testId: string,
  mode: TestMode
): Promise<DbTestSubmission | null> {
  if (!isSupabaseConfigured() || !userId || !testId) return null;

  try {
    const { data, error } = await supabase
      .from('user_test_submissions')
      .select('*')
      .eq('user_id', userId)
      .eq('test_id', testId)
      .eq('mode', mode)
      .maybeSingle();

    if (error) {
      console.warn('Failed to fetch test submission from Supabase:', error.message);
      return null;
    }

    if (!data) return null;

    return {
      id: data.id,
      user_id: data.user_id,
      test_id: data.test_id,
      skill: data.skill,
      mode: data.mode,
      score: Number(data.score),
      correct_count: data.correct_count,
      total_questions: data.total_questions,
      time_spent_seconds: data.time_spent_seconds,
      answers: (data.answers as Record<string, string>) || {},
      notes: (data.notes as Record<string, string>) || {},
      flagged_questions: Array.isArray(data.flagged_questions) ? data.flagged_questions : [],
      completed_at: data.completed_at,
      created_at: data.created_at,
    };
  } catch (err) {
    console.error('Error fetching test submission from Supabase:', err);
    return null;
  }
}

/**
 * Upsert a test submission into public.user_test_submissions.
 * Overwrites previous attempt for (user_id, test_id, mode) in place.
 */
export async function upsertTestSubmission(
  submission: TestSubmissionInput
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured() || !submission.user_id) {
    return { success: false, error: 'Supabase unconfigured or missing user_id' };
  }

  try {
    const payload = {
      user_id: submission.user_id,
      test_id: submission.test_id,
      skill: submission.skill,
      mode: submission.mode,
      score: submission.score,
      correct_count: submission.correct_count,
      total_questions: submission.total_questions,
      time_spent_seconds: submission.time_spent_seconds,
      answers: submission.answers || {},
      notes: submission.notes || {},
      flagged_questions: submission.flagged_questions || [],
      completed_at: submission.completed_at || new Date().toISOString(),
    };

    const { error } = await supabase
      .from('user_test_submissions')
      .upsert(payload, { onConflict: 'user_id,test_id,mode' });

    if (error) {
      console.warn('Failed to upsert test submission to Supabase:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Error upserting test submission to Supabase:', err);
    return { success: false, error: message };
  }
}
