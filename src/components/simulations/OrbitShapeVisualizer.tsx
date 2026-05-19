import { useState, useRef, useEffect } from 'react';

export default function OrbitShapeVisualizer() {
  const [launchSpeed, setLaunchSpeed] = useState(50);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const angleRef = useRef(0);

  const orbitalSpeed = 30;
  const escapeSpeed = 42;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;

    const cx = w / 2, cy = h / 2, earthR = 35;
    const launchAngle = -Math.PI / 4;

    const draw = () => {
      animRef.current = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, w, h);

      const earthGrad = ctx.createRadialGradient(cx - 8, cy - 8, 3, cx, cy, earthR);
      earthGrad.addColorStop(0, '#3b82f6'); earthGrad.addColorStop(1, '#1e3a5f');
      ctx.fillStyle = earthGrad; ctx.beginPath(); ctx.arc(cx, cy, earthR, 0, Math.PI * 2); ctx.fill();

      const mX = cx + earthR * Math.cos(launchAngle);
      const mY = cy + earthR * Math.sin(launchAngle);
      ctx.fillStyle = 'rgba(132,204,22,0.5)';
      ctx.beginPath(); ctx.moveTo(mX, mY); ctx.lineTo(mX - 10, mY + 15); ctx.lineTo(mX + 10, mY + 15); ctx.closePath(); ctx.fill();

      const speed = launchSpeed;
      const ratio = speed / orbitalSpeed;

      ctx.strokeStyle = 'rgba(245,158,11,0.6)'; ctx.lineWidth = 1.5;
      ctx.beginPath();

      if (ratio < 0.8) {
        for (let a = 0; a < Math.PI * 2; a += 0.02) {
          const r = 60 * (1 - 0.5 * Math.cos(a)) * ratio;
          const x = cx + Math.cos(a + launchAngle) * r;
          const y = cy + Math.sin(a + launchAngle) * r;
          a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          if (Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) < earthR) break;
        }
      } else if (ratio < 1.1) {
        const orbitR = 80;
        for (let a = 0; a < Math.PI * 2; a += 0.02) {
          const x = cx + Math.cos(a) * orbitR;
          const y = cy + Math.sin(a) * orbitR;
          a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
      } else if (ratio < escapeSpeed / orbitalSpeed) {
        const a = 80 * ratio * 0.7;
        const b = a * 0.6;
        for (let t = 0; t < Math.PI * 2; t += 0.02) {
          const x = cx + a * Math.cos(t) * Math.cos(0.3) - b * Math.sin(t) * Math.sin(0.3);
          const y = cy + a * Math.cos(t) * Math.sin(0.3) + b * Math.sin(t) * Math.cos(0.3);
          t === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
      } else {
        for (let t = -2; t < 2; t += 0.02) {
          const r = 60 / (1 + 0.5 * Math.cosh(t));
          const x = cx + r * Math.cosh(t) * 0.8;
          const y = cy + r * Math.sinh(t) * 0.5;
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      angleRef.current += 0.015;
      const a = angleRef.current;
      let objX = 0, objY = 0;

      if (ratio < 0.8) {
        const r = 60 * (1 - 0.5 * Math.cos(a)) * ratio;
        objX = cx + Math.cos(a + launchAngle) * r;
        objY = cy + Math.sin(a + launchAngle) * r;
      } else if (ratio < 1.1) {
        objX = cx + Math.cos(a) * 80;
        objY = cy + Math.sin(a) * 80;
      } else if (ratio < escapeSpeed / orbitalSpeed) {
        const ea = 80 * ratio * 0.7, eb = ea * 0.6;
        objX = cx + ea * Math.cos(a) * Math.cos(0.3) - eb * Math.sin(a) * Math.sin(0.3);
        objY = cy + ea * Math.cos(a) * Math.sin(0.3) + eb * Math.sin(a) * Math.cos(0.3);
      } else {
        const t = (a % 4) - 2;
        const r = 60 / (1 + 0.5 * Math.cosh(t));
        objX = cx + r * Math.cosh(t) * 0.8;
        objY = cy + r * Math.sinh(t) * 0.5;
      }

      ctx.fillStyle = '#f43f5e'; ctx.beginPath(); ctx.arc(objX, objY, 5, 0, Math.PI * 2); ctx.fill();

      let label = 'Sub-orbital';
      let color = '#f43f5e';
      if (ratio >= 1.1 && ratio < escapeSpeed / orbitalSpeed) { label = 'Elliptical Orbit'; color = '#f59e0b'; }
      else if (ratio >= 0.8 && ratio < 1.1) { label = 'Circular Orbit'; color = '#84cc16'; }
      else if (ratio >= escapeSpeed / orbitalSpeed) { label = 'Escape Trajectory'; color = '#ec4899'; }

      ctx.fillStyle = color; ctx.font = 'bold 14px Poppins'; ctx.textAlign = 'center';
      ctx.fillText(label, w / 2, 25);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [launchSpeed]);

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-xs block mb-1">Launch Speed: {launchSpeed} km/s</label>
        <input type="range" min={10} max={60} step={1} value={launchSpeed} onChange={e => setLaunchSpeed(Number(e.target.value))} className="w-full accent-brand-lime" />
      </div>
      <div className="flex gap-3 mb-4 text-xs">
        <span className="text-gray-500">Orbital: ~{orbitalSpeed} km/s</span>
        <span className="text-gray-500">Escape: ~{escapeSpeed} km/s</span>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={400} height={400} className="w-full" style={{ maxWidth: 400, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="glass-card rounded-xl p-4">
        <p className="text-gray-300 text-sm">Adjust launch speed to see different orbital shapes: sub-orbital, circular, elliptical, or escape trajectory.</p>
      </div>
    </div>
  );
}
