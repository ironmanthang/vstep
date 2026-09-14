#!/usr/bin/env node
/**
 * VSTEP Vocabulary Mining Pipeline (Listening & Extensible to Reading/Writing/Speaking)
 * Mined from authentic exam transcripts and drills, enriched via Gemini Flash cascade.
 * 
 * Model cascade:
 *   gemini-3.8-flash -> gemini-3.7-flash -> gemini-3.6-flash -> gemini-3.5-flash -> gemini-3.5-flash-lite
 * 
 * Usage:
 *   node scripts/mine_listening_vocab.mjs [--skill listening] [--batch 25] [--apply]
 */

import fs from 'node:fs';
import path from 'node:path';

import './loadEnv.mjs';

const API_KEY = process.env.VITE_GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

const CANDIDATE_LLM_MODELS = [
  'gemini-3.8-flash',
  'gemini-3.7-flash',
  'gemini-3.6-flash',
  'gemini-3.5-flash',
  'gemini-3.5-flash-lite',
];

const TOPIC_CONFIG = {
  education: {
    key: 'education',
    title: 'Giáo dục & Học tập',
    file: 'src/features/flashcard/corpus/education.ts',
    prefix: 'fc_edu_',
    startId: 189,
    targetCount: 70, // 188 -> 258
  },
  work: {
    key: 'work',
    title: 'Công việc & Sự nghiệp',
    file: 'src/features/flashcard/corpus/work.ts',
    prefix: 'fc_work_',
    startId: 189,
    targetCount: 75, // 188 -> 263
  },
  health: {
    key: 'health',
    title: 'Sức khỏe & Lối sống',
    file: 'src/features/flashcard/corpus/health.ts',
    prefix: 'fc_health_',
    startId: 189,
    targetCount: 65, // 188 -> 253
  },
  environment: {
    key: 'environment',
    title: 'Môi trường & Tự nhiên',
    file: 'src/features/flashcard/corpus/environment.ts',
    prefix: 'fc_env_',
    startId: 189,
    targetCount: 50, // 188 -> 238
  },
  technology: {
    key: 'technology',
    title: 'Khoa học & Công nghệ',
    file: 'src/features/flashcard/corpus/technology.ts',
    prefix: 'fc_tech_',
    startId: 188,
    targetCount: 50, // 187 -> 237
  },
  travel: {
    key: 'travel',
    title: 'Du lịch & Đô thị',
    file: 'src/features/flashcard/corpus/travel.ts',
    prefix: 'fc_travel_',
    startId: 188,
    targetCount: 65, // 187 -> 252
  },
  society: {
    key: 'society',
    title: 'Xã hội & Văn hóa',
    file: 'src/features/flashcard/corpus/society.ts',
    prefix: 'fc_soc_',
    startId: 188,
    targetCount: 65, // 187 -> 252
  },
  media: {
    key: 'media',
    title: 'Truyền thông & Giao tiếp',
    file: 'src/features/flashcard/corpus/media.ts',
    prefix: 'fc_media_',
    startId: 188,
    targetCount: 60, // 187 -> 247
  },
};

// 1. Gather existing 1,500 words to strictly avoid duplicate words
function getExistingWords() {
  const existingSet = new Set();
  for (const topic of Object.values(TOPIC_CONFIG)) {
    if (fs.existsSync(topic.file)) {
      const content = fs.readFileSync(topic.file, 'utf-8');
      const matches = [...content.matchAll(/word:\s*["']([^"']+)["']/g)];
      matches.forEach(m => existingSet.add(m[1].toLowerCase().trim()));
    }
  }
  return existingSet;
}

// 2. Comprehensive Stopwords (grammar, trivial conversational A1/A2, exam rubric boilerplate, proper nouns)
const STOPWORDS = new Set([
  'a', 'about', 'above', 'across', 'after', 'again', 'against', 'all', 'almost', 'alone', 'along', 'already',
  'also', 'although', 'always', 'am', 'among', 'an', 'and', 'another', 'any', 'anybody', 'anyone', 'anything',
  'anyway', 'anywhere', 'are', 'aren', 'around', 'as', 'ask', 'at', 'away', 'back', 'bad', 'be', 'became',
  'because', 'become', 'becomes', 'becoming', 'been', 'before', 'began', 'begin', 'behind', 'being', 'below',
  'beside', 'best', 'better', 'between', 'beyond', 'big', 'bit', 'both', 'boy', 'boys', 'brought', 'but', 'by',
  'came', 'can', 'cannot', 'cant', 'case', 'certain', 'certainly', 'clear', 'clearly', 'close', 'come', 'comes',
  'could', 'couldn', 'day', 'days', 'did', 'didn', 'different', 'do', 'does', 'doesn', 'doing', 'done', 'don',
  'down', 'during', 'each', 'early', 'either', 'else', 'end', 'enough', 'even', 'ever', 'every', 'everybody',
  'everyone', 'everything', 'far', 'feel', 'few', 'find', 'fine', 'first', 'five', 'for', 'four', 'from',
  'further', 'gave', 'get', 'gets', 'getting', 'girl', 'girls', 'give', 'given', 'gives', 'go', 'goes', 'going',
  'gone', 'good', 'got', 'great', 'had', 'hadn', 'has', 'hasn', 'have', 'haven', 'having', 'he', 'hear', 'heard',
  'hello', 'help', 'her', 'here', 'hers', 'herself', 'high', 'him', 'himself', 'his', 'home', 'how', 'however',
  'i', 'if', 'in', 'into', 'is', 'isn', 'it', 'its', 'itself', 'just', 'keep', 'keeps', 'kept', 'kind', 'knew',
  'know', 'known', 'large', 'last', 'late', 'later', 'least', 'leave', 'leaves', 'leaving', 'left', 'less', 'let',
  'lets', 'like', 'likely', 'little', 'look', 'looked', 'looking', 'lot', 'lots', 'made', 'make', 'makes', 'making',
  'man', 'many', 'matter', 'may', 'maybe', 'me', 'mean', 'means', 'men', 'might', 'more', 'morning', 'most',
  'mostly', 'mother', 'move', 'moved', 'mr', 'mrs', 'ms', 'much', 'must', 'my', 'myself', 'near', 'need', 'needs',
  'never', 'new', 'next', 'nice', 'night', 'no', 'nobody', 'none', 'nor', 'not', 'nothing', 'now', 'number',
  'numbers', 'of', 'off', 'often', 'oh', 'ok', 'okay', 'old', 'on', 'once', 'one', 'ones', 'only', 'onto', 'or',
  'order', 'other', 'others', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'part', 'parts', 'past', 'people',
  'per', 'perhaps', 'place', 'places', 'plan', 'plans', 'please', 'point', 'points', 'possible', 'present', 'pretty',
  'problem', 'problems', 'put', 'puts', 'quite', 'rather', 'read', 'ready', 'real', 'really', 'right', 'said',
  'same', 'saw', 'say', 'says', 'saying', 'second', 'seconds', 'see', 'seem', 'seemed', 'seems', 'seen', 'sees',
  'several', 'shall', 'she', 'short', 'should', 'show', 'shows', 'shown', 'side', 'simple', 'since', 'six', 'small',
  'so', 'some', 'somebody', 'someone', 'something', 'sometimes', 'soon', 'sorry', 'stand', 'start', 'started',
  'starts', 'state', 'states', 'still', 'stop', 'such', 'sure', 'take', 'taken', 'takes', 'taking', 'talk', 'talked',
  'talking', 'talks', 'tell', 'tells', 'telling', 'ten', 'than', 'thank', 'thanks', 'that', 'the', 'their', 'theirs',
  'them', 'themselves', 'then', 'there', 'therefore', 'these', 'they', 'thing', 'things', 'think', 'thinks',
  'thinking', 'third', 'this', 'those', 'though', 'thought', 'three', 'through', 'time', 'times', 'to', 'today',
  'together', 'told', 'too', 'took', 'toward', 'towards', 'true', 'try', 'trying', 'turned', 'two', 'under',
  'understand', 'until', 'up', 'upon', 'us', 'use', 'used', 'uses', 'using', 'usually', 'very', 'want', 'wanted',
  'wants', 'was', 'wasn', 'way', 'ways', 'we', 'week', 'weeks', 'well', 'went', 'were', 'weren', 'what', 'whatever',
  'when', 'where', 'whether', 'which', 'while', 'white', 'who', 'whole', 'whom', 'whose', 'why', 'will', 'with',
  'within', 'without', 'won', 'word', 'words', 'work', 'works', 'working', 'world', 'would', 'wouldn', 'year', 'years',
  'yes', 'yet', 'you', 'young', 'your', 'yours', 'yourself', 'yourselves',
  // Exam administration & rubric stopwords
  'announcer', 'speaker', 'narrator', 'question', 'questions', 'option', 'options', 'listen', 'listening',
  'recording', 'correct', 'answer', 'answers', 'check', 'test', 'tests', 'paper', 'sheet', 'transfer',
  'conversation', 'conversations', 'lecture', 'lectures', 'directions', 'section', 'opportunity', 'demonstrate',
  'ability', 'clue', 'audio', 'track', 'mark', 'letter', 'blank', 'choice', 'choices', 'fill', 'circle',
  // Proper nouns & locations
  'milan', 'saigon', 'vietnam', 'vietnamese', 'america', 'american', 'americans', 'france', 'french', 'greece',
  'greek', 'italy', 'italian', 'new york', 'norwalk', 'sandra', 'jane', 'judy', 'kate', 'ben', 'lisa', 'donald',
  'carson', 'kim', 'rea', 'jen', 'smith', 'berryville', 'winton', 'de niro', 'robert', 'hcmue', 'vstep', 'ulis',
  'mary', 'thompson', 'louise', 'julie', 'james', 'ussr', 'richard', 'tom', 'sarah', 'john', 'david', 'peter', 'michael',
  // Days and months
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
  'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december',
  // Numbers
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty',
  'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety', 'hundred', 'thousand', 'million',
  // Elementary A1/A2 words
  'dog', 'dogs', 'cat', 'cats', 'kid', 'kids', 'buy', 'buys', 'buying', 'bought', 'art', 'arts',
  'see', 'sees', 'saw', 'seen', 'eye', 'eyes', 'bag', 'bags', 'old', 'cold', 'hot', 'should',
  'woman', 'women', 'tip', 'tips', 'like', 'likes', 'liked', 'liking'
]);

// 3. Extraction logic for Listening skill
function loadListeningSources() {
  const jsonPath = path.resolve('scripts/all_listening_data.json');
  if (!fs.existsSync(jsonPath)) {
    throw new Error('scripts/all_listening_data.json not found. Run pnpm run export:listening first.');
  }
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const snippets = []; // { text, sourceId }

  data.forEach((test) => {
    // Transcript text
    (test.transcript || []).forEach((seg) => {
      if (seg.text_en) {
        snippets.push({ text: seg.text_en, sourceId: test.id });
      }
    });

    // Question & option text
    (test.questions || []).forEach((q) => {
      let qFull = q.question_text || '';
      if (Array.isArray(q.options)) {
        qFull += ' ' + q.options.map(o => o.text).join(' ');
      }
      snippets.push({ text: qFull, sourceId: `${test.id}_${q.id}` });
    });
  });

  return snippets;
}

// Future Extensible Hook: Reading skill sources
function loadReadingSources() {
  // Can be plugged into src/features/reading/data/readingBank.ts in the future
  return [];
}

// 4. Candidate Mining & Frequency Ranking
function extractCandidateWords(sources, existingWords) {
  const candidates = new Map(); // word -> { word, count, sources: Set, sampleSentences: [] }

  sources.forEach((src) => {
    const rawText = src.text.replace(/\\n/g, ' ').replace(/\\"/g, '"');
    const sentences = rawText.split(/(?<=[.?!])\s+/);

    sentences.forEach((sent) => {
      const cleanSent = sent.trim();
      if (cleanSent.length < 20 || cleanSent.length > 200) return;

      const tokens = cleanSent.toLowerCase().replace(/[^a-z-]/g, ' ').split(/\s+/).filter(w => w.length >= 4);
      tokens.forEach((token) => {
        if (STOPWORDS.has(token) || existingWords.has(token) || token.includes('--')) return;

        if (!candidates.has(token)) {
          candidates.set(token, {
            word: token,
            count: 0,
            sources: new Set(),
            sampleSentences: [],
          });
        }

        const item = candidates.get(token);
        item.count++;
        item.sources.add(src.sourceId);
        if (item.sampleSentences.length < 2 && !item.sampleSentences.includes(cleanSent)) {
          item.sampleSentences.push(cleanSent);
        }
      });
    });
  });

  // Sort candidates by frequency and source diversity
  return Array.from(candidates.values())
    .sort((a, b) => (b.count * b.sources.size) - (a.count * a.sources.size));
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
  const prompt = `You are an elite lexicographer and English-Vietnamese translator creating flashcards for the standardized VSTEP examination (CEFR B1, B2, C1).

We need high-quality vocabulary cards for 8 specific topics.
Here are the topics and remaining quotas:
${JSON.stringify(topicQuotasRemaining, null, 2)}

Candidates to enrich (each with context sentence):
${JSON.stringify(candidatesChunk.map(c => ({ word: c.word, context: c.sampleSentences[0] || '' })), null, 2)}

Instructions:
1. For each candidate, determine its dictionary lemma (e.g. "relocated" -> "relocate", "treatments" -> "treatment").
2. Assign it to ONE best fitting topic from ["education", "work", "health", "environment", "technology", "travel", "society", "media"], prioritizing topics with positive remaining quota.
3. Validate level is strictly "B1", "B2", or "C1".
4. Validate part_of_speech is strictly "noun", "verb", "adjective", "adverb", or "phrase".
5. Provide accurate British/American IPA phonetic string (e.g. "/.../").
6. Provide natural, concise Vietnamese definition (definition_vi).
7. Provide an array of exactly 2 natural, authentic collocations (collocations: ["...", "..."]).
8. Provide an example sentence (example_sentence_en) directly quoting or adapting the listening context, plus natural Vietnamese translation (example_sentence_vi).

Respond strictly with a JSON array of objects conforming to:
[
  {
    "word": "lemma in lowercase",
    "topic_key": "topic identifier",
    "topic": "Exact Vietnamese topic title matching topic_key",
    "level": "B1" | "B2" | "C1",
    "part_of_speech": "noun" | "verb" | "adjective" | "adverb" | "phrase",
    "phonetic": "/ipa/",
    "definition_vi": "Định nghĩa tiếng Việt",
    "collocations": ["collocation 1", "collocation 2"],
    "example_sentence_en": "Authentic example sentence in English.",
    "example_sentence_vi": "Câu ví dụ dịch sang tiếng Việt tự nhiên."
  }
]`;

  return await callGeminiCascade(prompt);
}

// 7. Main Execution Pipeline
async function main() {
  const args = process.argv.slice(2);
  const isApply = args.includes('--apply');
  const skill = args.includes('--skill') ? args[args.indexOf('--skill') + 1] : 'listening';

  console.log(`[MineVocab] Starting vocabulary mining pipeline (Skill: ${skill})...`);

  if (!API_KEY) {
    console.error('Error: VITE_GEMINI_API_KEY or GOOGLE_API_KEY not found in environment.');
    process.exit(1);
  }

  const existingWords = getExistingWords();
  console.log(`[MineVocab] Loaded ${existingWords.size} existing words in corpus to prevent collisions.`);

  // Load sources
  let sources = [];
  if (skill === 'listening') {
    sources = loadListeningSources();
  } else if (skill === 'reading') {
    sources = loadReadingSources();
  } else {
    throw new Error(`Unsupported skill: ${skill}`);
  }
  console.log(`[MineVocab] Loaded ${sources.length} text blocks from authentic ${skill} materials.`);

  // Extract candidates
  const candidates = extractCandidateWords(sources, existingWords);
  console.log(`[MineVocab] Extracted ${candidates.length} filtered candidate words.`);

  // Quota tracking
  const targetCounts = {};
  const currentCollected = {};
  for (const [k, v] of Object.entries(TOPIC_CONFIG)) {
    targetCounts[k] = v.targetCount;
    currentCollected[k] = [];
  }

  const cacheFile = path.resolve('scripts/mined_listening_cards.json');
  let allCards = [];

  if (fs.existsSync(cacheFile)) {
    console.log(`[MineVocab] Found cached cards in ${cacheFile}. Loading...`);
    const rawCards = JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));
    allCards = rawCards.filter(c => {
      const w = (c.word || '').toLowerCase().trim();
      return w.length >= 4 && !STOPWORDS.has(w) && !existingWords.has(w) && c.level !== 'A1' && c.level !== 'A2';
    });
    console.log(`[MineVocab] Kept ${allCards.length} clean valid cards (pruned ${rawCards.length - allCards.length} low-quality/stopword cards).`);
    for (const card of allCards) {
      if (currentCollected[card.topic_key]) {
        currentCollected[card.topic_key].push(card);
      }
    }
  }

  // Calculate remaining quotas
  function getRemainingQuotas() {
    const rem = {};
    for (const k of Object.keys(TOPIC_CONFIG)) {
      rem[k] = Math.max(0, targetCounts[k] - currentCollected[k].length);
    }
    return rem;
  }

  let remaining = getRemainingQuotas();
  let totalRemaining = Object.values(remaining).reduce((a, b) => a + b, 0);
  console.log('[MineVocab] Current remaining quotas:', remaining);

  // If we still need cards, query Gemini Flash cascade
  let candidateIdx = 0;
  const processedWords = new Set(allCards.map(c => c.word.toLowerCase()));

  while (totalRemaining > 0 && candidateIdx < candidates.length) {
    // Pick next batch of candidates that haven't been processed
    const chunk = [];
    while (chunk.length < 25 && candidateIdx < candidates.length) {
      const cand = candidates[candidateIdx++];
      if (!processedWords.has(cand.word) && !existingWords.has(cand.word) && !STOPWORDS.has(cand.word) && cand.word.length >= 4) {
        chunk.push(cand);
        processedWords.add(cand.word);
      }
    }

    if (chunk.length === 0) break;

    console.log(`[MineVocab] Enriching batch of ${chunk.length} candidates (${candidateIdx}/${candidates.length})...`);
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
            TOPIC_CONFIG[tKey] &&
            currentCollected[tKey].length < targetCounts[tKey] &&
            !allCards.some(c => c.word.toLowerCase() === w)
          ) {
            const cardObj = {
              word: w,
              topic_key: tKey,
              topic: TOPIC_CONFIG[tKey].title,
              level: ['B1', 'B2', 'C1'].includes(item.level) ? item.level : 'B2',
              part_of_speech: ['noun', 'verb', 'adjective', 'adverb', 'phrase'].includes(item.part_of_speech) ? item.part_of_speech : 'noun',
              phonetic: item.phonetic || '/.../',
              definition_vi: item.definition_vi || '',
              collocations: Array.isArray(item.collocations) && item.collocations.length >= 2 ? item.collocations.slice(0, 2) : [`common ${w}`, `use ${w}`],
              example_sentence_en: item.example_sentence_en || '',
              example_sentence_vi: item.example_sentence_vi || '',
            };

            currentCollected[tKey].push(cardObj);
            allCards.push(cardObj);
            console.log(`  + [${tKey}] ${cardObj.word} (${currentCollected[tKey].length}/${targetCounts[tKey]})`);
          }
        }
      }

      // Update cache
      fs.writeFileSync(cacheFile, JSON.stringify(allCards, null, 2), 'utf-8');
      remaining = getRemainingQuotas();
      totalRemaining = Object.values(remaining).reduce((a, b) => a + b, 0);
      console.log(`[MineVocab] Remaining cards needed: ${totalRemaining}`);
    } catch (err) {
      console.error(`[MineVocab] Batch enrichment error: ${err.message}`);
    }
  }

  console.log(`\n[MineVocab] Finished Mining! Total enriched cards: ${allCards.length}/500`);
  for (const [k, v] of Object.entries(TOPIC_CONFIG)) {
    console.log(`  - ${k.padEnd(12)}: ${currentCollected[k].length}/${v.targetCount}`);
  }

  if (allCards.length < 500) {
    console.warn(`[MineVocab] Collected ${allCards.length} cards, falling short of 500 target. Adjusting or re-running recommended.`);
  }

  // If --apply is specified, format and append cards to each topic .ts file
  if (isApply && allCards.length >= 500) {
    console.log('\n[MineVocab] Applying new cards to corpus files...');

    for (const [tKey, cfg] of Object.entries(TOPIC_CONFIG)) {
      const cardsForTopic = currentCollected[tKey].slice(0, cfg.targetCount);
      const filePath = path.resolve(cfg.file);
      let content = fs.readFileSync(filePath, 'utf-8');

      // Generate items code
      const codeBlocks = cardsForTopic.map((card, idx) => {
        const idNum = cfg.startId + idx;
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

      // Find the closing bracket ];
      const closingIdx = content.lastIndexOf('];');
      if (closingIdx === -1) {
        throw new Error(`Could not find closing ]; in ${cfg.file}`);
      }

      // Check if there is a trailing comma before ];
      const beforeClosing = content.slice(0, closingIdx).trimEnd();
      const needsComma = !beforeClosing.endsWith(',');

      const newContent = `${beforeClosing}${needsComma ? ',' : ''}\n${codeBlocks.join(',\n')}\n];\n`;
      fs.writeFileSync(filePath, newContent, 'utf-8');
      console.log(`[MineVocab] Successfully updated ${cfg.file} (+${cardsForTopic.length} cards, new total: ${cfg.startId + cardsForTopic.length - 1}).`);
    }

    console.log('[MineVocab] All 8 topic files successfully expanded to 2,000 cards!');
  } else if (!isApply) {
    console.log('\n[MineVocab] Dry-run complete. To write changes to topic files, run with --apply flag.');
  }
}

main().catch((err) => {
  console.error('[MineVocab Fatal Error]', err);
  process.exit(1);
});
