import { useState, useEffect, useRef } from 'react';
import {
  Move, Gauge, Zap, TrendingUp,
  RotateCcw, Ruler, Car, Target,
  CircleDot
} from 'lucide-react';
import { useT } from '../../i18n/LanguageContext';

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
  const sectionId = title.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
  
  return (
    <div 
      className="unit-detail-reveal mb-16" 
      style={{ opacity: 0, transform: 'translateY(60px)' }}
      data-section-id={sectionId}
    >
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
  const t = useT();
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
    let tVal = 0;

    const draw = () => {
      animId = requestAnimationFrame(draw);
      tVal += 0.02;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(124,58,237,0.05)'; ctx.lineWidth = 0.5;
      for (let x = 0; x < w; x += 30) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

      if (mode === 'linear') {
        const x = 60 + ((Math.sin(tVal) + 1) / 2) * (w - 120);
        ctx.fillStyle = 'rgba(255,255,255,0.05)'; ctx.fillRect(0, h - 60, w, 40);
        ctx.fillStyle = '#06b6d4'; ctx.fillRect(x - 35, h - 85, 70, 30);
        ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(x - 20, h - 55, 12, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(x + 20, h - 55, 12, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#06b6d4'; ctx.font = 'bold 14px Poppins'; ctx.textAlign = 'center'; ctx.fillText('Car in straight line', w / 2, 30);
      } else if (mode === 'circular') {
        const cx = w / 2, cy = h / 2, r = 60;
        ctx.strokeStyle = '#ec4899'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
        for (let i = 0; i < 8; i++) { const a = tVal + (i * Math.PI) / 4; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); ctx.stroke(); }
        ctx.fillStyle = '#ec4899'; ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ec4899'; ctx.font = 'bold 14px Poppins'; ctx.textAlign = 'center'; ctx.fillText('Wheel spinning', w / 2, 30);
      } else if (mode === 'random') {
        for (let i = 0; i < 15; i++) {
          const px = w / 2 + Math.sin(tVal * 1.3 + i * 2.5) * 80;
          const py = h / 2 + Math.cos(tVal * 0.7 + i * 1.8) * 50;
          ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = '#f59e0b'; ctx.font = 'bold 14px Poppins'; ctx.textAlign = 'center'; ctx.fillText('Gas particles moving randomly', w / 2, 30);
      } else if (mode === 'rotatory') {
        const cx = w / 2, cy = h / 2;
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(tVal);
        ctx.fillStyle = '#7c3aed'; ctx.fillRect(-40, -8, 80, 16);
        ctx.fillStyle = '#a78bfa'; ctx.beginPath(); ctx.arc(0, 0, 10, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
        ctx.fillStyle = '#7c3aed'; ctx.font = 'bold 14px Poppins'; ctx.textAlign = 'center'; ctx.fillText('Object spinning on axis', w / 2, 30);
      } else if (mode === 'vibratory') {
        const cx = w / 2, baseY = h - 40;
        const angle = Math.sin(tVal * 3);
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
          { key: 'linear' as const, label: t('unit2.linear'), icon: <Car size={20} />, color: 'brand-cyan' },
          { key: 'circular' as const, label: t('unit2.circular'), icon: <CircleDot size={20} />, color: 'brand-pink' },
          { key: 'random' as const, label: t('unit2.random'), icon: <Target size={20} />, color: 'brand-amber' },
          { key: 'rotatory' as const, label: t('unit2.rotatory'), icon: <RotateCcw size={20} />, color: 'brand-purple' },
          { key: 'vibratory' as const, label: t('unit2.vibratory'), icon: <Move size={20} />, color: 'brand-rose' },
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
  const t = useT();
  const [scenario, setScenario] = useState(0);
  const scenarios = [
    { name: 'Boy to School', path: 'Home → Shop → School', distance: '500 m', displacement: '400 m East', note: t('unit2.scenario1.note') },
    { name: 'Circular Park', path: 'Full circle around park', distance: '628 m', displacement: '0 m', note: t('unit2.scenario2.note') },
    { name: 'Cricket Run', path: 'Run to boundary and back', distance: '160 m', displacement: '0 m', note: t('unit2.scenario3.note') },
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
            <p className="text-gray-400 text-xs uppercase">{t('unit2.distance')}</p>
            <p className="text-2xl font-space font-bold text-brand-cyan">{scenarios[scenario].distance}</p>
          </div>
          <div className="formula-box rounded-xl p-4 text-center">
            <p className="text-gray-400 text-xs uppercase">{t('unit2.displacement')}</p>
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

/* ─── UNIFORM vs NON-UNIFORM ─── */
function UniformMotionExplainer() {
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

/* ─── VECTOR REPRESENTATION ─── */
function VectorRepresentation() {
  const t = useT();
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
    ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cx, 20); ctx.lineTo(cx, h - 20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(20, cy); ctx.lineTo(w - 20, cy); ctx.stroke();

    ctx.fillStyle = '#9ca3af'; ctx.font = '12px Poppins'; ctx.textAlign = 'center';
    ctx.fillText('N', cx, 15); ctx.fillText('S', cx, h - 5);
    ctx.fillText('W', 15, cy + 4); ctx.fillText('E', w - 10, cy + 4);

    const rad = (angle * Math.PI) / 180;
    const len = (magnitude / 100) * 100;
    const ex = cx + Math.cos(rad) * len;
    const ey = cy - Math.sin(rad) * len;

    ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ex, ey); ctx.stroke();

    const headLen = 10;
    const angle2 = Math.atan2(cy - ey, cx - ex);
    ctx.beginPath(); ctx.moveTo(ex, ey);
    ctx.lineTo(ex + headLen * Math.cos(angle2 + 0.5), ey + headLen * Math.sin(angle2 + 0.5));
    ctx.lineTo(ex + headLen * Math.cos(angle2 - 0.5), ey + headLen * Math.sin(angle2 - 0.5));
    ctx.fillStyle = '#06b6d4'; ctx.fill();

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
        <p className="text-gray-300 text-sm">💡 <strong className="text-white">{t('unit2.vectors')}</strong> has both magnitude (size) and direction. Scalar has only magnitude.</p>
      </div>
    </div>
  );
}

/* ─── DISTANCE-TIME GRAPH ─── */
function DistanceTimeGraph() {
  const t = useT();
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
    ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(pad, pad); ctx.lineTo(pad, h - pad); ctx.lineTo(w - pad, h - pad); ctx.stroke();

    ctx.fillStyle = '#9ca3af'; ctx.font = '12px Poppins'; ctx.textAlign = 'center';
    ctx.fillText('Time (s)', w / 2, h - 10);
    ctx.save(); ctx.translate(15, h / 2); ctx.rotate(-Math.PI / 2); ctx.fillText('Distance (m)', 0, 0); ctx.restore();

    ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(pad, h - pad);
    for (let tVal = 0; tVal <= 10; tVal += 0.5) {
      const d = speed * tVal;
      const px = pad + (tVal / 10) * (w - pad * 2);
      const py = h - pad - (d / (speed * 10)) * (h - pad * 2);
      ctx.lineTo(px, py);
    }
    ctx.stroke();

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
          <p className="text-brand-cyan text-xs font-bold">📈 {t('unit2.distTime')}</p>
          <p className="text-gray-400 text-xs">{t('unit2.distTimeDesc')}</p>
        </div>
        <div className="glass-card rounded-xl p-3">
          <p className="text-brand-pink text-xs font-bold">📉 {t('unit2.speedTime')}</p>
          <p className="text-gray-400 text-xs">{t('unit2.speedTimeDesc')}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN UNIT 2 CONTENT ─── */
export default function Unit2Content() {
  const t = useT();

  return (
    <div>
      <Section title={t('unit2.typesMotion')} icon={<Move size={24} />} color="brand-cyan">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit2.motionDesc') }} />
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 {t('unit2.h4MotionAnim')}</h4>
        <MotionTypesAnimation />
      </Section>

      <Section title={t('unit2.distDisp')} icon={<Ruler size={24} />} color="brand-pink">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="glass-card rounded-2xl p-5">
            <h4 className="text-brand-cyan font-bold text-lg mb-2">📏 {t('unit2.distance')}</h4>
            <p className="text-gray-300 text-sm">{t('unit2.distanceDesc')}</p>
            <p className="text-brand-cyan font-space font-bold text-xl mt-2">Unit: meter (m)</p>
          </div>
          <div className="glass-card rounded-2xl p-5">
            <h4 className="text-brand-pink font-bold text-lg mb-2">➡️ {t('unit2.displacement')}</h4>
            <p className="text-gray-300 text-sm">{t('unit2.displacementDesc')}</p>
            <p className="text-brand-pink font-space font-bold text-xl mt-2">Unit: meter (m)</p>
          </div>
        </div>
        <div className="formula-box rounded-2xl p-5 mb-6 text-center">
          <p className="text-2xl font-space font-bold text-white">{t('unit2.formulaDisp')}</p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 {t('unit2.h4DistExamples')}</h4>
        <DistanceDisplacementExplainer />
      </Section>

      <Section title={t('unit2.speedVel')} icon={<Gauge size={24} />} color="brand-amber">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="glass-card rounded-2xl p-5">
            <h4 className="text-brand-cyan font-bold text-lg mb-2">🚀 {t('unit2.speed')}</h4>
            <p className="text-gray-300 text-sm">{t('unit2.speedDesc')}</p>
            <p className="text-brand-cyan font-space font-bold text-xl mt-2">v = d / t</p>
            <p className="text-gray-400 text-xs mt-2">Unit: m/s or km/h</p>
          </div>
          <div className="glass-card rounded-2xl p-5">
            <h4 className="text-brand-pink font-bold text-lg mb-2">🚗 {t('unit2.velocity')}</h4>
            <p className="text-gray-300 text-sm">{t('unit2.velocityDesc')}</p>
            <p className="text-brand-pink font-space font-bold text-xl mt-2">v = s / t</p>
            <p className="text-gray-400 text-xs mt-2">Unit: m/s with direction</p>
          </div>
        </div>
        <div className="glass-card rounded-xl p-4 mb-6">
          <p className="text-gray-300 text-sm"><strong className="text-brand-lime">Key Difference:</strong> {t('unit2.speedVelDiff')}</p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 {t('unit2.h4SpeedComparison')}</h4>
        <SpeedVelocityComparison />
      </Section>

      <Section title={t('unit2.accel')} icon={<Zap size={24} />} color="brand-rose">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit2.accelDesc') }} />
        </div>
        <div className="formula-box rounded-2xl p-6 text-center mb-6">
          <p className="text-3xl font-space font-black text-white">{t('unit2.accelFormula')}</p>
          <div className="flex justify-center gap-6 mt-3 text-sm">
            <span className="text-brand-rose">a = acceleration (m/s²)</span>
            <span className="text-brand-cyan">v = final velocity</span>
            <span className="text-brand-pink">u = initial velocity</span>
            <span className="text-brand-amber">t = time</span>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-lime font-bold mb-1">{t('unit2.posAcc')}</p>
            <p className="text-gray-400 text-sm">{t('unit2.posAccDesc')}</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-rose font-bold mb-1">{t('unit2.negAcc')}</p>
            <p className="text-gray-400 text-sm">{t('unit2.negAccDesc')}</p>
          </div>
        </div>
      </Section>

      <Section title={t('unit2.uniform')} icon={<Car size={24} />} color="brand-lime">
        <div className="definition-highlight rounded-2xl p-6 mb-6">
          <p className="text-xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit2.uniformDesc') }} />
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 {t('unit2.h4UniformExplainer')}</h4>
        <UniformMotionExplainer />
      </Section>

      <Section title={t('unit2.vectors')} icon={<Target size={24} />} color="brand-purple">
        <div className="definition-highlight rounded-2xl p-6 mb-6">
          <p className="text-xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit2.vectorDesc') }} />
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 {t('unit2.h4VectorTool')}</h4>
        <VectorRepresentation />
      </Section>

      <Section title={t('unit2.graphs')} icon={<TrendingUp size={24} />} color="brand-teal">
        <div className="definition-highlight rounded-2xl p-6 mb-6">
          <p className="text-xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit2.graphsDesc') }} />
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 {t('unit2.h4GraphPlotter')}</h4>
        <DistanceTimeGraph />
      </Section>

      <div className="unit-detail-reveal glass-card-strong rounded-3xl p-8 md:p-12 text-center mb-16" style={{ opacity: 0, transform: 'translateY(60px)' }}>
        <h3 className="text-2xl md:text-3xl font-black text-white mb-6">{t('unit2.summary')}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-cyan font-bold text-sm mb-1">{t('unit2.sumDist')}</p>
            <p className="text-gray-400 text-xs">{t('unit2.sumDistDesc')}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-purple font-bold text-sm mb-1">{t('unit2.sumSpeed')}</p>
            <p className="text-gray-400 text-xs">{t('unit2.sumSpeedDesc')}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-rose font-bold text-sm mb-1">{t('unit2.sumAcc')}</p>
            <p className="text-gray-400 text-xs">{t('unit2.sumAccDesc')}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-teal font-bold text-sm mb-1">{t('unit2.sumGraphs')}</p>
            <p className="text-gray-400 text-xs">{t('unit2.sumGraphsDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}