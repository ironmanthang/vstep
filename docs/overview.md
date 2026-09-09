# TỔNG QUAN DỰ ÁN (PROJECT OVERVIEW)

## Tầm nhìn & Sứ mệnh
Dự án là nền tảng web học tiếng Anh và luyện thi VSTEP thế hệ mới (**Online-First Web Platform với hỗ trợ PWA Installable tối ưu cho Mobile & Desktop**), xây dựng theo triết lý **Learner-First (Lấy người học làm trung tâm)** nhằm xóa bỏ rào cản tâm lý cho người mới bắt đầu (Beginner / A1–A2 muốn đạt B1–B2).

## Sự khác biệt Cốt lõi
- **Chế độ Luyện tập Thân thiện (Skill Building Mode - Trọng tâm)**:
  - Cho phép tua lại ±5s, chỉnh tốc độ nghe, nghe chép chính tả (Dictation) và tra từ nhanh qua tooltip.
  - Cung cấp giàn giáo hỗ trợ (Scaffolding): Gợi ý dàn ý, mẫu câu ăn điểm, kho bài mẫu giải phẫu 5 màu.
  - Trợ lý AI chỉ ra lỗi tư duy tiếng Việt (Vietlish), phản hồi tích cực và ghi nhận điểm sáng.
  - Học vi mô (Micro-learning): Flashcard SRS 1.500 từ cốt lõi duy trì thói quen học mỗi ngày trên điện thoại.
- **Chế độ Thi thử Thực chiến (Mock Test Mode)**:
  - Mô phỏng 100% định dạng phòng thi máy tính của Bộ GD&ĐT (180 phút, cấm tua/tra từ, tự động thu bài).
  - Đánh giá năng lực thực tế qua Barem chuẩn và thuật toán làm tròn 0.5 chính thức.
- **Kiến trúc Unified Headless Runner**:
  - Dùng chung bộ mã nguồn cốt lõi (`ListeningRunner`, `ReadingRunner`, `WritingRunner`, `SpeakingRunner`) cho cả chế độ luyện tập lẫn thi thử qua cờ `mode: 'practice' | 'exam'`.

## Chân dung Người dùng (User Persona)
- **Tên đại diện**: Lan (Người mới bắt đầu / Beginner).
- **Trình độ & Nỗi sợ**: A1–A2 (vốn từ ~500 từ, hay dịch từng từ tiếng Việt sang tiếng Anh, sợ bài đọc dài, sợ nghe 1 lần không hiểu).
- **Mục tiêu**: Đạt chứng chỉ VSTEP B1 (Bậc 3) để xét chuẩn đầu ra tốt nghiệp đại học.
- **Thiết bị & Thói quen**: Học từ vựng Flashcard 5–10 phút trên điện thoại (PWA) ban ngày; luyện viết/nghe/đọc trên máy tính (Desktop Web) buổi tối.

## Chiến lược Nền tảng
- **Web-First**: Tối ưu trải nghiệm màn hình rộng (Split-pane) cho đọc hiểu, gõ bài luận và thi thử.
- **PWA Support**: Hỗ trợ cài đặt ứng dụng Standalone trên iOS/Android không cần App Store.
- **Online-First & Auto-save Resilience**: Đồng bộ tiến độ đám mây; tích hợp tự động lưu bản nháp Writing mỗi 5 giây chống mất kết nối.
- **Nguồn Dữ liệu & Ngữ liệu Cốt lõi**:
  - 1.500 từ vựng và bài đọc/nghe trích xuất trực tiếp từ các bộ đề thi thật và đề minh họa chuẩn của **ULIS (Trường ĐH Ngoại ngữ – ĐHQGHN)** và **Trường ĐH Sư phạm TP.HCM** phân loại theo 8 chủ đề VSTEP chuẩn Bộ GD&ĐT (xem chi tiết tại [exam_format.md](file:///d:/program/vstep/docs/exam_format.md)).

## Cấu trúc Tài liệu Hệ thống

### Tài liệu Định hướng & Kế hoạch
- [overview.md](file:///d:/program/vstep/docs/overview.md): Tầm nhìn, chân dung người dùng và chiến lược nền tảng.
- [roadmap.md](file:///d:/program/vstep/docs/roadmap.md): Các giai đoạn phát triển và bảng theo dõi milestone.
- [todo.md](file:///d:/program/vstep/docs/todo.md): Danh sách đầu việc thực thi theo Sprint.
- [exam_format.md](file:///d:/program/vstep/docs/exam_format.md): Căn cứ pháp lý, định dạng đề thi, công thức tính điểm và barem MOET.
- [api.md](file:///d:/program/vstep/docs/api.md): Danh sách API key tham chiếu.
- [sources/](file:///d:/program/vstep/docs/sources/README.md): Kho ngữ liệu đề thi chuẩn và nguồn trích dẫn 4 kỹ năng (ULIS/HNUE/HCMUE).
- [schemas.ts](file:///d:/program/vstep/src/types/schemas.ts): TypeScript Data Schemas toàn hệ thống (Single Source of Truth).

### Kiến trúc Kỹ thuật (`docs/architecture/`)
- [overview.md](file:///d:/program/vstep/docs/architecture/overview.md): Tổng quan kiến trúc hệ thống, danh mục công nghệ và ranh giới xử lý.
- [ai_gateway.md](file:///d:/program/vstep/docs/architecture/ai_gateway.md): AI Master Gateway, cơ chế Key Pool rotation, health check và fallback.
- [writing_pipeline.md](file:///d:/program/vstep/docs/architecture/writing_pipeline.md): Pipeline chấm Writing 2 tầng, System prompt và Vietlish AI guardrails.
- [speaking_pipeline.md](file:///d:/program/vstep/docs/architecture/speaking_pipeline.md): Pipeline chấm Speaking qua Gemini 3.5 Flash Lite Native Audio và Web Audio acoustic metrics.

### Đặc tả Tính năng (`docs/features/`)
- [foundation_drills.md](file:///d:/program/vstep/docs/features/foundation_drills.md): Flashcard SRS 1.500 từ trích xuất đề thi thật ULIS/HNUE theo 8 chủ đề.
- [listening.md](file:///d:/program/vstep/docs/features/listening.md): Unified Listening Runner, smart player ±5s, dictation và transcript song ngữ.
- [reading.md](file:///d:/program/vstep/docs/features/reading.md): Unified Reading Runner, 1-Tap Dictionary tooltip, split-pane và highlight dẫn chứng.
- [writing.md](file:///d:/program/vstep/docs/features/writing.md): Unified Writing Runner, giàn giáo hỗ trợ, Vietlish engine và quy ước bôi màu nhận xét.
- [speaking.md](file:///d:/program/vstep/docs/features/speaking.md): Unified Speaking Runner, phòng thu đếm ngược BEEP, radar chart và Gemini 3.5 Flash Lite Native Audio.
- [mock_test.md](file:///d:/program/vstep/docs/features/mock_test.md): Mock Exam Orchestrator 180 phút và báo cáo kết quả chuẩn 0.5.

### Hướng dẫn Triển khai (`docs/deployment/`)
- [overview.md](file:///d:/program/vstep/docs/deployment/overview.md): Tổng quan kiến trúc triển khai Serverless Edge (Cloudflare Pages + Supabase).
- [cloudflare_pages.md](file:///d:/program/vstep/docs/deployment/cloudflare_pages.md): Cấu hình build Vite, routing SPA `_redirects` và biến môi trường.
- [supabase_setup.md](file:///d:/program/vstep/docs/deployment/supabase_setup.md): Hướng dẫn chạy migration SQL, cấu hình RLS và tích hợp Google/Email Auth.


