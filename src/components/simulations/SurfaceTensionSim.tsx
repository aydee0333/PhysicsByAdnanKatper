import { useState } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function SurfaceTensionSim() {
  const t = useT();
  const [soap, setSoap] = useState(0);
  const floating = soap < 30;

  return (
    <div>
      <div className="mb-4"><label className="text-gray-400 text-sm block mb-2">{t('unit7.soapConcentration').replace('{soap}', String(soap))}</label><input type="range" min="0" max="100" value={soap} onChange={e => setSoap(Number(e.target.value))} className="w-full accent-brand-teal" /></div>
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 relative overflow-hidden mb-4" style={{ height: 200 }}>
        <svg width="100%" height="100%" viewBox="0 0 400 200">
          <rect x="50" y="80" width="300" height="100" fill="rgba(6,182,212,0.1)" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
          <line x1="50" y1="80" x2="350" y2="80" stroke={floating ? '#06b6d4' : '#f43f5e'} strokeWidth="2" />
          {floating ? (
            <g><ellipse cx="200" cy="75" rx="40" ry="3" fill="none" stroke="#06b6d4" strokeWidth="2" /><line x1="170" y1="75" x2="230" y2="75" stroke="#9ca3af" strokeWidth="2" /><text x="200" y="65" textAnchor="middle" fill="#06b6d4" fontSize="12">🪡 {t('unit7.needleFloat')}</text></g>
          ) : (
            <g><line x1="180" y1="100" x2="220" y2="140" stroke="#9ca3af" strokeWidth="2" /><text x="200" y="165" textAnchor="middle" fill="#f43f5e" fontSize="12">🪡 {t('unit7.needleSink')}</text></g>
          )}
        </svg>
      </div>
      <div className={`rounded-xl p-4 text-center ${floating ? 'bg-brand-lime/15 border border-brand-lime/30' : 'bg-brand-rose/15 border border-brand-rose/30'}`}>
        <p className={`text-lg font-bold ${floating ? 'text-brand-lime' : 'text-brand-rose'}`}>{floating ? t('unit7.floatResult') : t('unit7.sinkResult')}</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3 mt-4">
        <div className="glass-card rounded-xl p-3"><p className="text-brand-cyan font-bold text-sm">{t('unit7.waterDroplets')}</p><p className="text-gray-400 text-xs">{t('unit7.waterDropletsDesc')}</p></div>
        <div className="glass-card rounded-xl p-3"><p className="text-brand-pink font-bold text-sm">{t('unit7.insectsWater')}</p><p className="text-gray-400 text-xs">{t('unit7.insectsWaterDesc')}</p></div>
      </div>
    </div>
  );
}
