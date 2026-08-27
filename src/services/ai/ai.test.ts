import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  masterKeyPool,
  testAIConnection,
  generateAICompletion,
  getEffectiveAIConfig,
  saveDeveloperAIOverride,
  clearDeveloperAIOverride,
  getAIGatewayStatus,
  getDefaultMasterConfig,
} from './index';
import type { AIProviderConfig, AICompletionRequest } from './types';

describe('AI Master Gateway & Service Layer Test Suite', () => {
  const originalFetch = globalThis.fetch;
  const store = new Map<string, string>();

  beforeEach(() => {
    store.clear();
    // In-memory mock for localStorage in node environment
    const mockStorage = {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, val: string) => { store.set(key, String(val)); },
      removeItem: (key: string) => { store.delete(key); },
      clear: () => { store.clear(); },
      length: store.size,
      key: () => null,
    };
    Object.defineProperty(globalThis, 'localStorage', {
      value: mockStorage,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(globalThis, 'window', {
      value: globalThis,
      writable: true,
      configurable: true,
    });

    masterKeyPool.reset();
    masterKeyPool.setPool('openrouter', ['test-or-key-1', 'test-or-key-2']);
    masterKeyPool.setPool('ollama_cloud', ['test-ollama-key-1', 'test-ollama-key-2']);
    clearDeveloperAIOverride();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  describe('Master Key Pool & Rotation', () => {
    it('provides keys for openrouter and ollama_cloud pools', () => {
      const openrouterKey = masterKeyPool.getKey('openrouter');
      const ollamaKey = masterKeyPool.getKey('ollama_cloud');

      expect(openrouterKey).toBe('test-or-key-1');
      expect(ollamaKey).toBe('test-ollama-key-1');
      expect(masterKeyPool.getPoolSize('openrouter')).toBe(2);
      expect(masterKeyPool.getPoolSize('ollama_cloud')).toBe(2);
    });

    it('rotates to next key when key is marked rate limited (HTTP 429)', () => {
      const key1 = masterKeyPool.getKey('openrouter');
      masterKeyPool.markRateLimited(key1, 60000);

      const key2 = masterKeyPool.getKey('openrouter');
      expect(key2).not.toBe(key1);
    });
  });

  describe('OpenRouter Adapter', () => {
    it('successfully pings OpenRouter connection', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          data: { label: 'VSTEP Master Key', limit: 100 },
        }),
      });

      const result = await testAIConnection({
        provider: 'openrouter',
        modelName: 'anthropic/claude-3.5-sonnet',
      });

      expect(result.success).toBe(true);
      expect(result.message).toContain('Kết nối OpenRouter thành công');
      expect(result.provider).toBe('openrouter');
      expect(result.latencyMs).toBeGreaterThanOrEqual(0);
    });

    it('handles 401 unauthorized gracefully', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 401,
      });

      const result = await testAIConnection({
        provider: 'openrouter',
        apiKey: 'invalid_key',
        modelName: 'anthropic/claude-3.5-sonnet',
      });

      expect(result.success).toBe(false);
      expect(result.message).toContain('401');
    });

    it('generates chat completion and parses structured JSON', async () => {
      const mockScoreJson = {
        task_fulfillment: 7.5,
        organization: 7.0,
        vocabulary: 7.0,
        grammar: 6.5,
        vietlish_detected: [],
      };

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          choices: [
            {
              message: {
                content: JSON.stringify(mockScoreJson),
              },
            },
          ],
        }),
      });

      const request: AICompletionRequest = {
        systemPrompt: 'You are a VSTEP examiner.',
        userPrompt: 'Grade this essay.',
        responseSchema: { type: 'object' },
      };

      const response = await generateAICompletion(request, {
        provider: 'openrouter',
        modelName: 'anthropic/claude-3.5-sonnet',
      });

      expect(response.providerUsed).toBe('openrouter');
      expect(response.modelUsed).toBe('anthropic/claude-3.5-sonnet');
      expect(response.parsedJson).toEqual(mockScoreJson);
    });
  });

  describe('Ollama Adapter', () => {
    it('successfully tests Ollama endpoint with model list', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          models: [{ name: 'qwen2.5:latest' }, { name: 'llama3:latest' }],
        }),
      });

      const result = await testAIConnection({
        provider: 'ollama_cloud',
        modelName: 'qwen2.5',
      });

      expect(result.success).toBe(true);
      expect(result.message).toContain('2 models có sẵn');
    });

    it('generates chat completion from Ollama', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          message: {
            content: '{"overall_band": "B2"}',
          },
        }),
      });

      const request: AICompletionRequest = {
        systemPrompt: 'System',
        userPrompt: 'User',
      };

      const response = await generateAICompletion(request, {
        provider: 'ollama_cloud',
        modelName: 'qwen2.5',
      });

      expect(response.providerUsed).toBe('ollama_cloud');
      expect(response.parsedJson).toEqual({ overall_band: 'B2' });
    });
  });

  describe('Google AI Studio Adapter', () => {
    it('successfully tests Google AI Studio models endpoint', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          models: [{ name: 'models/gemini-2.0-flash' }],
        }),
      });

      const result = await testAIConnection({
        provider: 'google_ai_studio',
        apiKey: 'AIzaSyFakeKeyTest',
        modelName: 'gemini-2.0-flash',
      });

      expect(result.success).toBe(true);
      expect(result.message).toContain('Google AI Studio (Gemini) thành công');
    });

    it('generates completion with system instructions and candidates extraction', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          candidates: [
            {
              content: {
                parts: [{ text: 'Google Gemini Evaluation Result' }],
              },
            },
          ],
        }),
      });

      const request: AICompletionRequest = {
        systemPrompt: 'VSTEP Rules',
        userPrompt: 'Sample essay',
      };

      const response = await generateAICompletion(request, {
        provider: 'google_ai_studio',
        apiKey: 'AIzaSyFakeKeyTest',
        modelName: 'gemini-2.0-flash',
      });

      expect(response.providerUsed).toBe('google_ai_studio');
      expect(response.content).toBe('Google Gemini Evaluation Result');
    });
  });

  describe('Configuration & Developer Override State', () => {
    it('defaults to Master OpenRouter configuration', () => {
      const config = getEffectiveAIConfig();
      expect(config.provider).toBe('openrouter');
      expect(config.isCustomOverride).toBe(false);
    });

    it('persists and respects developer override settings', () => {
      const customConfig: AIProviderConfig = {
        provider: 'ollama_local',
        baseUrl: 'http://127.0.0.1:11434',
        modelName: 'qwen2.5:14b',
        isCustomOverride: true,
      };

      saveDeveloperAIOverride(customConfig);

      const effective = getEffectiveAIConfig();
      expect(effective.provider).toBe('ollama_local');
      expect(effective.baseUrl).toBe('http://127.0.0.1:11434');
      expect(effective.modelName).toBe('qwen2.5:14b');
      expect(effective.isCustomOverride).toBe(true);

      const status = getAIGatewayStatus();
      expect(status.isOverrideActive).toBe(true);
      expect(status.activeProvider).toBe('ollama_local');

      clearDeveloperAIOverride();
      expect(getEffectiveAIConfig()).toEqual(getDefaultMasterConfig());
    });

    it('falls back to alternate provider when primary gateway fails on default mode', async () => {
      let callCount = 0;
      globalThis.fetch = vi.fn().mockImplementation(async (url: string) => {
        callCount++;
        // First call fails (e.g. OpenRouter server error 500)
        if (url.includes('openrouter.ai')) {
          return {
            ok: false,
            status: 500,
            statusText: 'Internal Server Error',
            text: async () => 'Service Unavailable',
          };
        }
        // Fallback call to Ollama succeeds
        return {
          ok: true,
          status: 200,
          json: async () => ({
            message: { content: 'Fallback Response' },
          }),
        };
      });

      const request: AICompletionRequest = {
        systemPrompt: 'System',
        userPrompt: 'User',
      };

      const response = await generateAICompletion(request);
      expect(callCount).toBeGreaterThanOrEqual(2);
      expect(response.providerUsed).toBe('ollama_cloud');
      expect(response.content).toBe('Fallback Response');
    });
  });
});
