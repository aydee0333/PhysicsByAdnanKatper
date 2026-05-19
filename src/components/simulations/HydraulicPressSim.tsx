import { useState, useRef, useEffect } from 'react';

export default function HydraulicPressSim() {
  const [inputForce, setInputForce] = useState(20);
  const [areaRatio, setAreaRatio] = useState(5);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);

  const outputForce = inputForce * areaRatio;
  const pressure = inputForce / 10;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;

    const targetPos = inputForce / 100;
    const draw = () => {
      animRef.current = requestAnimationFrame(draw);
      posRef.current += (targetPos - posRef.current) * 0.08;
      const pos = posRef.current;
      ctx.clearRect(0, 0, w, h);

      const smallX = 80, bigX = 300, pistonW = 60;
      const smallH = 120, bigH = 120;
      const baseY = h - 40;

      // Fluid channel
      ctx.fillStyle = 'rgba(6,182,212,0.15)';
      ctx.fillRect(smallX + pistonW / 2 - 10, baseY - 10, bigX - smallX + 10, 20);
      ctx.strokeStyle = 'rgba(6,182,212,0.3)'; ctx.lineWidth = 1;
      ctx.strokeRect(smallX + pistonW / 2 - 10, baseY - 10, bigX - smallX + 10, 20);

      // Animated fluid particles
      const time = Date.now() * 0.002;
      for (let i = 0; i < 8; i++) {
        const px = smallX + pistonW / 2 + ((time * 30 + i * 40) % (bigX - smallX));
        ctx.fillStyle = 'rgba(6,182,212,0.5)';
        ctx.beginPath(); ctx.arc(px, baseY, 2.5, 0, Math.PI * 2); ctx.fill();
      }

      // Small piston cylinder
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      ctx.fillRect(smallX, baseY - smallH - 30, pistonW, smallH + 30);
      ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1.5;
      ctx.strokeRect(smallX, baseY - smallH - 30, pistonW, smallH + 30);

      // Small piston head
      const smallPistonY = baseY - 20 - pos * 60;
      ctx.fillStyle = 'rgba(132,204,22,0.3)'; ctx.strokeStyle = '#84cc16'; ctx.lineWidth = 2;
      ctx.fillRect(smallX + 2, smallPistonY, pistonW - 4, 15);
      ctx.strokeRect(smallX + 2, smallPistonY, pistonW - 4, 15);

      // Big piston cylinder
      const bigPistonW = pistonW * Math.sqrt(areaRatio);
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      ctx.fillRect(bigX, baseY - bigH - 30, bigPistonW, bigH + 30);
      ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1.5;
      ctx.strokeRect(bigX, baseY - bigH - 30, bigPistonW, bigH + 30);

      // Big piston head (rises less)
      const bigPistonY = baseY - 20 - (pos * 60) / areaRatio;
      ctx.fillStyle = 'rgba(244,63,94,0.3)'; ctx.strokeStyle = '#f43f5e'; ctx.lineWidth = 2;
      ctx.fillRect(bigX + 2, bigPistonY, bigPistonW - 4, 15);
      ctx.strokeRect(bigX + 2, bigPistonY, bigPistonW - 4, 15);

      // Force arrows
      if (inputForce > 0) {
        ctx.strokeStyle = '#84cc16'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(smallX + pistonW / 2, smallPistonY - 40);
        ctx.lineTo(smallX + pistonW / 2, smallPistonY - 5); ctx.stroke();
        ctx.fillStyle = '#84cc16';
        ctx.beginPath(); ctx.moveTo(smallX + pistonW / 2, smallPistonY - 5);
        ctx.lineTo(smallX + pistonW / 2 - 6, smallPistonY - 12);
        ctx.lineTo(smallX + pistonW / 2 + 6, smallPistonY - 12); ctx.closePath(); ctx.fill();
        ctx.font = 'bold 11px Poppins'; ctx.textAlign = 'center';
        ctx.fillText(`${inputForce}N`, smallX + pistonW / 2, smallPistonY - 45);

        ctx.strokeStyle = '#f43f5e'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(bigX + bigPistonW / 2, bigPistonY + 20);
        ctx.lineTo(bigX + bigPistonW / 2, bigPistonY + 55); ctx.stroke();
        ctx.fillStyle = '#f43f5e';
        ctx.beginPath(); ctx.moveTo(bigX + bigPistonW / 2, bigPistonY + 55);
        ctx.lineTo(bigX + bigPistonW / 2 - 6, bigPistonY + 48);
        ctx.lineTo(bigX + bigPistonW / 2 + 6, bigPistonY + 48); ctx.closePath(); ctx.fill();
        ctx.font = 'bold 11px Poppins'; ctx.textAlign = 'center';
        ctx.fillText(`${outputForce}N`, bigX + bigPistonW / 2, bigPistonY + 70);
      }

      // Pressure arrows inside fluid
      ctx.strokeStyle = 'rgba(245,158,11,0.5)'; ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        const ax = smallX + pistonW + 30 + i * 50;
        ctx.beginPath(); ctx.moveTo(ax, baseY - 5); ctx.lineTo(ax, baseY + 5); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(ax, baseY + 5); ctx.lineTo(ax - 3, baseY + 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(ax, baseY + 5); ctx.lineTo(ax + 3, baseY + 2); ctx.stroke();
      }

      // Labels
      ctx.fillStyle = '#94a3b8'; ctx.font = '11px Poppins'; ctx.textAlign = 'center';
      ctx.fillText(`A₁ = 10 cm²`, smallX + pistonW / 2, baseY + 20);
      ctx.fillText(`A₂ = ${(10 * areaRatio).toFixed(0)} cm²`, bigX + bigPistonW / 2, baseY + 20);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [inputForce, areaRatio, outputForce]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-gray-400 text-xs block mb-1">Input Force: {inputForce} N</label>
          <input type="range" min={0} max={100} step={5} value={inputForce} onChange={e => setInputForce(Number(e.target.value))} className="w-full accent-brand-lime" />
        </div>
        <div>
          <label className="text-gray-400 text-xs block mb-1">Area Ratio: {areaRatio}x</label>
          <div className="flex gap-2">{[2, 5, 10].map(r => (
            <button key={r} onClick={() => setAreaRatio(r)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${areaRatio === r ? 'bg-brand-rose/20 text-brand-rose border border-brand-rose/30' : 'glass-card text-gray-400'}`}>{r}x</button>
          ))}</div>
        </div>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={500} height={250} className="w-full" style={{ maxWidth: 500, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="grid grid-cols-4 gap-3 mb-4">
        <div className="formula-box rounded-xl p-3 text-center"><p className="text-gray-400 text-xs uppercase">Input F</p><p className="text-lg font-space font-bold text-brand-lime">{inputForce} N</p></div>
        <div className="formula-box rounded-xl p-3 text-center"><p className="text-gray-400 text-xs uppercase">Output F</p><p className="text-lg font-space font-bold text-brand-rose">{outputForce} N</p></div>
        <div className="formula-box rounded-xl p-3 text-center"><p className="text-gray-400 text-xs uppercase">Ratio</p><p className="text-lg font-space font-bold text-brand-amber">{areaRatio}x</p></div>
        <div className="formula-box rounded-xl p-3 text-center"><p className="text-gray-400 text-xs uppercase">Pressure</p><p className="text-lg font-space font-bold text-brand-cyan">{pressure.toFixed(1)} Pa</p></div>
      </div>
      <div className="formula-box rounded-xl p-4 text-center">
        <p className="text-lg font-space font-bold text-white">F₁/A₁ = F₂/A₂ = P</p>
        <p className="text-gray-400 text-sm mt-1">Pascal's Law: Pressure is transmitted equally throughout the fluid</p>
      </div>
    </div>
  );
}
