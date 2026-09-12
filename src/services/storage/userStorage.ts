/**
 * User-Scoped Storage Service
 * Enforces strict multi-account tenant data isolation in localStorage.
 * Every user-specific item is namespaced under: vstep_${userId}_${featureKey}
 */

export function getUserStorageKey(userId: string, featureKey: string): string {
  if (!userId) {
    throw new Error('getUserStorageKey requires a non-empty userId');
  }
  return `vstep_${userId}_${featureKey}`;
}

export function loadUserItem<T>(userId: string, featureKey: string, fallback: T): T {
  if (typeof localStorage === 'undefined' || !userId) {
    return fallback;
  }

  try {
    const raw = localStorage.getItem(getUserStorageKey(userId, featureKey));
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`Failed to parse user storage item for ${featureKey}:`, err);
    return fallback;
  }
}

export function saveUserItem<T>(userId: string, featureKey: string, value: T): void {
  if (typeof localStorage === 'undefined' || !userId) {
    return;
  }

  try {
    const key = getUserStorageKey(userId, featureKey);
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Failed to save user storage item for ${featureKey}:`, err);
  }
}

export function removeUserItem(userId: string, featureKey: string): void {
  if (typeof localStorage === 'undefined' || !userId) {
    return;
  }

  try {
    const key = getUserStorageKey(userId, featureKey);
    localStorage.removeItem(key);
  } catch (err) {
    console.error(`Failed to remove user storage item for ${featureKey}:`, err);
  }
}

/**
 * Purge all keys belonging to a specific user.
 * Triggered on explicit user sign-out to ensure 0% data leakage on shared machines.
 */
export function purgeAllUserData(userId: string): void {
  if (typeof localStorage === 'undefined' || !userId) {
    return;
  }

  try {
    const prefix = `vstep_${userId}_`;
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        keysToRemove.push(key);
      }
    }

    for (const key of keysToRemove) {
      localStorage.removeItem(key);
    }
  } catch (err) {
    console.error(`Failed to purge user data for ${userId}:`, err);
  }
}

/**
 * Purge legacy un-scoped global keys from earlier versions
 * to eliminate contaminated pre-isolation data.
 */
export function purgeLegacyGlobalKeys(): void {
  if (typeof localStorage === 'undefined') {
    return;
  }

  const legacyExactKeys = [
    'vstep_flashcard_deck_v2',
    'vstep_flashcard_deck_v3',
    'vstep_reviewed_today_count_v2',
    'vstep_reviewed_today_count_v3',
    'vstep_last_review_date_v2',
    'vstep_last_review_date_v3',
    'vstep_new_cards_today_v3',
    'vstep_user_learning_profile_v2',
    'vstep_ai_daily_quota_v1',
  ];

  try {
    for (const key of legacyExactKeys) {
      localStorage.removeItem(key);
    }

    // Also remove legacy un-scoped listening sessions (vstep_listening_session_...)
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('vstep_listening_session_')) {
        keysToRemove.push(key);
      }
    }
    for (const key of keysToRemove) {
      localStorage.removeItem(key);
    }
  } catch {
    // Ignore storage access errors
  }
}
