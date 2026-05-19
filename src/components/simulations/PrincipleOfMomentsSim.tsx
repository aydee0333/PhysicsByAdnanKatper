import { useState, useRef, useEffect } from 'react';

export default function PrincipleOfMomentsSim() {
  const [leftWeights, setLeftWeights] = useState<{ pos: number; mass: number }[]>([
    { pos: 1, mass: 10 },
    { pos: 2, mass: 5 },
  ]);
  const [rightWeights, setRightWeights] = useState<{ pos: number; mass: number }[]>([
    { pos: 1.5, mass: 8 },
  ]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const leftMoment = leftWeights.reduce((sum, w) => sum + w.mass * w.pos, 0);
  const rightMoment = rightWeights.reduce((sum, w) => sum + w.mass * w.pos, 0);
  const diff = leftMoment - rightMoment;
  const isBalanced = Math.abs(diff) < 0.3;
  const beamAngle = Math.max(-15, Math.min(15, diff * 0.4));

  const updateLeft = (idx: number, field: 'pos' | 'mass', val: number) => {
    setLeftWeights(prev => prev.map((w, i) => i === idx ? { ...w, [field]: val } : w));
  };
  const updateRight = (idx: number, field: 'pos' | 'mass', val: number) => {
    setRightWeights(prev => prev.map((w, i) => i === idx ? { ...w, [field]: val } : w));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2, cy = h / 2;
    const scale = 80;

    ctx.fillStyle = 'rgba(124,58,237,0.5)';
    ctx.beginPath();
    ctx.moveTo(cx, cy + 10);
    ctx.lineTo(cx - 15, cy + 50);
    ctx.lineTo(cx + 15, cy + 50);
    ctx.closePath();
    ctx.fill();

    ctx.save();
    ctx.translate(cx, cy + 10);
    ctx.rotate((beamAngle * Math.PI) / 180);

    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fillRect(-180, -5, 360, 10);
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(-180, -5, 360, 10);

    for (let d = -2; d <= 2; d += 0.5) {
      const x = d * scale;
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.beginPath();
      ctx.moveTo(x, -8);
      ctx.lineTo(x, 8);
      ctx.stroke();
      if (Number.isInteger(d)) {
        ctx.fillStyle = '#9ca3af';
        ctx.font = '9px Poppins';
        ctx.textAlign = 'center';
        ctx.fillText(`${Math.abs(d)}m`, x, 22);
      }
    }

    leftWeights.forEach(w => {
      const x = -w.pos * scale;
      ctx.fillStyle = 'rgba(6,182,212,0.7)';
      ctx.fillRect(x - 14, -30, 28, 25);
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x - 14, -30, 28, 25);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 10px Poppins';
      ctx.textAlign = 'center';
      ctx.fillText(`${w.mass}kg`, x, -14);
      ctx.strokeStyle = 'rgba(6,182,212,0.5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, -5);
      ctx.lineTo(x, -30);
      ctx.stroke();
    });

    rightWeights.forEach(w => {
      const x = w.pos * scale;
      ctx.fillStyle = 'rgba(236,72,153,0.7)';
      ctx.fillRect(x - 14, -30, 28, 25);
      ctx.strokeStyle = '#ec4899';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x - 14, -30, 28, 25);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 10px Poppins';
      ctx.textAlign = 'center';
      ctx.fillText(`${w.mass}kg`, x, -14);
      ctx.strokeStyle = 'rgba(236,72,153,0.5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, -5);
      ctx.lineTo(x, -30);
      ctx.stroke();
    });

    ctx.restore();

    ctx.font = 'bold 14px Poppins';
    ctx.textAlign = 'center';
    if (isBalanced) {
      ctx.fillStyle = '#84cc16';
      ctx.fillText('ΣCW = ΣCCW ✓  BALANCED!', cx, h - 15);
    } else {
      ctx.fillStyle = '#f43f5e';
      ctx.fillText(diff > 0 ? 'Left side heavier →' : '← Right side heavier', cx, h - 15);
    }
  }, [leftWeights, rightWeights, beamAngle, isBalanced, diff]);

  return (
    <div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={500} height={250} className="w-full" style={{ maxWidth: 500, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-brand-cyan font-bold text-sm">Left Side Weights</p>
            <div className="flex gap-1">
              <button onClick={() => leftWeights.length < 4 && setLeftWeights([...leftWeights, { pos: 1, mass: 5 }])} className="px-2 py-0.5 rounded text-xs bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">+ Add</button>
              <button onClick={() => leftWeights.length > 1 && setLeftWeights(leftWeights.slice(0, -1))} className="px-2 py-0.5 rounded text-xs bg-brand-rose/20 text-brand-rose border border-brand-rose/30">−</button>
            </div>
          </div>
          {leftWeights.map((w, i) => (
            <div key={i} className="mb-2 p-2 rounded-lg bg-white/5">
              <div className="flex gap-2 mb-1">
                <div className="flex-1">
                  <label className="text-gray-500 text-[10px]">Mass: {w.mass}kg</label>
                  <input type="range" min={1} max={20} value={w.mass} onChange={e => updateLeft(i, 'mass', Number(e.target.value))} className="w-full accent-cyan-500" />
                </div>
                <div className="flex-1">
                  <label className="text-gray-500 text-[10px]">Pos: {w.pos}m</label>
                  <input type="range" min={0.5} max={2} step={0.1} value={w.pos} onChange={e => updateLeft(i, 'pos', Number(e.target.value))} className="w-full accent-cyan-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-brand-pink font-bold text-sm">Right Side Weights</p>
            <div className="flex gap-1">
              <button onClick={() => rightWeights.length < 4 && setRightWeights([...rightWeights, { pos: 1, mass: 5 }])} className="px-2 py-0.5 rounded text-xs bg-brand-pink/20 text-brand-pink border border-brand-pink/30">+ Add</button>
              <button onClick={() => rightWeights.length > 1 && setRightWeights(rightWeights.slice(0, -1))} className="px-2 py-0.5 rounded text-xs bg-brand-rose/20 text-brand-rose border border-brand-rose/30">−</button>
            </div>
          </div>
          {rightWeights.map((w, i) => (
            <div key={i} className="mb-2 p-2 rounded-lg bg-white/5">
              <div className="flex gap-2 mb-1">
                <div className="flex-1">
                  <label className="text-gray-500 text-[10px]">Mass: {w.mass}kg</label>
                  <input type="range" min={1} max={20} value={w.mass} onChange={e => updateRight(i, 'mass', Number(e.target.value))} className="w-full accent-pink-500" />
                </div>
                <div className="flex-1">
                  <label className="text-gray-500 text-[10px]">Pos: {w.pos}m</label>
                  <input type="range" min={0.5} max={2} step={0.1} value={w.pos} onChange={e => updateRight(i, 'pos', Number(e.target.value))} className="w-full accent-pink-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="formula-box rounded-xl p-3 text-center">
          <p className="text-gray-400 text-xs uppercase">Σ CW</p>
          <p className="text-lg font-space font-bold text-brand-cyan">{leftMoment.toFixed(1)} Nm</p>
        </div>
        <div className="formula-box rounded-xl p-3 text-center">
          <p className="text-gray-400 text-xs uppercase">Σ CCW</p>
          <p className="text-lg font-space font-bold text-brand-pink">{rightMoment.toFixed(1)} Nm</p>
        </div>
        <div className={`rounded-xl p-3 text-center ${isBalanced ? 'bg-brand-lime/15 border border-brand-lime/30' : 'bg-brand-rose/15 border border-brand-rose/30'}`}>
          <p className="text-gray-400 text-xs uppercase">Status</p>
          <p className={`text-lg font-bold ${isBalanced ? 'text-brand-lime' : 'text-brand-rose'}`}>
            {isBalanced ? '✓ Balanced' : '✗ Unbalanced'}
          </p>
        </div>
      </div>
    </div>
  );
}
