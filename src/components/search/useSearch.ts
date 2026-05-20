import { useState, useEffect, useRef } from 'react';
import type { Lang } from '../../content/types';
import {
  loadIndex,
  searchEntries,
  getEntriesForLang,
  type SearchResult,
  type SearchEntry,
} from '../../search/searchIndex';

interface UseSearchReturn {
  results: SearchResult[];
  loading: boolean;
}

/**
 * Hook for searching the offline physics content index.
 * Debounces input, loads index lazily on first search.
 */
export function useSearch(query: string, lang: Lang): UseSearchReturn {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [allEntries, setAllEntries] = useState<SearchEntry[] | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const indexLoadingRef = useRef(false);

  // Load index on first non-empty query
  useEffect(() => {
    if (!query.trim() || allEntries || indexLoadingRef.current) return;

    indexLoadingRef.current = true;
    setLoading(true);

    loadIndex()
      .then(index => {
        setAllEntries(getEntriesForLang(index, lang));
      })
      .catch(() => {
        // Index failed to load — search will return empty results
        setAllEntries([]);
      })
      .finally(() => {
        setLoading(false);
        indexLoadingRef.current = false;
      });
  }, [query, allEntries, lang]);

  // Update entries when language changes (if index already loaded)
  useEffect(() => {
    if (!allEntries) return;
    // Re-load index to get the new language entries
    loadIndex()
      .then(index => {
        setAllEntries(getEntriesForLang(index, lang));
      })
      .catch(() => {});
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!query.trim() || !allEntries) {
      setResults([]);
      return;
    }

    debounceRef.current = setTimeout(() => {
      setResults(searchEntries(allEntries, query));
    }, 150);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, allEntries]);

  return { results, loading };
}
