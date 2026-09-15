# Cloudflare Pages Deployment Guide

## Prerequisites
- A GitHub repository containing the VSTEP codebase.
- A Cloudflare account with access to **Workers & Pages**.

## Repository Preparation
- Verify [`public/_redirects`](file:///d:/program/vstep/public/_redirects) routes audio to Cloudflare R2 and handles SPA routing:
  ```text
  # Authentic VSTEP Listening Audio Streams (Cloudflare R2 CDN)
  /audio/listening/* https://pub-340e82df980d40da8d3710c3e37e34e5.r2.dev/:splat 302

  # SPA Catch-All
  /* /index.html 200
  ```
- Run the local verification pipeline before pushing:
  ```powershell
  pnpm prepush
  ```

## Cloudflare R2 Audio CDN Setup
- **Bucket**: `vstep-audio` on account `ec77a861c96a52ddb24b94a6492f7c80`.
- **Public Domain**: `https://pub-340e82df980d40da8d3710c3e37e34e5.r2.dev` (enabled via bucket **Settings** > **Public Access**).
- **CORS Policy**: Configured to allow cross-origin audio streaming with Range requests:
  ```json
  [
    {
      "AllowedOrigins": ["*"],
      "AllowedMethods": ["GET", "HEAD"],
      "AllowedHeaders": ["*"],
      "ExposeHeaders": ["ETag", "Content-Range", "Accept-Ranges", "Content-Length"]
    }
  ]
  ```

## Cloudflare Pages Setup

### Project Creation
- In the Cloudflare Dashboard, navigate to **Workers & Pages** -> **Overview**.
- Click **Create application** -> **Pages** tab -> **Connect to Git**.
- Select your repository (`ironmanthang/vstep`) and choose the branch to deploy (`master`).

### Build Configuration
- **Framework preset**: `Vite` (or `None`)
- **Build command**: `pnpm build`
- **Build output directory**: `dist`
- **Root directory**: `/`

### Environment Variables
Under **Settings** -> **Environment variables**, the following production variables are configured:
- `NODE_VERSION` = `20`
- `VITE_SUPABASE_URL` = `https://zglfrtbsogqvkgbqoiqu.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = `sb_publishable_w3mIHIphKqSDeMsYoT6b1A_ufA1RjYc`
- `VITE_GEMINI_API_KEY` = `(Google AI Studio API key)`
- `VITE_OPENROUTER_API_KEYS` = `(OpenRouter key pool)`
- `VITE_OLLAMA_API_KEYS` = `(Ollama Cloud key pool)`

### HTTP Headers & PWA Caching Strategy (`public/_headers`)
Cloudflare Pages serves custom HTTP headers defined in [`public/_headers`](file:///d:/program/vstep/public/_headers):
- `/assets/*`: `Cache-Control: public, max-age=31536000, immutable` (Vite includes content hashes in filenames).
- `/sw.js`, `/sw-custom.js`, `/manifest.webmanifest`: `Cache-Control: public, max-age=0, must-revalidate` (Never serve stale Service Worker scripts or extensions).
- `/*`: `Cache-Control: public, max-age=0, must-revalidate` (HTML documents revalidate immediately).

### PWA 1-Refresh Deploy Coordination
In tandem with `_headers`, the client coordinator [`src/services/pwa/registerServiceWorker.ts`](file:///d:/program/vstep/src/services/pwa/registerServiceWorker.ts) listens to `controllerchange`:
- On page reload (`F5` / pull-to-refresh) during initial load (`performance.now() < 8000ms`), triggers an automated reload to serve the newly activated build immediately (guaranteed 1-refresh updates).
- In-session (`performance.now() >= 8000ms`), protects active tests and recordings, dispatching `vstep:sw-update-available` to show an unobtrusive toast.
- Native `vite:preloadError` and `lazyWithRetry.ts` self-heal dynamic chunk 404s after new deployment hash rotation.

### Deployment Verification
- **Live Production URL**: `https://vstep.pages.dev`
- **Verification Points**:
  - Client-side route navigation (`/`, `/flashcard`, `/practice`, `/mock-test`, with `/profile`, `/settings`, and `/dev` redirecting to `/`).
  - Hard-refreshing `/flashcard` does not return 404 (handled by `_redirects`).
  - Spaced Repetition (SRS) Flashcard review queue.
  - User Authentication & Cloud Sync with Supabase.
  - Pull-to-refresh on mobile / F5 on desktop activates new deploy immediately.


