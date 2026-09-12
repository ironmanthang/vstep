# DANH SÁCH CÔNG VIỆC THỰC THI (ACTIONABLE TODO)

Tài liệu này là **Task Checklist / Backlog** chi tiết phục vụ cho việc thực thi code hàng ngày. Chiến lược giai đoạn và milestones xem tại [roadmap.md](file:///d:/program/vstep/docs/roadmap.md).

## Quy ước Ký hiệu Trạng thái
- `- [ ]`: Chưa bắt đầu (Pending)
- `- [/]`: Đang thực hiện (In Progress)
- `- [x]`: Đã hoàn thành (Done)
- `- [!]`: Bị nghẽn / Cần làm rõ (Blocked)

## SPRINT: KHUNG NỀN TẢNG & FLASHCARD SRS (FOUNDATION & CURATED SRS)

### Khung Nền tảng & App Shell
- [x] App Shell & Design System: Dự án Vite + React 19 + TypeScript, CSS tokens Dark/Light (Campfire warm amber & obsidian), điều hướng đa trang (Home, Skills, Flashcard, Mock Test, Settings, Profile), Layout responsive (Desktop Sidebar / Mobile Bottom Nav), nút Đăng xuất sticky mobile header, và ConfirmModal 2 bước dùng chung.
- [x] Xác thực & Đồng bộ Đám mây: Login-First Gate (`<ProtectedRoute>`), trang `/login` chuyên biệt Google OAuth, migration Supabase normalized tables (`user_profiles`, `user_study_logs`, `user_mock_test_results`, `user_flashcard_reviews`, `user_daily_stats`), trigger PostgreSQL `on_auth_user_created`, `profileSync.ts` đồng bộ hồ sơ/streak/điểm thi, tầng cô lập dữ liệu đa tài khoản theo User ID (`userStorage.ts`), dọn dẹp sạch sẽ `localStorage` khi đăng xuất, và Client optimistic UI buffer.
- [x] Master AI Gateway: Tích hợp OpenRouter, Ollama Cloud và Google AI Studio với Key Pool rotation, Settings UI chẩn đoán độ trễ Ping (ms) & Dev override, tính năng Test Connection health check, cô lập hạn mức 5 lượt/ngày theo từng tài khoản (`vstep_${userId}_ai_daily_quota_v1`), và `AIServiceAdapter` xử lý fallback.
- [x] Cấu hình PWA: Web App Manifest (Standalone Mode), Service Worker cache tĩnh App Shell/font/assets, và chuẩn hóa thứ tự kỹ năng toàn app (Listening → Reading → Writing → Speaking).

### Module Flashcard SRS Cốt lõi (Curated VSTEP SRS)
- [x] Thuật toán FSRS v6 & Đồng bộ Đám mây: Spaced Repetition nhị phân (Sai / Đúng), hàng đợi 3 cấp ưu tiên không giới hạn trần cứng (re-learning → due reviews → unseen new cards), trần 365 ngày, Supabase Cloud Sync (`user_flashcard_reviews` & `user_daily_stats`), lưu trữ cục bộ phân vùng theo `userId` (`vstep_${userId}_flashcard_deck_v3`), dọn sạch dữ liệu khi đăng xuất, cơ chế Uniform Cloud Projection triệt tiêu lỗi ghép thẻ Frankenstein, ConfirmModal đặt lại deck xóa sạch cloud data đồng bộ đa thiết bị, và hàng rào ngoại tuyến bảo toàn tiến độ.
- [x] Trải nghiệm Mobile Flashcard & Cử chỉ: Thẻ Above-the-Fold (thanh trạng thái 1 dòng, thu gọn header khi ôn tập), cử chỉ kéo vuốt tỷ lệ thực (Proportional Touch Swipe) với tem phản hồi ✗ Sai / ✓ Đúng và ngưỡng nhả 90px, triệt tiêu lỗi lộ nghĩa (Spoiled Definition Glitch), mặt sau căn giữa quang học, phím tắt laptop (`←` / `→` / `Space` / `A` / `P`), đồng bộ `theme-color` `#141210` Dark Obsidian, và gradient mask thanh chọn chủ đề.
- [x] Thông báo PWA & App Badging: Tự động đồng bộ số thẻ cần ôn lên huy hiệu icon (`navigator.setAppBadge`), hẹn giờ nhắc nhở hàng ngày (`srsReminderService.ts`), Service Worker custom extension (`sw-custom.js`), và `ReminderSettingsModal` responsive.
- [ ] Tăng số lượng từ lên 3000, lấy từ các đề trong 4 skills
  - [x] Đợt 1 (Listening): Mở rộng từ 1.500 lên 2.000 từ (+500 từ) từ 7 Authentic Mock Tests & 15 HCMUE Drills (`scripts/mine_listening_vocab.mjs`)
  - [ ] Đợt 2 (Reading): Mở rộng từ 2.000 lên 2.500 từ (+500 từ) từ ngân hàng bài đọc VSTEP Reading
  - [ ] Đợt 3 (Writing & Speaking): Mở rộng từ 2.500 lên 3.000 từ (+500 từ)

### Kiểm thử & Tối ưu Nền tảng (DoD Verification)
- [x] Hạ tầng Kiểm thử & Triển khai: Unit tests Vitest, Pre-push pipeline tự động (`scripts/prepush.mjs`), CI/CD GitHub Actions (`.github/workflows/ci.yml`), kịch bản tự động hóa database migration (`scripts/migrate.mjs`), và triển khai Production Cloudflare Pages (`vstep.pages.dev`).


## SPRINT: LUYỆN NGHE CHỦ ĐỘNG (ASSISTED LISTENING STUDIO)

### Unified Listening Runner & Smart Player
- [x] Unified Listening Runner & Smart Audio Player: Runner 2 chế độ (`mode: 'practice' | 'exam'`), Question Palette 35 câu 3 Part, Mock Test 01 chữa đề sâu, Custom Audio Player Sticky (tua ±5s, 5 tốc độ 0.5x–2.0x, scrub bar, phím tắt `Space` / `←` / `→` kèm input guard), 21 audio tracks thi thật chuẩn ĐHQGHN, pipeline transcription 2 giai đoạn (Groq Whisper / faster-whisper + Gemini Flash bilingual enrichment), phân phối streaming Cloudflare R2 qua HTTP 206 Partial Content, và danh mục nguồn gốc `docs/sources/listening/README.md`.

### Ngân hàng Đề Luyện Tập Đa Dạng & Công cụ Xử lý
- [x] Ngân hàng Đề thi & Tái cấu trúc Scripts: 15 đề rời Part 1–3 từ NXB ĐH Sư Phạm TP.HCM (HCMUE 01–05, 175 câu) kèm giải thích chi tiết, 7 đề Full Mock Test 35 câu từ sách "7 VSTEP Tests" (`mockTest01.ts` – `mockTest07.ts`), hiện đại hóa thư viện `scripts/` (loại bỏ 13.000 dòng mã thừa, `transcribe_listening.py` Groq/faster-whisper, `enrich_listening.mjs`, dynamic discovery scripts, và `download-assets.ps1`).


### Tinh giản Luồng Luyện Nghe & Ghi chú Nháp
- [x] Trải nghiệm Câu hỏi Đơn trang & Kiểm định Âm học: Tinh giản luồng câu hỏi loại bỏ tab-switcher, `PassageGroupHeader` phân đoạn hội thoại/bài giảng, nút nhảy audio inline `▶ [mm:ss]`, Scratchpad ghi chú nháp auto-expanding, Inline Collapsible Transcript song ngữ gạch chân Key Clues, kiểm định tự động 22 bộ đề (`pnpm run verify:listening`), rà soát âm học AI 168 phân đoạn (`master_listening_audit.py`) khắc phục 100% sai lệch mốc thời gian, và luồng Làm lại bài tích hợp xóa submission trên Supabase.


## SPRINT: NGÂN HÀNG ĐỀ THI THẬT & MOCK TEST (AUTHENTIC EXAM BANKS)
- [x] Ngân hàng Đề Thi Thật 4 Kỹ Năng: Trích xuất và cấu trúc hóa Đề thi Đọc Set 11 (FME Sourced: 4 bài đọc, 40 câu hỏi) vào `fmeDe11.ts`, 5 kỳ thi Nói tháng 5 vào `speakingBank.ts`, đề Viết Task 1–2 kèm bài mẫu B2/C1 vào `writingBank.ts`, Mock Test 01 liên hoàn 180 phút tại `mockTest01.ts`, và tách biệt kiến trúc Card 4 Mock Test 7 đề.


## SPRINT: LUYỆN ĐỌC CÓ HỖ TRỢ (ASSISTED READING STUDIO)

### Kiến trúc Unified Reading Runner & Giao diện Split-Pane
- [x] Xây dựng `ReadingRunner` hỗ trợ 2 chế độ: `mode: 'practice'` (bật tra từ/dẫn chứng/ghi chú nháp/15p passage timer) và `mode: 'exam'` (60 phút countdown tự nộp, giao diện chuẩn phòng thi)
- [x] Bố cục Split-Pane chia đôi màn hình: Bài đọc bên trái cuộn độc lập, bảng 40 câu hỏi ở giữa, bảng Question Palette sticky bên phải; trên mobile (<768px) hỗ trợ tab toggle ghi nhớ vị trí cuộn
- [x] Tùy chỉnh hiển thị: Chỉnh cỡ chữ (14px–22px), giãn dòng (1.5x, 1.8x, 2.0x), và 3 chế độ nền (Warm Sepia, Obsidian Dark, Cream Light) lưu trữ theo tài khoản

### Tra từ Nhanh (1-Tap Dictionary Tooltip)
- [x] Nhấn/chạm đúp vào từ tiếng Anh trong bài đọc hiển thị tooltip tra nghĩa tiếng Việt tức thì
- [x] Hỗ trợ tra từ 2 tầng: Tầng 1 offline tra tức thì 2.000 từ VSTEP Core (`dictionaryVi.ts`) + Tầng 2 fallback qua MyMemory API hiển thị nghĩa tiếng Việt (không ghi rác vào hàng đợi SRS)

### Phân loại Dạng Câu hỏi, Highlight Dẫn chứng & Cấu trúc Dữ liệu
- [x] Phân loại các dạng câu hỏi đọc hiểu: Main Idea, Vocab in Context, Factual Details, Negative Fact, Inference, Author Attitude, Sentence Insertion (`[A]-[D]`)
- [x] Tự động highlight câu văn gốc chứa dẫn chứng (`clue_sentence`) trong bài đọc với hiệu ứng pulse và tự cuộn đến vị trí dẫn chứng
- [x] Bảng phân tích hiện tượng Paraphrase giữa bài đọc và đáp án đúng
- [x] Xóa sạch dữ liệu FME orphaned scrape cũ (`readingBank.ts`), liên kết lại `mockTest01.ts` với đề thi chuẩn ULIS Test 1 (`ULIS_READING_TEST_01`)
- [x] Tạo tài liệu hướng dẫn kỹ năng trích xuất đề đọc chuẩn hóa: `.agents/skills/vstep-reading-ingestion/SKILL.md`

### Ngân hàng Đề Luyện Đọc Toàn Diện (Lộ trình các phiên tiếp theo)
- [x] Đề 1 (ULIS Test 1): 4 bài đọc, 40 câu hỏi từ sách "7 Vstep Tests" (NXB ĐHQGHN, 2019) kèm 100% dẫn chứng verbatim chuẩn xác (`ulisReadingTest01.ts`)
- [x] Đề 2 (ULIS Test 2): PDF trang 24–31, đáp án trang 136 kèm 100% dẫn chứng verbatim chuẩn xác (`ulisReadingTest02.ts`)
- [x] Đề 3 (ULIS Test 3): PDF trang 36–43, đáp án trang 140 kèm 100% dẫn chứng verbatim chuẩn xác (`ulisReadingTest03.ts`)
- [x] Đề 4 (ULIS Test 4): PDF trang 50–55, đáp án trang 145 kèm 100% dẫn chứng verbatim chuẩn xác (`ulisReadingTest04.ts`)
- [x] Đề 5 (ULIS Test 5): PDF trang 62–68, đáp án trang 149 kèm 100% dẫn chứng verbatim chuẩn xác (`ulisReadingTest05.ts`)
- [x] Đề 6 (ULIS Test 6): PDF trang 75–82, đáp án trang 154 kèm 100% dẫn chứng verbatim chuẩn xác (`ulisReadingTest06.ts`)
- [ ] Đề 7 (ULIS Test 7): PDF trang 92–99, đáp án trang 160
- [ ] 5 Đề Luyện Tập HCMUE (Drills 01–05): Trích xuất từ sách "20 Mock Tests" (NXB ĐH Sư Phạm TP.HCM) đồng bộ với 15 bài Listening Drills
- [x] Run audit codebase check sau khi hoàn thành kỹ năng Đọc (Reading)

## SPRINT: LUYỆN VIẾT VỚI GIÀN GIÁO (SCAFFOLDED WRITING & VIETLISH AI)

### Kiến trúc Unified Writing Runner & Trình soạn thảo
- [ ] Xây dựng `WritingRunner` hỗ trợ 2 chế độ: `mode: 'practice'` (bật outline/mẫu câu/chấm AI tức thì) và `mode: 'exam'` (khóa gợi ý, auto-save, thu bài khi hết giờ)
- [ ] Trình soạn thảo 2 task (Task 1: Thư 120 từ / Task 2: Luận 250 từ) kèm bộ đếm từ thời gian thực
- [ ] Cơ chế Auto-save tự động lưu bản nháp mỗi 5 giây vào LocalStorage

### Giàn giáo Hỗ trợ & Thư viện Mẫu câu
- [ ] Outline Generator: Gợi ý dàn ý 3 phần cho Task 1 và 2 hướng lập luận cho Task 2
- [ ] Thư viện Sentence Starters phân theo mục đích mở bài, chuyển đoạn, kết bài
- [ ] Kho bài mẫu Annotated 5 màu kèm chế độ so sánh song song Side-by-Side

### Pipeline Chấm Writing 2 Tầng & Vietlish Engine
- [ ] Tầng 1: Local rule-based pre-filter (<50ms, đếm từ, phát hiện lỗi bề mặt)
- [ ] Tầng 2: LLM Evaluator (`gemini-3.5-flash-lite`, 500 RPD) chấm 4 tiêu chí MOET theo Strict JSON Schema (xem [writing_pipeline.md](file:///d:/program/vstep/docs/architecture/writing_pipeline.md))
- [ ] Vietlish Engine nhận diện 3 nhóm lỗi tư duy tiếng Việt (Dịch thô, Thiếu chủ ngữ, Sai collocation)
- [ ] Giao diện bôi màu nhận xét: Đỏ (Ngữ pháp), Tím (Vietlish), Vàng (Từ vựng), Xanh lá (Khen ngợi)
- [ ] Sinh bài mẫu viết lại (Revised Essay) nâng band từ ý tưởng gốc của học viên
- [ ] Unit Test bộ đếm từ và kiểm tra tỷ lệ n-gram sao chép đề bài
- [ ] Unit Test bộ parser phản hồi AI Strict JSON Schema
- [ ] Run audit codebase check sau khi hoàn thành kỹ năng Viết (Writing)

## SPRINT: LUYỆN NÓI TƯƠNG TÁC (INTERACTIVE SPEAKING STUDIO)

### Kiến trúc Unified Speaking Runner & Phòng thu BEEP
- [ ] Xây dựng `SpeakingRunner` hỗ trợ 2 chế độ: `mode: 'practice'` (luyện từng part, xem gợi ý P-E-E-R, chấm tức thì) và `mode: 'exam'` (liên tục 3 Part 12 phút, chuẩn phòng thi)
- [ ] Đồng hồ đếm ngược thời gian thực: Chuẩn bị (1p) và Ghi âm (2p) theo từng Part
- [ ] Tích hợp âm hiệu BEEP bắt đầu và kết thúc chuẩn phòng máy Bộ GD&ĐT

### Thu âm Trình duyệt & Web Audio Acoustic Metrics
- [ ] Ghi âm trình duyệt qua `MediaRecorder`, trực quan hóa sóng âm thời gian thực, nén file `audio/webm`
- [ ] Client Acoustic Metrics qua Web Audio API: Đo WPM (chuẩn 110–150 WPM), đo thời lượng nói và khoảng lặng (>2s)

### Pipeline Chấm Speaking qua Gemini 3.5 Flash Lite Native Audio
- [ ] Single-shot Multimodal Evaluation: Gửi trực tiếp audio blob lên `gemini-3.5-flash-lite` Native Audio API để chấm 5 tiêu chí MOET và phát hiện lỗi âm vị (xem [speaking_pipeline.md](file:///d:/program/vstep/docs/architecture/speaking_pipeline.md))
- [ ] Xuất Radar Chart 5 trục trực quan hóa điểm mạnh/yếu
- [ ] Phonetic Highlighting: Bôi đỏ từ phát âm sai / thiếu phụ âm cuối kèm phát âm mẫu IPA
- [ ] Gợi ý dàn ý mở rộng P-E-E-R và bài nói mẫu nâng band B2/C1
- [ ] Tối ưu Lazy loading audio processor và module Speaking
- [ ] Run audit codebase check sau khi hoàn thành kỹ năng Nói (Speaking)

## SPRINT: THI THỬ THỰC CHIẾN (FULL MOCK TEST & EXAM ORCHESTRATOR)

### Mock Exam Orchestrator Chuẩn Phòng máy Bộ GD&ĐT
- [ ] Xây dựng Mock Exam Orchestrator điều phối liên hoàn 4 Skill Runner ở `mode: 'exam'` (Listening 40p → Reading 60p → Writing 60p → Speaking 12p)
- [ ] Khóa toàn bộ công cụ hỗ trợ (tra từ, tua audio, xem gợi ý dàn ý)
- [ ] Question Palette tổng hợp đánh dấu trạng thái (Đã làm, Chưa làm, Gắn cờ Flag)
- [ ] Đếm ngược toàn bài 180 phút và cảnh báo chống phân tâm khi click ra ngoài cửa sổ thi

### Tự động Tính điểm, Barem 0.5 & Báo cáo Năng lực
- [ ] Tự động tính điểm 4 kỹ năng và áp dụng công thức làm tròn 0.5 chuẩn Bộ GD&ĐT (xem [exam_format.md](file:///d:/program/vstep/docs/exam_format.md))
- [ ] Báo cáo kết quả: Điểm từng kỹ năng, điểm Overall, xếp bậc năng lực (Dưới B1 / B1 / B2 / C1)
- [ ] Radar Chart 4 kỹ năng và so sánh tiến độ so với các lần thi trước
- [ ] Chế độ Review chi tiết: Xem lại từng câu trắc nghiệm sai kèm dẫn chứng và toàn bộ nhận xét AI
- [ ] Unit Test thuật toán tính điểm và quy tắc làm tròn 0.5 VSTEP
- [ ] Tối ưu Lazy loading Mock Test & Chart components
- [ ] Run audit codebase check sau khi hoàn thành Full Mock Test
