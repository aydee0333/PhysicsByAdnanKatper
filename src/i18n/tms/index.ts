// === Translation Management System — Public API ===
// Single entry point for all TMS functionality.

// ─── Types ───────────────────────────────────────────────────────
export type {
  Lang,
  TranslationOverride,
  OverrideStore,
  GlossaryCategory,
  GlossaryEntry,
  GlossaryData,
  TranslationMemoryEntry,
  TranslationMemoryStore,
  TranslationProvider,
  AdminState,
  TMSContextValue,
} from './types';

// ─── Translation Engine ──────────────────────────────────────────
export { translateWithTMS } from './translationEngine';

// ─── Override Manager ────────────────────────────────────────────
export {
  getOverride,
  setOverride,
  removeOverride,
  getAllOverrides,
  importOverrides,
  exportOverrides,
  hasOverride,
  getOverrideEntry,
  clearOverrides,
  getOverrideCount,
} from './overrideManager';

// ─── Glossary ────────────────────────────────────────────────────
export {
  lookupGlossary,
  getGlossaryByCategory,
  getGlossaryCategories,
  getGlossaryByEnglish,
  getGlossaryEntry,
  getAllGlossaryEntries,
  checkGlossaryConsistency,
  suggestGlossaryForKey,
} from './glossary';

// ─── Translation Memory ──────────────────────────────────────────
export {
  recordCorrection,
  getLastCorrection,
  getCorrectionHistory,
  getFrequentCorrections,
  suggestFromMemory,
  getMemoryForLanguage,
  getMemoryCount,
  clearMemory,
  removeMemoryEntry,
} from './translationMemory';

// ─── Providers ───────────────────────────────────────────────────
export {
  registerProvider,
  unregisterProvider,
  getProviders,
  queryProviders,
  createLocalProvider,
  createGoogleTranslateProvider,
} from './providers';

// ─── Persistence ─────────────────────────────────────────────────
export { loadJSON, saveJSON, STORAGE_KEYS } from './persistence';

// ─── Components ──────────────────────────────────────────────────
export { default as AdminToggle } from './components/AdminToggle';
export { default as TranslationEditor } from './components/TranslationEditor';
export { default as GlossaryPanel } from './components/GlossaryPanel';
export { default as EditableTranslation } from './components/EditableTranslation';
