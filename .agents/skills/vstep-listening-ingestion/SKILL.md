---
name: vstep-listening-ingestion
description: End-to-end pipeline and out-of-band scripting architecture for slicing audio, dual-engine Whisper transcription (Groq Cloud / local faster-whisper), lightweight Gemini Flash bilingual enrichment, acoustic auditing, and converting raw audio + PDF questions into TypeScript test modules.
---

# VSTEP Listening Audio Ingestion Pipeline

## Pipeline Overview

- **Goal**: Ingest authentic VSTEP listening audio files (continuous mock tests or discrete drills) and produce high-precision bilingual transcripts with sub-second timestamps without token waste or quota exhaustion.
- **Stage 1 Acoustic Transcription**: Run `python scripts/transcribe_listening.py <audio_path>` using Groq Cloud Whisper (`whisper-large-v3-turbo`) in ~2.5s, with automatic fallback to local CPU `faster-whisper`.
- **Stage 2 Bilingual Enrichment**: Run `node scripts/enrich_listening.mjs <intermediate_json>` using pure text Gemini Flash (<500 tokens) to format dialogue turns and produce natural Vietnamese translations (`text_vi`).
- **Data Assembly**: Combine enriched transcript with authentic questions, options, and answer keys from official PDFs into a TypeScript `ListeningTest` module.
- **Verification**: Run `pnpm run verify:listening` for instant structural validation and `python scripts/master_listening_audit.py <filter>` for local acoustic similarity auditing.

---

## File Layout and Naming Conventions

### Audio Files
Audio files are stored under `public/audio/listening/` (gitignored, served directly in dev and via Cloudflare R2 redirect in production):
```
public/audio/listening/
  drills/
    hcmue1/
      hcmue-test-1-part1.mp3
      hcmue-test-1-part2.mp3
      hcmue-test-1-part3.mp3
    ...through hcmue5/
  test1/
    vstep-test-1.mp3
  ...through test7/
```

### audio_url Convention
Bank entries use paths relative to `public/`:
```typescript
audio_url: '/audio/listening/test1/vstep-test-1.mp3'
```

### Bank TypeScript Structure
```
src/features/listening/data/
  drills/
    hcmue/
      part1/hcmuePart1_01..05.ts
      part2/hcmuePart2_01..05.ts
      part3/hcmuePart3_01..05.ts
  mockTests/
    mockTest01..07.ts
    index.ts
  index.ts
```

---

## ffmpeg Slicing Command Template

When slicing continuous full test audio into individual parts using stream copy (instant, lossless):
```powershell
# Part 1: from start to boundary 1
ffmpeg -i "public/audio/listening/testN/vstep-test-N.mp3" -ss 00:00:00 -to 00:MM:SS -c copy "public/audio/listening/testN/vstep-test-N-part1.mp3"

# Part 2: from boundary 1 to boundary 2
ffmpeg -i "public/audio/listening/testN/vstep-test-N.mp3" -ss 00:MM:SS -to 00:MM:SS -c copy "public/audio/listening/testN/vstep-test-N-part2.mp3"

# Part 3: from boundary 2 to end
ffmpeg -i "public/audio/listening/testN/vstep-test-N.mp3" -ss 00:MM:SS -to 00:MM:SS -c copy "public/audio/listening/testN/vstep-test-N-part3.mp3"
```

---

## Ingestion Tooling Reference

### Asset Downloader (`scripts/download-assets.ps1`)
Downloads authentic audio tracks and PDF answer keys from Google Drive:
```powershell
# Download all assets
pwsh scripts/download-assets.ps1 -Target all

# Download specific subsets
pwsh scripts/download-assets.ps1 -Target hcmue
pwsh scripts/download-assets.ps1 -Target mock
pwsh scripts/download-assets.ps1 -Target pdf
```

### Stage 1: Audio Transcriber (`scripts/transcribe_listening.py`)
Extracts verbatim English text and sub-second timestamps:
```powershell
# Default: Uses Groq Cloud Whisper with local fallback
python scripts/transcribe_listening.py "public/audio/listening/drills/hcmue1/hcmue-test-1-part1.mp3"

# Force offline local faster-whisper execution
python scripts/transcribe_listening.py "public/audio/listening/drills/hcmue1/hcmue-test-1-part1.mp3" --local

# Specify output destination
python scripts/transcribe_listening.py <audio_path> --out scripts/my_transcript.intermediate.json
```

### Stage 2: Bilingual Enrichment (`scripts/enrich_listening.mjs`)
Adds Vietnamese translations and dialogue turns via text-only Gemini Flash:
```powershell
node scripts/enrich_listening.mjs "public/audio/listening/drills/hcmue1/hcmue-test-1-part1.intermediate.json"
```

### Structural Verification (`scripts/verify-all-listening.mjs`)
Verifies audio existence, ffprobe duration, monotonic timestamps, and clue coverage:
```powershell
pnpm run verify:listening
```

### Acoustic Audit Engine (`scripts/master_listening_audit.py`)
Performs cross-segment similarity analysis using local `faster-whisper`:
```powershell
# Audit a single test or drill (~15s)
python scripts/master_listening_audit.py hcmue_lis_p1_01
python scripts/master_listening_audit.py mock01

# Audit a specific exam part across all tests
python scripts/master_listening_audit.py --part 1
python scripts/master_listening_audit.py --part 2
python scripts/master_listening_audit.py --part 3

# Full repo-wide audit (all 22 tests, 168 segments - ~3-4 mins on CPU)
pnpm run audit:listening
```

### Dynamic Data Export (`scripts/export_all_listening.mjs`)
Exports all 22 listening test suites into `scripts/all_listening_data.json`:
```powershell
pnpm run export:listening
```

---

## Compute & Cost Efficiency Guidelines

- **Financial Cost**: All local checks (`verify:listening`, `master_listening_audit.py`, `vitest`) cost $0.00. Stage 1 Groq Whisper runs on free/sub-cent tiers (~$0.0007/min); Stage 2 Gemini Flash uses pure text tokens (<$0.0001 per run).
- **CPU Time Ranking**: Full acoustic audit on CPU (~3-4 min) > Local Whisper full audio (~40s) > Gemini Flash network calls (~5-10s) > Structural check (~1.5s) > Vitest in-memory (<1s) > Oxlint (<0.05s).
- **Inner Loop Rule**: When adding or editing a single test, do **NOT** run the full repo audit (`pnpm run audit:listening`). Follow the 20-second targeted verification recipe:
  - Run `pnpm run verify:listening` (~1.5s) for instant structural checks across all tests.
  - Run `python scripts/master_listening_audit.py <target_test_id>` (~15s) to audit only the changed test.
  - Run `pnpm test src/features/listening/listening.test.ts` (<1s) to verify answer keys.
- **Outer Loop**: Run full acoustic audit (`pnpm run audit:listening` or `pnpm prepush`) only before major releases or PR merges.

---

## End-to-End Recipe: Raw Audio + PDF Questions to Live Website Test

Transform authentic source material into an interactive test in 6 steps:

- **Step 1: Place Audio File**:
  - Save MP3 into `public/audio/listening/` (e.g. `drills/hcmue6/hcmue-test-6-part1.mp3`).
  - If slicing from a full exam, use `ffmpeg -c copy` stream copy.
- **Step 2: Run Stage 1 Transcription**:
  - Execute: `python scripts/transcribe_listening.py "public/audio/listening/.../test.mp3"`
  - Produces: `<audio>.intermediate.json` with sub-second timestamps (`start_ms`, `end_ms`).
- **Step 3: Run Stage 2 Bilingual Enrichment**:
  - Execute: `node scripts/enrich_listening.mjs "public/audio/listening/.../test.intermediate.json"`
  - Produces: `<audio>.enriched.json` with `text_vi` translations and speaker tags.
- **Step 4: Parse PDF & Map Question Clues**:
  - Extract questions, 4 options (`A`, `B`, `C`, `D`), official answer keys, and explanations from the authentic PDF.
  - In the transcript segments, add `"is_clue_for_question": "<question_id>"` pointing to the corresponding question.
- **Step 5: Assemble TypeScript Module**:
  - Create test file in `src/features/listening/data/` adhering to `ListeningTest` schema (see below).
- **Step 6: Register in Barrel File**:
  - Export from `part1Bank.ts`, `part2Bank.ts`, `part3Bank.ts`, or `mockTests/index.ts`.
  - The UI selector tabs (`[Đề 01]`, `[Đề 02]`, etc.) automatically discover the new test.

### TypeScript Module Template

```typescript
import type { ListeningTest } from '../../../../types/schemas';

export const HCMUE_LISTENING_PART1_06: ListeningTest = {
  id: 'hcmue_lis_p1_06',
  part: 1,
  title: 'HCMUE Part 1 - Đề 06: Thông Báo & Hướng Dẫn Ngắn (8 Câu)',
  audio_url: '/audio/listening/drills/hcmue6/hcmue-test-6-part1.mp3',
  duration_seconds: 495,
  difficulty: 'B2',
  transcript: [
    {
      start_ms: 0,
      end_ms: 120500,
      text_en: "Directions: In this section...",
      text_vi: "Hướng dẫn: Trong phần thi này...",
      is_clue_for_question: ""
    },
    {
      start_ms: 120500,
      end_ms: 165000,
      text_en: "Announcer: Question 1...\nMan: ...",
      text_vi: "Người thông báo: Câu 1...\nNam: ...",
      is_clue_for_question: "hcmue_q6_1"
    }
  ],
  questions: [
    {
      id: 'hcmue_q6_1',
      question_text: 'What is the purpose of the message?',
      options: [
        { key: 'A', text: 'To schedule a checkup' },
        { key: 'B', text: 'To cancel a booking' },
        { key: 'C', text: 'To confirm an appointment' },
        { key: 'D', text: 'To order medical supplies' }
      ],
      correct_key: 'C',
      explanation_vi: 'Người gọi nêu rõ: "I just wanted to confirm your appointment...".'
    }
  ]
};
```
