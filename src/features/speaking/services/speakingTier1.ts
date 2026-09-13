// Tier 1: Client Acoustic Precalc, Word Count & WPM Analyzer
import type { ClientAudioMetrics } from './speakingAudio';

export interface Tier1AcousticReport {
  wordCount: number;
  detectedWpm: number;
  wpmRating: 'slow' | 'acceptable' | 'optimal' | 'fast';
  wpmDescriptionVi: string;
  totalDurationSeconds: number;
  speakingDurationSeconds: number;
  silenceDurationSeconds: number;
  longPausesCount: number;
}

export function countWords(text: string): number {
  if (!text) return 0;
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

/**
 * Calculate Words Per Minute (WPM) based on actual speaking duration in seconds.
 */
export function calculateWpm(wordCount: number, durationSeconds: number): number {
  if (!durationSeconds || durationSeconds <= 0 || wordCount <= 0) return 0;
  const minutes = durationSeconds / 60;
  return Math.round(wordCount / minutes);
}

/**
 * Evaluate candidate speaking pace according to VSTEP B1 CEFR norms:
 * - < 80 WPM: Chậm, nhiều ngập ngừng ngắt quãng
 * - 80 - 100 WPM: Tốc độ tối thiểu chấp nhận được cho B1
 * - 100 - 130 WPM: Tốc độ chuẩn tự nhiên B1 - B2
 * - > 135 WPM: Tốc độ nhanh
 */
export function evaluateWpm(wpm: number): {
  rating: 'slow' | 'acceptable' | 'optimal' | 'fast';
  descriptionVi: string;
} {
  if (wpm < 80) {
    return {
      rating: 'slow',
      descriptionVi: 'Tốc độ chậm hoặc nhiều khoảng dừng ngập ngừng. Cần luyện tập phản xạ nối ý nhanh hơn để đạt chuẩn B1 (90–120 WPM).',
    };
  }
  if (wpm <= 100) {
    return {
      rating: 'acceptable',
      descriptionVi: 'Tốc độ vừa phải, chấp nhận được cho mục tiêu đạt chuẩn B1 (Bậc 3).',
    };
  }
  if (wpm <= 135) {
    return {
      rating: 'optimal',
      descriptionVi: 'Tốc độ lưu loát, tự nhiên rất tốt, đạt chuẩn tối ưu cho trình độ B1–B2.',
    };
  }
  return {
    rating: 'fast',
    descriptionVi: 'Tốc độ nói nhanh. Hãy chú ý kiểm soát phát âm rõ ràng phụ âm cuối và trọng âm từ.',
  };
}

/**
 * Compile comprehensive Tier 1 acoustic report.
 */
export function compileTier1AcousticReport(
  metrics: ClientAudioMetrics,
  transcript = ''
): Tier1AcousticReport {
  const wordCount = countWords(transcript);
  // Use speaking duration if available (>1s), else total duration
  const activeDuration = metrics.speakingDurationSeconds >= 1 ? metrics.speakingDurationSeconds : metrics.durationSeconds;
  const detectedWpm = calculateWpm(wordCount, activeDuration);
  const evaluation = evaluateWpm(detectedWpm);

  return {
    wordCount,
    detectedWpm,
    wpmRating: evaluation.rating,
    wpmDescriptionVi: evaluation.descriptionVi,
    totalDurationSeconds: metrics.durationSeconds,
    speakingDurationSeconds: metrics.speakingDurationSeconds,
    silenceDurationSeconds: metrics.silenceDurationSeconds,
    longPausesCount: metrics.longPausesCount,
  };
}
