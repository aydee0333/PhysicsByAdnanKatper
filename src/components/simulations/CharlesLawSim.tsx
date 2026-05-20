import { useState, useRef, useEffect } from 'react';

export default function CharlesLawSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [temp, setTemp] = useState(300);
  const tempRef = useRef(temp);
  const moleculesRef = useRef<{ x: number; y: number; vx: number; vy: number }[]>([]);
  const animRef = useRef<number>(0);

  const volume = temp / 10;
  const vtRatio = 0.1;

  useEffect(() => { tempRef.current = temp; }, [temp]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (moleculesRef.current.length === 0) {
      for (let i = 0; i < 25; i++) {
        moleculesRef.current.push({
          x: 80 + Math.random() * 100,
          y: 120 + Math.random() * 140,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
        });
      }
    }

    const draw = () => {
      animRef.current = requestAnimationFrame(draw);
      const w = canvas.width, h = canvas.height;
      const T = tempRef.current;

      ctx.clearRect(0, 0, w, h);

      const px = 50, pw = 150;
      const pBottom = 300;
      const minH = 50, maxH = 230;
      const pH = minH + (maxH - minH) * ((T - 200) / 300);
      const pTop = pBottom - pH;

      const speedF = Math.sqrt(T / 300) * 0.7;
      const mols = moleculesRef.current;

      for (const m of mols) {
        m.x += m.vx * speedF;
        m.y += m.vy * speedF;
        const r = 5;
        if (m.x - r < px + 3) { m.x = px + 3 + r; m.vx = Math.abs(m.vx); }
        if (m.x + r > px + pw - 3) { m.x = px + pw - 3 - r; m.vx = -Math.abs(m.vx); }
        if (m.y + r > pBottom - 3) { m.y = pBottom - 3 - r; m.vy = -Math.abs(m.vy); }
        if (m.y - r < pTop + 10) { m.y = pTop + 10 + r; m.vy = Math.abs(m.vy); }
      }

      ctx.fillStyle = 'rgba(6,182,212,0.1)';
      ctx.fillRect(px + 2, pTop + 8, pw - 4, pH - 10);

      for (const m of mols) {
        const spd = Math.sqrt(m.vx * m.vx + m.vy * m.vy) * speedF;
        const alpha = Math.min(1, 0.4 + spd * 0.12);
        ctx.fillStyle = `rgba(6,182,212,${alpha})`;
        ctx.beginPath(); ctx.arc(m.x, m.y, 5, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = 'rgba(6,182,212,0.5)'; ctx.lineWidth = 1; ctx.stroke();
      }

      ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(px, pBottom); ctx.lineTo(px, pTop); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(px + pw, pBottom); ctx.lineTo(px + pw, pTop); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(px, pBottom); ctx.lineTo(px + pw, pBottom); ctx.stroke();

      ctx.fillStyle = 'rgba(124,58,237,0.6)';
      ctx.fillRect(px - 5, pTop - 4, pw + 10, 10);
      ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2;
      ctx.strokeRect(px - 5, pTop - 4, pw + 10, 10);

      ctx.fillStyle = '#a78bfa'; ctx.font = 'bold 12px Poppins'; ctx.textAlign = 'center';
      ctx.fillText(`V = ${(T / 10).toFixed(1)} mL`, px + pw / 2, pTop - 14);

      const tx = 230, tw = 18;
      const tTop = 50, tBot = 300;
      const tH = tBot - tTop;
      const tNorm = (T - 200) / 300;
      const fillH = tH * tNorm;
      const tColor = T < 273 ? '#06b6d4' : T < 350 ? '#f59e0b' : '#f43f5e';

      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      ctx.fillRect(tx, tTop, tw, tH);
      ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 2;
      ctx.strokeRect(tx, tTop, tw, tH);
      ctx.fillStyle = tColor + '70';
      ctx.fillRect(tx + 2, tBot - fillH, tw - 4, fillH);

      ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '10px Poppins'; ctx.textAlign = 'left';
      ctx.fillText(`${T} K`, tx + tw + 6, tBot - fillH + 4);
      ctx.fillText(`${(T - 273).toFixed(0)}°C`, tx + tw + 6, tBot - fillH + 18);

      for (let tk = 200; tk <= 500; tk += 50) {
        const ty = tBot - tH * ((tk - 200) / 300);
        ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(tx + 5, ty); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.font = '9px Poppins'; ctx.textAlign = 'right';
        ctx.fillText(`${tk}`, tx - 4, ty + 3);
      }

      const gx = 300, gw = 270, gTop = 30, gBot = 300;
      const gH = gBot - gTop;
      const gRight = gx + gw;

      ctx.fillStyle = 'rgba(255,255,255,0.02)';
      ctx.fillRect(gx, gTop, gw, gH);

      ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(gx, gBot); ctx.lineTo(gRight, gBot); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(gx, gBot); ctx.lineTo(gx, gTop); ctx.stroke();

      ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '11px Poppins'; ctx.textAlign = 'center';
      ctx.fillText('Temperature (K)', gx + gw / 2, gBot + 35);
      ctx.save(); ctx.translate(gx - 42, gTop + gH / 2); ctx.rotate(-Math.PI / 2);
      ctx.fillText('Volume (mL)', 0, 0); ctx.restore();

      const tRange = 550;
      const vRange = 55;

      ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = 1;
      for (let tk = 0; tk <= 500; tk += 100) {
        const gx2 = gx + gw * (tk / tRange);
        ctx.beginPath(); ctx.moveTo(gx2, gTop); ctx.lineTo(gx2, gBot); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.font = '9px Poppins'; ctx.textAlign = 'center';
        ctx.fillText(String(tk), gx2, gBot + 14);
      }
      for (let vk = 0; vk <= 50; vk += 10) {
        const gy = gBot - gH * (vk / vRange);
        ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gRight, gy); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.font = '9px Poppins'; ctx.textAlign = 'right';
        ctx.fillText(String(vk), gx - 6, gy + 3);
      }

      ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(gx, gBot);
      ctx.lineTo(gx + gw * (500 / tRange), gBot - gH * (50 / vRange));
      ctx.stroke();

      const curV = T / 10;
      const ptX = gx + gw * (T / tRange);
      const ptY = gBot - gH * (curV / vRange);

      const grd = ctx.createRadialGradient(ptX, ptY, 0, ptX, ptY, 15);
      grd.addColorStop(0, 'rgba(245,158,11,0.5)');
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.beginPath(); ctx.arc(ptX, ptY, 15, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = '#f59e0b';
      ctx.beginPath(); ctx.arc(ptX, ptY, 6, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(ptX, ptY, 6, 0, Math.PI * 2); ctx.stroke();

      ctx.fillStyle = '#f59e0b'; ctx.font = 'bold 11px Poppins'; ctx.textAlign = 'left';
      ctx.fillText(`(${T}K, ${curV.toFixed(1)}mL)`, ptX + 10, ptY - 8);

      ctx.fillStyle = 'rgba(6,182,212,0.6)'; ctx.font = 'bold 13px Poppins'; ctx.textAlign = 'center';
      ctx.fillText('V ∝ T', gx + gw * 0.65, gTop + 25);
      ctx.font = '10px Poppins'; ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.fillText('Straight line through origin', gx + gw * 0.65, gTop + 42);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">
          Temperature: {temp} K ({(temp - 273).toFixed(0)}°C)
        </label>
        <input type="range" min="200" max="500" value={temp} onChange={e => setTemp(Number(e.target.value))} className="w-full accent-brand-cyan" />
      </div>
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 overflow-hidden mb-4">
        <canvas ref={canvasRef} width={600} height={350} className="w-full" style={{ maxWidth: 600, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="grid sm:grid-cols-4 gap-3 mb-4">
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">Temperature</p>
          <p className="text-xl font-space font-bold text-brand-cyan">{temp} K</p>
        </div>
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">Temperature</p>
          <p className="text-xl font-space font-bold text-brand-amber">{(temp - 273).toFixed(0)}°C</p>
        </div>
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">Volume</p>
          <p className="text-xl font-space font-bold text-brand-pink">{volume.toFixed(1)} mL</p>
        </div>
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">V/T Ratio</p>
          <p className="text-xl font-space font-bold text-brand-lime">{vtRatio.toFixed(2)}</p>
        </div>
      </div>
      <div className="formula-box rounded-xl p-4 text-center">
        <p className="text-gray-400 text-xs uppercase mb-1">Charles's Law</p>
        <p className="text-sm font-space text-gray-300">V₁/T₁ = V₂/T₂ = constant (at fixed pressure)</p>
      </div>
    </div>
  );
}
