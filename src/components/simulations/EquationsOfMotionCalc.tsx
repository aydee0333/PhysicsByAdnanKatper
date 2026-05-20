import { useState } from 'react';

export default function EquationsOfMotionCalc() {
  const [u, setU] = useState(0);
  const [v, setV] = useState(20);
  const [a, setA] = useState(2);
  const [t, setT] = useState(10);
  const [knownVar, setKnownVar] = useState<'uvat' | 'uvas' | 'uvts' | 'uats' | 'vats'>('uvat');

  const calcMissing = () => {
    switch (knownVar) {
      case 'uvat': return { label: 's (displacement)', value: u * t + 0.5 * a * t * t, unit: 'm' };
      case 'uvas': return { label: 't (time)', value: (v - u) / a || 0, unit: 's' };
      case 'uvts': return { label: 'a (acceleration)', value: (v - u) / t || 0, unit: 'm/s²' };
      case 'uats': return { label: 'v (final velocity)', value: u + a * t, unit: 'm/s' };
      case 'vats': return { label: 'u (initial velocity)', value: v - a * t, unit: 'm/s' };
    }
  };

  const result = calcMissing();
  const equations = [
    { name: 'v = u + at', desc: 'Velocity-time' },
    { name: 's = ut + ½at²', desc: 'Displacement-time' },
    { name: 'v² = u² + 2as', desc: 'Velocity-displacement' },
    { name: 's = ½(u+v)t', desc: 'Average velocity' },
  ];

  const varGroups: { key: typeof knownVar; label: string; missing: string }[] = [
    { key: 'uvat', label: 'Know u, v, a, t', missing: 's' },
    { key: 'uvas', label: 'Know u, v, a, s', missing: 't' },
    { key: 'uvts', label: 'Know u, v, t, s', missing: 'a' },
    { key: 'uats', label: 'Know u, a, t, s', missing: 'v' },
    { key: 'vats', label: 'Know v, a, t, s', missing: 'u' },
  ];

  return (
    <div>
      <div className="flex gap-2 mb-4 flex-wrap">
        {varGroups.map(g => (
          <button key={g.key} onClick={() => setKnownVar(g.key)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${knownVar === g.key ? 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/30' : 'glass-card text-gray-400 border-white/10'}`}>
            {g.label} → {g.missing}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div>
          <label className="text-gray-400 text-xs block mb-1">u (m/s): {u}</label>
          <input type="range" min={0} max={50} value={u} onChange={e => setU(Number(e.target.value))} className="w-full accent-brand-cyan" />
        </div>
        <div>
          <label className="text-gray-400 text-xs block mb-1">v (m/s): {v}</label>
          <input type="range" min={0} max={50} value={v} onChange={e => setV(Number(e.target.value))} className="w-full accent-brand-purple" />
        </div>
        <div>
          <label className="text-gray-400 text-xs block mb-1">a (m/s²): {a}</label>
          <input type="range" min={-10} max={10} value={a} onChange={e => setA(Number(e.target.value))} className="w-full accent-brand-amber" />
        </div>
        <div>
          <label className="text-gray-400 text-xs block mb-1">t (s): {t}</label>
          <input type="range" min={0} max={30} value={t} onChange={e => setT(Number(e.target.value))} className="w-full accent-brand-rose" />
        </div>
      </div>
      <div className="formula-box rounded-2xl p-6 text-center mb-4">
        <p className="text-gray-400 text-sm mb-2">Calculated: {result.label}</p>
        <p className="text-3xl font-space font-black text-brand-cyan">{result.value.toFixed(2)} {result.unit}</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {equations.map(eq => (
          <div key={eq.name} className="glass-card rounded-lg p-3 text-center">
            <p className="text-brand-cyan font-space font-bold text-sm">{eq.name}</p>
            <p className="text-gray-500 text-xs">{eq.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
