// === Translation Management System — Global Edit Overlay ===
// MutationObserver-based catch-all that adds edit capability to ANY text on the page,
// even text not wrapped in <EditableTranslation>.

import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Pencil } from 'lucide-react';
import { useLang } from '../../LanguageContext';
import { TRANSLATIONS } from '../../translations';
import TranslationEditor from './TranslationEditor';
import { setOverride, removeOverride } from '../overrideManager';
import { recordCorrection } from '../translationMemory';
import type { Lang } from '../types';

// Build a reverse map from English translation values to keys
let reverseMap: Map<string, string> | null = null;

function getReverseMap(): Map<string, string> {
  if (reverseMap) return reverseMap;
  reverseMap = new Map();
  for (const [key, value] of Object.entries(TRANSLATIONS.en ?? {})) {
    if (typeof value === 'string' && value.trim()) {
      reverseMap.set(value.trim(), key);
    }
  }
  return reverseMap;
}

interface HoveredText {
  text: string;
  key: string | null; // translation key if found
  rect: DOMRect;
}

export default function GlobalEditOverlay() {
  const { adminState } = useLang();
  const [hovered, setHovered] = useState<HoveredText | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorKey, setEditorKey] = useState('');
  const hoverTimeoutRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Find the translation key for a given text
  const findTranslationKey = useCallback((text: string): string | null => {
    const map = getReverseMap();
    // Try exact match first
    const exact = map.get(text);
    if (exact) return exact;
    // Try case-insensitive match
    const lower = text.toLowerCase();
    for (const [val, key] of map) {
      if (val.toLowerCase() === lower) return key;
    }
    return null;
  }, []);

  // Handle mouse over on text nodes
  const handleMouseOver = useCallback((e: MouseEvent) => {
    if (!adminState.enabled) return;

    const target = e.target as Node;

    // Skip if inside an already-wrapped EditableTranslation
    if (target instanceof HTMLElement && target.closest('[data-tkey]')) return;
    if (target.parentElement?.closest('[data-tkey]')) return;

    // Skip if inside the overlay/editor itself
    if (target instanceof HTMLElement && target.closest('[data-global-edit]')) return;

    // Only handle text nodes or elements containing direct text
    let textNode: Text | null = null;
    if (target.nodeType === Node.TEXT_NODE) {
      textNode = target as Text;
    } else if (target instanceof HTMLElement) {
      // Check if this element has direct text children
      for (const child of target.childNodes) {
        if (child.nodeType === Node.TEXT_NODE && child.textContent?.trim()) {
          textNode = child as Text;
          break;
        }
      }
    }

    if (!textNode || !textNode.textContent?.trim()) return;

    const text = textNode.textContent.trim();
    if (text.length < 2) return; // Skip single characters

    // Get the bounding rect of the text
    const range = document.createRange();
    range.selectNode(textNode);
    const rect = range.getBoundingClientRect();
    range.detach();

    if (rect.width === 0 || rect.height === 0) return;

    // Clear any pending hide
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    const key = findTranslationKey(text);
    setHovered({ text, key, rect });
  }, [adminState.enabled, findTranslationKey]);

  // Handle mouse out
  const handleMouseOut = useCallback((e: MouseEvent) => {
    const related = e.relatedTarget as Node | null;
    if (related && containerRef.current?.contains(related)) return;

    hoverTimeoutRef.current = window.setTimeout(() => {
      setHovered(null);
    }, 200);
  }, []);

  // Click handler — open editor
  const handleClick = useCallback(() => {
    if (!hovered) return;

    if (hovered.key) {
      // Found a translation key — open the full editor
      setEditorKey(hovered.key);
      setEditorOpen(true);
    }
    // If no key found, we could show a message, but for now just do nothing
    setHovered(null);
  }, [hovered]);

  // Save handler
  const handleSave = useCallback((key: string, lang: Lang, value: string) => {
    const original = TRANSLATIONS[lang]?.[key] ?? '';
    setOverride(key, lang, value);
    recordCorrection(key, lang, original, value);
  }, []);

  // Remove handler
  const handleRemove = useCallback((key: string, lang: Lang) => {
    removeOverride(key, lang);
  }, []);

  // Get current values for editor
  const getCurrentValues = useCallback((key: string) => ({
    en: TRANSLATIONS.en?.[key] ?? '',
    ur: TRANSLATIONS.ur?.[key] ?? '',
    sd: TRANSLATIONS.sd?.[key] ?? '',
  }), []);

  // Set up event listeners
  useEffect(() => {
    if (!adminState.enabled) {
      setHovered(null);
      return;
    }

    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, [adminState.enabled, handleMouseOver, handleMouseOut]);

  if (!adminState.enabled) return null;

  return (
    <>
      {/* Floating pencil icon at hover position */}
      {hovered && !editorOpen && createPortal(
        <div
          ref={containerRef}
          data-global-edit="true"
          style={{
            position: 'fixed',
            top: hovered.rect.top - 8,
            left: hovered.rect.right + 4,
            zIndex: 99998,
            pointerEvents: 'auto',
          }}
          className="animate-in fade-in duration-150"
          onMouseEnter={() => {
            if (hoverTimeoutRef.current) {
              clearTimeout(hoverTimeoutRef.current);
              hoverTimeoutRef.current = null;
            }
          }}
          onMouseLeave={() => {
            hoverTimeoutRef.current = window.setTimeout(() => setHovered(null), 200);
          }}
        >
          <button
            onClick={handleClick}
            className="w-6 h-6 rounded-full bg-purple-500/90 hover:bg-purple-400 text-white flex items-center justify-center shadow-lg transition-all hover:scale-110"
            title={hovered.key ? `Edit: ${hovered.key}` : 'Text found but no translation key'}
          >
            <Pencil size={12} />
          </button>
          {hovered.key && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded bg-gray-900/95 text-[10px] text-gray-300 whitespace-nowrap max-w-[200px] truncate">
              {hovered.key}
            </div>
          )}
        </div>,
        document.body
      )}

      {/* Translation Editor */}
      {editorOpen && (
        <TranslationEditor
          translationKey={editorKey}
          currentValues={getCurrentValues(editorKey)}
          isOpen={editorOpen}
          onClose={() => setEditorOpen(false)}
          onSave={handleSave}
          onRemove={handleRemove}
        />
      )}
    </>
  );
}
