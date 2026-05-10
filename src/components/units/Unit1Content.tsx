import { useState } from 'react';
import {
  Atom, Flame, Volume2, Lightbulb, Zap, Microscope,
  Ruler, Scale, Thermometer, Timer, FlaskConical, Eye,
  ChevronDown, ChevronUp, Check, X, RotateCcw,
  Globe, Radio, Orbit, Sun, Waves
} from 'lucide-react';

/* ─────────── 1. WHAT IS PHYSICS ─────────── */
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

/* ─────────── 2. FUNDAMENTAL QUANTITIES ─────────── */
const fundamentalQuantities = [
  { quantity: 'Mass', symbol: 'm', unit: 'kilogram', unitSymbol: 'kg', example: 'A 1 kg bag of flour from the bazaar' },
  { quantity: 'Length', symbol: 'l', unit: 'meter', unitSymbol: 'm', example: 'A cricket pitch is 20.12 meters long' },
  { quantity: 'Time', symbol: 't', unit: 'second', unitSymbol: 's', example: 'One azan takes about 3 minutes = 180 seconds' },
  { quantity: 'Temperature', symbol: 'T', unit: 'kelvin', unitSymbol: 'K', example: 'Room temperature in summer is about 300 K (27°C)' },
  { quantity: 'Electric Current', symbol: 'I', unit: 'ampere', unitSymbol: 'A', example: 'A mobile phone charger uses about 1-2 A' },
  { quantity: 'Luminous Intensity', symbol: 'Iv', unit: 'candela', unitSymbol: 'cd', example: 'A bright LED bulb is about 100 cd' },
  { quantity: 'Amount of Substance', symbol: 'n', unit: 'mole', unitSymbol: 'mol', example: 'Used to count very small things like atoms and molecules' },
];

/* ─────────── 3. DERIVED QUANTITIES ─────────── */
const derivedQuantities = [
  { name: 'Area', formula: 'A = l × w', unit: 'm²', example: '5 m × 4 m = 20 m²', pakExample: 'A small shop in the bazaar might be 3 m × 4 m = 12 m²' },
  { name: 'Volume', formula: 'V = l × w × h', unit: 'm³', example: '2 × 1 × 0.5 = 1 m³', pakExample: 'A matka (clay pot) holds about 0.01 m³ of water' },
  { name: 'Speed', formula: 'v = d / t', unit: 'm/s', example: '100 m ÷ 10 s = 10 m/s', pakExample: 'A Suzuki van travels 60 km in 1 hour = 16.7 m/s' },
  { name: 'Force', formula: 'F = m × a', unit: 'Newton (N)', example: '10 kg × 2 m/s² = 20 N', pakExample: 'Pushing a loaded cart with 50 N of force' },
  { name: 'Pressure', formula: 'P = F / A', unit: 'Pascal (Pa)', example: '100 N ÷ 2 m² = 50 Pa', pakExample: 'A girl wearing heels puts more pressure on the ground than flat shoes' },
  { name: 'Density', formula: 'ρ = m / V', unit: 'kg/m³', example: '2 kg ÷ 0.001 m³ = 2000 kg/m³', pakExample: 'A steel pot is much denser than a plastic bottle' },
];

/* ─────────── 4. SI PREFIXES ─────────── */
const prefixes = [
  { prefix: 'kilo', symbol: 'k', factor: '10³', example: '1 km = 1000 m', pakExample: 'Distance from home to school = 2 km = 2000 m' },
  { prefix: 'mega', symbol: 'M', factor: '10⁶', example: '1 MHz = 10⁶ Hz', pakExample: 'Radio FM frequency = 100 MHz' },
  { prefix: 'milli', symbol: 'm', factor: '10⁻³', example: '1 mm = 0.001 m', pakExample: 'Thickness of a rupee coin = about 1.5 mm' },
  { prefix: 'micro', symbol: 'μ', factor: '10⁻⁶', example: '1 μm = 10⁻⁶ m', pakExample: 'Width of a human hair = about 50 μm' },
  { prefix: 'nano', symbol: 'n', factor: '10⁻⁹', example: '1 nm = 10⁻⁹ m', pakExample: 'Very tiny — used in advanced computer chips' },
  { prefix: 'centi', symbol: 'c', factor: '10⁻²', example: '1 cm = 0.01 m', pakExample: 'Length of your finger is about 10 cm' },
  { prefix: 'deci', symbol: 'd', factor: '10⁻¹', example: '1 dL = 0.1 L', pakExample: 'A small cup of tea is about 2 dL' },
];

/* ─────────── 5. SCIENTIFIC NOTATION ─────────── */
const sciExamples = [
  { normal: '150,000', sci: '1.5 × 10⁵', explain: 'Move decimal 5 places left: 150000 → 1.50000' },
  { normal: '0.0000042', sci: '4.2 × 10⁻⁶', explain: 'Move decimal 6 places right: 0.0000042 → 4.2' },
  { normal: 'Speed of light', sci: '2.998 × 10⁸ m/s', explain: '299,800,000 m/s — decimal moved 8 places left' },
  { normal: 'Pakistan population', sci: '2.4 × 10⁸', explain: 'About 240 million people!' },
  { normal: 'Diameter of Earth', sci: '1.27 × 10⁷ m', explain: '12,700,000 meters — decimal moved 7 places left' },
  { normal: 'Mass of electron', sci: '9.11 × 10⁻³¹ kg', explain: 'Very tiny! Decimal moved 31 places right' },
];

/* ─────────── 7. SIGNIFICANT FIGURES ─────────── */
const sigFigRules = [
  'All non-zero digits are significant. Example: 456 has 3 significant figures.',
  'Zeros between non-zero digits are significant. Example: 405 has 3 significant figures.',
  'Leading zeros (before first non-zero) are NOT significant. Example: 0.0045 has 2 significant figures.',
  'Trailing zeros after a decimal point ARE significant. Example: 0.00450 has 3 significant figures.',
  'Trailing zeros in a whole number without decimal are ambiguous. Example: 500 could be 1, 2, or 3 sig figs.',
];

const sigFigExamples = [
  { number: '0.00450', answer: 3, explain: 'Leading zeros not significant. 4, 5, and trailing 0 are significant.' },
  { number: '1.020', answer: 4, explain: '1, 0 (between), 2, and trailing 0 are all significant.' },
  { number: '4050', answer: 3, explain: '4, 0 (between), and 5 are significant. Trailing 0 is ambiguous.' },
  { number: '0.0302', answer: 3, explain: 'Leading zeros not significant. 3, 0 (between), and 2 are significant.' },
  { number: '500.0', answer: 4, explain: 'All digits including trailing zeros after decimal are significant.' },
  { number: '0.00800', answer: 3, explain: 'Leading zeros not significant. 8 and two trailing zeros are significant.' },
];

/* ─────────── 8. DENSITY ─────────── */
const densityExamples = [
  { substance: 'Water', density: '1000 kg/m³', note: 'This is our reference! 1 g/cm³ = 1000 kg/m³' },
  { substance: 'Iron', density: '7860 kg/m³', note: 'Much heavier than water — sinks immediately' },
  { substance: 'Wood (Sheesham)', density: '750 kg/m³', note: 'Lighter than water — floats!' },
  { substance: 'Aluminum', density: '2700 kg/m³', note: 'Used in pots and pans — sinks in water' },
  { substance: 'Air', density: '1.2 kg/m³', note: 'Very light — floats above everything' },
  { substance: 'Mercury', density: '13600 kg/m³', note: 'Very heavy liquid — even iron floats on it!' },
  { substance: 'Ice', density: '917 kg/m³', note: 'Lighter than water — that is why ice floats!' },
  { substance: 'Gold', density: '19300 kg/m³', note: 'Very dense — one of the heaviest metals' },
];

/* ─────────── STANDARDS ─────────── */
const standards = [
  { name: 'Standard of Mass', unit: 'Kilogram (kg)', definition: 'The mass of a special platinum-iridium cylinder kept at the International Bureau of Weights in France.', pakExample: 'A 1 kg bag of sugar from the market.' },
  { name: 'Standard of Length', unit: 'Meter (m)', definition: 'The distance traveled by light in vacuum in 1/299,792,458 of a second.', pakExample: 'A cricket bat is about 1 meter long.' },
  { name: 'Standard of Time', unit: 'Second (s)', definition: 'The duration of 9,192,631,770 periods of radiation from cesium-133 atom.', pakExample: 'One heartbeat takes about 1 second.' },
];

/* ─────────── MATCH GAME DATA ─────────── */
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

/* ─────────── MEASURING INSTRUMENTS CHECK ANSWER ─────────── */
const meterRuleQuestions = [
  { objectStart: 2, objectEnd: 7.5, answer: '5.5' },
  { objectStart: 1, objectEnd: 4.2, answer: '3.2' },
];

export default function Unit1Content() {
  const [openBranch, setOpenBranch] = useState<number | null>(null);
  const [selectedDerived, setSelectedDerived] = useState(0);
  const [selectedPrefix, setSelectedPrefix] = useState(0);
  const [sciInput, setSciInput] = useState('');
  const [sciResult, setSciResult] = useState('');
  const [selectedSigFig, setSelectedSigFig] = useState(0);
  const [sigFigGuess, setSigFigGuess] = useState('');
  const [sigFigFeedback, setSigFigFeedback] = useState<'correct' | 'wrong' | null>(null);

  const [matchSelectedQ, setMatchSelectedQ] = useState<number | null>(null);
  const [matchSelectedU, setMatchSelectedU] = useState<number | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [matchMessage, setMatchMessage] = useState('');

  const [meterQIndex, setMeterQIndex] = useState(0);
  const [meterAnswer, setMeterAnswer] = useState('');
  const [meterFeedback, setMeterFeedback] = useState<'correct' | 'wrong' | null>(null);

  const handleQuantityClick = (qId: number, pairId: number) => {
    if (matchedPairs.includes(pairId)) return;
    setMatchSelectedQ(qId);
    setMatchMessage('');
    if (matchSelectedU !== null) {
      const unit = unitsList.find((u) => u.id === matchSelectedU);
      if (unit && unit.pairId === pairId) {
        setMatchedPairs([...matchedPairs, pairId]);
        setMatchMessage('✅ Correct match!');
        setMatchSelectedQ(null);
        setMatchSelectedU(null);
      } else {
        setMatchMessage('❌ Wrong match! Try again.');
        setMatchSelectedQ(null);
        setMatchSelectedU(null);
      }
    }
  };

  const handleUnitClick = (uId: number, pairId: number) => {
    if (matchedPairs.includes(pairId)) return;
    setMatchSelectedU(uId);
    setMatchMessage('');
    if (matchSelectedQ !== null) {
      const qty = quantitiesList.find((q) => q.id === matchSelectedQ);
      if (qty && qty.pairId === pairId) {
        setMatchedPairs([...matchedPairs, pairId]);
        setMatchMessage('✅ Correct match!');
        setMatchSelectedQ(null);
        setMatchSelectedU(null);
      } else {
        setMatchMessage('❌ Wrong match! Try again.');
        setMatchSelectedQ(null);
        setMatchSelectedU(null);
      }
    }
  };

  const toScientific = (val: string) => {
    const num = parseFloat(val);
    if (isNaN(num) || num === 0) return '';
    const exp = Math.floor(Math.log10(Math.abs(num)));
    const mantissa = num / Math.pow(10, exp);
    const rounded = Math.round(mantissa * 100) / 100;
    const superscripts: Record<string, string> = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };
    const expStr = String(exp).split('').map((c) => superscripts[c] || c).join('');
    return `${rounded} × 10${expStr}`;
  };

  const checkMeterAnswer = () => {
    const q = meterRuleQuestions[meterQIndex];
    if (meterAnswer.trim() === q.answer) {
      setMeterFeedback('correct');
    } else {
      setMeterFeedback('wrong');
    }
  };

  const nextMeterQuestion = () => {
    setMeterQIndex((prev) => (prev + 1) % meterRuleQuestions.length);
    setMeterAnswer('');
    setMeterFeedback(null);
  };

  const Section = ({ title, icon, children, color = 'brand-cyan' }: { title: string; icon: React.ReactNode; children: React.ReactNode; color?: string }) => (
    <div className="unit-detail-reveal mb-16" style={{ opacity: 0, transform: 'translateY(60px)' }}>
      <div className="glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden">
        <div className="flex items-center gap-4 mb-8">
          <div className={`w-12 h-12 rounded-2xl bg-${color}/20 flex items-center justify-center text-${color}`}>
            {icon}
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );

  const currentMeterQ = meterRuleQuestions[meterQIndex];

  return (
    <div>
      {/* 1. WHAT IS PHYSICS */}
      <Section title="What is Physics?" icon={<Atom size={24} />} color="brand-purple">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-8">
          <p className="text-xl md:text-2xl text-white leading-relaxed">
            <strong className="text-brand-cyan">Physics</strong> is the branch of science that studies <strong>matter, energy, and their interactions</strong>. It helps us understand how the universe works.
          </p>
          <p className="text-gray-400 mt-4 text-lg">
            In simple words: Physics explains why things happen around us — why the sky is blue, why a ball falls down, why electricity works, and much more!
          </p>
        </div>

        <h3 className="text-xl font-bold text-white mb-5">Main Branches of Physics</h3>
        <p className="text-gray-400 mb-6 text-base">Click on each branch card to see its definition:</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {branches.map((b, i) => {
            const isOpen = openBranch === i;
            return (
              <button
                key={i}
                onClick={() => setOpenBranch(isOpen ? null : i)}
                className={`rounded-2xl p-5 text-left transition-all duration-300 border ${
                  isOpen ? 'bg-white/8 border-brand-cyan/40' : 'glass-card border-white/6 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-brand-cyan">{b.icon}</div>
                  <span className="font-bold text-white text-lg">{b.name}</span>
                </div>
                {isOpen && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <p className="text-gray-300 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                )}
                <div className="mt-2 flex items-center gap-1 text-xs text-brand-cyan">
                  {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  <span>{isOpen ? 'Click to hide' : 'Click to learn more'}</span>
                </div>
              </button>
            );
          })}
        </div>
      </Section>

      {/* 2. PHYSICAL QUANTITIES — 7 FUNDAMENTAL */}
      <Section title="Physical Quantities" icon={<Ruler size={24} />} color="brand-cyan">
        <p className="text-gray-400 text-lg mb-6 leading-relaxed">
          A <strong className="text-white">physical quantity</strong> is anything we can measure. There are <strong className="text-brand-cyan">7 Fundamental Quantities</strong> that form the base of all measurements.
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="pb-3 text-brand-cyan font-bold text-sm uppercase tracking-wider">Quantity</th>
                <th className="pb-3 text-brand-cyan font-bold text-sm uppercase tracking-wider">Symbol</th>
                <th className="pb-3 text-brand-cyan font-bold text-sm uppercase tracking-wider">SI Unit</th>
                <th className="pb-3 text-brand-cyan font-bold text-sm uppercase tracking-wider">Symbol</th>
                <th className="pb-3 text-brand-cyan font-bold text-sm uppercase tracking-wider hidden md:table-cell">Example from Pakistan</th>
              </tr>
            </thead>
            <tbody>
              {fundamentalQuantities.map((q, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 text-white font-semibold">{q.quantity}</td>
                  <td className="py-4 text-gray-400 font-space">{q.symbol}</td>
                  <td className="py-4 text-gray-300">{q.unit}</td>
                  <td className="py-4 text-brand-cyan font-space font-bold">{q.unitSymbol}</td>
                  <td className="py-4 text-gray-500 text-sm hidden md:table-cell">{q.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Match Game */}
        <div className="formula-box rounded-2xl p-6 md:p-8">
          <h4 className="text-lg font-bold text-white mb-2">⚡ Match Quantity to Unit!</h4>
          <p className="text-gray-400 text-sm mb-4">Click one item from the <strong className="text-brand-cyan">Quantities</strong> column, then click its matching item from the <strong className="text-brand-amber">Units</strong> column.</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Quantities Column */}
            <div>
              <p className="text-brand-cyan font-bold text-sm uppercase tracking-wider mb-3">📐 Quantities</p>
              <div className="space-y-2">
                {quantitiesList.map((q) => {
                  const isMatched = matchedPairs.includes(q.pairId);
                  const isSelected = matchSelectedQ === q.id;
                  return (
                    <button
                      key={q.id}
                      onClick={() => handleQuantityClick(q.id, q.pairId)}
                      disabled={isMatched}
                      className={`w-full p-3 rounded-xl text-sm font-semibold text-left transition-all duration-300 ${
                        isMatched
                          ? 'bg-brand-lime/15 text-brand-lime border border-brand-lime/30'
                          : isSelected
                          ? 'bg-brand-cyan/20 text-brand-cyan border-2 border-brand-cyan/60'
                          : 'glass-card text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      {q.text}
                      {isMatched && <Check size={14} className="inline ml-2" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Units Column */}
            <div>
              <p className="text-brand-amber font-bold text-sm uppercase tracking-wider mb-3">📏 Units</p>
              <div className="space-y-2">
                {unitsList.map((u) => {
                  const isMatched = matchedPairs.includes(u.pairId);
                  const isSelected = matchSelectedU === u.id;
                  return (
                    <button
                      key={u.id}
                      onClick={() => handleUnitClick(u.id, u.pairId)}
                      disabled={isMatched}
                      className={`w-full p-3 rounded-xl text-sm font-semibold text-left transition-all duration-300 ${
                        isMatched
                          ? 'bg-brand-lime/15 text-brand-lime border border-brand-lime/30'
                          : isSelected
                          ? 'bg-brand-amber/20 text-brand-amber border-2 border-brand-amber/60'
                          : 'glass-card text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      {u.text}
                      {isMatched && <Check size={14} className="inline ml-2" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {matchMessage && (
            <p className={`text-center mt-4 text-lg font-bold ${matchMessage.includes('✅') ? 'text-brand-lime' : 'text-brand-rose'}`}>
              {matchMessage}
            </p>
          )}

          {matchedPairs.length === 5 && (
            <p className="text-brand-lime font-bold text-center mt-4 text-xl">🎉 Excellent! You matched all pairs!</p>
          )}

          <button
            onClick={() => { setMatchedPairs([]); setMatchSelectedQ(null); setMatchSelectedU(null); setMatchMessage(''); }}
            className="mt-4 mx-auto text-xs text-gray-500 hover:text-white flex items-center gap-1"
          >
            <RotateCcw size={12} /> Reset Game
          </button>
        </div>
      </Section>

      {/* 3. DERIVED QUANTITIES */}
      <Section title="Derived Quantities" icon={<Scale size={24} />} color="brand-pink">
        <p className="text-gray-400 text-lg mb-6 leading-relaxed">
          <strong className="text-white">Derived quantities</strong> are made by combining fundamental quantities. We use formulas to calculate them.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {derivedQuantities.map((d, i) => (
            <button
              key={i}
              onClick={() => setSelectedDerived(i)}
              className={`text-left p-5 rounded-2xl transition-all duration-300 ${
                selectedDerived === i ? 'bg-white/10 border border-brand-pink/30' : 'glass-card hover:bg-white/5'
              }`}
            >
              <span className="text-brand-pink font-bold text-lg">{d.name}</span>
              <p className="text-gray-500 text-sm mt-1">{d.formula}</p>
            </button>
          ))}
        </div>

        <div className="formula-box rounded-2xl p-6 md:p-8">
          <h4 className="text-xl font-bold text-white mb-4">{derivedQuantities[selectedDerived].name}</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-brand-pink font-space font-bold text-2xl mb-2">{derivedQuantities[selectedDerived].formula}</p>
              <p className="text-gray-400 text-sm">Unit: <span className="text-white font-semibold">{derivedQuantities[selectedDerived].unit}</span></p>
            </div>
            <div className="space-y-3">
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-brand-amber text-xs font-bold uppercase mb-1">Example</p>
                <p className="text-gray-300 text-sm">{derivedQuantities[selectedDerived].example}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-brand-cyan text-xs font-bold uppercase mb-1">Pakistan Example</p>
                <p className="text-gray-300 text-sm">{derivedQuantities[selectedDerived].pakExample}</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 4. SI PREFIXES */}
      <Section title="SI Units & Prefixes" icon={<Timer size={24} />} color="brand-amber">
        <p className="text-gray-400 text-lg mb-6 leading-relaxed">
          Prefixes help us write very big or very small numbers easily. Instead of writing 1000 meters, we write <strong className="text-white">1 kilometer</strong>.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="pb-3 text-brand-amber font-bold text-sm uppercase tracking-wider">Prefix</th>
                <th className="pb-3 text-brand-amber font-bold text-sm uppercase tracking-wider">Symbol</th>
                <th className="pb-3 text-brand-amber font-bold text-sm uppercase tracking-wider">Factor</th>
                <th className="pb-3 text-brand-amber font-bold text-sm uppercase tracking-wider">Example</th>
                <th className="pb-3 text-brand-amber font-bold text-sm uppercase tracking-wider hidden md:table-cell">Pakistan Example</th>
              </tr>
            </thead>
            <tbody>
              {prefixes.map((p, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 text-white font-semibold">{p.prefix}</td>
                  <td className="py-4 text-brand-amber font-space font-bold">{p.symbol}</td>
                  <td className="py-4 text-gray-300 font-space">{p.factor}</td>
                  <td className="py-4 text-gray-400 text-sm">{p.example}</td>
                  <td className="py-4 text-gray-500 text-sm hidden md:table-cell">{p.pakExample}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="formula-box rounded-2xl p-6 md:p-8">
          <h4 className="text-lg font-bold text-white mb-4">🔢 Prefix Explorer</h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {prefixes.map((p, i) => (
              <button
                key={i}
                onClick={() => setSelectedPrefix(i)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  selectedPrefix === i ? 'bg-brand-amber/20 text-brand-amber border border-brand-amber/30' : 'glass-card text-gray-400 hover:bg-white/5'
                }`}
              >
                {p.prefix} ({p.symbol})
              </button>
            ))}
          </div>
          <div className="bg-white/5 rounded-xl p-5">
            <p className="text-2xl font-black text-white mb-2">{prefixes[selectedPrefix].example}</p>
            <p className="text-gray-400">{prefixes[selectedPrefix].pakExample}</p>
            <p className="text-brand-amber font-space mt-2">Factor: {prefixes[selectedPrefix].factor}</p>
          </div>
        </div>
      </Section>

      {/* 5. SCIENTIFIC NOTATION */}
      <Section title="Scientific Notation" icon={<FlaskConical size={24} />} color="brand-teal">
        <p className="text-gray-400 text-lg mb-6 leading-relaxed">
          <strong className="text-white">Scientific notation</strong> is a way to write very big or very small numbers using powers of 10. It looks like this:
        </p>

        <div className="formula-box rounded-2xl p-8 text-center mb-8">
          <p className="text-4xl md:text-5xl font-space font-black text-white">
            N × 10<sup className="text-brand-teal">n</sup>
          </p>
          <p className="text-gray-400 mt-3 text-lg">
            Where <strong className="text-brand-teal">N</strong> is between 1 and 10, and <strong className="text-brand-teal">n</strong> is an integer (whole number).
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {sciExamples.map((ex, i) => (
            <div key={i} className="glass-card rounded-2xl p-5">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{ex.normal}</p>
              <p className="text-2xl font-space font-bold text-brand-teal">{ex.sci}</p>
              <p className="text-gray-400 text-sm mt-2">{ex.explain}</p>
            </div>
          ))}
        </div>

        <div className="formula-box rounded-2xl p-6 md:p-8">
          <h4 className="text-lg font-bold text-white mb-4">🔬 Try it Yourself!</h4>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <input
              type="number"
              value={sciInput}
              onChange={(e) => {
                setSciInput(e.target.value);
                setSciResult(toScientific(e.target.value));
              }}
              placeholder="Enter a number (e.g., 1500)"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-teal/50 text-lg"
            />
          </div>
          {sciResult && (
            <div className="mt-4 bg-brand-teal/10 rounded-xl p-4 text-center">
              <p className="text-gray-400 text-sm">Scientific Notation:</p>
              <p className="text-3xl font-space font-bold text-brand-teal mt-1">{sciResult}</p>
            </div>
          )}
        </div>
      </Section>

      {/* 6. STANDARDS OF MEASUREMENT */}
      <Section title="Standards of Measurement" icon={<Scale size={24} />} color="brand-lime">
        <p className="text-gray-400 text-lg mb-6 leading-relaxed">
          A <strong className="text-white">standard</strong> is a fixed reference used to measure physical quantities. Standards ensure that measurements are the same everywhere in the world.
        </p>

        <div className="space-y-4 mb-6">
          {standards.map((s, i) => (
            <div key={i} className="glass-card rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-lime/20 flex items-center justify-center text-brand-lime font-bold text-lg shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">{s.name}</h4>
                  <p className="text-brand-lime font-space font-bold text-sm mb-2">Unit: {s.unit}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.definition}</p>
                  <p className="text-brand-cyan text-sm mt-2"><strong>Pakistan Example:</strong> {s.pakExample}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 7. MEASURING INSTRUMENTS */}
      <Section title="Measuring Instruments" icon={<Ruler size={24} />} color="brand-purple">
        <p className="text-gray-400 text-lg mb-6 leading-relaxed">
          To measure physical quantities accurately, we use special instruments. Each instrument has a <strong className="text-white">least count</strong> — the smallest value it can measure.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            { icon: <Ruler size={28} />, name: 'Meter Rule', least: '1 mm = 0.1 cm', use: 'Measuring length of books, tables, doors' },
            { icon: <Eye size={28} />, name: 'Vernier Caliper', least: '0.1 mm = 0.01 cm', use: 'Measuring thickness of coins, wires' },
            { icon: <Timer size={28} />, name: 'Micrometer / Screw Gauge', least: '0.01 mm = 0.001 cm', use: 'Measuring very small things like hair thickness' },
            { icon: <Scale size={28} />, name: 'Physical Balance', least: '0.1 g', use: 'Measuring mass of objects in the lab' },
            { icon: <FlaskConical size={28} />, name: 'Measuring Cylinder', least: '1 mL', use: 'Measuring volume of liquids' },
            { icon: <Thermometer size={28} />, name: 'Thermometer', least: '0.1 °C', use: 'Measuring body temperature or room temperature' },
          ].map((inst, i) => (
            <div key={i} className="glass-card rounded-2xl p-5 hover:bg-white/5 transition-colors">
              <div className="text-brand-purple mb-3">{inst.icon}</div>
              <h4 className="font-bold text-white text-lg mb-1">{inst.name}</h4>
              <p className="text-brand-purple text-xs font-semibold mb-2">Least Count: {inst.least}</p>
              <p className="text-gray-400 text-sm">{inst.use}</p>
            </div>
          ))}
        </div>

        {/* Vernier Caliper Explanation */}
        <div className="formula-box rounded-2xl p-6 md:p-8 mb-6">
          <h4 className="text-lg font-bold text-white mb-4">📏 How to Read a Vernier Caliper</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <p className="text-gray-300 text-sm"><strong className="text-brand-cyan">1.</strong> Read the main scale where the zero of the vernier scale lies.</p>
              <p className="text-gray-300 text-sm"><strong className="text-brand-cyan">2.</strong> Find which vernier division aligns perfectly with a main scale division.</p>
              <p className="text-gray-300 text-sm"><strong className="text-brand-cyan">3.</strong> Multiply the vernier reading by the least count (usually 0.01 cm).</p>
              <p className="text-gray-300 text-sm"><strong className="text-brand-cyan">4.</strong> Add the main scale reading and the vernier reading.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-5">
              <p className="text-brand-amber text-xs font-bold uppercase mb-2">Example</p>
              <p className="text-gray-300 text-sm">Main scale reading: <strong className="text-white">2.3 cm</strong></p>
              <p className="text-gray-300 text-sm">Vernier division aligned: <strong className="text-white">5</strong></p>
              <p className="text-gray-300 text-sm">Least count: <strong className="text-white">0.01 cm</strong></p>
              <div className="border-t border-white/10 pt-2 mt-2">
                <p className="text-brand-cyan font-space font-bold">Total = 2.3 + (5 × 0.01) = 2.35 cm</p>
              </div>
            </div>
          </div>
        </div>

        {/* Micrometer Explanation */}
        <div className="formula-box rounded-2xl p-6 md:p-8 mb-6">
          <h4 className="text-lg font-bold text-white mb-4">🔩 How to Read a Micrometer (Screw Gauge)</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <p className="text-gray-300 text-sm"><strong className="text-brand-cyan">1.</strong> Read the main scale (sleeve) where the edge of the thimble lies.</p>
              <p className="text-gray-300 text-sm"><strong className="text-brand-cyan">2.</strong> Read the circular scale (thimble) that aligns with the reference line.</p>
              <p className="text-gray-300 text-sm"><strong className="text-brand-cyan">3.</strong> Multiply the circular scale reading by the least count (usually 0.01 mm).</p>
              <p className="text-gray-300 text-sm"><strong className="text-brand-cyan">4.</strong> Add both readings.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-5">
              <p className="text-brand-amber text-xs font-bold uppercase mb-2">Example</p>
              <p className="text-gray-300 text-sm">Main scale reading: <strong className="text-white">5.5 mm</strong></p>
              <p className="text-gray-300 text-sm">Circular scale reading: <strong className="text-white">28</strong></p>
              <p className="text-gray-300 text-sm">Least count: <strong className="text-white">0.01 mm</strong></p>
              <div className="border-t border-white/10 pt-2 mt-2">
                <p className="text-brand-cyan font-space font-bold">Total = 5.5 + (28 × 0.01) = 5.78 mm</p>
              </div>
            </div>
          </div>
        </div>

        {/* Meter Rule Practice */}
        <div className="formula-box rounded-2xl p-6 md:p-8">
          <h4 className="text-lg font-bold text-white mb-4">📏 How to Read a Meter Rule</h4>
          <p className="text-gray-400 text-sm mb-4">Least count: <strong className="text-white">1 mm = 0.1 cm</strong></p>

          <div className="bg-white/5 rounded-xl p-6 mb-6">
            <div className="relative h-20 bg-gradient-to-r from-white/10 to-white/5 rounded-lg flex items-end px-4 pb-2 overflow-hidden">
              {Array.from({ length: 21 }).map((_, i) => (
                <div key={i} className="absolute bottom-0 border-l border-white/30" style={{ left: `${i * 5}%`, height: i % 5 === 0 ? '60%' : '30%' }} />
              ))}
              {/* Object */}
              <div
                className="absolute bottom-4 h-8 bg-brand-purple/40 rounded border-2 border-brand-purple"
                style={{
                  left: `${(currentMeterQ.objectStart / 10) * 100}%`,
                  width: `${((currentMeterQ.objectEnd - currentMeterQ.objectStart) / 10) * 100}%`,
                }}
              />
              <span className="absolute top-2 left-[2%] text-gray-500 text-xs">0</span>
              <span className="absolute top-2 left-[27%] text-gray-500 text-xs">5</span>
              <span className="absolute top-2 left-[52%] text-gray-500 text-xs">10</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
              <span>0 cm</span>
              <span>5 cm</span>
              <span>10 cm</span>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-5">
            <p className="text-brand-amber text-xs font-bold uppercase mb-2">Practice Question</p>
            <p className="text-gray-300 text-base mb-4">What is the length of the purple object shown on the meter rule above?</p>
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                value={meterAnswer}
                onChange={(e) => { setMeterAnswer(e.target.value); setMeterFeedback(null); }}
                placeholder="Enter reading in cm"
                className="w-48 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-brand-purple/50"
              />
              <button
                onClick={checkMeterAnswer}
                className="btn-primary px-5 py-2 rounded-xl text-white font-semibold text-sm"
              >
                Check Answer
              </button>
              <button
                onClick={nextMeterQuestion}
                className="glass-card px-4 py-2 rounded-xl text-gray-400 text-sm hover:text-white transition-colors"
              >
                <RotateCcw size={14} className="inline mr-1" /> Next
              </button>
            </div>
            {meterFeedback === 'correct' && (
              <p className="text-brand-lime font-bold mt-3 flex items-center gap-2">
                <Check size={18} /> Correct! The reading is {currentMeterQ.answer} cm.
              </p>
            )}
            {meterFeedback === 'wrong' && (
              <p className="text-brand-rose font-bold mt-3 flex items-center gap-2">
                <X size={18} /> Not quite! Look at where the object starts and ends. Subtract start from end.
              </p>
            )}
          </div>
        </div>
      </Section>

      {/* 8. SIGNIFICANT FIGURES */}
      <Section title="Significant Figures" icon={<Eye size={24} />} color="brand-rose">
        <p className="text-gray-400 text-lg mb-6 leading-relaxed">
          <strong className="text-white">Significant figures</strong> tell us how precise a measurement is. They show which digits in a number are actually meaningful.
        </p>

        <div className="space-y-3 mb-8">
          {sigFigRules.map((rule, i) => (
            <div key={i} className="glass-card rounded-xl p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-rose/20 flex items-center justify-center text-brand-rose font-bold text-sm shrink-0 mt-0.5">
                {i + 1}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{rule}</p>
            </div>
          ))}
        </div>

        <div className="formula-box rounded-2xl p-6 md:p-8">
          <h4 className="text-lg font-bold text-white mb-4">🎯 Practice: Count the Significant Figures!</h4>
          <div className="flex flex-wrap gap-2 mb-6">
            {sigFigExamples.map((ex, i) => (
              <button
                key={i}
                onClick={() => { setSelectedSigFig(i); setSigFigGuess(''); setSigFigFeedback(null); }}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  selectedSigFig === i ? 'bg-brand-rose/20 text-brand-rose border border-brand-rose/30' : 'glass-card text-gray-400 hover:bg-white/5'
                }`}
              >
                {ex.number}
              </button>
            ))}
          </div>

          <div className="bg-white/5 rounded-xl p-6">
            <p className="text-3xl font-space font-bold text-white mb-4">{sigFigExamples[selectedSigFig].number}</p>
            <p className="text-gray-400 text-sm mb-4">{sigFigExamples[selectedSigFig].explain}</p>

            <div className="flex items-center gap-3">
              <input
                type="number"
                value={sigFigGuess}
                onChange={(e) => setSigFigGuess(e.target.value)}
                placeholder="How many sig figs?"
                className="w-40 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-brand-rose/50"
              />
              <button
                onClick={() => {
                  if (parseInt(sigFigGuess) === sigFigExamples[selectedSigFig].answer) {
                    setSigFigFeedback('correct');
                  } else {
                    setSigFigFeedback('wrong');
                  }
                }}
                className="btn-primary px-5 py-2 rounded-xl text-white font-semibold text-sm"
              >
                Check Answer
              </button>
            </div>

            {sigFigFeedback === 'correct' && (
              <p className="text-brand-lime font-bold mt-3 flex items-center gap-2">
                <Check size={18} /> Correct! {sigFigExamples[selectedSigFig].number} has {sigFigExamples[selectedSigFig].answer} significant figures.
              </p>
            )}
            {sigFigFeedback === 'wrong' && (
              <p className="text-brand-rose font-bold mt-3 flex items-center gap-2">
                <X size={18} /> Try again! Look at the rules above carefully.
              </p>
            )}
          </div>
        </div>
      </Section>

      {/* 9. DENSITY */}
      <Section title="Density and Volume" icon={<Scale size={24} />} color="brand-cyan">
        <p className="text-gray-400 text-lg mb-6 leading-relaxed">
          <strong className="text-white">Density</strong> tells us how much mass is packed into a volume. Heavy things sink in water, light things float!
        </p>

        <div className="formula-box rounded-2xl p-8 text-center mb-8">
          <p className="text-4xl md:text-5xl font-space font-black text-white">
            ρ = <span className="text-brand-cyan">m</span> / <span className="text-brand-pink">V</span>
          </p>
          <div className="flex justify-center gap-8 mt-4 text-sm flex-wrap">
            <span className="text-brand-cyan">ρ = density (kg/m³)</span>
            <span className="text-brand-pink">m = mass (kg)</span>
            <span className="text-brand-amber">V = volume (m³)</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="definition-highlight rounded-2xl p-6">
            <h4 className="text-brand-cyan font-bold mb-2">💧 Water = 1000 kg/m³</h4>
            <p className="text-gray-300 text-sm">This is our reference point. We compare everything to water.</p>
            <p className="text-gray-400 text-sm mt-2">Also: <strong className="text-white">1 g/cm³ = 1000 kg/m³</strong></p>
            <p className="text-gray-400 text-sm mt-1"><strong className="text-white">1 mL = 1 cm³</strong></p>
          </div>
          <div className="definition-highlight rounded-2xl p-6" style={{ borderLeftColor: '#f59e0b' }}>
            <h4 className="text-brand-amber font-bold mb-2">🎯 The Rule</h4>
            <p className="text-gray-300 text-sm">If density <strong className="text-white">&gt; water</strong> → <span className="text-brand-rose">SINKS</span></p>
            <p className="text-gray-300 text-sm">If density <strong className="text-white">&lt; water</strong> → <span className="text-brand-lime">FLOATS</span></p>
          </div>
        </div>

        <h4 className="text-xl font-bold text-white mb-4">Density of Common Substances</h4>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="pb-3 text-brand-cyan font-bold text-sm uppercase tracking-wider">Substance</th>
                <th className="pb-3 text-brand-cyan font-bold text-sm uppercase tracking-wider">Density</th>
                <th className="pb-3 text-brand-cyan font-bold text-sm uppercase tracking-wider">Note</th>
                <th className="pb-3 text-brand-cyan font-bold text-sm uppercase tracking-wider">Float or Sink?</th>
              </tr>
            </thead>
            <tbody>
              {densityExamples.map((d, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 text-white font-semibold">{d.substance}</td>
                  <td className="py-4 text-brand-cyan font-space font-bold">{d.density}</td>
                  <td className="py-4 text-gray-400 text-sm">{d.note}</td>
                  <td className="py-4">
                    {parseFloat(d.density) > 1000 ? (
                      <span className="px-3 py-1 rounded-full bg-brand-rose/20 text-brand-rose text-xs font-bold">SINKS</span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-brand-lime/20 text-brand-lime text-xs font-bold">FLOATS</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="formula-box rounded-2xl p-6 md:p-8">
          <h4 className="text-lg font-bold text-white mb-4">🇵🇰 Pakistan Example</h4>
          <div className="bg-white/5 rounded-xl p-5">
            <p className="text-gray-300 text-lg leading-relaxed">
              A <strong className="text-white">steel cooking pot</strong> has a mass of <strong className="text-brand-cyan">2 kg</strong> and volume of <strong className="text-brand-pink">0.00025 m³</strong>.
            </p>
            <p className="text-gray-400 mt-3">What is its density? Will it sink or float in water?</p>
            <div className="mt-4 p-4 bg-brand-dark/50 rounded-xl">
              <p className="text-brand-cyan font-space font-bold text-xl">ρ = 2 / 0.00025 = 8000 kg/m³</p>
              <p className="text-brand-rose font-bold mt-2">It SINKS! (8000 &gt; 1000)</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Quick Summary */}
      <div className="unit-detail-reveal glass-card-strong rounded-3xl p-8 md:p-12 text-center mb-16" style={{ opacity: 0, transform: 'translateY(60px)' }}>
        <h3 className="text-2xl md:text-3xl font-black text-white mb-6">📝 Unit 1 Quick Summary</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-cyan font-bold text-sm mb-1">Physics</p>
            <p className="text-gray-400 text-xs">Study of matter, energy, and their interactions</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-purple font-bold text-sm mb-1">7 Fundamental</p>
            <p className="text-gray-400 text-xs">Mass, Length, Time, Temperature, Current, Light, Amount</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-pink font-bold text-sm mb-1">Derived</p>
            <p className="text-gray-400 text-xs">Area, Volume, Speed, Force, Pressure, Density</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-amber font-bold text-sm mb-1">Density</p>
            <p className="text-gray-400 text-xs">ρ = m/V. &gt;1000 sinks, &lt;1000 floats in water</p>
          </div>
        </div>
      </div>
    </div>
  );
}
