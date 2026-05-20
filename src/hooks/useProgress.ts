import { useState, useEffect, useCallback } from 'react';

export interface ProgressData {
  completedSections: string[];
  quizScores: Record<string, { score: number; total: number; date: string }>;
  lastVisited: string;
}

const STORAGE_KEY = 'physics_progress_v1';

export function useProgress(unitId: string) {
  const [progress, setProgress] = useState<ProgressData>(() => {
    if (typeof window === 'undefined') {
      return { completedSections: [], quizScores: {}, lastVisited: '' };
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { completedSections: [], quizScores: {}, lastVisited: '' };
    } catch {
      return { completedSections: [], quizScores: {}, lastVisited: '' };
    }
  });

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try { setProgress(JSON.parse(e.newValue)); } catch {}
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const markSectionComplete = useCallback((sectionKey: string) => {
    setProgress(prev => {
      const key = `${unitId}:${sectionKey}`;
      if (prev.completedSections.includes(key)) return prev;

      const updated = {
        ...prev,
        completedSections: [...prev.completedSections, key],
        lastVisited: new Date().toISOString(),
      };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, [unitId]);

  const isSectionComplete = useCallback((sectionKey: string) => {
    return progress.completedSections.includes(`${unitId}:${sectionKey}`);
  }, [progress.completedSections, unitId]);

  const getUnitProgress = useCallback((totalSections?: number) => {
    const unitSections = progress.completedSections.filter(k => k.startsWith(`${unitId}:`));
    const denominator = totalSections || 8;
    return Math.min(100, Math.round((unitSections.length / denominator) * 100));
  }, [progress.completedSections, unitId]);

  const saveQuizScore = useCallback((quizKey: string, score: number, total: number) => {
    setProgress(prev => {
      const updated = {
        ...prev,
        quizScores: {
          ...prev.quizScores,
          [`${unitId}:${quizKey}`]: { score, total, date: new Date().toISOString() }
        },
        lastVisited: new Date().toISOString(),
      };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, [unitId]);

  return {
    progress,
    markSectionComplete,
    isSectionComplete,
    getUnitProgress,
    saveQuizScore,
    completedCount: progress.completedSections.filter(k => k.startsWith(`${unitId}:`)).length,
  };
}
