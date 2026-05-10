import { useState, useEffect, useRef } from 'react';
import {
  Globe, Orbit, Scale, ArrowDown, Rocket,
  RotateCcw
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
   1. NEWTON'S LAW — Force Calculator
   ═══════════════════════════════════════════════════════════ */
function GravForceCalc() {
  const G = 6.67e-11;
  const [m1, setM1] = useState(5e24);
  const [m2, setM2] = useState(6e24);
  const [r, setR] = useState(1e7);
  const force = (G * m1 * m2) / (r * r);

  return (
    <div>
      <div className="formula-box rounded-2xl p-6 text-center mb-6">
        <p className="text-2xl md:text-3xl font-space font-black text-white">F = G × <span className="text-brand-cyan">m₁</span> × <span className="text-brand-pink">m₂</span> / <span className="text-brand-amber">r²</span></p>
        <p className="text-brand-purple font-space font-bold mt-2">G = 6.67 × 10⁻¹¹ Nm²/kg²</p>
      </div>

      <div className="grid md:grid-cols-3 gap-3 mb-6">
        <div>
          <label className="text-gray-400 text-xs block mb-1">Mass 1 (kg)</label>
          <input type="number" value={m1} onChange={e => setM1(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-cyan/50" />
        </div>
        <div>
          <label className="text-gray-400 text-xs block mb-1">Mass 2 (kg)</label>
          <input type="number" value={m2} onChange={e => setM2(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-pink/50" />
        </div>
        <div>
          <label className="text-gray-400 text-xs block mb-1">Distance (m)</label>
          <input type="number" value={r} onChange={e => setR(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-amber/50" />
        </div>
      </div>

      <div className="formula-box rounded-2xl p-5 text-center">
        <p className="text-gray-400 text-xs uppercase mb-2">Gravitational Force</p>
        <p className="text-3xl font-space font-bold text-brand-cyan">{force.toExponential(3)} N</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mt-4">
        <div className="glass-card rounded-xl p-3">
          <p className="text-brand-lime text-xs font-bold">✓ Always Attractive</p>
          <p className="text-gray-400 text-xs">Gravity never repels</p>
        </div>
        <div className="glass-card rounded-xl p-3">
          <p className="text-brand-cyan text-xs font-bold">✓ Universal</p>
          <p className="text-gray-400 text-xs">Works for all objects</p>
        </div>
        <div className="glass-card rounded-xl p-3">
          <p className="text-brand-amber text-xs font-bold">✓ Decreases with r²</p>
          <p className="text-gray-400 text-xs">Double distance = ¼ force</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   2. GRAVITATIONAL FIELD — Weight on Planets
   ═══════════════════════════════════════════════════════════ */
function PlanetWeightCalc() {
  const [mass, setMass] = useState(10);
  const planets = [
    { name: 'Moon', g: 1.6, color: 'text-gray-400' },
    { name: 'Mercury', g: 3.7, color: 'text-brand-amber' },
    { name: 'Venus', g: 8.9, color: 'text-brand-pink' },
    { name: 'Earth', g: 9.8, color: 'text-brand-cyan' },
    { name: 'Mars', g: 3.7, color: 'text-brand-rose' },
    { name: 'Jupiter', g: 24.8, color: 'text-brand-purple' },
  ];

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">Your Mass (kg): {mass}</label>
        <input type="range" min="1" max="100" value={mass} onChange={e => setMass(Number(e.target.value))} className="w-full accent-brand-cyan" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        {planets.map(p => {
          const weight = mass * p.g;
          return (
            <div key={p.name} className="glass-card rounded-xl p-4 text-center">
              <p className={`font-bold text-sm ${p.color}`}>{p.name}</p>
              <p className="text-white text-xl font-space font-bold">{weight.toFixed(1)} N</p>
              <p className="text-gray-500 text-xs">g = {p.g} m/s²</p>
            </div>
          );
        })}
      </div>

      <div className="formula-box rounded-2xl p-5">
        <p className="text-gray-400 text-xs uppercase mb-2">Gravitational Field Strength</p>
        <p className="text-xl font-space font-bold text-white">g = F/m = GM/r²</p>
        <p className="text-gray-400 text-sm mt-2">On Earth: g = 9.8 m/s² at the surface</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   3. MASS OF EARTH — Calculator
   ═══════════════════════════════════════════════════════════ */
function EarthMassCalc() {
  const g = 9.8;
  const R = 6.4e6;
  const G = 6.67e-11;
  const mass = (g * R * R) / G;

  return (
    <div>
      <div className="space-y-3 mb-6">
        <div className="formula-box rounded-xl p-4">
          <p className="text-gray-400 text-xs uppercase mb-1">Step 1: Surface Gravity</p>
          <p className="text-xl font-space font-bold text-brand-cyan">g = 9.8 m/s²</p>
        </div>
        <div className="formula-box rounded-xl p-4">
          <p className="text-gray-400 text-xs uppercase mb-1">Step 2: Earth Radius</p>
          <p className="text-xl font-space font-bold text-brand-pink">R = 6.4 × 10⁶ m</p>
        </div>
        <div className="formula-box rounded-xl p-4">
          <p className="text-gray-400 text-xs uppercase mb-1">Step 3: Formula</p>
          <p className="text-xl font-space font-bold text-brand-amber">M = gR² / G</p>
        </div>
      </div>

      <div className="formula-box rounded-2xl p-6 text-center">
        <p className="text-gray-400 text-xs uppercase mb-2">Mass of Earth</p>
        <p className="text-4xl font-space font-bold text-white">M ≈ <span className="text-brand-lime">{(mass / 1e24).toFixed(2)} × 10²⁴ kg</span></p>
        <p className="text-gray-400 text-sm mt-2">That's about 6 trillion trillion kilograms!</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   4. VARIATION OF g — Altitude Graph
   ═══════════════════════════════════════════════════════════ */
function GVariationGraph() {
  const [altitude, setAltitude] = useState(0);
  const g0 = 9.8;
  const R = 6371; // km
  const g = g0 * Math.pow(R / (R + altitude), 2);

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

    // Labels
    ctx.fillStyle = '#9ca3af';
    ctx.font = '12px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText('Altitude (km)', w / 2, h - 10);
    ctx.save();
    ctx.translate(15, h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('g (m/s²)', 0, 0);
    ctx.restore();

    // Curve
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let ax = 0; ax <= w - pad * 2; ax += 2) {
      const alt = (ax / (w - pad * 2)) * 10000;
      const gv = g0 * Math.pow(R / (R + alt), 2);
      const py = h - pad - (gv / g0) * (h - pad * 2);
      if (ax === 0) ctx.moveTo(pad + ax, py);
      else ctx.lineTo(pad + ax, py);
    }
    ctx.stroke();

    // Current point
    const cx = pad + (altitude / 10000) * (w - pad * 2);
    const cy = h - pad - (g / g0) * (h - pad * 2);
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();

  }, [altitude, g, g0]);

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">Altitude: {altitude} km</label>
        <input type="range" min="0" max="10000" step="100" value={altitude} onChange={e => setAltitude(Number(e.target.value))} className="w-full accent-brand-cyan" />
      </div>

      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={500} height={280} className="w-full" style={{ maxWidth: 500, margin: '0 auto', display: 'block' }} />
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">g at {altitude} km</p>
          <p className="text-2xl font-space font-bold text-brand-cyan">{g.toFixed(2)} m/s²</p>
        </div>
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">Decrease</p>
          <p className="text-2xl font-space font-bold text-brand-rose">{((g0 - g) / g0 * 100).toFixed(1)}%</p>
        </div>
      </div>

      <div className="glass-card rounded-xl p-4">
        <p className="text-gray-300 text-sm"><strong className="text-brand-amber">Key Insight:</strong> At the center of Earth, g = 0! At Mount Everest (8.8 km), g ≈ 9.77 m/s². Astronauts in orbit feel weightless because they're in free fall, not because there's no gravity.</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   5. ORBITAL MOTION — Satellite Simulator
   ═══════════════════════════════════════════════════════════ */
function SatelliteOrbitSim() {
  const [radius, setRadius] = useState(7e6);
  const G = 6.67e-11;
  const M = 5.97e24;
  const v = Math.sqrt((G * M) / radius);
  const T = (2 * Math.PI * radius) / v;

  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      const t = Date.now() * 0.001;

      ctx.clearRect(0, 0, w, h);

      // Earth
      const earthR = 40;
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath(); ctx.arc(cx, cy, earthR, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(6,182,212,0.3)';
      ctx.beginPath(); ctx.arc(cx, cy, earthR + 5, 0, Math.PI * 2); ctx.fill();

      // Orbit
      const orbitR = earthR + (radius - 6.4e6) / 50000;
      ctx.strokeStyle = 'rgba(124,58,237,0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath(); ctx.arc(cx, cy, orbitR, 0, Math.PI * 2); ctx.stroke();
      ctx.setLineDash([]);

      // Satellite
      const sx = cx + Math.cos(t * (7.8e3 / v)) * orbitR;
      const sy = cy + Math.sin(t * (7.8e3 / v)) * orbitR;
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath(); ctx.arc(sx, sy, 6, 0, Math.PI * 2); ctx.fill();

      // Velocity arrow
      const angle = Math.atan2(sy - cy, sx - cx) + Math.PI / 2;
      ctx.strokeStyle = '#84cc16';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx + Math.cos(angle) * 20, sy + Math.sin(angle) * 20);
      ctx.stroke();
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [radius, v]);

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">Orbit Radius: {(radius / 1e6).toFixed(1)} × 10⁶ m</label>
        <input type="range" min="6.6e6" max="12e6" step="1e5" value={radius} onChange={e => setRadius(Number(e.target.value))} className="w-full accent-brand-cyan" />
      </div>

      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={300} height={280} className="w-full" style={{ maxWidth: 300, margin: '0 auto', display: 'block' }} />
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mb-4">
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">Orbital Velocity</p>
          <p className="text-xl font-space font-bold text-brand-cyan">{v.toFixed(0)} m/s</p>
        </div>
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">Period</p>
          <p className="text-xl font-space font-bold text-brand-pink">{(T / 60).toFixed(1)} min</p>
        </div>
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">Height</p>
          <p className="text-xl font-space font-bold text-brand-amber">{((radius - 6.4e6) / 1000).toFixed(0)} km</p>
        </div>
      </div>

      <div className="formula-box rounded-2xl p-5 text-center">
        <p className="text-xl font-space font-bold text-white">v = √(GM/r) = √({(G * M).toExponential(2)}/{radius})</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   6. ARTIFICIAL SATELLITES — Info Cards
   ═══════════════════════════════════════════════════════════ */
function SatelliteTypesInfo() {
  const [selected, setSelected] = useState<'leo' | 'meo' | 'geo'>('leo');

  const types: Record<string, { name: string; altitude: string; period: string; examples: string; uses: string; color: string }> = {
    leo: { name: 'LEO (Low Earth Orbit)', altitude: '200 - 2,000 km', period: '~90 minutes', examples: 'ISS, Hubble Space Telescope', uses: 'Earth observation, space station, imaging', color: 'text-brand-cyan' },
    meo: { name: 'MEO (Medium Earth Orbit)', altitude: '2,000 - 35,000 km', period: '2 - 24 hours', examples: 'GPS satellites', uses: 'Navigation (GPS), communication', color: 'text-brand-amber' },
    geo: { name: 'GEO (Geostationary)', altitude: '35,786 km', period: '24 hours', examples: 'Weather satellites, TV broadcast', uses: 'Weather, TV, communications', color: 'text-brand-pink' },
  };

  const t = types[selected];

  return (
    <div>
      <div className="flex gap-3 mb-4">
        {(['leo', 'meo', 'geo'] as const).map(type => (
          <button
            key={type}
            onClick={() => setSelected(type)}
            className={`flex-1 py-2 rounded-xl text-sm font-semibold ${selected === type ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : 'glass-card text-gray-400'}`}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="glass-card rounded-2xl p-6">
        <h4 className={`text-xl font-bold mb-3 ${t.color}`}>{t.name}</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400 text-xs uppercase mb-1">Altitude</p>
            <p className="text-white font-semibold">{t.altitude}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs uppercase mb-1">Orbital Period</p>
            <p className="text-white font-semibold">{t.period}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs uppercase mb-1">Examples</p>
            <p className="text-white font-semibold">{t.examples}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs uppercase mb-1">Uses</p>
            <p className="text-white font-semibold">{t.uses}</p>
          </div>
        </div>
      </div>

      <h4 className="text-lg font-bold text-white mb-3 mt-6">Uses of Satellites:</h4>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {['📡 Communication (phone, TV, internet)', '🌦️ Weather forecasting', '📍 GPS navigation', '🌍 Earth observation', '🔬 Scientific research', '📶 Internet connectivity'].map((use, i) => (
          <div key={i} className="glass-card rounded-xl p-3">
            <p className="text-gray-300 text-sm">{use}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   7. WEIGHTLESSNESS — Falling Elevator
   ═══════════════════════════════════════════════════════════ */
function WeightlessnessSim() {
  const [falling, setFalling] = useState(false);
  const [progress, setProgress] = useState(0);
  const weight = 100; // N
  const scaleReading = falling ? weight * (1 - progress) : weight;

  useEffect(() => {
    if (!falling) return;
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 1) { clearInterval(interval); return 1; }
        return p + 0.02;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [falling]);

  return (
    <div>
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 relative overflow-hidden mb-4" style={{ height: 240 }}>
        <svg width="100%" height="100%" viewBox="0 0 400 240">
          {/* Elevator box */}
          <rect x="120" y={20 + progress * 100} width="160" height="180" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          {/* Person */}
          <circle cx="200" cy={70 + progress * 100} r="15" fill="#06b6d4" opacity="0.7" />
          <line x1="200" y1={85 + progress * 100} x2="200" y2={130 + progress * 100} stroke="#06b6d4" strokeWidth="3" opacity="0.7" />
          <line x1="180" y1={100 + progress * 100} x2="220" y2={100 + progress * 100} stroke="#06b6d4" strokeWidth="3" opacity="0.7" />
          <line x1="200" y1={130 + progress * 100} x2="185" y2={160 + progress * 100} stroke="#06b6d4" strokeWidth="3" opacity="0.7" />
          <line x1="200" y1={130 + progress * 100} x2="215" y2={160 + progress * 100} stroke="#06b6d4" strokeWidth="3" opacity="0.7" />
          {/* Scale */}
          <rect x="170" y={170 + progress * 100} width="60" height="10" fill="#7c3aed" opacity="0.5" />
          {/* Falling indicator */}
          {falling && progress < 1 && (
            <text x="320" y={100 + progress * 50} fill="#f43f5e" fontSize="14" fontWeight="bold">↓ Free Fall!</text>
          )}
          {/* Floor indicator */}
          <line x1="0" y1="220" x2="400" y2="220" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
          <text x="200" y="235" textAnchor="middle" fill="#9ca3af" fontSize="10">Ground Floor</text>
        </svg>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">Scale Reading</p>
          <p className="text-2xl font-space font-bold text-brand-cyan">{scaleReading.toFixed(1)} N</p>
        </div>
        <div className={`rounded-xl p-4 text-center ${falling && progress > 0.5 ? 'bg-brand-rose/15 border border-brand-rose/30' : 'bg-brand-lime/15 border border-brand-lime/30'}`}>
          <p className="text-gray-400 text-xs uppercase mb-1">Status</p>
          <p className={`text-lg font-bold ${falling && progress > 0.5 ? 'text-brand-rose' : 'text-brand-lime'}`}>
            {falling && progress > 0.5 ? '😰 Weightless!' : '😊 Normal Weight'}
          </p>
        </div>
      </div>

      <div className="flex gap-3 justify-center mb-4">
        <button onClick={() => setFalling(true)} disabled={falling} className="btn-primary px-6 py-2 rounded-xl text-white font-semibold text-sm disabled:opacity-50">
          Start Free Fall
        </button>
        <button onClick={() => { setFalling(false); setProgress(0); }} className="glass-card px-4 py-2 rounded-xl text-gray-400 text-sm hover:text-white flex items-center gap-2">
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      <div className="glass-card rounded-xl p-4">
        <p className="text-gray-300 text-sm"><strong className="text-brand-amber">Why do astronauts float?</strong> They're in free fall around Earth! They fall toward Earth, but also move sideways so fast that they keep missing it — creating an orbit. Everything falls together, so there's no relative force pushing against them.</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN UNIT 6 CONTENT
   ═══════════════════════════════════════════════════════════ */
export default function Unit6Content() {
  return (
    <div>
      {/* 1. NEWTON'S LAW */}
      <Section title="Newton's Law of Universal Gravitation" icon={<Globe size={24} />} color="brand-cyan">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed">
            Every object in the universe <strong>attracts every other object</strong> with a force proportional to the product of their masses and inversely proportional to the square of the distance between them.
          </p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Force Calculator</h4>
        <GravForceCalc />
      </Section>

      {/* 2. GRAVITATIONAL FIELD */}
      <Section title="Gravitational Field" icon={<Orbit size={24} />} color="brand-purple">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed">
            A <strong className="text-brand-purple">gravitational field</strong> is the region around a mass where gravity can be felt. Field strength <strong>g</strong> = force per unit mass.
          </p>
        </div>
        <div className="formula-box rounded-2xl p-5 text-center mb-6">
          <p className="text-2xl font-space font-bold text-white">g = F/m = <span className="text-brand-purple">GM/r²</span></p>
          <p className="text-gray-400 text-sm mt-2">On Earth: g = 9.8 m/s²</p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Weight on Different Planets</h4>
        <PlanetWeightCalc />
      </Section>

      {/* 3. MASS OF EARTH */}
      <Section title="Mass of Earth" icon={<Scale size={24} />} color="brand-pink">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed">
            Using <strong className="text-brand-pink">g = GM/R²</strong>, we can calculate the mass of Earth!
          </p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Earth Mass Calculator</h4>
        <EarthMassCalc />
      </Section>

      {/* 4. VARIATION OF g */}
      <Section title="Variation of g with Altitude" icon={<ArrowDown size={24} />} color="brand-amber">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="glass-card rounded-2xl p-5">
            <h4 className="text-brand-cyan font-bold text-lg mb-2">⬆️ With Altitude</h4>
            <p className="text-gray-300 text-sm">g <strong className="text-white">decreases</strong> as height increases.</p>
            <p className="text-brand-cyan font-space font-bold mt-2">g(h) = g × (1 − 2h/R)</p>
            <p className="text-gray-500 text-xs mt-1">At 10 km: g ≈ 9.7 m/s²</p>
          </div>
          <div className="glass-card rounded-2xl p-5">
            <h4 className="text-brand-rose font-bold text-lg mb-2">⬇️ With Depth</h4>
            <p className="text-gray-300 text-sm">g <strong className="text-white">decreases</strong> toward Earth's center.</p>
            <p className="text-brand-rose font-space font-bold mt-2">g(d) = g × (1 − d/R)</p>
            <p className="text-gray-500 text-xs mt-1">At center: g = 0</p>
          </div>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 g vs Altitude Graph</h4>
        <GVariationGraph />
      </Section>

      {/* 5. ORBITAL MOTION */}
      <Section title="Orbital Motion" icon={<Orbit size={24} />} color="brand-lime">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed">
            Satellites stay in orbit because <strong className="text-brand-lime">gravity provides the centripetal force</strong> needed for circular motion.
          </p>
        </div>
        <div className="formula-box rounded-2xl p-5 text-center mb-6">
          <p className="text-xl font-space font-bold text-white">v = √(GM/r)</p>
          <p className="text-gray-400 text-sm mt-2">For Earth: v ≈ 7.8 km/s at 200 km altitude</p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Satellite Orbit Simulation</h4>
        <SatelliteOrbitSim />
      </Section>

      {/* 6. ARTIFICIAL SATELLITES */}
      <Section title="Artificial Satellites" icon={<Rocket size={24} />} color="brand-rose">
        <h4 className="text-lg font-bold text-white mb-4">🎮 Satellite Types Info</h4>
        <SatelliteTypesInfo />
      </Section>

      {/* 7. WEIGHTLESSNESS */}
      <Section title="Weightlessness" icon={<Scale size={24} />} color="brand-teal">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed">
            <strong className="text-brand-teal">Weightlessness</strong> means apparent weight becomes zero — not because gravity disappears, but because there's <strong>no normal force</strong> pushing against you.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-cyan font-bold mb-1">✈️ Parabolic Flight</p>
            <p className="text-gray-400 text-sm">"Vomit comet" — plane dives to create free fall</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-pink font-bold mb-1">🛗 Free Fall Elevator</p>
            <p className="text-gray-400 text-sm">If elevator cable breaks, you'd feel weightless</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-amber font-bold mb-1">🛰️ Space Station</p>
            <p className="text-gray-400 text-sm">In orbit, everything falls together</p>
          </div>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Falling Elevator Simulation</h4>
        <WeightlessnessSim />
      </Section>

      {/* Quick Summary */}
      <div className="unit-detail-reveal glass-card-strong rounded-3xl p-8 md:p-12 text-center mb-16" style={{ opacity: 0, transform: 'translateY(60px)' }}>
        <h3 className="text-2xl md:text-3xl font-black text-white mb-6">📝 Unit 6 Quick Summary</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-cyan font-bold text-sm mb-1">Newton's Law</p>
            <p className="text-gray-400 text-xs">F = Gm₁m₂/r². Always attractive.</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-purple font-bold text-sm mb-1">g Variation</p>
            <p className="text-gray-400 text-xs">Decreases with altitude and depth.</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-lime font-bold text-sm mb-1">Orbit</p>
            <p className="text-gray-400 text-xs">v = √(GM/r). Gravity = centripetal force.</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-teal font-bold text-sm mb-1">Weightlessness</p>
            <p className="text-gray-400 text-xs">No normal force. Free fall feeling.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
