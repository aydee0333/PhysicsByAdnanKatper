import { useState } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function AtmosphericPressureSim() {
  const t = useT();
  const [suction, setSuction] = useState(0);
  const maxSuction = 100;
  const waterRise = (suction / maxSuction) * 10.3;

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">{t('unit5.suctionLabel').replace('{strength}', String(suction))}</label>
        <input type="range" min="0" max="100" value={suction} onChange={e => setSuction(Number(e.target.value))} className="w-full accent-brand-cyan" />
      </div>

      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 relative overflow-hidden mb-4" style={{ height: 260 }}>
        <svg width="100%" height="100%" viewBox="0 0 400 260">
          <rect x="80" y="100" width="240" height="140" fill="rgba(6,182,212,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <rect x="82" y={140} width="236" height="98" fill="rgba(6,182,212,0.3)" />
          <line x1="80" y1="140" x2="320" y2="140" stroke="#06b6d4" strokeWidth="1" />
          <rect x="185" y="20" width="30" height="220" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3" rx="3" />
          <rect x="188" y={240 - waterRise * 15} width="24" height={waterRise * 15} fill="rgba(6,182,212,0.5)" />
          <text x="340" y="150" fill="#9ca3af" fontSize="11">Water</text>
          <text x="220" y={230 - waterRise * 15} fill="#06b6d4" fontSize="11" fontWeight="bold">{waterRise.toFixed(1)}m</text>
          {[100, 150, 200, 250, 300].map((x, i) => (
            <line key={i} x1={x} y1="95" x2={x} y2="75" stroke="rgba(255,255,255,0.2)" strokeWidth="2" markerEnd="url(#airArrow)" />
          ))}
          <text x="200" y="65" textAnchor="middle" fill="#9ca3af" fontSize="10">Atmospheric Pressure</text>
          <defs>
            <marker id="airArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M 0 8 L 4 0 L 8 8" fill="rgba(255,255,255,0.3)" />
            </marker>
          </defs>
        </svg>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <div className="formula-box rounded-xl p-4">
          <p className="text-gray-400 text-xs uppercase mb-1">{t('unit5.waterRise')}</p>
          <p className="text-2xl font-space font-bold text-brand-cyan">{waterRise.toFixed(2)} m</p>
        </div>
        <div className="glass-card rounded-xl p-4">
          <p className="text-gray-400 text-xs uppercase mb-1">{t('unit5.atmPressureLabel')}</p>
          <p className="text-2xl font-space font-bold text-white">101,325 Pa</p>
          <p className="text-gray-500 text-xs">= {t('unit5.atSeaLevel')}</p>
        </div>
      </div>

      <div className="glass-card rounded-xl p-4">
        <p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit5.magdeburgNote') }} />
      </div>
    </div>
  );
}
