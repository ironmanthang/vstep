# ĐẶC TẢ TÍNH NĂNG: PHÒNG THU LUYỆN NÓI (SPEAKING STUDIO)

## Cấu trúc Bài thi Nói VSTEP (3 Part / 12 Phút)
- **Part 1: Social Interaction (3 phút)**: 2 chủ đề đời sống cá nhân (mỗi chủ đề 3 câu hỏi ngắn).
- **Part 2: Solution Discussion (4 phút)**: 1 tình huống với 3 phương án lựa chọn (1 phút chuẩn bị, 3 phút trình bày giải pháp tối ưu và phản biện loại trừ).
- **Part 3: Topic Development (5 phút)**: 1 chủ đề với sơ đồ tư duy Mindmap (1 phút chuẩn bị, 3 phút phát triển chủ đề, 1 phút trả lời câu hỏi mở rộng).
- **Trọng số & Làm tròn**: Điểm Speaking = `(Pronunciation + Fluency & Coherence + Grammar & Vocab + Task Fulfillment) / 4`, thang điểm 0.0 - 10.0, làm tròn theo bước 0.5 chuẩn Bộ GD&ĐT. Đích nhắm: **Bậc 3 (B1, thang 4.0 - 5.5)** xét chuẩn tốt nghiệp Đại học.

## Kiến trúc Unified Speaking Runner
Mô-đun được đóng gói thành một `SpeakingRunner` duy nhất tiếp nhận tham số `mode`:
- **Practice Mode (`mode: 'practice'`)**:
  - Luyện tập từng Part riêng lẻ, cho phép chuẩn bị linh hoạt và ghi âm thử nhiều lần.
  - Nghe lại bản ghi âm trước khi nộp chấm điểm AI.
  - Tích hợp gợi ý khung câu trả lời chuẩn B1 cho từng Part (Part 1: Trực diện + 2 câu mở rộng; Part 2: Chọn 1 + 2 lý do + phản biện 2 phương án còn lại; Part 3: Khai triển 3 nhánh Mindmap).
  - Chấm điểm AI qua Kiến trúc Lai (Hybrid Architecture): Tự động chuyển mã âm thanh qua Groq Whisper `whisper-large-v3-turbo` khi có API key (độ trễ < 1s) hoặc trực tiếp qua `gemini-3.5-flash-lite` Multimodal Audio trong ~5-6 giây.
  - Sinh trực tiếp **AI-Fixed B1 Speech**: Viết lại bài nói của học viên thành phiên bản nói chuẩn B1 từ chính ý tưởng gốc, sửa sạch lỗi ngữ pháp và từ vựng, chỉ dẫn trọng âm và âm đuôi, giữ câu văn tự nhiên dễ nói.
  - Đối chiếu đa chiều: Bản ghi âm & Transcript học viên | Bài nói sửa B1 từ AI | Bài mẫu chính thức từ hội đồng khảo thí ULIS.
- **Exam Mode (`mode: 'exam'`)**:
  - Trình thi nói nghiêm ngặt mô phỏng phòng thi máy tính Bộ GD&ĐT.
  - Chạy liên tục 3 Part theo đúng trình tự và thời gian quy định (Chuẩn bị 1p $\rightarrow$ Ghi âm 3p).
  - Tự động phát âm hiệu BEEP chuẩn phòng thi khi bắt đầu và kết thúc thời gian ghi âm (tổng hợp qua Web Audio API OscillatorNode, không phụ thuộc file âm thanh ngoài).
  - Khóa toàn bộ tính năng nghe lại và gợi ý dàn ý; lưu trữ từng đoạn ghi âm dạng Blob vào IndexedDB.
  - Tự động đóng gói và gửi chấm điểm sau khi hoàn thành toàn bộ bài thi.

## Giao diện Phòng thu & Chỉ số Âm học (Studio Metrics)
- **MediaRecorder & Safe Dynamic MIME Detection**: Tự động đàm phán định dạng hỗ trợ tốt nhất theo thứ tự ưu tiên: `audio/webm;codecs=opus` $\rightarrow$ `audio/webm` $\rightarrow$ `audio/mp4`, đảm bảo hoạt động an toàn tuyệt đối trên Laptop, Android và iOS Safari.
- **Bộ đệm Lưu trữ IndexedDB (`src/features/speaking/speakingStorage.ts`)**: Lưu trữ các đoạn audio dạng `Blob` nhị phân vào IndexedDB nguyên bản. Tuyệt đối không lưu chuỗi base64 vào `localStorage` để tránh tràn hạn ngạch 5MB quota và chặn luồng UI.
- **Client Acoustic Metrics (Web Audio API)**:
  - Trực quan hóa sóng âm microphone thời gian thực trên Canvas.
  - Đo thời lượng nói thực tế và phát hiện khoảng lặng chết (> 2s) qua bộ phân tích biên độ RMS.
  - Tốc độ WPM: Tính toán chính xác sau khi AI bóc tách transcript: $\text{WPM} = \frac{\text{Số từ}}{\text{Thời lượng nói (phút)}}$.

## Barem Chấm Điểm 4 Tiêu chí MOET (Decision 729/QĐ-BGDĐT)
- **Phát âm (Pronunciation - 25%)**: Độ rõ âm vị, bật rõ phụ âm cuối (`/s/`, `/ed/`, `/t/`, `/d/`), trọng âm từ và câu, ngữ điệu.
- **Độ lưu loát và Mạch lạc (Fluency & Coherence - 25%)**: Duy trì tốc độ nói phù hợp B1 (90 - 130 WPM), hạn chế khoảng lặng ngập ngừng, sử dụng các từ nối cơ bản (*First, Second, Because, So, However*).
- **Ngữ pháp và Từ vựng (Grammar & Vocabulary - 25%)**: Kiểm soát câu đơn và câu ghép, chia đúng thì hiện tại/quá khứ, sử dụng vốn từ quen thuộc đời sống đúng ngữ cảnh.
- **Khả năng hoàn thành nhiệm vụ (Task Fulfillment / Topic Development - 25%)**: Trả lời đúng trọng tâm câu hỏi, phát triển ý đủ 3 nhánh đề bài yêu cầu.

## Ngân hàng Đề thi Nói Thực chiến
- **7 Đề thi Chuẩn ULIS (`src/features/speaking/data/mockTests/`)**: Trích xuất authentic từ sách "7 Vstep Tests B1-B2-C1 Full Key" (NXB ĐHQGHN, 2019) gồm 21 phần thi (7 đề $\times$ 3 parts) kèm bài mẫu khảo thí chính thức.
- **Bộ Đề Thi Thật Tháng 5 (`ALL_MAY_SPEAKING_TESTS`)**: 5 Kỳ thi thật phòng máy từ Trung tâm Khảo thí (`05/05`, `16/05`, `20/05`, `24/05`, `30/05`) với đủ 15 phần thi độc lập, tình huống thực tế và câu hỏi mở rộng bám sát đề thi máy tính (`src/features/speaking/data/speakingBank.ts`).
- **Bộ Chuyển Đổi Bộ Đề (Collection Switcher)**: `SpeakingStudioPage` tích hợp 2 thẻ chọn bộ đề ("Bộ Đề Thi Thử ULIS" và "Bộ Đề Thi Thật Tháng 5"). Tự động chuyển đổi thanh chọn đề, bảo tồn nút kiểm tra microphone và cô lập dữ liệu âm thanh nhị phân trong IndexedDB theo từng mã đề.
- **Tích hợp Full Mock Test**: Thay thế các đề thi tạm thời trong `src/data/mock-tests/mockTest01.ts` đến `mockTest07.ts` bằng các bộ đề ULIS Speaking authentic tương ứng 1:1.

