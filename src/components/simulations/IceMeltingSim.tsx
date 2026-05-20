import { useState } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function IceMeltingSim() {
  const t = useT();
  const [heat, setHeat] = useState(0);
  const maxHeat = 500;
  const phase = heat < 100 ? 'ice' : heat < 200 ? 'melting' : heat < 350 ? 'water' : heat < 400 ? 'boiling' : 'steam';
  const temp = phase === 'ice' ? -20 + heat * 0.4 : phase === 'melting' ? 0 : phase === 'water' ? (heat - 200) * 0.67 : phase === 'boiling' ? 100 : 100 + (heat - 400) * 0.5;

  return (
    <div>
      <div className="mb-4"><label className="text-gray-400 text-sm block mb-2">Heat Energy: {heat} kJ</label><input type="range" min="0" max={maxHeat} value={heat} onChange={e => setHeat(Number(e.target.value))} className="w-full accent-brand-rose" /></div>
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 p-6 mb-4">
        <div className="text-center mb-4">
          <div className="text-6xl mb-2">{phase === 'ice' ? '🧊' : phase === 'melting' ? '💧' : phase === 'water' ? '💧' : phase === 'boiling' ? '♨️' : '☁️'}</div>
          <p className="text-white font-bold text-lg capitalize">{phase === 'ice' ? t('unit9.ice') : phase === 'melting' ? t('unit9.melting') : phase === 'water' ? t('unit9.liquidWater') : phase === 'boiling' ? t('unit9.evaporationProcess') : t('unit9.steam')}</p>
          <p className="text-brand-cyan font-space text-2xl font-bold">{temp.toFixed(1)}°C</p>
        </div>
        <div className="w-full bg-white/10 rounded-full h-3"><div className="h-full rounded-full bg-brand-rose transition-all" style={{ width: `${(heat / maxHeat) * 100}%` }} /></div>
        <div className="flex justify-between text-gray-500 text-xs mt-1"><span>0 kJ</span><span>{maxHeat} kJ</span></div>
      </div>
      <div className="glass-card rounded-xl p-4"><p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit9.latentHeatKeyPoint') }} ></p></div>
    </div>
  );
}
