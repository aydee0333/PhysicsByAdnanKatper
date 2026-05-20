import { useState, useEffect, useRef } from 'react';

export default function InertiaRaceSim() {
  const [running, setRunning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef({ light: 0, heavy: 0 });

  const lightMass = 1, heavyMass = 5, force = 20;
  const lightAcc = force / lightMass, heavyAcc = force / heavyMass;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const trackY1 = h / 2 - 40, trackY2 = h / 2 + 40;
      const startX = 60, finishX = w - 40;

      ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(startX, trackY1); ctx.lineTo(finishX, trackY1); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(startX, trackY2); ctx.lineTo(finishX, trackY2); ctx.stroke();

      ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 2; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(finishX, trackY1 - 30); ctx.lineTo(finishX, trackY2 + 30); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '10px Poppins'; ctx.textAlign = 'center';
      ctx.fillText('Finish', finishX, trackY1 - 35);

      const lightX = startX + posRef.current.light * (finishX - startX - 40);
      const heavyX = startX + posRef.current.heavy * (finishX - startX - 40);

      ctx.strokeStyle = '#84cc16'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(lightX + 30, trackY1); ctx.lineTo(lightX + 30 + force * 1.5, trackY1); ctx.stroke();
      ctx.fillStyle = '#84cc16'; ctx.font = 'bold 10px Poppins'; ctx.textAlign = 'left';
      ctx.fillText(`F=${force}N`, lightX + 30 + force * 1.5 + 5, trackY1 + 4);
      ctx.beginPath(); ctx.moveTo(heavyX + 30, trackY2); ctx.lineTo(heavyX + 30 + force * 1.5, trackY2); ctx.stroke();
      ctx.fillText(`F=${force}N`, heavyX + 30 + force * 1.5 + 5, trackY2 + 4);

      ctx.fillStyle = 'rgba(6,182,212,0.4)'; ctx.fillRect(lightX, trackY1 - 15, 30, 30);
      ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 2; ctx.strokeRect(lightX, trackY1 - 15, 30, 30);
      ctx.fillStyle = '#06b6d4'; ctx.font = 'bold 10px Poppins'; ctx.textAlign = 'center';
      ctx.fillText(`${lightMass}kg`, lightX + 15, trackY1 + 5);

      ctx.fillStyle = 'rgba(245,158,11,0.4)'; ctx.fillRect(heavyX, trackY2 - 15, 30, 30);
      ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2; ctx.strokeRect(heavyX, trackY2 - 15, 30, 30);
      ctx.fillStyle = '#f59e0b'; ctx.font = 'bold 10px Poppins'; ctx.textAlign = 'center';
      ctx.fillText(`${heavyMass}kg`, heavyX + 15, trackY2 + 5);

      ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '10px Poppins'; ctx.textAlign = 'right';
      ctx.fillText(`a = ${lightAcc} m/s²`, startX - 5, trackY1 + 4);
      ctx.fillText(`a = ${heavyAcc} m/s²`, startX - 5, trackY2 + 4);

      if (running) {
        posRef.current.light += lightAcc * 0.0003;
        posRef.current.heavy += heavyAcc * 0.0003;
        if (posRef.current.light >= 1 && posRef.current.heavy >= 1) setRunning(false);
        animRef.current = requestAnimationFrame(draw);
      }
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [running]);

  const reset = () => { posRef.current = { light: 0, heavy: 0 }; setRunning(false); };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setRunning(true)} disabled={running} className="px-6 py-2 rounded-xl text-sm font-semibold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 hover:bg-brand-cyan/30 transition-all disabled:opacity-50">▶ Start Race</button>
        <button onClick={reset} className="px-4 py-2 rounded-xl text-sm font-semibold glass-card text-gray-400 border-white/10">↻ Reset</button>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={500} height={180} className="w-full" style={{ maxWidth: 500, margin: '0 auto', display: 'block' }} />
      </div>
      <p className="text-gray-400 text-sm text-center">Same force, different mass → different acceleration. Lighter object wins!</p>
    </div>
  );
}
