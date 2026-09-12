# ĐẶC TẢ TÍNH NĂNG: BỔ TRỢ NỀN TẢNG (FOUNDATION & CURATED SRS)

## Học Từ vựng Ngắt quãng (Flashcard SRS Cốt lõi)
- **Bộ 1.500 Từ vựng Trọng tâm Trích xuất Đề thi Thật**:
  - Trích xuất trực tiếp từ các bộ đề thi thật và đề minh họa chuẩn của **ULIS (ĐH Ngoại ngữ – ĐHQGHN)** và **ĐH Sư phạm TP.HCM** kết hợp các cụm học thuật B1/B2.
  - Phân loại theo 8 chủ đề VSTEP chuẩn: Giáo dục & Học tập, Công việc & Sự nghiệp, Sức khỏe & Lối sống, Môi trường & Tự nhiên, Khoa học & Công nghệ, Du lịch & Đô thị, Xã hội & Văn hóa, Truyền thông & Giao tiếp.
  - Cấu trúc thẻ đầy đủ: Từ vựng, phiên âm IPA chuẩn, audio phát âm bản xứ, định nghĩa tiếng Việt ngắn gọn, Collocations đi kèm và câu ví dụ song ngữ trích từ ngữ cảnh bài thi.
- **Thuật toán Spaced Repetition (FSRS v6 Binary Engine)**:
  - Động cơ lập lịch FSRS v6 qua thư viện `ts-fsrs` (v5.4.2) với target retention 90% (`request_retention: 0.90`), trần khoảng cách tối đa 365 ngày (`maximum_interval: 365`), và thuật toán jitter/fuzz (`enable_fuzz: true`) chống hiện tượng dồn thẻ.
  - Đánh giá nhị phân (Binary Rating): Loại bỏ lựa chọn độ khó chủ quan, chuẩn hóa thành 2 trạng thái:
    - **Sai** (`Rating.Again`): Đưa thẻ vào bước học lại ngay trong phiên (`10m` learning step), tăng bộ đếm `lapses` đối với thẻ đã thuộc.
    - **Đúng** (`Rating.Good`): Tính toán độ bền trí nhớ (`stability`) và độ khó (`difficulty`) tiếp theo. Nút Đúng tự động preview khoảng cách ôn tập tiếp theo (vd: `+1 ngày`, `+4 ngày`, `+2 tuần`).
  - Hàng đợi ôn tập 3 cấp ưu tiên (`getReviewQueue`):
    1. **Thẻ học lại trong phiên (Re-learning)**: Thẻ vừa trả lời Sai được đưa lên đầu hàng đợi để củng cố ngay.
    2. **Thẻ đến hạn ôn tập (Due Reviews)**: Sắp xếp theo thứ tự thẻ quá hạn nhiều nhất lên trước (`next_review_timestamp` tăng dần).
    3. **Từ mới (New Cards)**: Giới hạn tối đa 20 từ mới mỗi ngày (`NEW_CARDS_PER_DAY = 20`) để tránh quá tải khi người dùng nghỉ học nhiều ngày.
  - Cơ chế nhận diện thẻ khó nhớ (Leech Detection): Cảnh báo trực quan đối với thẻ có `lapses >= 8` để học viên tập trung ghi nhớ.
- **Kiến trúc Online-First & Đồng bộ Đám mây (Supabase SSOT)**:
  - Dữ liệu ôn tập lưu trữ trên Supabase PostgreSQL (`user_flashcard_reviews` & `user_daily_stats`), hỗ trợ tương thích ngược kép (chọn đồng thời cột mới `stability, difficulty, reps, lapses, state` và cột cũ `repetition_count, interval_days, ease_factor, status`).
  - Tự động di chuyển dữ liệu Client (v2 → v3 Migration): Phát hiện và chuyển đổi định dạng `localStorage` cũ sang schema FSRS v3 khi khởi động ứng dụng.
  - Hàng rào ngoại tuyến (Offline Barrier): Tự động phát hiện khi mất kết nối Internet, hiển thị banner cảnh báo và vô hiệu hóa các nút đánh giá để chống phát sinh tiến độ ma không được lưu.
  - Decoupled Corpus Hydration: Tách biệt nội dung từ điển tĩnh (`VSTEP_CORPUS`) và siêu dữ liệu ôn tập (`srs_metadata`). Đảm bảo khi mở rộng kho từ 1.500 lên 3.000 từ, toàn bộ từ vựng người dùng đã học vẫn được bảo toàn 100%.
- **An toàn Dữ liệu & Đặt lại Deck (ConfirmModal)**:
  - Nút đặt lại Deck được bảo vệ bằng Modal xác nhận cảnh báo 2 bước chống bấm nhầm (`src/components/common/ConfirmModal.tsx`), tự động căn giữa trên Desktop và chuyển thành Bottom Sheet trên Mobile.
  - Nút Hủy bỏ được focus mặc định để tránh xác nhận ngoài ý muốn.
  - Khi xác nhận đặt lại: Xóa sạch dữ liệu trên Supabase Cloud (`user_flashcard_reviews` và `user_daily_stats`), reset `newCardsToday` và đưa số thẻ đã ôn hôm nay về 0.
- **Trải nghiệm Học tương tác & Tối ưu Mobile PWA**:
  - Hiệu ứng 3D Flip Card trực quan, hỗ trợ vuốt chạm trên Mobile và phím tắt (`Space` lật thẻ, `1` = Sai, `2` / `Space` = Đúng).
  - Thống kê tiến độ trực tiếp: Đếm số thẻ đã làm chủ, đang ghi nhớ, số thẻ đã ôn hôm nay, tiến độ từ mới hôm nay (`X/20`) và số thẻ leech.
  - Tối ưu giao diện Mobile (`@media (max-width: 640px)`): Lưới thống kê 2x2 gọn gàng, thanh chuyển tab và thẻ ôn tập trải rộng 100% màn hình, các nút thao tác đầu trang tự động xếp dọc.

## Lộ trình Mở rộng Bổ trợ (Post-MVP Horizons)
- **Grammar Drills Thực chiến**: Ngân hàng bài tập ngữ pháp 4 dạng (Error Correction, Sentence Combining, Fill in the blank, Word Form) kèm giải thích tức thì 100% Client-side.
- **Vocab in Context & Cloze Tests**: Bài tập điền từ theo đoạn văn ~150 từ và Paraphrase drills nhận diện biến thể diễn đạt.
