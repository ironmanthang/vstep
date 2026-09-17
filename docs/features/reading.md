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
Mô-đun được đóng gói thành `ReadingRunner` tiếp nhận tham số `mode` và phân rã thành các sub-components chuyên biệt dưới 400 dòng mã:
- **Practice Mode (`mode: 'practice'`)**:
  - Cho phép tra từ nhanh qua Tooltip 2 tầng (offline + MyMemory API), 3 chế độ đọc (Warm Sepia, Obsidian Dark, Cream Light), điều chỉnh cỡ chữ (14px–22px) và giãn dòng (1.5x–2.0x).
  - Tự động bôi màu dẫn chứng (Highlight Clues) với hiệu ứng pulse và tự cuộn mượt đến đoạn văn chứa dẫn chứng khi chọn câu hỏi.
  - Tích hợp ô ghi chú nháp (Scratchpad) tự động lưu theo từng câu hỏi.
  - Không chạy đồng hồ đếm giờ (loại bỏ hoàn toàn UI stopwatch và interval ticking nhằm triệt tiêu chu kỳ re-render thừa và giải tỏa áp lực tâm lý khi đọc hiểu).
- **Exam Mode (`mode: 'exam'`)**:
  - Khóa toàn bộ công cụ tra từ (chống gian lận chuẩn phòng thi).
  - Tích hợp Question Palette 40 câu kèm cờ Flag để đánh dấu câu cần xem lại.
  - Đồng hồ tổng 60 phút đếm ngược toàn bài thi Đọc và tự động thu bài khi hết giờ.
- **Hệ thống Sub-Components & Hooks**:
  - `ReadingHeader.tsx`: Tiêu đề bài thi, huy hiệu phân loại (Exam/Practice, Bậc B1-C1, số bài đọc), widget đồng hồ đếm ngược (chỉ hiển thị trong Exam Mode, cảnh báo khẩn cấp dưới 5 phút), banner cảnh báo đồng bộ không chặn và thẻ điểm tổng kết kèm nút làm lại bài.
  - `ReadingPassageNavBar.tsx`: Thanh điều hướng bài đọc và thanh chuyển tab trên di động (<768px).
  - `ReadingBottomBar.tsx`: Thanh điều hướng đáy chuẩn CBT tích hợp bộ chọn bài đọc (Bài 1..4), dải 10 câu hỏi của bài đọc hiện tại kèm cờ nổi và chỉ báo đáp án, nút mở modal tổng quan 40 câu (ReadingQuestionPalette), nút nộp bài/làm lại, và nút thu gọn thành floating pill góc phải giải phóng 100% không gian dọc.
  - `ReadingQuestionsStream.tsx`: Luồng câu hỏi bài đọc hiện tại, quản lý danh sách `ReadingQuestionCard` và chuyển tiếp ref cuộn mượt.
  - `ReadingQuestionPalette.tsx`: Bảng câu hỏi toàn bộ 40 câu hỗ trợ chuyển nhanh bài đọc/câu hỏi và hiển thị trong modal drawer.
  - `ReadingResetModal.tsx`: Hộp thoại xác nhận làm lại bài thi đọc.
  - `useReadingTimer.ts`: Quản lý đồng hồ đếm ngược tự động nộp bài trong Exam Mode (không khởi tạo `setInterval` trong Practice Mode).
  - `useReaderSettings.ts`: Quản lý và lưu trữ cài đặt cỡ chữ, giãn dòng, theme đọc theo tài khoản.
  - `useReadingSessionSync.ts`: Tự động lưu phiên làm bài vào LocalStorage và hòa giải trạng thái nộp bài từ Supabase.

## Bộ Công cụ Hỗ trợ Đọc Hiểu (Scaffolding Tools)
- **1-Tap / Double-Click Dictionary Tooltip (Hệ thống Từ điển Toàn cục `src/features/dictionary/`)**:
  - Tích hợp qua `DictionaryProvider` toàn cục tại root `App.tsx`, chia sẻ dùng chung cho cả bài đọc, câu hỏi và phương án lựa chọn, cũng như các kỹ năng Nghe, Viết, Nói.
  - Trên Desktop: Nhấn đúp hoặc bôi đen từ tiếng Anh trong bài đọc hoặc phương án hiển thị tooltip tra nghĩa tiếng Việt tức thì trong 0ms với hiệu ứng bôi sáng màu caramel ấm thay thế viền xanh desktop.
  - Trên Mobile: Chạm 1 chạm tức thì qua cơ chế phân giải tọa độ điểm sang text node (`caretPositionFromPoint` / `caretRangeFromPoint`) trong ngưỡng tap (<8px, <400ms), kết hợp `touch-action: manipulation` triệt tiêu xung đột với menu bôi đen hệ điều hành; nhấn giữ (>=400ms) hoặc chạm đúp trên các nút phương án để tra từ mà không chọn nhầm đáp án.
  - Kiến trúc 2 tầng nâng cấp: Tầng 1 tra offline 9.098 từ vựng học thuật & đời sống chuẩn từ điển Anh-Việt (`dictionaryVi.ts`) kèm phiên âm IPA, từ loại (POS), danh sách nghĩa đánh số, phát âm Web Speech API (TTS), giải thuật Lemmatizer O(1) nhận diện từ gốc (-ed, -ing, -s, -ly, irregulars) và định vị lật thông minh (smart flip) tránh che khuất dòng đầu/tiêu đề; Tầng 2 fallback qua MyMemory API (`en|vi`) được làm sạch tiền tố và gắn nhãn "Dịch máy". Tuyệt đối không ghi rác vào hàng đợi SRS và tự động khóa công cụ qua `useDictionaryExamLock` trong Exam Mode.
- **Bố cục Linh hoạt (Desktop Split-Pane & Mobile Tabs)**:
  - Trên Desktop (>=768px): Khung bài đọc bên trái cuộn độc lập với thanh công cụ Reader Controls, khung câu hỏi bên phải trong bố cục 2 cột thoáng rộng (1.15fr / 1fr), thanh điều hướng câu hỏi đáy chuẩn CBT hỗ trợ thu gọn thành floating pill góc màn hình (`bottom-collapsed` tự động tăng +70px chiều cao vùng đọc).
  - Trên Mobile (<768px): Bộ chuyển tab "Bài Đọc" và "Câu Hỏi" toàn màn hình, lưu vị trí cuộn độc lập khi chuyển qua lại.
- **Phân tích Dẫn chứng & Paraphrase**:
  - Tự động đối chiếu verbatim substring giữa `clue_sentence` và nội dung bài đọc, hỗ trợ người học soi chiếu căn cứ chọn đáp án.

## Ngân hàng Đề thi Đọc & Tích hợp Thi Thử
- **Ngân hàng Đề Đọc Đã Xác Thực**:
  - `ULIS_READING_TEST_01` (Đề 1): 4 bài đọc, 40 câu hỏi, khớp 100% đáp án gốc trang 131 và dẫn chứng verbatim (`ulisReadingTest01.ts`).
  - `ULIS_READING_TEST_02` (Đề 2): 4 bài đọc, 40 câu hỏi, khớp 100% đáp án gốc trang 136 và dẫn chứng verbatim (`ulisReadingTest02.ts`).
  - `ULIS_READING_TEST_03` (Đề 3): 4 bài đọc, 40 câu hỏi, khớp 100% đáp án gốc trang 140 và dẫn chứng verbatim (`ulisReadingTest03.ts`).
  - `ULIS_READING_TEST_04` (Đề 4): 4 bài đọc, 40 câu hỏi, khớp 100% đáp án gốc trang 145 và dẫn chứng verbatim (`ulisReadingTest04.ts`).
  - `ULIS_READING_TEST_05` (Đề 5): 4 bài đọc, 40 câu hỏi, khớp 100% đáp án gốc trang 149 và dẫn chứng verbatim (`ulisReadingTest05.ts`).
  - `ULIS_READING_TEST_06` (Đề 6): 4 bài đọc, 40 câu hỏi, khớp 100% đáp án gốc trang 154 và dẫn chứng verbatim (`ulisReadingTest06.ts`).
  - `ULIS_READING_TEST_07` (Đề 7): 4 bài đọc, 40 câu hỏi, khớp 100% đáp án gốc trang 159 và dẫn chứng verbatim (`ulisReadingTest07.ts`).
- **Ngân hàng Đề Luyện Tập HCMUE (HCMUE_READING_TESTS)**:
  - 5 Đề thi thực hành đọc hiểu trích từ tuyển tập "20 Mock Tests" (NXB ĐH Sư Phạm TP.HCM, 2017) với 20 bài đọc, 200 câu hỏi kèm dẫn chứng verbatim và phân tích đáp án chi tiết (`src/features/reading/data/drills/hcmue/`).
- **Bộ Chuyển Đổi Bộ Đề (Collection Switcher)**:
  - `ReadingStudioPage` mặc định chọn "Bộ Đề Luyện Tập HCMUE" (5 đề, 200 câu) làm bộ đề thực hành ban đầu, đồng thời hỗ trợ chuyển đổi linh hoạt sang "Bộ Đề Thi Thử ULIS (ĐHQGHN)" (7 đề, 280 câu).
  - Thanh chọn đề (`reading-edition-selector-bar`) tự động chuyển đổi danh sách nút chọn đề `Đề 1` - `Đề 5` (HCMUE) hoặc `Đề 1` - `Đề 7` (ULIS) và làm mới runner qua `key={`${currentTest.id}_practice`}`.
- **Tích hợp Thi Thử 4 Kỹ Năng (Full Mock Tests)**:
  - `VSTEP_MOCK_TEST_01`: Kết hợp Nghe Đề 1, Đọc Đề 1, Viết Task 1/2, Nói May 30 (`mockTest01.ts`).
  - `VSTEP_MOCK_TEST_02`: Kết hợp Nghe Đề 2, Đọc Đề 2, Viết Task 1/2, Nói May 05 (`mockTest02.ts`).
  - `VSTEP_MOCK_TEST_03`: Kết hợp Nghe Đề 3, Đọc Đề 3, Viết Task 1/2, Nói May 20 (`mockTest03.ts`).
  - `VSTEP_MOCK_TEST_04`: Kết hợp Nghe Đề 4, Đọc Đề 4, Viết Task 1/2, Nói May 24 (`mockTest04.ts`).
  - `VSTEP_MOCK_TEST_05`: Kết hợp Nghe Đề 5, Đọc Đề 5, Viết Task 1/2, Nói May 24 (`mockTest05.ts`).
  - `VSTEP_MOCK_TEST_06`: Kết hợp Nghe Đề 6, Đọc Đề 6, Viết Task 1/2, Nói May 24 (`mockTest06.ts`).
  - `VSTEP_MOCK_TEST_07`: Kết hợp Nghe Đề 7, Đọc Đề 7, Viết Task 1/2, Nói May 24 (`mockTest07.ts`).


