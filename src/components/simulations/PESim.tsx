import { useState } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function PESim() {
  const t = useT();
  const [mass, setMass] = useState(2);
  const [height, setHeight] = useState(5);
  const g = 9.8;
  const pe = mass * g * height;

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div><label className="text-gray-400 text-sm block mb-2">{t('unit8.massKg').replace('{mass}', String(mass))}</label><input type="range" min="0.1" max="50" step="0.1" value={mass} onChange={e => setMass(Number(e.target.value))} className="w-full accent-brand-pink" /></div>
        <div><label className="text-gray-400 text-sm block mb-2">{t('unit8.heightM').replace('{height}', String(height))}</label><input type="range" min="0" max="100" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full accent-brand-amber" /></div>
      </div>
      <div className="formula-box rounded-2xl p-6 text-center">
        <p className="text-gray-400 text-xs uppercase mb-2">PE = mgh</p>
        <p className="text-3xl font-space font-bold text-brand-pink">PE = {mass} × {g} × {height} = <span className="text-brand-cyan">{pe.toFixed(1)} J</span></p>
      </div>
    </div>
  );
}
