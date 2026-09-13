import type {
  MockTestCompositeScore,
  MoetBandInfo,
} from '../types';

/**
 * Official MOET Decision 729/QĐ-BGDĐT 0.5 Rounding Algorithm:
 * - Fractional remainder < 0.25 => round down to .0 (e.g., 6.20 -> 6.0; 5.12 -> 5.0)
 * - 0.25 <= remainder < 0.75 => round to .5 (e.g., 6.25 -> 6.5; 6.70 -> 6.5)
 * - remainder >= 0.75 => round up to next whole integer 1.0 (e.g., 6.75 -> 7.0; 8.80 -> 9.0; 3.75 -> 4.0)
 */
export function roundToMoetHalf(rawScore: number): number {
  if (isNaN(rawScore) || rawScore <= 0) return 0;
  if (rawScore >= 10) return 10;

  const integerPart = Math.floor(rawScore);
  const remainder = Math.round((rawScore - integerPart) * 100) / 100;

  if (remainder < 0.25) {
    return integerPart;
  }
  if (remainder < 0.75) {
    return integerPart + 0.5;
  }
  return integerPart + 1.0;
}

/**
 * Maps MOET rounded overall score to CEFR band information and qualification details.
 */
export function getMoetBandInfo(roundedScore: number): MoetBandInfo {
  if (roundedScore < 4.0) {
    return {
      band: 'Below B1',
      bandLevelNumber: 0,
      bandNameVi: 'Dưới B1 (A1 - A2)',
      descriptionVi: 'Chưa đạt chuẩn tối thiểu năng lực bậc 3 theo Khung 6 bậc Việt Nam.',
      qualificationSummary: 'Chưa đủ điều kiện tốt nghiệp Đại học. Cần củng cố ngữ pháp và vốn từ vựng nền tảng.',
      badgeClass: 'badge-coral',
    };
  }

  if (roundedScore <= 5.5) {
    return {
      band: 'B1',
      bandLevelNumber: 3,
      bandNameVi: 'Bậc 3 (VSTEP B1)',
      descriptionVi: 'Có thể hiểu các ý chính trong văn bản/lời nói chuẩn mực về các chủ đề quen thuộc.',
      qualificationSummary: 'Đạt chuẩn đầu ra tốt nghiệp Đại học (không chuyên ngữ) và đầu vào Cao học/Thạc sĩ.',
      badgeClass: 'badge-emerald',
    };
  }

  if (roundedScore <= 8.0) {
    return {
      band: 'B2',
      bandLevelNumber: 4,
      bandNameVi: 'Bậc 4 (VSTEP B2)',
      descriptionVi: 'Giao tiếp trôi chảy tự nhiên, hiểu văn bản phức tạp và lập luận rõ ràng.',
      qualificationSummary: 'Đạt chuẩn đầu ra Thạc sĩ, tuyển dụng công chức và chuẩn Giáo viên tiếng Anh Tiểu học/THCS.',
      badgeClass: 'badge-primary',
    };
  }

  return {
    band: 'C1',
    bandLevelNumber: 5,
    bandNameVi: 'Bậc 5 (VSTEP C1)',
    descriptionVi: 'Sử dụng ngôn ngữ linh hoạt, hiệu quả trong học thuật và giao tiếp chuyên nghiệp.',
    qualificationSummary: 'Đạt chuẩn Nghiên cứu sinh/Tiến sĩ, Giảng viên Đại học và Giáo viên tiếng Anh THPT.',
    badgeClass: 'badge-gold',
  };
}

/**
 * Calculates listening score on scale 0.0 - 10.0 from correct questions.
 */
export function calculateListeningScore(correctCount: number, totalQuestions: number = 35): number {
  if (totalQuestions <= 0 || correctCount <= 0) return 0;
  const raw = (Math.min(correctCount, totalQuestions) / totalQuestions) * 10;
  return Math.round(raw * 10) / 10;
}

/**
 * Calculates reading score on scale 0.0 - 10.0 from correct questions.
 */
export function calculateReadingScore(correctCount: number, totalQuestions: number = 40): number {
  if (totalQuestions <= 0 || correctCount <= 0) return 0;
  const raw = (Math.min(correctCount, totalQuestions) / totalQuestions) * 10;
  return Math.round(raw * 10) / 10;
}

export interface SkillScoreInput {
  listeningScore: number;
  readingScore: number;
  writingScore: number;
  speakingScore: number;
  blurCount?: number;
}

/**
 * Calculates official composite score across 4 VSTEP skills according to Decision 729:
 * Overall = (Listening + Reading + Writing + Speaking) / 4
 * Followed by 0.5 MOET standard rounding.
 */
export function calculateMockTestComposite(input: SkillScoreInput): MockTestCompositeScore {
  const l = Math.max(0, Math.min(10, input.listeningScore));
  const r = Math.max(0, Math.min(10, input.readingScore));
  const w = Math.max(0, Math.min(10, input.writingScore));
  const s = Math.max(0, Math.min(10, input.speakingScore));

  const rawSum = l + r + w + s;
  const rawOverall = Math.round((rawSum / 4) * 100) / 100;
  const roundedOverall = roundToMoetHalf(rawOverall);
  const bandInfo = getMoetBandInfo(roundedOverall);

  return {
    listeningScore: l,
    readingScore: r,
    writingScore: w,
    speakingScore: s,
    rawOverall,
    roundedOverall,
    bandInfo,
    completedAt: Date.now(),
    blurCount: input.blurCount || 0,
  };
}
