import { useState, useEffect, useRef } from 'react';
import {
  Globe, Orbit, Scale, ArrowDown, Rocket,
  RotateCcw
} from 'lucide-react';
import { useT } from '../../i18n/LanguageContext';
import Section from '../Section';
import UnitQuiz from '../UnitQuiz';

/* ═══ 1. NEWTON'S LAW ═══ */
function GravForceCalc() {
  const t = useT();
  const G = 6.67e-11;
  const [m1, setM1] = useState(5e24);
  const [m2, setM2] = useState(6e24);
  const [r, setR] = useState(1e7);
  const force = (G * m1 * m2) / (r * r);
  return (
    <div>
      <div className="formula-box rounded-2xl p-6 text-center mb-6">
        <p className="text-2xl md:text-3xl font-space font-black text-white" dangerouslySetInnerHTML={{ __html: t('unit6.gravForceFormula') }} />
        <p className="text-brand-purple font-space font-bold mt-2">{t('unit6.gravConst')}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-3 mb-6">
        <div><label className="text-gray-400 text-xs block mb-1">{t('unit6.mass1')}</label><input type="number" value={m1} onChange={e => setM1(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-cyan/50" /></div>
        <div><label className="text-gray-400 text-xs block mb-1">{t('unit6.mass2')}</label><input type="number" value={m2} onChange={e => setM2(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-pink/50" /></div>
        <div><label className="text-gray-400 text-xs block mb-1">{t('unit6.distance')}</label><input type="number" value={r} onChange={e => setR(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-amber/50" /></div>
      </div>
      <div className="formula-box rounded-2xl p-5 text-center">
        <p className="text-gray-400 text-xs uppercase mb-2">{t('unit6.gravForceResult')}</p>
        <p className="text-3xl font-space font-bold text-brand-cyan">{force.toExponential(3)} N</p>
      </div>
      <div className="grid sm:grid-cols-3 gap-3 mt-4">
        <div className="glass-card rounded-xl p-3"><p className="text-brand-lime text-xs font-bold">{t('unit6.alwaysAttractive')}</p><p className="text-gray-400 text-xs">{t('unit6.alwaysAttractiveDesc')}</p></div>
        <div className="glass-card rounded-xl p-3"><p className="text-brand-cyan text-xs font-bold">{t('unit6.universal')}</p><p className="text-gray-400 text-xs">{t('unit6.universalDesc')}</p></div>
        <div className="glass-card rounded-xl p-3"><p className="text-brand-amber text-xs font-bold">{t('unit6.decreasesR2')}</p><p className="text-gray-400 text-xs">{t('unit6.decreasesR2Desc')}</p></div>
      </div>
    </div>
  );
}

/* ═══ 2. GRAVITATIONAL FIELD ═══ */
function PlanetWeightCalc() {
  const t = useT();
  const [mass, setMass] = useState(10);
  const planets = [
    { name: 'Moon', g: 1.6, color: 'text-gray-400' },
    { name: 'Mercury', g: 3.7, color: 'text-brand-amber' },
    { name: 'Venus', g: 8.9, color: 'text-brand-pink' },
    { name: 'Earth', g: 9.8, color: 'text-brand-cyan' },
    { name: 'Mars', g: 3.7, color: 'text-brand-rose' },
    { name: 'Jupiter', g: 24.8, color: 'text-brand-purple' },
  ];
  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">{t('unit6.yourMass').replace('{mass}', String(mass))}</label>
        <input type="range" min="1" max="100" value={mass} onChange={e => setMass(Number(e.target.value))} className="w-full accent-brand-cyan" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        {planets.map(p => (
          <div key={p.name} className="glass-card rounded-xl p-4 text-center">
            <p className={`font-bold text-sm ${p.color}`}>{p.name}</p>
            <p className="text-white text-xl font-space font-bold">{(mass * p.g).toFixed(1)} N</p>
            <p className="text-gray-500 text-xs">g = {p.g} m/s²</p>
          </div>
        ))}
      </div>
      <div className="formula-box rounded-2xl p-5">
        <p className="text-gray-400 text-xs uppercase mb-2">{t('unit6.gravFieldStrength')}</p>
        <p className="text-xl font-space font-bold text-white">{t('unit6.gFormula')}</p>
        <p className="text-gray-400 text-sm mt-2">{t('unit6.onEarthDesc')}</p>
      </div>
    </div>
  );
}

/* ═══ 3. MASS OF EARTH ═══ */
function EarthMassCalc() {
  const t = useT();
  const g = 9.8, R = 6.4e6, G = 6.67e-11;
  const mass = (g * R * R) / G;
  return (
    <div>
      <div className="space-y-3 mb-6">
        <div className="formula-box rounded-xl p-4"><p className="text-gray-400 text-xs uppercase mb-1">{t('unit6.step1')}</p><p className="text-xl font-space font-bold text-brand-cyan">{t('unit6.step1Val')}</p></div>
        <div className="formula-box rounded-xl p-4"><p className="text-gray-400 text-xs uppercase mb-1">{t('unit6.step2')}</p><p className="text-xl font-space font-bold text-brand-pink">{t('unit6.step2Val')}</p></div>
        <div className="formula-box rounded-xl p-4"><p className="text-gray-400 text-xs uppercase mb-1">{t('unit6.step3')}</p><p className="text-xl font-space font-bold text-brand-amber">{t('unit6.step3Val')}</p></div>
      </div>
      <div className="formula-box rounded-2xl p-6 text-center">
        <p className="text-gray-400 text-xs uppercase mb-2">{t('unit6.massOfEarthResult')}</p>
        <p className="text-4xl font-space font-bold text-white" dangerouslySetInnerHTML={{ __html: t('unit6.massApprox').replace('{mass}', (mass / 1e24).toFixed(2)) }} />
        <p className="text-gray-400 text-sm mt-2">{t('unit6.trillionKg')}</p>
      </div>
    </div>
  );
}

/* ═══ 4. VARIATION OF g ═══ */
function GVariationGraph() {
  const t = useT();
  const [altitude, setAltitude] = useState(0);
  const g0 = 9.8, R = 6371;
  const g = g0 * Math.pow(R / (R + altitude), 2);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height, pad = 40;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(pad, pad); ctx.lineTo(pad, h - pad); ctx.lineTo(w - pad, h - pad); ctx.stroke();
    ctx.fillStyle = '#9ca3af'; ctx.font = '12px Poppins'; ctx.textAlign = 'center';
    ctx.fillText('Altitude (km)', w / 2, h - 10);
    ctx.save(); ctx.translate(15, h / 2); ctx.rotate(-Math.PI / 2); ctx.fillText('g (m/s²)', 0, 0); ctx.restore();
    ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 3; ctx.beginPath();
    for (let ax = 0; ax <= w - pad * 2; ax += 2) {
      const alt = (ax / (w - pad * 2)) * 10000;
      const gv = g0 * Math.pow(R / (R + alt), 2);
      const py = h - pad - (gv / g0) * (h - pad * 2);
      if (ax === 0) ctx.moveTo(pad + ax, py); else ctx.lineTo(pad + ax, py);
    }
    ctx.stroke();
    const cx = pad + (altitude / 10000) * (w - pad * 2);
    const cy = h - pad - (g / g0) * (h - pad * 2);
    ctx.fillStyle = '#f43f5e'; ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();
  }, [altitude, g, g0]);

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">{t('unit6.altitude').replace('{altitude}', String(altitude))}</label>
        <input type="range" min="0" max="10000" step="100" value={altitude} onChange={e => setAltitude(Number(e.target.value))} className="w-full accent-brand-cyan" />
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={500} height={280} className="w-full" style={{ maxWidth: 500, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">{t('unit6.gAtAlt').replace('{altitude}', String(altitude))}</p>
          <p className="text-2xl font-space font-bold text-brand-cyan">{g.toFixed(2)} m/s²</p>
        </div>
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">{t('unit6.decrease')}</p>
          <p className="text-2xl font-space font-bold text-brand-rose">{((g0 - g) / g0 * 100).toFixed(1)}%</p>
        </div>
      </div>
      <div className="glass-card rounded-xl p-4">
        <p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit6.keyInsight') }} />
      </div>
    </div>
  );
}

/* ═══ 5. ORBITAL MOTION ═══ */
function SatelliteOrbitSim() {
  const t = useT();
  const [radius, setRadius] = useState(7e6);
  const G = 6.67e-11, M = 5.97e24;
  const v = Math.sqrt((G * M) / radius);
  const T = (2 * Math.PI * radius) / v;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const w = canvas.width, h = canvas.height, cx = w / 2, cy = h / 2;
      const time = Date.now() * 0.001;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#06b6d4'; ctx.beginPath(); ctx.arc(cx, cy, 40, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(6,182,212,0.3)'; ctx.beginPath(); ctx.arc(cx, cy, 45, 0, Math.PI * 2); ctx.fill();
      const orbitR = 40 + (radius - 6.4e6) / 50000;
      ctx.strokeStyle = 'rgba(124,58,237,0.3)'; ctx.lineWidth = 1; ctx.setLineDash([5, 5]);
      ctx.beginPath(); ctx.arc(cx, cy, orbitR, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
      const sx = cx + Math.cos(time * (7.8e3 / v)) * orbitR;
      const sy = cy + Math.sin(time * (7.8e3 / v)) * orbitR;
      ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(sx, sy, 6, 0, Math.PI * 2); ctx.fill();
      const angle = Math.atan2(sy - cy, sx - cx) + Math.PI / 2;
      ctx.strokeStyle = '#84cc16'; ctx.lineWidth = 2; ctx.beginPath();
      ctx.moveTo(sx, sy); ctx.lineTo(sx + Math.cos(angle) * 20, sy + Math.sin(angle) * 20); ctx.stroke();
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [radius, v]);

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">{t('unit6.orbitRadius').replace('{radius}', (radius / 1e6).toFixed(1))}</label>
        <input type="range" min="6.6e6" max="12e6" step="1e5" value={radius} onChange={e => setRadius(Number(e.target.value))} className="w-full accent-brand-cyan" />
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={300} height={280} className="w-full" style={{ maxWidth: 300, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="grid sm:grid-cols-3 gap-3 mb-4">
        <div className="formula-box rounded-xl p-4 text-center"><p className="text-gray-400 text-xs uppercase mb-1">{t('unit6.orbitalVelocity')}</p><p className="text-xl font-space font-bold text-brand-cyan">{v.toFixed(0)} m/s</p></div>
        <div className="formula-box rounded-xl p-4 text-center"><p className="text-gray-400 text-xs uppercase mb-1">{t('unit6.period')}</p><p className="text-xl font-space font-bold text-brand-pink">{(T / 60).toFixed(1)} min</p></div>
        <div className="formula-box rounded-xl p-4 text-center"><p className="text-gray-400 text-xs uppercase mb-1">{t('unit6.height')}</p><p className="text-xl font-space font-bold text-brand-amber">{((radius - 6.4e6) / 1000).toFixed(0)} km</p></div>
      </div>
      <div className="formula-box rounded-2xl p-5 text-center">
        <p className="text-xl font-space font-bold text-white">{t('unit6.orbitalFormulaCalc').replace('{gm}', (G * M).toExponential(2)).replace('{radius}', String(radius))}</p>
      </div>
    </div>
  );
}

/* ═══ 6. ARTIFICIAL SATELLITES ═══ */
function SatelliteTypesInfo() {
  const t = useT();
  const [selected, setSelected] = useState<'leo' | 'meo' | 'geo'>('leo');
  const types: Record<string, { name: string; altitude: string; period: string; examples: string; uses: string; color: string }> = {
    leo: { name: t('unit6.leoName'), altitude: t('unit6.leoAltitude'), period: t('unit6.leoPeriod'), examples: t('unit6.leoExamples'), uses: t('unit6.leoUses'), color: 'text-brand-cyan' },
    meo: { name: t('unit6.meoName'), altitude: t('unit6.meoAltitude'), period: t('unit6.meoPeriod'), examples: t('unit6.meoExamples'), uses: t('unit6.meoUses'), color: 'text-brand-amber' },
    geo: { name: t('unit6.geoName'), altitude: t('unit6.geoAltitude'), period: t('unit6.geoPeriod'), examples: t('unit6.geoExamples'), uses: t('unit6.geoUses'), color: 'text-brand-pink' },
  };
  const sat = types[selected];
  return (
    <div>
      <div className="flex gap-3 mb-4">
        {(['leo', 'meo', 'geo'] as const).map(type => (
          <button key={type} onClick={() => setSelected(type)} className={`flex-1 py-2 rounded-xl text-sm font-semibold ${selected === type ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : 'glass-card text-gray-400'}`}>
            {t(`unit6.${type}`)}
          </button>
        ))}
      </div>
      <div className="glass-card rounded-2xl p-6">
        <h4 className={`text-xl font-bold mb-3 ${sat.color}`}>{sat.name}</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><p className="text-gray-400 text-xs uppercase mb-1">{t('unit6.altitudeLabel')}</p><p className="text-white font-semibold">{sat.altitude}</p></div>
          <div><p className="text-gray-400 text-xs uppercase mb-1">{t('unit6.orbitalPeriod')}</p><p className="text-white font-semibold">{sat.period}</p></div>
          <div><p className="text-gray-400 text-xs uppercase mb-1">{t('unit6.examples')}</p><p className="text-white font-semibold">{sat.examples}</p></div>
          <div><p className="text-gray-400 text-xs uppercase mb-1">{t('unit6.uses')}</p><p className="text-white font-semibold">{sat.uses}</p></div>
        </div>
      </div>
      <h4 className="text-lg font-bold text-white mb-3 mt-6">{t('unit6.usesOfSatellites')}</h4>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {[t('unit6.use1'), t('unit6.use2'), t('unit6.use3'), t('unit6.use4'), t('unit6.use5'), t('unit6.use6')].map((use, i) => (
          <div key={i} className="glass-card rounded-xl p-3"><p className="text-gray-300 text-sm">{use}</p></div>
        ))}
      </div>
    </div>
  );
}

/* ═══ 7. WEIGHTLESSNESS ═══ */
function WeightlessnessSim() {
  const t = useT();
  const [falling, setFalling] = useState(false);
  const [progress, setProgress] = useState(0);
  const weight = 100;
  const scaleReading = falling ? weight * (1 - progress) : weight;

  useEffect(() => {
    if (!falling) return;
    setProgress(0);
    const interval = setInterval(() => { setProgress(p => { if (p >= 1) { clearInterval(interval); return 1; } return p + 0.02; }); }, 50);
    return () => clearInterval(interval);
  }, [falling]);

  return (
    <div>
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 relative overflow-hidden mb-4" style={{ height: 240 }}>
        <svg width="100%" height="100%" viewBox="0 0 400 240">
          <rect x="120" y={20 + progress * 100} width="160" height="180" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <circle cx="200" cy={70 + progress * 100} r="15" fill="#06b6d4" opacity="0.7" />
          <line x1="200" y1={85 + progress * 100} x2="200" y2={130 + progress * 100} stroke="#06b6d4" strokeWidth="3" opacity="0.7" />
          <line x1="180" y1={100 + progress * 100} x2="220" y2={100 + progress * 100} stroke="#06b6d4" strokeWidth="3" opacity="0.7" />
          <line x1="200" y1={130 + progress * 100} x2="185" y2={160 + progress * 100} stroke="#06b6d4" strokeWidth="3" opacity="0.7" />
          <line x1="200" y1={130 + progress * 100} x2="215" y2={160 + progress * 100} stroke="#06b6d4" strokeWidth="3" opacity="0.7" />
          <rect x="170" y={170 + progress * 100} width="60" height="10" fill="#7c3aed" opacity="0.5" />
          {falling && progress < 1 && <text x="320" y={100 + progress * 50} fill="#f43f5e" fontSize="14" fontWeight="bold">↓ Free Fall!</text>}
          <line x1="0" y1="220" x2="400" y2="220" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
        </svg>
      </div>
      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <div className="formula-box rounded-xl p-4 text-center"><p className="text-gray-400 text-xs uppercase mb-1">{t('unit6.scaleReading')}</p><p className="text-2xl font-space font-bold text-brand-cyan">{scaleReading.toFixed(1)} N</p></div>
        <div className={`rounded-xl p-4 text-center ${falling && progress > 0.5 ? 'bg-brand-rose/15 border border-brand-rose/30' : 'bg-brand-lime/15 border border-brand-lime/30'}`}>
          <p className="text-gray-400 text-xs uppercase mb-1">{t('unit6.status')}</p>
          <p className={`text-lg font-bold ${falling && progress > 0.5 ? 'text-brand-rose' : 'text-brand-lime'}`}>{falling && progress > 0.5 ? t('unit6.weightless') : t('unit6.normalWeight')}</p>
        </div>
      </div>
      <div className="flex gap-3 justify-center mb-4">
        <button onClick={() => setFalling(true)} disabled={falling} className="btn-primary px-6 py-2 rounded-xl text-white font-semibold text-sm disabled:opacity-50">{t('unit6.startFreeFall')}</button>
        <button onClick={() => { setFalling(false); setProgress(0); }} className="glass-card px-4 py-2 rounded-xl text-gray-400 text-sm hover:text-white flex items-center gap-2"><RotateCcw size={14} /> {t('unit6.reset')}</button>
      </div>
      <div className="glass-card rounded-xl p-4"><p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit6.whyAstronautsFloat') }} /></div>
    </div>
  );
}

/* ═══ MAIN UNIT 6 CONTENT ═══ */
export default function Unit6Content() {
  const t = useT();
  return (
    <div>
      <Section title={t('unit6.newtonLaw')} icon={<Globe size={24} />} color="brand-cyan">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6"><p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit6.newtonLawDef') }} /></div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit6.forceCalcTitle')}</h4>
        <GravForceCalc />
      </Section>

      <Section title={t('unit6.gravitationalField')} icon={<Orbit size={24} />} color="brand-purple">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6"><p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit6.gravFieldDef') }} /></div>
        <div className="formula-box rounded-2xl p-5 text-center mb-6"><p className="text-2xl font-space font-bold text-white" dangerouslySetInnerHTML={{ __html: t('unit6.gravFieldFormula') }} /><p className="text-gray-400 text-sm mt-2">{t('unit6.onEarth')}</p></div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit6.weightPlanetsTitle')}</h4>
        <PlanetWeightCalc />
      </Section>

      <Section title={t('unit6.massOfEarth')} icon={<Scale size={24} />} color="brand-pink">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6"><p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit6.massEarthDef') }} /></div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit6.earthMassCalcTitle')}</h4>
        <EarthMassCalc />
      </Section>

      <Section title={t('unit6.variationOfG')} icon={<ArrowDown size={24} />} color="brand-amber">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="glass-card rounded-2xl p-5"><h4 className="text-brand-cyan font-bold text-lg mb-2">{t('unit6.withAltitude')}</h4><p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit6.altitudeDesc') }} /><p className="text-brand-cyan font-space font-bold mt-2">{t('unit6.altitudeFormula')}</p><p className="text-gray-500 text-xs mt-1">{t('unit6.at10km')}</p></div>
          <div className="glass-card rounded-2xl p-5"><h4 className="text-brand-rose font-bold text-lg mb-2">{t('unit6.withDepth')}</h4><p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit6.depthDesc') }} /><p className="text-brand-rose font-space font-bold mt-2">{t('unit6.depthFormula')}</p><p className="text-gray-500 text-xs mt-1">{t('unit6.atCenter')}</p></div>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit6.gGraphTitle')}</h4>
        <GVariationGraph />
      </Section>

      <Section title={t('unit6.orbitalMotion')} icon={<Orbit size={24} />} color="brand-lime">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6"><p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit6.orbitalDef') }} /></div>
        <div className="formula-box rounded-2xl p-5 text-center mb-6"><p className="text-xl font-space font-bold text-white">{t('unit6.orbitalFormula')}</p><p className="text-gray-400 text-sm mt-2">{t('unit6.orbitalDesc')}</p></div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit6.satelliteSimTitle')}</h4>
        <SatelliteOrbitSim />
      </Section>

      <Section title={t('unit6.artificialSatellites')} icon={<Rocket size={24} />} color="brand-rose">
        <h4 className="text-lg font-bold text-white mb-4">{t('unit6.satelliteTypesTitle')}</h4>
        <SatelliteTypesInfo />
      </Section>

      <Section title={t('unit6.weightlessness')} icon={<Scale size={24} />} color="brand-teal">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6"><p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit6.weightlessnessDef') }} /></div>
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          <div className="glass-card rounded-xl p-4"><p className="text-brand-cyan font-bold mb-1">{t('unit6.parabolicFlight')}</p><p className="text-gray-400 text-sm">{t('unit6.parabolicFlightDesc')}</p></div>
          <div className="glass-card rounded-xl p-4"><p className="text-brand-pink font-bold mb-1">{t('unit6.freeFallElevator')}</p><p className="text-gray-400 text-sm">{t('unit6.freeFallElevatorDesc')}</p></div>
          <div className="glass-card rounded-xl p-4"><p className="text-brand-amber font-bold mb-1">{t('unit6.spaceStation')}</p><p className="text-gray-400 text-sm">{t('unit6.spaceStationDesc')}</p></div>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit6.fallingElevatorTitle')}</h4>
        <WeightlessnessSim />
      </Section>

      <UnitQuiz unitId="unit6" questions={[
        { question: t('unit6.quiz.q1'), options: [t('unit6.quiz.q1.opt1'), t('unit6.quiz.q1.opt2'), t('unit6.quiz.q1.opt3'), t('unit6.quiz.q1.opt4')], correctIndex: 0 },
        { question: t('unit6.quiz.q2'), options: [t('unit6.quiz.q2.opt1'), t('unit6.quiz.q2.opt2'), t('unit6.quiz.q2.opt3'), t('unit6.quiz.q2.opt4')], correctIndex: 1 },
        { question: t('unit6.quiz.q3'), options: [t('unit6.quiz.q3.opt1'), t('unit6.quiz.q3.opt2'), t('unit6.quiz.q3.opt3'), t('unit6.quiz.q3.opt4')], correctIndex: 2 },
        { question: t('unit6.quiz.q4'), options: [t('unit6.quiz.q4.opt1'), t('unit6.quiz.q4.opt2'), t('unit6.quiz.q4.opt3'), t('unit6.quiz.q4.opt4')], correctIndex: 2 },
        { question: t('unit6.quiz.q5'), options: [t('unit6.quiz.q5.opt1'), t('unit6.quiz.q5.opt2'), t('unit6.quiz.q5.opt3'), t('unit6.quiz.q5.opt4')], correctIndex: 1 },
      ]} />

      <div className="unit-detail-reveal glass-card-strong rounded-3xl p-8 md:p-12 text-center mb-16" style={{ opacity: 0, transform: 'translateY(60px)' }}>
        <h3 className="text-2xl md:text-3xl font-black text-white mb-6">{t('unit6.summary')}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-start">
          <div className="bg-white/5 rounded-xl p-4"><p className="text-brand-cyan font-bold text-sm mb-1">{t('unit6.sumNewtonLaw')}</p><p className="text-gray-400 text-xs">{t('unit6.sumNewtonLawDesc')}</p></div>
          <div className="bg-white/5 rounded-xl p-4"><p className="text-brand-purple font-bold text-sm mb-1">{t('unit6.sumGVariation')}</p><p className="text-gray-400 text-xs">{t('unit6.sumGVariationDesc')}</p></div>
          <div className="bg-white/5 rounded-xl p-4"><p className="text-brand-lime font-bold text-sm mb-1">{t('unit6.sumOrbit')}</p><p className="text-gray-400 text-xs">{t('unit6.sumOrbitDesc')}</p></div>
          <div className="bg-white/5 rounded-xl p-4"><p className="text-brand-teal font-bold text-sm mb-1">{t('unit6.sumWeightlessness')}</p><p className="text-gray-400 text-xs">{t('unit6.sumWeightlessnessDesc')}</p></div>
        </div>
      </div>
    </div>
  );
}
