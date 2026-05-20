import { Hash } from 'lucide-react';
import { useLang } from '../../i18n/LanguageContext';
import { getLabel } from './labels';
import type { NumericalBlock as NumericalBlockType } from '../../content/types';

export default function NumericalBlock({ block }: { block: NumericalBlockType }) {
  const { lang } = useLang();
  return (
    <div className="bg-white/5 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-3">
        <Hash size={20} className="text-brand-rose" />
        <h4 className="font-bold text-xl text-white">{block.title}</h4>
      </div>
      <div className="bg-brand-rose/10 rounded-xl p-4 mb-4">
        <p className="text-gray-200">{block.problem}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm font-bold text-brand-cyan mb-2">{getLabel('given', lang)}</p>
          <ul className="space-y-1">
            {block.given.map((g, i) => (
              <li key={i} className="text-sm text-gray-300">
                <span className="text-gray-400">{g.label}:</span>{' '}
                <span className="font-mono text-brand-cyan">{g.value}</span>
                {g.unit && <span className="text-gray-500"> {g.unit}</span>}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold text-brand-amber mb-2">{getLabel('find', lang)}</p>
          <p className="text-sm text-gray-300 font-mono">{block.find}</p>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-bold text-brand-amber mb-2">{getLabel('solution', lang)}</p>
        {block.solution.map((step, i) => (
          <div key={i} className="flex gap-3">
            <span className="text-brand-cyan font-mono text-sm font-bold shrink-0">{i + 1}.</span>
            <p className="text-gray-300 text-sm font-mono">{step}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 bg-emerald-500/10 rounded-xl p-3">
        <p className="text-emerald-400 font-bold text-sm">
          {getLabel('answer', lang)} {block.answer}
        </p>
      </div>
    </div>
  );
}
