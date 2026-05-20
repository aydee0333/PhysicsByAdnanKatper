import { useState, useEffect, useRef } from 'react';

export default function ImpulseMomentumSim() {
  const [mass, setMass] = useState(2);
  const [velocity, setVelocity] = useState(10);
  const [duration, setDuration] = useState(0.1);
  const [isAnimating, setIsAnimating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const ballXRef = useRef(450);

  const p = mass * velocity;
  const impulse = p;
  const avgForce = impulse / duration;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const ballY = h / 2 + 30;
      const wallX = w - 40;

      ctx.fillStyle = 'rgba(255,255,255,0.05)'; ctx.fillRect(0, ballY + 18, w, 30);
      ctx.fillStyle = 'rgba(244,63,94,0.15)'; ctx.fillRect(wallX, ballY - 80, 30, 130);
      ctx.strokeStyle = 'rgba(244,63,94,0.5)'; ctx.lineWidth = 2; ctx.strokeRect(wallX, ballY - 80, 30, 130);

      const bx = ballXRef.current;
      ctx.fillStyle = 'rgba(6,182,212,0.5)'; ctx.beginPath(); ctx.arc(bx, ballY, 15, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(bx, ballY, 15, 0, Math.PI * 2); ctx.stroke();

      if (bx > wallX - 20) {
        ctx.strokeStyle = '#84cc16'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(bx - 15, ballY - 25); ctx.lineTo(bx - 15 - velocity * 3, ballY - 25); ctx.stroke();
        ctx.fillStyle = '#84cc16'; ctx.font = 'bold 11px Poppins'; ctx.textAlign = 'right';
        ctx.fillText(`v = ${velocity} m/s`, bx - 20 - velocity * 3, ballY - 30);
      }

      const graphX = 30, graphY = 20, graphW = w - 100, graphH = 100;
      ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fillRect(graphX, graphY, graphW, graphH);
      ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 1; ctx.strokeRect(graphX, graphY, graphW, graphH);
      ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '9px Poppins'; ctx.textAlign = 'center';
      ctx.fillText('Time (s)', graphX + graphW / 2, graphY + graphH + 15);
      ctx.save(); ctx.translate(graphX - 15, graphY + graphH / 2); ctx.rotate(-Math.PI / 2); ctx.fillText('Force (N)', 0, 0); ctx.restore();

      const durPx = Math.min(duration * graphW * 5, graphW * 0.6);
      const peakF = Math.min(avgForce * 0.3, graphH - 10);
      ctx.fillStyle = 'rgba(245,158,11,0.3)';
      ctx.beginPath(); ctx.moveTo(graphX + 20, graphY + graphH); ctx.lineTo(graphX + 20 + durPx / 2, graphY + graphH - peakF); ctx.lineTo(graphX + 20 + durPx, graphY + graphH); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(graphX + 20, graphY + graphH); ctx.lineTo(graphX + 20 + durPx / 2, graphY + graphH - peakF); ctx.lineTo(graphX + 20 + durPx, graphY + graphH); ctx.stroke();
      ctx.fillStyle = '#f59e0b'; ctx.font = 'bold 10px Poppins'; ctx.textAlign = 'center';
      ctx.fillText(`Area = J = ${impulse.toFixed(1)} N·s`, graphX + 20 + durPx / 2, graphY + graphH - peakF - 10);

      const boxY = h - 45;
      ctx.fillStyle = 'rgba(0,0,0,0.4)'; ctx.fillRect(10, boxY, w - 20, 35);
      ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.strokeRect(10, boxY, w - 20, 35);
      ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 11px Poppins'; ctx.textAlign = 'left';
      ctx.fillText(`p = mv = ${mass}×${velocity} = ${p.toFixed(1)} kg·m/s`, 20, boxY + 14);
      ctx.fillStyle = '#94a3b8'; ctx.font = '10px Poppins';
      ctx.fillText(`J = Δp = ${impulse.toFixed(1)} N·s    F_avg = J/Δt = ${avgForce.toFixed(0)} N    Δt = ${duration}s`, 20, boxY + 28);

      if (isAnimating) {
        ballXRef.current -= velocity * 0.8;
        if (ballXRef.current <= wallX - 5) { ballXRef.current = 450; setIsAnimating(false); }
        animRef.current = requestAnimationFrame(draw);
      }
    };
    draw();
    if (!isAnimating) return () => cancelAnimationFrame(animRef.current);
    return () => cancelAnimationFrame(animRef.current);
  }, [mass, velocity, duration, isAnimating]);

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <div><label className="text-gray-400 text-sm block mb-2">Mass: {mass} kg</label><input type="range" min={1} max={10} value={mass} onChange={e => setMass(Number(e.target.value))} className="w-full accent-brand-cyan" /></div>
        <div><label className="text-gray-400 text-sm block mb-2">Velocity: {velocity} m/s</label><input type="range" min={1} max={20} value={velocity} onChange={e => setVelocity(Number(e.target.value))} className="w-full accent-brand-lime" /></div>
        <div><label className="text-gray-400 text-sm block mb-2">Contact Time: {duration}s</label><input type="range" min={1} max={100} value={Math.round(duration * 1000)} onChange={e => setDuration(Number(e.target.value) / 1000)} className="w-full accent-brand-amber" /></div>
      </div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => { ballXRef.current = 450; setIsAnimating(true); }} className="px-6 py-2 rounded-xl text-sm font-semibold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 hover:bg-brand-cyan/30 transition-all">▶ Launch Ball</button>
        <button onClick={() => setDuration(0.5)} className="px-4 py-2 rounded-xl text-sm font-semibold glass-card text-gray-400 border-white/10">Soft Wall (0.5s)</button>
        <button onClick={() => setDuration(0.01)} className="px-4 py-2 rounded-xl text-sm font-semibold glass-card text-gray-400 border-white/10">Hard Wall (0.01s)</button>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={500} height={280} className="w-full" style={{ maxWidth: 500, margin: '0 auto', display: 'block' }} />
      </div>
      <p className="text-gray-400 text-sm text-center">Same impulse (J = Δp) but different contact time → different average force!</p>
    </div>
  );
}
