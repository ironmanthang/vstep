# ĐẶC TẢ TÍNH NĂNG: LUYỆN NGHE (LISTENING STUDIO)

## Cấu trúc Bài thi Nghe VSTEP (35 Câu / 40 Phút)
- **Part 1 (8 câu)**: 8 đoạn thông báo / hướng dẫn ngắn (sân bay, thời tiết, mua sắm). Rèn luyện bắt chi tiết nhanh (con số, giờ giấc, thay đổi thông tin phút chót).
- **Part 2 (12 câu)**: 3 đoạn hội thoại đời sống / công sở (mỗi đoạn 4 câu). Rèn luyện nhận diện mối quan hệ nhân vật và từ khóa chuyển ý (*however, actually, on second thought*).
- **Part 3 (15 câu)**: 3 bài giảng / thuyết trình học thuật (mỗi bài 5 câu). Rèn luyện kỹ năng ghi chú nhanh (Note-taking) và nắm bắt cấu trúc triển khai bài giảng.

## Kiến trúc Unified Listening Runner
Mô-đun được đóng gói thành một `ListeningRunner` duy nhất tiếp nhận tham số `mode`:
- **Practice Mode (`mode: 'practice'`)**:
  - Cho phép tua lại ±5s, chỉnh tốc độ (0.75x, 1.0x, 1.25x), và chọn câu bất kỳ.
  - Tích hợp Dictation Mode để nghe chép chính tả từng câu.
  - Sau khi nộp bài: Hiển thị transcript song ngữ, gạch chân Key Clues và phân tích Distractor Breakdown.
- **Exam Mode (`mode: 'exam'`)**:
  - Khóa toàn bộ các nút tua/pause (audio phát 1 lần liên tục theo đúng tiến trình phòng thi Bộ GD&ĐT).
  - Khóa hoàn toàn transcript, gợi ý và giải thích đáp án.
  - Tự động chuyển câu và chuyển Part theo tiến trình audio.

## Bộ Công cụ Hỗ trợ Luyện Sâu (Scaffolding Tools)
- **Custom Audio Player**: Tua lùi/tiến 5s bằng phím tắt (`Alt+Left` / `Alt+Right`), chỉnh tốc độ nghe (0.75x, 1.0x, 1.25x), thanh scrub trực quan.
- **Chế độ Dictation (Nghe chép chính tả)**: Cắt audio thành từng câu 3–7s; bộ so khớp ký tự Client-side hiển thị màu: xanh lá (đúng), đỏ (sai chính tả/âm đuôi), vàng (thiếu mạo từ/từ nối).
- **Transcript Đồng bộ & Phân tích Manh mối**: Hiển thị phụ đề đồng bộ theo thời gian phát audio, tự động gạch chân câu chứa đáp án (Key Clue) và phân tích lý do các phương án sai (Distractor Breakdown).
