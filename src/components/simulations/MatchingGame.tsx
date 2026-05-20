import { useState } from 'react';
import { Check, RotateCcw } from 'lucide-react';
import { useT } from '../../i18n/LanguageContext';

interface MatchingGameProps {
  gameType?: string;
}

const quantitiesList = [
  { id: 1, pairId: 1 }, { id: 2, pairId: 2 }, { id: 3, pairId: 3 }, { id: 4, pairId: 4 },
  { id: 5, pairId: 5 }, { id: 6, pairId: 6 }, { id: 7, pairId: 7 },
];

const unitsList = [
  { id: 10, pairId: 2 }, { id: 11, pairId: 1 }, { id: 12, pairId: 4 }, { id: 13, pairId: 3 },
  { id: 14, pairId: 7 }, { id: 15, pairId: 6 }, { id: 16, pairId: 5 },
];

const quantityKeys: Record<number, string> = {
  1: 'unit1.qty.mass', 2: 'unit1.qty.length', 3: 'unit1.qty.time', 4: 'unit1.qty.temp',
  5: 'unit1.qty.current', 6: 'unit1.qty.amount', 7: 'unit1.qty.intensity',
};

const unitKeys: Record<number, string> = {
  10: 'unit1.match.lengthUnit', 11: 'unit1.match.massUnit', 12: 'unit1.match.tempUnit',
  13: 'unit1.match.timeUnit', 14: 'unit1.match.intensityUnit', 15: 'unit1.match.amountUnit',
  16: 'unit1.match.currentUnit',
};

export default function MatchingGame({ gameType = 'quantity-unit' }: MatchingGameProps) {
  const t = useT();
  const [matchSelectedQ, setMatchSelectedQ] = useState<number | null>(null);
  const [matchSelectedU, setMatchSelectedU] = useState<number | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [matchResult, setMatchResult] = useState<{ correct: boolean; pairId: number } | null>(null);

  const handleQuantityClick = (qId: number, pairId: number) => {
    if (matchedPairs.includes(pairId)) return;
    setMatchSelectedQ(qId);
    setMatchResult(null);
    if (matchSelectedU !== null) {
      const unit = unitsList.find(u => u.id === matchSelectedU);
      const isCorrect = !!(unit && unit.pairId === pairId);
      setMatchResult({ correct: isCorrect, pairId });
      if (isCorrect) setMatchedPairs([...matchedPairs, pairId]);
      setTimeout(() => { setMatchSelectedQ(null); setMatchSelectedU(null); setMatchResult(null); }, 1200);
    }
  };

  const handleUnitClick = (uId: number, pairId: number) => {
    if (matchedPairs.includes(pairId)) return;
    setMatchSelectedU(uId);
    setMatchResult(null);
    if (matchSelectedQ !== null) {
      const qty = quantitiesList.find(q => q.id === matchSelectedQ);
      const isCorrect = !!(qty && qty.pairId === pairId);
      setMatchResult({ correct: isCorrect, pairId });
      if (isCorrect) setMatchedPairs([...matchedPairs, pairId]);
      setTimeout(() => { setMatchSelectedQ(null); setMatchSelectedU(null); setMatchResult(null); }, 1200);
    }
  };

  const resetGame = () => {
    setMatchedPairs([]);
    setMatchSelectedQ(null);
    setMatchSelectedU(null);
    setMatchResult(null);
  };

  if (gameType !== 'quantity-unit') {
    return <div className="text-gray-400">Unknown game type: {gameType}</div>;
  }

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">{t('unit1.matchingGame')}</h3>
      <p className="text-sm text-gray-400 mb-6">{t('unit1.matchingGameDesc')}</p>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="font-bold text-brand-cyan mb-3">{t('unit1.match.physicalQuantities')}</p>
          {quantitiesList.map(q => (
            <button
              key={q.id}
              onClick={() => handleQuantityClick(q.id, q.pairId)}
              disabled={matchedPairs.includes(q.pairId)}
              className={`w-full p-4 mb-2 rounded-xl text-start flex justify-between border-2 transition-all ${
                matchedPairs.includes(q.pairId)
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                  : matchResult?.pairId === q.pairId && !matchResult.correct
                    ? 'bg-red-500/20 border-red-500 text-red-400'
                    : matchSelectedQ === q.id
                      ? 'bg-brand-cyan/20 border-brand-cyan'
                      : 'glass-card border-white/10'
              }`}
            >
              {t(quantityKeys[q.id])}{matchedPairs.includes(q.pairId) && <Check size={18} />}
            </button>
          ))}
        </div>
        <div>
          <p className="font-bold text-brand-amber mb-3">{t('unit1.match.siUnitsShuffled')}</p>
          {unitsList.map(u => (
            <button
              key={u.id}
              onClick={() => handleUnitClick(u.id, u.pairId)}
              disabled={matchedPairs.includes(u.pairId)}
              className={`w-full p-4 mb-2 rounded-xl text-start flex justify-between border-2 transition-all ${
                matchedPairs.includes(u.pairId)
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                  : matchResult?.pairId === u.pairId && !matchResult.correct
                    ? 'bg-red-500/20 border-red-500 text-red-400'
                    : matchSelectedU === u.id
                      ? 'bg-brand-amber/20 border-brand-amber'
                      : 'glass-card border-white/10'
              }`}
            >
              {t(unitKeys[u.id])}{matchedPairs.includes(u.pairId) && <Check size={18} />}
            </button>
          ))}
        </div>
      </div>
      <button onClick={resetGame} className="mt-6 text-sm text-gray-400 hover:text-white flex items-center gap-2 mx-auto">
        <RotateCcw size={16} /> Reset Game
      </button>
    </div>
  );
}
