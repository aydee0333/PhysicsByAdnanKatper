import { useState } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function WetClothSim() {
  const t = useT();
  const [temp, setTemp] = useState(25);
  const [wind, setWind] = useState(0);
  const rate = (temp / 50) * 0.5 + (wind / 100) * 0.5;
  const rateLabel = rate > 0.7 ? t('unit9.fast') : rate > 0.3 ? t('unit9.medium') : t('unit9.slow');

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div><label className="text-gray-400 text-sm block mb-2">{t('unit9.tempSlider3').replace('{temp}', String(temp))}</label><input type="range" min="0" max="50" value={temp} onChange={e => setTemp(Number(e.target.value))} className="w-full accent-brand-amber" /></div>
        <div><label className="text-gray-400 text-sm block mb-2">{t('unit9.windSpeed').replace('{wind}', String(wind))}</label><input type="range" min="0" max="100" value={wind} onChange={e => setWind(Number(e.target.value))} className="w-full accent-brand-cyan" /></div>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 p-6 mb-4 text-center">
        <div className="text-6xl mb-2">👕</div>
        <p className="text-white font-bold mb-2">{t('unit9.wetCloth')}</p>
        <div className="w-full bg-white/10 rounded-full h-4 mb-2"><div className="h-full rounded-full bg-brand-cyan transition-all" style={{ width: `${(1 - rate) * 100}%` }} /></div>
        <p className="text-gray-400 text-sm">{t('unit9.evapRate').replace('{rate}', rateLabel)}</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="glass-card rounded-xl p-3"><p className="text-brand-cyan font-bold text-sm">{t('unit9.clothesDrying')}</p><p className="text-gray-400 text-xs">{t('unit9.clothesDryingDesc')}</p></div>
        <div className="glass-card rounded-xl p-3"><p className="text-brand-pink font-bold text-sm">{t('unit9.sweating')}</p><p className="text-gray-400 text-xs">{t('unit9.sweatingDesc')}</p></div>
      </div>
    </div>
  );
}
