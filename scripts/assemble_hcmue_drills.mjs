import fs from 'node:fs';
import path from 'node:path';
import './loadEnv.mjs';

const API_KEY = process.env.GOOGLE_API_KEY || process.env.VITE_GEMINI_API_KEY;
if (!API_KEY) {
  console.error('ERROR: Missing GOOGLE_API_KEY in .env');
  process.exit(1);
}

export const HCMUE_TEST_REGISTRY = {
  1: {
    id: 'hcmue_read_test_01',
    exportName: 'HCMUE_READING_TEST_01',
    title: 'VSTEP Reading Practice Drill 1 (Chuẩn ĐH Sư Phạm TP.HCM)',
    sourceInfo: 'Source: "VSTEP Collection: 20 Mock Tests" (NXB ĐH Sư Phạm TP.HCM, 2017), Test 1 Reading (PDF Pages 11–24), Key page 145 (Book p. 146)',
    officialKeys: [
      'A', 'B', 'B', 'C', 'C', 'A', 'D', 'C', 'C', 'A', // 1-10
      'B', 'D', 'B', 'B', 'B', 'D', 'D', 'B', 'C', 'C', // 11-20
      'B', 'C', 'C', 'B', 'A', 'C', 'C', 'C', 'D', 'D', // 21-30
      'A', 'B', 'A', 'B', 'C', 'C', 'B', 'A', 'C', 'A', // 31-40
    ],
  },
  2: {
    id: 'hcmue_read_test_02',
    exportName: 'HCMUE_READING_TEST_02',
    title: 'VSTEP Reading Practice Drill 2 (Chuẩn ĐH Sư Phạm TP.HCM)',
    sourceInfo: 'Source: "VSTEP Collection: 20 Mock Tests" (NXB ĐH Sư Phạm TP.HCM, 2017), Test 2 Reading (PDF Pages 39–51), Key page 157 (Book p. 158)',
    officialKeys: [
      'A', 'C', 'A', 'D', 'B', 'A', 'C', 'D', 'D', 'A', // 1-10
      'D', 'A', 'B', 'A', 'A', 'C', 'C', 'B', 'C', 'B', // 11-20
      'B', 'A', 'B', 'C', 'A', 'B', 'C', 'A', 'C', 'D', // 21-30
      'C', 'C', 'B', 'A', 'B', 'B', 'C', 'A', 'C', 'D', // 31-40
    ],
  },
  3: {
    id: 'hcmue_read_test_03',
    exportName: 'HCMUE_READING_TEST_03',
    title: 'VSTEP Reading Practice Drill 3 (Chuẩn ĐH Sư Phạm TP.HCM)',
    sourceInfo: 'Source: "VSTEP Collection: 20 Mock Tests" (NXB ĐH Sư Phạm TP.HCM, 2017), Test 3 Reading (PDF Pages 65–77), Key page 167 (Book p. 168)',
    officialKeys: [
      'A', 'B', 'D', 'C', 'B', 'A', 'A', 'C', 'A', 'B', // 1-10
      'A', 'C', 'A', 'B', 'C', 'A', 'C', 'B', 'A', 'A', // 11-20
      'D', 'A', 'C', 'C', 'A', 'D', 'C', 'C', 'A', 'B', // 21-30
      'C', 'A', 'D', 'B', 'D', 'C', 'D', 'C', 'B', 'B', // 31-40
    ],
  },
  4: {
    id: 'hcmue_read_test_04',
    exportName: 'HCMUE_READING_TEST_04',
    title: 'VSTEP Reading Practice Drill 4 (Chuẩn ĐH Sư Phạm TP.HCM)',
    sourceInfo: 'Source: "VSTEP Collection: 20 Mock Tests" (NXB ĐH Sư Phạm TP.HCM, 2017), Test 4 Reading (PDF Pages 91–104), Key page 177 (Book p. 178)',
    officialKeys: [
      'A', 'D', 'A', 'A', 'B', 'C', 'A', 'B', 'D', 'C', // 1-10
      'C', 'B', 'B', 'A', 'C', 'D', 'A', 'A', 'C', 'B', // 11-20
      'D', 'D', 'B', 'A', 'B', 'C', 'C', 'A', 'B', 'C', // 21-30
      'C', 'C', 'A', 'D', 'C', 'C', 'D', 'D', 'A', 'C', // 31-40
    ],
  },
  5: {
    id: 'hcmue_read_test_05',
    exportName: 'HCMUE_READING_TEST_05',
    title: 'VSTEP Reading Practice Drill 5 (Chuẩn ĐH Sư Phạm TP.HCM)',
    sourceInfo: 'Source: "VSTEP Collection: 20 Mock Tests" (NXB ĐH Sư Phạm TP.HCM, 2017), Test 5 Reading (PDF Pages 119–132), Key page 191 (Book p. 192)',
    officialKeys: [
      'C', 'D', 'A', 'C', 'C', 'B', 'B', 'B', 'D', 'A', // 1-10
      'B', 'A', 'C', 'A', 'B', 'A', 'B', 'C', 'D', 'C', // 11-20
      'B', 'D', 'B', 'A', 'C', 'B', 'C', 'A', 'D', 'D', // 21-30
      'A', 'B', 'C', 'B', 'C', 'D', 'A', 'C', 'D', 'A', // 31-40
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
          if (res.status === 429) {
            console.warn(`  [QUOTA 429] ${model}. Skipping to next model...`);
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
        if (
          err.message?.includes('429') ||
          err.message?.includes('RESOURCE_EXHAUSTED') ||
          err.message?.includes('Quota exceeded')
        ) {
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

/**
 * Split test's raw pages into 4 passage text chunks using section headers.
 */
function splitRawTestIntoPassages(rawPages) {
  // Sort page numbers numerically
  const sortedKeys = Object.keys(rawPages).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  const fullText = sortedKeys.map((k) => `[PAGE ${k}]\n` + rawPages[k]).join('\n\n');

  // Look for PASSAGE 2, PASSAGE 3, PASSAGE 4
  const p2Match = fullText.search(/(?:PASSAGE|Passage)\s*2/i);
  const p3Match = fullText.search(/(?:PASSAGE|Passage)\s*3/i);
  const p4Match = fullText.search(/(?:PASSAGE|Passage)\s*4/i);

  if (p2Match !== -1 && p3Match !== -1 && p4Match !== -1 && p2Match < p3Match && p3Match < p4Match) {
    return [
      fullText.slice(0, p2Match).trim(),
      fullText.slice(p2Match, p3Match).trim(),
      fullText.slice(p3Match, p4Match).trim(),
      fullText.slice(p4Match).trim(),
    ];
  }

  // Fallback by question headers
  const q11Match = fullText.search(/Questions\s*11\s*[-–]\s*20/i);
  const q21Match = fullText.search(/Questions\s*21\s*[-–]\s*30/i);
  const q31Match = fullText.search(/Questions\s*31\s*[-–]\s*40/i);

  if (q11Match !== -1 && q21Match !== -1 && q31Match !== -1 && q11Match < q21Match && q21Match < q31Match) {
    return [
      fullText.slice(0, q11Match).trim(),
      fullText.slice(q11Match, q21Match).trim(),
      fullText.slice(q21Match, q31Match).trim(),
      fullText.slice(q31Match).trim(),
    ];
  }

  // Fallback chunking by dividing pages roughly evenly
  const perChunk = Math.ceil(sortedKeys.length / 4);
  return [
    sortedKeys.slice(0, perChunk).map((k) => rawPages[k]).join('\n\n'),
    sortedKeys.slice(perChunk, perChunk * 2).map((k) => rawPages[k]).join('\n\n'),
    sortedKeys.slice(perChunk * 2, perChunk * 3).map((k) => rawPages[k]).join('\n\n'),
    sortedKeys.slice(perChunk * 3).map((k) => rawPages[k]).join('\n\n'),
  ];
}

export async function assembleHcmueReadingTest(testNum) {
  const testMeta = HCMUE_TEST_REGISTRY[testNum];
  if (!testMeta) throw new Error(`Test ${testNum} not configured in HCMUE_TEST_REGISTRY`);

  const padNum = String(testNum).padStart(2, '0');
  const rawPath = `scripts/hcmue_reading_test_${padNum}_raw.json`;
  const outPath = `src/features/reading/data/drills/hcmue/hcmueReadingTest${padNum}.ts`;

  if (!fs.existsSync(rawPath)) {
    throw new Error(`Raw pages file ${rawPath} does not exist. Run extract_hcmue_reading_pages.py first.`);
  }

  console.log(`\n================ ASSEMBLING HCMUE READING DRILL ${testNum} ================"`);
  const rawPages = JSON.parse(fs.readFileSync(rawPath, 'utf-8'));
  const passageTexts = splitRawTestIntoPassages(rawPages);

  const passages = [];
  const idPrefix = `hcmue_r${padNum}`;

  const difficulties = ['B1', 'B2', 'B2', 'C1'];

  for (let pIdx = 0; pIdx < 4; pIdx++) {
    const passageNum = pIdx + 1;
    const startQ = pIdx * 10 + 1;
    const endQ = (pIdx + 1) * 10;
    const cacheFile = `scripts/.hcmue_cache_t${testNum}_p${passageNum}.json`;

    if (fs.existsSync(cacheFile)) {
      try {
        const cached = JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));
        if (cached && cached.questions && cached.questions.length === 10) {
          if (!cached.word_count || typeof cached.word_count !== 'number') {
            cached.word_count = cached.content_paragraphs.join(' ').split(/\s+/).filter(Boolean).length;
            fs.writeFileSync(cacheFile, JSON.stringify(cached, null, 2), 'utf-8');
          }
          console.log(`[Cache hit] Reusing Passage ${passageNum} (${cached.title})`);
          passages.push(cached);
          continue;
        }
      } catch {
        console.warn(`Corrupted cache for T${testNum} P${passageNum}, re-generating...`);
      }
    }

    console.log(`\nStructuring Test ${testNum} Passage ${passageNum} (Questions ${startQ}–${endQ})...`);
    const pageText = passageTexts[pIdx];
    const officialSlice = testMeta.officialKeys.slice(startQ - 1, endQ);

    const prompt = `
You are an expert VSTEP exam data engineer.
Structure the following raw text from an authentic VSTEP Reading test book into clean, verified JSON.

RAW SOURCE TEXT FOR PASSAGE ${passageNum}:
${pageText}

OFFICIAL ANSWER KEYS FOR QUESTIONS ${startQ} to ${endQ}:
${officialSlice.map((k, idx) => `Q${startQ + idx}: ${k}`).join(', ')}

INSTRUCTIONS:
1. Extract the passage text into "content_paragraphs" (array of string, each element is one full paragraph).
   - Preserve any [A], [B], [C], [D] insertion markers verbatim in the text.
   - Remove running headers, line number columns, and page footer lines.
2. Calculate "word_count" (integer, words in passage).
3. "title": e.g. "Passage ${passageNum}: [Descriptive Title from text]".
4. "topic": 1-3 words topic in English (e.g. "Community & Social Work", "Environmental Science", "Personal Memoir", "Technology & Innovation", "History & Culture", etc.).
5. "difficulty": "${difficulties[pIdx]}".
6. Extract each of the 10 questions (${startQ} to ${endQ}):
   - "id": "${idPrefix}_q" + two-digit question number (e.g. "${idPrefix}_q${String(startQ).padStart(2, '0')}")
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
    if (!structured.questions && structured[`passage_${passageNum}`]) structured = structured[`passage_${passageNum}`];

    if (!structured.questions || !Array.isArray(structured.questions)) {
      console.error(`ERROR: Passage ${passageNum} questions missing in output. Top keys:`, Object.keys(structured));
      throw new Error(`Passage ${passageNum} questions missing in model output`);
    }

    // Strict clue validation & sentence insertion normalization
    for (let qIdx = 0; qIdx < structured.questions.length; qIdx++) {
      const q = structured.questions[qIdx];
      // Strictly enforce official key to prevent model drift
      if (officialSlice[qIdx]) {
        q.correct_key = officialSlice[qIdx];
      }
      if (q.type === 'sentence_insertion' || /in which space/i.test(q.question_text) || /where would the/i.test(q.question_text)) {
        q.type = 'sentence_insertion';
        q.options = [
          { key: 'A', text: '[A]' },
          { key: 'B', text: '[B]' },
          { key: 'C', text: '[C]' },
          { key: 'D', text: '[D]' },
        ];
      }

      guaranteeVerbatimClue(q, structured.content_paragraphs);

      const par = structured.content_paragraphs[q.clue_paragraph_index];
      if (!par.includes(q.clue_sentence)) {
        console.error(`FATAL: Clue for ${q.id} is still not a substring!`);
      }
      if (q.paraphrase_analysis === null) {
        delete q.paraphrase_analysis;
      }
    }

    if (!structured.word_count || typeof structured.word_count !== 'number') {
      structured.word_count = structured.content_paragraphs.join(' ').split(/\s+/).filter(Boolean).length;
    }

    structured.id = `${idPrefix}_p${passageNum}`;
    passages.push(structured);

    // Save per-passage disk cache immediately!
    fs.writeFileSync(cacheFile, JSON.stringify(structured, null, 2), 'utf-8');
    console.log(`Saved per-passage cache: ${cacheFile} (${structured.questions.length} questions)`);
  }

  // Format full TypeScript module
  const tsContent = `import type { ReadingTest } from '../../../../../types/schemas';

/**
 * Authentic VSTEP Reading Practice Drill ${testNum} (HCMUE Standard)
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

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, tsContent, 'utf-8');
  console.log(`\nSuccessfully wrote TypeScript test module to ${outPath}`);
}

async function main() {
  const argTests = process.argv.slice(2).filter((x) => x.match(/^\d+$/)).map((x) => parseInt(x, 10));
  const testsToRun = argTests.length > 0 ? argTests : [1, 2, 3, 4, 5];

  for (const t of testsToRun) {
    await assembleHcmueReadingTest(t);
  }
}

if (process.argv[1] && process.argv[1].endsWith('assemble_hcmue_drills.mjs')) {
  main().catch((err) => {
    console.error('Assembly failed:', err);
    process.exit(1);
  });
}
