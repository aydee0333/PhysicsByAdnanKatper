import { useState } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function GravForceCalc() {
  const t = useT();
  const G = 6.67e-11;
  const [m1, setM1] = useState(5e24);
  const [m2, setM2] = useState(6e24);
  const [r, setR] = useState(1e7);
  const force = (G * m1 * m2) / (r * r);
  return (
    <div>
      <div className="formula-box rounded-2xl p-6 text-center mb-6">
        <p className="text-2xl md:text-3xl font-space font-black text-white" dangerouslySetInnerHTML={{ __html: t('unit6.gravForceFormula') }} />
        <p className="text-brand-purple font-space font-bold mt-2">{t('unit6.gravConst')}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-3 mb-6">
        <div><label className="text-gray-400 text-xs block mb-1">{t('unit6.mass1')}</label><input type="number" value={m1} onChange={e => setM1(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-cyan/50" /></div>
        <div><label className="text-gray-400 text-xs block mb-1">{t('unit6.mass2')}</label><input type="number" value={m2} onChange={e => setM2(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-pink/50" /></div>
        <div><label className="text-gray-400 text-xs block mb-1">{t('unit6.distance')}</label><input type="number" value={r} onChange={e => setR(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-amber/50" /></div>
      </div>
      <div className="formula-box rounded-2xl p-5 text-center">
        <p className="text-gray-400 text-xs uppercase mb-2">{t('unit6.gravForceResult')}</p>
        <p className="text-3xl font-space font-bold text-brand-cyan">{force.toExponential(3)} N</p>
      </div>
      <div className="grid sm:grid-cols-3 gap-3 mt-4">
        <div className="glass-card rounded-xl p-3"><p className="text-brand-lime text-xs font-bold">{t('unit6.alwaysAttractive')}</p><p className="text-gray-400 text-xs">{t('unit6.alwaysAttractiveDesc')}</p></div>
        <div className="glass-card rounded-xl p-3"><p className="text-brand-cyan text-xs font-bold">{t('unit6.universal')}</p><p className="text-gray-400 text-xs">{t('unit6.universalDesc')}</p></div>
        <div className="glass-card rounded-xl p-3"><p className="text-brand-amber text-xs font-bold">{t('unit6.decreasesR2')}</p><p className="text-gray-400 text-xs">{t('unit6.decreasesR2Desc')}</p></div>
      </div>
    </div>
  );
}
