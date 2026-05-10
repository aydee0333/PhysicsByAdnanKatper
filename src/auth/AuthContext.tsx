import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

/**
 * Static-site auth: credentials are hard-coded and checked client-side.
 * NOT real security — just a friendly gate. Anyone with devtools can bypass.
 * Change CREDENTIALS below to update teacher's login.
 */
export const CREDENTIALS = {
  username: 'adnan',
  password: 'physics@2025',
};

const STORAGE_KEY = 'pak_phy_auth_v1';

interface AuthState {
  loggedIn: boolean;
  username: string | null;
  loginAt: number | null;
}

interface AuthContextValue extends AuthState {
  login: (u: string, p: string, remember: boolean) => Promise<{ ok: true } | { ok: false; error: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readStored(): AuthState {
  if (typeof window === 'undefined') return { loggedIn: false, username: null, loginAt: null };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY) || window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return { loggedIn: false, username: null, loginAt: null };
    const parsed = JSON.parse(raw) as AuthState;
    if (parsed && parsed.loggedIn && parsed.username) return parsed;
  } catch { /* ignore */ }
  return { loggedIn: false, username: null, loginAt: null };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => readStored());

  // Cross-tab sync
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setState(readStored());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const login: AuthContextValue['login'] = async (u, p, remember) => {
    // tiny delay so the "Signing in…" state is visible
    await new Promise((r) => setTimeout(r, 600));
    if (u.trim().toLowerCase() !== CREDENTIALS.username || p !== CREDENTIALS.password) {
      return { ok: false, error: 'invalid' };
    }
    const next: AuthState = { loggedIn: true, username: u.trim(), loginAt: Date.now() };
    setState(next);
    try {
      const store = remember ? window.localStorage : window.sessionStorage;
      // Clear the other store to avoid stale duplicates
      (remember ? window.sessionStorage : window.localStorage).removeItem(STORAGE_KEY);
      store.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch { /* ignore */ }
    return { ok: true };
  };

  const logout = () => {
    setState({ loggedIn: false, username: null, loginAt: null });
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch { /* ignore */ }
  };

  const value = useMemo<AuthContextValue>(() => ({ ...state, login, logout }), [state]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}
