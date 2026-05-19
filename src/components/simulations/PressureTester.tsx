import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { useT } from '../../i18n/LanguageContext';

export default function PressureTester() {
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
