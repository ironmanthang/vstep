import { describe, it, expect } from 'vitest';
import {
  calculateStudyStreak,
  formatDateToLocalISO,
  formatStreakBadgeText,
  formatStreakBannerText,
} from './streakUtils';

describe('streakUtils', () => {
  const refDate = new Date('2026-08-28T10:00:00');

  it('returns 0 for empty date lists', () => {
    expect(calculateStudyStreak([])).toBe(0);
    expect(calculateStudyStreak([], refDate)).toBe(0);
  });

  it('returns 0 if last review was two or more days ago', () => {
    const dates = ['2026-08-20', '2026-08-21', '2026-08-26'];
    expect(calculateStudyStreak(dates, refDate)).toBe(0);
  });

  it('calculates 1 day streak when reviewed only today', () => {
    const dates = ['2026-08-28'];
    expect(calculateStudyStreak(dates, refDate)).toBe(1);
  });

  it('calculates 1 day streak when reviewed yesterday but not yet today', () => {
    const dates = ['2026-08-27'];
    expect(calculateStudyStreak(dates, refDate)).toBe(1);
  });

  it('calculates multi-day consecutive streak including today', () => {
    const dates = ['2026-08-25', '2026-08-26', '2026-08-27', '2026-08-28'];
    expect(calculateStudyStreak(dates, refDate)).toBe(4);
  });

  it('calculates multi-day consecutive streak extending to yesterday', () => {
    const dates = ['2026-08-25', '2026-08-26', '2026-08-27'];
    expect(calculateStudyStreak(dates, refDate)).toBe(3);
  });

  it('handles duplicates and unsorted dates correctly', () => {
    const dates = ['2026-08-27', '2026-08-28', '2026-08-26', '2026-08-27', '2026-08-28'];
    expect(calculateStudyStreak(dates, refDate)).toBe(3);
  });

  it('stops streak count at first missing day gap', () => {
    // Gap on 2026-08-26
    const dates = ['2026-08-24', '2026-08-25', '2026-08-27', '2026-08-28'];
    expect(calculateStudyStreak(dates, refDate)).toBe(2);
  });

  it('formats badge and banner text cleanly', () => {
    expect(formatStreakBadgeText(0)).toBe('0 ngày');
    expect(formatStreakBadgeText(5)).toBe('5 ngày');
    expect(formatStreakBannerText(0)).toBe('Bắt đầu chuỗi học hôm nay');
    expect(formatStreakBannerText(5)).toBe('Chuỗi 5 ngày học liên tục');
  });

  it('formats local ISO date reliably', () => {
    const d = new Date(2026, 7, 28); // Month 7 is August (0-indexed)
    expect(formatDateToLocalISO(d)).toBe('2026-08-28');
  });
});
