import type { DictationDiffResult, DictationToken } from './types';

/**
 * Clean and normalize a token for comparison:
 * - Lowercase
 * - Strip leading and trailing punctuation (keep internal apostrophes/hyphens)
 */
export function normalizeToken(token: string): string {
  return token
    .toLowerCase()
    .replace(/^[^\w\d]+|[^\w\d]+$/g, '')
    .trim();
}

/**
 * Split sentence into tokens while preserving display formatting.
 */
export function tokenizeSentence(sentence: string): string[] {
  return sentence
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Calculate Levenshtein distance between two strings for typo detection.
 */
export function levenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Compare user input against the canonical target sentence using LCS alignment.
 */
export function compareDictation(userInput: string, targetSentence: string): DictationDiffResult {
  const targetWords = tokenizeSentence(targetSentence);
  const userWords = tokenizeSentence(userInput);

  if (targetWords.length === 0) {
    return {
      tokens: [],
      isExactMatch: true,
      accuracyPercentage: 100,
    };
  }

  if (userWords.length === 0) {
    return {
      tokens: targetWords.map(word => ({
        text: word,
        status: 'missing',
        expected: word,
      })),
      isExactMatch: false,
      accuracyPercentage: 0,
    };
  }

  const normalizedTarget = targetWords.map(normalizeToken);
  const normalizedUser = userWords.map(normalizeToken);

  // Compute Longest Common Subsequence (LCS) matrix
  const m = normalizedUser.length;
  const n = normalizedTarget.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (normalizedUser[i - 1] === normalizedTarget[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to build aligned diff
  let i = m;
  let j = n;
  const reversedTokens: DictationToken[] = [];
  let correctCount = 0;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && normalizedUser[i - 1] === normalizedTarget[j - 1]) {
      reversedTokens.push({
        text: userWords[i - 1],
        status: 'correct',
      });
      correctCount += 1;
      i -= 1;
      j -= 1;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      // Missing target word or check if user word is a typo of this target word
      if (i > 0 && j > 0) {
        const uNorm = normalizedUser[i - 1];
        const tNorm = normalizedTarget[j - 1];
        const dist = levenshteinDistance(uNorm, tNorm);
        const maxLen = Math.max(uNorm.length, tNorm.length);
        const isTypo = dist <= 2 && maxLen > 2;

        if (isTypo) {
          reversedTokens.push({
            text: userWords[i - 1],
            status: 'misspelled',
            expected: targetWords[j - 1],
          });
          i -= 1;
          j -= 1;
          continue;
        }
      }

      reversedTokens.push({
        text: targetWords[j - 1],
        status: 'missing',
        expected: targetWords[j - 1],
      });
      j -= 1;
    } else if (i > 0) {
      // Extra word from user
      reversedTokens.push({
        text: userWords[i - 1],
        status: 'extra',
      });
      i -= 1;
    }
  }

  const tokens = reversedTokens.reverse();
  const isExactMatch = correctCount === targetWords.length && userWords.length === targetWords.length;
  const accuracyPercentage = Math.round((correctCount / targetWords.length) * 100);

  return {
    tokens,
    isExactMatch,
    accuracyPercentage,
  };
}
