// === Translation Management System — Provider Registry ===
// Pluggable translation provider architecture.
// Providers are tried in priority order when a translation is not found locally.

import type { Lang, TranslationProvider } from '../types';

// ─── Provider Registry ───────────────────────────────────────────

const providers: TranslationProvider[] = [];

/** Register a translation provider */
export function registerProvider(provider: TranslationProvider): void {
  // Avoid duplicates
  if (!providers.find((p) => p.name === provider.name)) {
    providers.push(provider);
  }
}

/** Unregister a provider by name */
export function unregisterProvider(name: string): void {
  const idx = providers.findIndex((p) => p.name === name);
  if (idx >= 0) providers.splice(idx, 1);
}

/** Get all registered providers */
export function getProviders(): TranslationProvider[] {
  return [...providers];
}

/** Try all providers in order, return first non-null result */
export function queryProviders(key: string, lang: Lang): string | null {
  for (const provider of providers) {
    try {
      const result = provider.translate(key, lang);
      if (result) return result;
    } catch (e) {
      console.warn(`[TMS] Provider "${provider.name}" failed for key "${key}":`, e);
    }
  }
  return null;
}

// ─── Built-in Providers ──────────────────────────────────────────

export { createLocalProvider } from './localProvider';
export { createGoogleTranslateProvider } from './googleTranslateProvider';
