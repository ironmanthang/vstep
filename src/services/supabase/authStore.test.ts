import { describe, it, expect, vi, beforeEach } from 'vitest';
import { signOut, signInWithGoogle } from './authStore';
import * as clientModule from './client';
import { supabase } from './client';
import * as userStorage from '../storage/userStorage';

describe('authStore service unit tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('signOut purges user data and clears auth state', async () => {
    vi.spyOn(clientModule, 'isSupabaseConfigured').mockReturnValue(true);
    const purgeLegacySpy = vi.spyOn(userStorage, 'purgeLegacyGlobalKeys');
    const signOutSpy = vi.spyOn(supabase.auth, 'signOut').mockResolvedValue({ error: null });

    await signOut();

    expect(purgeLegacySpy).toHaveBeenCalled();
    expect(signOutSpy).toHaveBeenCalled();
  });

  it('throws helpful error if signing in when Supabase is unconfigured', async () => {
    vi.spyOn(clientModule, 'isSupabaseConfigured').mockReturnValue(false);

    await expect(signInWithGoogle()).rejects.toThrow('Supabase is not configured.');
  });
});
