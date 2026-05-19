import { useState } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function PascalLawSim() {
  const t = useT();
  const [f1, setF1] = useState(10);
  const [a1, setA1] = useState(0.01);
  const [a2, setA2] = useState(0.1);
  const f2 = f1 * (a2 / a1);

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-3 mb-4">
        <div><label className="text-gray-400 text-xs block mb-1">{t('unit7.inputForce')}</label><input type="number" value={f1} onChange={e => setF1(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-cyan/50" /></div>
        <div><label className="text-gray-400 text-xs block mb-1">{t('unit7.smallArea')}</label><input type="number" step="0.001" value={a1} onChange={e => setA1(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-pink/50" /></div>
        <div><label className="text-gray-400 text-xs block mb-1">{t('unit7.largeArea')}</label><input type="number" step="0.01" value={a2} onChange={e => setA2(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-amber/50" /></div>
      </div>
      <div className="formula-box rounded-2xl p-6 text-center mb-4">
        <p className="text-gray-400 text-xs uppercase mb-2">{t('unit7.hydraulicResult').replace('{f1}', String(f1)).replace('{a2}', String(a2)).replace('{a1}', String(a1)).replace('{f2}', f2.toFixed(0))}</p>
        <p className="text-3xl font-space font-bold text-brand-amber">{f2.toFixed(0)} N</p>
      </div>
      <div className="glass-card rounded-xl p-4 mb-4"><p className="text-gray-300 text-sm">{t('unit7.pascalDesc')}</p></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="glass-card rounded-xl p-3 text-center"><p className="text-brand-cyan font-bold text-xs">{t('unit7.hydraulicPress')}</p></div>
        <div className="glass-card rounded-xl p-3 text-center"><p className="text-brand-pink font-bold text-xs">{t('unit7.carBrakes')}</p></div>
        <div className="glass-card rounded-xl p-3 text-center"><p className="text-brand-amber font-bold text-xs">{t('unit7.hydraulicLifts')}</p></div>
        <div className="glass-card rounded-xl p-3 text-center"><p className="text-brand-lime font-bold text-xs">{t('unit7.excavators')}</p></div>
      </div>
    </div>
  );
}
