import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { useT } from '../../i18n/LanguageContext';

export default function SpringSim7() {
  const t = useT();
  const [force, setForce] = useState(0);
  const [k, setK] = useState(5);
  const x = force / k;
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div><label className="text-gray-400 text-sm block mb-2">{t('unit7.springForce').replace('{force}', String(force))}</label><input type="range" min="0" max="30" value={force} onChange={e => setForce(Number(e.target.value))} className="w-full accent-brand-cyan" /></div>
        <div><label className="text-gray-400 text-sm block mb-2">{t('unit7.springK').replace('{k}', String(k))}</label><input type="range" min="1" max="20" value={k} onChange={e => setK(Number(e.target.value))} className="w-full accent-brand-amber" /></div>
      </div>
      <div className="formula-box rounded-xl p-4 text-center mb-4">
        <p className="text-xl font-space font-bold text-brand-cyan">{t('unit7.springExtension').replace('{x}', x.toFixed(2))}</p>
      </div>
      <div className="formula-box rounded-xl p-4 text-center">
        <p className="text-lg font-space font-bold text-white">{t('unit7.springResult').replace('{force}', String(force)).replace('{k}', String(k)).replace('{x}', x.toFixed(2))}</p>
      </div>
      <button onClick={() => { setForce(0); setK(5); }} className="mt-3 mx-auto block text-xs text-gray-500 hover:text-white flex items-center gap-1"><RotateCcw size={12} /> {t('unit7.reset')}</button>
    </div>
  );
}
