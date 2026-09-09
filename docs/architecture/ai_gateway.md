# AI MASTER GATEWAY & KEY ROTATION

## Tổng quan AI Gateway
Hệ thống sử dụng Master API Key Gateway chuẩn hóa trên mô hình **`gemini-3.5-flash-lite`** của Google AI Studio làm hạt nhân xử lý chính cho toàn bộ nền tảng (cả Writing và Speaking), kết hợp cơ chế xoay vòng key (Key Pool Rotation) và tự động fallback sang OpenRouter / Ollama Cloud khi cần thiết. 

- **Nguyên tắc Zero-AI Runtime**: Kỹ năng Nghe (Listening) và Đọc (Reading) được chấm 100% tiền định (deterministic) ngay tại Client (`userAnswer === correctAnswer`), tuyệt đối không tiêu tốn token AI trong quá trình thi.
- **Mô hình Thống nhất Toàn diện**: `gemini-3.5-flash-lite` phục vụ cả hai bài toán:
  - Chấm Writing: Xử lý văn bản (Text-out), áp dụng Strict JSON Schema với 4 tiêu chí MOET và Vietlish Engine.
  - Chấm Speaking: Xử lý âm thanh đa phương thức trực tiếp (Multimodal Audio In), chấm 5 tiêu chí MOET và phát hiện lỗi ngữ âm mà không cần tầng STT trung gian.
- **Hạn ngạch & Tối ưu Chi phí**: `gemini-3.5-flash-lite` cung cấp 500 RPD (Requests Per Day), 15 RPM và 250K TPM trên gói tiêu chuẩn, đảm bảo phục vụ hàng trăm lượt nộp bài mỗi ngày mà không bị nghẽn quota.

## AI Adapter Interface

```typescript
interface AIProviderConfig {
  provider: "google_ai_studio" | "openrouter" | "ollama_cloud" | "ollama_local";
  apiKey?: string;
  baseUrl?: string;
  modelName: string; // Mặc định: 'gemini-3.5-flash-lite'
}

interface AICompletionRequest {
  systemPrompt: string;
  userPrompt: string;
  audioBlob?: Blob; // Dành cho bài thi Nói (Speaking) đa phương thức
  temperature?: number; // Mặc định 0.1
  responseSchema?: object; // JSON Schema định dạng đầu ra
}
```

- **Giao thức Chuẩn hóa**: Ánh xạ tất cả request chấm Writing/Speaking về interface đồng nhất, tự động chuyển đổi payload sang SDK Google GenAI hoặc REST API.
- **Quản lý Master Key Pool**: Hệ thống quản lý danh sách Master API Key từ nhà phát triển, hỗ trợ xoay vòng key khi bị giới hạn tốc độ (Rate Limit 429) và tự động ghi nhận trạng thái hoạt động của từng key.
- **Developer Overrides**: Màn hình Settings cung cấp bảng chẩn đoán trạng thái AI Gateway và tùy chọn cấu hình nâng cao (chọn model, API Key tùy chỉnh) dành cho nhà phát triển.

## Kiểm tra Kết nối (Health Check & Diagnostics)
- **Ping Thời gian Thực**: Cung cấp tính năng kiểm tra kết nối gửi ping nhẹ xác thực trạng thái hoạt động và đo độ trễ (latency ms) của từng provider trong Gateway.
- **Bảng Chẩn đoán (Diagnostic Panel)**: Hiển thị trực quan trạng thái kết nối, model đang kích hoạt và số lượng key khả dụng trong pool.

## Xử lý Lỗi & Cơ chế Fallback
- **Tự động Fallback Provider**: Nếu Google AI Studio gặp lỗi Rate Limit (HTTP 429) hoặc Server Overload (HTTP 503), hệ thống tự động chuyển tiếp request sang Provider dự phòng (OpenRouter → Ollama Cloud).
- **Auto-save Bản nháp**: Khi mất mạng hoặc API timeout, nội dung bài làm của học viên được bảo toàn trong `localStorage` và hiển thị nút "Thử lại".
