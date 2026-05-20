import { useState } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function CollisionSim() {
  const t = useT();
  const [m1, setM1] = useState(2);
  const [m2, setM2] = useState(2);
  const [v1, setV1] = useState(5);
  const [v2, setV2] = useState(-3);

  const p1 = m1 * v1, p2 = m2 * v2, totalP = p1 + p2;

  return (
    <div>
      <div className="grid md:grid-cols-4 gap-3 mb-6">
        <div><label className="text-gray-400 text-xs block mb-1">{t('unit3.cart1Mass')}</label><input type="number" value={m1} onChange={e => setM1(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-cyan/50" /></div>
        <div><label className="text-gray-400 text-xs block mb-1">{t('unit3.cart2Mass')}</label><input type="number" value={m2} onChange={e => setM2(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-pink/50" /></div>
        <div><label className="text-gray-400 text-xs block mb-1">{t('unit3.cart1Vel')}</label><input type="number" value={v1} onChange={e => setV1(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-amber/50" /></div>
        <div><label className="text-gray-400 text-xs block mb-1">{t('unit3.cart2Vel')}</label><input type="number" value={v2} onChange={e => setV2(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-rose/50" /></div>
      </div>
      <div className="grid md:grid-cols-3 gap-3 mb-4">
        <div className="formula-box rounded-xl p-4 text-center"><p className="text-gray-400 text-xs uppercase mb-1">p₁ = m₁ × v₁</p><p className="text-xl font-space font-bold text-brand-cyan">{p1} kg·m/s</p></div>
        <div className="formula-box rounded-xl p-4 text-center"><p className="text-gray-400 text-xs uppercase mb-1">p₂ = m₂ × v₂</p><p className="text-xl font-space font-bold text-brand-pink">{p2} kg·m/s</p></div>
        <div className="formula-box rounded-xl p-4 text-center"><p className="text-gray-400 text-xs uppercase mb-1">{t('unit3.totalMomentum')}</p><p className="text-xl font-space font-bold text-brand-amber">{totalP} kg·m/s</p></div>
      </div>
      <div className="bg-white/5 rounded-xl p-4">
        <p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit3.conservationLaw') }} />
      </div>
    </div>
  );
}
