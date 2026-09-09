// Google AI Studio (Gemini REST API) Service Adapter
import type { AIProviderConfig, AICompletionRequest, AICompletionResponse, AITestConnectionResult } from '../types';
import { masterKeyPool } from '../masterKeys';

export const DEFAULT_GOOGLE_MODEL = 'gemini-3.5-flash-lite';
const GOOGLE_API_BASE = 'https://generativelanguage.googleapis.com/v1beta';

/**
 * Helper to convert a Blob to base64 string for audio payloads
 */
async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const base64Data = result.split(',')[1] || '';
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function testGoogleAIConnection(config: AIProviderConfig): Promise<AITestConnectionResult> {
  const startTime = performance.now();
  const apiKey = config.apiKey || masterKeyPool.getKey('google_ai_studio');
  const model = config.modelName || DEFAULT_GOOGLE_MODEL;

  if (!apiKey) {
    return {
      success: false,
      message: 'Không tìm thấy API Key cho Google AI Studio',
      latencyMs: 0,
      provider: 'google_ai_studio',
      model,
    };
  }

  try {
    const res = await fetch(`${GOOGLE_API_BASE}/models?key=${encodeURIComponent(apiKey)}`, {
      method: 'GET',
    });

    const latencyMs = Math.round(performance.now() - startTime);

    if (res.ok) {
      return {
        success: true,
        message: 'Kết nối Google AI Studio (Gemini) thành công',
        latencyMs,
        provider: 'google_ai_studio',
        model,
      };
    }

    if (res.status === 400 || res.status === 403) {
      return {
        success: false,
        message: 'Google AI Studio API Key không hợp lệ hoặc bị chặn (400/403)',
        latencyMs,
        provider: 'google_ai_studio',
        model,
      };
    }

    if (res.status === 429) {
      masterKeyPool.markRateLimited(apiKey);
      return {
        success: false,
        message: 'Google AI Studio bị giới hạn tốc độ (Rate Limit 429)',
        latencyMs,
        provider: 'google_ai_studio',
        model,
      };
    }

    return {
      success: false,
      message: `Google AI Studio trả về mã lỗi HTTP ${res.status}`,
      latencyMs,
      provider: 'google_ai_studio',
      model,
    };
  } catch (err: unknown) {
    const latencyMs = Math.round(performance.now() - startTime);
    const errorMessage = err instanceof Error ? err.message : 'Lỗi kết nối';
    return {
      success: false,
      message: `Không thể kết nối tới Google AI Studio: ${errorMessage}`,
      latencyMs,
      provider: 'google_ai_studio',
      model,
    };
  }
}

export async function generateGoogleAICompletion(
  config: AIProviderConfig,
  request: AICompletionRequest
): Promise<AICompletionResponse> {
  const startTime = performance.now();
  const apiKey = config.apiKey || masterKeyPool.getKey('google_ai_studio');
  const model = config.modelName || DEFAULT_GOOGLE_MODEL;

  if (!apiKey) {
    throw new Error('Không tìm thấy Google AI Studio API Key');
  }

  const parts: Array<Record<string, unknown>> = [];

  if (request.audioBlob) {
    const base64Data = await blobToBase64(request.audioBlob);
    parts.push({
      inlineData: {
        mimeType: request.audioBlob.type || 'audio/webm',
        data: base64Data,
      },
    });
  }

  parts.push({ text: request.userPrompt });

  const payload: Record<string, unknown> = {
    contents: [
      {
        role: 'user',
        parts,
      },
    ],
    generationConfig: {
      temperature: request.temperature ?? 0.1,
    },
  };

  if (request.systemPrompt) {
    payload.systemInstruction = {
      parts: [{ text: request.systemPrompt }],
    };
  }

  if (request.responseSchema) {
    (payload.generationConfig as Record<string, unknown>).responseMimeType = 'application/json';
    (payload.generationConfig as Record<string, unknown>).responseSchema = request.responseSchema;
  }

  const endpoint = `${GOOGLE_API_BASE}/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const latencyMs = Math.round(performance.now() - startTime);

  if (!res.ok) {
    if (res.status === 429) {
      masterKeyPool.markRateLimited(apiKey);
    }
    const errorBody = await res.text().catch(() => '');
    throw new Error(`Google AI Studio HTTP ${res.status}: ${errorBody || res.statusText}`);
  }

  const data = await res.json();
  const content = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

  let parsedJson: unknown;
  if (request.responseSchema || content.trim().startsWith('{')) {
    try {
      parsedJson = JSON.parse(content);
    } catch {
      // Ignore JSON parse failure
    }
  }

  return {
    content,
    parsedJson,
    providerUsed: 'google_ai_studio',
    modelUsed: model,
    latencyMs,
  };
}
