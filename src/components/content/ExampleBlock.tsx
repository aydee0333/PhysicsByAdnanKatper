import { Lightbulb } from 'lucide-react';
import { useLang } from '../../i18n/LanguageContext';
import { getLabel } from './labels';
import type { ExampleBlock as ExampleBlockType } from '../../content/types';

export default function ExampleBlock({ block }: { block: ExampleBlockType }) {
  const { lang } = useLang();
  return (
    <div className="bg-white/5 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-3">
        <Lightbulb size={20} className="text-brand-lime" />
        <h4 className="font-bold text-xl text-white">{block.title}</h4>
      </div>
      <div className="bg-brand-lime/10 rounded-xl p-4 mb-4">
        <p className="text-gray-200 font-medium">{block.problem}</p>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-bold text-brand-amber mb-2">{getLabel('solution', lang)}</p>
        {block.solution.map((step, i) => (
          <div key={i} className="flex gap-3">
            <span className="text-brand-cyan font-mono text-sm font-bold shrink-0">{i + 1}.</span>
            <p className="text-gray-300 text-sm">{step}</p>
          </div>
        ))}
      </div>
      {block.answer && (
        <div className="mt-4 bg-emerald-500/10 rounded-xl p-3">
          <p className="text-emerald-400 font-bold text-sm">
            {getLabel('answer', lang)} {block.answer}
          </p>
        </div>
      )}
    </div>
  );
}
