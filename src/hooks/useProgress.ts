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
    const key = `${unitId}:${sectionKey}`;
    if (progress.completedSections.includes(key)) return;
    
    const updated = {
      ...progress,
      completedSections: [...progress.completedSections, key],
      lastVisited: new Date().toISOString(),
    };
    setProgress(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
  }, [progress, unitId]);

  const isSectionComplete = useCallback((sectionKey: string) => {
    return progress.completedSections.includes(`${unitId}:${sectionKey}`);
  }, [progress, unitId]);

  const getUnitProgress = useCallback(() => {
    const unitSections = progress.completedSections.filter(k => k.startsWith(`${unitId}:`));
    // Assumes ~8 sections per unit
    return Math.min(100, Math.round((unitSections.length / 8) * 100));
  }, [progress, unitId]);

  const saveQuizScore = useCallback((quizKey: string, score: number, total: number) => {
    const updated = {
      ...progress,
      quizScores: {
        ...progress.quizScores,
        [`${unitId}:${quizKey}`]: { score, total, date: new Date().toISOString() }
      },
      lastVisited: new Date().toISOString(),
    };
    setProgress(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
  }, [progress, unitId]);

  return {
    progress,
    markSectionComplete,
    isSectionComplete,
    getUnitProgress,
    saveQuizScore,
    completedCount: progress.completedSections.filter(k => k.startsWith(`${unitId}:`)).length,
  };
}