import { useState } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function EnergyMatchingGame() {
  const t = useT();
  const [selectedExample, setSelectedExample] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, boolean>>({});
  const [message, setMessage] = useState('');

  const examples = [
    { name: t('unit8.movingCar'), type: 'kinetic', icon: '🚗' },
    { name: t('unit8.battery'), type: 'chemical', icon: '🔋' },
    { name: t('unit8.stretchedBow'), type: 'potential', icon: '🏹' },
    { name: t('unit8.burningFire'), type: 'heat', icon: '🔥' },
    { name: t('unit8.sunlight'), type: 'light', icon: '☀️' },
    { name: t('unit8.thunder'), type: 'sound', icon: '⚡' },
  ];
  const types = [
    { type: 'kinetic', label: t('unit8.typeKinetic'), desc: t('unit8.typeKineticDesc'), color: 'text-brand-cyan' },
    { type: 'chemical', label: 'Chemical', desc: 'Stored in bonds', color: 'text-brand-amber' },
    { type: 'potential', label: t('unit8.typePotential'), desc: t('unit8.typePotentialDesc'), color: 'text-brand-pink' },
    { type: 'heat', label: t('unit8.typeHeat'), desc: t('unit8.typeHeatDesc'), color: 'text-brand-rose' },
    { type: 'light', label: t('unit8.typeLight'), desc: t('unit8.typeLightDesc'), color: 'text-brand-lime' },
    { type: 'sound', label: t('unit8.typeSound'), desc: t('unit8.typeSoundDesc'), color: 'text-brand-purple' },
  ];

  const handleExampleClick = (ex: typeof examples[0]) => {
    if (matched[ex.name]) return;
    setSelectedExample(ex.name);
    setMessage('');
  };

  const handleTypeClick = (type: string) => {
    if (!selectedExample) { setMessage(t('unit8.selectFirst')); return; }
    const ex = examples.find(e => e.name === selectedExample);
    if (!ex) return;
    if (ex.type === type) {
      setMatched({ ...matched, [ex.name]: true });
      setMessage(t('unit8.correctMatch'));
      setSelectedExample(null);
    } else {
      setMessage(t('unit8.wrongMatch'));
    }
  };

  const allDone = Object.keys(matched).length === examples.length;

  return (
    <div>
      <p className="text-gray-400 text-sm mb-4">{t('unit8.clickExample')}</p>
      {message && <p className={`text-center mb-3 font-bold ${message.includes('✅') ? 'text-brand-lime' : message.includes('❌') ? 'text-brand-rose' : 'text-brand-amber'}`}>{message}</p>}
      {allDone && <p className="text-center text-brand-lime font-bold text-lg mb-4">{t('unit8.allMatched')}</p>}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <h4 className="text-gray-400 text-xs uppercase mb-2">{t('unit8.examples')}</h4>
          <div className="space-y-2">
            {examples.map(ex => (
              <button key={ex.name} onClick={() => handleExampleClick(ex)} disabled={matched[ex.name]} className={`w-full text-start p-3 rounded-xl text-sm font-semibold transition-all ${matched[ex.name] ? 'bg-brand-lime/15 text-brand-lime border border-brand-lime/30' : selectedExample === ex.name ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : 'glass-card text-gray-400 hover:text-white'}`}>
                {ex.icon} {ex.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-gray-400 text-xs uppercase mb-2">{t('unit8.energyTypes')}</h4>
          <div className="space-y-2">
            {types.map(tp => (
              <button key={tp.type} onClick={() => handleTypeClick(tp.type)} className={`w-full text-start p-3 rounded-xl text-sm transition-all glass-card hover:bg-white/5`}>
                <span className={`font-bold ${tp.color}`}>{tp.label}</span>
                <span className="text-gray-500 text-xs ms-2">({tp.desc})</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
