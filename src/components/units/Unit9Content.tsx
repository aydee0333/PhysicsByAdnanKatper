import { useState, useRef, useEffect, useMemo } from 'react';
import { Thermometer, Flame, Snowflake, Wind, Gauge } from 'lucide-react';
import { useT } from '../../i18n/LanguageContext';
import { GSAP_REVEAL_STYLE } from '../../utils/styles';
import Section from '../Section';
import UnitQuiz from '../UnitQuiz';

/* ─── HEAT TRANSFER: CONDUCTION / CONVECTION / RADIATION ─── */
function HeatTransferSim() {
  const [temperature, setTemperature] = useState(80);
  const [playing, setPlaying] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    const panelW = (w - 40) / 3;

    const draw = () => {
      if (playing) tRef.current += 0.02;
      ctx.clearRect(0, 0, w, h);

      const panels: { x: number; title: string; subtitle: string; color: string }[] = [
        { x: 10, title: 'Conduction', subtitle: '(solid)', color: '244,63,94' },
        { x: 10 + panelW + 10, title: 'Convection', subtitle: '(fluid)', color: '245,158,11' },
        { x: 10 + 2 * (panelW + 10), title: 'Radiation', subtitle: '(no medium)', color: '132,204,22' },
      ];

      panels.forEach((panel, pi) => {
        const cx = panel.x + panelW / 2;
        const [r, g, b] = panel.color.split(',').map(Number);

        // Panel background
        ctx.fillStyle = `rgba(${r},${g},${b},0.05)`;
        ctx.fillRect(panel.x, 0, panelW, h);
        ctx.strokeStyle = `rgba(${r},${g},${b},0.2)`;
        ctx.lineWidth = 1;
        ctx.strokeRect(panel.x, 0, panelW, h);

        // Title
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.font = 'bold 12px Poppins'; ctx.textAlign = 'center';
        ctx.fillText(panel.title, cx, 22);
        ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '10px Poppins';
        ctx.fillText(panel.subtitle, cx, 38);

        if (pi === 0) {
          // CONDUCTION: particle chain
          const rodY = h / 2;
          const rodX = panel.x + 20;
          const rodW = panelW - 40;
          ctx.fillStyle = `rgba(${r},${g},${b},0.1)`;
          ctx.fillRect(rodX, rodY - 15, rodW, 30);

          for (let i = 0; i < 12; i++) {
            const px = rodX + 15 + i * ((rodW - 30) / 11);
            const amp = (temperature / 100) * 4;
            const phase = tRef.current * 3 + i * 0.5;

            // Hot side = more vibration
            const heatFactor = 1 - i / 11;
            const localAmp = amp * (0.3 + heatFactor * 0.7);
            const localPy = rodY + Math.sin(phase) * localAmp;

            ctx.fillStyle = `rgba(${r},${g},${b},${0.4 + heatFactor * 0.5})`;
            ctx.beginPath(); ctx.arc(px, localPy, 5, 0, Math.PI * 2); ctx.fill();

            // Connection lines
            if (i < 11) {
              const nextPx = rodX + 15 + (i + 1) * ((rodW - 30) / 11);
              ctx.strokeStyle = `rgba(${r},${g},${b},0.15)`; ctx.lineWidth = 1;
              ctx.beginPath(); ctx.moveTo(px, localPy); ctx.lineTo(nextPx, rodY + Math.sin(tRef.current * 3 + (i + 1) * 0.5) * localAmp * 0.8); ctx.stroke();
            }
          }

          // Labels
          ctx.fillStyle = '#f43f5e'; ctx.font = '9px Poppins'; ctx.textAlign = 'center';
          ctx.fillText('Hot', rodX + 15, rodY + 30);
          ctx.fillStyle = 'rgba(255,255,255,0.4)';
          ctx.fillText('Cold', rodX + rodW - 15, rodY + 30);
          ctx.fillText('Energy →', cx, rodY - 25);

        } else if (pi === 1) {
          // CONVECTION: circular current
          const circX = cx, circY = h / 2;
          const radius = 50;

          // Container
          ctx.strokeStyle = `rgba(${r},${g},${b},0.3)`; ctx.lineWidth = 2;
          ctx.strokeRect(panel.x + 15, circY - radius - 20, panelW - 30, radius * 2 + 40);

          // Hot zone at bottom
          ctx.fillStyle = `rgba(244,63,94,0.15)`;
          ctx.fillRect(panel.x + 16, circY + radius - 10, panelW - 32, 30);

          // Particles in convection loop
          for (let i = 0; i < 16; i++) {
            const angle = tRef.current + (i / 16) * Math.PI * 2;
            const rx = radius * 0.7 * Math.cos(angle);
            const ry = radius * 0.7 * Math.sin(angle);
            const px = circX + rx;
            const py = circY + ry;

            const isHot = Math.sin(angle) > 0;
            ctx.fillStyle = isHot ? `rgba(244,63,94,0.6)` : `rgba(${r},${g},${b},0.5)`;
            ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
          }

          // Flow arrows
          ctx.strokeStyle = `rgba(${r},${g},${b},0.3)`; ctx.lineWidth = 1.5;
          // Up arrow (center)
          ctx.beginPath(); ctx.moveTo(circX, circY + radius * 0.5); ctx.lineTo(circX, circY - radius * 0.5); ctx.stroke();
          // Down arrows (sides)
          ctx.beginPath(); ctx.moveTo(circX - radius * 0.5, circY - radius * 0.5); ctx.lineTo(circX - radius * 0.5, circY + radius * 0.5); ctx.stroke();

          ctx.fillStyle = `rgba(${r},${g},${b},0.5)`; ctx.font = '8px Poppins'; ctx.textAlign = 'center';
          ctx.fillText('↑ hot', circX, circY - radius * 0.6);
          ctx.fillText('↓ cool', circX - radius * 0.5, circY + radius * 0.7);
          ctx.fillText('🔥', circX, circY + radius + 15);

        } else {
          // RADIATION: wavy lines between objects
          const leftX = panel.x + 30, rightX = panel.x + panelW - 30;
          const objY = h / 2;

          // Hot object
          ctx.fillStyle = 'rgba(244,63,94,0.3)';
          ctx.fillRect(leftX - 10, objY - 25, 20, 50);
          ctx.strokeStyle = '#f43f5e'; ctx.lineWidth = 2;
          ctx.strokeRect(leftX - 10, objY - 25, 20, 50);
          ctx.fillStyle = '#f43f5e'; ctx.font = '8px Poppins'; ctx.textAlign = 'center';
          ctx.fillText('Hot', leftX, objY + 40);

          // Cold object
          ctx.fillStyle = 'rgba(6,182,212,0.3)';
          ctx.fillRect(rightX - 10, objY - 25, 20, 50);
          ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 2;
          ctx.strokeRect(rightX - 10, objY - 25, 20, 50);
          ctx.fillStyle = '#06b6d4'; ctx.font = '8px Poppins';
          ctx.fillText('Cold', rightX, objY + 40);

          // IR waves
          for (let w = 0; w < 5; w++) {
            const waveY = objY - 15 + w * 8;
            ctx.strokeStyle = `rgba(${r},${g},${b},${0.2 + (temperature / 100) * 0.4})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            for (let x = leftX + 15; x < rightX - 15; x += 2) {
              const t = (x - leftX - 15) / (rightX - leftX - 30);
              const amp = 5 * Math.sin(t * Math.PI);
              const yy = waveY + amp * Math.sin(x * 0.3 + tRef.current * 4 + w);
              if (x === leftX + 15) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
            }
            ctx.stroke();
          }

          ctx.fillStyle = `rgba(${r},${g},${b},0.5)`; ctx.font = '8px Poppins'; ctx.textAlign = 'center';
          ctx.fillText('IR Radiation', cx, objY - 35);
          ctx.fillText('No medium needed!', cx, objY + 55);
        }
      });
    };

    const animate = () => {
      draw();
      animRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, [temperature, playing]);

  return (
    <div>
      <div className="flex gap-4 mb-4 items-center">
        <div className="flex-1">
          <label className="text-gray-400 text-sm block mb-2">Source Temperature: {temperature}°C</label>
          <input type="range" min={20} max={150} value={temperature} onChange={e => setTemperature(Number(e.target.value))} className="w-full accent-brand-amber" />
        </div>
        <button onClick={() => setPlaying(!playing)} className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${playing ? 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/30' : 'glass-card text-gray-400 border-white/10'}`}>
          {playing ? '⏸ Pause' : '▶ Play'}
        </button>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={500} height={240} className="w-full" style={{ maxWidth: 500, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="glass-card rounded-xl p-2"><p className="text-brand-rose text-xs font-bold">Needs medium</p><p className="text-gray-500 text-xs">Particle vibration</p></div>
        <div className="glass-card rounded-xl p-2"><p className="text-brand-amber text-xs font-bold">Needs medium</p><p className="text-gray-500 text-xs">Bulk fluid motion</p></div>
        <div className="glass-card rounded-xl p-2"><p className="text-brand-lime text-xs font-bold">No medium</p><p className="text-gray-500 text-xs">Electromagnetic waves</p></div>
      </div>
    </div>
  );
}

/* ═══ 1. VIRTUAL THERMOMETER ═══ */
function VirtualThermometer() {
  const t = useT();
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
        <label className="text-gray-400 text-sm block mb-2">{t('unit9.tempSlider').replace('{celsius}', String(celsius))}</label>
        <input type="range" min="-50" max="150" value={celsius} onChange={e => setCelsius(Number(e.target.value))} className="w-full accent-brand-amber" />
      </div>
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 p-6 mb-4">
        <div className="flex items-center justify-center gap-8">
          <div className="relative" style={{ width: 40, height: 200 }}>
            <div className="absolute bottom-0 left-0 w-full rounded-b-full" style={{ height: `${((celsius + 50) / 200) * 100}%`, backgroundColor: getColor(), opacity: 0.6, transition: 'all 0.3s' }} />
            <div className="absolute inset-0 border-2 border-white/20 rounded-t-full rounded-b-full" />
            <div className="absolute -left-16 top-0 text-gray-400 text-xs">150°C</div>
            <div className="absolute -left-12 top-1/2 text-gray-400 text-xs">50°C</div>
            <div className="absolute -left-16 bottom-0 text-gray-400 text-xs">-50°C</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="formula-box rounded-xl p-4 text-center"><p className="text-gray-400 text-xs uppercase mb-1">{t('unit9.celsius')}</p><p className="text-2xl font-space font-bold" style={{ color: getColor() }}>{celsius}°C</p></div>
            <div className="formula-box rounded-xl p-4 text-center"><p className="text-gray-400 text-xs uppercase mb-1">{t('unit9.kelvin')}</p><p className="text-2xl font-space font-bold text-brand-cyan">{kelvin} K</p></div>
            <div className="formula-box rounded-xl p-4 text-center"><p className="text-gray-400 text-xs uppercase mb-1">{t('unit9.fahrenheit')}</p><p className="text-2xl font-space font-bold text-brand-pink">{fahrenheit.toFixed(1)}°F</p></div>
          </div>
        </div>
      </div>
      <div className="formula-box rounded-xl p-4 text-center"><p className="text-sm font-space text-gray-300">{t('unit9.tempFormula')}</p></div>
    </div>
  );
}

/* ═══ 2. THERMAL EXPANSION ═══ */
function ThermalExpansionSim() {
  const t = useT();
  const [temp, setTemp] = useState(20);
  const alpha = 1.2e-5;
  const L0 = 100;
  const deltaT = temp - 20;
  const newLen = L0 * (1 + alpha * deltaT * 1000);

  return (
    <div>
      <div className="mb-4"><label className="text-gray-400 text-sm block mb-2">{t('unit9.tempSlider2').replace('{temp}', String(temp))}</label><input type="range" min="20" max="500" value={temp} onChange={e => setTemp(Number(e.target.value))} className="w-full accent-brand-amber" /></div>
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 p-6 mb-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1"><p className="text-gray-400 text-xs mb-1">{t('unit9.original')}</p><div className="h-4 bg-brand-cyan/30 rounded" style={{ width: '100%' }} /><p className="text-brand-cyan text-xs mt-1">{L0} cm</p></div>
          <span className="text-gray-500">→</span>
          <div className="flex-1"><p className="text-gray-400 text-xs mb-1">{t('unit9.afterHeating')}</p><div className="h-4 bg-brand-amber/30 rounded" style={{ width: `${(newLen / L0) * 100}%`, maxWidth: '100%' }} /><p className="text-brand-amber text-xs mt-1">{newLen.toFixed(2)} cm</p></div>
        </div>
      </div>
      <div className="formula-box rounded-xl p-4 text-center mb-4"><p className="text-gray-400 text-xs uppercase mb-1">{t('unit9.newLength').replace('{length}', newLen.toFixed(2))}</p><p className="text-xl font-space font-bold text-brand-amber">ΔL = {alpha} × {L0} × {deltaT} = {(alpha * L0 * deltaT * 1000).toFixed(3)} cm</p></div>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="glass-card rounded-xl p-3"><p className="text-brand-cyan font-bold text-sm">{t('unit9.bridges')}</p><p className="text-gray-400 text-xs">{t('unit9.bridgesDesc')}</p></div>
        <div className="glass-card rounded-xl p-3"><p className="text-brand-pink font-bold text-sm">{t('unit9.metalLids')}</p><p className="text-gray-400 text-xs">{t('unit9.metalLidsDesc')}</p></div>
        <div className="glass-card rounded-xl p-3"><p className="text-brand-amber font-bold text-sm">{t('unit9.balloon')}</p><p className="text-gray-400 text-xs">{t('unit9.balloonDesc')}</p></div>
      </div>
    </div>
  );
}

/* ═══ 3. SPECIFIC HEAT ═══ */
function SpecificHeatSim() {
  const t = useT();
  const [mass, setMass] = useState(1);
  const [deltaT, setDeltaT] = useState(10);
  const [material, setMaterial] = useState('water');
  const materials: Record<string, { c: number; color: string }> = {
    water: { c: 4186, color: 'text-brand-cyan' },
    iron: { c: 450, color: 'text-brand-rose' },
    sand: { c: 830, color: 'text-brand-amber' },
  };
  const c = materials[material].c;
  const Q = mass * c * deltaT;

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div><label className="text-gray-400 text-sm block mb-2">{t('unit9.massSlider').replace('{mass}', String(mass))}</label><input type="range" min="0.1" max="10" step="0.1" value={mass} onChange={e => setMass(Number(e.target.value))} className="w-full accent-brand-rose" /></div>
        <div><label className="text-gray-400 text-sm block mb-2">{t('unit9.deltaTSlider').replace('{deltaT}', String(deltaT))}</label><input type="range" min="1" max="100" value={deltaT} onChange={e => setDeltaT(Number(e.target.value))} className="w-full accent-brand-amber" /></div>
      </div>
      <div className="flex gap-3 mb-4">
        <button onClick={() => setMaterial('water')} className={`flex-1 py-2 rounded-xl text-sm font-semibold ${material === 'water' ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : 'glass-card text-gray-400'}`}>{t('unit9.water')}</button>
        <button onClick={() => setMaterial('iron')} className={`flex-1 py-2 rounded-xl text-sm font-semibold ${material === 'iron' ? 'bg-brand-rose/20 text-brand-rose border border-brand-rose/30' : 'glass-card text-gray-400'}`}>{t('unit9.iron')}</button>
        <button onClick={() => setMaterial('sand')} className={`flex-1 py-2 rounded-xl text-sm font-semibold ${material === 'sand' ? 'bg-brand-amber/20 text-brand-amber border border-brand-amber/30' : 'glass-card text-gray-400'}`}>{t('unit9.sand')}</button>
      </div>
      <div className="formula-box rounded-2xl p-6 text-center mb-4">
        <p className="text-gray-400 text-xs uppercase mb-2">Q = mcΔT</p>
        <p className="text-3xl font-space font-bold text-brand-rose">Q = {mass} × {c} × {deltaT} = <span className="text-brand-cyan">{Q.toFixed(0)} J</span></p>
      </div>
      <div className="glass-card rounded-xl p-4 mb-4"><p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit9.specificHeatNote').replace('{color}', materials[material].color).replace('{material}', material).replace('{c}', String(c)) }}></p></div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="glass-card rounded-xl p-3"><p className="text-brand-cyan font-bold text-sm">{t('unit9.highCNote')}</p></div>
        <div className="glass-card rounded-xl p-3"><p className="text-brand-rose font-bold text-sm">{t('unit9.lowCNote')}</p></div>
      </div>
    </div>
  );
}

/* ═══ 4. ICE MELTING SIM ═══ */
function IceMeltingSim() {
  const t = useT();
  const [heat, setHeat] = useState(0);
  const maxHeat = 500;
  const phase = heat < 100 ? 'ice' : heat < 200 ? 'melting' : heat < 350 ? 'water' : heat < 400 ? 'boiling' : 'steam';
  const temp = phase === 'ice' ? -20 + heat * 0.4 : phase === 'melting' ? 0 : phase === 'water' ? (heat - 200) * 0.67 : phase === 'boiling' ? 100 : 100 + (heat - 400) * 0.5;

  return (
    <div>
      <div className="mb-4"><label className="text-gray-400 text-sm block mb-2">Heat Energy: {heat} kJ</label><input type="range" min="0" max={maxHeat} value={heat} onChange={e => setHeat(Number(e.target.value))} className="w-full accent-brand-rose" /></div>
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 p-6 mb-4">
        <div className="text-center mb-4">
          <div className="text-6xl mb-2">{phase === 'ice' ? '🧊' : phase === 'melting' ? '💧' : phase === 'water' ? '💧' : phase === 'boiling' ? '♨️' : '☁️'}</div>
          <p className="text-white font-bold text-lg capitalize">{phase === 'ice' ? t('unit9.ice') : phase === 'melting' ? t('unit9.melting') : phase === 'water' ? t('unit9.liquidWater') : phase === 'boiling' ? t('unit9.evaporationProcess') : t('unit9.steam')}</p>
          <p className="text-brand-cyan font-space text-2xl font-bold">{temp.toFixed(1)}°C</p>
        </div>
        <div className="w-full bg-white/10 rounded-full h-3"><div className="h-full rounded-full bg-brand-rose transition-all" style={{ width: `${(heat / maxHeat) * 100}%` }} /></div>
        <div className="flex justify-between text-gray-500 text-xs mt-1"><span>0 kJ</span><span>{maxHeat} kJ</span></div>
      </div>
      <div className="glass-card rounded-xl p-4"><p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit9.latentHeatKeyPoint') }} ></p></div>
    </div>
  );
}

/* ═══ 5. WATER CYCLE ═══ */
function WaterCycleDiagram() {
  const t = useT();
  return (
    <div className="bg-brand-dark/60 rounded-2xl border border-white/5 p-6">
      <svg width="100%" height="300" viewBox="0 0 500 300">
        <rect x="50" y="200" width="400" height="80" fill="rgba(6,182,212,0.1)" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
        <rect x="50" y="200" width="400" height="20" fill="rgba(6,182,212,0.2)" />
        <text x="250" y="250" textAnchor="middle" fill="#06b6d4" fontSize="14" fontWeight="bold">{t('unit9.waterLabel')}</text>
        <polygon points="250,40 200,200 300,200" fill="rgba(124,58,237,0.2)" stroke="rgba(124,58,237,0.3)" strokeWidth="1" />
        <text x="250" y="140" textAnchor="middle" fill="#7c3aed" fontSize="12" fontWeight="bold">{t('unit9.iceLabel')}</text>
        <circle cx="250" cy="30" r="15" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <text x="250" y="35" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">{t('unit9.steamLabel')}</text>
        <path d="M 240 200 Q 200 170 245 45" fill="none" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow9)" />
        <text x="200" y="120" fill="#f59e0b" fontSize="10">{t('unit9.melting')}</text>
        <path d="M 260 45 Q 300 170 260 200" fill="none" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrow9)" />
        <text x="310" y="120" fill="#06b6d4" fontSize="10">{t('unit9.condensation')}</text>
        <path d="M 100 200 Q 80 150 120 100" fill="none" stroke="#84cc16" strokeWidth="2" markerEnd="url(#arrow9)" />
        <text x="60" y="150" fill="#84cc16" fontSize="10">{t('unit9.evaporationProcess')}</text>
        <path d="M 380 100 Q 420 150 400 200" fill="none" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrow9)" />
        <text x="400" y="150" fill="#ec4899" fontSize="10">{t('unit9.freezing')}</text>
        <defs><marker id="arrow9" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M 0 8 L 4 0 L 8 8" fill="currentColor" /></marker></defs>
      </svg>
    </div>
  );
}

/* ═══ 6. EVAPORATION FACTORS ═══ */
function WetClothSim() {
  const t = useT();
  const [temp, setTemp] = useState(25);
  const [wind, setWind] = useState(0);
  const rate = (temp / 50) * 0.5 + (wind / 100) * 0.5;
  const rateLabel = rate > 0.7 ? t('unit9.fast') : rate > 0.3 ? t('unit9.medium') : t('unit9.slow');

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div><label className="text-gray-400 text-sm block mb-2">{t('unit9.tempSlider3').replace('{temp}', String(temp))}</label><input type="range" min="0" max="50" value={temp} onChange={e => setTemp(Number(e.target.value))} className="w-full accent-brand-amber" /></div>
        <div><label className="text-gray-400 text-sm block mb-2">{t('unit9.windSpeed').replace('{wind}', String(wind))}</label><input type="range" min="0" max="100" value={wind} onChange={e => setWind(Number(e.target.value))} className="w-full accent-brand-cyan" /></div>
      </div>
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 p-6 mb-4 text-center">
        <div className="text-6xl mb-2">👕</div>
        <p className="text-white font-bold mb-2">{t('unit9.wetCloth')}</p>
        <div className="w-full bg-white/10 rounded-full h-4 mb-2"><div className="h-full rounded-full bg-brand-cyan transition-all" style={{ width: `${(1 - rate) * 100}%` }} /></div>
        <p className="text-gray-400 text-sm">{t('unit9.evapRate').replace('{rate}', rateLabel)}</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="glass-card rounded-xl p-3"><p className="text-brand-cyan font-bold text-sm">{t('unit9.clothesDrying')}</p><p className="text-gray-400 text-xs">{t('unit9.clothesDryingDesc')}</p></div>
        <div className="glass-card rounded-xl p-3"><p className="text-brand-pink font-bold text-sm">{t('unit9.sweating')}</p><p className="text-gray-400 text-xs">{t('unit9.sweatingDesc')}</p></div>
      </div>
    </div>
  );
}

/* ═══ 7. BOYLE'S LAW ═══ */
function BoylesLawSim() {
  const t = useT();
  const [volume, setVolume] = useState(50);
  const P1V1 = 50 * 100;
  const pressure = P1V1 / volume;

  return (
    <div>
      <div className="mb-4"><label className="text-gray-400 text-sm block mb-2">{t('unit9.volumeSlider').replace('{volume}', String(volume))}</label><input type="range" min="10" max="100" value={volume} onChange={e => setVolume(Number(e.target.value))} className="w-full accent-brand-purple" /></div>
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 p-6 mb-4">
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <div className="w-16 bg-brand-purple/30 rounded border-2 border-brand-purple mx-auto" style={{ height: `${volume * 1.5}px`, maxHeight: 150 }} />
            <p className="text-brand-purple text-sm mt-2">{volume} mL</p>
          </div>
          <div className="text-gray-500 text-2xl">⇌</div>
          <div className="text-center">
            <div className="w-16 bg-brand-cyan/30 rounded border-2 border-brand-cyan mx-auto" style={{ height: Math.min(150, 150 * (50 / volume)) }} />
            <p className="text-brand-cyan text-sm mt-2">{pressure.toFixed(0)} Pa</p>
          </div>
        </div>
      </div>
      <div className="formula-box rounded-xl p-4 text-center mb-4"><p className="text-gray-400 text-xs uppercase mb-1">P₁V₁ = P₂V₂</p><p className="text-xl font-space font-bold text-white">50 × 100 = {volume} × <span className="text-brand-cyan">{pressure.toFixed(0)}</span></p></div>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="glass-card rounded-xl p-3"><p className="text-brand-purple font-bold text-sm">{t('unit9.syringe')}</p><p className="text-gray-400 text-xs">{t('unit9.syringDesc')}</p></div>
        <div className="glass-card rounded-xl p-3"><p className="text-brand-pink font-bold text-sm">{t('unit9.balloonExample')}</p><p className="text-gray-400 text-xs">{t('unit9.balloonDesc2')}</p></div>
        <div className="glass-card rounded-xl p-3"><p className="text-brand-cyan font-bold text-sm">{t('unit9.scubaTank')}</p><p className="text-gray-400 text-xs">{t('unit9.scubaTankDesc')}</p></div>
      </div>
    </div>
  );
}

/* ═══ 8. HEATING CURVE WITH LATENT HEAT ═══ */
function HeatingCurveSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [energy, setEnergy] = useState(0);

  const getTemperature = (e: number): number => {
    if (e <= 100) return -20 + e * 0.2;
    if (e <= 200) return 0;
    if (e <= 350) return (e - 200) * (100 / 150);
    if (e <= 400) return 100;
    return 100 + (e - 400) * 0.2;
  };

  const getPhase = (e: number): string => {
    if (e <= 100) return 'Ice';
    if (e <= 200) return 'Ice + Water (Melting)';
    if (e <= 350) return 'Water';
    if (e <= 400) return 'Water + Steam (Boiling)';
    return 'Steam';
  };

  const getPhaseColor = (e: number): string => {
    if (e <= 100) return '#06b6d4';
    if (e <= 200) return '#84cc16';
    if (e <= 350) return '#f59e0b';
    if (e <= 400) return '#ec4899';
    return '#f43f5e';
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const ml = 70, mr = 20, mt = 20, mb = 60;
    const pw = w - ml - mr, ph = h - mt - mb;
    const xMin = 0, xMax = 500, yMin = -20, yMax = 140;
    const xScale = pw / (xMax - xMin);
    const yScale = ph / (yMax - yMin);
    const toX = (e: number) => ml + (e - xMin) * xScale;
    const toY = (t: number) => mt + ph - (t - yMin) * yScale;

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (let t = 0; t <= 120; t += 20) {
      ctx.beginPath(); ctx.moveTo(ml, toY(t)); ctx.lineTo(ml + pw, toY(t)); ctx.stroke();
    }
    for (let e = 0; e <= 500; e += 100) {
      ctx.beginPath(); ctx.moveTo(toX(e), mt); ctx.lineTo(toX(e), mt + ph); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(ml, mt); ctx.lineTo(ml, mt + ph); ctx.lineTo(ml + pw, mt + ph); ctx.stroke();

    // Axis labels
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '12px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText('Heat Energy (kJ)', ml + pw / 2, h - 8);
    ctx.save();
    ctx.translate(16, mt + ph / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Temperature (\u00B0C)', 0, 0);
    ctx.restore();

    // Tick labels
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '10px Poppins';
    ctx.textAlign = 'center';
    for (let e = 0; e <= 500; e += 100) ctx.fillText(String(e), toX(e), mt + ph + 16);
    ctx.textAlign = 'right';
    for (let t = -20; t <= 140; t += 20) ctx.fillText(`${t}\u00B0`, ml - 8, toY(t) + 4);

    // Highlight latent heat regions
    ctx.fillStyle = 'rgba(132,204,22,0.06)';
    ctx.fillRect(toX(100), mt, toX(200) - toX(100), ph);
    ctx.fillStyle = 'rgba(236,72,153,0.06)';
    ctx.fillRect(toX(350), mt, toX(400) - toX(350), ph);

    // Draw curve segments
    const segments = [
      { s: 0, e: 100, c: '#06b6d4' },
      { s: 100, e: 200, c: '#84cc16' },
      { s: 200, e: 350, c: '#f59e0b' },
      { s: 350, e: 400, c: '#ec4899' },
      { s: 400, e: 500, c: '#f43f5e' },
    ];
    for (const seg of segments) {
      ctx.strokeStyle = seg.c;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(toX(seg.s), toY(getTemperature(seg.s)));
      ctx.lineTo(toX(seg.e), toY(getTemperature(seg.e)));
      ctx.stroke();
    }

    // Latent heat annotation - Fusion
    ctx.font = 'bold 11px Poppins';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#84cc16';
    ctx.fillText('Latent Heat of Fusion', toX(150), toY(0) - 22);
    ctx.font = '10px Poppins';
    ctx.fillStyle = 'rgba(132,204,22,0.7)';
    ctx.fillText('(L_f = 334 kJ/kg)', toX(150), toY(0) - 8);

    // Latent heat annotation - Vaporization
    ctx.font = 'bold 11px Poppins';
    ctx.fillStyle = '#ec4899';
    ctx.fillText('Latent Heat of Vaporization', toX(375), toY(100) - 22);
    ctx.font = '10px Poppins';
    ctx.fillStyle = 'rgba(236,72,153,0.7)';
    ctx.fillText('(L_v = 2260 kJ/kg)', toX(375), toY(100) - 8);

    // Phase labels along bottom
    ctx.font = '10px Poppins';
    ctx.textAlign = 'center';
    const phaseLabels = [
      { x: 50, label: 'Ice', color: '#06b6d4' },
      { x: 150, label: 'Ice+Water', color: '#84cc16' },
      { x: 275, label: 'Water', color: '#f59e0b' },
      { x: 375, label: 'Water+Steam', color: '#ec4899' },
      { x: 450, label: 'Steam', color: '#f43f5e' },
    ];
    for (const pl of phaseLabels) {
      ctx.fillStyle = pl.color;
      ctx.fillText(pl.label, toX(pl.x), mt + ph + 36);
    }

    // Current dot crosshairs
    const curTemp = getTemperature(energy);
    const dotX = toX(energy);
    const dotY = toY(curTemp);
    const dotColor = getPhaseColor(energy);

    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(dotX, mt + ph); ctx.lineTo(dotX, dotY); ctx.lineTo(ml, dotY); ctx.stroke();
    ctx.setLineDash([]);

    // Glow
    const grad = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 20);
    grad.addColorStop(0, dotColor + '60');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(dotX, dotY, 20, 0, Math.PI * 2); ctx.fill();

    // Dot
    ctx.fillStyle = dotColor;
    ctx.beginPath(); ctx.arc(dotX, dotY, 7, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(dotX, dotY, 7, 0, Math.PI * 2); ctx.stroke();

  }, [energy]);

  const curTemp = getTemperature(energy);
  const curPhase = getPhase(energy);
  const curColor = getPhaseColor(energy);

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">Heat Energy: {energy} kJ</label>
        <input type="range" min="0" max="500" value={energy} onChange={e => setEnergy(Number(e.target.value))} className="w-full accent-brand-amber" />
      </div>
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 overflow-hidden mb-4">
        <canvas ref={canvasRef} width={600} height={350} className="w-full" style={{ maxWidth: 600, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="grid sm:grid-cols-3 gap-3 mb-4">
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">Temperature</p>
          <p className="text-2xl font-space font-bold" style={{ color: curColor }}>{curTemp.toFixed(1)}°C</p>
        </div>
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">Current Phase</p>
          <p className="text-lg font-bold" style={{ color: curColor }}>{curPhase}</p>
        </div>
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">Energy Absorbed</p>
          <p className="text-2xl font-space font-bold text-brand-amber">{energy} kJ</p>
        </div>
      </div>
      <div className="formula-box rounded-xl p-4 text-center">
        <p className="text-sm font-space text-gray-300">During phase changes (melting/boiling), temperature remains constant while latent heat is absorbed to change state.</p>
      </div>
    </div>
  );
}

/* ═══ 9. CHARLES'S LAW ═══ */
function CharlesLawSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [temp, setTemp] = useState(300);
  const tempRef = useRef(temp);
  const moleculesRef = useRef<{ x: number; y: number; vx: number; vy: number }[]>([]);
  const animRef = useRef<number>(0);

  const volume = temp / 10;
  const vtRatio = 0.1;

  useEffect(() => { tempRef.current = temp; }, [temp]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (moleculesRef.current.length === 0) {
      for (let i = 0; i < 25; i++) {
        moleculesRef.current.push({
          x: 80 + Math.random() * 100,
          y: 120 + Math.random() * 140,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
        });
      }
    }

    const draw = () => {
      animRef.current = requestAnimationFrame(draw);
      const w = canvas.width, h = canvas.height;
      const T = tempRef.current;

      ctx.clearRect(0, 0, w, h);

      // ── Piston ──
      const px = 50, pw = 150;
      const pBottom = 300;
      const minH = 50, maxH = 230;
      const pH = minH + (maxH - minH) * ((T - 200) / 300);
      const pTop = pBottom - pH;

      const speedF = Math.sqrt(T / 300) * 0.7;
      const mols = moleculesRef.current;

      for (const m of mols) {
        m.x += m.vx * speedF;
        m.y += m.vy * speedF;
        const r = 5;
        if (m.x - r < px + 3) { m.x = px + 3 + r; m.vx = Math.abs(m.vx); }
        if (m.x + r > px + pw - 3) { m.x = px + pw - 3 - r; m.vx = -Math.abs(m.vx); }
        if (m.y + r > pBottom - 3) { m.y = pBottom - 3 - r; m.vy = -Math.abs(m.vy); }
        if (m.y - r < pTop + 10) { m.y = pTop + 10 + r; m.vy = Math.abs(m.vy); }
      }

      // Gas fill
      ctx.fillStyle = 'rgba(6,182,212,0.1)';
      ctx.fillRect(px + 2, pTop + 8, pw - 4, pH - 10);

      // Molecules
      for (const m of mols) {
        const spd = Math.sqrt(m.vx * m.vx + m.vy * m.vy) * speedF;
        const alpha = Math.min(1, 0.4 + spd * 0.12);
        ctx.fillStyle = `rgba(6,182,212,${alpha})`;
        ctx.beginPath(); ctx.arc(m.x, m.y, 5, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = 'rgba(6,182,212,0.5)'; ctx.lineWidth = 1; ctx.stroke();
      }

      // Cylinder walls
      ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(px, pBottom); ctx.lineTo(px, pTop); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(px + pw, pBottom); ctx.lineTo(px + pw, pTop); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(px, pBottom); ctx.lineTo(px + pw, pBottom); ctx.stroke();

      // Piston head
      ctx.fillStyle = 'rgba(124,58,237,0.6)';
      ctx.fillRect(px - 5, pTop - 4, pw + 10, 10);
      ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2;
      ctx.strokeRect(px - 5, pTop - 4, pw + 10, 10);

      // Volume label
      ctx.fillStyle = '#a78bfa'; ctx.font = 'bold 12px Poppins'; ctx.textAlign = 'center';
      ctx.fillText(`V = ${(T / 10).toFixed(1)} mL`, px + pw / 2, pTop - 14);

      // ── Thermometer ──
      const tx = 230, tw = 18;
      const tTop = 50, tBot = 300;
      const tH = tBot - tTop;
      const tNorm = (T - 200) / 300;
      const fillH = tH * tNorm;
      const tColor = T < 273 ? '#06b6d4' : T < 350 ? '#f59e0b' : '#f43f5e';

      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      ctx.fillRect(tx, tTop, tw, tH);
      ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 2;
      ctx.strokeRect(tx, tTop, tw, tH);
      ctx.fillStyle = tColor + '70';
      ctx.fillRect(tx + 2, tBot - fillH, tw - 4, fillH);

      ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '10px Poppins'; ctx.textAlign = 'left';
      ctx.fillText(`${T} K`, tx + tw + 6, tBot - fillH + 4);
      ctx.fillText(`${(T - 273).toFixed(0)}\u00B0C`, tx + tw + 6, tBot - fillH + 18);

      for (let tk = 200; tk <= 500; tk += 50) {
        const ty = tBot - tH * ((tk - 200) / 300);
        ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(tx + 5, ty); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.font = '9px Poppins'; ctx.textAlign = 'right';
        ctx.fillText(`${tk}`, tx - 4, ty + 3);
      }

      // ── V vs T Graph ──
      const gx = 300, gw = 270, gTop = 30, gBot = 300;
      const gH = gBot - gTop;
      const gRight = gx + gw;

      ctx.fillStyle = 'rgba(255,255,255,0.02)';
      ctx.fillRect(gx, gTop, gw, gH);

      ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(gx, gBot); ctx.lineTo(gRight, gBot); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(gx, gBot); ctx.lineTo(gx, gTop); ctx.stroke();

      ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '11px Poppins'; ctx.textAlign = 'center';
      ctx.fillText('Temperature (K)', gx + gw / 2, gBot + 35);
      ctx.save(); ctx.translate(gx - 42, gTop + gH / 2); ctx.rotate(-Math.PI / 2);
      ctx.fillText('Volume (mL)', 0, 0); ctx.restore();

      const tRange = 550;
      const vRange = 55;

      ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = 1;
      for (let tk = 0; tk <= 500; tk += 100) {
        const gx2 = gx + gw * (tk / tRange);
        ctx.beginPath(); ctx.moveTo(gx2, gTop); ctx.lineTo(gx2, gBot); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.font = '9px Poppins'; ctx.textAlign = 'center';
        ctx.fillText(String(tk), gx2, gBot + 14);
      }
      for (let vk = 0; vk <= 50; vk += 10) {
        const gy = gBot - gH * (vk / vRange);
        ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gRight, gy); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.font = '9px Poppins'; ctx.textAlign = 'right';
        ctx.fillText(String(vk), gx - 6, gy + 3);
      }

      // V = kT line
      ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(gx, gBot);
      ctx.lineTo(gx + gw * (500 / tRange), gBot - gH * (50 / vRange));
      ctx.stroke();

      // Current point
      const curV = T / 10;
      const ptX = gx + gw * (T / tRange);
      const ptY = gBot - gH * (curV / vRange);

      const grd = ctx.createRadialGradient(ptX, ptY, 0, ptX, ptY, 15);
      grd.addColorStop(0, 'rgba(245,158,11,0.5)');
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.beginPath(); ctx.arc(ptX, ptY, 15, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = '#f59e0b';
      ctx.beginPath(); ctx.arc(ptX, ptY, 6, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(ptX, ptY, 6, 0, Math.PI * 2); ctx.stroke();

      ctx.fillStyle = '#f59e0b'; ctx.font = 'bold 11px Poppins'; ctx.textAlign = 'left';
      ctx.fillText(`(${T}K, ${curV.toFixed(1)}mL)`, ptX + 10, ptY - 8);

      ctx.fillStyle = 'rgba(6,182,212,0.6)'; ctx.font = 'bold 13px Poppins'; ctx.textAlign = 'center';
      ctx.fillText('V \u221D T', gx + gw * 0.65, gTop + 25);
      ctx.font = '10px Poppins'; ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.fillText('Straight line through origin', gx + gw * 0.65, gTop + 42);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">
          Temperature: {temp} K ({(temp - 273).toFixed(0)}°C)
        </label>
        <input type="range" min="200" max="500" value={temp} onChange={e => setTemp(Number(e.target.value))} className="w-full accent-brand-cyan" />
      </div>
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 overflow-hidden mb-4">
        <canvas ref={canvasRef} width={600} height={350} className="w-full" style={{ maxWidth: 600, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="grid sm:grid-cols-4 gap-3 mb-4">
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">Temperature</p>
          <p className="text-xl font-space font-bold text-brand-cyan">{temp} K</p>
        </div>
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">Temperature</p>
          <p className="text-xl font-space font-bold text-brand-amber">{(temp - 273).toFixed(0)}°C</p>
        </div>
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">Volume</p>
          <p className="text-xl font-space font-bold text-brand-pink">{volume.toFixed(1)} mL</p>
        </div>
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">V/T Ratio</p>
          <p className="text-xl font-space font-bold text-brand-lime">{vtRatio.toFixed(2)}</p>
        </div>
      </div>
      <div className="formula-box rounded-xl p-4 text-center">
        <p className="text-gray-400 text-xs uppercase mb-1">Charles's Law</p>
        <p className="text-sm font-space text-gray-300">V₁/T₁ = V₂/T₂ = constant (at fixed pressure)</p>
      </div>
    </div>
  );
}

/* ═══ MAIN UNIT 9 CONTENT ═══ */
export default function Unit9Content() {
  const t = useT();
  const quizQuestions = useMemo(() => [
    { question: t('unit9.quiz.q1'), options: [t('unit9.quiz.q1.opt1'), t('unit9.quiz.q1.opt2'), t('unit9.quiz.q1.opt3'), t('unit9.quiz.q1.opt4')], correctIndex: 2 },
    { question: t('unit9.quiz.q2'), options: [t('unit9.quiz.q2.opt1'), t('unit9.quiz.q2.opt2'), t('unit9.quiz.q2.opt3'), t('unit9.quiz.q2.opt4')], correctIndex: 1 },
    { question: t('unit9.quiz.q3'), options: [t('unit9.quiz.q3.opt1'), t('unit9.quiz.q3.opt2'), t('unit9.quiz.q3.opt3'), t('unit9.quiz.q3.opt4')], correctIndex: 1 },
    { question: t('unit9.quiz.q4'), options: [t('unit9.quiz.q4.opt1'), t('unit9.quiz.q4.opt2'), t('unit9.quiz.q4.opt3'), t('unit9.quiz.q4.opt4')], correctIndex: 1 },
    { question: t('unit9.quiz.q5'), options: [t('unit9.quiz.q5.opt1'), t('unit9.quiz.q5.opt2'), t('unit9.quiz.q5.opt3'), t('unit9.quiz.q5.opt4')], correctIndex: 2 },
  ], [t]);
  return (
    <div>
      <Section title={t('unit9.temperature')} icon={<Thermometer size={24} />} color="brand-cyan">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6"><p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit9.temperatureDef') }} ></p></div>
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          <div className="glass-card rounded-xl p-4"><p className="text-brand-rose font-bold mb-1">{t('unit9.heatTitle')}</p><p className="text-gray-400 text-sm" dangerouslySetInnerHTML={{ __html: t('unit9.heatDesc') }} ></p></div>
          <div className="glass-card rounded-xl p-4"><p className="text-brand-cyan font-bold mb-1">{t('unit9.tempTitle')}</p><p className="text-gray-400 text-sm" dangerouslySetInnerHTML={{ __html: t('unit9.tempDesc') }} ></p></div>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit9.thermometerSim')}</h4>
        <VirtualThermometer />
      </Section>

      <Section title={t('unit9.thermalExpansion')} icon={<Flame size={24} />} color="brand-amber">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6"><p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit9.expansionDef') }} ></p></div>
        <div className="formula-box rounded-2xl p-5 text-center mb-6"><p className="text-2xl font-space font-bold text-white">{t('unit9.expansionFormula')}</p><p className="text-gray-400 text-sm mt-2">{t('unit9.alphaNote')}</p></div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit9.metalRodSim')}</h4>
        <ThermalExpansionSim />
      </Section>

      <Section title={t('unit9.specificHeat')} icon={<Flame size={24} />} color="brand-rose">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6"><p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit9.specificHeatDef') }} ></p></div>
        <div className="formula-box rounded-2xl p-5 text-center mb-6"><p className="text-2xl font-space font-bold text-white">{t('unit9.specificHeatFormula')}</p></div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit9.heatMaterials')}</h4>
        <SpecificHeatSim />
      </Section>

      <Section title={t('unit9.latentHeat')} icon={<Snowflake size={24} />} color="brand-teal">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6"><p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit9.latentHeatDef') }} ></p></div>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="formula-box rounded-2xl p-5 text-center"><p className="text-gray-400 text-sm mb-2">{t('unit9.fusionTitle')}</p><p className="text-xl font-space font-bold text-brand-cyan">{t('unit9.fusionFormula')}</p><p className="text-gray-400 text-xs mt-1">{t('unit9.fusionNote')}</p></div>
          <div className="formula-box rounded-2xl p-5 text-center"><p className="text-gray-400 text-sm mb-2">{t('unit9.vaporizationTitle')}</p><p className="text-xl font-space font-bold text-brand-amber">{t('unit9.vaporizationFormula')}</p><p className="text-gray-400 text-xs mt-1">{t('unit9.vaporizationNote')}</p></div>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit9.iceWaterSim')}</h4>
        <IceMeltingSim />
      </Section>

      <Section title={t('unit9.changeOfState')} icon={<Snowflake size={24} />} color="brand-purple">
        <h4 className="text-lg font-bold text-white mb-4">{t('unit9.waterCycleSim')}</h4>
        <WaterCycleDiagram />
        <div className="grid sm:grid-cols-2 gap-3 mt-6">
          <div className="glass-card rounded-xl p-4"><p className="text-brand-cyan font-bold mb-1">{t('unit9.sublimation')}</p><p className="text-gray-400 text-sm">{t('unit9.sublimationDesc')}</p></div>
          <div className="glass-card rounded-xl p-4"><p className="text-brand-pink font-bold mb-1">{t('unit9.deposition')}</p><p className="text-gray-400 text-sm">{t('unit9.depositionDesc')}</p></div>
        </div>
      </Section>

      <Section title="Heating Curve" icon={<Flame size={24} />} color="brand-rose">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed">
            A heating curve shows how the temperature of a substance changes as heat energy is added. During <span className="text-brand-lime font-bold">phase changes</span> (melting and boiling), the temperature remains constant — the absorbed energy goes into breaking intermolecular bonds rather than increasing kinetic energy. These flat regions represent <span className="text-brand-pink font-bold">latent heat</span>.
          </p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">Heating Curve of Water</h4>
        <HeatingCurveSim />
      </Section>

      <Section title={t('unit9.evaporation')} icon={<Wind size={24} />} color="brand-lime">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6"><p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit9.evaporationDef') }} ></p></div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="glass-card rounded-xl p-3"><p className="text-brand-amber font-bold text-xs">{t('unit9.factorTemperature')}</p><p className="text-gray-400 text-xs">{t('unit9.factorTempEffect')}</p></div>
          <div className="glass-card rounded-xl p-3"><p className="text-brand-cyan font-bold text-xs">{t('unit9.factorSurfaceArea')}</p><p className="text-gray-400 text-xs">{t('unit9.factorSurfaceEffect')}</p></div>
          <div className="glass-card rounded-xl p-3"><p className="text-brand-pink font-bold text-xs">{t('unit9.factorHumidity')}</p><p className="text-gray-400 text-xs">{t('unit9.factorHumidityEffect')}</p></div>
          <div className="glass-card rounded-xl p-3"><p className="text-brand-lime font-bold text-xs">{t('unit9.factorWind')}</p><p className="text-gray-400 text-xs">{t('unit9.factorWindEffect')}</p></div>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit9.wetClothSim')}</h4>
        <WetClothSim />
      </Section>

      <Section title={t('unit9.boylesLaw')} icon={<Gauge size={24} />} color="brand-purple">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6"><p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit9.boylesLawDef') }} ></p></div>
        <div className="formula-box rounded-2xl p-5 text-center mb-6"><p className="text-2xl font-space font-bold text-white">{t('unit9.boylesFormula')}</p><p className="text-brand-purple font-space font-bold mt-2">{t('unit9.boylesFormula2')}</p></div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit9.syringeSim')}</h4>
        <BoylesLawSim />
      </Section>

      <Section title="Charles's Law" icon={<Gauge size={24} />} color="brand-teal">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed">
            <span className="text-brand-cyan font-bold">Charles's Law</span> states that the volume of a gas is directly proportional to its absolute temperature (in Kelvin) when pressure is kept constant. As temperature increases, gas molecules move <span className="text-brand-amber font-bold">faster</span> and exert more force on the container walls, causing the volume to expand.
          </p>
        </div>
        <div className="formula-box rounded-2xl p-5 text-center mb-6">
          <p className="text-2xl font-space font-bold text-white">V / T = constant</p>
          <p className="text-brand-teal font-space font-bold mt-2">V₁/T₁ = V₂/T₂</p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">Gas Piston Simulation</h4>
        <CharlesLawSim />
      </Section>

      {/* HEAT TRANSFER COMPARISON */}
      <div className="unit-detail-reveal glass-card rounded-3xl p-8" {...GSAP_REVEAL_STYLE}>
        <h2 className="text-3xl font-black mb-2">Heat Transfer: Conduction, Convection & Radiation</h2>
        <p className="text-gray-400 mb-6">Compare the three methods of heat transfer side by side.</p>
        <HeatTransferSim />
      </div>

      <UnitQuiz unitId="unit9" questions={quizQuestions} />

      <div className="unit-detail-reveal glass-card-strong rounded-3xl p-8 md:p-12 text-center mb-16" {...GSAP_REVEAL_STYLE}>
        <h3 className="text-2xl md:text-3xl font-black text-white mb-6">{t('unit9.summary')}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-start">
          <div className="bg-white/5 rounded-xl p-4"><p className="text-brand-cyan font-bold text-sm mb-1">{t('unit9.sumTemperature')}</p><p className="text-gray-400 text-xs">{t('unit9.sumTemperatureDesc')}</p></div>
          <div className="bg-white/5 rounded-xl p-4"><p className="text-brand-amber font-bold text-sm mb-1">{t('unit9.sumExpansion')}</p><p className="text-gray-400 text-xs">{t('unit9.sumExpansionDesc')}</p></div>
          <div className="bg-white/5 rounded-xl p-4"><p className="text-brand-rose font-bold text-sm mb-1">{t('unit9.sumSpecificHeat')}</p><p className="text-gray-400 text-xs">{t('unit9.sumSpecificHeatDesc')}</p></div>
          <div className="bg-white/5 rounded-xl p-4"><p className="text-brand-purple font-bold text-sm mb-1">{t('unit9.sumBoylesLaw')}</p><p className="text-gray-400 text-xs">{t('unit9.sumBoylesLawDesc')}</p></div>
        </div>
      </div>
    </div>
  );
}
