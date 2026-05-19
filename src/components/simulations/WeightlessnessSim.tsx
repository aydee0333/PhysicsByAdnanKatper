import { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { useT } from '../../i18n/LanguageContext';

export default function WeightlessnessSim() {
  const t = useT();
  const [falling, setFalling] = useState(false);
  const [progress, setProgress] = useState(0);
  const weight = 100;
  const scaleReading = falling ? weight * (1 - progress) : weight;

  useEffect(() => {
    if (!falling) return;
    setProgress(0);
    const interval = setInterval(() => { setProgress(p => { if (p >= 1) { clearInterval(interval); return 1; } return p + 0.02; }); }, 50);
    return () => clearInterval(interval);
  }, [falling]);

  return (
    <div>
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 relative overflow-hidden mb-4" style={{ height: 240 }}>
        <svg width="100%" height="100%" viewBox="0 0 400 240">
          <rect x="120" y={20 + progress * 100} width="160" height="180" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <circle cx="200" cy={70 + progress * 100} r="15" fill="#06b6d4" opacity="0.7" />
          <line x1="200" y1={85 + progress * 100} x2="200" y2={130 + progress * 100} stroke="#06b6d4" strokeWidth="3" opacity="0.7" />
          <line x1="180" y1={100 + progress * 100} x2="220" y2={100 + progress * 100} stroke="#06b6d4" strokeWidth="3" opacity="0.7" />
          <line x1="200" y1={130 + progress * 100} x2="185" y2={160 + progress * 100} stroke="#06b6d4" strokeWidth="3" opacity="0.7" />
          <line x1="200" y1={130 + progress * 100} x2="215" y2={160 + progress * 100} stroke="#06b6d4" strokeWidth="3" opacity="0.7" />
          <rect x="170" y={170 + progress * 100} width="60" height="10" fill="#7c3aed" opacity="0.5" />
          {falling && progress < 1 && <text x="320" y={100 + progress * 50} fill="#f43f5e" fontSize="14" fontWeight="bold">↓ Free Fall!</text>}
          <line x1="0" y1="220" x2="400" y2="220" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
        </svg>
      </div>
      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <div className="formula-box rounded-xl p-4 text-center"><p className="text-gray-400 text-xs uppercase mb-1">{t('unit6.scaleReading')}</p><p className="text-2xl font-space font-bold text-brand-cyan">{scaleReading.toFixed(1)} N</p></div>
        <div className={`rounded-xl p-4 text-center ${falling && progress > 0.5 ? 'bg-brand-rose/15 border border-brand-rose/30' : 'bg-brand-lime/15 border border-brand-lime/30'}`}>
          <p className="text-gray-400 text-xs uppercase mb-1">{t('unit6.status')}</p>
          <p className={`text-lg font-bold ${falling && progress > 0.5 ? 'text-brand-rose' : 'text-brand-lime'}`}>{falling && progress > 0.5 ? t('unit6.weightless') : t('unit6.normalWeight')}</p>
        </div>
      </div>
      <div className="flex gap-3 justify-center mb-4">
        <button onClick={() => setFalling(true)} disabled={falling} className="btn-primary px-6 py-2 rounded-xl text-white font-semibold text-sm disabled:opacity-50">{t('unit6.startFreeFall')}</button>
        <button onClick={() => { setFalling(false); setProgress(0); }} className="glass-card px-4 py-2 rounded-xl text-gray-400 text-sm hover:text-white flex items-center gap-2"><RotateCcw size={14} /> {t('unit6.reset')}</button>
      </div>
      <div className="glass-card rounded-xl p-4"><p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit6.whyAstronautsFloat') }} /></div>
    </div>
  );
}
