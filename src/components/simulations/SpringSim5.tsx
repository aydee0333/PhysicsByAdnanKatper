import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { useT } from '../../i18n/LanguageContext';

export default function SpringSim5() {
  const t = useT();
  const [force, setForce] = useState(0);
  const [k, setK] = useState(5);
  const extension = force / k;
  const maxForce = k * 3;
  const withinLimit = force <= maxForce;

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-gray-400 text-sm block mb-2">{t('unit5.forceLabel').replace('{force}', String(force))}</label>
          <input type="range" min="0" max="30" value={force} onChange={e => setForce(Number(e.target.value))} className="w-full accent-brand-cyan" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">{t('unit5.springConstLabel').replace('{k}', String(k))}</label>
          <input type="range" min="1" max="20" value={k} onChange={e => setK(Number(e.target.value))} className="w-full accent-brand-amber" />
        </div>
      </div>

      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 relative overflow-hidden mb-4" style={{ height: 240 }}>
        <svg width="100%" height="100%" viewBox="0 0 400 240">
          <line x1="150" y1="20" x2="250" y2="20" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
          {(() => {
            const coils = 8;
            const naturalLength = 80;
            const ext = extension * 20;
            const totalLen = naturalLength + ext;
            const coilHeight = totalLen / coils;
            let path = `M 200 20`;
            for (let i = 0; i < coils; i++) {
              const y = 20 + i * coilHeight;
              const nextY = 20 + (i + 1) * coilHeight;
              path += ` L ${180} ${y + coilHeight * 0.25} L ${220} ${y + coilHeight * 0.75} L ${200} ${nextY}`;
            }
            return <path d={path} fill="none" stroke={withinLimit ? '#06b6d4' : '#f43f5e'} strokeWidth="3" />;
          })()}
          <rect x="170" y={20 + 80 + extension * 20} width="60" height="40" rx="4" fill="#7c3aed" opacity="0.7" />
          <text x="200" y={45 + 80 + extension * 20} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">{force}N</text>
          <line x1="280" y1="20" x2="280" y2={20 + 80 + extension * 20} stroke="rgba(255,255,255,0.2)" strokeDasharray="4,4" />
          <text x="290" y={60 + extension * 10} fill="#9ca3af" fontSize="11">x = {extension.toFixed(2)}m</text>
          <line x1="140" y1="20 + 140" x2="260" y2="20 + 140" stroke="#f43f5e" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
          <text x="130" y="165" fill="#f43f5e" fontSize="10">Elastic Limit</text>
        </svg>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">{t('unit5.extLabel')}</p>
          <p className="text-2xl font-space font-bold text-brand-cyan">{extension.toFixed(2)} m</p>
        </div>
        <div className={`rounded-xl p-4 text-center ${withinLimit ? 'bg-brand-lime/15 border border-brand-lime/30' : 'bg-brand-rose/15 border border-brand-rose/30'}`}>
          <p className="text-gray-400 text-xs uppercase mb-1">{t('unit5.status')}</p>
          <p className={`text-lg font-bold ${withinLimit ? 'text-brand-lime' : 'text-brand-rose'}`}>
            {withinLimit ? t('unit5.withinLimit') : t('unit5.beyondLimit')}
          </p>
        </div>
      </div>

      <div className="formula-box rounded-2xl p-5 text-center">
        <p className="text-2xl font-space font-bold text-white">F = kx = {k} × {extension.toFixed(2)} = <span className="text-brand-cyan">{force} N</span></p>
      </div>

      <button onClick={() => { setForce(0); setK(5); }} className="mt-3 mx-auto block text-xs text-gray-500 hover:text-white flex items-center gap-1">
        <RotateCcw size={12} /> {t('unit4.reset')}
      </button>
    </div>
  );
}
