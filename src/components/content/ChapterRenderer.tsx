import { memo } from 'react';
import type { ChapterContent } from '../../content/types';
import { useLang } from '../../i18n/LanguageContext';
import BlockRenderer from './BlockRenderer';

const SLO_TITLES: Record<string, string> = {
  en: 'Student Learning Outcomes',
  ur: 'طلباء کی تعلیمی نتائج',
  sd: 'شاگردن جي سکڻ جا نتيجا',
};

interface ChapterRendererProps {
  chapter: ChapterContent;
  unitId?: string;
}

export default memo(function ChapterRenderer({ chapter, unitId }: ChapterRendererProps) {
  const { lang } = useLang();

  return (
    <div className="space-y-12 text-gray-200">
      {/* Student Learning Outcomes */}
      {chapter.objectives && chapter.objectives.length > 0 && (
        <div
          data-section-id="objectives"
          className="unit-detail-reveal glass-card rounded-3xl p-8"
          style={{ opacity: 0, transform: 'translateY(60px)' }}
        >
          <h2 className="text-3xl font-black mb-6 text-brand-cyan">
            {SLO_TITLES[lang] ?? SLO_TITLES.en}
          </h2>
          <ol className="space-y-3 list-decimal list-inside text-gray-300 text-lg leading-relaxed">
            {chapter.objectives.map((obj, i) => (
              <li key={i} className="ps-2">{obj}</li>
            ))}
          </ol>
        </div>
      )}

      {/* Existing sections */}
      {chapter.sections.map((section) => (
        <div
          key={section.id}
          id={section.id}
          data-section-id={section.id}
          className="unit-detail-reveal glass-card rounded-3xl p-8"
          style={{ opacity: 0, transform: 'translateY(60px)' }}
        >
          <h2 className="text-3xl font-black mb-6">{section.title}</h2>
          <div className="space-y-6">
            {section.blocks.map((block, i) => (
              <BlockRenderer key={`${section.id}-${i}`} block={block} unitId={unitId} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
})
