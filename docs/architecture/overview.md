# KIẾN TRÚC HỆ THỐNG (SYSTEM OVERVIEW)

## Nguyên tắc Lựa chọn Công nghệ
- **Nhẹ, Nhanh & Tối ưu Hiệu năng**: Ưu tiên giải pháp thuần Web W3C, hạn chế thư viện nặng nề để đảm bảo tốc độ tải tức thì trên mọi thiết bị.
- **Tiết kiệm Chi phí Vận hành (Cost-Effective)**: Tối đa hóa xử lý Client-side cho bài tập trắc nghiệm, ngữ pháp, flashcard; chỉ gọi AI Cloud API khi chấm Writing và Speaking.
- **Chuẩn PWA Hiện đại**: Hỗ trợ cài đặt ứng dụng (Add to Home Screen) chạy Standalone trên cả Mobile và Desktop.
- **Online-First & Auto-save Resilience**: Dữ liệu đồng bộ tập trung; tích hợp bộ đệm tự động lưu bản nháp (Auto-save) tại Client phòng ngừa rớt mạng.

## Danh mục Công nghệ

| Thành phần | Công nghệ lựa chọn | Vai trò & Mục đích |
| :--- | :--- | :--- |
| **Core Framework** | React 19 + TypeScript (Vite) | UI Component hóa, Type safety chống lỗi schema, HMR cực nhanh |
| **Styling** | Vanilla CSS Tokens (Campfire Warm Palette) | Quản lý CSS Variables toàn cục (Warm Cream #FAF8F5 / Warm Obsidian #141210 / Amber Gold #D4A373) |
| **Testing & CI/CD** | Vitest + Oxlint + GitHub Actions | Unit tests tốc độ cao (<300ms), linting tĩnh siêu nhanh (<25ms) và pipeline pre-push song song |
| **PWA & App Shell** | Web App Manifest + Service Worker | Cài đặt Standalone, cache tĩnh App Shell, font và icons |
| **Client Storage** | LocalStorage / SessionStorage | Lưu trữ Developer overrides, UI preferences, bộ đệm Auto-save bản nháp |
| **Audio Processing** | Web Audio API + MediaRecorder API | Thu âm trực tiếp trên trình duyệt, đo chỉ số âm học (WPM, khoảng lặng) |
| **Backend & Database** | Supabase (Auth + PostgreSQL + Realtime) | Xác thực người dùng, lưu trữ tiến độ học, streak và lịch sử làm bài |
| **Static Hosting & Edge** | Cloudflare Pages + Cloudflare Workers | Triển khai tĩnh toàn cầu, edge proxy bảo mật nếu cần |
| **Media Storage** | Cloudflare R2 | Lưu trữ file audio bài nghe và file ghi âm bài nói |
| **Compute Backend (Tùy chọn)** | Google Cloud Run | Serverless container khi cần xử lý background jobs nặng |
| **AI Provider 1** | Google AI Studio (Gemini 2.0 Flash / Pro) | Luyện tập hàng ngày, xử lý native audio Speaking + Writing tức thì (<1s) |
| **AI Provider 2** | OpenRouter (Claude 3.5 Sonnet / GPT-4o) | Chấm Mock Test chính thức chuẩn Barem Bộ GD&ĐT với Strict JSON Schema |
| **AI Provider 3** | Ollama Cloud / Local Endpoint | Hỗ trợ endpoint riêng hoặc cloud models qua OLLAMA_API_KEY |

## Các Tầng Kiến trúc
- **Client Layer (PWA / Browser)**: Giao diện Desktop Split-pane (bài đọc/nghe/viết bên trái, câu hỏi/công cụ bên phải) và Mobile micro-learning (vuốt Flashcard, Quick Quiz). Tích hợp Service Worker cache tĩnh App Shell và Auto-save bản nháp mỗi 5s.
- **Backend & Cloud Layer**: Supabase quản lý người dùng và đồng bộ tiến độ xuyên suốt giữa Mobile và Desktop. Static assets phục vụ qua Cloudflare Pages / R2.
- **AI Gateway Layer**: Master API Key Gateway (OpenRouter, Ollama Cloud, Google AI) với cơ chế xoay vòng key (Key Pool Rotation) và tự động fallback. Chi tiết tại [ai_gateway.md](file:///d:/program/vstep/docs/architecture/ai_gateway.md).

## Chiến lược Responsive
- **Desktop (>= 1024px) - Luyện sâu & Thi thử**: Giao diện chia đôi màn hình (Split-pane) độc lập cuộn, hỗ trợ phím tắt (`Space` điều khiển audio, `Alt+Left` tua 5s, `Ctrl+Enter` nộp bài).
- **Mobile (<= 768px) - Micro-Learning**: Tối ưu hóa dạng vuốt thẻ Flashcard, trắc nghiệm 1 chạm và thu âm nhanh, hỗ trợ chạy Standalone PWA toàn màn hình.

## Quản lý Dữ liệu

| Loại Dữ liệu | Vị trí / Cơ chế Lưu trữ | Đặc điểm & Chu kỳ Cập nhật |
| :--- | :--- | :--- |
| **Giao diện & Assets (App Shell)** | CDN + Service Worker Cache | Khởi động tức thì (< 1s), hỗ trợ Standalone PWA |
| **Kho Đề thi & Bài học** | Static JSON (MVP) → Supabase (mở rộng) | Tải từ static bundle ban đầu, dễ dàng đồng bộ từ máy chủ sau này |
| **Tiến độ, Streak & Lịch sử** | Supabase PostgreSQL | Đồng bộ liền mạch giữa Mobile ban ngày và Desktop buổi tối |
| **Bản nháp Writing** | `localStorage` (Client Buffer) | Auto-save mỗi 5 giây chống mất dữ liệu khi mất kết nối |
| **Chấm bài AI (Viết/Nói)** | Master API Gateway (Client/Edge → AI API) | Phản hồi JSON có cấu trúc trực tiếp hiển thị lên UI |

## Ranh giới Xử lý
- **Phía Client (Trình duyệt)**:
  - Thực thi thuật toán Spaced Repetition (SRS) cho Flashcard.
  - Chấm tự động trắc nghiệm Listening & Reading.
  - Bộ đếm từ, lọc lỗi chính tả thô, kiểm tra n-gram sao chép đề bài.
  - Thu âm bằng `MediaRecorder`, trích xuất chỉ số âm học qua Web Audio API.
  - Quản lý Auto-save bản nháp bài viết.
- **Phía AI Gateway (Master Key Cloud)**:
  - Nhận payload từ Client, gọi LLM / Native Audio API với Barem VSTEP.
  - Xuất kết quả phân tích theo Strict JSON Schema để render UI.
