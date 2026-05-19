import { useT } from '../../i18n/LanguageContext';

export default function EarthMassCalc() {
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
