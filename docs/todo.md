# DANH SÁCH CÔNG VIỆC THỰC THI (ACTIONABLE TODO)

Tài liệu này là **Task Checklist / Backlog** chi tiết phục vụ cho việc thực thi code hàng ngày. Chiến lược giai đoạn và milestones xem tại [roadmap.md](file:///d:/program/vstep/docs/roadmap.md).

## Quy ước Ký hiệu Trạng thái
- `- [ ]`: Chưa bắt đầu (Pending)
- `- [/]`: Đang thực hiện (In Progress)
- `- [x]`: Đã hoàn thành (Done)
- `- [!]`: Bị nghẽn / Cần làm rõ (Blocked)

## SPRINT: KHUNG NỀN TẢNG & FLASHCARD SRS (FOUNDATION & CURATED SRS)

### Khung Nền tảng & App Shell
- [x] App Shell & Design System: Dự án Vite + React 19 + TypeScript, CSS tokens Dark/Light (Campfire warm amber & obsidian), điều hướng 4 mục chính (Trang chủ, Từ vựng SRS, Luyện kỹ năng, Thi thử), truy cập Hồ sơ qua avatar header/sidebar, bố cục không cuộn (Mobile Zero-Scroll) cho Trang chủ, Luyện kỹ năng và Hồ sơ, và đồng bộ theme-color thanh hệ thống điện thoại Dark mode.
- [x] Xác thực & Đồng bộ Đám mây: Login-First Gate (`<ProtectedRoute>`), trang `/login` chuyên biệt Google OAuth, migration Supabase normalized tables (`user_profiles`, `user_study_logs`, `user_mock_test_results`, `user_flashcard_reviews`, `user_daily_stats`), trigger PostgreSQL `on_auth_user_created`, `profileSync.ts` đồng bộ hồ sơ/streak/điểm thi, tầng cô lập dữ liệu đa tài khoản theo User ID (`userStorage.ts`), dọn dẹp sạch sẽ `localStorage` khi đăng xuất, và Client optimistic UI buffer.
- [x] Master AI Gateway: Tích hợp OpenRouter, Ollama Cloud và Google AI Studio với Key Pool rotation, bảng chẩn đoán Dev Console chuyên biệt (`/dev`) kiểm tra độ trễ Ping (ms) & Dev override, tính năng Test Connection health check, cô lập hạn mức 5 lượt/ngày theo từng tài khoản (`vstep_${userId}_ai_daily_quota_v1`), và `AIServiceAdapter` xử lý fallback.
- [x] Tinh giản Hồ sơ Người học (`/profile`): Rút gọn hồ sơ tài khoản hiển thị email Google, đổi tên trực tiếp, loại bỏ QuotaUsageCard & Dev Console link, tích hợp nút Đặt lại tiến độ Deck (Reset Deck) gọn gàng trong thẻ thông tin duy nhất.
- [x] Tinh giản Sidebar & Thẻ Người dùng Desktop: Chuyển thẻ người dùng xuống chân sidebar (Sidebar Footer) cạnh nút chuyển theme, tích hợp nút Đăng xuất dạng icon ghost gọn gàng, loại bỏ thẻ thừa trên đầu sidebar giúp logo và danh sách điều hướng thoáng đãng.
- [x] Thanh Điều Hướng Thu Gọn Campfire (Collapsible Sidebar Architecture): Thu gọn hoàn toàn về width 0 (`.sidebar-spacer`), chuyển động mượt mà 150ms ease-out, dải kích hoạt viền trái 12px (Hover-Peek overlay 100ms debounce), nút thu gọn chevron xoay 180° tại header thương hiệu, phím tắt `Ctrl+B` / `Cmd+B` trên Desktop, lưu trạng thái `sidebar-collapsed` trong localStorage, và tự động mở rộng `.content-container` 100% toàn màn hình cho không gian luyện tập và thi thử split-pane.
- [x] Cấu hình PWA & Điều phối Cập nhật: Web App Manifest (Standalone Mode), Workbox autoUpdate với `injectRegister: null`, điều hướng Network-Direct không cache `index.html` (`navigateFallback: null`, `globIgnores: ['**/index.html']`, `updateViaCache: 'none'`) loại bỏ hoàn toàn hiện tượng kẹt cache build cũ, bộ điều phối `registerServiceWorker.ts` đảm bảo 1-refresh updates trên Desktop/Mobile, bảo vệ phiên thi đang diễn ra (In-Session Safety), first-visit guard, tự chữa lỗi dynamic chunk 404 (`vite:preloadError` + `lazyWithRetry`), đồng bộ header Cloudflare Pages `_headers`, và chuẩn hóa thứ tự kỹ năng toàn app (Listening → Reading → Writing → Speaking).

### Module Flashcard SRS Cốt lõi (Curated VSTEP SRS)
- [x] Thuật toán FSRS v6 & Đồng bộ Đám mây: Spaced Repetition nhị phân (Sai / Đúng), hàng đợi 3 cấp ưu tiên không giới hạn trần cứng (re-learning → due reviews → unseen new cards), trần 365 ngày, Supabase Cloud Sync (`user_flashcard_reviews` & `user_daily_stats`), lưu trữ cục bộ phân vùng theo `userId` (`vstep_${userId}_flashcard_deck_v3`), dọn sạch dữ liệu khi đăng xuất, cơ chế Uniform Cloud Projection triệt tiêu lỗi ghép thẻ Frankenstein, ConfirmModal đặt lại deck xóa sạch cloud data đồng bộ đa thiết bị, và hàng rào ngoại tuyến bảo toàn tiến độ.
- [x] Trải nghiệm Mobile Flashcard & Cử chỉ: Thẻ Above-the-Fold (thanh trạng thái 1 dòng, thu gọn header khi ôn tập), cử chỉ kéo vuốt tỷ lệ thực (Proportional Touch Swipe) với tem phản hồi ✗ Sai / ✓ Đúng và ngưỡng nhả 90px, triệt tiêu lỗi lộ nghĩa (Spoiled Definition Glitch), mặt sau căn giữa quang học, phím tắt laptop (`←` / `→` / `Space` / `A` / `P`), đồng bộ `theme-color` `#141210` Dark Obsidian, và gradient mask thanh chọn chủ đề.
- [x] Thông báo PWA & App Badging: Tự động đồng bộ số thẻ cần ôn lên huy hiệu icon (`navigator.setAppBadge`), hẹn giờ nhắc nhở hàng ngày (`srsReminderService.ts`), Service Worker custom extension (`sw-custom.js`), và `ReminderSettingsModal` responsive.
- [x] Tăng số lượng từ lên 3000, lấy từ các đề trong 4 skills
  - [x] Đợt 1 (Listening): Mở rộng từ 1.500 lên 2.000 từ (+500 từ) từ 7 Authentic Mock Tests & 15 HCMUE Drills (`scripts/mine_listening_vocab.mjs`)
  - [x] Đợt 2 (Reading): Mở rộng từ 2.000 lên 2.500 từ (+500 từ) từ 48 bài đọc VSTEP Reading (28 ULIS + 20 HCMUE, `scripts/mine_reading_vocab.mjs`)
  - [x] Đợt 3 (Writing & Speaking): Mở rộng từ 2.500 lên 3.000 từ (+500 từ) từ 14 đề ULIS Writing/Speaking, Writing Bank & Speaking Bank (`scripts/mine_productive_vocab.mjs`)
- [x] Bộ lọc cấp độ CEFR Flashcard: Tích hợp chọn cấp độ ('Tất cả', 'B1', 'B2', 'C1') kết hợp cùng 8 chủ đề, lưu trữ trạng thái bền vững trên thiết bị cục bộ (localStorage).
- [x] Tinh giản Studio Luyện từ vựng & Sổ tay Tra cứu Tương tác: Loại bỏ tab duyệt tĩnh 3.000 từ gây quá tải; biến 3 ô thống kê cốt lõi (Đã làm chủ, Đang học, Hôm nay đã ôn) thành lối tắt tương tác mở Sổ tay từ vựng (`WordInspectorModal.tsx`) với bộ lọc tức thì, tìm kiếm thời gian thực và phát âm audio bản xứ.
- [x] Tinh giản Không Gian Luyện Tập & Bố Cục Nút Bấm An Toàn: Loại bỏ banner tiêu đề/mô tả và thanh tiến độ chủ đề tối ưu không gian Above-the-Fold; đưa nút Nhắc nhở SRS vào thanh lọc CEFR gọn nhẹ kèm huy hiệu đồng bộ Cloud; chuyển nút Đặt lại Deck về cuối trang Từ vựng SRS (/flashcard) kèm ConfirmModal cảnh báo 2 bước chống chạm nhầm.
- [x] Thanh công cụ Lọc 1 Dòng & Menu Thả Chủ đề Bền vững: Hợp nhất hàng lọc CEFR và bộ chọn chủ đề thành 1 thanh công cụ tinh gọn; thay thế dải 9 pill cuộn ngang bằng nút dropdown menu có icon bộ lọc (`FilterIcon`), tự động đóng khi chọn hoặc bấm ra ngoài, lưu trữ bền vững chủ đề trên thiết bị cục bộ (`localStorage`).

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
- [x] Xây dựng `ReadingRunner` hỗ trợ 2 chế độ: `mode: 'practice'` (bật tra từ/dẫn chứng/ghi chú nháp, triệt tiêu hoàn toàn đồng hồ đếm ngược và interval ticking để loại bỏ áp lực và chu kỳ re-render thừa) và `mode: 'exam'` (60 phút countdown tự nộp, giao diện chuẩn phòng thi)
- [x] Tinh giản Studio Luyện Đọc & Luyện Nghe: Loại bỏ bộ chuyển đổi chế độ Luyện tập / Thi thử trong Studio trang con (tập trung 100% vào chế độ Practice, nhường toàn bộ Exam Mode cho Mock Test Runner 180 phút), mặc định chọn Bộ đề HCMUE khi tải trang Reading Studio.
- [x] Bố cục Split-Pane chia đôi màn hình tối ưu thị giác: Khung bài đọc bên trái (~50%) và luồng câu hỏi bên phải (~50%) cuộn độc lập, chuyển bảng điều khiển câu hỏi thành thanh đáy chuẩn CBT (ReadingBottomBar) kèm cơ chế thu gọn thành floating pill góc màn hình không che văn bản; trên mobile (<768px) hỗ trợ tab toggle ghi nhớ vị trí cuộn
- [x] Tùy chỉnh hiển thị: Chỉnh cỡ chữ (14px–22px), giãn dòng (1.5x, 1.8x, 2.0x), và 3 chế độ nền (Warm Sepia, Obsidian Dark, Cream Light) lưu trữ theo tài khoản

### Tra từ Nhanh (1-Tap Dictionary Tooltip)
- [x] Nhấn/chạm vào từ tiếng Anh trong bài đọc hiển thị tooltip tra nghĩa tiếng Việt tức thì; trên mobile hỗ trợ chạm 1 chạm tức thì (coordinate point resolution qua `caretPositionFromPoint` / `caretRangeFromPoint` kết hợp `touch-action: manipulation`) loại bỏ hoàn toàn xung đột menu hệ điều hành
- [x] Hỗ trợ tra từ 2 tầng nâng cấp: Tầng 1 offline tra tức thì 9.000+ từ vựng Anh-Việt chuẩn lexicographical (`dictionaryVi.ts`) kèm IPA, từ loại (POS), danh sách nghĩa đánh số, phát âm Web Speech API, giải thuật Lemmatizer O(1) và smart flip positioning; Tầng 2 fallback qua MyMemory API hiển thị nghĩa tiếng Việt (không ghi rác vào hàng đợi SRS, khóa trong Exam Mode)

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
- [x] Đề 7 (ULIS Test 7): PDF trang 89–95, đáp án trang 159 kèm 100% dẫn chứng verbatim chuẩn xác (`ulisReadingTest07.ts`)
- [x] 5 Đề Luyện Tập HCMUE (Drills 01–05): Trích xuất từ sách "20 Mock Tests" (NXB ĐH Sư Phạm TP.HCM) đồng bộ với 15 bài Listening Drills
- [x] Tích hợp Collection Switcher trên Reading Studio (`src/features/reading/ReadingStudioPage.tsx`): Cho phép chuyển đổi giữa "7 Đề thi chuẩn ULIS" (`ALL_VSTEP_READING_MOCK_TESTS`) và "5 Đề luyện tập HCMUE" (`HCMUE_READING_TESTS`, 200 câu hỏi trắc nghiệm tại `src/features/reading/data/drills/hcmue/`)
- [x] Run audit codebase check sau khi hoàn thành kỹ năng Đọc (Reading)

## SPRINT: LUYỆN VIẾT VỚI GIÀN GIÁO (SCAFFOLDED WRITING & VIETLISH AI)

### Kiến trúc Unified Writing Runner & Trình soạn thảo
- [x] Xây dựng `WritingRunner` hỗ trợ 2 chế độ: `mode: 'practice'` (bật outline/mẫu câu/chấm AI tức thì) và `mode: 'exam'` (khóa gợi ý, auto-save, thu bài khi hết giờ)
- [x] Đồng hồ đếm ngược 60 phút hợp nhất chuẩn phòng thi ĐH Văn Lang & Bộ GD&ĐT kèm cảnh báo nhịp độ (Pacing Alert phút 20 nhắc chuyển Task 2 để bảo vệ 67% điểm số)
- [x] Trình soạn thảo 2 task (Task 1: Thư 120 từ / Task 2: Luận 250 từ) kèm bộ đếm từ thời gian thực và nút Lưu bài độc lập
- [x] Cơ chế Auto-save tự động lưu bản nháp mỗi 5 giây vào LocalStorage
- [x] Ngân hàng đề thi Viết thực chiến: Trích xuất và cấu trúc hóa 7 Đề thi ULIS (Đề 01–07 tại `mockTests/`) và 5 Đề thi Authentic HCMUE (Đề 01–05 tại `src/features/writing/data/drills/hcmue/` gồm 10 bài Thư & Luận) kèm 100% bài mẫu chính thức và phân tích tiếng Việt
- [x] Tích hợp Collection Switcher trên Writing Studio (`src/features/writing/WritingStudioPage.tsx`): Cho phép chuyển đổi giữa "7 Đề thi chuẩn ULIS" (`ALL_ULIS_WRITING_TESTS`) và "5 Đề luyện tập HCMUE" (`HCMUE_WRITING_TESTS`, 10 bài Thư & Luận)

### Pipeline Chấm Writing 3 Tầng & Vietlish Engine
- [x] Tầng 1 (Client-side): Local rule-based pre-filter & pre-calculation (<50ms, regex đếm từ, n-gram chống chép đề, lọc lỗi liên từ kép *Although... but...*, *Because... so...*)
- [x] Tầng 2 (AI Evaluator): Evidence-First LLM Evaluator (`gemini-3.5-flash-lite`, 500 RPD) nhận dữ liệu đếm từ inject sẵn, xuất toàn bộ bằng chứng & phân tích lỗi trước khi kết luận điểm số theo Strict JSON Schema (xem [writing_pipeline.md](file:///d:/program/vstep/docs/architecture/writing_pipeline.md))
- [x] Tầng 3 (TypeScript Engine): Deterministic Composite Scoring tính điểm theo công thức Bộ GD&ĐT `(Task 1 + Task 2 * 2) / 3` và quy tắc làm tròn 0.5 chính thức
- [x] Vietlish Engine nhận diện 3 nhóm lỗi tư duy tiếng Việt chuẩn ngôn ngữ học (Cú pháp khuyết chủ ngữ giả / liên từ kép, Hình thái thiếu mạo từ / biến tố thời thể, Kết hợp từ dịch thô / sai giới từ)
- [x] Giao diện bôi màu nhận xét: Đỏ (Ngữ pháp), Tím (Vietlish), Vàng (Từ vựng), Xanh lá (Khen ngợi)
- [x] Sinh bài mẫu viết lại (Revised Essay) nâng band từ ý tưởng gốc của học viên
- [x] Unit Test bộ đếm từ, tỷ lệ n-gram sao chép đề bài và công thức làm tròn 0.5
- [x] Unit Test bộ parser phản hồi AI Strict JSON Schema và schema evidence-first ordering
- [x] Run audit codebase check sau khi hoàn thành kỹ năng Viết (Writing)

## SPRINT: LUYỆN NÓI TƯƠNG TÁC (INTERACTIVE SPEAKING STUDIO)

### Kiến trúc Unified Speaking Runner & Phòng thu BEEP
- [x] Xây dựng `SpeakingRunner` hỗ trợ 2 chế độ: `mode: 'practice'` (luyện từng Part riêng, nghe lại bản thu, xem gợi ý cấu trúc B1, chấm tức thì) và `mode: 'exam'` (liên tục 3 Part 12 phút, chuẩn phòng thi VLU & Bộ GD&ĐT)
- [x] Đồng hồ đếm ngược thời gian thực: Chuẩn bị (1p) và Ghi âm (3p) theo từng Part
- [x] Tích hợp âm hiệu BEEP bắt đầu và kết thúc chuẩn phòng thi tạo bằng Web Audio API `OscillatorNode` độc lập
- [x] Trích xuất & cấu trúc hóa 7 Đề thi Nói Authentic ULIS (`src/features/speaking/data/mockTests/ulisSpeakingTest01.ts` đến `07.ts`) từ sách "7 Vstep Tests" và tích hợp 1:1 vào `mockTest01.ts` đến `mockTest07.ts`
- [x] Ngân hàng đề thi Nói thực chiến: Trích xuất và cấu trúc hóa 5 Đề thi Authentic HCMUE (Đề 01–05 tại `src/features/speaking/data/drills/hcmue/` gồm 15 phần thi) kèm gợi ý dàn ý và bài mẫu chính thức
- [x] Tích hợp Collection Switcher trên Speaking Studio (`src/features/speaking/SpeakingStudioPage.tsx`): Cho phép chuyển đổi giữa "7 Đề thi chuẩn ULIS" (`ALL_ULIS_SPEAKING_TESTS`) và "5 Đề luyện tập HCMUE" (`HCMUE_SPEAKING_TESTS`, 15 phần thi)

### Thu âm Trình duyệt, Đàm phán MIME & Bộ đệm IndexedDB
- [x] Đàm phán định dạng an toàn qua `MediaRecorder.isTypeSupported()` (`audio/webm;codecs=opus` -> `audio/webm` -> `audio/mp4`) tương thích tối đa trên Laptop, Android và Safari
- [x] Bộ đệm lưu trữ nhị phân Native IndexedDB (`src/features/speaking/speakingStorage.ts`): Lưu các đoạn audio dạng `Blob` nguyên bản, triệt tiêu lỗi tràn hạn ngạch 5MB của localStorage
- [x] Client Acoustic Metrics & Visualizer (Web Audio API): Trực quan hóa sóng âm microphone trên Canvas và phát hiện khoảng lặng chết (> 2s) qua bộ phân tích biên độ RMS

### Pipeline Chấm Speaking 3 Tầng qua Gemini 3.5 Flash Lite Native Audio
- [x] Single-shot Multimodal Evaluation & Pluggable Groq Whisper ASR Adapter: Tích hợp adapter chuyển mã âm thanh Groq Whisper `whisper-large-v3-turbo` + fallback Gemini 3.5 Flash Lite Multimodal Native Audio
- [x] Chấm điểm theo 4 tiêu chí chuẩn Quyết định 729/QĐ-BGDĐT: Pronunciation (25%), Fluency & Coherence (25%), Grammar & Vocabulary (25%), Task Fulfillment (25%)
- [x] Tính toán tốc độ nói WPM từ transcript và thời lượng nói thực tế
- [x] Phonetic Analysis: Phát hiện từ phát âm sai, thiếu âm đuôi (`/s/`, `/ed/`, `/t/`) hoặc sai trọng âm kèm phiên âm IPA chuẩn và giải thích bằng tiếng Việt
- [x] Sinh trực tiếp bài nói sửa chuẩn B1 (**AI-Fixed B1 Speech**) từ ý tưởng gốc của học viên
- [x] Giao diện kết quả Speaking: Radar Chart 4 trục, nghe lại audio bản thu, đối chiếu Side-by-Side (Bản ghi âm & Transcript | AI-Fixed B1 | Authentic ULIS Model)
- [x] Unit Test bộ tính điểm 4 tiêu chí MOET và quy tắc làm tròn 0.5
- [x] Run audit codebase check sau khi hoàn thành kỹ năng Nói (Speaking)

## SPRINT: THI THỬ THỰC CHIẾN (FULL MOCK TEST & EXAM ORCHESTRATOR)

### Mock Exam Orchestrator Chuẩn Phòng máy Bộ GD&ĐT
- [x] Xây dựng Mock Exam Orchestrator điều phối liên hoàn 4 Skill Runner ở `mode: 'exam'` (Listening 40p → Reading 60p → Writing 60p → Speaking 12p)
- [x] Khóa toàn bộ công cụ hỗ trợ (tra từ, tua audio, xem gợi ý dàn ý)
- [x] Question Palette tổng hợp đánh dấu trạng thái (Đã làm, Chưa làm, Gắn cờ Flag)
- [x] Đếm ngược toàn bài 180 phút và cảnh báo chống phân tâm khi click ra ngoài cửa sổ thi

### Tự động Tính điểm, Barem 0.5 & Báo cáo Năng lực
- [x] Tự động tính điểm 4 kỹ năng và áp dụng công thức làm tròn 0.5 chuẩn Bộ GD&ĐT (xem [exam_format.md](file:///d:/program/vstep/docs/exam_format.md))
- [x] Báo cáo kết quả: Điểm từng kỹ năng, điểm Overall, xếp bậc năng lực (Dưới B1 / B1 / B2 / C1)
- [x] Radar Chart 4 kỹ năng và so sánh tiến độ so với các lần thi trước
- [x] Chế độ Review chi tiết: Xem lại từng câu trắc nghiệm sai kèm dẫn chứng và toàn bộ nhận xét AI
- [x] Unit Test thuật toán tính điểm và quy tắc làm tròn 0.5 VSTEP
- [x] Tối ưu Lazy loading Mock Test & Chart components
- [x] Run audit codebase check sau khi hoàn thành Full Mock Test

### Tối Ưu Hóa & Modular Hóa 4 Skill Runners (Architecture Refactoring)
- [x] Phân rã sub-components cho cả 4 Skill Runners (Reading, Speaking, Writing, Listening): Đưa 100% các file runner cốt lõi xuống dưới ngưỡng 400 dòng mã (`ReadingRunner.tsx` 388 lines, `SpeakingRunner.tsx` 389 lines, `WritingRunner.tsx` 347 lines, `ListeningRunner.tsx` 347 lines).
- [x] Tách các presentation sub-components chuyên biệt: Headers, Timer widgets, Navigation/Tabs, Pacing alerts, Scaffolding boxes và Reset confirmation modals vào thư mục `components/` của từng kỹ năng.
- [x] Module hóa các custom hooks và deduplication helpers: `useReadingTimer`, `useReaderSettings`, `useReadingSessionSync`, `useSpeakingAudioStorage`, `speakingPromptHelper`.
- [x] Bảo toàn 100% contracts component, state lifecycles, user-tenant storage isolation và 204 unit tests Vitest.
- [x] Tinh giản Giao diện Không Gian & Loại bỏ Nhãn Nhiễu CEFR: Tối ưu trang chủ (Home) và Luyện kỹ năng (Skills Practice) thành giao diện no-scroll không cần cuộn trang; tinh giản điều hướng còn 4 tab chính; loại bỏ các nhãn độ khó bề mặt (B1–C1, B2–C1, B1-B2); duy trì đánh giá AI cố định chuẩn B1; lưu trữ bền vững lựa chọn Bậc CEFR của Flashcard trên thiết bị cục bộ (localStorage); và đồng bộ màu theme-color thanh hệ thống điện thoại khi ở chế độ Dark mode.
- [x] Hợp nhất Trung tâm Người học (Unified Learner Hub) & Tối ưu Đồng bộ Trạng thái: Hợp nhất Hồ sơ và Trang chủ thành Trung tâm Người học duy nhất (`/`), tích hợp thông tin cá nhân (đổi tên, email, huy hiệu đồng bộ) và lưới 4 chỉ số cốt lõi (Từ vựng đang học, Từ đã thuộc, Bài đã luyện, Thi thử gần nhất); loại bỏ các thẻ điều hướng trùng lặp; chuyển đổi thuật ngữ "Làm chủ" thành "Đã thuộc" trong toàn bộ SRS; chuẩn hóa meta theme-color `#141210` trên di động; sửa triệt để lỗi lưu trữ cục bộ khiến "Bài đã luyện" không cập nhật trong `userStore`; và dọn dẹp hoàn toàn trang/route `/dev` và `/profile`.
- [x] Audit all the B1, C1, C2 if they really belong to the tier
- [x] look these images on home page and srs page: it firt render "Từ Vựng Đã Thuộc 0 / 3000" then immediately show "Từ Vựng Đã Thuộc 37 / 3000", same as in srs, first it show the card "cirricury", then immidiately show the corrert card primary?? i dont need these pages to always up-to-date when click on, only need when i reload the website
- [x] page mock test, remove: "Phòng Thi Thử VSTEP Thực Chiến/Mô phỏng 100% định dạng phòng máy Bộ GD&ĐT (180 phút, cấm tua/tra từ, tự động thu bài, làm tròn 0.5 chính thức)." "Đề Thi Chuẩn Số 1
VSTEP Authentic Full Mock Test 01 (Chuẩn ĐHNN - ĐHQGHN)
ULIS - ĐHQGHN / VNU Test Standard • Tổng thời lượng: 180 phút" "Quy chế phòng thi: Khóa toàn bộ công cụ tra từ và phụ đề; không thể quay lại phần thi trước sau khi đã chuyển tiếp; hệ thống tự động ghi nhận nếu click chuột ra ngoài cửa sổ thi; bảng điểm Barem 0.5 và Radar Chart 4 trục hiển thị ngay sau khi hoàn thành." becuase it repeat words many times. next keep the english skill, delete the vietnam skill "nghe, noi,..". 
- [x] why in mobile, even when i reset the phone and reload the website on my phone and are in dark mode, my top bar where it show the system infos, are still bright yellow color?it suppose to be dark, is it a build dpeloy problem? 
- [x] if the text "Đồng bộ Cloud" is hardcode->delete it
- [x] where is the collaspe topic in srs: Hợp nhất bộ chọn chủ đề thành 1 nút dropdown gọn nhẹ có icon bộ lọc nằm cùng hàng với Bậc CEFR, hỗ trợ lưu trữ chủ đề đã chọn bền vững trên thiết bị cục bộ (localStorage).
- [x] fix the detail pop up window (WordInspectorModal): Thêm flex-shrink: 0 và overflow-y: hidden cho header, tabs, search bar, và min-height: 0 cho word list để triệt tiêu lỗi flexbox đè bẹp thanh tab lọc; sắp xếp danh sách từ theo thời gian ôn gần nhất lên đầu.
- [x] move the reset deck to the right of the noti icon, so from left to right is noti->reset: Di chuyển nút Đặt lại Deck lên thanh công cụ nằm cạnh nút Nhắc nhở SRS (thứ tự: chuông thông báo -> đặt lại deck), đồng bộ trên cả Desktop và Mobile bar, dọn dẹp thẻ cài đặt thừa ở cuối trang.
- [x] fix status bar color & icon contrast in light mode: Chuẩn hóa khai báo kép `theme-color` với media queries (`prefers-color-scheme: light` cho `#F0ECE3`, `prefers-color-scheme: dark` cho `#141210`), `apple-mobile-web-app-status-bar-style` thành `default` trong Light Mode, đồng bộ động `theme-color` và `colorScheme`, xử lý triệt để lỗi thanh trạng thái đen nuốt mất biểu tượng pin/wifi/giờ trên Android/iOS.
- [x] Global Tap-to-Translate & Ubiquitous Dictionary Provider: Thống nhất từ điển tra từ 9.098 mục và lemmatizer O(1) thành hệ thống toàn cục (`src/features/dictionary/`), đưa `DictionaryProvider` bọc ngoài `App.tsx` với React Portal và lazy code-splitting (chunk `reading-dictionary` riêng biệt ~1.8MB tránh bloat tải trang đầu); xử lý triệt để va chạm tương tác trên nút phương án trắc nghiệm (Desktop: click chọn đáp án, double-click/bôi đen tra từ; Mobile: chạm ngắn chọn đáp án, nhấn giữ >=400ms hoặc chạm đúp tra từ; chế độ xem lại nộp bài chạm 1 chạm tra từ); tích hợp `useDictionaryExamLock` khóa toàn bộ tra từ trong Full Mock Test và Exam Mode; dọn dẹp state và code trùng lặp trong ReadingRunner và PassagePanel.