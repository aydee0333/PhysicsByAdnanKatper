import { useState } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function KECalculator() {
  const t = useT();
  const [mass, setMass] = useState(2);
  const [speed, setSpeed] = useState(3);
  const ke = 0.5 * mass * speed * speed;

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div><label className="text-gray-400 text-sm block mb-2">{t('unit8.massKg').replace('{mass}', String(mass))}</label><input type="range" min="0.1" max="50" step="0.1" value={mass} onChange={e => setMass(Number(e.target.value))} className="w-full accent-brand-purple" /></div>
        <div><label className="text-gray-400 text-sm block mb-2">{t('unit8.speedMs').replace('{speed}', String(speed))}</label><input type="range" min="0" max="100" value={speed} onChange={e => setSpeed(Number(e.target.value))} className="w-full accent-brand-cyan" /></div>
      </div>
      <div className="formula-box rounded-2xl p-6 text-center">
        <p className="text-gray-400 text-xs uppercase mb-2">KE = ½mv²</p>
        <p className="text-3xl font-space font-bold text-brand-purple">KE = ½ × {mass} × {speed}² = <span className="text-brand-cyan">{ke.toFixed(1)} J</span></p>
      </div>
    </div>
  );
}
