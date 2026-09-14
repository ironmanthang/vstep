/**
 * VSTEP Master — PWA Lifecycle & Guaranteed 1-Refresh Update Coordinator
 *
 * Implements a zero-bloat, robust Service Worker lifecycle with:
 * 1. Guaranteed 1-Refresh Deploy Updates: If controllerchange occurs during
 *    initial load (performance.now() < 8000ms), reload immediately.
 * 2. Active Session Protection: If controllerchange occurs while the user is
 *    in-session (performance.now() >= 8000ms), dispatch an event so UI can show
 *    an unobtrusive update pill without disrupting exams or audio recording.
 * 3. First-Visit Guard: Prevents unwanted reload flashes on a user's first visit.
 * 4. Foreground Re-check: Calls registration.update() on visibilitychange,
 *    pageshow, and online reconnect.
 * 5. Dynamic Chunk Error Self-Healing: Intercepts vite:preloadError with debounce.
 */

export const SW_UPDATE_EVENT = 'vstep:sw-update-available';
export const INITIAL_LOAD_WINDOW_MS = 8000;
const CHUNK_RELOAD_KEY = 'vstep_chunk_reload_ts';
const CHUNK_RELOAD_DEBOUNCE_MS = 8000;

// Record whether a controller existed at script evaluation time (before any new SW activates)
const hadControllerOnLoad =
  typeof navigator !== 'undefined' && 'serviceWorker' in navigator
    ? Boolean(navigator.serviceWorker.controller)
    : false;

let isReloading = false;
let isInitialized = false;

/**
 * Reset internal state for test isolation
 */
export function _resetStateForTesting(): void {
  isReloading = false;
  isInitialized = false;
}

/**
 * Force reload to apply the newly activated Service Worker
 */
export function applyAppUpdate(): void {
  if (typeof window !== 'undefined') {
    window.location.reload();
  }
}

/**
 * Handle Vite dynamic import / chunk fetch failures (e.g. 404 after deploy rotation)
 */
export function handleChunkPreloadError(event: Event): void {
  event.preventDefault();
  if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') {
    return;
  }

  const lastReload = Number(sessionStorage.getItem(CHUNK_RELOAD_KEY) || 0);
  const now = Date.now();

  if (now - lastReload > CHUNK_RELOAD_DEBOUNCE_MS) {
    sessionStorage.setItem(CHUNK_RELOAD_KEY, String(now));
    window.location.reload();
  }
}

/**
 * Evaluate controllerchange event: reload immediately if in initial load window,
 * otherwise notify the app for an in-session prompt.
 */
export function handleControllerChange(
  hadController: boolean = hadControllerOnLoad,
  elapsedMs: number = typeof performance !== 'undefined' ? performance.now() : 99999
): 'reloaded' | 'notified' | 'ignored' {
  // First visit guard: If there was no controller when the page loaded,
  // this controllerchange is the initial worker claiming clients. Never reload.
  if (!hadController) {
    return 'ignored';
  }

  if (isReloading) {
    return 'ignored';
  }

  // 1-Refresh Guarantee: user just opened or refreshed the page
  if (elapsedMs < INITIAL_LOAD_WINDOW_MS) {
    isReloading = true;
    applyAppUpdate();
    return 'reloaded';
  }

  // In-session protection: don't destroy active exam / practice state
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(SW_UPDATE_EVENT));
  }
  return 'notified';
}

/**
 * Initialize PWA Service Worker lifecycle management
 */
export function initPwaLifecycle(): void {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator) || isInitialized) {
    return;
  }

  isInitialized = true;

  // 1. Dynamic chunk preload failure self-healing
  window.addEventListener('vite:preloadError', handleChunkPreloadError);

  // 2. Controller change handler (new SW took over)
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    handleControllerChange(hadControllerOnLoad, performance.now());
  });

  // 3. Register service worker immediately (don't delay until window 'load')
  navigator.serviceWorker
    .register('/sw.js', { scope: '/' })
    .then((registration) => {
      // Proactively check for new build on the server
      registration.update().catch(() => {});

      // Check on tab focus / iOS standalone resume / reconnection
      const checkUpdate = () => {
        if (document.visibilityState === 'visible') {
          registration.update().catch(() => {});
        }
      };

      document.addEventListener('visibilitychange', checkUpdate);
      window.addEventListener('pageshow', checkUpdate);
      window.addEventListener('online', checkUpdate);

      // Periodic check every 60 minutes for standing tabs
      setInterval(() => {
        registration.update().catch(() => {});
      }, 60 * 60 * 1000);
    })
    .catch((error) => {
      console.warn('[PWA] ServiceWorker registration error:', error);
    });
}
