import { supabase, isSupabaseConfigured } from './client';
import type { MockTestRecord, UserLearningProfile } from '../user/userStore';

export interface DbUserProfile {
  id: string;
  display_name: string;
  avatar_url: string | null;
  target_band: 'B1' | 'B2' | 'C1';
  target_exam_date: string | null;
  completed_exercises_count: number;
  created_at?: string;
  updated_at?: string;
}

export interface DbMockTestResult {
  id?: string;
  user_id: string;
  test_id: string;
  scores: Record<string, unknown>;
  achieved_band: string;
  completed_at: string;
}

/**
 * Fetch profile row from public.user_profiles for a given user ID.
 */
export async function fetchUserProfile(userId: string): Promise<DbUserProfile | null> {
  if (!isSupabaseConfigured() || !userId) return null;

  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('id, display_name, avatar_url, target_band, target_exam_date, completed_exercises_count')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.warn('Failed to fetch user profile:', error.message);
      return null;
    }

    return data as DbUserProfile | null;
  } catch (err) {
    console.error('Error fetching user profile from Supabase:', err);
    return null;
  }
}

/**
 * Upsert or update profile fields in public.user_profiles.
 */
export async function upsertUserProfile(
  userId: string,
  profile: Partial<UserLearningProfile> & { avatar_url?: string | null }
): Promise<void> {
  if (!isSupabaseConfigured() || !userId) return;

  try {
    const payload: Record<string, unknown> = {
      id: userId,
      updated_at: new Date().toISOString(),
    };

    if (profile.user_name !== undefined) {
      payload.display_name = profile.user_name;
    }
    if (profile.avatar_url !== undefined) {
      payload.avatar_url = profile.avatar_url;
    }
    if (profile.target_band !== undefined) {
      payload.target_band = profile.target_band;
    }
    if (profile.target_exam_date !== undefined) {
      payload.target_exam_date = profile.target_exam_date;
    }
    if (profile.completed_exercises_count !== undefined) {
      payload.completed_exercises_count = profile.completed_exercises_count;
    }

    const { error } = await supabase
      .from('user_profiles')
      .upsert(payload, { onConflict: 'id' });

    if (error) {
      console.warn('Failed to upsert user profile:', error.message);
    }
  } catch (err) {
    console.error('Error upserting user profile to Supabase:', err);
  }
}

/**
 * Fetch all distinct study session dates for a user from public.user_study_logs.
 */
export async function fetchUserStudyLogs(userId: string): Promise<string[]> {
  if (!isSupabaseConfigured() || !userId) return [];

  try {
    const { data, error } = await supabase
      .from('user_study_logs')
      .select('study_date')
      .eq('user_id', userId)
      .order('study_date', { ascending: false });

    if (error) {
      console.warn('Failed to fetch user study logs:', error.message);
      return [];
    }

    return (data || []).map((row: { study_date: string }) => row.study_date);
  } catch (err) {
    console.error('Error fetching user study logs from Supabase:', err);
    return [];
  }
}

/**
 * Record a study session date in public.user_study_logs.
 */
export async function recordStudyDateInCloud(userId: string, dateStr: string): Promise<void> {
  if (!isSupabaseConfigured() || !userId || !dateStr) return;

  try {
    const { error } = await supabase
      .from('user_study_logs')
      .upsert({ user_id: userId, study_date: dateStr }, { onConflict: 'user_id,study_date' });

    if (error) {
      console.warn('Failed to record study log in Supabase:', error.message);
    }
  } catch (err) {
    console.error('Error recording study log in Supabase:', err);
  }
}

/**
 * Fetch the latest mock test result for a user.
 */
export async function fetchLatestMockTest(userId: string): Promise<MockTestRecord | null> {
  if (!isSupabaseConfigured() || !userId) return null;

  try {
    const { data, error } = await supabase
      .from('user_mock_test_results')
      .select('id, test_id, scores, achieved_band, completed_at')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) return null;

    const completedTimestamp = new Date(data.completed_at).getTime();
    const scoresObj = data.scores as Record<string, unknown>;
    const overallScore = typeof scoresObj?.overall === 'number' ? scoresObj.overall : (typeof scoresObj?.score === 'number' ? scoresObj.score : 0);

    return {
      test_id: data.test_id,
      score: overallScore,
      achieved_band: data.achieved_band,
      timestamp: completedTimestamp,
      date_str: data.completed_at.slice(0, 10),
    };
  } catch (err) {
    console.error('Error fetching latest mock test from Supabase:', err);
    return null;
  }
}

/**
 * Record a mock test result in public.user_mock_test_results.
 */
export async function recordMockTestInCloud(userId: string, record: MockTestRecord): Promise<void> {
  if (!isSupabaseConfigured() || !userId) return;

  try {
    const payload = {
      user_id: userId,
      test_id: record.test_id,
      scores: {
        score: record.score,
        overall: record.score,
        timestamp: record.timestamp,
      },
      achieved_band: record.achieved_band,
      completed_at: new Date(record.timestamp).toISOString(),
    };

    const { error } = await supabase
      .from('user_mock_test_results')
      .insert(payload);

    if (error) {
      console.warn('Failed to record mock test in Supabase:', error.message);
    }
  } catch (err) {
    console.error('Error recording mock test to Supabase:', err);
  }
}
