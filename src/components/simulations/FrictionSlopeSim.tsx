import { useState } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function FrictionSlopeSim() {
  const t = useT();
  const [angle, setAngle] = useState(0);
  const [surface, setSurface] = useState<'smooth' | 'rough'>('smooth');

  const mu = surface === 'smooth' ? 0.2 : 0.6;
  const g = 10;
  const rad = (angle * Math.PI) / 180;
  const forceDown = g * Math.sin(rad);
  const maxStatic = mu * g * Math.cos(rad);
  const sliding = forceDown > maxStatic;

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-gray-400 text-sm block mb-2">{t('unit3.slopeAngle').replace('{angle}', String(angle))}</label>
          <input type="range" min="0" max="60" value={angle} onChange={e => setAngle(Number(e.target.value))} className="w-full accent-brand-amber" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">{t('unit3.surfaceType')}</label>
          <div className="flex gap-2">
            <button onClick={() => setSurface('smooth')} className={`flex-1 py-2 rounded-xl text-sm font-semibold ${surface === 'smooth' ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : 'glass-card text-gray-400'}`}>{t('unit3.smooth')}</button>
            <button onClick={() => setSurface('rough')} className={`flex-1 py-2 rounded-xl text-sm font-semibold ${surface === 'rough' ? 'bg-brand-amber/20 text-brand-amber border border-brand-amber/30' : 'glass-card text-gray-400'}`}>{t('unit3.rough')}</button>
          </div>
        </div>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 relative overflow-hidden mb-4" style={{ height: 200 }}>
        <svg width="100%" height="100%" viewBox="0 0 400 200">
          <polygon points={`0,200 ${400 * Math.cos(rad)},200 0,${200 - 400 * Math.sin(rad)}`} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <g transform={`translate(${30 * Math.cos(rad) + 10}, ${200 - 30 * Math.sin(rad) - 25}) rotate(-${angle})`}>
            <rect x="0" y="0" width="30" height="25" fill={sliding ? '#f43f5e' : '#84cc16'} rx="3" />
            <text x="15" y="17" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">BOX</text>
          </g>
          <path d={`M 30 200 A 30 30 0 0 0 ${30 + 30 * Math.cos(rad)} ${200 - 30 * Math.sin(rad)}`} fill="none" stroke="rgba(255,255,255,0.2)" />
          <text x="50" y="185" fill="#9ca3af" fontSize="12">{angle}°</text>
        </svg>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="formula-box rounded-xl p-4"><p className="text-gray-400 text-xs uppercase mb-1">{t('unit3.forceDownSlope')}</p><p className="text-xl font-space font-bold text-brand-cyan">{forceDown.toFixed(2)} N</p></div>
        <div className="formula-box rounded-xl p-4"><p className="text-gray-400 text-xs uppercase mb-1">{t('unit3.maxFriction')}</p><p className="text-xl font-space font-bold text-brand-amber">{maxStatic.toFixed(2)} N</p></div>
      </div>
      <div className={`mt-3 p-3 rounded-xl text-center font-bold ${sliding ? 'bg-brand-rose/15 text-brand-rose' : 'bg-brand-lime/15 text-brand-lime'}`}>
        {sliding ? t('unit3.blockSliding') : t('unit3.blockStill')}
      </div>
    </div>
  );
}
