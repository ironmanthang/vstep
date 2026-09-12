#!/usr/bin/env node
/**
 * VSTEP Listening Stage 2 Enrichment
 * Uses pure text Gemini Flash models to format speaker dialogue and generate fluent Vietnamese translations.
 * 
 * Model cascade:
 *   gemini-3.8-flash -> gemini-3.7-flash -> gemini-3.6-flash -> gemini-3.5-flash-lite -> gemini-2.5-flash -> gemini-1.5-flash
 * 
 * Usage:
 *   node scripts/enrich_listening.mjs <intermediate_json_path> [options]
 * 
 * Options:
 *   --out <path>       Output path for enriched JSON (default: <path_without_ext>.enriched.json)
 *   --batch <size>     Number of segments per LLM call (default: 15)
 */

import fs from 'node:fs';
import path from 'node:path';

import './loadEnv.mjs';

const API_KEY = process.env.VITE_GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

const CANDIDATE_LLM_MODELS = [
  'gemini-3.8-flash',
  'gemini-3.7-flash',
  'gemini-3.6-flash',
  'gemini-3.5-flash-lite',
  'gemini-2.5-flash',
  'gemini-1.5-flash',
];

async function callGemini(model, prompt) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.1,
        responseMimeType: 'application/json',
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`HTTP ${res.status} (${model}): ${errText}`);
  }

  const data = await res.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) {
    throw new Error(`Empty response from ${model}`);
  }
  return JSON.parse(rawText);
}

async function enrichBatch(segments) {
  const prompt = `You are an expert English-Vietnamese translator and linguist specializing in the standardized VSTEP examination.

Task:
1. Format English text into clean dialogue turns if multiple speakers are present (use "Man: ...\\nWoman: ...", "Announcer: ...", etc.).
2. Provide fluent, natural Vietnamese translations matching the tone of authentic exam dialogues and academic lectures.
3. Preserve the exact segment "id" so timing can be mapped 1-to-1.

Input Segments:
${JSON.stringify(segments.map(s => ({ id: s.id, text: s.text_en })), null, 2)}

Respond with a JSON array of objects:
[
  {
    "id": 0,
    "text_en": "Formatted English dialogue",
    "text_vi": "Bản dịch tiếng Việt tự nhiên",
    "speaker": "Speaker tag (e.g. Announcer, Man, Woman, Professor)"
  }
]`;

  for (const model of CANDIDATE_LLM_MODELS) {
    try {
      const result = await callGemini(model, prompt);
      if (Array.isArray(result) && result.length > 0) {
        return result;
      }
    } catch (err) {
      console.warn(`[Stage 2] Model ${model} failed (${err.message}). Trying next fallback...`);
    }
  }

  throw new Error('All candidate Gemini Flash models failed or exhausted quotas.');
}

async function main() {
  const args = process.argv.slice(2);
  const inputPath = args[0];

  if (!inputPath || inputPath.startsWith('--')) {
    console.error('Usage: node scripts/enrich_listening.mjs <intermediate_json_path> [--out <output.json>]');
    process.exit(1);
  }

  if (!API_KEY) {
    console.error('Error: VITE_GEMINI_API_KEY or GOOGLE_API_KEY not found in environment.');
    process.exit(1);
  }

  if (!fs.existsSync(inputPath)) {
    console.error(`Error: File not found: ${inputPath}`);
    process.exit(1);
  }

  const rawData = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  const segments = rawData.segments || [];

  console.log(`[Stage 2] Processing ${segments.length} segments from ${inputPath}...`);

  const BATCH_SIZE = 15;
  const enrichedMap = new Map();

  for (let i = 0; i < segments.length; i += BATCH_SIZE) {
    const chunk = segments.slice(i, i + BATCH_SIZE);
    const chunkIdx = Math.floor(i / BATCH_SIZE) + 1;
    const totalChunks = Math.ceil(segments.length / BATCH_SIZE);

    console.log(`[Stage 2] Translating batch ${chunkIdx}/${totalChunks} (segments ${i} to ${i + chunk.length - 1})...`);
    const enrichedChunk = await enrichBatch(chunk);

    for (const item of enrichedChunk) {
      enrichedMap.set(item.id, item);
    }
  }

  const finalTranscript = segments.map((orig) => {
    const enriched = enrichedMap.get(orig.id) || {};
    return {
      start_ms: orig.start_ms,
      end_ms: orig.end_ms,
      text_en: enriched.text_en || orig.text_en,
      text_vi: enriched.text_vi || '',
      speaker: enriched.speaker || '',
      is_clue_for_question: orig.is_clue_for_question || '',
    };
  });

  const outIndex = args.indexOf('--out');
  let outPath = outIndex !== -1 ? args[outIndex + 1] : null;
  if (!outPath) {
    const parsed = path.parse(inputPath);
    outPath = path.join(parsed.dir, `${parsed.name.replace('.intermediate', '')}.enriched.json`);
  }

  const finalResult = {
    audio_path: rawData.audio_path,
    duration_seconds: rawData.duration_seconds,
    transcript: finalTranscript,
  };

  fs.writeFileSync(outPath, JSON.stringify(finalResult, null, 2), 'utf-8');
  console.log(`\n[Stage 2 Complete] Enriched ${finalTranscript.length} segments.`);
  console.log(`Output written to: ${outPath}`);
}

main().catch((err) => {
  console.error('[Stage 2 Error]', err);
  process.exit(1);
});
