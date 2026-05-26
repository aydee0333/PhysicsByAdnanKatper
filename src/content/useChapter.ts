import { useState, useEffect, useMemo } from 'react';
import { useLang } from '../i18n/LanguageContext';
import { loadChapter } from './index';
import { getOverride } from '../i18n/tms/overrideManager';
import type { ChapterContent, Lang } from './types';

interface UseChapterResult {
  chapter: ChapterContent | null;
  loading: boolean;
  error: string | null;
}

/** Apply content overrides from localStorage to loaded chapter data */
function applyContentOverrides(content: ChapterContent, lang: Lang): ChapterContent {
  const prefix = `content::${content.classId}/${content.id}`;
  let modified = false;

  // Deep clone to avoid mutating the original
  const clone = JSON.parse(JSON.stringify(content)) as ChapterContent;

  // Check SLO title override
  const sloKey = `${prefix}::sloTitle`;
  const sloOverride = getOverride(sloKey, lang);
  if (sloOverride) {
    // Store in a side channel — ChapterRenderer will use EditableTranslation's override
    modified = true;
  }

  // Check objectives overrides
  if (clone.objectives) {
    clone.objectives = clone.objectives.map((obj, i) => {
      const key = `${prefix}::objectives.${i}`;
      const override = getOverride(key, lang);
      if (override) { modified = true; return override; }
      return obj;
    });
  }

  // Check section and block overrides
  clone.sections = clone.sections.map((section, sIdx) => {
    const titleKey = `${prefix}::sections.${sIdx}.title`;
    const titleOverride = getOverride(titleKey, lang);
    if (titleOverride) { modified = true; section.title = titleOverride; }

    section.blocks = section.blocks.map((block, bIdx) => {
      const blockPrefix = `${prefix}::sections.${sIdx}.blocks.${bIdx}`;

      if (block.type === 'definition') {
        const termOverride = getOverride(`${blockPrefix}.term`, lang);
        if (termOverride) { modified = true; block.term = termOverride; }
        const defOverride = getOverride(`${blockPrefix}.definition`, lang);
        if (defOverride) { modified = true; block.definition = defOverride; }
        if (block.example) {
          const exOverride = getOverride(`${blockPrefix}.example`, lang);
          if (exOverride) { modified = true; block.example = exOverride; }
        }
      }

      if (block.type === 'formula') {
        const nameOverride = getOverride(`${blockPrefix}.name`, lang);
        if (nameOverride) { modified = true; block.name = nameOverride; }
        const formulaOverride = getOverride(`${blockPrefix}.formula`, lang);
        if (formulaOverride) { modified = true; block.formula = formulaOverride; }
        if (block.variables) {
          block.variables = block.variables.map((v, vi) => {
            const mOverride = getOverride(`${blockPrefix}.variables.${vi}.meaning`, lang);
            if (mOverride) { modified = true; v.meaning = mOverride; }
            return v;
          });
        }
        if (block.derivation) {
          const dOverride = getOverride(`${blockPrefix}.derivation`, lang);
          if (dOverride) { modified = true; block.derivation = dOverride; }
        }
      }

      if (block.type === 'example') {
        const tOverride = getOverride(`${blockPrefix}.title`, lang);
        if (tOverride) { modified = true; block.title = tOverride; }
        const pOverride = getOverride(`${blockPrefix}.problem`, lang);
        if (pOverride) { modified = true; block.problem = pOverride; }
        block.solution = block.solution.map((step, si) => {
          const sOverride = getOverride(`${blockPrefix}.solution.${si}`, lang);
          if (sOverride) { modified = true; return sOverride; }
          return step;
        });
        if (block.answer) {
          const aOverride = getOverride(`${blockPrefix}.answer`, lang);
          if (aOverride) { modified = true; block.answer = aOverride; }
        }
      }

      if (block.type === 'numerical') {
        const tOverride = getOverride(`${blockPrefix}.title`, lang);
        if (tOverride) { modified = true; block.title = tOverride; }
        const pOverride = getOverride(`${blockPrefix}.problem`, lang);
        if (pOverride) { modified = true; block.problem = pOverride; }
        block.given = block.given.map((g, gi) => {
          const lOverride = getOverride(`${blockPrefix}.given.${gi}.label`, lang);
          if (lOverride) { modified = true; g.label = lOverride; }
          const vOverride = getOverride(`${blockPrefix}.given.${gi}.value`, lang);
          if (vOverride) { modified = true; g.value = vOverride; }
          return g;
        });
        const fOverride = getOverride(`${blockPrefix}.find`, lang);
        if (fOverride) { modified = true; block.find = fOverride; }
        block.solution = block.solution.map((step, si) => {
          const sOverride = getOverride(`${blockPrefix}.solution.${si}`, lang);
          if (sOverride) { modified = true; return sOverride; }
          return step;
        });
        const aOverride = getOverride(`${blockPrefix}.answer`, lang);
        if (aOverride) { modified = true; block.answer = aOverride; }
      }

      if (block.type === 'exercise') {
        block.questions = block.questions.map((q, qi) => {
          const qOverride = getOverride(`${blockPrefix}.questions.${qi}.question`, lang);
          if (qOverride) { modified = true; q.question = qOverride; }
          if (q.answer) {
            const aOverride = getOverride(`${blockPrefix}.questions.${qi}.answer`, lang);
            if (aOverride) { modified = true; q.answer = aOverride; }
          }
          return q;
        });
      }

      return block;
    });

    return section;
  });

  return modified ? clone : content;
}

export function useChapter(classId: string, chapterId: string): UseChapterResult {
  const { lang, overrideVersion } = useLang();
  const [rawChapter, setRawChapter] = useState<ChapterContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    loadChapter(classId, chapterId, lang as Lang)
      .then(content => {
        if (!cancelled) {
          setRawChapter(content);
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

  // Apply content overrides whenever raw chapter or override version changes
  const chapter = useMemo(
    () => rawChapter ? applyContentOverrides(rawChapter, lang as Lang) : null,
    [rawChapter, lang, overrideVersion]
  );

  return { chapter, loading, error };
}
