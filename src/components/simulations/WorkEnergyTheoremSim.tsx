import { useState, useEffect, useRef } from 'react';

export default function WorkEnergyTheoremSim() {
  const [force, setForce] = useState(50);
  const [mass, setMass] = useState(5);
  const [distance, setDistance] = useState(10);
  const [friction, setFriction] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);

  const muK = 0.2;
  const frictionForce = friction ? muK * mass * 9.8 : 0;
  const netForce = force - frictionForce;
  const work = netForce * distance;
  const finalV = Math.sqrt(Math.max(0, 2 * work / mass));
  const ke = 0.5 * mass * finalV ** 2;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const groundY = h - 60;
      const blockW = 50, blockH = 40;
      const startX = 60;
      const endX = startX + distance * 30;
      const blockX = startX + posRef.current * distance * 30;

      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      ctx.fillRect(0, groundY, w, 60);
      if (friction) {
        ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 0.5;
        for (let x = 0; x < w; x += 8) {
          ctx.beginPath(); ctx.moveTo(x, groundY); ctx.lineTo(x + 4, groundY + 6); ctx.stroke();
        }
      }

      ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(startX, groundY - 5); ctx.lineTo(startX, groundY + 5); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(endX, groundY - 5); ctx.lineTo(endX, groundY + 5); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '10px Poppins'; ctx.textAlign = 'center';
      ctx.fillText(`d = ${distance}m`, (startX + endX) / 2, groundY + 20);

      ctx.fillStyle = 'rgba(6,182,212,0.3)';
      ctx.fillRect(blockX, groundY - blockH, blockW, blockH);
      ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 2;
      ctx.strokeRect(blockX, groundY - blockH, blockW, blockH);
      ctx.fillStyle = '#06b6d4'; ctx.font = 'bold 10px Poppins'; ctx.textAlign = 'center';
      ctx.fillText(`${mass}kg`, blockX + blockW / 2, groundY - blockH / 2 + 4);

      const arrowY = groundY - blockH / 2;
      ctx.strokeStyle = '#84cc16'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(blockX + blockW, arrowY); ctx.lineTo(blockX + blockW + force * 0.8, arrowY); ctx.stroke();
      ctx.fillStyle = '#84cc16';
      ctx.beginPath(); ctx.moveTo(blockX + blockW + force * 0.8, arrowY);
      ctx.lineTo(blockX + blockW + force * 0.8 - 8, arrowY - 5);
      ctx.lineTo(blockX + blockW + force * 0.8 - 8, arrowY + 5);
      ctx.closePath(); ctx.fill();
      ctx.font = 'bold 10px Poppins'; ctx.textAlign = 'left';
      ctx.fillText(`F = ${force}N`, blockX + blockW + force * 0.8 + 5, arrowY + 4);

      if (friction && frictionForce > 0) {
        ctx.strokeStyle = '#f43f5e'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(blockX, arrowY + 15); ctx.lineTo(blockX - frictionForce * 0.8, arrowY + 15); ctx.stroke();
        ctx.fillStyle = '#f43f5e';
        ctx.beginPath(); ctx.moveTo(blockX - frictionForce * 0.8, arrowY + 15);
        ctx.lineTo(blockX - frictionForce * 0.8 + 8, arrowY + 10);
        ctx.lineTo(blockX - frictionForce * 0.8 + 8, arrowY + 20);
        ctx.closePath(); ctx.fill();
        ctx.font = '9px Poppins'; ctx.textAlign = 'right';
        ctx.fillText(`f = ${frictionForce.toFixed(0)}N`, blockX - 5, arrowY + 24);
      }

      const barX = 30, barW = 40, maxBarH = 120;
      const workH = Math.min((work / 1000) * maxBarH, maxBarH);
      const keH = Math.min((ke / 1000) * maxBarH, maxBarH);
      const heatH = friction ? Math.min((frictionForce * distance / 1000) * maxBarH, maxBarH) : 0;

      ctx.fillStyle = 'rgba(132,204,22,0.2)'; ctx.fillRect(barX, 30 + maxBarH - workH, barW, workH);
      ctx.strokeStyle = '#84cc16'; ctx.lineWidth = 2; ctx.strokeRect(barX, 30 + maxBarH - workH, barW, workH);
      ctx.fillStyle = '#84cc16'; ctx.font = '9px Poppins'; ctx.textAlign = 'center';
      ctx.fillText('W', barX + barW / 2, 30 + maxBarH + 15);
      ctx.fillText(`${work.toFixed(0)}J`, barX + barW / 2, 30 + maxBarH - workH - 5);

      ctx.fillStyle = 'rgba(6,182,212,0.2)'; ctx.fillRect(barX + barW + 10, 30 + maxBarH - keH, barW, keH);
      ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 2; ctx.strokeRect(barX + barW + 10, 30 + maxBarH - keH, barW, keH);
      ctx.fillStyle = '#06b6d4'; ctx.font = '9px Poppins';
      ctx.fillText('KE', barX + barW * 1.5 + 10, 30 + maxBarH + 15);
      ctx.fillText(`${ke.toFixed(0)}J`, barX + barW * 1.5 + 10, 30 + maxBarH - keH - 5);

      if (friction) {
        ctx.fillStyle = 'rgba(244,63,94,0.2)'; ctx.fillRect(barX + 2 * (barW + 10), 30 + maxBarH - heatH, barW, heatH);
        ctx.strokeStyle = '#f43f5e'; ctx.lineWidth = 2; ctx.strokeRect(barX + 2 * (barW + 10), 30 + maxBarH - heatH, barW, heatH);
        ctx.fillStyle = '#f43f5e'; ctx.font = '9px Poppins';
        ctx.fillText('Heat', barX + 2 * (barW + 10) + barW / 2, 30 + maxBarH + 15);
        ctx.fillText(`${heatH > 0 ? (frictionForce * distance).toFixed(0) : '0'}J`, barX + 2 * (barW + 10) + barW / 2, 30 + maxBarH - heatH - 5);
      }

      ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '10px Poppins'; ctx.textAlign = 'center';
      ctx.fillText(`W_net = ΔKE → ${netForce.toFixed(0)} × ${distance} = ½ × ${mass} × ${finalV.toFixed(1)}²`, w / 2, h - 10);

      ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 11px Poppins'; ctx.textAlign = 'left';
      ctx.fillText(`v_final = ${finalV.toFixed(2)} m/s`, w - 180, 30);

      if (isAnimating) {
        posRef.current += 0.015;
        if (posRef.current >= 1) { posRef.current = 1; setIsAnimating(false); }
        animRef.current = requestAnimationFrame(draw);
      }
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [force, mass, distance, friction, isAnimating]);

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="text-gray-400 text-sm block mb-2">Applied Force: {force} N</label>
          <input type="range" min={10} max={200} value={force} onChange={e => setForce(Number(e.target.value))} className="w-full accent-brand-lime" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">Mass: {mass} kg</label>
          <input type="range" min={1} max={20} value={mass} onChange={e => setMass(Number(e.target.value))} className="w-full accent-brand-cyan" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">Distance: {distance} m</label>
          <input type="range" min={1} max={20} value={distance} onChange={e => setDistance(Number(e.target.value))} className="w-full accent-brand-amber" />
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => { posRef.current = 0; setIsAnimating(true); }} className="px-6 py-2 rounded-xl text-sm font-semibold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 hover:bg-brand-cyan/30 transition-all">
          ▶ Push Block
        </button>
        <button onClick={() => { setFriction(!friction); posRef.current = 0; setIsAnimating(false); }} className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${friction ? 'bg-brand-rose/20 text-brand-rose border-brand-rose/30' : 'glass-card text-gray-400 border-white/10'}`}>
          {friction ? '🔥 Friction ON' : 'Friction OFF'}
        </button>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={500} height={260} className="w-full" style={{ maxWidth: 500, margin: '0 auto', display: 'block' }} />
      </div>
    </div>
  );
}
