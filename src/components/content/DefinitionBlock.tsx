import { BookOpen } from 'lucide-react';
import { useLang } from '../../i18n/LanguageContext';
import { getLabel } from './labels';
import EditableTranslation from '../../i18n/tms/components/EditableTranslation';
import type { DefinitionBlock as DefinitionBlockType } from '../../content/types';

export default function DefinitionBlock({ block, contentKeyPrefix }: { block: DefinitionBlockType; contentKeyPrefix?: string }) {
  const { lang } = useLang();
  return (
    <div className="bg-white/5 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-3">
        <BookOpen size={20} className="text-brand-cyan" />
        <h4 className="font-bold text-xl text-white">
          {contentKeyPrefix ? (
            <EditableTranslation tKey={`${contentKeyPrefix}.term`} as="span">{block.term}</EditableTranslation>
          ) : block.term}
        </h4>
      </div>
      <p className="text-gray-300 leading-relaxed">
        {contentKeyPrefix ? (
          <EditableTranslation tKey={`${contentKeyPrefix}.definition`} as="span">{block.definition}</EditableTranslation>
        ) : block.definition}
      </p>
      {block.example && (
        <div className="mt-3 bg-brand-cyan/10 rounded-xl p-3">
          <p className="text-sm text-brand-cyan">
            <strong>{getLabel('example', lang)}</strong>{' '}
            {contentKeyPrefix ? (
              <EditableTranslation tKey={`${contentKeyPrefix}.example`} as="span">{block.example}</EditableTranslation>
            ) : block.example}
          </p>
        </div>
      )}
    </div>
  );
}
