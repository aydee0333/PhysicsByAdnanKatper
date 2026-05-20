import { useState, useEffect, useRef } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function CircularMotionSim() {
  const t = useT();
  const [speed, setSpeed] = useState(3);
  const [radius, setRadius] = useState(2.5);
  const [mass, setMass] = useState(2);
  const fc = (mass * speed * speed) / radius;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    const cx = w / 2, cy = h / 2;
    const r = Math.min(radius * 25, 90);

    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(124,58,237,0.2)'; ctx.lineWidth = 1; ctx.setLineDash([5, 5]);
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#7c3aed'; ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();

    const tVal = Date.now() * 0.002 * (speed / 3);
    const bx = cx + Math.cos(tVal) * r;
    const by = cy + Math.sin(tVal) * r;
    ctx.strokeStyle = '#a78bfa'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(bx, by); ctx.stroke();
    ctx.fillStyle = '#06b6d4'; ctx.beginPath(); ctx.arc(bx, by, 12, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = 'bold 10px Poppins'; ctx.textAlign = 'center'; ctx.fillText('m', bx, by + 4);

    const angle = Math.atan2(by - cy, bx - cx);
    const fx = cx + Math.cos(angle) * (r + 30);
    const fy = cy + Math.sin(angle) * (r + 30);
    ctx.strokeStyle = '#f43f5e'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(bx + Math.cos(angle) * 15, by + Math.sin(angle) * 15); ctx.lineTo(fx, fy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(fx - 8 * Math.cos(angle - 0.3), fy - 8 * Math.sin(angle - 0.3)); ctx.lineTo(fx, fy); ctx.lineTo(fx - 8 * Math.cos(angle + 0.3), fy - 8 * Math.sin(angle + 0.3)); ctx.stroke();
    ctx.fillStyle = '#f43f5e'; ctx.font = 'bold 11px Poppins'; ctx.fillText('Fc', fx + 15, fy);
  }, [speed, radius, mass]);

  useEffect(() => {
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const w = canvas.width, h = canvas.height;
      const cx = w / 2, cy = h / 2;
      const r = Math.min(radius * 25, 90);

      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(124,58,237,0.2)'; ctx.lineWidth = 1; ctx.setLineDash([5, 5]);
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = '#7c3aed'; ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();

      const tVal = Date.now() * 0.002 * (speed / 3);
      const bx = cx + Math.cos(tVal) * r;
      const by = cy + Math.sin(tVal) * r;
      ctx.strokeStyle = '#a78bfa'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(bx, by); ctx.stroke();
      ctx.fillStyle = '#06b6d4'; ctx.beginPath(); ctx.arc(bx, by, 12, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 10px Poppins'; ctx.textAlign = 'center'; ctx.fillText('m', bx, by + 4);

      const angle = Math.atan2(by - cy, bx - cx);
      const fx = cx + Math.cos(angle) * (r + 30);
      const fy = cy + Math.sin(angle) * (r + 30);
      ctx.strokeStyle = '#f43f5e'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(bx + Math.cos(angle) * 15, by + Math.sin(angle) * 15); ctx.lineTo(fx, fy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(fx - 8 * Math.cos(angle - 0.3), fy - 8 * Math.sin(angle - 0.3)); ctx.lineTo(fx, fy); ctx.lineTo(fx - 8 * Math.cos(angle + 0.3), fy - 8 * Math.sin(angle + 0.3)); ctx.stroke();
      ctx.fillStyle = '#f43f5e'; ctx.font = 'bold 11px Poppins'; ctx.fillText('Fc', fx + 15, fy);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [speed, radius]);

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div><label className="text-gray-400 text-sm block mb-2">{t('unit3.speedMs').replace('{speed}', String(speed))}</label><input type="range" min="1" max="10" step="0.5" value={speed} onChange={e => setSpeed(Number(e.target.value))} className="w-full accent-brand-cyan" /></div>
        <div><label className="text-gray-400 text-sm block mb-2">{t('unit3.radiusM').replace('{radius}', String(radius))}</label><input type="range" min="1" max="5" step="0.5" value={radius} onChange={e => setRadius(Number(e.target.value))} className="w-full accent-brand-pink" /></div>
        <div><label className="text-gray-400 text-sm block mb-2">{t('unit3.massKgLabel').replace('{mass}', String(mass))}</label><input type="range" min="1" max="10" value={mass} onChange={e => setMass(Number(e.target.value))} className="w-full accent-brand-amber" /></div>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={300} height={220} className="w-full" style={{ maxWidth: 300, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="formula-box rounded-2xl p-5 text-center">
        <p className="text-gray-400 text-xs uppercase mb-2">{t('unit3.centripetalTitle')}</p>
        <p className="text-2xl font-space font-bold text-white">Fc = mv²/r = {mass}×{speed}²/{radius} = <span className="text-brand-rose">{fc.toFixed(1)} N</span></p>
      </div>
    </div>
  );
}
