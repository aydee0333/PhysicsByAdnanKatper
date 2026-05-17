export type Lang = 'en' | 'ur' | 'sd';

export const LANG_META: Record<Lang, { label: string; native: string; dir: 'ltr' | 'rtl'; flag: string; font: string }> = {
  en: { label: 'English', native: 'English',  dir: 'ltr', flag: '🇬🇧', font: "'Poppins', sans-serif" },
  ur: { label: 'Urdu',    native: 'اُردُو',    dir: 'rtl', flag: '🇵🇰', font: "'Noto Nastaliq Urdu', serif" },
  sd: { label: 'Sindhi',  native: 'سِنڌِي',     dir: 'rtl', flag: '🇵🇰', font: "'Noto Naskh Arabic', 'Noto Sans Arabic', serif" },
};

// Import all translation modules
import { commonEn, commonUr, commonSd } from './common';
import { unit1En, unit1Ur, unit1Sd } from './unit1';
import { unit2En, unit2Ur, unit2Sd } from './unit2';

// Merge dictionaries for each language
export const TRANSLATIONS = {
  en: { ...commonEn, ...unit1En, ...unit2En },
  ur: { ...commonUr, ...unit1Ur, ...unit2Ur },
  sd: { ...commonSd, ...unit1Sd, ...unit2Sd },
};

type Dict = Record<string, string>;

// Safe translate function with fallback
export function translate(lang: Lang, key: string, fallback?: string): string {
  const current = TRANSLATIONS[lang]?.[key];
  if (current) return current;
  
  const english = TRANSLATIONS.en?.[key];
  if (english) return english;
  
  return fallback ?? key;
}