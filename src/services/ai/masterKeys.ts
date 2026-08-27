// Master Key Pool Management with Automatic Rotation & Rate-Limit Backoff
import type { AIProvider } from './types';

const parseKeyPool = (envValue?: string): string[] => {
  if (!envValue) return [];
  return envValue
    .split(',')
    .map(k => k.trim())
    .filter(Boolean);
};

class KeyPoolManager {
  private pools: Map<AIProvider, string[]> = new Map();
  private currentIndex: Map<AIProvider, number> = new Map();
  private rateLimitedUntil: Map<string, number> = new Map();

  constructor() {
    this.initPools();
  }

  private initPools() {
    const env = (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {}) as Record<string, string | undefined>;

    // OpenRouter pool (comma-separated VITE_OPENROUTER_API_KEYS and single VITE_OPENROUTER_API_KEY)
    const openRouterKeys = [
      ...parseKeyPool(env.VITE_OPENROUTER_API_KEYS),
      ...parseKeyPool(env.VITE_OPENROUTER_API_KEY),
    ];
    this.pools.set('openrouter', Array.from(new Set(openRouterKeys)));
    this.currentIndex.set('openrouter', 0);

    // Ollama Cloud pool (comma-separated VITE_OLLAMA_API_KEYS and single VITE_OLLAMA_API_KEY)
    const ollamaKeys = [
      ...parseKeyPool(env.VITE_OLLAMA_API_KEYS),
      ...parseKeyPool(env.VITE_OLLAMA_API_KEY),
    ];
    this.pools.set('ollama_cloud', Array.from(new Set(ollamaKeys)));
    this.currentIndex.set('ollama_cloud', 0);

    // Google AI Studio pool
    const googleKeys = [
      ...parseKeyPool(env.VITE_GEMINI_API_KEYS),
      ...parseKeyPool(env.VITE_GEMINI_API_KEY),
    ];
    this.pools.set('google_ai_studio', Array.from(new Set(googleKeys)));
    this.currentIndex.set('google_ai_studio', 0);

    // Local Ollama doesn't require keys
    this.pools.set('ollama_local', ['']);
    this.currentIndex.set('ollama_local', 0);
  }

  /**
   * Get the next available active key for a provider with rotation and rate-limit skip.
   */
  public getKey(provider: AIProvider): string {
    const pool = this.pools.get(provider) || [];
    if (pool.length === 0) return '';
    if (pool.length === 1) return pool[0];

    const now = Date.now();
    const startIndex = this.currentIndex.get(provider) || 0;

    // Search for a key that is not currently rate-limited
    for (let i = 0; i < pool.length; i++) {
      const idx = (startIndex + i) % pool.length;
      const candidateKey = pool[idx];
      const blockedUntil = this.rateLimitedUntil.get(candidateKey) || 0;

      if (now >= blockedUntil) {
        this.currentIndex.set(provider, (idx + 1) % pool.length);
        return candidateKey;
      }
    }

    // If all keys are rate-limited, fallback to round-robin
    const nextIdx = (startIndex + 1) % pool.length;
    this.currentIndex.set(provider, nextIdx);
    return pool[startIndex];
  }

  /**
   * Mark a key as rate-limited (HTTP 429) with a cooldown period (default 60s).
   */
  public markRateLimited(key: string, cooldownMs = 60000) {
    if (!key) return;
    this.rateLimitedUntil.set(key, Date.now() + cooldownMs);
  }

  /**
   * Get the total number of keys in the pool for a provider.
   */
  public getPoolSize(provider: AIProvider): number {
    return (this.pools.get(provider) || []).length;
  }

  /**
   * Set custom keys for a provider pool (useful for tests or custom initialization).
   */
  public setPool(provider: AIProvider, keys: string[]) {
    this.pools.set(provider, [...keys]);
    this.currentIndex.set(provider, 0);
  }

  /**
   * Reset the key pool state (useful for tests).
   */
  public reset() {
    this.rateLimitedUntil.clear();
    this.initPools();
  }
}

export const masterKeyPool = new KeyPoolManager();
