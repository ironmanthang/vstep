# Supabase Setup & Migration Guide

## Project Credentials
- **Project URL**: `https://zglfrtbsogqvkgbqoiqu.supabase.co`
- **Publishable Key**: `sb_publishable_w3mIHIphKqSDeMsYoT6b1A_ufA1RjYc`

## Database Schema Migration

### Option A: Automated CLI Migration (Recommended)
Set `DIRECT_URL` in your `.env` (or pass via environment):
```env
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.zglfrtbsogqvkgbqoiqu.supabase.co:5432/postgres"
```
Then execute:
```powershell
pnpm db:migrate
```

### Option B: Automated GitHub Actions CI
Add `DIRECT_URL` to your GitHub Repository Secrets (**Settings** -> **Secrets and variables** -> **Actions**). On every push to `master` (or manual `workflow_dispatch`), GitHub Actions runs `pnpm db:migrate` automatically.

### Option C: Manual SQL Editor
- Open the [Supabase Dashboard SQL Editor](https://supabase.com/dashboard/project/zglfrtbsogqvkgbqoiqu/sql).
- Copy the entire content of [`supabase/schema.sql`](file:///d:/program/vstep/supabase/schema.sql), paste into a new query, and click **Run**.

### 2. Verify Generated Tables
Ensure the following two tables are created with Row Level Security (RLS) enabled:
- `user_flashcard_reviews`:
  - Primary Key: `id` (UUID)
  - Unique Constraint: `(user_id, card_id)`
  - Columns: `user_id`, `card_id`, `repetition_count`, `interval_days`, `ease_factor`, `last_reviewed_at`, `next_review_timestamp`, `status`, `updated_at`.
- `user_daily_stats`:
  - Primary Key: `id` (UUID)
  - Unique Constraint: `(user_id, review_date)`
  - Columns: `user_id`, `review_date`, `reviewed_count`, `updated_at`.

### 3. Verify Row Level Security (RLS) Policies
Each table must have active RLS policies ensuring users can only read and mutate their own rows:
- `user_flashcard_reviews`:
  - Select: `auth.uid() = user_id`
  - Insert: `auth.uid() = user_id`
  - Update: `auth.uid() = user_id`
  - Delete: `auth.uid() = user_id`
- `user_daily_stats`:
  - Select: `auth.uid() = user_id`
  - Insert: `auth.uid() = user_id`
  - Update: `auth.uid() = user_id`
  - Delete: `auth.uid() = user_id`

## Authentication Configuration

### 1. Email & Password Provider
- Navigate to **Authentication** -> **Providers** -> **Email**.
- Ensure Email provider is enabled.
- Toggle *Confirm email* off if you want immediate user onboarding during testing.

### 2. Google OAuth Provider (Optional)
- Navigate to **Authentication** -> **Providers** -> **Google**.
- Enable Google OAuth.
- Add Client ID and Client Secret from Google Cloud Console.
- Add your Cloudflare Pages production URL to **Authentication** -> **URL Configuration** -> **Redirect URLs**.
