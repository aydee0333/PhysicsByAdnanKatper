import { useState } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function PlanetWeightCalc() {
  const t = useT();
  const [mass, setMass] = useState(10);
  const planets = [
    { name: 'Moon', g: 1.6, color: 'text-gray-400' },
    { name: 'Mercury', g: 3.7, color: 'text-brand-amber' },
    { name: 'Venus', g: 8.9, color: 'text-brand-pink' },
    { name: 'Earth', g: 9.8, color: 'text-brand-cyan' },
    { name: 'Mars', g: 3.7, color: 'text-brand-rose' },
    { name: 'Jupiter', g: 24.8, color: 'text-brand-purple' },
  ];
  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">{t('unit6.yourMass').replace('{mass}', String(mass))}</label>
        <input type="range" min="1" max="100" value={mass} onChange={e => setMass(Number(e.target.value))} className="w-full accent-brand-cyan" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        {planets.map(p => (
          <div key={p.name} className="glass-card rounded-xl p-4 text-center">
            <p className={`font-bold text-sm ${p.color}`}>{p.name}</p>
            <p className="text-white text-xl font-space font-bold">{(mass * p.g).toFixed(1)} N</p>
            <p className="text-gray-500 text-xs">g = {p.g} m/s²</p>
          </div>
        ))}
      </div>
      <div className="formula-box rounded-2xl p-5">
        <p className="text-gray-400 text-xs uppercase mb-2">{t('unit6.gravFieldStrength')}</p>
        <p className="text-xl font-space font-bold text-white">{t('unit6.gFormula')}</p>
        <p className="text-gray-400 text-sm mt-2">{t('unit6.onEarthDesc')}</p>
      </div>
    </div>
  );
}
