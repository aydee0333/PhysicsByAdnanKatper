import { useState } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function ThermalExpansionSim() {
  const t = useT();
  const [temp, setTemp] = useState(20);
  const alpha = 1.2e-5;
  const L0 = 100;
  const deltaT = temp - 20;
  const newLen = L0 * (1 + alpha * deltaT * 1000);

  return (
    <div>
      <div className="mb-4"><label className="text-gray-400 text-sm block mb-2">{t('unit9.tempSlider2').replace('{temp}', String(temp))}</label><input type="range" min="20" max="500" value={temp} onChange={e => setTemp(Number(e.target.value))} className="w-full accent-brand-amber" /></div>
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 p-6 mb-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1"><p className="text-gray-400 text-xs mb-1">{t('unit9.original')}</p><div className="h-4 bg-brand-cyan/30 rounded" style={{ width: '100%' }} /><p className="text-brand-cyan text-xs mt-1">{L0} cm</p></div>
          <span className="text-gray-500">→</span>
          <div className="flex-1"><p className="text-gray-400 text-xs mb-1">{t('unit9.afterHeating')}</p><div className="h-4 bg-brand-amber/30 rounded" style={{ width: `${(newLen / L0) * 100}%`, maxWidth: '100%' }} /><p className="text-brand-amber text-xs mt-1">{newLen.toFixed(2)} cm</p></div>
        </div>
      </div>
      <div className="formula-box rounded-xl p-4 text-center mb-4"><p className="text-gray-400 text-xs uppercase mb-1">{t('unit9.newLength').replace('{length}', newLen.toFixed(2))}</p><p className="text-xl font-space font-bold text-brand-amber">ΔL = {alpha} × {L0} × {deltaT} = {(alpha * L0 * deltaT * 1000).toFixed(3)} cm</p></div>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="glass-card rounded-xl p-3"><p className="text-brand-cyan font-bold text-sm">{t('unit9.bridges')}</p><p className="text-gray-400 text-xs">{t('unit9.bridgesDesc')}</p></div>
        <div className="glass-card rounded-xl p-3"><p className="text-brand-pink font-bold text-sm">{t('unit9.metalLids')}</p><p className="text-gray-400 text-xs">{t('unit9.metalLidsDesc')}</p></div>
        <div className="glass-card rounded-xl p-3"><p className="text-brand-amber font-bold text-sm">{t('unit9.balloon')}</p><p className="text-gray-400 text-xs">{t('unit9.balloonDesc')}</p></div>
      </div>
    </div>
  );
}
