import { useState, useEffect, useRef } from 'react';
import { RotateCcw, Zap, ArrowUp, Recycle, Lightbulb, Gauge } from 'lucide-react';
import { useT } from '../../i18n/LanguageContext';
import Section from '../Section';
import UnitQuiz from '../UnitQuiz';

/* ═══ 1. ENERGY MATCHING GAME ═══ */
function EnergyMatchingGame() {
  const t = useT();
  const [selectedExample, setSelectedExample] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, boolean>>({});
  const [message, setMessage] = useState('');

  const examples = [
    { name: t('unit8.movingCar'), type: 'kinetic', icon: '🚗' },
    { name: t('unit8.battery'), type: 'chemical', icon: '🔋' },
    { name: t('unit8.stretchedBow'), type: 'potential', icon: '🏹' },
    { name: t('unit8.burningFire'), type: 'heat', icon: '🔥' },
    { name: t('unit8.sunlight'), type: 'light', icon: '☀️' },
    { name: t('unit8.thunder'), type: 'sound', icon: '⚡' },
  ];
  const types = [
    { type: 'kinetic', label: t('unit8.typeKinetic'), desc: t('unit8.typeKineticDesc'), color: 'text-brand-cyan' },
    { type: 'chemical', label: 'Chemical', desc: 'Stored in bonds', color: 'text-brand-amber' },
    { type: 'potential', label: t('unit8.typePotential'), desc: t('unit8.typePotentialDesc'), color: 'text-brand-pink' },
    { type: 'heat', label: t('unit8.typeHeat'), desc: t('unit8.typeHeatDesc'), color: 'text-brand-rose' },
    { type: 'light', label: t('unit8.typeLight'), desc: t('unit8.typeLightDesc'), color: 'text-brand-lime' },
    { type: 'sound', label: t('unit8.typeSound'), desc: t('unit8.typeSoundDesc'), color: 'text-brand-purple' },
  ];

  const handleExampleClick = (ex: typeof examples[0]) => {
    if (matched[ex.name]) return;
    setSelectedExample(ex.name);
    setMessage('');
  };

  const handleTypeClick = (type: string) => {
    if (!selectedExample) { setMessage(t('unit8.selectFirst')); return; }
    const ex = examples.find(e => e.name === selectedExample);
    if (!ex) return;
    if (ex.type === type) {
      setMatched({ ...matched, [ex.name]: true });
      setMessage(t('unit8.correctMatch'));
      setSelectedExample(null);
    } else {
      setMessage(t('unit8.wrongMatch'));
    }
  };

  const allDone = Object.keys(matched).length === examples.length;

  return (
    <div>
      <p className="text-gray-400 text-sm mb-4">{t('unit8.clickExample')}</p>
      {message && <p className={`text-center mb-3 font-bold ${message.includes('✅') ? 'text-brand-lime' : message.includes('❌') ? 'text-brand-rose' : 'text-brand-amber'}`}>{message}</p>}
      {allDone && <p className="text-center text-brand-lime font-bold text-lg mb-4">{t('unit8.allMatched')}</p>}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <h4 className="text-gray-400 text-xs uppercase mb-2">{t('unit8.examples')}</h4>
          <div className="space-y-2">
            {examples.map(ex => (
              <button key={ex.name} onClick={() => handleExampleClick(ex)} disabled={matched[ex.name]} className={`w-full text-start p-3 rounded-xl text-sm font-semibold transition-all ${matched[ex.name] ? 'bg-brand-lime/15 text-brand-lime border border-brand-lime/30' : selectedExample === ex.name ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : 'glass-card text-gray-400 hover:text-white'}`}>
                {ex.icon} {ex.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-gray-400 text-xs uppercase mb-2">{t('unit8.energyTypes')}</h4>
          <div className="space-y-2">
            {types.map(tp => (
              <button key={tp.type} onClick={() => handleTypeClick(tp.type)} className={`w-full text-start p-3 rounded-xl text-sm transition-all glass-card hover:bg-white/5`}>
                <span className={`font-bold ${tp.color}`}>{tp.label}</span>
                <span className="text-gray-500 text-xs ms-2">({tp.desc})</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ 2. KE CALCULATOR ═══ */
function KECalculator() {
  const t = useT();
  const [mass, setMass] = useState(2);
  const [speed, setSpeed] = useState(3);
  const ke = 0.5 * mass * speed * speed;

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div><label className="text-gray-400 text-sm block mb-2">{t('unit8.massKg').replace('{mass}', String(mass))}</label><input type="range" min="0.1" max="50" step="0.1" value={mass} onChange={e => setMass(Number(e.target.value))} className="w-full accent-brand-purple" /></div>
        <div><label className="text-gray-400 text-sm block mb-2">{t('unit8.speedMs').replace('{speed}', String(speed))}</label><input type="range" min="0" max="100" value={speed} onChange={e => setSpeed(Number(e.target.value))} className="w-full accent-brand-cyan" /></div>
      </div>
      <div className="formula-box rounded-2xl p-6 text-center">
        <p className="text-gray-400 text-xs uppercase mb-2">KE = ½mv²</p>
        <p className="text-3xl font-space font-bold text-brand-purple">KE = ½ × {mass} × {speed}² = <span className="text-brand-cyan">{ke.toFixed(1)} J</span></p>
      </div>
    </div>
  );
}

/* ═══ 3. PE SIM ═══ */
function PESim() {
  const t = useT();
  const [mass, setMass] = useState(2);
  const [height, setHeight] = useState(5);
  const g = 9.8;
  const pe = mass * g * height;

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div><label className="text-gray-400 text-sm block mb-2">{t('unit8.massKg').replace('{mass}', String(mass))}</label><input type="range" min="0.1" max="50" step="0.1" value={mass} onChange={e => setMass(Number(e.target.value))} className="w-full accent-brand-pink" /></div>
        <div><label className="text-gray-400 text-sm block mb-2">{t('unit8.heightM').replace('{height}', String(height))}</label><input type="range" min="0" max="100" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full accent-brand-amber" /></div>
      </div>
      <div className="formula-box rounded-2xl p-6 text-center">
        <p className="text-gray-400 text-xs uppercase mb-2">PE = mgh</p>
        <p className="text-3xl font-space font-bold text-brand-pink">PE = {mass} × {g} × {height} = <span className="text-brand-cyan">{pe.toFixed(1)} J</span></p>
      </div>
    </div>
  );
}

/* ═══ 4. ENERGY CONVERSION CHAIN ═══ */
function EnergyConversionChain() {
  const t = useT();
  const [chain, setChain] = useState<string[]>([]);
  const forms = [
    { name: 'Solar', icon: '☀️', color: 'text-brand-amber' },
    { name: 'Electrical', icon: '⚡', color: 'text-brand-cyan' },
    { name: 'Heat', icon: '🔥', color: 'text-brand-rose' },
    { name: 'Kinetic', icon: '🏃', color: 'text-brand-purple' },
    { name: 'Sound', icon: '🔊', color: 'text-brand-pink' },
    { name: 'Light', icon: '💡', color: 'text-brand-lime' },
  ];

  return (
    <div>
      <p className="text-gray-400 text-sm mb-4">{t('unit8.clickForms')}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {forms.map(f => (
          <button key={f.name} onClick={() => setChain([...chain, f.name])} className={`glass-card px-3 py-2 rounded-xl text-sm font-semibold ${f.color} hover:bg-white/5`}>
            {f.icon} {f.name}
          </button>
        ))}
      </div>
      {chain.length > 0 && (
        <div className="formula-box rounded-xl p-4 mb-4">
          <p className="text-white font-space text-lg">{chain.map((c, i) => <span key={i}>{i > 0 && <span className="text-gray-500 mx-2">→</span>}<span className="text-brand-cyan">{c}</span></span>)}</p>
        </div>
      )}
      <button onClick={() => setChain([])} className="mx-auto block text-xs text-gray-500 hover:text-white flex items-center gap-1"><RotateCcw size={12} /> {t('unit8.resetChain')}</button>
    </div>
  );
}

/* ═══ 5. PENDULUM SIM ═══ */
function PendulumSim() {
  const t = useT();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const w = canvas.width, h = canvas.height;
      const time = Date.now() * 0.002;
      const angle = Math.sin(time) * 0.8;
      const len = 120;
      const cx = w / 2, cy = 30;
      const bx = cx + Math.sin(angle) * len;
      const by = cy + Math.cos(angle) * len;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#7c3aed'; ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(bx, by); ctx.stroke();
      ctx.fillStyle = '#06b6d4'; ctx.beginPath(); ctx.arc(bx, by, 15, 0, Math.PI * 2); ctx.fill();
      const pe = Math.abs(angle) / 0.8;
      const ke = 1 - pe;
      ctx.fillStyle = '#ec4899'; ctx.font = '12px Poppins'; ctx.textAlign = 'left';
      ctx.fillText(`PE: ${(pe * 100).toFixed(0)}%`, 20, h - 40);
      ctx.fillStyle = '#06b6d4'; ctx.fillText(`KE: ${(ke * 100).toFixed(0)}%`, 20, h - 20);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div>
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 overflow-hidden mb-4" style={{ height: 220 }}>
        <canvas ref={canvasRef} width={300} height={220} className="w-full" style={{ maxWidth: 300, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="glass-card rounded-xl p-4"><p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit8.conservationNote') }}></p></div>
    </div>
  );
}

/* ═══ 6. POWER COMPARISON ═══ */
function PowerComparison() {
  const t = useT();
  const [time, setTime] = useState(1);
  const appliances = [
    { name: 'LED Bulb', power: 10, color: 'text-brand-lime' },
    { name: 'Fan', power: 75, color: 'text-brand-cyan' },
    { name: 'TV', power: 100, color: 'text-brand-purple' },
    { name: 'AC', power: 1500, color: 'text-brand-rose' },
    { name: 'Iron', power: 1000, color: 'text-brand-amber' },
    { name: 'Heater', power: 2000, color: 'text-brand-pink' },
  ];

  return (
    <div>
      <div className="mb-4"><label className="text-gray-400 text-sm block mb-2">{t('unit8.timeHours').replace('{time}', String(time))}</label><input type="range" min="0.5" max="24" step="0.5" value={time} onChange={e => setTime(Number(e.target.value))} className="w-full accent-brand-teal" /></div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        {appliances.map(a => (
          <div key={a.name} className="glass-card rounded-xl p-3 text-center">
            <p className={`font-bold text-sm ${a.color}`}>{a.name}</p>
            <p className="text-white text-lg font-space font-bold">{a.power} W</p>
            <p className="text-gray-500 text-xs">{(a.power * time / 1000).toFixed(2)} kWh</p>
          </div>
        ))}
      </div>
      <div className="formula-box rounded-xl p-4 text-center">
        <p className="text-gray-400 text-xs uppercase mb-1">{t('unit8.totalEnergyUsed')}</p>
        <p className="text-xl font-space font-bold text-brand-teal">E = P × t</p>
      </div>
    </div>
  );
}

/* ═══ 7. EFFICIENCY CALCULATOR ═══ */
function EfficiencyCalculator() {
  const t = useT();
  const [input, setInput] = useState(1000);
  const [output, setOutput] = useState(750);
  const efficiency = (output / input) * 100;

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div><label className="text-gray-400 text-sm block mb-2">{t('unit8.inputEnergy').replace('{input}', String(input))}</label><input type="range" min="100" max="5000" step="100" value={input} onChange={e => setInput(Number(e.target.value))} className="w-full accent-brand-cyan" /></div>
        <div><label className="text-gray-400 text-sm block mb-2">{t('unit8.outputEnergy').replace('{output}', String(output))}</label><input type="range" min="0" max={input} step="100" value={output} onChange={e => setOutput(Number(e.target.value))} className="w-full accent-brand-pink" /></div>
      </div>
      <div className="formula-box rounded-2xl p-6 text-center mb-4">
        <p className="text-gray-400 text-xs uppercase mb-2">{t('unit8.efficiencyFormula')}</p>
        <p className="text-3xl font-space font-bold text-brand-cyan">{efficiency.toFixed(1)}%</p>
        <div className="w-full bg-white/10 rounded-full h-4 mt-3"><div className="h-full rounded-full bg-brand-cyan" style={{ width: `${efficiency}%` }} /></div>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="glass-card rounded-xl p-3 text-center"><p className="text-brand-rose font-bold text-sm">{t('unit8.carEngine')}</p><p className="text-gray-400 text-xs">{t('unit8.carEngineEff')}</p></div>
        <div className="glass-card rounded-xl p-3 text-center"><p className="text-brand-lime font-bold text-sm">{t('unit8.ledBulb')}</p><p className="text-gray-400 text-xs">{t('unit8.ledBulbEff')}</p></div>
        <div className="glass-card rounded-xl p-3 text-center"><p className="text-brand-amber font-bold text-sm">{t('unit8.solarPanel')}</p><p className="text-gray-400 text-xs">{t('unit8.solarPanelEff')}</p></div>
      </div>
    </div>
  );
}

/* ═══ MAIN UNIT 8 CONTENT ═══ */
export default function Unit8Content() {
  const t = useT();
  return (
    <div>
      <Section title={t('unit8.energy')} icon={<Zap size={24} />} color="brand-cyan">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6"><p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit8.energyDef') }}></p></div>
        <h4 className="text-lg font-bold text-white mb-3">{t('unit8.energyTypesTitle')}</h4>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          <div className="glass-card rounded-xl p-3"><p className="text-brand-cyan font-bold text-sm">{t('unit8.typeKinetic')}</p><p className="text-gray-400 text-xs">{t('unit8.typeKineticDesc')}</p></div>
          <div className="glass-card rounded-xl p-3"><p className="text-brand-pink font-bold text-sm">{t('unit8.typePotential')}</p><p className="text-gray-400 text-xs">{t('unit8.typePotentialDesc')}</p></div>
          <div className="glass-card rounded-xl p-3"><p className="text-brand-rose font-bold text-sm">{t('unit8.typeHeat')}</p><p className="text-gray-400 text-xs">{t('unit8.typeHeatDesc')}</p></div>
          <div className="glass-card rounded-xl p-3"><p className="text-brand-lime font-bold text-sm">{t('unit8.typeLight')}</p><p className="text-gray-400 text-xs">{t('unit8.typeLightDesc')}</p></div>
          <div className="glass-card rounded-xl p-3"><p className="text-brand-purple font-bold text-sm">{t('unit8.typeSound')}</p><p className="text-gray-400 text-xs">{t('unit8.typeSoundDesc')}</p></div>
          <div className="glass-card rounded-xl p-3"><p className="text-brand-amber font-bold text-sm">{t('unit8.typeElectrical')}</p><p className="text-gray-400 text-xs">{t('unit8.typeElectricalDesc')}</p></div>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit8.matchingGame')}</h4>
        <EnergyMatchingGame />
      </Section>

      <Section title={t('unit8.kineticEnergy')} icon={<Zap size={24} />} color="brand-purple">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6"><p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit8.keDef') }}></p></div>
        <div className="formula-box rounded-2xl p-5 text-center mb-6"><p className="text-2xl font-space font-bold text-white">{t('unit8.keFormula')}</p><p className="text-gray-400 text-sm mt-2">{t('unit8.keVars')}</p></div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit8.keCalc')}</h4>
        <KECalculator />
      </Section>

      <Section title={t('unit8.potentialEnergy')} icon={<ArrowUp size={24} />} color="brand-pink">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6"><p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit8.peDef') }}></p></div>
        <div className="formula-box rounded-2xl p-5 text-center mb-6"><p className="text-2xl font-space font-bold text-white">{t('unit8.peFormula')}</p><p className="text-gray-400 text-sm mt-2">{t('unit8.peVars')}</p></div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit8.peSim')}</h4>
        <PESim />
      </Section>

      <Section title={t('unit8.energyConversion')} icon={<Recycle size={24} />} color="brand-amber">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6"><p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit8.conversionDef') }}></p></div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit8.conversionChain')}</h4>
        <EnergyConversionChain />
      </Section>

      <Section title={t('unit8.conservation')} icon={<Lightbulb size={24} />} color="brand-lime">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6"><p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit8.conservationDef') }}></p></div>
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          <div className="glass-card rounded-xl p-4"><p className="text-brand-cyan font-bold mb-1">{t('unit8.pendulum')}</p><p className="text-gray-400 text-sm">{t('unit8.pendulumDesc')}</p></div>
          <div className="glass-card rounded-xl p-4"><p className="text-brand-pink font-bold mb-1">{t('unit8.rollerCoaster')}</p><p className="text-gray-400 text-sm">{t('unit8.rollerCoasterDesc')}</p></div>
          <div className="glass-card rounded-xl p-4"><p className="text-brand-amber font-bold mb-1">{t('unit8.fallingBall')}</p><p className="text-gray-400 text-sm">{t('unit8.fallingBallDesc')}</p></div>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit8.pendulumSim')}</h4>
        <PendulumSim />
      </Section>

      <Section title={t('unit8.energyResources')} icon={<Zap size={24} />} color="brand-rose">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="glass-card rounded-2xl p-5"><h4 className="text-brand-lime font-bold text-lg mb-2">{t('unit8.renewableTitle')}</h4><p className="text-gray-300 text-sm">{t('unit8.renewableDesc')}</p><p className="text-brand-lime text-sm mt-2">{t('unit8.renewableExamples')}</p></div>
          <div className="glass-card rounded-2xl p-5"><h4 className="text-brand-rose font-bold text-lg mb-2">{t('unit8.nonRenewableTitle')}</h4><p className="text-gray-300 text-sm">{t('unit8.nonRenewableDesc')}</p><p className="text-brand-rose text-sm mt-2">{t('unit8.nonRenewableExamples')}</p></div>
        </div>
      </Section>

      <Section title={t('unit8.power')} icon={<Gauge size={24} />} color="brand-teal">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6"><p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit8.powerDef') }}></p></div>
        <div className="formula-box rounded-2xl p-5 text-center mb-6"><p className="text-2xl font-space font-bold text-white">{t('unit8.powerFormula')}</p><p className="text-gray-400 text-sm mt-2">{t('unit8.powerUnit')}</p><p className="text-brand-amber text-sm mt-1">{t('unit8.hpNote')}</p></div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit8.powerSim')}</h4>
        <PowerComparison />
      </Section>

      <Section title={t('unit8.efficiency')} icon={<Zap size={24} />} color="brand-cyan">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6"><p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit8.efficiencyDef') }}></p></div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit8.efficiencyCalc')}</h4>
        <EfficiencyCalculator />
      </Section>

      <UnitQuiz unitId="unit8" questions={[
        { question: t('unit8.quiz.q1'), options: [t('unit8.quiz.q1.opt1'), t('unit8.quiz.q1.opt2'), t('unit8.quiz.q1.opt3'), t('unit8.quiz.q1.opt4')], correctIndex: 1 },
        { question: t('unit8.quiz.q2'), options: [t('unit8.quiz.q2.opt1'), t('unit8.quiz.q2.opt2'), t('unit8.quiz.q2.opt3'), t('unit8.quiz.q2.opt4')], correctIndex: 1 },
        { question: t('unit8.quiz.q3'), options: [t('unit8.quiz.q3.opt1'), t('unit8.quiz.q3.opt2'), t('unit8.quiz.q3.opt3'), t('unit8.quiz.q3.opt4')], correctIndex: 2 },
        { question: t('unit8.quiz.q4'), options: [t('unit8.quiz.q4.opt1'), t('unit8.quiz.q4.opt2'), t('unit8.quiz.q4.opt3'), t('unit8.quiz.q4.opt4')], correctIndex: 2 },
        { question: t('unit8.quiz.q5'), options: [t('unit8.quiz.q5.opt1'), t('unit8.quiz.q5.opt2'), t('unit8.quiz.q5.opt3'), t('unit8.quiz.q5.opt4')], correctIndex: 0 },
      ]} />

      <div className="unit-detail-reveal glass-card-strong rounded-3xl p-8 md:p-12 text-center mb-16" style={{ opacity: 0, transform: 'translateY(60px)' }}>
        <h3 className="text-2xl md:text-3xl font-black text-white mb-6">{t('unit8.summary')}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-start">
          <div className="bg-white/5 rounded-xl p-4"><p className="text-brand-purple font-bold text-sm mb-1">{t('unit8.sumKEPE')}</p><p className="text-gray-400 text-xs">{t('unit8.sumKEPEDesc')}</p></div>
          <div className="bg-white/5 rounded-xl p-4"><p className="text-brand-lime font-bold text-sm mb-1">{t('unit8.sumConservation')}</p><p className="text-gray-400 text-xs">{t('unit8.sumConservationDesc')}</p></div>
          <div className="bg-white/5 rounded-xl p-4"><p className="text-brand-teal font-bold text-sm mb-1">{t('unit8.sumPower')}</p><p className="text-gray-400 text-xs">{t('unit8.sumPowerDesc')}</p></div>
          <div className="bg-white/5 rounded-xl p-4"><p className="text-brand-cyan font-bold text-sm mb-1">{t('unit8.sumEfficiency')}</p><p className="text-gray-400 text-xs">{t('unit8.sumEfficiencyDesc')}</p></div>
        </div>
      </div>
    </div>
  );
}
