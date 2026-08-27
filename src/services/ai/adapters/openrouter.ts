// OpenRouter AI Service Adapter
import type { AIProviderConfig, AICompletionRequest, AICompletionResponse, AITestConnectionResult } from '../types';
import { masterKeyPool } from '../masterKeys';

const DEFAULT_BASE_URL = 'https://openrouter.ai/api/v1';
export const DEFAULT_OPENROUTER_MODEL = 'anthropic/claude-3.5-sonnet';

export async function testOpenRouterConnection(config: AIProviderConfig): Promise<AITestConnectionResult> {
  const startTime = performance.now();
  const apiKey = config.apiKey || masterKeyPool.getKey('openrouter');
  const baseUrl = config.baseUrl?.replace(/\/$/, '') || DEFAULT_BASE_URL;

  if (!apiKey) {
    return {
      success: false,
      message: 'Không tìm thấy API Key cho OpenRouter',
      latencyMs: 0,
      provider: 'openrouter',
      model: config.modelName || DEFAULT_OPENROUTER_MODEL,
    };
  }

  try {
    const res = await fetch(`${baseUrl}/auth/key`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://vstep.app',
        'X-Title': 'VSTEP Master PWA',
      },
    });

    const latencyMs = Math.round(performance.now() - startTime);

    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      const label = data?.data?.label || 'Active';
      const limit = data?.data?.limit != null ? ` (Hạn mức: $${data.data.limit})` : '';
      return {
        success: true,
        message: `Kết nối OpenRouter thành công [${label}${limit}]`,
        latencyMs,
        provider: 'openrouter',
        model: config.modelName || DEFAULT_OPENROUTER_MODEL,
      };
    }

    if (res.status === 401) {
      return {
        success: false,
        message: 'OpenRouter API Key không hợp lệ hoặc đã bị thu hồi (401)',
        latencyMs,
        provider: 'openrouter',
        model: config.modelName || DEFAULT_OPENROUTER_MODEL,
      };
    }

    if (res.status === 429) {
      masterKeyPool.markRateLimited(apiKey);
      return {
        success: false,
        message: 'OpenRouter API bị giới hạn tốc độ (Rate Limit 429)',
        latencyMs,
        provider: 'openrouter',
        model: config.modelName || DEFAULT_OPENROUTER_MODEL,
      };
    }

    return {
      success: false,
      message: `OpenRouter trả về mã lỗi HTTP ${res.status}`,
      latencyMs,
      provider: 'openrouter',
      model: config.modelName || DEFAULT_OPENROUTER_MODEL,
    };
  } catch (err: unknown) {
    const latencyMs = Math.round(performance.now() - startTime);
    const errorMessage = err instanceof Error ? err.message : 'Lỗi kết nối mạng';
    return {
      success: false,
      message: `Không thể kết nối tới OpenRouter: ${errorMessage}`,
      latencyMs,
      provider: 'openrouter',
      model: config.modelName || DEFAULT_OPENROUTER_MODEL,
    };
  }
}

export async function generateOpenRouterCompletion(
  config: AIProviderConfig,
  request: AICompletionRequest
): Promise<AICompletionResponse> {
  const startTime = performance.now();
  const apiKey = config.apiKey || masterKeyPool.getKey('openrouter');
  const baseUrl = config.baseUrl?.replace(/\/$/, '') || DEFAULT_BASE_URL;
  const model = config.modelName || DEFAULT_OPENROUTER_MODEL;

  if (!apiKey) {
    throw new Error('Không tìm thấy OpenRouter API Key');
  }

  const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [];
  if (request.systemPrompt) {
    messages.push({ role: 'system', content: request.systemPrompt });
  }
  messages.push({ role: 'user', content: request.userPrompt });

  const payload: Record<string, unknown> = {
    model,
    messages,
    temperature: request.temperature ?? 0.1,
    max_tokens: request.maxTokens ?? 2048,
  };

  if (request.responseSchema) {
    payload.response_format = { type: 'json_object' };
  }

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://vstep.app',
      'X-Title': 'VSTEP Master PWA',
    },
    body: JSON.stringify(payload),
  });

  const latencyMs = Math.round(performance.now() - startTime);

  if (!res.ok) {
    if (res.status === 429) {
      masterKeyPool.markRateLimited(apiKey);
    }
    const errorBody = await res.text().catch(() => '');
    throw new Error(`OpenRouter HTTP ${res.status}: ${errorBody || res.statusText}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content || '';

  let parsedJson: unknown;
  if (request.responseSchema || content.trim().startsWith('{')) {
    try {
      parsedJson = JSON.parse(content);
    } catch {
      // Keep as undefined if parsing fails
    }
  }

  return {
    content,
    parsedJson,
    providerUsed: 'openrouter',
    modelUsed: model,
    latencyMs,
  };
}
