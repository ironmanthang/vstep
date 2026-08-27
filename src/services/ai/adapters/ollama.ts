// Ollama AI Service Adapter (Supports Local Endpoints & Ollama Cloud with API Key)
import type { AIProviderConfig, AICompletionRequest, AICompletionResponse, AITestConnectionResult } from '../types';
import { masterKeyPool } from '../masterKeys';

const DEFAULT_LOCAL_URL = 'http://localhost:11434';
const DEFAULT_CLOUD_URL = 'https://ollama.ai'; // Or custom Ollama gateway
export const DEFAULT_OLLAMA_MODEL = 'qwen2.5';

export async function testOllamaConnection(config: AIProviderConfig): Promise<AITestConnectionResult> {
  const startTime = performance.now();
  const isCloud = config.provider === 'ollama_cloud';
  const apiKey = config.apiKey || (isCloud ? masterKeyPool.getKey('ollama_cloud') : '');
  const baseUrl = (config.baseUrl || (isCloud ? DEFAULT_CLOUD_URL : DEFAULT_LOCAL_URL)).replace(/\/$/, '');
  const model = config.modelName || DEFAULT_OLLAMA_MODEL;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }

  try {
    // Try fetching /api/tags or /api/version
    const res = await fetch(`${baseUrl}/api/tags`, {
      method: 'GET',
      headers,
    });

    const latencyMs = Math.round(performance.now() - startTime);

    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      const modelsCount = Array.isArray(data?.models) ? data.models.length : 0;
      return {
        success: true,
        message: `Kết nối Ollama thành công (${modelsCount} models có sẵn)`,
        latencyMs,
        provider: config.provider,
        model,
      };
    }

    if (res.status === 401 || res.status === 403) {
      return {
        success: false,
        message: 'Ollama API Key không có quyền truy cập (401/403)',
        latencyMs,
        provider: config.provider,
        model,
      };
    }

    return {
      success: false,
      message: `Ollama trả về mã lỗi HTTP ${res.status}`,
      latencyMs,
      provider: config.provider,
      model,
    };
  } catch (err: unknown) {
    const latencyMs = Math.round(performance.now() - startTime);
    const errorMessage = err instanceof Error ? err.message : 'Lỗi kết nối';
    const corsHint = !isCloud ? ' (Hãy đảm bảo Ollama đang chạy và cấu hình OLLAMA_ORIGINS="*" nếu chạy trên trình duyệt)' : '';

    return {
      success: false,
      message: `Không thể kết nối tới Ollama: ${errorMessage}${corsHint}`,
      latencyMs,
      provider: config.provider,
      model,
    };
  }
}

export async function generateOllamaCompletion(
  config: AIProviderConfig,
  request: AICompletionRequest
): Promise<AICompletionResponse> {
  const startTime = performance.now();
  const isCloud = config.provider === 'ollama_cloud';
  const apiKey = config.apiKey || (isCloud ? masterKeyPool.getKey('ollama_cloud') : '');
  const baseUrl = (config.baseUrl || (isCloud ? DEFAULT_CLOUD_URL : DEFAULT_LOCAL_URL)).replace(/\/$/, '');
  const model = config.modelName || DEFAULT_OLLAMA_MODEL;

  const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [];
  if (request.systemPrompt) {
    messages.push({ role: 'system', content: request.systemPrompt });
  }
  messages.push({ role: 'user', content: request.userPrompt });

  const payload: Record<string, unknown> = {
    model,
    messages,
    stream: false,
    options: {
      temperature: request.temperature ?? 0.1,
    },
  };

  if (request.responseSchema) {
    payload.format = 'json';
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }

  const res = await fetch(`${baseUrl}/api/chat`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  const latencyMs = Math.round(performance.now() - startTime);

  if (!res.ok) {
    if (res.status === 429 && apiKey) {
      masterKeyPool.markRateLimited(apiKey);
    }
    const errorBody = await res.text().catch(() => '');
    throw new Error(`Ollama HTTP ${res.status}: ${errorBody || res.statusText}`);
  }

  const data = await res.json();
  const content = data?.message?.content || '';

  let parsedJson: unknown;
  if (request.responseSchema || content.trim().startsWith('{')) {
    try {
      parsedJson = JSON.parse(content);
    } catch {
      // Ignore parse failure
    }
  }

  return {
    content,
    parsedJson,
    providerUsed: config.provider,
    modelUsed: model,
    latencyMs,
  };
}
