# ĐẶC TẢ TÍNH NĂNG: THI THỬ THỰC CHIẾN (FULL MOCK TEST SIMULATOR)

## Mock Exam Orchestrator (Điều phối Phòng thi Máy tính 180 Phút)
- **Kiến trúc Điều phối 4 Kỹ năng Liên hoàn**:
  - Mock Exam Orchestrator lần lượt kích hoạt 4 Unified Runner ở chế độ thi chuẩn (`mode: 'exam'`):
    - **Listening Runner (40 phút / 35 câu)**: Audio phát 1 lần liên tục, khóa tua lùi, khóa phụ đề.
    - **Reading Runner (60 phút / 40 câu)**: 4 bài đọc chia đôi màn hình, khóa toàn bộ công cụ tra từ.
    - **Writing Runner (60 phút / 2 task)**: Soạn thảo thư & luận, đếm từ thời gian thực, auto-save mỗi 5s.
    - **Speaking Runner (12 phút / 3 part)**: Ghi âm liên tục theo đồng hồ đếm ngược kèm âm báo BEEP chuẩn Bộ GD&ĐT.
- **Tính năng Phòng thi Máy tính Chuẩn MOET**:
  - **Question Palette**: Thanh điều hướng câu hỏi trắc nghiệm trực quan (Xanh: Đã làm, Trắng: Chưa làm, Vàng: Gắn cờ Flag để kiểm tra lại).
  - **Cảnh báo Chống Phân tâm**: Hiển thị cảnh báo khi học viên click chuột ra ngoài cửa sổ thi hoặc chuyển tab.
  - **Tự động Thu bài**: Đồng hồ đếm ngược khóa toàn bộ màn hình và tự động nộp bài khi hết thời gian quy định của từng kỹ năng.

## Báo cáo Kết quả & Đánh giá Năng lực Chuẩn VSTEP
- **Thuật toán Làm tròn 0.5 Chuẩn Bộ GD&ĐT**:
  - Tính điểm bình quân 4 kỹ năng (thang điểm 10.0, quy định tại [exam_format.md](file:///d:/program/vstep/docs/exam_format.md)):
    - Điểm < 4.0: Dưới B1 (Không đạt).
    - Điểm 4.0 – 5.5: Đạt Bậc 3 (VSTEP B1).
    - Điểm 6.0 – 8.0: Đạt Bậc 4 (VSTEP B2).
    - Điểm 8.5 – 10.0: Đạt Bậc 5 (VSTEP C1).
- **Radar Chart 4 Kỹ năng & So sánh Tiến độ**:
  - Trực quan hóa độ lệch giữa 4 kỹ năng trên biểu đồ Radar.
  - Theo dõi đường biểu diễn tăng trưởng điểm số qua các lần thi thử.
- **Chế độ Review Chi tiết**:
  - Xem lại từng câu trắc nghiệm sai kèm dẫn chứng trong bài và giải thích chi tiết.
  - Xem toàn bộ nhận xét bôi màu của AI cho phần Viết và phân tích âm vị cho phần Nói.
