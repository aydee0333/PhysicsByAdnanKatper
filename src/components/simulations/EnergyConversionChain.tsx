import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { useT } from '../../i18n/LanguageContext';

export default function EnergyConversionChain() {
  const t = useT();
  const [chain, setChain] = useState<string[]>([]);
  const forms = [
    { name: 'Solar', icon: '☀️', color: 'text-brand-amber' },
    { name: 'Electrical', icon: '⚡', color: 'text-brand-cyan' },
    { name: 'Heat', icon: '🔥', color: 'text-brand-rose' },
    { name: 'Kinetic', icon: '🏃', color: 'text-brand-purple' },
    { name: 'Sound', icon: '🔊', color: 'text-brand-pink' },
    { name: 'Light', icon: '💡', color: 'text-brand-lime' },
  ];

  return (
    <div>
      <p className="text-gray-400 text-sm mb-4">{t('unit8.clickForms')}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {forms.map(f => (
          <button key={f.name} onClick={() => setChain([...chain, f.name])} className={`glass-card px-3 py-2 rounded-xl text-sm font-semibold ${f.color} hover:bg-white/5`}>
            {f.icon} {f.name}
          </button>
        ))}
      </div>
      {chain.length > 0 && (
        <div className="formula-box rounded-xl p-4 mb-4">
          <p className="text-white font-space text-lg">{chain.map((c, i) => <span key={i}>{i > 0 && <span className="text-gray-500 mx-2">→</span>}<span className="text-brand-cyan">{c}</span></span>)}</p>
        </div>
      )}
      <button onClick={() => setChain([])} className="mx-auto block text-xs text-gray-500 hover:text-white flex items-center gap-1"><RotateCcw size={12} /> {t('unit8.resetChain')}</button>
    </div>
  );
}
