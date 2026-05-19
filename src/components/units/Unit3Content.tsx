import { useState, useEffect, useRef } from 'react';
import {
  Zap, CircleDot, Gauge, ArrowLeftRight, Scale,
  RotateCcw, Car, Globe, Flame
} from 'lucide-react';
import { useT } from '../../i18n/LanguageContext';
import Section from '../Section';
import UnitQuiz from '../UnitQuiz';

/* ═══════════════════════════════════════════════════════════
   1. FORCE — Push/Pull Simulator
   ═══════════════════════════════════════════════════════════ */
function PushPullSim() {
  const t = useT();
  const [force, setForce] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fillRect(0, h - 50, w, 40);

    const boxX = 80 + (force / 100) * (w - 200);
    const boxY = h - 95;

    if (force > 0) {
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(boxX - 60, boxY + 20);
      ctx.lineTo(boxX - 10, boxY + 20);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(boxX - 15, boxY + 12);
      ctx.lineTo(boxX - 5, boxY + 20);
      ctx.lineTo(boxX - 15, boxY + 28);
      ctx.stroke();
      ctx.fillStyle = '#06b6d4';
      ctx.font = 'bold 14px Poppins';
      ctx.textAlign = 'center';
      ctx.fillText(`${force} N →`, boxX - 40, boxY + 10);
    }

    ctx.fillStyle = '#7c3aed';
    ctx.fillRect(boxX, boxY, 60, 50);
    ctx.strokeStyle = '#a78bfa';
    ctx.lineWidth = 2;
    ctx.strokeRect(boxX, boxY, 60, 50);

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText('BOX', boxX + 30, boxY + 30);

    if (force > 0) {
      const speed = (force * 0.1).toFixed(1);
      ctx.fillStyle = '#06b6d4';
      ctx.font = 'bold 14px Poppins';
      ctx.fillText(`Speed: ${speed} m/s`, boxX + 30, boxY - 10);
    }
  }, [force]);

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">{t('unit3.pushForce').replace('{force}', String(force))}</label>
        <input type="range" min="0" max="100" value={force} onChange={e => setForce(Number(e.target.value))} className="w-full accent-brand-cyan" />
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={600} height={160} className="w-full" style={{ maxWidth: 600, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="glass-card rounded-xl p-3 text-center">
          <p className="text-brand-cyan text-xs uppercase">{t('unit3.speedChange')}</p>
          <p className="text-white text-sm font-semibold">{force > 0 ? t('unit3.accelerating') : t('unit3.atRest')}</p>
        </div>
        <div className="glass-card rounded-xl p-3 text-center">
          <p className="text-brand-pink text-xs uppercase">{t('unit3.direction')}</p>
          <p className="text-white text-sm font-semibold">{t('unit3.forward')}</p>
        </div>
        <div className="glass-card rounded-xl p-3 text-center">
          <p className="text-brand-amber text-xs uppercase">{t('unit3.shape')}</p>
          <p className="text-white text-sm font-semibold">{t('unit3.noChange')}</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   2. NEWTON'S FIRST LAW — Coin & Card Experiment
   ═══════════════════════════════════════════════════════════ */
function CoinCardExperiment() {
  const t = useT();
  const [pulled, setPulled] = useState(false);
  const [coinDropped, setCoinDropped] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 30, h - 40);
    ctx.lineTo(w / 2 - 30, h - 100);
    ctx.lineTo(w / 2 + 30, h - 100);
    ctx.lineTo(w / 2 + 30, h - 40);
    ctx.stroke();

    const cardX = pulled ? w / 2 + 100 : w / 2;
    const cardY = h - 105;

    ctx.fillStyle = pulled ? 'rgba(245,158,11,0.3)' : 'rgba(245,158,11,0.6)';
    ctx.fillRect(cardX - 50, cardY, 100, 8);

    if (!pulled || !coinDropped) {
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(cardX, cardY - 5, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 10px Poppins';
      ctx.textAlign = 'center';
      ctx.fillText('₹', cardX, cardY - 1);
    } else {
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(w / 2, h - 55, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 10px Poppins';
      ctx.textAlign = 'center';
      ctx.fillText('₹', w / 2, h - 51);
    }

    ctx.fillStyle = '#9ca3af';
    ctx.font = '12px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText(t('unit3.glass'), w / 2, h - 10);
    if (pulled && coinDropped) {
      ctx.fillStyle = '#84cc16';
      ctx.font = 'bold 14px Poppins';
      ctx.fillText(t('unit3.coinDropped'), w / 2, 30);
    }
  }, [pulled, coinDropped, t]);

  const pullCard = () => {
    setPulled(true);
    setTimeout(() => setCoinDropped(true), 300);
  };

  const reset = () => {
    setPulled(false);
    setCoinDropped(false);
  };

  return (
    <div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={400} height={180} className="w-full" style={{ maxWidth: 400, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="flex gap-3 justify-center">
        <button onClick={pullCard} disabled={pulled} className="btn-primary px-6 py-2 rounded-xl text-white font-semibold text-sm disabled:opacity-50">
          {t('unit3.pullCard')}
        </button>
        <button onClick={reset} className="glass-card px-4 py-2 rounded-xl text-gray-400 text-sm hover:text-white flex items-center gap-2">
          <RotateCcw size={14} /> {t('unit3.reset')}
        </button>
      </div>
      <div className="mt-4 p-4 bg-white/5 rounded-xl">
        <p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit3.whyInertia') }} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   3. NEWTON'S SECOND LAW — F = ma Calculator
   ═══════════════════════════════════════════════════════════ */
function FmaCalculator() {
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

/* ═══════════════════════════════════════════════════════════
   4. NEWTON'S THIRD LAW — Action-Reaction Pairs
   ═══════════════════════════════════════════════════════════ */
function ActionReactionGame() {
  const t = useT();
  const [pairs, setPairs] = useState([
    { id: 1, actionKey: 'unit3.ar1Action', reactionKey: 'unit3.ar1Reaction', matched: false },
    { id: 2, actionKey: 'unit3.ar2Action', reactionKey: 'unit3.ar2Reaction', matched: false },
    { id: 3, actionKey: 'unit3.ar3Action', reactionKey: 'unit3.ar3Reaction', matched: false },
    { id: 4, actionKey: 'unit3.ar4Action', reactionKey: 'unit3.ar4Reaction', matched: false },
  ]);
  const [selectedAction, setSelectedAction] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const selectAction = (id: number) => {
    setSelectedAction(id);
    setMessage('');
  };

  const selectReaction = (id: number) => {
    if (selectedAction === null) {
      setMessage(t('unit3.selectFirst'));
      return;
    }
    if (selectedAction === id) {
      setPairs(prev => prev.map(p => p.id === id ? { ...p, matched: true } : p));
      setMessage(t('unit3.correctPair'));
      setSelectedAction(null);
    } else {
      setMessage(t('unit3.wrongPair'));
      setSelectedAction(null);
    }
  };

  const reset = () => {
    setPairs(pairs.map(p => ({ ...p, matched: false })));
    setSelectedAction(null);
    setMessage('');
  };

  const allMatched = pairs.every(p => p.matched);

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-brand-cyan font-bold text-sm mb-3">{t('unit3.actions')}</p>
          <div className="space-y-2">
            {pairs.map(p => (
              <button
                key={`a-${p.id}`}
                onClick={() => !p.matched && selectAction(p.id)}
                disabled={p.matched}
                className={`w-full p-3 rounded-xl text-sm text-start transition-all ${
                  p.matched ? 'bg-brand-lime/15 text-brand-lime border border-brand-lime/30' :
                  selectedAction === p.id ? 'bg-brand-cyan/20 text-brand-cyan border-2 border-brand-cyan/60' :
                  'glass-card text-gray-300 hover:bg-white/5'
                }`}
              >
                {t(p.actionKey)} {p.matched && '✓'}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-brand-pink font-bold text-sm mb-3">{t('unit3.reactions')}</p>
          <div className="space-y-2">
            {pairs.map(p => (
              <button
                key={`r-${p.id}`}
                onClick={() => !p.matched && selectReaction(p.id)}
                disabled={p.matched}
                className={`w-full p-3 rounded-xl text-sm text-start transition-all ${
                  p.matched ? 'bg-brand-lime/15 text-brand-lime border border-brand-lime/30' :
                  'glass-card text-gray-300 hover:bg-white/5'
                }`}
              >
                {t(p.reactionKey)} {p.matched && '✓'}
              </button>
            ))}
          </div>
        </div>
      </div>
      {message && <p className={`text-center font-bold ${message.includes('✅') ? 'text-brand-lime' : 'text-brand-rose'}`}>{message}</p>}
      {allMatched && <p className="text-brand-lime font-bold text-center text-xl mt-3">{t('unit3.allMatched')}</p>}
      <button onClick={reset} className="mt-3 mx-auto block text-xs text-gray-500 hover:text-white flex items-center gap-1">
        <RotateCcw size={12} /> {t('unit3.reset')}
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   5. MASS AND WEIGHT — Calculator
   ═══════════════════════════════════════════════════════════ */
function WeightCalculator() {
  const t = useT();
  const [mass, setMass] = useState(10);
  const [body, setBody] = useState('earth');

  const bodies: Record<string, { name: string; g: number; color: string }> = {
    earth: { name: 'Earth', g: 9.8, color: 'text-brand-cyan' },
    moon: { name: 'Moon', g: 1.6, color: 'text-gray-400' },
    mars: { name: 'Mars', g: 3.7, color: 'text-brand-rose' },
    jupiter: { name: 'Jupiter', g: 24.8, color: 'text-brand-amber' },
  };

  const selected = bodies[body];
  const weight = mass * selected.g;

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-gray-400 text-sm block mb-2">{t('unit3.massKg').replace('{mass}', String(mass))}</label>
          <input type="range" min="1" max="100" value={mass} onChange={e => setMass(Number(e.target.value))} className="w-full accent-brand-cyan" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">{t('unit3.celestialBody')}</label>
          <select
            value={body}
            onChange={e => setBody(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-brand-cyan/50"
          >
            <option value="earth">Earth (g = 9.8 m/s²)</option>
            <option value="moon">Moon (g = 1.6 m/s²)</option>
            <option value="mars">Mars (g = 3.7 m/s²)</option>
            <option value="jupiter">Jupiter (g = 24.8 m/s²)</option>
          </select>
        </div>
      </div>

      <div className="formula-box rounded-2xl p-6 text-center mb-6">
        <p className="text-gray-400 text-xs uppercase mb-2">{t('unit3.weightFormula')}</p>
        <p className="text-3xl font-space font-bold text-white">
          {t('unit3.weightResult').replace('{mass}', String(mass)).replace('{g}', String(selected.g)).replace('{weight}', weight.toFixed(1))}
        </p>
        <p className="text-gray-500 text-sm mt-2">{t('unit3.onBody').replace('{body}', selected.name)}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.entries(bodies).map(([key, b]) => {
          const w = mass * b.g;
          const isSelected = key === body;
          return (
            <button
              key={key}
              onClick={() => setBody(key)}
              className={`p-3 rounded-xl text-center transition-all ${
                isSelected ? 'bg-white/10 border border-brand-cyan/30' : 'glass-card hover:bg-white/5'
              }`}
            >
              <p className={`font-bold text-sm ${b.color}`}>{b.name}</p>
              <p className="text-white text-lg font-space font-bold">{w.toFixed(1)} N</p>
              <p className="text-gray-500 text-xs">g = {b.g} m/s²</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   6. MOMENTUM — Collision Simulator
   ═══════════════════════════════════════════════════════════ */
function CollisionSim() {
  const t = useT();
  const [m1, setM1] = useState(2);
  const [m2, setM2] = useState(2);
  const [v1, setV1] = useState(5);
  const [v2, setV2] = useState(-3);

  const p1 = m1 * v1;
  const p2 = m2 * v2;
  const totalP = p1 + p2;

  return (
    <div>
      <div className="grid md:grid-cols-4 gap-3 mb-6">
        <div>
          <label className="text-gray-400 text-xs block mb-1">{t('unit3.cart1Mass')}</label>
          <input type="number" value={m1} onChange={e => setM1(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-cyan/50" />
        </div>
        <div>
          <label className="text-gray-400 text-xs block mb-1">{t('unit3.cart2Mass')}</label>
          <input type="number" value={m2} onChange={e => setM2(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-pink/50" />
        </div>
        <div>
          <label className="text-gray-400 text-xs block mb-1">{t('unit3.cart1Vel')}</label>
          <input type="number" value={v1} onChange={e => setV1(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-amber/50" />
        </div>
        <div>
          <label className="text-gray-400 text-xs block mb-1">{t('unit3.cart2Vel')}</label>
          <input type="number" value={v2} onChange={e => setV2(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-rose/50" />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3 mb-4">
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">p₁ = m₁ × v₁</p>
          <p className="text-xl font-space font-bold text-brand-cyan">{p1} kg·m/s</p>
        </div>
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">p₂ = m₂ × v₂</p>
          <p className="text-xl font-space font-bold text-brand-pink">{p2} kg·m/s</p>
        </div>
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">{t('unit3.totalMomentum')}</p>
          <p className="text-xl font-space font-bold text-brand-amber">{totalP} kg·m/s</p>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-4">
        <p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit3.conservationLaw') }} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   7. FRICTION — Slope Simulator
   ═══════════════════════════════════════════════════════════ */
function FrictionSlopeSim() {
  const t = useT();
  const [angle, setAngle] = useState(0);
  const [surface, setSurface] = useState<'smooth' | 'rough'>('smooth');

  const mu = surface === 'smooth' ? 0.2 : 0.6;
  const g = 10;
  const rad = (angle * Math.PI) / 180;
  const forceDown = g * Math.sin(rad);
  const maxStatic = mu * g * Math.cos(rad);
  const sliding = forceDown > maxStatic;

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-gray-400 text-sm block mb-2">{t('unit3.slopeAngle').replace('{angle}', String(angle))}</label>
          <input type="range" min="0" max="60" value={angle} onChange={e => setAngle(Number(e.target.value))} className="w-full accent-brand-amber" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">{t('unit3.surfaceType')}</label>
          <div className="flex gap-2">
            <button onClick={() => setSurface('smooth')} className={`flex-1 py-2 rounded-xl text-sm font-semibold ${surface === 'smooth' ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : 'glass-card text-gray-400'}`}>
              {t('unit3.smooth')}
            </button>
            <button onClick={() => setSurface('rough')} className={`flex-1 py-2 rounded-xl text-sm font-semibold ${surface === 'rough' ? 'bg-brand-amber/20 text-brand-amber border border-brand-amber/30' : 'glass-card text-gray-400'}`}>
              {t('unit3.rough')}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 relative overflow-hidden mb-4" style={{ height: 200 }}>
        <svg width="100%" height="100%" viewBox="0 0 400 200">
          <polygon
            points={`0,200 ${400 * Math.cos(rad)},200 0,${200 - 400 * Math.sin(rad)}`}
            fill="rgba(255,255,255,0.03)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          <g transform={`translate(${30 * Math.cos(rad) + 10}, ${200 - 30 * Math.sin(rad) - 25}) rotate(-${angle})`}>
            <rect x="0" y="0" width="30" height="25" fill={sliding ? '#f43f5e' : '#84cc16'} rx="3" />
            <text x="15" y="17" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">BOX</text>
          </g>
          <path d={`M 30 200 A 30 30 0 0 0 ${30 + 30 * Math.cos(rad)} ${200 - 30 * Math.sin(rad)}`} fill="none" stroke="rgba(255,255,255,0.2)" />
          <text x="50" y="185" fill="#9ca3af" fontSize="12">{angle}°</text>
        </svg>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="formula-box rounded-xl p-4">
          <p className="text-gray-400 text-xs uppercase mb-1">{t('unit3.forceDownSlope')}</p>
          <p className="text-xl font-space font-bold text-brand-cyan">{forceDown.toFixed(2)} N</p>
        </div>
        <div className="formula-box rounded-xl p-4">
          <p className="text-gray-400 text-xs uppercase mb-1">{t('unit3.maxFriction')}</p>
          <p className="text-xl font-space font-bold text-brand-amber">{maxStatic.toFixed(2)} N</p>
        </div>
      </div>

      <div className={`mt-3 p-3 rounded-xl text-center font-bold ${sliding ? 'bg-brand-rose/15 text-brand-rose' : 'bg-brand-lime/15 text-brand-lime'}`}>
        {sliding ? t('unit3.blockSliding') : t('unit3.blockStill')}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   8. CIRCULAR MOTION — Ball on String
   ═══════════════════════════════════════════════════════════ */
function CircularMotionSim() {
  const t = useT();
  const [speed, setSpeed] = useState(3);
  const [radius, setRadius] = useState(2.5);
  const [mass, setMass] = useState(2);

  const fc = (mass * speed * speed) / radius;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const r = Math.min(radius * 25, 90);

    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(124,58,237,0.2)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#7c3aed';
    ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();

    const tVal = Date.now() * 0.002 * (speed / 3);
    const bx = cx + Math.cos(tVal) * r;
    const by = cy + Math.sin(tVal) * r;

    ctx.strokeStyle = '#a78bfa';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(bx, by); ctx.stroke();

    ctx.fillStyle = '#06b6d4';
    ctx.beginPath(); ctx.arc(bx, by, 12, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 10px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText('m', bx, by + 4);

    const angle = Math.atan2(by - cy, bx - cx);
    const fx = cx + Math.cos(angle) * (r + 30);
    const fy = cy + Math.sin(angle) * (r + 30);
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(bx + Math.cos(angle) * 15, by + Math.sin(angle) * 15);
    ctx.lineTo(fx, fy);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(fx - 8 * Math.cos(angle - 0.3), fy - 8 * Math.sin(angle - 0.3));
    ctx.lineTo(fx, fy);
    ctx.lineTo(fx - 8 * Math.cos(angle + 0.3), fy - 8 * Math.sin(angle + 0.3));
    ctx.stroke();

    ctx.fillStyle = '#f43f5e';
    ctx.font = 'bold 11px Poppins';
    ctx.fillText('Fc', fx + 15, fy);
  }, [speed, radius, mass]);

  useEffect(() => {
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(radius * 25, 90);

      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(124,58,237,0.2)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#7c3aed';
      ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();

      const tVal = Date.now() * 0.002 * (speed / 3);
      const bx = cx + Math.cos(tVal) * r;
      const by = cy + Math.sin(tVal) * r;

      ctx.strokeStyle = '#a78bfa';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(bx, by); ctx.stroke();

      ctx.fillStyle = '#06b6d4';
      ctx.beginPath(); ctx.arc(bx, by, 12, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 10px Poppins';
      ctx.textAlign = 'center';
      ctx.fillText('m', bx, by + 4);

      const angle = Math.atan2(by - cy, bx - cx);
      const fx = cx + Math.cos(angle) * (r + 30);
      const fy = cy + Math.sin(angle) * (r + 30);
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(bx + Math.cos(angle) * 15, by + Math.sin(angle) * 15);
      ctx.lineTo(fx, fy);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(fx - 8 * Math.cos(angle - 0.3), fy - 8 * Math.sin(angle - 0.3));
      ctx.lineTo(fx, fy);
      ctx.lineTo(fx - 8 * Math.cos(angle + 0.3), fy - 8 * Math.sin(angle + 0.3));
      ctx.stroke();

      ctx.fillStyle = '#f43f5e';
      ctx.font = 'bold 11px Poppins';
      ctx.fillText('Fc', fx + 15, fy);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [speed, radius]);

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-gray-400 text-sm block mb-2">{t('unit3.speedMs').replace('{speed}', String(speed))}</label>
          <input type="range" min="1" max="10" step="0.5" value={speed} onChange={e => setSpeed(Number(e.target.value))} className="w-full accent-brand-cyan" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">{t('unit3.radiusM').replace('{radius}', String(radius))}</label>
          <input type="range" min="1" max="5" step="0.5" value={radius} onChange={e => setRadius(Number(e.target.value))} className="w-full accent-brand-pink" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">{t('unit3.massKgLabel').replace('{mass}', String(mass))}</label>
          <input type="range" min="1" max="10" value={mass} onChange={e => setMass(Number(e.target.value))} className="w-full accent-brand-amber" />
        </div>
      </div>

      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={300} height={220} className="w-full" style={{ maxWidth: 300, margin: '0 auto', display: 'block' }} />
      </div>

      <div className="formula-box rounded-2xl p-5 text-center">
        <p className="text-gray-400 text-xs uppercase mb-2">{t('unit3.centripetalTitle')}</p>
        <p className="text-2xl font-space font-bold text-white">Fc = mv²/r = {mass}×{speed}²/{radius} = <span className="text-brand-rose">{fc.toFixed(1)} N</span></p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN UNIT 3 CONTENT
   ═══════════════════════════════════════════════════════════ */
export default function Unit3Content() {
  const t = useT();

  return (
    <div>
      {/* 1. FORCE */}
      <Section title={t('unit3.force')} icon={<Zap size={24} />} color="brand-cyan">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit3.forceDef') }} />
          <p className="text-brand-cyan font-space font-bold text-2xl mt-4">{t('unit3.forceUnit')}</p>
        </div>

        <h4 className="text-lg font-bold text-white mb-4">{t('unit3.effectsTitle')}</h4>
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-cyan font-bold mb-1">{t('unit3.effectSpeed')}</p>
            <p className="text-gray-400 text-sm">{t('unit3.effectSpeedDesc')}</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-pink font-bold mb-1">{t('unit3.effectDir')}</p>
            <p className="text-gray-400 text-sm">{t('unit3.effectDirDesc')}</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-amber font-bold mb-1">{t('unit3.effectShape')}</p>
            <p className="text-gray-400 text-sm">{t('unit3.effectShapeDesc')}</p>
          </div>
        </div>

        <h4 className="text-lg font-bold text-white mb-4">{t('unit3.pushPullSim')}</h4>
        <PushPullSim />
      </Section>

      {/* 2. NEWTON'S FIRST LAW */}
      <Section title={t('unit3.newton1')} icon={<CircleDot size={24} />} color="brand-purple">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit3.firstLawDef') }} />
        </div>

        <h4 className="text-lg font-bold text-white mb-4">{t('unit3.realExamples')}</h4>
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-cyan font-bold mb-1">{t('unit3.ex1Title')}</p>
            <p className="text-gray-400 text-sm">{t('unit3.ex1Desc')}</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-pink font-bold mb-1">{t('unit3.ex2Title')}</p>
            <p className="text-gray-400 text-sm">{t('unit3.ex2Desc')}</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-amber font-bold mb-1">{t('unit3.ex3Title')}</p>
            <p className="text-gray-400 text-sm">{t('unit3.ex3Desc')}</p>
          </div>
        </div>

        <h4 className="text-lg font-bold text-white mb-4">{t('unit3.coinCardExp')}</h4>
        <CoinCardExperiment />
      </Section>

      {/* 3. NEWTON'S SECOND LAW */}
      <Section title={t('unit3.newton2')} icon={<Gauge size={24} />} color="brand-pink">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit3.secondLawDef') }} />
        </div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit3.fmaCalc')}</h4>
        <FmaCalculator />
      </Section>

      {/* 4. NEWTON'S THIRD LAW */}
      <Section title={t('unit3.newton3')} icon={<ArrowLeftRight size={24} />} color="brand-amber">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit3.thirdLawDef') }} />
          <p className="text-brand-amber font-space font-bold text-xl mt-3">{t('unit3.actionReaction')}</p>
        </div>

        <h4 className="text-lg font-bold text-white mb-4">{t('unit3.arGame')}</h4>
        <ActionReactionGame />
      </Section>

      {/* 5. MASS AND WEIGHT */}
      <Section title={t('unit3.massWeight')} icon={<Scale size={24} />} color="brand-rose">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="glass-card rounded-2xl p-5">
            <h4 className="text-brand-cyan font-bold text-lg mb-2">{t('unit3.massTitle')}</h4>
            <p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit3.massDesc') }} />
            <p className="text-brand-cyan font-space font-bold text-xl mt-2">{t('unit3.massUnitLabel')}</p>
          </div>
          <div className="glass-card rounded-2xl p-5">
            <h4 className="text-brand-pink font-bold text-lg mb-2">{t('unit3.weightTitle')}</h4>
            <p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit3.weightDesc') }} />
            <p className="text-brand-pink font-space font-bold text-xl mt-2">{t('unit3.weightUnitLabel')}</p>
          </div>
        </div>
        <div className="formula-box rounded-2xl p-5 mb-6 text-center">
          <p className="text-2xl font-space font-bold text-white">{t('unit3.weightFormula')}</p>
          <p className="text-gray-400 text-sm mt-2">{t('unit3.whereG')}</p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit3.weightCalc')}</h4>
        <WeightCalculator />
      </Section>

      {/* 6. MOMENTUM */}
      <Section title={t('unit3.momentum')} icon={<Car size={24} />} color="brand-lime">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit3.momentumDef') }} />
        </div>
        <div className="formula-box rounded-2xl p-6 text-center mb-6">
          <p className="text-3xl font-space font-black text-white">p = <span className="text-brand-cyan">m</span> × <span className="text-brand-pink">v</span></p>
          <div className="flex justify-center gap-6 mt-3 text-sm">
            <span className="text-brand-lime">p = momentum (kg·m/s)</span>
            <span className="text-brand-cyan">m = mass (kg)</span>
            <span className="text-brand-pink">v = velocity (m/s)</span>
          </div>
        </div>
        <div className="glass-card rounded-xl p-4 mb-6">
          <p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit3.momentumRelation') }} />
          <p className="text-brand-amber font-space font-bold mt-1">F = Δp / Δt</p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit3.collisionSim')}</h4>
        <CollisionSim />
      </Section>

      {/* 7. FRICTION */}
      <Section title={t('unit3.friction')} icon={<Flame size={24} />} color="brand-teal">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit3.frictionDef') }} />
        </div>

        <h4 className="text-lg font-bold text-white mb-4">{t('unit3.frictionTypes')}</h4>
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-cyan font-bold mb-1">{t('unit3.staticFriction')}</p>
            <p className="text-gray-400 text-sm">{t('unit3.staticFrictionDesc')}</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-pink font-bold mb-1">{t('unit3.slidingFriction')}</p>
            <p className="text-gray-400 text-sm">{t('unit3.slidingFrictionDesc')}</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-amber font-bold mb-1">{t('unit3.rollingFriction')}</p>
            <p className="text-gray-400 text-sm">{t('unit3.rollingFrictionDesc')}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="definition-highlight rounded-xl p-4">
            <p className="text-brand-lime font-bold mb-1">{t('unit3.advantages')}</p>
            <p className="text-gray-300 text-sm">{t('unit3.advantagesDesc')}</p>
          </div>
          <div className="definition-highlight rounded-xl p-4" style={{ borderLeftColor: '#f43f5e' }}>
            <p className="text-brand-rose font-bold mb-1">{t('unit3.disadvantages')}</p>
            <p className="text-gray-300 text-sm">{t('unit3.disadvantagesDesc')}</p>
          </div>
        </div>

        <h4 className="text-lg font-bold text-white mb-4">{t('unit3.slopeSim')}</h4>
        <FrictionSlopeSim />
      </Section>

      {/* 8. CIRCULAR MOTION */}
      <Section title={t('unit3.circular')} icon={<Globe size={24} />} color="brand-purple">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit3.circularDef') }} />
        </div>
        <div className="formula-box rounded-2xl p-6 text-center mb-6">
          <p className="text-3xl font-space font-black text-white">Fc = <span className="text-brand-cyan">mv²</span> / <span className="text-brand-pink">r</span></p>
          <div className="flex justify-center gap-6 mt-3 text-sm flex-wrap">
            <span className="text-brand-purple">Fc = centripetal force (N)</span>
            <span className="text-brand-cyan">m = mass (kg)</span>
            <span className="text-brand-pink">v = velocity (m/s)</span>
            <span className="text-brand-amber">r = radius (m)</span>
          </div>
        </div>

        <h4 className="text-lg font-bold text-white mb-4">Examples:</h4>
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-cyan font-bold mb-1">{t('unit3.satellite')}</p>
            <p className="text-gray-400 text-sm">{t('unit3.satelliteDesc')}</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-pink font-bold mb-1">{t('unit3.carTurning')}</p>
            <p className="text-gray-400 text-sm">{t('unit3.carTurningDesc')}</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-amber font-bold mb-1">{t('unit3.ballString')}</p>
            <p className="text-gray-400 text-sm">{t('unit3.ballStringDesc')}</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-lime font-bold mb-1">{t('unit3.planets')}</p>
            <p className="text-gray-400 text-sm">{t('unit3.planetsDesc')}</p>
          </div>
        </div>

        <h4 className="text-lg font-bold text-white mb-4">{t('unit3.ballSim')}</h4>
        <CircularMotionSim />
      </Section>

      {/* Quick Summary */}
      <div className="unit-detail-reveal glass-card-strong rounded-3xl p-8 md:p-12 text-center mb-16" style={{ opacity: 0, transform: 'translateY(60px)' }}>
        <h3 className="text-2xl md:text-3xl font-black text-white mb-6">{t('unit3.summary')}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-start">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-cyan font-bold text-sm mb-1">{t('unit3.sumNewton1')}</p>
            <p className="text-gray-400 text-xs">{t('unit3.sumNewton1Desc')}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-pink font-bold text-sm mb-1">{t('unit3.sumNewton2')}</p>
            <p className="text-gray-400 text-xs">{t('unit3.sumNewton2Desc')}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-amber font-bold text-sm mb-1">{t('unit3.sumNewton3')}</p>
            <p className="text-gray-400 text-xs">{t('unit3.sumNewton3Desc')}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-lime font-bold text-sm mb-1">{t('unit3.sumKeyFormulas')}</p>
            <p className="text-gray-400 text-xs">{t('unit3.sumKeyFormulasDesc')}</p>
          </div>
        </div>
      </div>

      {/* MCQ Quiz */}
      <UnitQuiz
        unitId="class-ix-unit-3"
        questions={[
          { id: 'q1', question: t('unit3.quiz.q1'), options: [t('unit3.quiz.q1.opt1'), t('unit3.quiz.q1.opt2'), t('unit3.quiz.q1.opt3'), t('unit3.quiz.q1.opt4')], correctIndex: 1 },
          { id: 'q2', question: t('unit3.quiz.q2'), options: [t('unit3.quiz.q2.opt1'), t('unit3.quiz.q2.opt2'), t('unit3.quiz.q2.opt3'), t('unit3.quiz.q2.opt4')], correctIndex: 1 },
          { id: 'q3', question: t('unit3.quiz.q3'), options: [t('unit3.quiz.q3.opt1'), t('unit3.quiz.q3.opt2'), t('unit3.quiz.q3.opt3'), t('unit3.quiz.q3.opt4')], correctIndex: 2 },
          { id: 'q4', question: t('unit3.quiz.q4'), options: [t('unit3.quiz.q4.opt1'), t('unit3.quiz.q4.opt2'), t('unit3.quiz.q4.opt3'), t('unit3.quiz.q4.opt4')], correctIndex: 1 },
          { id: 'q5', question: t('unit3.quiz.q5'), options: [t('unit3.quiz.q5.opt1'), t('unit3.quiz.q5.opt2'), t('unit3.quiz.q5.opt3'), t('unit3.quiz.q5.opt4')], correctIndex: 1 },
        ]}
        onComplete={() => {}}
      />
    </div>
  );
}
