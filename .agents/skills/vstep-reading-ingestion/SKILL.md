---
name: vstep-reading-ingestion
description: End-to-end pipeline, scripts, institutional source alignment, schema conventions, and verification workflows for ingesting authentic VSTEP reading tests (ULIS and HCMUE) into verified TypeScript modules.
---

# VSTEP Reading Ingestion Pipeline

## Pipeline Overview

- **Goal**: Ingest authentic VSTEP Reading tests (4 passages, 40 questions, 60 minutes) from official institutional source books into verified TypeScript `ReadingTest` modules with 100% character accuracy, verified official answer keys, and verbatim clue sentences.
- **Stage 1 PDF Extraction**: Run `python scripts/extract_pdf_pages.py <pdf_path> <start_page> <end_page> <out_json>` using Google Gemini Flash model cascade (`gemini-3.8-flash -> gemini-3.7-flash -> gemini-3.6-flash -> gemini-3.5-flash -> gemini-3.5-flash-lite`) to extract verbatim text and options directly from scanned TIFF pages without OCR errors.
- **Stage 2 Structured Assembly**: Run `node scripts/assemble_reading.mjs <raw_pages_json> <out_ts_file> <test_num>` with official answer keys cross-referenced against the book's back-matter answer key section.
- **Stage 3 Verbatim Clue Verification**: Every question's `clue_sentence` must be validated as an exact, verbatim substring within `content_paragraphs[clue_paragraph_index]`. No ellipses (`...`), approximations, or hallucinations are allowed.
- **Sentence Insertion Questions**: Questions asking where a sentence best fits (`[A]`, `[B]`, `[C]`, `[D]`) must have `type: 'sentence_insertion'`, enabling the renderer to highlight inline badge markers in the passage text.

---

## File Layout and Naming Conventions

### Bank TypeScript Structure
```
src/features/reading/data/
  drills/
    hcmue/
      hcmueReadingTest01.ts
      ...through hcmueReadingTest05.ts
  mockTests/
    ulisReadingTest01.ts
    ulisReadingTest02.ts
    ...through ulisReadingTest07.ts
    index.ts
  dictionaryVi.ts        (2,000-word local offline dictionary)
  dictionaryVi.json
  index.ts               (barrel re-export)
```

### ID Naming Conventions
- Test ID: `ulis_read_test_01` .. `ulis_read_test_07`, `hcmue_read_test_01` .. `hcmue_read_test_05`
- Passage ID: `ulis_r01_p1` .. `ulis_r01_p4`
- Question ID: `ulis_r01_q01` .. `ulis_r01_q40`

---

## Institutional Source Mapping

### ULIS 7 Mock Tests Book (`scripts/7-Vstep-Tests-B1-B2-C1-Full-Key.pdf`)
- **Publisher**: NXB ĐHQGHN (2019)
- **Author Group**: Đội ngũ giảng viên ĐH Ngoại ngữ – ĐHQGHN
- **Test 1 Reading**: PDF pages 10–17 | Answer key on PDF page 131
- **Test 2 Reading**: PDF pages 24–31 | Answer key on PDF page 136
- **Test 3 Reading**: PDF pages 36–43 | Answer key on PDF page 140
- Test 4 Reading: PDF pages 50–55 | Answer key on PDF page 145
- Test 5 Reading: PDF pages 62–68 | Answer key on PDF page 149 (Book page 145)
- Test 6 Reading: PDF pages 78–85 | Answer key on PDF page 155
- **Test 7 Reading**: PDF pages 92–99 | Answer key on PDF page 160

### HCMUE 20 Tests Book (`scripts/vstep-collection-20-mock-tests.pdf`)
- **Publisher**: NXB ĐH Sư Phạm TP.HCM
- **Tests 1 to 5**: Ingested as Practice Drills to pair with HCMUE Listening drills.

---

## Ingestion Tooling Reference

### Stage 1: Page Extractor (`scripts/extract_pdf_pages.py`)
Extracts verbatim text across page ranges:
```powershell
python scripts/extract_pdf_pages.py "scripts/7-Vstep-Tests-B1-B2-C1-Full-Key.pdf" 10 17 "scripts/ulis_reading_test_01_raw.json"
```

### Stage 2: Assembly & Clue Validation (`scripts/assemble_reading.mjs`)
Structures raw text into typed TypeScript module and verifies exact substrings:
```powershell
node scripts/assemble_reading.mjs "scripts/ulis_reading_test_02_raw.json" "src/features/reading/data/mockTests/ulisReadingTest02.ts" 2
```


### Dictionary Extractor (`scripts/build_dictionary.mjs`)
Extracts ~2,000 flashcard words into offline dictionary:
```powershell
node scripts/build_dictionary.mjs
```

---

## TypeScript Module Contract

```typescript
import type { ReadingTest } from '../../../../types/schemas';

export const ULIS_READING_TEST_01: ReadingTest = {
  id: 'ulis_read_test_01',
  title: 'VSTEP Reading Mock Test 1 (Chuẩn ĐHNN - ĐHQGHN)',
  duration_minutes: 60,
  difficulty: 'B2',
  passages: [
    {
      id: 'ulis_r01_p1',
      title: 'Passage 1: ...',
      topic: 'Topic Name',
      word_count: 450,
      difficulty: 'B1',
      content_paragraphs: [
        "Paragraph 1 text [A] with insertion markers...",
        "Paragraph 2 text [B]..."
      ],
      questions: [
        {
          id: 'ulis_r01_q01',
          type: 'vocab_in_context',
          question_text: 'The word "..." in paragraph 1 is closest in meaning to:',
          options: [
            { key: 'A', text: 'Option A' },
            { key: 'B', text: 'Option B' },
            { key: 'C', text: 'Option C' },
            { key: 'D', text: 'Option D' }
          ],
          correct_key: 'B',
          clue_paragraph_index: 0,
          clue_sentence: 'Exact verbatim sentence from paragraph 1',
          explanation_vi: 'Giải thích chi tiết tại sao B đúng...'
        }
      ]
    }
  ]
};
```

---

## Quality & Verification Invariants

1. **40 Questions Guarantee**: Every test must contain exactly 4 passages and 40 questions (10 per passage).
2. **Exact Clue Substring Invariant**:
   ```typescript
   content_paragraphs[clue_paragraph_index].includes(clue_sentence) === true
   ```
   No ellipsis `...` or altered punctuation.
3. **Multi-account Tenant Isolation**: Client session stored in `vstep_${userId}_reading_session_${testId}_${mode}`.
4. **Cloud-on-Commit**: Submissions synchronized to `user_test_submissions` table via Supabase upsert.
