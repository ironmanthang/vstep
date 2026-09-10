#!/usr/bin/env node
/**
 * Dynamic Listening Data Exporter
 * Traverses src/features/listening/data/drills/ and src/features/listening/data/mockTests/,
 * imports each test module, extracts metadata & transcript/question arrays,
 * and writes a unified scripts/all_listening_data.json.
 * 
 * Usage:
 *   node --experimental-strip-types scripts/export_all_listening.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

function findTsFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findTsFiles(fullPath));
    } else if (
      entry.isFile() &&
      entry.name.endsWith('.ts') &&
      !entry.name.endsWith('.test.ts') &&
      entry.name !== 'index.ts'
    ) {
      results.push(fullPath);
    }
  }
  return results;
}

async function exportAll() {
  const cwd = process.cwd();
  const drillsDir = path.join(cwd, 'src/features/listening/data/drills');
  const mockDir = path.join(cwd, 'src/features/listening/data/mockTests');

  const drillFiles = findTsFiles(drillsDir).sort();
  const mockFiles = findTsFiles(mockDir).sort();
  const allFiles = [...drillFiles, ...mockFiles];

  console.log(`[Export] Discovered ${allFiles.length} listening test files (${drillFiles.length} drills, ${mockFiles.length} mock tests).`);

  const result = [];
  for (const absPath of allFiles) {
    const relPath = path.relative(cwd, absPath).replace(/\\/g, '/');
    try {
      const mod = await import(pathToFileURL(absPath).href);
      const test = Object.values(mod).find(
        (v) => v && typeof v === 'object' && v.audio_url && v.transcript
      );

      if (!test) {
        console.warn(`[Export] Skipped (no listening test object found): ${relPath}`);
        continue;
      }

      result.push({
        relPath,
        id: test.id,
        title: test.title,
        part: test.part,
        audio_url: test.audio_url,
        duration_seconds: test.duration_seconds,
        transcript: (test.transcript || []).map((t) => ({
          start_ms: t.start_ms,
          end_ms: t.end_ms,
          text_en: t.text_en,
          is_clue_for_question: t.is_clue_for_question || '',
        })),
        questions: (test.questions || []).map((q) => ({
          id: q.id,
          question_text: q.question_text,
          options: q.options,
          correct_key: q.correct_key,
        })),
      });
    } catch (err) {
      console.error(`[Export] Error importing ${relPath}:`, err.message);
    }
  }

  const outPath = path.join(cwd, 'scripts/all_listening_data.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`[Export] Successfully exported ${result.length} listening tests to ${outPath}`);
}

exportAll().catch((err) => {
  console.error('[Export Error]', err);
  process.exit(1);
});
