import { useState } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function VirtualThermometer() {
  const t = useT();
  const [celsius, setCelsius] = useState(20);
  const kelvin = celsius + 273;
  const fahrenheit = (celsius * 9 / 5) + 32;

  const getColor = () => {
    if (celsius < 0) return '#06b6d4';
    if (celsius < 20) return '#84cc16';
    if (celsius < 40) return '#f59e0b';
    return '#f43f5e';
  };

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">{t('unit9.tempSlider').replace('{celsius}', String(celsius))}</label>
        <input type="range" min="-50" max="150" value={celsius} onChange={e => setCelsius(Number(e.target.value))} className="w-full accent-brand-amber" />
      </div>
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 p-6 mb-4">
        <div className="flex items-center justify-center gap-8">
          <div className="relative" style={{ width: 40, height: 200 }}>
            <div className="absolute bottom-0 left-0 w-full rounded-b-full" style={{ height: `${((celsius + 50) / 200) * 100}%`, backgroundColor: getColor(), opacity: 0.6, transition: 'all 0.3s' }} />
            <div className="absolute inset-0 border-2 border-white/20 rounded-t-full rounded-b-full" />
            <div className="absolute -left-16 top-0 text-gray-400 text-xs">150°C</div>
            <div className="absolute -left-12 top-1/2 text-gray-400 text-xs">50°C</div>
            <div className="absolute -left-16 bottom-0 text-gray-400 text-xs">-50°C</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="formula-box rounded-xl p-4 text-center"><p className="text-gray-400 text-xs uppercase mb-1">{t('unit9.celsius')}</p><p className="text-2xl font-space font-bold" style={{ color: getColor() }}>{celsius}°C</p></div>
            <div className="formula-box rounded-xl p-4 text-center"><p className="text-gray-400 text-xs uppercase mb-1">{t('unit9.kelvin')}</p><p className="text-2xl font-space font-bold text-brand-cyan">{kelvin} K</p></div>
            <div className="formula-box rounded-xl p-4 text-center"><p className="text-gray-400 text-xs uppercase mb-1">{t('unit9.fahrenheit')}</p><p className="text-2xl font-space font-bold text-brand-pink">{fahrenheit.toFixed(1)}°F</p></div>
          </div>
        </div>
      </div>
      <div className="formula-box rounded-xl p-4 text-center"><p className="text-sm font-space text-gray-300">{t('unit9.tempFormula')}</p></div>
    </div>
  );
}
