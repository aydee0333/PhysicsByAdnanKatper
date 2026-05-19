import { useState, useRef, useEffect } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function StressStrainGraph() {
  const t = useT();
  const [appliedForce, setAppliedForce] = useState(0);
  const area = 0.001;
  const originalLength = 1;
  const youngsModulus = 2e11;

  const stress = appliedForce / area;
  const strain = stress / youngsModulus;
  const extension = strain * originalLength;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    const pad = 40;

    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(pad, pad); ctx.lineTo(pad, h - pad); ctx.lineTo(w - pad, h - pad); ctx.stroke();

    ctx.fillStyle = '#9ca3af';
    ctx.font = '12px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText('Strain', w / 2, h - 10);
    ctx.save();
    ctx.translate(15, h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Stress (Pa)', 0, 0);
    ctx.restore();

    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 3;
    ctx.beginPath();
    const maxStrain = 0.002;
    for (let sx = 0; sx <= w - pad * 2; sx++) {
      const strainVal = (sx / (w - pad * 2)) * maxStrain;
      const stressVal = youngsModulus * strainVal;
      const py = h - pad - (stressVal / (youngsModulus * maxStrain)) * (h - pad * 2);
      if (sx === 0) ctx.moveTo(pad + sx, py);
      else ctx.lineTo(pad + sx, py);
    }
    ctx.stroke();

    const curStrain = Math.min(strain, maxStrain);
    const curStress = youngsModulus * curStrain;
    const cx = pad + (curStrain / maxStrain) * (w - pad * 2);
    const cy = h - pad - (curStress / (youngsModulus * maxStrain)) * (h - pad * 2);
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();

  }, [appliedForce, strain, stress, youngsModulus]);

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">{t('unit5.appliedForce').replace('{force}', String(appliedForce))}</label>
        <input type="range" min="0" max="200000000" step="1000000" value={appliedForce} onChange={e => setAppliedForce(Number(e.target.value))} className="w-full accent-brand-cyan" />
      </div>

      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={500} height={280} className="w-full" style={{ maxWidth: 500, margin: '0 auto', display: 'block' }} />
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mb-4">
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">{t('unit5.stressLabel')}</p>
          <p className="text-xl font-space font-bold text-brand-cyan">{(stress / 1e6).toFixed(2)} MPa</p>
        </div>
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">{t('unit5.strainLabel')}</p>
          <p className="text-xl font-space font-bold text-brand-pink">{strain.toExponential(2)}</p>
        </div>
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">{t('unit5.extensionLabel')}</p>
          <p className="text-xl font-space font-bold text-brand-amber">{(extension * 1000).toFixed(3)} mm</p>
        </div>
      </div>

      <div className="formula-box rounded-2xl p-5">
        <p className="text-gray-400 text-xs uppercase mb-2">{t('unit5.youngsModulus')}</p>
        <p className="text-xl font-space font-bold text-white">{t('unit5.steelNote').replace('{value}', (youngsModulus / 1e9).toFixed(0))}</p>
      </div>
    </div>
  );
}
