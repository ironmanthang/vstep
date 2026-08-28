// Pure utilities for calculating and formatting study streaks

/**
 * Format a Date object to YYYY-MM-DD in local time.
 */
export function formatDateToLocalISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Calculate consecutive daily study streak from a list of ISO date strings (YYYY-MM-DD).
 */
export function calculateStudyStreak(dateStrings: string[], referenceDate: Date = new Date()): number {
  if (!dateStrings || dateStrings.length === 0) {
    return 0;
  }

  // Deduplicate and filter valid format YYYY-MM-DD
  const uniqueDates = new Set(
    dateStrings.filter(d => typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d.trim()))
  );

  if (uniqueDates.size === 0) {
    return 0;
  }

  const todayStr = formatDateToLocalISO(referenceDate);

  const yesterday = new Date(referenceDate);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = formatDateToLocalISO(yesterday);

  // If user reviewed neither today nor yesterday, streak is 0
  const hasReviewedToday = uniqueDates.has(todayStr);
  const hasReviewedYesterday = uniqueDates.has(yesterdayStr);

  if (!hasReviewedToday && !hasReviewedYesterday) {
    return 0;
  }

  // Start scanning backward from today (if reviewed today) or yesterday
  let streak = 0;
  const checkDate = new Date(referenceDate);

  if (!hasReviewedToday && hasReviewedYesterday) {
    checkDate.setDate(checkDate.getDate() - 1);
  }

  while (true) {
    const checkStr = formatDateToLocalISO(checkDate);
    if (uniqueDates.has(checkStr)) {
      streak += 1;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Format streak count for UI badge display.
 */
export function formatStreakBadgeText(streak: number): string {
  if (streak <= 0) {
    return '0 ngày';
  }
  return `${streak} ngày`;
}

/**
 * Format streak text for home banners.
 */
export function formatStreakBannerText(streak: number): string {
  if (streak <= 0) {
    return 'Bắt đầu chuỗi học hôm nay';
  }
  return `Chuỗi ${streak} ngày học liên tục`;
}
