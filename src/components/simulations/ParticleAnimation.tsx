import { useState, useRef, useEffect } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function ParticleAnimation() {
  const t = useT();
  const [temp, setTemp] = useState(50);
  const [state, setState] = useState<'solid' | 'liquid' | 'gas'>('solid');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const count = 40;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * (w - 20) + 10,
        y: Math.random() * (h - 20) + 10,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        r: 4 + Math.random() * 3,
      });
    }
    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      const speed = state === 'solid' ? 0.3 : state === 'liquid' ? 1.5 : 4;
      particles.forEach(p => {
        p.x += p.vx * speed;
        p.y += p.vy * speed;
        if (p.x < p.r || p.x > w - p.r) p.vx *= -1;
        if (p.y < p.r || p.y > h - p.r) p.vy *= -1;
        p.x = Math.max(p.r, Math.min(w - p.r, p.x));
        p.y = Math.max(p.r, Math.min(h - p.r, p.y));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = state === 'solid' ? '#7c3aed' : state === 'liquid' ? '#06b6d4' : '#f59e0b';
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [state]);

  useEffect(() => {
    if (temp < 33) setState('solid');
    else if (temp < 66) setState('liquid');
    else setState('gas');
  }, [temp]);

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">{t('unit7.temperature').replace('{temp}', String(temp))}</label>
        <input type="range" min="0" max="100" value={temp} onChange={e => setTemp(Number(e.target.value))} className="w-full accent-brand-amber" />
      </div>
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 overflow-hidden mb-4" style={{ height: 200 }}>
        <canvas ref={canvasRef} width={400} height={200} className="w-full" />
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className={`rounded-xl p-3 text-center ${state === 'solid' ? 'bg-brand-purple/15 border border-brand-purple/30' : 'glass-card'}`}>
          <p className="text-brand-purple font-bold text-sm">{t('unit7.particles')}: {t('unit7.tightlyPacked')}</p>
          <p className="text-gray-400 text-xs">{t('unit7.motionLabel')}: {t('unit7.vibrateInPlace')}</p>
          <p className="text-gray-400 text-xs">{t('unit7.shapeLabel')}: {t('unit7.fixed')}</p>
        </div>
        <div className={`rounded-xl p-3 text-center ${state === 'liquid' ? 'bg-brand-cyan/15 border border-brand-cyan/30' : 'glass-card'}`}>
          <p className="text-brand-cyan font-bold text-sm">{t('unit7.particles')}: {t('unit7.looselyPacked')}</p>
          <p className="text-gray-400 text-xs">{t('unit7.motionLabel')}: {t('unit7.slidePast')}</p>
          <p className="text-gray-400 text-xs">{t('unit7.shapeLabel')}: {t('unit7.takesContainer')}</p>
        </div>
        <div className={`rounded-xl p-3 text-center ${state === 'gas' ? 'bg-brand-amber/15 border border-brand-amber/30' : 'glass-card'}`}>
          <p className="text-brand-amber font-bold text-sm">{t('unit7.particles')}: {t('unit7.farApart')}</p>
          <p className="text-gray-400 text-xs">{t('unit7.motionLabel')}: {t('unit7.moveRapidly')}</p>
          <p className="text-gray-400 text-xs">{t('unit7.shapeLabel')}: {t('unit7.fillsContainer')}</p>
        </div>
      </div>
    </div>
  );
}
