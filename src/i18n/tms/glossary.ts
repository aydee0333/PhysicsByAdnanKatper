// === Translation Management System — Physics Glossary ===
// Provides consistent physics terminology across all three languages.

import type { GlossaryCategory, GlossaryData, GlossaryEntry, Lang } from './types';
import physicsTermsData from './overrides/physics_terms.json';

// ─── Load Glossary ───────────────────────────────────────────────

// Flatten the category-grouped JSON into a flat GlossaryData record
function loadGlossary(): GlossaryData {
  const result: GlossaryData = {};
  for (const [_category, terms] of Object.entries(physicsTermsData)) {
    for (const [key, entry] of Object.entries(terms as Record<string, Omit<GlossaryEntry, 'category'>>)) {
      result[key] = { ...entry, category: _category as GlossaryCategory };
    }
  }
  return result;
}

const glossary: GlossaryData = loadGlossary();

// ─── Lookup Functions ────────────────────────────────────────────

/** Search glossary by term in any language (case-insensitive partial match) */
export function lookupGlossary(term: string): GlossaryEntry[] {
  const lower = term.toLowerCase();
  return Object.values(glossary).filter(
    (entry) =>
      entry.en.toLowerCase().includes(lower) ||
      entry.ur.includes(term) ||
      entry.sd.includes(term)
  );
}

/** Get all glossary entries for a category */
export function getGlossaryByCategory(category: GlossaryCategory): GlossaryEntry[] {
  return Object.values(glossary).filter((entry) => entry.category === category);
}

/** Get all available categories */
export function getGlossaryCategories(): GlossaryCategory[] {
  const cats = new Set(Object.values(glossary).map((e) => e.category));
  return Array.from(cats);
}

/** Get a glossary entry by its English term (exact match) */
export function getGlossaryByEnglish(englishTerm: string): GlossaryEntry | null {
  const lower = englishTerm.toLowerCase();
  return Object.values(glossary).find((e) => e.en.toLowerCase() === lower) ?? null;
}

/** Get a glossary entry by key */
export function getGlossaryEntry(key: string): GlossaryEntry | null {
  return glossary[key] ?? null;
}

/** Get the full glossary data */
export function getAllGlossaryEntries(): GlossaryData {
  return { ...glossary };
}

/** Check if a translation value matches the glossary for a given key and language */
export function checkGlossaryConsistency(
  key: string,
  lang: Lang,
  value: string
): { consistent: boolean; expected?: string; glossaryKey?: string } {
  // Try to find a glossary entry that matches the key
  const entry = glossary[key];
  if (entry) {
    const expected = entry[lang];
    if (expected && value !== expected) {
      return { consistent: false, expected, glossaryKey: key };
    }
  }

  // Search for the English value in glossary to find the expected translation
  const lower = value.toLowerCase();
  for (const [gKey, gEntry] of Object.entries(glossary)) {
    if (lang !== 'en' && gEntry.en.toLowerCase() === lower) {
      // The value is English but we're in a non-English language
      return { consistent: false, expected: gEntry[lang], glossaryKey: gKey };
    }
  }

  return { consistent: true };
}

/** Suggest glossary matches for a translation key */
export function suggestGlossaryForKey(key: string): GlossaryEntry[] {
  // Extract meaningful parts from the key (e.g., "unit3.force" -> "force")
  const parts = key.split('.');
  const suggestions: GlossaryEntry[] = [];

  for (const part of parts) {
    const matches = lookupGlossary(part);
    for (const match of matches) {
      if (!suggestions.find((s) => s.en === match.en)) {
        suggestions.push(match);
      }
    }
  }

  return suggestions.slice(0, 5); // Limit to 5 suggestions
}
