import { useState, useEffect, useRef } from 'react';

export default function FreeBodyDiagramSim() {
  const [forces, setForces] = useState({ weight: true, normal: true, applied: false, friction: false });
  const [appliedMag, setAppliedMag] = useState(40);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const toggle = (f: keyof typeof forces) => setForces(prev => ({ ...prev, [f]: !prev[f] }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2, cy = h / 2;
    const boxW = 60, boxH = 50;

    ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = 0.5;
    for (let x = 0; x < w; x += 30) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y < h; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

    const drawArrow = (fx: number, fy: number, color: number[], label: string) => {
      const scale = 1.5;
      const ex = cx + fx * scale, ey = cy - fy * scale;
      ctx.strokeStyle = `rgba(${color.join(',')},0.8)`; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ex, ey); ctx.stroke();
      const angle = Math.atan2(ey - cy, ex - cx);
      ctx.fillStyle = `rgba(${color.join(',')},0.8)`;
      ctx.beginPath(); ctx.moveTo(ex, ey);
      ctx.lineTo(ex - 10 * Math.cos(angle - 0.4), ey - 10 * Math.sin(angle - 0.4));
      ctx.lineTo(ex - 10 * Math.cos(angle + 0.4), ey - 10 * Math.sin(angle + 0.4));
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = `rgb(${color.join(',')})`; ctx.font = 'bold 11px Poppins'; ctx.textAlign = 'center';
      ctx.fillText(label, ex + (fx > 0 ? 20 : fx < 0 ? -20 : 0), ey + (fy > 0 ? -15 : fy < 0 ? 20 : 0));
    };

    if (forces.weight) drawArrow(0, -60, [244, 63, 94], 'W = mg');
    if (forces.normal) drawArrow(0, 60, [6, 182, 212], 'N');
    if (forces.applied) drawArrow(appliedMag, 0, [132, 204, 22], `F = ${appliedMag}N`);
    if (forces.friction) drawArrow(-appliedMag * 0.5, 0, [245, 158, 11], 'f');

    let netFx = 0, netFy = 0;
    if (forces.weight) netFy -= 60;
    if (forces.normal) netFy += 60;
    if (forces.applied) netFx += appliedMag;
    if (forces.friction) netFx -= appliedMag * 0.5;
    const netMag = Math.sqrt(netFx * netFx + netFy * netFy);
    if (netMag > 2) {
      const scale = 1.5;
      ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 2.5; ctx.setLineDash([6, 4]);
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + netFx * scale, cy - netFy * scale); ctx.stroke(); ctx.setLineDash([]);
      const angle = Math.atan2(-netFy, netFx);
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      const ex = cx + netFx * scale, ey = cy - netFy * scale;
      ctx.beginPath(); ctx.moveTo(ex, ey);
      ctx.lineTo(ex - 10 * Math.cos(angle - 0.4), ey - 10 * Math.sin(angle - 0.4));
      ctx.lineTo(ex - 10 * Math.cos(angle + 0.4), ey - 10 * Math.sin(angle + 0.4));
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 11px Poppins'; ctx.textAlign = 'left';
      ctx.fillText(`Net = ${netMag.toFixed(0)} N`, ex + 10, ey);
    }

    ctx.fillStyle = 'rgba(124,58,237,0.3)'; ctx.strokeStyle = '#a78bfa'; ctx.lineWidth = 2;
    ctx.fillRect(cx - boxW / 2, cy - boxH / 2, boxW, boxH);
    ctx.strokeRect(cx - boxW / 2, cy - boxH / 2, boxW, boxH);
    ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 12px Poppins'; ctx.textAlign = 'center';
    ctx.fillText('BOX', cx, cy + 4);

    ctx.font = 'bold 14px Poppins'; ctx.textAlign = 'center';
    if (netMag < 3) { ctx.fillStyle = '#84cc16'; ctx.fillText('✓ EQUILIBRIUM (ΣF = 0)', w / 2, h - 20); }
    else { ctx.fillStyle = '#f43f5e'; ctx.fillText(`→ ACCELERATING (ΣF = ${netMag.toFixed(0)} N)`, w / 2, h - 20); }
  }, [forces, appliedMag]);

  const forceButtons = [
    { key: 'weight' as const, label: 'Weight ↓', color: 'bg-red-500/20 text-red-400 border-red-500/30', activeColor: 'bg-red-500/30 text-red-300 border-red-400' },
    { key: 'normal' as const, label: 'Normal ↑', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30', activeColor: 'bg-cyan-500/30 text-cyan-300 border-cyan-400' },
    { key: 'applied' as const, label: 'Applied →', color: 'bg-green-500/20 text-green-400 border-green-500/30', activeColor: 'bg-green-500/30 text-green-300 border-green-400' },
    { key: 'friction' as const, label: 'Friction ←', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30', activeColor: 'bg-amber-500/30 text-amber-300 border-amber-400' },
  ];

  return (
    <div>
      <div className="flex gap-2 mb-4 flex-wrap">
        {forceButtons.map(fb => (
          <button key={fb.key} onClick={() => toggle(fb.key)} className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${forces[fb.key] ? fb.activeColor : fb.color}`}>
            {fb.label} {forces[fb.key] ? '✓' : ''}
          </button>
        ))}
      </div>
      {forces.applied && (
        <div className="mb-4"><label className="text-gray-400 text-xs block mb-1">Applied Force: {appliedMag} N</label><input type="range" min={10} max={100} step={5} value={appliedMag} onChange={e => setAppliedMag(Number(e.target.value))} className="w-full accent-green-500" /></div>
      )}
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={500} height={300} className="w-full" style={{ maxWidth: 500, margin: '0 auto', display: 'block' }} />
      </div>
    </div>
  );
}
