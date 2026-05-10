import { useState } from 'react';
import {
  Atom, Flame, Volume2, Lightbulb, Zap, Microscope,
  Ruler, Scale, Thermometer, Timer, FlaskConical, Eye,
  ChevronDown, ChevronUp, Check, X, RotateCcw,
  Globe, Radio, Orbit, Sun, Waves
} from 'lucide-react';

const branches = [
  { icon: <Atom size={32} />, name: 'Mechanics', desc: 'Study of motion, forces, and energy. Like how a cricket ball flies when you hit it with a bat, or how a car moves on the road.' },
  { icon: <Flame size={32} />, name: 'Heat / Thermodynamics', desc: 'Study of temperature and heat transfer. Like why your tea gets cold after some time, or why a tandoor is so hot, or how engines work.' },
  { icon: <Volume2 size={32} />, name: 'Sound', desc: 'Study of sound waves and vibrations. Like how azan (call to prayer) travels from the mosque to your home, or why you can hear a train before you see it.' },
  { icon: <Lightbulb size={32} />, name: 'Optics', desc: 'Study of light and vision. Like how a mirror reflects your face, how a lens helps you see better, or why the sky looks blue.' },
  { icon: <Zap size={32} />, name: 'Electricity', desc: 'Study of electric charges and currents. Like how electricity powers your home fan and lights, or why you get a shock from a door handle in winter.' },
  { icon: <Microscope size={32} />, name: 'Atomic Physics', desc: 'Study of atoms and tiny particles. Like what everything in the world is made of — even you, me, and this table are made of tiny atoms!' },
  { icon: <Radio size={32} />, name: 'Nuclear Physics', desc: 'Study of the nucleus inside atoms. Like how nuclear power plants make electricity, or how the sun produces so much energy.' },
  { icon: <Globe size={32} />, name: 'Geo Physics', desc: 'Study of Earth using physics. Like how earthquakes happen, how mountains form, or how we find oil and gas under the ground.' },
  { icon: <Orbit size={32} />, name: 'Particle Physics', desc: 'Study of the smallest particles in the universe. Like what happens inside particle accelerators, or how the universe began with the Big Bang.' },
  { icon: <Sun size={32} />, name: 'Astro Physics', desc: 'Study of stars, planets, galaxies, and the entire universe. Like how stars are born, why planets orbit the sun, and what black holes are.' },
  { icon: <Waves size={32} />, name: 'Plasma Physics', desc: 'Study of plasma — the fourth state of matter. Like lightning bolts, the sun, and neon signs. Plasma is super-hot gas where electrons are free.' },
];

const fundamentalQuantities = [
  { quantity: 'Mass', symbol: 'm', unit: 'kilogram', unitSymbol: 'kg', example: 'A 1 kg bag of flour from the bazaar' },
  { quantity: 'Length', symbol: 'l', unit: 'meter', unitSymbol: 'm', example: 'A cricket pitch is 20.12 meters long' },
  { quantity: 'Time', symbol: 't', unit: 'second', unitSymbol: 's', example: 'One azan takes about 3 minutes = 180 seconds' },
  { quantity: 'Temperature', symbol: 'T', unit: 'kelvin', unitSymbol: 'K', example: 'Room temperature in summer is about 300 K (27°C)' },
  { quantity: 'Electric Current', symbol: 'I', unit: 'ampere', unitSymbol: 'A', example: 'A mobile phone charger uses about 1-2 A' },
  { quantity: 'Luminous Intensity', symbol: 'Iv', unit: 'candela', unitSymbol: 'cd', example: 'A bright LED bulb is about 100 cd' },
  { quantity: 'Amount of Substance', symbol: 'n', unit: 'mole', unitSymbol: 'mol', example: 'Used to count very small things like atoms and molecules' },
];

const quantitiesList = [
  { id: 1, text: 'Mass', pairId: 1 },
  { id: 3, text: 'Length', pairId: 2 },
  { id: 5, text: 'Time', pairId: 3 },
  { id: 7, text: 'Temperature', pairId: 4 },
  { id: 9, text: 'Current', pairId: 5 },
];

const unitsList = [
  { id: 2, text: 'kilogram (kg)', pairId: 1 },
  { id: 4, text: 'meter (m)', pairId: 2 },
  { id: 6, text: 'second (s)', pairId: 3 },
  { id: 8, text: 'kelvin (K)', pairId: 4 },
  { id: 10, text: 'ampere (A)', pairId: 5 },
];

export default function Unit1Content() {
  const [openBranch, setOpenBranch] = useState<number | null>(null);
  const [matchSelectedQ, setMatchSelectedQ] = useState<number | null>(null);
  const [matchSelectedU, setMatchSelectedU] = useState<number | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [matchResult, setMatchResult] = useState<{ correct: boolean; pairId: number } | null>(null);

  const handleQuantityClick = (qId: number, pairId: number) => {
    if (matchedPairs.includes(pairId)) return;
    setMatchSelectedQ(qId);
    setMatchResult(null);

    if (matchSelectedU !== null) {
      const unit = unitsList.find((u) => u.id === matchSelectedU);
      const isCorrect = unit && unit.pairId === pairId;
      
      setMatchResult({ correct: isCorrect, pairId });
      
      if (isCorrect) {
        setMatchedPairs([...matchedPairs, pairId]);
      }
      
      setTimeout(() => {
        setMatchSelectedQ(null);
        setMatchSelectedU(null);
        setMatchResult(null);
      }, 1200);
    }
  };

  const handleUnitClick = (uId: number, pairId: number) => {
    if (matchedPairs.includes(pairId)) return;
    setMatchSelectedU(uId);
    setMatchResult(null);

    if (matchSelectedQ !== null) {
      const qty = quantitiesList.find((q) => q.id === matchSelectedQ);
      const isCorrect = qty && qty.pairId === pairId;
      
      setMatchResult({ correct: isCorrect, pairId });
      
      if (isCorrect) {
        setMatchedPairs([...matchedPairs, pairId]);
      }
      
      setTimeout(() => {
        setMatchSelectedQ(null);
        setMatchSelectedU(null);
        setMatchResult(null);
      }, 1200);
    }
  };

  const resetMatchingGame = () => {
    setMatchedPairs([]);
    setMatchSelectedQ(null);
    setMatchSelectedU(null);
    setMatchResult(null);
  };

  return (
    <div>
      {/* WHAT IS PHYSICS + BRANCHES */}
      <div className="glass-card rounded-3xl p-8 md:p-10 mb-16">
        <h2 className="text-2xl md:text-3xl font-black text-white mb-6">What is Physics?</h2>
        <p className="text-xl text-white mb-8">
          Physics is the branch of science that studies <strong>matter, energy, and their interactions</strong>.
        </p>

        <h3 className="text-xl font-bold text-white mb-5">Main Branches of Physics</h3>
        <p className="text-gray-400 mb-6">Click on any branch to see its definition:</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {branches.map((b, i) => {
            const isOpen = openBranch === i;
            return (
              <button
                key={i}
                onClick={() => setOpenBranch(isOpen ? null : i)}
                className={`rounded-2xl p-5 text-left transition-all border ${
                  isOpen ? 'bg-white/10 border-brand-cyan' : 'glass-card border-white/10 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-brand-cyan">{b.icon}</div>
                  <span className="font-bold text-white text-lg">{b.name}</span>
                </div>
                {isOpen && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-gray-300 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                )}
                <div className="mt-3 flex items-center gap-1 text-xs text-brand-cyan">
                  {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  <span>{isOpen ? 'Hide definition' : 'Show definition'}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* MATCHING GAME - QUANTITY TO UNIT */}
      <div className="glass-card rounded-3xl p-8 md:p-10 mb-16">
        <h3 className="text-2xl font-bold text-white mb-2">⚡ Match Quantity with its Unit</h3>
        <p className="text-gray-400 mb-6">Click a quantity, then click its correct unit. Correct = Green ✓ | Wrong = Red ✗</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Quantities */}
          <div>
            <p className="font-bold text-brand-cyan mb-3">📐 Quantities</p>
            <div className="space-y-3">
              {quantitiesList.map((q) => {
                const isMatched = matchedPairs.includes(q.pairId);
                const isSelected = matchSelectedQ === q.id;
                const isResult = matchResult && matchResult.pairId === q.pairId;
                
                return (
                  <button
                    key={q.id}
                    onClick={() => handleQuantityClick(q.id, q.pairId)}
                    disabled={isMatched}
                    className={`w-full p-4 rounded-2xl text-left font-medium transition-all flex items-center justify-between border-2 ${
                      isMatched 
                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400' 
                        : isResult && !matchResult.correct
                        ? 'bg-red-500/15 border-red-500 text-red-400'
                        : isSelected 
                        ? 'bg-brand-cyan/20 border-brand-cyan' 
                        : 'glass-card border-white/10 hover:border-white/30'
                    }`}
                  >
                    <span>{q.text}</span>
                    {isMatched && <Check size={20} className="text-emerald-400" />}
                    {isResult && !matchResult.correct && <X size={20} className="text-red-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Units */}
          <div>
            <p className="font-bold text-brand-amber mb-3">📏 Units</p>
            <div className="space-y-3">
              {unitsList.map((u) => {
                const isMatched = matchedPairs.includes(u.pairId);
                const isSelected = matchSelectedU === u.id;
                const isResult = matchResult && matchResult.pairId === u.pairId;
                
                return (
                  <button
                    key={u.id}
                    onClick={() => handleUnitClick(u.id, u.pairId)}
                    disabled={isMatched}
                    className={`w-full p-4 rounded-2xl text-left font-medium transition-all flex items-center justify-between border-2 ${
                      isMatched 
                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400' 
                        : isResult && !matchResult.correct
                        ? 'bg-red-500/15 border-red-500 text-red-400'
                        : isSelected 
                        ? 'bg-brand-amber/20 border-brand-amber' 
                        : 'glass-card border-white/10 hover:border-white/30'
                    }`}
                  >
                    <span>{u.text}</span>
                    {isMatched && <Check size={20} className="text-emerald-400" />}
                    {isResult && !matchResult.correct && <X size={20} className="text-red-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {matchedPairs.length === 5 && (
          <p className="text-center mt-8 text-emerald-400 font-bold text-xl">🎉 Excellent! All matches correct!</p>
        )}

        <button onClick={resetMatchingGame} className="mt-6 text-sm text-gray-400 hover:text-white flex items-center gap-2 mx-auto">
          <RotateCcw size={16} /> Reset Game
        </button>
      </div>
    </div>
  );
}
