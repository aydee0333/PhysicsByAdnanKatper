import type { ChapterContent, ChapterRegistry, Lang } from './types';

// === Chapter Registry ===
// Each chapter has lazy-loadable imports for all 3 languages.
const CHAPTERS: ChapterRegistry = {
  'class-ix/chapter-01': {
    en: () => import('./class-ix/chapter-01/en').then(m => m.default),
    ur: () => import('./class-ix/chapter-01/ur').then(m => m.default),
    sd: () => import('./class-ix/chapter-01/sd').then(m => m.default),
  },
  'class-ix/chapter-05': {
    en: () => import('./class-ix/chapter-05/en').then(m => m.default),
    ur: () => import('./class-ix/chapter-05/ur').then(m => m.default),
    sd: () => import('./class-ix/chapter-05/sd').then(m => m.default),
  },
  'class-ix/chapter-06': {
    en: () => import('./class-ix/chapter-06/en').then(m => m.default),
    ur: () => import('./class-ix/chapter-06/ur').then(m => m.default),
    sd: () => import('./class-ix/chapter-06/sd').then(m => m.default),
  },
  'class-ix/chapter-07': {
    en: () => import('./class-ix/chapter-07/en').then(m => m.default),
    ur: () => import('./class-ix/chapter-07/ur').then(m => m.default),
    sd: () => import('./class-ix/chapter-07/sd').then(m => m.default),
  },
  'class-x/chapter-01': {
    en: () => import('./class-x/chapter-01/en').then(m => m.default),
    ur: () => import('./class-x/chapter-01/ur').then(m => m.default),
    sd: () => import('./class-x/chapter-01/sd').then(m => m.default),
  },
  'class-x/chapter-02': {
    en: () => import('./class-x/chapter-02/en').then(m => m.default),
    ur: () => import('./class-x/chapter-02/ur').then(m => m.default),
    sd: () => import('./class-x/chapter-02/sd').then(m => m.default),
  },
  'class-x/chapter-03': {
    en: () => import('./class-x/chapter-03/en').then(m => m.default),
    ur: () => import('./class-x/chapter-03/ur').then(m => m.default),
    sd: () => import('./class-x/chapter-03/sd').then(m => m.default),
  },
  'class-x/chapter-04': {
    en: () => import('./class-x/chapter-04/en').then(m => m.default),
    ur: () => import('./class-x/chapter-04/ur').then(m => m.default),
    sd: () => import('./class-x/chapter-04/sd').then(m => m.default),
  },
  'class-x/chapter-05': {
    en: () => import('./class-x/chapter-05/en').then(m => m.default),
    ur: () => import('./class-x/chapter-05/ur').then(m => m.default),
    sd: () => import('./class-x/chapter-05/sd').then(m => m.default),
  },
  'class-x/chapter-06': {
    en: () => import('./class-x/chapter-06/en').then(m => m.default),
    ur: () => import('./class-x/chapter-06/ur').then(m => m.default),
    sd: () => import('./class-x/chapter-06/sd').then(m => m.default),
  },
  'class-x/chapter-07': {
    en: () => import('./class-x/chapter-07/en').then(m => m.default),
    ur: () => import('./class-x/chapter-07/ur').then(m => m.default),
    sd: () => import('./class-x/chapter-07/sd').then(m => m.default),
  },
  'class-x/chapter-08': {
    en: () => import('./class-x/chapter-08/en').then(m => m.default),
    ur: () => import('./class-x/chapter-08/ur').then(m => m.default),
    sd: () => import('./class-x/chapter-08/sd').then(m => m.default),
  },
  'class-x/chapter-09': {
    en: () => import('./class-x/chapter-09/en').then(m => m.default),
    ur: () => import('./class-x/chapter-09/ur').then(m => m.default),
    sd: () => import('./class-x/chapter-09/sd').then(m => m.default),
  },
};

/**
 * Load a chapter's content for a given language.
 * Falls back to English if the requested language is unavailable.
 */
export async function loadChapter(
  classId: string,
  chapterId: string,
  lang: Lang
): Promise<ChapterContent> {
  const key = `${classId}/${chapterId}`;
  const loaders = CHAPTERS[key];
  if (!loaders) {
    throw new Error(`Chapter not found: ${key}`);
  }
  const loader = loaders[lang] ?? loaders.en;
  if (!loader) {
    throw new Error(`No loader for ${key}/${lang}`);
  }
  return loader();
}

/**
 * Check if a chapter exists in the registry
 */
export function hasChapter(classId: string, chapterId: string): boolean {
  return `${classId}/${chapterId}` in CHAPTERS;
}

/**
 * Get all registered chapter keys
 */
export function getRegisteredChapters(): string[] {
  return Object.keys(CHAPTERS);
}

export type { ChapterContent, Lang };
