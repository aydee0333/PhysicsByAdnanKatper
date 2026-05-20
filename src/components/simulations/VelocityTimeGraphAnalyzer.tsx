import { useState, useEffect, useRef } from 'react';

export default function VelocityTimeGraphAnalyzer() {
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
    const maxT = 10;
    const vAtMaxT = u + a * maxT;
    const minV = Math.min(0, u, vAtMaxT) - 2;
    const maxV = Math.max(0, u, vAtMaxT) + 2;
    const vRange = maxV - minV;

    const toX = (t: number) => pad.l + (t / maxT) * gw;
    const toY = (v: number) => pad.t + gh - ((v - minV) / vRange) * gh;

    ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 0.5;
    for (let i = 0; i <= 10; i++) { const x = toX(i); ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, h - pad.b); ctx.stroke(); }
    for (let i = Math.ceil(minV); i <= Math.floor(maxV); i++) { const y = toY(i); ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(w - pad.r, y); ctx.stroke(); }

    ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(pad.l, pad.t); ctx.lineTo(pad.l, h - pad.b); ctx.lineTo(w - pad.r, h - pad.b); ctx.stroke();

    ctx.fillStyle = '#94a3b8'; ctx.font = '11px Poppins'; ctx.textAlign = 'center';
    ctx.fillText('Time (s)', w / 2, h - 8);
    ctx.save(); ctx.translate(15, h / 2); ctx.rotate(-Math.PI / 2); ctx.fillText('Velocity (m/s)', 0, 0); ctx.restore();

    ctx.fillStyle = '#64748b'; ctx.font = '10px Poppins';
    for (let i = 0; i <= 10; i += 2) { ctx.textAlign = 'center'; ctx.fillText(String(i), toX(i), h - pad.b + 16); }
    ctx.textAlign = 'right';
    for (let i = Math.ceil(minV); i <= Math.floor(maxV); i += Math.max(1, Math.floor(vRange / 8))) { ctx.fillText(String(i), pad.l - 8, toY(i) + 4); }

    if (minV < 0 && maxV > 0) {
      ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(pad.l, toY(0)); ctx.lineTo(w - pad.r, toY(0)); ctx.stroke(); ctx.setLineDash([]);
    }

    ctx.beginPath(); ctx.moveTo(toX(0), toY(0));
    for (let t = 0; t <= tVal; t += 0.1) { ctx.lineTo(toX(t), toY(u + a * t)); }
    ctx.lineTo(toX(tVal), toY(0)); ctx.closePath();
    ctx.fillStyle = 'rgba(132,204,22,0.15)'; ctx.fill();

    ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let t = 0; t <= maxT; t += 0.1) { const v = u + a * t; t === 0 ? ctx.moveTo(toX(t), toY(v)) : ctx.lineTo(toX(t), toY(v)); }
    ctx.stroke();

    const vNow = u + a * tVal;
    ctx.fillStyle = '#f43f5e'; ctx.beginPath(); ctx.arc(toX(tVal), toY(vNow), 6, 0, Math.PI * 2); ctx.fill();

    if (tVal > 1) {
      const t1 = tVal - 1, v1 = u + a * t1;
      ctx.strokeStyle = 'rgba(245,158,11,0.6)'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(toX(t1), toY(v1)); ctx.lineTo(toX(tVal), toY(vNow)); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = '#f59e0b'; ctx.font = 'bold 11px Poppins'; ctx.textAlign = 'left';
      ctx.fillText('slope = a', toX(tVal) + 8, toY(vNow) - 8);
    }

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
