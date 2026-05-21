// === Translation Management System — Translation Editor ===
// Modal for inline editing of translations in all 3 languages.

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, Save, RotateCcw, History, BookOpen } from 'lucide-react';
import { cn } from '../../../utils/cn';
import type { Lang, GlossaryEntry, TranslationMemoryEntry } from '../types';

interface TranslationEditorProps {
  /** The translation key being edited */
  translationKey: string;
  /** Current values for all languages */
  currentValues: Record<Lang, string>;
  /** Whether the editor is open */
  isOpen: boolean;
  /** Close the editor */
  onClose: () => void;
  /** Save an override for a language */
  onSave: (key: string, lang: Lang, value: string) => void;
  /** Remove an override for a language */
  onRemove: (key: string, lang: Lang) => void;
  /** Get glossary suggestions */
  onLookupGlossary?: (term: string) => GlossaryEntry[];
  /** Get correction history */
  onGetHistory?: (key: string, lang?: Lang) => TranslationMemoryEntry[];
}

const LANG_LABELS: Record<Lang, { name: string; native: string; dir: 'ltr' | 'rtl' }> = {
  en: { name: 'English', native: 'English', dir: 'ltr' },
  ur: { name: 'Urdu', native: 'اُردُو', dir: 'rtl' },
  sd: { name: 'Sindhi', native: 'سِنڌِي', dir: 'rtl' },
};

export default function TranslationEditor({
  translationKey,
  currentValues,
  isOpen,
  onClose,
  onSave,
  onRemove,
  onLookupGlossary,
  onGetHistory,
}: TranslationEditorProps) {
  const [editedValues, setEditedValues] = useState<Record<Lang, string>>(currentValues);
  const [showHistory, setShowHistory] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);
  const [history, setHistory] = useState<TranslationMemoryEntry[]>([]);
  const [glossaryResults, setGlossaryResults] = useState<GlossaryEntry[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  // Reset form when key changes
  useEffect(() => {
    setEditedValues(currentValues);
    setHasChanges(false);
    setShowHistory(false);
    setShowGlossary(false);
  }, [translationKey, currentValues]);

  // Track changes
  useEffect(() => {
    const changed = (['en', 'ur', 'sd'] as Lang[]).some(
      (lang) => editedValues[lang] !== currentValues[lang]
    );
    setHasChanges(changed);
  }, [editedValues, currentValues]);

  const handleSave = useCallback(() => {
    for (const lang of ['en', 'ur', 'sd'] as Lang[]) {
      if (editedValues[lang] !== currentValues[lang]) {
        onSave(translationKey, lang, editedValues[lang]);
      }
    }
    onClose();
  }, [editedValues, currentValues, translationKey, onSave, onClose]);

  const handleReset = useCallback(
    (lang: Lang) => {
      onRemove(translationKey, lang);
      setEditedValues((prev) => ({ ...prev, [lang]: currentValues[lang] }));
    },
    [translationKey, currentValues, onRemove]
  );

  const loadHistory = useCallback(() => {
    if (onGetHistory) {
      setHistory(onGetHistory(translationKey));
    }
    setShowHistory(!showHistory);
  }, [translationKey, onGetHistory, showHistory]);

  const loadGlossary = useCallback(() => {
    if (onLookupGlossary) {
      const results = onLookupGlossary(translationKey.split('.').pop() || '');
      setGlossaryResults(results);
    }
    setShowGlossary(!showGlossary);
  }, [translationKey, onLookupGlossary]);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          'relative w-full max-w-3xl max-h-[85vh] overflow-y-auto',
          'bg-white dark:bg-gray-900 rounded-2xl shadow-2xl',
          'border border-gray-200 dark:border-gray-700'
        )}
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-t-2xl z-10">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Edit Translation
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-1">
              {translationKey}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Language Fields */}
        <div className="p-4 space-y-4">
          {(['en', 'ur', 'sd'] as Lang[]).map((lang) => {
            const meta = LANG_LABELS[lang];
            const isRTL = meta.dir === 'rtl';
            return (
              <div key={lang} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {meta.name}{' '}
                    <span className="text-gray-400">({meta.native})</span>
                  </label>
                  <button
                    onClick={() => handleReset(lang)}
                    className="text-xs text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
                    title="Reset to default"
                  >
                    <RotateCcw size={12} />
                    Reset
                  </button>
                </div>
                <textarea
                  value={editedValues[lang]}
                  onChange={(e) =>
                    setEditedValues((prev) => ({ ...prev, [lang]: e.target.value }))
                  }
                  dir={isRTL ? 'rtl' : 'ltr'}
                  className={cn(
                    'w-full px-4 py-3 rounded-lg border text-base',
                    'bg-gray-50 dark:bg-gray-800',
                    'border-gray-200 dark:border-gray-600',
                    'text-gray-900 dark:text-white',
                    'focus:ring-2 focus:ring-purple-500 focus:border-transparent',
                    'resize-y min-h-[100px]',
                    isRTL && 'text-right'
                  )}
                  style={{
                    fontFamily: isRTL
                      ? lang === 'ur'
                        ? "'Noto Nastaliq Urdu', serif"
                        : "'Noto Sans Sindhi', 'Noto Naskh Arabic', serif"
                      : "'Poppins', sans-serif",
                    lineHeight: lang === 'ur' ? '2' : lang === 'sd' ? '1.9' : '1.6',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Action Bar */}
        <div className="flex items-center gap-2 p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
              hasChanges
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg active:scale-95'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
            )}
          >
            <Save size={14} />
            Save
          </button>

          <div className="flex-1" />

          <button
            onClick={loadHistory}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors',
              showHistory
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
            )}
          >
            <History size={14} />
            History
          </button>

          <button
            onClick={loadGlossary}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors',
              showGlossary
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
            )}
          >
            <BookOpen size={14} />
            Glossary
          </button>
        </div>

        {/* History Panel */}
        {showHistory && history.length > 0 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Correction History
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {history.map((entry, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-xs p-2 rounded bg-white dark:bg-gray-800"
                >
                  <span className="font-mono text-purple-500 shrink-0">
                    {entry.lang}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-gray-400 line-through truncate">
                      {entry.originalValue}
                    </div>
                    <div className="text-gray-700 dark:text-gray-200 truncate">
                      {entry.correctedValue}
                    </div>
                  </div>
                  <span className="text-gray-400 shrink-0">
                    x{entry.frequency}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {showHistory && history.length === 0 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <p className="text-xs text-gray-400 text-center">
              No correction history for this key.
            </p>
          </div>
        )}

        {/* Glossary Panel */}
        {showGlossary && glossaryResults.length > 0 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Glossary Matches
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {glossaryResults.map((entry, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 gap-2 text-xs p-2 rounded bg-white dark:bg-gray-800"
                >
                  <div>
                    <span className="text-gray-400 text-[10px] uppercase">EN</span>
                    <div className="text-gray-700 dark:text-gray-200">{entry.en}</div>
                  </div>
                  <div dir="rtl">
                    <span className="text-gray-400 text-[10px] uppercase">UR</span>
                    <div className="text-gray-700 dark:text-gray-200" style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}>
                      {entry.ur}
                    </div>
                  </div>
                  <div dir="rtl">
                    <span className="text-gray-400 text-[10px] uppercase">SD</span>
                    <div className="text-gray-700 dark:text-gray-200" style={{ fontFamily: "'Noto Sans Sindhi', serif" }}>
                      {entry.sd}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showGlossary && glossaryResults.length === 0 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <p className="text-xs text-gray-400 text-center">
              No glossary matches found.
            </p>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
