#!/usr/bin/env node
/**
 * Automated VSTEP Listening Ingestion Tool
 * Two-stage high-precision pipeline:
 * 1. Ground-Truth Timing: Uses Gemini 3.5 Transcribe to generate word-level timestamps (.txt)
 *    and extracts mathematically exact segment start_ms / end_ms.
 * 2. Bilingual Translation & Diarization: Uses Gemini 3.5 Flash-Lite to format speaker dialogue
 *    turns and generate natural Vietnamese translations without touching timestamps.
 *
 * Usage:
 *   node scripts/ingest-listening.mjs <audio_path> [--part 1|2|3] [--out <output.json>] [--title <title>]
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Load .env variables natively in Node 20.6+
if (typeof process.loadEnvFile === 'function') {
  try {
    process.loadEnvFile();
  } catch {}
}

const API_KEY = process.env.VITE_GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const TRANSCRIBE_MODEL = 'gemini-3.5-transcribe';
const CANDIDATE_LLM_MODELS = [
  'gemini-3.8-flash',
  'gemini-3.7-flash',
  'gemini-3.6-flash',
  'gemini-3.5-flash-lite',
];
const FILE_UPLOAD_ENDPOINT = `https://generativelanguage.googleapis.com/upload/v1beta/files?key=${API_KEY}`;
const INTERACTIONS_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/interactions?key=${API_KEY}`;

function printUsage() {
  console.log(`
Usage:
  node scripts/ingest-listening.mjs <audio_path> [options]
  node scripts/ingest-listening.mjs --all [options]

Arguments:
  <audio_path>       Path to the sliced audio file (e.g. public/audio/listening/test1/vstep-test-1-part1.mp3)

Options:
  --all              Process all 21 sliced audio files (test 1-7, parts 1-3)
  --test <1-7>       Process all 3 parts for a specific test number
  --force            Force re-ingesting even if output JSON already exists
  --part <1|2|3>     VSTEP Listening part number (default: inferred from filename or 1)
  --out <file_path>  Output path for generated JSON (default: same directory as audio, .json extension)
  --title <string>   Custom title for the test
  --help             Show this help message
  `);
}

function parseTimeStr(tStr) {
  const parts = tStr.split(':');
  if (parts.length === 2) {
    return parseFloat(parts[0]) * 60 + parseFloat(parts[1]);
  }
  return parseFloat(parts[0]);
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

function formatTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

async function uploadAudio(audioPath, audioBuffer) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
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
        throw new Error(`File upload init failed: HTTP ${startResponse.status}: ${await startResponse.text()}`);
      }

      const uploadUrl = startResponse.headers.get('x-goog-upload-url');
      if (!uploadUrl) throw new Error('File upload init did not return upload URL.');

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

      const uploadJson = await uploadResponse.json();
      return uploadJson.file;
    } catch (err) {
      console.warn(`[Upload] Attempt ${attempt} failed: ${err.message}`);
      if (attempt < 3) {
        await new Promise(r => setTimeout(r, 3000));
      } else {
        throw err;
      }
    }
  }
}

function getCutRange(testNum, partNum) {
  const cmdsPath = 'public/audio/listening/cmds.txt';
  if (!fs.existsSync(cmdsPath)) return null;
  const content = fs.readFileSync(cmdsPath, 'utf8');
  for (const line of content.split('\n')) {
    const m = line.match(new RegExp(`vstep-test-${testNum}-part${partNum}\\.mp3`));
    if (!m) continue;
    const ssMatch = line.match(/-ss\s+([0-9:.]+)/);
    const toMatch = line.match(/-to\s+([0-9:.]+)/);
    function parse(t) {
      if (!t) return 0;
      const parts = t.split(':');
      if (parts.length === 3) return parseFloat(parts[0]) * 3600 + parseFloat(parts[1]) * 60 + parseFloat(parts[2]);
      if (parts.length === 2) return parseFloat(parts[0]) * 60 + parseFloat(parts[1]);
      return parseFloat(parts[0]);
    }
    return {
      startSec: ssMatch ? parse(ssMatch[1]) : 0,
      endSec: toMatch ? parse(toMatch[1]) : Infinity,
    };
  }
  return null;
}

async function ensureWordTranscript(audioPath) {
  const txtPath = audioPath.replace(/\.mp3$/, '.txt');
  if (fs.existsSync(txtPath)) {
    console.log(`[Transcript] Using existing word transcript: ${txtPath}`);
    return txtPath;
  }

  // Check if we can derive from the monolith transcript directly
  const testMatch = audioPath.match(/test([0-9]+)/i);
  const partMatch = audioPath.match(/part([1-3])/i);
  if (testMatch && partMatch) {
    const testNum = parseInt(testMatch[1], 10);
    const partNum = parseInt(partMatch[1], 10);
    const monoPath = path.join(path.dirname(audioPath), `vstep-test-${testNum}.txt`);
    const cut = getCutRange(testNum, partNum);

    if (fs.existsSync(monoPath) && cut) {
      const monoWords = parseWords(monoPath);
      // Filter words strictly within this part's cut range
      const matchingWords = monoWords.filter(w => w.start >= cut.startSec && (cut.endSec === Infinity || w.end <= cut.endSec + 1));
      const minWordThreshold = partNum === 1 ? 300 : (partNum === 2 ? 500 : 600);
      if (matchingWords.length >= minWordThreshold) {
        const slicedWords = matchingWords.map(w => {
          const relStart = Math.max(0, w.start - cut.startSec);
          const relEnd = Math.max(relStart + 0.05, w.end - cut.startSec);
          return `[${formatOffset(relStart)} -> ${formatOffset(relEnd)}] ${w.word}`;
        });

        fs.writeFileSync(txtPath, slicedWords.join('\n'), 'utf8');
        console.log(`[Transcript] Derived ${slicedWords.length} words from monolith: ${txtPath}`);
        return txtPath;
      }
    }
  }

  console.log(`[Transcript] Generating word-level transcript via ${TRANSCRIBE_MODEL}...`);
  const audioBuffer = fs.readFileSync(audioPath);
  const uploadedFile = await uploadAudio(audioPath, audioBuffer);

  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const res = await fetch(INTERACTIONS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: TRANSCRIBE_MODEL,
          input: [{
            type: 'audio',
            uri: uploadedFile.uri,
            mime_type: uploadedFile.mime_type || 'audio/mp3',
          }],
          generation_config: {
            transcription_config: {
              mode: { type: 'verbatim', timestamp_granularities: ['word'] },
            },
          },
          store: false,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        const waitMatch = errText.match(/retry in ([0-9.]+)s/i);
        const waitSec = waitMatch ? Math.ceil(parseFloat(waitMatch[1])) + 2 : 45;
        console.warn(`[Transcript] Transcribe HTTP ${res.status}. Waiting ${waitSec}s before attempt ${attempt + 1}...`);
        await new Promise(r => setTimeout(r, waitSec * 1000));
        continue;
      }

      const data = await res.json();
      const stepContents = (data.steps || []).flatMap(s => s.content || []);
      const annotations = stepContents.flatMap(c => c.annotations || []).filter(a => a.type === 'word_info');

      if (!annotations.length) throw new Error('No word annotations returned from transcribe model.');

      const content = annotations
        .map(a => `[${formatOffset(a.start_offset)} -> ${formatOffset(a.end_offset)}] ${a.text}`)
        .join('\n');

      fs.writeFileSync(txtPath, content, 'utf8');
      console.log(`[Transcript] Saved word transcript to: ${txtPath}`);
      return txtPath;
    } catch (err) {
      console.warn(`[Transcript] Attempt ${attempt} failed: ${err.message}`);
      if (attempt < 5) {
        await new Promise(r => setTimeout(r, 10000));
      } else {
        throw err;
      }
    }
  }

  throw new Error(`Failed to generate word transcript for ${audioPath} after all attempts.`);
}

function parseWords(filePath) {
  const lines = fs.readFileSync(filePath, 'utf8').trim().split('\n');
  const items = [];
  for (const line of lines) {
    const m = line.match(/^\[?([0-9]{1,2}:[0-9]{2}(?:\.[0-9]+)?)\s*->\s*([0-9]{1,2}:[0-9]{2}(?:\.[0-9]+)?)\]?:?\s*(.*)$/);
    if (m && m[3].trim()) {
      const start = parseTimeStr(m[1]);
      const end = parseTimeStr(m[2]);
      const text = m[3].trim();
      const words = text.split(/\s+/);
      const durPerWord = (end - start) / Math.max(1, words.length);
      for (let i = 0; i < words.length; i++) {
        items.push({
          start: +(start + i * durPerWord).toFixed(2),
          end: +(start + (i + 1) * durPerWord).toFixed(2),
          word: words[i],
        });
      }
    }
  }
  return items;
}

function segmentWords(words, partNum, testNum) {
  if (!words.length) return [];
  const segments = [];

  if (partNum === 1) {
    const qTargets = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
    const qIndices = [];

    // Find the end of initial instructions (around 01:15 - 01:25) before Question 1
    let careIdx = words.findLastIndex(w => w.start < 85 && (w.word.toLowerCase().includes('carefully') || (w.word.toLowerCase().includes('start') && w.start > 60)));
    if (careIdx === -1) careIdx = 0;

    let searchStart = careIdx;
    for (let q = 0; q < 8; q++) {
      const target = qTargets[q];
      let foundIdx = -1;
      for (let i = searchStart; i < words.length - 1; i++) {
        const w = words[i].word.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (w === target || w === String(q + 1)) {
          foundIdx = i;
          if (i > 0 && words[i - 1].word.toLowerCase().includes('question')) {
            foundIdx = i - 1;
            if (i > 1 && words[i - 2].word.toLowerCase().includes('at')) foundIdx = i - 2;
          }
          break;
        }
      }

      // Fallback: If number target not explicitly spoken by narrator, detect silence >= 1.2s followed by interrogative word
      if (foundIdx === -1 && q > 0) {
        for (let i = searchStart + 5; i < words.length - 1; i++) {
          const pause = words[i].start - words[i - 1].end;
          const w = words[i].word.toLowerCase().replace(/[^a-z0-9]/g, '');
          if (pause >= 1.2 && ['what', 'which', 'where', 'who', 'how', 'when'].includes(w)) {
            foundIdx = i;
            break;
          }
        }
      }

      if (foundIdx !== -1) {
        qIndices.push(foundIdx);
        searchStart = foundIdx + 5;
      }
    }

    let outroIdx = -1;
    const lastQIdx = qIndices[qIndices.length - 1] || 0;
    for (let i = lastQIdx; i < words.length - 3; i++) {
      if (words[i].word.toLowerCase().includes('end') && words[i + 1]?.word.toLowerCase().includes('of')) {
        outroIdx = (i > 2 && words[i - 2].word.toLowerCase().includes('that')) ? i - 2 : (i > 0 ? i - 1 : i);
        break;
      }
    }

    const boundaries = Array.from(new Set([0, ...qIndices, ...(outroIdx !== -1 ? [outroIdx] : []), words.length])).sort((a, b) => a - b);
    for (let i = 0; i < boundaries.length - 1; i++) {
      const slice = words.slice(boundaries[i], boundaries[i + 1]);
      if (!slice.length) continue;
      const isIntro = (i === 0);
      const isOutro = (outroIdx !== -1 && boundaries[i] >= outroIdx);
      const qNum = (!isIntro && !isOutro) ? i : null;

      segments.push({
        id: segments.length,
        start_ms: Math.round(slice[0].start * 1000),
        end_ms: Math.round(slice[slice.length - 1].end * 1000),
        is_clue_for_question: qNum ? `q${testNum}_${qNum}` : null,
        speaker: (isIntro || isOutro) ? 'Announcer' : 'Speaker',
        text_raw: slice.map(w => w.word).join(' '),
      });
    }
  } else if (partNum === 2) {
    const convIndices = [];
    const convTargets = ['one', 'two', 'three', '1', '2', '3'];

    let searchStart = 0;
    for (let c = 0; c < 3; c++) {
      const target = convTargets[c];
      const numTarget = convTargets[c + 3];
      let foundIdx = -1;
      for (let i = searchStart; i < words.length - 1; i++) {
        const w1 = words[i].word.toLowerCase();
        const w2 = words[i + 1].word.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (w1.includes('conversation') && (w2 === target || w2 === numTarget)) {
          foundIdx = i;
          if (i > 0 && words[i - 1].word.toLowerCase().includes('at')) foundIdx = i - 1;
          if (i > 1 && words[i - 2].word.toLowerCase().includes('look')) foundIdx = i - 2;
          break;
        }
      }
      if (foundIdx !== -1) {
        convIndices.push(foundIdx);
        searchStart = foundIdx + 5;
      }
    }

    let outroIdx = -1;
    const lastIdx = convIndices[convIndices.length - 1] || 0;
    for (let i = lastIdx; i < words.length - 3; i++) {
      if (words[i].word.toLowerCase().includes('end') && words[i + 1]?.word.toLowerCase().includes('of')) {
        outroIdx = (i > 2 && words[i - 2].word.toLowerCase().includes('that')) ? i - 2 : (i > 0 ? i - 1 : i);
        break;
      }
    }

    const boundaries = Array.from(new Set([0, ...convIndices, ...(outroIdx !== -1 ? [outroIdx] : []), words.length])).sort((a, b) => a - b);
    for (let i = 0; i < boundaries.length - 1; i++) {
      const slice = words.slice(boundaries[i], boundaries[i + 1]);
      if (!slice.length) continue;
      const isIntro = (i === 0);
      const isOutro = (outroIdx !== -1 && boundaries[i] >= outroIdx);
      const convNum = (!isIntro && !isOutro) ? i : null;

      let clue = null;
      if (convNum === 1) clue = `q${testNum}_9,q${testNum}_10,q${testNum}_11,q${testNum}_12`;
      else if (convNum === 2) clue = `q${testNum}_13,q${testNum}_14,q${testNum}_15,q${testNum}_16`;
      else if (convNum === 3) clue = `q${testNum}_17,q${testNum}_18,q${testNum}_19,q${testNum}_20`;

      segments.push({
        id: segments.length,
        start_ms: Math.round(slice[0].start * 1000),
        end_ms: Math.round(slice[slice.length - 1].end * 1000),
        is_clue_for_question: clue,
        speaker: (isIntro || isOutro) ? 'Announcer' : 'Man & Woman',
        text_raw: slice.map(w => w.word).join(' '),
      });
    }
  } else if (partNum === 3) {
    const talkIndices = [];
    const talkTargets = ['one', 'two', 'three', '1', '2', '3'];

    let searchStart = 0;
    for (let t = 0; t < 3; t++) {
      const target = talkTargets[t];
      const numTarget = talkTargets[t + 3];
      let foundIdx = -1;
      for (let i = searchStart; i < words.length - 1; i++) {
        const w1 = words[i].word.toLowerCase();
        const w2 = words[i + 1].word.toLowerCase().replace(/[^a-z0-9]/g, '');
        if ((w1.includes('lecture') || w1.includes('talk')) && (w2 === target || w2 === numTarget)) {
          foundIdx = i;
          if (i > 1 && words[i - 1].word.toLowerCase().includes('or') && (words[i - 2].word.toLowerCase().includes('talk') || words[i - 2].word.toLowerCase().includes('lecture'))) {
            foundIdx = i - 2;
          }
          if (foundIdx > 0 && words[foundIdx - 1].word.toLowerCase().includes('at')) foundIdx = foundIdx - 1;
          if (foundIdx > 0 && words[foundIdx - 1].word.toLowerCase().includes('look')) foundIdx = foundIdx - 1;
          break;
        }
      }
      if (foundIdx !== -1) {
        talkIndices.push(foundIdx);
        searchStart = foundIdx + 5;
      }
    }

    let outroIdx = -1;
    const lastIdx = talkIndices[talkIndices.length - 1] || 0;
    for (let i = lastIdx; i < words.length - 3; i++) {
      if (words[i].word.toLowerCase().includes('end') && words[i + 1]?.word.toLowerCase().includes('of')) {
        outroIdx = (i > 2 && words[i - 2].word.toLowerCase().includes('that')) ? i - 2 : (i > 0 ? i - 1 : i);
        break;
      }
    }

    const boundaries = Array.from(new Set([0, ...talkIndices, ...(outroIdx !== -1 ? [outroIdx] : []), words.length])).sort((a, b) => a - b);
    for (let i = 0; i < boundaries.length - 1; i++) {
      const slice = words.slice(boundaries[i], boundaries[i + 1]);
      if (!slice.length) continue;
      const isIntro = (i === 0);
      const isOutro = (outroIdx !== -1 && boundaries[i] >= outroIdx);
      const talkNum = (!isIntro && !isOutro) ? i : null;

      let clue = null;
      if (talkNum === 1) clue = `q${testNum}_21,q${testNum}_22,q${testNum}_23,q${testNum}_24,q${testNum}_25`;
      else if (talkNum === 2) clue = `q${testNum}_26,q${testNum}_27,q${testNum}_28,q${testNum}_29,q${testNum}_30`;
      else if (talkNum === 3) clue = `q${testNum}_31,q${testNum}_32,q${testNum}_33,q${testNum}_34,q${testNum}_35`;

      segments.push({
        id: segments.length,
        start_ms: Math.round(slice[0].start * 1000),
        end_ms: Math.round(slice[slice.length - 1].end * 1000),
        is_clue_for_question: clue,
        speaker: (isIntro || isOutro) ? 'Announcer' : 'Speaker',
        text_raw: slice.map(w => w.word).join(' '),
      });
    }
  }

  return segments;
}

async function enhanceWithLLM(rawSegments) {
  const prompt = `You are an expert VSTEP curriculum engineer.
Format the following verbatim English transcript segments into clean dialogue (newlines \\n between speaker turns like "Man: ...\\nWoman: ...").
Provide high-quality, fluent, and natural Vietnamese translations for English learners.

Return a strict JSON array of objects with:
- "id": integer matching the input segment id
- "text_en": formatted English text with speaker tags (e.g. "Man: ...\\nWoman: ...")
- "text_vi": Vietnamese translation mirroring the formatting
- "speaker": speaker label (e.g. "Announcer", "Man & Woman", "Girl", "Lecturer")

Input segments:
${JSON.stringify(rawSegments.map(s => ({ id: s.id, text: s.text_raw })), null, 2)}`;

  let lastError = null;

  for (const model of CANDIDATE_LLM_MODELS) {
    console.log(`[LLM] Trying model: ${model}...`);
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.1,
            responseMimeType: 'application/json',
            responseSchema: {
              type: 'ARRAY',
              items: {
                type: 'OBJECT',
                properties: {
                  id: { type: 'INTEGER' },
                  text_en: { type: 'STRING' },
                  text_vi: { type: 'STRING' },
                  speaker: { type: 'STRING' },
                },
                required: ['id', 'text_en', 'text_vi'],
              },
            },
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
          console.warn(`[LLM] Model ${model} returned empty content.`);
          continue;
        }
        console.log(`[LLM] Successfully processed segments with: ${model}`);
        return JSON.parse(text);
      }

      const errText = await res.text();
      const isQuotaExhausted = res.status === 429 ||
        errText.includes('RESOURCE_EXHAUSTED') ||
        errText.toLowerCase().includes('quota') ||
        errText.toLowerCase().includes('too many requests');

      if (model === 'gemini-3.5-flash-lite' && isQuotaExhausted) {
        console.error(`\n================================================================`);
        console.error(`[FATAL QUOTA EXHAUSTION] Model gemini-3.5-flash-lite quota exhausted!`);
        console.error(`HTTP Status: ${res.status}`);
        console.error(`Error details: ${errText}`);
        console.error(`Stopping execution immediately as requested.`);
        console.error(`================================================================\n`);
        process.exit(42);
      }

      console.warn(`[LLM] Model ${model} failed (HTTP ${res.status}): ${errText.substring(0, 160)}...`);
      lastError = new Error(`Model ${model} HTTP ${res.status}: ${errText}`);
    } catch (err) {
      if (err.message && err.message.includes('[FATAL QUOTA EXHAUSTION]')) {
        throw err;
      }
      console.warn(`[LLM] Model ${model} error: ${err.message}`);
      lastError = err;
    }
  }

  throw new Error(`All candidate models (${CANDIDATE_LLM_MODELS.join(', ')}) failed. Last error: ${lastError?.message}`);
}

async function processOneAudio(audioPath, options = {}) {
  let partNumber = options.partNumber;
  let outputPath = options.outputPath;
  let customTitle = options.customTitle;
  const force = options.force || false;

  if (!partNumber) {
    const partMatch = audioPath.match(/part([1-3])/i);
    partNumber = partMatch ? parseInt(partMatch[1], 10) : 1;
  }

  const testMatch = audioPath.match(/test([0-9]+)/i);
  const testNumber = testMatch ? parseInt(testMatch[1], 10) : 1;

  const finalOutputPath = outputPath ? path.resolve(outputPath) : audioPath.replace(/\.mp3$/, '.json');

  if (!force && fs.existsSync(finalOutputPath)) {
    try {
      const existing = JSON.parse(fs.readFileSync(finalOutputPath, 'utf8'));
      if (existing.transcript && existing.transcript.length > 0) {
        console.log(`[Skip] Already completed: ${finalOutputPath} (${existing.transcript.length} segments)`);
        return;
      }
    } catch {}
  }

  if (!fs.existsSync(audioPath)) {
    console.error(`Error: Audio file not found at: ${audioPath}`);
    return;
  }

  let trueDurationSec = 0;
  try {
    const probe = execSync(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${audioPath}"`, { encoding: 'utf8' }).trim();
    trueDurationSec = parseFloat(probe) || 0;
  } catch {}

  console.log(`\n=== Processing: ${audioPath} ===`);
  console.log(`- Test: ${testNumber}, Part: ${partNumber}`);
  console.log(`- Duration: ${trueDurationSec.toFixed(1)}s (${formatTime(trueDurationSec * 1000)})`);

  // Stage 1: Word Transcript & Ground-Truth Timings
  const txtPath = await ensureWordTranscript(audioPath);
  const words = parseWords(txtPath);
  console.log(`- Word Tokens: ${words.length}`);

  const rawSegments = segmentWords(words, partNumber, testNumber);
  console.log(`- Extracted Coarse Segments: ${rawSegments.length}`);

  // Stage 2: Dialogue Diarization & Translation
  const enhancedList = await enhanceWithLLM(rawSegments);

  // Stage 3: Deterministic Merge
  const finalTranscript = rawSegments.map(raw => {
    const enh = enhancedList.find(e => e.id === raw.id) || {};
    return {
      start_ms: raw.start_ms,
      end_ms: raw.end_ms,
      text_en: enh.text_en || raw.text_raw,
      text_vi: enh.text_vi || '',
      speaker: enh.speaker || raw.speaker,
      is_clue_for_question: raw.is_clue_for_question,
    };
  });

  const difficultyMap = { 1: 'B1', 2: 'B2', 3: 'C1' };
  const audioUrl = `/${path.relative(path.resolve('.'), audioPath).replace(/\\/g, '/').replace(/^public\//, '')}`;

  const dataset = {
    title: customTitle || `Part ${partNumber} - Đề ${testNumber.toString().padStart(2, '0')}`,
    part: partNumber,
    difficulty: difficultyMap[partNumber] || 'B1',
    duration_seconds: Math.round(trueDurationSec),
    audio_url: audioUrl,
    transcript: finalTranscript,
  };

  fs.writeFileSync(finalOutputPath, JSON.stringify(dataset, null, 2), 'utf-8');
  console.log(`\n[Success] Dataset saved to: ${finalOutputPath}`);
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes('--help')) {
    printUsage();
    process.exit(args.includes('--help') ? 0 : 1);
  }

  if (!API_KEY) {
    console.error('Error: Google API key not found in environment.');
    process.exit(1);
  }

  const isAll = args.includes('--all');
  const force = args.includes('--force');
  let singleTest = null;

  const testIdx = args.indexOf('--test');
  if (testIdx !== -1 && args[testIdx + 1]) {
    singleTest = parseInt(args[testIdx + 1], 10);
  }

  if (isAll || singleTest !== null) {
    const tests = singleTest !== null ? [singleTest] : [1, 2, 3, 4, 5, 6, 7];
    console.log(`\n================================================================`);
    console.log(`Starting Batch Ingestion for ${tests.length} tests (Total ${tests.length * 3} files)...`);
    console.log(`Model Fallback Order: ${CANDIDATE_LLM_MODELS.join(' -> ')}`);
    console.log(`================================================================`);

    for (const t of tests) {
      for (let p = 1; p <= 3; p++) {
        const audioPath = `public/audio/listening/test${t}/vstep-test-${t}-part${p}.mp3`;
        await processOneAudio(audioPath, { partNumber: p, testNumber: t, force });
      }
    }
    console.log(`\nAll requested files processed successfully!`);
    return;
  }

  const audioPath = args[0];
  let partNumber = null;
  let outputPath = null;
  let customTitle = null;

  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--part' && args[i + 1]) {
      partNumber = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === '--out' && args[i + 1]) {
      outputPath = args[i + 1];
      i++;
    } else if (args[i] === '--title' && args[i + 1]) {
      customTitle = args[i + 1];
      i++;
    }
  }

  await processOneAudio(audioPath, { partNumber, outputPath, customTitle, force: true });
}

main().catch(err => {
  if (err.message && err.message.includes('[FATAL QUOTA EXHAUSTION]')) {
    process.exit(42);
  }
  console.error('[Fatal Error]:', err);
  process.exit(1);
});
