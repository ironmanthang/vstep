# Supabase Setup & Migration Guide

## Project Metadata & Credentials
- **Project Name**: `vstep`
- **Project ID**: `zglfrtbsogqvkgbqoiqu`
- **Project Region**: `ap-northeast-1` (Northeast Asia - Tokyo)
- **Project URL**: `https://zglfrtbsogqvkgbqoiqu.supabase.co`
- **Publishable Key**: `sb_publishable_w3mIHIphKqSDeMsYoT6b1A_ufA1RjYc`
- **Production App Domain**: `https://vstep.pages.dev`

## Database Schema Migration

### Automated CLI Migration
Set `DIRECT_URL` in your `.env` (uses Supabase Session Pooler):
```env
DIRECT_URL="postgresql://postgres.zglfrtbsogqvkgbqoiqu:[PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres"
```
Then execute:
```powershell
pnpm db:migrate
```

### Automated GitHub Actions CI
Add `DIRECT_URL` to your GitHub Repository Secrets (**Settings** -> **Secrets and variables** -> **Actions**). On every push to `master` (or manual `workflow_dispatch`), GitHub Actions runs `pnpm db:migrate` automatically.

### Manual SQL Editor
- Open the [Supabase Dashboard SQL Editor](https://supabase.com/dashboard/project/zglfrtbsogqvkgbqoiqu/sql).
- Copy the entire content of [`supabase/schema.sql`](file:///d:/program/vstep/supabase/schema.sql), paste into a new query, and click **Run**.

### Table Verification
Ensure the following five normalized tables are created with Row Level Security (RLS) enabled:
- `user_profiles`:
  - Primary Key: `id` (UUID references `auth.users(id)`)
  - Columns: `id`, `display_name`, `avatar_url`, `target_band`, `target_exam_date`, `completed_exercises_count`, `created_at`, `updated_at`.
- `user_study_logs`:
  - Primary Key: `(user_id, study_date)`
  - Columns: `user_id`, `study_date`, `created_at`.
- `user_mock_test_results`:
  - Primary Key: `id` (UUID)
  - Columns: `id`, `user_id`, `test_id`, `scores`, `achieved_band`, `completed_at`.
- `user_flashcard_reviews`:
  - Primary Key: `(user_id, card_id)`
  - Columns: `user_id`, `card_id`, `repetition_count`, `interval_days`, `ease_factor`, `last_reviewed_at`, `next_review_timestamp`, `status`, `updated_at`.
- `user_daily_stats`:
  - Primary Key: `(user_id, review_date)`
  - Columns: `user_id`, `review_date`, `reviewed_count`, `updated_at`.

### Row Level Security Policies
Each table must have active RLS policies ensuring users can only read and mutate their own rows:
- All tables enforce: `auth.uid() = user_id` (or `auth.uid() = id` for `user_profiles`).

### Auto-Provision Profile Trigger
On user sign-up via Google OAuth, a PostgreSQL trigger automatically initializes the user profile:
- Trigger: `on_auth_user_created` executing `handle_new_user()`.
- Automatically populates `display_name` and `avatar_url` from Google metadata, setting `target_band` to `'B1'`.

## Authentication Configuration

### Google OAuth Provider (Exclusive)
- Email/Password authentication is disabled/removed.
- Authentication operates exclusively through Google OAuth.
- **Client ID**: `433210406598-g10t832m4o7nq0mtee0gd54ep6af1dl1.apps.googleusercontent.com`
- **Client Secret**: Configured in Supabase Dashboard and local `.env` (`GOOGLE_CLIENT_SECRET`).
- **Authorized Redirect URI** (configured in Google Cloud Console Credentials):
  ```
  https://zglfrtbsogqvkgbqoiqu.supabase.co/auth/v1/callback
  ```
- **Redirect URLs** (configured in Supabase **URL Configuration**):
  - `http://localhost:5173/**`
  - `https://*.pages.dev/**`

### Google OAuth Consent Screen Branding
In Google Cloud Console -> **OAuth consent screen**:
- **App Name**: `VSTEP Master`
- **User Support Email**: Configured admin email
- **App Home Page**: `https://vstep.pages.dev`
- **Authorized Domains**: `supabase.co`, `pages.dev`
