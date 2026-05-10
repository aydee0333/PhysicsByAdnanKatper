import { useState, useEffect, useRef } from 'react';
import {
  Move, Gauge, Zap, TrendingUp,
  RotateCcw, Ruler, Car, Target,
  CircleDot
} from 'lucide-react';

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

/* ─── MOTION TYPES CANVAS ANIMATION ─── */
function MotionTypesAnimation() {
  const [mode, setMode] = useState<'linear' | 'circular' | 'random' | 'rotatory' | 'vibratory'>('linear');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    let animId: number;
    let t = 0;

    const draw = () => {
      animId = requestAnimationFrame(draw);
      t += 0.02;
      ctx.clearRect(0, 0, w, h);

      // Grid
      ctx.strokeStyle = 'rgba(124,58,237,0.05)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < w; x += 30) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

      if (mode === 'linear') {
        const x = 60 + ((Math.sin(t) + 1) / 2) * (w - 120);
        ctx.fillStyle = 'rgba(255,255,255,0.05)'; ctx.fillRect(0, h - 60, w, 40);
        ctx.fillStyle = '#06b6d4'; ctx.fillRect(x - 35, h - 85, 70, 30);
        ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(x - 20, h - 55, 12, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(x + 20, h - 55, 12, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#06b6d4'; ctx.font = 'bold 14px Poppins'; ctx.textAlign = 'center'; ctx.fillText('Car in straight line', w / 2, 30);
      } else if (mode === 'circular') {
        const cx = w / 2, cy = h / 2, r = 60;
        ctx.strokeStyle = '#ec4899'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
        for (let i = 0; i < 8; i++) { const a = t + (i * Math.PI) / 4; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); ctx.stroke(); }
        ctx.fillStyle = '#ec4899'; ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ec4899'; ctx.font = 'bold 14px Poppins'; ctx.textAlign = 'center'; ctx.fillText('Wheel spinning', w / 2, 30);
      } else if (mode === 'random') {
        for (let i = 0; i < 15; i++) {
          const px = w / 2 + Math.sin(t * 1.3 + i * 2.5) * 80;
          const py = h / 2 + Math.cos(t * 0.7 + i * 1.8) * 50;
          ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = '#f59e0b'; ctx.font = 'bold 14px Poppins'; ctx.textAlign = 'center'; ctx.fillText('Gas particles moving randomly', w / 2, 30);
      } else if (mode === 'rotatory') {
        const cx = w / 2, cy = h / 2;
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(t);
        ctx.fillStyle = '#7c3aed'; ctx.fillRect(-40, -8, 80, 16);
        ctx.fillStyle = '#a78bfa'; ctx.beginPath(); ctx.arc(0, 0, 10, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
        ctx.fillStyle = '#7c3aed'; ctx.font = 'bold 14px Poppins'; ctx.textAlign = 'center'; ctx.fillText('Object spinning on axis', w / 2, 30);
      } else if (mode === 'vibratory') {
        const cx = w / 2, baseY = h - 40;
        const angle = Math.sin(t * 3);
        const bobX = cx + angle * 80;
        const bobY = baseY - 100 + Math.abs(angle) * 10;
        ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, baseY - 140); ctx.lineTo(bobX, bobY); ctx.stroke();
        ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(bobX, bobY, 15, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#f59e0b'; ctx.font = 'bold 14px Poppins'; ctx.textAlign = 'center'; ctx.fillText('Pendulum swinging back & forth', w / 2, 30);
      }
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [mode]);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
        {[
          { key: 'linear' as const, label: 'Linear', icon: <Car size={20} />, color: 'brand-cyan' },
          { key: 'circular' as const, label: 'Circular', icon: <CircleDot size={20} />, color: 'brand-pink' },
          { key: 'random' as const, label: 'Random', icon: <Target size={20} />, color: 'brand-amber' },
          { key: 'rotatory' as const, label: 'Rotatory', icon: <RotateCcw size={20} />, color: 'brand-purple' },
          { key: 'vibratory' as const, label: 'Vibratory', icon: <Move size={20} />, color: 'brand-rose' },
        ].map((m) => (
          <button key={m.key} onClick={() => setMode(m.key)} className={`p-3 rounded-2xl text-left transition-all ${mode === m.key ? `bg-${m.color}/15 border border-${m.color}/40` : 'glass-card hover:bg-white/5'}`}>
            <div className={`text-${m.color} mb-1`}>{m.icon}</div>
            <p className="text-white font-bold text-sm">{m.label}</p>
          </button>
        ))}
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5">
        <canvas ref={canvasRef} width={600} height={220} className="w-full" style={{ maxWidth: 600, margin: '0 auto', display: 'block' }} />
      </div>
    </div>
  );
}

/* ─── DISTANCE VS DISPLACEMENT EXPLAINER ─── */
function DistanceDisplacementExplainer() {
  const [scenario, setScenario] = useState(0);
  const scenarios = [
    { name: 'Boy to School', path: 'Home → Shop → School', distance: '500 m', displacement: '400 m East', note: 'He took a longer path but ended up 400m from home.' },
    { name: 'Circular Park', path: 'Full circle around park', distance: '628 m', displacement: '0 m', note: 'He walked a lot but ended up where he started!' },
    { name: 'Cricket Run', path: 'Run to boundary and back', distance: '160 m', displacement: '0 m', note: 'Same start and end point = zero displacement.' },
  ];

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {scenarios.map((s, i) => (
          <button key={i} onClick={() => setScenario(i)} className={`flex-1 py-2 rounded-xl text-sm font-semibold ${scenario === i ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : 'glass-card text-gray-400'}`}>
            {s.name}
          </button>
        ))}
      </div>
      <div className="glass-card rounded-2xl p-6">
        <p className="text-gray-400 text-sm mb-2">Path: <span className="text-white">{scenarios[scenario].path}</span></p>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="formula-box rounded-xl p-4 text-center">
            <p className="text-gray-400 text-xs uppercase">Distance (Total Path)</p>
            <p className="text-2xl font-space font-bold text-brand-cyan">{scenarios[scenario].distance}</p>
          </div>
          <div className="formula-box rounded-xl p-4 text-center">
            <p className="text-gray-400 text-xs uppercase">Displacement (Shortest)</p>
            <p className="text-2xl font-space font-bold text-brand-pink">{scenarios[scenario].displacement}</p>
          </div>
        </div>
        <p className="text-brand-amber text-sm">💡 {scenarios[scenario].note}</p>
      </div>
    </div>
  );
}

/* ─── SPEED VELOCITY COMPARISON ─── */
function SpeedVelocityComparison() {
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
          <p className="text-gray-300 text-sm">💡 <strong className="text-white">Key Point:</strong> Velocity includes direction! Two cars can have the same speed but different velocities if they move in opposite directions.</p>
        </div>
      )}
    </div>
  );
}

/* ─── UNIFORM vs NON-UNIFORM ─── */
function UniformMotionExplainer() {
  const [type, setType] = useState<'uniform-speed' | 'uniform-velocity' | 'uniform-acceleration'>('uniform-speed');

  const info: Record<string, { title: string; desc: string; example: string; formula: string }> = {
    'uniform-speed': { title: 'Uniform Speed', desc: 'An object covers equal distances in equal intervals of time.', example: 'A car moving at exactly 60 km/h on a straight highway.', formula: 'Speed = constant' },
    'uniform-velocity': { title: 'Uniform Velocity', desc: 'An object covers equal displacements in equal intervals of time in the SAME direction.', example: 'A train moving at 80 km/h North without changing direction.', formula: 'Velocity = constant (no acceleration)' },
    'uniform-acceleration': { title: 'Uniform Acceleration', desc: 'Velocity changes by equal amounts in equal intervals of time.', example: 'A ball falling under gravity — speed increases by 10 m/s every second.', formula: 'a = (v - u) / t = constant' },
  };

  const i = info[type];

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {(['uniform-speed', 'uniform-velocity', 'uniform-acceleration'] as const).map(t => (
          <button key={t} onClick={() => setType(t)} className={`flex-1 py-2 rounded-xl text-sm font-semibold ${type === t ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : 'glass-card text-gray-400'}`}>
            {t === 'uniform-speed' ? 'Uniform Speed' : t === 'uniform-velocity' ? 'Uniform Velocity' : 'Uniform Acceleration'}
          </button>
        ))}
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

/* ─── VECTOR REPRESENTATION ─── */
function VectorRepresentation() {
  const [magnitude, setMagnitude] = useState(50);
  const [angle, setAngle] = useState(45);

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

    ctx.clearRect(0, 0, w, h);

    // Axes
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cx, 20); ctx.lineTo(cx, h - 20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(20, cy); ctx.lineTo(w - 20, cy); ctx.stroke();

    // Labels
    ctx.fillStyle = '#9ca3af'; ctx.font = '12px Poppins'; ctx.textAlign = 'center';
    ctx.fillText('N', cx, 15); ctx.fillText('S', cx, h - 5);
    ctx.fillText('W', 15, cy + 4); ctx.fillText('E', w - 10, cy + 4);

    // Vector arrow
    const rad = (angle * Math.PI) / 180;
    const len = (magnitude / 100) * 100;
    const ex = cx + Math.cos(rad) * len;
    const ey = cy - Math.sin(rad) * len;

    ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ex, ey); ctx.stroke();

    // Arrowhead
    const headLen = 10;
    const angle2 = Math.atan2(cy - ey, cx - ex);
    ctx.beginPath(); ctx.moveTo(ex, ey);
    ctx.lineTo(ex + headLen * Math.cos(angle2 + 0.5), ey + headLen * Math.sin(angle2 + 0.5));
    ctx.lineTo(ex + headLen * Math.cos(angle2 - 0.5), ey + headLen * Math.sin(angle2 - 0.5));
    ctx.fillStyle = '#06b6d4'; ctx.fill();

    // Info
    ctx.fillStyle = '#06b6d4'; ctx.font = 'bold 14px Poppins'; ctx.textAlign = 'left';
    ctx.fillText(`Magnitude: ${magnitude} units`, 10, h - 30);
    ctx.fillText(`Direction: ${angle}° from East`, 10, h - 10);

  }, [magnitude, angle]);

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-gray-400 text-sm block mb-2">Magnitude: {magnitude}</label>
          <input type="range" min="10" max="100" value={magnitude} onChange={e => setMagnitude(Number(e.target.value))} className="w-full accent-brand-cyan" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">Angle: {angle}°</label>
          <input type="range" min="0" max="360" value={angle} onChange={e => setAngle(Number(e.target.value))} className="w-full accent-brand-amber" />
        </div>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5">
        <canvas ref={canvasRef} width={300} height={220} className="w-full" style={{ maxWidth: 300, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="glass-card rounded-xl p-4 mt-4">
        <p className="text-gray-300 text-sm">💡 <strong className="text-white">Vector</strong> has both magnitude (size) and direction. Scalar has only magnitude.</p>
      </div>
    </div>
  );
}

/* ─── DISTANCE-TIME GRAPH ─── */
function DistanceTimeGraph() {
  const [speed, setSpeed] = useState(2);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    const pad = 40;

    ctx.clearRect(0, 0, w, h);

    // Axes
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(pad, pad); ctx.lineTo(pad, h - pad); ctx.lineTo(w - pad, h - pad); ctx.stroke();

    ctx.fillStyle = '#9ca3af'; ctx.font = '12px Poppins'; ctx.textAlign = 'center';
    ctx.fillText('Time (s)', w / 2, h - 10);
    ctx.save(); ctx.translate(15, h / 2); ctx.rotate(-Math.PI / 2); ctx.fillText('Distance (m)', 0, 0); ctx.restore();

    // Line
    ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(pad, h - pad);
    for (let t = 0; t <= 10; t += 0.5) {
      const d = speed * t;
      const px = pad + (t / 10) * (w - pad * 2);
      const py = h - pad - (d / (speed * 10)) * (h - pad * 2);
      ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Slope label
    ctx.fillStyle = '#06b6d4'; ctx.font = 'bold 12px Poppins'; ctx.textAlign = 'left';
    ctx.fillText(`Slope = Speed = ${speed} m/s`, pad + 10, pad + 20);

  }, [speed]);

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">Speed (slope): {speed} m/s</label>
        <input type="range" min="0.5" max="5" step="0.5" value={speed} onChange={e => setSpeed(Number(e.target.value))} className="w-full accent-brand-cyan" />
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={400} height={280} className="w-full" style={{ maxWidth: 400, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="glass-card rounded-xl p-3">
          <p className="text-brand-cyan text-xs font-bold">📈 Straight Line</p>
          <p className="text-gray-400 text-xs">Constant speed — slope is steady</p>
        </div>
        <div className="glass-card rounded-xl p-3">
          <p className="text-brand-pink text-xs font-bold">📉 Steeper Slope</p>
          <p className="text-gray-400 text-xs">Higher speed — object moves faster</p>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN UNIT 2 CONTENT ─── */
export default function Unit2Content() {
  return (
    <div>
      {/* 1. TYPES OF MOTION */}
      <Section title="Types of Motion" icon={<Move size={24} />} color="brand-cyan">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed">
            <strong className="text-brand-cyan">Motion</strong> is the change in position of an object with time. There are different <strong>types of motion</strong> we see around us every day.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {[
            { name: 'Linear Motion', desc: 'Moving in a straight line', example: 'Car on straight road' },
            { name: 'Circular Motion', desc: 'Moving in a circle', example: 'Fan blades spinning' },
            { name: 'Random Motion', desc: 'Moving without pattern', example: 'Gas particles, dust in air' },
            { name: 'Rotatory Motion', desc: 'Spinning around an axis', example: 'Earth spinning, wheel turning' },
            { name: 'Vibratory Motion', desc: 'Back and forth movement', example: 'Pendulum, guitar string' },
          ].map((m, i) => (
            <div key={i} className="glass-card rounded-xl p-4">
              <p className="text-white font-bold text-sm mb-1">{m.name}</p>
              <p className="text-gray-400 text-xs">{m.desc}</p>
              <p className="text-brand-cyan text-xs mt-1">💡 {m.example}</p>
            </div>
          ))}
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Motion Types Animation</h4>
        <MotionTypesAnimation />
      </Section>

      {/* 2. DISTANCE & DISPLACEMENT */}
      <Section title="Distance and Displacement" icon={<Ruler size={24} />} color="brand-pink">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="glass-card rounded-2xl p-5">
            <h4 className="text-brand-cyan font-bold text-lg mb-2">📏 Distance</h4>
            <p className="text-gray-300 text-sm">Total path length traveled. It is a <strong className="text-white">scalar</strong> (only size, no direction).</p>
            <p className="text-brand-cyan font-space font-bold text-xl mt-2">Unit: meter (m)</p>
            <p className="text-gray-400 text-xs mt-2">Example: You walk 3 km to school and 3 km back. Distance = 6 km.</p>
          </div>
          <div className="glass-card rounded-2xl p-5">
            <h4 className="text-brand-pink font-bold text-lg mb-2">➡️ Displacement</h4>
            <p className="text-gray-300 text-sm">Shortest path from start to end. It is a <strong className="text-white">vector</strong> (size + direction).</p>
            <p className="text-brand-pink font-space font-bold text-xl mt-2">Unit: meter (m)</p>
            <p className="text-gray-400 text-xs mt-2">Example: You walk 3 km to school and 3 km back. Displacement = 0 km.</p>
          </div>
        </div>
        <div className="formula-box rounded-2xl p-5 mb-6 text-center">
          <p className="text-2xl font-space font-bold text-white">Displacement = Final Position − Initial Position</p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Distance vs Displacement Examples</h4>
        <DistanceDisplacementExplainer />
      </Section>

      {/* 3. SPEED & VELOCITY */}
      <Section title="Speed and Velocity" icon={<Gauge size={24} />} color="brand-amber">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="glass-card rounded-2xl p-5">
            <h4 className="text-brand-cyan font-bold text-lg mb-2">🚀 Speed</h4>
            <p className="text-gray-300 text-sm">Distance ÷ Time. Scalar quantity.</p>
            <p className="text-brand-cyan font-space font-bold text-xl mt-2">v = d / t</p>
            <p className="text-gray-400 text-xs mt-2">Unit: m/s or km/h</p>
          </div>
          <div className="glass-card rounded-2xl p-5">
            <h4 className="text-brand-pink font-bold text-lg mb-2">🚗 Velocity</h4>
            <p className="text-gray-300 text-sm">Displacement ÷ Time. Vector quantity.</p>
            <p className="text-brand-pink font-space font-bold text-xl mt-2">v = s / t</p>
            <p className="text-gray-400 text-xs mt-2">Unit: m/s with direction</p>
          </div>
        </div>
        <div className="glass-card rounded-xl p-4 mb-6">
          <p className="text-gray-300 text-sm"><strong className="text-brand-lime">Key Difference:</strong> Speed tells HOW FAST. Velocity tells HOW FAST and IN WHICH DIRECTION.</p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Speed vs Velocity Comparison</h4>
        <SpeedVelocityComparison />
      </Section>

      {/* 4. ACCELERATION */}
      <Section title="Acceleration" icon={<Zap size={24} />} color="brand-rose">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed">
            <strong className="text-brand-rose">Acceleration</strong> is the rate of change of velocity with time. When a car speeds up, slows down, or turns, it is accelerating!
          </p>
        </div>
        <div className="formula-box rounded-2xl p-6 text-center mb-6">
          <p className="text-3xl font-space font-black text-white">a = <span className="text-brand-rose">(v − u)</span> / <span className="text-brand-amber">t</span></p>
          <div className="flex justify-center gap-6 mt-3 text-sm">
            <span className="text-brand-rose">a = acceleration (m/s²)</span>
            <span className="text-brand-cyan">v = final velocity</span>
            <span className="text-brand-pink">u = initial velocity</span>
            <span className="text-brand-amber">t = time</span>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-lime font-bold mb-1">⬆️ Positive Acceleration</p>
            <p className="text-gray-400 text-sm">Velocity increases. Car speeding up.</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-rose font-bold mb-1">⬇️ Negative Acceleration (Deceleration)</p>
            <p className="text-gray-400 text-sm">Velocity decreases. Car braking.</p>
          </div>
        </div>
      </Section>

      {/* 5. UNIFORM MOTION */}
      <Section title="Uniform Motion" icon={<Car size={24} />} color="brand-lime">
        <div className="definition-highlight rounded-2xl p-6 mb-6">
          <p className="text-xl text-white leading-relaxed">
            <strong className="text-brand-lime">Uniform motion</strong> means something stays the same throughout the motion.
          </p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Uniform Motion Explainer</h4>
        <UniformMotionExplainer />
      </Section>

      {/* 6. VECTOR REPRESENTATION */}
      <Section title="Representation of Vectors" icon={<Target size={24} />} color="brand-purple">
        <div className="definition-highlight rounded-2xl p-6 mb-6">
          <p className="text-xl text-white leading-relaxed">
            A <strong className="text-brand-purple">vector</strong> is represented by an arrow. The <strong>length</strong> of the arrow shows magnitude, and the <strong>direction</strong> of the arrow shows the direction of the vector.
          </p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Vector Drawing Tool</h4>
        <VectorRepresentation />
      </Section>

      {/* 7. GRAPHICAL ANALYSIS */}
      <Section title="Graphical Analysis of Motion" icon={<TrendingUp size={24} />} color="brand-teal">
        <div className="definition-highlight rounded-2xl p-6 mb-6">
          <p className="text-xl text-white leading-relaxed">
            <strong className="text-brand-teal">Graphs</strong> help us visualize motion. The most common is the <strong>Distance-Time Graph</strong>.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-cyan font-bold mb-1">📈 Distance-Time Graph</p>
            <p className="text-gray-400 text-sm">Slope = Speed. Steeper = Faster.</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-pink font-bold mb-1">📉 Speed-Time Graph</p>
            <p className="text-gray-400 text-sm">Slope = Acceleration. Area = Distance.</p>
          </div>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Distance-Time Graph Plotter</h4>
        <DistanceTimeGraph />
      </Section>

      {/* Quick Summary */}
      <div className="unit-detail-reveal glass-card-strong rounded-3xl p-8 md:p-12 text-center mb-16" style={{ opacity: 0, transform: 'translateY(60px)' }}>
        <h3 className="text-2xl md:text-3xl font-black text-white mb-6">📝 Unit 2 Quick Summary</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-cyan font-bold text-sm mb-1">Distance vs Displacement</p>
            <p className="text-gray-400 text-xs">Distance = total path. Displacement = shortest path.</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-purple font-bold text-sm mb-1">Speed vs Velocity</p>
            <p className="text-gray-400 text-xs">Speed = scalar. Velocity = vector (has direction).</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-rose font-bold text-sm mb-1">Acceleration</p>
            <p className="text-gray-400 text-xs">a = (v-u)/t. Rate of change of velocity.</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-teal font-bold text-sm mb-1">Graphs</p>
            <p className="text-gray-400 text-xs">Distance-Time slope = speed.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
