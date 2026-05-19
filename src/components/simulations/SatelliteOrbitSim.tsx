import { useState, useRef, useEffect } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function SatelliteOrbitSim() {
  const t = useT();
  const [radius, setRadius] = useState(7e6);
  const G = 6.67e-11, M = 5.97e24;
  const v = Math.sqrt((G * M) / radius);
  const T = (2 * Math.PI * radius) / v;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const w = canvas.width, h = canvas.height, cx = w / 2, cy = h / 2;
      const time = Date.now() * 0.001;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#06b6d4'; ctx.beginPath(); ctx.arc(cx, cy, 40, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(6,182,212,0.3)'; ctx.beginPath(); ctx.arc(cx, cy, 45, 0, Math.PI * 2); ctx.fill();
      const orbitR = 40 + (radius - 6.4e6) / 50000;
      ctx.strokeStyle = 'rgba(124,58,237,0.3)'; ctx.lineWidth = 1; ctx.setLineDash([5, 5]);
      ctx.beginPath(); ctx.arc(cx, cy, orbitR, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
      const sx = cx + Math.cos(time * (7.8e3 / v)) * orbitR;
      const sy = cy + Math.sin(time * (7.8e3 / v)) * orbitR;
      ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(sx, sy, 6, 0, Math.PI * 2); ctx.fill();
      const angle = Math.atan2(sy - cy, sx - cx) + Math.PI / 2;
      ctx.strokeStyle = '#84cc16'; ctx.lineWidth = 2; ctx.beginPath();
      ctx.moveTo(sx, sy); ctx.lineTo(sx + Math.cos(angle) * 20, sy + Math.sin(angle) * 20); ctx.stroke();
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [radius, v]);

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">{t('unit6.orbitRadius').replace('{radius}', (radius / 1e6).toFixed(1))}</label>
        <input type="range" min="6.6e6" max="12e6" step="1e5" value={radius} onChange={e => setRadius(Number(e.target.value))} className="w-full accent-brand-cyan" />
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={300} height={280} className="w-full" style={{ maxWidth: 300, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="grid sm:grid-cols-3 gap-3 mb-4">
        <div className="formula-box rounded-xl p-4 text-center"><p className="text-gray-400 text-xs uppercase mb-1">{t('unit6.orbitalVelocity')}</p><p className="text-xl font-space font-bold text-brand-cyan">{v.toFixed(0)} m/s</p></div>
        <div className="formula-box rounded-xl p-4 text-center"><p className="text-gray-400 text-xs uppercase mb-1">{t('unit6.period')}</p><p className="text-xl font-space font-bold text-brand-pink">{(T / 60).toFixed(1)} min</p></div>
        <div className="formula-box rounded-xl p-4 text-center"><p className="text-gray-400 text-xs uppercase mb-1">{t('unit6.height')}</p><p className="text-xl font-space font-bold text-brand-amber">{((radius - 6.4e6) / 1000).toFixed(0)} km</p></div>
      </div>
      <div className="formula-box rounded-2xl p-5 text-center">
        <p className="text-xl font-space font-bold text-white">{t('unit6.orbitalFormulaCalc').replace('{gm}', (G * M).toExponential(2)).replace('{radius}', String(radius))}</p>
      </div>
    </div>
  );
}
