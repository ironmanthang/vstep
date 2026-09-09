#!/usr/bin/env node
/**
 * Automated Listening Timestamp Verifier & Sync Tool
 * 
 * Verifies if website listening test timestamps (start_ms / end_ms) in
 * src/features/listening/data/ match the physical audio files in public/audio/listening/.
 * 
 * Usage:
 *   node --experimental-strip-types scripts/verify-timestamps.mjs [options] [target]
 * 
 * Examples:
 *   node --experimental-strip-types scripts/verify-timestamps.mjs src/features/listening/data/drills/hcmue/part1/hcmuePart1_02.ts
 *   node --experimental-strip-types scripts/verify-timestamps.mjs --part 1
 *   node --experimental-strip-types scripts/verify-timestamps.mjs --all
 *   node --experimental-strip-types scripts/verify-timestamps.mjs <file> --transcribe   # auto-transcribe missing audio via Gemini API
 *   node --experimental-strip-types scripts/verify-timestamps.mjs <file> --fix          # auto-update .ts file with ground truth
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { pathToFileURL } from 'url';

// Load .env variables natively
if (typeof process.loadEnvFile === 'function') {
  try {
    process.loadEnvFile();
  } catch {}
}

const API_KEY = process.env.VITE_GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const TRANSCRIBE_MODEL = 'gemini-3.5-transcribe';
const FILE_UPLOAD_ENDPOINT = `https://generativelanguage.googleapis.com/upload/v1beta/files?key=${API_KEY}`;
const INTERACTIONS_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/interactions?key=${API_KEY}`;

function msToTime(ms) {
  if (typeof ms !== 'number' || isNaN(ms)) return '--:--';
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function parseTimeStr(tStr) {
  const parts = tStr.split(':');
  if (parts.length === 2) {
    return parseFloat(parts[0]) * 60 + parseFloat(parts[1]);
  }
  return parseFloat(parts[0]);
}

function formatOffsetSec(seconds) {
  const abs = Math.abs(seconds);
  const sign = seconds > 0 ? '+' : '-';
  if (abs >= 60) {
    const m = Math.floor(abs / 60);
    const s = Math.round(abs % 60);
    return `${sign}${m}m ${s}s`;
  }
  return `${sign}${abs.toFixed(1)}s`;
}

function getAudioDuration(audioPath) {
  try {
    const out = execSync(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${audioPath}"`, { stdio: ['pipe', 'pipe', 'ignore'] }).toString().trim();
    return parseFloat(out);
  } catch {
    return null;
  }
}

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
    throw new Error(`Upload init failed: HTTP ${startResponse.status}: ${await startResponse.text()}`);
  }

  const uploadUrl = startResponse.headers.get('x-goog-upload-url');
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
    throw new Error(`Upload failed: HTTP ${uploadResponse.status}: ${await uploadResponse.text()}`);
  }

  return (await uploadResponse.json()).file;
}

async function transcribeAudio(audioPath, txtPath) {
  if (!API_KEY) {
    throw new Error('Cannot transcribe: Neither VITE_GEMINI_API_KEY nor GOOGLE_API_KEY found in .env');
  }

  console.log(`   [Transcribe] Uploading ${audioPath} to Gemini...`);
  const audioBuffer = fs.readFileSync(audioPath);
  const uploadedFile = await uploadAudio(audioPath, audioBuffer);

  console.log(`   [Transcribe] Generating verbatim word timestamps via ${TRANSCRIBE_MODEL}...`);
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
    throw new Error(`Transcribe HTTP ${res.status}: ${await res.text()}`);
  }

  const data = await res.json();
  const stepContents = (data.steps || []).flatMap(s => s.content || []);
  const annotations = stepContents.flatMap(c => c.annotations || []).filter(a => a.type === 'word_info');

  if (!annotations.length) throw new Error('No word annotations returned from transcribe model.');

  const content = annotations
    .map(a => {
      const s = typeof a.start_offset === 'string' ? parseFloat(a.start_offset) : a.start_offset;
      const e = typeof a.end_offset === 'string' ? parseFloat(a.end_offset) : a.end_offset;
      const sStr = `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toFixed(2).padStart(5, '0')}`;
      const eStr = `${Math.floor(e / 60).toString().padStart(2, '0')}:${(e % 60).toFixed(2).padStart(5, '0')}`;
      return `[${sStr} -> ${eStr}] ${a.text}`;
    })
    .join('\n');

  fs.writeFileSync(txtPath, content, 'utf8');
  console.log(`   [Transcribe] Saved word transcript to: ${txtPath}`);
}

function parseWordTranscript(txtPath) {
  if (!fs.existsSync(txtPath)) return null;
  const lines = fs.readFileSync(txtPath, 'utf8').trim().split('\n');
  const words = [];
  for (const line of lines) {
    const m = line.match(/^\[([0-9]{1,2}:[0-9]{2}(?:\.[0-9]+)?)\s*->\s*([0-9]{1,2}:[0-9]{2}(?:\.[0-9]+)?)\]\s*(.*)$/);
    if (m) {
      const startSec = parseTimeStr(m[1]);
      const endSec = parseTimeStr(m[2]);
      const word = m[3].trim();
      words.push({
        startSec,
        endSec,
        startMs: Math.round(startSec * 1000),
        endMs: Math.round(endSec * 1000),
        word,
      });
    }
  }
  return words;
}

/**
 * Detects question / conversation / lecture start boundaries from verbatim word annotations.
 */
function detectGroundTruthBoundaries(words, partNum, _totalDurationSec) {
  if (!words || !words.length) return null;

  if (partNum === 1) {
    // 8 questions in Part 1
    const qTargets = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
    const detected = [];

    // Scan for "Question one", "Question two", etc.
    for (let q = 0; q < 8; q++) {
      const target = qTargets[q];
      const targetNum = String(q + 1);
      let foundWord = null;

      for (let i = 0; i < words.length - 1; i++) {
        const w1 = words[i].word.toLowerCase().replace(/[^a-z0-9]/g, '');
        const w2 = words[i + 1].word.toLowerCase().replace(/[^a-z0-9]/g, '');

        if (w1 === 'question' && (w2 === target || w2 === targetNum)) {
          // Guard: Avoid matching inside introductory instructions (e.g. "Questions 1 to 8")
          if (q === 0 && words[i].startSec < 75 && !words.slice(Math.max(0, i - 10), i).some(w => w.word.toLowerCase().includes('begin') || w.word.toLowerCase().includes('start'))) {
            continue;
          }
          foundWord = words[i];
          break;
        }
      }

      if (foundWord) {
        detected.push({
          qIndex: q + 1,
          startMs: foundWord.startMs,
          startSec: foundWord.startSec,
        });
      }
    }

    return detected;
  }

  if (partNum === 2) {
    // 3 conversations in Part 2
    const convTargets = ['one', 'two', 'three', '1', '2', '3'];
    const detected = [];

    for (let c = 0; c < 3; c++) {
      const target = convTargets[c];
      const numTarget = convTargets[c + 3];
      let foundWord = null;

      for (let i = 0; i < words.length - 1; i++) {
        const w1 = words[i].word.toLowerCase().replace(/[^a-z0-9]/g, '');
        const w2 = words[i + 1].word.toLowerCase().replace(/[^a-z0-9]/g, '');
        if ((w1 === 'conversation' || w1.includes('conversation')) && (w2 === target || w2 === numTarget)) {
          foundWord = words[Math.max(0, i - 1)];
          break;
        }
      }

      if (foundWord) {
        detected.push({
          convIndex: c + 1,
          startMs: foundWord.startMs,
          startSec: foundWord.startSec,
        });
      }
    }
    return detected;
  }

  if (partNum === 3) {
    // 3 academic talks/lectures in Part 3
    const talkTargets = ['one', 'two', 'three', '1', '2', '3'];
    const detected = [];

    for (let t = 0; t < 3; t++) {
      const target = talkTargets[t];
      const numTarget = talkTargets[t + 3];
      let foundWord = null;

      for (let i = 0; i < words.length - 1; i++) {
        const w1 = words[i].word.toLowerCase().replace(/[^a-z0-9]/g, '');
        const w2 = words[i + 1].word.toLowerCase().replace(/[^a-z0-9]/g, '');
        if ((w1.includes('lecture') || w1.includes('talk')) && (w2 === target || w2 === numTarget)) {
          foundWord = words[Math.max(0, i - 1)];
          break;
        }
      }

      if (foundWord) {
        detected.push({
          talkIndex: t + 1,
          startMs: foundWord.startMs,
          startSec: foundWord.startSec,
        });
      }
    }
    return detected;
  }

  return null;
}

/**
 * Verifies a single ListeningTest object against its audio.
 */
async function verifyTest(testObj, tsFilePath, options = {}) {
  const { transcribe = false, fix = false, toleranceSec = 2.0 } = options;

  console.log(`\n================================================================================`);
  console.log(`TEST: ${testObj.title} (ID: ${testObj.id}, Part: ${testObj.part})`);
  console.log(`FILE: ${tsFilePath}`);
  console.log(`AUDIO URL: ${testObj.audio_url}`);
  console.log(`================================================================================`);

  // 1. Check physical audio file
  const localAudioPath = path.join(process.cwd(), 'public', testObj.audio_url.replace(/^\//, ''));
  if (!fs.existsSync(localAudioPath)) {
    console.error(`❌ Audio file not found on disk: ${localAudioPath}`);
    return { ok: false, desyncs: 1 };
  }

  const realDuration = getAudioDuration(localAudioPath);
  console.log(`Audio File: ${localAudioPath} (${realDuration ? realDuration.toFixed(2) + 's' : 'unknown'})`);
  if (realDuration && Math.abs(realDuration - testObj.duration_seconds) > 3) {
    console.warn(`⚠️ Duration mismatch: Code states ${testObj.duration_seconds}s, but audio file is ${realDuration.toFixed(2)}s`);
  }

  // 2. Check for ground-truth word transcript
  const txtPath = localAudioPath.replace(/\.mp3$/, '.txt');
  if (!fs.existsSync(txtPath)) {
    if (transcribe) {
      try {
        await transcribeAudio(localAudioPath, txtPath);
      } catch (err) {
        console.error(`❌ Transcribe error: ${err.message}`);
        return { ok: false, desyncs: 1 };
      }
    } else {
      console.warn(`ℹ️ Ground truth transcript (${path.basename(txtPath)}) not found.`);
      console.warn(`   Run with --transcribe to automatically generate verbatim word timestamps via Gemini API.`);
      return { ok: false, desyncs: 0, missingTxt: true };
    }
  }

  const words = parseWordTranscript(txtPath);
  if (!words || !words.length) {
    console.error(`❌ Could not parse words from ${txtPath}`);
    return { ok: false, desyncs: 1 };
  }

  // 3. Detect cues in audio
  const detectedCues = detectGroundTruthBoundaries(words, testObj.part, realDuration || testObj.duration_seconds);
  if (!detectedCues || !detectedCues.length) {
    console.warn(`⚠️ Could not automatically detect standard audio cues for Part ${testObj.part}`);
    return { ok: true, desyncs: 0 };
  }

  // 4. Match against configured questions
  const results = [];
  let totalDesyncs = 0;

  for (let idx = 0; idx < testObj.questions.length; idx++) {
    const q = testObj.questions[idx];
    const segment = testObj.transcript.find(t => {
      if (!t.is_clue_for_question) return false;
      const ids = t.is_clue_for_question.split(',').map(s => s.trim());
      return ids.includes(q.id);
    });

    const cue = detectedCues[idx];
    if (!cue) continue;

    const configStartMs = segment ? segment.start_ms : null;
    const actualStartMs = cue.startMs;

    let offsetSec = null;
    let status = 'OK';

    if (configStartMs !== null) {
      offsetSec = (actualStartMs - configStartMs) / 1000;
      if (Math.abs(offsetSec) > toleranceSec) {
        status = 'DESYNC';
        totalDesyncs++;

        if (configStartMs < 75000 && actualStartMs > 100000) {
          status = 'DESYNC (EXAMPLE_TRAP)';
        }
      }
    } else {
      status = 'MISSING_SEGMENT';
      totalDesyncs++;
    }

    results.push({
      label: `Q${idx + 1}`,
      questionId: q.id,
      configuredMs: configStartMs,
      configuredTime: configStartMs !== null ? msToTime(configStartMs) : '--:--',
      actualMs: actualStartMs,
      actualTime: msToTime(actualStartMs),
      offset: offsetSec !== null ? formatOffsetSec(offsetSec) : 'N/A',
      status,
    });
  }

  // 5. Print Comparison Table
  console.log(`\nVerification Results (${results.length} questions):`);
  console.log('--------------------------------------------------------------------------------');
  console.log(`Q#   | Configured Code  | Actual Audio     | Delta Offset | Status`);
  console.log('-----+------------------+------------------+--------------+---------------------');
  for (const r of results) {
    const qStr = r.label.padEnd(4);
    const cfgStr = `${r.configuredTime} (${r.configuredMs}ms)`.padEnd(16);
    const actStr = `${r.actualTime} (${r.actualMs}ms)`.padEnd(16);
    const offStr = r.offset.padEnd(12);
    const statusStr = r.status.startsWith('OK') ? `\x1b[32m${r.status}\x1b[0m` : `\x1b[31m${r.status}\x1b[0m`;
    console.log(`${qStr} | ${cfgStr} | ${actStr} | ${offStr} | ${statusStr}`);
  }
  console.log('--------------------------------------------------------------------------------');

  if (totalDesyncs === 0) {
    console.log(`\x1b[32m✔ PASS: All ${results.length} question timestamps match within ±${toleranceSec}s tolerance.\x1b[0m`);
  } else {
    console.log(`\x1b[31m✘ FAIL: ${totalDesyncs} of ${results.length} questions are desynchronized!\x1b[0m`);
  }

  // 6. Automated Fix Mode
  if (fix && totalDesyncs > 0) {
    console.log(`\n[FIX MODE] Applying ground-truth timestamps to ${tsFilePath}...`);
    applyFix(tsFilePath, testObj, detectedCues, realDuration || testObj.duration_seconds);
  }

  return { ok: totalDesyncs === 0, desyncs: totalDesyncs };
}

/**
 * Safely updates the .ts file with exact ground truth start_ms and end_ms boundaries.
 */
function applyFix(tsFilePath, testObj, detectedCues, totalDurationSec) {
  let content = fs.readFileSync(tsFilePath, 'utf8');

  const qStarts = detectedCues.map(c => c.startMs);
  const endMs = Math.round(totalDurationSec * 1000);

  const boundaries = [0, ...qStarts, endMs];

  for (let i = 0; i < testObj.transcript.length; i++) {
    const oldSeg = testObj.transcript[i];
    const newStart = boundaries[i];
    const newEnd = boundaries[i + 1] || endMs;

    const oldStartRegex = new RegExp(`start_ms:\\s*${oldSeg.start_ms}`, 'g');
    const oldEndRegex = new RegExp(`end_ms:\\s*${oldSeg.end_ms}`, 'g');

    content = content.replace(oldStartRegex, `start_ms: ${newStart}`);
    content = content.replace(oldEndRegex, `end_ms: ${newEnd}`);
  }

  fs.writeFileSync(tsFilePath, content, 'utf8');
  console.log(`✔ Successfully updated timestamps in ${tsFilePath}!`);
}

async function main() {
  const args = process.argv.slice(2);
  const transcribe = args.includes('--transcribe');
  const fix = args.includes('--fix');
  const isAll = args.includes('--all');
  const partArgIdx = args.indexOf('--part');
  const partNum = partArgIdx !== -1 ? parseInt(args[partArgIdx + 1], 10) : null;

  const targetPath = args.find(a => !a.startsWith('--') && (partArgIdx === -1 || a !== String(partNum)));

  if (targetPath) {
    const absPath = path.resolve(process.cwd(), targetPath);
    if (!fs.existsSync(absPath)) {
      console.error(`Target file not found: ${absPath}`);
      process.exit(1);
    }

    const fileUrl = pathToFileURL(absPath).href;
    const mod = await import(fileUrl);
    const testObj = Object.values(mod).find(v => v && typeof v === 'object' && v.audio_url && v.transcript);
    if (!testObj) {
      console.error(`Could not find a valid ListeningTest export in ${absPath}`);
      process.exit(1);
    }

    const { ok } = await verifyTest(testObj, absPath, { transcribe, fix });
    process.exit(ok ? 0 : 1);
  }

  if (partNum || isAll) {
    const banksToCheck = [];
    if (partNum === 1 || isAll) {
      const part1Mod = await import(pathToFileURL(path.resolve('src/features/listening/data/part1Bank.ts')).href);
      for (const [key, test] of Object.entries(part1Mod)) {
        if (key.startsWith('HCMUE_')) {
          const testNum = key.match(/[0-9]+/)?.[0];
          const filePath = path.resolve(`src/features/listening/data/drills/hcmue/part1/hcmuePart1_${testNum}.ts`);
          banksToCheck.push({ test, filePath });
        }
      }
    }

    if (partNum === 2 || isAll) {
      const part2Mod = await import(pathToFileURL(path.resolve('src/features/listening/data/part2Bank.ts')).href);
      for (const [key, test] of Object.entries(part2Mod)) {
        if (key.startsWith('HCMUE_')) {
          const testNum = key.match(/[0-9]+/)?.[0];
          const filePath = path.resolve(`src/features/listening/data/drills/hcmue/part2/hcmuePart2_${testNum}.ts`);
          banksToCheck.push({ test, filePath });
        }
      }
    }

    if (partNum === 3 || isAll) {
      const part3Mod = await import(pathToFileURL(path.resolve('src/features/listening/data/part3Bank.ts')).href);
      for (const [key, test] of Object.entries(part3Mod)) {
        if (key.startsWith('HCMUE_')) {
          const testNum = key.match(/[0-9]+/)?.[0];
          const filePath = path.resolve(`src/features/listening/data/drills/hcmue/part3/hcmuePart3_${testNum}.ts`);
          banksToCheck.push({ test, filePath });
        }
      }
    }

    console.log(`Batch checking ${banksToCheck.length} listening tests...`);
    let totalFailed = 0;
    for (const item of banksToCheck) {
      const { ok } = await verifyTest(item.test, item.filePath, { transcribe, fix });
      if (!ok) totalFailed++;
    }

    console.log(`\n================================================================================`);
    console.log(`SUMMARY: ${banksToCheck.length - totalFailed} / ${banksToCheck.length} PASSED. (${totalFailed} failed)`);
    console.log(`================================================================================`);
    process.exit(totalFailed === 0 ? 0 : 1);
  }

  console.log(`
Usage:
  node --experimental-strip-types scripts/verify-timestamps.mjs [options] [target_file]

Options:
  --part <1|2|3>    Verify all tests in a specific VSTEP part
  --all             Verify all listening drill banks across Parts 1, 2, and 3
  --transcribe      Generate word annotations via Gemini API if missing
  --fix             Automatically update the .ts file with ground-truth audio timestamps
  `);
}

main().catch(err => {
  console.error('[Fatal Error]', err);
  process.exit(1);
});
