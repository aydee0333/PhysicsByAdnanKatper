import { useState } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function DistanceDisplacementExplainer() {
  const t = useT();
  const [scenario, setScenario] = useState(0);
  const scenarios = [
    { name: 'Boy to School', path: 'Home → Shop → School', distance: '500 m', displacement: '400 m East', note: t('unit2.scenario1.note') },
    { name: 'Circular Park', path: 'Full circle around park', distance: '628 m', displacement: '0 m', note: t('unit2.scenario2.note') },
    { name: 'Cricket Run', path: 'Run to boundary and back', distance: '160 m', displacement: '0 m', note: t('unit2.scenario3.note') },
  ];

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {scenarios.map((s, i) => (
          <button key={i} onClick={() => setScenario(i)} className={`flex-1 py-2 rounded-xl text-sm font-semibold ${scenario === i ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : 'glass-card text-gray-400'}`}>
            {s.name}
          </button>
        ))}
      </div>
      <div className="glass-card rounded-2xl p-6">
        <p className="text-gray-400 text-sm mb-2">Path: <span className="text-white">{scenarios[scenario].path}</span></p>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="formula-box rounded-xl p-4 text-center">
            <p className="text-gray-400 text-xs uppercase">{t('unit2.distance')}</p>
            <p className="text-2xl font-space font-bold text-brand-cyan">{scenarios[scenario].distance}</p>
          </div>
          <div className="formula-box rounded-xl p-4 text-center">
            <p className="text-gray-400 text-xs uppercase">{t('unit2.displacement')}</p>
            <p className="text-2xl font-space font-bold text-brand-pink">{scenarios[scenario].displacement}</p>
          </div>
        </div>
        <p className="text-brand-amber text-sm">💡 {scenarios[scenario].note}</p>
      </div>
    </div>
  );
}
