# DANH SÁCH CÔNG VIỆC THỰC THI (ACTIONABLE TODO)

Tài liệu này là **Task Checklist / Backlog** chi tiết phục vụ cho việc thực thi code hàng ngày. Chiến lược giai đoạn và milestones xem tại [roadmap.md](file:///d:/program/vstep/docs/roadmap.md).

## Quy ước Ký hiệu Trạng thái
- `- [ ]`: Chưa bắt đầu (Pending)
- `- [/]`: Đang thực hiện (In Progress)
- `- [x]`: Đã hoàn thành (Done)
- `- [!]`: Bị nghẽn / Cần làm rõ (Blocked)

## SPRINT: KHUNG NỀN TẢNG & FLASHCARD SRS (FOUNDATION & CURATED SRS)

### Khởi tạo Dự án & Design System (App Shell)
- [x] Khởi tạo dự án Web (Vite + React 19 + TypeScript + Vanilla CSS Tokens)
- [x] Thiết lập hệ thống biến CSS Design Tokens (Dark/Light mode, typography Outfit/Inter, Campfire warm amber & obsidian palette)
- [x] Thiết lập hệ thống điều hướng Routing (Home, Skill Practice, Flashcard, Mock Test, Settings, Profile)
- [x] Xây dựng Layout Responsive (Desktop Sidebar / Mobile Bottom Navigation Bar)

### Hệ thống Xác thực & Đồng bộ Đám mây (Login-First & Cross-Device Sync)
- [x] Thiết lập Login-First Gate (`<ProtectedRoute>`) chặn truy cập unauthenticated và chuyển hướng về `/login`
- [x] Xây dựng trang `/login` chuyên biệt chỉ sử dụng Google OAuth (loại bỏ biểu mẫu Email/Mật khẩu và modal cũ)
- [x] Tạo Migration SQL cho Cơ sở dữ liệu chuẩn hóa (Option B: `user_profiles`, `user_study_logs`, `user_mock_test_results`, `user_flashcard_reviews`, `user_daily_stats`)
- [x] Thiết lập trigger PostgreSQL `on_auth_user_created` tự động khởi tạo profile từ Google OAuth metadata
- [x] Xây dựng tầng dịch vụ `profileSync.ts` và tích hợp vào `userStore.ts` để đồng bộ hồ sơ, streak và điểm thi giữa Mobile và Laptop
- [x] Tích hợp cơ chế Optimistic UI và lưu trữ đệm tạm thời tại Client phòng ngừa mất kết nối ngắn hạn

### Cấu hình AI Provider Hub & Master Gateway
- [x] Xây dựng Master AI Gateway hỗ trợ OpenRouter, Ollama Cloud và Google AI Studio với Key Pool rotation (xem [ai_gateway.md](file:///d:/program/vstep/docs/architecture/ai_gateway.md))
- [x] Xây dựng Settings UI: Bảng chẩn đoán trạng thái AI Gateway, đo độ trễ Ping (ms), chế độ Override nâng cao cho Dev
- [x] Xây dựng tính năng Kiểm tra kết nối (Test Connection / Health Check) cho Master Gateway và từng provider
- [x] Xây dựng lớp dịch vụ `AIServiceAdapter` chuẩn hóa request/response và xử lý fallback tự động

### Cấu hình PWA & Quản lý Dữ liệu Client
- [x] Cấu hình Web App Manifest (manifest.webmanifest) hỗ trợ Add to Home Screen (Standalone Mode)
- [x] Cấu hình Service Worker cache tĩnh App Shell, font và static assets
- [x] Điều chỉnh thứ tự hiển thị kỹ năng toàn app: Nghe (Listening) → Đọc (Reading) → Viết (Writing) → Nói (Speaking)

### Module Flashcard SRS Cốt lõi (Curated VSTEP SRS)
- [x] Flashcard SRS: Thuật toán Spaced Repetition (1-3-7-14-30), hiệu ứng 3D Flip Card
- [x] Tích hợp hệ thống Toast notifications phản hồi học tập
- [x] Xây dựng bộ ngữ liệu 1.500 từ vựng cốt lõi trích xuất từ đề thi thật ULIS/HNUE theo 8 chủ đề VSTEP chuẩn (188 Edu, 188 Work, 188 Health, 188 Env, 187 Tech, 187 Travel, 187 Soc, 187 Media)
- [x] Xây dựng Daily Review Queue hiển thị số thẻ cần ôn tập hôm nay và thống kê tiến độ học
- [x] Tích hợp Supabase Cloud Sync cho Flashcard SRS qua Google OAuth (user_flashcard_reviews & user_daily_stats)
- [x] Kiến trúc Online-First: Chặn ghi nhận ôn tập khi mất kết nối mạng và hiển thị banner cảnh báo ngoại tuyến
- [x] Modal xác nhận đặt lại Deck 2 bước chống xóa nhầm (ConfirmResetModal) responsive trên Mobile & Desktop
- [x] Xóa sạch dữ liệu đồng bộ đám mây (user_flashcard_reviews & user_daily_stats) khi người dùng xác nhận đặt lại Deck
- [x] Cơ chế Decoupled Corpus Hydration: Giữ nguyên 100% tiến độ học khi mở rộng kho từ vựng từ 1.500 lên 3.000 từ trong tương lai
- [ ] Tăng số lượng từ lên 3000, lấy từ các đề trong 4 skills
- [ ] question: what is the algorithms logic of the Spaced Repetition (SRS) system in this project?? how does the system decide when to show which words??the priority order is??is it good? 
- [ ] add noti to show the srs
### Kiểm thử & Tối ưu Nền tảng (DoD Verification)
- [x] Unit Test thuật toán Spaced Repetition (SRS algorithm) qua Vitest
- [x] Thiết lập Pre-push pipeline tự động (scripts/prepush.mjs + .githooks/pre-push)
- [x] Thiết lập CI/CD GitHub Actions workflow (.github/workflows/ci.yml)
- [x] Thiết lập kịch bản tự động hóa database migration Supabase (scripts/migrate.mjs + pnpm db:migrate)
- [x] Triển khai Production lên Cloudflare Pages (vstep.pages.dev) kèm SPA redirects và Google OAuth
- [ ] Đạt điểm số Google Lighthouse > 90 (Performance, Accessibility, SEO) và tối ưu PWA Standalone


## SPRINT: LUYỆN NGHE CHỦ ĐỘNG (ASSISTED LISTENING STUDIO)

### Kiến trúc Unified Listening Runner
- [x] Xây dựng `ListeningRunner` hỗ trợ 2 chế độ: `mode: 'practice'` (bật tua/dictation/manh mối) và `mode: 'exam'` (chỉ phát audio chuẩn, khóa phụ đề và manh mối)
- [x] Tích hợp Question Palette cho 35 câu trắc nghiệm 3 Part
- [x] Tích hợp chế độ "Mock Test 01: Sửa Đề & Luyện Sâu" cho phép chữa đề chi tiết 35 câu với đầy đủ công cụ phân tích

### Custom Audio Player & Điều khiển Nghe
- [x] Xây dựng Custom Audio Player Sticky: Tự động ghim khi cuộn, nút tua ±5s, chọn 5 mức tốc độ (0.5x, 0.75x, 1.0x, 1.5x, 2.0x), thanh scrub tiến trình
- [x] Tích hợp phím tắt điều khiển bàn phím (`Space` Play/Pause, `←` / `→` tua ±5s) kèm input guard cho `INPUT`, `TEXTAREA`, `SELECT`
- [x] Tải và tích hợp file audio MP3 thi thật từ nguồn chính thức (7 đề thi VSTEP chuẩn ĐHQGHN)
- [x] Cắt tách file audio lossless 21 file cho 7 đề × 3 Part (`public/audio/listening/test{1..7}/vstep-test-{1..7}-part{1..3}.mp3`)
- [x] Ingestion tự động hóa 21 bộ transcript song ngữ kèm mốc thời gian chính xác sub-second qua pipeline 2 giai đoạn: Stage 1 Groq Cloud Whisper / local faster-whisper fallback (`scripts/transcribe_listening.py`) + Stage 2 Gemini Flash bilingual enrichment (`scripts/enrich_listening.mjs`)
- [x] Cấu hình luồng phân phối âm thanh Production qua Cloudflare Pages `public/_redirects` chuyển hướng 302 sang Cloudflare R2 CDN bucket (hỗ trợ HTTP 206 Partial Content, Range headers, CORS `*`, $0 egress và tua tức thì)
- [x] Lập danh mục nguồn gốc âm thanh toàn diện (`docs/sources/listening/README.md`) lập chỉ mục 22 file audio với mã định danh lưu trữ Google Drive, URL stream Cloudflare R2 và tài liệu tham chiếu sách gốc

### Ngân hàng Đề Luyện Tập Đa Dạng (Multi-Test Banks)
- [x] Tách biệt kiến trúc ngân hàng nghe: Purge các slice trùng lặp khỏi `part1Bank.ts`, `part2Bank.ts`, `part3Bank.ts`, xuất mảng rỗng sẵn sàng cho đề discrete độc lập
- [x] Tích hợp ngân hàng luyện tập riêng biệt Part 1, 2, 3 từ nguồn chuẩn NXB ĐH Sư Phạm TP.HCM (HCMUE 20 Mock Tests, Đề 01–05, 15 bộ đề độc lập, 175 câu hỏi) với audio riêng 256kbps stereo, transcript song ngữ, mốc thời gian sub-second, đáp án chính thức và giải thích chi tiết
- [x] Giao diện Listening Studio: Mặc định chọn Mock Test (Card 4), hỗ trợ luyện tập độc lập các Part 1, 2, 3 (Cards 1–3) với bộ chọn đề 5 kỳ thi (`[Đề 1]` đến `[Đề 5]`)
- [x] Ghi chú nguồn gốc xuất xứ (Provenance) chi tiết trong code cho từng audio track (Google Drive ID, số trang sách, tài liệu docs/sources/)
- [x] Tích hợp 21 bộ transcript song ngữ kèm mốc thời gian sub-second vào cấu trúc modular mock tests
- [x] OCR và trích xuất trọn bộ câu hỏi 35 câu (tổng 245 câu, 4 lựa chọn, đáp án chuẩn, lời giải tiếng Việt) cho toàn bộ 7 đề từ sách "7 VSTEP Tests"
- [x] Khởi tạo các module đề thi thử độc lập `mockTest01.ts` đến `mockTest07.ts` trong `src/features/listening/data/mockTests/` và export qua `src/features/listening/data/index.ts`
- [ ] Tải và chạy thử nghiệm mô hình local qua Ollama: `ollama run hf.co/openbmb/MiniCPM5-2B-GGUF:Q4_K_M` và `ollama run hf.co/XHToken/Spark-X2.5-4B-GGUF:Q4_K_M` and python -c "from faster_whisper import WhisperModel; WhisperModel('large-v3-turbo', device='cpu', compute_type='int8')"
- [x] Hiện đại hóa và tái cấu trúc thư mục `scripts/`:
  - Loại bỏ hoàn toàn 5 file script cũ và 13.000 dòng mã thừa/dữ liệu trùng lặp (`ingest-listening.mjs`, `detect-boundaries.mjs`, `verify-timestamps.mjs`, `download-hcmue-drills.ps1`, `download-mock-assets.ps1`).
  - Xây dựng Stage 1 Audio Transcriber (`scripts/transcribe_listening.py`): Ưu tiên Groq Cloud Whisper (`whisper-large-v3-turbo`) xử lý 25 phút audio trong ~2.5s, tự động fallback sang `faster-whisper` (CTranslate2 int8 trên 8 CPU cores) khi offline.
  - Xây dựng Stage 2 Bilingual Enrichment (`scripts/enrich_listening.mjs`): Gọi Gemini Flash cascade thuần văn bản (<500 tokens), triệt tiêu lỗi 429 và phí upload file.
  - Tích hợp Dynamic Discovery: `scripts/export_all_listening.mjs` và `scripts/verify-all-listening.mjs` tự động quét toàn bộ đề thi trong `drills/` và `mockTests/`.
  - Hợp nhất kịch bản tải tài nguyên `scripts/download-assets.ps1` hỗ trợ `-Target all|hcmue|mock|pdf`.
### Tinh giản Luồng Luyện Nghe & Ghi chú Nháp (Streamlined Question Stream & Scratchpad)
- [x] Tinh giản `ListeningRunner`: Loại bỏ tab-switcher (questions/dictation/transcript) và cơ chế dictation diff, hợp nhất toàn bộ trải nghiệm vào luồng câu hỏi đơn trang
- [x] Xây dựng `PassageGroupHeader` tự động nhận diện ranh giới bài nghe Part 2 (Hội thoại) và Part 3 (Bài giảng) kèm nút phát audio phân đoạn
- [x] Nút nhảy audio trực tiếp tại badge từng câu hỏi (`▶ [mm:ss]`) trong chế độ Practice
- [x] Khung ghi chú nháp từ khóa (Scratchpad) auto-expanding dưới mỗi câu hỏi (chỉ bật trong Practice Mode)
- [x] Khung mở rộng lời thoại & manh mối (Inline Collapsible Transcript) song ngữ và bôi sáng manh mối trực tiếp dưới mỗi câu hỏi
- [x] Kiểm thử toàn diện: Unit tests `listening.test.ts` (10 tests), lint và typecheck pass 100%
- [x] Kiểm thử tự động hóa đồng bộ âm thanh & mốc thời gian (`scripts/verify-all-listening.mjs` / `pnpm run verify:listening`): Kiểm tra 100% 22 bộ đề (15 HCMUE discrete drills + 7 Full Mock Tests), xác thực sự tồn tại của file audio vật lý, độ lệch thời lượng < 3s, thứ tự mốc thời gian tuần tự không chồng chéo, đầy đủ manh mối câu hỏi và loại bỏ bẫy đọc đề thi mẫu (example-trap)
- [x] Kiểm định âm học AI chuyên sâu (`scripts/master_listening_audit.py`): Hoàn tất rà soát 168 phân đoạn audio thực tế qua `faster-whisper`. Đã khắc phục 100% các sai lệch: đảo thứ tự Q6/Q7 (HCMUE P1 Đề 01), khoảng lặng tiền âm thoại (HCMUE P2 Đề 01), khôi phục bài giảng khuyết và mốc thời gian 100s (HCMUE P3 Đề 04 & Đề 05)

## SPRINT: NGÂN HÀNG ĐỀ THI THẬT & MOCK TEST (AUTHENTIC EXAM BANKS)
- [x] Trích xuất và cấu trúc hóa Đề thi Đọc Set 11 (FME Sourced: 4 bài đọc, 40 câu hỏi, giải thích tiếng Việt) vào `src/features/reading/data/fmeDe11.ts`
- [x] Trích xuất và cấu trúc hóa 5 kỳ thi Nói tháng 5 vào `src/features/speaking/data/speakingBank.ts` (Part 1, 2, 3)
- [x] Cấu trúc hóa ngân hàng đề Viết vào `src/features/writing/data/writingBank.ts` (Task 1: 3 Thư, Task 2: 2 Bài luận kèm bài mẫu B2/C1)
- [x] Điều phối đề thi thử liên hoàn 180 phút Mock Test 01 tại `src/data/mock-tests/mockTest01.ts`
- [x] Tách biệt kiến trúc Listening Studio: Card 4 Mock Test sở hữu trọn bộ 7 Đề (35 câu/đề, continuous audio) tại `src/features/listening/data/mockTests/`; Cards 1-3 dành riêng cho discrete part drills


## SPRINT: LUYỆN ĐỌC CÓ HỖ TRỢ (ASSISTED READING STUDIO)

### Kiến trúc Unified Reading Runner & Giao diện Split-Pane
- [ ] Xây dựng `ReadingRunner` hỗ trợ 2 chế độ: `mode: 'practice'` (bật tra từ/dẫn chứng/paraphrase) và `mode: 'exam'` (giao diện chuẩn phòng thi, khóa tra từ)
- [ ] Bố cục Split-Pane chia đôi màn hình: Bài đọc bên trái cuộn độc lập, bảng 40 câu hỏi bên phải
- [ ] Tùy chỉnh hiển thị: Chỉnh cỡ chữ, giãn dòng và chế độ nền (Sepia/Dark/Light)

### Tra từ Nhanh (1-Tap Dictionary Tooltip)
- [ ] Nhấn/chạm vào từ tiếng Anh trong bài đọc hiển thị tooltip tra nghĩa tức thì trong 0ms
- [ ] Hỗ trợ tra từ offline qua từ điển JSON đóng gói sẵn kèm tra cứu nâng cao qua Free Dictionary API (không ghi rác vào hàng đợi SRS)

### Phân loại 5 Dạng Câu hỏi & Highlight Dẫn chứng
- [ ] Phân loại 5 dạng câu hỏi đọc hiểu: Main Idea, Vocab in Context, Factual Details, Inference, Author Attitude
- [ ] Tự động highlight câu văn gốc chứa dẫn chứng trong bài đọc tương ứng với câu hỏi đang chọn
- [ ] Bảng phân tích hiện tượng Paraphrase giữa bài đọc và đáp án đúng
- [ ] Chế độ áp lực thời gian (Time Pressure Mode): Đếm ngược 15 phút/bài đọc (~500 từ, 10 câu)
- [ ] Run audit codebase check sau khi hoàn thành kỹ năng Đọc (Reading)

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
