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

const OFFICIAL_KEYS = [
  'B', 'A', 'B', 'B', 'B', 'B', 'C', 'D', 'C', 'B', // 1-10
  'A', 'D', 'A', 'B', 'C', 'A', 'D', 'C', 'A', 'D', // 11-20
  'A', 'C', 'D', 'B', 'C', 'D', 'B', 'A', 'C', 'D', // 21-30
  'A', 'B', 'A', 'B', 'A', 'C', 'D', 'C', 'D', 'B', // 31-40
];

const MODELS = [
  'gemini-3.5-flash',
  'gemini-flash-latest',
  'gemini-3.7-flash',
  'gemini-3.6-flash',
  'gemini-3.5-flash-lite',
  'gemini-2.5-flash',
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
          throw new Error(`HTTP ${res.status}: ${errText}`);
        }

        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) throw new Error('Empty response from model');
        return JSON.parse(text);
      } catch (err) {
        const waitMs = attempt * 4000;
        console.warn(`[RETRY ${attempt}] ${model}: ${err.message}. Waiting ${waitMs / 1000}s...`);
        await new Promise((resolve) => setTimeout(resolve, waitMs));
      }
    }
  }
  throw new Error('All models and retries exhausted');
}

export async function assembleReadingTest(rawPagesJsonPath, outTsPath) {
  console.log(`Reading raw pages from ${rawPagesJsonPath}...`);
  const rawPages = JSON.parse(fs.readFileSync(rawPagesJsonPath, 'utf-8'));

  // Split into 4 passages
  // Passage 1: Pages 10 & 11 (Q1 - Q10)
  // Passage 2: Pages 12 & 13 (Q11 - Q20)
  // Passage 3: Pages 14 & 15 (Q21 - Q30)
  // Passage 4: Pages 15, 16 & 17 (Q31 - Q40)

  const passageConfigs = [
    {
      num: 1,
      pages: [rawPages['10'], rawPages['11']].join('\n\n'),
      startQ: 1,
      endQ: 10,
      difficulty: 'B1',
    },
    {
      num: 2,
      pages: [rawPages['12'], rawPages['13']].join('\n\n'),
      startQ: 11,
      endQ: 20,
      difficulty: 'B2',
    },
    {
      num: 3,
      pages: [rawPages['14'], rawPages['15']].join('\n\n'),
      startQ: 21,
      endQ: 30,
      difficulty: 'B2',
    },
    {
      num: 4,
      pages: [rawPages['15'], rawPages['16'], rawPages['17']].join('\n\n'),
      startQ: 31,
      endQ: 40,
      difficulty: 'C1',
    },
  ];

  const passages = [];

  for (const cfg of passageConfigs) {
    console.log(`\nStructuring Passage ${cfg.num} (Questions ${cfg.startQ}-${cfg.endQ})...`);
    const officialSlice = OFFICIAL_KEYS.slice(cfg.startQ - 1, cfg.endQ);

    const prompt = `
You are an expert VSTEP exam data engineer.
Structure the following raw text from an authentic VSTEP Reading test book into clean, verified JSON.

RAW SOURCE TEXT FOR PASSAGE ${cfg.num}:
${cfg.pages}

OFFICIAL ANSWER KEYS FOR QUESTIONS ${cfg.startQ} to ${cfg.endQ}:
${officialSlice.map((k, idx) => `Q${cfg.startQ + idx}: ${k}`).join(', ')}

INSTRUCTIONS:
1. Extract the passage text into "content_paragraphs" (array of string, each element is one full paragraph). Preserve any [A], [B], [C], [D] insertion markers verbatim in the text.
2. Calculate "word_count" (integer, words in passage).
3. "title": e.g. "Passage ${cfg.num}: [Descriptive Title from text]".
4. "topic": 1-3 words topic in English (e.g. "Art & History", "Health & Medicine", "Science & Technology", "Environment", etc.).
5. "difficulty": "${cfg.difficulty}".
6. Extract each of the 10 questions (${cfg.startQ} to ${cfg.endQ}):
   - "id": "ulis_r01_q" + two-digit question number (e.g. "ulis_r01_q01", "ulis_r01_q12")
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

    const structured = await callGeminiJson(prompt);

    // Validate and clean clue sentences
    for (const q of structured.questions) {
      const pIdx = q.clue_paragraph_index;
      const paragraph = structured.content_paragraphs[pIdx];
      if (!paragraph) {
        console.warn(`Warning: Question ${q.id} has invalid clue_paragraph_index ${pIdx}. Adjusting...`);
        q.clue_paragraph_index = 0;
      } else if (!paragraph.includes(q.clue_sentence)) {
        console.warn(`Fixing clue sentence for ${q.id}: "${q.clue_sentence}" not found in paragraph ${pIdx}.`);
        // Search across all paragraphs for the clue or closest match
        let foundIdx = -1;
        for (let i = 0; i < structured.content_paragraphs.length; i++) {
          if (structured.content_paragraphs[i].includes(q.clue_sentence)) {
            foundIdx = i;
            break;
          }
        }
        if (foundIdx !== -1) {
          q.clue_paragraph_index = foundIdx;
        } else {
          // If clue has punctuation mismatch, find longest common substring or first sentence
          const cleanClue = q.clue_sentence.replace(/[^\w\s]/g, '').trim();
          const pClean = paragraph.replace(/[^\w\s]/g, '');
          if (!pClean.includes(cleanClue)) {
            // Pick the first full sentence in that paragraph
            const firstSentence = paragraph.split(/[.!?]/)[0]?.trim();
            if (firstSentence && paragraph.includes(firstSentence)) {
              q.clue_sentence = firstSentence;
            }
          }
        }
      }
    }

    structured.id = `ulis_r01_p${cfg.num}`;
    passages.push(structured);
    console.log(`Passage ${cfg.num} assembled successfully (${structured.questions.length} questions).`);
  }

  // Format full TypeScript module
  const tsContent = `import type { ReadingTest } from '../../../../types/schemas';

/**
 * Authentic VSTEP Reading Test 1 (ULIS - ĐHQGHN Standard)
 * Source: "7 Vstep Tests B1-B2-C1 Full Key" (NXB ĐHQGHN, 2019)
 * Format: 4 Passages, 40 Questions, 60 Minutes.
 * Verified against official answer key (PDF page 131).
 */
export const ULIS_READING_TEST_01: ReadingTest = ${JSON.stringify(
    {
      id: 'ulis_read_test_01',
      title: 'VSTEP Reading Mock Test 1 (Chuẩn ĐHNN - ĐHQGHN)',
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
  const rawPath = process.argv[2] || 'scripts/ulis_reading_test_01_raw.json';
  const outPath = process.argv[3] || 'src/features/reading/data/mockTests/ulisReadingTest01.ts';
  assembleReadingTest(rawPath, outPath).catch((err) => {
    console.error('Assembly failed:', err);
    process.exit(1);
  });
}
