# ĐẶC TẢ TÍNH NĂNG: LUYỆN ĐỌC (READING STUDIO)

## Cấu trúc Bài thi Đọc VSTEP (40 Câu / 60 Phút / 4 Bài Đọc)
Bài thi bao gồm 4 bài đọc học thuật và đời sống (~450–500 từ/bài, 10 câu/bài) xoay quanh 5 dạng câu hỏi trọng tâm:

| Dạng câu hỏi | Mục tiêu đánh giá |
| :--- | :--- |
| **Main Idea** | Xác định ý chính của toàn bài đọc hoặc đoạn văn cụ thể. |
| **Vocab in Context** | Suy đoán nghĩa từ/cụm từ trong ngữ cảnh bài đọc. |
| **Factual Details** | Tìm chi tiết đúng sự thật hoặc chi tiết KHÔNG được đề cập (Negative fact). |
| **Inference** | Suy luận logic từ các thông tin gián tiếp của tác giả. |
| **Author Attitude** | Nhận diện thái độ, giọng văn hoặc mục đích viết của tác giả. |

## Kiến trúc Unified Reading Runner
Mô-đun được đóng gói thành một `ReadingRunner` duy nhất tiếp nhận tham số `mode`:
- **Practice Mode (`mode: 'practice'`)**:
  - Cho phép tra từ nhanh qua Tooltip, bật tắt chế độ đọc (Sepia/Dark/Light) và điều chỉnh cỡ chữ.
  - Tự động bôi màu dẫn chứng (Highlight Clues) và bảng phân tích hiện tượng Paraphrase sau khi chọn đáp án.
  - Chế độ áp lực thời gian (Time Pressure Mode): Đồng hồ đếm ngược 15 phút/bài đọc kèm cảnh báo khi sắp hết giờ.
- **Exam Mode (`mode: 'exam'`)**:
  - Khóa toàn bộ công cụ tra từ (chống gian lận).
  - Tích hợp Question Palette 40 câu kèm cờ Flag để đánh dấu câu chưa chắc chắn.
  - Đồng hồ tổng 60 phút đếm ngược toàn bài thi Đọc và tự động thu bài khi hết giờ.

## Bộ Công cụ Hỗ trợ Đọc Hiểu (Scaffolding Tools)
- **1-Tap Dictionary Tooltip**:
  - Nhấn/bôi đen từ tiếng Anh trong bài đọc hiển thị tooltip tra nghĩa tức thì trong 0ms.
  - Hỗ trợ từ điển offline đóng gói sẵn trong App bundle kèm tra cứu nâng cao từ Free Dictionary API (tuyệt đối không lưu rác vào hàng đợi SRS).
- **Giao diện Chia đôi Màn hình (Split-Pane)**:
  - Khung bài đọc bên trái cuộn độc lập với thanh công cụ định dạng (cỡ chữ, giãn dòng, theme Sepia/Dark/Light).
  - Khung câu hỏi bên phải cố định hoặc cuộn độc lập theo câu đang chọn.
- **Phân tích Dẫn chứng & Paraphrase**:
  - Tự động bôi màu câu văn gốc chứa đáp án trong bài đọc tương ứng với câu hỏi đang chọn.
  - Bảng đối chiếu Paraphrase trực quan (ví dụ: *reduce costs* → *cut down expenditure*).
