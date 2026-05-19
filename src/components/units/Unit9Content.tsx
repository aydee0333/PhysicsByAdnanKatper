import { useState } from 'react';
import { Thermometer, Flame, Snowflake, Wind, Gauge } from 'lucide-react';
import { useT } from '../../i18n/LanguageContext';
import Section from '../Section';
import UnitQuiz from '../UnitQuiz';

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

/* ═══ MAIN UNIT 9 CONTENT ═══ */
export default function Unit9Content() {
  const t = useT();
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

      <UnitQuiz unitId="unit9" questions={[
        { question: t('unit9.quiz.q1'), options: [t('unit9.quiz.q1.opt1'), t('unit9.quiz.q1.opt2'), t('unit9.quiz.q1.opt3'), t('unit9.quiz.q1.opt4')], correctIndex: 2 },
        { question: t('unit9.quiz.q2'), options: [t('unit9.quiz.q2.opt1'), t('unit9.quiz.q2.opt2'), t('unit9.quiz.q2.opt3'), t('unit9.quiz.q2.opt4')], correctIndex: 1 },
        { question: t('unit9.quiz.q3'), options: [t('unit9.quiz.q3.opt1'), t('unit9.quiz.q3.opt2'), t('unit9.quiz.q3.opt3'), t('unit9.quiz.q3.opt4')], correctIndex: 1 },
        { question: t('unit9.quiz.q4'), options: [t('unit9.quiz.q4.opt1'), t('unit9.quiz.q4.opt2'), t('unit9.quiz.q4.opt3'), t('unit9.quiz.q4.opt4')], correctIndex: 1 },
        { question: t('unit9.quiz.q5'), options: [t('unit9.quiz.q5.opt1'), t('unit9.quiz.q5.opt2'), t('unit9.quiz.q5.opt3'), t('unit9.quiz.q5.opt4')], correctIndex: 2 },
      ]} />

      <div className="unit-detail-reveal glass-card-strong rounded-3xl p-8 md:p-12 text-center mb-16" style={{ opacity: 0, transform: 'translateY(60px)' }}>
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
