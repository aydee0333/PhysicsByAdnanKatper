import { createContext, useContext, useEffect, useMemo, useState, useCallback, type ReactNode } from 'react';
import { LANG_META, type Lang } from './translations';
import { translateWithTMS } from './tms/translationEngine';
import { loadAdminState, saveAdminState, onStorageChange } from './tms/persistence';
import type { AdminState } from './tms/types';

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, fallback?: string) => string;
  dir: 'ltr' | 'rtl';
  adminState: AdminState;
  toggleAdmin: () => void;
  toggleGlossary: () => void;
  overrideVersion: number;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = 'pak_phy_lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'en';
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
      return saved && ['en', 'ur', 'sd'].includes(saved) ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  // Bumped whenever an override is saved/removed — forces t() to re-memoize
  const [overrideVersion, setOverrideVersion] = useState(0);

  useEffect(() => {
    const handler = () => setOverrideVersion((v) => v + 1);
    window.addEventListener('tms:override-updated', handler);
    return () => window.removeEventListener('tms:override-updated', handler);
  }, []);

  // TMS admin state
  const [adminState, setAdminState] = useState<AdminState>(loadAdminState);

  // Keep admin state in sync across tabs
  useEffect(() => {
    return onStorageChange(() => {
      setAdminState(loadAdminState());
    });
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      console.warn('Failed to save language preference');
    }
  };

  const toggleAdmin = useCallback(() => {
    setAdminState((prev) => {
      const next = { ...prev, enabled: !prev.enabled };
      saveAdminState(next);
      return next;
    });
  }, []);

  const toggleGlossary = useCallback(() => {
    setAdminState((prev) => {
      const next = { ...prev, showGlossary: !prev.showGlossary };
      saveAdminState(next);
      return next;
    });
  }, []);

  const dir = LANG_META[lang].dir;

  // Apply direction + lang attribute + body font to the document
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', dir);
    document.body.style.fontFamily = LANG_META[lang].font;
  }, [lang, dir]);

  // Memoize the context value to prevent unnecessary re-renders
  // overrideVersion dependency ensures t() re-memoizes after every override save/remove
  const value = useMemo<LanguageContextValue>(() => ({
    lang,
    setLang,
    t: (key: string, fallback?: string) => translateWithTMS(lang, key, fallback),
    dir,
    adminState,
    toggleAdmin,
    toggleGlossary,
    overrideVersion,
  }), [lang, dir, adminState, toggleAdmin, toggleGlossary, overrideVersion]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLang must be used within <LanguageProvider>');
  }
  return ctx;
}

// Convenience hook for components that only need t()
export function useT() {
  return useLang().t;
}