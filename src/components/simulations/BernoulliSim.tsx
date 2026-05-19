import { useState, useRef, useEffect } from 'react';

export default function BernoulliSim() {
  const [constriction, setConstriction] = useState(40);
  const [flowSpeed, setFlowSpeed] = useState(50);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<{ x: number; y: number; vx: number }[]>([]);

  useEffect(() => {
    particlesRef.current = Array.from({ length: 60 }, () => ({
      x: Math.random() * 500,
      y: 60 + Math.random() * 120,
      vx: 0,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;

    const draw = () => {
      animRef.current = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, w, h);

      const pipeY = h / 2;
      const pipeH = 140;
      const narrowW = 120;
      const narrowX = w / 2 - narrowW / 2;
      const narrowH = pipeH * (1 - constriction / 100);
      const speed = flowSpeed / 50;

      ctx.strokeStyle = 'rgba(6,182,212,0.4)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, pipeY - pipeH / 2);
      ctx.lineTo(narrowX, pipeY - pipeH / 2);
      ctx.quadraticCurveTo(narrowX + 20, pipeY - narrowH / 2, narrowX + 30, pipeY - narrowH / 2);
      ctx.lineTo(narrowX + narrowW - 30, pipeY - narrowH / 2);
      ctx.quadraticCurveTo(narrowX + narrowW - 20, pipeY - pipeH / 2, narrowX + narrowW, pipeY - pipeH / 2);
      ctx.lineTo(w, pipeY - pipeH / 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, pipeY + pipeH / 2);
      ctx.lineTo(narrowX, pipeY + pipeH / 2);
      ctx.quadraticCurveTo(narrowX + 20, pipeY + narrowH / 2, narrowX + 30, pipeY + narrowH / 2);
      ctx.lineTo(narrowX + narrowW - 30, pipeY + narrowH / 2);
      ctx.quadraticCurveTo(narrowX + narrowW - 20, pipeY + pipeH / 2, narrowX + narrowW, pipeY + pipeH / 2);
      ctx.lineTo(w, pipeY + pipeH / 2); ctx.stroke();

      const particles = particlesRef.current;
      particles.forEach(p => {
        let localH = pipeH;
        if (p.x > narrowX && p.x < narrowX + narrowW) {
          localH = narrowH;
        }
        const speedMult = pipeH / localH * speed;
        p.x += speedMult * 2;
        if (p.x > w + 10) { p.x = -10; p.y = pipeY + (Math.random() - 0.5) * pipeH * 0.8; }

        const halfH = localH / 2;
        if (p.y < pipeY - halfH + 5) p.y = pipeY - halfH + 5;
        if (p.y > pipeY + halfH - 5) p.y = pipeY + halfH - 5;

        const speedRatio = speedMult / (speed * pipeH / narrowH);
        const r = Math.floor(6 + speedRatio * 238);
        const g = Math.floor(182 - speedRatio * 119);
        const b = Math.floor(212 - speedRatio * 161);
        ctx.fillStyle = `rgba(${r},${g},${b},0.6)`;
        ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fill();
      });

      const wideP = 100;
      const narrowP = wideP * (narrowH / pipeH) ** 2;
      ctx.fillStyle = 'rgba(6,182,212,0.3)';
      ctx.fillRect(20, pipeY + pipeH / 2 + 15, 60, -wideP * 0.5);
      ctx.fillStyle = '#06b6d4'; ctx.font = '10px Poppins'; ctx.textAlign = 'center';
      ctx.fillText('P₁ HIGH', 50, pipeY + pipeH / 2 + 30);
      ctx.fillStyle = 'rgba(244,63,94,0.3)';
      ctx.fillRect(w / 2 - 30, pipeY + pipeH / 2 + 15, 60, -narrowP * 0.5);
      ctx.fillStyle = '#f43f5e'; ctx.fillText('P₂ LOW', w / 2, pipeY + pipeH / 2 + 30);

      ctx.fillStyle = '#94a3b8'; ctx.font = '11px Poppins'; ctx.textAlign = 'center';
      ctx.fillText('Wide Section', 80, pipeY - pipeH / 2 - 10);
      ctx.fillText('Narrow Section', w / 2, pipeY - narrowH / 2 - 10);

      ctx.strokeStyle = 'rgba(132,204,22,0.5)'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(50, pipeY); ctx.lineTo(90, pipeY); ctx.stroke();
      ctx.fillStyle = '#84cc16'; ctx.font = '10px Poppins'; ctx.fillText('v₁ (slow)', 70, pipeY - 8);
      ctx.beginPath(); ctx.moveTo(w / 2 - 20, pipeY); ctx.lineTo(w / 2 + 30, pipeY); ctx.stroke();
      ctx.fillText('v₂ (fast)', w / 2 + 5, pipeY - 8);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [constriction, flowSpeed]);

  const v1 = flowSpeed / 50;
  const areaRatio = 1 / (1 - constriction / 100);
  const v2 = v1 * areaRatio;
  const p1 = 100;
  const p2 = p1 - 0.5 * (v2 * v2 - v1 * v1) * 50;

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div><label className="text-gray-400 text-xs block mb-1">Constriction: {constriction}%</label><input type="range" min={10} max={80} step={5} value={constriction} onChange={e => setConstriction(Number(e.target.value))} className="w-full accent-brand-pink" /></div>
        <div><label className="text-gray-400 text-xs block mb-1">Flow Speed: {flowSpeed}%</label><input type="range" min={10} max={100} step={5} value={flowSpeed} onChange={e => setFlowSpeed(Number(e.target.value))} className="w-full accent-brand-cyan" /></div>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={500} height={240} className="w-full" style={{ maxWidth: 500, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="grid grid-cols-4 gap-3 mb-4">
        <div className="formula-box rounded-xl p-3 text-center"><p className="text-gray-400 text-xs uppercase">v₁</p><p className="text-lg font-space font-bold text-brand-cyan">{v1.toFixed(2)} m/s</p></div>
        <div className="formula-box rounded-xl p-3 text-center"><p className="text-gray-400 text-xs uppercase">v₂</p><p className="text-lg font-space font-bold text-brand-rose">{v2.toFixed(2)} m/s</p></div>
        <div className="formula-box rounded-xl p-3 text-center"><p className="text-gray-400 text-xs uppercase">P₁</p><p className="text-lg font-space font-bold text-brand-lime">{p1.toFixed(0)} Pa</p></div>
        <div className="formula-box rounded-xl p-3 text-center"><p className="text-gray-400 text-xs uppercase">P₂</p><p className="text-lg font-space font-bold text-brand-amber">{Math.max(0, p2).toFixed(0)} Pa</p></div>
      </div>
      <div className="formula-box rounded-xl p-4 text-center">
        <p className="text-lg font-space font-bold text-white">P₁ + ½ρv₁² = P₂ + ½ρv₂²</p>
        <p className="text-gray-400 text-sm mt-1">Bernoulli's Principle: Where speed is high, pressure is low</p>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {[{ label: 'Airplane Wing', desc: 'Faster air above = lower pressure = lift' }, { label: 'Perfume Spray', desc: 'Fast air over tube = low pressure draws liquid up' }, { label: 'Shower Curtain', desc: 'Fast moving air inside = low pressure pulls curtain in' }].map(e => (
          <div key={e.label} className="glass-card rounded-xl p-3"><p className="text-brand-cyan font-bold text-xs mb-1">{e.label}</p><p className="text-gray-400 text-xs">{e.desc}</p></div>
        ))}
      </div>
    </div>
  );
}
