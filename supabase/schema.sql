-- ==============================================================================
-- VSTEP Platform: Supabase PostgreSQL Schema (Option B: Normalized Architecture)
-- Run this migration in Supabase SQL Editor or via `pnpm db:migrate`
-- ==============================================================================

-- 1. Table: user_profiles
-- Tracks core user preferences and targets (1:1 with auth.users)
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL DEFAULT 'Học viên',
    avatar_url TEXT,
    target_band TEXT NOT NULL DEFAULT 'B1' CHECK (target_band IN ('B1', 'B2', 'C1')),
    target_exam_date DATE,
    completed_exercises_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Table: user_study_logs
-- Tracks daily study sessions and streak records
CREATE TABLE IF NOT EXISTS public.user_study_logs (
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    study_date DATE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, study_date)
);

-- 3. Table: user_mock_test_results
-- Tracks historical mock exam scores and band breakdowns
CREATE TABLE IF NOT EXISTS public.user_mock_test_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    test_id TEXT NOT NULL,
    scores JSONB NOT NULL,
    achieved_band TEXT NOT NULL,
    completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Table: user_flashcard_reviews
-- Tracks per-user spaced repetition metadata for each vocabulary card
CREATE TABLE IF NOT EXISTS public.user_flashcard_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    card_id TEXT NOT NULL,
    repetition_count INTEGER NOT NULL DEFAULT 0,
    interval_days INTEGER NOT NULL DEFAULT 0,
    ease_factor NUMERIC(4, 2) NOT NULL DEFAULT 2.50,
    last_reviewed_at BIGINT,
    next_review_timestamp BIGINT NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'learning', 'mastered')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT user_card_unique UNIQUE (user_id, card_id)
);

-- 5. Table: user_daily_stats
-- Tracks daily SRS review counts
CREATE TABLE IF NOT EXISTS public.user_daily_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    review_date DATE NOT NULL DEFAULT CURRENT_DATE,
    reviewed_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT user_date_unique UNIQUE (user_id, review_date)
);

-- 6. Table: user_test_submissions
-- Tracks completed test and drill submissions across all skills (Local Draft, Cloud on Commit)
CREATE TABLE IF NOT EXISTS public.user_test_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    test_id TEXT NOT NULL,
    skill TEXT NOT NULL CHECK (skill IN ('listening', 'reading', 'writing', 'speaking', 'mock_test')),
    mode TEXT NOT NULL DEFAULT 'practice' CHECK (mode IN ('practice', 'exam')),
    score NUMERIC(4, 1) NOT NULL DEFAULT 0.0,
    correct_count INTEGER NOT NULL DEFAULT 0,
    total_questions INTEGER NOT NULL DEFAULT 0,
    time_spent_seconds INTEGER NOT NULL DEFAULT 0,
    answers JSONB NOT NULL DEFAULT '{}'::jsonb,
    notes JSONB NOT NULL DEFAULT '{}'::jsonb,
    flagged_questions JSONB NOT NULL DEFAULT '[]'::jsonb,
    completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT user_test_mode_unique UNIQUE (user_id, test_id, mode)
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_study_logs_user ON public.user_study_logs (user_id, study_date DESC);
CREATE INDEX IF NOT EXISTS idx_mock_tests_user ON public.user_mock_test_results (user_id, completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_user_queue ON public.user_flashcard_reviews (user_id, next_review_timestamp);
CREATE INDEX IF NOT EXISTS idx_reviews_user_status ON public.user_flashcard_reviews (user_id, status);
CREATE INDEX IF NOT EXISTS idx_daily_stats_user ON public.user_daily_stats (user_id, review_date DESC);
CREATE INDEX IF NOT EXISTS idx_test_submissions_user ON public.user_test_submissions (user_id, test_id, mode);

-- Enable Row Level Security (RLS)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_study_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_mock_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_flashcard_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_daily_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_test_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
DROP POLICY IF EXISTS "Users can manage own profile" ON public.user_profiles;
CREATE POLICY "Users can manage own profile" ON public.user_profiles
    FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can manage own study logs" ON public.user_study_logs;
CREATE POLICY "Users can manage own study logs" ON public.user_study_logs
    FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own mock tests" ON public.user_mock_test_results;
CREATE POLICY "Users can manage own mock tests" ON public.user_mock_test_results
    FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own flashcards" ON public.user_flashcard_reviews;
CREATE POLICY "Users can manage own flashcards" ON public.user_flashcard_reviews
    FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own daily stats" ON public.user_daily_stats;
CREATE POLICY "Users can manage own daily stats" ON public.user_daily_stats
    FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own test submissions" ON public.user_test_submissions;
CREATE POLICY "Users can manage own test submissions" ON public.user_test_submissions
    FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Auto-provision profile trigger on Google OAuth sign-up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, display_name, avatar_url, target_band)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'Học viên'),
        NEW.raw_user_meta_data->>'avatar_url',
        'B1'
    )
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.user_study_logs (user_id, study_date)
    VALUES (NEW.id, CURRENT_DATE)
    ON CONFLICT DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
