#!/usr/bin/env node
/**
 * Comprehensive Listening Timestamp & Audio Alignment Verifier
 * 
 * Verifies all 22 Listening Tests across:
 * - Part 1 (HCMUE Drills 01 to 05)
 * - Part 2 (HCMUE Drills 01 to 05)
 * - Part 3 (HCMUE Drills 01 to 05)
 * - Mock Tests (Full Mock Tests 01 to 07)
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { pathToFileURL } from 'url';

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

async function verifyAll() {
  console.log('================================================================================');
  console.log('       VSTEP LISTENING AUDIO & TIMESTAMP VERIFICATION SUITE');
  console.log('================================================================================\n');

  const groups = [
    {
      name: 'PART 1: HCMUE Drills (Short Announcements & Instructions)',
      files: [
        'src/features/listening/data/drills/hcmue/part1/hcmuePart1_01.ts',
        'src/features/listening/data/drills/hcmue/part1/hcmuePart1_02.ts',
        'src/features/listening/data/drills/hcmue/part1/hcmuePart1_03.ts',
        'src/features/listening/data/drills/hcmue/part1/hcmuePart1_04.ts',
        'src/features/listening/data/drills/hcmue/part1/hcmuePart1_05.ts',
      ]
    },
    {
      name: 'PART 2: HCMUE Drills (Conversations)',
      files: [
        'src/features/listening/data/drills/hcmue/part2/hcmuePart2_01.ts',
        'src/features/listening/data/drills/hcmue/part2/hcmuePart2_02.ts',
        'src/features/listening/data/drills/hcmue/part2/hcmuePart2_03.ts',
        'src/features/listening/data/drills/hcmue/part2/hcmuePart2_04.ts',
        'src/features/listening/data/drills/hcmue/part2/hcmuePart2_05.ts',
      ]
    },
    {
      name: 'PART 3: HCMUE Drills (Lectures & Talks)',
      files: [
        'src/features/listening/data/drills/hcmue/part3/hcmuePart3_01.ts',
        'src/features/listening/data/drills/hcmue/part3/hcmuePart3_02.ts',
        'src/features/listening/data/drills/hcmue/part3/hcmuePart3_03.ts',
        'src/features/listening/data/drills/hcmue/part3/hcmuePart3_04.ts',
        'src/features/listening/data/drills/hcmue/part3/hcmuePart3_05.ts',
      ]
    },
    {
      name: 'MOCK TESTS: Full 35-Question Exams (Part 1 + Part 2 + Part 3)',
      files: [
        'src/features/listening/data/mockTests/mockTest01.ts',
        'src/features/listening/data/mockTests/mockTest02.ts',
        'src/features/listening/data/mockTests/mockTest03.ts',
        'src/features/listening/data/mockTests/mockTest04.ts',
        'src/features/listening/data/mockTests/mockTest05.ts',
        'src/features/listening/data/mockTests/mockTest06.ts',
        'src/features/listening/data/mockTests/mockTest07.ts',
      ]
    }
  ];

  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;

  for (const group of groups) {
    console.log(`\n--- ${group.name} ---`);

    for (const relPath of group.files) {
      totalTests++;
      const absPath = path.resolve(process.cwd(), relPath);

      if (!fs.existsSync(absPath)) {
        console.error(`  ❌ [MISSING FILE] ${relPath}`);
        failedTests++;
        continue;
      }

      const fileUrl = pathToFileURL(absPath).href;
      const mod = await import(fileUrl);
      const test = Object.values(mod).find(v => v && typeof v === 'object' && v.audio_url && v.transcript);

      if (!test) {
        console.error(`  ❌ [INVALID SCHEMA] ${relPath}`);
        failedTests++;
        continue;
      }

      // 1. Audio file check
      const localAudioPath = path.join(process.cwd(), 'public', test.audio_url.replace(/^\//, ''));
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
        const durStr = `${msToTime(test.duration_seconds * 1000)} (${test.duration_seconds}s)`;
        console.log(`  ✔ [PASS] ${test.id.padEnd(20)} | ${qCount.toString().padStart(2)}Q | ${segCount.toString().padStart(2)} segs | ${durStr.padEnd(16)} | ${path.basename(relPath)}`);
      } else {
        failedTests++;
      }
    }
  }

  console.log('\n================================================================================');
  console.log(`FINAL RESULTS: ${passedTests} / ${totalTests} PASSED. (${failedTests} failed)`);
  console.log('================================================================================\n');

  process.exit(failedTests === 0 ? 0 : 1);
}

verifyAll().catch(err => {
  console.error('[FATAL]', err);
  process.exit(1);
});
