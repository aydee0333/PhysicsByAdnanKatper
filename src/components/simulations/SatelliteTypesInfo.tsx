import { useState } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function SatelliteTypesInfo() {
  const t = useT();
  const [selected, setSelected] = useState<'leo' | 'meo' | 'geo'>('leo');
  const types: Record<string, { name: string; altitude: string; period: string; examples: string; uses: string; color: string }> = {
    leo: { name: t('unit6.leoName'), altitude: t('unit6.leoAltitude'), period: t('unit6.leoPeriod'), examples: t('unit6.leoExamples'), uses: t('unit6.leoUses'), color: 'text-brand-cyan' },
    meo: { name: t('unit6.meoName'), altitude: t('unit6.meoAltitude'), period: t('unit6.meoPeriod'), examples: t('unit6.meoExamples'), uses: t('unit6.meoUses'), color: 'text-brand-amber' },
    geo: { name: t('unit6.geoName'), altitude: t('unit6.geoAltitude'), period: t('unit6.geoPeriod'), examples: t('unit6.geoExamples'), uses: t('unit6.geoUses'), color: 'text-brand-pink' },
  };
  const sat = types[selected];
  return (
    <div>
      <div className="flex gap-3 mb-4">
        {(['leo', 'meo', 'geo'] as const).map(type => (
          <button key={type} onClick={() => setSelected(type)} className={`flex-1 py-2 rounded-xl text-sm font-semibold ${selected === type ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : 'glass-card text-gray-400'}`}>
            {t(`unit6.${type}`)}
          </button>
        ))}
      </div>
      <div className="glass-card rounded-2xl p-6">
        <h4 className={`text-xl font-bold mb-3 ${sat.color}`}>{sat.name}</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><p className="text-gray-400 text-xs uppercase mb-1">{t('unit6.altitudeLabel')}</p><p className="text-white font-semibold">{sat.altitude}</p></div>
          <div><p className="text-gray-400 text-xs uppercase mb-1">{t('unit6.orbitalPeriod')}</p><p className="text-white font-semibold">{sat.period}</p></div>
          <div><p className="text-gray-400 text-xs uppercase mb-1">{t('unit6.examples')}</p><p className="text-white font-semibold">{sat.examples}</p></div>
          <div><p className="text-gray-400 text-xs uppercase mb-1">{t('unit6.uses')}</p><p className="text-white font-semibold">{sat.uses}</p></div>
        </div>
      </div>
      <h4 className="text-lg font-bold text-white mb-3 mt-6">{t('unit6.usesOfSatellites')}</h4>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {[t('unit6.use1'), t('unit6.use2'), t('unit6.use3'), t('unit6.use4'), t('unit6.use5'), t('unit6.use6')].map((use, i) => (
          <div key={i} className="glass-card rounded-xl p-3"><p className="text-gray-300 text-sm">{use}</p></div>
        ))}
      </div>
    </div>
  );
}
