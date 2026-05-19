import { useState, useRef, useEffect } from 'react';

export default function HookeGraphPlotter() {
  const [force, setForce] = useState(50);
  const [k, setK] = useState(100);
  const [showElasticLimit, setShowElasticLimit] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const extension = force / k;
  const elasticLimit = 0.8;
  const isPlastic = extension > elasticLimit;
  const PE = 0.5 * k * extension * extension;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const graphX = 60, graphY = 20, graphW = w - 100, graphH = h - 80;
    const maxExt = 1.5, maxF = k * maxExt;

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 0.5;
    for (let i = 0; i <= 5; i++) {
      const x = graphX + (i / 5) * graphW;
      const y = graphY + graphH - (i / 5) * graphH;
      ctx.beginPath(); ctx.moveTo(x, graphY); ctx.lineTo(x, graphY + graphH); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(graphX, y); ctx.lineTo(graphX + graphW, y); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(graphX, graphY); ctx.lineTo(graphX, graphY + graphH); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(graphX, graphY + graphH); ctx.lineTo(graphX + graphW, graphY + graphH); ctx.stroke();

    // Labels
    ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '10px Poppins'; ctx.textAlign = 'center';
    ctx.fillText('Extension (m)', graphX + graphW / 2, h - 10);
    ctx.save(); ctx.translate(15, graphY + graphH / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillText('Force (N)', 0, 0); ctx.restore();

    // Elastic limit line
    if (showElasticLimit) {
      const elX = graphX + (elasticLimit / maxExt) * graphW;
      ctx.strokeStyle = 'rgba(244,63,94,0.4)'; ctx.lineWidth = 1; ctx.setLineDash([6, 4]);
      ctx.beginPath(); ctx.moveTo(elX, graphY); ctx.lineTo(elX, graphY + graphH); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#f43f5e'; ctx.font = '9px Poppins'; ctx.textAlign = 'center';
      ctx.fillText('Elastic', elX, graphY + 12);
      ctx.fillText('Limit', elX, graphY + 22);
    }

    // Hooke's Law line (F = kx)
    ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = 0; x <= maxExt; x += 0.01) {
      const px = graphX + (x / maxExt) * graphW;
      const py = graphY + graphH - ((k * x) / maxF) * graphH;
      if (x === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Elastic region fill
    ctx.fillStyle = 'rgba(6,182,212,0.1)';
    ctx.beginPath();
    ctx.moveTo(graphX, graphY + graphH);
    for (let x = 0; x <= Math.min(extension, elasticLimit); x += 0.01) {
      const px = graphX + (x / maxExt) * graphW;
      const py = graphY + graphH - ((k * x) / maxF) * graphH;
      ctx.lineTo(px, py);
    }
    ctx.lineTo(graphX + (Math.min(extension, elasticLimit) / maxExt) * graphW, graphY + graphH);
    ctx.closePath(); ctx.fill();

    // Current point
    const ptX = graphX + (extension / maxExt) * graphW;
    const ptY = graphY + graphH - (force / maxF) * graphH;
    ctx.fillStyle = isPlastic ? '#f43f5e' : '#06b6d4';
    ctx.beginPath(); ctx.arc(ptX, ptY, 6, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(ptX, ptY, 6, 0, Math.PI * 2); ctx.stroke();

    // Dashed lines to axes
    ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(ptX, ptY); ctx.lineTo(ptX, graphY + graphH); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ptX, ptY); ctx.lineTo(graphX, ptY); ctx.stroke();
    ctx.setLineDash([]);

    // Values on axes
    ctx.fillStyle = '#06b6d4'; ctx.font = 'bold 10px Poppins'; ctx.textAlign = 'center';
    ctx.fillText(`${extension.toFixed(2)}m`, ptX, graphY + graphH + 15);
    ctx.textAlign = 'right';
    ctx.fillText(`${force}N`, graphX - 5, ptY + 4);

    // Info
    ctx.fillStyle = 'rgba(0,0,0,0.4)'; ctx.fillRect(w - 180, 30, 170, 60);
    ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.strokeRect(w - 180, 30, 170, 60);
    ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 11px Poppins'; ctx.textAlign = 'left';
    ctx.fillText(`k = ${k} N/m`, w - 170, 48);
    ctx.fillStyle = '#94a3b8'; ctx.font = '10px Poppins';
    ctx.fillText(`PE = ½kx² = ${PE.toFixed(2)} J`, w - 170, 64);
    ctx.fillText(`F = kx = ${force}N`, w - 170, 80);
  }, [force, k, showElasticLimit]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-gray-400 text-sm block mb-2">Applied Force: {force} N</label>
          <input type="range" min={0} max={Math.round(k * 1.2)} value={force} onChange={e => setForce(Number(e.target.value))} className="w-full accent-brand-cyan" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">Spring Constant k: {k} N/m</label>
          <input type="range" min={20} max={300} value={k} onChange={e => setK(Number(e.target.value))} className="w-full accent-brand-purple" />
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setShowElasticLimit(!showElasticLimit)} className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${showElasticLimit ? 'bg-brand-rose/20 text-brand-rose border-brand-rose/30' : 'glass-card text-gray-400 border-white/10'}`}>
          {showElasticLimit ? 'Elastic Limit ON' : 'Elastic Limit OFF'}
        </button>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={500} height={300} className="w-full" style={{ maxWidth: 500, margin: '0 auto', display: 'block' }} />
      </div>
      {isPlastic && <p className="text-brand-rose text-sm text-center font-semibold">Past elastic limit — permanent deformation!</p>}
    </div>
  );
}
