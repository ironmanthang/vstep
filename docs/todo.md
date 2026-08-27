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

### Cấu hình AI Provider Hub & Master Gateway
- [x] Xây dựng Master AI Gateway hỗ trợ OpenRouter, Ollama Cloud và Google AI Studio với Key Pool rotation (xem [ai_gateway.md](file:///d:/program/vstep/docs/architecture/ai_gateway.md))
- [x] Xây dựng Settings UI: Bảng chẩn đoán trạng thái AI Gateway, đo độ trễ Ping (ms), chế độ Override nâng cao cho Dev
- [x] Xây dựng tính năng Kiểm tra kết nối (Test Connection / Health Check) cho Master Gateway và từng provider
- [x] Xây dựng lớp dịch vụ `AIServiceAdapter` chuẩn hóa request/response và xử lý fallback tự động

### Cấu hình PWA & Quản lý Dữ liệu Client
- [x] Cấu hình Web App Manifest (manifest.webmanifest) hỗ trợ Add to Home Screen (Standalone Mode)
- [x] Cấu hình Service Worker cache tĩnh App Shell, font và static assets
- [ ] Điều chỉnh thứ tự hiển thị kỹ năng toàn app: Nghe (Listening) → Đọc (Reading) → Viết (Writing) → Nói (Speaking)

### Module Flashcard SRS Cốt lõi (Curated VSTEP SRS)
- [x] Flashcard SRS: Thuật toán Spaced Repetition (1-3-7-14-30), hiệu ứng 3D Flip Card
- [x] Tích hợp hệ thống Toast notifications phản hồi học tập
- [x] Xây dựng bộ ngữ liệu 1.500 từ vựng cốt lõi trích xuất từ đề thi thật ULIS/HNUE theo 8 chủ đề VSTEP chuẩn (188 Edu, 188 Work, 188 Health, 188 Env, 187 Tech, 187 Travel, 187 Soc, 187 Media)
- [x] Xây dựng Daily Review Queue hiển thị số thẻ cần ôn tập hôm nay và thống kê tiến độ học
- [x] Tích hợp Supabase Cloud Sync & Auth Modal để đồng bộ thẻ và thống kê học tập thời gian thực qua tài khoản Google/Email
- [ ] Tăng số lượng từ lên 3000

### Kiểm thử & Tối ưu Nền tảng (DoD Verification)
- [x] Unit Test thuật toán Spaced Repetition (SRS algorithm) qua Vitest
- [x] Thiết lập Pre-push pipeline tự động (scripts/prepush.mjs + .githooks/pre-push)
- [x] Thiết lập CI/CD GitHub Actions workflow (.github/workflows/ci.yml)
- [x] Thiết lập kịch bản tự động hóa database migration Supabase (scripts/migrate.mjs + pnpm db:migrate)
- [ ] Đạt điểm số Google Lighthouse > 90 (Performance, Accessibility, SEO) và tối ưu PWA Standalone

## SPRINT: LUYỆN NGHE CHỦ ĐỘNG (ASSISTED LISTENING STUDIO)

### Kiến trúc Unified Listening Runner
- [ ] Xây dựng `ListeningRunner` hỗ trợ 2 chế độ: `mode: 'practice'` (bật tua/dictation/manh mối) và `mode: 'exam'` (chỉ phát audio chuẩn, khóa phụ đề và manh mối)
- [ ] Tích hợp Question Palette cho 35 câu trắc nghiệm 3 Part

### Custom Audio Player & Điều khiển Nghe
- [ ] Xây dựng Custom Audio Player: Nút tua ±5s, thanh chỉnh tốc độ (0.75x, 1.0x, 1.25x), thanh tiến trình scrub
- [ ] Tích hợp phím tắt điều khiển bàn phím (`Space` Play/Pause, `Alt+Left` / `Alt+Right` tua 5s)

### Luyện tập theo 3 Part Chuyên biệt
- [ ] Part 1 Drill: 8 đoạn ngắn, nhận diện bẫy số liệu và thay đổi thông tin phút chót
- [ ] Part 2 Drill: 3 đoạn hội thoại, bắt Topic Sentence và từ khóa chuyển ý
- [ ] Part 3 Drill: 3 bài giảng học thuật, cung cấp Summary Outline đối chiếu ghi chú

### Chế độ Dictation (Nghe chép chính tả)
- [ ] Cắt audio thành từng câu 3–7s với giao diện nhập liệu trực quan
- [ ] Bộ so khớp ký tự Client-side hiển thị màu: xanh (đúng), đỏ (sai chính tả/âm đuôi), vàng (thiếu từ nối/mạo từ)

### Transcript Song ngữ & Phân tích Manh mối
- [ ] Đồng bộ hiển thị chữ theo thời gian phát audio
- [ ] Tự động gạch chân câu chứa đáp án (Key Clue) và phân tích lý do các phương án sai (Distractor Breakdown)

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
- [ ] Tầng 2: LLM Evaluator chấm 4 tiêu chí MOET theo Strict JSON Schema (xem [writing_pipeline.md](file:///d:/program/vstep/docs/architecture/writing_pipeline.md))
- [ ] Vietlish Engine nhận diện 3 nhóm lỗi tư duy tiếng Việt (Dịch thô, Thiếu chủ ngữ, Sai collocation)
- [ ] Giao diện bôi màu nhận xét: Đỏ (Ngữ pháp), Tím (Vietlish), Vàng (Từ vựng), Xanh lá (Khen ngợi)
- [ ] Sinh bài mẫu viết lại (Revised Essay) nâng band từ ý tưởng gốc của học viên
- [ ] Unit Test bộ đếm từ và kiểm tra tỷ lệ n-gram sao chép đề bài
- [ ] Unit Test bộ parser phản hồi AI Strict JSON Schema

## SPRINT: LUYỆN NÓI TƯƠNG TÁC (INTERACTIVE SPEAKING STUDIO)

### Kiến trúc Unified Speaking Runner & Phòng thu BEEP
- [ ] Xây dựng `SpeakingRunner` hỗ trợ 2 chế độ: `mode: 'practice'` (luyện từng part, xem gợi ý P-E-E-R, chấm tức thì) và `mode: 'exam'` (liên tục 3 Part 12 phút, chuẩn phòng thi)
- [ ] Đồng hồ đếm ngược thời gian thực: Chuẩn bị (1p) và Ghi âm (2p) theo từng Part
- [ ] Tích hợp âm hiệu BEEP bắt đầu và kết thúc chuẩn phòng máy Bộ GD&ĐT

### Thu âm Trình duyệt & Web Audio Acoustic Metrics
- [ ] Ghi âm trình duyệt qua `MediaRecorder`, trực quan hóa sóng âm thời gian thực, nén file `audio/webm`
- [ ] Client Acoustic Metrics qua Web Audio API: Đo WPM (chuẩn 110–150 WPM), đo thời lượng nói và khoảng lặng (>2s)

### Pipeline Chấm Speaking qua Gemini Native Audio
- [ ] Gửi trực tiếp audio blob lên Gemini Native Audio API để đánh giá 5 tiêu chí MOET (xem [speaking_pipeline.md](file:///d:/program/vstep/docs/architecture/speaking_pipeline.md))
- [ ] Xuất Radar Chart 5 trục trực quan hóa điểm mạnh/yếu
- [ ] Phonetic Highlighting: Bôi đỏ từ phát âm sai / thiếu phụ âm cuối kèm phát âm mẫu IPA
- [ ] Gợi ý dàn ý mở rộng P-E-E-R và bài nói mẫu nâng band B2/C1
- [ ] Tối ưu Lazy loading audio processor và module Speaking

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
