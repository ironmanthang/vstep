# VSTEP Full Mock Test 01 (ULIS Composition)

## Metadata
- **Exam Title**: Đề Thi Thử Toàn Diện VSTEP Bậc 3–5 (Bộ 01)
- **Primary Source**: Trung tâm Khảo thí, Trường ĐH Ngoại ngữ – ĐHQGHN (ULIS)
- **Total Duration**: 180 Minutes (Sequential Continuous Simulation)
- **Mode**: `mode: 'exam'` (Strict timers, locked hints, locked transcripts, locked dictionary)

---

## Orchestrated Skill Modules
- **Listening (40 min)**: [ulis_listening_set1.md](../listening/ulis_listening_set1.md)
- **Reading (60 min)**: [ulis_reading_set1.md](../reading/ulis_reading_set1.md)
- **Writing (60 min)**: [ulis_writing_tests.md](../writing/ulis_writing_tests.md#test-01)
- **Speaking (12 min)**: [ulis_speaking_set1.md](../speaking/ulis_speaking_set1.md)

### Listening Module (40 min / 35 Questions)
- **Source**: [`docs/sources/listening/ulis_listening_set1.md`](file:///d:/program/vstep/docs/sources/listening/ulis_listening_set1.md)
- **Runtime Code**: `src/features/listening/data/mockTests/mockTest01.ts` (`vstep-test-1.mp3`)
- **Questions**: 35 multiple-choice questions (Part 1: 8, Part 2: 12, Part 3: 15).
- **Constraints**: Audio plays once continuously; seeking and playback speed toggles disabled.

### Reading Module (60 min / 40 Questions)
- **Source**: [`docs/sources/reading/ulis_reading_set1.md`](file:///d:/program/vstep/docs/sources/reading/ulis_reading_set1.md)
- **Runtime Code**: `src/features/reading/data/mockTests/ulisReadingTest01.ts`
- **Questions**: 40 multiple-choice questions across 4 passages.
- **Constraints**: 1-Tap Dictionary tooltip and paraphrase highlight helpers disabled.

### Writing Module (60 min / 2 Tasks)
- **Source**: [`docs/sources/writing/ulis_writing_tests.md#test-01`](file:///d:/program/vstep/docs/sources/writing/ulis_writing_tests.md)
- **Runtime Code**: `src/features/writing/data/mockTests/ulisWritingTest01.ts` (`ULIS_WRITING_TEST_01_TASK1`, `ULIS_WRITING_TEST_01_TASK2`)
- **Tasks**: Task 1 (Letter: Cancelling a meeting, $\ge 120$ words) + Task 2 (Essay: Big city life pros & cons, $\ge 250$ words).
- **Constraints**: Outline suggestions, template phrase bank, and Vietlish AI assistant disabled during exam timer.

### Speaking Module (12 min / 3 Parts)
- **Source**: [`docs/sources/speaking/ulis_speaking_set1.md`](file:///d:/program/vstep/docs/sources/speaking/ulis_speaking_set1.md)
- **Runtime Code**: `src/features/speaking/data/speakingBank.ts`
- **Parts**: Part 1 (Social), Part 2 (Solution), Part 3 (Topic).
- **Constraints**: Strict preparation/recording countdowns with official MOET BEEP chimes.

---

## Scoring & Conversion
- Individual skill scores ($0.0 - 10.0$) are recorded.
- Final VSTEP Composite Score: $\frac{\text{Listening} + \text{Reading} + \text{Writing} + \text{Speaking}}{4}$, rounded to the nearest $0.5$ per MOET regulations.
