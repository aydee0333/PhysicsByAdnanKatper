import { useState, useRef, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';
import { LANG_META, type Lang } from '../i18n/translations';

interface Props {
  variant?: 'default' | 'compact';
  align?: 'left' | 'right';
}

export default function LanguageSwitcher({ variant = 'default', align = 'right' }: Props) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const langs: Lang[] = ['en', 'ur', 'sd'];

  return (
    <div ref={ref} className="relative inline-block" dir="ltr">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-sm font-medium transition-all"
        aria-label="Change language"
      >
        <Globe size={16} className="text-brand-cyan" />
        {variant === 'default' && (
          <span className="hidden sm:inline" style={{ fontFamily: LANG_META[lang].font }}>
            {LANG_META[lang].native}
          </span>
        )}
        <span className="text-xs uppercase tracking-wider text-gray-400">{lang}</span>
      </button>

      {open && (
        <div
          className={`absolute top-full mt-2 w-52 rounded-2xl glass-card-strong border border-white/10 shadow-2xl overflow-hidden z-[100] ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
          style={{ background: 'rgba(15, 15, 46, 0.95)', backdropFilter: 'blur(20px)' }}
        >
          {langs.map((l) => {
            const meta = LANG_META[l];
            const active = l === lang;
            return (
              <button
                key={l}
                onClick={() => { setLang(l); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  active ? 'bg-brand-purple/20 text-white' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <span className="text-xl">{meta.flag}</span>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{meta.label}</div>
                  <div className="text-xs text-gray-400" style={{ fontFamily: meta.font }}>
                    {meta.native}
                  </div>
                </div>
                {active && <Check size={16} className="text-brand-cyan" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
