import { useState } from 'react';
import {
  RotateCcw, Scale, ArrowLeftRight, CircleDot, Target
} from 'lucide-react';
import { useT } from '../../i18n/LanguageContext';
import Section from '../Section';
import UnitQuiz from '../UnitQuiz';

/* ═══════════════════════════════════════════════════════════
   1. TORQUE — See-Saw Simulator
   ═══════════════════════════════════════════════════════════ */
function SeeSawSim() {
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

      {/* See-saw visual */}
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

/* ═══════════════════════════════════════════════════════════
   2. LIKE & UNLIKE PARALLEL FORCES
   ═══════════════════════════════════════════════════════════ */
function ForceCombineSim() {
  const t = useT();
  const [forceA, setForceA] = useState(10);
  const [forceB, setForceB] = useState(5);
  const [type, setType] = useState<'like' | 'unlike'>('like');

  const resultant = type === 'like' ? forceA + forceB : Math.abs(forceA - forceB);
  const direction = type === 'like' ? '→' : forceA > forceB ? '→' : '←';

  return (
    <div>
      <div className="flex gap-3 mb-4">
        <button onClick={() => setType('like')} className={`flex-1 py-2 rounded-xl text-sm font-semibold ${type === 'like' ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : 'glass-card text-gray-400'}`}>
          {t('unit4.likeBtn')}
        </button>
        <button onClick={() => setType('unlike')} className={`flex-1 py-2 rounded-xl text-sm font-semibold ${type === 'unlike' ? 'bg-brand-pink/20 text-brand-pink border border-brand-pink/30' : 'glass-card text-gray-400'}`}>
          {t('unit4.unlikeBtn')}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-gray-400 text-sm block mb-2">{t('unit4.forceA').replace('{force}', String(forceA))}</label>
          <input type="range" min="1" max="50" value={forceA} onChange={e => setForceA(Number(e.target.value))} className="w-full accent-brand-cyan" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">{t('unit4.forceB').replace('{force}', String(forceB))}</label>
          <input type="range" min="1" max="50" value={forceB} onChange={e => setForceB(Number(e.target.value))} className="w-full accent-brand-pink" />
        </div>
      </div>

      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 p-6 mb-4">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="text-center">
            <div className="text-brand-cyan text-2xl mb-1">→</div>
            <p className="text-brand-cyan font-bold">{forceA} N</p>
          </div>
          <div className="text-gray-500 text-xl">{type === 'like' ? '+' : '−'}</div>
          <div className="text-center">
            <div className={`text-2xl mb-1 ${type === 'like' ? 'text-brand-pink' : 'text-brand-rose'}`}>{type === 'like' ? '→' : '←'}</div>
            <p className={`font-bold ${type === 'like' ? 'text-brand-pink' : 'text-brand-rose'}`}>{forceB} N</p>
          </div>
        </div>
        <div className="h-px bg-white/10 mb-4" />
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-1">{t('unit4.resultantForce')}</p>
          <p className="text-3xl font-space font-bold text-brand-amber">{resultant} N {direction}</p>
          <p className="text-gray-500 text-xs mt-1">
            {type === 'like' ? t('unit4.addForces') : t('unit4.subForces')}
          </p>
        </div>
      </div>

      <button onClick={() => { setForceA(10); setForceB(5); setType('like'); }} className="mx-auto block text-xs text-gray-500 hover:text-white flex items-center gap-1">
        <RotateCcw size={12} /> {t('unit4.reset')}
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   3. CENTER OF MASS & CENTER OF GRAVITY — Block Stability
   ═══════════════════════════════════════════════════════════ */
function BlockStabilitySim() {
  const t = useT();
  const [tiltAngle, setTiltAngle] = useState(0);
  const [shape, setShape] = useState<'block' | 'cone' | 'sphere'>('block');

  const maxStable = shape === 'block' ? 45 : shape === 'cone' ? 15 : 90;
  const isStable = tiltAngle <= maxStable;

  const shapeLabels: Record<string, string> = {
    block: t('unit4.block'),
    cone: t('unit4.cone'),
    sphere: t('unit4.sphere'),
  };

  return (
    <div>
      <div className="flex gap-3 mb-4">
        {(['block', 'cone', 'sphere'] as const).map(s => (
          <button key={s} onClick={() => { setShape(s); setTiltAngle(0); }} className={`flex-1 py-2 rounded-xl text-sm font-semibold capitalize ${shape === s ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : 'glass-card text-gray-400'}`}>
            {shapeLabels[s]}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">{t('unit4.tiltAngle').replace('{angle}', String(tiltAngle))}</label>
        <input type="range" min="0" max="90" value={tiltAngle} onChange={e => setTiltAngle(Number(e.target.value))} className="w-full accent-brand-amber" />
      </div>

      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 relative overflow-hidden mb-4" style={{ height: 220 }}>
        <svg width="100%" height="100%" viewBox="0 0 400 220">
          <line x1="0" y1="200" x2="400" y2="200" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
          <g transform={`translate(200, 200) rotate(${tiltAngle})`}>
            {shape === 'block' && (
              <>
                <rect x="-40" y="-80" width="80" height="80" fill="#7c3aed" opacity="0.6" rx="4" />
                <circle cx="0" cy="-40" r="5" fill="#f43f5e" />
                <line x1="0" y1="-40" x2="0" y2="40" stroke="#f43f5e" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
              </>
            )}
            {shape === 'cone' && (
              <>
                <polygon points="0,-100 -40,0 40,0" fill="#06b6d4" opacity="0.6" />
                <circle cx="0" cy="-25" r="5" fill="#f43f5e" />
                <line x1="0" y1="-25" x2="0" y2="40" stroke="#f43f5e" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
              </>
            )}
            {shape === 'sphere' && (
              <>
                <circle cx="0" cy="-40" r="40" fill="#ec4899" opacity="0.6" />
                <circle cx="0" cy="-40" r="5" fill="#f43f5e" />
                <line x1="0" y1="-40" x2="0" y2="40" stroke="#f43f5e" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
              </>
            )}
          </g>
          <line x1="160" y1="200" x2="240" y2="200" stroke={isStable ? '#84cc16' : '#f43f5e'} strokeWidth="3" />
        </svg>
      </div>

      <div className={`rounded-xl p-4 text-center ${isStable ? 'bg-brand-lime/15 border border-brand-lime/30' : 'bg-brand-rose/15 border border-brand-rose/30'}`}>
        <p className={`text-lg font-bold ${isStable ? 'text-brand-lime' : 'text-brand-rose'}`}>
          {isStable ? t('unit4.stableEq') : t('unit4.unstableEq')}
        </p>
        <p className="text-gray-400 text-sm mt-1">
          {shape === 'block' ? t('unit4.blockStable') : shape === 'cone' ? t('unit4.coneStable') : t('unit4.sphereStable')}
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   4. EQUILIBRIUM — Balanced Beam
   ═══════════════════════════════════════════════════════════ */
function BalancedBeamSim() {
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

/* ═══════════════════════════════════════════════════════════
   MAIN UNIT 4 CONTENT
   ═══════════════════════════════════════════════════════════ */
export default function Unit4Content() {
  const t = useT();

  return (
    <div>
      {/* 1. TORQUE */}
      <Section title={t('unit4.torque')} icon={<RotateCcw size={24} />} color="brand-cyan">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit4.torqueDef') }} />
        </div>
        <div className="formula-box rounded-2xl p-6 text-center mb-6">
          <p className="text-3xl font-space font-black text-white" dangerouslySetInnerHTML={{ __html: t('unit4.torqueFormula') }} />
          <div className="flex justify-center gap-6 mt-3 text-sm flex-wrap">
            <span className="text-brand-cyan">{t('unit4.torqueUnit')}</span>
            <span className="text-brand-pink">{t('unit4.forceUnit')}</span>
            <span className="text-brand-amber">{t('unit4.distUnit')}</span>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-cyan font-bold mb-1">{t('unit4.clockwise')}</p>
            <p className="text-gray-400 text-sm">{t('unit4.clockwiseDesc')}</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-pink font-bold mb-1">{t('unit4.anticlockwise')}</p>
            <p className="text-gray-400 text-sm">{t('unit4.anticlockwiseDesc')}</p>
          </div>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit4.seesawTitle')}</h4>
        <SeeSawSim />
      </Section>

      {/* 2. LIKE & UNLIKE FORCES */}
      <Section title={t('unit4.likeUnlike')} icon={<ArrowLeftRight size={24} />} color="brand-purple">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="definition-highlight rounded-2xl p-5">
            <h4 className="text-brand-cyan font-bold text-lg mb-2">{t('unit4.likeTitle')}</h4>
            <p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit4.likeDesc') }} />
            <p className="text-brand-cyan font-space font-bold mt-2">{t('unit4.likeFormula')}</p>
          </div>
          <div className="definition-highlight rounded-2xl p-5" style={{ borderLeftColor: '#ec4899' }}>
            <h4 className="text-brand-pink font-bold text-lg mb-2">{t('unit4.unlikeTitle')}</h4>
            <p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit4.unlikeDesc') }} />
            <p className="text-brand-pink font-space font-bold mt-2">{t('unit4.unlikeFormula')}</p>
          </div>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit4.forceCombineTitle')}</h4>
        <ForceCombineSim />
      </Section>

      {/* 3. CENTER OF MASS & GRAVITY */}
      <Section title={t('unit4.cmCg')} icon={<CircleDot size={24} />} color="brand-pink">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="glass-card rounded-2xl p-5">
            <h4 className="text-brand-cyan font-bold text-lg mb-2">{t('unit4.cmTitle')}</h4>
            <p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit4.cmDesc') }} />
          </div>
          <div className="glass-card rounded-2xl p-5">
            <h4 className="text-brand-pink font-bold text-lg mb-2">{t('unit4.cgTitle')}</h4>
            <p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit4.cgDesc') }} />
          </div>
        </div>

        <h4 className="text-lg font-bold text-white mb-3">{t('unit4.eqTypes')}</h4>
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-lime font-bold mb-1">{t('unit4.stable')}</p>
            <p className="text-gray-400 text-sm">{t('unit4.stableDesc')}</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-rose font-bold mb-1">{t('unit4.unstable')}</p>
            <p className="text-gray-400 text-sm">{t('unit4.unstableDesc')}</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-amber font-bold mb-1">{t('unit4.neutral')}</p>
            <p className="text-gray-400 text-sm">{t('unit4.neutralDesc')}</p>
          </div>
        </div>

        <h4 className="text-lg font-bold text-white mb-4">{t('unit4.blockStabTitle')}</h4>
        <BlockStabilitySim />
      </Section>

      {/* 4. EQUILIBRIUM */}
      <Section title={t('unit4.equilibrium')} icon={<Scale size={24} />} color="brand-amber">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit4.eqDef') }} />
        </div>

        <div className="space-y-3 mb-6">
          <div className="formula-box rounded-xl p-4">
            <p className="text-gray-400 text-xs uppercase mb-1">{t('unit4.firstCond')}</p>
            <p className="text-xl font-space font-bold text-brand-cyan">ΣF = 0</p>
            <p className="text-gray-400 text-sm">{t('unit4.firstCondDesc')}</p>
          </div>
          <div className="formula-box rounded-xl p-4">
            <p className="text-gray-400 text-xs uppercase mb-1">{t('unit4.secondCond')}</p>
            <p className="text-xl font-space font-bold text-brand-pink">Στ = 0</p>
            <p className="text-gray-400 text-sm">{t('unit4.secondCondDesc')}</p>
          </div>
        </div>

        <h4 className="text-lg font-bold text-white mb-4">{t('unit4.beamTitle')}</h4>
        <BalancedBeamSim />
      </Section>

      {/* 5. COUPLE */}
      <Section title={t('unit4.couple')} icon={<Target size={24} />} color="brand-rose">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit4.coupleDef') }} />
        </div>
        <div className="formula-box rounded-2xl p-6 text-center mb-6">
          <p className="text-3xl font-space font-black text-white" dangerouslySetInnerHTML={{ __html: t('unit4.coupleFormula') }} />
          <p className="text-gray-400 text-sm mt-2">{t('unit4.coupleDistNote')}</p>
        </div>

        <h4 className="text-lg font-bold text-white mb-4">{t('unit4.coupleExamples')}</h4>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-cyan font-bold mb-1">{t('unit4.steering')}</p>
            <p className="text-gray-400 text-sm">{t('unit4.steeringDesc')}</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-pink font-bold mb-1">{t('unit4.spanner')}</p>
            <p className="text-gray-400 text-sm">{t('unit4.spannerDesc')}</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-amber font-bold mb-1">{t('unit4.door')}</p>
            <p className="text-gray-400 text-sm">{t('unit4.doorDesc')}</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-lime font-bold mb-1">{t('unit4.pedals')}</p>
            <p className="text-gray-400 text-sm">{t('unit4.pedalsDesc')}</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-purple font-bold mb-1">{t('unit4.scissors')}</p>
            <p className="text-gray-400 text-sm">{t('unit4.scissorsDesc')}</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-rose font-bold mb-1">{t('unit4.ferris')}</p>
            <p className="text-gray-400 text-sm">{t('unit4.ferrisDesc')}</p>
          </div>
        </div>

        <div className="bg-brand-dark/60 rounded-2xl border border-white/5 p-6">
          <svg width="100%" height="160" viewBox="0 0 400 160">
            <circle cx="200" cy="80" r="50" fill="none" stroke="#7c3aed" strokeWidth="2" opacity="0.5" />
            <circle cx="200" cy="80" r="5" fill="#7c3aed" />
            <line x1="200" y1="30" x2="200" y2="10" stroke="#06b6d4" strokeWidth="3" markerEnd="url(#arrowup)" />
            <text x="210" y="25" fill="#06b6d4" fontSize="12" fontWeight="bold">F ↑</text>
            <line x1="200" y1="130" x2="200" y2="150" stroke="#ec4899" strokeWidth="3" markerEnd="url(#arrowdown)" />
            <text x="210" y="145" fill="#ec4899" fontSize="12" fontWeight="bold">F ↓</text>
            <line x1="260" y1="30" x2="260" y2="130" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,4" />
            <text x="270" y="85" fill="#f59e0b" fontSize="12">d</text>
            <path d="M 160 50 A 40 40 0 0 1 240 50" fill="none" stroke="#84cc16" strokeWidth="2" markerEnd="url(#arrowcw)" />
            <defs>
              <marker id="arrowup" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                <path d="M 0 10 L 5 0 L 10 10" fill="#06b6d4" />
              </marker>
              <marker id="arrowdown" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                <path d="M 0 0 L 5 10 L 10 0" fill="#ec4899" />
              </marker>
              <marker id="arrowcw" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                <path d="M 0 0 L 5 5 L 0 10" fill="#84cc16" />
              </marker>
            </defs>
          </svg>
          <p className="text-center text-gray-400 text-sm mt-2">{t('unit4.coupleVisualNote')}</p>
        </div>
      </Section>

      {/* Quiz */}
      <UnitQuiz
        unitId="unit4"
        questions={[
          {
            question: t('unit4.quiz.q1'),
            options: [t('unit4.quiz.q1.opt1'), t('unit4.quiz.q1.opt2'), t('unit4.quiz.q1.opt3'), t('unit4.quiz.q1.opt4')],
            correctIndex: 1,
          },
          {
            question: t('unit4.quiz.q2'),
            options: [t('unit4.quiz.q2.opt1'), t('unit4.quiz.q2.opt2'), t('unit4.quiz.q2.opt3'), t('unit4.quiz.q2.opt4')],
            correctIndex: 2,
          },
          {
            question: t('unit4.quiz.q3'),
            options: [t('unit4.quiz.q3.opt1'), t('unit4.quiz.q3.opt2'), t('unit4.quiz.q3.opt3'), t('unit4.quiz.q3.opt4')],
            correctIndex: 2,
          },
          {
            question: t('unit4.quiz.q4'),
            options: [t('unit4.quiz.q4.opt1'), t('unit4.quiz.q4.opt2'), t('unit4.quiz.q4.opt3'), t('unit4.quiz.q4.opt4')],
            correctIndex: 1,
          },
          {
            question: t('unit4.quiz.q5'),
            options: [t('unit4.quiz.q5.opt1'), t('unit4.quiz.q5.opt2'), t('unit4.quiz.q5.opt3'), t('unit4.quiz.q5.opt4')],
            correctIndex: 1,
          },
        ]}
      />

      {/* Quick Summary */}
      <div className="unit-detail-reveal glass-card-strong rounded-3xl p-8 md:p-12 text-center mb-16" style={{ opacity: 0, transform: 'translateY(60px)' }}>
        <h3 className="text-2xl md:text-3xl font-black text-white mb-6">{t('unit4.summary')}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-start">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-cyan font-bold text-sm mb-1">{t('unit4.sumTorque')}</p>
            <p className="text-gray-400 text-xs">{t('unit4.sumTorqueDesc')}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-purple font-bold text-sm mb-1">{t('unit4.sumLikeUnlike')}</p>
            <p className="text-gray-400 text-xs">{t('unit4.sumLikeUnlikeDesc')}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-pink font-bold text-sm mb-1">{t('unit4.sumEquilibrium')}</p>
            <p className="text-gray-400 text-xs">{t('unit4.sumEquilibriumDesc')}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-rose font-bold text-sm mb-1">{t('unit4.sumCouple')}</p>
            <p className="text-gray-400 text-xs">{t('unit4.sumCoupleDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
