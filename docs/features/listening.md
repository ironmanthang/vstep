# ĐẶC TẢ TÍNH NĂNG: LUYỆN NGHE (LISTENING STUDIO)

## Cấu trúc Bài thi Nghe VSTEP (35 Câu / 40 Phút)
- **Part 1 (8 câu)**: 8 đoạn thông báo / hướng dẫn ngắn (sân bay, thời tiết, mua sắm). Rèn luyện bắt chi tiết nhanh (con số, giờ giấc, thay đổi thông tin phút chót).
- **Part 2 (12 câu)**: 3 đoạn hội thoại đời sống / công sở (mỗi đoạn 4 câu). Rèn luyện nhận diện mối quan hệ nhân vật và từ khóa chuyển ý (however, actually, on second thought).
- **Part 3 (15 câu)**: 3 bài giảng / thuyết trình học thuật (mỗi bài 5 câu). Rèn luyện kỹ năng ghi chú nhanh (Note-taking) và nắm bắt cấu trúc triển khai bài giảng.

## Kiến trúc Unified Listening Runner
Mô-đun được triển khai tập trung tại [`src/features/listening/`](file:///d:/program/vstep/src/features/listening) với component cốt lõi [`ListeningRunner.tsx`](file:///d:/program/vstep/src/features/listening/ListeningRunner.tsx):
- **Practice Mode (`mode: 'practice'`)**:
  - Dòng câu hỏi đơn trang hợp nhất (Unified Question Stream): Bỏ hoàn toàn tab-switcher để người học tập trung giải quyết câu hỏi tại chỗ.
  - Phân đoạn nhóm bài nghe ([`PassageGroupHeader.tsx`](file:///d:/program/vstep/src/features/listening/components/PassageGroupHeader.tsx)): Tự động gom nhóm các câu hỏi cùng bài nghe (Part 2: 4 câu/hội thoại, Part 3: 5 câu/bài giảng), hiển thị dải thời lượng và nút bấm phát nhanh audio phân đoạn.
  - Nhảy audio trực tiếp từng câu: Bấm vào mốc thời gian tại badge "Câu X" để tua và phát ngay đoạn audio liên quan đến câu hỏi đó.
  - Khung ghi chú nháp từ khóa (Scratchpad): Nằm ngay dưới mỗi câu hỏi, tự động co giãn dòng theo nội dung nhập (Enter), lưu trữ tạm thời theo state để người học ghi lại từ khóa quan trọng khi nghe.
  - Lời thoại và manh mối mở rộng (Inline Collapsible Transcript): Nằm dưới mỗi câu hỏi, cho phép bật/tắt lời thoại gốc tiếng Anh, bản dịch tiếng Việt và hiển thị trực tiếp dẫn chứng giải thích đáp án đúng.
  - Audio Player thông minh: Tua lại ±5s, chỉnh tốc độ (0.5x, 0.75x, 1.0x, 1.5x, 2.0x), hỗ trợ phím tắt bàn phím (`Space` Play/Pause, `←` / `→` tua ±5s).
- **Exam Mode (`mode: 'exam'`)**:
  - Khóa toàn bộ các nút tua/pause (audio phát 1 lần liên tục theo đúng tiến trình phòng thi Bộ GD&ĐT).
  - Khóa toàn bộ khung ghi chú nháp, nút nhảy audio phân đoạn, lời thoại và manh mối giải thích.
  - Tự động nộp bài và khóa màn hình khi hết thời lượng audio; sau khi nộp chỉ hiển thị bảng điểm tổng kết và kết quả đúng/sai từng câu.

## Bộ Công cụ Hỗ trợ Luyện Sâu (Scaffolding Tools)
- **Sticky Custom Audio Player ([`CustomAudioPlayer.tsx`](file:///d:/program/vstep/src/features/listening/components/CustomAudioPlayer.tsx), [`useAudioPlayer.ts`](file:///d:/program/vstep/src/features/listening/useAudioPlayer.ts))**:
  - Tự động ghim (sticky) cố định trên đầu trang khi cuộn câu hỏi, giúp thí sinh điều chỉnh phát lại và tốc độ bất kỳ lúc nào.
  - Hỗ trợ thao tác cảm ứng trên Mobile PWA với giao diện thu gọn và phím tắt tiện lợi trên Desktop kèm guard chặn khi focus vào input.
  - Âm thanh phản hồi xúc giác qua Web Audio API ([`playAudioFeedbackChime`](file:///d:/program/vstep/src/features/listening/useAudioPlayer.ts)).
  - Phát trực tiếp master exam audio: `vstep-test-1.mp3` đến `vstep-test-7.mp3` (continuous master exams).
- **Passage Group Header ([`PassageGroupHeader.tsx`](file:///d:/program/vstep/src/features/listening/components/PassageGroupHeader.tsx))**:
  - Xác định ranh giới hội thoại/bài giảng trong Part 2 và Part 3 dựa trên mapping `is_clue_for_question` trong transcript.
  - Cung cấp nút phát audio phân đoạn kèm mốc thời gian bắt đầu - kết thúc rõ ràng.
- **Inline Scratchpad Note-Taking**:
  - Thiết kế viền cam hổ phách dạng nét đứt và thanh nhấn bên trái, phân biệt hoàn toàn với các nút lựa chọn phương án A, B, C, D.
  - Tối ưu không gian dọc với chiều cao 1 dòng mặc định và tự mở rộng mượt mà khi gõ nhiều dòng.
- **Inline Collapsible Transcript & Clue Callout**:
  - Hiển thị toàn văn đoạn hội thoại/bài giảng khi cần kiểm tra ngữ cảnh kèm nút ẩn/hiện bản dịch tiếng Việt.
  - Box dẫn chứng làm nổi bật câu trả lời và phân tích chi tiết lý do chọn đáp án.
- **Chữa Đề & Luyện Sâu Full Mock Tests (Đề 1–7)**:
  - Tích hợp trọn bộ 7 đề thi thử chuẩn 35 câu (tổng 245 câu hỏi) trực tiếp trong Listening Studio với bộ chọn đề (`[Đề 1 (35 câu)]` đến `[Đề 7 (35 câu)]`).

## Bộ Dữ liệu & Kiểm thử
- **Ngân Hàng Dữ Liệu Nghe Chuẩn Hóa ([`src/features/listening/data/`](file:///d:/program/vstep/src/features/listening/data))**:
  - `mockTests/`: 7 bộ đề thi thử toàn diện 35 câu (`mockTest01.ts` đến `mockTest07.ts`), xuất qua `ALL_VSTEP_LISTENING_MOCK_TESTS`. Mỗi đề gồm 35 câu hỏi, file audio master liên tục, transcript song ngữ sub-second, clue câu hỏi và giải thích đáp án chi tiết.
  - `drills/hcmue/`: Thư mục chứa 15 bộ đề luyện tập discrete theo kỹ năng riêng biệt từ HCMUE 20 Mock Tests:
    - `part1/`: 5 đề Thông báo & Hướng dẫn ngắn (`hcmuePart1_01.ts` đến `05.ts`, 40 câu hỏi, audio 256kbps stereo độc lập, transcript sub-second).
    - `part2/`: 5 đề Hội thoại đời sống (`hcmuePart2_01.ts` đến `05.ts`, 60 câu hỏi qua 15 đoạn hội thoại).
    - `part3/`: 5 đề Bài giảng học thuật (`hcmuePart3_01.ts` đến `05.ts`, 75 câu hỏi qua 15 bài giảng).
  - `part1Bank.ts`, `part2Bank.ts`, `part3Bank.ts`: Modular barrel files xuất các mảng chính thức `ALL_LISTENING_PART1_TESTS`, `ALL_LISTENING_PART2_TESTS`, `ALL_LISTENING_PART3_TESTS`.
  - Nguồn gốc dữ liệu & tài liệu chứng minh: Xem [`docs/sources/listening/README.md`](file:///d:/program/vstep/docs/sources/listening/README.md).
- **Kiến trúc Phân phối & Truyền phát Âm thanh (Streaming CDN & Local Cache)**:
  - **Production (`https://vstep.pages.dev/`)**: 22 luồng âm thanh chính thức (7 đề thi thử toàn diện + 15 bộ bài tập discrete) được phân phối qua Cloudflare Pages [`public/_redirects`](file:///d:/program/vstep/public/_redirects). Mọi endpoint `/audio/listening/*` được chuyển hướng HTTP 302 sang Cloudflare R2 CDN bucket, hỗ trợ `206 Partial Content`, `Accept-Ranges: bytes` và `Access-Control-Allow-Origin: *` cho phép tua và phát lại mượt mà với chi phí băng thông $0 (zero egress).
  - **Local Development**: File audio vật lý nằm tại [`public/audio/listening/`](file:///d:/program/vstep/public/audio/listening) (được bỏ qua trong `.gitignore`), giúp Vite dev server phục vụ offline lập tức mà không làm phình Git repository (< 3 MB).
- **Hạ tầng Tự động hóa Kiểm thử & Đồng bộ Mốc thời gian (Timestamp Alignment & Verification)**:
  - **Hạ tầng Ingestion 2 giai đoạn (`scripts/transcribe_listening.py` & `scripts/enrich_listening.mjs`)**:
    - **Stage 1 Transcription (`transcribe_listening.py`)**: Ưu tiên Groq Cloud Whisper (`whisper-large-v3-turbo`) xử lý 25 phút audio chỉ trong ~2.5 giây, tự động fallback sang `faster-whisper` (CTranslate2 `int8` trên 8 CPU cores) khi offline hoặc truyền cờ `--local`.
    - **Stage 2 Bilingual Enrichment (`enrich_listening.mjs`)**: Sử dụng Gemini Flash thế hệ mới với prompt văn bản thuần (<500 tokens) để định dạng lượt đối thoại (`Man/Woman`) và dịch tiếng Việt tự nhiên mà không tốn quota upload file hay gặp lỗi 429.
    - **Tải tài nguyên mẫu tập trung (`scripts/download-assets.ps1`)**: Hỗ trợ tải idempotent mock tests, HCMUE drills và PDF answer keys với cờ `-Target all|hcmue|mock|pdf`.
  - **Kịch bản kiểm thử toàn diện (`scripts/verify-all-listening.mjs` / `pnpm run verify:listening`)**:
    - Tự động quét (Dynamic Discovery) toàn bộ 22 bộ đề thi (15 đề discrete HCMUE Part 1-3 + 7 Full Mock Tests 35 câu).
    - Xác thực sự tồn tại của file audio vật lý và đối soát độ lệch thời lượng với `ffprobe` (ngưỡng cho phép < 3s).
    - Kiểm tra tính tuần tự nghiêm ngặt của `start_ms` và `end_ms`, triệt tiêu hoàn toàn phân đoạn âm hoặc chồng chéo (`start_ms < prev_end_ms`).
    - Kiểm tra độ bao phủ manh mối câu hỏi (`is_clue_for_question` phủ đủ 100% câu hỏi).
    - Bảo vệ chống bẫy bài đọc mẫu Part 1 (Example Trap Guard): Đảm bảo Câu 1 luôn bắt đầu sau đoạn đọc hướng dẫn (~120.000ms), không bị gán nhầm vào 00:00.
  - **Kiểm định âm học chuyên sâu bằng AI (`scripts/master_listening_audit.py` / `pnpm run audit:listening`)**:
    - Sử dụng mô hình nhận diện giọng nói cục bộ (`faster-whisper` CTranslate2) và thuật toán ma trận tương đồng phân đoạn (cross-segment token similarity) để đối soát trực tiếp nội dung âm thanh vật lý với transcript.
    - Phát hiện và hiệu chỉnh hoàn toàn các sai lệch âm học: đảo vị trí câu hỏi 6/7 trong HCMUE Part 1 Đề 01, loại bỏ khoảng lặng đọc đề trong HCMUE Part 2 Đề 01, khôi phục đoạn bài giảng bị khuyết và hiệu chỉnh lệch mốc thời gian 100s trong HCMUE Part 3 Đề 04 (*Watership Down*) và Đề 05 (*Federal Arts Project*).
    - Đạt tỷ lệ đồng bộ âm học 100% trên toàn bộ 168 phân đoạn lời thoại của 22 bộ đề.
  - **Xuất dữ liệu tự động (`scripts/export_all_listening.mjs` / `pnpm run export:listening`)**:
    - Tự động trích xuất toàn bộ dữ liệu 22 đề thành file JSON `scripts/all_listening_data.json` phục vụ các kịch bản kiểm toán offline.
- **Unit Tests (`listening.test.ts`)**: Bộ bài kiểm thử tự động xác thực tính toàn vẹn 100% câu hỏi (245 câu mock tests + 175 câu discrete drills = 420 câu hỏi chuẩn hóa), official answer keys, tính tăng dần của timestamp và tính nhất quán của metadata.
