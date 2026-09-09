# KIẾN TRÚC PIPELINE CHẤM SPEAKING (GEMINI 3.5 FLASH LITE NATIVE AUDIO)

## Luồng Xử lý 2 Tầng Chuẩn Hóa
- **Tầng 1: Client Acoustic Metrics (Web Audio API, 0đ, 0ms)**:
  - Đo tốc độ nói WPM (chuẩn phòng thi VSTEP: 110 – 150 WPM).
  - Đo tổng thời lượng nói thực tế và đếm số lượng khoảng lặng chết (> 2s).
  - Trực quan hóa sóng âm thời gian thực trên Canvas.
- **Tầng 2: Single-Shot Multimodal Evaluation (`gemini-3.5-flash-lite`)**:
  - Gửi trực tiếp toàn bộ audio blob (`audio/webm`) đã ghi âm lên Google AI Studio (`gemini-3.5-flash-lite`) qua endpoint `generateContent` với Structured JSON Schema sau khi kết thúc lượt nói.
  - Loại bỏ hoàn toàn tầng Live Speech-to-Text / WebSocket trung gian: Bảo toàn tính xác thực phòng thi (thí sinh không bị phân tâm bởi phụ đề nhảy), giữ trọn vẹn dữ liệu âm học (trọng âm, ngữ điệu, âm đuôi) và tiết kiệm tối đa quota (chỉ 1 request/lượt nói, tận dụng hạn ngạch 500 RPD).
  - Gemini thực hiện đa phương thức một lượt (Single-shot Multimodal): Vừa xuất bản transcript bài nói để học viên tự xem lại, vừa chấm 5 tiêu chí MOET và phát hiện lỗi phát âm IPA cụ thể.
  - Thời gian phản hồi ~6 giây với độ chính xác cao.

## Cấu trúc Dữ liệu Phản hồi (Speaking Evaluation Schema)
- **Điểm số 5 Tiêu chí MOET (Thang điểm 0 - 10.0)**:
  - `pronunciation`: Độ rõ âm vị, trọng âm từ/câu, ngữ điệu, phụ âm đuôi.
  - `fluency`: Độ trôi chảy, tốc độ WPM, độ ngập ngừng và khoảng lặng.
  - `grammar`: Độ chính xác và đa dạng của cấu trúc câu.
  - `vocabulary`: Độ phong phú của vốn từ và độ chuẩn xác của collocations.
  - `topic_development`: Khả năng mở rộng ý, liên kết logic theo mô hình P-E-E-R.
- **Phân tích Âm vị (Phonetic Analysis)**:
  - Danh sách từ phát âm sai kèm phiên âm IPA chuẩn, từ học viên phát âm và vị trí âm vị bị thiếu.
- **Gợi ý Nâng band (B2/C1 Upgrade Sample)**:
  - Cung cấp bài nói mẫu hoàn chỉnh được nâng cấp từ ý tưởng gốc của học viên theo mô hình P-E-E-R (Point - Explanation - Example - Result).
