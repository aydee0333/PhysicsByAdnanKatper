// === Translation Management System — Glossary Panel ===
// Browsable panel showing physics terminology across all 3 languages.

import { useState, useMemo } from 'react';
import { X, Search, BookOpen } from 'lucide-react';
import { cn } from '../../../utils/cn';
import type { GlossaryCategory, GlossaryEntry } from '../types';

interface GlossaryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  entries: GlossaryEntry[];
  categories: GlossaryCategory[];
  onFilterByCategory?: (category: GlossaryCategory) => GlossaryEntry[];
}

const CATEGORY_LABELS: Record<GlossaryCategory, string> = {
  mechanics: 'Mechanics',
  thermal: 'Thermal',
  waves: 'Waves',
  electricity: 'Electricity',
  optics: 'Optics',
  measurements: 'Measurements',
  energy: 'Energy',
  general: 'General',
};

export default function GlossaryPanel({
  isOpen,
  onClose,
  entries,
  categories,
  onFilterByCategory,
}: GlossaryPanelProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<GlossaryCategory | null>(null);

  const filteredEntries = useMemo(() => {
    let results = entries;

    // Filter by category
    if (activeCategory) {
      results = onFilterByCategory
        ? onFilterByCategory(activeCategory)
        : results.filter((e) => e.category === activeCategory);
    }

    // Filter by search
    if (search.trim()) {
      const lower = search.toLowerCase();
      results = results.filter(
        (e) =>
          e.en.toLowerCase().includes(lower) ||
          e.ur.includes(search) ||
          e.sd.includes(search)
      );
    }

    return results;
  }, [entries, search, activeCategory, onFilterByCategory]);

  // Escape key handled by parent/backdrop click

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          'relative w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col',
          'bg-white dark:bg-gray-900 rounded-2xl shadow-2xl',
          'border border-gray-200 dark:border-gray-700'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-purple-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Physics Glossary
            </h3>
            <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
              {filteredEntries.length} terms
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search + Filters */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 space-y-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search terms in any language..."
              className={cn(
                'w-full pl-9 pr-4 py-2 rounded-lg text-sm',
                'bg-gray-50 dark:bg-gray-800',
                'border border-gray-200 dark:border-gray-600',
                'text-gray-900 dark:text-white',
                'placeholder-gray-400',
                'focus:ring-2 focus:ring-purple-500 focus:border-transparent'
              )}
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                'px-2.5 py-1 rounded-full text-xs font-medium transition-colors',
                !activeCategory
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={cn(
                  'px-2.5 py-1 rounded-full text-xs font-medium transition-colors',
                  activeCategory === cat
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                )}
              >
                {CATEGORY_LABELS[cat] || cat}
              </button>
            ))}
          </div>
        </div>

        {/* Glossary Table */}
        <div className="flex-1 overflow-y-auto">
          {filteredEntries.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">
              No terms found matching your search.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-gray-50 dark:bg-gray-800/80 backdrop-blur-sm">
                <tr className="text-left text-xs text-gray-500 uppercase tracking-wider">
                  <th className="px-4 py-2 w-16">#</th>
                  <th className="px-4 py-2">English</th>
                  <th className="px-4 py-2 text-right" dir="rtl">Urdu</th>
                  <th className="px-4 py-2 text-right" dir="rtl">Sindhi</th>
                  <th className="px-4 py-2 w-28">Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredEntries.map((entry, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-4 py-2.5 text-gray-400 text-xs">{i + 1}</td>
                    <td className="px-4 py-2.5 font-medium text-gray-900 dark:text-white">
                      {entry.en}
                    </td>
                    <td
                      className="px-4 py-2.5 text-right text-gray-700 dark:text-gray-300"
                      dir="rtl"
                      style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
                    >
                      {entry.ur}
                    </td>
                    <td
                      className="px-4 py-2.5 text-right text-gray-700 dark:text-gray-300"
                      dir="rtl"
                      style={{ fontFamily: "'Noto Sans Sindhi', 'Noto Naskh Arabic', serif" }}
                    >
                      {entry.sd}
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                        {CATEGORY_LABELS[entry.category] || entry.category}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
