# LỘ TRÌNH PHÁT TRIỂN (PRODUCT ROADMAP)

Tài liệu này xác định các giai đoạn phát triển, nguyên tắc ưu tiên và tiêu chuẩn hoàn thành (Definition of Done) cho nền tảng luyện thi VSTEP PWA. Chi tiết đầu việc theo Sprint xem tại [todo.md](file:///d:/program/vstep/docs/todo.md).

## Nguyên tắc Ưu tiên & Kiến trúc Cốt lõi
- **P1 (Foundation & Curated SRS)**: App Shell PWA, Master AI Gateway (Google AI, OpenRouter, Ollama Cloud) với Key Pool rotation, Flashcard SRS 3.000 từ cốt lõi trích xuất từ đề thi thật ULIS/HNUE/HCMUE theo 8 chủ đề VSTEP.
- **P2 (Assisted Listening Studio)**: Unified Listening Runner (`mode: 'practice' | 'exam'`), Custom Audio Player có tua ±5s, phân đoạn nhóm bài nghe (Passage Headers), Scratchpad ghi chú nháp và Transcript song ngữ gạch chân Key Clues.
- **P3 (Assisted Reading Studio)**: Unified Reading Runner (`mode: 'practice' | 'exam'`), Split-Pane cuộn độc lập, 1-Tap Dictionary (tooltip tra từ tức thì, không lưu rác vào SRS), phân tích 5 dạng câu hỏi đọc hiểu và Highlight dẫn chứng.
- **P4 (Scaffolded Writing & Vietlish AI)**: Unified Writing Runner (`mode: 'practice' | 'exam'`), Editor đếm từ và auto-save bản nháp 5s, Pipeline chấm 3 tầng, chuẩn hóa B1 pass gate và Vietlish Engine 3 nhóm lỗi.
- **P5 (Interactive Speaking Studio)**: Unified Speaking Runner (`mode: 'practice' | 'exam'`), phòng thu đếm ngược kèm âm báo BEEP chuẩn Bộ GD&ĐT, Web Audio API acoustic metrics và Gemini 3.5 Flash Lite Native Audio pipeline chấm 5 tiêu chí MOET.
- **P6 (Full Mock Test & Exam Orchestrator)**: Mock Exam Orchestrator điều phối 4 Skill Runner liên hoàn 180 phút (`mode: 'exam'`), Question Palette 40 câu kèm Flag, khóa toàn bộ công cụ hỗ trợ và công thức làm tròn 0.5 MOET.

## Quy chuẩn Hoàn thành Toàn diện (Continuous Definition of Done)
Chất lượng, hiệu năng và kiểm thử không tổ chức thành giai đoạn riêng lẻ mà là điều kiện tiên quyết (DoD) bắt buộc phải đạt được trước khi nghiệm thu từng Sprint:
- **Hiệu năng & Tối ưu**: Google Lighthouse > 90 (Performance, Accessibility, Best Practices, SEO) và Lazy loading cho các module nặng.
- **PWA & Responsive**: Giao diện thích ứng mượt mà trên Mobile / Tablet / Desktop, hỗ trợ cài đặt PWA Standalone.
- **Độ tin cậy & Kiểm thử**: Bộ kiểm thử đơn vị (Unit Tests qua Vitest) cho toàn bộ thuật toán cốt lõi, pre-push hook và CI/CD pass 100%.

## Kiến trúc Unified Headless Skill Runner
- **Nguyên lý DRY & Modularity**: Mỗi kỹ năng (Listening, Reading, Writing, Speaking) được đóng gói thành một Unified Runner duy nhất nhận tham số `mode: 'practice' | 'exam'`.
- **Practice Mode**: Kích hoạt toàn bộ công cụ hỗ trợ (Scaffolding UI: gợi ý dàn ý, tua lại audio, tra từ nhanh, phân tích dẫn chứng và nhận xét tức thì).
- **Exam Mode**: Tự động khóa toàn bộ công cụ trợ giúp, kích hoạt đồng hồ đếm ngược nghiêm ngặt, tự động thu bài và chuyển tiếp liên hoàn giữa 4 kỹ năng trong phòng thi thử 180 phút.

## Các Giai đoạn Phát triển

### Giai đoạn: Khung Nền tảng & Flashcard SRS (Foundation & Curated SRS)
- **Trọng tâm**: Hoàn thiện App Shell PWA, Master AI Gateway với Key Pool rotation, Flashcard SRS 3.000 từ trích xuất từ đề thi thật ULIS/HNUE/HCMUE theo 8 chủ đề VSTEP.
- **Tiêu chuẩn hoàn thành (Definition of Done)**:
  - Người học cài đặt được PWA và ôn tập Flashcard hàng ngày trên điện thoại.
  - Master AI Gateway kiểm tra kết nối, đo độ trễ chuẩn xác và tự động xoay vòng Key.
  - Thuật toán Spaced Repetition (1-3-7-14-30) và Daily Review Queue hoạt động chính xác kèm unit tests xác thực.

### Giai đoạn: Luyện Nghe Chủ động (Assisted Listening Studio)
- **Trọng tâm**: Xây dựng Unified Listening Runner (`mode: 'practice' | 'exam'`), Custom Audio Player tua ±5s, chỉnh tốc độ (0.5x–2.0x), luồng câu hỏi đơn trang (Single-Page Stream), phân đoạn hội thoại/bài giảng (PassageGroupHeader), Scratchpad ghi chú nháp và Transcript song ngữ mở rộng.
- **Tiêu chuẩn hoàn thành (Definition of Done)**:
  - Audio Player chuyển câu, tua ±5s tức thì, ổn định trên cả Mobile và Desktop.
  - Phân đoạn bài nghe tự động nhận diện ranh giới hội thoại/bài giảng kèm nút phát nhanh.
  - Khung ghi chú nháp và transcript mở rộng tại chỗ dưới mỗi câu hỏi, hiển thị rõ Key Clues và bản dịch song ngữ.

### Giai đoạn: Luyện Đọc có Hỗ trợ (Assisted Reading Studio)
- **Trọng tâm**: Xây dựng Unified Reading Runner (`mode: 'practice' | 'exam'`), Split-Pane (bài đọc trái, câu hỏi phải), 1-Tap Dictionary (tooltip tra nghĩa tức thì hỗ trợ offline), 5 dạng câu hỏi đọc hiểu và Time Pressure Mode (15p/bài).
- **Tiêu chuẩn hoàn thành (Definition of Done)**:
  - Nhấn vào từ tiếng Anh hiển thị popup tra nghĩa tức thì trong 0ms.
  - Tự động bôi màu dẫn chứng trong bài đọc và phân tích paraphrase tương ứng với câu hỏi.
  - Hỗ trợ cuộn độc lập giữa bài đọc và khung câu hỏi, tự thích ứng trên màn hình nhỏ.

### Giai đoạn: Luyện Viết với Giàn giáo (Scaffolded Writing & Vietlish AI)
- **Trọng tâm**: Xây dựng Unified Writing Runner (`mode: 'practice' | 'exam'`), Trình soạn thảo đếm từ thời gian thực, Auto-save mỗi 5s vào LocalStorage, Pipeline chấm Writing 3 tầng, chuẩn hóa B1 pass gate, sinh AI-Fixed B1 Essay và Vietlish Engine 3 nhóm.
- **Tiêu chuẩn hoàn thành (Definition of Done)**:
  - AI phản hồi kết quả chấm Writing 4 tiêu chí MOET dưới 6 giây kèm unit test parser schema.
  - Bôi màu nhận xét trực quan theo 4 nhóm (Đỏ: Ngữ pháp, Tím: Vietlish, Vàng: Nâng cấp từ, Xanh: Khen ngợi).
  - Tự động lưu bản nháp mỗi 5 giây chống mất dữ liệu khi mất kết nối.
  - Tích hợp 7 đề thi authentic ULIS (`ulisWritingTest01.ts` – `07.ts`) kèm bài mẫu hội đồng khảo thí.

### Giai đoạn: Luyện Nói Tương tác (Interactive Speaking Studio)
- **Trọng tâm**: Xây dựng Unified Speaking Runner (`mode: 'practice' | 'exam'`), Bộ đệm nhị phân Native IndexedDB (`audio_blobs`), Phòng thu đếm ngược 1p/3p kèm âm báo BEEP Web Audio API chuẩn Bộ GD&ĐT, Kiến trúc Hybrid ASR (Groq Whisper `whisper-large-v3-turbo` + Gemini 3.5 Flash Lite Multimodal Native Audio), sinh AI-Fixed B1 Speech và tích hợp 7 đề thi authentic ULIS.
- **Tiêu chuẩn hoàn thành (Definition of Done)**:
  - Ghi âm trình duyệt an toàn qua MediaRecorder MIME dynamic detection, xuất biểu đồ sóng âm thời gian thực trên Canvas.
  - Lưu trữ audio nhị phân vào IndexedDB nguyên bản, ngăn chặn triệt để lỗi tràn hạn ngạch 5MB của localStorage.
  - AI phản hồi kết quả chấm Speaking dưới 8 giây, tính toán tốc độ nói WPM từ transcript thực tế và đối chiếu barem 4 tiêu chí Quyết định 729/QĐ-BGDĐT làm tròn 0.5.
  - Đối chiếu 3 chiều Side-by-Side: Bản ghi âm & Transcript học viên vs. AI-Fixed B1 Speech vs. Bài mẫu ULIS chính thức.
  - Trích xuất và tích hợp trọn vẹn 7 Đề thi Nói Authentic ULIS (`ulisSpeakingTest01.ts` – `07.ts`) từ ấn phẩm "7 Vstep Tests B1-B2-C1 Full Key".
  - Bộ kiểm thử 10 unit tests cho Tier 1 và Tier 3 pass 100%, pre-push verification pipeline hoàn tất không lỗi.

### Giai đoạn: Thi thử Thực chiến & Điều phối Phòng thi (Full Mock Test & Exam Orchestrator)
- **Trọng tâm**: Xây dựng Mock Exam Orchestrator điều phối 4 Skill Runner liên hoàn 180 phút (`mode: 'exam'`), Question Palette 40 câu kèm Flag, khóa toàn bộ công cụ hỗ trợ và tự động thu bài.
- **Tiêu chuẩn hoàn thành (Definition of Done)**:
  - Hoàn thành bài thi thử 4 kỹ năng 180 phút liên tục không gián đoạn.
  - Tự động tính điểm, làm tròn chuẩn 0.5 MOET kèm unit tests kiểm thử thuật toán.
  - Chế độ Review chi tiết hiển thị dẫn chứng câu đúng/sai và nhận xét toàn diện.

## Bảng Theo dõi Tiến độ Milestone

| Milestone | Trọng tâm | Trạng thái |
| :--- | :--- | :--- |
| **M1: Foundation & Curated SRS** | App Shell PWA, AI Master Gateway & Key Pool, Flashcard SRS 3.000 từ | Đã hoàn thành |
| **M2: Assisted Listening Studio** | Unified Listening Runner (`practice` \| `exam`), Audio Player ±5s, Scratchpad, Inline Transcript | Đã hoàn thành |
| **M3: Assisted Reading Studio** | Unified Reading Runner (`practice` \| `exam`), Split-Pane, 1-Tap Dict Tooltip, Highlights | Đã hoàn thành |
| **M4: Scaffolded Writing & Vietlish AI** | Unified Writing Runner (`practice` \| `exam`), Editor auto-save, Pipeline chấm 3 tầng, Vietlish, AI-Fixed B1 | Đã hoàn thành |
| **M5: Interactive Speaking Studio** | Unified Speaking Runner (`practice` \| `exam`), Countdown BEEP, IndexedDB buffer, Hybrid Groq Whisper + Gemini Audio, AI-Fixed B1, 7 Authentic ULIS Tests | Đã hoàn thành |
| **M6: Full Mock Test & Exam Orchestrator** | Mock Orchestrator 180p, Question Palette, Barem 0.5 MOET, Radar Chart | Đã hoàn thành |
