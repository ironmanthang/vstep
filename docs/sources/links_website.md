# VSTEP Authentic Sourcing & Ingestion Registry

This registry tracks the verified status, origins, and ingestion targets for all authentic VSTEP learning content and examination materials.

---

## Full Mock Tests (180-Minute Authentic Exams)

- **Official 7-Test Master Suite (ULIS / VNU Standards)**:
  - **Repository**: [Google Drive Exam Suite](https://drive.google.com/drive/folders/1fMwGu23M8OSa-44q8Tos7uxnSLmjhGBY)
  - **Master Key Book**: `scripts/7-Vstep-Tests-B1-B2-C1-Full-Key.pdf` (Google Drive ID: `14TeTHWVJJfwS3L0ue2NthJfMObusWR7u`)
  - **Authentic Examination Audio**:
    - Test 1: `vstep-test-1.mp3` (ID: `1fuExNy339T0oQ4t4WHmSD0DrNcCuwgkv`, 23m 14s uncut) -> `public/audio/listening/vstep-test-1.mp3` [INGESTED]
      - Sliced Part 1 (08m 35s): `public/audio/listening/vstep-test-1-part1.mp3` [INGESTED]
      - Sliced Part 2 (07m 57s): `public/audio/listening/vstep-test-1-part2.mp3` [INGESTED]
      - Sliced Part 3 (06m 43s): `public/audio/listening/vstep-test-1-part3.mp3` [INGESTED]
      - Provenance Doc: [vstep_test_01.md](file:///d:/program/vstep/docs/sources/listening/vstep_test_01.md)
    - Test 2: `vstep-test-2.mp3` (ID: `1jNwkONs0oyHwGigZzYUQkmctkAentkUP`, 21m 32s uncut) -> `public/audio/listening/vstep-test-2.mp3` [INGESTED]
      - Sliced Part 1 (05m 35s): `public/audio/listening/vstep-test-2-part1.mp3` [INGESTED]
      - Sliced Part 2 (06m 10s): `public/audio/listening/vstep-test-2-part2.mp3` [INGESTED]
      - Sliced Part 3 (09m 47s): `public/audio/listening/vstep-test-2-part3.mp3` [INGESTED]
      - Provenance Doc: [vstep_test_02.md](file:///d:/program/vstep/docs/sources/listening/vstep_test_02.md)
    - Test 3: `vstep-test-3.mp3` (ID: `1JryyGxLhsPsfP5XwVAAfYtNV1fUjqblt`) -> `public/audio/listening/vstep-test-3.mp3` [INGESTED]
    - Tests 4-7: Ingested under `public/audio/listening/`
  - **Runtime Orchestrators**:
    - Full Mock Test 01: `src/data/mock-tests/mockTest01.ts` [INGESTED]
    - Listening Full Mock Tests: `src/features/listening/data/mockTests/` (`ALL_VSTEP_LISTENING_MOCK_TESTS`) [INGESTED]

- **PrepEdu & Auxiliary Institutional Portals**:
  - [PrepEdu VSTEP Exam Collection](https://prepedu.com/vi/blog/de-thi-mau-vstep) (Reference mirror)

---

## Listening Skill Practice Bank

- **Official 7 Full Mock Tests (35 Questions, Continuous Audio)**:
  - Directory: `src/features/listening/data/mockTests/` (`mockTest01.ts` to `mockTest07.ts`)
  - Continuous Master Audio: `public/audio/listening/testN/vstep-test-N.mp3` (Tests 1–7, NXB ĐHQGHN)
  - Canonical Export: `ALL_VSTEP_LISTENING_MOCK_TESTS` in `src/features/listening/data/index.ts`
  - Exclusive Home: Listening Studio Card 4 ("Mock Test: Sửa Đề & Luyện Sâu", 7-edition switcher)

- **Discrete Part Practice Banks (Isolated Skill Drills)**:
  - Repository Source: [HCMUE VSTEP Collection: 20 Mock Tests](https://drive.google.com/drive/folders/13xKgef4qGVEL3mt_Pagy1bmbq6mVZfjt) (NXB ĐH Sư Phạm TP.HCM, ISBN 978-604-947-764-5)
  - Part 1 (Announcements): `src/features/listening/data/part1Bank.ts` (`HCMUE_LISTENING_PART1_{01..05}`, 40 questions total across 5 editions, audio: `public/audio/listening/drills/hcmue{1..5}/hcmue-test-{1..5}-part1.mp3`) [INGESTED]
  - Part 2 (Conversations): `src/features/listening/data/part2Bank.ts` (`HCMUE_LISTENING_PART2_{01..05}`, 60 questions total across 15 conversations, audio: `public/audio/listening/drills/hcmue{1..5}/hcmue-test-{1..5}-part2.mp3`) [INGESTED]
  - Part 3 (Lectures): `src/features/listening/data/part3Bank.ts` (`HCMUE_LISTENING_PART3_{01..05}`, 75 questions total across 15 academic lectures, audio: `public/audio/listening/drills/hcmue{1..5}/hcmue-test-{1..5}-part3.mp3`) [INGESTED]
  - Provenance Documentation: [hcmue_collection_20.md](file:///d:/program/vstep/docs/sources/listening/hcmue_collection_20.md)


- **Strategy Guides & UI Tips**:
  - Short Announcements Strategy: [ZIM Guide](https://zim.vn/dang-short-announcementsinstructions-trong-vstep-listening)
  - Conversations Strategy: [ZIM Guide](https://zim.vn/unit-2-cac-dang-bai-nghe-vstep-listening-part-2-doan-hoi-thoai-phan-1)
  - Talks/Lectures Strategy: [ZIM Guide](https://zim.vn/dang-talks-lectures-trong-vstep-listening)

---

## Reading Skill Practice Bank

- **FME Authentic Exam Set 11 (4 Passages, 40 Questions)** `[INGESTED in src/features/reading/data/fmeDe11.ts]`:
  - Passage 1: [The Truth About Sugar-Free Diets](https://fme.edu.vn/vstep-reading-passage-1-de-11/)
  - Passage 2: [Climate Action in Everyday Life](https://fme.edu.vn/vstep-reading-passage-2-de-11/)
  - Passage 3: [The Impact of Tourism on Local Communities](https://fme.edu.vn/vstep-reading-passage-3-de-11/)
  - Passage 4: [Advances and Challenges in Medical Technology](https://fme.edu.vn/vstep-reading-passage-4-de-11/)

- **Strategy Guides & UI Tips**:
  - Skimming & Scanning: [ZIM Guide](https://zim.vn/ung-dung-skimming-scanning-vao-vstep-reading)
  - Text-Completion (Sentence Insertion): [ZIM Guide](https://zim.vn/dang-cau-hoi-text-completion-trong-vstep-reading)
  - Inference Questions: [ZIM Guide](https://zim.vn/dang-cau-hoi-inference-questions-trong-vstep-reading)

---

## Writing Skill Practice Bank

- **Task 1 Letters & Emails** `[INGESTED in src/features/writing/data/writingBank.ts]`:
  - Course Evaluation: [FME Task 1](https://fme.edu.vn/courses/de-thi-vstep-writing-task-1/lessons/de-thi-feedback-your-training-course/)
  - Job Application: [FME Task 1](https://fme.edu.vn/courses/de-thi-vstep-writing-task-1/lessons/de-thi-application-to-teach-swimming/)
  - Complaint & Refund: [FME Task 1](https://fme.edu.vn/courses/de-thi-vstep-writing-task-1/lessons/de-answer-a-customer-about-details-on-furniture/)

- **Task 2 Academic Essays** `[INGESTED in src/features/writing/data/writingBank.ts]`:
  - Social Media & Self-Esteem: [FME Task 2](https://fme.edu.vn/courses/de-thi-vstep-writing-task-2-nam-2025/lessons/de-thi-comparing-online-lives-hurts-self-esteem/)
  - Gamification & Learning: [FME Task 2](https://fme.edu.vn/courses/de-thi-vstep-writing-task-2-nam-2025/lessons/de-thi-gaming-and-learning-my-opinion/)

---

## Speaking Skill Practice Bank

- **Official 2026 Examination Sessions (May Dates)** `[INGESTED in src/features/speaking/data/speakingBank.ts]`:
  - May 30: Eating Breakfast, Hydration; Youth Exchange Presentation; Research Benefits.
  - May 24: Milk Tea, Dining Out; Weekend Leisure; Reading Habit Value.
  - May 20: Sadness, AI Tools; Wellness Workshop Speaker; Student Internships.
  - May 16: Reading Books, Mobile Phones; English Part-time Job; Studying Abroad.
  - May 05: Morning Routines, Transport; Movie Venue; Workplace Stress.
  - Sourced from: [vstep.edu.vn Topic Summary](https://vstep.edu.vn/tong-hop-chu-de-vstep-speaking-moi-nhat)