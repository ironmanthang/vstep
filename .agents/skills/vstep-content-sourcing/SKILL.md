---
name: vstep-content-sourcing
description: Guidelines, approved authentic exam sources, documentation conventions in docs/sources/, and content ingestion workflows for the 4 VSTEP skills. Activate whenever sourcing, verifying, importing, or adding exam questions, reading passages, listening audio/transcripts, writing prompts, or speaking tasks.
---

# VSTEP Content Sourcing & Verification Skill

## Objective
Ensure 100% of educational content, mock exams, and skill drills across Listening, Reading, Writing, and Speaking originate from authentic, verifiable human institutions (e.g. ULIS – ĐHQGHN, HNUE, HCMUE, Cambridge/CEFR B1–B2 standards). Purely synthesized or unverified AI-hallucinated questions are strictly prohibited (SRS vocabulary corpus excluded).

---

## Approved Source Repositories
1. **Primary VSTEP Testing Institutions (Vietnam)**:
   - **ULIS – ĐHQGHN**: Trung tâm Khảo thí, Trường ĐH Ngoại ngữ – ĐHQGHN (Đề thi mẫu & đề thi chính thức VSTEP B1-B2-C1).
   - **HNUE / HCMUE**: ĐH Sư phạm Hà Nội, ĐH Sư phạm TP.HCM (Giáo trình & ngân hàng đề thi chuẩn Bộ GD&ĐT).
   - **Regional Centers**: Trung tâm Khảo thí ĐH Huế, ĐH Thái Nguyên, ĐH Cần Thơ.
2. **Accredited Standardized CEFR B1–B2 Handbooks**:
   - Cambridge English B1 Preliminary / B2 First official test handbooks and specimen papers.
   - British Council LearnEnglish repository (B1–B2 level texts and announcements).
3. **Authentic Academic Listening & Reading Articles**:
   - BBC Learning English / VOA Learning English (announcements & short dialogues for Part 1/Part 2).
   - National Geographic, Smithsonian Magazine, Scientific American (for Part 3/4 academic passages).

---

## Folder Structure in `docs/sources/`
Maintain all source provenance, publications, links, and original transcripts in 4 dedicated skill subfolders plus an orchestration folder:

```text
docs/sources/
├── README.md                      # Master index & provenance policy
├── listening/
│   ├── README.md                  # Listening test registry & audio links
│   └── <source_id>.md             # Part 1, 2, 3 transcripts, questions, answer keys
├── reading/
│   ├── README.md                  # Reading passages registry
│   └── <source_id>.md             # Passages 1–4 authentic texts, word counts, questions
├── writing/
│   ├── README.md                  # Writing prompts registry
│   └── <source_id>.md             # Task 1 & Task 2 prompts, benchmark sample essays
├── speaking/
│   ├── README.md                  # Speaking cards registry
│   └── <source_id>.md             # Part 1, 2, 3 prompt cards, topic outlines, follow-ups
└── mock_tests/
    ├── README.md                  # Mock exam manifests index
    └── <mock_id>.md               # Manifest combining 4 skill sets into a 180-min exam
```

---

## Unified Mock Test Orchestration
- The 180-minute **Full Mock Test** (`/mock-test`) directly sequences the 4 skill modules:
  - **Listening**: 35 questions / 40 mins (`mode: 'exam'`)
  - **Reading**: 4 passages / 40 questions / 60 mins (`mode: 'exam'`)
  - **Writing**: Task 1 (Letter) + Task 2 (Essay) / 60 mins (`mode: 'exam'`)
  - **Speaking**: Part 1 (Social) + Part 2 (Solution) + Part 3 (Topic) / 12 mins (`mode: 'exam'`)
- Never create separate, duplicate mock test datasets. Practice mode and Exam mode share the exact same canonical content.

---

## Ingestion Checklist
- [ ] Source origin verified (Institution, examination session, book publication, or authentic link).
- [ ] Citation documented in `docs/sources/<skill>/<source_id>.md`.
- [ ] Exact question stems, options, and answer keys transcribed without altering original semantics.
- [ ] Transcripts with exact sequential millisecond timestamps (`start_ms`, `end_ms`).
- [ ] Zero runtime metadata baggage in TypeScript schemas.
- [ ] Unit tests added/updated (`*.test.ts`) to verify data integrity and scoring formulas.
