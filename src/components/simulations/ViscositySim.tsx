import { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { useT } from '../../i18n/LanguageContext';

export default function ViscositySim() {
  const t = useT();
  const liquids = [
    { name: t('unit7.water'), desc: t('unit7.waterDesc'), speed: 180, color: '#06b6d4' },
    { name: t('unit7.oil'), desc: t('unit7.oilDesc'), speed: 90, color: '#f59e0b' },
    { name: t('unit7.honey'), desc: t('unit7.honeyDesc'), speed: 20, color: '#ec4899' },
  ];
  const [running, setRunning] = useState(false);
  const [positions, setPositions] = useState([0, 0, 0]);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setPositions(prev => prev.map((p, i) => Math.min(160, p + liquids[i].speed * 0.05)));
    }, 50);
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div>
      <div className="bg-brand-dark/60 rounded-2xl border border-white/5 relative overflow-hidden mb-4 p-4" style={{ height: 240 }}>
        {liquids.map((liq, i) => (
          <div key={i} className="flex items-center gap-3 mb-2">
            <span className="text-gray-400 text-xs w-16">{liq.name}</span>
            <div className="flex-1 bg-white/5 rounded-full h-6 relative overflow-hidden">
              <div className="absolute left-0 top-0 h-full rounded-full transition-all duration-75" style={{ width: positions[i] / 160 * 100 + '%', backgroundColor: liq.color, opacity: 0.6 }} />
              <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2" style={{ left: positions[i] / 160 * 100 + '%', borderColor: liq.color, backgroundColor: liq.color }} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-3 justify-center mb-4">
        <button onClick={() => { setRunning(true); setPositions([0, 0, 0]); setTimeout(() => setRunning(false), 3000); }} className="btn-primary px-6 py-2 rounded-xl text-white font-semibold text-sm">{t('unit7.ballDropTitle')}</button>
        <button onClick={() => { setRunning(false); setPositions([0, 0, 0]); }} className="glass-card px-4 py-2 rounded-xl text-gray-400 text-sm hover:text-white flex items-center gap-2"><RotateCcw size={14} /> {t('unit7.reset')}</button>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        {liquids.map((liq, i) => (
          <div key={i} className="glass-card rounded-xl p-3"><p className="font-bold text-sm" style={{ color: liq.color }}>{liq.name}</p><p className="text-gray-400 text-xs">{liq.desc}</p></div>
        ))}
      </div>
    </div>
  );
}
