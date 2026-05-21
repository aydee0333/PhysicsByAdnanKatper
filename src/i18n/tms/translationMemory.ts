// === Translation Management System — Translation Memory ===
// Tracks correction history to prevent repeated mistakes and suggest fixes.

import type { Lang, TranslationMemoryEntry, TranslationMemoryStore } from './types';
import { loadMemory, saveMemory, onStorageChange } from './persistence';

// ─── In-Memory Cache ─────────────────────────────────────────────

let cache: TranslationMemoryStore = loadMemory();

onStorageChange(() => {
  cache = loadMemory();
});

// ─── Key Helpers ─────────────────────────────────────────────────

function makeKey(key: string, lang: Lang): string {
  return `${lang}::${key}`;
}

/** Cleanup entries older than 90 days (keep all frequencies so corrections accumulate) */
function cleanup(): void {
  const cutoff = Date.now() - 90 * 24 * 60 * 60 * 1000;
  let changed = false;
  for (const [k, v] of Object.entries(cache)) {
    if (v.timestamp < cutoff) {
      delete cache[k];
      changed = true;
    }
  }
  if (changed) saveMemory(cache);
}

// Run cleanup on load
if (typeof window !== 'undefined') {
  // Defer cleanup to avoid blocking initial load
  setTimeout(cleanup, 5000);
}

// ─── Memory Operations ───────────────────────────────────────────

/** Record a translation correction */
export function recordCorrection(
  key: string,
  lang: Lang,
  originalValue: string,
  correctedValue: string
): void {
  const memKey = makeKey(key, lang);
  const existing = cache[memKey];

  if (existing) {
    // Update existing entry
    existing.originalValue = originalValue;
    existing.correctedValue = correctedValue;
    existing.timestamp = Date.now();
    existing.frequency += 1;
  } else {
    // Create new entry
    cache[memKey] = {
      key,
      lang,
      originalValue,
      correctedValue,
      timestamp: Date.now(),
      frequency: 1,
    };
  }

  saveMemory(cache);
}

/** Get the last correction for a specific key and language */
export function getLastCorrection(key: string, lang: Lang): TranslationMemoryEntry | null {
  return cache[makeKey(key, lang)] ?? null;
}

/** Get all correction history for a key (all languages) */
export function getCorrectionHistory(key: string, lang?: Lang): TranslationMemoryEntry[] {
  if (lang) {
    const entry = cache[makeKey(key, lang)];
    return entry ? [entry] : [];
  }
  return Object.values(cache).filter((e) => e.key === key);
}

/** Get frequently corrected keys (frequency >= threshold) */
export function getFrequentCorrections(threshold = 3): TranslationMemoryEntry[] {
  return Object.values(cache).filter((e) => e.frequency >= threshold);
}

/** Suggest a correction from memory for a key and language */
export function suggestFromMemory(key: string, lang: Lang): string | null {
  const entry = cache[makeKey(key, lang)];
  if (entry && entry.frequency >= 2) {
    return entry.correctedValue;
  }
  return null;
}

/** Get all memory entries for a language */
export function getMemoryForLanguage(lang: Lang): TranslationMemoryEntry[] {
  return Object.values(cache).filter((e) => e.lang === lang);
}

/** Get total memory entries count */
export function getMemoryCount(): number {
  return Object.keys(cache).length;
}

/** Clear all memory entries */
export function clearMemory(): void {
  cache = {};
  saveMemory(cache);
}

/** Remove a specific memory entry */
export function removeMemoryEntry(key: string, lang: Lang): void {
  delete cache[makeKey(key, lang)];
  saveMemory(cache);
}
