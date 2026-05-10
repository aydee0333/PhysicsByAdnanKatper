import { useState, useEffect, useRef } from 'react';
import {
  RotateCcw, FlaskConical, Droplets, Waves, Wind,
  Atom
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

/* ─── 1. PARTICLE ANIMATION ─── */
function ParticleAnimation() {
  const [temp, setTemp] = useState(50);
  const [state, setState] = useState<'solid' | 'liquid' | 'gas'>('solid');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;

    const particles = Array.from({ length: state === 'solid' ? 20 : state === 'liquid' ? 25 : 30 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * (temp / 50) * (state === 'solid' ? 0.3 : state === 'liquid' ? 1 : 3),
      vy: (Math.random() - 0.5) * (temp / 50) * (state === 'solid' ? 0.3 : state === 'liquid' ? 1 : 3),
      r: state === 'solid' ? 6 : state === 'liquid' ? 5 : 4,
    }));

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        if (state === 'solid') {
          p.x += Math.sin(Date.now() * 0.005 + p.x) * 0.5;
          p.y += Math.cos(Date.now() * 0.005 + p.y) * 0.5;
        } else {
          p.x += p.vx;
          p.y += p.vy;
        }

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        p.x = Math.max(0, Math.min(w, p.x));
        p.y = Math.max(0, Math.min(h, p.y));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = state === 'solid' ? '#06b6d4' : state === 'liquid' ? '#ec4899' : '#f59e0b';
        ctx.fill();
      });

      // Connections for solid
      if (state === 'solid') {
        ctx.strokeStyle = 'rgba(6,182,212,0.2)';
        ctx.lineWidth = 1;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            if (Math.sqrt(dx * dx + dy * dy) < 50) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [state, temp]);

  return (
    <div>
      <div className="flex gap-3 mb-4">
        {(['solid', 'liquid', 'gas'] as const).map(s => (
          <button key={s} onClick={() => setState(s)} className={`flex-1 py-2 rounded-xl text-sm font-semibold capitalize ${state === s ? s === 'solid' ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : s === 'liquid' ? 'bg-brand-pink/20 text-brand-pink border border-brand-pink/30' : 'bg-brand-amber/20 text-brand-amber border border-brand-amber/30' : 'glass-card text-gray-400'}`}>
            {s}
          </button>
        ))}
      </div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">Temperature: {temp}%</label>
        <input type="range" min="10" max="100" value={temp} onChange={e => setTemp(Number(e.target.value))} className="w-full accent-brand-cyan" />
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={400} height={200} className="w-full" style={{ maxWidth: 400, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="glass-card rounded-xl p-3 text-center">
          <p className="text-brand-cyan text-xs uppercase">Particles</p>
          <p className="text-white text-sm font-semibold">{state === 'solid' ? 'Tightly packed' : state === 'liquid' ? 'Loosely packed' : 'Far apart'}</p>
        </div>
        <div className="glass-card rounded-xl p-3 text-center">
          <p className="text-brand-pink text-xs uppercase">Motion</p>
          <p className="text-white text-sm font-semibold">{state === 'solid' ? 'Vibrate in place' : state === 'liquid' ? 'Slide past each other' : 'Move rapidly'}</p>
        </div>
        <div className="glass-card rounded-xl p-3 text-center">
          <p className="text-brand-amber text-xs uppercase">Shape</p>
          <p className="text-white text-sm font-semibold">{state === 'solid' ? 'Fixed' : state === 'liquid' ? 'Takes container' : 'Fills container'}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── 2. SPRING SIM (REVIEW) ─── */
function SpringReviewSim() {
  const [force, setForce] = useState(0);
  const k = 5;
  const x = force / k;
  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">Force: {force} N</label>
        <input type="range" min="0" max="25" value={force} onChange={e => setForce(Number(e.target.value))} className="w-full accent-brand-cyan" />
      </div>
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 p-6 mb-4">
        <div className="flex items-end justify-center gap-4" style={{ height: 120 }}>
          <div className="w-16 bg-brand-cyan/30 rounded-t flex items-end justify-center" style={{ height: `${40 + x * 15}px` }}>
            <span className="text-brand-cyan text-xs font-bold mb-1">{x.toFixed(2)}m</span>
          </div>
        </div>
        <div className="h-px bg-white/10 mt-2" />
        <p className="text-center text-gray-400 text-sm mt-2">Extension = {x.toFixed(2)} m</p>
      </div>
      <div className="formula-box rounded-xl p-4 text-center">
        <p className="text-xl font-space font-bold text-white">F = kx → {force} = {k} × {x.toFixed(2)}</p>
      </div>
    </div>
  );
}

/* ─── 3. LIQUID PRESSURE ─── */
function LiquidPressureSim() {
  const [depth, setDepth] = useState(2);
  const [density, setDensity] = useState(1000);
  const g = 9.8;
  const pressure = density * g * depth;

  const liquids = [
    { name: 'Water', d: 1000 },
    { name: 'Oil', d: 920 },
    { name: 'Mercury', d: 13600 },
  ];

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-gray-400 text-sm block mb-2">Depth (m): {depth}</label>
          <input type="range" min="0.5" max="10" step="0.5" value={depth} onChange={e => setDepth(Number(e.target.value))} className="w-full accent-brand-cyan" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">Liquid Density (kg/m³): {density}</label>
          <div className="flex gap-2">
            {liquids.map(l => (
              <button key={l.name} onClick={() => setDensity(l.d)} className={`flex-1 py-2 rounded-xl text-xs font-semibold ${density === l.d ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : 'glass-card text-gray-400'}`}>
                {l.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Visual */}
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 relative overflow-hidden mb-4" style={{ height: 220 }}>
        <svg width="100%" height="100%" viewBox="0 0 400 220">
          <rect x="100" y="20" width="200" height="180" fill="rgba(6,182,212,0.1)" stroke="rgba(6,182,212,0.3)" strokeWidth="2" />
          {/* Depth markers */}
          {[1, 2, 3, 4, 5].map(d => (
            <line key={d} x1="100" y1={20 + d * 30} x2="300" y2={20 + d * 30} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          ))}
          {/* Current depth */}
          <line x1="100" y1={20 + depth * 30} x2="300" y2={20 + depth * 30} stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
          <text x="310" y={25 + depth * 30} fill="#f59e0b" fontSize="12">{depth}m</text>
          {/* Pressure arrows */}
          {[150, 200, 250].map((x, i) => (
            <line key={i} x1={x} y1={20 + depth * 30 - 20} x2={x} y2={20 + depth * 30 - 5} stroke="#f43f5e" strokeWidth="2" markerEnd="url(#pArrow)" />
          ))}
          <defs>
            <marker id="pArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8" fill="#f43f5e" />
            </marker>
          </defs>
        </svg>
      </div>

      <div className="formula-box rounded-2xl p-5 text-center">
        <p className="text-gray-400 text-xs uppercase mb-2">P = ρgh</p>
        <p className="text-3xl font-space font-bold text-white">P = {density} × {g} × {depth} = <span className="text-brand-cyan">{pressure.toLocaleString()} Pa</span></p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mt-4">
        <div className="glass-card rounded-xl p-3">
          <p className="text-brand-rose text-xs font-bold">🚧 Dam Walls</p>
          <p className="text-gray-400 text-xs">Thicker at bottom — higher pressure deeper down</p>
        </div>
        <div className="glass-card rounded-xl p-3">
          <p className="text-brand-cyan text-xs font-bold">🚢 Submarines</p>
          <p className="text-gray-400 text-xs">Stronger hulls needed for deeper dives</p>
        </div>
      </div>
    </div>
  );
}

/* ─── 4. PASCAL'S LAW ─── */
function HydraulicLiftSim() {
  const [f1, setF1] = useState(10);
  const [a1, setA1] = useState(1);
  const [a2, setA2] = useState(10);
  const f2 = f1 * (a2 / a1);

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-3 mb-6">
        <div>
          <label className="text-gray-400 text-xs block mb-1">Input Force (N)</label>
          <input type="number" value={f1} onChange={e => setF1(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm" />
        </div>
        <div>
          <label className="text-gray-400 text-xs block mb-1">Small Area (m²)</label>
          <input type="number" value={a1} onChange={e => setA1(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm" />
        </div>
        <div>
          <label className="text-gray-400 text-xs block mb-1">Large Area (m²)</label>
          <input type="number" value={a2} onChange={e => setA2(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm" />
        </div>
      </div>

      {/* Visual */}
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 p-6 mb-4">
        <div className="flex items-end justify-center gap-8">
          <div className="text-center">
            <div className="w-16 bg-brand-cyan/30 rounded-t mx-auto flex items-end justify-center" style={{ height: 60 }}>
              <span className="text-brand-cyan text-xs font-bold mb-1">A₁={a1}</span>
            </div>
            <div className="w-16 h-4 bg-brand-cyan/50 rounded-b mx-auto" />
            <p className="text-brand-cyan font-bold mt-2">{f1} N ↓</p>
          </div>
          <div className="text-gray-500 text-2xl mb-8">=</div>
          <div className="text-center">
            <div className="w-32 bg-brand-pink/30 rounded-t mx-auto flex items-end justify-center" style={{ height: 60 }}>
              <span className="text-brand-pink text-xs font-bold mb-1">A₂={a2}</span>
            </div>
            <div className="w-32 h-4 bg-brand-pink/50 rounded-b mx-auto" />
            <p className="text-brand-pink font-bold mt-2">{f2.toFixed(0)} N ↑</p>
          </div>
        </div>
      </div>

      <div className="formula-box rounded-2xl p-5 text-center">
        <p className="text-xl font-space font-bold text-white">F₂ = F₁ × (A₂/A₁) = {f1} × ({a2}/{a1}) = <span className="text-brand-pink">{f2.toFixed(0)} N</span></p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mt-4">
        {['Hydraulic press', 'Car brakes', 'Hydraulic lifts', 'Excavators'].map(app => (
          <div key={app} className="glass-card rounded-xl p-3">
            <p className="text-gray-300 text-sm">🔧 {app}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── 5. SURFACE TENSION ─── */
function SurfaceTensionSim() {
  const [soap, setSoap] = useState(0);
  const floating = soap < 50;

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">Soap Concentration: {soap}%</label>
        <input type="range" min="0" max="100" value={soap} onChange={e => setSoap(Number(e.target.value))} className="w-full accent-brand-cyan" />
      </div>

      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 p-6 mb-4">
        <div className="flex items-center justify-center gap-8">
          <div className="text-center">
            <div className="w-32 h-24 bg-brand-cyan/10 rounded-lg border-2 border-brand-cyan/30 relative flex items-center justify-center">
              <div className="absolute inset-x-0 top-1/2 h-px bg-brand-cyan/50" />
              {floating ? (
                <div className="w-12 h-1 bg-gray-400 rounded relative z-10">
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs text-brand-lime">🪡 Floating!</span>
                </div>
              ) : (
                <div className="w-12 h-1 bg-gray-600 rounded relative z-10 opacity-30">
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs text-brand-rose">🪡 Sinking</span>
                </div>
              )}
            </div>
            <p className="text-brand-cyan text-xs mt-2">Water Surface</p>
          </div>
        </div>
      </div>

      <div className={`rounded-xl p-4 text-center ${floating ? 'bg-brand-lime/15 border border-brand-lime/30' : 'bg-brand-rose/15 border border-brand-rose/30'}`}>
        <p className={`text-lg font-bold ${floating ? 'text-brand-lime' : 'text-brand-rose'}`}>
          {floating ? '✅ Needle floats — surface tension holds it!' : '❌ Soap broke surface tension — needle sinks!'}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mt-4">
        <div className="glass-card rounded-xl p-3">
          <p className="text-brand-cyan text-xs font-bold">💧 Water Droplets</p>
          <p className="text-gray-400 text-xs">Form spherical shape due to surface tension</p>
        </div>
        <div className="glass-card rounded-xl p-3">
          <p className="text-brand-amber text-xs font-bold">🦟 Insects on Water</p>
          <p className="text-gray-400 text-xs">Walk on water — surface tension supports them</p>
        </div>
      </div>
    </div>
  );
}

/* ─── 6. VISCOSITY ─── */
function ViscositySim() {
  const [liquid, setLiquid] = useState<'water' | 'oil' | 'honey'>('water');
  const viscosities = { water: 1, oil: 50, honey: 300 };
  const v = viscosities[liquid];

  return (
    <div>
      <div className="flex gap-3 mb-4">
        {(['water', 'oil', 'honey'] as const).map(l => (
          <button key={l} onClick={() => setLiquid(l)} className={`flex-1 py-2 rounded-xl text-sm font-semibold capitalize ${liquid === l ? l === 'water' ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : l === 'oil' ? 'bg-brand-amber/20 text-brand-amber border border-brand-amber/30' : 'bg-brand-rose/20 text-brand-rose border border-brand-rose/30' : 'glass-card text-gray-400'}`}>
            {l}
          </button>
        ))}
      </div>

      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 p-6 mb-4">
        <div className="flex justify-center">
          <div className="w-24 relative" style={{ height: 160 }}>
            {/* Container */}
            <div className="absolute inset-0 border-2 border-white/10 rounded-lg overflow-hidden">
              <div className={`absolute bottom-0 left-0 right-0 ${liquid === 'water' ? 'bg-brand-cyan/20' : liquid === 'oil' ? 'bg-brand-amber/20' : 'bg-brand-rose/20'}`} style={{ height: '80%' }} />
            </div>
            {/* Ball */}
            <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white/80 transition-all duration-1000" style={{ top: `${20 + (v / 300) * 100}px` }} />
          </div>
        </div>
      </div>

      <div className="formula-box rounded-xl p-4 text-center">
        <p className="text-gray-400 text-xs uppercase mb-1">Viscosity Level</p>
        <p className="text-2xl font-space font-bold text-white">{v} mPa·s</p>
        <p className="text-gray-400 text-sm mt-1">
          {liquid === 'water' ? 'Flows easily — low viscosity' : liquid === 'oil' ? 'Flows slowly — medium viscosity' : 'Flows very slowly — high viscosity'}
        </p>
      </div>
    </div>
  );
}

/* ─── 7. HOOKE'S LAW EXPERIMENT ─── */
function HookesLawExperiment() {
  const [weights, setWeights] = useState<{ force: number; extension: number }[]>([]);
  const k = 5;

  const addWeight = () => {
    const force = (weights.length + 1) * 2;
    const extension = force / k;
    setWeights([...weights, { force, extension }]);
  };

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

    ctx.fillStyle = '#9ca3af';
    ctx.font = '12px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText('Force (N)', w / 2, h - 10);
    ctx.save();
    ctx.translate(15, h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Extension (m)', 0, 0);
    ctx.restore();

    // Plot points
    if (weights.length > 0) {
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      weights.forEach((p, i) => {
        const px = pad + (p.force / 20) * (w - pad * 2);
        const py = h - pad - (p.extension / 4) * (h - pad * 2);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();

      weights.forEach(p => {
        const px = pad + (p.force / 20) * (w - pad * 2);
        const py = h - pad - (p.extension / 4) * (h - pad * 2);
        ctx.fillStyle = '#f43f5e';
        ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2); ctx.fill();
      });
    }
  }, [weights]);

  return (
    <div>
      <div className="flex gap-3 mb-4">
        <button onClick={addWeight} disabled={weights.length >= 8} className="btn-primary px-5 py-2 rounded-xl text-white font-semibold text-sm disabled:opacity-50">
          Add 2N Weight
        </button>
        <button onClick={() => setWeights([])} className="glass-card px-4 py-2 rounded-xl text-gray-400 text-sm hover:text-white flex items-center gap-2">
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={400} height={280} className="w-full" style={{ maxWidth: 400, margin: '0 auto', display: 'block' }} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="pb-2 text-brand-cyan">Force (N)</th>
              <th className="pb-2 text-brand-pink">Extension (m)</th>
              <th className="pb-2 text-brand-amber">F/x (N/m)</th>
            </tr>
          </thead>
          <tbody>
            {weights.map((w, i) => (
              <tr key={i} className="border-b border-white/5">
                <td className="py-2 text-white">{w.force}</td>
                <td className="py-2 text-gray-300">{w.extension.toFixed(2)}</td>
                <td className="py-2 text-brand-amber">{k}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {weights.length > 1 && (
        <div className="mt-4 p-4 bg-brand-lime/10 rounded-xl border border-brand-lime/20">
          <p className="text-brand-lime text-sm font-bold">✅ Straight line through origin confirms Hooke's Law: F ∝ x</p>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN UNIT 7 CONTENT
   ═══════════════════════════════════════════════════════════ */
export default function Unit7Content() {
  return (
    <div>
      {/* 1. KINETIC MOLECULAR MODEL */}
      <Section title="Kinetic Molecular Model of Matter" icon={<Atom size={24} />} color="brand-cyan">
        <h4 className="text-lg font-bold text-white mb-4">Three States of Matter:</h4>
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-cyan font-bold mb-2">🧊 Solid</p>
            <p className="text-gray-400 text-sm">Particles: Tightly packed</p>
            <p className="text-gray-400 text-sm">Motion: Vibrate in place</p>
            <p className="text-gray-400 text-sm">Shape: Fixed</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-pink font-bold mb-2">💧 Liquid</p>
            <p className="text-gray-400 text-sm">Particles: Loosely packed</p>
            <p className="text-gray-400 text-sm">Motion: Slide past each other</p>
            <p className="text-gray-400 text-sm">Shape: Takes container</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-amber font-bold mb-2">💨 Gas</p>
            <p className="text-gray-400 text-sm">Particles: Far apart</p>
            <p className="text-gray-400 text-sm">Motion: Move rapidly</p>
            <p className="text-gray-400 text-sm">Shape: Fills container</p>
          </div>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Particle Animation</h4>
        <ParticleAnimation />
      </Section>

      {/* 2. ELASTICITY REVIEW */}
      <Section title="Elasticity (Review)" icon={<FlaskConical size={24} />} color="brand-purple">
        <div className="definition-highlight rounded-2xl p-6 mb-6">
          <p className="text-xl text-white leading-relaxed">
            <strong className="text-brand-purple">Elasticity</strong> is the property of a material to <strong>regain its original shape</strong> after the removal of deforming force.
          </p>
        </div>
        <div className="formula-box rounded-2xl p-5 text-center mb-6">
          <p className="text-2xl font-space font-bold text-white">F = <span className="text-brand-cyan">k</span> × <span className="text-brand-pink">x</span></p>
          <p className="text-gray-400 text-sm mt-2">Within elastic limit, extension ∝ force</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          <div className="glass-card rounded-xl p-3">
            <p className="text-brand-cyan text-xs font-bold">Elasticity</p>
            <p className="text-gray-400 text-xs">Regains shape</p>
          </div>
          <div className="glass-card rounded-xl p-3">
            <p className="text-brand-pink text-xs font-bold">Plasticity</p>
            <p className="text-gray-400 text-xs">Permanent deformation</p>
          </div>
          <div className="glass-card rounded-xl p-3">
            <p className="text-brand-amber text-xs font-bold">Elastic Limit</p>
            <p className="text-gray-400 text-xs">Max stretch before damage</p>
          </div>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Spring Simulation</h4>
        <SpringReviewSim />
      </Section>

      {/* 3. PRESSURE IN LIQUIDS */}
      <Section title="Pressure in Liquids" icon={<Droplets size={24} />} color="brand-pink">
        <div className="formula-box rounded-2xl p-6 text-center mb-6">
          <p className="text-3xl font-space font-black text-white">P = <span className="text-brand-cyan">ρ</span> × <span className="text-brand-pink">g</span> × <span className="text-brand-amber">h</span></p>
          <div className="flex justify-center gap-6 mt-3 text-sm">
            <span className="text-brand-cyan">ρ = density (kg/m³)</span>
            <span className="text-brand-pink">g = 9.8 m/s²</span>
            <span className="text-brand-amber">h = depth (m)</span>
          </div>
        </div>
        <div className="glass-card rounded-xl p-4 mb-6">
          <p className="text-gray-300 text-sm"><strong className="text-brand-lime">Key Points:</strong> Pressure increases with depth. Same depth = same pressure regardless of container shape. Depends on liquid density.</p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Liquid Pressure Simulator</h4>
        <LiquidPressureSim />
      </Section>

      {/* 4. PASCAL'S LAW */}
      <Section title="Pascal's Law" icon={<Waves size={24} />} color="brand-amber">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed">
            Pressure applied to an <strong>enclosed fluid</strong> is transmitted <strong className="text-brand-amber">equally</strong> to every part of the fluid and to the walls of the container.
          </p>
        </div>
        <div className="formula-box rounded-2xl p-5 text-center mb-6">
          <p className="text-xl font-space font-bold text-white">P = F₁/A₁ = F₂/A₂</p>
          <p className="text-brand-amber font-space font-bold mt-2">F₂ = F₁ × (A₂/A₁)</p>
          <p className="text-gray-400 text-sm mt-2">Small force → Large force (mechanical advantage)</p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Hydraulic Lift</h4>
        <HydraulicLiftSim />
      </Section>

      {/* 5. SURFACE TENSION */}
      <Section title="Surface Tension" icon={<Wind size={24} />} color="brand-teal">
        <div className="definition-highlight rounded-2xl p-6 mb-6">
          <p className="text-xl text-white leading-relaxed">
            <strong className="text-brand-teal">Surface tension</strong> makes a liquid surface behave like a stretched elastic membrane. Caused by <strong>cohesive forces</strong> between liquid molecules.
          </p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Needle on Water</h4>
        <SurfaceTensionSim />
      </Section>

      {/* 6. VISCOSITY */}
      <Section title="Viscosity" icon={<Droplets size={24} />} color="brand-rose">
        <div className="definition-highlight rounded-2xl p-6 mb-6">
          <p className="text-xl text-white leading-relaxed">
            <strong className="text-brand-rose">Viscosity</strong> is the internal friction in a fluid that <strong>resists flow</strong>. Thicker liquids have higher viscosity.
          </p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Ball Drop in Liquids</h4>
        <ViscositySim />
      </Section>

      {/* 7. HOOKE'S LAW EXPERIMENT */}
      <Section title="Hooke's Law Experiment" icon={<FlaskConical size={24} />} color="brand-lime">
        <div className="glass-card rounded-xl p-4 mb-6">
          <p className="text-gray-300 text-sm"><strong className="text-brand-lime">Apparatus:</strong> Spring, hook, pointer, scale, weight hanger</p>
          <p className="text-gray-300 text-sm mt-2"><strong className="text-brand-lime">Procedure:</strong> Add known weights, record extension, plot Force vs Extension graph.</p>
          <p className="text-gray-300 text-sm mt-2"><strong className="text-brand-lime">Result:</strong> Straight line through origin → confirms F ∝ x (within elastic limit)</p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Plot Force-Extension Graph</h4>
        <HookesLawExperiment />
      </Section>

      {/* Quick Summary */}
      <div className="unit-detail-reveal glass-card-strong rounded-3xl p-8 md:p-12 text-center mb-16" style={{ opacity: 0, transform: 'translateY(60px)' }}>
        <h3 className="text-2xl md:text-3xl font-black text-white mb-6">📝 Unit 7 Quick Summary</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-cyan font-bold text-sm mb-1">States of Matter</p>
            <p className="text-gray-400 text-xs">Solid (fixed), Liquid (flows), Gas (fills)</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-pink font-bold text-sm mb-1">Liquid Pressure</p>
            <p className="text-gray-400 text-xs">P = ρgh. Increases with depth.</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-amber font-bold text-sm mb-1">Pascal's Law</p>
            <p className="text-gray-400 text-xs">Pressure transmitted equally in fluid.</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-teal font-bold text-sm mb-1">Surface Tension</p>
            <p className="text-gray-400 text-xs">Liquid surface acts like elastic skin.</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-rose font-bold text-sm mb-1">Viscosity</p>
            <p className="text-gray-400 text-xs">Resistance to flow. Honey &gt; water.</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-lime font-bold text-sm mb-1">Hooke's Law</p>
            <p className="text-gray-400 text-xs">F = kx. Extension ∝ Force.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
