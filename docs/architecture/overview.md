# KIẾN TRÚC HỆ THỐNG (SYSTEM OVERVIEW)

## Nguyên tắc Lựa chọn Công nghệ
- **Nhẹ, Nhanh & Tối ưu Hiệu năng**: Ưu tiên giải pháp thuần Web W3C, hạn chế thư viện nặng nề để đảm bảo tốc độ tải tức thì trên mọi thiết bị.
- **Tiết kiệm Chi phí Vận hành (Cost-Effective)**: Tối đa hóa xử lý Client-side cho bài tập trắc nghiệm, ngữ pháp, flashcard; chỉ gọi AI Cloud API khi chấm Writing và Speaking.
- **Chuẩn PWA Hiện đại**: Hỗ trợ cài đặt ứng dụng (Add to Home Screen) chạy Standalone trên cả Mobile và Desktop.
- **Online-First & Auto-save Resilience**: Dữ liệu đồng bộ tập trung qua Supabase; kiến trúc Login-First (Google OAuth) bảo đảm tính toàn vẹn và đồng bộ đa thiết bị; tích hợp bộ đệm tự động lưu bản nháp (Auto-save) và optimistic UI tại Client phòng ngừa rớt mạng.

## Danh mục Công nghệ

| Thành phần | Công nghệ lựa chọn | Vai trò & Mục đích |
| :--- | :--- | :--- |
| **Core Framework** | React 19 + TypeScript (Vite) | UI Component hóa, Type safety chống lỗi schema, HMR cực nhanh |
| **Styling** | Vanilla CSS Tokens | Quản lý CSS Variables toàn cục (Warm Cream #FAF8F5 / Warm Obsidian #141210 / Amber Gold #D4A373) |
| **Testing & CI/CD** | Vitest + Oxlint + GitHub Actions | Unit tests tốc độ cao (<300ms), linting tĩnh siêu nhanh (<25ms) và pipeline pre-push song song |
| **PWA & App Shell** | Web App Manifest + Service Worker | Cài đặt Standalone, cache tĩnh App Shell, font và icons |
| **Client Storage** | LocalStorage / SessionStorage | Lưu trữ Developer overrides, UI preferences, bộ đệm Auto-save và optimistic fallback |
| **Audio Processing** | Web Audio API + MediaRecorder API | Thu âm trực tiếp trên trình duyệt, đo chỉ số âm học (WPM, khoảng lặng) |
| **Backend & Database** | Supabase (Google Auth + PostgreSQL Normalized Tables) | Xác thực Google OAuth tập trung, lưu trữ hồ sơ, nhật ký học, streak, lịch sử thi và flashcards |
| **Static Hosting & Edge** | Cloudflare Pages + Cloudflare Workers | Triển khai tĩnh toàn cầu, edge proxy bảo mật nếu cần |
| **Media Storage** | Cloudflare R2 | Lưu trữ file audio bài nghe và file ghi âm bài nói |
| **Compute Backend (Tùy chọn)** | Google Cloud Run | Serverless container khi cần xử lý background jobs nặng |
| **AI Provider 1 (Primary)** | Google AI Studio (Gemini 3.5 Flash Lite) | Mô hình hạt nhân thống nhất cho cả Writing và Speaking (Native Audio), 500 RPD, 15 RPM, phản hồi ~6s |
| **AI Provider 2 (Fallback)** | OpenRouter (Claude 3.5 Sonnet / GPT-4o) | Dự phòng khi Google AI gặp Rate Limit hoặc sự cố |
| **AI Provider 3 (Fallback)** | Ollama Cloud / Local Endpoint | Endpoint dự phòng mã nguồn mở qua OLLAMA_API_KEY |

## Các Tầng Kiến trúc
- **Client Layer (PWA / Browser)**: Giao diện Desktop Split-pane (bài đọc/nghe/viết bên trái, câu hỏi/công cụ bên phải) và Mobile micro-learning (vuốt Flashcard, Quick Quiz). Được bảo vệ bởi Login-First Gate (`<ProtectedRoute>`). Tích hợp Service Worker cache tĩnh App Shell, thực hiện tính toán FSRS v6 và làm tròn điểm trên Client (0ms), hỗ trợ optimistic UI và bộ đệm Auto-save lưu bản nháp mỗi 5s. Toàn bộ bài thi Nghe và Đọc được chấm tiền định 100% tại Client (Zero-AI Runtime).
- **Backend & Cloud Layer (Supabase & Cloudflare)**: Supabase quản lý xác thực Google OAuth và cơ sở dữ liệu quan hệ chuẩn hóa (Option B Normalized Schema: `user_profiles`, `user_study_logs`, `user_mock_test_results`, `user_flashcard_reviews`, `user_daily_stats`) kèm Row Level Security và trigger tự khởi tạo hồ sơ `handle_new_user()`. Tầng dịch vụ `profileSync.ts` và `srsSync.ts` đồng bộ hai chiều giữa client và Supabase. Static assets phục vụ qua Cloudflare Pages.
- **AI Gateway Layer**: Master API Key Gateway chuẩn hóa trên mô hình hạt nhân `gemini-3.5-flash-lite` với cơ chế xoay vòng key (Key Pool Rotation) và tự động fallback sang OpenRouter / Ollama Cloud. Chi tiết tại [ai_gateway.md](file:///d:/program/vstep/docs/architecture/ai_gateway.md).

## Chiến lược Responsive & PWA Standalone
- **Desktop (>= 1024px) - Luyện sâu & Thi thử**: Sidebar điều hướng cố định kèm thẻ mục tiêu cá nhân, giao diện chia đôi màn hình (Split-pane) độc lập cuộn, hỗ trợ phím tắt (`Space` điều khiển audio, `Alt+Left` tua 5s, `Ctrl+Enter` nộp bài).
- **Mobile (<= 1023px / <= 640px) - Micro-Learning & App Shell**: Sidebar tự động chuyển thành thanh điều hướng dưới đáy (Mobile Bottom Nav). Đầu trang tích hợp Mobile Header dính (Sticky) tự động căn khoảng cách tai thỏ (`safe-area-inset-top`), chứa thương hiệu, tiêu đề trang, avatar, nút đổi giao diện sáng/tối và nút Đăng xuất một chạm.
- **Thiết kế Tối giản Không Cuộn trên Di động (Mobile Zero-Scroll Minimalism)**: Các trang điều hướng chính (Trang chủ `/`, Luyện kỹ năng `/practice`, Phòng thi thử `/mock-test`) được tối ưu hóa hiển thị trọn vẹn trong khung nhìn dọc ~500px của điện thoại mà không cần cuộn trang. Trang chủ hợp nhất thành Trung tâm Người học (Unified Learner Hub) tích hợp thẻ Hồ sơ (avatar, đổi tên, Gmail, huy hiệu Cloud), lưới 4 chỉ số cốt lõi (Từ vựng đang học, Từ đã thuộc, Bài đã luyện, Thi thử gần nhất) và khu vực đặt lại Deck từ vựng; loại bỏ hoàn toàn các thẻ điều hướng trùng lặp với thanh đáy. Trang Luyện kỹ năng bố trí lưới 2x2 rút gọn gồm biểu tượng, tên kỹ năng tiếng Anh và huy hiệu. Phòng thi thử (`/mock-test`) tinh giản thanh chọn đề gọn nhẹ, tên kỹ năng chuẩn tiếng Anh (`Listening`, `Reading`, `Writing`, `Speaking`), quy chế 1 dòng và nút Bắt đầu hiển thị tức thì. Các route `/profile`, `/settings`, `/dev` tự động chuyển hướng về `/`.
- **Flexbox Containment & Bounded Width**: Áp dụng `min-width: 0`, `max-width: 100%`, và `overflow-x: hidden` trên toàn bộ chuỗi App Shell (`.main-wrapper`, `.content-container`, `.flashcard-page`) triệt tiêu lỗi tràn khung ngang do các hàng nút dài (`white-space: nowrap`) trên di động.
- **PWA App Badging & Hệ thống Thông báo SRS**: Tự động đồng bộ số lượng thẻ cần ôn lên huy hiệu icon ứng dụng (`navigator.setAppBadge`) trên Android Chrome và Desktop. Tích hợp Workbox extension `public/sw-custom.js` xử lý `notificationclick` (tự động focus/mở tab `/flashcard`) và `periodicsync` phục vụ kiểm tra và gửi thông báo chạy ngầm.
- **Điều phối Cập nhật PWA 1 Lần Làm Mới & Điều hướng Network-Direct (`registerServiceWorker.ts` & `vite.config.ts`)**:
  - **Điều hướng Network-Direct (Zero Stale HTML)**: Cấu hình `navigateFallback: null`, `globIgnores: ['**/index.html']` trong Workbox và `updateViaCache: 'none'` trên Service Worker registration. Mọi yêu cầu tải trang/reload luôn đi trực tiếp tới Cloudflare Pages qua mạng để nhận ngay `index.html` mới nhất (`max-age=0`), không bao giờ bị Service Worker chặn và trả về HTML cũ từ cache cục bộ.
  - **Guaranteed 1-Refresh Deploy**: Đánh giá `performance.now() < 8000ms` khi nhận sự kiện `controllerchange`. Khi người dùng reload (`F5` hoặc pull-to-refresh trên mobile) và Service Worker mới kích hoạt (`skipWaiting()` + `clientsClaim()`), trang tự động tải lại 1 lần duy nhất để phục vụ ngay bản build mới nhất, triệt tiêu lỗi bóng ma bản cũ (stale ghost) mà không đòi hỏi reload 2 lần.
  - **Bảo vệ Phiên Làm Việc (Active Session Protection)**: Khi người dùng đang làm bài (`performance.now() >= 8000ms`), hệ thống tuyệt đối không reload cưỡng bức làm mất bài thi (Mock Test 180 phút, Writing, Speaking). Thay vào đó, phát sự kiện `vstep:sw-update-available` hiển thị toast thông báo nhẹ nhàng (`UpdateNotificationToast.tsx`) kèm nút [Cập nhật].
  - **First-Visit Guard**: Kiểm tra `hadControllerOnLoad` ngăn chặn hiện tượng chớp reload khi người dùng mới truy cập lần đầu.
  - **Foreground & Network Re-check**: Lắng nghe `visibilitychange`, `pageshow` và `online` gọi `registration.update()` ngay khi người dùng mở lại tab hoặc khởi động PWA từ màn hình chính iOS.
  - **Tự Chữa Lỗi Chunk (Chunk Self-Healing)**: Lắng nghe sự kiện native `vite:preloadError` kết hợp `lazyWithRetry.ts` và `ChunkErrorBoundary.tsx` tự động reload 1 lần an toàn qua `sessionStorage` khi mã băm tài nguyên thay đổi sau đợt deploy mới, tránh màn hình trắng (white screen).

## Quản lý Dữ liệu

| Loại Dữ liệu | Vị trí / Cơ chế Lưu trữ | Đặc điểm & Chu kỳ Cập nhật |
| :--- | :--- | :--- |
| **Giao diện & Assets (App Shell)** | CDN + Service Worker Cache | Khởi động tức thì (< 1s), hỗ trợ Standalone PWA |
| **Kho Đề thi & Bài học** | Static TypeScript/JSON Modules | Đóng gói sẵn ở client, tải tức thì, 0 băng thông |
| **Hồ sơ & Mục tiêu (`user_profiles`)** | Supabase PostgreSQL | Tự khởi tạo khi đăng nhập Google, đồng bộ đa thiết bị |
| **Nhật ký học & Streak (`user_study_logs`)** | Supabase PostgreSQL | Bảng chuẩn hóa lưu các ngày học, tránh phình to row profile |
| **Kết quả Bài nộp (`user_test_submissions`)** | Supabase PostgreSQL | Lưu trữ điểm số, câu trả lời, cờ đánh dấu theo `(user_id, test_id, mode)`. Tự động xóa khi người dùng bấm làm lại |
| **Lịch sử Thi thử (`user_mock_test_results`)** | Supabase PostgreSQL | Lưu trữ kết quả thi có cấu trúc theo từng lần nộp bài 180 phút |
| **Tiến độ SRS (`user_flashcard_reviews` & `user_daily_stats`)** | Supabase PostgreSQL | Lưu trạng thái thẻ theo thuật toán FSRS v6 (stability, difficulty, reps, lapses, state) và bộ đếm ngày, kiến trúc Online-First |
| **Bộ đệm Client & Cô lập Tài khoản** | LocalStorage (`userStorage.ts`) | Phân vùng theo User ID (`vstep_${userId}_*`), tự động xóa sạch khi đăng xuất; lưu bản nháp Auto-save, cached deck, phiên làm bài nghe và hạn mức AI |
| **Chấm bài AI (Viết/Nói)** | Master API Gateway (Client/Edge → AI API) | Phản hồi JSON có cấu trúc trực tiếp hiển thị lên UI |

## Ranh giới Xử lý
- **Phía Client (Trình duyệt)**:
  - Tầng lưu trữ `userStorage.ts` cô lập triệt để dữ liệu theo `userId` (`vstep_${userId}_*`), tự động xóa sạch khi đăng xuất chống rò rỉ dữ liệu giữa các tài khoản trên cùng thiết bị.
  - **Khởi tạo Cục bộ Đồng bộ & Triệt tiêu Chớp Nháy (Zero Double-Render Flash)**: `authStore.ts` hoạt động như một singleton module store qua native React `useSyncExternalStore`, quét token `localStorage` (`sb-*-auth-token`) ngay khi nạp module để cung cấp `user` và `userId` đồng bộ ở Frame 1 (0ms). `useFlashcardStore.ts` và `userStore.ts` khởi tạo trạng thái tức thì từ bộ nhớ đệm cục bộ (`flashcard_deck_v3`, `user_learning_profile_v2`), triệt tiêu hoàn toàn hiện tượng chớp nhấp nháy từ vựng mặc định `curriculum` và chỉ số 0 khi chuyển tab.
  - **Cổng Đồng Bộ Cloud Theo Phiên (Session-Gated Cloud Sync)**: Sử dụng các Set cấp module (`syncedSRSUserIds`, `syncedProfileUserIds`) bảo đảm Supabase Cloud chỉ được truy vấn đối soát chạy ngầm 1 lần duy nhất khi nạp ứng dụng / F5 hoặc đổi tài khoản. Chuyển đổi nội bộ giữa các tab hoàn toàn chạy cục bộ 0ms, không phát sinh HTTP request lặp lại.
  - Cơ chế Uniform Cloud Projection chiếu trực tiếp bản ghi đám mây lên danh mục tĩnh, triệt tiêu hoàn toàn lỗi ghép thẻ Frankenstein.
  - Cơ chế Remote Reset Reconciliation tự động phát hiện và đồng bộ hóa trạng thái reset/retake từ thiết bị khác (xóa local cache khi cloud trả về rỗng).
  - Tính toán thuật toán Spaced Repetition (SRS) cho Flashcard và chuyển đổi điểm VSTEP (0ms), hàng rào ngoại tuyến dừng ôn tập khi mất kết nối mạng.
  - Chấm tự động trắc nghiệm Listening & Reading tức thì theo khóa đáp án có sẵn.
  - Hộp thoại xác nhận chung (`src/components/common/ConfirmModal.tsx`) ngăn ngừa xóa nhầm tiến độ học tập và bài thi.
  - Bộ đếm từ, lọc lỗi chính tả thô, kiểm tra n-gram sao chép đề bài.
  - Thu âm bằng `MediaRecorder`, trích xuất chỉ số âm học qua Web Audio API.
  - Quản lý Auto-save bản nháp bài viết và optimistic state khi offline tạm thời.
- **Phía Supabase Cloud**:
  - Xác thực Google OAuth và bảo vệ dữ liệu bằng Row-Level Security.
  - Đồng bộ trạng thái học tập giữa Desktop và Mobile (hồ sơ, streak, kết quả bài nộp, tiến độ SRS).
  - Xóa sạch dữ liệu đám mây (`user_flashcard_reviews` & `user_daily_stats` khi người dùng đặt lại Deck; `user_test_submissions` khi người dùng chọn làm lại bài) chống hiện tượng nạp đè dữ liệu cũ.
- **Phía AI Gateway (Master Key Cloud)**:
  - Nhận payload từ Client, gọi LLM / Native Audio API với Barem VSTEP.
  - Xuất kết quả phân tích theo Strict JSON Schema để render UI.
