#!/usr/bin/env node
/**
 * VSTEP Vocabulary Mining Pipeline (Reading Skill)
 * Mined from 48 authentic reading passages (ULIS 01-07 and HCMUE 01-05),
 * enriched via Gemini Flash cascade.
 * 
 * Model cascade:
 *   gemini-3.8-flash -> gemini-3.7-flash -> gemini-3.6-flash -> gemini-3.5-flash-lite -> gemini-2.5-flash -> gemini-1.5-flash
 * 
 * Usage:
 *   node --experimental-strip-types scripts/mine_reading_vocab.mjs [--apply]
 */

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

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

export const TOPIC_CONFIG = {
  education: {
    key: 'education',
    title: 'Giáo dục & Học tập',
    file: 'src/features/flashcard/corpus/education.ts',
    prefix: 'fc_edu_',
    startId: 259,
    softTarget: 62,
  },
  work: {
    key: 'work',
    title: 'Công việc & Sự nghiệp',
    file: 'src/features/flashcard/corpus/work.ts',
    prefix: 'fc_work_',
    startId: 264,
    softTarget: 57,
  },
  health: {
    key: 'health',
    title: 'Sức khỏe & Lối sống',
    file: 'src/features/flashcard/corpus/health.ts',
    prefix: 'fc_health_',
    startId: 254,
    softTarget: 62,
  },
  environment: {
    key: 'environment',
    title: 'Môi trường & Tự nhiên',
    file: 'src/features/flashcard/corpus/environment.ts',
    prefix: 'fc_env_',
    startId: 239,
    softTarget: 65,
  },
  technology: {
    key: 'technology',
    title: 'Khoa học & Công nghệ',
    file: 'src/features/flashcard/corpus/technology.ts',
    prefix: 'fc_tech_',
    startId: 238,
    softTarget: 65,
  },
  travel: {
    key: 'travel',
    title: 'Du lịch & Đô thị',
    file: 'src/features/flashcard/corpus/travel.ts',
    prefix: 'fc_travel_',
    startId: 253,
    softTarget: 63,
  },
  society: {
    key: 'society',
    title: 'Xã hội & Văn hóa',
    file: 'src/features/flashcard/corpus/society.ts',
    prefix: 'fc_soc_',
    startId: 253,
    softTarget: 63,
  },
  media: {
    key: 'media',
    title: 'Truyền thông & Giao tiếp',
    file: 'src/features/flashcard/corpus/media.ts',
    prefix: 'fc_media_',
    startId: 248,
    softTarget: 63,
  },
};

// 1. Gather existing words from current corpus to strictly prevent duplicates
export function getExistingWords() {
  const existingSet = new Set();
  for (const topic of Object.values(TOPIC_CONFIG)) {
    const fullPath = path.resolve(topic.file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const matches = [...content.matchAll(/word:\s*["']([^"']+)["']/g)];
      matches.forEach(m => existingSet.add(m[1].toLowerCase().trim()));
    }
  }
  return existingSet;
}

// 2. Comprehensive Stopwords for Reading Comprehension
export const STOPWORDS = new Set([
  'a', 'about', 'above', 'across', 'after', 'again', 'against', 'all', 'almost', 'alone', 'along', 'already',
  'also', 'although', 'always', 'am', 'among', 'an', 'and', 'another', 'any', 'anybody', 'anyone', 'anything',
  'anyway', 'anywhere', 'are', 'aren', 'around', 'as', 'ask', 'asked', 'asking', 'asks', 'at', 'away', 'back', 'bad', 'be', 'became',
  'because', 'become', 'becomes', 'becoming', 'been', 'before', 'began', 'begin', 'behind', 'being', 'below',
  'beside', 'best', 'better', 'between', 'beyond', 'big', 'bit', 'both', 'boy', 'boys', 'brought', 'but', 'by',
  'came', 'can', 'cannot', 'cant', 'case', 'cases', 'certain', 'certainly', 'clear', 'clearly', 'close', 'come', 'comes',
  'could', 'couldn', 'day', 'days', 'did', 'didn', 'different', 'do', 'does', 'doesn', 'doing', 'done', 'don',
  'down', 'during', 'each', 'early', 'either', 'else', 'end', 'enough', 'even', 'ever', 'every', 'everybody',
  'everyone', 'everything', 'far', 'feel', 'few', 'find', 'fine', 'first', 'five', 'for', 'four', 'from',
  'further', 'gave', 'get', 'gets', 'getting', 'girl', 'girls', 'give', 'given', 'gives', 'giving', 'go', 'goes', 'going',
  'gone', 'good', 'got', 'great', 'had', 'hadn', 'has', 'hasn', 'have', 'haven', 'having', 'he', 'hear', 'heard',
  'help', 'her', 'here', 'hers', 'herself', 'high', 'him', 'himself', 'his', 'home', 'how', 'however',
  'i', 'if', 'in', 'into', 'is', 'isn', 'it', 'its', 'itself', 'just', 'keep', 'keeps', 'kept', 'kind', 'knew',
  'know', 'known', 'large', 'last', 'late', 'later', 'least', 'leave', 'leaves', 'leaving', 'left', 'less', 'let',
  'lets', 'like', 'likely', 'little', 'look', 'looked', 'looking', 'lot', 'lots', 'made', 'make', 'makes', 'making',
  'man', 'many', 'matter', 'may', 'maybe', 'me', 'mean', 'means', 'men', 'might', 'more', 'morning', 'most',
  'mostly', 'move', 'moved', 'much', 'must', 'my', 'myself', 'near', 'need', 'needs', 'needed',
  'never', 'new', 'next', 'night', 'no', 'nobody', 'none', 'nor', 'not', 'nothing', 'now', 'number',
  'numbers', 'of', 'off', 'often', 'old', 'on', 'once', 'one', 'ones', 'only', 'onto', 'or',
  'order', 'other', 'others', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'part', 'parts', 'past', 'people',
  'per', 'perhaps', 'place', 'places', 'plan', 'plans', 'point', 'points', 'possible', 'present', 'pretty',
  'problem', 'problems', 'put', 'puts', 'quite', 'rather', 'read', 'reading', 'ready', 'real', 'really', 'right', 'said',
  'same', 'saw', 'say', 'says', 'saying', 'second', 'seconds', 'see', 'seem', 'seemed', 'seems', 'seen', 'sees',
  'several', 'shall', 'she', 'short', 'should', 'show', 'shows', 'shown', 'showing', 'side', 'sides', 'simple', 'since', 'six', 'small',
  'so', 'some', 'somebody', 'someone', 'something', 'sometimes', 'soon', 'sorry', 'stand', 'start', 'started',
  'starts', 'state', 'states', 'still', 'stop', 'such', 'sure', 'take', 'taken', 'takes', 'taking', 'talk', 'talked',
  'tell', 'tells', 'telling', 'ten', 'than', 'that', 'the', 'their', 'theirs',
  'them', 'themselves', 'then', 'there', 'therefore', 'these', 'they', 'thing', 'things', 'think', 'thinks',
  'thinking', 'third', 'this', 'those', 'though', 'thought', 'three', 'through', 'time', 'times', 'to', 'today',
  'together', 'told', 'too', 'took', 'toward', 'towards', 'true', 'try', 'trying', 'turned', 'two', 'under',
  'understand', 'until', 'up', 'upon', 'us', 'use', 'used', 'uses', 'using', 'usually', 'very', 'want', 'wanted',
  'wants', 'was', 'wasn', 'way', 'ways', 'we', 'week', 'weeks', 'well', 'went', 'were', 'weren', 'what', 'whatever',
  'when', 'where', 'whether', 'which', 'while', 'who', 'whole', 'whom', 'whose', 'why', 'will', 'with',
  'within', 'without', 'won', 'word', 'words', 'world', 'would', 'wouldn', 'year', 'years',
  'yes', 'yet', 'you', 'young', 'your', 'yours', 'yourself', 'yourselves',

  // Reading Exam Rubric & Comprehension boilerplate
  'passage', 'passages', 'paragraph', 'paragraphs', 'author', 'authors', 'infer', 'inferred', 'inferring',
  'imply', 'implied', 'implies', 'implying', 'according', 'mentioned', 'following', 'heading', 'headings',
  'phrase', 'phrases', 'stated', 'refers', 'refer', 'primarily', 'mainly', 'discuss', 'discussed', 'discusses',
  'discussion', 'meaning', 'closest', 'except', 'question', 'questions', 'option', 'options', 'line', 'lines',
  'text', 'texts', 'choice', 'choices', 'correct', 'answer', 'answers', 'blank', 'blanks', 'statement', 'statements',
  'true', 'false', 'detail', 'details', 'topic', 'sentence', 'sentences', 'summary', 'summarize', 'main', 'idea',
  'clue', 'clues', 'explanation', 'test', 'tests', 'vstep', 'ulis', 'hcmue',

  // Proper nouns, geography & common exam names
  'china', 'chinese', 'america', 'american', 'europe', 'european', 'asia', 'asian', 'britain', 'british',
  'england', 'english', 'japan', 'japanese', 'france', 'french', 'germany', 'german', 'london', 'oxford',
  'beijing', 'vietnam', 'vietnamese', 'paris', 'tokyo', 'africa', 'african', 'australia', 'australian',
  'dr', 'mr', 'mrs', 'ms', 'prof', 'professor', 'university', 'institute', 'department',
  'aaron', 'alexandria', 'asean', 'boone', 'brisbane', 'california', 'cornthwaite',
  'david', 'george', 'kurtzig', 'leeds', 'missouri', 'nasa', 'nhan', 'oregon',
  'paulo', 'phillis', 'pluto', 'polk', 'ptolemy', 'stuyvesant', 'tito', 'toan', 'wanberg', 'fahrenheit',
  'pasteur', 'franks', 'winterthur', 'lincoln', 'bering', 'richard', 'gogh', 'venus', 'two-thirds', 'year-old',
  'sao paulo', 'new york', 'manhattan', 'brooklyn', 'alaska', 'chicago', 'houston',

  // Days, months, numbers
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
  'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december',
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty',
  'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety', 'hundred', 'thousand', 'million', 'billion',

  // Basic A1/A2 words & inflections
  'dog', 'dogs', 'cat', 'cats', 'boy', 'boys', 'girl', 'girls', 'kid', 'kids', 'child', 'children',
  'buy', 'buys', 'buying', 'bought', 'sell', 'sells', 'selling', 'sold', 'pay', 'pays', 'paid',
  'see', 'sees', 'saw', 'seen', 'eye', 'eyes', 'bag', 'bags', 'car', 'cars', 'bus', 'food',
  'drink', 'drinks', 'eat', 'eats', 'eating', 'ate', 'sleep', 'sleeps', 'walk', 'walks', 'run', 'runs',
  'feet', 'showed', 'lays', 'older', 'oldest', 'greater', 'greatest', 'nineteenth',
  'ninth', 'earlier', 'coincided', 'handled', 'increased', 'written',
  'cake', 'ball', 'bird', 'cold', 'warm', 'summer', 'winter', 'tree', 'snow',
  'white', 'wife', 'wood', 'stone', 'wall', 'feed', 'hole', 'knee', 'neck', 'jump',
  'wake', 'poor', 'rich', 'deep', 'spite', 'sleeping', 'talking', 'managing', 'landowner'
]);

// 3. Load all reading snippets directly from 48 authentic passages
export async function loadReadingSources() {
  const dirs = [
    'src/features/reading/data/mockTests',
    'src/features/reading/data/drills/hcmue',
  ];
  const snippets = [];

  for (const relDir of dirs) {
    const absDir = path.resolve(relDir);
    if (!fs.existsSync(absDir)) continue;

    const entries = fs.readdirSync(absDir, { withFileTypes: true });
    for (const entry of entries) {
      if (
        entry.isFile() &&
        entry.name.endsWith('.ts') &&
        !entry.name.endsWith('.test.ts') &&
        entry.name !== 'index.ts'
      ) {
        const fullPath = path.join(absDir, entry.name);
        const mod = await import(pathToFileURL(fullPath).href);
        const test = Object.values(mod).find(
          (v) => v && typeof v === 'object' && Array.isArray(v.passages)
        );
        if (!test) continue;

        for (let pIdx = 0; pIdx < test.passages.length; pIdx++) {
          const passage = test.passages[pIdx];
          const sourcePrefix = `${test.id || entry.name}_p${pIdx + 1}`;

          for (const para of passage.content_paragraphs || []) {
            if (typeof para === 'string' && para.trim().length > 0) {
              snippets.push({
                text: para,
                sourceId: sourcePrefix,
                passageTopic: passage.topic || '',
              });
            }
          }

          for (const q of passage.questions || []) {
            if (q.clue_sentence && typeof q.clue_sentence === 'string') {
              snippets.push({
                text: q.clue_sentence,
                sourceId: `${sourcePrefix}_${q.id}_clue`,
                passageTopic: passage.topic || '',
              });
            }
          }
        }
      }
    }
  }

  return snippets;
}

// 4. Candidate Mining & Frequency Ranking
export function extractCandidateWords(sources, existingWords) {
  const candidates = new Map();

  sources.forEach((src) => {
    const rawText = src.text.replace(/\\n/g, ' ').replace(/\\"/g, '"');
    const sentences = rawText.split(/(?<=[.?!])\s+/);

    sentences.forEach((sent) => {
      const cleanSent = sent.trim();
      if (cleanSent.length < 25 || cleanSent.length > 250) return;

      const tokens = cleanSent
        .toLowerCase()
        .replace(/[^a-z-]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length >= 4);

      tokens.forEach((token) => {
        if (STOPWORDS.has(token) || existingWords.has(token) || token.includes('--') || /^\d+$/.test(token)) {
          return;
        }

        if (!candidates.has(token)) {
          candidates.set(token, {
            word: token,
            count: 0,
            sources: new Set(),
            passageTopics: new Set(),
            sampleSentences: [],
          });
        }

        const item = candidates.get(token);
        item.count++;
        item.sources.add(src.sourceId);
        if (src.passageTopic) {
          item.passageTopics.add(src.passageTopic);
        }
        if (item.sampleSentences.length < 2 && !item.sampleSentences.includes(cleanSent)) {
          item.sampleSentences.push(cleanSent);
        }
      });
    });
  });

  // Sort candidates by frequency and document spread
  return Array.from(candidates.values()).sort(
    (a, b) => b.count * b.sources.size - a.count * a.sources.size
  );
}

// 5. LLM Cascade Caller
async function callGeminiCascade(prompt) {
  for (const model of CANDIDATE_LLM_MODELS) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.1,
            responseMimeType: 'application/json',
          },
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.warn(`[Cascade] ${model} returned HTTP ${res.status}: ${errText.slice(0, 80)}`);
        continue;
      }

      const data = await res.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) continue;

      return JSON.parse(rawText);
    } catch (err) {
      console.warn(`[Cascade] ${model} threw error: ${err.message}. Trying next fallback...`);
    }
  }

  throw new Error('All candidate Gemini Flash models failed or exhausted quotas.');
}

// 6. Batch Enrich Candidate Words
async function enrichBatch(candidatesChunk, topicQuotasRemaining) {
  const prompt = `You are an elite academic lexicographer and English-Vietnamese translator creating flashcards for the standardized VSTEP examination (CEFR B1, B2, C1) mined from authentic VSTEP reading passages.

We need high-quality academic vocabulary cards across 8 themes.
Remaining soft quotas per topic:
${JSON.stringify(topicQuotasRemaining, null, 2)}

Candidates to enrich (each with authentic passage sentence):
${JSON.stringify(
  candidatesChunk.map((c) => ({
    candidate_word: c.word,
    context_sentence: c.sampleSentences[0] || '',
    context_topics: Array.from(c.passageTopics),
  })),
  null,
  2
)}

Instructions:
1. For each candidate, determine its canonical dictionary lemma in lowercase (e.g. "relocated" -> "relocate", "deteriorated" -> "deteriorate", "phenomena" -> "phenomenon").
2. Assign it to ONE best fitting topic from ["education", "work", "health", "environment", "technology", "travel", "society", "media"]. Prioritize topics with positive remaining soft quota.
3. Validate level is strictly "B1", "B2", or "C1". Prefer B2 or C1 for academic reading terms.
4. Validate part_of_speech is strictly "noun", "verb", "adjective", "adverb", or "phrase".
5. Provide accurate British/American IPA phonetic transcription (e.g. "/ˌbaɪ.əʊ.dɪˈɡreɪ.də.bəl/").
6. Provide natural, concise Vietnamese definition (definition_vi).
7. Provide an array of exactly 2 natural, academic collocations (collocations: ["...", "..."]).
8. Provide an authentic example sentence (example_sentence_en) directly quoting or closely adapting the authentic reading passage context, plus natural Vietnamese translation (example_sentence_vi).

Respond strictly with a JSON array of objects conforming to:
[
  {
    "word": "canonical lemma in lowercase",
    "topic_key": "education" | "work" | "health" | "environment" | "technology" | "travel" | "society" | "media",
    "level": "B1" | "B2" | "C1",
    "part_of_speech": "noun" | "verb" | "adjective" | "adverb" | "phrase",
    "phonetic": "/ipa/",
    "definition_vi": "Định nghĩa tiếng Việt chính xác, súc tích",
    "collocations": ["collocation 1", "collocation 2"],
    "example_sentence_en": "Authentic passage context sentence in English.",
    "example_sentence_vi": "Bản dịch tiếng Việt tự nhiên của câu ví dụ."
  }
]`;

  return await callGeminiCascade(prompt);
}

// 7. Main Execution Pipeline
async function main() {
  const args = process.argv.slice(2);
  const isApply = args.includes('--apply');

  console.log('[MineReadingVocab] Starting VSTEP Reading vocabulary mining pipeline...');

  if (!API_KEY) {
    console.error('Error: VITE_GEMINI_API_KEY or GOOGLE_API_KEY not found in environment.');
    process.exit(1);
  }

  const existingWords = getExistingWords();
  console.log(`[MineReadingVocab] Loaded ${existingWords.size} existing words in corpus to prevent collisions.`);

  // Load authentic reading sources
  const sources = await loadReadingSources();
  console.log(`[MineReadingVocab] Loaded ${sources.length} text segments from 48 authentic VSTEP reading passages.`);

  // Extract candidates
  const candidates = extractCandidateWords(sources, existingWords);
  console.log(`[MineReadingVocab] Extracted ${candidates.length} filtered academic candidate words.`);

  const cacheFile = path.resolve('scripts/mined_reading_cards.json');
  let allCards = [];

  const currentCollected = {};
  for (const k of Object.keys(TOPIC_CONFIG)) {
    currentCollected[k] = [];
  }

  if (fs.existsSync(cacheFile)) {
    console.log(`[MineReadingVocab] Found cached cards in ${cacheFile}. Loading...`);
    const rawCards = JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));
    allCards = rawCards.filter((c) => {
      const w = (c.word || '').toLowerCase().trim();
      const d = (c.definition_vi || '').toLowerCase();
      if (d.includes('tên riêng') || d.includes('thành phố') || d.includes('tiểu bang') || d.includes('dạng quá khứ')) return false;
      return (
        w.length >= 4 &&
        !STOPWORDS.has(w) &&
        !existingWords.has(w) &&
        ['B1', 'B2', 'C1'].includes(c.level) &&
        ['noun', 'verb', 'adjective', 'adverb', 'phrase'].includes(c.part_of_speech) &&
        TOPIC_CONFIG[c.topic_key]
      );
    });

    // Deduplicate cached cards by word
    const seenWords = new Set();
    const deduped = [];
    for (const card of allCards) {
      const w = card.word.toLowerCase();
      if (!seenWords.has(w)) {
        seenWords.add(w);
        deduped.push(card);
      }
    }
    allCards = deduped;

    console.log(`[MineReadingVocab] Loaded ${allCards.length} clean cached cards.`);
    for (const card of allCards) {
      if (currentCollected[card.topic_key]) {
        currentCollected[card.topic_key].push(card);
      }
    }
  }

  function getRemainingQuotas() {
    const rem = {};
    for (const [k, cfg] of Object.entries(TOPIC_CONFIG)) {
      const current = (currentCollected[k] || []).length;
      if (k === 'society' && current >= 65) {
        rem[k] = 0;
      } else if (k === 'environment' && current >= 65) {
        rem[k] = 0;
      } else {
        rem[k] = Math.max(0, cfg.softTarget - current);
      }
    }
    return rem;
  }

  let remaining = getRemainingQuotas();
  console.log('[MineReadingVocab] Current card counts per topic:');
  for (const [k, cfg] of Object.entries(TOPIC_CONFIG)) {
    console.log(`  - ${k.padEnd(12)}: ${currentCollected[k].length} (soft target: ${cfg.softTarget})`);
  }

  let candidateIdx = 0;
  const processedWords = new Set(allCards.map((c) => c.word.toLowerCase()));

  while (allCards.length < 500 && candidateIdx < candidates.length) {
    const chunk = [];
    while (chunk.length < 25 && candidateIdx < candidates.length) {
      const cand = candidates[candidateIdx++];
      if (
        !processedWords.has(cand.word) &&
        !existingWords.has(cand.word) &&
        !STOPWORDS.has(cand.word) &&
        cand.word.length >= 4
      ) {
        chunk.push(cand);
        processedWords.add(cand.word);
      }
    }

    if (chunk.length === 0) break;

    console.log(
      `[MineReadingVocab] Enriching batch of ${chunk.length} candidates (Progress: ${allCards.length}/500 cards, scanned ${candidateIdx}/${candidates.length})...`
    );

    try {
      const enriched = await enrichBatch(chunk, remaining);
      if (Array.isArray(enriched)) {
        for (const item of enriched) {
          const w = (item.word || '').toLowerCase().trim();
          const tKey = item.topic_key;

          if (
            w &&
            w.length >= 4 &&
            !STOPWORDS.has(w) &&
            !existingWords.has(w) &&
            !allCards.some((c) => c.word.toLowerCase() === w) &&
            TOPIC_CONFIG[tKey] &&
            allCards.length < 500
          ) {
            const cardObj = {
              word: w,
              topic_key: tKey,
              topic: TOPIC_CONFIG[tKey].title,
              level: ['B1', 'B2', 'C1'].includes(item.level) ? item.level : 'B2',
              part_of_speech: ['noun', 'verb', 'adjective', 'adverb', 'phrase'].includes(
                item.part_of_speech
              )
                ? item.part_of_speech
                : 'noun',
              phonetic: item.phonetic && item.phonetic.startsWith('/') ? item.phonetic : `/${item.phonetic || w}/`,
              definition_vi: item.definition_vi || '',
              collocations:
                Array.isArray(item.collocations) && item.collocations.length >= 2
                  ? item.collocations.slice(0, 2)
                  : [`academic ${w}`, `study ${w}`],
              example_sentence_en: item.example_sentence_en || '',
              example_sentence_vi: item.example_sentence_vi || '',
            };

            currentCollected[tKey].push(cardObj);
            allCards.push(cardObj);
            console.log(
              `  + [${tKey}] ${cardObj.word} (${currentCollected[tKey].length} cards in topic | Total: ${allCards.length}/500)`
            );
          }
        }
      }

      // Update cache
      fs.writeFileSync(cacheFile, JSON.stringify(allCards, null, 2), 'utf-8');
      remaining = getRemainingQuotas();
    } catch (err) {
      console.error(`[MineReadingVocab] Batch enrichment error: ${err.message}`);
    }
  }

  console.log(`\n[MineReadingVocab] Mining complete! Total enriched cards: ${allCards.length}/500`);
  for (const k of Object.keys(TOPIC_CONFIG)) {
    console.log(`  - ${k.padEnd(12)}: ${currentCollected[k].length} cards`);
  }

  if (allCards.length < 500) {
    console.warn(`[MineReadingVocab] Collected ${allCards.length} cards, target is 500.`);
  }

  // If --apply is specified, format and append cards to each topic .ts file
  if (isApply && allCards.length >= 500) {
    console.log('\n[MineReadingVocab] Applying 500 new cards to the 8 corpus files...');

    let globalAdded = 0;
    const topicFinalCounts = {};

    for (const [tKey, cfg] of Object.entries(TOPIC_CONFIG)) {
      const cardsForTopic = currentCollected[tKey];
      const filePath = path.resolve(cfg.file);
      const content = fs.readFileSync(filePath, 'utf-8');

      // Verify start ID
      const existingIds = [...content.matchAll(/id:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);
      const lastExistingId = existingIds[existingIds.length - 1];
      const actualStartId = existingIds.length + 1;

      console.log(`[MineReadingVocab] ${tKey}: Last existing ID was ${lastExistingId} (${existingIds.length} cards). Appending ${cardsForTopic.length} new cards starting at ID ${actualStartId}...`);

      const codeBlocks = cardsForTopic.map((card, idx) => {
        const idNum = actualStartId + idx;
        const idStr = `${cfg.prefix}${idNum.toString().padStart(3, '0')}`;
        return `  {
    id: '${idStr}',
    topic: '${cfg.title}',
    level: '${card.level}',
    word: "${card.word.replace(/"/g, '\\"')}",
    phonetic: "${card.phonetic.replace(/"/g, '\\"')}",
    part_of_speech: '${card.part_of_speech}',
    definition_vi: "${card.definition_vi.replace(/"/g, '\\"')}",
    collocations: ${JSON.stringify(card.collocations)},
    example_sentence_en: "${card.example_sentence_en.replace(/"/g, '\\"')}",
    example_sentence_vi: "${card.example_sentence_vi.replace(/"/g, '\\"')}",
    audio_url: '',
    srs_metadata: {
      stability: 0,
      difficulty: 0,
      reps: 0,
      lapses: 0,
      last_reviewed_at: null,
      next_review_timestamp: 0,
      state: 0
    }
  }`;
      });

      const closingIdx = content.lastIndexOf('];');
      if (closingIdx === -1) {
        throw new Error(`Could not find closing ]; in ${cfg.file}`);
      }

      const beforeClosing = content.slice(0, closingIdx).trimEnd();
      const needsComma = !beforeClosing.endsWith(',');

      const newContent = `${beforeClosing}${needsComma ? ',' : ''}\n${codeBlocks.join(',\n')}\n];\n`;
      fs.writeFileSync(filePath, newContent, 'utf-8');

      topicFinalCounts[tKey] = existingIds.length + cardsForTopic.length;
      globalAdded += cardsForTopic.length;
      console.log(`  ✓ Updated ${cfg.file} (+${cardsForTopic.length} cards, new total: ${topicFinalCounts[tKey]}).`);
    }

    console.log(`\n[MineReadingVocab] Successfully added ${globalAdded} cards to master corpus (2,000 -> 2,500)!`);
    console.log('Final topic counts:', topicFinalCounts);
  } else if (!isApply) {
    console.log('\n[MineReadingVocab] Dry-run complete. Run with --apply flag to write new cards to corpus files.');
  }
}

// Run if called as CLI
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve('scripts/mine_reading_vocab.mjs')) {
  main().catch((err) => {
    console.error('[MineReadingVocab Fatal Error]', err);
    process.exit(1);
  });
}
