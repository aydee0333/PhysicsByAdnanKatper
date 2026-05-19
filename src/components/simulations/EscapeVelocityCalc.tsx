import { useState } from 'react';

export default function EscapeVelocityCalc() {
  const [planet, setPlanet] = useState('earth');
  const [customMass, setCustomMass] = useState(5.97e24);
  const [customRadius, setCustomRadius] = useState(6.37e6);

  const planets: Record<string, { name: string; mass: number; radius: number; color: string }> = {
    mercury: { name: 'Mercury', mass: 3.3e23, radius: 2.44e6, color: '#94a3b8' },
    venus: { name: 'Venus', mass: 4.87e24, radius: 6.05e6, color: '#f59e0b' },
    earth: { name: 'Earth', mass: 5.97e24, radius: 6.37e6, color: '#06b6d4' },
    mars: { name: 'Mars', mass: 6.42e23, radius: 3.39e6, color: '#f43f5e' },
    jupiter: { name: 'Jupiter', mass: 1.9e27, radius: 6.99e7, color: '#f59e0b' },
    moon: { name: 'Moon', mass: 7.35e22, radius: 1.74e6, color: '#94a3b8' },
    custom: { name: 'Custom', mass: customMass, radius: customRadius, color: '#a78bfa' },
  };

  const p = planets[planet];
  const G = 6.674e-11;
  const vEscape = Math.sqrt((2 * G * p.mass) / p.radius);
  const g = (G * p.mass) / (p.radius * p.radius);

  return (
    <div>
      <div className="flex gap-2 mb-4 flex-wrap">
        {Object.entries(planets).map(([key, val]) => (
          <button key={key} onClick={() => setPlanet(key)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${planet === key ? 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/30' : 'glass-card text-gray-400 border-white/10'}`}>
            {val.name}
          </button>
        ))}
      </div>

      {planet === 'custom' && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-gray-400 text-xs block mb-1">Mass (kg): {customMass.toExponential(2)}</label>
            <input type="range" min={22} max={29} step={0.1} value={Math.log10(customMass)} onChange={e => setCustomMass(Math.pow(10, Number(e.target.value)))} className="w-full accent-brand-purple" />
          </div>
          <div>
            <label className="text-gray-400 text-xs block mb-1">Radius (m): {customRadius.toExponential(2)}</label>
            <input type="range" min={5} max={8} step={0.1} value={Math.log10(customRadius)} onChange={e => setCustomRadius(Math.pow(10, Number(e.target.value)))} className="w-full accent-brand-amber" />
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-3 gap-3 mb-4">
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase">Escape Velocity</p>
          <p className="text-xl font-space font-bold text-brand-cyan">{(vEscape / 1000).toFixed(2)} km/s</p>
        </div>
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase">Surface Gravity</p>
          <p className="text-xl font-space font-bold text-brand-amber">{g.toFixed(2)} m/s²</p>
        </div>
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase">Mass</p>
          <p className="text-xl font-space font-bold text-brand-purple">{p.mass.toExponential(2)} kg</p>
        </div>
      </div>

      <div className="formula-box rounded-2xl p-4 text-center">
        <p className="text-lg font-space font-bold text-white">v_e = √(2GM/R)</p>
        <p className="text-gray-400 text-xs mt-1">v_e = √(2 × {G.toExponential(2)} × {p.mass.toExponential(2)} / {p.radius.toExponential(2)})</p>
      </div>
    </div>
  );
}
