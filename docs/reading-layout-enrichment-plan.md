# Reading Passage Layout Polish & Markdown Enrichment Plan

## Problem & Context
- **Horizontal Space Waste**: The reading passage panel currently renders a flex row for each paragraph with a `.paragraph-order-pill` (`[1]`, `[2]`, etc.), consuming 34px on the left of every line. In split-screen mode, this unnecessarily narrows the reading column.
- **Missing Authentic Formatting**: Target tested vocabulary words and reference pronouns (e.g., *a resonant hoot*, *precious charges*, *they*) are printed in bold in authentic books, but exist as plain unformatted strings in the TypeScript test bank.
- **Frontend String Rendering**: `PassagePanel` and `ReadingQuestionCard` currently render plain text strings and lack an inline formatter for markdown tags.

## Solidified Architectural Decisions
- **Paragraph Order Badges**: The `[1]`, `[2]` pill column and `.passage-paragraph-row` flex wrapper are completely removed.
- **Authentic Typography**: Paragraphs use traditional first-line indentation (`text-indent: 2em`) and full-width justified alignment (`text-align: justify; text-justify: inter-word;`). This reclaims 34px across all lines and mirrors authentic paper exam conditions where students count paragraphs manually.
- **Unified Bold Formatting (`**word**`)**: All tests across both HCMUE and ULIS standardize on unified bold markdown formatting (`**word**`). No HTML tags (`<u>`) needed, keeping data clean and standard.
- **Zero External Markdown Dependencies**: A lightweight (~25-line) inline tokenizer in `PassagePanel` and `ReadingQuestionCard` parses `**bold**` and `[A]-[D]` insertion tokens directly into React elements (`<strong>` and `<span className="insertion-point-marker">`), preserving native `TextNode` selection for Tap-to-Translate dictionary lookup.
- **Phased Rollout Strategy**:
  - Phase 1: Layout polish (reclaim 34px) + frontend inline tokenizer + HCMUE Drill 01 proof-of-concept enrichment.
  - Phase 2: Automated Gemini OCR batch enrichment script across the remaining 11 tests.

## Automated Gemini OCR Enrichment Architecture
To enrich all 12 tests without human manual typing or risky full-text re-transcription:
- **PDF Page Extraction**: For each passage (48 passages across 12 tests), crop the passage page image from the source PDF (`vstep-collection-20-mock-tests.pdf` or `7-Vstep-Tests-B1-B2-C1-Full-Key.pdf`) using PyMuPDF.
- **Targeted Gemini Vision OCR Prompt**:
  - Send the passage crop alongside the existing TypeScript paragraph text to Gemini Flash (`gemini-3.8-flash` cascade).
  - Prompt instructions: "Given this scanned book passage and the provided plain text paragraphs, identify all words/phrases printed in bold or bold/underlined. Return a JSON array of exact target phrases, their paragraph index, and occurrence index within the paragraph."
- **Atomic 3-Point Synchronized Patcher**:
  - Python script takes Gemini's verified list and patches the TypeScript file:
    - In `content_paragraphs`: wraps the target occurrence in `**phrase**`.
    - In `clue_sentence`: if the clue sentence contains the phrase, wraps the phrase in `**phrase**`.
    - In `question_text`: if the question stem tests the phrase, ensures `**phrase**` is formatted.
- **Deterministic Gate**: Run `pnpm test` (`readingBank.test.ts`) to immediately assert `paragraph.includes(q.clue_sentence) === true` across all 480 questions.

## Implementation Tasks

### Phase 1: Reading UI Components & PoC (COMPLETED)
- **[inlineMarkdown.tsx](file:///d:/program/vstep/src/features/reading/utils/inlineMarkdown.tsx)**: Implemented lightweight zero-dependency inline tokenizer converting `**bold**` to `<strong>` and `[A]-[D]` to `<span className="insertion-point-marker">`. Preserves DOM `TEXT_NODE`s for Tap-to-Translate dictionary lookup.
- **[inlineMarkdown.test.tsx](file:///d:/program/vstep/src/features/reading/utils/inlineMarkdown.test.tsx)**: 6 unit tests covering plain text, single/multiple bold tokens, insertion point parsing, and interleaved tokens.
- **[PassagePanel.tsx](file:///d:/program/vstep/src/features/reading/components/PassagePanel.tsx)**: Removed `.paragraph-order-pill` (`[1]`, `[2]`) and `.passage-paragraph-row`. Directly renders `<p className="passage-paragraph-text">`.
- **[PassagePanel.css](file:///d:/program/vstep/src/features/reading/components/PassagePanel.css)**: Reclaimed 34px horizontal width; applied book indentation (`text-indent: 2em; line-height: 1.8; text-align: justify; text-justify: inter-word;`). Styled `strong` (`font-weight: 700`).
- **[ReadingQuestionCard.tsx](file:///d:/program/vstep/src/features/reading/components/ReadingQuestionCard.tsx)** & **[ReadingQuestionCard.css](file:///d:/program/vstep/src/features/reading/components/ReadingQuestionCard.css)**: Tokenized `.rq-prompt` with `.rq-prompt strong { font-weight: 800; color: inherit; }`.
- **[hcmueReadingTest01.ts](file:///d:/program/vstep/src/features/reading/data/drills/hcmue/hcmueReadingTest01.ts)**: Enriched Passage 1 targets (`**a resonant hoot**`, `**precious charges**`, `**they**`, `**weary of**`) in lockstep across `content_paragraphs`, `clue_sentence`, and `question_text`.
- **Validation**: All 30 test suites (241 tests) and production build smoke test pass cleanly via `pnpm prepush`.

### Phase 2: Batch Gemini OCR Script (COMPLETED)

#### [scripts/enrich_reading_markdown.py](file:///d:/program/vstep/scripts/enrich_reading_markdown.py)
- **Batch Processing Scope**: Successfully enriched all 12 tests (48 passages, 480 questions), applying 465 atomic 3-point synchronized patches across HCMUE Drills 01–05 and ULIS Mock Tests 01–07.
  - HCMUE Drills 02–05 (`src/features/reading/data/drills/hcmue/`) from PDF `vstep-collection-20-mock-tests.pdf`
  - ULIS Mock Tests 01–07 (`src/features/reading/data/mockTests/`) from PDF `7-Vstep-Tests-B1-B2-C1-Full-Key.pdf`
- **Gemini Model Cascade Order** (per `scripts/assemble_hcmue_drills.mjs:L74-L80`):
  1. `gemini-3.8-flash`
  2. `gemini-3.7-flash`
  3. `gemini-3.6-flash`
  4. `gemini-3.5-flash`
  5. `gemini-3.5-flash-lite`
- **PyMuPDF Crop Extraction**: Automatically extracts page crops for each passage from the authentic PDF books.
- **Targeted Vision OCR Prompt**: Given the authentic scanned passage page and current TypeScript paragraphs, queries Gemini to return exact JSON list of bold/underlined target phrases with paragraph index and occurrence index.
- **Atomic 3-Point Synchronized Patcher**:
  - Updates `content_paragraphs` with `**target**`.
  - Updates matching `clue_sentence` strings in lockstep.
  - Updates matching `question_text` strings in lockstep.
- **Audit Logging**: Logs all enriched diffs to `scripts/.enrichment_log.json`.

## Verification Plan

### Automated Tests
- Run `pnpm test` (specifically `readingBank.test.ts`) to verify all 480 `paragraph.includes(q.clue_sentence)` assertions pass.
- Run `pnpm prepush` (`node scripts/prepush.mjs`) to ensure zero type errors, zero oxlint warnings, and successful production build.

### Manual Verification
- Split-screen layout: confirm 34px reclaimed across all lines with clean 2em indent.
- Visual inspection: verify bold styling on target words in passage and question cards.
- Clue highlighting: verify "Xem dẫn chứng" highlights clue sentences containing bold words without splitting tags.
- Dictionary lookup: test Tap-to-Translate on bold words on both mouse click and touch.
