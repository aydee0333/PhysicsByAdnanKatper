import { useState, useEffect, useRef } from 'react';
import { Car, CircleDot, Target, RotateCcw, Move } from 'lucide-react';
import { useT } from '../../i18n/LanguageContext';

export default function MotionTypesAnimation() {
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
        {([
          { key: 'linear' as const, label: t('unit2.linear'), icon: <Car size={20} />, color: 'brand-cyan' },
          { key: 'circular' as const, label: t('unit2.circular'), icon: <CircleDot size={20} />, color: 'brand-pink' },
          { key: 'random' as const, label: t('unit2.random'), icon: <Target size={20} />, color: 'brand-amber' },
          { key: 'rotatory' as const, label: t('unit2.rotatory'), icon: <RotateCcw size={20} />, color: 'brand-purple' },
          { key: 'vibratory' as const, label: t('unit2.vibratory'), icon: <Move size={20} />, color: 'brand-rose' },
        ]).map((m) => (
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
