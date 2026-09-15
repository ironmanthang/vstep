import { useSyncExternalStore } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from './client';
import { purgeAllUserData, purgeLegacyGlobalKeys } from '../storage/userStorage';

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

/**
 * Synchronously probe browser storage for an existing Supabase auth session token.
 * This guarantees zero microtask lag / zero double-render flash on component mounts.
 */
function probeStoredSession(): { session: Session | null; user: User | null } {
  if (typeof localStorage === 'undefined' || !isSupabaseConfigured()) {
    return { session: null, user: null };
  }

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('sb-') && key.endsWith('-auth-token')) {
        const raw = localStorage.getItem(key);
        if (raw) {
          const parsed = JSON.parse(raw);
          const session = (parsed?.currentSession || parsed) as Session;
          const user = (session?.user || parsed?.user) as User | undefined;
          if (user && typeof user.id === 'string') {
            return { session, user };
          }
        }
      }
    }
  } catch {
    // Ignore storage parse issues and fallback to async probe
  }

  return { session: null, user: null };
}

const initialStored = probeStoredSession();

let currentAuthState: AuthState = {
  user: initialStored.user,
  session: initialStored.session,
  loading: isSupabaseConfigured() && !initialStored.user,
};

const authListeners = new Set<() => void>();

function notifyAuthListeners(): void {
  authListeners.forEach((listener) => listener());
}

function updateAuthState(partial: Partial<AuthState>): void {
  currentAuthState = { ...currentAuthState, ...partial };
  notifyAuthListeners();
}

let isAuthSubscribed = false;

function initAuthSubscription(): void {
  if (isAuthSubscribed || !isSupabaseConfigured()) {
    return;
  }
  isAuthSubscribed = true;

  // Background verification / refresh with Supabase server
  supabase.auth
    .getSession()
    .then(({ data: { session: currentSession } }) => {
      updateAuthState({
        session: currentSession,
        user: currentSession?.user ?? null,
        loading: false,
      });
    })
    .catch((err) => {
      console.error('Failed to get session from Supabase:', err);
      updateAuthState({ loading: false });
    });

  // Listen for auth state changes
  supabase.auth.onAuthStateChange((event, newSession) => {
    if (event === 'SIGNED_OUT' && currentAuthState.user?.id) {
      purgeAllUserData(currentAuthState.user.id);
    }
    updateAuthState({
      session: newSession,
      user: newSession?.user ?? null,
      loading: false,
    });
  });
}

// Auto-initialize subscription upon module import in browser
if (typeof window !== 'undefined') {
  initAuthSubscription();
}

function subscribeAuth(callback: () => void): () => void {
  authListeners.add(callback);
  initAuthSubscription();
  return () => {
    authListeners.delete(callback);
  };
}

function getAuthSnapshot(): AuthState {
  return currentAuthState;
}

export async function signInWithGoogle() {
  if (!isSupabaseConfigured()) throw new Error('Supabase is not configured.');
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin,
    },
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  if (!isSupabaseConfigured()) return;
  const currentUserId = currentAuthState.user?.id;
  if (currentUserId) {
    purgeAllUserData(currentUserId);
  }
  purgeLegacyGlobalKeys();
  updateAuthState({ user: null, session: null, loading: false });
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export function useAuth() {
  const state = useSyncExternalStore(subscribeAuth, getAuthSnapshot, getAuthSnapshot);

  return {
    user: state.user,
    session: state.session,
    loading: state.loading,
    isAuthenticated: Boolean(state.user),
    signInWithGoogle,
    signOut,
  };
}


