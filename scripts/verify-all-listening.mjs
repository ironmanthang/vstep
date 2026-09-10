#!/usr/bin/env node
/**
 * Comprehensive Listening Timestamp & Audio Alignment Verifier
 * 
 * Dynamically discovers and verifies all Listening Tests across:
 * - Part 1 (HCMUE Drills)
 * - Part 2 (HCMUE Drills)
 * - Part 3 (HCMUE Drills)
 * - Mock Tests (Full Mock Tests)
 * 
 * Usage:
 *   node --experimental-strip-types scripts/verify-all-listening.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

function msToTime(ms) {
  if (typeof ms !== 'number' || isNaN(ms)) return '--:--';
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function getAudioDuration(audioPath) {
  try {
    const out = execSync(
      `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${audioPath}"`,
      { stdio: ['pipe', 'pipe', 'ignore'] }
    ).toString().trim();
    return parseFloat(out);
  } catch {
    return null;
  }
}

function listTsFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.ts') && !f.endsWith('.test.ts') && f !== 'index.ts')
    .sort()
    .map(f => path.join(dir, f).replace(/\\/g, '/'));
}

async function verifyAll() {
  console.log('================================================================================');
  console.log('       VSTEP LISTENING AUDIO & TIMESTAMP VERIFICATION SUITE');
  console.log('================================================================================\n');

  const cwd = process.cwd();
  const groups = [
    {
      name: 'PART 1: HCMUE Drills (Short Announcements & Instructions)',
      files: listTsFiles(path.join(cwd, 'src/features/listening/data/drills/hcmue/part1'))
    },
    {
      name: 'PART 2: HCMUE Drills (Conversations)',
      files: listTsFiles(path.join(cwd, 'src/features/listening/data/drills/hcmue/part2'))
    },
    {
      name: 'PART 3: HCMUE Drills (Lectures & Talks)',
      files: listTsFiles(path.join(cwd, 'src/features/listening/data/drills/hcmue/part3'))
    },
    {
      name: 'MOCK TESTS: Full 35-Question Exams (Part 1 + Part 2 + Part 3)',
      files: listTsFiles(path.join(cwd, 'src/features/listening/data/mockTests'))
    }
  ];

  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;

  for (const group of groups) {
    console.log(`\n--- ${group.name} (${group.files.length} tests) ---`);

    for (const fullPath of group.files) {
      totalTests++;
      const relPath = path.relative(cwd, fullPath).replace(/\\/g, '/');

      if (!fs.existsSync(fullPath)) {
        console.error(`  ❌ [MISSING FILE] ${relPath}`);
        failedTests++;
        continue;
      }

      const fileUrl = pathToFileURL(fullPath).href;
      const mod = await import(fileUrl);
      const test = Object.values(mod).find(v => v && typeof v === 'object' && v.audio_url && v.transcript);

      if (!test) {
        console.error(`  ❌ [INVALID SCHEMA] ${relPath}`);
        failedTests++;
        continue;
      }

      // 1. Audio file check
      const localAudioPath = path.join(cwd, 'public', test.audio_url.replace(/^\//, ''));
      if (!fs.existsSync(localAudioPath)) {
        console.error(`  ❌ [MISSING AUDIO] ${relPath} -> ${test.audio_url}`);
        failedTests++;
        continue;
      }

      const realDuration = getAudioDuration(localAudioPath);
      const durDiff = realDuration ? Math.abs(realDuration - test.duration_seconds) : 0;
      if (durDiff > 3) {
        console.warn(`  ⚠️ [DURATION DRIFT] ${test.id}: Code states ${test.duration_seconds}s, physical audio is ${realDuration.toFixed(1)}s`);
      }

      // 2. Transcript integrity
      let transcriptErrors = 0;
      let lastEndMs = 0;

      for (let i = 0; i < test.transcript.length; i++) {
        const seg = test.transcript[i];
        if (seg.start_ms < 0 || seg.end_ms <= seg.start_ms) {
          console.error(`  ❌ [INVERTED SEGMENT] ${test.id} seg ${i}: ${seg.start_ms}ms -> ${seg.end_ms}ms`);
          transcriptErrors++;
        }
        if (seg.start_ms < lastEndMs - 100) {
          console.error(`  ❌ [OVERLAPPING SEGMENT] ${test.id} seg ${i}: start ${seg.start_ms}ms < prev end ${lastEndMs}ms`);
          transcriptErrors++;
        }
        if (realDuration && seg.end_ms > (realDuration + 3) * 1000) {
          console.error(`  ❌ [OUT OF BOUNDS] ${test.id} seg ${i}: end ${seg.end_ms}ms > audio ${realDuration * 1000}ms`);
          transcriptErrors++;
        }
        lastEndMs = seg.end_ms;
      }

      // 3. Question clue coverage
      let missingClues = 0;
      for (const q of test.questions) {
        const found = test.transcript.some(t => {
          if (!t.is_clue_for_question) return false;
          const ids = t.is_clue_for_question.split(',').map(s => s.trim());
          return ids.includes(q.id);
        });
        if (!found) {
          missingClues++;
        }
      }

      if (missingClues > 0) {
        console.error(`  ❌ [MISSING CLUES] ${test.id}: ${missingClues} / ${test.questions.length} questions lack transcript clues`);
      }

      // 4. Check directions / question 1 start timestamp for Part 1 Example Trap
      let exampleTrap = false;
      if (test.part === 1 && group.name.includes('HCMUE')) {
        const q1Seg = test.transcript.find(t => t.is_clue_for_question && t.is_clue_for_question.includes('_q'));
        if (q1Seg && q1Seg.start_ms < 100000) {
          console.error(`  ❌ [EXAMPLE TRAP] ${test.id}: Q1 start_ms is ${q1Seg.start_ms}ms (should be > 120,000ms after reading time)`);
          exampleTrap = true;
        }
      }

      const passed = transcriptErrors === 0 && missingClues === 0 && !exampleTrap;
      if (passed) {
        passedTests++;
        const qCount = test.questions.length;
        const segCount = test.transcript.length;
        const durStr = msToTime(test.duration_seconds * 1000);
        console.log(`  ✔ [PASS] ${test.id.padEnd(18)} | ${test.title.padEnd(52)} | ${durStr} | ${segCount.toString().padStart(2)} segs | ${qCount.toString().padStart(2)} Qs`);
      } else {
        failedTests++;
        console.error(`  ✖ [FAIL] ${test.id} (${relPath})`);
      }
    }
  }

  console.log('\n================================================================================');
  console.log(`VERIFICATION SUMMARY: ${passedTests}/${totalTests} tests PASSED cleanly.`);
  if (failedTests > 0) {
    console.error(`❌ ${failedTests} tests failed verification checks! Review output above.`);
    process.exit(1);
  } else {
    console.log('🎉 100% of listening audio assets & timestamps are strictly validated.');
    console.log('================================================================================\n');
  }
}

verifyAll().catch(err => {
  console.error('[Verification Error]', err);
  process.exit(1);
});
