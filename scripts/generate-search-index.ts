/**
 * Build-time search index generator.
 * Reads all chapter content files and produces a JSON search index
 * at public/search-index.json for the offline search engine.
 *
 * Usage: npx tsx scripts/generate-search-index.ts
 */

import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// We need to import the content files directly since this runs outside Vite.
// Each chapter file exports a default ChapterContent object.
import type { ChapterContent, ContentBlock } from '../src/content/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');

type Lang = 'en' | 'ur' | 'sd';
const LANGS: Lang[] = ['en', 'ur', 'sd'];

interface SearchEntry {
  classId: string;
  chapterId: string;
  sectionId: string;
  unitNumber: string;
  blockType: string;
  label: string;
  text: string;
  snippet: string;
}

interface SearchIndex {
  version: 1;
  generated: string;
  en: SearchEntry[];
  ur: SearchEntry[];
  sd: SearchEntry[];
}

const CLASSES = ['class-ix', 'class-x'];
const CHAPTERS = Array.from({ length: 9 }, (_, i) => `chapter-${String(i + 1).padStart(2, '0')}`);

function unitNumberFromChapter(chapterId: string): string {
  return chapterId.replace('chapter-', '');
}

function extractText(block: ContentBlock): { label: string; text: string; snippet: string } | null {
  switch (block.type) {
    case 'definition': {
      const parts = [block.term, block.definition, block.example].filter(Boolean);
      return {
        label: block.term,
        text: parts.join(' '),
        snippet: block.definition.slice(0, 120),
      };
    }
    case 'formula': {
      const varText = block.variables?.map(v => `${v.symbol} ${v.meaning}`).join(' ') ?? '';
      const parts = [block.name, block.formula, varText, block.derivation].filter(Boolean);
      return {
        label: block.name,
        text: parts.join(' '),
        snippet: `${block.name}: ${block.formula}`.slice(0, 120),
      };
    }
    case 'example': {
      const parts = [block.title, block.problem, ...block.solution, block.answer].filter(Boolean);
      return {
        label: block.title,
        text: parts.join(' '),
        snippet: block.problem.slice(0, 120),
      };
    }
    case 'quiz': {
      const texts = block.questions.flatMap(q => [
        q.question,
        ...q.options,
        q.explanation ?? '',
      ]);
      const firstQ = block.questions[0];
      return {
        label: firstQ?.question.slice(0, 80) ?? 'Quiz',
        text: texts.join(' '),
        snippet: firstQ?.question.slice(0, 120) ?? '',
      };
    }
    case 'numerical': {
      const givenText = block.given.map(g => `${g.label} ${g.value} ${g.unit ?? ''}`).join(' ');
      const parts = [block.title, block.problem, block.find, givenText, ...block.solution, block.answer].filter(Boolean);
      return {
        label: block.title,
        text: parts.join(' '),
        snippet: block.problem.slice(0, 120),
      };
    }
    case 'exercise': {
      const texts = block.questions.flatMap(q => [q.question, q.answer ?? '']);
      const firstQ = block.questions[0];
      return {
        label: firstQ?.question.slice(0, 80) ?? 'Exercise',
        text: texts.join(' '),
        snippet: firstQ?.question.slice(0, 120) ?? '',
      };
    }
    case 'interactive':
      // Component names are not meaningful searchable content
      return null;
  }
}

async function loadChapterContent(classId: string, chapterId: string, lang: Lang): Promise<ChapterContent | null> {
  try {
    const mod = await import(`../src/content/${classId}/${chapterId}/${lang}.ts`);
    return mod.default as ChapterContent;
  } catch {
    return null;
  }
}

async function buildIndex(): Promise<SearchIndex> {
  const index: SearchIndex = {
    version: 1,
    generated: new Date().toISOString().slice(0, 10),
    en: [],
    ur: [],
    sd: [],
  };

  let totalEntries = 0;

  for (const classId of CLASSES) {
    for (const chapterId of CHAPTERS) {
      for (const lang of LANGS) {
        const chapter = await loadChapterContent(classId, chapterId, lang);
        if (!chapter) continue;

        const unitNum = unitNumberFromChapter(chapterId);

        for (const section of chapter.sections) {
          for (const block of section.blocks) {
            const extracted = extractText(block);
            if (!extracted) continue;

            const entry: SearchEntry = {
              classId,
              chapterId,
              sectionId: section.id,
              unitNumber: unitNum,
              blockType: block.type,
              label: extracted.label,
              text: extracted.text,
              snippet: extracted.snippet,
            };

            index[lang].push(entry);
            totalEntries++;
          }
        }
      }
    }
  }

  console.log(`Generated search index: ${totalEntries} entries`);
  console.log(`  EN: ${index.en.length}, UR: ${index.ur.length}, SD: ${index.sd.length}`);

  return index;
}

async function main() {
  const index = await buildIndex();
  const outPath = resolve(ROOT, 'public', 'search-index.json');
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(index), 'utf-8');
  console.log(`Written to ${outPath}`);
}

main().catch(err => {
  console.error('Failed to generate search index:', err);
  process.exit(1);
});
