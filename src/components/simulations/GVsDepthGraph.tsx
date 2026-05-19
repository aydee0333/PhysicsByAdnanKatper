import { useState, useRef, useEffect } from 'react';

export default function GVsDepthGraph() {
  const [depth, setDepth] = useState(0);
  const g0 = 9.8;
  const R = 6371;
  const gDepth = g0 * (1 - depth / R);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const graphX = 60, graphY = 30, graphW = 300, graphH = 200;

    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(graphX, graphY, graphW, graphH);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1;
    ctx.strokeRect(graphX, graphY, graphW, graphH);

    for (let i = 1; i < 5; i++) {
      const x = graphX + (i / 5) * graphW;
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.beginPath(); ctx.moveTo(x, graphY); ctx.lineTo(x, graphY + graphH); ctx.stroke();
      const y = graphY + (i / 5) * graphH;
      ctx.beginPath(); ctx.moveTo(graphX, y); ctx.lineTo(graphX + graphW, y); ctx.stroke();
    }

    ctx.fillStyle = '#9ca3af';
    ctx.font = '11px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText('Depth (km)', graphX + graphW / 2, graphY + graphH + 25);
    ctx.save();
    ctx.translate(18, graphY + graphH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('g (m/s²)', 0, 0);
    ctx.restore();

    ctx.textAlign = 'right';
    ctx.font = '10px Poppins';
    for (let i = 0; i <= 4; i++) {
      const val = (i / 4) * g0;
      const y = graphY + graphH - (i / 4) * graphH;
      ctx.fillStyle = '#64748b';
      ctx.fillText(val.toFixed(1), graphX - 8, y + 3);
    }

    ctx.textAlign = 'center';
    for (let i = 0; i <= 4; i++) {
      const val = (i / 4) * R;
      const x = graphX + (i / 4) * graphW;
      ctx.fillStyle = '#64748b';
      ctx.fillText(Math.round(val).toLocaleString(), x, graphY + graphH + 12);
    }

    ctx.strokeStyle = 'rgba(124,58,237,0.3)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    for (let ax = 0; ax <= graphW; ax += 2) {
      const h_val = (ax / graphW) * R * 3;
      const gAlt = g0 * Math.pow(R / (R + h_val), 2);
      const px = graphX + ax;
      const py = graphY + graphH - (gAlt / g0) * graphH;
      ax === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let ax = 0; ax <= graphW; ax += 2) {
      const d = (ax / graphW) * R;
      const gD = g0 * (1 - d / R);
      const px = graphX + ax;
      const py = graphY + graphH - (gD / g0) * graphH;
      ax === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();

    const cx = graphX + (depth / R) * graphW;
    const cy = graphY + graphH - (gDepth / g0) * graphH;
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(cx, cy, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(244,63,94,0.3)';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(cx, cy, 7, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(244,63,94,0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(cx, graphY); ctx.lineTo(cx, graphY + graphH); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(graphX, cy); ctx.lineTo(graphX + graphW, cy); ctx.stroke();
    ctx.setLineDash([]);

    const earthCx = 440, earthCy = 130, earthR = 65;
    ctx.strokeStyle = 'rgba(59,130,246,0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(earthCx, earthCy, earthR, 0, Math.PI * 2);
    ctx.stroke();
    const depthR = earthR * (1 - depth / R);
    if (depth > 0) {
      ctx.fillStyle = 'rgba(244,63,94,0.15)';
      ctx.beginPath();
      ctx.arc(earthCx, earthCy, depthR, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(earthCx, earthCy, depthR, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(earthCx, earthCy, 3, 0, Math.PI * 2);
    ctx.fill();
    if (depth > 0) {
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(earthCx, earthCy);
      ctx.lineTo(earthCx, earthCy - earthR);
      ctx.stroke();
      ctx.fillStyle = '#f43f5e';
      ctx.font = 'bold 10px Poppins';
      ctx.textAlign = 'left';
      ctx.fillText(`d = ${depth} km`, earthCx + 5, earthCy - earthR / 2);
    }
    ctx.fillStyle = '#9ca3af';
    ctx.font = '10px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText('Surface', earthCx, earthCy - earthR - 8);
    ctx.fillText('Center', earthCx, earthCy + 12);

    ctx.fillStyle = '#f43f5e';
    ctx.font = '10px Poppins';
    ctx.textAlign = 'left';
    ctx.fillText('— g vs Depth', graphX, graphY + graphH + 40);
    ctx.fillStyle = 'rgba(124,58,237,0.5)';
    ctx.fillText('- - g vs Altitude', graphX + 120, graphY + graphH + 40);
  }, [depth, g0, R, gDepth]);

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">Depth: {depth} km (Earth radius = {R} km)</label>
        <input type="range" min={0} max={R} step={50} value={depth} onChange={e => setDepth(Number(e.target.value))} className="w-full accent-rose-500" />
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={500} height={280} className="w-full" style={{ maxWidth: 500, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="formula-box rounded-xl p-3 text-center">
          <p className="text-gray-400 text-xs uppercase">g at {depth} km depth</p>
          <p className="text-xl font-space font-bold text-brand-rose">{gDepth.toFixed(2)} m/s²</p>
        </div>
        <div className="formula-box rounded-xl p-3 text-center">
          <p className="text-gray-400 text-xs uppercase">Formula</p>
          <p className="text-sm font-space font-bold text-white">g = g₀(1 − d/R)</p>
        </div>
      </div>
    </div>
  );
}
