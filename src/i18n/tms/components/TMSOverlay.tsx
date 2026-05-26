// === Translation Management System — TMS Overlay ===
// Main integration component that renders admin tools.
// Place this in App.tsx — it's visible only when the user is logged in and admin mode is on.

import { useState, useCallback, useMemo, useRef } from 'react';
import { Search, Download, Upload, X } from 'lucide-react';
import { useLang } from '../../LanguageContext';
import AdminToggle from './AdminToggle';
import GlossaryPanel from './GlossaryPanel';
import TranslationEditor from './TranslationEditor';
import GlobalEditOverlay from './GlobalEditOverlay';
import { setOverride, removeOverride, getOverrideCount, exportOverrides, importOverrides, getAllOverrides } from '../overrideManager';
import { recordCorrection, getCorrectionHistory } from '../translationMemory';
import {
  lookupGlossary,
  getGlossaryCategories,
  getGlossaryByCategory,
  getAllGlossaryEntries,
} from '../glossary';
import { TRANSLATIONS } from '../../translations';
import type { Lang, GlossaryEntry, TranslationMemoryEntry } from '../types';

// Maximum search results to display
const MAX_RESULTS = 50;

export default function TMSOverlay() {
  const { adminState, toggleAdmin, toggleGlossary } = useLang();

  // Translation editor state
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorKey, setEditorKey] = useState('');

  // Key search state
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Import state
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Open editor for a specific key
  const openEditor = useCallback((key: string) => {
    setEditorKey(key);
    setEditorOpen(true);
    setSearchQuery('');
  }, []);

  // Get current values for all languages for a key
  const getCurrentValues = useCallback(
    (key: string): Record<Lang, string> => ({
      en: TRANSLATIONS.en?.[key] ?? '',
      ur: TRANSLATIONS.ur?.[key] ?? '',
      sd: TRANSLATIONS.sd?.[key] ?? '',
    }),
    []
  );

  const handleSave = useCallback((key: string, l: Lang, value: string) => {
    const original = TRANSLATIONS[l]?.[key] ?? '';
    setOverride(key, l, value, 'manual');
    if (original && original !== value) {
      recordCorrection(key, l, original, value);
    }
    window.dispatchEvent(new Event('tms:override-updated'));
  }, []);

  const handleRemove = useCallback((key: string, l: Lang) => {
    removeOverride(key, l);
    window.dispatchEvent(new Event('tms:override-updated'));
  }, []);

  const handleLookupGlossary = useCallback((term: string): GlossaryEntry[] => {
    return lookupGlossary(term);
  }, []);

  const handleGetHistory = useCallback(
    (key: string, l?: Lang): TranslationMemoryEntry[] => {
      return getCorrectionHistory(key, l);
    },
    []
  );

  // Search across all translations (base + active overrides)
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const overrides = getAllOverrides();
    const results: { key: string; en: string; ur: string; sd: string }[] = [];

    for (const key of Object.keys(TRANSLATIONS.en ?? {})) {
      // Use override value if present, otherwise base translation
      const en = overrides[`en::${key}`]?.value ?? TRANSLATIONS.en?.[key] ?? '';
      const ur = overrides[`ur::${key}`]?.value ?? TRANSLATIONS.ur?.[key] ?? '';
      const sd = overrides[`sd::${key}`]?.value ?? TRANSLATIONS.sd?.[key] ?? '';

      // Match against key name or any language value (including override values)
      if (
        key.toLowerCase().includes(query) ||
        en.toLowerCase().includes(query) ||
        ur.includes(searchQuery) ||
        sd.includes(searchQuery)
      ) {
        results.push({ key, en, ur, sd });
        if (results.length >= MAX_RESULTS) break;
      }
    }
    return results;
  }, [searchQuery]);

  // Export overrides as JSON file download
  const handleExport = useCallback(() => {
    const data = exportOverrides();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tms-overrides-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  // Import overrides from file
  const handleImport = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string);
        // Detect format: { "lang::key": { value } } or { "key": "value" }
        const firstKey = Object.keys(data)[0];
        if (firstKey?.includes('::')) {
          // Full override store format — extract key-value pairs per language
          for (const [, entry] of Object.entries(data)) {
            const e = entry as { key: string; lang: Lang; value: string };
            setOverride(e.key, e.lang, e.value, 'import');
          }
        } else {
          // Flat key-value format — ask which language? Default to current language
          // We'll import as all 3 languages if values look like objects, or as single lang
          const firstVal = data[firstKey];
          if (typeof firstVal === 'object' && firstVal !== null && ('en' in firstVal || 'ur' in firstVal || 'sd' in firstVal)) {
            // Multi-language format: { key: { en: "...", ur: "...", sd: "..." } }
            for (const [key, vals] of Object.entries(data)) {
              const v = vals as Record<string, string>;
              if (v.en) setOverride(key, 'en', v.en, 'import');
              if (v.ur) setOverride(key, 'ur', v.ur, 'import');
              if (v.sd) setOverride(key, 'sd', v.sd, 'import');
            }
          } else {
            // Single-language flat format — import for all 3 languages
            importOverrides(data, 'en', 'import');
            importOverrides(data, 'ur', 'import');
            importOverrides(data, 'sd', 'import');
          }
        }
        window.dispatchEvent(new Event('tms:override-updated'));
      } catch (err) {
        console.error('[TMS] Failed to import overrides:', err);
      }
    };
    reader.readAsText(file);
    // Reset input so same file can be re-imported
    e.target.value = '';
  }, []);

  return (
    <>
      <AdminToggle
        enabled={adminState.enabled}
        onToggle={toggleAdmin}
        onGlossary={toggleGlossary}
        overrideCount={getOverrideCount()}
      />

      <GlobalEditOverlay />

      {/* Admin Panel — Key Search + Bulk Operations */}
      {adminState.enabled && (
        <div className="fixed top-16 right-4 z-50 w-96 max-h-[70vh] flex flex-col bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-200 dark:border-purple-700/50 overflow-hidden">
          {/* Panel Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              Translation Manager
            </h3>
            <div className="flex items-center gap-1">
              <button
                onClick={handleExport}
                className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
                title="Export overrides as JSON"
              >
                <Download size={14} />
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
                title="Import overrides from JSON"
              >
                <Upload size={14} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </div>
          </div>

          {/* Search Input */}
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search keys or translations..."
                className="w-full pl-8 pr-8 py-2 rounded-lg text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400"
                >
                  <X size={12} />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-xs text-gray-400 mt-1.5">
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
              </p>
            )}
          </div>

          {/* Search Results */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {!searchQuery && (
              <div className="p-6 text-center text-gray-400 text-sm">
                <p className="mb-1">Search for any translation key or text.</p>
                <p className="text-xs text-gray-400">Click a result to edit all 3 languages.</p>
              </div>
            )}
            {searchQuery && searchResults.length === 0 && (
              <div className="p-6 text-center text-gray-400 text-sm">
                No translations matching "{searchQuery}"
              </div>
            )}
            {searchResults.map((result) => (
              <button
                key={result.key}
                onClick={() => openEditor(result.key)}
                className="w-full text-left px-4 py-2.5 hover:bg-purple-50 dark:hover:bg-purple-900/20 border-b border-gray-100 dark:border-gray-800 transition-colors group"
              >
                <div className="text-xs font-mono text-purple-600 dark:text-purple-400 mb-1">
                  {result.key}
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300 truncate">
                  {result.en || <span className="italic text-gray-400">(empty)</span>}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5" dir="rtl">
                  {result.ur || <span className="italic">(empty)</span>}
                </div>
              </button>
            ))}
          </div>

          {/* Override Count Footer */}
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{getOverrideCount()} override{getOverrideCount() !== 1 ? 's' : ''} active</span>
              <span className="text-purple-500">Click result to edit</span>
            </div>
          </div>
        </div>
      )}

      <GlossaryPanel
        isOpen={adminState.showGlossary}
        onClose={toggleGlossary}
        entries={Object.values(getAllGlossaryEntries())}
        categories={getGlossaryCategories()}
        onFilterByCategory={getGlossaryByCategory}
      />

      {editorOpen && editorKey && (
        <TranslationEditor
          translationKey={editorKey}
          currentValues={getCurrentValues(editorKey)}
          isOpen={editorOpen}
          onClose={() => setEditorOpen(false)}
          onSave={handleSave}
          onRemove={handleRemove}
          onLookupGlossary={handleLookupGlossary}
          onGetHistory={handleGetHistory}
        />
      )}
    </>
  );
}
