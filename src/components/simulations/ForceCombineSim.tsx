import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { useT } from '../../i18n/LanguageContext';

export default function ForceCombineSim() {
  const t = useT();
  const [forceA, setForceA] = useState(10);
  const [forceB, setForceB] = useState(5);
  const [type, setType] = useState<'like' | 'unlike'>('like');

  const resultant = type === 'like' ? forceA + forceB : Math.abs(forceA - forceB);
  const direction = type === 'like' ? '→' : forceA > forceB ? '→' : '←';

  return (
    <div>
      <div className="flex gap-3 mb-4">
        <button onClick={() => setType('like')} className={`flex-1 py-2 rounded-xl text-sm font-semibold ${type === 'like' ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : 'glass-card text-gray-400'}`}>
          {t('unit4.likeBtn')}
        </button>
        <button onClick={() => setType('unlike')} className={`flex-1 py-2 rounded-xl text-sm font-semibold ${type === 'unlike' ? 'bg-brand-pink/20 text-brand-pink border border-brand-pink/30' : 'glass-card text-gray-400'}`}>
          {t('unit4.unlikeBtn')}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-gray-400 text-sm block mb-2">{t('unit4.forceA').replace('{force}', String(forceA))}</label>
          <input type="range" min="1" max="50" value={forceA} onChange={e => setForceA(Number(e.target.value))} className="w-full accent-brand-cyan" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">{t('unit4.forceB').replace('{force}', String(forceB))}</label>
          <input type="range" min="1" max="50" value={forceB} onChange={e => setForceB(Number(e.target.value))} className="w-full accent-brand-pink" />
        </div>
      </div>

      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 p-6 mb-4">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="text-center">
            <div className="text-brand-cyan text-2xl mb-1">→</div>
            <p className="text-brand-cyan font-bold">{forceA} N</p>
          </div>
          <div className="text-gray-500 text-xl">{type === 'like' ? '+' : '−'}</div>
          <div className="text-center">
            <div className={`text-2xl mb-1 ${type === 'like' ? 'text-brand-pink' : 'text-brand-rose'}`}>{type === 'like' ? '→' : '←'}</div>
            <p className={`font-bold ${type === 'like' ? 'text-brand-pink' : 'text-brand-rose'}`}>{forceB} N</p>
          </div>
        </div>
        <div className="h-px bg-white/10 mb-4" />
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-1">{t('unit4.resultantForce')}</p>
          <p className="text-3xl font-space font-bold text-brand-amber">{resultant} N {direction}</p>
          <p className="text-gray-500 text-xs mt-1">
            {type === 'like' ? t('unit4.addForces') : t('unit4.subForces')}
          </p>
        </div>
      </div>

      <button onClick={() => { setForceA(10); setForceB(5); setType('like'); }} className="mx-auto block text-xs text-gray-500 hover:text-white flex items-center gap-1">
        <RotateCcw size={12} /> {t('unit4.reset')}
      </button>
    </div>
  );
}
