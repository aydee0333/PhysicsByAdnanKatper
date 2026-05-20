import { useRef, useEffect, useState } from 'react';

export default function HeatingCurveSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [energy, setEnergy] = useState(0);

  const getTemperature = (e: number): number => {
    if (e <= 100) return -20 + e * 0.2;
    if (e <= 200) return 0;
    if (e <= 350) return (e - 200) * (100 / 150);
    if (e <= 400) return 100;
    return 100 + (e - 400) * 0.2;
  };

  const getPhase = (e: number): string => {
    if (e <= 100) return 'Ice';
    if (e <= 200) return 'Ice + Water (Melting)';
    if (e <= 350) return 'Water';
    if (e <= 400) return 'Water + Steam (Boiling)';
    return 'Steam';
  };

  const getPhaseColor = (e: number): string => {
    if (e <= 100) return '#06b6d4';
    if (e <= 200) return '#84cc16';
    if (e <= 350) return '#f59e0b';
    if (e <= 400) return '#ec4899';
    return '#f43f5e';
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const ml = 70, mr = 20, mt = 20, mb = 60;
    const pw = w - ml - mr, ph = h - mt - mb;
    const xMin = 0, xMax = 500, yMin = -20, yMax = 140;
    const xScale = pw / (xMax - xMin);
    const yScale = ph / (yMax - yMin);
    const toX = (e: number) => ml + (e - xMin) * xScale;
    const toY = (t: number) => mt + ph - (t - yMin) * yScale;

    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (let t = 0; t <= 120; t += 20) {
      ctx.beginPath(); ctx.moveTo(ml, toY(t)); ctx.lineTo(ml + pw, toY(t)); ctx.stroke();
    }
    for (let e = 0; e <= 500; e += 100) {
      ctx.beginPath(); ctx.moveTo(toX(e), mt); ctx.lineTo(toX(e), mt + ph); ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(ml, mt); ctx.lineTo(ml, mt + ph); ctx.lineTo(ml + pw, mt + ph); ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '12px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText('Heat Energy (kJ)', ml + pw / 2, h - 8);
    ctx.save();
    ctx.translate(16, mt + ph / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Temperature (°C)', 0, 0);
    ctx.restore();

    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '10px Poppins';
    ctx.textAlign = 'center';
    for (let e = 0; e <= 500; e += 100) ctx.fillText(String(e), toX(e), mt + ph + 16);
    ctx.textAlign = 'right';
    for (let t = -20; t <= 140; t += 20) ctx.fillText(`${t}°`, ml - 8, toY(t) + 4);

    ctx.fillStyle = 'rgba(132,204,22,0.06)';
    ctx.fillRect(toX(100), mt, toX(200) - toX(100), ph);
    ctx.fillStyle = 'rgba(236,72,153,0.06)';
    ctx.fillRect(toX(350), mt, toX(400) - toX(350), ph);

    const segments = [
      { s: 0, e: 100, c: '#06b6d4' },
      { s: 100, e: 200, c: '#84cc16' },
      { s: 200, e: 350, c: '#f59e0b' },
      { s: 350, e: 400, c: '#ec4899' },
      { s: 400, e: 500, c: '#f43f5e' },
    ];
    for (const seg of segments) {
      ctx.strokeStyle = seg.c;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(toX(seg.s), toY(getTemperature(seg.s)));
      ctx.lineTo(toX(seg.e), toY(getTemperature(seg.e)));
      ctx.stroke();
    }

    ctx.font = 'bold 11px Poppins';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#84cc16';
    ctx.fillText('Latent Heat of Fusion', toX(150), toY(0) - 22);
    ctx.font = '10px Poppins';
    ctx.fillStyle = 'rgba(132,204,22,0.7)';
    ctx.fillText('(L_f = 334 kJ/kg)', toX(150), toY(0) - 8);

    ctx.font = 'bold 11px Poppins';
    ctx.fillStyle = '#ec4899';
    ctx.fillText('Latent Heat of Vaporization', toX(375), toY(100) - 22);
    ctx.font = '10px Poppins';
    ctx.fillStyle = 'rgba(236,72,153,0.7)';
    ctx.fillText('(L_v = 2260 kJ/kg)', toX(375), toY(100) - 8);

    ctx.font = '10px Poppins';
    ctx.textAlign = 'center';
    const phaseLabels = [
      { x: 50, label: 'Ice', color: '#06b6d4' },
      { x: 150, label: 'Ice+Water', color: '#84cc16' },
      { x: 275, label: 'Water', color: '#f59e0b' },
      { x: 375, label: 'Water+Steam', color: '#ec4899' },
      { x: 450, label: 'Steam', color: '#f43f5e' },
    ];
    for (const pl of phaseLabels) {
      ctx.fillStyle = pl.color;
      ctx.fillText(pl.label, toX(pl.x), mt + ph + 36);
    }

    const curTemp = getTemperature(energy);
    const dotX = toX(energy);
    const dotY = toY(curTemp);
    const dotColor = getPhaseColor(energy);

    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(dotX, mt + ph); ctx.lineTo(dotX, dotY); ctx.lineTo(ml, dotY); ctx.stroke();
    ctx.setLineDash([]);

    const grad = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 20);
    grad.addColorStop(0, dotColor + '60');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(dotX, dotY, 20, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = dotColor;
    ctx.beginPath(); ctx.arc(dotX, dotY, 7, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(dotX, dotY, 7, 0, Math.PI * 2); ctx.stroke();

  }, [energy]);

  const curTemp = getTemperature(energy);
  const curPhase = getPhase(energy);
  const curColor = getPhaseColor(energy);

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">Heat Energy: {energy} kJ</label>
        <input type="range" min="0" max="500" value={energy} onChange={e => setEnergy(Number(e.target.value))} className="w-full accent-brand-amber" />
      </div>
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 overflow-hidden mb-4">
        <canvas ref={canvasRef} width={600} height={350} className="w-full" style={{ maxWidth: 600, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="grid sm:grid-cols-3 gap-3 mb-4">
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">Temperature</p>
          <p className="text-2xl font-space font-bold" style={{ color: curColor }}>{curTemp.toFixed(1)}°C</p>
        </div>
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">Current Phase</p>
          <p className="text-lg font-bold" style={{ color: curColor }}>{curPhase}</p>
        </div>
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">Energy Absorbed</p>
          <p className="text-2xl font-space font-bold text-brand-amber">{energy} kJ</p>
        </div>
      </div>
      <div className="formula-box rounded-xl p-4 text-center">
        <p className="text-sm font-space text-gray-300">During phase changes (melting/boiling), temperature remains constant while latent heat is absorbed to change state.</p>
      </div>
    </div>
  );
}
