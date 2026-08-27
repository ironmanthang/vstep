# Cloudflare Pages Deployment Guide

## Prerequisites
- A GitHub repository containing the VSTEP codebase.
- A Cloudflare account with access to **Workers & Pages**.

## Repository Preparation
- Verify `public/_redirects` exists with rule:
  ```text
  /* /index.html 200
  ```
- Run the local verification pipeline before pushing:
  ```powershell
  pnpm prepush
  ```

## Cloudflare Pages Setup Steps

### 1. Create a New Project
- In the Cloudflare Dashboard, navigate to **Workers & Pages** -> **Overview**.
- Click **Create application** -> **Pages** tab -> **Connect to Git**.
- Select your repository (`vstep`) and choose the branch to deploy (`master` or `main`).

### 2. Configure Build Settings
- **Framework preset**: `Vite` (or `None`)
- **Build command**: `pnpm build`
- **Build output directory**: `dist`
- **Root directory**: `/`

### 3. Set Environment Variables
Under **Settings** -> **Environment variables**, the following production variables are configured:

- `NODE_VERSION` = `20`
- `VITE_SUPABASE_URL` = `https://zglfrtbsogqvkgbqoiqu.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = `sb_publishable_w3mIHIphKqSDeMsYoT6b1A_ufA1RjYc`
- `VITE_GEMINI_API_KEY` = *(Google AI Studio API key)*
- `VITE_OPENROUTER_API_KEYS` = *(OpenRouter key pool)*
- `VITE_OLLAMA_API_KEYS` = *(Ollama Cloud key pool)*

### 4. Deploy and Verify
- **Live Production URL**: `https://vstep.pages.dev`
- **Verification Checklist**:
  - Client-side route navigation (`/flashcard`, `/practice`, `/settings`).
  - Hard-refreshing `/flashcard` does not return 404 (handled by `_redirects`).
  - Spaced Repetition (SRS) Flashcard review queue.
  - User Authentication & Cloud Sync with Supabase.
