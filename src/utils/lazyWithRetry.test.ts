import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { lazyWithRetry, createLazyRetryLoader } from './lazyWithRetry';

describe('lazyWithRetry dynamic import helper', () => {
  const sessionStore = new Map<string, string>();
  const reloadMock = vi.fn();

  beforeEach(() => {
    vi.restoreAllMocks();
    sessionStore.clear();
    reloadMock.mockReset();

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

    Object.defineProperty(globalThis, 'window', {
      value: {
        location: { reload: reloadMock },
      },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    sessionStore.clear();
  });

  it('creates a lazy component wrapping the retry loader', () => {
    const MockComponent: React.FC = () => React.createElement('div', null, 'Mock Content');
    const factory = vi.fn().mockResolvedValue({ default: MockComponent });

    const LazyComponent = lazyWithRetry(factory, 'test_component');
    expect(LazyComponent).toBeDefined();
    expect(typeof LazyComponent).toBe('object');
  });

  it('loader successfully resolves when factory succeeds', async () => {
    const MockComponent: React.FC = () => React.createElement('div', null, 'Mock Content');
    const factory = vi.fn().mockResolvedValue({ default: MockComponent });

    const loader = createLazyRetryLoader(factory, 'test_chunk');
    const result = await loader();

    expect(result.default).toBe(MockComponent);
    expect(factory).toHaveBeenCalledTimes(1);
  });

  it('loader triggers a single reload and returns pending promise when dynamic import fails', async () => {
    const error = new Error('Failed to fetch dynamically imported module');
    const factory = vi.fn().mockRejectedValue(error);

    const loader = createLazyRetryLoader(factory, 'test_fail_chunk');
    const pendingPromise = loader();

    // Allow microtask queue to process rejection
    await new Promise((r) => setTimeout(r, 10));

    // Verify reload was invoked
    expect(reloadMock).toHaveBeenCalledTimes(1);
    expect(sessionStorage.getItem('vstep_lazy_retry_test_fail_chunk')).toBe('true');

    // The promise should remain pending while reload occurs
    let resolved = false;
    pendingPromise.then(() => {
      resolved = true;
    });
    await new Promise((r) => setTimeout(r, 20));
    expect(resolved).toBe(false);
  });

  it('loader throws the error on second consecutive failure instead of looping', async () => {
    // Simulate that a reload was already attempted
    sessionStorage.setItem('vstep_lazy_retry_loop_chunk', 'true');

    const error = new Error('Persistent network error');
    const factory = vi.fn().mockRejectedValue(error);

    const loader = createLazyRetryLoader(factory, 'loop_chunk');

    await expect(loader()).rejects.toThrow('Persistent network error');
    expect(reloadMock).not.toHaveBeenCalled();
    expect(sessionStorage.getItem('vstep_lazy_retry_loop_chunk')).toBeNull();
  });
});
