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
| **AI Provider 1** | Google AI Studio (Gemini 2.0 Flash / Pro) | Luyện tập hàng ngày, xử lý native audio Speaking + Writing tức thì (<1s) |
| **AI Provider 2** | OpenRouter (Claude 3.5 Sonnet / GPT-4o) | Chấm Mock Test chính thức chuẩn Barem Bộ GD&ĐT với Strict JSON Schema |
| **AI Provider 3** | Ollama Cloud / Local Endpoint | Hỗ trợ endpoint riêng hoặc cloud models qua OLLAMA_API_KEY |

## Các Tầng Kiến trúc
- **Client Layer (PWA / Browser)**: Giao diện Desktop Split-pane (bài đọc/nghe/viết bên trái, câu hỏi/công cụ bên phải) và Mobile micro-learning (vuốt Flashcard, Quick Quiz). Được bảo vệ bởi Login-First Gate (`<ProtectedRoute>`). Tích hợp Service Worker cache tĩnh App Shell, thực hiện tính toán SM-2 và làm tròn điểm trên Client (0ms), hỗ trợ optimistic UI và bộ đệm Auto-save lưu bản nháp mỗi 5s.
- **Backend & Cloud Layer (Supabase & Cloudflare)**: Supabase quản lý xác thực Google OAuth và cơ sở dữ liệu quan hệ chuẩn hóa (Option B Normalized Schema: `user_profiles`, `user_study_logs`, `user_mock_test_results`, `user_flashcard_reviews`, `user_daily_stats`) kèm Row Level Security và trigger tự khởi tạo hồ sơ `handle_new_user()`. Tầng dịch vụ `profileSync.ts` và `srsSync.ts` đồng bộ hai chiều giữa client và Supabase. Static assets phục vụ qua Cloudflare Pages.
- **AI Gateway Layer**: Master API Key Gateway (OpenRouter, Ollama Cloud, Google AI) với cơ chế xoay vòng key (Key Pool Rotation) và tự động fallback. Chi tiết tại [ai_gateway.md](file:///d:/program/vstep/docs/architecture/ai_gateway.md).

## Chiến lược Responsive
- **Desktop (>= 1024px) - Luyện sâu & Thi thử**: Giao diện chia đôi màn hình (Split-pane) độc lập cuộn, hỗ trợ phím tắt (`Space` điều khiển audio, `Alt+Left` tua 5s, `Ctrl+Enter` nộp bài).
- **Mobile (<= 768px) - Micro-Learning**: Tối ưu hóa dạng vuốt thẻ Flashcard, trắc nghiệm 1 chạm và thu âm nhanh, hỗ trợ chạy Standalone PWA toàn màn hình.

## Quản lý Dữ liệu

| Loại Dữ liệu | Vị trí / Cơ chế Lưu trữ | Đặc điểm & Chu kỳ Cập nhật |
| :--- | :--- | :--- |
| **Giao diện & Assets (App Shell)** | CDN + Service Worker Cache | Khởi động tức thì (< 1s), hỗ trợ Standalone PWA |
| **Kho Đề thi & Bài học** | Static TypeScript/JSON Modules | Đóng gói sẵn ở client, tải tức thì, 0 băng thông |
| **Hồ sơ & Mục tiêu (`user_profiles`)** | Supabase PostgreSQL | Tự khởi tạo khi đăng nhập Google, đồng bộ đa thiết bị |
| **Nhật ký học & Streak (`user_study_logs`)** | Supabase PostgreSQL | Bảng chuẩn hóa lưu các ngày học, tránh phình to row profile |
| **Lịch sử Thi thử (`user_mock_test_results`)** | Supabase PostgreSQL | Lưu trữ kết quả thi có cấu trúc theo từng lần nộp bài |
| **Tiến độ SRS (`user_flashcard_reviews`)** | Supabase PostgreSQL | Lưu trạng thái thẻ theo thuật toán SM-2 |
| **Bản nháp Writing & Optimistic Queue** | `localStorage` (Client Buffer) | Auto-save mỗi 5 giây chống mất dữ liệu khi mất kết nối tạm thời |
| **Chấm bài AI (Viết/Nói)** | Master API Gateway (Client/Edge → AI API) | Phản hồi JSON có cấu trúc trực tiếp hiển thị lên UI |

## Ranh giới Xử lý
- **Phía Client (Trình duyệt)**:
  - Tính toán thuật toán Spaced Repetition (SRS) cho Flashcard và chuyển đổi điểm VSTEP (0ms).
  - Chấm tự động trắc nghiệm Listening & Reading tức thì theo khóa đáp án có sẵn.
  - Bộ đếm từ, lọc lỗi chính tả thô, kiểm tra n-gram sao chép đề bài.
  - Thu âm bằng `MediaRecorder`, trích xuất chỉ số âm học qua Web Audio API.
  - Quản lý Auto-save bản nháp bài viết và optimistic state khi offline tạm thời.
- **Phía Supabase Cloud**:
  - Xác thực Google OAuth và bảo vệ dữ liệu bằng Row-Level Security.
  - Đồng bộ trạng thái học tập giữa Desktop và Mobile.
- **Phía AI Gateway (Master Key Cloud)**:
  - Nhận payload từ Client, gọi LLM / Native Audio API với Barem VSTEP.
  - Xuất kết quả phân tích theo Strict JSON Schema để render UI.
