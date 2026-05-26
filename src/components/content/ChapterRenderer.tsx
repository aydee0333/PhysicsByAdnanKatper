import { memo } from 'react';
import type { ChapterContent } from '../../content/types';
import { GSAP_REVEAL_STYLE } from '../../utils/styles';
import { useLang } from '../../i18n/LanguageContext';
import BlockRenderer from './BlockRenderer';
import EditableTranslation from '../../i18n/tms/components/EditableTranslation';

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
  const contentPrefix = `content::${chapter.classId}/${chapter.id}`;

  return (
    <div className="space-y-12 text-gray-200">
      {/* Student Learning Outcomes */}
      {chapter.objectives && chapter.objectives.length > 0 && (
        <div
          data-section-id="objectives"
          className="unit-detail-reveal glass-card rounded-3xl p-8"
          {...GSAP_REVEAL_STYLE}
        >
          <h2 className="text-3xl font-black mb-6 text-brand-cyan">
            <EditableTranslation tKey={`${contentPrefix}::sloTitle`} as="span">
              {SLO_TITLES[lang] ?? SLO_TITLES.en}
            </EditableTranslation>
          </h2>
          <ol className="space-y-3 list-decimal list-inside text-gray-300 text-lg leading-relaxed">
            {chapter.objectives.map((obj, i) => (
              <li key={i} className="ps-2">
                <EditableTranslation tKey={`${contentPrefix}::objectives.${i}`} as="span">
                  {obj}
                </EditableTranslation>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Existing sections */}
      {chapter.sections.map((section, sIdx) => (
        <div
          key={section.id}
          id={section.id}
          data-section-id={section.id}
          className="unit-detail-reveal glass-card rounded-3xl p-8"
          {...GSAP_REVEAL_STYLE}
        >
          <h2 className="text-3xl font-black mb-6">
            <EditableTranslation tKey={`${contentPrefix}::sections.${sIdx}.title`} as="span">
              {section.title}
            </EditableTranslation>
          </h2>
          <div className="space-y-6">
            {section.blocks.map((block, bIdx) => (
              <BlockRenderer
                key={`${section.id}-${bIdx}`}
                block={block}
                unitId={unitId}
                contentKeyPrefix={`${contentPrefix}::sections.${sIdx}.blocks.${bIdx}`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
})
