import { useT } from '../../i18n/LanguageContext';

export default function WaterCycleDiagram() {
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
