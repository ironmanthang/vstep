/**
 * Tier 1: Client-Side Deterministic Pre-calculation & Hygiene Check (< 50ms)
 * Runs locally in the browser before sending data to Tier 2 AI Evaluator.
 */

// Common English function words (stop words) that should not trigger plagiarism flags
export const ENGLISH_STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t',
  'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
  'can', 'can\'t', 'cannot', 'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing',
  'don\'t', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t',
  'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers',
  'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if',
  'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s', 'me', 'more', 'most',
  'mustn\'t', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other',
  'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d',
  'she\'ll', 'she\'s', 'should', 'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s', 'the',
  'their', 'theirs', 'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d',
  'they\'ll', 'they\'re', 'they\'ve', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up',
  'very', 'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what',
  'what\'s', 'when', 'when\'s', 'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why',
  'why\'s', 'with', 'won\'t', 'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve',
  'your', 'yours', 'yourself', 'yourselves'
]);

// Standard greeting / closing phrases for letters/emails that should not count as copied prompt text
export const EPISTOLARY_FORMULAE = [
  /\bdear\s+[a-zA-Z\s]+[,:]/gi,
  /\bi\s+am\s+writing\s+(?:this\s+letter\s+)?(?:to|in\s+order\s+to)\b/gi,
  /\bthank\s+you\s+(?:very\s+much\s+)?for\s+your\s+(?:letter|email)\b/gi,
  /\bi\s+hope\s+(?:that\s+)?you\s+are\s+(?:doing\s+well|fine)\b/gi,
  /\bi\s+look\s+forward\s+to\s+hearing\s+from\s+you\b/gi,
  /\bi\s+look\s+forward\s+to\s+seeing\s+you\b/gi,
  /\byours\s+(?:sincerely|faithfully|truly)\b/gi,
  /\bbest\s+(?:regards|wishes)\b/gi,
  /\bwarm\s+regards\b/gi
];

/**
 * Deterministic word counter matching VLU / MOET exam software conventions.
 * Counts words delimited by whitespace, excluding pure punctuation symbols.
 */
export function countWords(text: string): number {
  if (!text || !text.trim()) return 0;
  const matches = text.trim().match(/\b[a-zA-Z0-9'-]+\b/g);
  return matches ? matches.length : 0;
}

/**
 * Clean text for n-gram extraction: lowercases and tokenizes alphanumeric words.
 */
function tokenizeWords(text: string): string[] {
  return (text.toLowerCase().match(/\b[a-z0-9]+\b/g) || []);
}

/**
 * Mask standard epistolary formulae before analysis.
 */
export function maskEpistolaryFormulae(text: string): string {
  let cleaned = text;
  for (const formula of EPISTOLARY_FORMULAE) {
    cleaned = cleaned.replace(formula, ' ');
  }
  return cleaned;
}

/**
 * Computes prompt copying ratio using tri-grams of content words.
 * Ignores stop words and epistolary greetings.
 * Returns ratio between 0.0 and 1.0 (e.g. 0.15 = 15% overlap).
 */
export function computePromptCopyingRatio(candidateText: string, promptText: string): number {
  if (!candidateText.trim() || !promptText.trim()) return 0;

  // Mask polite opening/closings
  const filteredCandidate = maskEpistolaryFormulae(candidateText);
  const filteredPrompt = maskEpistolaryFormulae(promptText);

  // Extract words and filter out stop words to preserve semantic content words only
  const promptTokens = tokenizeWords(filteredPrompt).filter(w => !ENGLISH_STOP_WORDS.has(w));
  const candidateTokens = tokenizeWords(filteredCandidate).filter(w => !ENGLISH_STOP_WORDS.has(w));

  if (promptTokens.length < 3 || candidateTokens.length < 3) return 0;

  // Generate tri-grams for prompt
  const promptTriGrams = new Set<string>();
  for (let i = 0; i <= promptTokens.length - 3; i++) {
    promptTriGrams.add(`${promptTokens[i]} ${promptTokens[i + 1]} ${promptTokens[i + 2]}`);
  }

  if (promptTriGrams.size === 0) return 0;

  // Count candidate tri-grams that exist in prompt
  let matchedTriGrams = 0;
  let totalCandidateTriGrams = 0;
  const seenCandidateTriGrams = new Set<string>();

  for (let i = 0; i <= candidateTokens.length - 3; i++) {
    const triGram = `${candidateTokens[i]} ${candidateTokens[i + 1]} ${candidateTokens[i + 2]}`;
    if (!seenCandidateTriGrams.has(triGram)) {
      seenCandidateTriGrams.add(triGram);
      totalCandidateTriGrams++;
      if (promptTriGrams.has(triGram)) {
        matchedTriGrams++;
      }
    }
  }

  if (totalCandidateTriGrams === 0) return 0;
  return Number((matchedTriGrams / totalCandidateTriGrams).toFixed(3));
}

export interface VietlishPatternDetection {
  type: 'double_conjunction' | 'missing_existential' | 'punctuation_anomaly';
  pattern: string;
  matched_text: string;
  explanation_vi: string;
}

/**
 * Fast regex pre-filter detecting common L1 transfer patterns and surface defects.
 */
export function detectVietlishSurfacePatterns(text: string): VietlishPatternDetection[] {
  const detections: VietlishPatternDetection[] = [];

  // 1. Double conjunction: Although... but...
  const althoughButMatch = text.match(/\b(although|even though|though)\b([^.?!;]{1,120})\b(but)\b/i);
  if (althoughButMatch) {
    detections.push({
      type: 'double_conjunction',
      pattern: 'Although... but...',
      matched_text: althoughButMatch[0],
      explanation_vi: 'Lỗi dùng thừa cặp liên từ song song (tư duy tiếng Việt "Tuy... nhưng..."). Trong tiếng Anh chỉ dùng "Although" hoặc "But".'
    });
  }

  // 2. Double conjunction: Because... so...
  const becauseSoMatch = text.match(/\b(because|since|as)\b([^.?!;]{1,120})\b(so|therefore)\b/i);
  if (becauseSoMatch) {
    detections.push({
      type: 'double_conjunction',
      pattern: 'Because... so...',
      matched_text: becauseSoMatch[0],
      explanation_vi: 'Lỗi dùng thừa cặp liên từ song song (tư duy tiếng Việt "Vì... nên..."). Trong tiếng Anh chỉ dùng "Because" hoặc "So".'
    });
  }

  // 3. Double conjunction: If... then...
  const ifThenMatch = text.match(/\b(if)\b([^.?!;]{1,100})\b(then)\b/i);
  if (ifThenMatch) {
    detections.push({
      type: 'double_conjunction',
      pattern: 'If... then...',
      matched_text: ifThenMatch[0],
      explanation_vi: 'Thừa từ "then" trong mệnh đề chính (tư duy tiếng Việt "Nếu... thì...").'
    });
  }

  // 4. Missing existential: "In Vietnam have many..."
  const missingExistentialMatch = text.match(/\bin\s+[a-zA-Z\s,]+(?:has|have)\s+(?:many|a lot of|much|several|some|[0-9]+)\b/i);
  if (missingExistentialMatch) {
    detections.push({
      type: 'missing_existential',
      pattern: 'In [Location] have...',
      matched_text: missingExistentialMatch[0],
      explanation_vi: 'Khuyết chủ ngữ giả "There is / There are" (dịch nguyên nghĩa từ chữ "có" sau trạng ngữ nơi chốn tiếng Việt).'
    });
  }

  return detections;
}

export interface Tier1PrecalcResult {
  word_count: number;
  min_words: number;
  meets_word_count: boolean;
  prompt_copying_ratio: number;
  is_copying_flagged: boolean;
  detected_vietlish_patterns: VietlishPatternDetection[];
}

/**
 * Orchestrates all Tier 1 local checks.
 */
export function runTier1Precalc(candidateText: string, promptText: string, minWords: number): Tier1PrecalcResult {
  const wordCount = countWords(candidateText);
  const copyingRatio = computePromptCopyingRatio(candidateText, promptText);
  const vietlishDetections = detectVietlishSurfacePatterns(candidateText);

  return {
    word_count: wordCount,
    min_words: minWords,
    meets_word_count: wordCount >= minWords,
    prompt_copying_ratio: copyingRatio,
    is_copying_flagged: copyingRatio > 0.30,
    detected_vietlish_patterns: vietlishDetections
  };
}
