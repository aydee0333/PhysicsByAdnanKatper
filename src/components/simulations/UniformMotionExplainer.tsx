import { useState } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function UniformMotionExplainer() {
  const t = useT();
  const [type, setType] = useState<'uniform-speed' | 'uniform-velocity' | 'uniform-acceleration'>('uniform-speed');

  const info: Record<string, { title: string; desc: string; example: string; formula: string }> = {
    'uniform-speed': { title: t('unit2.uniformSpeed'), desc: 'An object covers equal distances in equal intervals of time.', example: 'A car moving at exactly 60 km/h on a straight highway.', formula: 'Speed = constant' },
    'uniform-velocity': { title: t('unit2.uniformVel'), desc: 'An object covers equal displacements in equal intervals of time in the SAME direction.', example: 'A train moving at 80 km/h North without changing direction.', formula: 'Velocity = constant (no acceleration)' },
    'uniform-acceleration': { title: t('unit2.uniformAcc'), desc: 'Velocity changes by equal amounts in equal intervals of time.', example: 'A ball falling under gravity — speed increases by 10 m/s every second.', formula: 'a = (v - u) / t = constant' },
  };

  const i = info[type];

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setType('uniform-speed')} className={`flex-1 py-2 rounded-xl text-sm font-semibold ${type === 'uniform-speed' ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : 'glass-card text-gray-400'}`}>{t('unit2.uniformSpeed')}</button>
        <button onClick={() => setType('uniform-velocity')} className={`flex-1 py-2 rounded-xl text-sm font-semibold ${type === 'uniform-velocity' ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : 'glass-card text-gray-400'}`}>{t('unit2.uniformVel')}</button>
        <button onClick={() => setType('uniform-acceleration')} className={`flex-1 py-2 rounded-xl text-sm font-semibold ${type === 'uniform-acceleration' ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : 'glass-card text-gray-400'}`}>{t('unit2.uniformAcc')}</button>
      </div>
      <div className="glass-card rounded-2xl p-6">
        <h4 className="text-xl font-bold text-white mb-2">{i.title}</h4>
        <p className="text-gray-300 text-sm mb-3">{i.desc}</p>
        <div className="formula-box rounded-xl p-4 mb-3">
          <p className="text-brand-cyan font-space font-bold text-center">{i.formula}</p>
        </div>
        <p className="text-brand-amber text-sm">💡 Example: {i.example}</p>
      </div>
    </div>
  );
}
