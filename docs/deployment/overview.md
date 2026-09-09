# Deployment Architecture Overview

## Architecture Summary
The VSTEP platform is deployed using a decoupled, edge-first serverless architecture:

- **Frontend Application**: Hosted on **Cloudflare Pages** as a Progressive Web Application (PWA).
  - Built with Vite, React 19, TypeScript, and Vanilla CSS.
  - Client-side routing supported via SPA redirect rule in `public/_redirects`.
  - Offline-first caching powered by Workbox Service Worker (`generateSW`).
  - Total gzipped static bundle size: ~350 kB.
- **Backend & Cloud Persistence**: Hosted on **Supabase** (PostgreSQL + Auth + Edge Network).
  - Stores user account profiles and authentication state (Exclusive Google OAuth).
  - Persists per-user Spaced Repetition (SRS) card review metadata in `user_flashcard_reviews`.
  - Persists per-user daily study stats in `user_daily_stats`.
  - Protected with Postgres Row Level Security (RLS) policies.
- **AI Evaluation**: Direct client-to-gateway routing via `src/services/ai/` supporting OpenRouter, Ollama Cloud, and Google AI Studio with runtime key rotation.
- **Audio CDN Streaming**: 22 authentic listening audio tracks (7 full mock tests + 15 HCMUE drills) are streamed directly from Google Drive CDN via Cloudflare Pages HTTP 302 redirects configured in `public/_redirects`. This circumvents Cloudflare Pages 25 MiB single-file limit, keeps Git repo payload pure code (< 3 MB), and guarantees CORS & byte-range seekability. See [`docs/sources/listening/README.md`](file:///d:/program/vstep/docs/sources/listening/README.md).

## Deployment Components Matrix

| Component | Target Platform | Source Directory / Artifact | Configuration Requirements |
| :--- | :--- | :--- | :--- |
| SPA Web App | Cloudflare Pages | `dist/` (via `pnpm build`) | `_redirects`, Node.js $\ge 20$ |
| Audio CDN Streaming | Google Drive CDN | `public/_redirects` | HTTP 302 redirects to `drive.usercontent.google.com` |
| User Auth & Database | Supabase | `supabase/schema.sql` | RLS Enabled, Google OAuth Client ID |
| Environment Variables | Cloudflare Pages Settings | `.env.example` | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` |

## Model Context Protocol Tooling
The workspace configures agent tooling via `.agents/mcp_config.json`:
- **`supabase`**: Local/remote management and GraphQL doc queries (`@supabase/mcp-server-supabase`).
- **`cloudflare-docs`**: Zero-auth semantic search across Cloudflare documentation via `mcp-remote https://docs.mcp.cloudflare.com/mcp`.

