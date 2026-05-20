import { useState, useEffect, useRef } from 'react';
import {
  Move, Gauge, Zap, TrendingUp,
  RotateCcw, Ruler, Car, Target,
  CircleDot
} from 'lucide-react';
import { useT } from '../../i18n/LanguageContext';
import { GSAP_REVEAL_STYLE } from '../../utils/styles';
import Section from '../Section';
import ProjectileMotion from '../simulations/ProjectileMotion';
import VectorSimulation from '../simulations/VectorSimulation';

/* ─── EQUATIONS OF MOTION CALCULATOR ─── */
function EquationsOfMotionCalc() {
  const [u, setU] = useState(0);
  const [v, setV] = useState(20);
  const [a, setA] = useState(2);
  const [t, setT] = useState(10);
  const [knownVar, setKnownVar] = useState<'uvat' | 'uvas' | 'uvts' | 'uats' | 'vats'>('uvat');

  const calcMissing = () => {
    switch (knownVar) {
      case 'uvat': return { label: 's (displacement)', value: u * t + 0.5 * a * t * t, unit: 'm' };
      case 'uvas': return { label: 't (time)', value: (v - u) / a || 0, unit: 's' };
      case 'uvts': return { label: 'a (acceleration)', value: (v - u) / t || 0, unit: 'm/s²' };
      case 'uats': return { label: 'v (final velocity)', value: u + a * t, unit: 'm/s' };
      case 'vats': return { label: 'u (initial velocity)', value: v - a * t, unit: 'm/s' };
    }
  };

  const result = calcMissing();
  const equations = [
    { name: 'v = u + at', desc: 'Velocity-time' },
    { name: 's = ut + ½at²', desc: 'Displacement-time' },
    { name: 'v² = u² + 2as', desc: 'Velocity-displacement' },
    { name: 's = ½(u+v)t', desc: 'Average velocity' },
  ];

  const varGroups: { key: typeof knownVar; label: string; missing: string }[] = [
    { key: 'uvat', label: 'Know u, v, a, t', missing: 's' },
    { key: 'uvas', label: 'Know u, v, a, s', missing: 't' },
    { key: 'uvts', label: 'Know u, v, t, s', missing: 'a' },
    { key: 'uats', label: 'Know u, a, t, s', missing: 'v' },
    { key: 'vats', label: 'Know v, a, t, s', missing: 'u' },
  ];

  return (
    <div>
      <div className="flex gap-2 mb-4 flex-wrap">
        {varGroups.map(g => (
          <button key={g.key} onClick={() => setKnownVar(g.key)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${knownVar === g.key ? 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/30' : 'glass-card text-gray-400 border-white/10'}`}>
            {g.label} → {g.missing}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div>
          <label className="text-gray-400 text-xs block mb-1">u (m/s): {u}</label>
          <input type="range" min={0} max={50} value={u} onChange={e => setU(Number(e.target.value))} className="w-full accent-brand-cyan" />
        </div>
        <div>
          <label className="text-gray-400 text-xs block mb-1">v (m/s): {v}</label>
          <input type="range" min={0} max={50} value={v} onChange={e => setV(Number(e.target.value))} className="w-full accent-brand-purple" />
        </div>
        <div>
          <label className="text-gray-400 text-xs block mb-1">a (m/s²): {a}</label>
          <input type="range" min={-10} max={10} value={a} onChange={e => setA(Number(e.target.value))} className="w-full accent-brand-amber" />
        </div>
        <div>
          <label className="text-gray-400 text-xs block mb-1">t (s): {t}</label>
          <input type="range" min={0} max={30} value={t} onChange={e => setT(Number(e.target.value))} className="w-full accent-brand-rose" />
        </div>
      </div>
      <div className="formula-box rounded-2xl p-6 text-center mb-4">
        <p className="text-gray-400 text-sm mb-2">Calculated: {result.label}</p>
        <p className="text-3xl font-space font-black text-brand-cyan">{result.value.toFixed(2)} {result.unit}</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {equations.map(eq => (
          <div key={eq.name} className="glass-card rounded-lg p-3 text-center">
            <p className="text-brand-cyan font-space font-bold text-sm">{eq.name}</p>
            <p className="text-gray-500 text-xs">{eq.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── RELATIVE MOTION SIMULATOR ─── */
function RelativeMotionSim() {
  const [scenario, setScenario] = useState<'truck' | 'river' | 'wind'>('truck');
  const [objSpeed, setObjSpeed] = useState(5);
  const [frameSpeed, setFrameSpeed] = useState(3);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;

    const draw = () => {
      animRef.current = requestAnimationFrame(draw);
      tRef.current += 0.02;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2, cy = h / 2;

      // Grid
      ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = 0.5;
      for (let x = 0; x < w; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

      // Ground reference
      ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(40, cy + 60); ctx.lineTo(w - 40, cy + 60); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.font = '10px Poppins'; ctx.textAlign = 'center';
      ctx.fillText('Ground', cx, cy + 75);

      const phase = tRef.current % (Math.PI * 2);
      const objDisp = Math.sin(phase) * 60;

      if (scenario === 'truck') {
        // Truck (reference frame) moves right
        const truckX = cx - 80 + frameSpeed * 8 * Math.sin(phase * 0.5);
        const carX = truckX + objDisp * (objSpeed / 5);

        // Truck body
        ctx.fillStyle = 'rgba(124,58,237,0.3)'; ctx.fillRect(truckX - 60, cy - 10, 120, 40);
        ctx.strokeStyle = '#a78bfa'; ctx.lineWidth = 2; ctx.strokeRect(truckX - 60, cy - 10, 120, 40);
        ctx.fillStyle = '#a78bfa'; ctx.font = 'bold 10px Poppins'; ctx.textAlign = 'center';
        ctx.fillText('Truck', truckX, cy + 25);

        // Car on truck
        ctx.fillStyle = 'rgba(6,182,212,0.4)'; ctx.fillRect(carX - 20, cy - 30, 40, 20);
        ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 2; ctx.strokeRect(carX - 20, cy - 30, 40, 20);
        ctx.fillStyle = '#06b6d4'; ctx.font = '10px Poppins'; ctx.fillText('Car', carX, cy - 35);

        // Vectors
        drawArrow(ctx, cx, cy + 100, frameSpeed * 12, 0, '#a78bfa', `V_truck = ${frameSpeed}`);
        drawArrow(ctx, cx, cy + 130, objSpeed * 8, 0, '#06b6d4', `V_car/truck = ${objSpeed}`);
        drawArrow(ctx, cx, cy + 160, frameSpeed * 12 + objSpeed * 8, 0, '#84cc16', `V_car/ground = ${(frameSpeed + objSpeed).toFixed(1)}`);

      } else if (scenario === 'river') {
        const boatX = cx + objDisp * (objSpeed / 5);
        const boatY = cy - 40 - frameSpeed * 5 * Math.abs(Math.sin(phase * 0.3));

        // River banks
        ctx.fillStyle = 'rgba(6,182,212,0.08)'; ctx.fillRect(40, cy - 80, w - 80, 100);
        ctx.strokeStyle = 'rgba(6,182,212,0.2)'; ctx.lineWidth = 1;
        ctx.strokeRect(40, cy - 80, w - 80, 100);
        ctx.fillStyle = 'rgba(6,182,212,0.3)'; ctx.font = '10px Poppins'; ctx.textAlign = 'center';
        ctx.fillText('River', cx, cy - 85);

        // Boat
        ctx.fillStyle = 'rgba(245,158,11,0.4)'; ctx.beginPath();
        ctx.moveTo(boatX - 20, boatY); ctx.lineTo(boatX + 20, boatY);
        ctx.lineTo(boatX + 15, boatY + 12); ctx.lineTo(boatX - 15, boatY + 12); ctx.closePath();
        ctx.fill(); ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2; ctx.stroke();

        // Vectors
        drawArrow(ctx, cx, cy + 100, objSpeed * 10, 0, '#06b6d4', `V_boat = ${objSpeed} →`);
        drawArrow(ctx, cx, cy + 130, 0, -frameSpeed * 10, '#f59e0b', `V_current = ${frameSpeed} ↓`);
        const rx = objSpeed * 10, ry = -frameSpeed * 10;
        drawArrow(ctx, cx, cy + 160, rx, ry, '#84cc16', `V_resultant = ${Math.sqrt(objSpeed ** 2 + frameSpeed ** 2).toFixed(1)}`);

      } else { // wind
        const planeX = cx + objDisp * (objSpeed / 5);
        const planeY = cy - 50 + frameSpeed * 3 * Math.sin(phase * 0.4);

        // Plane
        ctx.fillStyle = 'rgba(244,63,94,0.4)'; ctx.beginPath();
        ctx.moveTo(planeX, planeY - 8); ctx.lineTo(planeX + 30, planeY + 4);
        ctx.lineTo(planeX, planeY + 8); ctx.lineTo(planeX - 30, planeY + 4); ctx.closePath();
        ctx.fill(); ctx.strokeStyle = '#f43f5e'; ctx.lineWidth = 2; ctx.stroke();

        // Wind lines
        for (let i = 0; i < 5; i++) {
          const wy = cy - 80 + i * 25;
          ctx.strokeStyle = 'rgba(132,204,22,0.2)'; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(60, wy); ctx.lineTo(60 + 30 + frameSpeed * 10, wy); ctx.stroke();
          ctx.fillStyle = 'rgba(132,204,22,0.3)'; ctx.font = '8px Poppins'; ctx.textAlign = 'left';
          ctx.fillText('→', 60 + 30 + frameSpeed * 10 + 5, wy + 3);
        }

        drawArrow(ctx, cx, cy + 100, objSpeed * 10, 0, '#f43f5e', `V_plane = ${objSpeed}`);
        drawArrow(ctx, cx, cy + 130, frameSpeed * 8, -frameSpeed * 4, '#84cc16', `V_wind = ${frameSpeed}`);
        drawArrow(ctx, cx, cy + 160, objSpeed * 10 + frameSpeed * 8, -frameSpeed * 4, '#f59e0b', `V_ground = ${(Math.sqrt((objSpeed + frameSpeed * 0.8) ** 2 + (frameSpeed * 0.4) ** 2)).toFixed(1)}`);
      }

      // Title
      ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.font = 'bold 12px Poppins'; ctx.textAlign = 'center';
      const labels = { truck: 'Car on Moving Truck', river: 'Boat Crossing River', wind: 'Airplane in Wind' };
      ctx.fillText(labels[scenario], cx, 25);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [scenario, objSpeed, frameSpeed]);

  const drawArrow = (ctx: CanvasRenderingContext2D, ox: number, oy: number, dx: number, dy: number, color: string, label: string) => {
    ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.globalAlpha = 0.8;
    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + dx, oy + dy); ctx.stroke();
    const angle = Math.atan2(dy, dx);
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.moveTo(ox + dx, oy + dy);
    ctx.lineTo(ox + dx - 8 * Math.cos(angle - 0.4), oy + dy - 8 * Math.sin(angle - 0.4));
    ctx.lineTo(ox + dx - 8 * Math.cos(angle + 0.4), oy + dy - 8 * Math.sin(angle + 0.4));
    ctx.closePath(); ctx.fill();
    ctx.font = '10px Poppins'; ctx.textAlign = 'left';
    ctx.fillText(label, ox + dx + 8, oy + dy - 5);
    ctx.globalAlpha = 1;
  };

  return (
    <div>
      <div className="flex gap-2 mb-4 flex-wrap">
        {([['truck', 'Car on Truck'], ['river', 'Boat in River'], ['wind', 'Plane in Wind']] as const).map(([key, label]) => (
          <button key={key} onClick={() => setScenario(key)} className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${scenario === key ? 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/30' : 'glass-card text-gray-400 border-white/10'}`}>{label}</button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-gray-400 text-sm block mb-2">Object Speed: {objSpeed} m/s</label>
          <input type="range" min={1} max={15} value={objSpeed} onChange={e => setObjSpeed(Number(e.target.value))} className="w-full accent-brand-cyan" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">Frame Speed: {frameSpeed} m/s</label>
          <input type="range" min={0} max={10} value={frameSpeed} onChange={e => setFrameSpeed(Number(e.target.value))} className="w-full accent-brand-amber" />
        </div>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={500} height={280} className="w-full" style={{ maxWidth: 500, margin: '0 auto', display: 'block' }} />
      </div>
    </div>
  );
}

/* ─── VELOCITY-TIME GRAPH ANALYZER ─── */
function VelocityTimeGraphAnalyzer() {
  const [u, setU] = useState(0);
  const [a, setA] = useState(2);
  const [tVal, setTVal] = useState(5);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const pad = { l: 60, r: 30, t: 30, b: 50 };
    const gw = w - pad.l - pad.r, gh = h - pad.t - pad.b;

    // Compute axis ranges
    const maxT = 10;
    const vAtMaxT = u + a * maxT;
    const minV = Math.min(0, u, vAtMaxT) - 2;
    const maxV = Math.max(0, u, vAtMaxT) + 2;
    const vRange = maxV - minV;

    const toX = (t: number) => pad.l + (t / maxT) * gw;
    const toY = (v: number) => pad.t + gh - ((v - minV) / vRange) * gh;

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 0.5;
    for (let i = 0; i <= 10; i++) { const x = toX(i); ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, h - pad.b); ctx.stroke(); }
    for (let i = Math.ceil(minV); i <= Math.floor(maxV); i++) { const y = toY(i); ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(w - pad.r, y); ctx.stroke(); }

    // Axes
    ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(pad.l, pad.t); ctx.lineTo(pad.l, h - pad.b); ctx.lineTo(w - pad.r, h - pad.b); ctx.stroke();

    // Axis labels
    ctx.fillStyle = '#94a3b8'; ctx.font = '11px Poppins'; ctx.textAlign = 'center';
    ctx.fillText('Time (s)', w / 2, h - 8);
    ctx.save(); ctx.translate(15, h / 2); ctx.rotate(-Math.PI / 2); ctx.fillText('Velocity (m/s)', 0, 0); ctx.restore();

    // Tick labels
    ctx.fillStyle = '#64748b'; ctx.font = '10px Poppins';
    for (let i = 0; i <= 10; i += 2) { ctx.textAlign = 'center'; ctx.fillText(String(i), toX(i), h - pad.b + 16); }
    ctx.textAlign = 'right';
    for (let i = Math.ceil(minV); i <= Math.floor(maxV); i += Math.max(1, Math.floor(vRange / 8))) { ctx.fillText(String(i), pad.l - 8, toY(i) + 4); }

    // Zero line
    if (minV < 0 && maxV > 0) {
      ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(pad.l, toY(0)); ctx.lineTo(w - pad.r, toY(0)); ctx.stroke(); ctx.setLineDash([]);
    }

    // Shaded area (displacement) from 0 to tVal
    ctx.beginPath(); ctx.moveTo(toX(0), toY(0));
    for (let t = 0; t <= tVal; t += 0.1) { ctx.lineTo(toX(t), toY(u + a * t)); }
    ctx.lineTo(toX(tVal), toY(0)); ctx.closePath();
    ctx.fillStyle = 'rgba(132,204,22,0.15)'; ctx.fill();

    // v-t line
    ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let t = 0; t <= maxT; t += 0.1) { const v = u + a * t; t === 0 ? ctx.moveTo(toX(t), toY(v)) : ctx.lineTo(toX(t), toY(v)); }
    ctx.stroke();

    // Current point
    const vNow = u + a * tVal;
    ctx.fillStyle = '#f43f5e'; ctx.beginPath(); ctx.arc(toX(tVal), toY(vNow), 6, 0, Math.PI * 2); ctx.fill();

    // Slope annotation
    if (tVal > 1) {
      const t1 = tVal - 1, v1 = u + a * t1;
      ctx.strokeStyle = 'rgba(245,158,11,0.6)'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(toX(t1), toY(v1)); ctx.lineTo(toX(tVal), toY(vNow)); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = '#f59e0b'; ctx.font = 'bold 11px Poppins'; ctx.textAlign = 'left';
      ctx.fillText('slope = a', toX(tVal) + 8, toY(vNow) - 8);
    }

    // Area label
    ctx.fillStyle = '#84cc16'; ctx.font = 'bold 11px Poppins'; ctx.textAlign = 'center';
    ctx.fillText('area = displacement', toX(tVal / 2), toY((u + vNow) / 2));
  }, [u, a, tVal]);

  const vNow = u + a * tVal;
  const displacement = u * tVal + 0.5 * a * tVal * tVal;

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div><label className="text-gray-400 text-xs block mb-1">Initial Velocity (u): {u} m/s</label><input type="range" min={-10} max={10} step={0.5} value={u} onChange={e => setU(Number(e.target.value))} className="w-full accent-brand-pink" /></div>
        <div><label className="text-gray-400 text-xs block mb-1">Acceleration (a): {a} m/s²</label><input type="range" min={-5} max={5} step={0.25} value={a} onChange={e => setA(Number(e.target.value))} className="w-full accent-brand-rose" /></div>
        <div><label className="text-gray-400 text-xs block mb-1">Time (t): {tVal} s</label><input type="range" min={0.5} max={10} step={0.5} value={tVal} onChange={e => setTVal(Number(e.target.value))} className="w-full accent-brand-lime" /></div>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={550} height={300} className="w-full" style={{ maxWidth: 550, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="formula-box rounded-xl p-3 text-center"><p className="text-gray-400 text-xs uppercase">Velocity at t={tVal}s</p><p className="text-lg font-space font-bold text-brand-cyan">{vNow.toFixed(1)} m/s</p></div>
        <div className="formula-box rounded-xl p-3 text-center"><p className="text-gray-400 text-xs uppercase">Displacement</p><p className="text-lg font-space font-bold text-brand-lime">{displacement.toFixed(1)} m</p></div>
        <div className="formula-box rounded-xl p-3 text-center"><p className="text-gray-400 text-xs uppercase">Acceleration</p><p className="text-lg font-space font-bold text-brand-rose">{a.toFixed(2)} m/s²</p></div>
      </div>
    </div>
  );
}

/* ─── TICKER TAPE SIMULATION ─── */
function TickerTapeSimulation() {
  const [mode, setMode] = useState<'uniform' | 'accelerated'>('uniform');
  const [speed, setSpeed] = useState(2);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;

    const draw = () => {
      animRef.current = requestAnimationFrame(draw);
      timeRef.current += 0.016 * speed;
      const t = timeRef.current;
      ctx.clearRect(0, 0, w, h);

      // Tape strip
      ctx.fillStyle = 'rgba(255,255,255,0.03)';
      ctx.fillRect(20, h / 2 - 20, w - 40, 40);
      ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 1;
      ctx.strokeRect(20, h / 2 - 20, w - 40, 40);

      // Dots
      const dotInterval = 0.05;
      const maxDots = 30;
      const startX = 40;
      const tapeWidth = w - 80;

      for (let i = 0; i < maxDots; i++) {
        const dotTime = i * dotInterval;
        if (dotTime > t) break;

        let x;
        if (mode === 'uniform') {
          x = startX + (i / maxDots) * tapeWidth * 0.8;
        } else {
          // Accelerated: x ∝ t²
          x = startX + (i * i) / (maxDots * maxDots) * tapeWidth * 0.9;
        }

        if (x > w - 30) break;

        ctx.fillStyle = i % 2 === 0 ? '#06b6d4' : '#a78bfa';
        ctx.beginPath(); ctx.arc(x, h / 2, 3, 0, Math.PI * 2); ctx.fill();

        // Spacing labels for first few dots
        if (i > 0 && i < 6) {
          let prevX;
          if (mode === 'uniform') {
            prevX = startX + ((i - 1) / maxDots) * tapeWidth * 0.8;
          } else {
            prevX = startX + ((i - 1) * (i - 1)) / (maxDots * maxDots) * tapeWidth * 0.9;
          }
          const gap = x - prevX;
          ctx.strokeStyle = 'rgba(132,204,22,0.4)'; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(prevX, h / 2 + 12); ctx.lineTo(x, h / 2 + 12); ctx.stroke();
          ctx.fillStyle = '#84cc16'; ctx.font = '9px Poppins'; ctx.textAlign = 'center';
          ctx.fillText(`${gap.toFixed(0)}px`, (prevX + x) / 2, h / 2 + 24);
        }
      }

      // Animated object
      const rawProgress = (t % 2) / 2;
      const objProgress = mode === 'accelerated' ? rawProgress * rawProgress : rawProgress;
      const objX = startX + objProgress * tapeWidth * 0.8;
      ctx.fillStyle = '#f43f5e';
      ctx.fillRect(objX - 15, h / 2 - 30, 30, 20);
      ctx.fillStyle = '#fff'; ctx.font = 'bold 10px Poppins'; ctx.textAlign = 'center';
      ctx.fillText('OBJ', objX, h / 2 - 17);

      // Pattern label
      ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 13px Poppins'; ctx.textAlign = 'center';
      ctx.fillText(mode === 'uniform' ? 'Uniform Spacing — Constant Velocity' : 'Increasing Spacing — Acceleration', w / 2, 30);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [mode, speed]);

  return (
    <div>
      <div className="flex gap-3 mb-4">
        <button onClick={() => setMode('uniform')} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${mode === 'uniform' ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : 'glass-card text-gray-400'}`}>Uniform Motion</button>
        <button onClick={() => setMode('accelerated')} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${mode === 'accelerated' ? 'bg-brand-rose/20 text-brand-rose border border-brand-rose/30' : 'glass-card text-gray-400'}`}>Accelerated Motion</button>
      </div>
      <div className="mb-4"><label className="text-gray-400 text-xs block mb-1">Speed: {speed}x</label><input type="range" min={0.5} max={5} step={0.5} value={speed} onChange={e => setSpeed(Number(e.target.value))} className="w-full accent-brand-purple" /></div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={550} height={140} className="w-full" style={{ maxWidth: 550, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="glass-card rounded-xl p-4">
        <p className="text-gray-300 text-sm">
          {mode === 'uniform' ? 'Equal time intervals produce equal distances — the object moves at constant velocity.' : 'Equal time intervals produce increasing distances — the object is accelerating.'}
        </p>
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
          <button key={m.key} onClick={() => setMode(m.key)} className={`p-3 rounded-2xl text-start transition-all ${mode === m.key ? `bg-${m.color}/15 border border-${m.color}/40` : 'glass-card hover:bg-white/5'}`}>
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
        <h4 className="text-lg font-bold text-white mb-4 mt-8">📈 Velocity-Time Graph Analyzer</h4>
        <VelocityTimeGraphAnalyzer />
      </Section>

      {/* TICKER TAPE SIMULATION */}
      <div className="unit-detail-reveal glass-card rounded-3xl p-8" {...GSAP_REVEAL_STYLE}>
        <h2 className="text-3xl font-black mb-2">Ticker Tape Simulation</h2>
        <p className="text-gray-400 mb-6">See how dots on a ticker tape show uniform vs accelerated motion.</p>
        <TickerTapeSimulation />
      </div>

      {/* PROJECTILE MOTION */}
      <div className="unit-detail-reveal glass-card rounded-3xl p-8" {...GSAP_REVEAL_STYLE}>
        <h2 className="text-3xl font-black mb-2">Projectile Motion</h2>
        <p className="text-gray-400 mb-6">Explore how objects move under gravity with adjustable angle and velocity.</p>
        <ProjectileMotion />
      </div>

      {/* VECTOR ADDITION */}
      <div className="unit-detail-reveal glass-card rounded-3xl p-8" {...GSAP_REVEAL_STYLE}>
        <h2 className="text-3xl font-black mb-2">Vector Addition</h2>
        <p className="text-gray-400 mb-6">Add two vectors graphically and see the resultant. Adjust magnitude and direction of each vector.</p>
        <VectorSimulation />
      </div>

      {/* RELATIVE MOTION */}
      <div className="unit-detail-reveal glass-card rounded-3xl p-8" {...GSAP_REVEAL_STYLE}>
        <h2 className="text-3xl font-black mb-2">Relative Motion Simulator</h2>
        <p className="text-gray-400 mb-6">Explore how motion appears different from different reference frames.</p>
        <RelativeMotionSim />
      </div>

      {/* EQUATIONS OF MOTION */}
      <div className="unit-detail-reveal glass-card rounded-3xl p-8" {...GSAP_REVEAL_STYLE}>
        <h2 className="text-3xl font-black mb-2">Equations of Motion Calculator</h2>
        <p className="text-gray-400 mb-6">Select known variables and calculate the unknown using kinematic equations.</p>
        <EquationsOfMotionCalc />
      </div>

      <div className="unit-detail-reveal glass-card-strong rounded-3xl p-8 md:p-12 text-center mb-16" {...GSAP_REVEAL_STYLE}>
        <h3 className="text-2xl md:text-3xl font-black text-white mb-6">{t('unit2.summary')}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-start">
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