# Deployment Architecture Overview

## Architecture Summary
The VSTEP platform is deployed using a decoupled, edge-first serverless architecture:

- **Frontend Application**: Hosted on **Cloudflare Pages** as a Progressive Web Application (PWA).
  - Built with Vite, React 19, TypeScript, and Vanilla CSS.
  - Client-side routing supported via SPA redirect rule in `public/_redirects`.
  - Offline-first caching powered by Workbox Service Worker (`generateSW`).
  - Total gzipped static bundle size: ~350 kB.
- **Backend & Cloud Persistence**: Hosted on **Supabase** (PostgreSQL + Auth + Edge Network).
  - Stores user account profiles and authentication state (Email/Password & Google OAuth).
  - Persists per-user Spaced Repetition (SRS) card review metadata in `user_flashcard_reviews`.
  - Persists per-user daily study stats in `user_daily_stats`.
  - Protected with Postgres Row Level Security (RLS) policies.
- **AI Evaluation**: Direct client-to-gateway routing via `src/services/ai/` supporting OpenRouter, Ollama Cloud, and Google AI Studio with runtime key rotation.

## Deployment Components Matrix

| Component | Target Platform | Source Directory / Artifact | Configuration Requirements |
| :--- | :--- | :--- | :--- |
| SPA Web App | Cloudflare Pages | `dist/` (via `pnpm build`) | `_redirects`, Node.js $\ge 20$ |
| User Auth & Database | Supabase | `supabase/schema.sql` | RLS Enabled, Google OAuth Client ID |
| Environment Variables | Cloudflare Pages Settings | `.env.example` | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` |
