// === Translation Management System — Google Translate Provider ===
// Stub for Google Translate API integration.
// Can be enabled by providing an API key.
// Not used in production — the app works offline.

import type { Lang, TranslationProvider } from '../types';

interface GoogleTranslateConfig {
  apiKey: string;
  /** Source language (default: 'en') */
  source?: Lang;
  /** Cache translations to avoid repeated API calls */
  cache?: boolean;
}

/**
 * Create a Google Translate provider.
 * This is a stub — the actual API call is not implemented since the app works offline.
 * To use: register the provider with a valid API key.
 */
export function createGoogleTranslateProvider(config: GoogleTranslateConfig): TranslationProvider {
  const cache = new Map<string, string>();

  return {
    name: 'google-translate',
    translate(key: string, lang: Lang): string | null {
      // Google Translate only translates TO non-English from English
      if (lang === 'en') return null;

      const cacheKey = `${lang}:${key}`;

      // Check cache
      if (config.cache !== false && cache.has(cacheKey)) {
        return cache.get(cacheKey!)!;
      }

      // In a real implementation, this would call the Google Translate API:
      // POST https://translation.googleapis.com/language/translate/v2
      // with { q: englishText, source: 'en', target: LANG_MAP[lang], key: config.apiKey }
      //
      // For now, return null to indicate no translation available
      console.info(
        `[TMS] Google Translate provider is a stub. Would translate "${key}" to ${lang}.`
      );

      return null;
    },
  };
}
