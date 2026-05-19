import { useState, useRef, useEffect } from 'react';

export default function GravitationalFieldLinesSim() {
  const [clickPos, setClickPos] = useState<[number, number] | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const fallRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;

    const cx = w / 2, cy = h / 2, earthR = 40;

    const draw = () => {
      animRef.current = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, w, h);

      const numLines = 24;
      for (let i = 0; i < numLines; i++) {
        const angle = (i / numLines) * Math.PI * 2;
        const innerR = earthR + 5;
        const outerR = 180;
        const x1 = cx + Math.cos(angle) * innerR;
        const y1 = cy + Math.sin(angle) * innerR;
        const x2 = cx + Math.cos(angle) * outerR;
        const y2 = cy + Math.sin(angle) * outerR;

        const grad = ctx.createLinearGradient(x2, y2, x1, y1);
        grad.addColorStop(0, 'rgba(124,58,237,0.1)');
        grad.addColorStop(1, 'rgba(124,58,237,0.6)');
        ctx.strokeStyle = grad; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x1, y1); ctx.stroke();

        const arrowR = innerR + 8;
        const ax = cx + Math.cos(angle) * arrowR;
        const ay = cy + Math.sin(angle) * arrowR;
        ctx.fillStyle = 'rgba(124,58,237,0.7)';
        ctx.beginPath(); ctx.moveTo(ax, ay);
        ctx.lineTo(ax - 5 * Math.cos(angle - 0.5), ay - 5 * Math.sin(angle - 0.5));
        ctx.lineTo(ax - 5 * Math.cos(angle + 0.5), ay - 5 * Math.sin(angle + 0.5));
        ctx.closePath(); ctx.fill();
      }

      const earthGrad = ctx.createRadialGradient(cx - 10, cy - 10, 5, cx, cy, earthR);
      earthGrad.addColorStop(0, '#3b82f6'); earthGrad.addColorStop(1, '#1e3a5f');
      ctx.fillStyle = earthGrad; ctx.beginPath(); ctx.arc(cx, cy, earthR, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(59,130,246,0.5)'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 11px Poppins'; ctx.textAlign = 'center';
      ctx.fillText('Earth', cx, cy + 4);

      if (clickPos) {
        const [px, py] = clickPos;
        const dist = Math.sqrt((px - cx) ** 2 + (py - cy) ** 2);
        if (dist > earthR + 10) {
          const g = 9.8 * (earthR / dist) ** 2;

          ctx.fillStyle = '#f59e0b'; ctx.font = 'bold 11px Poppins'; ctx.textAlign = 'left';
          ctx.fillText(`g = ${g.toFixed(2)} m/s²`, px + 12, py - 5);

          ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();

          fallRef.current += 0.008;
          if (fallRef.current > 1) fallRef.current = 1;
          const t = fallRef.current;
          const massX = px + (cx - px) * t * t;
          const massY = py + (cy - py) * t * t;
          ctx.fillStyle = '#f43f5e'; ctx.beginPath(); ctx.arc(massX, massY, 6, 0, Math.PI * 2); ctx.fill();

          ctx.strokeStyle = 'rgba(244,63,94,0.3)'; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(massX, massY); ctx.stroke();
        }
      }

      ctx.strokeStyle = 'rgba(124,58,237,0.15)'; ctx.lineWidth = 8;
      ctx.beginPath(); ctx.arc(cx, cy, 120, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = 'rgba(124,58,237,0.3)'; ctx.lineWidth = 8;
      ctx.beginPath(); ctx.arc(cx, cy, 80, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = 'rgba(124,58,237,0.5)'; ctx.lineWidth = 8;
      ctx.beginPath(); ctx.arc(cx, cy, earthR + 20, 0, Math.PI * 2); ctx.stroke();
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [clickPos]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    setClickPos([x, y]);
    fallRef.current = 0;
  };

  return (
    <div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={400} height={400} onClick={handleClick} className="w-full cursor-crosshair" style={{ maxWidth: 400, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="glass-card rounded-xl p-4">
        <p className="text-gray-300 text-sm">Click anywhere to place a test mass. Watch it fall along the field line. Field is <strong className="text-brand-purple">stronger near Earth</strong> (brighter lines).</p>
      </div>
    </div>
  );
}
