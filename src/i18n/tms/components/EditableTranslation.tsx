// === Translation Management System — Editable Translation Wrapper ===
// A wrapper component that shows an edit button on hover when admin mode is on.
// Use this instead of raw t() calls in components that want inline editing support.

import { useState, useCallback, type ReactNode } from 'react';
import { Pencil } from 'lucide-react';
import { useLang } from '../../LanguageContext';
import { useAuth } from '../../../auth/AuthContext';
import TranslationEditor from './TranslationEditor';
import { setOverride, removeOverride } from '../overrideManager';
import { recordCorrection, getCorrectionHistory } from '../translationMemory';
import { lookupGlossary } from '../glossary';
import { TRANSLATIONS } from '../../translations';
import type { Lang, GlossaryEntry, TranslationMemoryEntry } from '../types';

interface EditableTranslationProps {
  /** The translation key */
  tKey: string;
  /** Optional className for the wrapper span */
  className?: string;
  /** Render as a specific HTML element (default: span) */
  as?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'li' | 'td' | 'label';
  /** Optional children override — if provided, renders children instead of t(tKey) */
  children?: ReactNode;
  /** Whether to show the edit button (default: true when admin mode is on) */
  editable?: boolean;
  /** Render translation value as raw HTML via dangerouslySetInnerHTML */
  html?: boolean;
}

export default function EditableTranslation({
  tKey,
  className,
  as: Component = 'span',
  children,
  editable = true,
  html = false,
}: EditableTranslationProps) {
  const { t, adminState } = useLang();
  const { loggedIn } = useAuth();
  const [editorOpen, setEditorOpen] = useState(false);

  const isAdmin = loggedIn && adminState.enabled && editable;

  const handleEdit = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setEditorOpen(true);
  }, []);

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

  const translatedValue = children ?? t(tKey);

  if (!isAdmin) {
    return html ? (
      <Component className={className} dangerouslySetInnerHTML={{ __html: translatedValue as string }} />
    ) : (
      <Component className={className}>{translatedValue}</Component>
    );
  }

  // Admin mode — show pencil icon on hover
  if (html) {
    // dangerouslySetInnerHTML replaces children, so wrap in a span with the button as sibling
    return (
      <>
        <span className="group/editable relative inline">
          <Component
            className={className}
            data-tkey={tKey}
            dangerouslySetInnerHTML={{ __html: translatedValue as string }}
          />
          <button
            onClick={handleEdit}
            className="inline-flex items-center justify-center ml-1 p-0.5 rounded align-middle opacity-0 group-hover/editable:opacity-100 transition-opacity bg-purple-500/20 hover:bg-purple-500/40 text-purple-400 hover:text-purple-300"
            title={`Edit: ${tKey}`}
            aria-label={`Edit translation for ${tKey}`}
          >
            <Pencil size={11} />
          </button>
        </span>

        {editorOpen && (
          <TranslationEditor
            translationKey={tKey}
            currentValues={getCurrentValues(tKey)}
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

  return (
    <>
      <Component
        className={`${className ?? ''} group/editable relative inline`.trim()}
        data-tkey={tKey}
      >
        {translatedValue}
        <button
          onClick={handleEdit}
          className="inline-flex items-center justify-center ml-1 p-0.5 rounded align-middle opacity-0 group-hover/editable:opacity-100 transition-opacity bg-purple-500/20 hover:bg-purple-500/40 text-purple-400 hover:text-purple-300"
          title={`Edit: ${tKey}`}
          aria-label={`Edit translation for ${tKey}`}
        >
          <Pencil size={11} />
        </button>
      </Component>

      {editorOpen && (
        <TranslationEditor
          translationKey={tKey}
          currentValues={getCurrentValues(tKey)}
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
