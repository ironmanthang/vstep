# KIẾN TRÚC PIPELINE CHẤM SPEAKING (GEMINI 3.5 FLASH LITE NATIVE AUDIO)

## Luồng Xử lý 3 Tầng Chuẩn Hóa (3-Tier Speaking Architecture)

### Tầng 1: Client Acoustic Capture & Native IndexedDB Storage (< 50ms, Client-side)
- **Đàm phán định dạng an toàn (Safe Dynamic MIME Detection)**:
  - Kiểm tra `MediaRecorder.isTypeSupported()` theo thứ tự: `audio/webm;codecs=opus` $\rightarrow$ `audio/webm` $\rightarrow$ `audio/mp4`.
  - Hoạt động ổn định 100% trên Laptop (Windows/Mac/Linux), Android và iOS Safari mà không phụ thuộc codec ngoài.
- **Bộ đệm lưu trữ nhị phân IndexedDB (`src/features/speaking/speakingStorage.ts`)**:
  - Lưu trực tiếp từng đoạn ghi âm dạng `Blob` nguyên bản vào IndexedDB theo `(testId, partIndex)`.
  - Loại bỏ hoàn toàn việc lưu base64 vào `localStorage` nhằm triệt tiêu lỗi tràn hạn ngạch 5MB quota và hiện tượng giật lag luồng UI.
  - Chỉ mã hóa base64 trong bộ nhớ tạm (in-memory) ngay trước thời điểm gửi payload lên AI API.
- **Client Acoustic Metrics & Sóng âm (Web Audio API)**:
  - Trực quan hóa sóng âm micro thời gian thực trên Canvas.
  - Đo chính xác thời lượng nói thực tế (giây) và đếm số lượng khoảng lặng kéo dài (> 2s) qua bộ phân tích biên độ RMS.
- **Âm hiệu BEEP chuẩn phòng máy Bộ GD&ĐT**:
  - Tự động sinh âm báo BEEP (800Hz / 200ms) bằng Web Audio API `OscillatorNode` độc lập, không phụ thuộc file MP3 tĩnh ngoài mạng.

### Tầng 2: Single-Shot Multimodal AI Evaluation (`gemini-3.5-flash-lite`, Strict JSON Schema)
- **Mô hình & Cấu hình**: Chuẩn hóa trên `gemini-3.5-flash-lite` qua Google AI Studio REST API với `inlineData: { mimeType, data: base64 }`, `temperature = 0.1`.
- **Triết lý Single-Shot (Không dùng Dual-Call Transcribe trung gian)**:
  - Không phân tách thành 2 lượt gọi (Transcribe $\rightarrow$ Grade) nhằm tránh nhân đôi độ trễ (lên tới 8-12s), tiêu hao hạn ngạch 15 RPM và tạo thêm điểm lỗi (point of failure).
  - VSTEP Speaking là bài thi độc thoại (Monologue), tính năng Speaker Diarization là dư thừa.
  - `gemini-3.5-flash-lite` tiếp nhận trực tiếp file âm thanh nguyên bản, đồng thời bóc tách transcript, phân tích âm học (trọng âm, phụ âm đuôi, ngữ điệu) và trả về kết quả trong ~5-6s.
- **Chuẩn hóa Bậc 3 (B1 Pass Gate)**:
  - Đánh giá theo 4 tiêu chí Quyết định 729/QĐ-BGDĐT: Pronunciation (25%), Fluency & Coherence (25%), Grammar & Vocabulary (25%), Task Fulfillment (25%).
  - Chấp nhận tốc độ nói vừa phải (90 - 120 WPM), ngập ngừng ngắn khi tìm từ, và các lỗi phát âm nhỏ không làm cản trở việc truyền tải ý chính.
- **Quy tắc sinh bằng chứng trước điểm số (Evidence-First Output Ordering)**:
  - `transcript`: Toàn văn lời nói của thí sinh được bóc tách nguyên văn.
  - `detected_wpm`: Tốc độ nói thực tế (tổng số từ / thời lượng nói tính bằng phút).
  - `prompt_coverage`: Phân tích mức độ bao phủ các ý yêu cầu của đề bài.
  - `priority_action_items`: 2 đến 3 trọng tâm hành động thực tế bằng tiếng Việt giúp học viên vượt ngưỡng B1.
  - `phonetic_errors`: Danh sách các từ phát âm sai, thiếu âm đuôi (`/s/`, `/ed/`, `/t/`), hoặc sai trọng âm kèm phiên âm IPA chuẩn và giải thích cách sửa bằng tiếng Việt.
  - `justifications`: Nhận xét định tính cho 4 tiêu chí MOET.
  - `criteria_scores`: Điểm số 4 tiêu chí trên thang 0.0 - 10.0.
  - `ai_fixed_b1_speech`: Viết lại bài nói của học viên thành phiên bản nói chuẩn B1 từ chính ý tưởng gốc, sửa sạch lỗi ngữ pháp và từ vựng, cung cấp câu văn đơn/ghép tự nhiên, dễ phát âm.

### Tầng 3: Deterministic Composite Scoring & Persistence (TypeScript Runtime)
- **Công thức tính điểm chuẩn MOET**:
  - `Speaking Score = (Pronunciation + Fluency + Grammar_Vocab + Task_Fulfillment) / 4`.
- **Làm tròn chuẩn 0.5**: Áp dụng quy tắc làm tròn chính thức của Bộ GD&ĐT (<0.25 $\rightarrow$ .0, 0.25 - 0.74 $\rightarrow$ .5, $\ge$0.75 $\rightarrow$ 1.0).
- **Dọn dẹp bộ nhớ**: Sau khi chấm điểm thành công, giải phóng bộ nhớ IndexedDB của phiên làm bài.
