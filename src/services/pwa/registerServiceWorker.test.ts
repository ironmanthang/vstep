import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  handleControllerChange,
  handleChunkPreloadError,
  SW_UPDATE_EVENT,
  INITIAL_LOAD_WINDOW_MS,
  _resetStateForTesting,
} from './registerServiceWorker';

describe('registerServiceWorker lifecycle coordinator', () => {
  const sessionStore = new Map<string, string>();
  const reloadMock = vi.fn();
  const eventListeners = new Map<string, Set<(e: any) => void>>();

  beforeEach(() => {
    vi.restoreAllMocks();
    sessionStore.clear();
    reloadMock.mockReset();
    eventListeners.clear();
    _resetStateForTesting();

    // Mock sessionStorage on globalThis
    Object.defineProperty(globalThis, 'sessionStorage', {
      value: {
        getItem: (k: string) => sessionStore.get(k) ?? null,
        setItem: (k: string, v: string) => sessionStore.set(k, String(v)),
        removeItem: (k: string) => sessionStore.delete(k),
        clear: () => sessionStore.clear(),
      },
      writable: true,
      configurable: true,
    });

    // Mock window on globalThis
    const mockWindow = {
      location: { reload: reloadMock },
      addEventListener: (event: string, cb: (e: any) => void) => {
        if (!eventListeners.has(event)) eventListeners.set(event, new Set());
        eventListeners.get(event)!.add(cb);
      },
      removeEventListener: (event: string, cb: (e: any) => void) => {
        eventListeners.get(event)?.delete(cb);
      },
      dispatchEvent: (event: any) => {
        const cbs = eventListeners.get(event.type);
        if (cbs) {
          for (const cb of cbs) {
            cb(event);
          }
        }
        return true;
      },
    };

    Object.defineProperty(globalThis, 'window', {
      value: mockWindow,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    sessionStore.clear();
  });

  describe('handleControllerChange', () => {
    it('ignores controllerchange on first visit when there was no initial controller', () => {
      const result = handleControllerChange(false, 500);
      expect(result).toBe('ignored');
      expect(reloadMock).not.toHaveBeenCalled();
    });

    it('triggers immediate reload during initial load phase (< 8000ms)', () => {
      const result = handleControllerChange(true, 1500);
      expect(result).toBe('reloaded');
      expect(reloadMock).toHaveBeenCalledTimes(1);
    });

    it('dispatches SW_UPDATE_EVENT instead of reloading when in-session (>= 8000ms)', () => {
      const updateListener = vi.fn();
      window.addEventListener(SW_UPDATE_EVENT, updateListener);

      const result = handleControllerChange(true, INITIAL_LOAD_WINDOW_MS + 2000);
      expect(result).toBe('notified');
      expect(reloadMock).not.toHaveBeenCalled();
      expect(updateListener).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleChunkPreloadError', () => {
    it('prevents default and triggers single reload on chunk load failure', () => {
      const event = new Event('vite:preloadError', { cancelable: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      handleChunkPreloadError(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(reloadMock).toHaveBeenCalledTimes(1);
      expect(sessionStorage.getItem('vstep_chunk_reload_ts')).not.toBeNull();
    });

    it('debounces rapid consecutive chunk preload errors to prevent infinite reload loop', () => {
      // Simulate a reload that just happened 1 second ago
      sessionStorage.setItem('vstep_chunk_reload_ts', String(Date.now() - 1000));

      const event = new Event('vite:preloadError', { cancelable: true });
      handleChunkPreloadError(event);

      // Should not call reload again within debounce window
      expect(reloadMock).not.toHaveBeenCalled();
    });
  });
});
