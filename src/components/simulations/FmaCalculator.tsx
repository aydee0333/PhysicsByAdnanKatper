import { useState } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function FmaCalculator() {
  const t = useT();
  const [mass, setMass] = useState(5);
  const [acceleration, setAcceleration] = useState(2);
  const force = mass * acceleration;

  return (
    <div>
      <div className="formula-box rounded-2xl p-6 text-center mb-6">
        <p className="text-4xl font-space font-black text-white">F = <span className="text-brand-cyan">m</span> × <span className="text-brand-amber">a</span></p>
        <div className="flex justify-center gap-6 mt-3 text-sm">
          <span className="text-brand-cyan">F = Force (N)</span>
          <span className="text-brand-pink">m = mass (kg)</span>
          <span className="text-brand-amber">a = acceleration (m/s²)</span>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-gray-400 text-sm block mb-2">{t('unit3.massKg').replace('{mass}', String(mass))}</label>
          <input type="range" min="1" max="50" value={mass} onChange={e => setMass(Number(e.target.value))} className="w-full accent-brand-cyan" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">{t('unit3.acceleration').replace('{acceleration}', String(acceleration))}</label>
          <input type="range" min="0.5" max="10" step="0.5" value={acceleration} onChange={e => setAcceleration(Number(e.target.value))} className="w-full accent-brand-amber" />
        </div>
      </div>
      <div className="formula-box rounded-2xl p-6 text-center">
        <p className="text-gray-400 text-xs uppercase mb-2">{t('unit3.calcForce')}</p>
        <p className="text-4xl font-space font-bold text-brand-cyan">F = {mass} × {acceleration} = <span className="text-white">{force} N</span></p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3 mt-4">
        <div className="glass-card rounded-xl p-4">
          <p className="text-brand-lime text-xs uppercase mb-1">{t('unit3.moreForce')}</p>
          <p className="text-white text-sm">{t('unit3.moreForceDesc')}</p>
        </div>
        <div className="glass-card rounded-xl p-4">
          <p className="text-brand-rose text-xs uppercase mb-1">{t('unit3.moreMass')}</p>
          <p className="text-white text-sm">{t('unit3.moreMassDesc')}</p>
        </div>
      </div>
    </div>
  );
}
