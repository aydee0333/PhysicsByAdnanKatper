import { useState, useEffect, useRef } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function PushPullSim() {
  const t = useT();
  const [force, setForce] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fillRect(0, h - 50, w, 40);

    const boxX = 80 + (force / 100) * (w - 200);
    const boxY = h - 95;

    if (force > 0) {
      ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(boxX - 60, boxY + 20); ctx.lineTo(boxX - 10, boxY + 20); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(boxX - 15, boxY + 12); ctx.lineTo(boxX - 5, boxY + 20); ctx.lineTo(boxX - 15, boxY + 28); ctx.stroke();
      ctx.fillStyle = '#06b6d4'; ctx.font = 'bold 14px Poppins'; ctx.textAlign = 'center';
      ctx.fillText(`${force} N →`, boxX - 40, boxY + 10);
    }

    ctx.fillStyle = '#7c3aed'; ctx.fillRect(boxX, boxY, 60, 50);
    ctx.strokeStyle = '#a78bfa'; ctx.lineWidth = 2; ctx.strokeRect(boxX, boxY, 60, 50);
    ctx.fillStyle = '#fff'; ctx.font = 'bold 12px Poppins'; ctx.textAlign = 'center';
    ctx.fillText('BOX', boxX + 30, boxY + 30);

    if (force > 0) {
      const speed = (force * 0.1).toFixed(1);
      ctx.fillStyle = '#06b6d4'; ctx.font = 'bold 14px Poppins';
      ctx.fillText(`Speed: ${speed} m/s`, boxX + 30, boxY - 10);
    }
  }, [force]);

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">{t('unit3.pushForce').replace('{force}', String(force))}</label>
        <input type="range" min="0" max="100" value={force} onChange={e => setForce(Number(e.target.value))} className="w-full accent-brand-cyan" />
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={600} height={160} className="w-full" style={{ maxWidth: 600, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="glass-card rounded-xl p-3 text-center">
          <p className="text-brand-cyan text-xs uppercase">{t('unit3.speedChange')}</p>
          <p className="text-white text-sm font-semibold">{force > 0 ? t('unit3.accelerating') : t('unit3.atRest')}</p>
        </div>
        <div className="glass-card rounded-xl p-3 text-center">
          <p className="text-brand-pink text-xs uppercase">{t('unit3.direction')}</p>
          <p className="text-white text-sm font-semibold">{t('unit3.forward')}</p>
        </div>
        <div className="glass-card rounded-xl p-3 text-center">
          <p className="text-brand-amber text-xs uppercase">{t('unit3.shape')}</p>
          <p className="text-white text-sm font-semibold">{t('unit3.noChange')}</p>
        </div>
      </div>
    </div>
  );
}
