import { useState, useRef, useEffect } from 'react';

export default function MomentArmSim() {
  const [f1, setF1] = useState(50);
  const [d1, setD1] = useState(2);
  const [angle1, setAngle1] = useState(90);
  const [f2, setF2] = useState(30);
  const [d2, setD2] = useState(1.5);
  const [angle2, setAngle2] = useState(90);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const momentArm1 = d1 * Math.sin((angle1 * Math.PI) / 180);
  const torque1 = f1 * momentArm1;
  const momentArm2 = d2 * Math.sin((angle2 * Math.PI) / 180);
  const torque2 = f2 * momentArm2;
  const netTorque = torque1 - torque2;
  const beamAngle = Math.max(-20, Math.min(20, netTorque * 0.3));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2, cy = h / 2;
    const scale = 60;

    ctx.fillStyle = 'rgba(124,58,237,0.5)';
    ctx.beginPath();
    ctx.moveTo(cx, cy + 15);
    ctx.lineTo(cx - 18, cy + 55);
    ctx.lineTo(cx + 18, cy + 55);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#a78bfa';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.save();
    ctx.translate(cx, cy + 15);
    ctx.rotate((beamAngle * Math.PI) / 180);

    ctx.fillStyle = 'rgba(124,58,237,0.3)';
    ctx.fillRect(-200, -6, 400, 12);
    ctx.strokeStyle = '#a78bfa';
    ctx.lineWidth = 2;
    ctx.strokeRect(-200, -6, 400, 12);

    for (let i = -3; i <= 3; i++) {
      const tx = i * scale;
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(tx, -8);
      ctx.lineTo(tx, 8);
      ctx.stroke();
      ctx.fillStyle = '#9ca3af';
      ctx.font = '9px Poppins';
      ctx.textAlign = 'center';
      ctx.fillText(`${Math.abs(i)}m`, tx, 20);
    }

    const px1 = -d1 * scale;
    const fScale1 = 0.6;
    const fAngle1Rad = (-angle1 * Math.PI) / 180;
    const fEx1 = px1 + Math.cos(fAngle1Rad) * f1 * fScale1;
    const fEy1 = Math.sin(fAngle1Rad) * f1 * fScale1;
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(px1, 0);
    ctx.lineTo(fEx1, fEy1);
    ctx.stroke();
    ctx.fillStyle = '#06b6d4';
    ctx.beginPath();
    ctx.moveTo(fEx1, fEy1);
    const fa1 = Math.atan2(fEy1, fEx1 - px1);
    ctx.lineTo(fEx1 - 10 * Math.cos(fa1 - 0.4), fEy1 - 10 * Math.sin(fa1 - 0.4));
    ctx.lineTo(fEx1 - 10 * Math.cos(fa1 + 0.4), fEy1 - 10 * Math.sin(fa1 + 0.4));
    ctx.closePath();
    ctx.fill();

    const maY1 = -25;
    ctx.strokeStyle = 'rgba(6,182,212,0.5)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(0, maY1);
    ctx.lineTo(px1, maY1);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#06b6d4';
    ctx.font = 'bold 10px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText(`MA = ${momentArm1.toFixed(2)}m`, px1 / 2, maY1 - 6);

    const px2 = d2 * scale;
    const fScale2 = 0.6;
    const fAngle2Rad = (-angle2 * Math.PI) / 180;
    const fEx2 = px2 + Math.cos(fAngle2Rad) * f2 * fScale2;
    const fEy2 = Math.sin(fAngle2Rad) * f2 * fScale2;
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(px2, 0);
    ctx.lineTo(fEx2, fEy2);
    ctx.stroke();
    ctx.fillStyle = '#ec4899';
    ctx.beginPath();
    ctx.moveTo(fEx2, fEy2);
    const fa2 = Math.atan2(fEy2, fEx2 - px2);
    ctx.lineTo(fEx2 - 10 * Math.cos(fa2 - 0.4), fEy2 - 10 * Math.sin(fa2 - 0.4));
    ctx.lineTo(fEx2 - 10 * Math.cos(fa2 + 0.4), fEy2 - 10 * Math.sin(fa2 + 0.4));
    ctx.closePath();
    ctx.fill();

    const maY2 = 35;
    ctx.strokeStyle = 'rgba(236,72,153,0.5)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(0, maY2);
    ctx.lineTo(px2, maY2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#ec4899';
    ctx.font = 'bold 10px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText(`MA = ${momentArm2.toFixed(2)}m`, px2 / 2, maY2 + 14);

    ctx.restore();

    ctx.fillStyle = '#06b6d4';
    ctx.font = 'bold 11px Poppins';
    ctx.textAlign = 'left';
    ctx.fillText(`τ₁ = ${torque1.toFixed(1)} Nm (CCW)`, 10, 25);
    ctx.fillStyle = '#ec4899';
    ctx.fillText(`τ₂ = ${torque2.toFixed(1)} Nm (CW)`, 10, 42);
    ctx.fillStyle = '#f59e0b';
    ctx.fillText(`Net = ${netTorque.toFixed(1)} Nm`, 10, 59);
  }, [f1, d1, angle1, f2, d2, angle2, beamAngle, momentArm1, momentArm2, torque1, torque2, netTorque]);

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6 mb-4">
        <div className="glass-card rounded-xl p-4">
          <p className="text-brand-cyan font-bold text-sm mb-3">Force 1 (Left)</p>
          <div className="space-y-2">
            <div>
              <label className="text-gray-400 text-xs block mb-1">Force: {f1} N</label>
              <input type="range" min={10} max={100} value={f1} onChange={e => setF1(Number(e.target.value))} className="w-full accent-cyan-500" />
            </div>
            <div>
              <label className="text-gray-400 text-xs block mb-1">Distance: {d1} m</label>
              <input type="range" min={0.5} max={3} step={0.1} value={d1} onChange={e => setD1(Number(e.target.value))} className="w-full accent-cyan-500" />
            </div>
            <div>
              <label className="text-gray-400 text-xs block mb-1">Angle: {angle1}°</label>
              <input type="range" min={0} max={180} value={angle1} onChange={e => setAngle1(Number(e.target.value))} className="w-full accent-cyan-500" />
            </div>
          </div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <p className="text-brand-pink font-bold text-sm mb-3">Force 2 (Right)</p>
          <div className="space-y-2">
            <div>
              <label className="text-gray-400 text-xs block mb-1">Force: {f2} N</label>
              <input type="range" min={10} max={100} value={f2} onChange={e => setF2(Number(e.target.value))} className="w-full accent-pink-500" />
            </div>
            <div>
              <label className="text-gray-400 text-xs block mb-1">Distance: {d2} m</label>
              <input type="range" min={0.5} max={3} step={0.1} value={d2} onChange={e => setD2(Number(e.target.value))} className="w-full accent-pink-500" />
            </div>
            <div>
              <label className="text-gray-400 text-xs block mb-1">Angle: {angle2}°</label>
              <input type="range" min={0} max={180} value={angle2} onChange={e => setAngle2(Number(e.target.value))} className="w-full accent-pink-500" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={500} height={280} className="w-full" style={{ maxWidth: 500, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="formula-box rounded-xl p-3 text-center">
          <p className="text-gray-400 text-xs uppercase">MA₁</p>
          <p className="text-lg font-space font-bold text-brand-cyan">{momentArm1.toFixed(2)} m</p>
        </div>
        <div className="formula-box rounded-xl p-3 text-center">
          <p className="text-gray-400 text-xs uppercase">τ₁</p>
          <p className="text-lg font-space font-bold text-brand-cyan">{torque1.toFixed(1)} Nm</p>
        </div>
        <div className="formula-box rounded-xl p-3 text-center">
          <p className="text-gray-400 text-xs uppercase">MA₂</p>
          <p className="text-lg font-space font-bold text-brand-pink">{momentArm2.toFixed(2)} m</p>
        </div>
        <div className="formula-box rounded-xl p-3 text-center">
          <p className="text-gray-400 text-xs uppercase">τ₂</p>
          <p className="text-lg font-space font-bold text-brand-pink">{torque2.toFixed(1)} Nm</p>
        </div>
      </div>
    </div>
  );
}
