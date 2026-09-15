import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useAuth } from '../supabase/authStore';
import {
  fetchUserProfile,
  upsertUserProfile,
  fetchUserStudyLogs,
  recordStudyDateInCloud,
  fetchLatestMockTest,
  recordMockTestInCloud,
} from '../supabase/profileSync';
import { calculateStudyStreak, formatDateToLocalISO, formatStreakBadgeText, formatStreakBannerText } from '../../lib/streakUtils';

export interface MockTestRecord {
  test_id: string;
  score: number;
  achieved_band: string;
  timestamp: number;
  date_str: string;
}

export interface UserLearningProfile {
  user_name: string;
  target_band: 'B1' | 'B2' | 'C1';
  target_exam_date: string | null;
  completed_exercises_count: number;
  latest_mock_test: MockTestRecord | null;
  study_dates: string[];
}

export const USER_PROFILE_STORAGE_KEY = 'vstep_user_learning_profile_v2';

export const DEFAULT_PROFILE: UserLearningProfile = {
  user_name: '',
  target_band: 'B1',
  target_exam_date: null,
  completed_exercises_count: 0,
  latest_mock_test: null,
  study_dates: [],
};

import {
  loadUserItem,
  saveUserItem,
  removeUserItem,
} from '../storage/userStorage';

function safeGetItem(key: string): string | null {
  try {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    }
  } catch {
    // Ignore
  }
  return null;
}

function safeSetItem(key: string, value: string): void {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    }
  } catch {
    // Ignore
  }
}

/**
 * Direct standalone helper to append a study date to user-scoped storage profile.
 */
export function recordStudyDateInStorage(
  dateStr: string = formatDateToLocalISO(new Date()),
  userId?: string
): void {
  try {
    if (userId) {
      const profile = loadUserItem<UserLearningProfile>(userId, 'user_learning_profile_v2', DEFAULT_PROFILE);
      const dates = Array.isArray(profile.study_dates) ? profile.study_dates : [];
      if (!dates.includes(dateStr)) {
        saveUserItem(userId, 'user_learning_profile_v2', {
          ...profile,
          study_dates: [...dates, dateStr],
        });
      }
      return;
    }

    // Fallback for un-scoped callers
    const raw = safeGetItem(USER_PROFILE_STORAGE_KEY);
    const profile: UserLearningProfile = raw ? JSON.parse(raw) : DEFAULT_PROFILE;
    const dates = Array.isArray(profile.study_dates) ? profile.study_dates : [];
    if (!dates.includes(dateStr)) {
      safeSetItem(
        USER_PROFILE_STORAGE_KEY,
        JSON.stringify({ ...profile, study_dates: [...dates, dateStr] })
      );
    }
  } catch {
    // Ignore
  }
}

const profileListeners = new Set<(updatedProfile?: UserLearningProfile) => void>();

export function notifyProfileChanged(profile?: UserLearningProfile): void {
  profileListeners.forEach((listener) => listener(profile));
}

export function useUserStore() {
  const { user, isAuthenticated } = useAuth();
  const userId = user?.id;

  const [profile, setProfile] = useState<UserLearningProfile>(() => {
    if (userId) {
      return loadUserItem<UserLearningProfile>(userId, 'user_learning_profile_v2', DEFAULT_PROFILE);
    }
    return DEFAULT_PROFILE;
  });

  const syncedUserIdRef = useRef<string | null>(null);

  // Synchronize state across active hook instances
  useEffect(() => {
    const handleUpdate = (updatedProfile?: UserLearningProfile) => {
      if (updatedProfile) {
        setProfile(updatedProfile);
      } else if (userId) {
        setProfile(loadUserItem<UserLearningProfile>(userId, 'user_learning_profile_v2', DEFAULT_PROFILE));
      }
    };
    profileListeners.add(handleUpdate);
    return () => {
      profileListeners.delete(handleUpdate);
    };
  }, [userId]);

  // Synchronize profile from Supabase when user logs in or switches
  useEffect(() => {
    if (!isAuthenticated || !userId) {
      syncedUserIdRef.current = null;
      return;
    }

    if (syncedUserIdRef.current === userId) {
      return;
    }

    syncedUserIdRef.current = userId;
    let isMounted = true;

    async function hydrateFromCloud() {
      if (!userId) return;

      try {
        const [cloudProfile, cloudStudyLogs, cloudMockTest] = await Promise.all([
          fetchUserProfile(userId),
          fetchUserStudyLogs(userId),
          fetchLatestMockTest(userId),
        ]);

        if (!isMounted) return;

        const googleFullName = user?.user_metadata?.full_name || user?.user_metadata?.name || '';
        const name = cloudProfile?.display_name || googleFullName || 'Học viên';
        const band = cloudProfile?.target_band || 'B1';
        const examDate = cloudProfile?.target_exam_date || null;
        const completedCount = cloudProfile?.completed_exercises_count ?? 0;
        const studyDates = cloudStudyLogs; // Always use cloud records directly — zero cross-account fallthrough
        const latestTest = cloudMockTest || null;

        const updatedProfile: UserLearningProfile = {
          user_name: name,
          target_band: band,
          target_exam_date: examDate,
          completed_exercises_count: completedCount,
          latest_mock_test: latestTest,
          study_dates: studyDates,
        };

        setProfile(updatedProfile);
        saveUserItem(userId, 'user_learning_profile_v2', updatedProfile);
        notifyProfileChanged(updatedProfile);
      } catch (err) {
        console.error('Failed to hydrate user profile from cloud:', err);
      }
    }

    hydrateFromCloud();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, userId, user]);

  // Display Name with fallback priority
  const userDisplayName = useMemo(() => {
    if (profile.user_name && profile.user_name.trim()) {
      return profile.user_name;
    }
    const googleFullName = user?.user_metadata?.full_name || user?.user_metadata?.name;
    if (googleFullName) {
      return googleFullName;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'Học viên';
  }, [profile.user_name, user]);

  // Avatar initial letter
  const avatarInitial = useMemo(() => {
    return (userDisplayName[0] || 'V').toUpperCase();
  }, [userDisplayName]);

  // Avatar URL from Google auth metadata
  const avatarUrl = useMemo(() => {
    return (user?.user_metadata?.avatar_url as string) || (user?.user_metadata?.picture as string) || null;
  }, [user]);

  // Calculate current study streak
  const streakDays = useMemo(() => {
    return calculateStudyStreak(profile.study_dates);
  }, [profile.study_dates]);

  const streakBadgeText = useMemo(() => {
    return formatStreakBadgeText(streakDays);
  }, [streakDays]);

  const streakBannerText = useMemo(() => {
    return formatStreakBannerText(streakDays);
  }, [streakDays]);

  // Actions with 0ms optimistic updates + local storage persistence + background Supabase sync
  const setUserName = useCallback((name: string) => {
    setProfile((prev) => {
      const next = { ...prev, user_name: name };
      if (userId) {
        saveUserItem(userId, 'user_learning_profile_v2', next);
        upsertUserProfile(userId, { user_name: name });
      }
      notifyProfileChanged(next);
      return next;
    });
  }, [userId]);

  const setTargetBand = useCallback((band: 'B1' | 'B2' | 'C1') => {
    setProfile((prev) => {
      const next = { ...prev, target_band: band };
      if (userId) {
        saveUserItem(userId, 'user_learning_profile_v2', next);
        upsertUserProfile(userId, { target_band: band });
      }
      notifyProfileChanged(next);
      return next;
    });
  }, [userId]);

  const setTargetExamDate = useCallback((dateStr: string | null) => {
    setProfile((prev) => {
      const next = { ...prev, target_exam_date: dateStr };
      if (userId) {
        saveUserItem(userId, 'user_learning_profile_v2', next);
        upsertUserProfile(userId, { target_exam_date: dateStr });
      }
      notifyProfileChanged(next);
      return next;
    });
  }, [userId]);

  const recordStudyActivity = useCallback((dateStr?: string) => {
    const today = dateStr || formatDateToLocalISO(new Date());
    setProfile((prev) => {
      if (prev.study_dates.includes(today)) {
        return prev;
      }
      const next = {
        ...prev,
        study_dates: [...prev.study_dates, today],
      };
      if (userId) {
        saveUserItem(userId, 'user_learning_profile_v2', next);
      }
      notifyProfileChanged(next);
      return next;
    });
    if (userId) {
      recordStudyDateInCloud(userId, today);
    }
  }, [userId]);

  const incrementExercisesCompleted = useCallback((count: number = 1) => {
    setProfile((prev) => {
      const nextCount = Math.max(0, prev.completed_exercises_count + count);
      const next = {
        ...prev,
        completed_exercises_count: nextCount,
      };
      if (userId) {
        saveUserItem(userId, 'user_learning_profile_v2', next);
        upsertUserProfile(userId, { completed_exercises_count: nextCount });
      }
      notifyProfileChanged(next);
      return next;
    });
  }, [userId]);

  const recordMockTestResult = useCallback((testId: string, score: number, achievedBand: string) => {
    const now = Date.now();
    const record: MockTestRecord = {
      test_id: testId,
      score,
      achieved_band: achievedBand,
      timestamp: now,
      date_str: formatDateToLocalISO(new Date(now)),
    };
    setProfile((prev) => {
      const next = {
        ...prev,
        latest_mock_test: record,
      };
      if (userId) {
        saveUserItem(userId, 'user_learning_profile_v2', next);
      }
      notifyProfileChanged(next);
      return next;
    });
    if (userId) {
      recordMockTestInCloud(userId, record);
    }
  }, [userId]);

  const resetProfile = useCallback(() => {
    syncedUserIdRef.current = null;
    setProfile(DEFAULT_PROFILE);
    if (userId) {
      removeUserItem(userId, 'user_learning_profile_v2');
    }
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem(USER_PROFILE_STORAGE_KEY);
    }
    notifyProfileChanged(DEFAULT_PROFILE);
  }, [userId]);

  return {
    profile,
    userDisplayName,
    avatarInitial,
    avatarUrl,
    targetBand: profile.target_band,
    targetExamDate: profile.target_exam_date,
    completedExercisesCount: profile.completed_exercises_count,
    latestMockTest: profile.latest_mock_test,
    streakDays,
    streakBadgeText,
    streakBannerText,
    isAuthenticated,
    setUserName,
    setTargetBand,
    setTargetExamDate,
    recordStudyActivity,
    incrementExercisesCompleted,
    recordMockTestResult,
    resetProfile,
  };
}
