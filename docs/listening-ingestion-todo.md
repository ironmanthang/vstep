# Listening Ingestion Action Plan

## Phase: Audio Slicing (Completed)
- **Boundary Timestamps Identified**: Sourced from official audio recordings across all 7 tests.
- **FFmpeg Slicing Executed**: Generated 21 discrete part files (`vstep-test-{1..7}-part{1..3}.mp3`) with stream copy precision (`cmds.txt`).
- **Sub-Second Boundary Verification**: Audited audio durations and boundaries across all 21 tracks.

## Phase: Transcript Ingestion (Completed)
- **Pipeline Modernization**: Upgraded `scripts/ingest-listening.mjs` with model cascade (`gemini-3.8-flash` -> `3.7-flash` -> `3.6-flash` -> `3.5-flash-lite`), 429 quota exhaustion guards, and local monolith derivation.
- **Batch Ingestion Executed**: Processed all 21 files (`vstep-test-{1..7}-part{1..3}.json`).
- **Dataset Audit**: 21 / 21 datasets passed validation with exact segment counts (10 for Part 1, 5 for Parts 2 and 3), valid timestamps, speaker tags, Vietnamese translations, and question clue mappings.

## Phase: Bank Merge (Completed)
- **Merge Part 1**: Integrated transcripts, durations, and questions for Tests 1 through 7 into `src/features/listening/data/part1Bank.ts`.
- **Merge Part 2**: Integrated transcripts, durations, and questions for Tests 1 through 7 into `src/features/listening/data/part2Bank.ts`.
- **Merge Part 3**: Integrated transcripts, durations, and questions for Tests 1 through 7 into `src/features/listening/data/part3Bank.ts`.
- **Audio Path Migration**: Standardized all `audio_url` fields across all 21 parts to `/audio/listening/test{N}/vstep-test-{N}-part{P}.mp3`.
- **Mock Test Compositions**: Created `VSTEP_LISTENING_MOCK_TEST_01..07` and `ALL_VSTEP_LISTENING_MOCK_TESTS` in `src/features/listening/data/index.ts`.

## Phase: Question Population & OCR (Completed)
- **Question Extraction**: Extracted and verified questions Q1 through Q35, 4 choices each, and official keys from `scripts/7-Vstep-Tests-B1-B2-C1-Full-Key.pdf` across all 7 tests.
- **Explanations (`explanation_vi`)**: Attached educational Vietnamese answer explanations for all questions across all 7 tests.
- **Integrate Questions**: Populated all `questions[]` arrays in bank TypeScript files with full schema compliance.

## Phase: Validation & Verification (Completed)
- **Official Answer Key Testing**: Expanded `src/features/listening/listening.test.ts` to assert against official keys across all 7 tests (35 questions each, 245 total questions verified).
- **Audio & Transcript Integrity**: Automated test validating all 21 studio editions have distinct audio files and sequential, continuous timestamps.
- **Full CI Prepush Suite**: Validated with `pnpm prepush` (oxlint 0 errors/warnings, vitest 12/12 test files passed, tsc clean, vite build passed).

## Phase: Architecture Alignment (Completed)
- **Modular Mock Test Architecture**: Modularized all 7 authentic 35-question full exams into dedicated files under `src/features/listening/data/mockTests/` (`mockTest01.ts` to `mockTest07.ts`), exported via `index.ts` as `ALL_VSTEP_LISTENING_MOCK_TESTS`.
- **Studio Switcher Refactor**: Updated Card 4 ("Mock Test: Sửa Đề & Luyện Sâu") in `ListeningStudioPage.tsx` to render the 7-edition switcher (`[Đề 1 (35 câu)]` to `[Đề 7 (35 câu)]`) with continuous master audio `vstep-test-1.mp3` through `vstep-test-7.mp3`.
- **Discrete Part Banks Clean Separation & Standalone Drills**: Purged duplicate mock test slices from `part1Bank.ts`, `part2Bank.ts`, and `part3Bank.ts`. Ingested authentic standalone drills from HCMUE *VSTEP Collection: 20 Mock Tests* (NXB ĐHSP TP.HCM, ISBN 978-604-947-764-5) into `part1Bank.ts` (`hcmue_lis_p1_01`, 8 questions), `part2Bank.ts` (`hcmue_lis_p2_01`, 12 questions), and `part3Bank.ts` (`hcmue_lis_p3_01`, 15 questions), using isolated 256kbps stereo audio files (`public/audio/listening/drills/hcmue1/`), bilingual transcripts with sub-second timestamps, official keys, and educational Vietnamese explanations.

