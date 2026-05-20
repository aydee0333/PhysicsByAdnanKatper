import type { Lang } from '../content/types';

// === Types ===

export interface SearchEntry {
  classId: string;
  chapterId: string;
  sectionId: string;
  unitNumber: string;
  blockType: string;
  label: string;
  text: string;
  snippet: string;
}

export interface SearchResult {
  entry: SearchEntry;
  snippet: string; // snippet with match context
}

interface SearchIndexData {
  version: number;
  generated: string;
  en: SearchEntry[];
  ur: SearchEntry[];
  sd: SearchEntry[];
}

// === Constants ===

const BLOCK_TYPE_PRIORITY: Record<string, number> = {
  definition: 0,
  formula: 1,
  numerical: 2,
  example: 3,
  exercise: 4,
  quiz: 5,
};

// === State ===

let cachedIndex: SearchIndexData | null = null;
let loadingPromise: Promise<SearchIndexData> | null = null;

// === Public API ===

/**
 * Load the search index JSON. Cached after first load.
 * Uses relative URL (./search-index.json) which works with Vite's base: './'.
 */
export async function loadIndex(): Promise<SearchIndexData> {
  if (cachedIndex) return cachedIndex;
  if (loadingPromise) return loadingPromise;

  loadingPromise = fetch('./search-index.json')
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load search index: ${res.status}`);
      return res.json();
    })
    .then((data: SearchIndexData) => {
      cachedIndex = data;
      return data;
    })
    .catch(err => {
      loadingPromise = null;
      throw err;
    });

  return loadingPromise;
}

/**
 * Search entries for a query in the given language.
 * Returns results ranked by relevance (tier + block type priority).
 */
export function searchEntries(
  entries: SearchEntry[],
  query: string,
  limit = 20
): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: { entry: SearchEntry; tier: number; snippet: string }[] = [];

  for (const entry of entries) {
    const labelLower = entry.label.toLowerCase();
    const textLower = entry.text.toLowerCase();

    let tier = -1;

    // Tier 1: label starts with query
    if (labelLower.startsWith(q)) {
      tier = 1;
    }
    // Tier 2: label contains query
    else if (labelLower.includes(q)) {
      tier = 2;
    }
    // Tier 3: text contains query
    else if (textLower.includes(q)) {
      tier = 3;
    }

    if (tier === -1) continue;

    results.push({
      entry,
      tier,
      snippet: extractSnippet(entry.text, q),
    });
  }

  // Sort by tier first, then by block type priority
  results.sort((a, b) => {
    if (a.tier !== b.tier) return a.tier - b.tier;
    const pa = BLOCK_TYPE_PRIORITY[a.entry.blockType] ?? 99;
    const pb = BLOCK_TYPE_PRIORITY[b.entry.blockType] ?? 99;
    return pa - pb;
  });

  return results.slice(0, limit).map(r => ({
    entry: r.entry,
    snippet: r.snippet,
  }));
}

/**
 * Get entries for a specific language from the index.
 */
export function getEntriesForLang(index: SearchIndexData, lang: Lang): SearchEntry[] {
  return index[lang] ?? index.en ?? [];
}

// === Internal ===

/**
 * Extract a snippet around the first match in text.
 * Returns ~120 chars of context with the match position.
 */
function extractSnippet(text: string, query: string): string {
  const lower = text.toLowerCase();
  const pos = lower.indexOf(query);
  if (pos === -1) return text.slice(0, 120);

  const start = Math.max(0, pos - 40);
  const end = Math.min(text.length, pos + query.length + 80);
  let snippet = text.slice(start, end);

  if (start > 0) snippet = '...' + snippet;
  if (end < text.length) snippet = snippet + '...';

  return snippet;
}
