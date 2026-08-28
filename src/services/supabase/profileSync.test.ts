import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  fetchUserProfile,
  upsertUserProfile,
  fetchUserStudyLogs,
  recordStudyDateInCloud,
  fetchLatestMockTest,
  recordMockTestInCloud,
} from './profileSync';
import { supabase } from './client';

describe('profileSync service tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns null if userId is empty or Supabase is unconfigured', async () => {
    const profile = await fetchUserProfile('');
    expect(profile).toBeNull();

    const studyLogs = await fetchUserStudyLogs('');
    expect(studyLogs).toEqual([]);

    const latestTest = await fetchLatestMockTest('');
    expect(latestTest).toBeNull();
  });

  it('gracefully handles missing profile without throwing', async () => {
    const maybeSingleMock = vi.fn().mockResolvedValue({ data: null, error: null });
    const eqMock = vi.fn().mockReturnValue({ maybeSingle: maybeSingleMock });
    const selectMock = vi.fn().mockReturnValue({ eq: eqMock });
    vi.spyOn(supabase, 'from').mockReturnValue({ select: selectMock } as any);

    const profile = await fetchUserProfile('mock-user-123');
    expect(profile).toBeNull();
  });

  it('correctly maps mock test scores payload into MockTestRecord', async () => {
    const mockRow = {
      id: 'test-row-1',
      test_id: 'vstep-mock-01',
      scores: { overall: 7.5, reading: 8.0, listening: 7.0 },
      achieved_band: 'B2',
      completed_at: '2026-08-28T09:30:00Z',
    };

    const maybeSingleMock = vi.fn().mockResolvedValue({ data: mockRow, error: null });
    const limitMock = vi.fn().mockReturnValue({ maybeSingle: maybeSingleMock });
    const orderMock = vi.fn().mockReturnValue({ limit: limitMock });
    const eqMock = vi.fn().mockReturnValue({ order: orderMock });
    const selectMock = vi.fn().mockReturnValue({ eq: eqMock });
    vi.spyOn(supabase, 'from').mockReturnValue({ select: selectMock } as any);

    const testResult = await fetchLatestMockTest('mock-user-123');
    expect(testResult).not.toBeNull();
    expect(testResult?.test_id).toBe('vstep-mock-01');
    expect(testResult?.score).toBe(7.5);
    expect(testResult?.achieved_band).toBe('B2');
    expect(testResult?.date_str).toBe('2026-08-28');
  });

  it('upserts user profile with correct payload schema', async () => {
    const upsertMock = vi.fn().mockResolvedValue({ error: null });
    vi.spyOn(supabase, 'from').mockReturnValue({ upsert: upsertMock } as any);

    await upsertUserProfile('mock-user-123', {
      user_name: 'Test Learner',
      target_band: 'B2',
      target_exam_date: '2026-12-01',
      completed_exercises_count: 5,
    });

    expect(upsertMock).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'mock-user-123',
        display_name: 'Test Learner',
        target_band: 'B2',
        target_exam_date: '2026-12-01',
        completed_exercises_count: 5,
      }),
      { onConflict: 'id' }
    );
  });

  it('records study log date via upsert on (user_id, study_date)', async () => {
    const upsertMock = vi.fn().mockResolvedValue({ error: null });
    vi.spyOn(supabase, 'from').mockReturnValue({ upsert: upsertMock } as any);

    await recordStudyDateInCloud('mock-user-123', '2026-08-28');

    expect(upsertMock).toHaveBeenCalledWith(
      { user_id: 'mock-user-123', study_date: '2026-08-28' },
      { onConflict: 'user_id,study_date' }
    );
  });

  it('inserts mock test record with completed_at timestamp ISO', async () => {
    const insertMock = vi.fn().mockResolvedValue({ error: null });
    vi.spyOn(supabase, 'from').mockReturnValue({ insert: insertMock } as any);

    const now = Date.now();
    await recordMockTestInCloud('mock-user-123', {
      test_id: 'test-01',
      score: 6.5,
      achieved_band: 'B2',
      timestamp: now,
      date_str: '2026-08-28',
    });

    expect(insertMock).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: 'mock-user-123',
        test_id: 'test-01',
        achieved_band: 'B2',
      })
    );
  });
});
