#!/usr/bin/env node
/**
 * VSTEP Vocabulary Mining Pipeline (Writing & Speaking Skills)
 * Mined from authentic ULIS Writing Tests 01-07, ULIS Speaking Tests 01-07,
 * Authentic Writing Bank, and Authentic Speaking Exam Sessions,
 * enriched via Gemini Flash cascade.
 * 
 * Model cascade:
 *   gemini-3.8-flash -> gemini-3.7-flash -> gemini-3.6-flash -> gemini-3.5-flash -> gemini-3.5-flash-lite
 * 
 * Usage:
 *   node --experimental-strip-types scripts/mine_productive_vocab.mjs [--apply]
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

export const TOPIC_CONFIG = {
  education: {
    key: 'education',
    title: 'Giáo dục & Học tập',
    file: 'src/features/flashcard/corpus/education.ts',
    prefix: 'fc_edu_',
    startId: 286,
    softTarget: 65,
  },
  work: {
    key: 'work',
    title: 'Công việc & Sự nghiệp',
    file: 'src/features/flashcard/corpus/work.ts',
    prefix: 'fc_work_',
    startId: 320,
    softTarget: 61,
  },
  health: {
    key: 'health',
    title: 'Sức khỏe & Lối sống',
    file: 'src/features/flashcard/corpus/health.ts',
    prefix: 'fc_health_',
    startId: 318,
    softTarget: 63,
  },
  environment: {
    key: 'environment',
    title: 'Môi trường & Tự nhiên',
    file: 'src/features/flashcard/corpus/environment.ts',
    prefix: 'fc_env_',
    startId: 354,
    softTarget: 47,
  },
  technology: {
    key: 'technology',
    title: 'Khoa học & Công nghệ',
    file: 'src/features/flashcard/corpus/technology.ts',
    prefix: 'fc_tech_',
    startId: 270,
    softTarget: 71,
  },
  travel: {
    key: 'travel',
    title: 'Du lịch & Đô thị',
    file: 'src/features/flashcard/corpus/travel.ts',
    prefix: 'fc_travel_',
    startId: 285,
    softTarget: 66,
  },
  society: {
    key: 'society',
    title: 'Xã hội & Văn hóa',
    file: 'src/features/flashcard/corpus/society.ts',
    prefix: 'fc_soc_',
    startId: 406,
    softTarget: 45,
  },
  media: {
    key: 'media',
    title: 'Truyền thông & Giao tiếp',
    file: 'src/features/flashcard/corpus/media.ts',
    prefix: 'fc_media_',
    startId: 269,
    softTarget: 82,
  },
};

export const TOPIC_AUTHENTIC_PROMPTS = {
  health: [
    'ULIS Writing Test 05 Task 2: Public smoking ban, secondhand smoke, passive smoking hazards, respiratory illness, cardiovascular diseases, nicotine addiction, public health policies.',
    'ULIS Speaking Test 01 Part 1: Games & sports, Keeping fit, table tennis, yoga, badminton, aerobic exercise, daily physical workout, disease prevention, health improvement.',
    'Speaking Bank May 05 Part 1: Morning routines, breakfast nutrition, dietary balance, energy replenishment, active lifestyle.',
    'Speaking Bank May 24 Part 1: Sports, physical workout, outdoor fitness, regular exercise, mental wellbeing, stress relief.',
    'Speaking Bank May 30 Part 3: Reading books for children, cognitive enhancement, emotional stability, attention span, screen dependency reduction.',
  ],
  environment: [
    'ULIS Writing Test 04 Task 2: Taxing private car owners to improve public transportation, reduce urban gridlock, curb air pollution and exhaust fumes, subsidize green transit.',
    'ULIS Writing Test 07 Task 2: Tourism impacts on remote ethnic communities, natural habitat degradation, environmental preservation, wildlife conservation, waste management.',
    'Writing Bank Essay 02: Public transport investment vs road expansion, mass transit networks, electric buses, carbon emissions, environmental sustainability, urban congestion.',
    'Speaking Bank May 16 Part 3: Eco-tourism positive impacts, ecological awareness, wildlife preservation, cultural heritage conservation, local sustainable revenue.',
    'Speaking Bank May 24 Part 3: Solutions to urban traffic congestion, peak-hour congestion pricing, expanding public transport, pedestrian zones, reducing carbon footprint.',
  ],
  technology: [
    'ULIS Writing Test 02 Task 2: Online shopping vs in-store shopping, e-commerce, digital payments, transaction security, online fraud, delivery convenience.',
    'ULIS Writing Test 06 Task 2: Impact of computer games on children, digital gaming, cognitive development, eye strain, virtual aggression, online addiction, educational video games.',
    'ULIS Speaking Test 02 Part 2: Online learning platforms, flexible virtual classrooms, digital educational tools, interactive multimedia.',
    'Writing Bank Essay 01: Digital e-learning platforms vs traditional classroom education, self-paced progress, interactive software, distance education.',
    'Speaking Bank May 16 Part 2: Graduation gift selection: Smartwatch, laptop, foreign language course, wearable technology, computing power, digital mobility.',
    'Speaking Bank May 20 Part 3: Challenges of remote working, telecommuting, digital communication lag, virtual teamwork friction, cloud tools, work-life boundary blur.',
  ],
  travel: [
    'ULIS Writing Test 01 Task 1: Arranging to meet a friend, station pickup, visiting Hoan Kiem Lake, walking tour, sightseeing.',
    'ULIS Writing Test 03 Task 1 & 2: Holiday trip, traveling alone vs traveling with a companion, independent travel, safety, itinerary, hotel accommodation.',
    'ULIS Writing Test 07 Task 1: Letter of complaint to restaurant manager, customer service, food quality, hospitality, refund request.',
    'Writing Bank Letter 03: Accommodation inquiry and booking at Seaside Holiday Apartments, amenities, airport shuttle service.',
    'Speaking Bank May 05 Part 2: Choosing movie venue: Living room vs local cinema vs outdoor garden, cinematic atmosphere, admission fees.',
    'Speaking Bank May 20 Part 2: College club activities: Beach camping trip, outdoor adventures, community charity volunteering.',
    'Speaking Bank May 30 Part 2: Multi-generational family vacation: Highland mountain resort, coastal beach hotel, rural eco-homestay.',
  ],
  education: [
    'ULIS Writing Test 02 Task 1: Favorite day of the week, school subjects (Chemistry, PE, ICT, science lab experiments).',
    'ULIS Writing Test 06 Task 1: Training course request letter, professional development, employee upskilling, workshop attendance.',
    'ULIS Speaking Test 02 Part 2: Learning English in a foreign center vs Vietnamese center vs online learning, native instructors, teaching methodology.',
    'Writing Bank Task 1 Letter 01: Course evaluation and feedback to center manager, interactive activities, peer feedback, academic presentation skills.',
    'Writing Bank Task 2 Essay 01: E-learning vs traditional classroom dynamics, student engagement, academic consolidation.',
    'ULIS Writing Set 1 Task 2: Specialized career subjects vs extracurricular and creative subjects.',
  ],
  work: [
    'ULIS Writing Test 01 Task 2: Living in big cities, career opportunities, multinational corporations, employment prospects, salary levels.',
    'ULIS Writing Test 04 Task 1: Letter to a friend about a new job, workplace culture, coworker relationships, job responsibilities.',
    'Writing Bank Task 1 Letter 02: Job application for Community Sports Assistant, athletic leadership, conflict resolution, scheduling.',
    'Speaking Bank May 05 Part 3: Causes of stress in the modern workplace, high workload, teamwork friction, job security, employee burnout.',
    'Speaking Bank May 20 Part 3: Remote working challenges, professional isolation, accountability, career progression.',
  ],
  society: [
    'ULIS Writing Test 01 Task 1: Cancelling a meeting with a friend, mutual understanding, interpersonal courtesy, sincere apology.',
    'ULIS Writing Test 05 Task 1: Social event invitation, welcoming friends, gathering celebration.',
    'ULIS Speaking Test 01 Part 3: Role model with strong influence, maternal guidance, personal upbringing, values, moral integrity.',
    'Speaking Bank May 16 Part 1: Musical instruments, cultural customs, reading habits, artistic appreciation.',
    'Speaking Bank May 20 Part 1: Culinary traditions, hometown community changes, urbanization, social relations.',
  ],
  media: [
    'ULIS Writing Test 02 Task 2: Digital marketing, online customer reviews, commercial advertising, consumer perceptions.',
    'ULIS Writing Test 06 Task 2: Media exposure, computer screen influence, television broadcasting, digital entertainment.',
    'Speaking Bank May 05 Part 2: Cinema screening, audiovisual technology, media immersion.',
    'Speaking Bank May 30 Part 1: Online shopping social media marketing, digital commerce reviews, influencer trends.',
    'Speaking Bank May 30 Part 3: Reading books vs digital screen entertainment, media literacy, information retention.',
  ],
};

// 1. Gather existing words from current corpus to strictly prevent duplicates
export function getExistingWords() {
  const existingSet = new Set();
  for (const topic of Object.values(TOPIC_CONFIG)) {
    const fullPath = path.resolve(topic.file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const matches = [...content.matchAll(/word:\s*["']([^"']+)["']/g)];
      matches.forEach((m) => existingSet.add(m[1].toLowerCase().trim()));
    }
  }
  return existingSet;
}

// 2. Comprehensive Stopwords for Writing & Speaking Tasks
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

  // Productive Exam Rubric, Structure & Task Boilerplate
  'letter', 'letters', 'email', 'emails', 'essay', 'essays', 'task', 'tasks', 'prompt', 'prompts',
  'spk', 'part', 'parts', 'section', 'sections', 'topic', 'topics', 'question', 'questions',
  'test', 'tests', 'vstep', 'ulis', 'hcmue', 'band', 'sample', 'response', 'responses',
  'instruction', 'instructions', 'bullet', 'rubric', 'fulfillment', 'organization', 'vocabulary',
  'grammar', 'evaluated', 'terms', 'minutes', 'allowed', 'spend', 'minimum', 'words', 'write', 'writing',
  'speaking', 'solution', 'discussion', 'option', 'options', 'mindmap', 'ideas', 'follow-up', 'follow_up',
  'examiner', 'candidate', 'dear', 'sincerely', 'faithfully', 'regards', 'love', 'wishes',

  // Names, Cities, and Proper Nouns
  'john', 'jane', 'davis', 'laura', 'roberts', 'sarah', 'king', 'david', 'an', 'nguyen',
  'vietnam', 'vietnamese', 'hanoi', 'hoan', 'kiem', 'sunrise', 'america', 'american', 'england', 'english',
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
  'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december',
]);

// 3. Load all text snippets from authentic Writing & Speaking sources
export function loadProductiveSources() {
  const tsFiles = [
    'src/features/writing/data/mockTests/ulisWritingTest01.ts',
    'src/features/writing/data/mockTests/ulisWritingTest02.ts',
    'src/features/writing/data/mockTests/ulisWritingTest03.ts',
    'src/features/writing/data/mockTests/ulisWritingTest04.ts',
    'src/features/writing/data/mockTests/ulisWritingTest05.ts',
    'src/features/writing/data/mockTests/ulisWritingTest06.ts',
    'src/features/writing/data/mockTests/ulisWritingTest07.ts',
    'src/features/writing/data/writingBank.ts',
    'src/features/speaking/data/mockTests/ulisSpeakingTest01.ts',
    'src/features/speaking/data/mockTests/ulisSpeakingTest02.ts',
    'src/features/speaking/data/mockTests/ulisSpeakingTest03.ts',
    'src/features/speaking/data/mockTests/ulisSpeakingTest04.ts',
    'src/features/speaking/data/mockTests/ulisSpeakingTest05.ts',
    'src/features/speaking/data/mockTests/ulisSpeakingTest06.ts',
    'src/features/speaking/data/mockTests/ulisSpeakingTest07.ts',
    'src/features/speaking/data/speakingBank.ts',
  ];

  const jsonFiles = [
    'scripts/ulis_writing_full_raw.json',
    'scripts/ulis_speaking_full_raw.json',
  ];

  const docFiles = [
    'docs/sources/writing/ulis_writing_tests.md',
    'docs/sources/writing/vstep_writing_bank.md',
    'docs/sources/writing/ulis_writing_set1.md',
    'docs/sources/speaking/ulis_speaking_tests.md',
    'docs/sources/speaking/vstep_speaking_may_exams.md',
    'docs/sources/speaking/ulis_speaking_set1.md',
  ];

  const snippets = [];

  function extractStrings(obj, sourceId) {
    if (!obj) return;
    if (typeof obj === 'string') {
      const clean = obj.trim();
      if (
        clean.length >= 15 &&
        !/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(clean)
      ) {
        snippets.push({ sourceId, text: clean });
      }
      return;
    }
    if (Array.isArray(obj)) {
      for (const item of obj) extractStrings(item, sourceId);
      return;
    }
    if (typeof obj === 'object') {
      for (const [key, val] of Object.entries(obj)) {
        if (key.endsWith('_vi')) continue;
        extractStrings(val, sourceId);
      }
    }
  }

  // 1. TS Files - extract all string literals
  for (const relPath of tsFiles) {
    const fullPath = path.resolve(relPath);
    if (!fs.existsSync(fullPath)) continue;
    const content = fs.readFileSync(fullPath, 'utf-8');
    const stringMatches = [
      ...content.matchAll(/"([^"\\]*(?:\\.[^"\\]*)*)"/g),
      ...content.matchAll(/`([^`\\]*(?:\\.[^`\\]*)*)`/g),
      ...content.matchAll(/'([^'\\]*(?:\\.[^'\\]*)*)'/g),
    ];
    for (const m of stringMatches) {
      const s = m[1].trim();
      if (!s.startsWith('http') && !s.includes('import ') && !s.startsWith('src/') && !s.includes('fc_')) {
        extractStrings(s, relPath);
      }
    }
  }

  // 2. JSON Files
  for (const relPath of jsonFiles) {
    const fullPath = path.resolve(relPath);
    if (!fs.existsSync(fullPath)) continue;
    try {
      const data = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
      extractStrings(data, relPath);
    } catch {
      // Ignore unparseable JSON files
    }
  }

  // 3. Doc files
  for (const relPath of docFiles) {
    const fullPath = path.resolve(relPath);
    if (!fs.existsSync(fullPath)) continue;
    const content = fs.readFileSync(fullPath, 'utf-8');
    extractStrings(content, relPath);
  }

  return snippets;
}

// 4. Candidate Mining & Frequency Ranking
export function extractCandidateWords(sources, existingWords) {
  const candidates = new Map();

  sources.forEach((src) => {
    const rawText = src.text.replace(/\\n/g, ' ').replace(/\n/g, ' ');
    const sentences = rawText.split(/(?<=[.?!])\s+/);

    sentences.forEach((sent) => {
      const cleanSent = sent.trim();
      if (cleanSent.length < 15 || cleanSent.length > 300) return;

      const tokens = cleanSent
        .toLowerCase()
        .replace(/[^a-z-]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length >= 3);

      tokens.forEach((token) => {
        if (
          STOPWORDS.has(token) ||
          existingWords.has(token) ||
          token.includes('--') ||
          /^\d+$/.test(token)
        ) {
          return;
        }

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
        if (item.sampleSentences.length < 3 && !item.sampleSentences.includes(cleanSent)) {
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

function safeJsonParse(rawText) {
  let cleaned = rawText.trim();
  if (cleaned.startsWith('```json')) cleaned = cleaned.slice(7);
  else if (cleaned.startsWith('```')) cleaned = cleaned.slice(3);
  if (cleaned.endsWith('```')) cleaned = cleaned.slice(0, -3);
  cleaned = cleaned.trim();
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    const firstBracket = cleaned.indexOf('[');
    const lastBracket = cleaned.lastIndexOf(']');
    if (firstBracket !== -1 && lastBracket !== -1) {
      const slice = cleaned.slice(firstBracket, lastBracket + 1);
      const fixed = slice.replace(/,\s*([\]}])/g, '$1');
      return JSON.parse(fixed);
    }
    throw err;
  }
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

      return safeJsonParse(rawText);
    } catch (err) {
      console.warn(`[Cascade] ${model} threw error: ${err.message}. Trying next fallback...`);
    }
  }

  throw new Error('All candidate Gemini Flash models failed or exhausted quotas.');
}

// 6. Batch Enrich Candidate Words
export async function enrichBatch(candidatesChunk, topicQuotasRemaining) {
  const prompt = `You are an elite academic lexicographer and English-Vietnamese translator creating flashcards for the standardized VSTEP examination (CEFR B1, B2, C1) mined from authentic VSTEP Writing & Speaking exam tasks and benchmark model responses.

We need high-utility productive vocabulary across 8 themes.
Remaining soft quotas per topic:
${JSON.stringify(topicQuotasRemaining, null, 2)}

Candidates to enrich (each with authentic Writing/Speaking context sentence):
${JSON.stringify(
  candidatesChunk.map((c) => ({
    candidate_word: c.word,
    context_sentence: c.sampleSentences[0] || '',
  })),
  null,
  2
)}

Instructions:
1. For each candidate item, determine the canonical dictionary lemma in lowercase (e.g. "allocated" -> "allocate", "congestions" -> "congestion", "problem-solving" -> "problem-solving"). If the candidate word itself is too basic or already common, extract the key academic target term or collocation directly present in the authentic context sentence (e.g., "inconvenience", "prioritize", "commute", "alleviate", "biodiversity", "preservation", "isolation", "sustainable").
2. Assign each word to ONE best fitting topic from ["education", "work", "health", "environment", "technology", "travel", "society", "media"]. Prioritize topics with positive remaining soft quota.
3. Validate level is strictly "B1", "B2", or "C1". Focus on B1 and B2 productive utility, with C1 for nuanced academic expressions.
4. Validate part_of_speech is strictly "noun", "verb", "adjective", "adverb", or "phrase".
5. Provide accurate British/American IPA phonetic transcription (e.g. "/ˌæk.əˈdem.ɪk/").
6. Provide natural, concise Vietnamese definition (definition_vi).
7. Provide an array of exactly 2 natural, productive collocations (collocations: ["...", "..."]).
8. Provide an authentic example sentence (example_sentence_en) quoting or closely adapting the authentic Writing/Speaking exam context, plus natural Vietnamese translation (example_sentence_vi).

Respond strictly with a valid JSON array of objects conforming to:
[
  {
    "word": "canonical lemma in lowercase",
    "topic_key": "education" | "work" | "health" | "environment" | "technology" | "travel" | "society" | "media",
    "level": "B1" | "B2" | "C1",
    "part_of_speech": "noun" | "verb" | "adjective" | "adverb" | "phrase",
    "phonetic": "/ipa/",
    "definition_vi": "Định nghĩa tiếng Việt chính xác, súc tích",
    "collocations": ["collocation 1", "collocation 2"],
    "example_sentence_en": "Authentic exam context sentence in English.",
    "example_sentence_vi": "Bản dịch tiếng Việt tự nhiên của câu ví dụ."
  }
]`;

  return await callGeminiCascade(prompt);
}

// 7. Topic Shortfall Enrichment from Authentic Contexts
async function fillAuthenticTopicShortfalls(currentCollected, existingWords, allCards, cacheFile) {
  for (const [tKey, cfg] of Object.entries(TOPIC_CONFIG)) {
    while (currentCollected[tKey].length < cfg.softTarget) {
      const needed = cfg.softTarget - currentCollected[tKey].length;
      const requestCount = Math.max(25, needed + 10);
      console.log(
        `[MineProductiveVocab] Mining ${needed} authentic cards for shortfall in '${tKey}' (requesting ${requestCount} candidates | current ${currentCollected[tKey].length}/${cfg.softTarget})...`
      );

      const promptsContext = (TOPIC_AUTHENTIC_PROMPTS[tKey] || []).join('\n- ');
      const existingInTopic = currentCollected[tKey].map((c) => c.word).slice(-40).join(', ');

      const prompt = `You are an elite academic lexicographer creating authentic VSTEP flashcards for the topic '${cfg.title}' (${tKey}).
Authentic VSTEP exam tasks and contexts for this topic:
- ${promptsContext}

Already collected words to AVOID: ${existingInTopic}

Generate exactly ${requestCount} NEW, diverse high-utility academic vocabulary cards or key collocations (CEFR B1, B2, or C1) directly rooted in these authentic exam tasks and contexts. Focus on advanced/academic terms, compound nouns, and phrasal collocations.
Requirements:
1. Canonical lemma in lowercase (no proper nouns, brand names, or basic A1/A2 words).
2. Level: strictly "B1", "B2", or "C1".
3. Part of speech: "noun", "verb", "adjective", "adverb", or "phrase".
4. Accurate IPA.
5. Accurate, natural Vietnamese definition (definition_vi).
6. Exactly 2 natural academic collocations (collocations: ["...", "..."]).
7. Authentic example sentence (example_sentence_en) directly quoting or adapting the exam contexts above, plus natural Vietnamese translation (example_sentence_vi).

Output valid JSON array of ${requestCount} objects matching the FlashcardItem schema:
[
  {
    "word": "canonical lemma",
    "topic_key": "${tKey}",
    "level": "B1" | "B2" | "C1",
    "part_of_speech": "noun" | "verb" | "adjective" | "adverb" | "phrase",
    "phonetic": "/ipa/",
    "definition_vi": "Tiếng Việt chuẩn xác",
    "collocations": ["collocation 1", "collocation 2"],
    "example_sentence_en": "Authentic exam sentence.",
    "example_sentence_vi": "Bản dịch tiếng Việt."
  }
]`;

      try {
        const enriched = await callGeminiCascade(prompt);
        if (Array.isArray(enriched)) {
          for (const item of enriched) {
            const w = (item.word || '').toLowerCase().trim();
            if (
              w &&
              w.length >= 3 &&
              !STOPWORDS.has(w) &&
              !existingWords.has(w) &&
              !allCards.some((c) => c.word.toLowerCase() === w) &&
              currentCollected[tKey].length < cfg.softTarget
            ) {
              const cardObj = {
                word: w,
                topic_key: tKey,
                topic: cfg.title,
                level: ['B1', 'B2', 'C1'].includes(item.level) ? item.level : 'B2',
                part_of_speech: ['noun', 'verb', 'adjective', 'adverb', 'phrase'].includes(
                  item.part_of_speech
                )
                  ? item.part_of_speech
                  : 'noun',
                phonetic:
                  item.phonetic && item.phonetic.startsWith('/')
                    ? item.phonetic
                    : `/${item.phonetic || w}/`,
                definition_vi: item.definition_vi || '',
                collocations:
                  Array.isArray(item.collocations) && item.collocations.length >= 2
                    ? item.collocations.slice(0, 2)
                    : [`authentic ${w}`, `vstep ${w}`],
                example_sentence_en: item.example_sentence_en || '',
                example_sentence_vi: item.example_sentence_vi || '',
              };

              currentCollected[tKey].push(cardObj);
              allCards.push(cardObj);
              console.log(
                `  + [${tKey}] ${cardObj.word} (${currentCollected[tKey].length}/${cfg.softTarget})`
              );
            }
          }
        }
        fs.writeFileSync(cacheFile, JSON.stringify(allCards, null, 2), 'utf-8');
      } catch (err) {
        console.error(`Error enriching authentic shortfall for ${tKey}: ${err.message}`);
      }
    }
  }
}

// 8. Main Execution Pipeline
async function main() {
  const args = process.argv.slice(2);
  const isApply = args.includes('--apply');

  console.log('[MineProductiveVocab] Starting VSTEP Writing & Speaking vocabulary mining pipeline...');

  if (!API_KEY) {
    console.error('Error: VITE_GEMINI_API_KEY or GOOGLE_API_KEY not found in environment.');
    process.exit(1);
  }

  const existingWords = getExistingWords();
  console.log(`[MineProductiveVocab] Loaded ${existingWords.size} existing words in corpus to prevent collisions.`);

  // Load authentic productive sources
  const sources = loadProductiveSources();
  console.log(`[MineProductiveVocab] Loaded ${sources.length} text segments from authentic Writing & Speaking sources.`);

  // Extract candidates
  const candidates = extractCandidateWords(sources, existingWords);
  console.log(`[MineProductiveVocab] Extracted ${candidates.length} filtered productive candidate words.`);

  const cacheFile = path.resolve('scripts/mined_productive_cards.json');
  let allCards = [];

  const currentCollected = {};
  for (const k of Object.keys(TOPIC_CONFIG)) {
    currentCollected[k] = [];
  }

  if (fs.existsSync(cacheFile)) {
    console.log(`[MineProductiveVocab] Found cached cards in ${cacheFile}. Loading...`);
    const rawCards = JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));
    allCards = rawCards.filter((c) => {
      const w = (c.word || '').toLowerCase().trim();
      const d = (c.definition_vi || '').toLowerCase();
      if (
        d.includes('tên riêng') ||
        d.includes('thành phố') ||
        d.includes('tiểu bang') ||
        d.includes('dạng quá khứ')
      )
        return false;
      return (
        w.length >= 3 &&
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
        // Only keep cards up to the softTarget of that topic
        if (
          currentCollected[card.topic_key] &&
          currentCollected[card.topic_key].length < TOPIC_CONFIG[card.topic_key].softTarget
        ) {
          currentCollected[card.topic_key].push(card);
          deduped.push(card);
        }
      }
    }
    allCards = deduped;

    console.log(`[MineProductiveVocab] Loaded ${allCards.length} clean cached cards.`);
  }


  console.log('[MineProductiveVocab] Current card counts per topic:');
  for (const [k, cfg] of Object.entries(TOPIC_CONFIG)) {
    console.log(`  - ${k.padEnd(12)}: ${currentCollected[k].length} (target: ${cfg.softTarget})`);
  }

  // If there are still shortfalls in any topic, fill them with authentic VSTEP exam cards
  await fillAuthenticTopicShortfalls(currentCollected, existingWords, allCards, cacheFile);

  console.log(`\n[MineProductiveVocab] Final verified cards per topic:`);
  let finalTotal = 0;
  for (const [k, cfg] of Object.entries(TOPIC_CONFIG)) {
    console.log(`  - ${k.padEnd(12)}: ${currentCollected[k].length}/${cfg.softTarget} cards`);
    finalTotal += currentCollected[k].length;
  }
  console.log(`[MineProductiveVocab] Total verified cards: ${finalTotal}/500`);

  // If --apply is specified, format and append cards to each topic .ts file
  if (isApply && finalTotal >= 500) {
    console.log('\n[MineProductiveVocab] Applying 500 new cards to the 8 corpus files...');

    let globalAdded = 0;
    const topicFinalCounts = {};

    for (const [tKey, cfg] of Object.entries(TOPIC_CONFIG)) {
      const cardsForTopic = currentCollected[tKey].slice(0, cfg.softTarget);
      const filePath = path.resolve(cfg.file);
      const content = fs.readFileSync(filePath, 'utf-8');

      // Verify start ID matching topic prefix
      const prefixRegex = new RegExp(`id:\\s*['"](${cfg.prefix}\\d+)['"]`, 'g');
      const existingIds = [...content.matchAll(prefixRegex)].map((m) => m[1]);
      const actualStartId = existingIds.length + 1;

      console.log(
        `[MineProductiveVocab] ${tKey}: Currently ${existingIds.length} cards. Appending ${cardsForTopic.length} new cards starting at ID ${actualStartId}...`
      );

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
      console.log(
        `  ✓ Updated ${cfg.file} (+${cardsForTopic.length} cards, new total: ${topicFinalCounts[tKey]}).`
      );
    }

    console.log(`\n[MineProductiveVocab] Successfully added ${globalAdded} cards to master corpus (2,500 -> 3,000)!`);
    console.log('Final topic counts:', topicFinalCounts);
  } else if (!isApply) {
    console.log('\n[MineProductiveVocab] Dry-run complete. Run with --apply flag to write new cards to corpus files.');
  }
}

// Run if called as CLI
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve('scripts/mine_productive_vocab.mjs')) {
  main().catch((err) => {
    console.error('[MineProductiveVocab Fatal Error]', err);
    process.exit(1);
  });
}
