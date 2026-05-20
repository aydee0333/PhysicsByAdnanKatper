import { useState, useEffect, useRef } from 'react';

export default function StaticSlidingFrictionSim() {
  const [applied, setApplied] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const muS = 0.5, muK = 0.3, weight = 100;
  const maxStatic = muS * weight;
  const kinetic = muK * weight;
  const isMoving = applied > maxStatic;
  const friction = isMoving ? kinetic : applied;
  const netForce = applied - friction;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    ctx.fillStyle = 'rgba(255,255,255,0.05)'; ctx.fillRect(0, h - 50, w, 50);
    ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 20) { ctx.beginPath(); ctx.moveTo(x, h - 50); ctx.lineTo(x - 10, h); ctx.stroke(); }

    const blockX = 80 + (isMoving ? Math.min(netForce * 0.5, 200) : 0);
    const blockY = h - 90;

    if (applied > 0) {
      ctx.strokeStyle = '#84cc16'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(blockX - 50, blockY + 25); ctx.lineTo(blockX - 5, blockY + 25); ctx.stroke();
      ctx.fillStyle = '#84cc16';
      ctx.beginPath(); ctx.moveTo(blockX - 5, blockY + 25); ctx.lineTo(blockX - 12, blockY + 18); ctx.lineTo(blockX - 12, blockY + 32); ctx.closePath(); ctx.fill();
      ctx.font = 'bold 11px Poppins'; ctx.textAlign = 'center';
      ctx.fillText(`${applied}N →`, blockX - 30, blockY + 15);
    }

    if (friction > 0) {
      ctx.strokeStyle = isMoving ? '#f59e0b' : '#06b6d4'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(blockX + 65, blockY + 25); ctx.lineTo(blockX + 5, blockY + 25); ctx.stroke();
      ctx.fillStyle = isMoving ? '#f59e0b' : '#06b6d4';
      ctx.beginPath(); ctx.moveTo(blockX + 5, blockY + 25); ctx.lineTo(blockX + 12, blockY + 18); ctx.lineTo(blockX + 12, blockY + 32); ctx.closePath(); ctx.fill();
      ctx.font = 'bold 11px Poppins'; ctx.textAlign = 'center';
      ctx.fillText(`f = ${friction.toFixed(0)}N`, blockX + 40, blockY + 15);
    }

    ctx.fillStyle = isMoving ? 'rgba(244,63,94,0.3)' : 'rgba(132,204,22,0.3)';
    ctx.strokeStyle = isMoving ? '#f43f5e' : '#84cc16'; ctx.lineWidth = 2;
    ctx.fillRect(blockX, blockY, 60, 40); ctx.strokeRect(blockX, blockY, 60, 40);
    ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 12px Poppins'; ctx.textAlign = 'center';
    ctx.fillText(isMoving ? 'MOVING' : 'STILL', blockX + 30, blockY + 25);

    const gx = 300, gy = 30, gw = 180, gh = 120;
    ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fillRect(gx, gy, gw, gh);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1; ctx.strokeRect(gx, gy, gw, gh);
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px Poppins'; ctx.textAlign = 'center';
    ctx.fillText('Applied Force', gx + gw / 2, gy + gh + 14);
    ctx.save(); ctx.translate(gx - 8, gy + gh / 2); ctx.rotate(-Math.PI / 2); ctx.fillText('Friction', 0, 0); ctx.restore();

    ctx.beginPath(); ctx.moveTo(gx, gy + gh);
    const maxApplied = 100;
    for (let f = 0; f <= maxApplied; f++) {
      const x = gx + (f / maxApplied) * gw;
      const fric = f <= maxStatic ? f : kinetic;
      const y = gy + gh - (fric / maxStatic) * gh;
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 2; ctx.stroke();

    const px = gx + (applied / maxApplied) * gw;
    const py = gy + gh - (friction / maxStatic) * gh;
    ctx.fillStyle = '#f43f5e'; ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#84cc16'; ctx.font = '9px Poppins'; ctx.textAlign = 'left';
    ctx.fillText('Static region', gx + 5, gy + 15);
    ctx.fillStyle = '#f59e0b'; ctx.fillText('Kinetic (constant)', gx + gw - 90, gy + gh - 10);
  }, [applied]);

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-xs block mb-1">Applied Force: {applied} N</label>
        <input type="range" min={0} max={100} step={1} value={applied} onChange={e => setApplied(Number(e.target.value))} className="w-full accent-green-500" />
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={500} height={200} className="w-full" style={{ maxWidth: 500, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="formula-box rounded-xl p-3 text-center"><p className="text-gray-400 text-xs uppercase">μs</p><p className="text-lg font-space font-bold text-brand-cyan">{muS}</p></div>
        <div className="formula-box rounded-xl p-3 text-center"><p className="text-gray-400 text-xs uppercase">μk</p><p className="text-lg font-space font-bold text-brand-amber">{muK}</p></div>
        <div className="formula-box rounded-xl p-3 text-center"><p className="text-gray-400 text-xs uppercase">Friction</p><p className="text-lg font-space font-bold text-brand-lime">{friction.toFixed(0)} N</p></div>
      </div>
      <div className="glass-card rounded-xl p-4">
        <p className="text-gray-300 text-sm">{isMoving ? 'Applied force exceeded max static friction — block is sliding with constant kinetic friction.' : 'Static friction matches applied force exactly — block stays still.'}</p>
      </div>
    </div>
  );
}
