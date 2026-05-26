import { Calculator } from 'lucide-react';
import { useLang } from '../../i18n/LanguageContext';
import { getLabel } from './labels';
import EditableTranslation from '../../i18n/tms/components/EditableTranslation';
import type { FormulaBlock as FormulaBlockType } from '../../content/types';

export default function FormulaBlock({ block, contentKeyPrefix }: { block: FormulaBlockType; contentKeyPrefix?: string }) {
  const { lang } = useLang();
  return (
    <div className="bg-white/5 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-3">
        <Calculator size={20} className="text-brand-amber" />
        <h4 className="font-bold text-xl text-white">
          {contentKeyPrefix ? (
            <EditableTranslation tKey={`${contentKeyPrefix}.name`} as="span">{block.name}</EditableTranslation>
          ) : block.name}
        </h4>
      </div>
      <div className="bg-brand-dark/50 rounded-xl p-4 mb-3 text-center">
        <span className="text-2xl font-mono text-brand-cyan font-bold">
          {contentKeyPrefix ? (
            <EditableTranslation tKey={`${contentKeyPrefix}.formula`} as="span">{block.formula}</EditableTranslation>
          ) : block.formula}
        </span>
      </div>
      {block.variables && block.variables.length > 0 && (
        <div className="space-y-1">
          {block.variables.map((v, i) => (
            <p key={i} className="text-sm text-gray-300">
              <span className="font-mono text-brand-amber font-bold">{v.symbol}</span> ={' '}
              {contentKeyPrefix ? (
                <EditableTranslation tKey={`${contentKeyPrefix}.variables.${i}.meaning`} as="span">{v.meaning}</EditableTranslation>
              ) : v.meaning}
            </p>
          ))}
        </div>
      )}
      {block.derivation && (
        <div className="mt-3 bg-white/5 rounded-xl p-3">
          <p className="text-sm text-gray-400">
            <strong className="text-brand-pink">{getLabel('derivation', lang)}</strong>{' '}
            {contentKeyPrefix ? (
              <EditableTranslation tKey={`${contentKeyPrefix}.derivation`} as="span">{block.derivation}</EditableTranslation>
            ) : block.derivation}
          </p>
        </div>
      )}
    </div>
  );
}
