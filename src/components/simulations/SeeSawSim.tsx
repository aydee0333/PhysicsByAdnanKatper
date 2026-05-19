import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { useT } from '../../i18n/LanguageContext';

export default function SeeSawSim() {
  const t = useT();
  const [leftMass, setLeftMass] = useState(5);
  const [rightMass, setRightMass] = useState(5);
  const [leftDist, setLeftDist] = useState(1);
  const [rightDist, setRightDist] = useState(1);
  const g = 10;

  const leftForce = leftMass * g;
  const rightForce = rightMass * g;
  const leftTorque = leftForce * leftDist;
  const rightTorque = rightForce * rightDist;
  const diff = leftTorque - rightTorque;
  const tilt = Math.max(-25, Math.min(25, diff * 0.3));

  return (
    <div>
      <div className="grid md:grid-cols-4 gap-3 mb-6">
        <div>
          <label className="text-gray-400 text-xs block mb-1">{t('unit4.leftMass')}</label>
          <input type="number" value={leftMass} onChange={e => setLeftMass(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-cyan/50" />
        </div>
        <div>
          <label className="text-gray-400 text-xs block mb-1">{t('unit4.rightMass')}</label>
          <input type="number" value={rightMass} onChange={e => setRightMass(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-pink/50" />
        </div>
        <div>
          <label className="text-gray-400 text-xs block mb-1">{t('unit4.leftDist')}</label>
          <input type="number" value={leftDist} onChange={e => setLeftDist(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-amber/50" />
        </div>
        <div>
          <label className="text-gray-400 text-xs block mb-1">{t('unit4.rightDist')}</label>
          <input type="number" value={rightDist} onChange={e => setRightDist(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-rose/50" />
        </div>
      </div>

      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 relative overflow-hidden mb-4" style={{ height: 200 }}>
        <svg width="100%" height="100%" viewBox="0 0 500 200">
          <line x1="0" y1="180" x2="500" y2="180" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
          <polygon points="250,180 230,140 270,140" fill="#7c3aed" opacity="0.6" />
          <g transform={`rotate(${tilt}, 250, 140)`}>
            <rect x="50" y="135" width="400" height="10" rx="3" fill="#a78bfa" opacity="0.5" />
            <rect x={50 + (1 - leftDist) * 80} y={95} width="40" height="40" rx="4" fill="#06b6d4" opacity="0.8" />
            <text x={70 + (1 - leftDist) * 80} y={120} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">{leftMass}kg</text>
            <rect x={410 - (1 - rightDist) * 80} y={95} width="40" height="40" rx="4" fill="#ec4899" opacity="0.8" />
            <text x={430 - (1 - rightDist) * 80} y={120} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">{rightMass}kg</text>
            <text x={70 + (1 - leftDist) * 80} y="155" textAnchor="middle" fill="#9ca3af" fontSize="10">{leftDist}m</text>
            <text x={430 - (1 - rightDist) * 80} y="155" textAnchor="middle" fill="#9ca3af" fontSize="10">{rightDist}m</text>
          </g>
        </svg>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mb-4">
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">{t('unit4.clockTorque')}</p>
          <p className="text-xl font-space font-bold text-brand-pink">{rightTorque.toFixed(0)} Nm</p>
        </div>
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">{t('unit4.antiTorque')}</p>
          <p className="text-xl font-space font-bold text-brand-cyan">{leftTorque.toFixed(0)} Nm</p>
        </div>
        <div className={`rounded-xl p-4 text-center ${Math.abs(diff) < 1 ? 'bg-brand-lime/15 border border-brand-lime/30' : 'bg-brand-rose/15 border border-brand-rose/30'}`}>
          <p className="text-gray-400 text-xs uppercase mb-1">{t('unit5.status')}</p>
          <p className={`text-lg font-bold ${Math.abs(diff) < 1 ? 'text-brand-lime' : 'text-brand-rose'}`}>
            {Math.abs(diff) < 1 ? t('unit4.balanced') : diff > 0 ? t('unit4.tiltsLeft') : t('unit4.tiltsRight')}
          </p>
        </div>
      </div>

      <button onClick={() => { setLeftMass(5); setRightMass(5); setLeftDist(1); setRightDist(1); }} className="mx-auto block text-xs text-gray-500 hover:text-white flex items-center gap-1">
        <RotateCcw size={12} /> {t('unit4.reset')}
      </button>
    </div>
  );
}
