import { lazy, type ComponentType } from 'react';

/**
 * Creates the retry loader function used by lazyWithRetry.
 * Exported separately for deterministic unit testing.
 */
export function createLazyRetryLoader<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  chunkKey = 'dynamic_chunk'
): () => Promise<{ default: T }> {
  return async () => {
    const retryKey = `vstep_lazy_retry_${chunkKey}`;
    const alreadyRetried =
      typeof window !== 'undefined' && typeof sessionStorage !== 'undefined'
        ? sessionStorage.getItem(retryKey) === 'true'
        : false;

    try {
      const module = await factory();
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.removeItem(retryKey);
      }
      return module;
    } catch (error) {
      if (!alreadyRetried && typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(retryKey, 'true');
        window.location.reload();
        // Return a pending promise while the browser performs the reload
        return new Promise<{ default: T }>(() => {});
      }

      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.removeItem(retryKey);
      }
      throw error;
    }
  };
}

/**
 * Robust wrapper around React.lazy() that gracefully self-heals when a dynamic
 * chunk fails to load (e.g. when deployment replaces hashed asset filenames).
 *
 * It triggers a single reload via sessionStorage retry tracking to fetch the
 * latest build, preventing infinite reload loops if the server is truly down.
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  chunkKey = 'dynamic_chunk'
) {
  return lazy(createLazyRetryLoader(factory, chunkKey));
}
