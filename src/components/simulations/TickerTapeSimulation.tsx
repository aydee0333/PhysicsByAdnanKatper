import { useState, useEffect, useRef } from 'react';

export default function TickerTapeSimulation() {
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

      ctx.fillStyle = 'rgba(255,255,255,0.03)';
      ctx.fillRect(20, h / 2 - 20, w - 40, 40);
      ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 1;
      ctx.strokeRect(20, h / 2 - 20, w - 40, 40);

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
          x = startX + (i * i) / (maxDots * maxDots) * tapeWidth * 0.9;
        }

        if (x > w - 30) break;

        ctx.fillStyle = i % 2 === 0 ? '#06b6d4' : '#a78bfa';
        ctx.beginPath(); ctx.arc(x, h / 2, 3, 0, Math.PI * 2); ctx.fill();

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

      const objProgress = (t % 2) / 2;
      const objX = startX + objProgress * tapeWidth * 0.8;
      ctx.fillStyle = '#f43f5e';
      ctx.fillRect(objX - 15, h / 2 - 30, 30, 20);
      ctx.fillStyle = '#fff'; ctx.font = 'bold 10px Poppins'; ctx.textAlign = 'center';
      ctx.fillText('OBJ', objX, h / 2 - 17);

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
