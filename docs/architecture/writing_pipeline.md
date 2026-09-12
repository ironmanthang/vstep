# PIPELINE CHẤM WRITING & VIETLISH AI

## Kiến trúc Pipeline Chấm 3 Tầng (3-Tier Hybrid Architecture)

### Tầng 1: Local Deterministic Pre-calculation & Hygiene Check (< 50ms, Client-side)
- **Đếm từ thời gian thực**: Sử dụng regex `\b[a-zA-Z0-9'-]+\b`, đồng bộ chính xác với phần mềm thi máy tính Đại học Văn Lang (VLU) và Bộ GD&ĐT (Task 1: 120 từ, Task 2: 250 từ).
- **Phát hiện sao chép đề lọc từ dừng (Stop-Word & Epistolary-Aware Anti-Copying)**: 
  - Lọc bỏ danh sách từ phụ/từ dừng (*the, a, an, in, on, at, to, for, and, is, are*) và các cụm từ mở/kết thư quy ước (*"Dear...", "I am writing this letter to...", "Best regards"*) trước khi bóc tách tri-gram.
  - Đo tỷ lệ trùng lặp thực chất giữa bài làm và đề bài. Chỉ cảnh báo trừ điểm khi thí sinh chép nguyên vẹn các câu hướng dẫn nội dung của đề bài (> 30%).
- **Lọc lỗi cú pháp bề mặt**: Regex phát hiện nhanh các mẫu sai cơ bản:
  - Cặp liên từ thừa do tư duy tiếng Việt (*Although... but...*, *Because... so...*, *If... then...*).
  - Khuyết chủ ngữ giả (*In [Location] have many...*).
- **Inject dữ liệu tiền tính toán**: Đưa trực tiếp số từ và các mẫu phát hiện bề mặt vào payload gửi lên LLM để mô hình không phải ước lượng số từ.

### Tầng 2: Evidence-First LLM Evaluation (`gemini-3.5-flash-lite`, Strict JSON Schema)
- **Mô hình & Cấu hình**: Chuẩn hóa trên `gemini-3.5-flash-lite` (500 RPD, 15 RPM, độ trễ < 6s), `temperature = 0.1` đảm bảo tính tái lập.
- **Chuẩn hóa Bậc 3 (B1 Pass Gate)**: Đánh giá theo barem B1 Quyết định 729/QĐ-BGDĐT:
  - Task 1: Đáp ứng đủ 3 ý gợi ý, có lời chào và kết thư phù hợp, đạt $\ge$ 120 từ.
  - Task 2: Có bố cục 4 đoạn rõ ràng, nêu rõ quan điểm cá nhân, tối thiểu 2 luận điểm kèm ví dụ, đạt $\ge$ 250 từ.
  - Chấp nhận câu văn đơn/ghép ngắn và lỗi từ vựng/ngữ pháp nhỏ không làm gián đoạn việc truyền tải thông tin.
- **Quy tắc sinh bằng chứng trước điểm số (Evidence-First Output Ordering)**: Bắt buộc mô hình xuất toàn bộ bằng chứng, trích dẫn lỗi và lập luận trước khi đưa ra điểm số:
  - `prompt_points_analysis`: Liệt kê từng yêu cầu của đề bài và trích dẫn câu văn của thí sinh trả lời yêu cầu đó.
  - `thesis_statement`: Trích xuất câu chủ đề/luận điểm chính của bài viết (Task 2).
  - `priority_action_items`: 2 đến 3 trọng tâm hành động thực tế bằng tiếng Việt giúp học viên vượt ngưỡng điểm B1.
  - `error_catalog`: Mảng chi tiết các lỗi gồm loại lỗi (`grammar`, `vietlish`, `vocabulary`, `spelling`), vị trí trích dẫn, câu sửa mẫu và giải thích nguyên nhân.
  - `praise_highlights`: Ghi nhận điểm sáng của bài viết.
  - `justifications`: Nhận xét định tính cho 4 tiêu chí MOET (Task Fulfillment, Organization, Vocabulary, Grammar).
  - `criteria_scores`: Điểm số cuối cùng cho từng tiêu chí trên thang 0.0 - 10.0.
  - `ai_fixed_b1_essay`: Viết lại bài của thí sinh thành phiên bản chuẩn B1 từ chính ý tưởng gốc, sửa sạch lỗi ngữ pháp và Vietlish, dùng cấu trúc câu tự nhiên, dễ học.

### Tầng 3: Deterministic Composite Scoring & Persistence (TypeScript Runtime)
- **Công thức trọng số chuẩn MOET**:
  - `Task 1`: Chiếm 1/3 tổng điểm (33.3%).
  - `Task 2`: Chiếm 2/3 tổng điểm (66.7%).
  - Điểm tổng Writing trước làm tròn: `(Task 1 + Task 2 * 2) / 3`.
- **Làm tròn chuẩn 0.5**: Áp dụng thuật toán làm tròn chính thức của Bộ GD&ĐT (phần thập phân < 0.25 làm tròn xuống .0, từ 0.25 đến < 0.75 làm tròn thành .5, >= 0.75 làm tròn lên 1.0).
- **Lưu trữ**: Bản nháp lưu tự động mỗi 5 giây vào LocalStorage (`vstep_writing_session_${testId}_${mode}`) và đồng bộ đám mây.

---

## Hệ Thống Phân Loại Lỗi Vietlish (Empirical L1 Transfer Taxonomy)

### Nhóm Lỗi Cú Pháp (Syntactic Transfer)
- **Khuyết từ nối giả (Missing Existential "There is/are")**: Tiếng Việt dùng động từ "có" ở đầu câu hoặc sau trạng ngữ chỉ nơi chốn.
  - Sai: *"In modern society has many issues"* hoặc *"In Vietnam have many cars"*.
  - Đúng: *"In modern society, there are many issues"*.
- **Câu thiếu động từ to be / vị ngữ tính từ (Zero Copula)**: Trong tiếng Việt, tính từ có thể trực tiếp làm vị ngữ mà không cần hệ từ.
  - Sai: *"Online learning very convenient"* hoặc *"This problem dangerous"*.
  - Đúng: *"Online learning is very convenient"*.
- **Cặp liên từ song song (Double Conjunctions)**: Chuyển dịch nguyên mẫu cặp "Tuy... nhưng...", "Vì... nên...", "Nếu... thì...".
  - Sai: *"Although he tried hard, but he failed"* / *"Because it is rain, so I stay home"*.
  - Đúng: *"Although he tried hard, he failed"* / *"Because it rained, I stayed home"*.
- **Cấu trúc chủ đề - thuyết minh (Topic-Comment Structure)**: Đưa chủ đề lên đầu câu không làm chủ ngữ ngữ pháp rõ ràng.
  - Sai: *"This problem, government should solve soon"*.
  - Đúng: *"The government should address this problem promptly"*.

### Nhóm Lỗi Hình Thái (Morphological Transfer)
- **Danh từ đếm được đứng trơ trọi (Bare Countable Nouns)**: Tiếng Việt không có mạo từ bất định (*a/an*) hay biến tố số nhiều (*-s/-es*).
  - Sai: *"Student should wear uniform when go to school"*.
  - Đúng: *"Students should wear uniforms when going to school"* hoặc *"A student should wear a uniform..."*.
- **Lỗi biến tố thời - thể (Tense/Aspect Dropping)**: Dựa vào từ chỉ thời gian (*yesterday, already*) thay vì chia thì của động từ.
  - Sai: *"Yesterday my family go to the beach"*.
  - Đúng: *"Yesterday my family went to the beach"*.

### Nhóm Lỗi Kết Hợp Từ & Giới Từ (Lexical Calque & Preposition Transfer)
- **Dịch thô nguyên ngữ (Word-for-Word Calque)**:
  - Sai: *"Open the light / Close the television"* -> Đúng: *"Turn on the light / Turn off the television"*.
  - Sai: *"Learn by heart knowledge"* -> Đúng: *"Acquire knowledge / Memorize information"*.
  - Sai: *"Expensive price"* -> Đúng: *"High price / Expensive goods"*.
  - Sai: *"Smoke cigarette"* -> Đúng: *"Smoke"*.
- **Sai giới từ đi kèm do dịch nghĩa tiếng Việt**:
  - Sai: *"Pay attention on"* (Chú ý vào) -> Đúng: *"Pay attention to"*.
  - Sai: *"Discuss about the issue"* (Thảo luận về) -> Đúng: *"Discuss the issue"*.
  - Sai: *"Marry with someone"* (Kết hôn với) -> Đúng: *"Marry someone"*.
  - Sai: *"Depend in"* -> Đúng: *"Depend on"*.

---

## Mốc Điểm Tham Chiếu (Anchor Benchmarks)

### Mốc B1 (Thang 4.0 - 5.5) - Mục Tiêu Trọng Tâm Tốt Nghiệp
- **Đặc trưng**: Hoàn thành được các ý cơ bản của đề bài. Câu văn chủ yếu là câu đơn và câu ghép nối bằng *and, but, so, because*. Bố cục 4 đoạn rõ ràng.
- **Từ vựng & Ngữ pháp**: Vốn từ quen thuộc đời sống. Còn một số lỗi mạo từ, chia thì hoặc Vietlish cơ bản nhưng người đọc vẫn nắm được thông điệp chính.

### Mốc B2 (Thang 6.0 - 8.0)
- **Đặc trưng**: Đáp ứng đầy đủ các yêu cầu của đề bài. Task 2 có Thesis Statement rõ ràng ở mở bài và bố cục 4 đoạn mạch lạc.
- **Từ vựng & Ngữ pháp**: Sử dụng được các câu phức với mệnh đề quan hệ, mệnh đề nhượng bộ (*Although/Even though*), thể bị động. Vốn từ chủ đề phong phú, ít lỗi ngữ pháp cơ bản.

### Mốc C1 (Thang 8.5 - 10.0)
- **Đặc trưng**: Luận điểm sâu sắc, đa chiều, văn phong học thuật tự nhiên. Bố cục chặt chẽ với các phương tiện liên kết tinh tế.
- **Từ vựng & Ngữ pháp**: Sử dụng chính xác các cấu trúc phức tạp và vốn từ học thuật cao cấp (C1 collocations). Độ chính xác ngữ pháp và chính tả gần như tuyệt đối.

---

## Mô Hình Quản Lý Thời Gian Thi Máy Tính (VLU Unified 60-Minute Pacing)
- **Bộ đếm thời gian thống nhất**: Đồng hồ 60:00 đếm ngược dùng chung cho cả 2 Task, thí sinh chủ động chuyển đổi qua lại giữa Task 1 và Task 2.
- **Khuyến nghị phân bổ thời gian**:
  - Phút 0 - 20: Tập trung hoàn thành Task 1 (Thư/Email $\ge$ 120 từ, chiếm 1/3 điểm).
  - Phút 20 - 55: Viết bài luận Task 2 ($\ge$ 250 từ, chiếm 2/3 điểm).
  - Phút 55 - 60: Rà soát lỗi chính tả, ngữ pháp và đối chiếu số từ cả 2 bài.
- **Cảnh báo nhịp độ (Pacing Alerts)**: Hệ thống đưa ra thông báo nhắc nhở nhẹ tại mốc phút 20 để bảo vệ 67% điểm số của Task 2.
