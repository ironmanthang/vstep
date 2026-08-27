# ĐẶC TẢ TÍNH NĂNG: PHÒNG THU LUYỆN NÓI (SPEAKING STUDIO)

## Cấu trúc Bài thi Nói VSTEP (3 Part / 12 Phút)
- **Part 1: Social Interaction (3 phút)**: 2 chủ đề đời sống cá nhân (mỗi chủ đề 3 câu hỏi ngắn).
- **Part 2: Solution Discussion (4 phút)**: 1 tình huống với 3 phương án lựa chọn (1 phút chuẩn bị, 3 phút trình bày giải pháp tối ưu và phản biện).
- **Part 3: Topic Development (5 phút)**: 1 chủ đề học thuật với sơ đồ tư duy (1 phút chuẩn bị, 3 phút phát triển chủ đề, 1 phút trả lời câu hỏi mở rộng).

## Kiến trúc Unified Speaking Runner
Mô-đun được đóng gói thành một `SpeakingRunner` duy nhất tiếp nhận tham số `mode`:
- **Practice Mode (`mode: 'practice'`)**:
  - Luyện tập từng Part riêng lẻ, cho phép chuẩn bị linh hoạt và ghi âm thử nhiều lần.
  - Nghe lại bản ghi âm trước khi nộp chấm điểm AI.
  - Xem gợi ý dàn ý P-E-E-R và mẫu câu phản biện cho Part 2 & Part 3.
  - Chấm điểm AI qua Gemini Native Audio trả về kết quả dưới 10 giây kèm Radar Chart 5 trục và bài nói mẫu nâng band.
- **Exam Mode (`mode: 'exam'`)**:
  - Chạy liên tục 3 Part theo đúng trình tự và thời gian nghiêm ngặt của phòng thi Bộ GD&ĐT.
  - Tự động phát âm báo BEEP chuẩn phòng thi khi bắt đầu và kết thúc thời gian nói.
  - Khóa tính năng nghe lại và gợi ý dàn ý; tự động đóng gói toàn bộ audio để gửi chấm sau khi hoàn thành.

## Giao diện Phòng thu & Chỉ số Âm học (Studio Metrics)
- **MediaRecorder & Visualizer**: Thu âm qua trình duyệt, xuất biểu đồ sóng âm thời gian thực, nén file định dạng `audio/webm`.
- **Client Acoustic Metrics (Web Audio API)**: Đo tốc độ nói WPM (chuẩn 110–150 WPM), đo thời lượng nói thực tế và cảnh báo khoảng lặng chết (>2s).
- **Báo cáo Kết quả Nói**:
  - Radar Chart 5 trục trên 5 tiêu chí MOET: Pronunciation, Fluency, Grammar, Vocabulary, Topic Development.
  - Phonetic Highlighting: Bôi đỏ từ phát âm sai hoặc thiếu phụ âm đuôi `/s/`, `/ed/` kèm audio phát âm chuẩn IPA.
  - Bài nói mẫu nâng band B2/C1 phát triển từ chính ý tưởng ban đầu của học viên.
