// === Translation Management System — Persistence Layer ===
// All TMS data is persisted in localStorage with error handling and cross-tab sync.

// ─── Storage Keys ────────────────────────────────────────────────

export const STORAGE_KEYS = {
  overrides: 'tms_overrides',
  memory: 'tms_memory',
  adminMode: 'tms_admin_mode',
} as const;

// ─── Core Helpers ────────────────────────────────────────────────

/** Load a JSON value from localStorage with fallback */
export function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/** Save a JSON value to localStorage */
export function saveJSON<T>(key: string, value: T): boolean {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    // Handle quota exceeded
    if (e instanceof DOMException && e.name === 'QuotaExceededError') {
      console.warn(`[TMS] localStorage quota exceeded for key "${key}"`);
    }
    return false;
  }
}

/** Remove a key from localStorage */
export function removeKey(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Silently fail
  }
}

// ─── Cross-Tab Sync ──────────────────────────────────────────────

type StorageListener = (key: string, newValue: string | null) => void;

const listeners = new Set<StorageListener>();

/** Subscribe to localStorage changes from other tabs */
export function onStorageChange(listener: StorageListener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// Register the global listener once
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key && Object.values(STORAGE_KEYS).includes(e.key as typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS])) {
      listeners.forEach((fn) => fn(e.key!, e.newValue));
    }
  });
}

// ─── Convenience: Override Store ─────────────────────────────────

import type { OverrideStore } from './types';

const OVERRIDES_KEY = STORAGE_KEYS.overrides;

export function loadOverrides(): OverrideStore {
  return loadJSON<OverrideStore>(OVERRIDES_KEY, {});
}

export function saveOverrides(store: OverrideStore): boolean {
  return saveJSON(OVERRIDES_KEY, store);
}

// ─── Convenience: Memory Store ───────────────────────────────────

import type { TranslationMemoryStore } from './types';

const MEMORY_KEY = STORAGE_KEYS.memory;

export function loadMemory(): TranslationMemoryStore {
  return loadJSON<TranslationMemoryStore>(MEMORY_KEY, {});
}

export function saveMemory(store: TranslationMemoryStore): boolean {
  return saveJSON(MEMORY_KEY, store);
}

// ─── Convenience: Admin State ────────────────────────────────────

import type { AdminState } from './types';

const ADMIN_KEY = STORAGE_KEYS.adminMode;

const DEFAULT_ADMIN: AdminState = { enabled: false, showGlossary: false };

export function loadAdminState(): AdminState {
  return loadJSON<AdminState>(ADMIN_KEY, DEFAULT_ADMIN);
}

export function saveAdminState(state: AdminState): boolean {
  return saveJSON(ADMIN_KEY, state);
}
