import { useState, useEffect, useRef } from 'react';
import { RotateCcw, Zap, ArrowUp, Recycle, Lightbulb, Gauge } from 'lucide-react';
import { useT } from '../../i18n/LanguageContext';
import Section from '../Section';
import UnitQuiz from '../UnitQuiz';

/* ─── RUBE GOLDBERG ENERGY CHAIN ─── */
function RubeGoldbergEnergySim() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const steps = [
    { from: 'Chemical (food)', to: 'Kinetic (push ball)', emoji: '🍎→⚽', loss: 30, color: '244,63,94' },
    { from: 'Kinetic (ball rolls)', to: 'Gravitational PE (goes up ramp)', emoji: '⚽→🏔️', loss: 15, color: '245,158,11' },
    { from: 'Gravitational PE', to: 'Kinetic (falls onto lever)', emoji: '🏔️→⚖️', loss: 10, color: '132,204,22' },
    { from: 'Kinetic (lever)', to: 'Elastic PE (spring)', emoji: '⚖️→🔧', loss: 20, color: '6,182,212' },
    { from: 'Elastic PE (spring)', to: 'Kinetic (launches marble)', emoji: '🔧→🔮', loss: 10, color: '124,58,237' },
    { from: 'Kinetic (marble)', to: 'Sound + Heat (hits bell)', emoji: '🔮→🔔', loss: 100, color: '236,72,153' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const barX = 30, barW = w - 60, barH = 30;
    let currentEnergy = 100;

    steps.forEach((s, i) => {
      const y = 20 + i * 45;
      const barWidth = (currentEnergy / 100) * barW;
      const [r, g, b] = s.color.split(',').map(Number);

      // Background track
      ctx.fillStyle = 'rgba(255,255,255,0.03)';
      ctx.fillRect(barX, y, barW, barH);

      // Energy bar
      const isActive = i <= step;
      ctx.fillStyle = isActive ? `rgba(${r},${g},${b},0.4)` : 'rgba(255,255,255,0.05)';
      ctx.fillRect(barX, y, isActive ? barWidth : barW * 0.02, barH);
      ctx.strokeStyle = isActive ? `rgba(${r},${g},${b},0.7)` : 'rgba(255,255,255,0.1)';
      ctx.lineWidth = isActive ? 2 : 1;
      ctx.strokeRect(barX, y, isActive ? barWidth : barW * 0.02, barH);

      // Step label
      ctx.fillStyle = isActive ? '#e2e8f0' : 'rgba(255,255,255,0.3)';
      ctx.font = isActive ? 'bold 10px Poppins' : '10px Poppins';
      ctx.textAlign = 'left';
      ctx.fillText(`Step ${i + 1}: ${s.from} → ${s.to}`, barX + 5, y + 12);

      // Emoji
      ctx.font = '14px serif'; ctx.textAlign = 'right';
      ctx.fillText(s.emoji, barX + barW - 5, y + 15);

      // Loss indicator
      if (isActive && i < steps.length) {
        ctx.fillStyle = 'rgba(244,63,94,0.6)'; ctx.font = '9px Poppins'; ctx.textAlign = 'left';
        ctx.fillText(`−${s.loss}% heat/sound`, barX + barWidth + 5, y + 12);
      }

      if (isActive) currentEnergy = currentEnergy * (1 - s.loss / 100);
    });

    // Final energy
    const finalY = 20 + steps.length * 45 + 10;
    ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = 'bold 12px Poppins'; ctx.textAlign = 'center';
    ctx.fillText(`Useful energy at end: ${currentEnergy.toFixed(1)}% — Rest is heat & sound`, w / 2, finalY);

    // Animate
    if (playing && step < steps.length - 1) {
      const timer = setTimeout(() => setStep(s => s + 1), 1200);
      return () => clearTimeout(timer);
    }
    if (step >= steps.length - 1) setPlaying(false);
  }, [step, playing]);

  const reset = () => { setStep(0); setPlaying(false); };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => { setStep(0); setPlaying(true); }} className="px-6 py-2 rounded-xl text-sm font-semibold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 hover:bg-brand-cyan/30 transition-all">
          ▶ Run Chain
        </button>
        <button onClick={() => setStep(s => Math.min(s + 1, steps.length - 1))} className="px-4 py-2 rounded-xl text-sm font-semibold glass-card text-gray-400 border-white/10">
          Step →
        </button>
        <button onClick={reset} className="px-4 py-2 rounded-xl text-sm font-semibold glass-card text-gray-400 border-white/10">
          ↻ Reset
        </button>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={500} height={320} className="w-full" style={{ maxWidth: 500, margin: '0 auto', display: 'block' }} />
      </div>
      <p className="text-gray-400 text-sm text-center">Energy is conserved but degrades to less useful forms at each step!</p>
    </div>
  );
}

/* ─── WORK-ENERGY THEOREM VISUALIZER ─── */
function WorkEnergyTheoremSim() {
  const [force, setForce] = useState(50);
  const [mass, setMass] = useState(5);
  const [distance, setDistance] = useState(10);
  const [friction, setFriction] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);

  const muK = 0.2;
  const frictionForce = friction ? muK * mass * 9.8 : 0;
  const netForce = force - frictionForce;
  const work = netForce * distance;
  const finalV = Math.sqrt(Math.max(0, 2 * work / mass));
  const ke = 0.5 * mass * finalV ** 2;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const groundY = h - 60;
      const blockW = 50, blockH = 40;
      const startX = 60;
      const endX = startX + distance * 30;
      const blockX = startX + posRef.current * distance * 30;

      // Ground
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      ctx.fillRect(0, groundY, w, 60);
      if (friction) {
        ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 0.5;
        for (let x = 0; x < w; x += 8) {
          ctx.beginPath(); ctx.moveTo(x, groundY); ctx.lineTo(x + 4, groundY + 6); ctx.stroke();
        }
      }

      // Distance markers
      ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(startX, groundY - 5); ctx.lineTo(startX, groundY + 5); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(endX, groundY - 5); ctx.lineTo(endX, groundY + 5); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '10px Poppins'; ctx.textAlign = 'center';
      ctx.fillText(`d = ${distance}m`, (startX + endX) / 2, groundY + 20);

      // Block
      ctx.fillStyle = 'rgba(6,182,212,0.3)';
      ctx.fillRect(blockX, groundY - blockH, blockW, blockH);
      ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 2;
      ctx.strokeRect(blockX, groundY - blockH, blockW, blockH);
      ctx.fillStyle = '#06b6d4'; ctx.font = 'bold 10px Poppins'; ctx.textAlign = 'center';
      ctx.fillText(`${mass}kg`, blockX + blockW / 2, groundY - blockH / 2 + 4);

      // Applied force arrow
      const arrowY = groundY - blockH / 2;
      ctx.strokeStyle = '#84cc16'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(blockX + blockW, arrowY); ctx.lineTo(blockX + blockW + force * 0.8, arrowY); ctx.stroke();
      ctx.fillStyle = '#84cc16';
      ctx.beginPath(); ctx.moveTo(blockX + blockW + force * 0.8, arrowY);
      ctx.lineTo(blockX + blockW + force * 0.8 - 8, arrowY - 5);
      ctx.lineTo(blockX + blockW + force * 0.8 - 8, arrowY + 5);
      ctx.closePath(); ctx.fill();
      ctx.font = 'bold 10px Poppins'; ctx.textAlign = 'left';
      ctx.fillText(`F = ${force}N`, blockX + blockW + force * 0.8 + 5, arrowY + 4);

      // Friction arrow
      if (friction && frictionForce > 0) {
        ctx.strokeStyle = '#f43f5e'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(blockX, arrowY + 15); ctx.lineTo(blockX - frictionForce * 0.8, arrowY + 15); ctx.stroke();
        ctx.fillStyle = '#f43f5e';
        ctx.beginPath(); ctx.moveTo(blockX - frictionForce * 0.8, arrowY + 15);
        ctx.lineTo(blockX - frictionForce * 0.8 + 8, arrowY + 10);
        ctx.lineTo(blockX - frictionForce * 0.8 + 8, arrowY + 20);
        ctx.closePath(); ctx.fill();
        ctx.font = '9px Poppins'; ctx.textAlign = 'right';
        ctx.fillText(`f = ${frictionForce.toFixed(0)}N`, blockX - 5, arrowY + 24);
      }

      // Energy bars
      const barX = 30, barW = 40, maxBarH = 120;
      const workH = Math.min((work / 1000) * maxBarH, maxBarH);
      const keH = Math.min((ke / 1000) * maxBarH, maxBarH);
      const heatH = friction ? Math.min((frictionForce * distance / 1000) * maxBarH, maxBarH) : 0;

      // Work bar
      ctx.fillStyle = 'rgba(132,204,22,0.2)'; ctx.fillRect(barX, 30 + maxBarH - workH, barW, workH);
      ctx.strokeStyle = '#84cc16'; ctx.lineWidth = 2; ctx.strokeRect(barX, 30 + maxBarH - workH, barW, workH);
      ctx.fillStyle = '#84cc16'; ctx.font = '9px Poppins'; ctx.textAlign = 'center';
      ctx.fillText('W', barX + barW / 2, 30 + maxBarH + 15);
      ctx.fillText(`${work.toFixed(0)}J`, barX + barW / 2, 30 + maxBarH - workH - 5);

      // KE bar
      ctx.fillStyle = 'rgba(6,182,212,0.2)'; ctx.fillRect(barX + barW + 10, 30 + maxBarH - keH, barW, keH);
      ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 2; ctx.strokeRect(barX + barW + 10, 30 + maxBarH - keH, barW, keH);
      ctx.fillStyle = '#06b6d4'; ctx.font = '9px Poppins';
      ctx.fillText('KE', barX + barW * 1.5 + 10, 30 + maxBarH + 15);
      ctx.fillText(`${ke.toFixed(0)}J`, barX + barW * 1.5 + 10, 30 + maxBarH - keH - 5);

      // Heat bar (if friction)
      if (friction) {
        ctx.fillStyle = 'rgba(244,63,94,0.2)'; ctx.fillRect(barX + 2 * (barW + 10), 30 + maxBarH - heatH, barW, heatH);
        ctx.strokeStyle = '#f43f5e'; ctx.lineWidth = 2; ctx.strokeRect(barX + 2 * (barW + 10), 30 + maxBarH - heatH, barW, heatH);
        ctx.fillStyle = '#f43f5e'; ctx.font = '9px Poppins';
        ctx.fillText('Heat', barX + 2 * (barW + 10) + barW / 2, 30 + maxBarH + 15);
        ctx.fillText(`${heatH > 0 ? (frictionForce * distance).toFixed(0) : '0'}J`, barX + 2 * (barW + 10) + barW / 2, 30 + maxBarH - heatH - 5);
      }

      // Formula
      ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '10px Poppins'; ctx.textAlign = 'center';
      ctx.fillText(`W_net = ΔKE → ${netForce.toFixed(0)} × ${distance} = ½ × ${mass} × ${finalV.toFixed(1)}²`, w / 2, h - 10);

      // Info
      ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 11px Poppins'; ctx.textAlign = 'left';
      ctx.fillText(`v_final = ${finalV.toFixed(2)} m/s`, w - 180, 30);

      if (isAnimating) {
        posRef.current += 0.015;
        if (posRef.current >= 1) { posRef.current = 1; setIsAnimating(false); }
        animRef.current = requestAnimationFrame(draw);
      }
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [force, mass, distance, friction, isAnimating]);

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="text-gray-400 text-sm block mb-2">Applied Force: {force} N</label>
          <input type="range" min={10} max={200} value={force} onChange={e => setForce(Number(e.target.value))} className="w-full accent-brand-lime" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">Mass: {mass} kg</label>
          <input type="range" min={1} max={20} value={mass} onChange={e => setMass(Number(e.target.value))} className="w-full accent-brand-cyan" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">Distance: {distance} m</label>
          <input type="range" min={1} max={20} value={distance} onChange={e => setDistance(Number(e.target.value))} className="w-full accent-brand-amber" />
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => { posRef.current = 0; setIsAnimating(true); }} className="px-6 py-2 rounded-xl text-sm font-semibold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 hover:bg-brand-cyan/30 transition-all">
          ▶ Push Block
        </button>
        <button onClick={() => { setFriction(!friction); posRef.current = 0; setIsAnimating(false); }} className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${friction ? 'bg-brand-rose/20 text-brand-rose border-brand-rose/30' : 'glass-card text-gray-400 border-white/10'}`}>
          {friction ? '🔥 Friction ON' : 'Friction OFF'}
        </button>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={500} height={260} className="w-full" style={{ maxWidth: 500, margin: '0 auto', display: 'block' }} />
      </div>
    </div>
  );
}

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
/* ─── ROLLER COASTER ENERGY CONSERVATION ─── */
function RollerCoasterSim() {
  const [initialH, setInitialH] = useState(80);
  const [friction, setFriction] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);

  const trackPoints = [
    { x: 30, y: 0 }, { x: 80, y: 0 }, { x: 140, y: -60 }, { x: 200, y: -20 },
    { x: 260, y: -80 }, { x: 320, y: -30 }, { x: 380, y: -50 }, { x: 440, y: 0 }, { x: 500, y: 0 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;

    const baseY = h - 50;
    const scale = initialH / 80;

    const getYatPos = (t: number) => {
      const idx = t * (trackPoints.length - 1);
      const i = Math.floor(idx);
      const frac = idx - i;
      const p1 = trackPoints[Math.min(i, trackPoints.length - 1)];
      const p2 = trackPoints[Math.min(i + 1, trackPoints.length - 1)];
      return p1.y + (p2.y - p1.y) * frac;
    };

    const draw = () => {
      animRef.current = requestAnimationFrame(draw);
      posRef.current += 0.003;
      if (posRef.current > 1) posRef.current = 0;
      const t = posRef.current;
      ctx.clearRect(0, 0, w, h);

      // Track
      ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 3;
      ctx.beginPath();
      trackPoints.forEach((p, i) => {
        const x = p.x;
        const y = baseY + p.y * scale;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Hills (filled)
      ctx.fillStyle = 'rgba(124,58,237,0.1)';
      ctx.beginPath(); ctx.moveTo(trackPoints[0].x, baseY);
      trackPoints.forEach(p => ctx.lineTo(p.x, baseY + p.y * scale));
      ctx.lineTo(trackPoints[trackPoints.length - 1].x, baseY); ctx.closePath(); ctx.fill();

      // Cart position
      const cartY = getYatPos(t);
      const cartX = 30 + t * 470;
      const cartScreenY = baseY + cartY * scale;

      // Energy values
      const maxH = 80;
      const currentH = -cartY;
      const heightRatio = currentH / maxH;
      const frictionLoss = friction ? t * 0.3 : 0;
      const pe = Math.max(0, heightRatio * 100 - frictionLoss * 100);
      const ke = Math.max(0, (1 - heightRatio) * 100 * (1 - frictionLoss * 0.3));
      const thermal = friction ? frictionLoss * 100 : 0;
      const total = pe + ke + thermal;

      // Cart
      ctx.fillStyle = '#f43f5e'; ctx.fillRect(cartX - 10, cartScreenY - 15, 20, 12);
      ctx.fillStyle = '#e2e8f0'; ctx.font = '8px Poppins'; ctx.textAlign = 'center';
      ctx.fillText('CART', cartX, cartScreenY - 18);

      // Energy bars
      const barX = 20, barW = 12, barH = 100;
      const drawBar = (x: number, val: number, color: string, label: string) => {
        ctx.fillStyle = 'rgba(255,255,255,0.05)'; ctx.fillRect(x, 20, barW, barH);
        ctx.fillStyle = color; ctx.fillRect(x, 20 + barH - val, barW, val);
        ctx.fillStyle = '#94a3b8'; ctx.font = '9px Poppins'; ctx.textAlign = 'center';
        ctx.fillText(label, x + barW / 2, 20 + barH + 14);
        ctx.fillText(`${val.toFixed(0)}`, x + barW / 2, 15);
      };

      drawBar(barX, pe, '#84cc16', 'PE');
      drawBar(barX + 25, ke, '#06b6d4', 'KE');
      if (friction) drawBar(barX + 50, thermal, '#f59e0b', 'Heat');
      drawBar(barX + (friction ? 75 : 50), total, '#a78bfa', 'Total');

      // Current values
      ctx.fillStyle = '#e2e8f0'; ctx.font = '11px Poppins'; ctx.textAlign = 'left';
      ctx.fillText(`Height: ${currentH.toFixed(0)} m`, 150, 30);
      ctx.fillText(`Speed: ${Math.sqrt(Math.max(0, 2 * 9.8 * currentH * Math.max(0, 1 - frictionLoss * 0.3))).toFixed(1)} m/s`, 150, 48);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [initialH, friction]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div><label className="text-gray-400 text-xs block mb-1">Initial Height: {initialH} m</label><input type="range" min={30} max={100} step={5} value={initialH} onChange={e => setInitialH(Number(e.target.value))} className="w-full accent-brand-lime" /></div>
        <div className="flex items-center gap-3"><label className="text-gray-400 text-sm">Friction:</label>
          <button onClick={() => setFriction(!friction)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${friction ? 'bg-brand-rose/20 text-brand-rose border border-brand-rose/30' : 'glass-card text-gray-400'}`}>{friction ? 'ON' : 'OFF'}</button>
        </div>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={520} height={220} className="w-full" style={{ maxWidth: 520, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="glass-card rounded-xl p-4">
        <p className="text-gray-300 text-sm">{friction ? 'With friction, total energy slowly converts to heat — the cart eventually stops.' : 'Without friction, total energy is conserved — PE converts to KE and back.'}</p>
      </div>
    </div>
  );
}

/* ─── ELASTIC COLLISION ENERGY TRANSFER ─── */
function ElasticCollisionSim() {
  const [m1, setM1] = useState(3);
  const [m2, setM2] = useState(5);
  const [v1, setV1] = useState(4);
  const [v2, setV2] = useState(-2);
  const [phase, setPhase] = useState<'setup' | 'colliding' | 'done'>('setup');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef({ x1: 80, x2: 380, v1: 0, v2: 0 });

  const ke1 = 0.5 * m1 * v1 * v1;
  const ke2 = 0.5 * m2 * v2 * v2;

  // Elastic collision formulas
  const v1f = ((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2);
  const v2f = ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2);
  const ke1f = 0.5 * m1 * v1f * v1f;
  const ke2f = 0.5 * m2 * v2f * v2f;

  const startCollision = () => {
    setPhase('colliding');
    posRef.current = { x1: 80, x2: 380, v1: v1 * 2, v2: v2 * 2 };
  };

  const reset = () => {
    setPhase('setup');
    posRef.current = { x1: 80, x2: 380, v1: 0, v2: 0 };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;

    const draw = () => {
      animRef.current = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, w, h);

      const p = posRef.current;
      if (phase === 'colliding') {
        p.x1 += p.v1;
        p.x2 += p.v2;

        // Collision detection
        if (p.x1 + 25 >= p.x2 - 25) {
          const sv1 = p.v1 / 2;
          const sv2 = p.v2 / 2;
          p.v1 = ((m1 - m2) * sv1 + 2 * m2 * sv2) / (m1 + m2) * 2;
          p.v2 = ((m2 - m1) * sv2 + 2 * m1 * sv1) / (m1 + m2) * 2;
          p.x1 = p.x2 - 50;
        }

        if (p.x1 > w + 50 || p.x2 < -50) {
          setPhase('done');
        }
      }

      const y = h / 2;
      const r1 = 15 + m1 * 3;
      const r2 = 15 + m2 * 3;

      // Surface
      ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, y + r2 + 5); ctx.lineTo(w, y + r2 + 5); ctx.stroke();

      // Ball 1
      ctx.fillStyle = phase === 'done' ? 'rgba(132,204,22,0.3)' : 'rgba(6,182,212,0.3)';
      ctx.strokeStyle = phase === 'done' ? '#84cc16' : '#06b6d4'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(phase === 'setup' ? 80 : posRef.current.x1, y, r1, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 10px Poppins'; ctx.textAlign = 'center';
      ctx.fillText(`${m1}kg`, phase === 'setup' ? 80 : posRef.current.x1, y + 4);

      // Ball 2
      ctx.fillStyle = phase === 'done' ? 'rgba(244,63,94,0.3)' : 'rgba(245,158,11,0.3)';
      ctx.strokeStyle = phase === 'done' ? '#f43f5e' : '#f59e0b'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(phase === 'setup' ? 380 : posRef.current.x2, y, r2, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 10px Poppins'; ctx.textAlign = 'center';
      ctx.fillText(`${m2}kg`, phase === 'setup' ? 380 : posRef.current.x2, y + 4);

      // Velocity arrows in setup
      if (phase === 'setup') {
        ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(80, y - r1 - 10); ctx.lineTo(80 + v1 * 10, y - r1 - 10); ctx.stroke();
        ctx.fillStyle = '#06b6d4'; ctx.font = '10px Poppins'; ctx.fillText(`${v1} m/s →`, 80 + v1 * 5, y - r1 - 15);

        ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(380, y - r2 - 10); ctx.lineTo(380 + v2 * 10, y - r2 - 10); ctx.stroke();
        ctx.fillStyle = '#f59e0b'; ctx.fillText(`← ${Math.abs(v2)} m/s`, 380 + v2 * 5, y - r2 - 15);
      }
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [phase, m1, m2, v1, v2]);

  return (
    <div>
      <div className="grid grid-cols-4 gap-3 mb-4">
        <div><label className="text-gray-400 text-xs block mb-1">Mass 1: {m1} kg</label><input type="range" min={1} max={10} step={1} value={m1} onChange={e => { setM1(Number(e.target.value)); reset(); }} className="w-full accent-brand-cyan" /></div>
        <div><label className="text-gray-400 text-xs block mb-1">Mass 2: {m2} kg</label><input type="range" min={1} max={10} step={1} value={m2} onChange={e => { setM2(Number(e.target.value)); reset(); }} className="w-full accent-brand-amber" /></div>
        <div><label className="text-gray-400 text-xs block mb-1">v₁: {v1} m/s</label><input type="range" min={-8} max={8} step={0.5} value={v1} onChange={e => { setV1(Number(e.target.value)); reset(); }} className="w-full accent-brand-cyan" /></div>
        <div><label className="text-gray-400 text-xs block mb-1">v₂: {v2} m/s</label><input type="range" min={-8} max={8} step={0.5} value={v2} onChange={e => { setV2(Number(e.target.value)); reset(); }} className="w-full accent-brand-amber" /></div>
      </div>
      <div className="flex gap-2 mb-4">
        <button onClick={startCollision} disabled={phase === 'colliding'} className="px-4 py-2 rounded-xl text-sm font-semibold bg-brand-purple/20 text-brand-purple border border-brand-purple/30 disabled:opacity-50">Collide!</button>
        <button onClick={reset} className="px-4 py-2 rounded-xl text-sm font-semibold glass-card text-gray-400"><RotateCcw size={14} className="inline me-1" /> Reset</button>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={500} height={150} className="w-full" style={{ maxWidth: 500, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-400 text-xs uppercase mb-2 font-bold">Before Collision</p>
          <div className="space-y-1">
            <div className="flex justify-between formula-box rounded-lg px-3 py-1.5"><span className="text-brand-cyan text-xs">KE₁</span><span className="text-white text-xs font-space">{ke1.toFixed(1)} J</span></div>
            <div className="flex justify-between formula-box rounded-lg px-3 py-1.5"><span className="text-brand-amber text-xs">KE₂</span><span className="text-white text-xs font-space">{ke2.toFixed(1)} J</span></div>
            <div className="flex justify-between formula-box rounded-lg px-3 py-1.5"><span className="text-brand-lime text-xs">Total KE</span><span className="text-white text-xs font-space font-bold">{(ke1 + ke2).toFixed(1)} J</span></div>
          </div>
        </div>
        <div>
          <p className="text-gray-400 text-xs uppercase mb-2 font-bold">After Collision</p>
          <div className="space-y-1">
            <div className="flex justify-between formula-box rounded-lg px-3 py-1.5"><span className="text-brand-cyan text-xs">KE₁'</span><span className="text-white text-xs font-space">{ke1f.toFixed(1)} J</span></div>
            <div className="flex justify-between formula-box rounded-lg px-3 py-1.5"><span className="text-brand-amber text-xs">KE₂'</span><span className="text-white text-xs font-space">{ke2f.toFixed(1)} J</span></div>
            <div className="flex justify-between formula-box rounded-lg px-3 py-1.5"><span className="text-brand-lime text-xs">Total KE</span><span className="text-white text-xs font-space font-bold">{(ke1f + ke2f).toFixed(1)} J</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
        <h4 className="text-lg font-bold text-white mb-4 mt-8">Roller Coaster Energy Conservation</h4>
        <p className="text-gray-400 text-sm mb-4">Watch PE and KE convert as the cart goes over hills. Toggle friction to see energy loss.</p>
        <RollerCoasterSim />
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
        <h4 className="text-lg font-bold text-white mb-4 mt-8">Elastic Collision Energy Transfer</h4>
        <p className="text-gray-400 text-sm mb-4">Adjust masses and velocities, then watch the collision. Total KE is conserved in elastic collisions.</p>
        <ElasticCollisionSim />
      </Section>

      {/* WORK-ENERGY THEOREM */}
      <div className="unit-detail-reveal glass-card rounded-3xl p-8" style={{ opacity: 0, transform: 'translateY(60px)' }}>
        <h2 className="text-3xl font-black mb-2">Work-Energy Theorem</h2>
        <p className="text-gray-400 mb-6">Apply force over a distance and see how work converts to kinetic energy.</p>
        <WorkEnergyTheoremSim />
      </div>

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

      {/* RUBE GOLDBERG ENERGY CHAIN */}
      <div className="unit-detail-reveal glass-card rounded-3xl p-8" style={{ opacity: 0, transform: 'translateY(60px)' }}>
        <h2 className="text-3xl font-black mb-2">Rube Goldberg Energy Chain</h2>
        <p className="text-gray-400 mb-6">Watch energy transform and degrade through a chain of conversions. Each step loses some to heat!</p>
        <RubeGoldbergEnergySim />
      </div>

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
