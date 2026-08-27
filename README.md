# VSTEP PRACTICE PLATFORM

Nền tảng web học tiếng Anh và luyện thi VSTEP thế hệ mới (Online-First Web Platform với hỗ trợ PWA Installable), xây dựng theo triết lý Learner-First hỗ trợ lộ trình từ 0 đến B1/B2/C1.

## Lệnh Phát triển & Kiểm thử

- **Cài đặt dependencies**: `pnpm install`
- **Chạy dev server**: `pnpm dev`
- **Chạy Unit Tests**: `pnpm test`
- **Kiểm tra Linting**: `pnpm lint`
- **Typecheck**: `pnpm exec tsc --noEmit`
- **Build production**: `pnpm build`
- **Chạy toàn bộ Pre-push Pipeline**: `pnpm run prepush`

## Bản đồ Tài liệu Hệ thống

### Kế hoạch & Khảo thí
- [overview.md](file:///d:/program/vstep/docs/overview.md): Tầm nhìn, chân dung người dùng và chiến lược nền tảng.
- [roadmap.md](file:///d:/program/vstep/docs/roadmap.md): Lộ trình phát triển 7 giai đoạn kỹ năng và bảng milestone.
- [todo.md](file:///d:/program/vstep/docs/todo.md): Task checklist chi tiết theo từng Sprint thực thi.
- [exam_format.md](file:///d:/program/vstep/docs/exam_format.md): Căn cứ pháp lý, cấu trúc đề thi, công thức điểm và Barem MOET.
- [api.md](file:///d:/program/vstep/docs/api.md): Danh mục API keys và biến môi trường.

### Kiến trúc Kỹ thuật (`docs/architecture/`)
- [overview.md](file:///d:/program/vstep/docs/architecture/overview.md): Tổng quan kiến trúc hệ thống và danh mục công nghệ.
- [ai_gateway.md](file:///d:/program/vstep/docs/architecture/ai_gateway.md): Master AI Gateway, Key Pool rotation và fallback.
- [writing_pipeline.md](file:///d:/program/vstep/docs/architecture/writing_pipeline.md): Pipeline chấm Writing 2 tầng và Vietlish Engine.
- [speaking_pipeline.md](file:///d:/program/vstep/docs/architecture/speaking_pipeline.md): Pipeline chấm Speaking qua Google Gemini Native Audio API và Web Audio acoustic metrics.

### Đặc tả Tính năng (`docs/features/`)
- [foundation_drills.md](file:///d:/program/vstep/docs/features/foundation_drills.md): Flashcard SRS 1.500 từ trích xuất từ đề thi thật ULIS/HNUE.
- [listening.md](file:///d:/program/vstep/docs/features/listening.md): Unified Listening Runner, Player tua 5s, Dictation và Transcript.
- [reading.md](file:///d:/program/vstep/docs/features/reading.md): Unified Reading Runner, 1-Tap Dictionary tooltip và Split-pane.
- [writing.md](file:///d:/program/vstep/docs/features/writing.md): Unified Writing Runner, giàn giáo hỗ trợ và quy ước bôi màu 4 nhóm.
- [speaking.md](file:///d:/program/vstep/docs/features/speaking.md): Unified Speaking Runner, phòng thu Speaking, âm báo BEEP và Gemini Native Audio.
- [mock_test.md](file:///d:/program/vstep/docs/features/mock_test.md): Mock Exam Orchestrator 180 phút, Onboarding Diagnostic 10 phút và Barem 0.5.
