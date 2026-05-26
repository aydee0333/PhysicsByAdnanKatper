import { type Lang } from './translations';

/**
 * Language utility functions for multilingual physics content
 * Supports English, Urdu, and Sindhi
 */

// ─── Direction Utilities ────────────────────────────────────────────

/** Get text direction for a language */
export function getDirection(lang: Lang): 'ltr' | 'rtl' {
  return lang === 'en' ? 'ltr' : 'rtl';
}

/** Check if language is RTL */
export function isRTL(lang: Lang): boolean {
  return lang !== 'en';
}

/** Get CSS class for direction */
export function getDirClass(lang: Lang): string {
  return isRTL(lang) ? 'rtl' : 'ltr';
}

// ─── Number Formatting ──────────────────────────────────────────────

// RULE: Always use Western (English/Latin) numerals 0-9 in ALL languages,
// including Urdu and Sindhi. Never convert to Eastern Arabic/Urdu/Sindhi
// digit scripts. Numbers must always render left-to-right (LTR).
// This applies to: phone numbers, dates, quantities, physics values,
// addresses, formulas, quiz answers — everything.

/**
 * Format number for display in a specific language.
 * Always returns Western (0-9) numerals, even for RTL languages.
 * Numbers are inherently LTR and must not be converted to local digit scripts.
 */
export function formatNumber(num: number | string): string {
  return String(num);
}

/**
 * Wrap a number/phone string in a <span dir="ltr"> for correct LTR rendering
 * inside RTL text. Use this for phone numbers, dates, IDs, etc.
 * Returns raw HTML string — use with dangerouslySetInnerHTML or JSX.
 *
 * Example: ltrNumber('0312-3456789') → '<span dir="ltr">0312-3456789</span>'
 */
export function ltrNumber(num: number | string): string {
  return `<span dir="ltr">${String(num)}</span>`;
}

/**
 * JSX-friendly: returns style object to make an element render numbers LTR.
 * Apply to a <span> wrapping numbers in RTL contexts.
 */
export const LTR_NUMBER_STYLE: React.CSSProperties = {
  direction: 'ltr',
  unicodeBidi: 'isolate',
  display: 'inline-block',
};

/**
 * Format a physics formula for display
 * Always keeps Western numerals and standard symbols
 */
export function formatFormula(formula: string): string {
  // Formulas always use Western numerals and standard math symbols
  return formula;
}

// ─── Text Utilities ─────────────────────────────────────────────────

/**
 * Get appropriate line height for language
 * Urdu (Nastaliq) needs more line height than other scripts
 */
export function getLineHeight(lang: Lang): string {
  switch (lang) {
    case 'ur':
      return '2'; // Nastaliq script needs more vertical space
    case 'sd':
      return '1.9'; // Naskh script, slightly less than Nastaliq
    default:
      return '1.6'; // Latin script
  }
}

/**
 * Get appropriate word spacing for language
 */
export function getWordSpacing(lang: Lang): string {
  switch (lang) {
    case 'ur':
      return '0.05em';
    case 'sd':
      return '0.03em';
    default:
      return 'normal';
  }
}

/**
 * Get font family for a language
 */
export function getFontFamily(lang: Lang): string {
  switch (lang) {
    case 'ur':
      return "'Noto Nastaliq Urdu', serif";
    case 'sd':
      return "'Noto Sans Sindhi', 'Noto Naskh Arabic', serif";
    default:
      return "'Poppins', sans-serif";
  }
}

// ─── Content Helpers ────────────────────────────────────────────────

/**
 * Get localized unit label
 * In physics education, "Unit" is commonly used in all three languages
 */
export function getUnitLabel(lang: Lang): string {
  switch (lang) {
    case 'ur':
      return 'باب'; // Chapter/Unit in Urdu
    case 'sd':
      return 'باب'; // Chapter/Unit in Sindhi
    default:
      return 'Unit';
  }
}

/**
 * Get localized class label
 */
export function getClassLabel(classNum: 'IX' | 'X', lang: Lang): string {
  if (lang === 'en') {
    return `Class ${classNum}`;
  }

  const classMap = {
    ur: { IX: 'کلاس نہم', X: 'کلاس دہم' },
    sd: { IX: 'ڪلاس نائين', X: 'ڪلاس ڏھين' },
  };

  return classMap[lang][classNum];
}

// ─── Physics Term Helpers ───────────────────────────────────────────

/**
 * Common physics terms that should be kept in English
 * even in Urdu/Sindhi translations (industry standard)
 */
export const KEEP_ENGLISH = [
  'Newton',
  'Joule',
  'Pascal',
  'Watt',
  'Hertz',
  'Ampere',
  'Volt',
  'Ohm',
  'Celsius',
  'Kelvin',
  'Fahrenheit',
  'SI',
  'CGS',
  'DNA',
  'LED',
  'LCD',
];

/**
 * Check if a term should be kept in English
 */
export function shouldKeepEnglish(term: string): boolean {
  return KEEP_ENGLISH.some(
    (eng) => term.toLowerCase() === eng.toLowerCase()
  );
}

/**
 * Get bilingual display format for a physics term
 * Shows: "English Term (Localized Term)"
 */
export function bilingualTerm(
  englishTerm: string,
  localizedTerm: string,
  lang: Lang
): string {
  if (lang === 'en') return englishTerm;
  return `${englishTerm} (${localizedTerm})`;
}

// ─── RTL-Aware Style Helpers ────────────────────────────────────────

/**
 * Get RTL-aware margin/padding style
 * Uses CSS logical properties
 */
export function getLogicalMargin(
  side: 'start' | 'end',
  value: string
): React.CSSProperties {
  return {
    [side === 'start' ? 'marginInlineStart' : 'marginInlineEnd']: value,
  };
}

/**
 * Get RTL-aware padding style
 */
export function getLogicalPadding(
  side: 'start' | 'end',
  value: string
): React.CSSProperties {
  return {
    [side === 'start' ? 'paddingInlineStart' : 'paddingInlineEnd']: value,
  };
}

/**
 * Get RTL-aware border style
 */
export function getLogicalBorder(
  side: 'start' | 'end',
  value: string
): React.CSSProperties {
  return {
    [side === 'start' ? 'borderInlineStart' : 'borderInlineEnd']: value,
  };
}
