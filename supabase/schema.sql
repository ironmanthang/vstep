-- ==============================================================================
-- VSTEP Platform: Supabase PostgreSQL Schema for Flashcard SRS & Daily Progress
-- Run this migration in your Supabase SQL Editor: Dashboard > SQL Editor > New Query
-- ==============================================================================

-- Enable UUID extension if not already active
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Table: user_flashcard_reviews
-- Tracks per-user spaced repetition metadata for each card.
CREATE TABLE IF NOT EXISTS public.user_flashcard_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    card_id TEXT NOT NULL,
    repetition_count INTEGER NOT NULL DEFAULT 0,
    interval_days INTEGER NOT NULL DEFAULT 0,
    ease_factor NUMERIC(4, 2) NOT NULL DEFAULT 2.50,
    last_reviewed_at BIGINT, -- Unix timestamp in milliseconds
    next_review_timestamp BIGINT NOT NULL DEFAULT 0, -- Unix timestamp in milliseconds
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'learning', 'mastered')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT user_card_unique UNIQUE (user_id, card_id)
);

-- 2. Table: user_daily_stats
-- Tracks daily review counts and study streak for each user.
CREATE TABLE IF NOT EXISTS public.user_daily_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    review_date DATE NOT NULL DEFAULT CURRENT_DATE,
    reviewed_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT user_date_unique UNIQUE (user_id, review_date)
);

-- Indexes for high performance
CREATE INDEX IF NOT EXISTS idx_reviews_user_queue ON public.user_flashcard_reviews (user_id, next_review_timestamp);
CREATE INDEX IF NOT EXISTS idx_reviews_user_status ON public.user_flashcard_reviews (user_id, status);
CREATE INDEX IF NOT EXISTS idx_daily_stats_user ON public.user_daily_stats (user_id, review_date DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.user_flashcard_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_daily_stats ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_flashcard_reviews
DROP POLICY IF EXISTS "Users can read own flashcard reviews" ON public.user_flashcard_reviews;
CREATE POLICY "Users can read own flashcard reviews"
    ON public.user_flashcard_reviews
    FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own flashcard reviews" ON public.user_flashcard_reviews;
CREATE POLICY "Users can insert own flashcard reviews"
    ON public.user_flashcard_reviews
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own flashcard reviews" ON public.user_flashcard_reviews;
CREATE POLICY "Users can update own flashcard reviews"
    ON public.user_flashcard_reviews
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own flashcard reviews" ON public.user_flashcard_reviews;
CREATE POLICY "Users can delete own flashcard reviews"
    ON public.user_flashcard_reviews
    FOR DELETE
    USING (auth.uid() = user_id);

-- RLS Policies for user_daily_stats
DROP POLICY IF EXISTS "Users can read own daily stats" ON public.user_daily_stats;
CREATE POLICY "Users can read own daily stats"
    ON public.user_daily_stats
    FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own daily stats" ON public.user_daily_stats;
CREATE POLICY "Users can insert own daily stats"
    ON public.user_daily_stats
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own daily stats" ON public.user_daily_stats;
CREATE POLICY "Users can update own daily stats"
    ON public.user_daily_stats
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
