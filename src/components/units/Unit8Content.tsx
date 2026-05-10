import { useState, useEffect, useRef } from 'react';
import { RotateCcw, Zap, ArrowUp, Recycle, Lightbulb, Gauge } from 'lucide-react';

function Section({ title, icon, children, color = 'brand-cyan' }: { title: string; icon: React.ReactNode; children: React.ReactNode; color?: string }) {
  const colorClasses: Record<string, { bg: string; text: string }> = {
    'brand-cyan': { bg: 'bg-[#06b6d4]/20', text: 'text-[#06b6d4]' },
    'brand-purple': { bg: 'bg-[#7c3aed]/20', text: 'text-[#7c3aed]' },
    'brand-pink': { bg: 'bg-[#ec4899]/20', text: 'text-[#ec4899]' },
    'brand-amber': { bg: 'bg-[#f59e0b]/20', text: 'text-[#f59e0b]' },
    'brand-rose': { bg: 'bg-[#f43f5e]/20', text: 'text-[#f43f5e]' },
    'brand-lime': { bg: 'bg-[#84cc16]/20', text: 'text-[#84cc16]' },
    'brand-teal': { bg: 'bg-[#14b8a6]/20', text: 'text-[#14b8a6]' },
  };
  const c = colorClasses[color] || colorClasses['brand-cyan'];
  return (
    <div className="unit-detail-reveal mb-16" style={{ opacity: 0, transform: 'translateY(60px)' }}>
      <div className="glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden">
        <div className="flex items-center gap-4 mb-8">
          <div className={`w-12 h-12 rounded-2xl ${c.bg} flex items-center justify-center ${c.text}`}>
            {icon}
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ─── 1. ENERGY MATCHING GAME ─── */
function EnergyMatchingGame() {
  const [selectedExample, setSelectedExample] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, boolean>>({});
  const [message, setMessage] = useState('');

  const examples = [
    { name: 'Moving Car', type: 'Kinetic', icon: '🚗' },
    { name: 'Battery', type: 'Chemical', icon: '🔋' },
    { name: 'Stretched Bow', type: 'Potential', icon: '🏹' },
    { name: 'Burning Fire', type: 'Heat', icon: '🔥' },
    { name: 'Sunlight', type: 'Light', icon: '☀️' },
    { name: 'Thunder', type: 'Sound', icon: '⚡' },
  ];

  const energyTypes = ['Kinetic', 'Potential', 'Heat', 'Light', 'Sound', 'Chemical'];

  const handleMatch = (type: string) => {
    if (!selectedExample) {
      setMessage('Click an example first!');
      return;
    }
    const ex = examples.find(e => e.name === selectedExample);
    if (ex && ex.type === type) {
      setMatched({ ...matched, [ex.name]: true });
      setMessage('✅ Correct!');
      setSelectedExample(null);
    } else {
      setMessage('❌ Wrong match!');
      setSelectedExample(null);
    }
  };

  return (
    <div>
      <p className="text-gray-400 text-sm mb-4">Click an example, then click its energy type:</p>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-brand-cyan font-bold text-sm mb-2">Examples:</p>
          <div className="space-y-2">
            {examples.map(ex => (
              <button
                key={ex.name}
                onClick={() => { setSelectedExample(ex.name); setMessage(''); }}
                disabled={matched[ex.name]}
                className={`w-full p-3 rounded-xl text-sm text-left transition-all ${
                  matched[ex.name] ? 'bg-brand-lime/15 text-brand-lime border border-brand-lime/30' :
                  selectedExample === ex.name ? 'bg-brand-cyan/20 text-brand-cyan border-2 border-brand-cyan/60' :
                  'glass-card text-gray-300 hover:bg-white/5'
                }`}
              >
                <span className="mr-2">{ex.icon}</span> {ex.name} {matched[ex.name] && '✓'}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-brand-pink font-bold text-sm mb-2">Energy Types:</p>
          <div className="space-y-2">
            {energyTypes.map(type => (
              <button
                key={type}
                onClick={() => handleMatch(type)}
                className="w-full p-3 rounded-xl text-sm text-left glass-card text-gray-300 hover:bg-white/5 transition-all"
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>
      {message && <p className={`text-center font-bold ${message.includes('✅') ? 'text-brand-lime' : 'text-brand-rose'}`}>{message}</p>}
      {Object.keys(matched).length === examples.length && <p className="text-brand-lime font-bold text-center text-xl mt-3">🎉 All matched!</p>}
    </div>
  );
}

/* ─── 2. KE CALCULATOR ─── */
function KECalculator() {
  const [mass, setMass] = useState(10);
  const [speed, setSpeed] = useState(10);
  const ke = 0.5 * mass * speed * speed;

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-gray-400 text-sm block mb-2">Mass (kg): {mass}</label>
          <input type="range" min="1" max="100" value={mass} onChange={e => setMass(Number(e.target.value))} className="w-full accent-brand-cyan" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">Speed (m/s): {speed}</label>
          <input type="range" min="1" max="50" value={speed} onChange={e => setSpeed(Number(e.target.value))} className="w-full accent-brand-pink" />
        </div>
      </div>
      <div className="formula-box rounded-2xl p-6 text-center">
        <p className="text-gray-400 text-xs uppercase mb-2">KE = ½mv²</p>
        <p className="text-3xl font-space font-bold text-white">KE = ½ × {mass} × {speed}² = <span className="text-brand-cyan">{ke.toLocaleString()} J</span></p>
      </div>
    </div>
  );
}

/* ─── 3. PE SIMULATOR ─── */
function PESimulator() {
  const [height, setHeight] = useState(0);
  const mass = 10;
  const g = 9.8;
  const pe = mass * g * height;

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">Height (m): {height}</label>
        <input type="range" min="0" max="50" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full accent-brand-cyan" />
      </div>
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 p-6 mb-4">
        <div className="flex items-end justify-center gap-4" style={{ height: 120 }}>
          <div className="w-16 bg-brand-purple/20 rounded-t flex items-end justify-center relative" style={{ height: `${20 + height * 1.5}px` }}>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-brand-cyan flex items-center justify-center text-xs font-bold">m</div>
            <span className="text-brand-cyan text-xs font-bold mb-1">{height}m</span>
          </div>
        </div>
        <div className="h-px bg-white/10 mt-2" />
      </div>
      <div className="formula-box rounded-2xl p-5 text-center">
        <p className="text-gray-400 text-xs uppercase mb-2">PE = mgh</p>
        <p className="text-3xl font-space font-bold text-white">PE = {mass} × {g} × {height} = <span className="text-brand-pink">{pe.toFixed(0)} J</span></p>
      </div>
    </div>
  );
}

/* ─── 4. ENERGY CONVERSION CHAIN ─── */
function EnergyConversionChain() {
  const [chain, setChain] = useState<string[]>([]);
  const forms = ['Electrical', 'Light', 'Heat', 'Mechanical', 'Sound', 'Chemical'];

  const addToChain = (form: string) => {
    if (chain.length < 4) setChain([...chain, form]);
  };

  const reset = () => setChain([]);

  return (
    <div>
      <p className="text-gray-400 text-sm mb-3">Click energy forms to build a conversion chain:</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {forms.map(form => (
          <button key={form} onClick={() => addToChain(form)} disabled={chain.length >= 4} className="px-3 py-2 rounded-xl glass-card text-gray-300 text-sm hover:bg-white/5 disabled:opacity-30">
            {form}
          </button>
        ))}
      </div>
      {chain.length > 0 && (
        <div className="formula-box rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {chain.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-brand-cyan/20 text-brand-cyan font-semibold text-sm">{c}</span>
                {i < chain.length - 1 && <span className="text-gray-500">→</span>}
              </span>
            ))}
          </div>
        </div>
      )}
      <button onClick={reset} className="glass-card px-4 py-2 rounded-xl text-gray-400 text-sm hover:text-white flex items-center gap-2">
        <RotateCcw size={14} /> Reset Chain
      </button>

      <div className="grid sm:grid-cols-2 gap-3 mt-6">
        {[
          { from: 'Electrical', to: 'Light + Heat', example: '💡 Light Bulb' },
          { from: 'Sound', to: 'Electrical', example: '🎤 Microphone' },
          { from: 'Light', to: 'Electrical', example: '☀️ Solar Panel' },
          { from: 'Chemical', to: 'Mechanical + Heat', example: '🚗 Car Engine' },
        ].map((item, i) => (
          <div key={i} className="glass-card rounded-xl p-3">
            <p className="text-gray-300 text-sm">{item.example}: <span className="text-brand-cyan">{item.from}</span> → <span className="text-brand-pink">{item.to}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── 5. PENDULUM ENERGY SIM ─── */
function PendulumEnergySim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      const t = Date.now() * 0.002;

      ctx.clearRect(0, 0, w, h);

      const angle = Math.sin(t) * 0.5;
      const cx = w / 2;
      const cy = 30;
      const len = 100;
      const bx = cx + Math.sin(angle) * len;
      const by = cy + Math.cos(angle) * len;

      // String
      ctx.strokeStyle = '#a78bfa';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(bx, by); ctx.stroke();

      // Bob
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath(); ctx.arc(bx, by, 15, 0, Math.PI * 2); ctx.fill();

      // Height indicator
      const maxH = len * (1 - Math.cos(0.5));
      const curH = len * (1 - Math.cos(angle));
      const pe = 1 * 9.8 * curH;
      const ke = 1 * 9.8 * (maxH - curH);

      // Bars
      const barW = 30;
      const maxBarH = 80;
      const peH = (pe / (1 * 9.8 * maxH)) * maxBarH;
      const keH = (ke / (1 * 9.8 * maxH)) * maxBarH;

      // PE bar
      ctx.fillStyle = '#ec4899';
      ctx.fillRect(50, h - 30 - peH, barW, peH);
      ctx.fillStyle = '#ec4899';
      ctx.font = '10px Poppins';
      ctx.textAlign = 'center';
      ctx.fillText('PE', 65, h - 10);

      // KE bar
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(100, h - 30 - keH, barW, keH);
      ctx.fillStyle = '#06b6d4';
      ctx.fillText('KE', 115, h - 10);

      // Total
      ctx.fillStyle = '#f59e0b';
      ctx.fillText(`Total: ${(pe + ke).toFixed(1)} J`, w - 80, h - 10);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={300} height={200} className="w-full" style={{ maxWidth: 300, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="glass-card rounded-xl p-4">
        <p className="text-gray-300 text-sm"><strong className="text-brand-lime">Conservation:</strong> At the top → all PE. At the bottom → all KE. Total energy stays constant!</p>
      </div>
    </div>
  );
}

/* ─── 6. ENERGY RESOURCES INFO ─── */
function EnergyResourcesInfo() {
  const [selected, setSelected] = useState<'solar' | 'wind' | 'hydro' | 'coal' | 'nuclear'>('solar');

  const resources: Record<string, { name: string; type: string; desc: string; pros: string; cons: string; icon: string }> = {
    solar: { name: 'Solar Energy', type: 'Renewable', desc: 'Energy from sunlight using solar panels.', pros: 'Unlimited, clean, no pollution', cons: 'Only works in daylight, needs space', icon: '☀️' },
    wind: { name: 'Wind Energy', type: 'Renewable', desc: 'Energy from wind using turbines.', pros: 'Clean, renewable', cons: 'Needs windy areas, noisy', icon: '🌬️' },
    hydro: { name: 'Hydro Energy', type: 'Renewable', desc: 'Energy from flowing water/dams.', pros: 'Reliable, no pollution', cons: 'Needs rivers, affects wildlife', icon: '💧' },
    coal: { name: 'Coal', type: 'Non-renewable', desc: 'Burned plant remains from millions of years ago.', pros: 'Cheap, abundant', cons: 'High pollution, CO₂ emissions', icon: '⚫' },
    nuclear: { name: 'Nuclear', type: 'Non-renewable', desc: 'Energy from splitting uranium atoms.', pros: 'Very high energy, low CO₂', cons: 'Radioactive waste, accidents', icon: '⚛️' },
  };

  const r = resources[selected];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {(['solar', 'wind', 'hydro', 'coal', 'nuclear'] as const).map(res => (
          <button key={res} onClick={() => setSelected(res)} className={`px-4 py-2 rounded-xl text-sm font-semibold ${selected === res ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : 'glass-card text-gray-400'}`}>
            {resources[res].icon} {resources[res].name}
          </button>
        ))}
      </div>

      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{r.icon}</span>
          <div>
            <h4 className="text-xl font-bold text-white">{r.name}</h4>
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${r.type === 'Renewable' ? 'bg-brand-lime/20 text-brand-lime' : 'bg-brand-rose/20 text-brand-rose'}`}>{r.type}</span>
          </div>
        </div>
        <p className="text-gray-300 text-sm mb-3">{r.desc}</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="bg-brand-lime/10 rounded-xl p-3">
            <p className="text-brand-lime text-xs font-bold mb-1">✅ Pros</p>
            <p className="text-gray-300 text-sm">{r.pros}</p>
          </div>
          <div className="bg-brand-rose/10 rounded-xl p-3">
            <p className="text-brand-rose text-xs font-bold mb-1">❌ Cons</p>
            <p className="text-gray-300 text-sm">{r.cons}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── 7. POWER COMPARISON ─── */
function PowerComparison() {
  const [time, setTime] = useState(1);
  const appliances = [
    { name: 'LED Bulb', power: 10, icon: '💡' },
    { name: 'Fan', power: 75, icon: '🌀' },
    { name: 'Heater', power: 1500, icon: '🔥' },
  ];
  const totalEnergy = appliances.reduce((s, a) => s + a.power * time * 3600, 0);

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">Time (hours): {time}</label>
        <input type="range" min="1" max="24" value={time} onChange={e => setTime(Number(e.target.value))} className="w-full accent-brand-cyan" />
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mb-4">
        {appliances.map(app => (
          <div key={app.name} className="glass-card rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">{app.icon}</div>
            <p className="text-white font-bold text-sm">{app.name}</p>
            <p className="text-brand-cyan font-space font-bold text-xl">{app.power} W</p>
            <p className="text-gray-500 text-xs">{(app.power * time).toLocaleString()} Wh</p>
          </div>
        ))}
      </div>

      <div className="formula-box rounded-2xl p-5 text-center">
        <p className="text-gray-400 text-xs uppercase mb-2">Total Energy Used</p>
        <p className="text-3xl font-space font-bold text-white">{totalEnergy.toLocaleString()} J</p>
        <p className="text-gray-400 text-sm mt-1">= {(totalEnergy / 3600000).toFixed(2)} kWh</p>
      </div>
    </div>
  );
}

/* ─── 8. EFFICIENCY CALCULATOR ─── */
function EfficiencyCalc() {
  const [input, setInput] = useState(1000);
  const [output, setOutput] = useState(250);
  const efficiency = (output / input) * 100;

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-gray-400 text-sm block mb-2">Input Energy (J): {input}</label>
          <input type="range" min="100" max="5000" step="100" value={input} onChange={e => setInput(Number(e.target.value))} className="w-full accent-brand-cyan" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">Output Energy (J): {output}</label>
          <input type="range" min="10" max={input} step="10" value={output} onChange={e => setOutput(Number(e.target.value))} className="w-full accent-brand-pink" />
        </div>
      </div>

      <div className="formula-box rounded-2xl p-6 text-center mb-4">
        <p className="text-gray-400 text-xs uppercase mb-2">Efficiency = (Output / Input) × 100</p>
        <p className="text-4xl font-space font-bold text-white">{efficiency.toFixed(1)}<span className="text-2xl">%</span></p>
      </div>

      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 p-4 mb-4">
        <div className="w-full h-6 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-brand-rose to-brand-lime transition-all" style={{ width: `${efficiency}%` }} />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="glass-card rounded-xl p-3">
          <p className="text-brand-rose text-xs font-bold">🚗 Car Engine</p>
          <p className="text-gray-400 text-xs">~25% efficient</p>
        </div>
        <div className="glass-card rounded-xl p-3">
          <p className="text-brand-lime text-xs font-bold">💡 LED Bulb</p>
          <p className="text-gray-400 text-xs">~80% efficient</p>
        </div>
        <div className="glass-card rounded-xl p-3">
          <p className="text-brand-amber text-xs font-bold">☀️ Solar Panel</p>
          <p className="text-gray-400 text-xs">~20% efficient</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN UNIT 8 CONTENT
   ═══════════════════════════════════════════════════════════ */
export default function Unit8Content() {
  return (
    <div>
      {/* 1. ENERGY */}
      <Section title="Energy" icon={<Zap size={24} />} color="brand-cyan">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed">
            <strong className="text-brand-cyan">Energy</strong> is the <strong>capacity to do work</strong>. Energy is measured in <strong className="text-brand-amber">Joules (J)</strong>.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {[
            { name: 'Kinetic', desc: 'Motion energy', icon: '🏃' },
            { name: 'Potential', desc: 'Stored energy', icon: '⬆️' },
            { name: 'Heat', desc: 'Thermal energy', icon: '🔥' },
            { name: 'Light', desc: 'Radiant energy', icon: '💡' },
            { name: 'Sound', desc: 'Wave energy', icon: '🔊' },
            { name: 'Electrical', desc: 'Electricity', icon: '⚡' },
          ].map(e => (
            <div key={e.name} className="glass-card rounded-xl p-4">
              <p className="text-2xl mb-1">{e.icon}</p>
              <p className="text-white font-bold text-sm">{e.name}</p>
              <p className="text-gray-400 text-xs">{e.desc}</p>
            </div>
          ))}
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Energy Matching Game</h4>
        <EnergyMatchingGame />
      </Section>

      {/* 2. KINETIC ENERGY */}
      <Section title="Kinetic Energy" icon={<ArrowUp size={24} />} color="brand-purple">
        <div className="definition-highlight rounded-2xl p-6 mb-6">
          <p className="text-xl text-white leading-relaxed">
            <strong className="text-brand-purple">Kinetic Energy</strong> is the energy possessed by a body due to its <strong>motion</strong>.
          </p>
        </div>
        <div className="formula-box rounded-2xl p-6 text-center mb-6">
          <p className="text-3xl font-space font-black text-white">KE = ½<span className="text-brand-cyan">m</span><span className="text-brand-pink">v</span>²</p>
          <p className="text-gray-400 text-sm mt-2">m = mass (kg), v = velocity (m/s)</p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Kinetic Energy Calculator</h4>
        <KECalculator />
      </Section>

      {/* 3. POTENTIAL ENERGY */}
      <Section title="Gravitational Potential Energy" icon={<ArrowUp size={24} />} color="brand-pink">
        <div className="definition-highlight rounded-2xl p-6 mb-6">
          <p className="text-xl text-white leading-relaxed">
            <strong className="text-brand-pink">Potential Energy</strong> is energy stored due to position in a gravitational field.
          </p>
        </div>
        <div className="formula-box rounded-2xl p-6 text-center mb-6">
          <p className="text-3xl font-space font-black text-white">PE = <span className="text-brand-cyan">m</span><span className="text-brand-amber">g</span><span className="text-brand-pink">h</span></p>
          <p className="text-gray-400 text-sm mt-2">m = mass, g = 9.8 m/s², h = height (m)</p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Lift Object Simulation</h4>
        <PESimulator />
      </Section>

      {/* 4. ENERGY CONVERSION */}
      <Section title="Energy Conversion" icon={<Recycle size={24} />} color="brand-amber">
        <div className="definition-highlight rounded-2xl p-6 mb-6">
          <p className="text-xl text-white leading-relaxed">
            Energy <strong>changes from one form to another</strong>. Energy cannot be created or destroyed, only converted.
          </p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Energy Conversion Chain</h4>
        <EnergyConversionChain />
      </Section>

      {/* 5. CONSERVATION OF ENERGY */}
      <Section title="Law of Conservation of Energy" icon={<Recycle size={24} />} color="brand-lime">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed">
            Energy <strong>cannot be created or destroyed</strong>. It can only be transformed from one form to another. <strong className="text-brand-lime">Total energy remains constant</strong>.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-cyan font-bold mb-1">⚖️ Pendulum</p>
            <p className="text-gray-400 text-sm">PE (top) → KE (bottom) → PE (other side)</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-pink font-bold mb-1">🎢 Roller Coaster</p>
            <p className="text-gray-400 text-sm">PE at top → KE at bottom</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-amber font-bold mb-1">🏀 Falling Ball</p>
            <p className="text-gray-400 text-sm">PE → KE as it falls</p>
          </div>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Pendulum Energy Simulation</h4>
        <PendulumEnergySim />
      </Section>

      {/* 6. ENERGY RESOURCES */}
      <Section title="Energy Resources" icon={<Lightbulb size={24} />} color="brand-rose">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="definition-highlight rounded-2xl p-5">
            <h4 className="text-brand-lime font-bold text-lg mb-2">🌱 Renewable</h4>
            <p className="text-gray-300 text-sm">Can be replenished naturally.</p>
            <p className="text-gray-400 text-xs mt-2">Solar, Wind, Hydro, Biomass, Geothermal</p>
          </div>
          <div className="definition-highlight rounded-2xl p-5" style={{ borderLeftColor: '#f43f5e' }}>
            <h4 className="text-brand-rose font-bold text-lg mb-2">⛽ Non-renewable</h4>
            <p className="text-gray-300 text-sm">Finite supply, will run out.</p>
            <p className="text-gray-400 text-xs mt-2">Coal, Oil, Natural Gas, Nuclear</p>
          </div>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Energy Resource Info</h4>
        <EnergyResourcesInfo />
      </Section>

      {/* 7. POWER */}
      <Section title="Power" icon={<Gauge size={24} />} color="brand-teal">
        <div className="definition-highlight rounded-2xl p-6 mb-6">
          <p className="text-xl text-white leading-relaxed">
            <strong className="text-brand-teal">Power</strong> is the <strong>rate of doing work</strong> or transferring energy.
          </p>
        </div>
        <div className="formula-box rounded-2xl p-6 text-center mb-6">
          <p className="text-3xl font-space font-black text-white">P = <span className="text-brand-cyan">W</span>/<span className="text-brand-pink">t</span> = <span className="text-brand-amber">E</span>/<span className="text-brand-rose">t</span></p>
          <p className="text-brand-teal font-space font-bold mt-2">Unit: Watt (W) = J/s</p>
          <p className="text-gray-400 text-sm mt-1">1 horsepower (hp) = 746 W</p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Appliance Power Comparison</h4>
        <PowerComparison />
      </Section>

      {/* 8. EFFICIENCY */}
      <Section title="Efficiency" icon={<Gauge size={24} />} color="brand-cyan">
        <div className="definition-highlight rounded-2xl p-6 mb-6">
          <p className="text-xl text-white leading-relaxed">
            <strong className="text-brand-cyan">Efficiency</strong> is the ratio of useful output to total input. Always <strong>less than 100%</strong> — some energy is lost as heat.
          </p>
        </div>
        <div className="formula-box rounded-2xl p-5 text-center mb-6">
          <p className="text-2xl font-space font-bold text-white">Efficiency = (Useful Output / Total Input) × 100%</p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Efficiency Calculator</h4>
        <EfficiencyCalc />
      </Section>

      {/* Quick Summary */}
      <div className="unit-detail-reveal glass-card-strong rounded-3xl p-8 md:p-12 text-center mb-16" style={{ opacity: 0, transform: 'translateY(60px)' }}>
        <h3 className="text-2xl md:text-3xl font-black text-white mb-6">📝 Unit 8 Quick Summary</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-cyan font-bold text-sm mb-1">KE & PE</p>
            <p className="text-gray-400 text-xs">KE = ½mv², PE = mgh</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-lime font-bold text-sm mb-1">Conservation</p>
            <p className="text-gray-400 text-xs">Energy cannot be created or destroyed.</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-teal font-bold text-sm mb-1">Power</p>
            <p className="text-gray-400 text-xs">P = W/t. Unit: Watt (W).</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-amber font-bold text-sm mb-1">Efficiency</p>
            <p className="text-gray-400 text-xs">(Output/Input) × 100%. Always &lt; 100%.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
