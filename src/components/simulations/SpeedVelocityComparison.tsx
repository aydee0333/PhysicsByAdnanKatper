import { useState } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function SpeedVelocityComparison() {
  const t = useT();
  const [speedA, setSpeedA] = useState(60);
  const [speedB, setSpeedB] = useState(60);
  const [dirA, setDirA] = useState<'North' | 'South'>('North');
  const [dirB, setDirB] = useState<'North' | 'South'>('South');

  const sameSpeed = speedA === speedB;
  const sameVelocity = sameSpeed && dirA === dirB;

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="glass-card rounded-2xl p-5">
          <h4 className="text-brand-cyan font-bold mb-3">🚗 Car A</h4>
          <label className="text-gray-400 text-xs block mb-1">Speed (km/h)</label>
          <input type="range" min="0" max="120" value={speedA} onChange={e => setSpeedA(Number(e.target.value))} className="w-full accent-brand-cyan mb-3" />
          <div className="flex gap-2">
            <button onClick={() => setDirA('North')} className={`flex-1 py-1 rounded-lg text-xs ${dirA === 'North' ? 'bg-brand-cyan/20 text-brand-cyan' : 'glass-card text-gray-400'}`}>North</button>
            <button onClick={() => setDirA('South')} className={`flex-1 py-1 rounded-lg text-xs ${dirA === 'South' ? 'bg-brand-cyan/20 text-brand-cyan' : 'glass-card text-gray-400'}`}>South</button>
          </div>
          <p className="text-white font-bold mt-2">{speedA} km/h {dirA}</p>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <h4 className="text-brand-pink font-bold mb-3">🚗 Car B</h4>
          <label className="text-gray-400 text-xs block mb-1">Speed (km/h)</label>
          <input type="range" min="0" max="120" value={speedB} onChange={e => setSpeedB(Number(e.target.value))} className="w-full accent-brand-pink mb-3" />
          <div className="flex gap-2">
            <button onClick={() => setDirB('North')} className={`flex-1 py-1 rounded-lg text-xs ${dirB === 'North' ? 'bg-brand-pink/20 text-brand-pink' : 'glass-card text-gray-400'}`}>North</button>
            <button onClick={() => setDirB('South')} className={`flex-1 py-1 rounded-lg text-xs ${dirB === 'South' ? 'bg-brand-pink/20 text-brand-pink' : 'glass-card text-gray-400'}`}>South</button>
          </div>
          <p className="text-white font-bold mt-2">{speedB} km/h {dirB}</p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className={`rounded-xl p-4 text-center ${sameSpeed ? 'bg-brand-lime/15 border border-brand-lime/30' : 'bg-brand-rose/15 border border-brand-rose/30'}`}>
          <p className="text-gray-400 text-xs uppercase mb-1">Speed Comparison</p>
          <p className={`text-lg font-bold ${sameSpeed ? 'text-brand-lime' : 'text-brand-rose'}`}>{sameSpeed ? '✅ Same Speed' : '❌ Different Speed'}</p>
        </div>
        <div className={`rounded-xl p-4 text-center ${sameVelocity ? 'bg-brand-lime/15 border border-brand-lime/30' : 'bg-brand-rose/15 border border-brand-rose/30'}`}>
          <p className="text-gray-400 text-xs uppercase mb-1">Velocity Comparison</p>
          <p className={`text-lg font-bold ${sameVelocity ? 'text-brand-lime' : 'text-brand-rose'}`}>{sameVelocity ? '✅ Same Velocity' : '❌ Different Velocity'}</p>
        </div>
      </div>
      {!sameVelocity && (
        <div className="glass-card rounded-xl p-4 mt-4">
          <p className="text-gray-300 text-sm">💡 <strong className="text-white">Key Point:</strong> {t('unit2.speedVelDiff')}</p>
        </div>
      )}
    </div>
  );
}
