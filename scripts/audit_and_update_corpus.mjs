#!/usr/bin/env node
/**
 * VSTEP Flashcard Corpus CEFR Tier Auditor & Normalizer
 * 
 * Sourced against:
 * 1. Oxford 3000 & 5000 (CEFR A1-C1)
 * 2. CEFR-J Project (ver 1.5) & Octanove Labs (CEFR C1/C2)
 * 3. Gemini Flash Cascade for authentic VSTEP academic terms exceeding 5k frequency.
 * 
 * Target Tiers:
 * - "B1": Foundational / lower-intermediate (A1, A2, B1)
 * - "B2": Upper-intermediate academic / professional
 * - "C1": Advanced academic, formal nuance, technical & specialized mastery (C1, C2)
 * 
 * Usage:
 *   node scripts/audit_and_update_corpus.mjs [--dry-run]
 */

import fs from 'node:fs';
import path from 'node:path';
import './loadEnv.mjs';

const isDryRun = process.argv.includes('--dry-run');

const TOPIC_FILES = [
  'src/features/flashcard/corpus/education.ts',
  'src/features/flashcard/corpus/work.ts',
  'src/features/flashcard/corpus/health.ts',
  'src/features/flashcard/corpus/environment.ts',
  'src/features/flashcard/corpus/technology.ts',
  'src/features/flashcard/corpus/travel.ts',
  'src/features/flashcard/corpus/society.ts',
  'src/features/flashcard/corpus/media.ts',
];

const CACHE_FILE = path.resolve('scripts/.cefr_audit_cache.json');
let cache = {};
if (fs.existsSync(CACHE_FILE)) {
  try {
    cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
  } catch {
    cache = {};
  }
}

// 1. Load Reference Dictionaries
const oxfordCsv = fs.readFileSync(path.resolve('scripts/data/oxford_5k.csv'), 'utf-8');
const oxfordDict = new Map();
for (const line of oxfordCsv.trim().split('\n').slice(1)) {
  const parts = line.split(',');
  if (parts.length >= 3) {
    const w = parts[0].trim().toLowerCase();
    const lvl = parts[1].trim().toUpperCase();
    const pos = parts[2].trim().toLowerCase();
    if (!oxfordDict.has(w)) oxfordDict.set(w, []);
    oxfordDict.get(w).push({ level: lvl, pos });
  }
}

const cefrjDict = new Map();
for (const file of ['scripts/data/cefrj.csv', 'scripts/data/c1c2.csv']) {
  const csv = fs.readFileSync(path.resolve(file), 'utf-8');
  for (const line of csv.trim().split('\n').slice(1)) {
    const parts = line.split(',');
    if (parts.length >= 3) {
      const w = parts[0].trim().toLowerCase();
      const pos = parts[1].trim().toLowerCase();
      const lvl = parts[2].trim().toUpperCase().split('.')[0];
      if (!cefrjDict.has(w)) cefrjDict.set(w, []);
      cefrjDict.get(w).push({ level: lvl, pos });
    }
  }
}

function toVstepLevel(raw) {
  if (!raw) return null;
  const u = raw.toUpperCase();
  if (u === 'A1' || u === 'A2' || u === 'B1') return 'B1';
  if (u === 'B2') return 'B2';
  if (u === 'C1' || u === 'C2') return 'C1';
  return null;
}

function getVariants(w) {
  const list = [];
  if (w.endsWith('ize')) list.push(w.slice(0, -3) + 'ise');
  if (w.endsWith('ized')) {
    list.push(w.slice(0, -4) + 'ise');
    list.push(w.slice(0, -4) + 'ised');
    list.push(w.slice(0, -4) + 'ize');
  }
  if (w.endsWith('izing')) {
    list.push(w.slice(0, -5) + 'ise');
    list.push(w.slice(0, -5) + 'ize');
    list.push(w.slice(0, -5) + 'ising');
  }
  if (w.endsWith('ization')) {
    list.push(w.slice(0, -7) + 'isation');
    list.push(w.slice(0, -7) + 'ise');
  }
  if (w.endsWith('or')) list.push(w.slice(0, -2) + 'our');
  if (w.endsWith('our')) list.push(w.slice(0, -3) + 'or');
  if (w.endsWith('ll')) list.push(w.slice(0, -1));
  if (w.endsWith('ies')) list.push(w.slice(0, -3) + 'y');
  if (w.endsWith('es')) list.push(w.slice(0, -2));
  if (w.endsWith('s') && !w.endsWith('ss')) list.push(w.slice(0, -1));
  if (w.endsWith('ing')) {
    list.push(w.slice(0, -3));
    list.push(w.slice(0, -3) + 'e');
  }
  if (w.endsWith('ed')) {
    list.push(w.slice(0, -2));
    list.push(w.slice(0, -1));
  }
  if (w.endsWith('ly')) {
    list.push(w.slice(0, -2));
    list.push(w.slice(0, -2) + 'le');
  }
  return list;
}

function queryCurated(word, pos) {
  const w = word.toLowerCase().trim();

  // 1. Direct Oxford match
  const ox = oxfordDict.get(w);
  if (ox) {
    const matchingPos = ox.find(e => e.pos === pos);
    if (matchingPos) return { level: toVstepLevel(matchingPos.level), source: 'oxford-exact-pos' };
    return { level: toVstepLevel(ox[0].level), source: 'oxford-headword' };
  }

  // 2. Direct CEFR-J match
  const cj = cefrjDict.get(w);
  if (cj) {
    const matchingPos = cj.find(e => e.pos === pos);
    if (matchingPos) return { level: toVstepLevel(matchingPos.level), source: 'cefrj-exact-pos' };
    return { level: toVstepLevel(cj[0].level), source: 'cefrj-headword' };
  }

  // 3. Variant matching
  for (const v of getVariants(w)) {
    const oxV = oxfordDict.get(v);
    if (oxV) return { level: toVstepLevel(oxV[0].level), source: `oxford-variant(${v})` };
    const cjV = cefrjDict.get(v);
    if (cjV) return { level: toVstepLevel(cjV[0].level), source: `cefrj-variant(${v})` };
  }

  // 4. Multi-word phrases
  if (w.includes(' ') || pos === 'phrase') {
    const parts = w.split(/[\s-]+/);
    const subLevels = [];
    for (const p of parts) {
      const sub = queryCurated(p, 'noun');
      if (sub) subLevels.push(sub.level);
    }
    if (subLevels.length > 0) {
      if (subLevels.includes('C1')) return { level: 'C1', source: 'phrase-max-constituent' };
      if (subLevels.includes('B2')) return { level: 'B2', source: 'phrase-max-constituent' };
      return { level: 'B1', source: 'phrase-max-constituent' };
    }
  }

  return null;
}

async function evaluateBatchLLM(cardsBatch) {
  const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error('Missing VITE_GEMINI_API_KEY or GOOGLE_API_KEY in environment');
  }

  const payload = cardsBatch.map(c => ({
    id: c.id,
    word: c.word,
    pos: c.pos,
    definition_vi: c.definition_vi,
    example: c.example_sentence_en,
    topic: c.topic
  }));

  const prompt = `You are a premier CEFR lexicographer assessing vocabulary difficulty specifically for VSTEP (Vietnamese Standardized Test of English Proficiency).
Evaluate each vocabulary item in its provided context, part of speech, and definition, and determine its appropriate CEFR level:
- "B1": Foundational everyday words needed for basic VSTEP B1 competence (Bậc 3).
- "B2": Upper-intermediate general and professional words needed for B2 level essays, workplace, and articles (Bậc 4).
- "C1": Advanced academic, formal nuance, scientific, or specialized domain mastery (Bậc 5 / C1-C2).

Items to evaluate:
${JSON.stringify(payload, null, 2)}

Return ONLY a JSON array of objects with schema:
[
  { "id": string, "level": "B1" | "B2" | "C1", "rationale": string }
]`;

  const models = [
    'gemini-3.8-flash',
    'gemini-3.7-flash',
    'gemini-3.6-flash',
    'gemini-3.5-flash',
    'gemini-3.5-flash-lite',
    'gemini-2.5-flash',
  ];
  let lastErr = null;

  for (const model of models) {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' }
        })
      });

      if (res.status === 429) {
        console.warn(`Model ${model} hit 429 rate limit. Pausing 3s before next candidate...`);
        await new Promise(r => setTimeout(r, 3000));
        continue;
      }

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${await res.text()}`);
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error('Empty response from model');

      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) return parsed;
      if (parsed.items && Array.isArray(parsed.items)) return parsed.items;
      throw new Error('Unexpected JSON structure: ' + text.slice(0, 100));
    } catch (err) {
      lastErr = err;
      console.warn(`Model ${model} failed: ${err.message}. Trying next candidate...`);
    }
  }

  throw lastErr;
}

// 2. Parse All Cards & Plan Updates
async function main() {
  console.log('=== VSTEP CEFR TIER AUDIT & NORMALIZER ===');
  if (isDryRun) {
    console.log('[DRY RUN MODE] No files will be modified.');
  }

  const allCards = [];
  const fileCardMap = new Map();

  for (const relFile of TOPIC_FILES) {
    const fullPath = path.resolve(relFile);
    const content = fs.readFileSync(fullPath, 'utf-8');
    const cardsInFile = [];

    const blocks = content.split(/\{\s*\r?\n\s*id:\s*['"](fc_[^'"]+)['"]/);
    for (let i = 1; i < blocks.length; i += 2) {
      const id = blocks[i];
      const body = blocks[i + 1];

      const wordMatch = body.match(/word:\s*["']([^"']+)["']/);
      const levelMatch = body.match(/level:\s*['"]([^'"]+)['']/);
      const topicMatch = body.match(/topic:\s*['"]([^'"]+)['']/);
      const posMatch = body.match(/part_of_speech:\s*['"]([^'"]+)['']/);
      const defMatch = body.match(/definition_vi:\s*["']([^"']+)["']/);
      const exMatch = body.match(/example_sentence_en:\s*["']([^"']+)["']/);

      const card = {
        id,
        word: wordMatch[1].trim(),
        level: levelMatch[1].trim(),
        topic: topicMatch ? topicMatch[1].trim() : '',
        pos: posMatch ? posMatch[1].trim() : '',
        definition_vi: defMatch ? defMatch[1].trim() : '',
        example_sentence_en: exMatch ? exMatch[1].trim() : '',
        file: relFile
      };

      cardsInFile.push(card);
      allCards.push(card);
    }
    fileCardMap.set(relFile, cardsInFile);
    console.log(`Loaded ${cardsInFile.length} cards from ${path.basename(relFile)}`);
  }

  console.log(`\nTotal cards loaded: ${allCards.length} (Expected 3,000)`);

  // Resolution Phase
  const updates = new Map(); // id -> { newLevel, source, rationale }
  const needsLLM = [];

  for (const card of allCards) {
    // Check Cache first
    if (cache[card.id] && ['B1', 'B2', 'C1'].includes(cache[card.id].level)) {
      updates.set(card.id, cache[card.id]);
      continue;
    }

    // Curated Dictionaries
    const curated = queryCurated(card.word, card.pos);
    if (curated) {
      const update = { level: curated.level, source: curated.source };
      updates.set(card.id, update);
      cache[card.id] = update;
      continue;
    }

    needsLLM.push(card);
  }

  console.log(`Curated / Cached resolved: ${updates.size} / 3000`);
  console.log(`Unresolved needing LLM evaluation: ${needsLLM.length} / 3000`);

  // Batch LLM Evaluation
  if (needsLLM.length > 0) {
    console.log(`\nEvaluating ${needsLLM.length} cards with Gemini Flash cascade in batches...`);
    const BATCH_SIZE = 40;
    for (let i = 0; i < needsLLM.length; i += BATCH_SIZE) {
      const batch = needsLLM.slice(i, i + BATCH_SIZE);
      console.log(`Evaluating batch ${Math.floor(i / BATCH_SIZE) + 1} / ${Math.ceil(needsLLM.length / BATCH_SIZE)} (${batch.length} cards)...`);
      const results = await evaluateBatchLLM(batch);
      for (const res of results) {
        if (res.id && ['B1', 'B2', 'C1'].includes(res.level)) {
          const update = { level: res.level, source: 'gemini-cascade', rationale: res.rationale };
          updates.set(res.id, update);
          cache[res.id] = update;
        }
      }
      // Save cache after each batch
      fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf-8');
    }
  }

  // Check that all 3,000 cards have a valid level
  let missing = 0;
  for (const card of allCards) {
    if (!updates.has(card.id) || !['B1', 'B2', 'C1'].includes(updates.get(card.id).level)) {
      console.error(`Missing or invalid level for card: ${card.id} (${card.word})`);
      missing++;
    }
  }
  if (missing > 0) {
    throw new Error(`Failed to audit ${missing} cards. Aborting.`);
  }

  // Distribution & Change Analysis
  const oldDist = { B1: 0, B2: 0, C1: 0 };
  const newDist = { B1: 0, B2: 0, C1: 0 };
  const changedCards = [];

  for (const card of allCards) {
    oldDist[card.level]++;
    const newLvl = updates.get(card.id).level;
    newDist[newLvl]++;
    if (card.level !== newLvl) {
      changedCards.push({
        id: card.id,
        word: card.word,
        pos: card.pos,
        oldLevel: card.level,
        newLevel: newLvl,
        file: path.basename(card.file),
        source: updates.get(card.id).source
      });
    }
  }

  console.log('\n================ AUDIT SUMMARY ================');
  console.log(`Total Cards: ${allCards.length}`);
  console.log(`Unchanged Cards: ${allCards.length - changedCards.length}`);
  console.log(`Changed Cards: ${changedCards.length} (${((changedCards.length / allCards.length) * 100).toFixed(1)}%)`);

  console.log('\n--- DISTRIBUTION COMPARISON ---');
  console.log(`B1: ${oldDist.B1} (${((oldDist.B1 / 3000) * 100).toFixed(1)}%)  --->  ${newDist.B1} (${((newDist.B1 / 3000) * 100).toFixed(1)}%)`);
  console.log(`B2: ${oldDist.B2} (${((oldDist.B2 / 3000) * 100).toFixed(1)}%)  --->  ${newDist.B2} (${((newDist.B2 / 3000) * 100).toFixed(1)}%)`);
  console.log(`C1: ${oldDist.C1} (${((oldDist.C1 / 3000) * 100).toFixed(1)}%)  --->  ${newDist.C1} (${((newDist.C1 / 3000) * 100).toFixed(1)}%)`);

  // Write changes back to files
  if (!isDryRun) {
    console.log('\nWriting audited levels back to topic corpus files...');
    for (const relFile of TOPIC_FILES) {
      const fullPath = path.resolve(relFile);
      let content = fs.readFileSync(fullPath, 'utf-8');
      const cardsInFile = fileCardMap.get(relFile);

      let fileChanges = 0;
      for (const card of cardsInFile) {
        const audited = updates.get(card.id);
        if (card.level !== audited.level) {
          // Replace level: '...' specifically within this card's section
          // Locate the card block: id: 'fc_...' followed by level: '...'
          const cardIdPattern = new RegExp(`id:\\s*['"]${card.id}['"][^{}]*?level:\\s*['"][^'"]+['"]`);
          const match = content.match(cardIdPattern);
          if (match) {
            const originalBlock = match[0];
            const replacedBlock = originalBlock.replace(/level:\s*['"][^'"]+['"]/, `level: '${audited.level}'`);
            content = content.replace(originalBlock, replacedBlock);
            fileChanges++;
          } else {
            console.error(`Could not locate block for card ${card.id} in ${relFile}`);
          }
        }
      }

      fs.writeFileSync(fullPath, content, 'utf-8');
      console.log(`  Updated ${path.basename(relFile)}: ${fileChanges} cards updated`);
    }

    console.log('\nAll 8 topic files successfully updated!');
  }

  // Save audit report
  const reportPath = path.resolve('scripts/cefr_audit_report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    total_cards: allCards.length,
    changed_count: changedCards.length,
    old_distribution: oldDist,
    new_distribution: newDist,
    changes: changedCards
  }, null, 2), 'utf-8');
  console.log(`Saved detailed audit report to ${reportPath}`);
}

main().catch(err => {
  console.error('Fatal audit error:', err);
  process.exit(1);
});
