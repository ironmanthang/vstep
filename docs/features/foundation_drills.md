# ĐẶC TẢ TÍNH NĂNG: BỔ TRỢ NỀN TẢNG (FOUNDATION & CURATED SRS)

## Học Từ vựng Ngắt quãng (Flashcard SRS Cốt lõi)
- **Bộ 1.500 Từ vựng Trọng tâm Trích xuất Đề thi Thật**:
  - Trích xuất trực tiếp từ các bộ đề thi thật và đề minh họa chuẩn của **ULIS (ĐH Ngoại ngữ – ĐHQGHN)** và **ĐH Sư phạm TP.HCM** kết hợp các cụm học thuật B1/B2.
  - Phân loại theo 8 chủ đề VSTEP chuẩn: Giáo dục & Học tập, Công việc & Sự nghiệp, Sức khỏe & Lối sống, Môi trường & Tự nhiên, Khoa học & Công nghệ, Du lịch & Đô thị, Xã hội & Văn hóa, Truyền thông & Giao tiếp.
  - Cấu trúc thẻ đầy đủ: Từ vựng, phiên âm IPA chuẩn, audio phát âm bản xứ, định nghĩa tiếng Việt ngắn gọn, Collocations đi kèm và câu ví dụ song ngữ trích từ ngữ cảnh bài thi.
- **Thuật toán Spaced Repetition (SRS)**:
  - Đánh giá 3 mức độ ghi nhớ: Quên (Again - 1 ngày), Nhớ (Good - 3/7/14 ngày), Rất dễ (Easy - 30 ngày).
  - Tự động phân bổ vào hàng đợi ôn tập hàng ngày (Daily Review Queue).
- **Kiến trúc Online-First & Đồng bộ Đám mây (Supabase SSOT)**:
  - Dữ liệu ôn tập lưu trữ trực tiếp trên Supabase PostgreSQL (`user_flashcard_reviews` & `user_daily_stats`).
  - Hàng rào ngoại tuyến (Offline Barrier): Tự động phát hiện khi mất kết nối Internet, hiển thị banner cảnh báo và vô hiệu hóa các nút đánh giá để chống phát sinh tiến độ ma không được lưu.
  - Decoupled Corpus Hydration: Tách biệt nội dung từ điển tĩnh (`VSTEP_CORPUS`) và siêu dữ liệu ôn tập (`srs_metadata`). Đảm bảo khi mở rộng kho từ 1.500 lên 3.000 từ, toàn bộ từ vựng người dùng đã học vẫn được bảo toàn 100%.
- **An toàn Dữ liệu & Đặt lại Deck (ConfirmResetModal)**:
  - Nút đặt lại Deck được bảo vệ bằng Modal cảnh báo 2 bước chống bấm nhầm (ConfirmResetModal), tự động căn giữa trên Desktop và chuyển thành Bottom Sheet trên Mobile.
  - Nút Hủy bỏ được focus mặc định để tránh xác nhận ngoài ý muốn.
  - Khi xác nhận đặt lại: Xóa sạch dữ liệu trên Supabase Cloud (`user_flashcard_reviews` và `user_daily_stats`), đưa số thẻ đã ôn hôm nay về 0 và đưa Deck về trạng thái ban đầu.
- **Trải nghiệm Học tương tác**:
  - Hiệu ứng 3D Flip Card trực quan, hỗ trợ vuốt chạm trên Mobile và phím tắt (`Space` lật thẻ, `1`/`2`/`3` chọn mức độ nhớ).
  - Thống kê tiến độ trực tiếp: Đếm số thẻ đã làm chủ, đang ghi nhớ và số thẻ đã ôn hôm nay.

## Lộ trình Mở rộng Bổ trợ (Post-MVP Horizons)
- **Grammar Drills Thực chiến**: Ngân hàng bài tập ngữ pháp 4 dạng (Error Correction, Sentence Combining, Fill in the blank, Word Form) kèm giải thích tức thì 100% Client-side.
- **Vocab in Context & Cloze Tests**: Bài tập điền từ theo đoạn văn ~150 từ và Paraphrase drills nhận diện biến thể diễn đạt.
