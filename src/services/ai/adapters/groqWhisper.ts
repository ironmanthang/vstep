// Groq Cloud Whisper Service Adapter (whisper-large-v3-turbo)
import type { AudioTranscriptionResult } from '../types';
import { masterKeyPool } from '../masterKeys';

export const DEFAULT_GROQ_WHISPER_MODEL = 'whisper-large-v3-turbo';
const GROQ_AUDIO_ENDPOINT = 'https://api.groq.com/openai/v1/audio/transcriptions';

export async function transcribeWithGroq(
  audioBlob: Blob,
  customApiKey?: string
): Promise<AudioTranscriptionResult> {
  const startTime = performance.now();
  const apiKey = customApiKey || masterKeyPool.getKey('groq');

  if (!apiKey) {
    throw new Error('Không tìm thấy Groq API Key để phiên âm âm thanh');
  }

  const formData = new FormData();
  const extension = audioBlob.type.includes('mp4') ? 'mp4' : 'webm';
  formData.append('file', audioBlob, `recording.${extension}`);
  formData.append('model', DEFAULT_GROQ_WHISPER_MODEL);
  formData.append('response_format', 'verbose_json');
  formData.append('temperature', '0.0');

  const res = await fetch(GROQ_AUDIO_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: formData,
  });

  const latencyMs = Math.round(performance.now() - startTime);

  if (!res.ok) {
    if (res.status === 429) {
      masterKeyPool.markRateLimited(apiKey);
    }
    const errorText = await res.text().catch(() => '');
    throw new Error(`Groq Whisper HTTP ${res.status}: ${errorText || res.statusText}`);
  }

  const data = await res.json();
  const text = (data.text || '').trim();
  const duration = typeof data.duration === 'number' ? data.duration : undefined;
  const words = Array.isArray(data.words)
    ? data.words.map((w: { word: string; start: number; end: number }) => ({
        word: w.word,
        start: w.start,
        end: w.end,
      }))
    : undefined;

  return {
    text,
    duration,
    words,
    providerUsed: 'groq',
    latencyMs,
  };
}
