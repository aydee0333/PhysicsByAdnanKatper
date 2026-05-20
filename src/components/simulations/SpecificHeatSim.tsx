import { useState } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function SpecificHeatSim() {
  const t = useT();
  const [mass, setMass] = useState(1);
  const [deltaT, setDeltaT] = useState(10);
  const [material, setMaterial] = useState('water');
  const materials: Record<string, { c: number; color: string }> = {
    water: { c: 4186, color: 'text-brand-cyan' },
    iron: { c: 450, color: 'text-brand-rose' },
    sand: { c: 830, color: 'text-brand-amber' },
  };
  const c = materials[material].c;
  const Q = mass * c * deltaT;

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div><label className="text-gray-400 text-sm block mb-2">{t('unit9.massSlider').replace('{mass}', String(mass))}</label><input type="range" min="0.1" max="10" step="0.1" value={mass} onChange={e => setMass(Number(e.target.value))} className="w-full accent-brand-rose" /></div>
        <div><label className="text-gray-400 text-sm block mb-2">{t('unit9.deltaTSlider').replace('{deltaT}', String(deltaT))}</label><input type="range" min="1" max="100" value={deltaT} onChange={e => setDeltaT(Number(e.target.value))} className="w-full accent-brand-amber" /></div>
      </div>
      <div className="flex gap-3 mb-4">
        <button onClick={() => setMaterial('water')} className={`flex-1 py-2 rounded-xl text-sm font-semibold ${material === 'water' ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : 'glass-card text-gray-400'}`}>{t('unit9.water')}</button>
        <button onClick={() => setMaterial('iron')} className={`flex-1 py-2 rounded-xl text-sm font-semibold ${material === 'iron' ? 'bg-brand-rose/20 text-brand-rose border border-brand-rose/30' : 'glass-card text-gray-400'}`}>{t('unit9.iron')}</button>
        <button onClick={() => setMaterial('sand')} className={`flex-1 py-2 rounded-xl text-sm font-semibold ${material === 'sand' ? 'bg-brand-amber/20 text-brand-amber border border-brand-amber/30' : 'glass-card text-gray-400'}`}>{t('unit9.sand')}</button>
      </div>
      <div className="formula-box rounded-2xl p-6 text-center mb-4">
        <p className="text-gray-400 text-xs uppercase mb-2">Q = mcΔT</p>
        <p className="text-3xl font-space font-bold text-brand-rose">Q = {mass} × {c} × {deltaT} = <span className="text-brand-cyan">{Q.toFixed(0)} J</span></p>
      </div>
      <div className="glass-card rounded-xl p-4 mb-4"><p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit9.specificHeatNote').replace('{color}', materials[material].color).replace('{material}', material).replace('{c}', String(c)) }}></p></div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="glass-card rounded-xl p-3"><p className="text-brand-cyan font-bold text-sm">{t('unit9.highCNote')}</p></div>
        <div className="glass-card rounded-xl p-3"><p className="text-brand-rose font-bold text-sm">{t('unit9.lowCNote')}</p></div>
      </div>
    </div>
  );
}
