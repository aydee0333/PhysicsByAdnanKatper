import { useState } from 'react';
import { Atom, Ruler, Check, RotateCcw } from 'lucide-react';
import { useT } from '../../i18n/LanguageContext';
import { QuizEngine } from '../quiz';

export default function Unit1Content() {
  const t = useT();
  const [matchSelectedQ, setMatchSelectedQ] = useState<number | null>(null);
  const [matchSelectedU, setMatchSelectedU] = useState<number | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [matchResult, setMatchResult] = useState<{ correct: boolean; pairId: number } | null>(null);

  // Matching Game Data
  const quantitiesList = [
    { id: 1, pairId: 1 }, { id: 2, pairId: 2 }, { id: 3, pairId: 3 }, { id: 4, pairId: 4 },
    { id: 5, pairId: 5 }, { id: 6, pairId: 6 }, { id: 7, pairId: 7 },
  ];
  const unitsList = [
    { id: 10, pairId: 2 }, { id: 11, pairId: 1 }, { id: 12, pairId: 4 }, { id: 13, pairId: 3 },
    { id: 14, pairId: 7 }, { id: 15, pairId: 6 }, { id: 16, pairId: 5 },
  ];
  const quantityKeys: Record<number, string> = { 1: 'unit1.qty.mass', 2: 'unit1.qty.length', 3: 'unit1.qty.time', 4: 'unit1.qty.temp', 5: 'unit1.qty.current', 6: 'unit1.qty.amount', 7: 'unit1.qty.intensity' };
  const unitKeys: Record<number, string> = { 10: 'unit1.match.lengthUnit', 11: 'unit1.match.massUnit', 12: 'unit1.match.tempUnit', 13: 'unit1.match.timeUnit', 14: 'unit1.match.intensityUnit', 15: 'unit1.match.amountUnit', 16: 'unit1.match.currentUnit' };

  const handleQuantityClick = (qId: number, pairId: number) => {
    if (matchedPairs.includes(pairId)) return;
    setMatchSelectedQ(qId); setMatchResult(null);
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
    setMatchSelectedU(uId); setMatchResult(null);
    if (matchSelectedQ !== null) {
      const qty = quantitiesList.find(q => q.id === matchSelectedQ);
      const isCorrect = !!(qty && qty.pairId === pairId);
      setMatchResult({ correct: isCorrect, pairId });
      if (isCorrect) setMatchedPairs([...matchedPairs, pairId]);
      setTimeout(() => { setMatchSelectedQ(null); setMatchSelectedU(null); setMatchResult(null); }, 1200);
    }
  };

  const resetGame = () => { setMatchedPairs([]); setMatchSelectedQ(null); setMatchSelectedU(null); setMatchResult(null); };

  return (
    <div className="space-y-12 text-gray-200">
      {/* 1. What is Physics */}
      <div className="unit-detail-reveal glass-card rounded-3xl p-8" style={{ opacity: 0, transform: 'translateY(60px)' }}>
        <div className="flex items-center gap-4 mb-6"><Atom size={32} className="text-brand-purple" /><h2 className="text-3xl font-black">{t('unit1.whatIsPhysics')}</h2></div>
        <p className="text-xl text-gray-300">{t('unit1.whatIsPhysicsDes')}</p>
      </div>

      {/* 2. Physical Quantities */}
      <div className="unit-detail-reveal glass-card rounded-3xl p-8" style={{ opacity: 0, transform: 'translateY(60px)' }}>
        <div className="flex items-center gap-4 mb-6"><Ruler size={32} className="text-brand-cyan" /><h2 className="text-3xl font-black">{t('unit1.physicalQuantities')}</h2></div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 rounded-2xl p-6">
            <h4 className="font-bold text-brand-cyan mb-4">{t('unit1.baseQuantitiesTitle')}</h4>
            <ul className="space-y-1.5 text-gray-300">{quantitiesList.map(q => <li key={q.id}>• {t(quantityKeys[q.id])}</li>)}</ul>
          </div>
          <div className="bg-white/5 rounded-2xl p-6">
            <h4 className="font-bold text-brand-pink mb-4">{t('unit1.derived.title')}</h4>
            <ul className="space-y-1.5 text-gray-300">
              <li>• {t('unit1.derived.speed')}</li><li>• {t('unit1.derived.area')}</li><li>• {t('unit1.derived.force')}</li><li>• {t('unit1.derived.density')}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. SI Units - Fully Translated Table */}
      <div className="unit-detail-reveal glass-card rounded-3xl p-8" style={{ opacity: 0, transform: 'translateY(60px)' }}>
        <h2 className="text-3xl font-black mb-6">{t('unit1.siUnits')}</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-white/10 text-brand-cyan">
              <th className="py-3 text-start">{t('unit1.table.quantity')}</th><th className="py-3 text-start">{t('unit1.table.unit')}</th><th className="py-3 text-start">{t('unit1.table.symbol')}</th>
            </tr></thead>
            <tbody>
              {[
                { q: 'unit1.qty.length', u: 'unit1.match.lengthUnit', s: 'm' },
                { q: 'unit1.qty.mass', u: 'unit1.match.massUnit', s: 'kg' },
                { q: 'unit1.qty.time', u: 'unit1.match.timeUnit', s: 's' },
                { q: 'unit1.qty.current', u: 'unit1.match.currentUnit', s: 'A' },
                { q: 'unit1.qty.temp', u: 'unit1.match.tempUnit', s: 'K' },
                { q: 'unit1.qty.amount', u: 'unit1.match.amountUnit', s: 'mol' },
                { q: 'unit1.qty.intensity', u: 'unit1.match.intensityUnit', s: 'cd' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="py-3">{t(row.q)}</td><td>{t(row.u)}</td><td className="font-mono text-brand-cyan">{row.s}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Prefixes */}
      <div className="unit-detail-reveal glass-card rounded-3xl p-8" style={{ opacity: 0, transform: 'translateY(60px)' }}>
        <h2 className="text-3xl font-black mb-6">{t('unit1.prefixes')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[["kilo","k","10³"],["mega","M","10⁶"],["milli","m","10⁻³"],["micro","μ","10⁻⁶"],["nano","n","10⁻⁹"],["centi","c","10⁻²"]].map((p,i)=>(
            <div key={i} className="bg-white/5 p-4 rounded-xl flex justify-between"><span>{p[0]} ({p[1]})</span><span className="text-brand-amber">{p[2]}</span></div>
          ))}
        </div>
      </div>

      {/* 5. Scientific Notation */}
      <div className="unit-detail-reveal glass-card rounded-3xl p-8" style={{ opacity: 0, transform: 'translateY(60px)' }}>
        <h2 className="text-3xl font-black mb-6">{t('unit1.scientificNotation')}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/5 p-5 rounded-xl">Speed of Light: <span className="text-brand-cyan font-bold">3 × 10⁸ m/s</span></div>
          <div className="bg-white/5 p-5 rounded-xl">Mass of Electron: <span className="text-brand-cyan font-bold">9.1 × 10⁻³¹ kg</span></div>
        </div>
      </div>

      {/* 6. Measuring Instruments - Translated Descriptions */}
      <div className="unit-detail-reveal glass-card rounded-3xl p-8" style={{ opacity: 0, transform: 'translateY(60px)' }}>
        <h2 className="text-3xl font-black mb-6">{t('unit1.measuringInstruments')}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: '📏 Metre Rule', lc: '1 mm (0.1 cm)', desc: t('unit1.instruments.metreRuleDesc') },
            { title: '🔧 Vernier Calipers', lc: '0.1 mm (0.01 cm)', desc: t('unit1.instruments.vernierDesc') },
            { title: '⚙️ Screw Gauge', lc: '0.01 mm', desc: t('unit1.instruments.screwGaugeDesc') },
            { title: '⚖️ Physical Balance', lc: '0.1 g', desc: t('unit1.instruments.balanceDesc') },
          ].map((inst, i) => (
            <div key={i} className="bg-white/5 p-6 rounded-2xl">
              <h4 className="font-bold text-xl mb-3">{inst.title}</h4>
              <p className="text-sm text-gray-400 mb-3">Least Count: <strong className="text-brand-cyan">{inst.lc}</strong></p>
              <p className="text-gray-300 text-sm">{inst.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Errors & Significant Figures */}
      <div className="unit-detail-reveal glass-card rounded-3xl p-8" style={{ opacity: 0, transform: 'translateY(60px)' }}>
        <h2 className="text-3xl font-black mb-6">{t('unit1.errors')}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-brand-rose mb-3">{t('unit1.errors.typesTitle')}</h4>
            <ul className="space-y-2 text-gray-300 text-sm"><li>• {t('unit1.errors.systematic')}</li><li>• {t('unit1.errors.random')}</li></ul>
          </div>
          <div>
            <h4 className="font-bold text-brand-cyan mb-3">{t('unit1.sigFigs.title')}</h4>
            <ul className="space-y-1.5 text-sm text-gray-300"><li>{t('unit1.sigFigs.rule1')}</li><li>{t('unit1.sigFigs.rule2')}</li><li>{t('unit1.sigFigs.rule3')}</li><li>{t('unit1.sigFigs.rule4')}</li></ul>
          </div>
        </div>
      </div>

      {/* MATCHING GAME */}
      <div className="unit-detail-reveal glass-card rounded-3xl p-8" style={{ opacity: 0, transform: 'translateY(60px)' }}>
        <h3 className="text-2xl font-bold mb-4">{t('unit1.matchingGame')}</h3>
        <p className="text-sm text-gray-400 mb-6">{t('unit1.matchingGameDesc')}</p>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="font-bold text-brand-cyan mb-3">{t('unit1.match.physicalQuantities')}</p>
            {quantitiesList.map(q => (
              <button key={q.id} onClick={() => handleQuantityClick(q.id, q.pairId)} disabled={matchedPairs.includes(q.pairId)} className={`w-full p-4 mb-2 rounded-xl text-start flex justify-between border-2 transition-all ${matchedPairs.includes(q.pairId) ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : matchResult?.pairId === q.pairId && !matchResult.correct ? 'bg-red-500/20 border-red-500 text-red-400' : matchSelectedQ === q.id ? 'bg-brand-cyan/20 border-brand-cyan' : 'glass-card border-white/10'}`}>
                {t(quantityKeys[q.id])}{matchedPairs.includes(q.pairId) && <Check size={18} />}
              </button>
            ))}
          </div>
          <div>
            <p className="font-bold text-brand-amber mb-3">{t('unit1.match.siUnitsShuffled')}</p>
            {unitsList.map(u => (
              <button key={u.id} onClick={() => handleUnitClick(u.id, u.pairId)} disabled={matchedPairs.includes(u.pairId)} className={`w-full p-4 mb-2 rounded-xl text-start flex justify-between border-2 transition-all ${matchedPairs.includes(u.pairId) ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : matchResult?.pairId === u.pairId && !matchResult.correct ? 'bg-red-500/20 border-red-500 text-red-400' : matchSelectedU === u.id ? 'bg-brand-amber/20 border-brand-amber' : 'glass-card border-white/10'}`}>
                {t(unitKeys[u.id])}{matchedPairs.includes(u.pairId) && <Check size={18} />}
              </button>
            ))}
          </div>
        </div>
        <button onClick={resetGame} className="mt-6 text-sm text-gray-400 hover:text-white flex items-center gap-2 mx-auto"><RotateCcw size={16} /> Reset Game</button>
      </div>

      {/* Quiz Section */}
      <QuizEngine
        config={{
          unitId: 'class-ix-unit-1',
          quizKey: 'unit1-quiz',
          title: t('unit1.quizSection'),
          questions: [
            // MCQ Questions
            { id: 'mcq1', type: 'mcq', question: t('unit1.quiz.q1'), options: [t('unit1.quiz.q1.opt1'), t('unit1.quiz.q1.opt2'), t('unit1.quiz.q1.opt3'), t('unit1.quiz.q1.opt4')], correctIndex: 1, explanation: t('unit1.quiz.q1.exp') },
            { id: 'mcq2', type: 'mcq', question: t('unit1.quiz.q2'), options: [t('unit1.quiz.q2.opt1'), t('unit1.quiz.q2.opt2'), t('unit1.quiz.q2.opt3'), t('unit1.quiz.q2.opt4')], correctIndex: 2, explanation: t('unit1.quiz.q2.exp') },
            { id: 'mcq3', type: 'mcq', question: t('unit1.quiz.q3'), options: [t('unit1.quiz.q3.opt1'), t('unit1.quiz.q3.opt2'), t('unit1.quiz.q3.opt3'), t('unit1.quiz.q3.opt4')], correctIndex: 1, explanation: t('unit1.quiz.q3.exp') },
            // True/False Questions
            { id: 'tf1', type: 'trueFalse', question: t('unit1.tf.q1'), correctAnswer: false, explanation: t('unit1.tf.q1.exp') },
            { id: 'tf2', type: 'trueFalse', question: t('unit1.tf.q2'), correctAnswer: true, explanation: t('unit1.tf.q2.exp') },
            // Numerical Questions
            { id: 'num1', type: 'numerical', question: t('unit1.num.q1'), correctAnswer: 2500, tolerance: 0, unit: 'mm', hint: t('unit1.num.q1.hint'), explanation: t('unit1.num.q1.exp') },
            { id: 'num2', type: 'numerical', question: t('unit1.num.q2'), correctAnswer: 0.5, tolerance: 0.01, unit: 'kg', hint: t('unit1.num.q2.hint'), explanation: t('unit1.num.q2.exp') },
            // Match Question
            { id: 'match1', type: 'match', question: t('unit1.match.q1.title'), pairs: [
              { left: t('unit1.match.q1.pair1.left'), right: t('unit1.match.q1.pair1.right') },
              { left: t('unit1.match.q1.pair2.left'), right: t('unit1.match.q1.pair2.right') },
              { left: t('unit1.match.q1.pair3.left'), right: t('unit1.match.q1.pair3.right') },
              { left: t('unit1.match.q1.pair4.left'), right: t('unit1.match.q1.pair4.right') },
              { left: t('unit1.match.q1.pair5.left'), right: t('unit1.match.q1.pair5.right') },
            ], explanation: t('unit1.match.q1.exp') },
            // Concept Test
            { id: 'concept1', type: 'conceptTest', question: t('unit1.concept.q1.title'), scenario: t('unit1.concept.q1.scenario'), subQuestions: [
              { id: 'c1s1', type: 'mcq', question: t('unit1.concept.q1.sub1'), options: [t('unit1.concept.q1.sub1.opt1'), t('unit1.concept.q1.sub1.opt2'), t('unit1.concept.q1.sub1.opt3'), t('unit1.concept.q1.sub1.opt4')], correctIndex: 1, explanation: t('unit1.concept.q1.sub1.exp') },
              { id: 'c1s2', type: 'mcq', question: t('unit1.concept.q1.sub2'), options: [t('unit1.concept.q1.sub2.opt1'), t('unit1.concept.q1.sub2.opt2'), t('unit1.concept.q1.sub2.opt3'), t('unit1.concept.q1.sub2.opt4')], correctIndex: 1, explanation: t('unit1.concept.q1.sub2.exp') },
              { id: 'c1s3', type: 'trueFalse', question: t('unit1.concept.q1.sub3'), correctAnswer: true, explanation: t('unit1.concept.q1.sub3.exp') },
            ], explanation: t('unit1.concept.q1.exp') },
          ],
          onComplete: () => {},
        }}
      />
    </div>
  );
}