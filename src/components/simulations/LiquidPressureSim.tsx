import { useState } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function LiquidPressureSim() {
  const t = useT();
  const [depth, setDepth] = useState(5);
  const [density, setDensity] = useState(1000);
  const g = 9.8;
  const pressure = density * g * depth;

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div><label className="text-gray-400 text-sm block mb-2">{t('unit7.depthM').replace('{depth}', String(depth))}</label><input type="range" min="0" max="50" value={depth} onChange={e => setDepth(Number(e.target.value))} className="w-full accent-brand-cyan" /></div>
        <div><label className="text-gray-400 text-sm block mb-2">{t('unit7.liquidDensity').replace('{density}', String(density))}</label><input type="range" min="500" max="13600" step="100" value={density} onChange={e => setDensity(Number(e.target.value))} className="w-full accent-brand-pink" /></div>
      </div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setDensity(1000)} className={`px-3 py-1 rounded-lg text-xs ${density === 1000 ? 'bg-brand-cyan/20 text-brand-cyan' : 'glass-card text-gray-400'}`}>{t('unit7.water')}</button>
        <button onClick={() => setDensity(900)} className={`px-3 py-1 rounded-lg text-xs ${density === 900 ? 'bg-brand-amber/20 text-brand-amber' : 'glass-card text-gray-400'}`}>{t('unit7.oil')}</button>
        <button onClick={() => setDensity(13600)} className={`px-3 py-1 rounded-lg text-xs ${density === 13600 ? 'bg-brand-purple/20 text-brand-purple' : 'glass-card text-gray-400'}`}>{t('unit7.mercury')}</button>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 relative overflow-hidden mb-4" style={{ height: 200 }}>
        <svg width="100%" height="100%" viewBox="0 0 400 200">
          <rect x="50" y="20" width="300" height="160" fill="rgba(6,182,212,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <rect x="52" y={20 + (1 - depth / 50) * 158} width="296" height={depth / 50 * 158} fill="rgba(6,182,212,0.25)" />
          {depth > 0 && Array.from({ length: Math.min(5, Math.floor(depth / 5) + 1) }, (_, i) => {
            const d = ((i + 1) / (Math.min(5, Math.floor(depth / 5) + 1))) * depth;
            const y = 180 - (d / 50) * 158;
            return <line key={i} x1="50" y1={y} x2="350" y2={y} stroke="rgba(6,182,212,0.3)" strokeWidth="1" strokeDasharray="4,4" />;
          })}
          <text x="200" y="195" textAnchor="middle" fill="#9ca3af" fontSize="10">Depth: {depth}m</text>
        </svg>
      </div>
      <div className="formula-box rounded-xl p-4 text-center">
        <p className="text-gray-400 text-xs uppercase mb-2">{t('unit7.pressureResult').replace('{density}', String(density)).replace('{g}', String(g)).replace('{depth}', String(depth)).replace('{pressure}', pressure.toFixed(0))}</p>
        <p className="text-3xl font-space font-bold text-brand-cyan">{pressure.toFixed(0)} Pa</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3 mt-4">
        <div className="glass-card rounded-xl p-3"><p className="text-brand-cyan font-bold text-sm">{t('unit7.damWalls')}</p><p className="text-gray-400 text-xs">{t('unit7.damWallsDesc')}</p></div>
        <div className="glass-card rounded-xl p-3"><p className="text-brand-pink font-bold text-sm">{t('unit7.submarines')}</p><p className="text-gray-400 text-xs">{t('unit7.submarinesDesc')}</p></div>
      </div>
    </div>
  );
}
