import { useState, useEffect } from 'react';
import { Thermometer, Flame, Snowflake, Wind, Gauge } from 'lucide-react';

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

/* ─── 1. THERMOMETER ─── */
function VirtualThermometer() {
  const [celsius, setCelsius] = useState(20);
  const kelvin = celsius + 273;
  const fahrenheit = (celsius * 9 / 5) + 32;

  const getColor = () => {
    if (celsius < 0) return '#06b6d4';
    if (celsius < 20) return '#84cc16';
    if (celsius < 40) return '#f59e0b';
    return '#f43f5e';
  };

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">Temperature: {celsius}°C</label>
        <input type="range" min="-50" max="150" value={celsius} onChange={e => setCelsius(Number(e.target.value))} className="w-full" style={{ accentColor: getColor() }} />
      </div>

      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 p-6 mb-4">
        <div className="flex justify-center">
          <div className="relative w-16">
            {/* Thermometer tube */}
            <div className="w-6 h-40 bg-white/5 rounded-full mx-auto relative overflow-hidden border border-white/10">
              <div className="absolute bottom-0 left-0 right-0 rounded-b-full transition-all duration-300" style={{ height: `${Math.max(5, Math.min(100, (celsius + 50) / 200 * 100))}%`, backgroundColor: getColor() }} />
            </div>
            {/* Bulb */}
            <div className="w-10 h-10 rounded-full mx-auto -mt-1 border-2 border-white/10" style={{ backgroundColor: getColor() }} />
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">Celsius</p>
          <p className="text-2xl font-space font-bold" style={{ color: getColor() }}>{celsius}°C</p>
        </div>
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">Kelvin</p>
          <p className="text-2xl font-space font-bold text-brand-pink">{kelvin} K</p>
        </div>
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">Fahrenheit</p>
          <p className="text-2xl font-space font-bold text-brand-amber">{fahrenheit.toFixed(1)}°F</p>
        </div>
      </div>

      <div className="formula-box rounded-2xl p-4 mt-4 text-center">
        <p className="text-white font-space font-bold">K = °C + 273 | °F = (°C × 9/5) + 32</p>
      </div>
    </div>
  );
}

/* ─── 2. THERMAL EXPANSION ─── */
function ThermalExpansionSim() {
  const [temp, setTemp] = useState(0);
  const alpha = 1.2e-5; // steel
  const L0 = 100;
  const deltaL = alpha * L0 * temp;
  const newL = L0 + deltaL;

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">Temperature: {temp}°C</label>
        <input type="range" min="0" max="200" value={temp} onChange={e => setTemp(Number(e.target.value))} className="w-full accent-brand-amber" />
      </div>

      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 p-6 mb-4">
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <p className="text-gray-500 text-xs mb-1">Original</p>
            <div className="h-4 bg-brand-cyan/30 rounded" style={{ width: 100 }} />
            <p className="text-brand-cyan text-xs mt-1">{L0} cm</p>
          </div>
          <span className="text-gray-500">→</span>
          <div className="text-center">
            <p className="text-gray-500 text-xs mb-1">After Heating</p>
            <div className="h-4 bg-brand-rose/30 rounded transition-all" style={{ width: newL }} />
            <p className="text-brand-rose text-xs mt-1">{newL.toFixed(2)} cm</p>
          </div>
        </div>
      </div>

      <div className="formula-box rounded-2xl p-5 text-center">
        <p className="text-xl font-space font-bold text-white">ΔL = αL₀ΔT = {deltaL.toFixed(3)} cm</p>
        <p className="text-gray-400 text-sm mt-2">New Length = {newL.toFixed(2)} cm</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mt-4">
        <div className="glass-card rounded-xl p-3">
          <p className="text-brand-cyan text-xs font-bold">🌉 Bridges</p>
          <p className="text-gray-400 text-xs">Expansion joints allow movement</p>
        </div>
        <div className="glass-card rounded-xl p-3">
          <p className="text-brand-pink text-xs font-bold">🫙 Metal Lids</p>
          <p className="text-gray-400 text-xs">Loosen when heated</p>
        </div>
        <div className="glass-card rounded-xl p-3">
          <p className="text-brand-amber text-xs font-bold">🎈 Balloon</p>
          <p className="text-gray-400 text-xs">Expands in hot water</p>
        </div>
      </div>
    </div>
  );
}

/* ─── 3. SPECIFIC HEAT ─── */
function SpecificHeatSim() {
  const [material, setMaterial] = useState<'water' | 'iron' | 'sand'>('water');
  const [mass, setMass] = useState(1);
  const [deltaT, setDeltaT] = useState(50);

  const materials: Record<string, { name: string; c: number; color: string }> = {
    water: { name: 'Water', c: 4186, color: 'text-brand-cyan' },
    iron: { name: 'Iron', c: 450, color: 'text-brand-rose' },
    sand: { name: 'Sand', c: 830, color: 'text-brand-amber' },
  };

  const m = materials[material];
  const Q = mass * m.c * deltaT;

  return (
    <div>
      <div className="flex gap-3 mb-4">
        {(['water', 'iron', 'sand'] as const).map(mat => (
          <button key={mat} onClick={() => setMaterial(mat)} className={`flex-1 py-2 rounded-xl text-sm font-semibold ${material === mat ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : 'glass-card text-gray-400'}`}>
            {mat === 'water' ? '💧' : mat === 'iron' ? '⚙️' : '🏖️'} {materials[mat].name}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-gray-400 text-sm block mb-2">Mass (kg): {mass}</label>
          <input type="range" min="0.1" max="10" step="0.1" value={mass} onChange={e => setMass(Number(e.target.value))} className="w-full accent-brand-cyan" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">Temperature Change (°C): {deltaT}</label>
          <input type="range" min="1" max="100" value={deltaT} onChange={e => setDeltaT(Number(e.target.value))} className="w-full accent-brand-pink" />
        </div>
      </div>

      <div className="formula-box rounded-2xl p-6 text-center">
        <p className="text-gray-400 text-xs uppercase mb-2">Q = mcΔT</p>
        <p className="text-3xl font-space font-bold text-white">Q = {mass} × {m.c} × {deltaT} = <span className={m.color}>{(Q / 1000).toFixed(1)} kJ</span></p>
      </div>

      <div className="glass-card rounded-xl p-4 mt-4">
        <p className="text-gray-300 text-sm"><strong className={m.color}>{m.name}</strong> specific heat: <strong className="text-white">{m.c} J/kg°C</strong></p>
        <p className="text-gray-400 text-xs mt-1">{material === 'water' ? 'High c → heats slowly, good coolant' : 'Low c → heats quickly'}</p>
      </div>
    </div>
  );
}

/* ─── 4. LATENT HEAT ─── */
function LatentHeatSim() {
  const [state, setState] = useState<'ice' | 'water' | 'steam'>('ice');
  const [temp, setTemp] = useState(-20);

  useEffect(() => {
    if (state === 'ice') setTemp(-20);
    else if (state === 'water') setTemp(50);
    else setTemp(120);
  }, [state]);

  return (
    <div>
      <div className="flex gap-3 mb-4">
        {(['ice', 'water', 'steam'] as const).map(s => (
          <button key={s} onClick={() => setState(s)} className={`flex-1 py-2 rounded-xl text-sm font-semibold capitalize ${state === s ? s === 'ice' ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : s === 'water' ? 'bg-brand-amber/20 text-brand-amber border border-brand-amber/30' : 'bg-brand-rose/20 text-brand-rose border border-brand-rose/30' : 'glass-card text-gray-400'}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 p-6 mb-4">
        <div className="flex justify-center">
          <div className="w-32 h-40 relative">
            {/* Container */}
            <div className="absolute inset-0 border-2 border-white/10 rounded-lg overflow-hidden">
              {state === 'ice' && <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-brand-cyan/20 flex items-center justify-center"><span className="text-brand-cyan text-2xl">🧊</span></div>}
              {state === 'water' && <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-brand-amber/20 flex items-center justify-center"><span className="text-brand-amber text-2xl">💧</span></div>}
              {state === 'steam' && <div className="absolute bottom-0 left-0 right-0 h-full bg-brand-rose/10 flex items-center justify-center"><span className="text-brand-rose text-2xl">💨</span></div>}
            </div>
            {/* Temp */}
            <div className="absolute -right-16 top-1/2 -translate-y-1/2">
              <p className="text-white font-bold">{temp}°C</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="formula-box rounded-xl p-4">
          <p className="text-gray-400 text-xs uppercase mb-1">Latent Heat of Fusion</p>
          <p className="text-xl font-space font-bold text-brand-cyan">L_f = 334 kJ/kg</p>
          <p className="text-gray-400 text-xs">Ice → Water at 0°C</p>
        </div>
        <div className="formula-box rounded-xl p-4">
          <p className="text-gray-400 text-xs uppercase mb-1">Latent Heat of Vaporization</p>
          <p className="text-xl font-space font-bold text-brand-rose">L_v = 2260 kJ/kg</p>
          <p className="text-gray-400 text-xs">Water → Steam at 100°C</p>
        </div>
      </div>

      <div className="glass-card rounded-xl p-4 mt-4">
        <p className="text-gray-300 text-sm"><strong className="text-brand-lime">Key Point:</strong> During melting or boiling, energy goes into breaking bonds between molecules — <strong className="text-white">temperature does not change</strong> during the phase change!</p>
      </div>
    </div>
  );
}

/* ─── 5. CHANGE OF STATE ─── */
function ChangeOfStateSim() {
  const [process, setProcess] = useState<'melting' | 'freezing' | 'evaporation' | 'condensation'>('melting');

  const processes = {
    melting: { from: 'Solid 🧊', to: 'Liquid 💧', temp: '0°C', desc: 'Ice turns into water' },
    freezing: { from: 'Liquid 💧', to: 'Solid 🧊', temp: '0°C', desc: 'Water turns into ice' },
    evaporation: { from: 'Liquid 💧', to: 'Gas 💨', temp: '100°C', desc: 'Water turns into steam' },
    condensation: { from: 'Gas 💨', to: 'Liquid 💧', temp: '100°C', desc: 'Steam turns into water' },
  };

  const p = processes[process];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {(['melting', 'freezing', 'evaporation', 'condensation'] as const).map(proc => (
          <button key={proc} onClick={() => setProcess(proc)} className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize ${process === proc ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : 'glass-card text-gray-400'}`}>
            {proc}
          </button>
        ))}
      </div>

      <div className="glass-card rounded-2xl p-6 mb-4">
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <p className="text-3xl">{p.from.split(' ')[1]}</p>
            <p className="text-gray-400 text-sm">{p.from.split(' ')[0]}</p>
          </div>
          <div className="text-brand-cyan text-2xl">→</div>
          <div className="text-center">
            <p className="text-3xl">{p.to.split(' ')[1]}</p>
            <p className="text-gray-400 text-sm">{p.to.split(' ')[0]}</p>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-brand-amber font-bold">{p.desc}</p>
          <p className="text-gray-400 text-sm">at {p.temp}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="glass-card rounded-xl p-3">
          <p className="text-brand-cyan text-xs font-bold">🧊 Sublimation</p>
          <p className="text-gray-400 text-xs">Solid → Gas directly (dry ice, iodine)</p>
        </div>
        <div className="glass-card rounded-xl p-3">
          <p className="text-brand-pink text-xs font-bold">💨 Deposition</p>
          <p className="text-gray-400 text-xs">Gas → Solid directly (frost)</p>
        </div>
      </div>
    </div>
  );
}

/* ─── 6. EVAPORATION ─── */
function EvaporationSim() {
  const [temp, setTemp] = useState(25);
  const [wind, setWind] = useState(0);
  const rate = (temp / 50) * (1 + wind / 10);

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-gray-400 text-sm block mb-2">Temperature: {temp}°C</label>
          <input type="range" min="0" max="50" value={temp} onChange={e => setTemp(Number(e.target.value))} className="w-full accent-brand-amber" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">Wind Speed: {wind}</label>
          <input type="range" min="0" max="10" value={wind} onChange={e => setWind(Number(e.target.value))} className="w-full accent-brand-cyan" />
        </div>
      </div>

      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 p-6 mb-4">
        <div className="flex justify-center">
          <div className="w-24 h-32 relative">
            {/* Cloth */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-brand-cyan/20 rounded border border-brand-cyan/30 flex items-center justify-center">
              <span className="text-brand-cyan text-xs">Wet Cloth</span>
            </div>
            {/* Evaporating particles */}
            {Array.from({ length: Math.floor(rate * 5) }).map((_, i) => (
              <div key={i} className="absolute w-1 h-1 bg-brand-cyan rounded-full animate-pulse" style={{ left: `${20 + Math.random() * 60}%`, top: `${10 + Math.random() * 30}%` }} />
            ))}
          </div>
        </div>
      </div>

      <div className={`rounded-xl p-4 text-center ${rate > 1.5 ? 'bg-brand-rose/15 border border-brand-rose/30' : rate > 0.8 ? 'bg-brand-amber/15 border border-brand-amber/30' : 'bg-brand-lime/15 border border-brand-lime/30'}`}>
        <p className={`text-lg font-bold ${rate > 1.5 ? 'text-brand-rose' : rate > 0.8 ? 'text-brand-amber' : 'text-brand-lime'}`}>
          Evaporation Rate: {rate > 1.5 ? 'Fast 💨' : rate > 0.8 ? 'Medium 🌬️' : 'Slow 🐢'}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mt-4">
        <div className="glass-card rounded-xl p-3">
          <p className="text-brand-cyan text-xs font-bold">👕 Clothes Drying</p>
          <p className="text-gray-400 text-xs">Water evaporates from fabric</p>
        </div>
        <div className="glass-card rounded-xl p-3">
          <p className="text-brand-pink text-xs font-bold">💦 Sweating</p>
          <p className="text-gray-400 text-xs">Evaporation cools the body</p>
        </div>
      </div>
    </div>
  );
}

/* ─── 7. BOYLE'S LAW ─── */
function BoylesLawSim() {
  const [volume, setVolume] = useState(100);
  const P1 = 1;
  const V1 = 100;
  const P2 = (P1 * V1) / volume;

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">Volume: {volume} mL</label>
        <input type="range" min="20" max="200" value={volume} onChange={e => setVolume(Number(e.target.value))} className="w-full accent-brand-cyan" />
      </div>

      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 p-6 mb-4">
        <div className="flex justify-center">
          <div className="relative" style={{ width: 200, height: 120 }}>
            {/* Syringe */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-16 bg-white/5 rounded border border-white/10">
              {/* Plunger */}
              <div className="absolute top-0 bottom-0 w-2 bg-brand-cyan/50 transition-all" style={{ left: `${(volume / 200) * 100}%` }} />
              {/* Gas particles */}
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="absolute w-2 h-2 bg-brand-amber rounded-full" style={{ left: `${10 + Math.random() * ((volume / 200) * 80)}%`, top: `${20 + Math.random() * 60}%` }} />
              ))}
            </div>
            {/* Plunger handle */}
            <div className="absolute top-1/2 -translate-y-1/2 w-1 h-20 bg-brand-cyan/30 transition-all" style={{ left: `${(volume / 200) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="formula-box rounded-2xl p-5 text-center">
        <p className="text-gray-400 text-xs uppercase mb-2">P₁V₁ = P₂V₂ (Boyle's Law)</p>
        <p className="text-2xl font-space font-bold text-white">P₂ = ({P1} × {V1}) / {volume} = <span className="text-brand-cyan">{P2.toFixed(2)} atm</span></p>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mt-4">
        <div className="glass-card rounded-xl p-3">
          <p className="text-brand-cyan text-xs font-bold">💉 Syringe</p>
          <p className="text-gray-400 text-xs">Push plunger → pressure increases</p>
        </div>
        <div className="glass-card rounded-xl p-3">
          <p className="text-brand-pink text-xs font-bold">🎈 Balloon</p>
          <p className="text-gray-400 text-xs">Squeeze → pressure increases</p>
        </div>
        <div className="glass-card rounded-xl p-3">
          <p className="text-brand-amber text-xs font-bold">🤿 Scuba Tank</p>
          <p className="text-gray-400 text-xs">High pressure inside</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN UNIT 9 CONTENT
   ═══════════════════════════════════════════════════════════ */
export default function Unit9Content() {
  return (
    <div>
      {/* 1. TEMPERATURE */}
      <Section title="Temperature" icon={<Thermometer size={24} />} color="brand-cyan">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed">
            <strong className="text-brand-cyan">Temperature</strong> is a measure of <strong>hotness or coldness</strong>. It's the average kinetic energy of particles.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="glass-card rounded-2xl p-5">
            <h4 className="text-brand-amber font-bold text-lg mb-2">🔥 Heat</h4>
            <p className="text-gray-300 text-sm">Energy transfer between objects. Unit: <strong className="text-white">Joules (J)</strong>.</p>
          </div>
          <div className="glass-card rounded-2xl p-5">
            <h4 className="text-brand-cyan font-bold text-lg mb-2">🌡️ Temperature</h4>
            <p className="text-gray-300 text-sm">Degree of hotness. Unit: <strong className="text-white">°C or K</strong>.</p>
          </div>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Virtual Thermometer</h4>
        <VirtualThermometer />
      </Section>

      {/* 2. THERMAL EXPANSION */}
      <Section title="Thermal Expansion" icon={<Flame size={24} />} color="brand-amber">
        <div className="definition-highlight rounded-2xl p-6 mb-6">
          <p className="text-xl text-white leading-relaxed">
            <strong className="text-brand-amber">Thermal expansion</strong> is the increase in size when heated. Particles move more and take up more space.
          </p>
        </div>
        <div className="formula-box rounded-2xl p-5 text-center mb-6">
          <p className="text-2xl font-space font-bold text-white">ΔL = <span className="text-brand-cyan">α</span>L₀<span className="text-brand-pink">ΔT</span></p>
          <p className="text-gray-400 text-sm mt-2">α = coefficient of linear expansion</p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Heating Metal Rod</h4>
        <ThermalExpansionSim />
      </Section>

      {/* 3. SPECIFIC HEAT */}
      <Section title="Specific Heat Capacity" icon={<Flame size={24} />} color="brand-rose">
        <div className="definition-highlight rounded-2xl p-6 mb-6">
          <p className="text-xl text-white leading-relaxed">
            <strong className="text-brand-rose">Specific heat capacity</strong> is the heat required to raise the temperature of <strong>1 kg by 1°C</strong>.
          </p>
        </div>
        <div className="formula-box rounded-2xl p-6 text-center mb-6">
          <p className="text-3xl font-space font-black text-white">Q = <span className="text-brand-cyan">m</span><span className="text-brand-pink">c</span><span className="text-brand-amber">ΔT</span></p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Heat Different Materials</h4>
        <SpecificHeatSim />
      </Section>

      {/* 4. LATENT HEAT */}
      <Section title="Latent Heat" icon={<Snowflake size={24} />} color="brand-teal">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed">
            <strong className="text-brand-teal">Latent heat</strong> is heat absorbed/released during <strong>change of state</strong> WITHOUT temperature change.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          <div className="formula-box rounded-xl p-4">
            <p className="text-gray-400 text-xs uppercase mb-1">Fusion (Solid → Liquid)</p>
            <p className="text-xl font-space font-bold text-brand-cyan">Q = mL_f</p>
            <p className="text-gray-400 text-xs">L_f (ice) = 334 kJ/kg</p>
          </div>
          <div className="formula-box rounded-xl p-4">
            <p className="text-gray-400 text-xs uppercase mb-1">Vaporization (Liquid → Gas)</p>
            <p className="text-xl font-space font-bold text-brand-rose">Q = mL_v</p>
            <p className="text-gray-400 text-xs">L_v (water) = 2260 kJ/kg</p>
          </div>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Ice Melting & Water Boiling</h4>
        <LatentHeatSim />
      </Section>

      {/* 5. CHANGE OF STATE */}
      <Section title="Change of State" icon={<Wind size={24} />} color="brand-purple">
        <h4 className="text-lg font-bold text-white mb-4">🎮 Water Cycle Diagram</h4>
        <ChangeOfStateSim />
      </Section>

      {/* 6. EVAPORATION */}
      <Section title="Evaporation" icon={<Wind size={24} />} color="brand-lime">
        <div className="definition-highlight rounded-2xl p-6 mb-6">
          <p className="text-xl text-white leading-relaxed">
            <strong className="text-brand-lime">Evaporation</strong> is change from liquid to gas at <strong>any temperature</strong> (surface phenomenon).
          </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { factor: 'Temperature', effect: 'Higher → Faster' },
            { factor: 'Surface Area', effect: 'Larger → Faster' },
            { factor: 'Humidity', effect: 'Lower → Faster' },
            { factor: 'Wind', effect: 'More → Faster' },
          ].map(f => (
            <div key={f.factor} className="glass-card rounded-xl p-3">
              <p className="text-brand-cyan text-xs font-bold">{f.factor}</p>
              <p className="text-gray-400 text-xs">{f.effect}</p>
            </div>
          ))}
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Wet Cloth Drying</h4>
        <EvaporationSim />
      </Section>

      {/* 7. BOYLE'S LAW */}
      <Section title="Boyle's Law" icon={<Gauge size={24} />} color="brand-pink">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed">
            At <strong>constant temperature</strong>, pressure of a gas is <strong>inversely proportional</strong> to its volume.
          </p>
        </div>
        <div className="formula-box rounded-2xl p-6 text-center mb-6">
          <p className="text-3xl font-space font-black text-white">P ∝ 1/V</p>
          <p className="text-brand-pink font-space font-bold mt-2">P₁V₁ = P₂V₂ = constant</p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">🎮 Syringe Simulation</h4>
        <BoylesLawSim />
      </Section>

      {/* Quick Summary */}
      <div className="unit-detail-reveal glass-card-strong rounded-3xl p-8 md:p-12 text-center mb-16" style={{ opacity: 0, transform: 'translateY(60px)' }}>
        <h3 className="text-2xl md:text-3xl font-black text-white mb-6">📝 Unit 9 Quick Summary</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-cyan font-bold text-sm mb-1">Temperature</p>
            <p className="text-gray-400 text-xs">K = °C + 273. Measure of hotness.</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-amber font-bold text-sm mb-1">Thermal Expansion</p>
            <p className="text-gray-400 text-xs">ΔL = αL₀ΔT. Objects expand when heated.</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-rose font-bold text-sm mb-1">Specific Heat</p>
            <p className="text-gray-400 text-xs">Q = mcΔT. Water has high c.</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-pink font-bold text-sm mb-1">Boyle's Law</p>
            <p className="text-gray-400 text-xs">P₁V₁ = P₂V₂. P ∝ 1/V at constant T.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
