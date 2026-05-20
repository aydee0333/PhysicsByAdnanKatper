import { useState, useEffect, useRef } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function DistanceTimeGraph() {
  const t = useT();
  const [speed, setSpeed] = useState(2);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    const pad = 40;

    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(pad, pad); ctx.lineTo(pad, h - pad); ctx.lineTo(w - pad, h - pad); ctx.stroke();

    ctx.fillStyle = '#9ca3af'; ctx.font = '12px Poppins'; ctx.textAlign = 'center';
    ctx.fillText('Time (s)', w / 2, h - 10);
    ctx.save(); ctx.translate(15, h / 2); ctx.rotate(-Math.PI / 2); ctx.fillText('Distance (m)', 0, 0); ctx.restore();

    ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(pad, h - pad);
    for (let tVal = 0; tVal <= 10; tVal += 0.5) {
      const d = speed * tVal;
      const px = pad + (tVal / 10) * (w - pad * 2);
      const py = h - pad - (d / (speed * 10)) * (h - pad * 2);
      ctx.lineTo(px, py);
    }
    ctx.stroke();

    ctx.fillStyle = '#06b6d4'; ctx.font = 'bold 12px Poppins'; ctx.textAlign = 'left';
    ctx.fillText(`Slope = Speed = ${speed} m/s`, pad + 10, pad + 20);
  }, [speed]);

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">Speed (slope): {speed} m/s</label>
        <input type="range" min="0.5" max="5" step="0.5" value={speed} onChange={e => setSpeed(Number(e.target.value))} className="w-full accent-brand-cyan" />
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={400} height={280} className="w-full" style={{ maxWidth: 400, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="glass-card rounded-xl p-3">
          <p className="text-brand-cyan text-xs font-bold">📈 {t('unit2.distTime')}</p>
          <p className="text-gray-400 text-xs">{t('unit2.distTimeDesc')}</p>
        </div>
        <div className="glass-card rounded-xl p-3">
          <p className="text-brand-pink text-xs font-bold">📉 {t('unit2.speedTime')}</p>
          <p className="text-gray-400 text-xs">{t('unit2.speedTimeDesc')}</p>
        </div>
      </div>
    </div>
  );
}
