import { useState, useRef, useEffect } from 'react';

export default function StreamlineFlowSim() {
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

      ctx.fillStyle = 'rgba(6,182,212,0.06)';
      ctx.beginPath();
      ctx.moveTo(20, pipeY); ctx.lineTo(w - 20, pipeY);
      ctx.lineTo(w - 20, pipeY + wideH); ctx.lineTo(20, pipeY + wideH);
      ctx.closePath(); ctx.fill();

      ctx.fillStyle = 'rgba(245,158,11,0.08)';
      const nh = getPipeHeight(narrowX + narrowW / 2);
      ctx.fillRect(narrowX, pipeY + (wideH - nh) / 2, narrowW, nh);

      ctx.strokeStyle = 'rgba(6,182,212,0.4)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(20, pipeY);
      for (let x = 20; x <= w - 20; x += 5) {
        const ph = getPipeHeight(x);
        ctx.lineTo(x, pipeY + (wideH - ph) / 2);
      }
      ctx.stroke();
      ctx.beginPath(); ctx.moveTo(20, pipeY + wideH);
      for (let x = 20; x <= w - 20; x += 5) {
        const ph = getPipeHeight(x);
        ctx.lineTo(x, pipeY + wideH - (wideH - ph) / 2);
      }
      ctx.stroke();

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

        const t = Math.min(speedMult / (flowRate * 1.5), 1);
        const r = Math.round(6 + t * 239), g = Math.round(182 - t * 24), b = Math.round(212 - t * 101);
        ctx.fillStyle = `rgba(${r},${g},${b},0.7)`;
        ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fill();
      });

      ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '11px Poppins'; ctx.textAlign = 'center';
      ctx.fillText('Wide Section', 100, pipeY - 10);
      ctx.fillText('Narrow Section', narrowX + narrowW / 2, pipeY - 10);
      ctx.fillText('Wide Section', w - 100, pipeY - 10);

      const vWide = flowRate;
      const vNarrow = (wideH / narrowH) * flowRate;
      ctx.fillStyle = '#06b6d4'; ctx.font = 'bold 11px Poppins';
      ctx.fillText(`v = ${vWide.toFixed(1)}`, 100, pipeY + wideH + 20);
      ctx.fillStyle = '#f59e0b';
      ctx.fillText(`v = ${vNarrow.toFixed(1)}`, narrowX + narrowW / 2, pipeY + wideH + 20);

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
