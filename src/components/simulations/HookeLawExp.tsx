import { useState, useRef, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { useT } from '../../i18n/LanguageContext';

export default function HookeLawExp() {
  const t = useT();
  const [data, setData] = useState<{ force: number; ext: number }[]>([]);
  const k = 0.02;

  const addWeight = () => {
    const force = (data.length + 1) * 2;
    const ext = force * k + (Math.random() - 0.5) * 0.005;
    setData([...data, { force, ext: Math.max(0, ext) }]);
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height, pad = 40;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(pad, pad); ctx.lineTo(pad, h - pad); ctx.lineTo(w - pad, h - pad); ctx.stroke();
    ctx.fillStyle = '#9ca3af'; ctx.font = '12px Poppins'; ctx.textAlign = 'center';
    ctx.fillText(t('unit7.extensionM'), w / 2, h - 10);
    ctx.save(); ctx.translate(15, h / 2); ctx.rotate(-Math.PI / 2); ctx.fillText(t('unit7.forceN'), 0, 0); ctx.restore();
    if (data.length > 0) {
      const maxF = Math.max(...data.map(d => d.force));
      const maxE = Math.max(...data.map(d => d.ext));
      ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 2; ctx.beginPath();
      data.forEach((d, i) => {
        const px = pad + (d.ext / (maxE * 1.2)) * (w - pad * 2);
        const py = h - pad - (d.force / (maxF * 1.2)) * (h - pad * 2);
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      });
      ctx.stroke();
      data.forEach(d => {
        const px = pad + (d.ext / (maxE * 1.2)) * (w - pad * 2);
        const py = h - pad - (d.force / (maxF * 1.2)) * (h - pad * 2);
        ctx.fillStyle = '#f43f5e'; ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2); ctx.fill();
      });
    }
  }, [data]);

  return (
    <div>
      <div className="glass-card rounded-xl p-4 mb-4 space-y-2">
        <p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit7.apparatus') }} />
        <p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit7.procedure') }} />
        <p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit7.result') }} />
      </div>
      <div className="flex gap-3 justify-center mb-4">
        <button onClick={addWeight} className="btn-primary px-6 py-2 rounded-xl text-white font-semibold text-sm">{t('unit7.addWeight')}</button>
        <button onClick={() => setData([])} className="glass-card px-4 py-2 rounded-xl text-gray-400 text-sm hover:text-white flex items-center gap-2"><RotateCcw size={14} /> {t('unit7.reset')}</button>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={500} height={280} className="w-full" style={{ maxWidth: 500, margin: '0 auto', display: 'block' }} />
      </div>
      {data.length > 0 && (
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">{t('unit7.fOverX')}</p>
          <p className="text-xl font-space font-bold text-brand-cyan">{(data[data.length - 1].force / data[data.length - 1].ext).toFixed(0)} N/m</p>
        </div>
      )}
      {data.length >= 3 && <p className="text-brand-lime text-sm text-center mt-2">{t('unit7.straightLineResult')}</p>}
    </div>
  );
}
