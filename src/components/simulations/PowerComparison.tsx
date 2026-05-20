import { useState } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function PowerComparison() {
  const t = useT();
  const [time, setTime] = useState(1);
  const appliances = [
    { name: 'LED Bulb', power: 10, color: 'text-brand-lime' },
    { name: 'Fan', power: 75, color: 'text-brand-cyan' },
    { name: 'TV', power: 100, color: 'text-brand-purple' },
    { name: 'AC', power: 1500, color: 'text-brand-rose' },
    { name: 'Iron', power: 1000, color: 'text-brand-amber' },
    { name: 'Heater', power: 2000, color: 'text-brand-pink' },
  ];

  return (
    <div>
      <div className="mb-4"><label className="text-gray-400 text-sm block mb-2">{t('unit8.timeHours').replace('{time}', String(time))}</label><input type="range" min="0.5" max="24" step="0.5" value={time} onChange={e => setTime(Number(e.target.value))} className="w-full accent-brand-teal" /></div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        {appliances.map(a => (
          <div key={a.name} className="glass-card rounded-xl p-3 text-center">
            <p className={`font-bold text-sm ${a.color}`}>{a.name}</p>
            <p className="text-white text-lg font-space font-bold">{a.power} W</p>
            <p className="text-gray-500 text-xs">{(a.power * time / 1000).toFixed(2)} kWh</p>
          </div>
        ))}
      </div>
      <div className="formula-box rounded-xl p-4 text-center">
        <p className="text-gray-400 text-xs uppercase mb-1">{t('unit8.totalEnergyUsed')}</p>
        <p className="text-xl font-space font-bold text-brand-teal">E = P × t</p>
      </div>
    </div>
  );
}
