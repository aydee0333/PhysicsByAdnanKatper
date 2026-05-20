export type Lang = 'en' | 'ur' | 'sd';

export const LANG_META: Record<Lang, { label: string; native: string; dir: 'ltr' | 'rtl'; flag: string; font: string }> = {
  en: { label: 'English', native: 'English',  dir: 'ltr', flag: '🇬🇧', font: "'Poppins', sans-serif" },
  ur: { label: 'Urdu',    native: 'اُردُو',    dir: 'rtl', flag: '🇵🇰', font: "'Noto Nastaliq Urdu', serif" },
  sd: { label: 'Sindhi',  native: 'سِنڌِي',     dir: 'rtl', flag: '🇵🇰', font: "'Noto Sans Sindhi', 'Noto Naskh Arabic', serif" },
};

// Import all translation modules
import { commonEn, commonUr, commonSd } from './common';
import { unit1En, unit1Ur, unit1Sd } from './unit1';
import { unit2En, unit2Ur, unit2Sd } from './unit2';
import { unit3En, unit3Ur, unit3Sd } from './unit3';
import { unit4En, unit4Ur, unit4Sd } from './unit4';
import { unit5En, unit5Ur, unit5Sd } from './unit5';
import { unit6En, unit6Ur, unit6Sd } from './unit6';
import { unit7En, unit7Ur, unit7Sd } from './unit7';
import { unit8En, unit8Ur, unit8Sd } from './unit8';
import { unit9En, unit9Ur, unit9Sd } from './unit9';

// Merge dictionaries for each language
export const TRANSLATIONS = {
  en: { ...commonEn, ...unit1En, ...unit2En, ...unit3En, ...unit4En, ...unit5En, ...unit6En, ...unit7En, ...unit8En, ...unit9En },
  ur: { ...commonUr, ...unit1Ur, ...unit2Ur, ...unit3Ur, ...unit4Ur, ...unit5Ur, ...unit6Ur, ...unit7Ur, ...unit8Ur, ...unit9Ur },
  sd: { ...commonSd, ...unit1Sd, ...unit2Sd, ...unit3Sd, ...unit4Sd, ...unit5Sd, ...unit6Sd, ...unit7Sd, ...unit8Sd, ...unit9Sd },
};

// Safe translate function with fallback
export function translate(lang: Lang, key: string, fallback?: string): string {
  const current = TRANSLATIONS[lang]?.[key];
  if (current) return current;
  
  const english = TRANSLATIONS.en?.[key];
  if (english) return english;
  
  return fallback ?? key;
}