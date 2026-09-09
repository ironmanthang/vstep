---
name: vstep-listening-ingestion
description: End-to-end pipeline and out-of-band scripting architecture for slicing audio, detecting boundaries, generating transcripts via Gemini API scripts in scripts/, and verifying listening exam banks with zero context token waste.
---

# VSTEP Listening Audio Ingestion Pipeline

## Pipeline Overview

**Goal**: Turn 7 monolith VSTEP listening test MP3s (~20MB each, ~23 min) into isolated Part 1/2/3 audio files with bilingual transcripts that users can practice with.

**Pipeline Steps** (strict order):
- **Step 1** — Human listens to monolith audio, finds 2 boundary timestamps per test (end of Part 1, end of Part 2)
- **Step 2** — AI generates ffmpeg slice commands from timestamp table
- **Step 3** — Human runs ffmpeg commands to produce 3 part files per test
- **Step 4** — Human runs `ingest-listening.mjs` per part file to generate transcript JSON via Gemini API
- **Step 5** — Human reviews JSON output (verifies timestamps, transcript accuracy, Vietnamese translations)
- **Step 6** — AI merges approved transcript JSON into bank `.ts` files
- **Step 7** — Human supplies questions from official answer key (OCR or manual), AI integrates them

---

## File Layout & Naming Conventions

### Audio Files
```
public/audio/listening/
  test1/
    vstep-test-1.mp3           # monolith (keep for full mock test mode)
    vstep-test-1-part1.mp3     # sliced Part 1
    vstep-test-1-part2.mp3     # sliced Part 2
    vstep-test-1-part3.mp3     # sliced Part 3
  test2/
    vstep-test-2.mp3
    vstep-test-2-part1.mp3
    ...
  ...through test7/
```

### audio_url Convention
Bank entries use path relative to `public/`:
```typescript
audio_url: '/audio/listening/test1/vstep-test-1-part1.mp3'
```

### Bank TypeScript Files
```
src/features/listening/data/
  part1Bank.ts    # All Part 1 entries (LISTENING_PART1_TEST_01..07)
  part2Bank.ts    # All Part 2 entries (LISTENING_PART2_TEST_01..07)
  part3Bank.ts    # All Part 3 entries (LISTENING_PART3_TEST_01..07)
  index.ts        # Re-exports + full mock test compositions
```

---

## ffmpeg Slice Command Template

Given a timestamp table from the human:
```
Test N: Part1 00:00–MM:SS, Part2 MM:SS–MM:SS, Part3 MM:SS–end
```

Generate commands using stream copy (no re-encoding, instant):
```powershell
# Part 1: from start to boundary1
ffmpeg -i "public/audio/listening/testN/vstep-test-N.mp3" -ss 00:00:00 -to 00:MM:SS -c copy "public/audio/listening/testN/vstep-test-N-part1.mp3"

# Part 2: from boundary1 to boundary2
ffmpeg -i "public/audio/listening/testN/vstep-test-N.mp3" -ss 00:MM:SS -to 00:MM:SS -c copy "public/audio/listening/testN/vstep-test-N-part2.mp3"

# Part 3: from boundary2 to end
ffmpeg -i "public/audio/listening/testN/vstep-test-N.mp3" -ss 00:MM:SS -c copy "public/audio/listening/testN/vstep-test-N-part3.mp3"
```

**Flags**:
- `-c copy` = stream copy, no re-encoding (fast, lossless)
- `-ss` before `-i` = fast seek (may lose a frame at boundary; acceptable for speech audio)
- `-to` = absolute end time in the source file
- Omit `-to` for the last part to capture until EOF

---

## Ingest Script Usage

```powershell
# Ingest all 21 files in batch
node scripts/ingest-listening.mjs --all

# Ingest all 3 parts for a single test
node scripts/ingest-listening.mjs --test 2

# Ingest a specific part file
node scripts/ingest-listening.mjs "public/audio/listening/testN/vstep-test-N-partP.mp3" --part P
```

- **Architecture**: Two-stage high-precision pipeline:
  - **Stage 1 (Ground-Truth Timing)**: Checks existing sliced `.txt` word transcript or derives sub-second word boundaries from monolith `vstep-test-N.txt` using slice cut offsets in `cmds.txt`. Falls back to `gemini-3.5-transcribe` if monolith is partial or unavailable. Zero time hallucination or drift.
  - **Stage 2 (Bilingual Translation & Diarization)**: Model fallback cascade (`gemini-3.8-flash` -> `gemini-3.7-flash` -> `gemini-3.6-flash` -> `gemini-3.5-flash-lite`). Formats speaker turns (`text_en`), generates natural Vietnamese translations (`text_vi`), and preserves exact timestamps.
  - **Quota Guard**: Immediately aborts with exit code `42` if `gemini-3.5-flash-lite` returns HTTP `429` / `RESOURCE_EXHAUSTED`.
- **API Key**: `VITE_GEMINI_API_KEY` or `GOOGLE_API_KEY` in `.env`
- **Output**: JSON dataset alongside audio (e.g., `vstep-test-N-partP.json`)

### Ingest Output Schema (transcript only, no questions)
```json
{
  "title": "Part 1 - Đề 01",
  "part": 1,
  "difficulty": "B1",
  "duration_seconds": 349,
  "audio_url": "/audio/listening/test1/vstep-test-1-part1.mp3",
  "transcript": [
    {
      "start_ms": 0,
      "end_ms": 52000,
      "text_en": "Announcer: ...\nMan: ...",
      "text_vi": "Người đọc: ...\nNam: ...",
      "speaker": "Announcer & Man",
      "is_clue_for_question": "q1_1"
    }
  ]
}
```

---

## Token Conservation & Out-of-Band Scripting Architecture

When performing token-heavy workflows (e.g. verbatim transcription, boundary detection, millisecond timestamp verification, or bulk JSON translation):

- **Zero Raw Data Bloat in Chat**: Never stream full audio buffers, multi-thousand-line word-level timestamp lists (`.txt`), or giant raw transcript JSONs directly into the conversational LLM context.
- **Utilize Existing Scripts in `scripts/` First**:
  - `scripts/detect-boundaries.mjs <audio_path>`: Uses `gemini-3.5-transcribe` with word-level granularity to write exact `[MM:SS.ms -> MM:SS.ms]` timestamps directly to a local `.txt` file next to the audio, consuming zero conversational tokens.
  - `scripts/ingest-listening.mjs <audio_path>`: Two-stage automated pipeline that derives word boundaries from monoliths or Gemini transcribe, followed by bilingual translation with Gemini Flash models.
- **Author New Task-Specific Scripts in `scripts/`**:
  - When encountering specialized verification, sanity-checking, or batch transformation needs, write a dedicated standalone `.mjs` script (e.g. `scripts/verify-timestamps.mjs` or `scripts/check-alignment.mjs`).
  - **Native Environment Loading**: Call `process.loadEnvFile()` natively (Node 20.6+) to load `VITE_GEMINI_API_KEY` or `GOOGLE_API_KEY` directly from `.env`.
  - **Most Generous Model (`gemini-3.5-flash-lite`)**: For translation, text structuring, formatting, and high-volume tasks, prioritize `gemini-3.5-flash-lite` because it offers the most generous free-tier rate limits and quota allowances among all Gemini models.
  - **Direct Tool & API Execution**: Execute Gemini model calls or system binaries (`ffmpeg`, `ffprobe`) out-of-band via Node.js fetch or child processes.
  - **Disk Outputs & Minimal Terminal Summaries**: Save heavy outputs directly to disk (`.txt`, `.json`), and print only concise tabular status reports or boundary comparison tables to stdout for the agent to inspect via `run_command`.

---

## Merge: JSON to Bank .ts

When integrating approved transcript JSONs into `src/features/listening/data/part{P}Bank.ts`:

- **Map fields**: `start_ms`, `end_ms`, `text_en`, `text_vi` transfer directly.
- **`speaker`**: Kept in dataset or folded into dialogue formatting within `text_en` (e.g., `Man: ...\nWoman: ...`).
- **`is_clue_for_question`**: Maps to question ID convention `q{testNum}_{questionNum}` (e.g., `q4_1` for Test 4 Question 1).
- **`questions[]`**: Sourced from the official answer key book (`7-Vstep-Tests-B1-B2-C1-Full-Key.pdf`) via OCR or manual entry.

### Question ID Convention
- Part 1: `q{T}_1` through `q{T}_8` (8 questions)
- Part 2: `q{T}_9` through `q{T}_20` (12 questions, 4 per conversation)
- Part 3: `q{T}_21` through `q{T}_35` (15 questions, 5 per talk)

Where `T` is the test number (1-7).

---

## Current Inventory (All 21 Files Complete)

| Test | Monolith Audio | Sliced Part 1 (JSON) | Sliced Part 2 (JSON) | Sliced Part 3 (JSON) | Bank .ts Status |
|:---|:---|:---|:---|:---|:---|
| 1 | `test1/vstep-test-1.mp3` (22MB) | Done (10 segs, 349s) | Done (5 segs, 463s) | Done (5 segs, 583s) | Transcript ready |
| 2 | `test2/vstep-test-2.mp3` (20MB) | Done (10 segs, 319s) | Done (5 segs, 388s) | Done (5 segs, 586s) | Transcript ready |
| 3 | `test3/vstep-test-3.mp3` (21MB) | Done (10 segs, 304s) | Done (5 segs, 493s) | Done (5 segs, 571s) | Transcript ready |
| 4 | `test4/vstep-test-4.mp3` (19MB) | Done (10 segs, 299s) | Done (5 segs, 428s) | Done (5 segs, 480s) | Transcript ready |
| 5 | `test5/vstep-test-5.mp3` (21MB) | Done (10 segs, 327s) | Done (5 segs, 490s) | Done (5 segs, 531s) | Transcript ready |
| 6 | `test6/vstep-test-6.mp3` (23MB) | Done (10 segs, 312s) | Done (5 segs, 512s) | Done (5 segs, 657s) | Transcript ready |
| 7 | `test7/vstep-test-7.mp3` (22MB) | Done (10 segs, 323s) | Done (5 segs, 507s) | Done (5 segs, 599s) | Transcript ready |

Total generated and validated: **21 / 21 datasets**.

---

## VSTEP Listening Structure Reference

- **Part 1** (B1): 8 short dialogues/announcements, 1 question each = 8 questions (Q1-Q8)
- **Part 2** (B2): 3 longer conversations, 4 questions each = 12 questions (Q9-Q20)
- **Part 3** (C1): 3 academic talks/lectures, 5 questions each = 15 questions (Q21-Q35)
- **Total**: 35 questions per test

---

## Next Steps

- **Bank Integration**: Populate `part1Bank.ts`, `part2Bank.ts`, and `part3Bank.ts` with all 21 generated transcript datasets and update `audio_url` to the `/audio/listening/test{N}/...` convention.
- **OCR Questions**: Extract questions, choices, and answer keys from `7-Vstep-Tests-B1-B2-C1-Full-Key.pdf` for Tests 3 to 7.
- **Mock Test Composition**: Assemble `VSTEP_LISTENING_MOCK_TEST_02..07` in `src/features/listening/data/index.ts`.
