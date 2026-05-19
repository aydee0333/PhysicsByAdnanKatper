import { useState } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function DensityCalculator() {
  const t = useT();
  const [mass, setMass] = useState(5);
  const [volume, setVolume] = useState(0.01);
  const density = mass / volume;

  const materials = [
    { name: t('unit5.water'), density: 1000, color: 'text-brand-cyan' },
    { name: t('unit5.ice'), density: 917, color: 'text-brand-lime' },
    { name: t('unit5.iron'), density: 7874, color: 'text-brand-rose' },
    { name: t('unit5.aluminum'), density: 2700, color: 'text-brand-amber' },
    { name: t('unit5.wood'), density: 750, color: 'text-brand-purple' },
    { name: t('unit5.oil'), density: 920, color: 'text-brand-pink' },
  ];

  const selectedMaterial = materials.find(m => Math.abs(m.density - density) < 50);

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-gray-400 text-sm block mb-2">{t('unit5.massLabel').replace('{mass}', String(mass))}</label>
          <input type="range" min="0.1" max="50" step="0.1" value={mass} onChange={e => setMass(Number(e.target.value))} className="w-full accent-brand-cyan" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">{t('unit5.volumeLabel').replace('{volume}', String(volume))}</label>
          <input type="range" min="0.001" max="0.1" step="0.001" value={volume} onChange={e => setVolume(Number(e.target.value))} className="w-full accent-brand-pink" />
        </div>
      </div>

      <div className="formula-box rounded-2xl p-6 text-center mb-6">
        <p className="text-gray-400 text-xs uppercase mb-2">{t('unit5.densityCalcLabel')}</p>
        <p className="text-3xl font-space font-bold text-white">ρ = {mass} / {volume} = <span className="text-brand-cyan">{density.toFixed(0)} kg/m³</span></p>
        {selectedMaterial && <p className="text-gray-400 text-sm mt-2">{t('unit5.closeTo').replace('{material}', '')} <span className={selectedMaterial.color + ' font-bold'}>{selectedMaterial.name}</span></p>}
      </div>

      <h4 className="text-lg font-bold text-white mb-3">{t('unit5.commonMaterials')}</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        {materials.map(m => (
          <button
            key={m.name}
            onClick={() => { setMass(m.density * volume); }}
            className={`p-3 rounded-xl text-center transition-all glass-card hover:bg-white/5 ${density > m.density ? 'opacity-50' : ''}`}
          >
            <p className={`font-bold text-sm ${m.color}`}>{m.name}</p>
            <p className="text-white text-lg font-space font-bold">{m.density}</p>
            <p className="text-gray-500 text-xs">kg/m³</p>
          </button>
        ))}
      </div>

      <div className={`rounded-xl p-4 text-center ${density < 1000 ? 'bg-brand-lime/15 border border-brand-lime/30' : density > 1000 ? 'bg-brand-rose/15 border border-brand-rose/30' : 'bg-brand-amber/15 border border-brand-amber/30'}`}>
        <p className={`text-lg font-bold ${density < 1000 ? 'text-brand-lime' : density > 1000 ? 'text-brand-rose' : 'text-brand-amber'}`}>
          {density < 1000 ? t('unit5.floatsWater') : density > 1000 ? t('unit5.sinksWater') : t('unit5.neutralBuoyancy')}
        </p>
      </div>
    </div>
  );
}
