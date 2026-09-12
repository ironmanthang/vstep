# VSTEP Full Mock Test 02 (ULIS Composition)

## Metadata
- **Exam Title**: Đề Thi Thử Toàn Diện VSTEP Bậc 3–5 (Bộ 02)
- **Primary Source**: Trung tâm Khảo thí, Trường ĐH Ngoại ngữ – ĐHQGHN (ULIS)
- **Total Duration**: 180 Minutes (Sequential Continuous Simulation)
- **Mode**: `mode: 'exam'` (Strict timers, locked hints, locked transcripts, locked dictionary)

---

## Orchestrated Skill Modules
- **Listening (40 min)**: [vstep_listening_mock_02](../listening/README.md)
- **Reading (60 min)**: [ulis_reading_set2.md](../reading/ulis_reading_set2.md)
- **Writing (60 min)**: [ulis_writing_tests.md](../writing/ulis_writing_tests.md#test-02)
- **Speaking (12 min)**: [speakingBank.ts](../../../src/features/speaking/data/speakingBank.ts)

### Listening Module (40 min / 35 Questions)
- **Source**: "7 Vstep Tests B1-B2-C1 Full Key" (NXB ĐHQGHN, 2019), Test 2
- **Runtime Code**: `src/features/listening/data/mockTests/mockTest02.ts` (`vstep-test-2.mp3`)
- **Questions**: 35 multiple-choice questions (Part 1: 8, Part 2: 12, Part 3: 15).
- **Constraints**: Audio plays once continuously; seeking and playback speed toggles disabled.

### Reading Module (60 min / 40 Questions)
- **Source**: [`docs/sources/reading/ulis_reading_set2.md`](file:///d:/program/vstep/docs/sources/reading/ulis_reading_set2.md)
- **Runtime Code**: `src/features/reading/data/mockTests/ulisReadingTest02.ts`
- **Questions**: 40 multiple-choice questions across 4 passages.
- **Constraints**: 1-Tap Dictionary tooltip and paraphrase highlight helpers disabled.

### Writing Module (60 min / 2 Tasks)
- **Source**: [`docs/sources/writing/ulis_writing_tests.md#test-02`](file:///d:/program/vstep/docs/sources/writing/ulis_writing_tests.md)
- **Runtime Code**: `src/features/writing/data/mockTests/ulisWritingTest02.ts` (`ULIS_WRITING_TEST_02_TASK1`, `ULIS_WRITING_TEST_02_TASK2`)
- **Tasks**: Task 1 (Email: Favorite day of the week, $\ge 120$ words) + Task 2 (Essay: Online vs in-store shopping, $\ge 250$ words).
- **Constraints**: Outline suggestions, template phrase bank, and Vietlish AI assistant disabled during exam timer.

### Speaking Module (12 min / 3 Parts)
- **Source**: Authentic Exam Session (May 05)
- **Runtime Code**: `src/features/speaking/data/speakingBank.ts` (`SPEAKING_EXAM_MAY_05`)
- **Parts**: Part 1 (Social), Part 2 (Solution), Part 3 (Topic).
- **Constraints**: Strict preparation/recording countdowns with official MOET BEEP chimes.

---

## Scoring & Conversion
- Individual skill scores ($0.0 - 10.0$) are recorded.
- Final VSTEP Composite Score: $\frac{\text{Listening} + \text{Reading} + \text{Writing} + \text{Speaking}}{4}$, rounded to the nearest $0.5$ per MOET regulations.
