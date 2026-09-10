# VSTEP Listening Sources & Master Audio Registry

## Production Streaming Architecture
The VSTEP platform delivers listening audio using a high-performance edge-first architecture:

- **Production Streaming (`https://vstep.pages.dev/`)**:
  - Cloudflare Pages routes all `/audio/listening/*` requests via [`public/_redirects`](file:///d:/program/vstep/public/_redirects) using HTTP 302 redirects to Cloudflare R2 CDN (`https://pub-340e82df980d40da8d3710c3e37e34e5.r2.dev/:splat`).
  - Cloudflare R2 serves raw audio with native `HTTP 206 Partial Content`, `Accept-Ranges: bytes`, and explicit CORS (`Access-Control-Allow-Origin: *`, `Access-Control-Expose-Headers: ETag,Content-Range,Accept-Ranges,Content-Length`).
  - Resolves browser playback failures (`NotSupportedError`) by eliminating Google Drive `Cross-Origin-Resource-Policy: same-site` and `Content-Disposition: attachment` headers.
  - Provides zero egress fees ($0 bandwidth charges) and seamless `±5s` audio scrub seeking.
  - Keeps the Git repository lightweight (< 3 MB total), bypassing Cloudflare Pages 25 MiB asset upload limits (`hcmue-test-5-part3.mp3` is 27.57 MB).
- **Local Development (`http://localhost:5173`)**:
  - Audio files reside locally at [`public/audio/listening/`](file:///d:/program/vstep/public/audio/listening) (gitignored via `.gitignore`).
  - Vite dev server serves local audio files directly with zero network latency.
- **Asset Synchronization Script**:
  - [`scripts/download-assets.ps1`](file:///d:/program/vstep/scripts/download-assets.ps1): Unified utility to download mock test MP3s, HCMUE drill slices, and PDF answer keys (`-Target all|hcmue|mock|pdf`).

---

## Authentic Sourcing Provenance

### ULIS 7 VSTEP Tests Collection
- **Institution**: Đại học Quốc gia Hà Nội (ĐHQGHN)
- **Publication**: 7 Vstep Tests B1-B2-C1 (With Answers)
- **Publisher**: NXB Đại học Quốc gia Hà Nội (2019)
- **Master PDF Asset**: `scripts/7-Vstep-Tests-B1-B2-C1-Full-Key.pdf` (160 pages, complete exam papers, tapescripts, and keys)
- **Format**: 7 Continuous 35-Question Mock Exams (Part 1: 8Q, Part 2: 12Q, Part 3: 15Q)

### HCMUE VSTEP Collection 20 Mock Tests
- **Institution**: Trường Đại học Sư phạm TP. Hồ Chí Minh (HCMUE)
- **Publication**: VSTEP Collection: 20 Mock Tests
- **Publisher**: NXB Đại học Sư phạm TP.HCM (2017)
- **ISBN**: 978-604-947-764-5
- **Master PDF Asset**: `scripts/vstep-collection-20-mock-tests.pdf` (199 pages)
- **Google Drive Master Folder**: [HCMUE Audio Repository](https://drive.google.com/drive/folders/13xKgef4qGVEL3mt_Pagy1bmbq6mVZfjt)
- **Format**: 60 isolated, studio-recorded stereo MP3 files (20 tests x 3 parts) in 256kbps audio quality

---

## Active Audio Assets Registry (22 Production Tracks)

### Full Continuous Mock Tests (7 Exams, 245 Questions Total)

| Test ID | Route on vstep.pages.dev | Archive Google Drive ID | Production R2 Stream URL | Specs | Source Doc | Code Module |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `mock_test_01` | `/audio/listening/test1/vstep-test-1.mp3` | `1fuExNy339T0oQ4t4WHmSD0DrNcCuwgkv` | `https://pub-340e82df980d40da8d3710c3e37e34e5.r2.dev/test1/vstep-test-1.mp3` | 23m 14s (21.28 MB, 128kbps) | [vstep_test_01.md](file:///d:/program/vstep/docs/sources/listening/vstep_test_01.md) | [mockTest01.ts](file:///d:/program/vstep/src/features/listening/data/mockTests/mockTest01.ts) |
| `mock_test_02` | `/audio/listening/test2/vstep-test-2.mp3` | `1jNwkONs0oyHwGigZzYUQkmctkAentkUP` | `https://pub-340e82df980d40da8d3710c3e37e34e5.r2.dev/test2/vstep-test-2.mp3` | 21m 32s (19.73 MB, 128kbps) | [vstep_test_02.md](file:///d:/program/vstep/docs/sources/listening/vstep_test_02.md) | [mockTest02.ts](file:///d:/program/vstep/src/features/listening/data/mockTests/mockTest02.ts) |
| `mock_test_03` | `/audio/listening/test3/vstep-test-3.mp3` | `1JryyGxLhsPsfP5XwVAAfYtNV1fUjqblt` | `https://pub-340e82df980d40da8d3710c3e37e34e5.r2.dev/test3/vstep-test-3.mp3` | 22m 48s (20.89 MB, 128kbps) | [vstep_test_03.md](file:///d:/program/vstep/docs/sources/listening/vstep_test_03.md) | [mockTest03.ts](file:///d:/program/vstep/src/features/listening/data/mockTests/mockTest03.ts) |
| `mock_test_04` | `/audio/listening/test4/vstep-test-4.mp3` | `19l96eQ9gHex1SG6HEemB2kDCYIHKYRDS` | `https://pub-340e82df980d40da8d3710c3e37e34e5.r2.dev/test4/vstep-test-4.mp3` | 20m 07s (18.43 MB, 128kbps) | [vstep_test_04.md](file:///d:/program/vstep/docs/sources/listening/vstep_test_04.md) | [mockTest04.ts](file:///d:/program/vstep/src/features/listening/data/mockTests/mockTest04.ts) |
| `mock_test_05` | `/audio/listening/test5/vstep-test-5.mp3` | `1jqiV-oTJTx8eLvGjgQ42k-sRYGQFkkQs` | `https://pub-340e82df980d40da8d3710c3e37e34e5.r2.dev/test5/vstep-test-5.mp3` | 22m 28s (20.57 MB, 128kbps) | [vstep_test_05.md](file:///d:/program/vstep/docs/sources/listening/vstep_test_05.md) | [mockTest05.ts](file:///d:/program/vstep/src/features/listening/data/mockTests/mockTest05.ts) |
| `mock_test_06` | `/audio/listening/test6/vstep-test-6.mp3` | `1t0zmB3fVKFSwWr1lDskABUbJaxIrxZ71` | `https://pub-340e82df980d40da8d3710c3e37e34e5.r2.dev/test6/vstep-test-6.mp3` | 24m 41s (22.61 MB, 128kbps) | [vstep_test_06.md](file:///d:/program/vstep/docs/sources/listening/vstep_test_06.md) | [mockTest06.ts](file:///d:/program/vstep/src/features/listening/data/mockTests/mockTest06.ts) |
| `mock_test_07` | `/audio/listening/test7/vstep-test-7.mp3` | `1Qbh_37bO48s5K5lcHo_ZG-XDsS_C-nz9` | `https://pub-340e82df980d40da8d3710c3e37e34e5.r2.dev/test7/vstep-test-7.mp3` | 23m 48s (21.80 MB, 128kbps) | [vstep_test_07.md](file:///d:/program/vstep/docs/sources/listening/vstep_test_07.md) | [mockTest07.ts](file:///d:/program/vstep/src/features/listening/data/mockTests/mockTest07.ts) |

---

### HCMUE Discrete Drill Sets: Part 1 Announcements (5 Editions, 40 Questions Total)

| Drill ID | Route on vstep.pages.dev | Master Original File | Archive Google Drive ID | Production R2 Stream URL | Specs | Code Module |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `hcmue_lis_p1_01` | `/audio/listening/drills/hcmue1/hcmue-test-1-part1.mp3` | `T1-PART1.mp3` | `1YshyTAf-5p9wDP72IK-vFdMvgZ7zkowV` | `https://pub-340e82df980d40da8d3710c3e37e34e5.r2.dev/drills/hcmue1/hcmue-test-1-part1.mp3` | 08m 46s (16.07 MB, 256kbps) | [hcmuePart1_01.ts](file:///d:/program/vstep/src/features/listening/data/drills/hcmue/part1/hcmuePart1_01.ts) |
| `hcmue_lis_p1_02` | `/audio/listening/drills/hcmue2/hcmue-test-2-part1.mp3` | `T2-PART1.mp3` | `1PyAvQiKmKRIB3ytRMPktRKB04cOR2bQH` | `https://pub-340e82df980d40da8d3710c3e37e34e5.r2.dev/drills/hcmue2/hcmue-test-2-part1.mp3` | 06m 26s (11.79 MB, 256kbps) | [hcmuePart1_02.ts](file:///d:/program/vstep/src/features/listening/data/drills/hcmue/part1/hcmuePart1_02.ts) |
| `hcmue_lis_p1_03` | `/audio/listening/drills/hcmue3/hcmue-test-3-part1.mp3` | `T3-PART1.mp3` | `1CPbgz0QnmjoAmsVh-jkpH72xAbEvL_GH` | `https://pub-340e82df980d40da8d3710c3e37e34e5.r2.dev/drills/hcmue3/hcmue-test-3-part1.mp3` | 06m 56s (12.72 MB, 256kbps) | [hcmuePart1_03.ts](file:///d:/program/vstep/src/features/listening/data/drills/hcmue/part1/hcmuePart1_03.ts) |
| `hcmue_lis_p1_04` | `/audio/listening/drills/hcmue4/hcmue-test-4-part1.mp3` | `T4-PART1.mp3` | `1UPToxRFrRCk01jxsCWcRKd-qbKhmDHda` | `https://pub-340e82df980d40da8d3710c3e37e34e5.r2.dev/drills/hcmue4/hcmue-test-4-part1.mp3` | 06m 02s (11.08 MB, 256kbps) | [hcmuePart1_04.ts](file:///d:/program/vstep/src/features/listening/data/drills/hcmue/part1/hcmuePart1_04.ts) |
| `hcmue_lis_p1_05` | `/audio/listening/drills/hcmue5/hcmue-test-5-part1.mp3` | `T5-PART1.mp3` | `1KLqsTziZTAcco0k89P3RKThoUgY56_sg` | `https://pub-340e82df980d40da8d3710c3e37e34e5.r2.dev/drills/hcmue5/hcmue-test-5-part1.mp3` | 07m 05s (13.00 MB, 256kbps) | [hcmuePart1_05.ts](file:///d:/program/vstep/src/features/listening/data/drills/hcmue/part1/hcmuePart1_05.ts) |

---

### HCMUE Discrete Drill Sets: Part 2 Conversations (5 Editions, 60 Questions Total)

| Drill ID | Route on vstep.pages.dev | Master Original File | Archive Google Drive ID | Production R2 Stream URL | Specs | Code Module |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `hcmue_lis_p2_01` | `/audio/listening/drills/hcmue1/hcmue-test-1-part2.mp3` | `T1-PART2.mp3` | `1SbmhYrKc1B3zwNB03HQWs02R3gYpJ-3R` | `https://pub-340e82df980d40da8d3710c3e37e34e5.r2.dev/drills/hcmue1/hcmue-test-1-part2.mp3` | 05m 40s (10.40 MB, 256kbps) | [hcmuePart2_01.ts](file:///d:/program/vstep/src/features/listening/data/drills/hcmue/part2/hcmuePart2_01.ts) |
| `hcmue_lis_p2_02` | `/audio/listening/drills/hcmue2/hcmue-test-2-part2.mp3` | `T2-PART2.mp3` | `1UnZ_2ERI8pL-lxP2kWsMujbT6ek2VMiO` | `https://pub-340e82df980d40da8d3710c3e37e34e5.r2.dev/drills/hcmue2/hcmue-test-2-part2.mp3` | 06m 07s (11.23 MB, 256kbps) | [hcmuePart2_02.ts](file:///d:/program/vstep/src/features/listening/data/drills/hcmue/part2/hcmuePart2_02.ts) |
| `hcmue_lis_p2_03` | `/audio/listening/drills/hcmue3/hcmue-test-3-part2.mp3` | `T3-PART2.mp3` | `1Mu5msUTxCqM8m_6FX5y2ZqoLgws1HmOf` | `https://pub-340e82df980d40da8d3710c3e37e34e5.r2.dev/drills/hcmue3/hcmue-test-3-part2.mp3` | 06m 17s (11.53 MB, 256kbps) | [hcmuePart2_03.ts](file:///d:/program/vstep/src/features/listening/data/drills/hcmue/part2/hcmuePart2_03.ts) |
| `hcmue_lis_p2_04` | `/audio/listening/drills/hcmue4/hcmue-test-4-part2.mp3` | `T4-PART2.mp3` | `1JnFxylLsDIyJWm8lUuoboVCB4D0_lzFG` | `https://pub-340e82df980d40da8d3710c3e37e34e5.r2.dev/drills/hcmue4/hcmue-test-4-part2.mp3` | 06m 16s (11.51 MB, 256kbps) | [hcmuePart2_04.ts](file:///d:/program/vstep/src/features/listening/data/drills/hcmue/part2/hcmuePart2_04.ts) |
| `hcmue_lis_p2_05` | `/audio/listening/drills/hcmue5/hcmue-test-5-part2.mp3` | `T5-PART2.mp3` | `1h6R5MREeKMBdnTjQBKFzSKge2WKcQNpG` | `https://pub-340e82df980d40da8d3710c3e37e34e5.r2.dev/drills/hcmue5/hcmue-test-5-part2.mp3` | 06m 14s (11.45 MB, 256kbps) | [hcmuePart2_05.ts](file:///d:/program/vstep/src/features/listening/data/drills/hcmue/part2/hcmuePart2_05.ts) |

---

### HCMUE Discrete Drill Sets: Part 3 Academic Talks & Lectures (5 Editions, 75 Questions Total)

| Drill ID | Route on vstep.pages.dev | Master Original File | Archive Google Drive ID | Production R2 Stream URL | Specs | Code Module |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `hcmue_lis_p3_01` | `/audio/listening/drills/hcmue1/hcmue-test-1-part3.mp3` | `T1-PART3.mp3` | `1QJRZ_0WSLJAc3HrD9lV1o9nrwnrWF9oJ` | `https://pub-340e82df980d40da8d3710c3e37e34e5.r2.dev/drills/hcmue1/hcmue-test-1-part3.mp3` | 12m 08s (22.25 MB, 256kbps) | [hcmuePart3_01.ts](file:///d:/program/vstep/src/features/listening/data/drills/hcmue/part3/hcmuePart3_01.ts) |
| `hcmue_lis_p3_02` | `/audio/listening/drills/hcmue2/hcmue-test-2-part3.mp3` | `T2-PART3.mp3` | `1XoQw4c7dXv65g4YoUSx9fRkmLiK9CNTc` | `https://pub-340e82df980d40da8d3710c3e37e34e5.r2.dev/drills/hcmue2/hcmue-test-2-part3.mp3` | 13m 48s (25.29 MB, 256kbps) | [hcmuePart3_02.ts](file:///d:/program/vstep/src/features/listening/data/drills/hcmue/part3/hcmuePart3_02.ts) |
| `hcmue_lis_p3_03` | `/audio/listening/drills/hcmue3/hcmue-test-3-part3.mp3` | `T3-PART3.mp3` | `1FHBjxIiXimBHajcJManonnABjz2xm8DN` | `https://pub-340e82df980d40da8d3710c3e37e34e5.r2.dev/drills/hcmue3/hcmue-test-3-part3.mp3` | 13m 37s (24.94 MB, 256kbps) | [hcmuePart3_03.ts](file:///d:/program/vstep/src/features/listening/data/drills/hcmue/part3/hcmuePart3_03.ts) |
| `hcmue_lis_p3_04` | `/audio/listening/drills/hcmue4/hcmue-test-4-part3.mp3` | `T4-PART3.mp3` | `1YTl0SVUKPurK7CuXZgINhVQFIKOmhAk-` | `https://pub-340e82df980d40da8d3710c3e37e34e5.r2.dev/drills/hcmue4/hcmue-test-4-part3.mp3` | 14m 14s (26.08 MB, 256kbps) | [hcmuePart3_04.ts](file:///d:/program/vstep/src/features/listening/data/drills/hcmue/part3/hcmuePart3_04.ts) |
| `hcmue_lis_p3_05` | `/audio/listening/drills/hcmue5/hcmue-test-5-part3.mp3` | `T5-PART3.mp3` | `12Kr5BrKl9ER3uSnZurK5tanQmZ2LpYJg` | `https://pub-340e82df980d40da8d3710c3e37e34e5.r2.dev/drills/hcmue5/hcmue-test-5-part3.mp3` | 15m 03s (27.57 MB, 256kbps) | [hcmuePart3_05.ts](file:///d:/program/vstep/src/features/listening/data/drills/hcmue/part3/hcmuePart3_05.ts) |

---

## Direct Code & Routing Invariants
- **Dynamic Route Dispatching**: All components (`ListeningRunner.tsx`, `CustomAudioPlayer.tsx`, `useAudioPlayer.ts`) load the audio file path specified in `test.audio_url`.
- **Zero Schema Pollution**: TypeScript data models store clean client-side routes (e.g., `audio_url: '/audio/listening/drills/hcmue1/hcmue-test-1-part1.mp3'`). Neither Google Drive URLs nor third-party metadata are hardcoded inside TypeScript data arrays.
- **Production Resolution**: On production, the request is transparently handled by the Cloudflare Pages edge redirect engine via [`public/_redirects`](file:///d:/program/vstep/public/_redirects).

---

## Acoustic Validation & Timestamp Synchronization
- **Acoustic Speech Alignment (`scripts/master_listening_audit.py`)**: End-to-end audio-to-transcript verification engine using local `faster-whisper` (CTranslate2) and cross-segment similarity matrices. Validates 100% of the 168 dialogue and lecture segments across all 22 listening tests directly against physical MP3 waveforms.
- **Structural Integrity Suite (`scripts/verify-all-listening.mjs`)**: Verifies 100% of all 22 listening tests against physical MP3 audio files. Validates duration limits, sequential non-overlapping timestamps (`start_ms`, `end_ms`), question clue mappings, and Part 1 example-trap guards (`pnpm run verify:listening`).
- **Modern Two-Stage Ingestion Pipeline**:
  - **Stage 1 Transcription (`scripts/transcribe_listening.py`)**: Dual-engine audio transcriber prioritizing Groq Cloud Whisper (`whisper-large-v3-turbo`) with automatic offline fallback to local `faster-whisper`.
  - **Stage 2 Bilingual Enrichment (`scripts/enrich_listening.mjs`)**: Lightweight text-only Gemini Flash pipeline for Vietnamese translation and speaker attribution.