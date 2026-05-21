// === Translation Management System — Type Definitions ===

export type Lang = 'en' | 'ur' | 'sd';

// ─── Override Types ──────────────────────────────────────────────

export interface TranslationOverride {
  key: string;
  lang: Lang;
  value: string;
  timestamp: number;
  source: 'manual' | 'import' | 'provider';
}

export type OverrideStore = Record<string, TranslationOverride>;

// ─── Glossary Types ──────────────────────────────────────────────

export type GlossaryCategory =
  | 'mechanics'
  | 'energy'
  | 'thermal'
  | 'waves'
  | 'electricity'
  | 'measurements'
  | 'optics'
  | 'general';

export interface GlossaryEntry {
  en: string;
  ur: string;
  sd: string;
  category: GlossaryCategory;
  notes?: string;
}

export type GlossaryData = Record<string, GlossaryEntry>;

// ─── Translation Memory Types ────────────────────────────────────

export interface TranslationMemoryEntry {
  key: string;
  lang: Lang;
  originalValue: string;
  correctedValue: string;
  timestamp: number;
  frequency: number;
}

export type TranslationMemoryStore = Record<string, TranslationMemoryEntry>;

// ─── Provider Types ──────────────────────────────────────────────

export interface TranslationProvider {
  name: string;
  translate(key: string, lang: Lang): string | null;
}

// ─── Admin Mode Types ────────────────────────────────────────────

export interface AdminState {
  enabled: boolean;
  showGlossary: boolean;
}

// ─── TMS Context Types ───────────────────────────────────────────

export interface TMSContextValue {
  /** Enhanced translate function with override chain */
  t: (key: string, fallback?: string) => string;
  /** Set a translation override */
  setOverride: (key: string, lang: Lang, value: string, source?: TranslationOverride['source']) => void;
  /** Remove a translation override */
  removeOverride: (key: string, lang: Lang) => void;
  /** Get all overrides for a language */
  getOverrides: (lang?: Lang) => OverrideStore;
  /** Import overrides from JSON */
  importOverrides: (data: Record<string, string>, lang: Lang) => void;
  /** Export overrides as JSON */
  exportOverrides: (lang?: Lang) => Record<string, string>;
  /** Search the glossary */
  lookupGlossary: (term: string) => GlossaryEntry[];
  /** Get glossary entries by category */
  getGlossaryByCategory: (category: GlossaryCategory) => GlossaryEntry[];
  /** Get correction history for a key */
  getCorrectionHistory: (key: string, lang?: Lang) => TranslationMemoryEntry[];
  /** Record a translation correction */
  recordCorrection: (key: string, lang: Lang, original: string, corrected: string) => void;
  /** Admin mode state */
  adminState: AdminState;
  /** Toggle admin mode */
  toggleAdmin: () => void;
  /** Toggle glossary panel */
  toggleGlossary: () => void;
}
