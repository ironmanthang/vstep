# ĐẶC TẢ TÍNH NĂNG: LUYỆN VIẾT & VIETLISH ENGINE (WRITING STUDIO)

## Cấu trúc Bài thi Viết VSTEP (2 Task / 60 Phút)
- **Task 1 (Thư/Email - 120 từ)**: Viết thư/email có độ dài tối thiểu 120 từ, trả lời đủ 3 ý gợi ý của đề bài (chiếm 1/3 tổng điểm Viết).
- **Task 2 (Bài luận - 250 từ)**: Viết bài luận học thuật có Thesis Statement rõ ràng, luận điểm và ví dụ minh họa có độ dài tối thiểu 250 từ (chiếm 2/3 tổng điểm Viết).
- **Trọng số & Làm tròn**: Điểm tổng Viết = `(Task 1 + Task 2 * 2) / 3`, làm tròn theo bước 0.5 chuẩn Bộ GD&ĐT.

## Kiến trúc Unified Writing Runner
Mô-đun được đóng gói thành một `WritingRunner` duy nhất tiếp nhận tham số `mode`:
- **Practice Mode (`mode: 'practice'`)**:
  - Tích hợp bộ tạo dàn ý (Outline Generator) và thư viện mẫu câu (Sentence Starters).
  - Kho bài mẫu phân tích 5 màu và chế độ so sánh song song Side-by-Side.
  - Chấm điểm AI 3 tầng với `gemini-3.5-flash-lite` tức thì (< 6s) hiển thị nhận xét bôi màu 4 nhóm và bài mẫu viết lại nâng band B2/C1.
  - **Iterative Revision Studio**: Cho phép học viên sửa trực tiếp bản thảo thành Draft 2 sau khi đọc nhận xét AI và đo lường độ tăng điểm (Band Delta).
- **Exam Mode (`mode: 'exam'`)**:
  - Trình soạn thảo văn bản nghiêm ngặt chuẩn phòng thi ĐH Văn Lang & Bộ GD&ĐT: Đồng hồ 60 phút hợp nhất cho cả 2 Task, bộ đếm từ thời gian thực và nút Lưu bài độc lập từng Task.
  - **Cảnh báo nhịp độ (Pacing Alert)**: Nhắc nhở tại mốc phút 20 để học viên chuyển sang Task 2 nhằm bảo vệ 67% tổng điểm.
  - Khóa toàn bộ tính năng gợi ý dàn ý, bài mẫu và chấm điểm tức thì.
  - Tự động lưu bản nháp mỗi 5 giây vào `localStorage` và tự động nộp bài khi hết 60 phút.

## Giàn giáo Hỗ trợ & Học tập Tương tác (Scaffolding Tools)
- **Bộ Tạo Dàn ý (Outline Generator)**: Gợi ý cấu trúc 3 phần cho Task 1 và 2 hướng lập luận kèm luận điểm gợi ý cho Task 2.
- **Thư viện Câu Mẫu Ăn điểm (Sentence Starters)**: Khối câu lắp ghép sẵn cho mở bài, chuyển đoạn (*"First and foremost...", "On the other hand..."*), đưa dẫn chứng (*"To illustrate this point..."*).
- **Kho Bài mẫu Annotated 5 Màu**: Bài mẫu phân tích cấu trúc trực quan (Xanh dương: Thesis/Topic sentence, Xanh lá: Luận điểm phụ, Vàng: Liên từ, Cam: Ví dụ, Đỏ: Kết đoạn).
- **So sánh Song song (Side-by-Side)**: Xem bài viết của mình bên trái và bài mẫu chuẩn bên phải để tự nhận diện khoảng cách.
- **Ngân hàng đề thi Viết thực chiến (`writingBank.ts`)**: Tích hợp các đề Task 1 & Task 2 authentic từ bộ 7 đề ULIS và 5 đề HCMUE.

## Vietlish Engine (Hệ Thống Phân Loại Lỗi L1 Transfer)
- **Nhóm 1: Lỗi Cú pháp (Syntactic Transfer)**:
  - Khuyết từ nối giả / chủ ngữ giả: *"In Vietnam have many cars"* -> Sửa: *"There are many cars in Vietnam"*.
  - Khuyết động từ hệ to be (Zero copula): *"Online learning very convenient"* -> Sửa: *"Online learning is very convenient"*.
  - Cặp liên từ song song: *Although... but...*, *Because... so...*.
- **Nhóm 2: Lỗi Hình thái (Morphological Transfer)**:
  - Danh từ đếm được đứng trơ trọi (Bare countable nouns): *"Student should wear uniform"* -> Sửa: *"Students should wear uniforms"*.
  - Bỏ quên biến tố thời - thể: Dùng trạng từ thời gian mà không đổi dạng động từ quá khứ.
- **Nhóm 3: Dịch thô nguyên ngữ & Sai Giới từ (Lexical Calque & Preposition Transfer)**:
  - Dịch thô từ vựng: *"Open/Close the light"* -> Sửa: *"Turn on / Turn off the light"*; *"Learn by heart knowledge"* -> Sửa: *"Acquire knowledge"*; *"Expensive price"* -> Sửa: *"High price"*.
  - Giới từ sai ngữ cảnh: *"Pay attention on"* -> Sửa: *"Pay attention to"*; *"Discuss about"* -> Sửa: *"Discuss"*; *"Marry with"* -> Sửa: *"Marry"*.

## Quy ước Bôi màu Nhận xét
- **Đỏ (Red)**: Lỗi Ngữ pháp / Chính tả / Chia thì nghiêm trọng (`grammar`, `spelling`).
- **Tím (Purple)**: Lỗi Diễn đạt Vietlish / Giao thoa ngôn ngữ mẹ đẻ (`vietlish`).
- **Vàng (Yellow)**: Gợi ý nâng cấp từ vựng học thuật B2/C1 / Sửa lặp từ (`vocabulary`).
- **Xanh lá (Green)**: Lời khen cho câu văn hay, cấu trúc ngữ pháp nâng cao (`praise`).
