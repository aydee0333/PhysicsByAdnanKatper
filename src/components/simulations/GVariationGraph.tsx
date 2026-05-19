import { useState, useRef, useEffect } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function GVariationGraph() {
  const t = useT();
  const [altitude, setAltitude] = useState(0);
  const g0 = 9.8, R = 6371;
  const g = g0 * Math.pow(R / (R + altitude), 2);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height, pad = 40;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(pad, pad); ctx.lineTo(pad, h - pad); ctx.lineTo(w - pad, h - pad); ctx.stroke();
    ctx.fillStyle = '#9ca3af'; ctx.font = '12px Poppins'; ctx.textAlign = 'center';
    ctx.fillText('Altitude (km)', w / 2, h - 10);
    ctx.save(); ctx.translate(15, h / 2); ctx.rotate(-Math.PI / 2); ctx.fillText('g (m/s²)', 0, 0); ctx.restore();
    ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 3; ctx.beginPath();
    for (let ax = 0; ax <= w - pad * 2; ax += 2) {
      const alt = (ax / (w - pad * 2)) * 10000;
      const gv = g0 * Math.pow(R / (R + alt), 2);
      const py = h - pad - (gv / g0) * (h - pad * 2);
      if (ax === 0) ctx.moveTo(pad + ax, py); else ctx.lineTo(pad + ax, py);
    }
    ctx.stroke();
    const cx = pad + (altitude / 10000) * (w - pad * 2);
    const cy = h - pad - (g / g0) * (h - pad * 2);
    ctx.fillStyle = '#f43f5e'; ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();
  }, [altitude, g, g0]);

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">{t('unit6.altitude').replace('{altitude}', String(altitude))}</label>
        <input type="range" min="0" max="10000" step="100" value={altitude} onChange={e => setAltitude(Number(e.target.value))} className="w-full accent-brand-cyan" />
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={500} height={280} className="w-full" style={{ maxWidth: 500, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">{t('unit6.gAtAlt').replace('{altitude}', String(altitude))}</p>
          <p className="text-2xl font-space font-bold text-brand-cyan">{g.toFixed(2)} m/s²</p>
        </div>
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">{t('unit6.decrease')}</p>
          <p className="text-2xl font-space font-bold text-brand-rose">{((g0 - g) / g0 * 100).toFixed(1)}%</p>
        </div>
      </div>
      <div className="glass-card rounded-xl p-4">
        <p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit6.keyInsight') }} />
      </div>
    </div>
  );
}
