// === Translation Management System — Override Manager ===
// Manages translation overrides persisted in localStorage.
// Overrides always take priority over base translations.

import type { Lang, OverrideStore, TranslationOverride } from './types';
import { loadOverrides, saveOverrides, onStorageChange } from './persistence';
import urOverridesData from './overrides/ur_overrides.json';
import sdOverridesData from './overrides/sd_overrides.json';

// ─── In-Memory Cache ─────────────────────────────────────────────

let cache: OverrideStore = loadOverrides();

// Load JSON override files as base overrides (only if not already in localStorage)
function loadBaseOverrides(): void {
  let changed = false;
  const now = Date.now();

  const applyBase = (data: Record<string, string>, lang: Lang) => {
    for (const [key, value] of Object.entries(data)) {
      const memKey = `${lang}::${key}`;
      if (!(memKey in cache)) {
        cache[memKey] = { key, lang, value, timestamp: now, source: 'import' as const };
        changed = true;
      }
    }
  };

  applyBase(urOverridesData as Record<string, string>, 'ur');
  applyBase(sdOverridesData as Record<string, string>, 'sd');

  if (changed) saveOverrides(cache);
}

loadBaseOverrides();

// Keep cache in sync across tabs
onStorageChange(() => {
  cache = loadOverrides();
});

// ─── Override Operations ─────────────────────────────────────────

/** Build the cache key for a translation override */
function makeKey(key: string, lang: Lang): string {
  return `${lang}::${key}`;
}

/** Get an override value. Returns null if no override exists. */
export function getOverride(key: string, lang: Lang): string | null {
  const entry = cache[makeKey(key, lang)];
  return entry?.value ?? null;
}

/** Set a translation override */
export function setOverride(
  key: string,
  lang: Lang,
  value: string,
  source: TranslationOverride['source'] = 'manual'
): void {
  const entry: TranslationOverride = {
    key,
    lang,
    value,
    timestamp: Date.now(),
    source,
  };
  cache[makeKey(key, lang)] = entry;
  saveOverrides(cache);
}

/** Remove a specific override */
export function removeOverride(key: string, lang: Lang): void {
  delete cache[makeKey(key, lang)];
  saveOverrides(cache);
}

/** Get all overrides, optionally filtered by language */
export function getAllOverrides(lang?: Lang): OverrideStore {
  if (!lang) return { ...cache };
  const filtered: OverrideStore = {};
  for (const [k, v] of Object.entries(cache)) {
    if (v.lang === lang) {
      filtered[k] = v;
    }
  }
  return filtered;
}

/** Import overrides from a flat key-value JSON object */
export function importOverrides(
  data: Record<string, string>,
  lang: Lang,
  source: TranslationOverride['source'] = 'import'
): number {
  let count = 0;
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string' && value.trim()) {
      setOverride(key, lang, value, source);
      count++;
    }
  }
  return count;
}

/** Export overrides as a flat key-value JSON object */
export function exportOverrides(lang?: Lang): Record<string, string> {
  const overrides = getAllOverrides(lang);
  const result: Record<string, string> = {};
  for (const entry of Object.values(overrides)) {
    result[entry.key] = entry.value;
  }
  return result;
}

/** Check if an override exists for a key */
export function hasOverride(key: string, lang: Lang): boolean {
  return makeKey(key, lang) in cache;
}

/** Get the full override entry (with metadata) */
export function getOverrideEntry(key: string, lang: Lang): TranslationOverride | null {
  return cache[makeKey(key, lang)] ?? null;
}

/** Clear all overrides (with optional language filter) */
export function clearOverrides(lang?: Lang): void {
  if (!lang) {
    cache = {};
  } else {
    for (const k of Object.keys(cache)) {
      if (cache[k].lang === lang) {
        delete cache[k];
      }
    }
  }
  saveOverrides(cache);
}

/** Get total override count */
export function getOverrideCount(lang?: Lang): number {
  if (!lang) return Object.keys(cache).length;
  return Object.values(cache).filter((e) => e.lang === lang).length;
}
