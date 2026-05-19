import { useState } from 'react';

export default function EquilibriumPuzzle() {
  const puzzles = [
    { name: 'Level 1', leftW: 10, leftD: 2, rightD: 4, answerW: 5 },
    { name: 'Level 2', leftW: 15, leftD: 3, rightD: 2, answerW: 22.5 },
    { name: 'Level 3', leftW: 8, leftD: 4, rightD: 3, answerW: 10.67 },
  ];
  const [level, setLevel] = useState(0);
  const [rightW, setRightW] = useState(5);
  const p = puzzles[level];
  const leftTorque = p.leftW * p.leftD;
  const rightTorque = rightW * p.rightD;
  const diff = leftTorque - rightTorque;
  const isBalanced = Math.abs(diff) < 0.5;
  const tiltAngle = Math.max(-15, Math.min(15, diff * 0.8));

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {puzzles.map((pz, i) => (
          <button key={i} onClick={() => { setLevel(i); setRightW(5); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${level === i ? 'bg-brand-amber/20 text-brand-amber border border-brand-amber/30' : 'glass-card text-gray-400'}`}>{pz.name}</button>
        ))}
      </div>
      <div className="mb-4">
        <label className="text-gray-400 text-xs block mb-1">Right Side Weight: {rightW.toFixed(1)} kg</label>
        <input type="range" min={1} max={40} step={0.5} value={rightW} onChange={e => setRightW(Number(e.target.value))} className="w-full accent-brand-amber" />
      </div>
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 mb-4 p-6 flex flex-col items-center">
        <div style={{ transform: `rotate(${tiltAngle}deg)`, transition: 'transform 0.3s', transformOrigin: 'center bottom' }}>
          <div className="flex items-end gap-4">
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-brand-cyan/20 border border-brand-cyan/30 flex items-center justify-center mb-1"><span className="text-brand-cyan font-bold">{p.leftW}kg</span></div>
              <span className="text-gray-500 text-xs">@ {p.leftD}m</span>
            </div>
            <div className="w-4 h-16 bg-brand-purple/30 border border-brand-purple/50 rounded-t-sm" />
            <div className="text-center">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-1 ${isBalanced ? 'bg-brand-lime/20 border border-brand-lime/30' : 'bg-brand-rose/20 border border-brand-rose/30'}`}>
                <span className={`font-bold ${isBalanced ? 'text-brand-lime' : 'text-brand-rose'}`}>{rightW.toFixed(1)}kg</span>
              </div>
              <span className="text-gray-500 text-xs">@ {p.rightD}m</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="formula-box rounded-xl p-3 text-center"><p className="text-gray-400 text-xs uppercase">Clockwise</p><p className="text-lg font-space font-bold text-brand-cyan">{leftTorque.toFixed(1)} Nm</p></div>
        <div className="formula-box rounded-xl p-3 text-center"><p className="text-gray-400 text-xs uppercase">Anticlockwise</p><p className="text-lg font-space font-bold text-brand-amber">{rightTorque.toFixed(1)} Nm</p></div>
      </div>
      <div className={`glass-card rounded-xl p-4 text-center ${isBalanced ? 'border-brand-lime/30' : 'border-brand-rose/30'}`}>
        <p className={`font-bold ${isBalanced ? 'text-brand-lime' : 'text-brand-rose'}`}>
          {isBalanced ? '✓ BALANCED! Στ = 0' : `✗ Not balanced — try ${p.answerW.toFixed(1)} kg at ${p.rightD}m`}
        </p>
      </div>
    </div>
  );
}
