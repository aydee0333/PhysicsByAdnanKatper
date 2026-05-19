import { useState } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function BlockStabilitySim() {
  const t = useT();
  const [tiltAngle, setTiltAngle] = useState(0);
  const [shape, setShape] = useState<'block' | 'cone' | 'sphere'>('block');

  const maxStable = shape === 'block' ? 45 : shape === 'cone' ? 15 : 90;
  const isStable = tiltAngle <= maxStable;

  const shapeLabels: Record<string, string> = {
    block: t('unit4.block'),
    cone: t('unit4.cone'),
    sphere: t('unit4.sphere'),
  };

  return (
    <div>
      <div className="flex gap-3 mb-4">
        {(['block', 'cone', 'sphere'] as const).map(s => (
          <button key={s} onClick={() => { setShape(s); setTiltAngle(0); }} className={`flex-1 py-2 rounded-xl text-sm font-semibold capitalize ${shape === s ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : 'glass-card text-gray-400'}`}>
            {shapeLabels[s]}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">{t('unit4.tiltAngle').replace('{angle}', String(tiltAngle))}</label>
        <input type="range" min="0" max="90" value={tiltAngle} onChange={e => setTiltAngle(Number(e.target.value))} className="w-full accent-brand-amber" />
      </div>

      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 relative overflow-hidden mb-4" style={{ height: 220 }}>
        <svg width="100%" height="100%" viewBox="0 0 400 220">
          <line x1="0" y1="200" x2="400" y2="200" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
          <g transform={`translate(200, 200) rotate(${tiltAngle})`}>
            {shape === 'block' && (
              <>
                <rect x="-40" y="-80" width="80" height="80" fill="#7c3aed" opacity="0.6" rx="4" />
                <circle cx="0" cy="-40" r="5" fill="#f43f5e" />
                <line x1="0" y1="-40" x2="0" y2="40" stroke="#f43f5e" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
              </>
            )}
            {shape === 'cone' && (
              <>
                <polygon points="0,-100 -40,0 40,0" fill="#06b6d4" opacity="0.6" />
                <circle cx="0" cy="-25" r="5" fill="#f43f5e" />
                <line x1="0" y1="-25" x2="0" y2="40" stroke="#f43f5e" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
              </>
            )}
            {shape === 'sphere' && (
              <>
                <circle cx="0" cy="-40" r="40" fill="#ec4899" opacity="0.6" />
                <circle cx="0" cy="-40" r="5" fill="#f43f5e" />
                <line x1="0" y1="-40" x2="0" y2="40" stroke="#f43f5e" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
              </>
            )}
          </g>
          <line x1="160" y1="200" x2="240" y2="200" stroke={isStable ? '#84cc16' : '#f43f5e'} strokeWidth="3" />
        </svg>
      </div>

      <div className={`rounded-xl p-4 text-center ${isStable ? 'bg-brand-lime/15 border border-brand-lime/30' : 'bg-brand-rose/15 border border-brand-rose/30'}`}>
        <p className={`text-lg font-bold ${isStable ? 'text-brand-lime' : 'text-brand-rose'}`}>
          {isStable ? t('unit4.stableEq') : t('unit4.unstableEq')}
        </p>
        <p className="text-gray-400 text-sm mt-1">
          {shape === 'block' ? t('unit4.blockStable') : shape === 'cone' ? t('unit4.coneStable') : t('unit4.sphereStable')}
        </p>
      </div>
    </div>
  );
}
