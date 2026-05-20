import { useState, useEffect, useRef } from 'react';

export default function RubeGoldbergEnergySim() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const steps = [
    { from: 'Chemical (food)', to: 'Kinetic (push ball)', emoji: '🍎→⚽', loss: 30, color: '244,63,94' },
    { from: 'Kinetic (ball rolls)', to: 'Gravitational PE (goes up ramp)', emoji: '⚽→🏔️', loss: 15, color: '245,158,11' },
    { from: 'Gravitational PE', to: 'Kinetic (falls onto lever)', emoji: '🏔️→⚖️', loss: 10, color: '132,204,22' },
    { from: 'Kinetic (lever)', to: 'Elastic PE (spring)', emoji: '⚖️→🔧', loss: 20, color: '6,182,212' },
    { from: 'Elastic PE (spring)', to: 'Kinetic (launches marble)', emoji: '🔧→🔮', loss: 10, color: '124,58,237' },
    { from: 'Kinetic (marble)', to: 'Sound + Heat (hits bell)', emoji: '🔮→🔔', loss: 100, color: '236,72,153' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const barX = 30, barW = w - 60, barH = 30;
    let currentEnergy = 100;

    steps.forEach((s, i) => {
      const y = 20 + i * 45;
      const barWidth = (currentEnergy / 100) * barW;
      const [r, g, b] = s.color.split(',').map(Number);

      ctx.fillStyle = 'rgba(255,255,255,0.03)';
      ctx.fillRect(barX, y, barW, barH);

      const isActive = i <= step;
      ctx.fillStyle = isActive ? `rgba(${r},${g},${b},0.4)` : 'rgba(255,255,255,0.05)';
      ctx.fillRect(barX, y, isActive ? barWidth : barW * 0.02, barH);
      ctx.strokeStyle = isActive ? `rgba(${r},${g},${b},0.7)` : 'rgba(255,255,255,0.1)';
      ctx.lineWidth = isActive ? 2 : 1;
      ctx.strokeRect(barX, y, isActive ? barWidth : barW * 0.02, barH);

      ctx.fillStyle = isActive ? '#e2e8f0' : 'rgba(255,255,255,0.3)';
      ctx.font = isActive ? 'bold 10px Poppins' : '10px Poppins';
      ctx.textAlign = 'left';
      ctx.fillText(`Step ${i + 1}: ${s.from} → ${s.to}`, barX + 5, y + 12);

      ctx.font = '14px serif'; ctx.textAlign = 'right';
      ctx.fillText(s.emoji, barX + barW - 5, y + 15);

      if (isActive && i < steps.length) {
        ctx.fillStyle = 'rgba(244,63,94,0.6)'; ctx.font = '9px Poppins'; ctx.textAlign = 'left';
        ctx.fillText(`−${s.loss}% heat/sound`, barX + barWidth + 5, y + 12);
      }

      if (isActive) currentEnergy = currentEnergy * (1 - s.loss / 100);
    });

    const finalY = 20 + steps.length * 45 + 10;
    ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = 'bold 12px Poppins'; ctx.textAlign = 'center';
    ctx.fillText(`Useful energy at end: ${currentEnergy.toFixed(1)}% — Rest is heat & sound`, w / 2, finalY);

    if (playing && step < steps.length - 1) {
      const timer = setTimeout(() => setStep(s => s + 1), 1200);
      return () => clearTimeout(timer);
    }
    if (step >= steps.length - 1) setPlaying(false);
  }, [step, playing]);

  const reset = () => { setStep(0); setPlaying(false); };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => { setStep(0); setPlaying(true); }} className="px-6 py-2 rounded-xl text-sm font-semibold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 hover:bg-brand-cyan/30 transition-all">
          ▶ Run Chain
        </button>
        <button onClick={() => setStep(s => Math.min(s + 1, steps.length - 1))} className="px-4 py-2 rounded-xl text-sm font-semibold glass-card text-gray-400 border-white/10">
          Step →
        </button>
        <button onClick={reset} className="px-4 py-2 rounded-xl text-sm font-semibold glass-card text-gray-400 border-white/10">
          ↻ Reset
        </button>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={500} height={320} className="w-full" style={{ maxWidth: 500, margin: '0 auto', display: 'block' }} />
      </div>
      <p className="text-gray-400 text-sm text-center">Energy is conserved but degrades to less useful forms at each step!</p>
    </div>
  );
}
