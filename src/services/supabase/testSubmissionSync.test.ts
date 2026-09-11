import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchTestSubmission, upsertTestSubmission, deleteTestSubmission } from './testSubmissionSync';
import * as clientModule from './client';
import { supabase } from './client';

describe('testSubmissionSync service tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(clientModule, 'isSupabaseConfigured').mockReturnValue(true);
  });

  it('returns null if userId or testId is empty or Supabase is unconfigured', async () => {
    vi.spyOn(clientModule, 'isSupabaseConfigured').mockReturnValue(false);
    expect(await fetchTestSubmission('user-1', 'test-1', 'practice')).toBeNull();

    vi.spyOn(clientModule, 'isSupabaseConfigured').mockReturnValue(true);
    expect(await fetchTestSubmission('', 'test-1', 'practice')).toBeNull();
    expect(await fetchTestSubmission('user-1', '', 'practice')).toBeNull();
  });

  it('fetches and maps test submission row correctly', async () => {
    const mockRow = {
      id: 'sub-uuid-1',
      user_id: 'user-1',
      test_id: 'listening-p1-01',
      skill: 'listening',
      mode: 'practice',
      score: '8.5',
      correct_count: 7,
      total_questions: 8,
      time_spent_seconds: 240,
      answers: { q1: 'A', q2: 'B' },
      notes: { q1: 'note 1' },
      flagged_questions: ['q2'],
      completed_at: '2026-09-10T10:00:00Z',
      created_at: '2026-09-10T10:00:00Z',
    };

    const maybeSingleMock = vi.fn().mockResolvedValue({ data: mockRow, error: null });
    const eqModeMock = vi.fn().mockReturnValue({ maybeSingle: maybeSingleMock });
    const eqTestMock = vi.fn().mockReturnValue({ eq: eqModeMock });
    const eqUserMock = vi.fn().mockReturnValue({ eq: eqTestMock });
    const selectMock = vi.fn().mockReturnValue({ eq: eqUserMock });
    vi.spyOn(supabase, 'from').mockReturnValue({ select: selectMock } as any);

    const result = await fetchTestSubmission('user-1', 'listening-p1-01', 'practice');

    expect(result).not.toBeNull();
    expect(result?.id).toBe('sub-uuid-1');
    expect(result?.score).toBe(8.5);
    expect(result?.correct_count).toBe(7);
    expect(result?.answers).toEqual({ q1: 'A', q2: 'B' });
    expect(result?.notes).toEqual({ q1: 'note 1' });
    expect(result?.flagged_questions).toEqual(['q2']);
  });

  it('handles null row gracefully without throwing', async () => {
    const maybeSingleMock = vi.fn().mockResolvedValue({ data: null, error: null });
    const eqModeMock = vi.fn().mockReturnValue({ maybeSingle: maybeSingleMock });
    const eqTestMock = vi.fn().mockReturnValue({ eq: eqModeMock });
    const eqUserMock = vi.fn().mockReturnValue({ eq: eqTestMock });
    const selectMock = vi.fn().mockReturnValue({ eq: eqUserMock });
    vi.spyOn(supabase, 'from').mockReturnValue({ select: selectMock } as any);

    const result = await fetchTestSubmission('user-1', 'listening-p1-01', 'practice');
    expect(result).toBeNull();
  });

  it('upserts test submission with conflict on (user_id, test_id, mode)', async () => {
    const upsertMock = vi.fn().mockResolvedValue({ error: null });
    vi.spyOn(supabase, 'from').mockReturnValue({ upsert: upsertMock } as any);

    const result = await upsertTestSubmission({
      user_id: 'user-1',
      test_id: 'listening-p1-01',
      skill: 'listening',
      mode: 'practice',
      score: 10,
      correct_count: 8,
      total_questions: 8,
      time_spent_seconds: 300,
      answers: { q1: 'A' },
      notes: { q1: 'key point' },
      flagged_questions: [],
    });

    expect(result.success).toBe(true);
    expect(upsertMock).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: 'user-1',
        test_id: 'listening-p1-01',
        skill: 'listening',
        mode: 'practice',
        score: 10,
        correct_count: 8,
        total_questions: 8,
        answers: { q1: 'A' },
        notes: { q1: 'key point' },
      }),
      { onConflict: 'user_id,test_id,mode' }
    );
  });

  it('returns failure response when Supabase returns an error', async () => {
    const upsertMock = vi.fn().mockResolvedValue({ error: { message: 'DB connection error' } });
    vi.spyOn(supabase, 'from').mockReturnValue({ upsert: upsertMock } as any);

    const result = await upsertTestSubmission({
      user_id: 'user-1',
      test_id: 'listening-p1-01',
      skill: 'listening',
      mode: 'practice',
      score: 5,
      correct_count: 4,
      total_questions: 8,
      time_spent_seconds: 120,
      answers: {},
      notes: {},
      flagged_questions: [],
    });

    expect(result.success).toBe(false);
    expect(result.error).toBe('DB connection error');
  });

  it('deletes test submission row for (user_id, test_id, mode)', async () => {
    const eqModeMock = vi.fn().mockResolvedValue({ error: null });
    const eqTestMock = vi.fn().mockReturnValue({ eq: eqModeMock });
    const eqUserMock = vi.fn().mockReturnValue({ eq: eqTestMock });
    const deleteMock = vi.fn().mockReturnValue({ eq: eqUserMock });
    vi.spyOn(supabase, 'from').mockReturnValue({ delete: deleteMock } as any);

    const result = await deleteTestSubmission('user-1', 'listening-p1-01', 'practice');

    expect(result.success).toBe(true);
    expect(supabase.from).toHaveBeenCalledWith('user_test_submissions');
    expect(deleteMock).toHaveBeenCalled();
    expect(eqUserMock).toHaveBeenCalledWith('user_id', 'user-1');
    expect(eqTestMock).toHaveBeenCalledWith('test_id', 'listening-p1-01');
    expect(eqModeMock).toHaveBeenCalledWith('mode', 'practice');
  });

  it('returns failure when deleting unconfigured or missing params', async () => {
    vi.spyOn(clientModule, 'isSupabaseConfigured').mockReturnValue(false);
    const unconfigured = await deleteTestSubmission('user-1', 'test-1', 'practice');
    expect(unconfigured.success).toBe(false);

    vi.spyOn(clientModule, 'isSupabaseConfigured').mockReturnValue(true);
    const missingUser = await deleteTestSubmission('', 'test-1', 'practice');
    expect(missingUser.success).toBe(false);
  });
});
