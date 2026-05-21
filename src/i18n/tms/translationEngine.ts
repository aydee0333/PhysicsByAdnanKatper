// === Translation Management System — Translation Engine ===
// The core enhanced translate function with override chain resolution.
// Resolution: Override → Translation Memory → Base Translation → Provider Chain

import type { Lang } from './types';
import { getOverride } from './overrideManager';
import { suggestFromMemory } from './translationMemory';
import { checkGlossaryConsistency } from './glossary';
import { queryProviders, createLocalProvider } from './providers';
import { translate as baseTranslate } from '../translations';

// ─── Register Default Provider ───────────────────────────────────

import { registerProvider } from './providers';

let initialized = false;

function ensureInitialized(): void {
  if (initialized) return;
  initialized = true;
  // Register the local provider as the default fallback
  registerProvider(createLocalProvider());
}

// ─── Enhanced Translate Function ─────────────────────────────────

/**
 * Enhanced translate function with TMS override chain.
 *
 * Resolution order:
 * 1. Override (localStorage) — highest priority
 * 2. Translation Memory suggestion — auto-correct repeated mistakes
 * 3. Base translation (existing TRANSLATIONS dict)
 * 4. Provider chain — for missing translations
 * 5. Fallback string or raw key
 */
export function translateWithTMS(
  lang: Lang,
  key: string,
  fallback?: string
): string {
  ensureInitialized();

  // Step 1: Check override (highest priority)
  const override = getOverride(key, lang);
  if (override) return override;

  // Step 2: Check translation memory for auto-suggestion
  // Only use memory suggestions for non-English languages
  // and only when the original translation would have been wrong
  if (lang !== 'en') {
    const memorySuggestion = suggestFromMemory(key, lang);
    if (memorySuggestion) return memorySuggestion;
  }

  // Step 3: Base translation from existing TRANSLATIONS
  const base = baseTranslate(lang, key);
  // baseTranslate returns the key itself if not found — check for that
  if (base !== key) {
    // Found a real translation
    // Step 3b: Glossary consistency check (dev mode only)
    if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
      const consistency = checkGlossaryConsistency(key, lang, base);
      if (!consistency.consistent && consistency.expected) {
        console.warn(
          `[TMS] Glossary inconsistency for "${key}" (${lang}): ` +
          `got "${base}", expected "${consistency.expected}" (glossary: ${consistency.glossaryKey})`
        );
      }
    }
    return base;
  }

  // Step 4: Try provider chain for missing translations
  const provided = queryProviders(key, lang);
  if (provided) return provided;

  // Step 5: Return fallback or raw key
  return fallback ?? key;
}
