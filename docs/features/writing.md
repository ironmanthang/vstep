# ĐẶC TẢ TÍNH NĂNG: LUYỆN VIẾT & VIETLISH ENGINE (WRITING STUDIO)

## Cấu trúc Bài thi Viết VSTEP (2 Task / 60 Phút)
- **Task 1 (Thư/Email - 120 từ)**: Viết thư/email có độ dài tối thiểu 120 từ, trả lời đủ 3 ý gợi ý của đề bài (chiếm 1/3 tổng điểm Viết).
- **Task 2 (Bài luận - 250 từ)**: Viết bài luận có Thesis Statement rõ ràng, tối thiểu 2 đoạn thân bài có ví dụ minh họa và độ dài tối thiểu 250 từ (chiếm 2/3 tổng điểm Viết).
- **Trọng số & Làm tròn**: Điểm tổng Viết = `(Task 1 + Task 2 * 2) / 3`, làm tròn theo bước 0.5 chuẩn Bộ GD&ĐT. Đích nhắm: **Bậc 3 (B1, thang 4.0 - 5.5)** xét chuẩn tốt nghiệp Đại học.

## Kiến trúc Unified Writing Runner
Mô-đun được đóng gói thành một `WritingRunner` duy nhất tiếp nhận tham số `mode` và phân rã thành các sub-components dưới 400 dòng mã:
- **Practice Mode (`mode: 'practice'`)**:
  - Tích hợp gợi ý cấu trúc viết chuẩn B1 cho từng Task.
  - Chấm điểm AI 3 tầng với `gemini-3.5-flash-lite` tức thì (< 6s) theo barem B1 Bộ GD&ĐT.
  - Sinh trực tiếp **AI-Fixed B1 Essay**: Viết lại bài của học viên thành bài chuẩn B1 từ chính ý tưởng gốc, sửa sạch lỗi ngữ pháp và Vietlish, dùng câu văn đơn/ghép dễ hiểu thay vì ép từ vựng C1 xa lạ.
  - Đối chiếu đa chiều: Bài viết của học viên | Bài sửa B1 từ AI | Bài mẫu chính thức từ hội đồng khảo thí ULIS.
- **Exam Mode (`mode: 'exam'`)**:
  - Trình soạn thảo văn bản nghiêm ngặt mô phỏng phòng thi máy tính Đại học Văn Lang (VLU) & Bộ GD&ĐT.
  - Đồng hồ đếm ngược 60 phút hợp nhất dùng chung cho cả 2 Task.
  - Cảnh báo nhịp độ (Pacing Alert) tại phút 20 nhắc chuyển sang Task 2 nhằm bảo vệ 67% tổng điểm.
  - Bộ đếm từ thời gian thực, nút Lưu bài độc lập từng Task và tự động lưu bản nháp mỗi 5 giây vào `localStorage`.
  - Tự động nộp bài khi hết 60 phút và khóa toàn bộ gợi ý.
- **Hệ thống Sub-Components**:
  - `WritingHeader.tsx`: Tiêu đề bài thi, phụ đề tổ chức khảo thí & thời lượng, widget đếm ngược thời gian và nút thoát.
  - `WritingPacingBanner.tsx`: Banner nhắc nhở phân bổ thời gian 20 phút cho Task 1 kèm nút chuyển nhanh Task 2.
  - `WritingTaskTabs.tsx`: Thanh điều hướng Task 1 vs Task 2 tích hợp pill đếm số từ theo thời gian thực.
  - `WritingScaffoldBox.tsx`: Khung gợi ý dàn bài chuẩn B1 cho thư và bài luận trong Practice Mode.
- **Quản lý Phiên & Đồng bộ Đám mây (Storage & Cloud Sync)**:
  - Phân vùng lưu trữ đa tài khoản: Quản lý khóa phiên làm bài cô lập theo User ID (`vstep_${userId}_writing_session_${testId}_${mode}`) qua `writingStorage.ts`.
  - Ghi nhận tiến độ học tập: Tự động gọi `recordStudyActivity()` và `incrementExercisesCompleted(1)` vào `userStore` khi hoàn thành chấm điểm.
  - Đồng bộ điểm thi lên Supabase: Lưu snapshot điểm số, bài viết và thời gian làm bài vào bảng `public.user_test_submissions` (`skill: 'writing'`) qua `upsertTestSubmission`.
  - Hệ thống kiểu dữ liệu tập trung: Quản lý toàn bộ contracts tại `src/features/writing/types.ts`.

## Ngân hàng Đề thi Viết Thực chiến
- **7 Đề thi Chuẩn ULIS (`src/features/writing/data/mockTests/`)**: Trích xuất authentic từ sách "7 Vstep Tests B1-B2-C1 Full Key" (NXB ĐHQGHN, 2019) gồm 14 nhiệm vụ (7 thư Task 1 + 7 bài luận Task 2).
- **Ngân Hàng Đề Luyện Tập Mở Rộng (`ALL_PRACTICE_WRITING_TESTS`)**: 3 Đề thi thực hành hoàn chỉnh ghép từ 3 bài Thư Task 1 (`WRITING_TASK1_BANK`: Course Evaluation, Job Application, Delivery Complaint) và 2 bài Luận Task 2 (`WRITING_TASK2_BANK`: Social Media, Educational Gamification) kèm bài mẫu B2/C1 phân tích chi tiết tại `src/features/writing/data/writingBank.ts`.
- **Bộ Chuyển Đổi Bộ Đề (Collection Switcher)**: `WritingStudioPage` tích hợp 2 thẻ chọn bộ đề ("Bộ Đề Thi Thử ULIS" và "Ngân Hàng Đề Luyện Tập Mở Rộng"). Tự động cập nhật thanh chọn đề và cô lập khóa lưu trữ nháp theo từng `test.id` riêng biệt.
- **Bài Mẫu Khảo Thí**: Tích hợp đầy đủ bài mẫu B1 chính thức và phân tích chuyên gia cho từng đề.
- **Tích hợp Full Mock Test**: Liên kết trực tiếp 1:1 với `mockTest01.ts` đến `mockTest07.ts`.

## Vietlish Engine (Hệ Thống Phân Loại Lỗi L1 Transfer)
- **Nhóm 1: Lỗi Cú pháp (Syntactic Transfer)**:
  - Khuyết từ nối giả / chủ ngữ giả: *"In Vietnam have many cars"* -> Sửa: *"There are many cars in Vietnam"*.
  - Khuyết động từ hệ to be (Zero copula): *"Online learning very convenient"* -> Sửa: *"Online learning is very convenient"*.
  - Cặp liên từ song song: *Although... but...*, *Because... so...*, *If... then...*.
- **Nhóm 2: Lỗi Hình thái (Morphological Transfer)**:
  - Danh từ đếm được đứng trơ trọi (Bare countable nouns): *"Student should wear uniform"* -> Sửa: *"Students should wear uniforms"*.
  - Bỏ quên biến tố thời - thể: Dùng trạng từ thời gian mà không đổi dạng động từ quá khứ.
- **Nhóm 3: Dịch thô nguyên ngữ & Sai Giới từ (Lexical Calque & Preposition Transfer)**:
  - Dịch thô từ vựng: *"Open/Close the light"* -> Sửa: *"Turn on / Turn off the light"*; *"Learn by heart knowledge"* -> Sửa: *"Acquire knowledge"*; *"Expensive price"* -> Sửa: *"High price"*.
  - Giới từ sai ngữ cảnh: *"Pay attention on"* -> Sửa: *"Pay attention to"*; *"Discuss about"* -> Sửa: *"Discuss"*; *"Marry with"* -> Sửa: *"Marry"*.

## Quy ước Phân loại Nhận xét
- **Đỏ (Red / Grammar & Spelling)**: Lỗi ngữ pháp, chia thì, chính tả.
- **Tím (Purple / Vietlish)**: Lỗi giao thoa ngôn ngữ mẹ đẻ do dịch thô từ tiếng Việt.
- **Vàng (Yellow / Vocabulary)**: Gợi ý dùng từ chính xác, tránh lặp từ.
- **Xanh lá (Green / Praise)**: Lời khen cho điểm sáng diễn đạt.
