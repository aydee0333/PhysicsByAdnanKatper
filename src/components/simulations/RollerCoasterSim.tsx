import { useState, useEffect, useRef } from 'react';

export default function RollerCoasterSim() {
  const [initialH, setInitialH] = useState(80);
  const [friction, setFriction] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);

  const trackPoints = [
    { x: 30, y: 0 }, { x: 80, y: 0 }, { x: 140, y: -60 }, { x: 200, y: -20 },
    { x: 260, y: -80 }, { x: 320, y: -30 }, { x: 380, y: -50 }, { x: 440, y: 0 }, { x: 500, y: 0 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;

    const baseY = h - 50;
    const scale = initialH / 80;

    const getYatPos = (t: number) => {
      const idx = t * (trackPoints.length - 1);
      const i = Math.floor(idx);
      const frac = idx - i;
      const p1 = trackPoints[Math.min(i, trackPoints.length - 1)];
      const p2 = trackPoints[Math.min(i + 1, trackPoints.length - 1)];
      return p1.y + (p2.y - p1.y) * frac;
    };

    const draw = () => {
      animRef.current = requestAnimationFrame(draw);
      posRef.current += 0.003;
      if (posRef.current > 1) posRef.current = 0;
      const t = posRef.current;
      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 3;
      ctx.beginPath();
      trackPoints.forEach((p, i) => {
        const x = p.x;
        const y = baseY + p.y * scale;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();

      ctx.fillStyle = 'rgba(124,58,237,0.1)';
      ctx.beginPath(); ctx.moveTo(trackPoints[0].x, baseY);
      trackPoints.forEach(p => ctx.lineTo(p.x, baseY + p.y * scale));
      ctx.lineTo(trackPoints[trackPoints.length - 1].x, baseY); ctx.closePath(); ctx.fill();

      const cartY = getYatPos(t);
      const cartX = 30 + t * 470;
      const cartScreenY = baseY + cartY * scale;

      const maxH = 80;
      const currentH = -cartY;
      const heightRatio = currentH / maxH;
      const frictionLoss = friction ? t * 0.3 : 0;
      const pe = Math.max(0, heightRatio * 100 - frictionLoss * 100);
      const ke = Math.max(0, (1 - heightRatio) * 100 * (1 - frictionLoss * 0.3));
      const thermal = friction ? frictionLoss * 100 : 0;
      const total = pe + ke + thermal;

      ctx.fillStyle = '#f43f5e'; ctx.fillRect(cartX - 10, cartScreenY - 15, 20, 12);
      ctx.fillStyle = '#e2e8f0'; ctx.font = '8px Poppins'; ctx.textAlign = 'center';
      ctx.fillText('CART', cartX, cartScreenY - 18);

      const barX = 20, barW = 12, barH = 100;
      const drawBar = (x: number, val: number, color: string, label: string) => {
        ctx.fillStyle = 'rgba(255,255,255,0.05)'; ctx.fillRect(x, 20, barW, barH);
        ctx.fillStyle = color; ctx.fillRect(x, 20 + barH - val, barW, val);
        ctx.fillStyle = '#94a3b8'; ctx.font = '9px Poppins'; ctx.textAlign = 'center';
        ctx.fillText(label, x + barW / 2, 20 + barH + 14);
        ctx.fillText(`${val.toFixed(0)}`, x + barW / 2, 15);
      };

      drawBar(barX, pe, '#84cc16', 'PE');
      drawBar(barX + 25, ke, '#06b6d4', 'KE');
      if (friction) drawBar(barX + 50, thermal, '#f59e0b', 'Heat');
      drawBar(barX + (friction ? 75 : 50), total, '#a78bfa', 'Total');

      ctx.fillStyle = '#e2e8f0'; ctx.font = '11px Poppins'; ctx.textAlign = 'left';
      ctx.fillText(`Height: ${currentH.toFixed(0)} m`, 150, 30);
      ctx.fillText(`Speed: ${Math.sqrt(2 * 9.8 * currentH * (1 - frictionLoss * 0.3)).toFixed(1)} m/s`, 150, 48);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [initialH, friction]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div><label className="text-gray-400 text-xs block mb-1">Initial Height: {initialH} m</label><input type="range" min={30} max={100} step={5} value={initialH} onChange={e => setInitialH(Number(e.target.value))} className="w-full accent-brand-lime" /></div>
        <div className="flex items-center gap-3"><label className="text-gray-400 text-sm">Friction:</label>
          <button onClick={() => setFriction(!friction)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${friction ? 'bg-brand-rose/20 text-brand-rose border border-brand-rose/30' : 'glass-card text-gray-400'}`}>{friction ? 'ON' : 'OFF'}</button>
        </div>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={520} height={220} className="w-full" style={{ maxWidth: 520, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="glass-card rounded-xl p-4">
        <p className="text-gray-300 text-sm">{friction ? 'With friction, total energy slowly converts to heat — the cart eventually stops.' : 'Without friction, total energy is conserved — PE converts to KE and back.'}</p>
      </div>
    </div>
  );
}
