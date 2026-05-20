import { useState } from 'react';
import { useT } from '../../i18n/LanguageContext';

export default function EfficiencyCalculator() {
  const t = useT();
  const [input, setInput] = useState(1000);
  const [output, setOutput] = useState(750);
  const efficiency = (output / input) * 100;

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div><label className="text-gray-400 text-sm block mb-2">{t('unit8.inputEnergy').replace('{input}', String(input))}</label><input type="range" min="100" max="5000" step="100" value={input} onChange={e => setInput(Number(e.target.value))} className="w-full accent-brand-cyan" /></div>
        <div><label className="text-gray-400 text-sm block mb-2">{t('unit8.outputEnergy').replace('{output}', String(output))}</label><input type="range" min="0" max={input} step="100" value={output} onChange={e => setOutput(Number(e.target.value))} className="w-full accent-brand-pink" /></div>
      </div>
      <div className="formula-box rounded-2xl p-6 text-center mb-4">
        <p className="text-gray-400 text-xs uppercase mb-2">{t('unit8.efficiencyFormula')}</p>
        <p className="text-3xl font-space font-bold text-brand-cyan">{efficiency.toFixed(1)}%</p>
        <div className="w-full bg-white/10 rounded-full h-4 mt-3"><div className="h-full rounded-full bg-brand-cyan" style={{ width: `${efficiency}%` }} /></div>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="glass-card rounded-xl p-3 text-center"><p className="text-brand-rose font-bold text-sm">{t('unit8.carEngine')}</p><p className="text-gray-400 text-xs">{t('unit8.carEngineEff')}</p></div>
        <div className="glass-card rounded-xl p-3 text-center"><p className="text-brand-lime font-bold text-sm">{t('unit8.ledBulb')}</p><p className="text-gray-400 text-xs">{t('unit8.ledBulbEff')}</p></div>
        <div className="glass-card rounded-xl p-3 text-center"><p className="text-brand-amber font-bold text-sm">{t('unit8.solarPanel')}</p><p className="text-gray-400 text-xs">{t('unit8.solarPanelEff')}</p></div>
      </div>
    </div>
  );
}
