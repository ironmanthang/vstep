# ĐẶC TẢ TÍNH NĂNG: LUYỆN NGHE (LISTENING STUDIO)

## Cấu trúc Bài thi Nghe VSTEP (35 Câu / 40 Phút)
- **Part 1 (8 câu)**: 8 đoạn thông báo / hướng dẫn ngắn (sân bay, thời tiết, mua sắm). Rèn luyện bắt chi tiết nhanh (con số, giờ giấc, thay đổi thông tin phút chót).
- **Part 2 (12 câu)**: 3 đoạn hội thoại đời sống / công sở (mỗi đoạn 4 câu). Rèn luyện nhận diện mối quan hệ nhân vật và từ khóa chuyển ý (*however, actually, on second thought*).
- **Part 3 (15 câu)**: 3 bài giảng / thuyết trình học thuật (mỗi bài 5 câu). Rèn luyện kỹ năng ghi chú nhanh (Note-taking) và nắm bắt cấu trúc triển khai bài giảng.

## Kiến trúc Unified Listening Runner
Mô-đun được triển khai tập trung tại [`src/features/listening/`](file:///d:/program/vstep/src/features/listening) với component cốt lõi [`ListeningRunner.tsx`](file:///d:/program/vstep/src/features/listening/ListeningRunner.tsx):
- **Practice Mode (`mode: 'practice'`)**:
  - Kích hoạt 3 tab công cụ hỗ trợ: Câu hỏi trắc nghiệm ([`ListeningRunner.tsx`](file:///d:/program/vstep/src/features/listening/ListeningRunner.tsx)), Chép chính tả ([`DictationPanel.tsx`](file:///d:/program/vstep/src/features/listening/components/DictationPanel.tsx)), và Lời thoại song ngữ ([`TranscriptPanel.tsx`](file:///d:/program/vstep/src/features/listening/components/TranscriptPanel.tsx)).
  - Cho phép tua lại ±5s, chỉnh 5 nấc tốc độ (0.5x, 0.75x, 1.0x, 1.5x, 2.0x), bấm phát từng câu riêng lẻ và xem manh mối sau khi nộp bài.
- **Exam Mode (`mode: 'exam'`)**:
  - Khóa toàn bộ các nút tua/pause (audio phát 1 lần liên tục theo đúng tiến trình phòng thi Bộ GD&ĐT).
  - Khóa hoàn toàn transcript, gợi ý và giải thích đáp án.
  - Tự động nộp bài và khóa màn hình khi hết thời lượng audio.

## Bộ Công cụ Hỗ trợ Luyện Sâu (Scaffolding Tools)
- **Sticky Custom Audio Player ([`CustomAudioPlayer.tsx`](file:///d:/program/vstep/src/features/listening/components/CustomAudioPlayer.tsx), [`useAudioPlayer.ts`](file:///d:/program/vstep/src/features/listening/useAudioPlayer.ts))**:
  - Tự động ghim (sticky) cố định trên đầu trang khi cuộn bài đọc/câu hỏi, giúp thí sinh dễ dàng điều chỉnh thời gian và tốc độ bất kỳ lúc nào.
  - Hỗ trợ thao tác cảm ứng trên Mobile PWA ($\ge 44\text{px}$) với giao diện thu gọn và phím tắt tiện lợi trên Desktop (`Space` Play/Pause, `←` / `→` tua ±5s).
  - Âm thanh phản hồi xúc giác qua Web Audio API ([`playAudioFeedbackChime`](file:///d:/program/vstep/src/features/listening/useAudioPlayer.ts)).
  - Phát trực tiếp master exam audio: `vstep-test-1.mp3` đến `vstep-test-7.mp3` (continuous master exams).
- **Chế độ Dictation (Nghe chép chính tả - [`DictationPanel.tsx`](file:///d:/program/vstep/src/features/listening/components/DictationPanel.tsx), [`dictationUtils.ts`](file:///d:/program/vstep/src/features/listening/dictationUtils.ts))**:
  - Cắt audio thành từng câu 3–7s; thuật toán so khớp LCS Client-side hiển thị trực quan: xanh lá (đúng), đỏ (sai chính tả), vàng (thiếu từ), gạch ngang (thừa từ).
- **Transcript Đồng bộ & Phân tích Manh mối ([`TranscriptPanel.tsx`](file:///d:/program/vstep/src/features/listening/components/TranscriptPanel.tsx))**:
  - Tự động cuộn và bôi sáng câu đang phát theo thời gian thực.
  - Tự động đánh dấu câu chứa đáp án (`is_clue_for_question`) và phân tích lý do phương án sai sau khi nộp bài.
- **Chữa Đề & Luyện Sâu Full Mock Tests (Đề 1–7)**:
  - Tích hợp trọn bộ 7 đề thi thử chuẩn 35 câu (tổng 245 câu hỏi) trực tiếp trong Listening Studio với bộ chọn đề (`[Đề 1 (35 câu)]` đến `[Đề 7 (35 câu)]`) để người học chép chính tả, tua lại từng đoạn và phân tích bẫy nghe.

## Bộ Dữ liệu & Kiểm thử
- **Ngân Hàng Dữ Liệu Nghe Chuẩn Hóa ([`src/features/listening/data/`](file:///d:/program/vstep/src/features/listening/data))**:
  - `mockTests/`: 7 bộ đề thi thử toàn diện 35 câu (`mockTest01.ts` đến `mockTest07.ts`), xuất qua `ALL_VSTEP_LISTENING_MOCK_TESTS`. Mỗi đề gồm 35 câu hỏi, file audio master liên tục, transcript song ngữ sub-second, clue câu hỏi và giải thích đáp án chi tiết.
  - `drills/hcmue/`: Thư mục chứa 15 bộ đề luyện tập discrete theo kỹ năng riêng biệt từ HCMUE 20 Mock Tests:
    - `part1/`: 5 đề Thông báo & Hướng dẫn ngắn (`hcmuePart1_01.ts` đến `05.ts`, 40 câu hỏi, audio 256kbps stereo độc lập, transcript sub-second)
    - `part2/`: 5 đề Hội thoại đời sống (`hcmuePart2_01.ts` đến `05.ts`, 60 câu hỏi qua 15 đoạn hội thoại)
    - `part3/`: 5 đề Bài giảng học thuật (`hcmuePart3_01.ts` đến `05.ts`, 75 câu hỏi qua 15 bài giảng)
  - `part1Bank.ts`, `part2Bank.ts`, `part3Bank.ts`: Modular barrel files re-export các đề đơn lẻ và xuất các mảng chính thức `ALL_LISTENING_PART1_TESTS`, `ALL_LISTENING_PART2_TESTS`, `ALL_LISTENING_PART3_TESTS` phục vụ `ListeningStudioPage.tsx`.
  - Nguồn gốc dữ liệu & tài liệu chứng minh: Xem [`docs/sources/listening/README.md`](file:///d:/program/vstep/docs/sources/listening/README.md), [`hcmue_collection_20.md`](file:///d:/program/vstep/docs/sources/listening/hcmue_collection_20.md), [`vstep_test_01.md`](file:///d:/program/vstep/docs/sources/listening/vstep_test_01.md) đến [`vstep_test_07.md`](file:///d:/program/vstep/docs/sources/listening/vstep_test_07.md).
- **Kiến trúc Phân phối & Truyền phát Âm thanh (Streaming CDN & Local Cache)**:
  - **Production (`https://vstep.pages.dev/`)**: 22 luồng âm thanh chính thức (7 đề thi thử toàn diện + 15 bộ bài tập discrete) được phân phối qua Cloudflare Pages [`public/_redirects`](file:///d:/program/vstep/public/_redirects). Mỗi endpoint `/audio/listening/...` trả về HTTP 302 chuyển hướng tới Google Drive CDN (`https://drive.usercontent.google.com/download?id=<ID>&export=download&confirm=t`), hỗ trợ `Accept-Ranges: bytes` và `Access-Control-Allow-Origin: *` cho phép tua và phát lại mượt mà trên mọi trình duyệt.
  - **Local Development**: File audio vật lý nằm tại [`public/audio/listening/`](file:///d:/program/vstep/public/audio/listening) (được bỏ qua trong `.gitignore`), giúp Vite dev server phục vụ offline lập tức mà không làm phình Git repository (< 3 MB).
  - **Tập lệnh đồng bộ**: Hỗ trợ [`scripts/download-mock-assets.ps1`](file:///d:/program/vstep/scripts/download-mock-assets.ps1), [`scripts/download-hcmue-drills.ps1`](file:///d:/program/vstep/scripts/download-hcmue-drills.ps1) và [`scripts/sync-all-assets.ps1`](file:///d:/program/vstep/scripts/sync-all-assets.ps1).
- **Unit Tests ([`listening.test.ts`](file:///d:/program/vstep/src/features/listening/listening.test.ts), [`dictationUtils.test.ts`](file:///d:/program/vstep/src/features/listening/dictationUtils.test.ts))**: Bộ bài kiểm thử tự động xác thực tính toàn vẹn 100% câu hỏi (245 câu mock tests + 175 câu discrete drills = 420 câu hỏi chuẩn hóa), official answer keys, định dạng timestamp và thuật toán so khớp từ vựng.

