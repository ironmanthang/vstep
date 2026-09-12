# ĐẶC TẢ TÍNH NĂNG: LUYỆN ĐỌC (READING STUDIO)

## Cấu trúc Bài thi Đọc VSTEP (40 Câu / 60 Phút / 4 Bài Đọc)
Bài thi bao gồm 4 bài đọc học thuật và đời sống (~450–500 từ/bài, 10 câu/bài) xoay quanh các dạng câu hỏi trọng tâm:

| Dạng câu hỏi | Mục tiêu đánh giá |
| :--- | :--- |
| **Main Idea** | Xác định ý chính của toàn bài đọc hoặc đoạn văn cụ thể. |
| **Vocab in Context** | Suy đoán nghĩa từ/cụm từ trong ngữ cảnh bài đọc. |
| **Factual Details** | Tìm chi tiết đúng sự thật hoặc chi tiết KHÔNG được đề cập (Negative fact). |
| **Inference** | Suy luận logic từ các thông tin gián tiếp của tác giả. |
| **Author Attitude** | Nhận diện thái độ, giọng văn hoặc mục đích viết của tác giả. |
| **Sentence Insertion** | Xác định vị trí chèn câu thích hợp nhất trong 4 vị trí đánh dấu `[A][B][C][D]`. |

## Kiến trúc Unified Reading Runner
Mô-đun được đóng gói thành `ReadingRunner` tiếp nhận tham số `mode`:
- **Practice Mode (`mode: 'practice'`)**:
  - Cho phép tra từ nhanh qua Tooltip 2 tầng (offline + MyMemory API), 3 chế độ đọc (Warm Sepia, Obsidian Dark, Cream Light), điều chỉnh cỡ chữ (14px–22px) và giãn dòng (1.5x–2.0x).
  - Tự động bôi màu dẫn chứng (Highlight Clues) với hiệu ứng pulse và tự cuộn mượt đến đoạn văn chứa dẫn chứng khi chọn câu hỏi.
  - Tích hợp ô ghi chú nháp (Scratchpad) tự động lưu theo từng câu hỏi.
  - Đồng hồ đếm ngược 15 phút/bài đọc (thông tin hỗ trợ, không tự động khóa).
- **Exam Mode (`mode: 'exam'`)**:
  - Khóa toàn bộ công cụ tra từ (chống gian lận chuẩn phòng thi).
  - Tích hợp Question Palette 40 câu kèm cờ Flag để đánh dấu câu cần xem lại.
  - Đồng hồ tổng 60 phút đếm ngược toàn bài thi Đọc và tự động thu bài khi hết giờ.

## Bộ Công cụ Hỗ trợ Đọc Hiểu (Scaffolding Tools)
- **1-Tap / Double-Click Dictionary Tooltip**:
  - Nhấn/chạm đúp hoặc chọn từ tiếng Anh trong bài đọc hiển thị tooltip tra nghĩa tiếng Việt tức thì trong 0ms.
  - Kiến trúc 2 tầng: Tầng 1 tra offline 2.000 từ VSTEP Core (`dictionaryVi.ts`), Tầng 2 fallback qua MyMemory API (`en|vi`). Tuyệt đối không ghi rác vào hàng đợi SRS.
- **Bố cục Linh hoạt (Desktop Split-Pane & Mobile Tabs)**:
  - Trên Desktop (>=768px): Khung bài đọc bên trái cuộn độc lập với thanh công cụ Reader Controls, khung câu hỏi và sticky palette bên phải.
  - Trên Mobile (<768px): Bộ chuyển tab "Bài Đọc" và "Câu Hỏi" toàn màn hình, lưu vị trí cuộn độc lập khi chuyển qua lại.
- **Phân tích Dẫn chứng & Paraphrase**:
  - Tự động đối chiếu verbatim substring giữa `clue_sentence` và nội dung bài đọc, hỗ trợ người học soi chiếu căn cứ chọn đáp án.

## Ngân hàng Đề thi Đọc & Tích hợp Thi Thử
- **Ngân hàng Đề Đọc Đã Xác Thực**:
  - `ULIS_READING_TEST_01` (Đề 1): 4 bài đọc, 40 câu hỏi, khớp 100% đáp án gốc trang 131 và dẫn chứng verbatim (`ulisReadingTest01.ts`).
  - `ULIS_READING_TEST_02` (Đề 2): 4 bài đọc, 40 câu hỏi, khớp 100% đáp án gốc trang 136 và dẫn chứng verbatim (`ulisReadingTest02.ts`).
  - `ULIS_READING_TEST_03` (Đề 3): 4 bài đọc, 40 câu hỏi, khớp 100% đáp án gốc trang 140 và dẫn chứng verbatim (`ulisReadingTest03.ts`).
  - Bộ chọn đề thi (`reading-edition-selector-bar`) tại `ReadingStudioPage` tự động hiển thị danh sách toàn bộ đề thi trong `ALL_VSTEP_READING_MOCK_TESTS`.
- **Tích hợp Thi Thử 4 Kỹ Năng (Full Mock Tests)**:
  - `VSTEP_MOCK_TEST_01`: Kết hợp Nghe Đề 1, Đọc Đề 1, Viết Task 1/2, Nói May 30 (`mockTest01.ts`).
  - `VSTEP_MOCK_TEST_02`: Kết hợp Nghe Đề 2, Đọc Đề 2, Viết Task 1/2, Nói May 05 (`mockTest02.ts`).
  - `VSTEP_MOCK_TEST_03`: Kết hợp Nghe Đề 3, Đọc Đề 3, Viết Task 1/2, Nói May 20 (`mockTest03.ts`).


