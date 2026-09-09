#!/usr/bin/env node
/**
 * VSTEP Audio Transcriber
 * Uses Gemini 3.5 Transcribe to generate a full verbatim transcription of audio.
 * Saves the output as a .txt file in the same directory as the audio.
 * 
 * Usage:
 *   node scripts/detect-boundaries.mjs <path-to-audio>
 */

import fs from 'fs';
import path from 'path';

if (typeof process.loadEnvFile === 'function') {
  try {
    process.loadEnvFile();
  } catch {}
}

const API_KEY = process.env.VITE_GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const MODEL_NAME = 'gemini-3.5-transcribe';
const FILE_UPLOAD_ENDPOINT = `https://generativelanguage.googleapis.com/upload/v1beta/files?key=${API_KEY}`;
const INTERACTIONS_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/interactions?key=${API_KEY}`;

async function uploadAudio(audioPath, audioBuffer) {
  const startResponse = await fetch(FILE_UPLOAD_ENDPOINT, {
    method: 'POST',
    headers: {
      'X-Goog-Upload-Protocol': 'resumable',
      'X-Goog-Upload-Command': 'start',
      'X-Goog-Upload-Header-Content-Length': String(audioBuffer.length),
      'X-Goog-Upload-Header-Content-Type': 'audio/mp3',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ file: { display_name: path.basename(audioPath) } }),
  });

  if (!startResponse.ok) {
    throw new Error(`File upload initialization failed: HTTP ${startResponse.status}: ${await startResponse.text()}`);
  }

  const uploadUrl = startResponse.headers.get('x-goog-upload-url');
  if (!uploadUrl) {
    throw new Error('File upload initialization did not return an upload URL.');
  }

  const uploadResponse = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Length': String(audioBuffer.length),
      'X-Goog-Upload-Offset': '0',
      'X-Goog-Upload-Command': 'upload, finalize',
      'Content-Type': 'audio/mp3',
    },
    body: audioBuffer,
  });

  if (!uploadResponse.ok) {
    throw new Error(`Audio upload failed: HTTP ${uploadResponse.status}: ${await uploadResponse.text()}`);
  }

  return (await uploadResponse.json()).file;
}

function formatOffset(offset) {
  const seconds = typeof offset === 'string'
    ? Number.parseFloat(offset.replace(/s$/, ''))
    : Number(offset);
  if (!Number.isFinite(seconds)) return String(offset ?? '');

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = (seconds % 60).toFixed(2).padStart(5, '0');
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds}`;
}

async function main() {
  const audioPath = process.argv[2];
  if (!audioPath) {
    console.error('Error: Please provide the path to the audio file.');
    process.exit(1);
  }

  if (!API_KEY) {
    console.error('Error: API key not found.');
    process.exit(1);
  }

  console.log(`[Boundary] Analyzing: ${audioPath}...`);

  const audioBuffer = fs.readFileSync(audioPath);
  try {
    console.log('[Debug] Uploading audio through the Gemini Files API...');
    const uploadedFile = await uploadAudio(audioPath, audioBuffer);

    const res = await fetch(INTERACTIONS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL_NAME,
        input: [{
          type: 'audio',
          uri: uploadedFile.uri,
          mime_type: uploadedFile.mime_type || 'audio/mp3',
        }],
        generation_config: {
          transcription_config: {
            mode: {
              type: 'verbatim',
              timestamp_granularities: ['word'],
            },
          },
        },
        store: false,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`HTTP ${res.status}: ${err}`);
    }

    const data = await res.json();
    const stepContents = (data.steps || [])
      .flatMap((step) => step.content || []);
    const rawText = data.output_text
      || (data.outputs || [])
        .filter((output) => output.type === 'text')
        .map((output) => output.text)
        .filter(Boolean)
        .join('')
      || stepContents
        .map((content) => content.text)
        .filter(Boolean)
        .join('');

    if (!rawText) {
      console.error('[Error] No output_text found in interaction response:', JSON.stringify(data));
      process.exit(1);
    }

    let finalContent = rawText;
    const annotations = stepContents
      .flatMap((content) => content.annotations || [])
      .filter((annotation) => annotation.type === 'word_info');

    if (annotations.length > 0) {
      console.log('[Debug] Formatting word-level timestamps...');
      finalContent = annotations
        .map((annotation) => {
          const speaker = annotation.speaker ? `[${annotation.speaker}] ` : '';
          const start = formatOffset(annotation.start_offset);
          const end = formatOffset(annotation.end_offset);
          return `[${start} -> ${end}] ${speaker}${annotation.text}`;
        })
        .join('\n');
    } else {
      console.warn('[Warning] The interaction returned text but no word_info annotations.');
    }

    const transcriptPath = audioPath.replace(path.extname(audioPath), '.txt');
    fs.writeFileSync(transcriptPath, finalContent, 'utf8');

    console.log('\n=== Transcription Complete ===');
    console.log(`Transcript saved to: ${transcriptPath}`);
    console.log(`\nPreview:\n${finalContent.substring(0, 500)}...`);
  } catch (error) {
    console.error('[Error] Execution failed:', error);
    process.exit(1);
  }
}

main();
