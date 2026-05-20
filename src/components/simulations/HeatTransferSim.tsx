import { useState, useRef, useEffect } from 'react';

export default function HeatTransferSim() {
  const [temperature, setTemperature] = useState(80);
  const [playing, setPlaying] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    const panelW = (w - 40) / 3;

    const draw = () => {
      if (playing) tRef.current += 0.02;
      ctx.clearRect(0, 0, w, h);

      const panels: { x: number; title: string; subtitle: string; color: string }[] = [
        { x: 10, title: 'Conduction', subtitle: '(solid)', color: '244,63,94' },
        { x: 10 + panelW + 10, title: 'Convection', subtitle: '(fluid)', color: '245,158,11' },
        { x: 10 + 2 * (panelW + 10), title: 'Radiation', subtitle: '(no medium)', color: '132,204,22' },
      ];

      panels.forEach((panel, pi) => {
        const cx = panel.x + panelW / 2;
        const [r, g, b] = panel.color.split(',').map(Number);

        ctx.fillStyle = `rgba(${r},${g},${b},0.05)`;
        ctx.fillRect(panel.x, 0, panelW, h);
        ctx.strokeStyle = `rgba(${r},${g},${b},0.2)`;
        ctx.lineWidth = 1;
        ctx.strokeRect(panel.x, 0, panelW, h);

        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.font = 'bold 12px Poppins'; ctx.textAlign = 'center';
        ctx.fillText(panel.title, cx, 22);
        ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '10px Poppins';
        ctx.fillText(panel.subtitle, cx, 38);

        if (pi === 0) {
          const rodY = h / 2;
          const rodX = panel.x + 20;
          const rodW = panelW - 40;
          ctx.fillStyle = `rgba(${r},${g},${b},0.1)`;
          ctx.fillRect(rodX, rodY - 15, rodW, 30);

          for (let i = 0; i < 12; i++) {
            const px = rodX + 15 + i * ((rodW - 30) / 11);
            const amp = (temperature / 100) * 4;
            const phase = tRef.current * 3 + i * 0.5;
            const heatFactor = 1 - i / 11;
            const localAmp = amp * (0.3 + heatFactor * 0.7);
            const localPy = rodY + Math.sin(phase) * localAmp;

            ctx.fillStyle = `rgba(${r},${g},${b},${0.4 + heatFactor * 0.5})`;
            ctx.beginPath(); ctx.arc(px, localPy, 5, 0, Math.PI * 2); ctx.fill();

            if (i < 11) {
              const nextPx = rodX + 15 + (i + 1) * ((rodW - 30) / 11);
              ctx.strokeStyle = `rgba(${r},${g},${b},0.15)`; ctx.lineWidth = 1;
              ctx.beginPath(); ctx.moveTo(px, localPy); ctx.lineTo(nextPx, rodY + Math.sin(tRef.current * 3 + (i + 1) * 0.5) * localAmp * 0.8); ctx.stroke();
            }
          }

          ctx.fillStyle = '#f43f5e'; ctx.font = '9px Poppins'; ctx.textAlign = 'center';
          ctx.fillText('Hot', rodX + 15, rodY + 30);
          ctx.fillStyle = 'rgba(255,255,255,0.4)';
          ctx.fillText('Cold', rodX + rodW - 15, rodY + 30);
          ctx.fillText('Energy →', cx, rodY - 25);

        } else if (pi === 1) {
          const circX = cx, circY = h / 2;
          const radius = 50;

          ctx.strokeStyle = `rgba(${r},${g},${b},0.3)`; ctx.lineWidth = 2;
          ctx.strokeRect(panel.x + 15, circY - radius - 20, panelW - 30, radius * 2 + 40);

          ctx.fillStyle = 'rgba(244,63,94,0.15)';
          ctx.fillRect(panel.x + 16, circY + radius - 10, panelW - 32, 30);

          for (let i = 0; i < 16; i++) {
            const angle = tRef.current + (i / 16) * Math.PI * 2;
            const rx = radius * 0.7 * Math.cos(angle);
            const ry = radius * 0.7 * Math.sin(angle);
            const px = circX + rx;
            const py = circY + ry;

            const isHot = Math.sin(angle) > 0;
            ctx.fillStyle = isHot ? 'rgba(244,63,94,0.6)' : `rgba(${r},${g},${b},0.5)`;
            ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
          }

          ctx.strokeStyle = `rgba(${r},${g},${b},0.3)`; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.moveTo(circX, circY + radius * 0.5); ctx.lineTo(circX, circY - radius * 0.5); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(circX - radius * 0.5, circY - radius * 0.5); ctx.lineTo(circX - radius * 0.5, circY + radius * 0.5); ctx.stroke();

          ctx.fillStyle = `rgba(${r},${g},${b},0.5)`; ctx.font = '8px Poppins'; ctx.textAlign = 'center';
          ctx.fillText('↑ hot', circX, circY - radius * 0.6);
          ctx.fillText('↓ cool', circX - radius * 0.5, circY + radius * 0.7);
          ctx.fillText('🔥', circX, circY + radius + 15);

        } else {
          const leftX = panel.x + 30, rightX = panel.x + panelW - 30;
          const objY = h / 2;

          ctx.fillStyle = 'rgba(244,63,94,0.3)';
          ctx.fillRect(leftX - 10, objY - 25, 20, 50);
          ctx.strokeStyle = '#f43f5e'; ctx.lineWidth = 2;
          ctx.strokeRect(leftX - 10, objY - 25, 20, 50);
          ctx.fillStyle = '#f43f5e'; ctx.font = '8px Poppins'; ctx.textAlign = 'center';
          ctx.fillText('Hot', leftX, objY + 40);

          ctx.fillStyle = 'rgba(6,182,212,0.3)';
          ctx.fillRect(rightX - 10, objY - 25, 20, 50);
          ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 2;
          ctx.strokeRect(rightX - 10, objY - 25, 20, 50);
          ctx.fillStyle = '#06b6d4'; ctx.font = '8px Poppins';
          ctx.fillText('Cold', rightX, objY + 40);

          for (let w = 0; w < 5; w++) {
            const waveY = objY - 15 + w * 8;
            ctx.strokeStyle = `rgba(${r},${g},${b},${0.2 + (temperature / 100) * 0.4})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            for (let x = leftX + 15; x < rightX - 15; x += 2) {
              const t = (x - leftX - 15) / (rightX - leftX - 30);
              const amp = 5 * Math.sin(t * Math.PI);
              const yy = waveY + amp * Math.sin(x * 0.3 + tRef.current * 4 + w);
              if (x === leftX + 15) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
            }
            ctx.stroke();
          }

          ctx.fillStyle = `rgba(${r},${g},${b},0.5)`; ctx.font = '8px Poppins'; ctx.textAlign = 'center';
          ctx.fillText('IR Radiation', cx, objY - 35);
          ctx.fillText('No medium needed!', cx, objY + 55);
        }
      });
    };

    draw();
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [temperature, playing]);

  return (
    <div>
      <div className="flex gap-4 mb-4 items-center">
        <div className="flex-1">
          <label className="text-gray-400 text-sm block mb-2">Source Temperature: {temperature}°C</label>
          <input type="range" min={20} max={150} value={temperature} onChange={e => setTemperature(Number(e.target.value))} className="w-full accent-brand-amber" />
        </div>
        <button onClick={() => setPlaying(!playing)} className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${playing ? 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/30' : 'glass-card text-gray-400 border-white/10'}`}>
          {playing ? '⏸ Pause' : '▶ Play'}
        </button>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={500} height={240} className="w-full" style={{ maxWidth: 500, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="glass-card rounded-xl p-2"><p className="text-brand-rose text-xs font-bold">Needs medium</p><p className="text-gray-500 text-xs">Particle vibration</p></div>
        <div className="glass-card rounded-xl p-2"><p className="text-brand-amber text-xs font-bold">Needs medium</p><p className="text-gray-500 text-xs">Bulk fluid motion</p></div>
        <div className="glass-card rounded-xl p-2"><p className="text-brand-lime text-xs font-bold">No medium</p><p className="text-gray-500 text-xs">Electromagnetic waves</p></div>
      </div>
    </div>
  );
}
