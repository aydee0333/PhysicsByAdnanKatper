import { List } from 'lucide-react';
import { useLang } from '../../i18n/LanguageContext';
import { getLabel } from './labels';
import EditableTranslation from '../../i18n/tms/components/EditableTranslation';
import type { ExerciseBlock as ExerciseBlockType } from '../../content/types';

export default function ExerciseBlock({ block, contentKeyPrefix }: { block: ExerciseBlockType; contentKeyPrefix?: string }) {
  const { lang } = useLang();
  return (
    <div className="bg-white/5 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <List size={20} className="text-brand-purple" />
        <h4 className="font-bold text-xl text-white">{getLabel('exercises', lang)}</h4>
      </div>
      <div className="space-y-4">
        {block.questions.map((q, qIdx) => (
          <div key={q.number} className="flex gap-3">
            <span className="text-brand-purple font-bold text-sm shrink-0 w-8">{q.number}.</span>
            <div>
              <p className="text-gray-200">
                {contentKeyPrefix ? (
                  <EditableTranslation tKey={`${contentKeyPrefix}.questions.${qIdx}.question`} as="span">{q.question}</EditableTranslation>
                ) : q.question}
              </p>
              {q.answer && (
                <p className="text-sm text-emerald-400 mt-1">
                  <strong>{getLabel('ans', lang)}</strong>{' '}
                  {contentKeyPrefix ? (
                    <EditableTranslation tKey={`${contentKeyPrefix}.questions.${qIdx}.answer`} as="span">{q.answer}</EditableTranslation>
                  ) : q.answer}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
