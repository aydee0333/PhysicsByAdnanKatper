import { useState } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function BuoyancySim() {
  const t = useT();
  const [objDensity, setObjDensity] = useState(1000);
  const [fluidDensity, setFluidDensity] = useState(1000);

  const ratio = objDensity / fluidDensity;
  const submerged = Math.min(ratio * 100, 100);
  const status = objDensity < fluidDensity ? 'floats' : objDensity > fluidDensity ? 'sinks' : 'neutral';

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-gray-400 text-sm block mb-2">{t('unit5.objDensity').replace('{density}', String(objDensity))}</label>
          <input type="range" min="100" max="2000" value={objDensity} onChange={e => setObjDensity(Number(e.target.value))} className="w-full accent-brand-cyan" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">{t('unit5.fluidDensity').replace('{density}', String(fluidDensity))}</label>
          <input type="range" min="500" max="1500" value={fluidDensity} onChange={e => setFluidDensity(Number(e.target.value))} className="w-full accent-brand-pink" />
        </div>
      </div>

      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 relative overflow-hidden mb-4" style={{ height: 220 }}>
        <svg width="100%" height="100%" viewBox="0 0 400 220">
          <rect x="50" y="80" width="300" height="120" fill="rgba(6,182,212,0.1)" stroke="rgba(6,182,212,0.3)" strokeWidth="2" />
          <text x="200" y="190" textAnchor="middle" fill="#06b6d4" fontSize="12" opacity="0.5">Fluid</text>
          {status === 'floats' && (
            <>
              <rect x="170" y={80 - 40 * (1 - ratio)} width="60" height="40" rx="4" fill="#84cc16" opacity="0.7" />
              <text x="200" y={105 - 40 * (1 - ratio)} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">Object</text>
              <rect x="170" y="80" width="60" height={40 * ratio} rx="0" fill="#84cc16" opacity="0.4" />
            </>
          )}
          {status === 'sinks' && (
            <rect x="170" y="140" width="60" height="40" rx="4" fill="#f43f5e" opacity="0.7" />
          )}
          {status === 'neutral' && (
            <rect x="170" y="60" width="60" height="40" rx="4" fill="#f59e0b" opacity="0.7" />
          )}
        </svg>
      </div>

      <div className={`rounded-xl p-4 text-center mb-4 ${status === 'floats' ? 'bg-brand-lime/15 border border-brand-lime/30' : status === 'sinks' ? 'bg-brand-rose/15 border border-brand-rose/30' : 'bg-brand-amber/15 border border-brand-amber/30'}`}>
        <p className={`text-xl font-bold ${status === 'floats' ? 'text-brand-lime' : status === 'sinks' ? 'text-brand-rose' : 'text-brand-amber'}`}>
          {status === 'floats' ? t('unit5.objectFloats') : status === 'sinks' ? t('unit5.objectSinks') : t('unit5.neutralBuoyancy')}
        </p>
        {status === 'floats' && <p className="text-gray-400 text-sm mt-1">{t('unit5.submergedNote').replace('{percent}', submerged.toFixed(0))}</p>}
      </div>

      <div className="glass-card rounded-xl p-4">
        <p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit5.archimedesDef') }} />
      </div>
    </div>
  );
}
