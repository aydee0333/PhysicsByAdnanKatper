import { useState, useEffect, useRef } from 'react';
import { RotateCcw } from 'lucide-react';
import { useT } from '../../i18n/LanguageContext';

export default function CoinCardExperiment() {
  const t = useT();
  const [phase, setPhase] = useState<'idle' | 'sliding' | 'dropping' | 'done'>('idle');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const slideRef = useRef(0);
  const coinYRef = useRef(0);
  const startRef = useRef(0);

  const draw = (phaseNow: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Glass outline
    ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 30, h - 40); ctx.lineTo(w / 2 - 30, h - 100);
    ctx.lineTo(w / 2 + 30, h - 100); ctx.lineTo(w / 2 + 30, h - 40);
    ctx.stroke();

    const centerX = w / 2;
    const cardX = centerX + slideRef.current;
    const cardY = h - 105;

    // Card
    ctx.fillStyle = phaseNow === 'idle' ? 'rgba(245,158,11,0.6)' : 'rgba(245,158,11,0.3)';
    ctx.fillRect(cardX - 50, cardY, 100, 8);

    // Coin: stays at original position during slide, falls during drop
    if (phaseNow === 'idle' || phaseNow === 'sliding') {
      ctx.fillStyle = '#f59e0b'; ctx.beginPath();
      ctx.arc(centerX, cardY - 5, 12, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 10px Poppins'; ctx.textAlign = 'center';
      ctx.fillText('₹', centerX, cardY - 1);
    } else {
      ctx.fillStyle = '#f59e0b'; ctx.beginPath();
      ctx.arc(centerX, coinYRef.current, 12, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 10px Poppins'; ctx.textAlign = 'center';
      ctx.fillText('₹', centerX, coinYRef.current + 4);
    }

    // Labels
    ctx.fillStyle = '#9ca3af'; ctx.font = '12px Poppins'; ctx.textAlign = 'center';
    ctx.fillText(t('unit3.glass'), centerX, h - 10);
    if (phaseNow === 'done') {
      ctx.fillStyle = '#84cc16'; ctx.font = 'bold 14px Poppins';
      ctx.fillText(t('unit3.coinDropped'), centerX, 30);
    }
  };

  useEffect(() => {
    if (phase === 'idle' || phase === 'done') {
      draw(phase);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const h = canvas.height;
    const cardY = h - 105;
    const targetY = h - 55;

    const animate = () => {
      const elapsed = (Date.now() - startRef.current) / 1000;

      if (phase === 'sliding') {
        slideRef.current = Math.min(elapsed / 0.12, 1) * 130;
        if (elapsed >= 0.12) {
          slideRef.current = 130;
          coinYRef.current = cardY - 5;
          setPhase('dropping');
          startRef.current = Date.now();
          return;
        }
      } else if (phase === 'dropping') {
        coinYRef.current = (cardY - 5) + (targetY - cardY + 5) * Math.min(elapsed / 0.15, 1);
        if (elapsed >= 0.15) {
          coinYRef.current = targetY;
          setPhase('done');
          return;
        }
      }

      draw(phase);
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [phase, t]);

  const pullCard = () => {
    slideRef.current = 0;
    startRef.current = Date.now();
    setPhase('sliding');
  };

  const reset = () => {
    cancelAnimationFrame(animRef.current);
    slideRef.current = 0;
    coinYRef.current = 0;
    setPhase('idle');
  };

  return (
    <div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={400} height={180} className="w-full" style={{ maxWidth: 400, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="flex gap-3 justify-center">
        <button onClick={pullCard} disabled={phase !== 'idle'} className="btn-primary px-6 py-2 rounded-xl text-white font-semibold text-sm disabled:opacity-50">
          {t('unit3.pullCard')}
        </button>
        <button onClick={reset} className="glass-card px-4 py-2 rounded-xl text-gray-400 text-sm hover:text-white flex items-center gap-2">
          <RotateCcw size={14} /> {t('unit3.reset')}
        </button>
      </div>
      <div className="mt-4 p-4 bg-white/5 rounded-xl">
        <p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit3.whyInertia') }} />
      </div>
    </div>
  );
}
