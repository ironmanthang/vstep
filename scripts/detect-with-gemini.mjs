#!/usr/bin/env node
/**
 * Fast Audio Timestamp Extractor using gemini-3.5-flash-lite
 */
import fs from 'fs';
import path from 'path';

if (typeof process.loadEnvFile === 'function') {
  try { process.loadEnvFile(); } catch {}
}

const API_KEY = process.env.VITE_GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

export async function uploadAudio(audioPath) {
  const audioBuffer = fs.readFileSync(audioPath);
  const uploadRes = await fetch(`https://generativelanguage.googleapis.com/upload/v1beta/files?key=${API_KEY}`, {
    method: 'POST',
    headers: {
      'X-Goog-Upload-Protocol': 'resumable',
      'X-Goog-Upload-Command': 'start',
      'X-Goog-Upload-Header-Content-Length': String(audioBuffer.length),
      'X-Goog-Upload-Header-Content-Type': 'audio/mp3',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ file: { display_name: path.basename(audioPath) } })
  });
  const uploadUrl = uploadRes.headers.get('x-goog-upload-url');
  const putRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Length': String(audioBuffer.length),
      'X-Goog-Upload-Offset': '0',
      'X-Goog-Upload-Command': 'upload, finalize',
      'Content-Type': 'audio/mp3'
    },
    body: audioBuffer
  });
  return (await putRes.json()).file;
}

export async function detectAudioTimestamps(audioPath, promptText) {
  const fileInfo = await uploadAudio(audioPath);
  const genRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [
          { file_data: { mime_type: fileInfo.mime_type || 'audio/mp3', file_uri: fileInfo.uri } },
          { text: promptText }
        ]
      }],
      generationConfig: { response_mime_type: 'application/json' }
    })
  });
  const data = await genRes.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return JSON.parse(text || '[]');
}

async function main() {
  const audioPath = process.argv[2];
  const part = parseInt(process.argv[3] || '1', 10);
  if (!audioPath) {
    console.error('Usage: node scripts/detect-with-gemini.mjs <audioPath> <part 1|2|3>');
    process.exit(1);
  }

  let prompt = '';
  if (part === 1) {
    prompt = `Listen carefully to this VSTEP Part 1 listening audio. Ignore the sample/example during directions.
Identify the exact starting timestamp (MM:SS, e.g. 02:00) when each of the 8 questions starts being spoken (Announcer saying "Question 1", "Question 2" ... "Question 8").
Return JSON array of 8 items: [{"question": 1, "start": "MM:SS", "quote": "first few words spoken"}]`;
  } else if (part === 2) {
    prompt = `Listen carefully to this VSTEP Part 2 listening audio.
Identify the exact starting timestamp (MM:SS) for the 3 conversations (Announcer saying "Questions 9 to 12 refer to...", "Questions 13 to 16 refer to...", "Questions 17 to 20 refer to...").
Return JSON array of 3 items: [{"conversation": 1, "start": "MM:SS", "quote": "opening words"}]`;
  } else if (part === 3) {
    prompt = `Listen carefully to this VSTEP Part 3 listening audio.
Identify the exact starting timestamp (MM:SS) for the 3 academic talks/lectures (Announcer saying "Questions 21 to 25 refer to...", "Questions 26 to 30 refer to...", "Questions 31 to 35 refer to...").
Return JSON array of 3 items: [{"talk": 1, "start": "MM:SS", "quote": "opening words"}]`;
  }

  console.log(`Analyzing ${audioPath} (Part ${part})...`);
  const results = await detectAudioTimestamps(audioPath, prompt);
  console.log(JSON.stringify(results, null, 2));
}

if (process.argv[1] && process.argv[1].endsWith('detect-with-gemini.mjs')) {
  main().catch(console.error);
}
