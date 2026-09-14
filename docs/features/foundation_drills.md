# ĐẶC TẢ TÍNH NĂNG: BỔ TRỢ NỀN TẢNG (FOUNDATION & CURATED SRS)

## Học Từ vựng Ngắt quãng (Flashcard SRS Cốt lõi)
- **Bộ 3.000 Từ vựng Trọng tâm Trích xuất Đề thi Thật**:
  - Trích xuất trực tiếp từ các bộ đề thi thật và đề minh họa chuẩn của **ULIS (ĐH Ngoại ngữ – ĐHQGHN)**, **HNUE**, và **HCMUE**:
    - **Đợt 1 (Listening)**: 500 từ trích xuất từ 7 Authentic Mock Tests và 15 HCMUE Drills (`scripts/mine_listening_vocab.mjs`).
    - **Đợt 2 (Reading)**: 500 từ học thuật trích xuất từ 48 bài đọc VSTEP Reading (28 ULIS + 20 HCMUE, 739 phân đoạn văn bản) qua Gemini Flash cascade (`scripts/mine_reading_vocab.mjs`).
    - **Đợt 3 (Writing & Speaking)**: 500 từ diễn đạt học thuật và giao tiếp tự nhiên trích xuất từ 14 đề thi thật ULIS Writing & Speaking, Writing Bank và Speaking Bank qua Gemini Flash cascade (`scripts/mine_productive_vocab.mjs`).
  - Phân loại theo 8 chủ đề VSTEP chuẩn (tổng 3.000 từ, 100% ID và từ vựng duy nhất): Xã hội & Văn hóa (450 từ), Môi trường & Tự nhiên (400 từ), Công việc & Sự nghiệp (380 từ), Sức khỏe & Lối sống (380 từ), Giáo dục & Học tập (350 từ), Du lịch & Đô thị (350 từ), Truyền thông & Giao tiếp (350 từ), Khoa học & Công nghệ (340 từ).
  - Cấu trúc thẻ đầy đủ: Từ vựng, phiên âm IPA chuẩn, audio phát âm bản xứ, định nghĩa tiếng Việt ngắn gọn, Collocations đi kèm và câu ví dụ song ngữ trích từ ngữ cảnh bài thi.
  - **Bộ Lọc Cấp Độ CEFR (B1, B2, C1)**: Cho phép học viên lọc danh sách thẻ theo cấp độ mục tiêu ('Tất cả', 'B1', 'B2', 'C1') kết hợp đồng thời cùng 8 chủ đề, hỗ trợ thí sinh tập trung ôn luyện đúng phân khúc năng lực.
- **Thuật toán Spaced Repetition (FSRS v6 Daily Engine)**:
  - Động cơ lập lịch FSRS v6 qua thư viện `ts-fsrs` với target retention 90% (`request_retention: 0.90`), trần khoảng cách tối đa 365 ngày (`maximum_interval: 365`), tắt các bước ngắn hạn trong phiên (`enable_short_term: false`) để chuẩn hóa chu kỳ lặp lại theo ngày hoàn toàn xác định, và thuật toán jitter/fuzz (`enable_fuzz: true`) chống dồn thẻ.
  - Đánh giá nhị phân (Binary Rating): Loại bỏ lựa chọn độ khó chủ quan, chuẩn hóa thành 2 trạng thái:
    - **Sai** (`Rating.Again`): Lập lịch ôn lại sau 1 ngày (`1 ngày`), loại bỏ bước `10m` learning step trong phiên để đảm bảo tính nhất quán của chu kỳ SRS hàng ngày, tăng bộ đếm `lapses` đối với thẻ đã thuộc.
    - **Đúng** (`Rating.Good`): Tính toán độ bền trí nhớ (`stability`) và độ khó (`difficulty`) tiếp theo theo barem FSRS v6. Nút Đúng tự động preview khoảng cách ôn tập tiếp theo (vd: `1 ngày`, `3 ngày`, `1 tuần`).
  - Hàng đợi học tập ưu tiên (`getReviewQueue`):
    - **Thẻ đến hạn ôn tập (Due Reviews)**: Ưu tiên phục vụ trước, sắp xếp theo thứ tự thẻ quá hạn nhiều nhất lên trước (`next_review_timestamp` tăng dần).
    - **Từ mới (New Cards)**: Phục vụ liên tục sau khi hết thẻ đến hạn theo thứ tự chủ đề, không giới hạn trần cứng (Uncapped Queue), cho phép người học tự do ôn luyện bao nhiêu từ tùy ý trong ngày mà không gặp rào cản nhân tạo.
  - Hàm kiểm đếm đến hạn (`getDueReviewCount`): Chỉ đếm các thẻ đã học thực sự quá hạn (`reps > 0 && next_review_timestamp <= now`), bảo đảm số lượng huy hiệu PWA App Badge và thông báo nhắc nhở luôn phản ánh chính xác số thẻ cần ôn thay vì tràn 3.000 thẻ.
  - Cơ chế nhận diện thẻ khó nhớ (Leech Detection): Cảnh báo trực quan đối với thẻ có `lapses >= 8` để học viên tập trung ghi nhớ.
- **Kiến trúc Online-First & Đồng bộ Đám mây (Supabase SSOT)**:
  - Tính toán chuyển đổi trạng thái đồng bộ: `reviewCard` được thực thi đồng bộ trước khi cập nhật state và đồng bộ trực tiếp lên Supabase `user_flashcard_reviews` theo từng lượt lật thẻ, loại bỏ triệt để race condition và lỗi mất dữ liệu khi làm mới trang.
  - Cơ chế bảo vệ bộ nhớ đệm cục bộ (Local Cache Merge): Khi nạp dữ liệu từ đám mây (`syncWithCloud`), client tự động hợp nhất thông minh giữa bản ghi Supabase và cache cục bộ dựa trên mốc thời gian ôn tập mới nhất (`last_reviewed_at`) và số lần ôn (`reps`), ngăn chặn việc xóa nhầm tiến độ cục bộ khi phản hồi đám mây rỗng hoặc bị trễ.
  - Tầng lưu trữ phân vùng theo tài khoản (`userStorage.ts`): Toàn bộ cache tiến độ flashcard cục bộ được phân vùng theo `userId` (`vstep_${userId}_flashcard_deck_v3`), dọn dẹp sạch sẽ khi đăng xuất chống rò rỉ dữ liệu giữa các tài khoản.
  - Đồng bộ hóa Đặt lại Đa thiết bị (Remote Reset Reconciliation): Khi đám mây trả về deck rỗng (`{}`) do người dùng đã đặt lại trên thiết bị khác, client tự động reset local cache về `VSTEP_CORPUS` ban đầu thay vì nạp đè dữ liệu cũ.
  - Dữ liệu ôn tập lưu trữ trên Supabase PostgreSQL (`user_flashcard_reviews` & `user_daily_stats`), hỗ trợ tương thích ngược kép (chọn đồng thời cột mới `stability, difficulty, reps, lapses, state` và cột cũ `repetition_count, interval_days, ease_factor, status`).
  - Hàng rào ngoại tuyến (Offline Barrier): Tự động phát hiện khi mất kết nối Internet, hiển thị banner cảnh báo và vô hiệu hóa các nút đánh giá để chống phát sinh tiến độ ma không được lưu.
  - Decoupled Corpus Hydration: Tách biệt nội dung từ điển tĩnh (`VSTEP_CORPUS`) và siêu dữ liệu ôn tập (`srs_metadata`). Đảm bảo khi mở rộng kho từ 1.500 lên 2.000, 2.500 và đạt mốc 3.000 từ, toàn bộ từ vựng người dùng đã học vẫn được bảo toàn 100%.
- **An toàn Dữ liệu & Đặt lại Deck (ConfirmModal)**:
  - Nút đặt lại Deck được bảo vệ bằng Modal xác nhận cảnh báo 2 bước chống bấm nhầm (`src/components/common/ConfirmModal.tsx`), tự động căn giữa trên Desktop và chuyển thành Bottom Sheet trên Mobile.
  - Nút Hủy bỏ được focus mặc định để tránh xác nhận ngoài ý muốn.
  - Khi xác nhận đặt lại: Xóa sạch dữ liệu trên Supabase Cloud (`user_flashcard_reviews` và `user_daily_stats`), reset toàn bộ thẻ về trạng thái từ mới ban đầu và đưa số thẻ đã ôn hôm nay về 0.
- **Trải nghiệm Học tương tác & Tối ưu Mobile PWA**:
  - **Cử chỉ vuốt chạm tỷ lệ thực (Proportional Touch Swipe)**: Kéo thẻ di chuyển ngang và nghiêng góc tự nhiên theo ngón tay, hiển thị tem phản hồi trực quan (Sai góc trên phải / Đúng góc trên trái). Ngưỡng nhả 90px kích hoạt chấm điểm và trượt thẻ khỏi màn hình; nhả trước ngưỡng tự động đàn hồi về tâm. Chạm nhẹ (<8px) lật thẻ. Cơ chế so sánh deltaY/deltaX tức thì bảo vệ cuộn dọc trang mượt mà.
  - **Triệt tiêu lỗi lộ nghĩa (Spoiled Definition Prevention)**: Đóng băng dữ liệu thẻ cũ trong suốt hiệu ứng thoát thẻ 180ms và tự động lật về mặt trước tiếng Anh trước khi thẻ mới xuất hiện, bảo toàn 100% tính bất ngờ cho active recall.
  - **Mặt sau tinh giản & căn giữa quang học**: Loại bỏ nhãn "Định nghĩa tiếng Việt", huy hiệu chủ đề và tiêu đề tiếng Anh trùng lặp. Căn giữa định nghĩa tiếng Việt đồng trục thị giác với từ vựng mặt trước, bố trí collocations và ví dụ VSTEP ngay bên dưới.
  - **Phím tắt Desktop/Laptop**: Phím mũi tên trái (`←`) chấm Sai, mũi tên phải (`→`) chấm Đúng, phím cách (`Space`) hoặc mũi tên lên/xuống (`↑`/`↓`) lật thẻ, phím `A`/`P` phát âm thanh bản xứ.
  - **Nâng thẻ lên vùng Above-the-Fold trên Mobile**: Thu gọn tiêu đề, mô tả và lưới 3 thẻ thống kê cốt lõi thành thanh trạng thái 1 dòng siêu gọn (`X đang học • Y làm chủ • ✓ Z đã ôn`) khi đang ôn tập hàng đợi. Thẻ Flashcard (cao 385px) và các nút chấm điểm hiển thị trọn vẹn ở trung tâm màn hình mà không cần cuộn.
  - **Đồng bộ màu thanh trạng thái hệ thống**: Cấu hình `theme-color` đồng bộ động theo giao diện, hiển thị màu Dark Obsidian (`#141210`) trong Dark Mode, loại bỏ dải màu vàng lệch tông trên Android PWA và mobile browser.
  - **Chỉ báo cuộn ngang danh sách chủ đề**: Áp dụng hiệu ứng mặt nạ mờ (gradient mask) mép phải báo hiệu vùng cuộn các chủ đề tiếp theo.
- **Thông báo PWA & App Badging Nhắc nhở Ôn tập SRS**:
  - **PWA App Badging API**: Tự động đồng bộ số thẻ cần ôn (`totalDueCount`) trực tiếp lên huy hiệu icon ứng dụng trên màn hình chính (`navigator.setAppBadge` / `navigator.clearAppBadge`) trên Android Chrome PWA và Chromium Desktop. Tự động xóa huy hiệu khi hoàn thành ôn tập hoặc đặt lại Deck.
  - **Động cơ Nhắc nhở Ôn tập Hàng ngày (`src/services/notification/srsReminderService.ts`)**: Lưu trữ cài đặt hẹn giờ trong `localStorage` (`enabled`, `reminderTime`, `lastNotifiedDate`). Hàm kiểm tra thuần túy `isReminderDue` đảm bảo chỉ phát thông báo một lần duy nhất trong ngày khi có từ cần ôn và thời gian hiện tại vượt mốc hẹn.
  - **Custom Service Worker Extensions (`public/sw-custom.js` & `vite.config.ts`)**: Tích hợp `importScripts: ['/sw-custom.js']` vào Workbox PWA. Xử lý `notificationclick` để đóng thông báo và focus hoặc mở tab `/flashcards`. Hỗ trợ `periodicsync` phục vụ kiểm tra và thông báo ngầm trên Android Chromium PWA.
  - **Giao diện Cài đặt Nhắc nhở Responsive (`src/features/flashcard/components/ReminderSettingsModal.tsx`)**: Modal responsive trên Desktop và Bottom Sheet trên Mobile. Cho phép bật/tắt nhắc nhở, chọn mốc giờ nhanh (08:00, 12:30, 20:00) hoặc giờ tùy chỉnh, xem trạng thái quyền trình duyệt và gửi thông báo thử nghiệm kèm rung xúc giác (`[100, 50, 100]`). Tích hợp nút mở tại thanh thao tác `FlashcardPage` và trang `ProfilePage` (`/profile`).

## Lộ trình Mở rộng Bổ trợ (Post-MVP Horizons)
- **Grammar Drills Thực chiến**: Ngân hàng bài tập ngữ pháp 4 dạng (Error Correction, Sentence Combining, Fill in the blank, Word Form) kèm giải thích tức thì 100% Client-side.
- **Vocab in Context & Cloze Tests**: Bài tập điền từ theo đoạn văn ~150 từ và Paraphrase drills nhận diện biến thể diễn đạt.
