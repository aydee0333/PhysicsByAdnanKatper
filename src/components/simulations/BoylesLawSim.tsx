import { useState } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function BoylesLawSim() {
  const t = useT();
  const [volume, setVolume] = useState(50);
  const P1V1 = 50 * 100;
  const pressure = P1V1 / volume;

  return (
    <div>
      <div className="mb-4"><label className="text-gray-400 text-sm block mb-2">{t('unit9.volumeSlider').replace('{volume}', String(volume))}</label><input type="range" min="10" max="100" value={volume} onChange={e => setVolume(Number(e.target.value))} className="w-full accent-brand-purple" /></div>
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 p-6 mb-4">
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <div className="w-16 bg-brand-purple/30 rounded border-2 border-brand-purple mx-auto" style={{ height: `${volume * 1.5}px`, maxHeight: 150 }} />
            <p className="text-brand-purple text-sm mt-2">{volume} mL</p>
          </div>
          <div className="text-gray-500 text-2xl">⇌</div>
          <div className="text-center">
            <div className="w-16 bg-brand-cyan/30 rounded border-2 border-brand-cyan mx-auto" style={{ height: Math.min(150, 150 * (50 / volume)) }} />
            <p className="text-brand-cyan text-sm mt-2">{pressure.toFixed(0)} Pa</p>
          </div>
        </div>
      </div>
      <div className="formula-box rounded-xl p-4 text-center mb-4"><p className="text-gray-400 text-xs uppercase mb-1">P₁V₁ = P₂V₂</p><p className="text-xl font-space font-bold text-white">50 × 100 = {volume} × <span className="text-brand-cyan">{pressure.toFixed(0)}</span></p></div>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="glass-card rounded-xl p-3"><p className="text-brand-purple font-bold text-sm">{t('unit9.syringe')}</p><p className="text-gray-400 text-xs">{t('unit9.syringDesc')}</p></div>
        <div className="glass-card rounded-xl p-3"><p className="text-brand-pink font-bold text-sm">{t('unit9.balloonExample')}</p><p className="text-gray-400 text-xs">{t('unit9.balloonDesc2')}</p></div>
        <div className="glass-card rounded-xl p-3"><p className="text-brand-cyan font-bold text-sm">{t('unit9.scubaTank')}</p><p className="text-gray-400 text-xs">{t('unit9.scubaTankDesc')}</p></div>
      </div>
    </div>
  );
}
