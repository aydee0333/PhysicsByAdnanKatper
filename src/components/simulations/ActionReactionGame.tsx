import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { useT } from '../../i18n/LanguageContext';

export default function ActionReactionGame() {
  const t = useT();
  const [pairs, setPairs] = useState([
    { id: 1, actionKey: 'unit3.ar1Action', reactionKey: 'unit3.ar1Reaction', matched: false },
    { id: 2, actionKey: 'unit3.ar2Action', reactionKey: 'unit3.ar2Reaction', matched: false },
    { id: 3, actionKey: 'unit3.ar3Action', reactionKey: 'unit3.ar3Reaction', matched: false },
    { id: 4, actionKey: 'unit3.ar4Action', reactionKey: 'unit3.ar4Reaction', matched: false },
  ]);
  const [selectedAction, setSelectedAction] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const selectAction = (id: number) => { setSelectedAction(id); setMessage(''); };
  const selectReaction = (id: number) => {
    if (selectedAction === null) { setMessage(t('unit3.selectFirst')); return; }
    if (selectedAction === id) {
      setPairs(prev => prev.map(p => p.id === id ? { ...p, matched: true } : p));
      setMessage(t('unit3.correctPair')); setSelectedAction(null);
    } else { setMessage(t('unit3.wrongPair')); setSelectedAction(null); }
  };

  const reset = () => { setPairs(pairs.map(p => ({ ...p, matched: false }))); setSelectedAction(null); setMessage(''); };
  const allMatched = pairs.every(p => p.matched);

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-brand-cyan font-bold text-sm mb-3">{t('unit3.actions')}</p>
          <div className="space-y-2">
            {pairs.map(p => (
              <button key={`a-${p.id}`} onClick={() => !p.matched && selectAction(p.id)} disabled={p.matched}
                className={`w-full p-3 rounded-xl text-sm text-start transition-all ${p.matched ? 'bg-brand-lime/15 text-brand-lime border border-brand-lime/30' : selectedAction === p.id ? 'bg-brand-cyan/20 text-brand-cyan border-2 border-brand-cyan/60' : 'glass-card text-gray-300 hover:bg-white/5'}`}>
                {t(p.actionKey)} {p.matched && '✓'}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-brand-pink font-bold text-sm mb-3">{t('unit3.reactions')}</p>
          <div className="space-y-2">
            {pairs.map(p => (
              <button key={`r-${p.id}`} onClick={() => !p.matched && selectReaction(p.id)} disabled={p.matched}
                className={`w-full p-3 rounded-xl text-sm text-start transition-all ${p.matched ? 'bg-brand-lime/15 text-brand-lime border border-brand-lime/30' : 'glass-card text-gray-300 hover:bg-white/5'}`}>
                {t(p.reactionKey)} {p.matched && '✓'}
              </button>
            ))}
          </div>
        </div>
      </div>
      {message && <p className={`text-center font-bold ${message.includes('✅') ? 'text-brand-lime' : 'text-brand-rose'}`}>{message}</p>}
      {allMatched && <p className="text-brand-lime font-bold text-center text-xl mt-3">{t('unit3.allMatched')}</p>}
      <button onClick={reset} className="mt-3 mx-auto block text-xs text-gray-500 hover:text-white flex items-center gap-1">
        <RotateCcw size={12} /> {t('unit3.reset')}
      </button>
    </div>
  );
}
