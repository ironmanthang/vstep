#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const DATA_FILE = path.resolve('scripts/data/anhviet109K.txt');
const OXFORD_FILE = path.resolve('scripts/data/oxford_5k.csv');
const CEFRJ_FILE = path.resolve('scripts/data/cefrj.csv');
const FLASHCARD_DIR = path.resolve('src/features/flashcard/corpus');
const READING_DIR = path.resolve('src/features/reading/data');
const OUT_FILE = path.resolve('src/features/reading/data/dictionaryVi.ts');

console.log('Compiling English-Vietnamese Dictionary for Reading Studio...');

// 1. Gather all target vocabulary
const targetWords = new Set();

// Oxford 5k
if (fs.existsSync(OXFORD_FILE)) {
  const lines = fs.readFileSync(OXFORD_FILE, 'utf-8').split('\n').slice(1);
  for (const line of lines) {
    const parts = line.split(',');
    if (parts[0]) targetWords.add(parts[0].trim().toLowerCase());
  }
}

// CEFR-J Core
if (fs.existsSync(CEFRJ_FILE)) {
  const lines = fs.readFileSync(CEFRJ_FILE, 'utf-8').split('\n').slice(1);
  for (const line of lines) {
    const parts = line.split(',');
    if (parts[0]) targetWords.add(parts[0].trim().toLowerCase());
  }
}

// Flashcard corpus lemmas
if (fs.existsSync(FLASHCARD_DIR)) {
  for (const file of fs.readdirSync(FLASHCARD_DIR)) {
    if (!file.endsWith('.ts') || file.includes('index') || file.includes('test')) continue;
    const content = fs.readFileSync(path.join(FLASHCARD_DIR, file), 'utf-8');
    for (const match of content.matchAll(/word:\s*["']([^"']+)["']/g)) {
      targetWords.add(match[1].trim().toLowerCase());
    }
  }
}

// All 48 VSTEP Reading Passages (ULIS & HCMUE)
function scanReadingPassages(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanReadingPassages(fullPath);
    } else if (
      entry.name.endsWith('.ts') &&
      !entry.name.includes('test') &&
      !entry.name.includes('index') &&
      !entry.name.includes('dictionary')
    ) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const words = content.match(/[a-zA-Z]{2,}/g) || [];
      for (const w of words) targetWords.add(w.toLowerCase());
    }
  }
}
scanReadingPassages(READING_DIR);

console.log(`Gathered ${targetWords.size} unique target vocabulary words.`);

// 2. Parse authentic anhviet109K dictionary
if (!fs.existsSync(DATA_FILE)) {
  console.error(`Error: Dictionary source file not found at ${DATA_FILE}`);
  process.exit(1);
}

const rawText = fs.readFileSync(DATA_FILE, 'utf-8');
const rawEntries = rawText.split('\n@');

function normalizePos(pos) {
  const p = pos.toLowerCase();
  if (p.includes('ngoại động từ') || p.includes('nội động từ') || p.includes('động từ')) return 'động từ';
  if (p.includes('danh từ')) return 'danh từ';
  if (p.includes('tính từ')) return 'tính từ';
  if (p.includes('phó từ') || p.includes('trạng từ')) return 'phó từ';
  if (p.includes('giới từ')) return 'giới từ';
  if (p.includes('liên từ')) return 'liên từ';
  if (p.includes('thán từ')) return 'thán từ';
  if (p.includes('mạo từ')) return 'mạo từ';
  return pos.split(',')[0].trim() || 'nghĩa';
}

function cleanDefinition(def) {
  let cleaned = def.replace(/\s+/g, ' ').trim();
  // Remove leading symbols or numbering if present
  cleaned = cleaned.replace(/^[0-9+.\-:]\s*/, '');
  // Capitalize first character
  if (cleaned.length > 0) {
    cleaned = cleaned[0].toUpperCase() + cleaned.slice(1);
  }
  return cleaned;
}

function entryScore(entry) {
  if (!entry || !Array.isArray(entry.m)) return 0;
  let score = 0;
  if (entry.p) score += 100;
  for (const m of entry.m) {
    if (m.pos !== 'nghĩa') score += 10;
    if (Array.isArray(m.def)) score += m.def.length;
  }
  return score;
}

const dictionary = {};

for (let i = 0; i < rawEntries.length; i++) {
  let entryStr = rawEntries[i];
  if (i === 0 && entryStr.startsWith('@')) entryStr = entryStr.slice(1);
  const lines = entryStr.trim().split('\n');
  const header = lines[0];
  const headMatch = header.match(/^([^\s/]+)(?:\s+[/[](.*)[/\]])?/);
  if (!headMatch) continue;

  const word = headMatch[1].trim().toLowerCase();
  // Filter against target words
  if (!targetWords.has(word)) continue;

  const phonetic = headMatch[2]
    ? '/' + headMatch[2].trim().replace(/^\/+|\/+$/g, '') + '/'
    : undefined;

  const posMap = new Map();
  let currentPos = 'nghĩa';

  for (let j = 1; j < lines.length; j++) {
    const line = lines[j].trim();
    if (!line) continue;

    if (line.startsWith('*')) {
      currentPos = normalizePos(line.replace(/^\*\s*/, '').trim());
    } else if (line.startsWith('-')) {
      const def = line.replace(/^-\s*/, '').trim();
      if (def && !def.startsWith('=') && !def.startsWith('!')) {
        const cleaned = cleanDefinition(def);
        if (cleaned) {
          if (!posMap.has(currentPos)) posMap.set(currentPos, []);
          const defs = posMap.get(currentPos);
          if (defs.length < 3 && !defs.includes(cleaned)) {
            defs.push(cleaned);
          }
        }
      }
    }
  }

  const meanings = [];
  for (const [pos, defs] of posMap.entries()) {
    if (defs.length > 0) {
      meanings.push({ pos, def: defs });
    }
  }

  if (meanings.length > 0) {
    const candidateEntry = {
      ...(phonetic ? { p: phonetic } : {}),
      m: meanings,
    };
    if (!dictionary[word] || entryScore(candidateEntry) > entryScore(dictionary[word])) {
      dictionary[word] = candidateEntry;
    }
  }
}

const wordCount = Object.keys(dictionary).length;
console.log(`Successfully compiled ${wordCount} high-quality bilingual dictionary entries.`);

// 3. Generate TypeScript file with types and lemmatization helper
const tsContent = `// Auto-generated by scripts/build_dictionary.mjs
// Sourced from authentic public-domain English-Vietnamese lexicographical corpus (anhviet109K).
// Filtered against Oxford 5000, CEFR-J, and authentic VSTEP Reading exams (ULIS 01-07 & HCMUE 01-05).

export interface DictSense {
  pos: string;
  def: string[];
}

export interface DictEntry {
  p?: string; // IPA pronunciation, e.g. "/reiz/"
  m: DictSense[]; // Meanings grouped by Part of Speech
}

export interface LookupResult {
  entry: DictEntry;
  matchedWord: string;
  lemma?: string;
}

const IRREGULAR_LEMMAS: Record<string, string> = {
  better: 'good',
  best: 'good',
  worse: 'bad',
  worst: 'bad',
  went: 'go',
  gone: 'go',
  was: 'be',
  were: 'be',
  been: 'be',
  did: 'do',
  done: 'do',
  had: 'have',
  has: 'have',
  said: 'say',
  made: 'make',
  took: 'take',
  taken: 'take',
  saw: 'see',
  seen: 'see',
  came: 'come',
  knew: 'know',
  known: 'know',
  got: 'get',
  gotten: 'get',
  gave: 'give',
  given: 'give',
  found: 'find',
  thought: 'think',
  told: 'tell',
  became: 'become',
  left: 'leave',
  felt: 'feel',
  put: 'put',
  brought: 'bring',
  began: 'begin',
  begun: 'begin',
  kept: 'keep',
  held: 'hold',
  wrote: 'write',
  written: 'write',
  stood: 'stand',
  heard: 'hear',
  let: 'let',
  meant: 'mean',
  set: 'set',
  met: 'meet',
  ran: 'run',
  paid: 'pay',
  sat: 'sit',
  spoke: 'speak',
  spoken: 'speak',
  lay: 'lie',
  led: 'lead',
  read: 'read',
  spent: 'spend',
  grew: 'grow',
  grown: 'grow',
  won: 'win',
  taught: 'teach',
  bought: 'buy',
  sent: 'send',
  built: 'build',
  fell: 'fall',
  fallen: 'fall',
  cut: 'cut',
  rose: 'rise',
  risen: 'rise',
  drove: 'drive',
  driven: 'drive',
  struck: 'strike',
  children: 'child',
  men: 'man',
  women: 'woman',
  feet: 'foot',
  teeth: 'tooth',
  mice: 'mouse',
  geese: 'goose',
  people: 'person',
  data: 'datum',
  criteria: 'criterion',
  phenomena: 'phenomenon',
  analyses: 'analysis',
  hypotheses: 'hypothesis',
  crises: 'crisis',
};

/**
 * Returns candidate root forms (lemmas) for an inflected English word.
 * Covers plural nouns, verb inflections (-ed, -ing, -s), adverbs (-ly),
 * and comparatives (-er, -est).
 */
export function getLemmatizationCandidates(word: string): string[] {
  const w = word.toLowerCase();
  const candidates: string[] = [];

  if (IRREGULAR_LEMMAS[w]) {
    candidates.push(IRREGULAR_LEMMAS[w]);
  }

  // Plural / 3rd-person singular: -ies -> -y, -es, -s
  if (w.endsWith('ies') && w.length > 4) {
    candidates.push(w.slice(0, -3) + 'y');
  }
  if (w.endsWith('es') && w.length > 3) {
    candidates.push(w.slice(0, -2));
    candidates.push(w.slice(0, -1));
  }
  if (w.endsWith('s') && !w.endsWith('ss') && w.length > 2) {
    candidates.push(w.slice(0, -1));
  }

  // Past / Participle: -ied -> -y, -ed -> drop ed or e, doubled consonants
  if (w.endsWith('ied') && w.length > 4) {
    candidates.push(w.slice(0, -3) + 'y');
  }
  if (w.endsWith('ed') && w.length > 3) {
    candidates.push(w.slice(0, -2));
    candidates.push(w.slice(0, -1));
    if (w.length > 5 && w[w.length - 3] === w[w.length - 4]) {
      candidates.push(w.slice(0, -3));
    }
  }

  // Continuous: -ing -> drop ing, add e, doubled consonants
  if (w.endsWith('ing') && w.length > 4) {
    candidates.push(w.slice(0, -3));
    candidates.push(w.slice(0, -3) + 'e');
    if (w.length > 6 && w[w.length - 4] === w[w.length - 5]) {
      candidates.push(w.slice(0, -4));
    }
  }

  // Adverb: -ly -> drop ly, -ily -> -y
  if (w.endsWith('ly') && w.length > 3) {
    candidates.push(w.slice(0, -2));
    if (w.endsWith('ily') && w.length > 4) {
      candidates.push(w.slice(0, -3) + 'y');
    }
  }

  // Comparative / Superlative: -ier/-iest -> -y, -er/-est -> base
  if (w.endsWith('iest') && w.length > 5) {
    candidates.push(w.slice(0, -4) + 'y');
  } else if (w.endsWith('est') && w.length > 4) {
    candidates.push(w.slice(0, -3));
    candidates.push(w.slice(0, -2));
  }
  if (w.endsWith('ier') && w.length > 4) {
    candidates.push(w.slice(0, -3) + 'y');
  } else if (w.endsWith('er') && w.length > 3) {
    candidates.push(w.slice(0, -2));
    candidates.push(w.slice(0, -1));
  }

  return candidates;
}

export const DICTIONARY_VI: Record<string, DictEntry> = ${JSON.stringify(dictionary, null, 2)};

/**
 * High-performance 0ms bilingual dictionary lookup with automatic
 * English stemming and lemmatization fallback.
 */
export function lookupDictionary(word: string): LookupResult | null {
  const clean = word.trim().toLowerCase().replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, '');
  if (!clean) return null;

  // Direct hit
  if (DICTIONARY_VI[clean]) {
    return { entry: DICTIONARY_VI[clean], matchedWord: clean };
  }

  // Lemmatization fallback
  const candidates = getLemmatizationCandidates(clean);
  for (const cand of candidates) {
    if (DICTIONARY_VI[cand]) {
      return { entry: DICTIONARY_VI[cand], matchedWord: clean, lemma: cand };
    }
  }

  return null;
}
`;

fs.writeFileSync(OUT_FILE, tsContent, 'utf-8');
console.log(`Successfully generated bilingual dictionary at ${OUT_FILE}`);


