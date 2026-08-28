---
name: vstep-database
description: Procedures, schema rules, migration workflows, and data access patterns for the Supabase PostgreSQL database in the VSTEP project. Activate when modifying database tables, running migrations, writing Supabase queries, or designing data structures.
---

# VSTEP Database Architecture & Migration Workflow

## System Overview & SSOT
- **Database Engine**: Supabase PostgreSQL (Serverless BaaS).
- **Single Source of Truth (SSOT)**: `supabase/schema.sql`. All production tables, constraints, RLS policies, and triggers are defined in this single master file.
- **Client Access Layer**: `@supabase/supabase-js` (PostgREST over HTTPS with Row-Level Security). Do not use Node.js server ORMs (e.g., Prisma) in the frontend application bundle.
- **TypeScript Interface Sync**: Every table in `supabase/schema.sql` must have a matching TypeScript interface in `src/types/schemas.ts`.

---

## Canonical Data Model (Option B: Normalized Schema)

The database follows a normalized relational structure to prevent row bloat and lock contention:

| Table | Primary Key | Description |
| :--- | :--- | :--- |
| `user_profiles` | `id` (UUID references `auth.users(id)`) | User identity, target band (`B1`, `B2`, `C1`), target exam date, and exercise counts. |
| `user_study_logs` | `(user_id, study_date)` | Calendar dates when the user practiced; used to calculate consecutive streaks. |
| `user_mock_test_results` | `id` (UUID) | Historical test archives with scores JSON and achieved CEFR/VSTEP band. |
| `user_flashcard_reviews` | `(user_id, card_id)` | SM-2 spaced repetition metadata (`ease_factor`, `interval_days`, `next_review_timestamp`, `status`). |
| `user_daily_stats` | `(user_id, review_date)` | Daily SRS review volume counter. |

---

## Security & Row-Level Security (RLS) Protocol

All tables must enforce strict RLS to ensure multi-tenant user isolation:

1. **Enable RLS**:
   ```sql
   ALTER TABLE public.<table_name> ENABLE ROW LEVEL SECURITY;
   ```
2. **Standard User Isolation Policy**:
   ```sql
   DROP POLICY IF EXISTS "Users can manage own <resource>" ON public.<table_name>;
   CREATE POLICY "Users can manage own <resource>" ON public.<table_name>
       FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
   ```
   *(For `user_profiles`, use `auth.uid() = id`).*

3. **Google OAuth Auto-Provisioning**:
   New users registered via Google OAuth are auto-provisioned via the `on_auth_user_created` trigger executing `public.handle_new_user()`.

---

## Migration Execution Protocol

### Running Migrations
1. To apply changes to the live database, run:
   ```powershell
   pnpm db:migrate
   ```
   *(Executes `scripts/migrate.mjs` using `DIRECT_URL` from `.env`).*

2. Verify in Supabase Dashboard SQL Editor or run tests:
   ```powershell
   pnpm prepush
   ```

### Rules for Safe Schema Modifications
- **Idempotency**: All SQL statements in `supabase/schema.sql` must use defensive guards (`IF NOT EXISTS`, `DROP POLICY IF EXISTS`, `CREATE OR REPLACE FUNCTION`, `ON CONFLICT DO NOTHING`) so the file can be safely re-run at any time without errors.
- **Zero-Downtime Expand-and-Contract**:
  - Never drop or rename columns directly while users are active.
  - Step 1 (*Expand*): Add new nullable columns or tables with default values.
  - Step 2 (*Deploy*): Update frontend code to read/write to the new schema.
  - Step 3 (*Contract*): Remove legacy columns only after all client sessions have updated.

---

## Frontend Integration & Optimistic State Pattern

- **Data Mutation Flow**:
  1. Mutate in-memory React state immediately (0ms latency).
  2. Send asynchronous `upsert` or `insert` request to Supabase via `src/services/supabase/`.
  3. Store snapshot in `localStorage` as local fallback cache.
  4. If network fails, display a non-blocking toast warning (*"Mất kết nối — Đang thử lại"*); do not crash the UI.
