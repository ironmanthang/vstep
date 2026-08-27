# ĐẶC TẢ TÍNH NĂNG: LUYỆN VIẾT & VIETLISH ENGINE (WRITING STUDIO)

## Cấu trúc Bài thi Viết VSTEP (2 Task / 60 Phút)
- **Task 1 (Thư/Email - 120 từ)**: Viết thư/email có độ dài tối thiểu 120 từ (chiếm 1/3 tổng điểm Viết).
- **Task 2 (Bài luận - 250 từ)**: Viết bài luận học thuật giải thích quan điểm, thảo luận vấn đề có độ dài tối thiểu 250 từ (chiếm 2/3 tổng điểm Viết).

## Kiến trúc Unified Writing Runner
Mô-đun được đóng gói thành một `WritingRunner` duy nhất tiếp nhận tham số `mode`:
- **Practice Mode (`mode: 'practice'`)**:
  - Tích hợp bộ tạo dàn ý (Outline Generator) và thư viện mẫu câu (Sentence Starters).
  - Kho bài mẫu phân tích 5 màu và chế độ so sánh song song Side-by-Side.
  - Chấm điểm AI 2 tầng tức thì (<10s) hiển thị nhận xét bôi màu 4 nhóm và bài mẫu viết lại nâng band B2/C1.
- **Exam Mode (`mode: 'exam'`)**:
  - Trình soạn thảo văn bản nghiêm ngặt chuẩn Bộ GD&ĐT (chỉ có bộ đếm từ và đồng hồ đếm ngược 60 phút).
  - Khóa toàn bộ tính năng gợi ý dàn ý, bài mẫu và chấm điểm tức thì.
  - Tự động lưu bản nháp mỗi 5 giây vào `localStorage` và tự động thu bài nộp điểm khi hết giờ.

## Giàn giáo Hỗ trợ Người mới (Scaffolding Tools)
- **Bộ Tạo Dàn ý (Outline Generator)**: Gợi ý cấu trúc 3 phần cho Task 1 và 2 hướng lập luận kèm luận điểm gợi ý cho Task 2.
- **Thư viện Câu Mẫu Ăn điểm (Sentence Starters)**: Khối câu lắp ghép sẵn cho mở bài, chuyển đoạn (*"First and foremost...", "On the other hand..."*), đưa dẫn chứng (*"To illustrate this point..."*).
- **Kho Bài mẫu Annotated 5 Màu**: Bài mẫu phân tích cấu trúc trực quan (Xanh dương: Thesis/Topic sentence, Xanh lá: Luận điểm phụ, Vàng: Liên từ, Cam: Ví dụ, Đỏ: Kết đoạn).
- **So sánh Song song (Side-by-Side)**: Xem bài viết của mình bên trái và bài mẫu chuẩn bên phải để tự nhận diện khoảng cách.

## Vietlish Engine (Bộ Nhận diện Lỗi Tư duy Tiếng Việt)
- **Nhóm 1: Dịch thô từng từ (Literal Translation)**:
  - *Lỗi*: "In Vietnam have many cars" → *Sửa*: "There are many cars in Vietnam".
  - *Lỗi*: "Open/Close the light" → *Sửa*: "Turn on / Turn off the light".
- **Nhóm 2: Lỗi cấu trúc tiếng Việt / Không chủ ngữ (Topic-Prominent)**:
  - *Lỗi*: "Because very expensive, so many people cannot buy" → *Sửa*: "Because the product is expensive, many people cannot afford it".
  - *Lỗi dùng song song*: *Although... but...* hoặc *Because... so...* trong cùng 1 câu.
- **Nhóm 3: Sai Collocation & Giới từ do tiếng mẹ đẻ**:
  - *Lỗi*: "Learn by heart knowledge" → *Sửa*: "Acquire / Gain knowledge".
  - *Lỗi*: "Pay attention on" → *Sửa*: "Pay attention to" / "Focus on".

## Quy ước Bôi màu Nhận xét
- **Đỏ (Red)**: Lỗi Ngữ pháp / Chính tả / Chia thì nghiêm trọng (`grammar`, `spelling`).
- **Tím (Purple)**: Lỗi Diễn đạt Vietlish / Giao thoa ngôn ngữ mẹ đẻ (`vietlish`).
- **Vàng (Yellow)**: Gợi ý nâng cấp từ vựng học thuật B2/C1 / Sửa lặp từ (`lexical_upgrade`).
- **Xanh lá (Green)**: Lời khen cho câu văn hay, cấu trúc ngữ pháp nâng cao (`praise`).
