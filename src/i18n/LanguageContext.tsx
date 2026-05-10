import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { LANG_META, translate, type Lang } from './translations';

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = 'pak_phy_lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    return saved && ['en', 'ur', 'sd'].includes(saved) ? saved : 'en';
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    try { window.localStorage.setItem(STORAGE_KEY, l); } catch { /* ignore */ }
  };

  const dir = LANG_META[lang].dir;

  // Apply direction + lang attribute + body font to the document
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', dir);
    document.body.style.fontFamily = LANG_META[lang].font;
  }, [lang, dir]);

  const value = useMemo<LanguageContextValue>(() => ({
    lang,
    setLang,
    t: (key: string) => translate(lang, key),
    dir,
  }), [lang, dir]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within <LanguageProvider>');
  return ctx;
}

// Convenience hook for components that only need t()
export function useT() {
  return useLang().t;
}
