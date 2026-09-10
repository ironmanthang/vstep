---
name: vstep-listening-ingestion
description: End-to-end pipeline and out-of-band scripting architecture for slicing audio, dual-engine Whisper transcription (Groq Cloud / local faster-whisper), lightweight Gemini Flash bilingual enrichment, and acoustic auditing.
---

# VSTEP Listening Audio Ingestion Pipeline

## Pipeline Overview

**Goal**: Ingest authentic VSTEP listening audio files (continuous mock tests or discrete drills) and produce high-precision bilingual transcripts with sub-second timestamps without token waste or quota exhaustion.

**Pipeline Steps**:
- **Step 1: Slice or Acquire Audio**: Acquire source MP3 audio files or slice continuous tests into Part 1/2/3 using `ffmpeg -c copy`.
- **Step 2: Stage 1 Acoustic Transcription**: Run `python scripts/transcribe_listening.py <audio_path>`.
  - Primary: Calls Groq Cloud Whisper (`whisper-large-v3-turbo`) using `GROQ_API_KEY` in `.env` (runs in ~2.5 seconds, zero local CPU load).
  - Fallback: Automatically falls back to local `faster-whisper` (CTranslate2 `int8` on CPU) when offline or when `--local` is passed.
  - Generates `<audio_name>.intermediate.json` with sub-second start/end timestamps and English text.
- **Step 3: Stage 2 Bilingual Enrichment**: Run `node scripts/enrich_listening.mjs <intermediate_json>`.
  - Uses candidate Gemini Flash models (`gemini-3.8-flash` down to `gemini-3.5-flash-lite`) with pure text prompts (<500 tokens).
  - Formats speaker dialogue turns (`Man: ...\nWoman: ...`) and produces natural Vietnamese translations (`text_vi`).
  - Output: `<audio_name>.enriched.json`.
- **Step 4: Integration into Bank Modules**: Merge approved transcript into `src/features/listening/data/` (e.g. `drills/` or `mockTests/`).
- **Step 5: Structural & Acoustic Verification**:
  - Run `pnpm run verify:listening` for instant structural and duration validation across all 22 tests.
  - Run `pnpm run audit:listening <filter>` for cross-segment acoustic validation via local Whisper.

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
ffmpeg -i "public/audio/listening/testN/vstep-test-N.mp3" -ss 00:MM:SS -c copy "public/audio/listening/testN/vstep-test-N-part3.mp3"
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
# Audit all 22 test suites
pnpm run audit:listening

# Audit a specific test or drill
python scripts/master_listening_audit.py hcmue_lis_p1_01
python scripts/master_listening_audit.py mock01
```

### Dynamic Data Export (`scripts/export_all_listening.mjs`)
Exports all 22 listening test suites into `scripts/all_listening_data.json`:
```powershell
pnpm run export:listening
```
