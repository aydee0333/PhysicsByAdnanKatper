import { useState, useEffect } from 'react';
import { useLang } from '../i18n/LanguageContext';
import { loadChapter } from './index';
import type { ChapterContent, Lang } from './types';

interface UseChapterResult {
  chapter: ChapterContent | null;
  loading: boolean;
  error: string | null;
}

export function useChapter(classId: string, chapterId: string): UseChapterResult {
  const { lang } = useLang();
  const [chapter, setChapter] = useState<ChapterContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    loadChapter(classId, chapterId, lang as Lang)
      .then(content => {
        if (!cancelled) {
          setChapter(content);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load chapter');
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [classId, chapterId, lang]);

  return { chapter, loading, error };
}
