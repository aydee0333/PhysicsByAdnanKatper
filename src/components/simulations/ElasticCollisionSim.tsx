import { useState, useEffect, useRef } from 'react';
import { RotateCcw } from 'lucide-react';

export default function ElasticCollisionSim() {
  const [m1, setM1] = useState(3);
  const [m2, setM2] = useState(5);
  const [v1, setV1] = useState(4);
  const [v2, setV2] = useState(-2);
  const [phase, setPhase] = useState<'setup' | 'colliding' | 'done'>('setup');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef({ x1: 80, x2: 380, v1: 0, v2: 0 });

  const ke1 = 0.5 * m1 * v1 * v1;
  const ke2 = 0.5 * m2 * v2 * v2;

  const v1f = ((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2);
  const v2f = ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2);
  const ke1f = 0.5 * m1 * v1f * v1f;
  const ke2f = 0.5 * m2 * v2f * v2f;

  const startCollision = () => {
    setPhase('colliding');
    posRef.current = { x1: 80, x2: 380, v1: v1 * 2, v2: v2 * 2 };
  };

  const reset = () => {
    setPhase('setup');
    posRef.current = { x1: 80, x2: 380, v1: 0, v2: 0 };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;

    const draw = () => {
      animRef.current = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, w, h);

      const p = posRef.current;
      if (phase === 'colliding') {
        p.x1 += p.v1;
        p.x2 += p.v2;

        if (p.x1 + 25 >= p.x2 - 25) {
          const sv1 = p.v1 / 2;
          const sv2 = p.v2 / 2;
          p.v1 = ((m1 - m2) * sv1 + 2 * m2 * sv2) / (m1 + m2) * 2;
          p.v2 = ((m2 - m1) * sv2 + 2 * m1 * sv1) / (m1 + m2) * 2;
          p.x1 = p.x2 - 50;
        }

        if (p.x1 > w + 50 || p.x2 < -50) {
          setPhase('done');
        }
      }

      const y = h / 2;
      const r1 = 15 + m1 * 3;
      const r2 = 15 + m2 * 3;

      ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, y + r2 + 5); ctx.lineTo(w, y + r2 + 5); ctx.stroke();

      ctx.fillStyle = phase === 'done' ? 'rgba(132,204,22,0.3)' : 'rgba(6,182,212,0.3)';
      ctx.strokeStyle = phase === 'done' ? '#84cc16' : '#06b6d4'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(phase === 'setup' ? 80 : posRef.current.x1, y, r1, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 10px Poppins'; ctx.textAlign = 'center';
      ctx.fillText(`${m1}kg`, phase === 'setup' ? 80 : posRef.current.x1, y + 4);

      ctx.fillStyle = phase === 'done' ? 'rgba(244,63,94,0.3)' : 'rgba(245,158,11,0.3)';
      ctx.strokeStyle = phase === 'done' ? '#f43f5e' : '#f59e0b'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(phase === 'setup' ? 380 : posRef.current.x2, y, r2, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 10px Poppins'; ctx.textAlign = 'center';
      ctx.fillText(`${m2}kg`, phase === 'setup' ? 380 : posRef.current.x2, y + 4);

      if (phase === 'setup') {
        ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(80, y - r1 - 10); ctx.lineTo(80 + v1 * 10, y - r1 - 10); ctx.stroke();
        ctx.fillStyle = '#06b6d4'; ctx.font = '10px Poppins'; ctx.fillText(`${v1} m/s →`, 80 + v1 * 5, y - r1 - 15);

        ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(380, y - r2 - 10); ctx.lineTo(380 + v2 * 10, y - r2 - 10); ctx.stroke();
        ctx.fillStyle = '#f59e0b'; ctx.fillText(`← ${Math.abs(v2)} m/s`, 380 + v2 * 5, y - r2 - 15);
      }
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [phase, m1, m2, v1, v2]);

  return (
    <div>
      <div className="grid grid-cols-4 gap-3 mb-4">
        <div><label className="text-gray-400 text-xs block mb-1">Mass 1: {m1} kg</label><input type="range" min={1} max={10} step={1} value={m1} onChange={e => { setM1(Number(e.target.value)); reset(); }} className="w-full accent-brand-cyan" /></div>
        <div><label className="text-gray-400 text-xs block mb-1">Mass 2: {m2} kg</label><input type="range" min={1} max={10} step={1} value={m2} onChange={e => { setM2(Number(e.target.value)); reset(); }} className="w-full accent-brand-amber" /></div>
        <div><label className="text-gray-400 text-xs block mb-1">v₁: {v1} m/s</label><input type="range" min={-8} max={8} step={0.5} value={v1} onChange={e => { setV1(Number(e.target.value)); reset(); }} className="w-full accent-brand-cyan" /></div>
        <div><label className="text-gray-400 text-xs block mb-1">v₂: {v2} m/s</label><input type="range" min={-8} max={8} step={0.5} value={v2} onChange={e => { setV2(Number(e.target.value)); reset(); }} className="w-full accent-brand-amber" /></div>
      </div>
      <div className="flex gap-2 mb-4">
        <button onClick={startCollision} disabled={phase === 'colliding'} className="px-4 py-2 rounded-xl text-sm font-semibold bg-brand-purple/20 text-brand-purple border border-brand-purple/30 disabled:opacity-50">Collide!</button>
        <button onClick={reset} className="px-4 py-2 rounded-xl text-sm font-semibold glass-card text-gray-400"><RotateCcw size={14} className="inline me-1" /> Reset</button>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={500} height={150} className="w-full" style={{ maxWidth: 500, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-400 text-xs uppercase mb-2 font-bold">Before Collision</p>
          <div className="space-y-1">
            <div className="flex justify-between formula-box rounded-lg px-3 py-1.5"><span className="text-brand-cyan text-xs">KE₁</span><span className="text-white text-xs font-space">{ke1.toFixed(1)} J</span></div>
            <div className="flex justify-between formula-box rounded-lg px-3 py-1.5"><span className="text-brand-amber text-xs">KE₂</span><span className="text-white text-xs font-space">{ke2.toFixed(1)} J</span></div>
            <div className="flex justify-between formula-box rounded-lg px-3 py-1.5"><span className="text-brand-lime text-xs">Total KE</span><span className="text-white text-xs font-space font-bold">{(ke1 + ke2).toFixed(1)} J</span></div>
          </div>
        </div>
        <div>
          <p className="text-gray-400 text-xs uppercase mb-2 font-bold">After Collision</p>
          <div className="space-y-1">
            <div className="flex justify-between formula-box rounded-lg px-3 py-1.5"><span className="text-brand-cyan text-xs">KE₁'</span><span className="text-white text-xs font-space">{ke1f.toFixed(1)} J</span></div>
            <div className="flex justify-between formula-box rounded-lg px-3 py-1.5"><span className="text-brand-amber text-xs">KE₂'</span><span className="text-white text-xs font-space">{ke2f.toFixed(1)} J</span></div>
            <div className="flex justify-between formula-box rounded-lg px-3 py-1.5"><span className="text-brand-lime text-xs">Total KE</span><span className="text-white text-xs font-space font-bold">{(ke1f + ke2f).toFixed(1)} J</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
