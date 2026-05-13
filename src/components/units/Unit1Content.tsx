import React, { useState } from 'react';
import { Atom, Ruler, Scale, Thermometer, Timer, FlaskConical, Eye, Check, X, RotateCcw } from 'lucide-react';

// Matching Game - Quantities (fixed order)
const quantitiesList = [
  { id: 1, text: 'Mass', pairId: 1 },
  { id: 2, text: 'Length', pairId: 2 },
  { id: 3, text: 'Time', pairId: 3 },
  { id: 4, text: 'Temperature', pairId: 4 },
  { id: 5, text: 'Electric Current', pairId: 5 },
  { id: 6, text: 'Amount of Substance', pairId: 6 },
  { id: 7, text: 'Luminous Intensity', pairId: 7 },
];

// SI Units - RANDOMIZED order (important!)
const unitsList = [
  { id: 10, text: 'metre (m)', pairId: 2 },
  { id: 11, text: 'kilogram (kg)', pairId: 1 },
  { id: 12, text: 'kelvin (K)', pairId: 4 },
  { id: 13, text: 'second (s)', pairId: 3 },
  { id: 14, text: 'candela (cd)', pairId: 7 },
  { id: 15, text: 'mole (mol)', pairId: 6 },
  { id: 16, text: 'ampere (A)', pairId: 5 },
];

const mcqs = [
  { q: "The SI unit of length is:", options: ["Centimetre", "Metre", "Kilometre", "Millimetre"], answer: 1 },
  { q: "How many base quantities are there in the SI system?", options: ["5", "6", "7", "10"], answer: 2 },
  { q: "The least count of a Vernier Calipers is:", options: ["0.01 mm", "0.1 mm", "1 mm", "0.001 mm"], answer: 1 },
  { q: "Which of the following is a derived quantity?", options: ["Mass", "Length", "Time", "Speed"], answer: 3 },
  { q: "The prefix 'kilo' represents:", options: ["10⁻³", "10²", "10³", "10⁶"], answer: 2 },
];

export default function Unit1Content() {
  const [openTopic, setOpenTopic] = useState<number | null>(null);
  const [matchSelectedQ, setMatchSelectedQ] = useState<number | null>(null);
  const [matchSelectedU, setMatchSelectedU] = useState<number | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [matchResult, setMatchResult] = useState<{ correct: boolean; pairId: number } | null>(null);
  const [currentMCQ, setCurrentMCQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  // Matching Game
  const handleQuantityClick = (qId: number, pairId: number) => {
    if (matchedPairs.includes(pairId)) return;
    setMatchSelectedQ(qId);
    setMatchResult(null);

    if (matchSelectedU !== null) {
      const unit = unitsList.find(u => u.id === matchSelectedU);
      const isCorrect = unit && unit.pairId === pairId;
      setMatchResult({ correct: isCorrect, pairId });
      if (isCorrect) setMatchedPairs([...matchedPairs, pairId]);
      setTimeout(() => {
        setMatchSelectedQ(null); setMatchSelectedU(null); setMatchResult(null);
      }, 1200);
    }
  };

  const handleUnitClick = (uId: number, pairId: number) => {
    if (matchedPairs.includes(pairId)) return;
    setMatchSelectedU(uId);
    setMatchResult(null);

    if (matchSelectedQ !== null) {
      const qty = quantitiesList.find(q => q.id === matchSelectedQ);
      const isCorrect = qty && qty.pairId === pairId;
      setMatchResult({ correct: isCorrect, pairId });
      if (isCorrect) setMatchedPairs([...matchedPairs, pairId]);
      setTimeout(() => {
        setMatchSelectedQ(null); setMatchSelectedU(null); setMatchResult(null);
      }, 1200);
    }
  };

  const resetGame = () => {
    setMatchedPairs([]); setMatchSelectedQ(null); setMatchSelectedU(null); setMatchResult(null);
  };

  // MCQ
  const handleMCQAnswer = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    setShowAnswer(true);
    if (optionIndex === mcqs[currentMCQ].answer) setScore(score + 1);
  };

  const nextMCQ = () => {
    if (currentMCQ < mcqs.length - 1) {
      setCurrentMCQ(currentMCQ + 1);
      setSelectedOption(null); setShowAnswer(false);
    }
  };

  const resetMCQ = () => {
    setCurrentMCQ(0); setSelectedOption(null); setShowAnswer(false); setScore(0);
  };

  return (
    <div className="space-y-12 text-gray-200">

      {/* 1. What is Physics */}
      <div className="glass-card rounded-3xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <Atom size={32} className="text-brand-purple" />
          <h2 className="text-3xl font-black">What is Physics?</h2>
        </div>
        <p className="text-xl text-gray-300">
          Physics is the branch of science that studies <span className="text-white font-semibold">matter, energy, and their interactions</span>.
        </p>
      </div>

      {/* 2. Physical Quantities */}
      <div className="glass-card rounded-3xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <Ruler size={32} className="text-brand-cyan" />
          <h2 className="text-3xl font-black">Physical Quantities</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 rounded-2xl p-6">
            <h4 className="font-bold text-brand-cyan mb-4">Base Quantities (7)</h4>
            <ul className="space-y-1.5 text-gray-300">
              <li>• Length</li><li>• Mass</li><li>• Time</li><li>• Electric Current</li>
              <li>• Temperature</li><li>• Amount of Substance</li><li>• Luminous Intensity</li>
            </ul>
          </div>
          <div className="bg-white/5 rounded-2xl p-6">
            <h4 className="font-bold text-brand-pink mb-4">Derived Quantities</h4>
            <ul className="space-y-1.5 text-gray-300">
              <li>• Speed = Distance ÷ Time</li>
              <li>• Area = Length × Length</li>
              <li>• Force = Mass × Acceleration</li>
              <li>• Density = Mass ÷ Volume</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. SI Units */}
      <div className="glass-card rounded-3xl p-8">
        <h2 className="text-3xl font-black mb-6">SI Base Units</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-white/10 text-brand-cyan">
              <th className="py-3 text-left">Quantity</th><th className="py-3 text-left">Unit</th><th className="py-3 text-left">Symbol</th>
            </tr></thead>
            <tbody>
              {[["Length","Metre","m"],["Mass","Kilogram","kg"],["Time","Second","s"],
                ["Current","Ampere","A"],["Temperature","Kelvin","K"],["Amount","Mole","mol"],
                ["Intensity","Candela","cd"]].map((r,i)=>(
                <tr key={i} className="border-b border-white/5"><td className="py-3">{r[0]}</td><td>{r[1]}</td><td className="font-mono text-brand-cyan">{r[2]}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Prefixes */}
      <div className="glass-card rounded-3xl p-8">
        <h2 className="text-3xl font-black mb-6">SI Prefixes</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[["kilo","k","10³"],["mega","M","10⁶"],["milli","m","10⁻³"],["micro","μ","10⁻⁶"],["nano","n","10⁻⁹"],["centi","c","10⁻²"]].map((p,i)=>(
            <div key={i} className="bg-white/5 p-4 rounded-xl flex justify-between"><span>{p[0]} ({p[1]})</span><span className="text-brand-amber">{p[2]}</span></div>
          ))}
        </div>
      </div>

      {/* 5. Scientific Notation */}
      <div className="glass-card rounded-3xl p-8">
        <h2 className="text-3xl font-black mb-6">Scientific Notation</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/5 p-5 rounded-xl">Speed of Light: <span className="text-brand-cyan font-bold">3 × 10⁸ m/s</span></div>
          <div className="bg-white/5 p-5 rounded-xl">Mass of Electron: <span className="text-brand-cyan font-bold">9.1 × 10⁻³¹ kg</span></div>
        </div>
      </div>

      {/* 6. Measuring Instruments - ENHANCED */}
      <div className="glass-card rounded-3xl p-8">
        <h2 className="text-3xl font-black mb-6">Measuring Instruments</h2>
        
        <div className="mb-8 p-6 bg-white/5 rounded-2xl">
          <h4 className="font-bold text-brand-lime mb-2">What is Least Count?</h4>
          <p className="text-gray-300">Least Count is the <strong>smallest value</strong> that an instrument can measure accurately. For example, a normal ruler has a least count of 1 mm.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Metre Rule */}
          <div className="bg-white/5 p-6 rounded-2xl">
            <h4 className="font-bold text-xl mb-3 flex items-center gap-2">📏 Metre Rule</h4>
            <p className="text-sm text-gray-400 mb-3">Least Count: <strong className="text-brand-cyan">1 mm (0.1 cm)</strong></p>
            <p className="text-gray-300 text-sm">Used to measure length up to 1 metre. Place the object along the scale and read from the zero mark.</p>
          </div>

          {/* Vernier Calipers */}
          <div className="bg-white/5 p-6 rounded-2xl">
            <h4 className="font-bold text-xl mb-3 flex items-center gap-2">🔧 Vernier Calipers</h4>
            <p className="text-sm text-gray-400 mb-3">Least Count: <strong className="text-brand-cyan">0.1 mm (0.01 cm)</strong></p>
            <p className="text-gray-300 text-sm mb-3">Used for measuring small lengths like thickness of coins or wires.</p>
            <div className="text-xs bg-brand-dark/50 p-3 rounded-lg">
              <strong>How to read:</strong><br />
              1. Read Main Scale Reading (MSR)<br />
              2. Find matching Vernier division<br />
              3. Total = MSR + (Vernier × 0.01 cm)
            </div>
          </div>

          {/* Screw Gauge */}
          <div className="bg-white/5 p-6 rounded-2xl">
            <h4 className="font-bold text-xl mb-3 flex items-center gap-2">⚙️ Screw Gauge (Micrometer)</h4>
            <p className="text-sm text-gray-400 mb-3">Least Count: <strong className="text-brand-cyan">0.01 mm</strong></p>
            <p className="text-gray-300 text-sm mb-3">Used to measure very small diameters (wire, sheet thickness).</p>
            <div className="text-xs bg-brand-dark/50 p-3 rounded-lg">
              <strong>How to read:</strong><br />
              1. Read Sleeve Scale (MSR)<br />
              2. Read Thimble Scale<br />
              3. Total = MSR + (Thimble × 0.01 mm)
            </div>
          </div>

          {/* Physical Balance */}
          <div className="bg-white/5 p-6 rounded-2xl">
            <h4 className="font-bold text-xl mb-3 flex items-center gap-2">⚖️ Physical Balance</h4>
            <p className="text-sm text-gray-400 mb-3">Least Count: <strong className="text-brand-cyan">0.1 g</strong></p>
            <p className="text-gray-300 text-sm">Used to measure mass of objects by comparison method using standard weights.</p>
          </div>
        </div>
      </div>

      {/* 7. Errors & Significant Figures */}
      <div className="glass-card rounded-3xl p-8">
        <h2 className="text-3xl font-black mb-6">Errors &amp; Significant Figures</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-brand-rose mb-3">Types of Errors</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• <strong>Systematic:</strong> Repeat in same direction (faulty instrument)</li>
              <li>• <strong>Random:</strong> Irregular (parallax error, human mistake)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-brand-cyan mb-3">Significant Figures Rules</h4>
            <ul className="space-y-1.5 text-sm text-gray-300">
              <li>1. All non-zero digits are significant</li>
              <li>2. Zeros between non-zero digits are significant</li>
              <li>3. Leading zeros are NOT significant</li>
              <li>4. Trailing zeros after decimal ARE significant</li>
            </ul>
          </div>
        </div>
      </div>

      {/* MATCHING GAME - Units Randomized */}
      <div className="glass-card rounded-3xl p-8">
        <h3 className="text-2xl font-bold mb-4">⚡ Match Quantity with Unit</h3>
        <p className="text-sm text-gray-400 mb-6">Units are shuffled. Match correctly!</p>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="font-bold text-brand-cyan mb-3">Physical Quantities</p>
            {quantitiesList.map(q => (
              <button key={q.id} onClick={() => handleQuantityClick(q.id, q.pairId)}
                disabled={matchedPairs.includes(q.pairId)}
                className={`w-full p-4 mb-2 rounded-xl text-left flex justify-between border-2 transition-all ${
                  matchedPairs.includes(q.pairId) ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' :
                  matchResult?.pairId === q.pairId && !matchResult.correct ? 'bg-red-500/20 border-red-500 text-red-400' :
                  matchSelectedQ === q.id ? 'bg-brand-cyan/20 border-brand-cyan' : 'glass-card border-white/10'
                }`}>
                {q.text}
                {matchedPairs.includes(q.pairId) && <Check size={18} />}
              </button>
            ))}
          </div>
          <div>
            <p className="font-bold text-brand-amber mb-3">SI Units (Shuffled)</p>
            {unitsList.map(u => (
              <button key={u.id} onClick={() => handleUnitClick(u.id, u.pairId)}
                disabled={matchedPairs.includes(u.pairId)}
                className={`w-full p-4 mb-2 rounded-xl text-left flex justify-between border-2 transition-all ${
                  matchedPairs.includes(u.pairId) ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' :
                  matchResult?.pairId === u.pairId && !matchResult.correct ? 'bg-red-500/20 border-red-500 text-red-400' :
                  matchSelectedU === u.id ? 'bg-brand-amber/20 border-brand-amber' : 'glass-card border-white/10'
                }`}>
                {u.text}
                {matchedPairs.includes(u.pairId) && <Check size={18} />}
              </button>
            ))}
          </div>
        </div>
        <button onClick={resetGame} className="mt-6 text-sm text-gray-400 hover:text-white flex items-center gap-2 mx-auto">
          <RotateCcw size={16} /> Reset Game
        </button>
      </div>

      {/* MCQ Quiz */}
      <div className="glass-card rounded-3xl p-8">
        <h2 className="text-3xl font-black mb-6">MCQ Quiz</h2>
        <div className="bg-white/5 p-8 rounded-2xl">
          <p className="font-bold mb-4">Q{currentMCQ + 1}. {mcqs[currentMCQ].q}</p>
          <div className="space-y-3">
            {mcqs[currentMCQ].options.map((opt, i) => (
              <button key={i} onClick={() => handleMCQAnswer(i)} disabled={showAnswer}
                className={`w-full p-4 text-left rounded-xl border transition-all ${
                  showAnswer && i === mcqs[currentMCQ].answer ? 'bg-emerald-500/20 border-emerald-500' :
                  showAnswer && i === selectedOption && i !== mcqs[currentMCQ].answer ? 'bg-red-500/20 border-red-500' :
                  'border-white/10 hover:bg-white/10'
                }`}>
                {opt}
              </button>
            ))}
          </div>
          {showAnswer && (
            <button onClick={nextMCQ} className="mt-6 px-6 py-2 bg-brand-cyan text-black font-bold rounded-xl">
              {currentMCQ < mcqs.length - 1 ? "Next Question" : "Finish Quiz"}
            </button>
          )}
          <div className="mt-4 text-sm text-gray-400">Score: {score} / {mcqs.length}</div>
        </div>
        <button onClick={resetMCQ} className="mt-4 text-xs text-gray-500 hover:text-white">Restart Quiz</button>
      </div>

    </div>
  );
}
