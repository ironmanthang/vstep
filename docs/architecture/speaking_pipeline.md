# KIẾN TRÚC PIPELINE CHẤM SPEAKING (GOOGLE GEMINI NATIVE AUDIO)

## Luồng Xử lý 2 Tầng Tối ưu Chi phí & Độ trễ
- **Tầng 1: Client Acoustic Metrics (Web Audio API, 0đ, 0ms)**:
  - Đo tốc độ nói WPM (chuẩn phòng thi VSTEP: 110 – 150 WPM).
  - Đo tổng thời lượng nói thực tế và đếm số lượng khoảng lặng chết (> 2s).
  - Trực quan hóa sóng âm thời gian thực trên Canvas.
- **Tầng 2: Google Gemini Native Audio Evaluation**:
  - Gửi trực tiếp audio blob (`audio/webm`) lên Google Gemini Native Audio API với Structured Output JSON Schema.
  - Gemini thực hiện đa phương thức một lượt (Single-shot Multimodal): Nhận dạng âm vị, phân tích ngữ điệu/trọng âm/phụ âm cuối, đánh giá ngữ pháp, từ vựng và triển khai luận điểm theo Barem 5 tiêu chí MOET (chi tiết tiêu chí tại [exam_format.md](file:///d:/program/vstep/docs/exam_format.md)).
  - Thời gian phản hồi < 10 giây với độ chính xác cao mà không cần hệ thống chuyển văn bản (STT) trung gian.

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
