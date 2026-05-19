import { useState } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function BalancedBeamSim() {
  const t = useT();
  const [leftW, setLeftW] = useState(5);
  const [rightW, setRightW] = useState(5);
  const [leftD, setLeftD] = useState(2);
  const [rightD, setRightD] = useState(2);

  const leftTorque = leftW * leftD;
  const rightTorque = rightW * rightD;
  const sumF = leftW + rightW;
  const netT = Math.abs(leftTorque - rightTorque);
  const isBalanced = netT < 0.1;

  return (
    <div>
      <div className="grid md:grid-cols-4 gap-3 mb-6">
        <div>
          <label className="text-gray-400 text-xs block mb-1">{t('unit4.leftWeight')}</label>
          <input type="number" value={leftW} onChange={e => setLeftW(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-cyan/50" />
        </div>
        <div>
          <label className="text-gray-400 text-xs block mb-1">{t('unit4.rightWeight')}</label>
          <input type="number" value={rightW} onChange={e => setRightW(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-pink/50" />
        </div>
        <div>
          <label className="text-gray-400 text-xs block mb-1">{t('unit4.leftDistBeam')}</label>
          <input type="number" value={leftD} onChange={e => setLeftD(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-amber/50" />
        </div>
        <div>
          <label className="text-gray-400 text-xs block mb-1">{t('unit4.rightDistBeam')}</label>
          <input type="number" value={rightD} onChange={e => setRightD(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-rose/50" />
        </div>
      </div>

      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 relative overflow-hidden mb-4" style={{ height: 180 }}>
        <svg width="100%" height="100%" viewBox="0 0 500 180">
          <line x1="0" y1="160" x2="500" y2="160" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
          <polygon points="250,160 235,120 265,120" fill="#7c3aed" opacity="0.6" />
          <line x1="50" y1="120" x2="450" y2="120" stroke="#a78bfa" strokeWidth="6" opacity="0.5" />
          <line x1={250 - leftD * 60} y1="120" x2={250 - leftD * 60} y2="80" stroke="#06b6d4" strokeWidth="2" />
          <rect x={250 - leftD * 60 - 20} y="50" width="40" height="30" rx="3" fill="#06b6d4" opacity="0.7" />
          <text x={250 - leftD * 60} y="70" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">{leftW}N</text>
          <line x1={250 + rightD * 60} y1="120" x2={250 + rightD * 60} y2="80" stroke="#ec4899" strokeWidth="2" />
          <rect x={250 + rightD * 60 - 20} y="50" width="40" height="30" rx="3" fill="#ec4899" opacity="0.7" />
          <text x={250 + rightD * 60} y="70" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">{rightW}N</text>
          <text x={250 - leftD * 30} y="145" textAnchor="middle" fill="#9ca3af" fontSize="10">{leftD}m</text>
          <text x={250 + rightD * 30} y="145" textAnchor="middle" fill="#9ca3af" fontSize="10">{rightD}m</text>
        </svg>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <div className="formula-box rounded-xl p-4">
          <p className="text-gray-400 text-xs uppercase mb-1">{t('unit4.firstCondLabel')}</p>
          <p className="text-lg font-space font-bold text-white">{leftW} + {rightW} = {sumF} N</p>
          <p className="text-brand-lime text-xs mt-1">{t('unit4.forcesBalance')}</p>
        </div>
        <div className="formula-box rounded-xl p-4">
          <p className="text-gray-400 text-xs uppercase mb-1">{t('unit4.secondCondLabel')}</p>
          <p className="text-lg font-space font-bold text-white">Left τ: {leftTorque} Nm | Right τ: {rightTorque} Nm</p>
          <p className={`text-xs mt-1 ${isBalanced ? 'text-brand-lime' : 'text-brand-rose'}`}>
            {isBalanced ? t('unit4.torquesBalance') : t('unit4.netTorque').replace('{torque}', netT.toFixed(1))}
          </p>
        </div>
      </div>

      <div className={`rounded-xl p-4 text-center ${isBalanced ? 'bg-brand-lime/15 border border-brand-lime/30' : 'bg-brand-rose/15 border border-brand-rose/30'}`}>
        <p className={`text-xl font-bold ${isBalanced ? 'text-brand-lime' : 'text-brand-rose'}`}>
          {isBalanced ? t('unit4.inEquilibrium') : t('unit4.notEquilibrium')}
        </p>
      </div>
    </div>
  );
}
