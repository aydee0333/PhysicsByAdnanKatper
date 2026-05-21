// === Translation Management System — Local Provider ===
// Wraps the existing TRANSLATIONS dictionary as a provider.
// This is the default fallback provider.

import type { Lang, TranslationProvider } from '../types';
import { TRANSLATIONS } from '../../translations';

/** Create a provider that reads from the existing local TRANSLATIONS */
export function createLocalProvider(): TranslationProvider {
  return {
    name: 'local',
    translate(key: string, lang: Lang): string | null {
      // Check current language first
      const current = TRANSLATIONS[lang]?.[key];
      if (current) return current;

      // Fallback to English
      if (lang !== 'en') {
        const english = TRANSLATIONS.en?.[key];
        if (english) return english;
      }

      return null;
    },
  };
}
