import { List } from 'lucide-react';
import { useLang } from '../../i18n/LanguageContext';
import { getLabel } from './labels';
import type { ExerciseBlock as ExerciseBlockType } from '../../content/types';

export default function ExerciseBlock({ block }: { block: ExerciseBlockType }) {
  const { lang } = useLang();
  return (
    <div className="bg-white/5 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <List size={20} className="text-brand-purple" />
        <h4 className="font-bold text-xl text-white">{getLabel('exercises', lang)}</h4>
      </div>
      <div className="space-y-4">
        {block.questions.map((q) => (
          <div key={q.number} className="flex gap-3">
            <span className="text-brand-purple font-bold text-sm shrink-0 w-8">{q.number}.</span>
            <div>
              <p className="text-gray-200">{q.question}</p>
              {q.answer && (
                <p className="text-sm text-emerald-400 mt-1">
                  <strong>{getLabel('ans', lang)}</strong> {q.answer}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
