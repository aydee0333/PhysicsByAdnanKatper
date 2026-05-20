import { useState, useEffect, useCallback } from 'react';
import { List, X, Check, ChevronUp } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import { useT } from '../i18n/LanguageContext';
import { cn } from '../utils/cn';

interface Section {
  id: string;
  label: string;
}

interface UnitSidebarProps {
  sections: Section[];
  unitId: string;
}

export default function UnitSidebar({ sections, unitId }: UnitSidebarProps) {
  const t = useT();
  const [activeSection, setActiveSection] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const { isSectionComplete, getUnitProgress } = useProgress(unitId);

  // Track which section is currently visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.getAttribute('data-section-id') || '');
            break;
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
    );

    sections.forEach(({ id }) => {
      const el = document.querySelector(`[data-section-id="${id}"]`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.querySelector(`[data-section-id="${id}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const progress = getUnitProgress();

  return (
    <>
      {/* Desktop sidebar - sticky on the right */}
      <aside className="hidden xl:block fixed right-[max(1rem,calc((100vw-80rem)/2+1rem))] top-24 w-56 z-30">
        <div className="glass-card rounded-2xl p-4 border border-white/5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('common.contents')}</span>
            <span className="text-xs font-bold text-brand-cyan tabular-nums">{progress}%</span>
          </div>

          {/* Mini progress bar */}
          <div className="h-1 bg-white/10 rounded-full mb-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-cyan to-brand-purple rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <nav className="space-y-0.5" aria-label={t('common.unitSections')}>
            {sections.map(({ id, label }) => {
              const complete = isSectionComplete(id);
              const active = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={cn(
                    'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-start text-xs transition-all',
                    active
                      ? 'text-brand-cyan bg-brand-cyan/10 font-medium'
                      : complete
                        ? 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                        : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                  )}
                >
                  <span className={cn(
                    'w-4 h-4 rounded-full flex items-center justify-center shrink-0 border transition-all',
                    complete
                      ? 'bg-brand-cyan/20 border-brand-cyan/40'
                      : active
                        ? 'border-brand-cyan/60 bg-brand-cyan/10'
                        : 'border-white/10'
                  )}>
                    {complete && <Check size={10} className="text-brand-cyan" />}
                  </span>
                  <span className="truncate">{label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile floating button + bottom sheet */}
      <div className="xl:hidden fixed bottom-6 end-4 z-40 flex flex-col items-end gap-3">
        {/* Scroll to top */}
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full glass-card-strong border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all shadow-lg"
          aria-label={t('common.scrollToTop')}
        >
          <ChevronUp size={18} />
        </button>

        {/* TOC toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all',
            isOpen
              ? 'bg-brand-cyan text-white'
              : 'bg-gradient-to-br from-brand-purple to-brand-pink text-white'
          )}
          aria-label={isOpen ? t('common.closeToc') : t('common.openToc')}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={20} /> : <List size={20} />}
        </button>
      </div>

      {/* Mobile bottom sheet */}
      <div
        className={cn(
          'xl:hidden fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ease-out',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            'fixed inset-0 bg-black/40 transition-opacity',
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
          onClick={() => setIsOpen(false)}
        />

        {/* Sheet */}
        <div className="relative bg-brand-dark/95 backdrop-blur-2xl border-t border-white/10 rounded-t-3xl max-h-[70vh] overflow-hidden">
          {/* Handle */}
          <div className="flex justify-center py-3">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 pb-3">
            <h3 className="text-sm font-bold text-white">{t('common.contents')}</h3>
            <span className="text-xs text-brand-cyan font-bold">{progress}%</span>
          </div>

          {/* Progress bar */}
          <div className="px-5 pb-4">
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-cyan to-brand-purple rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Section list */}
          <nav className="overflow-y-auto max-h-[50vh] px-4 pb-8 space-y-1" aria-label={t('common.unitSections')}>
            {sections.map(({ id, label }) => {
              const complete = isSectionComplete(id);
              const active = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-start text-sm transition-all',
                    active
                      ? 'text-brand-cyan bg-brand-cyan/10 font-semibold'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  )}
                >
                  <span className={cn(
                    'w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-all',
                    complete
                      ? 'bg-brand-cyan/20 border-brand-cyan/40'
                      : active
                        ? 'border-brand-cyan/60 bg-brand-cyan/10'
                        : 'border-white/15'
                  )}>
                    {complete && <Check size={12} className="text-brand-cyan" />}
                  </span>
                  {label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
