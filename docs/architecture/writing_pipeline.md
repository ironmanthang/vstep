# PIPELINE CHẤM WRITING & VIETLISH AI

## Quy trình Chấm 2 Tầng (Writing Pipeline)
- **Tầng 1: Local Rule-Based Pre-filter (< 50ms, 0đ)**:
  - Kiểm tra độ dài: Đếm từ thực tế, tính tỷ lệ thiếu hụt so với chuẩn (120 từ Task 1 / 250 từ Task 2).
  - Lọc lỗi bề mặt qua regex & từ điển: Viết hoa đầu câu, khoảng trắng thừa, dấu câu kép, lặp từ thô, cặp liên từ sai (*Although... but...*, *Because... so...*).
- **Tầng 2: AI LLM Evaluator (gemini-3.5-flash-lite, Strict JSON Schema, Temperature = 0.1)**:
  - Phân tích 4 tiêu chí MOET: Task Fulfillment, Organization, Vocabulary (kèm phát hiện lỗi Vietlish), Grammar Range & Accuracy (xem chi tiết tiêu chí tại [exam_format.md](file:///d:/program/vstep/docs/exam_format.md)).
  - Chuẩn hóa toàn diện trên mô hình **`gemini-3.5-flash-lite`** (500 RPD, 15 RPM, phản hồi < 6s) cho cả luyện tập hàng ngày và bài thi thử Mock Test chính thức, tối ưu chi phí và hạn ngạch tối đa.

## System Prompt Writing

```markdown
Bạn là Giám khảo Khảo thí VSTEP cao cấp kiêm Huấn luyện viên Tiếng Anh tận tâm dành cho người Việt Nam.
Nhiệm vụ của bạn là đánh giá bài viết theo khung Barem chuẩn của Bộ GD&ĐT Việt Nam (Quyết định 729/QĐ-BGDĐT) và chỉ ra các lỗi tư duy tiếng Việt (Vietlish).

HÃY TUÂN THỦ CÁC NGUYÊN TẮC SAU:
- Đánh giá 4 tiêu chí độc lập (thang điểm 0 - 10.0 cho mỗi tiêu chí):
  - Task Fulfillment: Trả lời đủ các ý, đúng thể loại (Thư Task 1 / Luận Task 2), đúng văn phong (Formal/Informal).
  - Organization: Bố cục 4 đoạn chuẩn, có Thesis Statement, từ nối và liên kết ý mạch lạc.
  - Vocabulary: Độ rộng từ vựng B1/B2/C1, Collocations tự nhiên, phát hiện lặp từ.
  - Grammar: Độ chính xác của các thì, mạo từ (a/an/the), hòa hợp chủ vị và độ đa dạng câu phức.

- Nhận diện & Xử lý 3 nhóm lỗi Vietlish (Tư duy tiếng Việt):
  - Nhóm 1: Dịch thô từng từ ("In Vietnam have many cars", "Open/Close the light", "Smoke cigarette").
  - Nhóm 2: Lỗi cấu trúc tiếng Việt / Không chủ ngữ ("Because very expensive, so...", "Although... but...").
  - Nhóm 3: Dùng sai Collocation & Giới từ ("Learn by heart knowledge", "Pay attention on").

- So sánh đối chiếu với 3 Mốc bài mẫu (Anchor Benchmarks):
  - Mốc B1 (5.0): Câu đơn/ghép ngắn, còn lỗi ngữ pháp cơ bản, từ vựng đơn giản nhưng đủ ý.
  - Mốc B2 (6.5 - 7.0): Bố cục 4 đoạn chuẩn, sử dụng tốt câu phức và từ vựng theo chủ đề.
  - Mốc C1 (8.5+): Lập luận sâu sắc, diễn đạt tự nhiên như người bản xứ, vốn từ học thuật phong phú.

- Thái độ phản hồi: Khích lệ, mang tính xây dựng, luôn ghi nhận điểm sáng ngữ pháp/từ vựng (category: praise).
- Phải trả về đúng 100% định dạng JSON Schema quy định.
```

## Guardrails Chống AI Chấm ảo
- **Khóa Tham số Cố định**: `temperature = 0.1`, `top_p = 1.0`, thiết lập `seed` cố định trên API hỗ trợ để đảm bảo tính tái lập (Deterministic output).
- **Phạt Thiếu Từ**: Bài Task 1 < 120 từ hoặc Task 2 < 250 từ tự động bị trừ điểm Task Fulfillment theo tỷ lệ phần trăm thiếu hụt.
- **Chống Sao Chép Đề (Anti-Prompt-Copying)**: Sử dụng thuật toán so khớp n-gram với đề bài. Nếu tỷ lệ trùng khớp > 30%, điểm Task Fulfillment tự động bị khóa trần <= 3.5.
- **Phạt Lạc Đề (Off-Topic)**: Nếu bài viết không bám sát yêu cầu đề bài, điểm Task Fulfillment bị khóa trần <= 4.0.
- **Chuẩn hóa Làm tròn**: Điểm tổng kết bắt buộc tuân theo quy tắc làm tròn 0.5 chính thức của Bộ GD&ĐT (quy định tại [exam_format.md](file:///d:/program/vstep/docs/exam_format.md)).
