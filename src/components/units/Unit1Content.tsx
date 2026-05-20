import { useState, useRef, useEffect } from 'react';
import { Atom, Ruler, Check, RotateCcw } from 'lucide-react';
import { useT } from '../../i18n/LanguageContext';
import { GSAP_REVEAL_STYLE } from '../../utils/styles';
import { QuizEngine } from '../quiz';

/* ─── MEASUREMENT ERROR VISUALIZATION ─── */
function MeasurementErrorViz() {
  const [nMeasurements, setNMeasurements] = useState(20);
  const [mode, setMode] = useState<'ap' | 'ai' | 'ip' | 'ii'>('ap');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const trueValue = 10.0;
  const modes: Record<string, { sys: number; rand: number; label: string; color: string }> = {
    ap: { sys: 0, rand: 0.3, label: 'Accurate + Precise', color: '#84cc16' },
    ai: { sys: 0, rand: 1.5, label: 'Accurate + Imprecise', color: '#06b6d4' },
    ip: { sys: 2, rand: 0.3, label: 'Inaccurate + Precise', color: '#f59e0b' },
    ii: { sys: 1.5, rand: 1.5, label: 'Inaccurate + Imprecise', color: '#f43f5e' },
  };
  const m = modes[mode];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2, cy = h / 2 - 20;
    const scale = 40;
    const trueX = cx, trueY = cy;

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = 0.5;
    for (let x = 0; x < w; x += 30) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y < h; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

    // Bullseye rings
    [0.5, 1, 1.5].forEach(r => {
      ctx.beginPath(); ctx.arc(trueX, trueY, r * scale, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,255,${r === 0.5 ? 0.15 : 0.08})`; ctx.lineWidth = 1; ctx.stroke();
    });

    // True value center dot
    ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.beginPath(); ctx.arc(trueX, trueY, 3, 0, Math.PI * 2); ctx.fill();

    // Generate measurements using seeded random
    let seed = 42;
    const rand = () => { seed = (seed * 16807 + 0) % 2147483647; return (seed / 2147483647) * 2 - 1; };
    const points: { x: number; y: number; val: number }[] = [];
    for (let i = 0; i < nMeasurements; i++) {
      const u1 = rand(), u2 = rand();
      const gauss = Math.sqrt(-2 * Math.log(Math.abs(u1) + 0.001)) * Math.cos(2 * Math.PI * u2);
      const gauss2 = Math.sqrt(-2 * Math.log(Math.abs(u2) + 0.001)) * Math.sin(2 * Math.PI * u1);
      const val = trueValue + m.sys + m.rand * gauss;
      const px = trueX + (m.sys + m.rand * gauss) * scale;
      const py = trueY + m.rand * gauss2 * scale * 0.3;
      points.push({ x: px, y: py, val });
    }

    // Draw points
    points.forEach(p => {
      ctx.fillStyle = m.color;
      ctx.globalAlpha = 0.6;
      ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
    });

    // Calculate stats
    const mean = points.reduce((s, p) => s + p.val, 0) / points.length;
    const stdDev = Math.sqrt(points.reduce((s, p) => s + (p.val - mean) ** 2, 0) / points.length);

    // Mean marker
    const meanX = trueX + (mean - trueValue) * scale;
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(meanX, cy - 60); ctx.lineTo(meanX, cy + 60); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.font = 'bold 11px Poppins'; ctx.textAlign = 'center';
    ctx.fillText(`Mean = ${mean.toFixed(2)}`, meanX, cy - 65);

    // True value label
    ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '11px Poppins';
    ctx.fillText(`True = ${trueValue}`, trueX, cy + 75);

    // Stats box
    ctx.fillStyle = 'rgba(0,0,0,0.4)'; ctx.fillRect(10, h - 65, 280, 55);
    ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.strokeRect(10, h - 65, 280, 55);
    ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 12px Poppins'; ctx.textAlign = 'left';
    ctx.fillText(`n = ${nMeasurements}   Mean = ${mean.toFixed(3)}   σ = ${stdDev.toFixed(3)}`, 20, h - 45);
    ctx.fillStyle = '#94a3b8'; ctx.font = '11px Poppins';
    ctx.fillText(`Systematic error: ${(mean - trueValue).toFixed(3)}   Random error: ${stdDev.toFixed(3)}`, 20, h - 25);
  }, [nMeasurements, mode]);

  const modeButtons: { key: typeof mode; label: string }[] = [
    { key: 'ap', label: 'Accurate + Precise' },
    { key: 'ai', label: 'Accurate + Imprecise' },
    { key: 'ip', label: 'Inaccurate + Precise' },
    { key: 'ii', label: 'Inaccurate + Imprecise' },
  ];

  return (
    <div>
      <div className="flex gap-2 mb-4 flex-wrap">
        {modeButtons.map(b => (
          <button key={b.key} onClick={() => setMode(b.key)} className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${mode === b.key ? 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/30' : 'glass-card text-gray-400 border-white/10'}`}>
            {b.label}
          </button>
        ))}
      </div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">Number of measurements: {nMeasurements}</label>
        <input type="range" min={5} max={50} value={nMeasurements} onChange={e => setNMeasurements(Number(e.target.value))} className="w-full accent-brand-cyan" />
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={500} height={280} className="w-full" style={{ maxWidth: 500, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="formula-box rounded-xl p-3 text-center">
          <p className="text-gray-400 text-xs uppercase">Systematic Error</p>
          <p className="text-lg font-space font-bold text-brand-amber">Offset from true value</p>
        </div>
        <div className="formula-box rounded-xl p-3 text-center">
          <p className="text-gray-400 text-xs uppercase">Random Error</p>
          <p className="text-lg font-space font-bold text-brand-cyan">Spread of measurements</p>
        </div>
      </div>
    </div>
  );
}

/* ─── SCIENTIFIC NOTATION CONVERTER ─── */
function ScientificNotationConverter() {
  const [input, setInput] = useState('0.00456');
  const [mode, setMode] = useState<'toSci' | 'fromSci'>('toSci');
  const [exponent, setExponent] = useState(3);
  const [mantissa, setMantissa] = useState(1.0);

  const toScientific = (val: number): string => {
    if (val === 0) return '0';
    const exp = Math.floor(Math.log10(Math.abs(val)));
    const man = val / Math.pow(10, exp);
    return `${man.toFixed(2)} × 10^${exp}`;
  };

  const fromScientific = (m: number, e: number): number => m * Math.pow(10, e);

  const parsedInput = parseFloat(input) || 0;
  const sciResult = toScientific(parsedInput);
  const fromSciResult = fromScientific(mantissa, exponent);
  const siPrefixes = [
    { name: 'Tera', symbol: 'T', exp: 12 },
    { name: 'Giga', symbol: 'G', exp: 9 },
    { name: 'Mega', symbol: 'M', exp: 6 },
    { name: 'Kilo', symbol: 'k', exp: 3 },
    { name: 'Base', symbol: '', exp: 0 },
    { name: 'Milli', symbol: 'm', exp: -3 },
    { name: 'Micro', symbol: 'μ', exp: -6 },
    { name: 'Nano', symbol: 'n', exp: -9 },
    { name: 'Pico', symbol: 'p', exp: -12 },
  ];

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setMode('toSci')} className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${mode === 'toSci' ? 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/30' : 'glass-card text-gray-400 border-white/10'}`}>
          Number → Scientific
        </button>
        <button onClick={() => setMode('fromSci')} className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${mode === 'fromSci' ? 'bg-brand-amber/20 text-brand-amber border-brand-amber/30' : 'glass-card text-gray-400 border-white/10'}`}>
          Scientific → Number
        </button>
      </div>

      {mode === 'toSci' ? (
        <div>
          <label className="text-gray-400 text-sm block mb-2">Enter a number:</label>
          <input type="text" value={input} onChange={e => setInput(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-brand-dark/80 border border-white/10 text-white text-lg font-mono mb-4" placeholder="e.g. 0.00456 or 456000" />
          <div className="formula-box rounded-2xl p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">Scientific Notation:</p>
            <p className="text-2xl font-space font-black text-brand-cyan">{sciResult}</p>
          </div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-gray-400 text-sm block mb-2">Mantissa: {mantissa.toFixed(2)}</label>
              <input type="range" min={1} max={9.99} step={0.01} value={mantissa} onChange={e => setMantissa(Number(e.target.value))} className="w-full accent-brand-cyan" />
            </div>
            <div>
              <label className="text-gray-400 text-sm block mb-2">Exponent: 10^{exponent}</label>
              <input type="range" min={-12} max={12} value={exponent} onChange={e => setExponent(Number(e.target.value))} className="w-full accent-brand-amber" />
            </div>
          </div>
          <div className="formula-box rounded-2xl p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">Standard Form:</p>
            <p className="text-2xl font-space font-black text-brand-amber">{fromSciResult.toExponential(2)}</p>
            <p className="text-gray-400 text-sm mt-2">= {fromSciResult.toLocaleString()}</p>
          </div>
        </div>
      )}

      {/* SI Prefixes */}
      <div className="mt-6">
        <p className="text-gray-400 text-sm mb-3">SI Prefixes:</p>
        <div className="grid grid-cols-3 gap-2">
          {siPrefixes.map(p => (
            <button key={p.symbol + p.exp} onClick={() => { setMantissa(1); setExponent(p.exp); setMode('fromSci'); }} className="glass-card rounded-lg p-2 text-center hover:border-brand-cyan/30 transition-all border border-white/5">
              <p className="text-brand-cyan font-bold text-sm">{p.symbol || '—'}</p>
              <p className="text-gray-500 text-xs">{p.name}</p>
              <p className="text-gray-600 text-xs">10^{p.exp}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── VERNIER CALIPER INTERACTIVE ─── */
function VernierCaliperSim() {
  const [jawPos, setJawPos] = useState(0.5);
  const [preset, setPreset] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const presets = [
    { name: 'Coin', diameter: 2.4 },
    { name: 'Marble', diameter: 1.6 },
    { name: 'Rod', diameter: 3.8 },
  ];

  const selectPreset = (d: number) => { setJawPos(d / 5); setPreset(d); };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const mainLen = 340, startX = 50, mainY = h / 2 - 15, vernierY = mainY + 25;

    // Main scale body
    ctx.fillStyle = 'rgba(6,182,212,0.08)';
    ctx.fillRect(startX, mainY - 10, mainLen, 20);
    ctx.strokeStyle = 'rgba(6,182,212,0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(startX, mainY - 10, mainLen, 20);

    // Main scale markings (50 divisions = 5 cm)
    for (let i = 0; i <= 50; i++) {
      const x = startX + (i / 50) * mainLen;
      const isCm = i % 10 === 0;
      const is5mm = i % 5 === 0;
      ctx.strokeStyle = isCm ? '#06b6d4' : 'rgba(6,182,212,0.4)';
      ctx.lineWidth = isCm ? 1.5 : 0.5;
      ctx.beginPath(); ctx.moveTo(x, mainY - (isCm ? 12 : is5mm ? 8 : 5));
      ctx.lineTo(x, mainY + (isCm ? 12 : is5mm ? 8 : 5)); ctx.stroke();
      if (isCm) { ctx.fillStyle = '#06b6d4'; ctx.font = '10px Poppins'; ctx.textAlign = 'center'; ctx.fillText(String(i / 10), x, mainY - 16); }
    }

    // Vernier scale (sliding)
    const vernierOffset = jawPos * mainLen;
    const vernierStart = startX + vernierOffset;
    const vernierLen = mainLen * 0.18;
    ctx.fillStyle = 'rgba(245,158,11,0.12)';
    ctx.fillRect(vernierStart, vernierY - 8, vernierLen, 16);
    ctx.strokeStyle = 'rgba(245,158,11,0.5)';
    ctx.lineWidth = 1;
    ctx.strokeRect(vernierStart, vernierY - 8, vernierLen, 16);

    for (let i = 0; i <= 10; i++) {
      const x = vernierStart + (i / 10) * vernierLen;
      ctx.strokeStyle = 'rgba(245,158,11,0.7)'; ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.moveTo(x, vernierY - 6); ctx.lineTo(x, vernierY + 6); ctx.stroke();
      ctx.fillStyle = '#f59e0b'; ctx.font = '8px Poppins'; ctx.textAlign = 'center';
      ctx.fillText(String(i), x, vernierY + 15);
    }

    // Zero marker
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath(); ctx.moveTo(vernierStart, vernierY - 8);
    ctx.lineTo(vernierStart - 5, vernierY - 14); ctx.lineTo(vernierStart + 5, vernierY - 14);
    ctx.closePath(); ctx.fill();

    // Fixed jaw + sliding jaw
    ctx.fillStyle = '#7c3aed'; ctx.fillRect(startX - 12, mainY - 28, 12, 56);
    ctx.fillRect(vernierStart - 2, mainY - 28, 4, 56);
    ctx.strokeStyle = '#a78bfa'; ctx.lineWidth = 1;
    ctx.strokeRect(startX - 12, mainY - 28, 12, 56);
    ctx.strokeRect(vernierStart - 2, mainY - 28, 4, 56);

    // Object being measured
    const objW = vernierOffset;
    if (objW > 5) {
      ctx.fillStyle = 'rgba(132,204,22,0.15)';
      ctx.strokeStyle = '#84cc16'; ctx.lineWidth = 1;
      ctx.fillRect(startX, mainY - 12, objW, 24);
      ctx.strokeRect(startX, mainY - 12, objW, 24);
    }

    // Labels
    ctx.fillStyle = '#94a3b8'; ctx.font = '11px Poppins'; ctx.textAlign = 'left';
    ctx.fillText('Main Scale', startX, mainY - 26);
    ctx.fillStyle = '#f59e0b'; ctx.fillText('Vernier', vernierStart, vernierY + 28);
  }, [jawPos]);

  const mainScaleReading = Math.floor(jawPos * 50) / 10;
  const vernierDivision = Math.round((jawPos * 50 - Math.floor(jawPos * 50)) * 10);
  const totalReading = mainScaleReading + vernierDivision * 0.01;

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">Drag to move jaw position</label>
        <input type="range" min="0.02" max="0.95" step="0.002" value={jawPos} onChange={e => { setJawPos(Number(e.target.value)); setPreset(null); }} className="w-full accent-brand-purple" />
      </div>
      <div className="flex gap-2 mb-4">
        {presets.map(p => (
          <button key={p.name} onClick={() => selectPreset(p.diameter)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${preset === p.diameter ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : 'glass-card text-gray-400'}`}>
            {p.name} ({p.diameter} cm)
          </button>
        ))}
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={500} height={140} className="w-full" style={{ maxWidth: 500, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="formula-box rounded-xl p-3 text-center">
          <p className="text-gray-400 text-xs uppercase">Main Scale</p>
          <p className="text-lg font-space font-bold text-brand-cyan">{mainScaleReading.toFixed(1)} cm</p>
        </div>
        <div className="formula-box rounded-xl p-3 text-center">
          <p className="text-gray-400 text-xs uppercase">Vernier Reading</p>
          <p className="text-lg font-space font-bold text-brand-amber">{vernierDivision} × 0.01 = {(vernierDivision * 0.01).toFixed(2)} cm</p>
        </div>
        <div className="formula-box rounded-xl p-3 text-center">
          <p className="text-gray-400 text-xs uppercase">Total</p>
          <p className="text-xl font-space font-bold text-brand-lime">{totalReading.toFixed(2)} cm</p>
        </div>
      </div>
      <div className="glass-card rounded-xl p-4">
        <p className="text-gray-300 text-sm">Least Count = 1 MSD / 10 divisions = <strong className="text-brand-cyan">0.01 cm</strong></p>
      </div>
    </div>
  );
}

/* ─── SCREW GAUGE INTERACTIVE ─── */
function ScrewGaugeSim() {
  const [thimblePos, setThimblePos] = useState(0.3);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2, cy = h / 2;

    // Sleeve (main scale body)
    ctx.fillStyle = 'rgba(6,182,212,0.08)';
    ctx.fillRect(cx - 120, cy - 40, 160, 80);
    ctx.strokeStyle = 'rgba(6,182,212,0.4)'; ctx.lineWidth = 2;
    ctx.strokeRect(cx - 120, cy - 40, 160, 80);

    // Sleeve markings
    for (let i = 0; i <= 8; i++) {
      const y = cy - 35 + (i / 8) * 70;
      ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(cx - 120, y); ctx.lineTo(cx - 105, y); ctx.stroke();
      ctx.fillStyle = '#06b6d4'; ctx.font = '10px Poppins'; ctx.textAlign = 'right';
      ctx.fillText(`${(5 - i * 0.5).toFixed(1)}`, cx - 125, y + 4);
    }

    // Datum line
    ctx.strokeStyle = 'rgba(6,182,212,0.5)'; ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(cx - 120, cy); ctx.lineTo(cx + 40, cy); ctx.stroke();
    ctx.setLineDash([]);

    // Thimble (circular scale)
    const thimbleR = 50;
    ctx.save(); ctx.translate(cx + 60, cy);
    ctx.fillStyle = 'rgba(245,158,11,0.08)';
    ctx.beginPath(); ctx.arc(0, 0, thimbleR, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(245,158,11,0.4)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(0, 0, thimbleR, 0, Math.PI * 2); ctx.stroke();

    // Circular scale markings (50 divisions)
    for (let i = 0; i < 50; i++) {
      const angle = (i / 50) * Math.PI * 2 - Math.PI / 2;
      const isMain = i % 5 === 0;
      const innerR = isMain ? thimbleR - 12 : thimbleR - 7;
      ctx.strokeStyle = isMain ? '#f59e0b' : 'rgba(245,158,11,0.3)';
      ctx.lineWidth = isMain ? 1.5 : 0.5;
      ctx.beginPath(); ctx.moveTo(Math.cos(angle) * innerR, Math.sin(angle) * innerR);
      ctx.lineTo(Math.cos(angle) * thimbleR, Math.sin(angle) * thimbleR); ctx.stroke();
      if (isMain) {
        ctx.fillStyle = '#f59e0b'; ctx.font = '9px Poppins'; ctx.textAlign = 'center';
        ctx.fillText(String(i), Math.cos(angle) * (innerR - 10), Math.sin(angle) * (innerR - 10) + 3);
      }
    }

    // Reference mark at top
    ctx.strokeStyle = '#f43f5e'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, -thimbleR); ctx.lineTo(0, -thimbleR + 15); ctx.stroke();
    ctx.restore();

    // Anvil (fixed) + Spindle (moves)
    ctx.fillStyle = '#7c3aed'; ctx.fillRect(cx - 125, cy - 48, 8, 96);
    const spindleX = cx - 120 + thimblePos * 80;
    ctx.fillStyle = '#a78bfa'; ctx.fillRect(spindleX, cy - 42, 6, 84);

    // Object between jaws
    const gap = spindleX - (cx - 117);
    if (gap > 2) {
      ctx.fillStyle = 'rgba(132,204,22,0.15)'; ctx.strokeStyle = '#84cc16'; ctx.lineWidth = 1;
      ctx.fillRect(cx - 117, cy - gap * 0.4, gap, gap * 0.8);
      ctx.strokeRect(cx - 117, cy - gap * 0.4, gap, gap * 0.8);
    }

    ctx.fillStyle = '#94a3b8'; ctx.font = '11px Poppins'; ctx.textAlign = 'center';
    ctx.fillText('Sleeve', cx - 40, cy + 55);
    ctx.fillStyle = '#f59e0b'; ctx.fillText('Thimble', cx + 60, cy + 70);
  }, [thimblePos]);

  const mainReading = Math.floor(thimblePos * 5);
  const circularDiv = Math.round((thimblePos * 5 - mainReading) * 50);
  const totalReading = mainReading + circularDiv * 0.01;

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">Rotate thimble</label>
        <input type="range" min="0" max="0.98" step="0.002" value={thimblePos} onChange={e => setThimblePos(Number(e.target.value))} className="w-full accent-brand-amber" />
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={400} height={170} className="w-full" style={{ maxWidth: 400, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="formula-box rounded-xl p-3 text-center">
          <p className="text-gray-400 text-xs uppercase">Main Scale</p>
          <p className="text-lg font-space font-bold text-brand-cyan">{mainReading} mm</p>
        </div>
        <div className="formula-box rounded-xl p-3 text-center">
          <p className="text-gray-400 text-xs uppercase">Circular Scale</p>
          <p className="text-lg font-space font-bold text-brand-amber">{circularDiv} × 0.01 = {(circularDiv * 0.01).toFixed(2)} mm</p>
        </div>
        <div className="formula-box rounded-xl p-3 text-center">
          <p className="text-gray-400 text-xs uppercase">Total</p>
          <p className="text-xl font-space font-bold text-brand-lime">{totalReading.toFixed(2)} mm</p>
        </div>
      </div>
      <div className="glass-card rounded-xl p-4">
        <p className="text-gray-300 text-sm">Least Count = Pitch / 50 divisions = 1 mm / 50 = <strong className="text-brand-amber">0.01 mm</strong></p>
      </div>
    </div>
  );
}

export default function Unit1Content() {
  const t = useT();
  const [matchSelectedQ, setMatchSelectedQ] = useState<number | null>(null);
  const [matchSelectedU, setMatchSelectedU] = useState<number | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [matchResult, setMatchResult] = useState<{ correct: boolean; pairId: number } | null>(null);

  // Matching Game Data
  const quantitiesList = [
    { id: 1, pairId: 1 }, { id: 2, pairId: 2 }, { id: 3, pairId: 3 }, { id: 4, pairId: 4 },
    { id: 5, pairId: 5 }, { id: 6, pairId: 6 }, { id: 7, pairId: 7 },
  ];
  const unitsList = [
    { id: 10, pairId: 2 }, { id: 11, pairId: 1 }, { id: 12, pairId: 4 }, { id: 13, pairId: 3 },
    { id: 14, pairId: 7 }, { id: 15, pairId: 6 }, { id: 16, pairId: 5 },
  ];
  const quantityKeys: Record<number, string> = { 1: 'unit1.qty.mass', 2: 'unit1.qty.length', 3: 'unit1.qty.time', 4: 'unit1.qty.temp', 5: 'unit1.qty.current', 6: 'unit1.qty.amount', 7: 'unit1.qty.intensity' };
  const unitKeys: Record<number, string> = { 10: 'unit1.match.lengthUnit', 11: 'unit1.match.massUnit', 12: 'unit1.match.tempUnit', 13: 'unit1.match.timeUnit', 14: 'unit1.match.intensityUnit', 15: 'unit1.match.amountUnit', 16: 'unit1.match.currentUnit' };

  const handleQuantityClick = (qId: number, pairId: number) => {
    if (matchedPairs.includes(pairId)) return;
    setMatchSelectedQ(qId); setMatchResult(null);
    if (matchSelectedU !== null) {
      const unit = unitsList.find(u => u.id === matchSelectedU);
      const isCorrect = !!(unit && unit.pairId === pairId);
      setMatchResult({ correct: isCorrect, pairId });
      if (isCorrect) setMatchedPairs([...matchedPairs, pairId]);
      setTimeout(() => { setMatchSelectedQ(null); setMatchSelectedU(null); setMatchResult(null); }, 1200);
    }
  };

  const handleUnitClick = (uId: number, pairId: number) => {
    if (matchedPairs.includes(pairId)) return;
    setMatchSelectedU(uId); setMatchResult(null);
    if (matchSelectedQ !== null) {
      const qty = quantitiesList.find(q => q.id === matchSelectedQ);
      const isCorrect = !!(qty && qty.pairId === pairId);
      setMatchResult({ correct: isCorrect, pairId });
      if (isCorrect) setMatchedPairs([...matchedPairs, pairId]);
      setTimeout(() => { setMatchSelectedQ(null); setMatchSelectedU(null); setMatchResult(null); }, 1200);
    }
  };

  const resetGame = () => { setMatchedPairs([]); setMatchSelectedQ(null); setMatchSelectedU(null); setMatchResult(null); };

  return (
    <div className="space-y-12 text-gray-200">
      {/* 1. What is Physics */}
      <div className="unit-detail-reveal glass-card rounded-3xl p-8" {...GSAP_REVEAL_STYLE}>
        <div className="flex items-center gap-4 mb-6"><Atom size={32} className="text-brand-purple" /><h2 className="text-3xl font-black">{t('unit1.whatIsPhysics')}</h2></div>
        <p className="text-xl text-gray-300">{t('unit1.whatIsPhysicsDes')}</p>
      </div>

      {/* 2. Physical Quantities */}
      <div className="unit-detail-reveal glass-card rounded-3xl p-8" {...GSAP_REVEAL_STYLE}>
        <div className="flex items-center gap-4 mb-6"><Ruler size={32} className="text-brand-cyan" /><h2 className="text-3xl font-black">{t('unit1.physicalQuantities')}</h2></div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 rounded-2xl p-6">
            <h4 className="font-bold text-brand-cyan mb-4">{t('unit1.baseQuantitiesTitle')}</h4>
            <ul className="space-y-1.5 text-gray-300">{quantitiesList.map(q => <li key={q.id}>• {t(quantityKeys[q.id])}</li>)}</ul>
          </div>
          <div className="bg-white/5 rounded-2xl p-6">
            <h4 className="font-bold text-brand-pink mb-4">{t('unit1.derived.title')}</h4>
            <ul className="space-y-1.5 text-gray-300">
              <li>• {t('unit1.derived.speed')}</li><li>• {t('unit1.derived.area')}</li><li>• {t('unit1.derived.force')}</li><li>• {t('unit1.derived.density')}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. SI Units - Fully Translated Table */}
      <div className="unit-detail-reveal glass-card rounded-3xl p-8" {...GSAP_REVEAL_STYLE}>
        <h2 className="text-3xl font-black mb-6">{t('unit1.siUnits')}</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-white/10 text-brand-cyan">
              <th className="py-3 text-start">{t('unit1.table.quantity')}</th><th className="py-3 text-start">{t('unit1.table.unit')}</th><th className="py-3 text-start">{t('unit1.table.symbol')}</th>
            </tr></thead>
            <tbody>
              {[
                { q: 'unit1.qty.length', u: 'unit1.match.lengthUnit', s: 'm' },
                { q: 'unit1.qty.mass', u: 'unit1.match.massUnit', s: 'kg' },
                { q: 'unit1.qty.time', u: 'unit1.match.timeUnit', s: 's' },
                { q: 'unit1.qty.current', u: 'unit1.match.currentUnit', s: 'A' },
                { q: 'unit1.qty.temp', u: 'unit1.match.tempUnit', s: 'K' },
                { q: 'unit1.qty.amount', u: 'unit1.match.amountUnit', s: 'mol' },
                { q: 'unit1.qty.intensity', u: 'unit1.match.intensityUnit', s: 'cd' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="py-3">{t(row.q)}</td><td>{t(row.u)}</td><td className="font-mono text-brand-cyan">{row.s}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Prefixes */}
      <div className="unit-detail-reveal glass-card rounded-3xl p-8" {...GSAP_REVEAL_STYLE}>
        <h2 className="text-3xl font-black mb-6">{t('unit1.prefixes')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[["kilo","k","10³"],["mega","M","10⁶"],["milli","m","10⁻³"],["micro","μ","10⁻⁶"],["nano","n","10⁻⁹"],["centi","c","10⁻²"]].map((p,i)=>(
            <div key={i} className="bg-white/5 p-4 rounded-xl flex justify-between"><span>{p[0]} ({p[1]})</span><span className="text-brand-amber">{p[2]}</span></div>
          ))}
        </div>
      </div>

      {/* 5. Scientific Notation */}
      <div className="unit-detail-reveal glass-card rounded-3xl p-8" {...GSAP_REVEAL_STYLE}>
        <h2 className="text-3xl font-black mb-6">{t('unit1.scientificNotation')}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/5 p-5 rounded-xl">Speed of Light: <span className="text-brand-cyan font-bold">3 × 10⁸ m/s</span></div>
          <div className="bg-white/5 p-5 rounded-xl">Mass of Electron: <span className="text-brand-cyan font-bold">9.1 × 10⁻³¹ kg</span></div>
        </div>
      </div>

      {/* 6. Measuring Instruments - Translated Descriptions */}
      <div className="unit-detail-reveal glass-card rounded-3xl p-8" {...GSAP_REVEAL_STYLE}>
        <h2 className="text-3xl font-black mb-6">{t('unit1.measuringInstruments')}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: '📏 Metre Rule', lc: '1 mm (0.1 cm)', desc: t('unit1.instruments.metreRuleDesc') },
            { title: '🔧 Vernier Calipers', lc: '0.1 mm (0.01 cm)', desc: t('unit1.instruments.vernierDesc') },
            { title: '⚙️ Screw Gauge', lc: '0.01 mm', desc: t('unit1.instruments.screwGaugeDesc') },
            { title: '⚖️ Physical Balance', lc: '0.1 g', desc: t('unit1.instruments.balanceDesc') },
          ].map((inst, i) => (
            <div key={i} className="bg-white/5 p-6 rounded-2xl">
              <h4 className="font-bold text-xl mb-3">{inst.title}</h4>
              <p className="text-sm text-gray-400 mb-3">Least Count: <strong className="text-brand-cyan">{inst.lc}</strong></p>
              <p className="text-gray-300 text-sm">{inst.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 6b. VERNIER CALIPER INTERACTIVE */}
      <div className="unit-detail-reveal glass-card rounded-3xl p-8" {...GSAP_REVEAL_STYLE}>
        <h2 className="text-3xl font-black mb-2">Vernier Caliper — Interactive</h2>
        <p className="text-gray-400 mb-6">Drag the jaw or select a preset object to practice reading a vernier caliper.</p>
        <VernierCaliperSim />
      </div>

      {/* 6c. SCREW GAUGE INTERACTIVE */}
      <div className="unit-detail-reveal glass-card rounded-3xl p-8" {...GSAP_REVEAL_STYLE}>
        <h2 className="text-3xl font-black mb-2">Screw Gauge — Interactive</h2>
        <p className="text-gray-400 mb-6">Rotate the thimble to practice reading a screw gauge measurement.</p>
        <ScrewGaugeSim />
      </div>

      {/* MEASUREMENT ERROR VISUALIZATION */}
      <div className="unit-detail-reveal glass-card rounded-3xl p-8" {...GSAP_REVEAL_STYLE}>
        <h2 className="text-3xl font-black mb-2">Measurement Error Visualization</h2>
        <p className="text-gray-400 mb-6">See the difference between accuracy and precision with interactive measurement trials.</p>
        <MeasurementErrorViz />
      </div>

      {/* 7. Errors & Significant Figures */}
      <div className="unit-detail-reveal glass-card rounded-3xl p-8" {...GSAP_REVEAL_STYLE}>
        <h2 className="text-3xl font-black mb-6">{t('unit1.errors')}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-brand-rose mb-3">{t('unit1.errors.typesTitle')}</h4>
            <ul className="space-y-2 text-gray-300 text-sm"><li>• {t('unit1.errors.systematic')}</li><li>• {t('unit1.errors.random')}</li></ul>
          </div>
          <div>
            <h4 className="font-bold text-brand-cyan mb-3">{t('unit1.sigFigs.title')}</h4>
            <ul className="space-y-1.5 text-sm text-gray-300"><li>{t('unit1.sigFigs.rule1')}</li><li>{t('unit1.sigFigs.rule2')}</li><li>{t('unit1.sigFigs.rule3')}</li><li>{t('unit1.sigFigs.rule4')}</li></ul>
          </div>
        </div>
      </div>

      {/* MATCHING GAME */}
      <div className="unit-detail-reveal glass-card rounded-3xl p-8" {...GSAP_REVEAL_STYLE}>
        <h3 className="text-2xl font-bold mb-4">{t('unit1.matchingGame')}</h3>
        <p className="text-sm text-gray-400 mb-6">{t('unit1.matchingGameDesc')}</p>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="font-bold text-brand-cyan mb-3">{t('unit1.match.physicalQuantities')}</p>
            {quantitiesList.map(q => (
              <button key={q.id} onClick={() => handleQuantityClick(q.id, q.pairId)} disabled={matchedPairs.includes(q.pairId)} className={`w-full p-4 mb-2 rounded-xl text-start flex justify-between border-2 transition-all ${matchedPairs.includes(q.pairId) ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : matchResult?.pairId === q.pairId && !matchResult.correct ? 'bg-red-500/20 border-red-500 text-red-400' : matchSelectedQ === q.id ? 'bg-brand-cyan/20 border-brand-cyan' : 'glass-card border-white/10'}`}>
                {t(quantityKeys[q.id])}{matchedPairs.includes(q.pairId) && <Check size={18} />}
              </button>
            ))}
          </div>
          <div>
            <p className="font-bold text-brand-amber mb-3">{t('unit1.match.siUnitsShuffled')}</p>
            {unitsList.map(u => (
              <button key={u.id} onClick={() => handleUnitClick(u.id, u.pairId)} disabled={matchedPairs.includes(u.pairId)} className={`w-full p-4 mb-2 rounded-xl text-start flex justify-between border-2 transition-all ${matchedPairs.includes(u.pairId) ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : matchResult?.pairId === u.pairId && !matchResult.correct ? 'bg-red-500/20 border-red-500 text-red-400' : matchSelectedU === u.id ? 'bg-brand-amber/20 border-brand-amber' : 'glass-card border-white/10'}`}>
                {t(unitKeys[u.id])}{matchedPairs.includes(u.pairId) && <Check size={18} />}
              </button>
            ))}
          </div>
        </div>
        <button onClick={resetGame} className="mt-6 text-sm text-gray-400 hover:text-white flex items-center gap-2 mx-auto"><RotateCcw size={16} /> Reset Game</button>
      </div>

      {/* SCIENTIFIC NOTATION CONVERTER */}
      <div className="unit-detail-reveal glass-card rounded-3xl p-8" {...GSAP_REVEAL_STYLE}>
        <h2 className="text-3xl font-black mb-2">Scientific Notation Converter</h2>
        <p className="text-gray-400 mb-6">Convert between standard and scientific notation, and explore SI prefixes.</p>
        <ScientificNotationConverter />
      </div>

      {/* Quiz Section */}
      <QuizEngine
        config={{
          unitId: 'class-ix-unit-1',
          quizKey: 'unit1-quiz',
          title: t('unit1.quizSection'),
          questions: [
            // MCQ Questions
            { id: 'mcq1', type: 'mcq', question: t('unit1.quiz.q1'), options: [t('unit1.quiz.q1.opt1'), t('unit1.quiz.q1.opt2'), t('unit1.quiz.q1.opt3'), t('unit1.quiz.q1.opt4')], correctIndex: 1, explanation: t('unit1.quiz.q1.exp') },
            { id: 'mcq2', type: 'mcq', question: t('unit1.quiz.q2'), options: [t('unit1.quiz.q2.opt1'), t('unit1.quiz.q2.opt2'), t('unit1.quiz.q2.opt3'), t('unit1.quiz.q2.opt4')], correctIndex: 2, explanation: t('unit1.quiz.q2.exp') },
            { id: 'mcq3', type: 'mcq', question: t('unit1.quiz.q3'), options: [t('unit1.quiz.q3.opt1'), t('unit1.quiz.q3.opt2'), t('unit1.quiz.q3.opt3'), t('unit1.quiz.q3.opt4')], correctIndex: 1, explanation: t('unit1.quiz.q3.exp') },
            // True/False Questions
            { id: 'tf1', type: 'trueFalse', question: t('unit1.tf.q1'), correctAnswer: false, explanation: t('unit1.tf.q1.exp') },
            { id: 'tf2', type: 'trueFalse', question: t('unit1.tf.q2'), correctAnswer: true, explanation: t('unit1.tf.q2.exp') },
            // Numerical Questions
            { id: 'num1', type: 'numerical', question: t('unit1.num.q1'), correctAnswer: 2500, tolerance: 0, unit: 'mm', hint: t('unit1.num.q1.hint'), explanation: t('unit1.num.q1.exp') },
            { id: 'num2', type: 'numerical', question: t('unit1.num.q2'), correctAnswer: 0.5, tolerance: 0.01, unit: 'kg', hint: t('unit1.num.q2.hint'), explanation: t('unit1.num.q2.exp') },
            // Match Question
            { id: 'match1', type: 'match', question: t('unit1.match.q1.title'), pairs: [
              { left: t('unit1.match.q1.pair1.left'), right: t('unit1.match.q1.pair1.right') },
              { left: t('unit1.match.q1.pair2.left'), right: t('unit1.match.q1.pair2.right') },
              { left: t('unit1.match.q1.pair3.left'), right: t('unit1.match.q1.pair3.right') },
              { left: t('unit1.match.q1.pair4.left'), right: t('unit1.match.q1.pair4.right') },
              { left: t('unit1.match.q1.pair5.left'), right: t('unit1.match.q1.pair5.right') },
            ], explanation: t('unit1.match.q1.exp') },
            // Concept Test
            { id: 'concept1', type: 'conceptTest', question: t('unit1.concept.q1.title'), scenario: t('unit1.concept.q1.scenario'), subQuestions: [
              { id: 'c1s1', type: 'mcq', question: t('unit1.concept.q1.sub1'), options: [t('unit1.concept.q1.sub1.opt1'), t('unit1.concept.q1.sub1.opt2'), t('unit1.concept.q1.sub1.opt3'), t('unit1.concept.q1.sub1.opt4')], correctIndex: 1, explanation: t('unit1.concept.q1.sub1.exp') },
              { id: 'c1s2', type: 'mcq', question: t('unit1.concept.q1.sub2'), options: [t('unit1.concept.q1.sub2.opt1'), t('unit1.concept.q1.sub2.opt2'), t('unit1.concept.q1.sub2.opt3'), t('unit1.concept.q1.sub2.opt4')], correctIndex: 1, explanation: t('unit1.concept.q1.sub2.exp') },
              { id: 'c1s3', type: 'trueFalse', question: t('unit1.concept.q1.sub3'), correctAnswer: true, explanation: t('unit1.concept.q1.sub3.exp') },
            ], explanation: t('unit1.concept.q1.exp') },
          ],
          onComplete: () => {},
        }}
      />
    </div>
  );
}