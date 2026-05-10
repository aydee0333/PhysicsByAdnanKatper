import { useState, useEffect, useRef } from 'react';
import {
  Zap, CircleDot, Gauge, ArrowLeftRight, Scale,
  RotateCcw, Car, Globe, Flame
} from 'lucide-react';

/* ─────────── SECTION WRAPPER ─────────── */
function Section({ title, icon, children, color = 'brand-cyan' }: { title: string; icon: React.ReactNode; children: React.ReactNode; color?: string }) {
  const colorClasses: Record<string, { bg: string; text: string }> = {
    'brand-cyan': { bg: 'bg-[#06b6d4]/20', text: 'text-[#06b6d4]' },
    'brand-purple': { bg: 'bg-[#7c3aed]/20', text: 'text-[#7c3aed]' },
    'brand-pink': { bg: 'bg-[#ec4899]/20', text: 'text-[#ec4899]' },
    'brand-amber': { bg: 'bg-[#f59e0b]/20', text: 'text-[#f59e0b]' },
    'brand-rose': { bg: 'bg-[#f43f5e]/20', text: 'text-[#f43f5e]' },
    'brand-lime': { bg: 'bg-[#84cc16]/20', text: 'text-[#84cc16]' },
    'brand-teal': { bg: 'bg-[#14b8a6]/20', text: 'text-[#14b8a6]' },
  };
  const c = colorClasses[color] || colorClasses['brand-cyan'];
  return (
    <div className="unit-detail-reveal mb-16" style={{ opacity: 0, transform: 'translateY(60px)' }}>
      <div className="glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden">
        <div className="flex items-center gap-4 mb-8">
          <div className={`w-12 h-12 rounded-2xl ${c.bg} flex items-center justify-center ${c.text}`}>
            {icon}
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   1. FORCE — Push/Pull Simulator
   ═══════════════════════════════════════════════════════════ */
function PushPullSim() {
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

    // Ground
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fillRect(0, h - 50, w, 40);

    // Box position based on force
    const boxX = 80 + (force / 100) * (w - 200);
    const boxY = h - 95;

    // Arrow showing force direction
    if (force > 0) {
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(boxX - 60, boxY + 20);
      ctx.lineTo(boxX - 10, boxY + 20);
      ctx.stroke();
      // Arrowhead
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

    // Box
    ctx.fillStyle = '#7c3aed';
    ctx.fillRect(boxX, boxY, 60, 50);
    ctx.strokeStyle = '#a78bfa';
    ctx.lineWidth = 2;
    ctx.strokeRect(boxX, boxY, 60, 50);

    // Box label
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText('BOX', boxX + 30, boxY + 30);

    // Speed indicator
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
        <label className="text-gray-400 text-sm block mb-2">Push Force: {force} N</label>
        <input type="range" min="0" max="100" value={force} onChange={e => setForce(Number(e.target.value))} className="w-full accent-brand-cyan" />
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={600} height={160} className="w-full" style={{ maxWidth: 600, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="glass-card rounded-xl p-3 text-center">
          <p className="text-brand-cyan text-xs uppercase">Speed Change</p>
          <p className="text-white text-sm font-semibold">{force > 0 ? 'Accelerating' : 'At rest'}</p>
        </div>
        <div className="glass-card rounded-xl p-3 text-center">
          <p className="text-brand-pink text-xs uppercase">Direction</p>
          <p className="text-white text-sm font-semibold">Forward →</p>
        </div>
        <div className="glass-card rounded-xl p-3 text-center">
          <p className="text-brand-amber text-xs uppercase">Shape</p>
          <p className="text-white text-sm font-semibold">No change</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   2. NEWTON'S FIRST LAW — Coin & Card Experiment
   ═══════════════════════════════════════════════════════════ */
function CoinCardExperiment() {
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

    // Glass
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 30, h - 40);
    ctx.lineTo(w / 2 - 30, h - 100);
    ctx.lineTo(w / 2 + 30, h - 100);
    ctx.lineTo(w / 2 + 30, h - 40);
    ctx.stroke();

    // Card position
    const cardX = pulled ? w / 2 + 100 : w / 2;
    const cardY = h - 105;

    // Card
    ctx.fillStyle = pulled ? 'rgba(245,158,11,0.3)' : 'rgba(245,158,11,0.6)';
    ctx.fillRect(cardX - 50, cardY, 100, 8);

    // Coin
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
      // Coin in glass
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(w / 2, h - 55, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 10px Poppins';
      ctx.textAlign = 'center';
      ctx.fillText('₹', w / 2, h - 51);
    }

    // Labels
    ctx.fillStyle = '#9ca3af';
    ctx.font = '12px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText('Glass', w / 2, h - 10);
    if (pulled && coinDropped) {
      ctx.fillStyle = '#84cc16';
      ctx.font = 'bold 14px Poppins';
      ctx.fillText('Coin dropped due to INERTIA!', w / 2, 30);
    }

  }, [pulled, coinDropped]);

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
          Pull Card Quickly!
        </button>
        <button onClick={reset} className="glass-card px-4 py-2 rounded-xl text-gray-400 text-sm hover:text-white flex items-center gap-2">
          <RotateCcw size={14} /> Reset
        </button>
      </div>
      <div className="mt-4 p-4 bg-white/5 rounded-xl">
        <p className="text-gray-300 text-sm"><strong className="text-brand-amber">Why?</strong> The coin has <strong className="text-white">inertia</strong> — it wants to stay at rest. When the card is pulled quickly, the coin doesn't move with it and falls straight down into the glass!</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   3. NEWTON'S SECOND LAW — F = ma Calculator
   ═══════════════════════════════════════════════════════════ */
function FmaCalculator() {
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
          <label className="text-gray-400 text-sm block mb-2">Mass (kg): {mass}</label>
          <input type="range" min="1" max="50" value={mass} onChange={e => setMass(Number(e.target.value))} className="w-full accent-brand-cyan" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">Acceleration (m/s²): {acceleration}</label>
          <input type="range" min="0.5" max="10" step="0.5" value={acceleration} onChange={e => setAcceleration(Number(e.target.value))} className="w-full accent-brand-amber" />
        </div>
      </div>

      <div className="formula-box rounded-2xl p-6 text-center">
        <p className="text-gray-400 text-xs uppercase mb-2">Calculated Force</p>
        <p className="text-4xl font-space font-bold text-brand-cyan">F = {mass} × {acceleration} = <span className="text-white">{force} N</span></p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mt-4">
        <div className="glass-card rounded-xl p-4">
          <p className="text-brand-lime text-xs uppercase mb-1">More Force →</p>
          <p className="text-white text-sm">More acceleration (same mass)</p>
        </div>
        <div className="glass-card rounded-xl p-4">
          <p className="text-brand-rose text-xs uppercase mb-1">More Mass →</p>
          <p className="text-white text-sm">Less acceleration (same force)</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   4. NEWTON'S THIRD LAW — Action-Reaction Pairs
   ═══════════════════════════════════════════════════════════ */
function ActionReactionGame() {
  const [pairs, setPairs] = useState([
    { id: 1, action: 'Rocket pushes exhaust DOWN', reaction: 'Exhaust pushes rocket UP', matched: false },
    { id: 2, action: 'Foot pushes ground BACKWARD', reaction: 'Ground pushes foot FORWARD', matched: false },
    { id: 3, action: 'Gun pushes bullet FORWARD', reaction: 'Bullet pushes gun BACKWARD (recoil)', matched: false },
    { id: 4, action: 'Hands push water BACKWARD', reaction: 'Water pushes swimmer FORWARD', matched: false },
  ]);
  const [selectedAction, setSelectedAction] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const selectAction = (id: number) => {
    setSelectedAction(id);
    setMessage('');
  };

  const selectReaction = (id: number) => {
    if (selectedAction === null) {
      setMessage('Select an action first!');
      return;
    }
    if (selectedAction === id) {
      setPairs(prev => prev.map(p => p.id === id ? { ...p, matched: true } : p));
      setMessage('✅ Correct pair!');
      setSelectedAction(null);
    } else {
      setMessage('❌ Wrong pair! Try again.');
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
        {/* Actions */}
        <div>
          <p className="text-brand-cyan font-bold text-sm mb-3">👆 Actions (Click one):</p>
          <div className="space-y-2">
            {pairs.map(p => (
              <button
                key={`a-${p.id}`}
                onClick={() => !p.matched && selectAction(p.id)}
                disabled={p.matched}
                className={`w-full p-3 rounded-xl text-sm text-left transition-all ${
                  p.matched ? 'bg-brand-lime/15 text-brand-lime border border-brand-lime/30' :
                  selectedAction === p.id ? 'bg-brand-cyan/20 text-brand-cyan border-2 border-brand-cyan/60' :
                  'glass-card text-gray-300 hover:bg-white/5'
                }`}
              >
                {p.action} {p.matched && '✓'}
              </button>
            ))}
          </div>
        </div>
        {/* Reactions */}
        <div>
          <p className="text-brand-pink font-bold text-sm mb-3">👇 Reactions (Match the action):</p>
          <div className="space-y-2">
            {pairs.map(p => (
              <button
                key={`r-${p.id}`}
                onClick={() => !p.matched && selectReaction(p.id)}
                disabled={p.matched}
                className={`w-full p-3 rounded-xl text-sm text-left transition-all ${
                  p.matched ? 'bg-brand-lime/15 text-brand-lime border border-brand-lime/30' :
                  'glass-card text-gray-300 hover:bg-white/5'
                }`}
              >
                {p.reaction} {p.matched && '✓'}
              </button>
            ))}
          </div>
        </div>
      </div>
      {message && <p className={`text-center font-bold ${message.includes('✅') ? 'text-brand-lime' : 'text-brand-rose'}`}>{message}</p>}
      {allMatched && <p className="text-brand-lime font-bold text-center text-xl mt-3">🎉 All pairs matched!</p>}
      <button onClick={reset} className="mt-3 mx-auto block text-xs text-gray-500 hover:text-white flex items-center gap-1">
        <RotateCcw size={12} /> Reset
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   5. MASS AND WEIGHT — Calculator
   ═══════════════════════════════════════════════════════════ */
function WeightCalculator() {
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
          <label className="text-gray-400 text-sm block mb-2">Mass (kg): {mass}</label>
          <input type="range" min="1" max="100" value={mass} onChange={e => setMass(Number(e.target.value))} className="w-full accent-brand-cyan" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">Celestial Body</label>
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
        <p className="text-gray-400 text-xs uppercase mb-2">W = m × g</p>
        <p className="text-3xl font-space font-bold text-white">
          Weight = {mass} × {selected.g} = <span className={selected.color}>{weight.toFixed(1)} N</span>
        </p>
        <p className="text-gray-500 text-sm mt-2">On {selected.name}</p>
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
          <label className="text-gray-400 text-xs block mb-1">Cart 1 Mass (kg)</label>
          <input type="number" value={m1} onChange={e => setM1(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-cyan/50" />
        </div>
        <div>
          <label className="text-gray-400 text-xs block mb-1">Cart 2 Mass (kg)</label>
          <input type="number" value={m2} onChange={e => setM2(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-pink/50" />
        </div>
        <div>
          <label className="text-gray-400 text-xs block mb-1">Cart 1 Velocity (m/s)</label>
          <input type="number" value={v1} onChange={e => setV1(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-amber/50" />
        </div>
        <div>
          <label className="text-gray-400 text-xs block mb-1">Cart 2 Velocity (m/s)</label>
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
          <p className="text-gray-400 text-xs uppercase mb-1">Total Momentum</p>
          <p className="text-xl font-space font-bold text-brand-amber">{totalP} kg·m/s</p>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-4">
        <p className="text-gray-300 text-sm"><strong className="text-brand-lime">Law of Conservation:</strong> In any collision, the <strong className="text-white">total momentum before = total momentum after</strong>. Momentum is never lost, only transferred!</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   7. FRICTION — Slope Simulator
   ═══════════════════════════════════════════════════════════ */
function FrictionSlopeSim() {
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
          <label className="text-gray-400 text-sm block mb-2">Slope Angle: {angle}°</label>
          <input type="range" min="0" max="60" value={angle} onChange={e => setAngle(Number(e.target.value))} className="w-full accent-brand-amber" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">Surface Type</label>
          <div className="flex gap-2">
            <button onClick={() => setSurface('smooth')} className={`flex-1 py-2 rounded-xl text-sm font-semibold ${surface === 'smooth' ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : 'glass-card text-gray-400'}`}>
              Smooth (μ = 0.2)
            </button>
            <button onClick={() => setSurface('rough')} className={`flex-1 py-2 rounded-xl text-sm font-semibold ${surface === 'rough' ? 'bg-brand-amber/20 text-brand-amber border border-brand-amber/30' : 'glass-card text-gray-400'}`}>
              Rough (μ = 0.6)
            </button>
          </div>
        </div>
      </div>

      {/* Visual slope */}
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 relative overflow-hidden mb-4" style={{ height: 200 }}>
        <svg width="100%" height="100%" viewBox="0 0 400 200">
          {/* Slope triangle */}
          <polygon
            points={`0,200 ${400 * Math.cos(rad)},200 0,${200 - 400 * Math.sin(rad)}`}
            fill="rgba(255,255,255,0.03)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          {/* Block */}
          <g transform={`translate(${30 * Math.cos(rad) + 10}, ${200 - 30 * Math.sin(rad) - 25}) rotate(-${angle})`}>
            <rect x="0" y="0" width="30" height="25" fill={sliding ? '#f43f5e' : '#84cc16'} rx="3" />
            <text x="15" y="17" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">BOX</text>
          </g>
          {/* Angle arc */}
          <path d={`M 30 200 A 30 30 0 0 0 ${30 + 30 * Math.cos(rad)} ${200 - 30 * Math.sin(rad)}`} fill="none" stroke="rgba(255,255,255,0.2)" />
          <text x="50" y="185" fill="#9ca3af" fontSize="12">{angle}°</text>
        </svg>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="formula-box rounded-xl p-4">
          <p className="text-gray-400 text-xs uppercase mb-1">Force Down Slope</p>
          <p className="text-xl font-space font-bold text-brand-cyan">{forceDown.toFixed(2)} N</p>
        </div>
        <div className="formula-box rounded-xl p-4">
          <p className="text-gray-400 text-xs uppercase mb-1">Max Friction Force</p>
          <p className="text-xl font-space font-bold text-brand-amber">{maxStatic.toFixed(2)} N</p>
        </div>
      </div>

      <div className={`mt-3 p-3 rounded-xl text-center font-bold ${sliding ? 'bg-brand-rose/15 text-brand-rose' : 'bg-brand-lime/15 text-brand-lime'}`}>
        {sliding ? '⚠️ Block is SLIDING down!' : '✅ Block stays STILL (static friction holds it)'}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   8. CIRCULAR MOTION — Ball on String
   ═══════════════════════════════════════════════════════════ */
function CircularMotionSim() {
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

    // Orbit path
    ctx.strokeStyle = 'rgba(124,58,237,0.2)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    ctx.setLineDash([]);

    // Center point
    ctx.fillStyle = '#7c3aed';
    ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();

    // Ball position (rotating)
    const t = Date.now() * 0.002 * (speed / 3);
    const bx = cx + Math.cos(t) * r;
    const by = cy + Math.sin(t) * r;

    // String
    ctx.strokeStyle = '#a78bfa';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(bx, by); ctx.stroke();

    // Ball
    ctx.fillStyle = '#06b6d4';
    ctx.beginPath(); ctx.arc(bx, by, 12, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 10px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText('m', bx, by + 4);

    // Centripetal force arrow
    const angle = Math.atan2(by - cy, bx - cx);
    const fx = cx + Math.cos(angle) * (r + 30);
    const fy = cy + Math.sin(angle) * (r + 30);
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(bx + Math.cos(angle) * 15, by + Math.sin(angle) * 15);
    ctx.lineTo(fx, fy);
    ctx.stroke();
    // Arrowhead
    ctx.beginPath();
    ctx.moveTo(fx - 8 * Math.cos(angle - 0.3), fy - 8 * Math.sin(angle - 0.3));
    ctx.lineTo(fx, fy);
    ctx.lineTo(fx - 8 * Math.cos(angle + 0.3), fy - 8 * Math.sin(angle + 0.3));
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#f43f5e';
    ctx.font = 'bold 11px Poppins';
    ctx.fillText('Fc', fx + 15, fy);

  }, [speed, radius, mass]);

  // Animate
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

      const t = Date.now() * 0.002 * (speed / 3);
      const bx = cx + Math.cos(t) * r;
      const by = cy + Math.sin(t) * r;

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
          <label className="text-gray-400 text-sm block mb-2">Speed (m/s): {speed}</label>
          <input type="range" min="1" max="10" step="0.5" value={speed} onChange={e => setSpeed(Number(e.target.value))} className="w-full accent-brand-cyan" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">Radius (m): {radius}</label>
          <input type="range" min="1" max="5" step="0.5" value={radius} onChange={e => setRadius(Number(e.target.value))} className="w-full accent-brand-pink" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">Mass (kg): {mass}</label>
          <input type="range" min="1" max="10" value={mass} onChange={e => setMass(Number(e.target.value))} className="w-full accent-brand-amber" />
        </div>
      </div>

      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={300} height={220} className="w-full" style={{ maxWidth: 300, margin: '0 auto', display: 'block' }} />
      </div>

      <div className="formula-box rounded-2xl p-5 text-center">
        <p className="text-gray-400 text-xs uppercase mb-2">Centripetal Force Formula</p>
        <p className="text-2xl font-space font-bold text-white">Fc = mv²/r = {mass}×{speed}²/{radius} = <span className="text-brand-rose">{fc.toFixed(1)} N</span></p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN UNIT 3 CONTENT
   ═══════════════════════════════════════════════════════════ */
export default function Unit3Content() {
  return (
    <div>
      {/* 1. FORCE */}
      <Section title="Force" icon={<Zap size={24} />} color="brand-cyan">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed">
            <strong className="text-brand-cyan">Force</strong> is a <strong>push or pull</strong> that can change the state of motion or shape of an object. It is a <strong className="text-brand-pink">vector quantity</strong> (has direction).
          </p>
          <p className="text-brand-cyan font-space font-bold text-2xl mt-4">Unit: Newton (N)</p>
        </div>

        <h4 className="text-lg font-bold text-white mb-4">Effects of Force:</h4>
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-cyan font-bold mb-1">🚀 Change Speed</p>
            <p className="text-gray-400 text-sm">Can make object speed up or slow down</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-pink font-bold mb-1">↩️ Change Direction</p>
            <p className="text-gray-400 text-sm">Can turn the object to a new path</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-amber font-bold mb-1">🫳 Change Shape</p>
            <p className="text-gray-400 text-sm">Can squeeze, stretch, or bend objects</p>
          </div>
        </div>

        <h4 className="text-lg font-bold text-white mb-4">🎮 Push/Pull Simulator</h4>
        <PushPullSim />
      </Section>

      {/* 2. NEWTON'S FIRST LAW */}
      <Section title="Newton's First Law (Law of Inertia)" icon={<CircleDot size={24} />} color="brand-purple">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed">
            An object remains in its state of <strong className="text-brand-cyan">rest</strong> or <strong className="text-brand-cyan">uniform motion</strong> unless acted upon by an <strong className="text-brand-rose">external force</strong>.
          </p>
        </div>

        <h4 className="text-lg font-bold text-white mb-4">Real Examples from Pakistan:</h4>
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-cyan font-bold mb-1">🚗 Seatbelt</p>
            <p className="text-gray-400 text-sm">When a car stops suddenly, your body wants to keep moving forward. The seatbelt stops you!</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-pink font-bold mb-1">🪙 Coin on Card</p>
            <p className="text-gray-400 text-sm">Coin stays still when card is pulled quickly — coin has inertia!</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-amber font-bold mb-1">🍽️ Tablecloth Trick</p>
            <p className="text-gray-400 text-sm">Pull cloth fast — dishes stay on table due to inertia!</p>
          </div>
        </div>

        <h4 className="text-lg font-bold text-white mb-4">🎮 Coin & Card Experiment</h4>
        <CoinCardExperiment />
      </Section>

      {/* 3. NEWTON'S SECOND LAW */}
      <Section title="Newton's Second Law" icon={<Gauge size={24} />} color="brand-pink">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed">
            <strong className="text-brand-pink">Force equals mass times acceleration</strong> (F = ma).
          </p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 F = ma Calculator</h4>
        <FmaCalculator />
      </Section>

      {/* 4. NEWTON'S THIRD LAW */}
      <Section title="Newton's Third Law" icon={<ArrowLeftRight size={24} />} color="brand-amber">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed">
            For every <strong className="text-brand-cyan">action</strong>, there is an <strong className="text-brand-pink">equal and opposite reaction</strong>.
          </p>
          <p className="text-brand-amber font-space font-bold text-xl mt-3">Action = −Reaction</p>
        </div>

        <h4 className="text-lg font-bold text-white mb-4">🎮 Action-Reaction Pairs</h4>
        <ActionReactionGame />
      </Section>

      {/* 5. MASS AND WEIGHT */}
      <Section title="Mass and Weight" icon={<Scale size={24} />} color="brand-rose">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="glass-card rounded-2xl p-5">
            <h4 className="text-brand-cyan font-bold text-lg mb-2">📦 Mass</h4>
            <p className="text-gray-300 text-sm">Quantity of matter in an object. <strong className="text-white">Never changes</strong> wherever you go.</p>
            <p className="text-brand-cyan font-space font-bold text-xl mt-2">Unit: kilogram (kg)</p>
          </div>
          <div className="glass-card rounded-2xl p-5">
            <h4 className="text-brand-pink font-bold text-lg mb-2">⚖️ Weight</h4>
            <p className="text-gray-300 text-sm">Force of gravity on mass. <strong className="text-white">Changes</strong> on different planets!</p>
            <p className="text-brand-pink font-space font-bold text-xl mt-2">Unit: Newton (N)</p>
          </div>
        </div>
        <div className="formula-box rounded-2xl p-5 mb-6 text-center">
          <p className="text-2xl font-space font-bold text-white">W = <span className="text-brand-cyan">m</span> × <span className="text-brand-amber">g</span></p>
          <p className="text-gray-400 text-sm mt-2">Where g = 9.8 m/s² on Earth</p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Weight Calculator</h4>
        <WeightCalculator />
      </Section>

      {/* 6. MOMENTUM */}
      <Section title="Momentum" icon={<Car size={24} />} color="brand-lime">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed">
            <strong className="text-brand-lime">Momentum</strong> is the quantity of motion in a body.
          </p>
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
          <p className="text-gray-300 text-sm"><strong className="text-brand-amber">Relation to Force:</strong> Force = Change in momentum / Time</p>
          <p className="text-brand-amber font-space font-bold mt-1">F = Δp / Δt</p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Collision Simulator</h4>
        <CollisionSim />
      </Section>

      {/* 7. FRICTION */}
      <Section title="Friction" icon={<Flame size={24} />} color="brand-teal">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed">
            <strong className="text-brand-teal">Friction</strong> is the force that <strong>opposes motion</strong> between two surfaces in contact.
          </p>
        </div>

        <h4 className="text-lg font-bold text-white mb-4">Types of Friction:</h4>
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-cyan font-bold mb-1">🛑 Static Friction (μs)</p>
            <p className="text-gray-400 text-sm">Prevents motion from starting. Keeps a box from sliding.</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-pink font-bold mb-1">➡️ Sliding Friction (μk)</p>
            <p className="text-gray-400 text-sm">Opposes sliding motion. Slows down a sliding book.</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-amber font-bold mb-1">⚙️ Rolling Friction (μr)</p>
            <p className="text-gray-400 text-sm">Opposes rolling motion. Much smaller than sliding!</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="definition-highlight rounded-xl p-4">
            <p className="text-brand-lime font-bold mb-1">✅ Advantages</p>
            <p className="text-gray-300 text-sm">Walking, writing, driving (grip), brakes on vehicles</p>
          </div>
          <div className="definition-highlight rounded-xl p-4" style={{ borderLeftColor: '#f43f5e' }}>
            <p className="text-brand-rose font-bold mb-1">❌ Disadvantages</p>
            <p className="text-gray-300 text-sm">Wears out machinery, heats engines, wastes energy</p>
          </div>
        </div>

        <h4 className="text-lg font-bold text-white mb-4">🎮 Slope Simulator</h4>
        <FrictionSlopeSim />
      </Section>

      {/* 8. CIRCULAR MOTION */}
      <Section title="Circular Motion" icon={<Globe size={24} />} color="brand-purple">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed">
            Motion in a circular path requires <strong className="text-brand-purple">centripetal (center-seeking) force</strong>.
          </p>
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
            <p className="text-brand-cyan font-bold mb-1">🛰️ Satellite orbiting Earth</p>
            <p className="text-gray-400 text-sm">Gravity provides the centripetal force</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-pink font-bold mb-1">🚗 Car turning on a curve</p>
            <p className="text-gray-400 text-sm">Friction between tires and road</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-amber font-bold mb-1">🪀 Ball on a string</p>
            <p className="text-gray-400 text-sm">Tension in the string pulls inward</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-lime font-bold mb-1">🌍 Planets around the Sun</p>
            <p className="text-gray-400 text-sm">Gravity keeps them in orbit</p>
          </div>
        </div>

        <h4 className="text-lg font-bold text-white mb-4">🎮 Ball on String Simulator</h4>
        <CircularMotionSim />
      </Section>

      {/* Quick Summary */}
      <div className="unit-detail-reveal glass-card-strong rounded-3xl p-8 md:p-12 text-center mb-16" style={{ opacity: 0, transform: 'translateY(60px)' }}>
        <h3 className="text-2xl md:text-3xl font-black text-white mb-6">📝 Unit 3 Quick Summary</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-cyan font-bold text-sm mb-1">Newton's 1st Law</p>
            <p className="text-gray-400 text-xs">Inertia — objects resist changes to their motion</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-pink font-bold text-sm mb-1">Newton's 2nd Law</p>
            <p className="text-gray-400 text-xs">F = ma — more force = more acceleration</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-amber font-bold text-sm mb-1">Newton's 3rd Law</p>
            <p className="text-gray-400 text-xs">Action = opposite reaction</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-lime font-bold text-sm mb-1">Key Formulas</p>
            <p className="text-gray-400 text-xs">W=mg, p=mv, Fc=mv²/r</p>
          </div>
        </div>
      </div>
    </div>
  );
}
