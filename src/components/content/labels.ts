import type { Lang } from '../../content/types';

const LABELS: Record<string, Record<Lang, string>> = {
  example: { en: 'Example:', ur: 'مثال:', sd: 'مثال:' },
  solution: { en: 'Solution:', ur: 'حل:', sd: 'حل:' },
  answer: { en: 'Answer:', ur: 'جواب:', sd: 'جواب:' },
  given: { en: 'Given:', ur: 'دیا گیا:', sd: 'ڏنل:' },
  find: { en: 'Find:', ur: 'معلوم کریں:', sd: 'ڳوليو:' },
  exercises: { en: 'Exercises', ur: 'مشقیں', sd: 'س۾ه' },
  ans: { en: 'Ans:', ur: 'ج:', sd: 'ج:' },
  derivation: { en: 'Derivation:', ur: 'استخراج:', sd: 'استخراج:' },
};

export function getLabel(key: string, lang: Lang): string {
  return LABELS[key]?.[lang] ?? LABELS[key]?.en ?? key;
}
