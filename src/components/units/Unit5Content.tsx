import { useState, useEffect, useRef } from 'react';
import {
  RotateCcw, Scale, ArrowDown, Waves, Wind,
  FlaskConical
} from 'lucide-react';
import { useT } from '../../i18n/LanguageContext';
import Section from '../Section';
import UnitQuiz from '../UnitQuiz';

/* ═══════════════════════════════════════════════════════════
   1. ELASTICITY — Spring Simulation
   ═══════════════════════════════════════════════════════════ */
function SpringSim() {
  const t = useT();
  const [force, setForce] = useState(0);
  const [k, setK] = useState(5);
  const extension = force / k;
  const maxForce = k * 3;
  const withinLimit = force <= maxForce;

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-gray-400 text-sm block mb-2">{t('unit5.forceLabel').replace('{force}', String(force))}</label>
          <input type="range" min="0" max="30" value={force} onChange={e => setForce(Number(e.target.value))} className="w-full accent-brand-cyan" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">{t('unit5.springConstLabel').replace('{k}', String(k))}</label>
          <input type="range" min="1" max="20" value={k} onChange={e => setK(Number(e.target.value))} className="w-full accent-brand-amber" />
        </div>
      </div>

      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 relative overflow-hidden mb-4" style={{ height: 240 }}>
        <svg width="100%" height="100%" viewBox="0 0 400 240">
          <line x1="150" y1="20" x2="250" y2="20" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
          {(() => {
            const coils = 8;
            const naturalLength = 80;
            const ext = extension * 20;
            const totalLen = naturalLength + ext;
            const coilHeight = totalLen / coils;
            let path = `M 200 20`;
            for (let i = 0; i < coils; i++) {
              const y = 20 + i * coilHeight;
              const nextY = 20 + (i + 1) * coilHeight;
              path += ` L ${180} ${y + coilHeight * 0.25} L ${220} ${y + coilHeight * 0.75} L ${200} ${nextY}`;
            }
            return <path d={path} fill="none" stroke={withinLimit ? '#06b6d4' : '#f43f5e'} strokeWidth="3" />;
          })()}
          <rect x="170" y={20 + 80 + extension * 20} width="60" height="40" rx="4" fill="#7c3aed" opacity="0.7" />
          <text x="200" y={45 + 80 + extension * 20} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">{force}N</text>
          <line x1="280" y1="20" x2="280" y2={20 + 80 + extension * 20} stroke="rgba(255,255,255,0.2)" strokeDasharray="4,4" />
          <text x="290" y={60 + extension * 10} fill="#9ca3af" fontSize="11">x = {extension.toFixed(2)}m</text>
          <line x1="140" y1="20 + 140" x2="260" y2="20 + 140" stroke="#f43f5e" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
          <text x="130" y="165" fill="#f43f5e" fontSize="10">Elastic Limit</text>
        </svg>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">{t('unit5.extLabel')}</p>
          <p className="text-2xl font-space font-bold text-brand-cyan">{extension.toFixed(2)} m</p>
        </div>
        <div className={`rounded-xl p-4 text-center ${withinLimit ? 'bg-brand-lime/15 border border-brand-lime/30' : 'bg-brand-rose/15 border border-brand-rose/30'}`}>
          <p className="text-gray-400 text-xs uppercase mb-1">{t('unit5.status')}</p>
          <p className={`text-lg font-bold ${withinLimit ? 'text-brand-lime' : 'text-brand-rose'}`}>
            {withinLimit ? t('unit5.withinLimit') : t('unit5.beyondLimit')}
          </p>
        </div>
      </div>

      <div className="formula-box rounded-2xl p-5 text-center">
        <p className="text-2xl font-space font-bold text-white">F = kx = {k} × {extension.toFixed(2)} = <span className="text-brand-cyan">{force} N</span></p>
      </div>

      <button onClick={() => { setForce(0); setK(5); }} className="mt-3 mx-auto block text-xs text-gray-500 hover:text-white flex items-center gap-1">
        <RotateCcw size={12} /> {t('unit4.reset')}
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   2. PRESSURE — Pressure Tester
   ═══════════════════════════════════════════════════════════ */
function PressureTester() {
  const t = useT();
  const [force, setForce] = useState(50);
  const [area, setArea] = useState(2);
  const pressure = force / area;

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-gray-400 text-sm block mb-2">{t('unit5.forceLabelPA').replace('{force}', String(force))}</label>
          <input type="range" min="1" max="200" value={force} onChange={e => setForce(Number(e.target.value))} className="w-full accent-brand-cyan" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">{t('unit5.areaLabel').replace('{area}', String(area))}</label>
          <input type="range" min="0.1" max="10" step="0.1" value={area} onChange={e => setArea(Number(e.target.value))} className="w-full accent-brand-pink" />
        </div>
      </div>

      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 p-6 mb-4">
        <div className="flex items-end justify-center gap-8 mb-4">
          <div className="text-center">
            <div className="text-brand-rose text-3xl mb-2">🔴</div>
            <div className="w-12 h-12 bg-brand-rose/30 rounded border-2 border-brand-rose flex items-center justify-center mx-auto">
              <span className="text-brand-rose font-bold text-xs">{t('unit5.smallArea')}</span>
            </div>
            <p className="text-brand-rose text-xs mt-1">{t('unit5.highPressure')}</p>
          </div>
          <div className="text-gray-500 text-2xl mb-8">→</div>
          <div className="text-center">
            <div className="text-brand-lime text-3xl mb-2">🟢</div>
            <div className="w-24 h-12 bg-brand-lime/30 rounded border-2 border-brand-lime flex items-center justify-center mx-auto">
              <span className="text-brand-lime font-bold text-xs">{t('unit5.largeArea')}</span>
            </div>
            <p className="text-brand-lime text-xs mt-1">{t('unit5.lowPressure')}</p>
          </div>
        </div>

        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-2">{t('unit5.pressureCalcLabel')}</p>
          <p className="text-3xl font-space font-bold text-white">P = {force} / {area} = <span className="text-brand-cyan">{pressure.toFixed(1)} Pa</span></p>
        </div>
      </div>

      <h4 className="text-lg font-bold text-white mb-3">{t('unit5.realLifeApps')}</h4>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="glass-card rounded-xl p-4">
          <p className="text-brand-rose font-bold mb-1">{t('unit5.sharpKnife')}</p>
          <p className="text-gray-400 text-sm">{t('unit5.sharpKnifeDesc')}</p>
        </div>
        <div className="glass-card rounded-xl p-4">
          <p className="text-brand-lime font-bold mb-1">{t('unit5.wideTires')}</p>
          <p className="text-gray-400 text-sm">{t('unit5.wideTiresDesc')}</p>
        </div>
        <div className="glass-card rounded-xl p-4">
          <p className="text-brand-cyan font-bold mb-1">{t('unit5.snowshoes')}</p>
          <p className="text-gray-400 text-sm">{t('unit5.snowshoesDesc')}</p>
        </div>
      </div>

      <button onClick={() => { setForce(50); setArea(2); }} className="mt-4 mx-auto block text-xs text-gray-500 hover:text-white flex items-center gap-1">
        <RotateCcw size={12} /> {t('unit4.reset')}
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   3. STRESS & STRAIN — Graph
   ═══════════════════════════════════════════════════════════ */
function StressStrainGraph() {
  const t = useT();
  const [appliedForce, setAppliedForce] = useState(0);
  const area = 0.001;
  const originalLength = 1;
  const youngsModulus = 2e11;

  const stress = appliedForce / area;
  const strain = stress / youngsModulus;
  const extension = strain * originalLength;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    const pad = 40;

    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(pad, pad); ctx.lineTo(pad, h - pad); ctx.lineTo(w - pad, h - pad); ctx.stroke();

    ctx.fillStyle = '#9ca3af';
    ctx.font = '12px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText('Strain', w / 2, h - 10);
    ctx.save();
    ctx.translate(15, h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Stress (Pa)', 0, 0);
    ctx.restore();

    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 3;
    ctx.beginPath();
    const maxStrain = 0.002;
    for (let sx = 0; sx <= w - pad * 2; sx++) {
      const strainVal = (sx / (w - pad * 2)) * maxStrain;
      const stressVal = youngsModulus * strainVal;
      const py = h - pad - (stressVal / (youngsModulus * maxStrain)) * (h - pad * 2);
      if (sx === 0) ctx.moveTo(pad + sx, py);
      else ctx.lineTo(pad + sx, py);
    }
    ctx.stroke();

    const curStrain = Math.min(strain, maxStrain);
    const curStress = youngsModulus * curStrain;
    const cx = pad + (curStrain / maxStrain) * (w - pad * 2);
    const cy = h - pad - (curStress / (youngsModulus * maxStrain)) * (h - pad * 2);
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();

  }, [appliedForce, strain, stress, youngsModulus]);

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">{t('unit5.appliedForce').replace('{force}', String(appliedForce))}</label>
        <input type="range" min="0" max="200000000" step="1000000" value={appliedForce} onChange={e => setAppliedForce(Number(e.target.value))} className="w-full accent-brand-cyan" />
      </div>

      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={500} height={280} className="w-full" style={{ maxWidth: 500, margin: '0 auto', display: 'block' }} />
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mb-4">
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">{t('unit5.stressLabel')}</p>
          <p className="text-xl font-space font-bold text-brand-cyan">{(stress / 1e6).toFixed(2)} MPa</p>
        </div>
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">{t('unit5.strainLabel')}</p>
          <p className="text-xl font-space font-bold text-brand-pink">{strain.toExponential(2)}</p>
        </div>
        <div className="formula-box rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase mb-1">{t('unit5.extensionLabel')}</p>
          <p className="text-xl font-space font-bold text-brand-amber">{(extension * 1000).toFixed(3)} mm</p>
        </div>
      </div>

      <div className="formula-box rounded-2xl p-5">
        <p className="text-gray-400 text-xs uppercase mb-2">{t('unit5.youngsModulus')}</p>
        <p className="text-xl font-space font-bold text-white">{t('unit5.steelNote').replace('{value}', (youngsModulus / 1e9).toFixed(0))}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   4. DENSITY — Calculator
   ═══════════════════════════════════════════════════════════ */
function DensityCalculator() {
  const t = useT();
  const [mass, setMass] = useState(5);
  const [volume, setVolume] = useState(0.01);
  const density = mass / volume;

  const materials = [
    { name: t('unit5.water'), density: 1000, color: 'text-brand-cyan' },
    { name: t('unit5.ice'), density: 917, color: 'text-brand-lime' },
    { name: t('unit5.iron'), density: 7874, color: 'text-brand-rose' },
    { name: t('unit5.aluminum'), density: 2700, color: 'text-brand-amber' },
    { name: t('unit5.wood'), density: 750, color: 'text-brand-purple' },
    { name: t('unit5.oil'), density: 920, color: 'text-brand-pink' },
  ];

  const selectedMaterial = materials.find(m => Math.abs(m.density - density) < 50);

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-gray-400 text-sm block mb-2">{t('unit5.massLabel').replace('{mass}', String(mass))}</label>
          <input type="range" min="0.1" max="50" step="0.1" value={mass} onChange={e => setMass(Number(e.target.value))} className="w-full accent-brand-cyan" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">{t('unit5.volumeLabel').replace('{volume}', String(volume))}</label>
          <input type="range" min="0.001" max="0.1" step="0.001" value={volume} onChange={e => setVolume(Number(e.target.value))} className="w-full accent-brand-pink" />
        </div>
      </div>

      <div className="formula-box rounded-2xl p-6 text-center mb-6">
        <p className="text-gray-400 text-xs uppercase mb-2">{t('unit5.densityCalcLabel')}</p>
        <p className="text-3xl font-space font-bold text-white">ρ = {mass} / {volume} = <span className="text-brand-cyan">{density.toFixed(0)} kg/m³</span></p>
        {selectedMaterial && <p className="text-gray-400 text-sm mt-2">{t('unit5.closeTo').replace('{material}', '')} <span className={selectedMaterial.color + ' font-bold'}>{selectedMaterial.name}</span></p>}
      </div>

      <h4 className="text-lg font-bold text-white mb-3">{t('unit5.commonMaterials')}</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        {materials.map(m => (
          <button
            key={m.name}
            onClick={() => { setMass(m.density * volume); }}
            className={`p-3 rounded-xl text-center transition-all glass-card hover:bg-white/5 ${density > m.density ? 'opacity-50' : ''}`}
          >
            <p className={`font-bold text-sm ${m.color}`}>{m.name}</p>
            <p className="text-white text-lg font-space font-bold">{m.density}</p>
            <p className="text-gray-500 text-xs">kg/m³</p>
          </button>
        ))}
      </div>

      <div className={`rounded-xl p-4 text-center ${density < 1000 ? 'bg-brand-lime/15 border border-brand-lime/30' : density > 1000 ? 'bg-brand-rose/15 border border-brand-rose/30' : 'bg-brand-amber/15 border border-brand-amber/30'}`}>
        <p className={`text-lg font-bold ${density < 1000 ? 'text-brand-lime' : density > 1000 ? 'text-brand-rose' : 'text-brand-amber'}`}>
          {density < 1000 ? t('unit5.floatsWater') : density > 1000 ? t('unit5.sinksWater') : t('unit5.neutralBuoyancy')}
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   5. BUOYANCY — Archimedes Principle Simulator
   ═══════════════════════════════════════════════════════════ */
function BuoyancySim() {
  const t = useT();
  const [objDensity, setObjDensity] = useState(1000);
  const [fluidDensity, setFluidDensity] = useState(1000);

  const ratio = objDensity / fluidDensity;
  const submerged = Math.min(ratio * 100, 100);
  const status = objDensity < fluidDensity ? 'floats' : objDensity > fluidDensity ? 'sinks' : 'neutral';

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-gray-400 text-sm block mb-2">{t('unit5.objDensity').replace('{density}', String(objDensity))}</label>
          <input type="range" min="100" max="2000" value={objDensity} onChange={e => setObjDensity(Number(e.target.value))} className="w-full accent-brand-cyan" />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">{t('unit5.fluidDensity').replace('{density}', String(fluidDensity))}</label>
          <input type="range" min="500" max="1500" value={fluidDensity} onChange={e => setFluidDensity(Number(e.target.value))} className="w-full accent-brand-pink" />
        </div>
      </div>

      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 relative overflow-hidden mb-4" style={{ height: 220 }}>
        <svg width="100%" height="100%" viewBox="0 0 400 220">
          <rect x="50" y="80" width="300" height="120" fill="rgba(6,182,212,0.1)" stroke="rgba(6,182,212,0.3)" strokeWidth="2" />
          <text x="200" y="190" textAnchor="middle" fill="#06b6d4" fontSize="12" opacity="0.5">Fluid</text>
          {status === 'floats' && (
            <>
              <rect x="170" y={80 - 40 * (1 - ratio)} width="60" height="40" rx="4" fill="#84cc16" opacity="0.7" />
              <text x="200" y={105 - 40 * (1 - ratio)} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">Object</text>
              <rect x="170" y="80" width="60" height={40 * ratio} rx="0" fill="#84cc16" opacity="0.4" />
            </>
          )}
          {status === 'sinks' && (
            <rect x="170" y="140" width="60" height="40" rx="4" fill="#f43f5e" opacity="0.7" />
          )}
          {status === 'neutral' && (
            <rect x="170" y="60" width="60" height="40" rx="4" fill="#f59e0b" opacity="0.7" />
          )}
        </svg>
      </div>

      <div className={`rounded-xl p-4 text-center mb-4 ${status === 'floats' ? 'bg-brand-lime/15 border border-brand-lime/30' : status === 'sinks' ? 'bg-brand-rose/15 border border-brand-rose/30' : 'bg-brand-amber/15 border border-brand-amber/30'}`}>
        <p className={`text-xl font-bold ${status === 'floats' ? 'text-brand-lime' : status === 'sinks' ? 'text-brand-rose' : 'text-brand-amber'}`}>
          {status === 'floats' ? t('unit5.objectFloats') : status === 'sinks' ? t('unit5.objectSinks') : t('unit5.neutralBuoyancy')}
        </p>
        {status === 'floats' && <p className="text-gray-400 text-sm mt-1">{t('unit5.submergedNote').replace('{percent}', submerged.toFixed(0))}</p>}
      </div>

      <div className="glass-card rounded-xl p-4">
        <p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit5.archimedesDef') }} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   6. ATMOSPHERIC PRESSURE — Straw Simulation
   ═══════════════════════════════════════════════════════════ */
function AtmosphericPressureSim() {
  const t = useT();
  const [suction, setSuction] = useState(0);
  const maxSuction = 100;
  const waterRise = (suction / maxSuction) * 10.3;

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400 text-sm block mb-2">{t('unit5.suctionLabel').replace('{strength}', String(suction))}</label>
        <input type="range" min="0" max="100" value={suction} onChange={e => setSuction(Number(e.target.value))} className="w-full accent-brand-cyan" />
      </div>

      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 relative overflow-hidden mb-4" style={{ height: 260 }}>
        <svg width="100%" height="100%" viewBox="0 0 400 260">
          <rect x="80" y="100" width="240" height="140" fill="rgba(6,182,212,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <rect x="82" y={140} width="236" height="98" fill="rgba(6,182,212,0.3)" />
          <line x1="80" y1="140" x2="320" y2="140" stroke="#06b6d4" strokeWidth="1" />
          <rect x="185" y="20" width="30" height="220" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3" rx="3" />
          <rect x="188" y={240 - waterRise * 15} width="24" height={waterRise * 15} fill="rgba(6,182,212,0.5)" />
          <text x="340" y="150" fill="#9ca3af" fontSize="11">Water</text>
          <text x="220" y={230 - waterRise * 15} fill="#06b6d4" fontSize="11" fontWeight="bold">{waterRise.toFixed(1)}m</text>
          {[100, 150, 200, 250, 300].map((x, i) => (
            <line key={i} x1={x} y1="95" x2={x} y2="75" stroke="rgba(255,255,255,0.2)" strokeWidth="2" markerEnd="url(#airArrow)" />
          ))}
          <text x="200" y="65" textAnchor="middle" fill="#9ca3af" fontSize="10">Atmospheric Pressure</text>
          <defs>
            <marker id="airArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M 0 8 L 4 0 L 8 8" fill="rgba(255,255,255,0.3)" />
            </marker>
          </defs>
        </svg>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <div className="formula-box rounded-xl p-4">
          <p className="text-gray-400 text-xs uppercase mb-1">{t('unit5.waterRise')}</p>
          <p className="text-2xl font-space font-bold text-brand-cyan">{waterRise.toFixed(2)} m</p>
        </div>
        <div className="glass-card rounded-xl p-4">
          <p className="text-gray-400 text-xs uppercase mb-1">{t('unit5.atmPressureLabel')}</p>
          <p className="text-2xl font-space font-bold text-white">101,325 Pa</p>
          <p className="text-gray-500 text-xs">= {t('unit5.atSeaLevel')}</p>
        </div>
      </div>

      <div className="glass-card rounded-xl p-4">
        <p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit5.magdeburgNote') }} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN UNIT 5 CONTENT
   ═══════════════════════════════════════════════════════════ */
export default function Unit5Content() {
  const t = useT();

  return (
    <div>
      {/* 1. ELASTICITY */}
      <Section title={t('unit5.elasticity')} icon={<FlaskConical size={24} />} color="brand-cyan">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit5.elasticityDef') }} />
        </div>
        <div className="glass-card rounded-2xl p-5 mb-6">
          <h4 className="text-brand-amber font-bold mb-2">{t('unit5.elasticLimitTitle')}</h4>
          <p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit5.elasticLimitDesc') }} />
        </div>
        <div className="formula-box rounded-2xl p-6 text-center mb-6">
          <p className="text-gray-400 text-xs uppercase mb-2">{t('unit5.hookesLaw')}</p>
          <p className="text-3xl font-space font-black text-white" dangerouslySetInnerHTML={{ __html: t('unit5.hookesLawFormula') }} />
          <div className="flex justify-center gap-6 mt-3 text-sm">
            <span className="text-brand-cyan">{t('unit5.springConst')}</span>
            <span className="text-brand-pink">{t('unit5.extension')}</span>
          </div>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit5.springSimTitle')}</h4>
        <SpringSim />
      </Section>

      {/* 2. PRESSURE */}
      <Section title={t('unit5.pressure')} icon={<Scale size={24} />} color="brand-purple">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit5.pressureDef') }} />
        </div>
        <div className="formula-box rounded-2xl p-6 text-center mb-6">
          <p className="text-3xl font-space font-black text-white" dangerouslySetInnerHTML={{ __html: t('unit5.pressureFormula') }} />
          <p className="text-brand-purple font-space font-bold mt-2">{t('unit5.pressureUnit')}</p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit5.pressureTestTitle')}</h4>
        <PressureTester />
      </Section>

      {/* 3. STRESS & STRAIN */}
      <Section title={t('unit5.stressStrain')} icon={<ArrowDown size={24} />} color="brand-pink">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="glass-card rounded-2xl p-5">
            <h4 className="text-brand-cyan font-bold text-lg mb-2">{t('unit5.stressTitle')}</h4>
            <p className="text-gray-300 text-sm">{t('unit5.stressDesc')}</p>
            <p className="text-brand-cyan font-space font-bold mt-2">{t('unit5.stressFormula')}</p>
          </div>
          <div className="glass-card rounded-2xl p-5">
            <h4 className="text-brand-pink font-bold text-lg mb-2">{t('unit5.strainTitle')}</h4>
            <p className="text-gray-300 text-sm">{t('unit5.strainDesc')}</p>
            <p className="text-brand-pink font-space font-bold mt-2">{t('unit5.strainFormula')}</p>
          </div>
        </div>
        <div className="formula-box rounded-2xl p-5 text-center mb-6">
          <p className="text-gray-400 text-xs uppercase mb-2">{t('unit5.youngsModulus')}</p>
          <p className="text-2xl font-space font-bold text-white" dangerouslySetInnerHTML={{ __html: t('unit5.youngsFormula') }} />
          <p className="text-gray-400 text-sm mt-2">{t('unit5.youngsDesc')}</p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit5.stressStrainGraphTitle')}</h4>
        <StressStrainGraph />
      </Section>

      {/* 4. DENSITY */}
      <Section title={t('unit5.density')} icon={<Scale size={24} />} color="brand-amber">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit5.densityDef') }} />
        </div>
        <div className="formula-box rounded-2xl p-6 text-center mb-6">
          <p className="text-3xl font-space font-black text-white" dangerouslySetInnerHTML={{ __html: t('unit5.densityFormula') }} />
          <p className="text-brand-amber font-space font-bold mt-2">{t('unit5.densityUnit')}</p>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit5.densityCalcTitle')}</h4>
        <DensityCalculator />
      </Section>

      {/* 5. BUOYANCY */}
      <Section title={t('unit5.buoyancy')} icon={<Waves size={24} />} color="brand-teal">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit5.archimedesDef') }} />
        </div>
        <div className="formula-box rounded-2xl p-5 text-center mb-6">
          <p className="text-xl font-space font-bold text-white" dangerouslySetInnerHTML={{ __html: t('unit5.upthrustFormula') }} />
        </div>
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-lime font-bold mb-1">{t('unit5.floatsLabel')}</p>
            <p className="text-gray-400 text-sm">{t('unit5.floatsDesc')}</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-rose font-bold mb-1">{t('unit5.sinksLabel')}</p>
            <p className="text-gray-400 text-sm">{t('unit5.sinksDesc')}</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-brand-amber font-bold mb-1">{t('unit5.neutralLabel')}</p>
            <p className="text-gray-400 text-sm">{t('unit5.neutralDesc')}</p>
          </div>
        </div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit5.buoyancySimTitle')}</h4>
        <BuoyancySim />
      </Section>

      {/* 6. ATMOSPHERIC PRESSURE */}
      <Section title={t('unit5.atmPressure')} icon={<Wind size={24} />} color="brand-rose">
        <div className="definition-highlight rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-xl md:text-2xl text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: t('unit5.atmPressureDef') }} />
        </div>
        <div className="formula-box rounded-2xl p-5 text-center mb-6">
          <p className="text-2xl font-space font-bold text-white" dangerouslySetInnerHTML={{ __html: t('unit5.atmFormula') }} />
          <p className="text-gray-400 text-sm">{t('unit5.atSeaLevel')}</p>
        </div>
        <div className="glass-card rounded-xl p-4 mb-6">
          <p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: t('unit5.whyNotCrushed') }} />
        </div>
        <h4 className="text-lg font-bold text-white mb-4">{t('unit5.strawSimTitle')}</h4>
        <AtmosphericPressureSim />
      </Section>

      {/* Quiz */}
      <UnitQuiz
        unitId="unit5"
        questions={[
          {
            question: t('unit5.quiz.q1'),
            options: [t('unit5.quiz.q1.opt1'), t('unit5.quiz.q1.opt2'), t('unit5.quiz.q1.opt3'), t('unit5.quiz.q1.opt4')],
            correctIndex: 1,
          },
          {
            question: t('unit5.quiz.q2'),
            options: [t('unit5.quiz.q2.opt1'), t('unit5.quiz.q2.opt2'), t('unit5.quiz.q2.opt3'), t('unit5.quiz.q2.opt4')],
            correctIndex: 1,
          },
          {
            question: t('unit5.quiz.q3'),
            options: [t('unit5.quiz.q3.opt1'), t('unit5.quiz.q3.opt2'), t('unit5.quiz.q3.opt3'), t('unit5.quiz.q3.opt4')],
            correctIndex: 1,
          },
          {
            question: t('unit5.quiz.q4'),
            options: [t('unit5.quiz.q4.opt1'), t('unit5.quiz.q4.opt2'), t('unit5.quiz.q4.opt3'), t('unit5.quiz.q4.opt4')],
            correctIndex: 2,
          },
          {
            question: t('unit5.quiz.q5'),
            options: [t('unit5.quiz.q5.opt1'), t('unit5.quiz.q5.opt2'), t('unit5.quiz.q5.opt3'), t('unit5.quiz.q5.opt4')],
            correctIndex: 0,
          },
        ]}
      />

      {/* Quick Summary */}
      <div className="unit-detail-reveal glass-card-strong rounded-3xl p-8 md:p-12 text-center mb-16" style={{ opacity: 0, transform: 'translateY(60px)' }}>
        <h3 className="text-2xl md:text-3xl font-black text-white mb-6">{t('unit5.summary')}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-start">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-cyan font-bold text-sm mb-1">{t('unit5.sumElasticity')}</p>
            <p className="text-gray-400 text-xs">{t('unit5.sumElasticityDesc')}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-purple font-bold text-sm mb-1">{t('unit5.sumPressure')}</p>
            <p className="text-gray-400 text-xs">{t('unit5.sumPressureDesc')}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-pink font-bold text-sm mb-1">{t('unit5.sumStressStrain')}</p>
            <p className="text-gray-400 text-xs">{t('unit5.sumStressStrainDesc')}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-amber font-bold text-sm mb-1">{t('unit5.sumDensity')}</p>
            <p className="text-gray-400 text-xs">{t('unit5.sumDensityDesc')}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-teal font-bold text-sm mb-1">{t('unit5.sumBuoyancy')}</p>
            <p className="text-gray-400 text-xs">{t('unit5.sumBuoyancyDesc')}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-brand-rose font-bold text-sm mb-1">{t('unit5.sumAtmPressure')}</p>
            <p className="text-gray-400 text-xs">{t('unit5.sumAtmPressureDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
