import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Loader2 } from 'lucide-react';
import { useT, useLang } from '../../i18n/LanguageContext';
import { useSearch } from './useSearch';
import SearchResultItem from './SearchResultItem';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const t = useT();
  const { lang, dir } = useLang();
  const { results, loading } = useSearch(query, lang);

  // Reset state on open
  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      // Focus input after modal renders
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(0);
  }, [results]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const navigateToResult = useCallback((index: number) => {
    const result = results[index];
    if (!result) return;

    const { classId, unitNumber, sectionId } = result.entry;
    const route = `/${classId}/unit/${unitNumber}`;

    onClose();
    navigate(route);

    // Scroll to section after navigation renders
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  }, [results, onClose, navigate]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => Math.min(prev + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        navigateToResult(activeIndex);
        break;
    }
  }, [onClose, results.length, activeIndex, navigateToResult]);

  // Scroll active item into view
  useEffect(() => {
    const el = document.getElementById(`search-result-${activeIndex}`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] md:pt-[15vh]"
      role="dialog"
      aria-modal="true"
      aria-label={t('search.open')}
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-xl mx-4 glass-card-strong rounded-2xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden flex flex-col"
        style={{ maxHeight: '70vh' }}
        dir={dir}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
          <Search size={18} className="text-brand-cyan shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 outline-none"
            aria-label={t('search.placeholder')}
            aria-controls="search-results"
            aria-expanded={results.length > 0}
            aria-activedescendant={
              results.length > 0 ? `search-result-${activeIndex}` : undefined
            }
            role="combobox"
            autoComplete="off"
            spellCheck="false"
          />
          {loading && <Loader2 size={16} className="text-gray-400 animate-spin shrink-0" />}
          <button
            onClick={onClose}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={t('common.closeMenu')}
          >
            <X size={16} />
          </button>
        </div>

        {/* Results */}
        <div
          ref={listRef}
          id="search-results"
          role="listbox"
          aria-label={t('search.open')}
          className="flex-1 overflow-y-auto p-2 space-y-1"
        >
          {!query.trim() && (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500" role="status">
              <Search size={32} className="mb-3 opacity-30" />
              <p className="text-sm">{t('search.typeToSearch')}</p>
            </div>
          )}

          {query.trim() && !loading && results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500" role="status" aria-live="polite">
              <Search size={32} className="mb-3 opacity-30" />
              <p className="text-sm">{t('search.noResults')}</p>
            </div>
          )}

          {loading && query.trim() && (
            <div className="flex items-center justify-center py-12 text-gray-400" role="status" aria-live="polite">
              <Loader2 size={20} className="animate-spin me-2" />
              <span className="text-sm">...</span>
            </div>
          )}

          {results.map((result, i) => (
            <SearchResultItem
              key={`${result.entry.classId}-${result.entry.chapterId}-${result.entry.sectionId}-${result.entry.blockType}-${i}`}
              id={`search-result-${i}`}
              result={result}
              active={i === activeIndex}
              onClick={() => navigateToResult(i)}
            />
          ))}
        </div>

        {/* Footer hint */}
        {results.length > 0 && (
          <div className="px-4 py-2 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500">
            <span>
              {results.length} {t('search.noResults').toLowerCase().includes('no') ? 'results' : ''}
            </span>
            <span className="hidden md:inline">
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">↑↓</kbd>
              {' '}
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">Enter</kbd>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
