import { useState, useEffect, useRef, useMemo } from 'react';
import {
  RotateCcw, FlaskConical, Droplets, Waves, Wind,
  Atom
} from 'lucide-react';
import { useT } from '../../i18n/LanguageContext';
import { GSAP_REVEAL_STYLE } from '../../utils/styles';
import Section from '../Section';
import UnitQuiz from '../UnitQuiz';

/* ─── STREAMLINE FLOW VISUALIZATION ─── */
function StreamlineFlowSim() {
  const [flowRate, setFlowRate] = useState(5);
  const [turbulent, setTurbulent] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<{ x: number; y: number; speed: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;

    // Initialize particles
    if (particlesRef.current.length === 0) {
      for (let i = 0; i < 60; i++) {
        particlesRef.current.push({ x: Math.random() * w, y: 60 + Math.random() * 160, speed: 1 + Math.random() * 2 });
      }
    }

    const narrowX = w * 0.4, narrowW = w * 0.2;
    const wideH = 160, narrowH = 60;
    const pipeY = 60;

    const getPipeHeight = (x: number) => {
      if (x < narrowX) return wideH;
      if (x < narrowX + narrowW) {
        const t = (x - narrowX) / narrowW;
        return wideH - (wideH - narrowH) * Math.sin(t * Math.PI);
      }
      return wideH;
    };

    const draw = () => {
      animRef.current = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, w, h);

      // Pipe outline
      ctx.fillStyle = 'rgba(6,182,212,0.06)';
      ctx.beginPath();
      ctx.moveTo(20, pipeY); ctx.lineTo(w - 20, pipeY);
      ctx.lineTo(w - 20, pipeY + wideH); ctx.lineTo(20, pipeY + wideH);
      ctx.closePath(); ctx.fill();

      // Narrow section highlight
      ctx.fillStyle = 'rgba(245,158,11,0.08)';
      const nh = getPipeHeight(narrowX + narrowW / 2);
      ctx.fillRect(narrowX, pipeY + (wideH - nh) / 2, narrowW, nh);

      // Pipe walls
      ctx.strokeStyle = 'rgba(6,182,212,0.4)'; ctx.lineWidth = 2;
      // Top wall
      ctx.beginPath(); ctx.moveTo(20, pipeY);
      for (let x = 20; x <= w - 20; x += 5) {
        const ph = getPipeHeight(x);
        ctx.lineTo(x, pipeY + (wideH - ph) / 2);
      }
      ctx.stroke();
      // Bottom wall
      ctx.beginPath(); ctx.moveTo(20, pipeY + wideH);
      for (let x = 20; x <= w - 20; x += 5) {
        const ph = getPipeHeight(x);
        ctx.lineTo(x, pipeY + wideH - (wideH - ph) / 2);
      }
      ctx.stroke();

      // Update & draw particles
      particlesRef.current.forEach(p => {
        const ph = getPipeHeight(p.x);
        const topY = pipeY + (wideH - ph) / 2;
        const botY = pipeY + wideH - (wideH - ph) / 2;
        const speedMult = (wideH / ph) * flowRate * 0.3;

        p.x += speedMult;
        if (turbulent) p.y += (Math.random() - 0.5) * 4;

        if (p.x > w - 20) { p.x = 20; p.y = pipeY + 20 + Math.random() * (wideH - 40); }
        if (p.y < topY + 5) p.y = topY + 5;
        if (p.y > botY - 5) p.y = botY - 5;

        // Color by speed
        const t = Math.min(speedMult / (flowRate * 1.5), 1);
        const r = Math.round(6 + t * 239), g = Math.round(182 - t * 24), b = Math.round(212 - t * 101);
        ctx.fillStyle = `rgba(${r},${g},${b},0.7)`;
        ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fill();
      });

      // Labels
      ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '11px Poppins'; ctx.textAlign = 'center';
      ctx.fillText('Wide Section', 100, pipeY - 10);
      ctx.fillText('Narrow Section', narrowX + narrowW / 2, pipeY - 10);
      ctx.fillText('Wide Section', w - 100, pipeY - 10);

      // Velocity labels
      const vWide = flowRate;
      const vNarrow = (wideH / narrowH) * flowRate;
      ctx.fillStyle = '#06b6d4'; ctx.font = 'bold 11px Poppins';
      ctx.fillText(`v = ${vWide.toFixed(1)}`, 100, pipeY + wideH + 20);
      ctx.fillStyle = '#f59e0b';
      ctx.fillText(`v = ${vNarrow.toFixed(1)}`, narrowX + narrowW / 2, pipeY + wideH + 20);

      // Continuity equation
      ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '10px Poppins';
      ctx.fillText(`A₁v₁ = A₂v₂ → ${vWide.toFixed(1)} × Wide = ${vNarrow.toFixed(1)} × Narrow`, w / 2, h - 15);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [flowRate, turbulent]);

  return (
    <div>
      <div className="flex gap-3 mb-4">
        <div className="flex-1">
          <label className="text-gray-400 text-sm block mb-2">Flow Rate: {flowRate}</label>
          <input type="range" min={1} max={15} value={flowRate} onChange={e => setFlowRate(Number(e.target.value))} className="w-full accent-brand-cyan" />
        </div>
        <button onClick={() => setTurbulent(!turbulent)} className={`px-4 py-2 rounded-xl text-sm font-semibold border self-end transition-all ${turbulent ? 'bg-brand-rose/20 text-brand-rose border-brand-rose/30' : 'glass-card text-gray-400 border-white/10'}`}>
          {turbulent ? '🌀 Turbulent' : '〰️ Laminar'}
        </button>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={500} height={260} className="w-full" style={{ maxWidth: 500, margin: '0 auto', display: 'block' }} />
      </div>
    </div>
  );
}

/* ═══ 1. PARTICLE ANIMATION ═══ */
function ParticleAnimation() {
  const t = useT();
  const [temp, setTemp] = useState(50);
  const [state, setState] = useState<'solid' | 'liquid' | 'gas'>('solid');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const count = 40;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * (w - 20) + 10,
        y: Math.random() * (h - 20) + 10,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        r: 4 + Math.random() * 3,
      });
    }
    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      const speed = state === 'solid' ? 0.3 : state === 'liquid' ? 1.5 : 4;
      particles.forEach(p => {
        p.x += p.vx * speed;
        p.y += p.vy * speed;
        if (p.x < p.r || p.x > w - p.r) p.vx *= -1;
        if (p.y < p.r || p.y > h - p.r) p.vy *= -1;
        p.x = Math.max(p.r, Math.min(w - p.r, p.x));
        p.y = Math.max(p.r, Math.min(h - p.r, p.y));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = state === 'solid' ? '#7c3aed' : state === 'liquid' ? '#06b6d4' : '#f59e0b';
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [state]);

  useEffect(() => {
    if (temp < 33) setState('solid');
    else if (temp < 66) setState('liquid');
    else setState('gas');
  }, [temp]);

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">{t('unit7.temperature').replace('{temp}', String(temp))}</label>
        <input type="range" min="0" max="100" value={temp} onChange={e => setTemp(Number(e.target.value))} className="w-full accent-brand-amber" />
      </div>
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 overflow-hidden mb-4" style={{ height: 200 }}>
        <canvas ref={canvasRef} width={400} height={200} className="w-full" />
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className={`rounded-xl p-3 text-center ${state === 'solid' ? 'bg-brand-purple/15 border border-brand-purple/30' : 'glass-card'}`}>
          <p className="text-brand-purple font-bold text-sm">{t('unit7.particles')}: {t('unit7.tightlyPacked')}</p>
          <p className="text-gray-400 text-xs">{t('unit7.motionLabel')}: {t('unit7.vibrateInPlace')}</p>
          <p className="text-gray-400 text-xs">{t('unit7.shapeLabel')}: {t('unit7.fixed')}</p>
        </div>
        <div className={`rounded-xl p-3 text-center ${state === 'liquid' ? 'bg-brand-cyan/15 border border-brand-cyan/30' : 'glass-card'}`}>
          <p className="text-brand-cyan font-bold text-sm">{t('unit7.particles')}: {t('unit7.looselyPacked')}</p>
          <p className="text-gray-400 text-xs">{t('unit7.motionLabel')}: {t('unit7.slidePast')}</p>
          <p className="text-gray-400 text-xs">{t('unit7.shapeLabel')}: {t('unit7.takesContainer')}</p>
        </div>
        <div className={`rounded-xl p-3 text-center ${state === 'gas' ? 'bg-brand-amber/15 border border-brand-amber/30' : 'glass-card'}`}>
          <p className="text-brand-amber font-bold text-sm">{t('unit7.particles')}: {t('unit7.farApart')}</p>
          <p className="text-gray-400 text-xs">{t('unit7.motionLabel')}: {t('unit7.moveRapidly')}</p>
          <p className="text-gray-400 text-xs">{t('unit7.shapeLabel')}: {t('unit7.fillsContainer')}</p>
        </div>
      </div>
    </div>
  );
}

/* ═══ 2. SPRING SIM ═══ */
function SpringSim7() {
  const t = useT();
  const [force, setForce] = useState(0);
  const [k, setK] = useState(5);
  const x = force / k;
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div><label className="text-gray-400 text-sm block mb-2">{t('unit7.springForce').replace('{force}', String(force))}</label><input type="range" min="0" max="30" value={force} onChange={e => setForce(Number(e.target.value))} className="w-full accent-brand-cyan" /></div>
        <div><label className="text-gray-400 text-sm block mb-2">{t('unit7.springK').replace('{k}', String(k))}</label><input type="range" min="1" max="20" value={k} onChange={e => setK(Number(e.target.value))} className="w-full accent-brand-amber" /></div>
      </div>
      <div className="formula-box rounded-xl p-4 text-center mb-4">
        <p className="text-xl font-space font-bold text-brand-cyan">{t('unit7.springExtension').replace('{x}', x.toFixed(2))}</p>
      </div>
      <div className="formula-box rounded-xl p-4 text-center">
        <p className="text-lg font-space font-bold text-white">{t('unit7.springResult').replace('{force}', String(force)).replace('{k}', String(k)).replace('{x}', x.toFixed(2))}</p>
      </div>
      <button onClick={() => { setForce(0); setK(5); }} className="mt-3 mx-auto block text-xs text-gray-500 hover:text-white flex items-center gap-1"><RotateCcw size={12} /> {t('unit7.reset')}</button>
    </div>
  );
}

/* ═══ 3. LIQUID PRESSURE SIM ═══ */
function LiquidPressureSim() {
  const t = useT();
  const [depth, setDepth] = useState(5);
  const [density, setDensity] = useState(1000);
  const g = 9.8;
  const pressure = density * g * depth;

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div><label className="text-gray-400 text-sm block mb-2">{t('unit7.depthM').replace('{depth}', String(depth))}</label><input type="range" min="0" max="50" value={depth} onChange={e => setDepth(Number(e.target.value))} className="w-full accent-brand-cyan" /></div>
        <div><label className="text-gray-400 text-sm block mb-2">{t('unit7.liquidDensity').replace('{density}', String(density))}</label><input type="range" min="500" max="13600" step="100" value={density} onChange={e => setDensity(Number(e.target.value))} className="w-full accent-brand-pink" /></div>
      </div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setDensity(1000)} className={`px-3 py-1 rounded-lg text-xs ${density === 1000 ? 'bg-brand-cyan/20 text-brand-cyan' : 'glass-card text-gray-400'}`}>{t('unit7.water')}</button>
        <button onClick={() => setDensity(900)} className={`px-3 py-1 rounded-lg text-xs ${density === 900 ? 'bg-brand-amber/20 text-brand-amber' : 'glass-card text-gray-400'}`}>{t('unit7.oil')}</button>
        <button onClick={() => setDensity(13600)} className={`px-3 py-1 rounded-lg text-xs ${density === 13600 ? 'bg-brand-purple/20 text-brand-purple' : 'glass-card text-gray-400'}`}>{t('unit7.mercury')}</button>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 relative overflow-hidden mb-4" style={{ height: 200 }}>
        <svg width="100%" height="100%" viewBox="0 0 400 200">
          <rect x="50" y="20" width="300" height="160" fill="rgba(6,182,212,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <rect x="52" y={20 + (1 - depth / 50) * 158} width="296" height={depth / 50 * 158} fill="rgba(6,182,212,0.25)" />
          {depth > 0 && Array.from({ length: Math.min(5, Math.floor(depth / 5) + 1) }, (_, i) => {
            const d = ((i + 1) / (Math.min(5, Math.floor(depth / 5) + 1))) * depth;
            const y = 180 - (d / 50) * 158;
            return <line key={i} x1="50" y1={y} x2="350" y2={y} stroke="rgba(6,182,212,0.3)" strokeWidth="1" strokeDasharray="4,4" />;
          })}
          <text x="200" y="195" textAnchor="middle" fill="#9ca3af" fontSize="10">Depth: {depth}m</text>
        </svg>
      </div>
      <div className="formula-box rounded-xl p-4 text-center">
        <p className="text-gray-400 text-xs uppercase mb-2">{t('unit7.pressureResult').replace('{density}', String(density)).replace('{g}', String(g)).replace('{depth}', String(depth)).replace('{pressure}', pressure.toFixed(0))}</p>
        <p className="text-3xl font-space font-bold text-brand-cyan">{pressure.toFixed(0)} Pa</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3 mt-4">
        <div className="glass-card rounded-xl p-3"><p className="text-brand-cyan font-bold text-sm">{t('unit7.damWalls')}</p><p className="text-gray-400 text-xs">{t('unit7.damWallsDesc')}</p></div>
        <div className="glass-card rounded-xl p-3"><p className="text-brand-pink font-bold text-sm">{t('unit7.submarines')}</p><p className="text-gray-400 text-xs">{t('unit7.submarinesDesc')}</p></div>
      </div>
    </div>
  );
}

/* ═══ 4. PASCAL'S LAW ═══ */
function PascalLawSim() {
  const t = useT();
  const [f1, setF1] = useState(10);
  const [a1, setA1] = useState(0.01);
  const [a2, setA2] = useState(0.1);
  const f2 = f1 * (a2 / a1);

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-3 mb-4">
        <div><label className="text-gray-400 text-xs block mb-1">{t('unit7.inputForce')}</label><input type="number" value={f1} onChange={e => setF1(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-cyan/50" /></div>
        <div><label className="text-gray-400 text-xs block mb-1">{t('unit7.smallArea')}</label><input type="number" step="0.001" value={a1} onChange={e => setA1(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-pink/50" /></div>
        <div><label className="text-gray-400 text-xs block mb-1">{t('unit7.largeArea')}</label><input type="number" step="0.01" value={a2} onChange={e => setA2(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-amber/50" /></div>
      </div>
      <div className="formula-box rounded-2xl p-6 text-center mb-4">
        <p className="text-gray-400 text-xs uppercase mb-2">{t('unit7.hydraulicResult').replace('{f1}', String(f1)).replace('{a2}', String(a2)).replace('{a1}', String(a1)).replace('{f2}', f2.toFixed(0))}</p>
        <p className="text-3xl font-space font-bold text-brand-amber">{f2.toFixed(0)} N</p>
      </div>
      <div className="glass-card rounded-xl p-4 mb-4"><p className="text-gray-300 text-sm">{t('unit7.pascalDesc')}</p></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="glass-card rounded-xl p-3 text-center"><p className="text-brand-cyan font-bold text-xs">{t('unit7.hydraulicPress')}</p></div>
        <div className="glass-card rounded-xl p-3 text-center"><p className="text-brand-pink font-bold text-xs">{t('unit7.carBrakes')}</p></div>
        <div className="glass-card rounded-xl p-3 text-center"><p className="text-brand-amber font-bold text-xs">{t('unit7.hydraulicLifts')}</p></div>
        <div className="glass-card rounded-xl p-3 text-center"><p className="text-brand-lime font-bold text-xs">{t('unit7.excavators')}</p></div>
      </div>
    </div>
  );
}

/* ═══ 5. SURFACE TENSION ═══ */
function SurfaceTensionSim() {
  const t = useT();
  const [soap, setSoap] = useState(0);
  const floating = soap < 30;

  return (
    <div>
      <div className="mb-4"><label className="text-gray-400 text-sm block mb-2">{t('unit7.soapConcentration').replace('{soap}', String(soap))}</label><input type="range" min="0" max="100" value={soap} onChange={e => setSoap(Number(e.target.value))} className="w-full accent-brand-teal" /></div>
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 relative overflow-hidden mb-4" style={{ height: 200 }}>
        <svg width="100%" height="100%" viewBox="0 0 400 200">
          <rect x="50" y="80" width="300" height="100" fill="rgba(6,182,212,0.1)" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
          <line x1="50" y1="80" x2="350" y2="80" stroke={floating ? '#06b6d4' : '#f43f5e'} strokeWidth="2" />
          {floating ? (
            <g><ellipse cx="200" cy="75" rx="40" ry="3" fill="none" stroke="#06b6d4" strokeWidth="2" /><line x1="170" y1="75" x2="230" y2="75" stroke="#9ca3af" strokeWidth="2" /><text x="200" y="65" textAnchor="middle" fill="#06b6d4" fontSize="12">🪡 {t('unit7.needleFloat')}</text></g>
          ) : (
            <g><line x1="180" y1="100" x2="220" y2="140" stroke="#9ca3af" strokeWidth="2" /><text x="200" y="165" textAnchor="middle" fill="#f43f5e" fontSize="12">🪡 {t('unit7.needleSink')}</text></g>
          )}
        </svg>
      </div>
      <div className={`rounded-xl p-4 text-center ${floating ? 'bg-brand-lime/15 border border-brand-lime/30' : 'bg-brand-rose/15 border border-brand-rose/30'}`}>
        <p className={`text-lg font-bold ${floating ? 'text-brand-lime' : 'text-brand-rose'}`}>{floating ? t('unit7.floatResult') : t('unit7.sinkResult')}</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3 mt-4">
        <div className="glass-card rounded-xl p-3"><p className="text-brand-cyan font-bold text-sm">{t('unit7.waterDroplets')}</p><p className="text-gray-400 text-xs">{t('unit7.waterDropletsDesc')}</p></div>
        <div className="glass-card rounded-xl p-3"><p className="text-brand-pink font-bold text-sm">{t('unit7.insectsWater')}</p><p className="text-gray-400 text-xs">{t('unit7.insectsWaterDesc')}</p></div>
      </div>
    </div>
  );
}

/* ═══ 6. VISCOSITY ═══ */
function ViscositySim() {
  const t = useT();
  const liquids = [
    { name: t('unit7.water'), desc: t('unit7.waterDesc'), speed: 180, color: '#06b6d4' },
    { name: t('unit7.oil'), desc: t('unit7.oilDesc'), speed: 90, color: '#f59e0b' },
    { name: t('unit7.honey'), desc: t('unit7.honeyDesc'), speed: 20, color: '#ec4899' },
  ];
  const [running, setRunning] = useState(false);
  const [positions, setPositions] = useState([0, 0, 0]);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setPositions(prev => prev.map((p, i) => Math.min(160, p + liquids[i].speed * 0.05)));
    }, 50);
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div>
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 relative overflow-hidden mb-4 p-4" style={{ height: 240 }}>
        {liquids.map((liq, i) => (
          <div key={i} className="flex items-center gap-3 mb-2">
            <span className="text-gray-400 text-xs w-16">{liq.name}</span>
            <div className="flex-1 bg-white/5 rounded-full h-6 relative overflow-hidden">
              <div className="absolute left-0 top-0 h-full rounded-full transition-all duration-75" style={{ width: positions[i] / 160 * 100 + '%', backgroundColor: liq.color, opacity: 0.6 }} />
              <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2" style={{ left: positions[i] / 160 * 100 + '%', borderColor: liq.color, backgroundColor: liq.color }} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-3 justify-center mb-4">
        <button onClick={() => { setRunning(true); setPositions([0, 0, 0]); setTimeout(() => setRunning(false), 3000); }} className="btn-primary px-6 py-2 rounded-xl text-white font-semibold text-sm">{t('unit7.ballDropTitle')}</button>
        <button onClick={() => { setRunning(false); setPositions([0, 0, 0]); }} className="glass-card px-4 py-2 rounded-xl text-gray-400 text-sm hover:text-white flex items-center gap-2"><RotateCcw size={14} /> {t('unit7.reset')}</button>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        {liquids.map((liq, i) => (
          <div key={i} className="glass-card rounded-xl p-3"><p className="font-bold text-sm" style={{ color: liq.color }}>{liq.name}</p><p className="text-gray-400 text-xs">{liq.desc}</p></div>
        ))}
      </div>
    </div>
  );
}

/* ═══ 7. HOOKE'S LAW EXPERIMENT ═══ */
function HookeLawExp() {
  const t = useT();
  const [data, setData] = useState<{ force: number; ext: number }[]>([]);
  const k = 0.02;

  const addWeight = () => {
    const force = (data.length + 1) * 2;
    const ext = force * k + (Math.random() - 0.5) * 0.005;
    setData([...data, { force, ext: Math.max(0, ext) }]);
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height, pad = 40;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(pad, pad); ctx.lineTo(pad, h - pad); ctx.lineTo(w - pad, h - pad); ctx.stroke();
    ctx.fillStyle = '#9ca3af'; ctx.font = '12px Poppins'; ctx.textAlign = 'center';
    ctx.fillText(t('unit7.extensionM'), w / 2, h - 10);
    ctx.save(); ctx.translate(15, h / 2); ctx.rotate(-Math.PI / 2); ctx.fillText(t('unit7.forceN'), 0, 0); ctx.restore();
    if (data.length > 0) {
      const maxF = Math.max(...data.map(d => d.force));
      const maxE = Math.max(...data.map(d => d.ext));
      ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 2; ctx.beginPath();
      data.forEach((d, i) => {
        const px = pad + (d.ext / (maxE * 1.2)) * (w - pad * 2);
        const py = h - pad - (d.force / (maxF * 1.2)) * (h - pad * 2);
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      });
      ctx.stroke();
      data.forEach(d => {
        const px = pad + (d.ext / (maxE * 1.2)) * (w - pad * 2);
        const py = h - pad - (d.force / (maxF * 1.2)) * (h - pad * 2);
        ctx.fillStyle = '#f43f5e'; ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2); ctx.fill();
      });
    }
  }, [data]);

  return (
    <div>
      <div className="glass-card rounded-xl p-4 mb-4 space-y-2">
        <p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit7.apparatus') }} />
        <p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit7.procedure') }} />
        <p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit7.result') }} />
      </div>
      <div className="flex gap-3 justify-center mb-4">
        <button onClick={addWeight} className="btn-primary px-6 py-2 rounded-xl text-white font-semibold text-sm">{t('unit7.addWeight')}</button>
        <button onClick={() => setData([])} className="glass-card px-4 py-2 rounded-xl text-gray-400 text-sm hover:text-white flex items-center gap-2"><RotateCcw size={14} /> {t('unit7.reset')}</button>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={500} height={280} className="w-full" style={{ maxWidth: 500, margin: '0 auto', display: 'block' }} />
      </div>
      {data.length > 0 && (
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">{t('unit7.fOverX')}</p>
          <p className="text-xl font-space font-bold text-brand-cyan">{(data[data.length - 1].force / data[data.length - 1].ext).toFixed(0)} N/m</p>
        </div>
      )}
      {data.length >= 3 && <p className="text-brand-lime text-sm text-center mt-2">{t('unit7.straightLineResult')}</p>}
    </div>
  );
}

/* ═══ MAIN UNIT 7 CONTENT ═══ */
/* ─── BERNOULLI'S PRINCIPLE SIMULATOR ─── */
function BernoulliSim() {
  const [constriction, setConstriction] = useState(40);
  const [flowSpeed, setFlowSpeed] = useState(50);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<{ x: number; y: number; vx: number }[]>([]);

  // Initialize particles
  useEffect(() => {
    particlesRef.current = Array.from({ length: 60 }, () => ({
      x: Math.random() * 500,
      y: 60 + Math.random() * 120,
      vx: 0,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;

    const draw = () => {
      animRef.current = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, w, h);

      const pipeY = h / 2;
      const pipeH = 140;
      const narrowW = 120;
      const narrowX = w / 2 - narrowW / 2;
      const narrowH = pipeH * (1 - constriction / 100);
      const speed = flowSpeed / 50;

      // Pipe walls
      ctx.strokeStyle = 'rgba(6,182,212,0.4)'; ctx.lineWidth = 2;
      // Top wall
      ctx.beginPath(); ctx.moveTo(0, pipeY - pipeH / 2);
      ctx.lineTo(narrowX, pipeY - pipeH / 2);
      ctx.quadraticCurveTo(narrowX + 20, pipeY - narrowH / 2, narrowX + 30, pipeY - narrowH / 2);
      ctx.lineTo(narrowX + narrowW - 30, pipeY - narrowH / 2);
      ctx.quadraticCurveTo(narrowX + narrowW - 20, pipeY - pipeH / 2, narrowX + narrowW, pipeY - pipeH / 2);
      ctx.lineTo(w, pipeY - pipeH / 2); ctx.stroke();
      // Bottom wall
      ctx.beginPath(); ctx.moveTo(0, pipeY + pipeH / 2);
      ctx.lineTo(narrowX, pipeY + pipeH / 2);
      ctx.quadraticCurveTo(narrowX + 20, pipeY + narrowH / 2, narrowX + 30, pipeY + narrowH / 2);
      ctx.lineTo(narrowX + narrowW - 30, pipeY + narrowH / 2);
      ctx.quadraticCurveTo(narrowX + narrowW - 20, pipeY + pipeH / 2, narrowX + narrowW, pipeY + pipeH / 2);
      ctx.lineTo(w, pipeY + pipeH / 2); ctx.stroke();

      // Flow particles
      const particles = particlesRef.current;
      particles.forEach(p => {
        // Compute local pipe height
        let localH = pipeH;
        if (p.x > narrowX && p.x < narrowX + narrowW) {
          localH = narrowH;
        }
        const speedMult = pipeH / localH * speed;
        p.x += speedMult * 2;
        if (p.x > w + 10) { p.x = -10; p.y = pipeY + (Math.random() - 0.5) * pipeH * 0.8; }

        // Keep inside pipe
        const halfH = localH / 2;
        if (p.y < pipeY - halfH + 5) p.y = pipeY - halfH + 5;
        if (p.y > pipeY + halfH - 5) p.y = pipeY + halfH - 5;

        // Color based on speed
        const speedRatio = speedMult / (speed * pipeH / narrowH);
        const r = Math.floor(6 + speedRatio * 238);
        const g = Math.floor(182 - speedRatio * 119);
        const b = Math.floor(212 - speedRatio * 161);
        ctx.fillStyle = `rgba(${r},${g},${b},0.6)`;
        ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fill();
      });

      // Pressure bars
      const wideP = 100;
      const narrowP = wideP * (narrowH / pipeH) ** 2;
      // Wide section bar
      ctx.fillStyle = 'rgba(6,182,212,0.3)';
      ctx.fillRect(20, pipeY + pipeH / 2 + 15, 60, -wideP * 0.5);
      ctx.fillStyle = '#06b6d4'; ctx.font = '10px Poppins'; ctx.textAlign = 'center';
      ctx.fillText('P₁ HIGH', 50, pipeY + pipeH / 2 + 30);
      // Narrow section bar
      ctx.fillStyle = 'rgba(244,63,94,0.3)';
      ctx.fillRect(w / 2 - 30, pipeY + pipeH / 2 + 15, 60, -narrowP * 0.5);
      ctx.fillStyle = '#f43f5e'; ctx.fillText('P₂ LOW', w / 2, pipeY + pipeH / 2 + 30);

      // Section labels
      ctx.fillStyle = '#94a3b8'; ctx.font = '11px Poppins'; ctx.textAlign = 'center';
      ctx.fillText('Wide Section', 80, pipeY - pipeH / 2 - 10);
      ctx.fillText('Narrow Section', w / 2, pipeY - narrowH / 2 - 10);

      // Velocity arrows
      ctx.strokeStyle = 'rgba(132,204,22,0.5)'; ctx.lineWidth = 1.5;
      // Slow arrow (wide)
      ctx.beginPath(); ctx.moveTo(50, pipeY); ctx.lineTo(90, pipeY); ctx.stroke();
      ctx.fillStyle = '#84cc16'; ctx.font = '10px Poppins'; ctx.fillText('v₁ (slow)', 70, pipeY - 8);
      // Fast arrow (narrow)
      ctx.beginPath(); ctx.moveTo(w / 2 - 20, pipeY); ctx.lineTo(w / 2 + 30, pipeY); ctx.stroke();
      ctx.fillText('v₂ (fast)', w / 2 + 5, pipeY - 8);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [constriction, flowSpeed]);

  const v1 = flowSpeed / 50;
  const areaRatio = 1 / (1 - constriction / 100);
  const v2 = v1 * areaRatio;
  const p1 = 100;
  const p2 = p1 - 0.5 * (v2 * v2 - v1 * v1) * 50;

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div><label className="text-gray-400 text-xs block mb-1">Constriction: {constriction}%</label><input type="range" min={10} max={80} step={5} value={constriction} onChange={e => setConstriction(Number(e.target.value))} className="w-full accent-brand-pink" /></div>
        <div><label className="text-gray-400 text-xs block mb-1">Flow Speed: {flowSpeed}%</label><input type="range" min={10} max={100} step={5} value={flowSpeed} onChange={e => setFlowSpeed(Number(e.target.value))} className="w-full accent-brand-cyan" /></div>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={500} height={240} className="w-full" style={{ maxWidth: 500, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="grid grid-cols-4 gap-3 mb-4">
        <div className="formula-box rounded-xl p-3 text-center"><p className="text-gray-400 text-xs uppercase">v₁</p><p className="text-lg font-space font-bold text-brand-cyan">{v1.toFixed(2)} m/s</p></div>
        <div className="formula-box rounded-xl p-3 text-center"><p className="text-gray-400 text-xs uppercase">v₂</p><p className="text-lg font-space font-bold text-brand-rose">{v2.toFixed(2)} m/s</p></div>
        <div className="formula-box rounded-xl p-3 text-center"><p className="text-gray-400 text-xs uppercase">P₁</p><p className="text-lg font-space font-bold text-brand-lime">{p1.toFixed(0)} Pa</p></div>
        <div className="formula-box rounded-xl p-3 text-center"><p className="text-gray-400 text-xs uppercase">P₂</p><p className="text-lg font-space font-bold text-brand-amber">{Math.max(0, p2).toFixed(0)} Pa</p></div>
      </div>
      <div className="formula-box rounded-xl p-4 text-center">
        <p className="text-lg font-space font-bold text-white">P₁ + ½ρv₁² = P₂ + ½ρv₂²</p>
        <p className="text-gray-400 text-sm mt-1">Bernoulli's Principle: Where speed is high, pressure is low</p>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {[{ label: 'Airplane Wing', desc: 'Faster air above = lower pressure = lift' }, { label: 'Perfume Spray', desc: 'Fast air over tube = low pressure draws liquid up' }, { label: 'Shower Curtain', desc: 'Fast moving air inside = low pressure pulls curtain in' }].map(e => (
          <div key={e.label} className="glass-card rounded-xl p-3"><p className="text-brand-cyan font-bold text-xs mb-1">{e.label}</p><p className="text-gray-400 text-xs">{e.desc}</p></div>
        ))}
      </div>
    </div>
  );
}

export default function Unit7Content() {
  const t = useT();
  const quizQuestions = useMemo(() => [
    { question: t('unit7.quiz.q1'), options: [t('unit7.quiz.q1.opt1'), t('unit7.quiz.q1.opt2'), t('unit7.quiz.q1.opt3'), t('unit7.quiz.q1.opt4')], correctIndex: 1 },
    { question: t('unit7.quiz.q2'), options: [t('unit7.quiz.q2.opt1'), t('unit7.quiz.q2.opt2'), t('unit7.quiz.q2.opt3'), t('unit7.quiz.q2.opt4')], correctIndex: 1 },
    { question: t('unit7.quiz.q3'), options: [t('unit7.quiz.q3.opt1'), t('unit7.quiz.q3.opt2'), t('unit7.quiz.q3.opt3'), t('unit7.quiz.q3.opt4')], correctIndex: 1 },
    { question: t('unit7.quiz.q4'), options: [t('unit7.quiz.q4.opt1'), t('unit7.quiz.q4.opt2'), t('unit7.quiz.q4.opt3'), t('unit7.quiz.q4.opt4')], correctIndex: 2 },
    { question: t('unit7.quiz.q5'), options: [t('unit7.quiz.q5.opt1'), t('unit7.quiz.q5.opt2'), t('unit7.quiz.q5.opt3'), t('unit7.quiz.q5.opt4')], correctIndex: 1 },
  ], [t]);
  return (
    <div>
      <Section title={t('unit7.kineticMolecular')} icon={<Atom size={24} />} color="brand-cyan">
        <h4 className="text-lg font-bold text-white mb-3">{t('unit7.threeStates')}</h4>
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          <div className="glass-card rounded-xl p-4"><p className="text-brand-purple font-bold mb-2">{t('unit7.solid')}</p><p className="text-gray-400 text-sm">{t('unit7.solidParticles')}</p><p className="text-gray-400 text-sm">{t('unit7.solidMotion')}</p><p className="text-gray-400 text-sm">{t('unit7.solidShape')}</p></div>
          <div className="glass-card rounded-xl p-4"><p className="text-brand-cyan font-bold mb-2">{t('unit7.liquid')}</p><p className="text-gray-400 text-sm">{t('unit7.liquidParticles')}</p><p className="text-gray-400 text-sm">{t('unit7.liquidMotion')}</p><p className="text-gray-400 text-sm">{t('unit7.liquidShape')}</p></div>
          <div className="glass-card rounded-xl p-4"><p className="text-brand-amber font-bold mb-2">{t('unit7.gas')}</p><p className="text-gray-400 text-sm">{t('unit7.gasParticles')}</p><p className="text-gray-400 text-sm">{t('unit7.gasMotion')}</p><p className="text-gray-400 text-sm">{t('unit7.gasShape')}</p></div>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit7.particleAnimTitle')}</h4>
        <ParticleAnimation />
      </Section>

      <Section title={t('unit7.elasticityReview')} icon={<FlaskConical size={24} />} color="brand-purple">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6"><p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit7.elasticityDef') }} /></div>
        <div className="formula-box rounded-xl p-4 text-center mb-4"><p className="text-lg font-space font-bold text-brand-cyan">{t('unit7.elasticLimitFormula')}</p></div>
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          <div className="glass-card rounded-xl p-3"><p className="text-brand-lime font-bold text-sm">{t('unit7.elasticityCard')}</p><p className="text-gray-400 text-xs">{t('unit7.elasticityCardDesc')}</p></div>
          <div className="glass-card rounded-xl p-3"><p className="text-brand-rose font-bold text-sm">{t('unit7.plasticity')}</p><p className="text-gray-400 text-xs">{t('unit7.plasticityDesc')}</p></div>
          <div className="glass-card rounded-xl p-3"><p className="text-brand-amber font-bold text-sm">{t('unit7.elasticLimit')}</p><p className="text-gray-400 text-xs">{t('unit7.elasticLimitDesc')}</p></div>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit7.springSimTitle')}</h4>
        <SpringSim7 />
      </Section>

      <Section title={t('unit7.pressureLiquids')} icon={<Droplets size={24} />} color="brand-cyan">
        <div className="formula-box rounded-2xl p-6 text-center mb-4"><p className="text-3xl font-space font-black text-white" dangerouslySetInnerHTML={{ __html: t('unit7.liquidPressureFormula') }}></p>
          <div className="flex justify-center gap-6 mt-3 text-sm"><span className="text-brand-cyan">{t('unit7.densityLabel')}</span><span className="text-brand-pink">{t('unit7.gLabel')}</span><span className="text-brand-amber">{t('unit7.depthLabel')}</span></div>
        </div>
        <div className="glass-card rounded-xl p-4 mb-6"><p className="text-brand-amber font-bold mb-2">{t('unit7.keyPointsTitle')}</p><p className="text-gray-300 text-sm">{t('unit7.keyPointsDesc')}</p></div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit7.liquidPressureSimTitle')}</h4>
        <LiquidPressureSim />
      </Section>

      <Section title={t('unit7.pascalLaw')} icon={<Waves size={24} />} color="brand-amber">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6"><p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit7.pascalLawDef') }}></p></div>
        <div className="formula-box rounded-2xl p-5 text-center mb-6"><p className="text-2xl font-space font-bold text-white">{t('unit7.pascalFormula')}</p><p className="text-brand-amber font-space font-bold mt-2">{t('unit7.pascalResult')}</p></div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit7.hydraulicLiftTitle')}</h4>
        <PascalLawSim />
      </Section>

      <Section title={t('unit7.surfaceTension')} icon={<Droplets size={24} />} color="brand-teal">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6"><p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit7.surfaceTensionDef') }}></p></div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit7.needleWaterTitle')}</h4>
        <SurfaceTensionSim />
      </Section>

      <Section title={t('unit7.viscosity')} icon={<Wind size={24} />} color="brand-rose">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6"><p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit7.viscosityDef') }}></p></div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit7.ballDropTitle')}</h4>
        <ViscositySim />
      </Section>

      {/* BERNOULLI'S PRINCIPLE */}
      <div className="unit-detail-reveal glass-card rounded-3xl p-8" {...GSAP_REVEAL_STYLE}>
        <h2 className="text-3xl font-black mb-2">Bernoulli's Principle</h2>
        <p className="text-gray-400 mb-4">Where fluid speed is high, pressure is low — and vice versa.</p>
        <div className="formula-box rounded-2xl p-5 text-center mb-6">
          <p className="text-xl font-space font-bold text-white">P + ½ρv² + ρgh = constant</p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">Venturi Tube Demonstrator</h4>
        <BernoulliSim />
      </div>

      {/* STREAMLINE FLOW */}
      <div className="unit-detail-reveal glass-card rounded-3xl p-8" {...GSAP_REVEAL_STYLE}>
        <h2 className="text-3xl font-black mb-2">Streamline Flow Visualization</h2>
        <p className="text-gray-400 mb-6">Watch how fluid speeds up in narrow sections and slows in wide sections — continuity in action.</p>
        <StreamlineFlowSim />
      </div>

      <Section title={t('unit7.hookeLawExp')} icon={<FlaskConical size={24} />} color="brand-lime">
        <h4 className="text-lg font-bold text-white mb-4">{t('unit7.plotGraphTitle')}</h4>
        <HookeLawExp />
      </Section>

      <UnitQuiz unitId="unit7" questions={quizQuestions} />

      <div className="unit-detail-reveal glass-card-strong rounded-3xl p-8 md:p-12 text-center mb-16" {...GSAP_REVEAL_STYLE}>
        <h3 className="text-2xl md:text-3xl font-black text-white mb-6">{t('unit7.summary')}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-start">
          <div className="bg-white/5 rounded-xl p-4"><p className="text-brand-purple font-bold text-sm mb-1">{t('unit7.sumStatesOfMatter')}</p><p className="text-gray-400 text-xs">{t('unit7.sumStatesOfMatterDesc')}</p></div>
          <div className="bg-white/5 rounded-xl p-4"><p className="text-brand-cyan font-bold text-sm mb-1">{t('unit7.sumLiquidPressure')}</p><p className="text-gray-400 text-xs">{t('unit7.sumLiquidPressureDesc')}</p></div>
          <div className="bg-white/5 rounded-xl p-4"><p className="text-brand-amber font-bold text-sm mb-1">{t('unit7.sumPascalLaw')}</p><p className="text-gray-400 text-xs">{t('unit7.sumPascalLawDesc')}</p></div>
          <div className="bg-white/5 rounded-xl p-4"><p className="text-brand-teal font-bold text-sm mb-1">{t('unit7.sumSurfaceTension')}</p><p className="text-gray-400 text-xs">{t('unit7.sumSurfaceTensionDesc')}</p></div>
          <div className="bg-white/5 rounded-xl p-4"><p className="text-brand-rose font-bold text-sm mb-1">{t('unit7.sumViscosity')}</p><p className="text-gray-400 text-xs">{t('unit7.sumViscosityDesc')}</p></div>
          <div className="bg-white/5 rounded-xl p-4"><p className="text-brand-lime font-bold text-sm mb-1">{t('unit7.sumHookeLaw')}</p><p className="text-gray-400 text-xs">{t('unit7.sumHookeLawDesc')}</p></div>
        </div>
      </div>
    </div>
  );
}
