import { useEffect, useRef } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function PendulumSim() {
  const t = useT();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const w = canvas.width, h = canvas.height;
      const time = Date.now() * 0.002;
      const angle = Math.sin(time) * 0.8;
      const len = 120;
      const cx = w / 2, cy = 30;
      const bx = cx + Math.sin(angle) * len;
      const by = cy + Math.cos(angle) * len;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#7c3aed'; ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(bx, by); ctx.stroke();
      ctx.fillStyle = '#06b6d4'; ctx.beginPath(); ctx.arc(bx, by, 15, 0, Math.PI * 2); ctx.fill();
      const pe = Math.abs(angle) / 0.8;
      const ke = 1 - pe;
      ctx.fillStyle = '#ec4899'; ctx.font = '12px Poppins'; ctx.textAlign = 'left';
      ctx.fillText(`PE: ${(pe * 100).toFixed(0)}%`, 20, h - 40);
      ctx.fillStyle = '#06b6d4'; ctx.fillText(`KE: ${(ke * 100).toFixed(0)}%`, 20, h - 20);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div>
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 overflow-hidden mb-4" style={{ height: 220 }}>
        <canvas ref={canvasRef} width={300} height={220} className="w-full" style={{ maxWidth: 300, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="glass-card rounded-xl p-4"><p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit8.conservationNote') }}></p></div>
    </div>
  );
}
