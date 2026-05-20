import { useState, useEffect, useRef } from 'react';

export default function RelativeMotionSim() {
  const [scenario, setScenario] = useState<'truck' | 'river' | 'wind'>('truck');
  const [objSpeed, setObjSpeed] = useState(5);
  const [frameSpeed, setFrameSpeed] = useState(3);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const tRef = useRef(0);

  const drawArrow = (ctx: CanvasRenderingContext2D, ox: number, oy: number, dx: number, dy: number, color: string, label: string) => {
    ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.globalAlpha = 0.8;
    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + dx, oy + dy); ctx.stroke();
    const angle = Math.atan2(dy, dx);
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.moveTo(ox + dx, oy + dy);
    ctx.lineTo(ox + dx - 8 * Math.cos(angle - 0.4), oy + dy - 8 * Math.sin(angle - 0.4));
    ctx.lineTo(ox + dx - 8 * Math.cos(angle + 0.4), oy + dy - 8 * Math.sin(angle + 0.4));
    ctx.closePath(); ctx.fill();
    ctx.font = '10px Poppins'; ctx.textAlign = 'left';
    ctx.fillText(label, ox + dx + 8, oy + dy - 5);
    ctx.globalAlpha = 1;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;

    const draw = () => {
      animRef.current = requestAnimationFrame(draw);
      tRef.current += 0.02;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2, cy = h / 2;

      ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = 0.5;
      for (let x = 0; x < w; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

      ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(40, cy + 60); ctx.lineTo(w - 40, cy + 60); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.font = '10px Poppins'; ctx.textAlign = 'center';
      ctx.fillText('Ground', cx, cy + 75);

      const phase = tRef.current % (Math.PI * 2);
      const objDisp = Math.sin(phase) * 60;

      if (scenario === 'truck') {
        const truckX = cx - 80 + frameSpeed * 8 * Math.sin(phase * 0.5);
        const carX = truckX + objDisp * (objSpeed / 5);

        ctx.fillStyle = 'rgba(124,58,237,0.3)'; ctx.fillRect(truckX - 60, cy - 10, 120, 40);
        ctx.strokeStyle = '#a78bfa'; ctx.lineWidth = 2; ctx.strokeRect(truckX - 60, cy - 10, 120, 40);
        ctx.fillStyle = '#a78bfa'; ctx.font = 'bold 10px Poppins'; ctx.textAlign = 'center';
        ctx.fillText('Truck', truckX, cy + 25);

        ctx.fillStyle = 'rgba(6,182,212,0.4)'; ctx.fillRect(carX - 20, cy - 30, 40, 20);
        ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 2; ctx.strokeRect(carX - 20, cy - 30, 40, 20);
        ctx.fillStyle = '#06b6d4'; ctx.font = '10px Poppins'; ctx.fillText('Car', carX, cy - 35);

        drawArrow(ctx, cx, cy + 100, frameSpeed * 12, 0, '#a78bfa', `V_truck = ${frameSpeed}`);
        drawArrow(ctx, cx, cy + 130, objSpeed * 8, 0, '#06b6d4', `V_car/truck = ${objSpeed}`);
        drawArrow(ctx, cx, cy + 160, frameSpeed * 12 + objSpeed * 8, 0, '#84cc16', `V_car/ground = ${(frameSpeed + objSpeed).toFixed(1)}`);
      } else if (scenario === 'river') {
        const boatX = cx + objDisp * (objSpeed / 5);
        const boatY = cy - 40 - frameSpeed * 5 * Math.abs(Math.sin(phase * 0.3));

        ctx.fillStyle = 'rgba(6,182,212,0.08)'; ctx.fillRect(40, cy - 80, w - 80, 100);
        ctx.strokeStyle = 'rgba(6,182,212,0.2)'; ctx.lineWidth = 1;
        ctx.strokeRect(40, cy - 80, w - 80, 100);
        ctx.fillStyle = 'rgba(6,182,212,0.3)'; ctx.font = '10px Poppins'; ctx.textAlign = 'center';
        ctx.fillText('River', cx, cy - 85);

        ctx.fillStyle = 'rgba(245,158,11,0.4)'; ctx.beginPath();
        ctx.moveTo(boatX - 20, boatY); ctx.lineTo(boatX + 20, boatY);
        ctx.lineTo(boatX + 15, boatY + 12); ctx.lineTo(boatX - 15, boatY + 12); ctx.closePath();
        ctx.fill(); ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2; ctx.stroke();

        drawArrow(ctx, cx, cy + 100, objSpeed * 10, 0, '#06b6d4', `V_boat = ${objSpeed} →`);
        drawArrow(ctx, cx, cy + 130, 0, -frameSpeed * 10, '#f59e0b', `V_current = ${frameSpeed} ↓`);
        const rx = objSpeed * 10, ry = -frameSpeed * 10;
        drawArrow(ctx, cx, cy + 160, rx, ry, '#84cc16', `V_resultant = ${Math.sqrt(objSpeed ** 2 + frameSpeed ** 2).toFixed(1)}`);
      } else {
        const planeX = cx + objDisp * (objSpeed / 5);
        const planeY = cy - 50 + frameSpeed * 3 * Math.sin(phase * 0.4);

        ctx.fillStyle = 'rgba(244,63,94,0.4)'; ctx.beginPath();
        ctx.moveTo(planeX, planeY - 8); ctx.lineTo(planeX + 30, planeY + 4);
        ctx.lineTo(planeX, planeY + 8); ctx.lineTo(planeX - 30, planeY + 4); ctx.closePath();
        ctx.fill(); ctx.strokeStyle = '#f43f5e'; ctx.lineWidth = 2; ctx.stroke();

        for (let i = 0; i < 5; i++) {
          const wy = cy - 80 + i * 25;
          ctx.strokeStyle = 'rgba(132,204,22,0.2)'; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(60, wy); ctx.lineTo(60 + 30 + frameSpeed * 10, wy); ctx.stroke();
          ctx.fillStyle = 'rgba(132,204,22,0.3)'; ctx.font = '8px Poppins'; ctx.textAlign = 'left';
          ctx.fillText('→', 60 + 30 + frameSpeed * 10 + 5, wy + 3);
        }

        drawArrow(ctx, cx, cy + 100, objSpeed * 10, 0, '#f43f5e', `V_plane = ${objSpeed}`);
        drawArrow(ctx, cx, cy + 130, frameSpeed * 8, -frameSpeed * 4, '#84cc16', `V_wind = ${frameSpeed}`);
        drawArrow(ctx, cx, cy + 160, objSpeed * 10 + frameSpeed * 8, -frameSpeed * 4, '#f59e0b', `V_ground = ${(Math.sqrt((objSpeed + frameSpeed * 0.8) ** 2 + (frameSpeed * 0.4) ** 2)).toFixed(1)}`);
      }

      ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.font = 'bold 12px Poppins'; ctx.textAlign = 'center';
      const labels = { truck: 'Car on Moving Truck', river: 'Boat Crossing River', wind: 'Airplane in Wind' };
      ctx.fillText(labels[scenario], cx, 25);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [scenario, objSpeed, frameSpeed]);

  return (
    <div>
      <div className="flex gap-2 mb-4 flex-wrap">
        {([['truck', 'Car on Truck'], ['river', 'Boat in River'], ['wind', 'Plane in Wind']] as const).map(([key, label]) => (
          <button key={key} onClick={() => setScenario(key)} className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${scenario === key ? 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/30' : 'glass-card text-gray-400 border-white/10'}`}>{label}</button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-gray-400 text-sm block mb-2">Object Speed: {objSpeed} m/s</label>
          <input type="range" min={1} max={15} value={objSpeed} onChange={e => setObjSpeed(Number(e.target.value))} className="w-full accent-brand-cyan" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">Frame Speed: {frameSpeed} m/s</label>
          <input type="range" min={0} max={10} value={frameSpeed} onChange={e => setFrameSpeed(Number(e.target.value))} className="w-full accent-brand-amber" />
        </div>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={500} height={280} className="w-full" style={{ maxWidth: 500, margin: '0 auto', display: 'block' }} />
      </div>
    </div>
  );
}
