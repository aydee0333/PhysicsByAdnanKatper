import { useState } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function WeightCalculator() {
  const t = useT();
  const [mass, setMass] = useState(10);
  const [body, setBody] = useState('earth');

  const bodies: Record<string, { name: string; g: number; color: string }> = {
    earth: { name: 'Earth', g: 9.8, color: 'text-brand-cyan' },
    moon: { name: 'Moon', g: 1.6, color: 'text-gray-400' },
    mars: { name: 'Mars', g: 3.7, color: 'text-brand-rose' },
    jupiter: { name: 'Jupiter', g: 24.8, color: 'text-brand-amber' },
  };

  const selected = bodies[body];
  const weight = mass * selected.g;

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-gray-400 text-sm block mb-2">{t('unit3.massKg').replace('{mass}', String(mass))}</label>
          <input type="range" min="1" max="100" value={mass} onChange={e => setMass(Number(e.target.value))} className="w-full accent-brand-cyan" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">{t('unit3.celestialBody')}</label>
          <select value={body} onChange={e => setBody(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-brand-cyan/50">
            <option value="earth">Earth (g = 9.8 m/s²)</option>
            <option value="moon">Moon (g = 1.6 m/s²)</option>
            <option value="mars">Mars (g = 3.7 m/s²)</option>
            <option value="jupiter">Jupiter (g = 24.8 m/s²)</option>
          </select>
        </div>
      </div>
      <div className="formula-box rounded-2xl p-6 text-center mb-6">
        <p className="text-gray-400 text-xs uppercase mb-2">{t('unit3.weightFormula')}</p>
        <p className="text-3xl font-space font-bold text-white">
          {t('unit3.weightResult').replace('{mass}', String(mass)).replace('{g}', String(selected.g)).replace('{weight}', weight.toFixed(1))}
        </p>
        <p className="text-gray-500 text-sm mt-2">{t('unit3.onBody').replace('{body}', selected.name)}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.entries(bodies).map(([key, b]) => {
          const w = mass * b.g;
          return (
            <button key={key} onClick={() => setBody(key)} className={`p-3 rounded-xl text-center transition-all ${key === body ? 'bg-white/10 border border-brand-cyan/30' : 'glass-card hover:bg-white/5'}`}>
              <p className={`font-bold text-sm ${b.color}`}>{b.name}</p>
              <p className="text-white text-lg font-space font-bold">{w.toFixed(1)} N</p>
              <p className="text-gray-500 text-xs">g = {b.g} m/s²</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
