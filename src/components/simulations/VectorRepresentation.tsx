import { useState, useEffect, useRef } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function VectorRepresentation() {
  const t = useT();
  const [magnitude, setMagnitude] = useState(50);
  const [angle, setAngle] = useState(45);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    const cx = w / 2, cy = h / 2;

    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cx, 20); ctx.lineTo(cx, h - 20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(20, cy); ctx.lineTo(w - 20, cy); ctx.stroke();

    ctx.fillStyle = '#9ca3af'; ctx.font = '12px Poppins'; ctx.textAlign = 'center';
    ctx.fillText('N', cx, 15); ctx.fillText('S', cx, h - 5);
    ctx.fillText('W', 15, cy + 4); ctx.fillText('E', w - 10, cy + 4);

    const rad = (angle * Math.PI) / 180;
    const len = (magnitude / 100) * 100;
    const ex = cx + Math.cos(rad) * len;
    const ey = cy - Math.sin(rad) * len;

    ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ex, ey); ctx.stroke();

    const headLen = 10;
    const angle2 = Math.atan2(cy - ey, cx - ex);
    ctx.beginPath(); ctx.moveTo(ex, ey);
    ctx.lineTo(ex + headLen * Math.cos(angle2 + 0.5), ey + headLen * Math.sin(angle2 + 0.5));
    ctx.lineTo(ex + headLen * Math.cos(angle2 - 0.5), ey + headLen * Math.sin(angle2 - 0.5));
    ctx.fillStyle = '#06b6d4'; ctx.fill();

    ctx.fillStyle = '#06b6d4'; ctx.font = 'bold 14px Poppins'; ctx.textAlign = 'left';
    ctx.fillText(`Magnitude: ${magnitude} units`, 10, h - 30);
    ctx.fillText(`Direction: ${angle}° from East`, 10, h - 10);
  }, [magnitude, angle]);

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-gray-400 text-sm block mb-2">Magnitude: {magnitude}</label>
          <input type="range" min="10" max="100" value={magnitude} onChange={e => setMagnitude(Number(e.target.value))} className="w-full accent-brand-cyan" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">Angle: {angle}°</label>
          <input type="range" min="0" max="360" value={angle} onChange={e => setAngle(Number(e.target.value))} className="w-full accent-brand-amber" />
        </div>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5">
        <canvas ref={canvasRef} width={300} height={220} className="w-full" style={{ maxWidth: 300, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="glass-card rounded-xl p-4 mt-4">
        <p className="text-gray-300 text-sm">💡 <strong className="text-white">{t('unit2.vectors')}</strong> has both magnitude (size) and direction. Scalar has only magnitude.</p>
      </div>
    </div>
  );
}
