import fs from 'node:fs';
import path from 'node:path';

if (typeof process.loadEnvFile === 'function') {
  try {
    process.loadEnvFile();
  } catch {}
}

const API_KEY = process.env.GOOGLE_API_KEY || process.env.VITE_GEMINI_API_KEY;
if (!API_KEY) {
  console.error('ERROR: Missing GOOGLE_API_KEY in .env');
  process.exit(1);
}

export const TEST_REGISTRY = {
  1: {
    id: 'ulis_read_test_01',
    exportName: 'ULIS_READING_TEST_01',
    title: 'VSTEP Reading Mock Test 1 (Chuẩn ĐHNN - ĐHQGHN)',
    sourceInfo: 'Source: "7 Vstep Tests B1-B2-C1 Full Key" (NXB ĐHQGHN, 2019), Pages 10–17, Key page 131',
    officialKeys: [
      'B', 'A', 'B', 'B', 'B', 'B', 'C', 'D', 'C', 'B', // 1-10
      'A', 'D', 'A', 'B', 'C', 'A', 'D', 'C', 'A', 'D', // 11-20
      'A', 'C', 'D', 'B', 'C', 'D', 'B', 'A', 'C', 'D', // 21-30
      'A', 'B', 'A', 'B', 'A', 'C', 'D', 'C', 'D', 'B', // 31-40
    ],
    passageConfigs: [
      { num: 1, pageKeys: ['10', '11'], startQ: 1, endQ: 10, difficulty: 'B1' },
      { num: 2, pageKeys: ['12', '13'], startQ: 11, endQ: 20, difficulty: 'B2' },
      { num: 3, pageKeys: ['14', '15'], startQ: 21, endQ: 30, difficulty: 'B2' },
      { num: 4, pageKeys: ['15', '16', '17'], startQ: 31, endQ: 40, difficulty: 'C1' },
    ],
  },
  2: {
    id: 'ulis_read_test_02',
    exportName: 'ULIS_READING_TEST_02',
    title: 'VSTEP Reading Mock Test 2 (Chuẩn ĐHNN - ĐHQGHN)',
    sourceInfo: 'Source: "7 Vstep Tests B1-B2-C1 Full Key" (NXB ĐHQGHN, 2019), Pages 24–31, Key page 136',
    officialKeys: [
      'D', 'A', 'D', 'B', 'C', 'B', 'A', 'D', 'C', 'C', // 1-10
      'A', 'B', 'D', 'A', 'D', 'C', 'A', 'B', 'C', 'D', // 11-20
      'A', 'C', 'A', 'B', 'B', 'D', 'B', 'C', 'D', 'B', // 21-30
      'D', 'B', 'D', 'B', 'C', 'A', 'C', 'A', 'B', 'D', // 31-40
    ],
    passageConfigs: [
      { num: 1, pageKeys: ['24', '25'], startQ: 1, endQ: 10, difficulty: 'B1' },
      { num: 2, pageKeys: ['25', '26', '27'], startQ: 11, endQ: 20, difficulty: 'B2' },
      { num: 3, pageKeys: ['28', '29'], startQ: 21, endQ: 30, difficulty: 'B2' },
      { num: 4, pageKeys: ['30', '31'], startQ: 31, endQ: 40, difficulty: 'C1' },
    ],
  },
  3: {
    id: 'ulis_read_test_03',
    exportName: 'ULIS_READING_TEST_03',
    title: 'VSTEP Reading Mock Test 3 (Chuẩn ĐHNN - ĐHQGHN)',
    sourceInfo: 'Source: "7 Vstep Tests B1-B2-C1 Full Key" (NXB ĐHQGHN, 2019), Pages 36–43, Key page 140',
    officialKeys: [
      'B', 'C', 'D', 'C', 'B', 'B', 'C', 'D', 'C', 'A', // 1-10
      'D', 'C', 'A', 'D', 'C', 'A', 'D', 'C', 'B', 'B', // 11-20
      'C', 'B', 'C', 'A', 'C', 'A', 'D', 'D', 'C', 'D', // 21-30
      'B', 'B', 'D', 'D', 'A', 'B', 'A', 'A', 'D', 'C', // 31-40
    ],
    passageConfigs: [
      { num: 1, pageKeys: ['38', '39'], startQ: 1, endQ: 10, difficulty: 'B1' },
      { num: 2, pageKeys: ['39', '40'], startQ: 11, endQ: 20, difficulty: 'B2' },
      { num: 3, pageKeys: ['41', '42'], startQ: 21, endQ: 30, difficulty: 'B2' },
      { num: 4, pageKeys: ['42', '43'], startQ: 31, endQ: 40, difficulty: 'C1' },
    ],
  },
  4: {
    id: 'ulis_read_test_04',
    exportName: 'ULIS_READING_TEST_04',
    title: 'VSTEP Reading Mock Test 4 (Chuẩn ĐHNN - ĐHQGHN)',
    sourceInfo: 'Source: "7 Vstep Tests B1-B2-C1 Full Key" (NXB ĐHQGHN, 2019), Pages 50–55, Key page 145',
    officialKeys: [
      'B', 'C', 'A', 'A', 'D', 'D', 'C', 'D', 'B', 'A', // 1-10
      'D', 'A', 'B', 'C', 'D', 'A', 'C', 'B', 'D', 'D', // 11-20
      'C', 'A', 'D', 'C', 'C', 'B', 'D', 'B', 'D', 'A', // 21-30
      'B', 'B', 'B', 'C', 'C', 'A', 'D', 'D', 'A', 'D', // 31-40
    ],
    passageConfigs: [
      { num: 1, pageKeys: ['50', '51'], startQ: 1, endQ: 10, difficulty: 'B1' },
      { num: 2, pageKeys: ['51', '52', '53'], startQ: 11, endQ: 20, difficulty: 'B2' },
      { num: 3, pageKeys: ['53', '54'], startQ: 21, endQ: 30, difficulty: 'B2' },
      { num: 4, pageKeys: ['54', '55'], startQ: 31, endQ: 40, difficulty: 'C1' },
    ],
  },
  5: {
    id: 'ulis_read_test_05',
    exportName: 'ULIS_READING_TEST_05',
    title: 'VSTEP Reading Mock Test 5 (Chuẩn ĐHNN - ĐHQGHN)',
    sourceInfo: 'Source: "7 Vstep Tests B1-B2-C1 Full Key" (NXB ĐHQGHN, 2019), Pages 64–71, Key page 150',
    officialKeys: [],
    passageConfigs: [
      { num: 1, pageKeys: ['64', '65'], startQ: 1, endQ: 10, difficulty: 'B1' },
      { num: 2, pageKeys: ['66', '67'], startQ: 11, endQ: 20, difficulty: 'B2' },
      { num: 3, pageKeys: ['68', '69'], startQ: 21, endQ: 30, difficulty: 'B2' },
      { num: 4, pageKeys: ['70', '71'], startQ: 31, endQ: 40, difficulty: 'C1' },
    ],
  },
  6: {
    id: 'ulis_read_test_06',
    exportName: 'ULIS_READING_TEST_06',
    title: 'VSTEP Reading Mock Test 6 (Chuẩn ĐHNN - ĐHQGHN)',
    sourceInfo: 'Source: "7 Vstep Tests B1-B2-C1 Full Key" (NXB ĐHQGHN, 2019), Pages 78–85, Key page 155',
    officialKeys: [],
    passageConfigs: [
      { num: 1, pageKeys: ['78', '79'], startQ: 1, endQ: 10, difficulty: 'B1' },
      { num: 2, pageKeys: ['80', '81'], startQ: 11, endQ: 20, difficulty: 'B2' },
      { num: 3, pageKeys: ['82', '83'], startQ: 21, endQ: 30, difficulty: 'B2' },
      { num: 4, pageKeys: ['84', '85'], startQ: 31, endQ: 40, difficulty: 'C1' },
    ],
  },
  7: {
    id: 'ulis_read_test_07',
    exportName: 'ULIS_READING_TEST_07',
    title: 'VSTEP Reading Mock Test 7 (Chuẩn ĐHNN - ĐHQGHN)',
    sourceInfo: 'Source: "7 Vstep Tests B1-B2-C1 Full Key" (NXB ĐHQGHN, 2019), Pages 92–99, Key page 160',
    officialKeys: [],
    passageConfigs: [
      { num: 1, pageKeys: ['92', '93'], startQ: 1, endQ: 10, difficulty: 'B1' },
      { num: 2, pageKeys: ['94', '95'], startQ: 11, endQ: 20, difficulty: 'B2' },
      { num: 3, pageKeys: ['96', '97'], startQ: 21, endQ: 30, difficulty: 'B2' },
      { num: 4, pageKeys: ['98', '99'], startQ: 31, endQ: 40, difficulty: 'C1' },
    ],
  },
};

const MODELS = [
  'gemini-3.8-flash',
  'gemini-3.7-flash',
  'gemini-3.6-flash',
  'gemini-3.5-flash',
  'gemini-3.5-flash-lite',
];

async function callGeminiJson(prompt) {
  for (const model of MODELS) {
    for (let attempt = 1; attempt <= 4; attempt++) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
        const res = await fetch(url, {
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
          // If quota exceeded or rate limited, do NOT retry 4 times — jump to next model immediately!
          if (res.status === 429) {
            console.warn(`  [QUOTA / RATE LIMIT] ${model} reached 429. Skipping to next model...`);
            break;
          }
          throw new Error(`HTTP ${res.status}: ${errText}`);
        }

        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) throw new Error('Empty response from model');
        console.log(`  [Generated via: ${model}]`);
        return JSON.parse(text);
      } catch (err) {
        if (err.message?.includes('429') || err.message?.includes('RESOURCE_EXHAUSTED') || err.message?.includes('Quota exceeded')) {
          break;
        }
        const waitMs = attempt * 3000;
        console.warn(`  [RETRY ${attempt}] ${model}: ${err.message}. Waiting ${waitMs / 1000}s...`);
        await new Promise((resolve) => setTimeout(resolve, waitMs));
      }
    }
  }
  throw new Error('All models and retries exhausted');
}

/**
 * Ensures clue_sentence is a 100% exact verbatim substring of content_paragraphs[clue_paragraph_index].
 */
function guaranteeVerbatimClue(q, paragraphs) {
  let pIdx = q.clue_paragraph_index ?? 0;
  if (pIdx < 0 || pIdx >= paragraphs.length) {
    pIdx = 0;
    q.clue_paragraph_index = 0;
  }

  let paragraph = paragraphs[pIdx];

  // 1. Direct match in assigned paragraph
  if (q.clue_sentence && paragraph.includes(q.clue_sentence)) {
    return;
  }

  // 2. Direct match in another paragraph
  if (q.clue_sentence) {
    for (let i = 0; i < paragraphs.length; i++) {
      if (paragraphs[i].includes(q.clue_sentence)) {
        q.clue_paragraph_index = i;
        return;
      }
    }
  }

  // 3. Fallback: Find closest sentence in target paragraph by word overlap
  const sentences = paragraph
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 10 && paragraph.includes(s));

  if (sentences.length > 0) {
    const clueWords = new Set(
      (q.clue_sentence || q.question_text || '')
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter((w) => w.length > 2)
    );

    let bestSentence = sentences[0];
    let maxOverlap = -1;

    for (const sent of sentences) {
      const sentWords = sent
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/);
      let overlap = 0;
      for (const w of sentWords) {
        if (clueWords.has(w)) overlap++;
      }
      if (overlap > maxOverlap) {
        maxOverlap = overlap;
        bestSentence = sent;
      }
    }

    q.clue_sentence = bestSentence;
    return;
  }

  // 4. Ultimate safety: Use first 80 characters of the paragraph
  q.clue_sentence = paragraph.slice(0, Math.min(80, paragraph.length)).trim();
}

export async function assembleReadingTest(rawPagesJsonPath, outTsPath, testNum = 1) {
  const testMeta = TEST_REGISTRY[testNum];
  if (!testMeta) {
    throw new Error(`Test number ${testNum} is not configured in TEST_REGISTRY.`);
  }

  console.log(`Reading raw pages from ${rawPagesJsonPath}...`);
  const rawPages = JSON.parse(fs.readFileSync(rawPagesJsonPath, 'utf-8'));

  const idPrefix = `ulis_r${String(testNum).padStart(2, '0')}`;
  const passages = [];

  const cacheFile = `scripts/.test_${testNum}_passages_cache.json`;
  let passageCache = {};
  if (fs.existsSync(cacheFile)) {
    try {
      passageCache = JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));
    } catch {}
  }

  for (const cfg of testMeta.passageConfigs) {
    if (passageCache[cfg.num] && passageCache[cfg.num].questions?.length === 10) {
      console.log(`\nReusing cached Passage ${cfg.num} (${passageCache[cfg.num].questions.length} questions)...`);
      passages.push(passageCache[cfg.num]);
      continue;
    }

    console.log(`\nStructuring Passage ${cfg.num} (Questions ${cfg.startQ}-${cfg.endQ})...`);
    let pageText = '';
    if (testNum === 4) {
      if (cfg.num === 1) {
        pageText = rawPages['50'] + '\n\n' + rawPages['51'].slice(0, rawPages['51'].indexOf('PASSAGE 2'));
      } else if (cfg.num === 2) {
        pageText = rawPages['51'].slice(rawPages['51'].indexOf('PASSAGE 2')) + '\n\n' + rawPages['52'] + '\n\n' + rawPages['53'].slice(0, rawPages['53'].indexOf('PASSAGE 3'));
      } else if (cfg.num === 3) {
        pageText = rawPages['53'].slice(rawPages['53'].indexOf('PASSAGE 3')) + '\n\n' + rawPages['54'].slice(0, rawPages['54'].indexOf('PASSAGE 4'));
      } else if (cfg.num === 4) {
        pageText = rawPages['54'].slice(rawPages['54'].indexOf('PASSAGE 4')) + '\n\n' + rawPages['55'];
      }
    } else {
      pageText = cfg.pageKeys
        .map((k) => rawPages[k] || '')
        .filter(Boolean)
        .join('\n\n');
    }

    const officialSlice = testMeta.officialKeys.slice(cfg.startQ - 1, cfg.endQ);

    const prompt = `
You are an expert VSTEP exam data engineer.
Structure the following raw text from an authentic VSTEP Reading test book into clean, verified JSON.

RAW SOURCE TEXT FOR PASSAGE ${cfg.num}:
${pageText}

OFFICIAL ANSWER KEYS FOR QUESTIONS ${cfg.startQ} to ${cfg.endQ}:
${officialSlice.map((k, idx) => `Q${cfg.startQ + idx}: ${k}`).join(', ')}

INSTRUCTIONS:
1. Extract the passage text into "content_paragraphs" (array of string, each element is one full paragraph). Preserve any [A], [B], [C], [D] insertion markers verbatim in the text. Remove running headers, line number columns, and page footer lines.
2. Calculate "word_count" (integer, words in passage).
3. "title": e.g. "Passage ${cfg.num}: [Descriptive Title from text]".
4. "topic": 1-3 words topic in English (e.g. "Community & Social Work", "Employment & Aging", "Personal Memoir & Work", "Industrial History & Science", etc.).
5. "difficulty": "${cfg.difficulty}".
6. Extract each of the 10 questions (${cfg.startQ} to ${cfg.endQ}):
   - "id": "${idPrefix}_q" + two-digit question number (e.g. "${idPrefix}_q01", "${idPrefix}_q12")
   - "type": Choose one of: "main_idea", "vocab_in_context", "factual_detail", "negative_fact", "inference", "author_attitude", "sentence_insertion".
     (If the question asks "Where would the following sentence best fit: ..." or options are [A], [B], [C], [D], use "sentence_insertion").
   - "question_text": Clean question text without number prefix.
   - "options": Array of 4 objects: [{"key": "A", "text": "..."}, {"key": "B", "text": "..."}, {"key": "C", "text": "..."}, {"key": "D", "text": "..."}]. Clean options without "A.", "B." prefix.
   - "correct_key": MUST MATCH the official key provided above!
   - "clue_paragraph_index": 0-indexed integer indicating which paragraph in "content_paragraphs" contains the evidence/clue.
   - "clue_sentence": CRITICAL REQUIREMENT: This MUST be an EXACT, VERBATIM substring copied directly from content_paragraphs[clue_paragraph_index]. DO NOT paraphrase. DO NOT include ellipses ("...").
   - "explanation_vi": Clear, thorough explanation in Vietnamese explaining why the official answer is correct, citing the clue sentence and why other options are incorrect.
   - "paraphrase_analysis": Optional object if the question paraphrases the text:
     { "question_phrase": "...", "passage_phrase": "...", "explanation": "..." }

Return valid JSON with keys: "title", "topic", "word_count", "difficulty", "content_paragraphs", "questions".
`;

    let structured = await callGeminiJson(prompt);
    if (Array.isArray(structured) && structured[0]?.questions) structured = structured[0];
    if (!structured.questions) {
      for (const k of Object.keys(structured)) {
        if (structured[k]?.questions && Array.isArray(structured[k].questions)) {
          structured = structured[k];
          break;
        }
      }
    }
    if (!structured.questions && structured.passage) structured = structured.passage;
    if (!structured.questions && structured[`passage_${cfg.num}`]) structured = structured[`passage_${cfg.num}`];
    if (!structured.questions && structured.data) structured = structured.data;

    // Validate questions count
    if (!structured.questions || !Array.isArray(structured.questions)) {
      console.error(`ERROR: Passage ${cfg.num} questions missing or invalid. Top keys:`, Object.keys(structured));
      throw new Error(`Passage ${cfg.num} questions missing in model output`);
    }

    // Strict clue validation
    for (const q of structured.questions) {
      // Special handling for Test 4 Question 6 (Architectural Lot Diagram)
      if (q.id === 'ulis_r04_q06') {
        q.type = 'inference';
        q.question_text = "It can be inferred that the typical New York building lot of the 1870's and 1880's looked MOST like which of the following?";
        q.options = [
          { key: 'A', text: 'An L-shaped lot wrapping around a street corner' },
          { key: 'B', text: 'A small square lot along the street' },
          { key: 'C', text: 'A wide rectangular lot running horizontally along the street' },
          { key: 'D', text: 'A tall, narrow rectangular lot extending 100 feet deep from a 25-foot street frontage' },
        ];
        q.correct_key = 'D';
        q.clue_paragraph_index = 1;
        q.clue_sentence = 'That lot was a rectangular area 25 feet wide by 100 feet deep - a shape perfectly suited for a row house.';
        q.explanation_vi = 'Đoạn 2 nêu rõ lô đất xây dựng điển hình ở New York thời kỳ đó có dạng hình chữ nhật rộng 25 feet và sâu 100 feet ("25 feet wide by 100 feet deep"). Trong hình vẽ, ô (D) mô tả chính xác một lô đất hẹp về bề ngang mặt đường (25 feet) nhưng kéo rất sâu vào bên trong (100 feet). Do đó, đáp án đúng là D.';
        q.paraphrase_analysis = {
          question_phrase: 'typical New York building lot looked MOST like',
          passage_phrase: 'That lot was a rectangular area 25 feet wide by 100 feet deep',
          explanation: 'Lô đất chữ nhật 25x100 feet tương ứng với hình chữ nhật hẹp và sâu theo phương thẳng đứng (D).'
        };
      }

      guaranteeVerbatimClue(q, structured.content_paragraphs);
      // Double check exact substring
      const par = structured.content_paragraphs[q.clue_paragraph_index];
      if (!par.includes(q.clue_sentence)) {
        console.error(`FATAL: Clue for ${q.id} is still not a substring!`);
      }
      if (q.paraphrase_analysis === null) {
        delete q.paraphrase_analysis;
      }
    }

    structured.id = `${idPrefix}_p${cfg.num}`;
    passages.push(structured);
    passageCache[cfg.num] = structured;
    fs.writeFileSync(cacheFile, JSON.stringify(passageCache, null, 2), 'utf-8');
    console.log(`Passage ${cfg.num} assembled successfully (${structured.questions.length} questions).`);
  }

  // Format full TypeScript module
  const tsContent = `import type { ReadingTest } from '../../../../types/schemas';

/**
 * Authentic VSTEP Reading Test ${testNum} (ULIS - ĐHQGHN Standard)
 * ${testMeta.sourceInfo}
 * Format: 4 Passages, 40 Questions, 60 Minutes.
 */
export const ${testMeta.exportName}: ReadingTest = ${JSON.stringify(
    {
      id: testMeta.id,
      title: testMeta.title,
      duration_minutes: 60,
      difficulty: 'B2',
      passages,
    },
    null,
    2
  )};
`;

  fs.mkdirSync(path.dirname(outTsPath), { recursive: true });
  fs.writeFileSync(outTsPath, tsContent, 'utf-8');
  console.log(`\nSuccessfully wrote TypeScript test to ${outTsPath}`);
}

if (process.argv[1] && process.argv[1].endsWith('assemble_reading.mjs')) {
  // Arguments:
  // node scripts/assemble_reading.mjs [raw_json] [out_ts] [test_num]
  // OR:
  // node scripts/assemble_reading.mjs <test_num>
  let testNum = 1;
  let rawPath = '';
  let outPath = '';

  const arg2 = process.argv[2];
  const arg3 = process.argv[3];
  const arg4 = process.argv[4];

  if (arg2 && arg2.match(/^\d+$/)) {
    testNum = parseInt(arg2, 10);
  } else if (arg4 && arg4.match(/^\d+$/)) {
    testNum = parseInt(arg4, 10);
  } else if (arg2 && arg2.includes('_02')) {
    testNum = 2;
  }

  const padNum = String(testNum).padStart(2, '0');
  rawPath = (arg2 && !arg2.match(/^\d+$/)) ? arg2 : `scripts/ulis_reading_test_${padNum}_raw.json`;
  outPath = arg3 || `src/features/reading/data/mockTests/ulisReadingTest${padNum}.ts`;

  console.log(`Configuring assembly for Test ${testNum}:`);
  console.log(`  Raw Input: ${rawPath}`);
  console.log(`  TS Output: ${outPath}`);

  assembleReadingTest(rawPath, outPath, testNum).catch((err) => {
    console.error('Assembly failed:', err);
    process.exit(1);
  });
}
