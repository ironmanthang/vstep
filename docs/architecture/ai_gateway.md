# AI MASTER GATEWAY & KEY ROTATION

## Tổng quan AI Gateway
Hệ thống sử dụng Master API Key Gateway tích hợp đa nhà cung cấp (Google AI Studio, OpenRouter, Ollama Cloud) với cơ chế xoay vòng key (Key Pool Rotation) và tự động fallback. Người học sử dụng AI trực tiếp không cần cấu hình API Key, mở đường cho việc quản lý hạn ngạch (Quota Management) và thu phí (Monetization).

## AI Adapter Interface

```typescript
interface AIProviderConfig {
  provider: "openrouter" | "ollama_cloud" | "google_ai_studio" | "ollama_local";
  apiKey?: string;
  baseUrl?: string;
  modelName: string;
}

interface AICompletionRequest {
  systemPrompt: string;
  userPrompt: string;
  audioBlob?: Blob; // Dành cho bài thi Nói (Speaking)
  temperature?: number; // Mặc định 0.1
  responseSchema?: object; // JSON Schema định dạng đầu ra
}
```

- **Giao thức Chuẩn hóa**: Ánh xạ tất cả request chấm Writing/Speaking về interface đồng nhất, tự động chuyển đổi payload sang SDK Google GenAI hoặc REST API OpenAI/OpenRouter/Ollama.
- **Quản lý Master Key Pool**: Hệ thống quản lý danh sách Master API Key từ nhà phát triển, hỗ trợ xoay vòng key khi bị giới hạn tốc độ (Rate Limit) và tự động ghi nhận trạng thái hoạt động của từng key.
- **Developer Overrides**: Màn hình Settings cung cấp bảng chẩn đoán trạng thái AI Gateway và tùy chọn cấu hình nâng cao (chọn model, API Key tùy chỉnh) dành cho nhà phát triển.

## Kiểm tra Kết nối (Health Check & Diagnostics)
- **Ping Thời gian Thực**: Cung cấp tính năng kiểm tra kết nối gửi ping nhẹ xác thực trạng thái hoạt động và đo độ trễ (latency ms) của từng provider trong Gateway.
- **Bảng Chẩn đoán (Diagnostic Panel)**: Hiển thị trực quan trạng thái kết nối, model đang kích hoạt và số lượng key khả dụng trong pool.

## Xử lý Lỗi & Cơ chế Fallback
- **Tự động Fallback Provider**: Nếu Provider chính gặp lỗi Rate Limit (HTTP 429) hoặc Server Overload (HTTP 503), hệ thống tự động chuyển tiếp request sang Provider dự phòng (Google AI Studio → OpenRouter → Ollama Cloud).
- **Auto-save Bản nháp**: Khi mất mạng hoặc API timeout, nội dung bài làm của học viên được bảo toàn trong `localStorage` và hiển thị nút "Thử lại".
