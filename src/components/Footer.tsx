import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Atom, Phone, MapPin, School } from 'lucide-react';
import { useT } from '../i18n/LanguageContext';

export default memo(function Footer() {
  const t = useT();

  return (
    <footer className="relative py-16 border-t border-white/5 bg-brand-dark">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center text-white">
                <Atom size={22} />
              </div>
              <div>
                <span className="font-space font-bold text-white text-lg">{t('footer.brand')}</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              {t('footer.desc')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm tracking-widest uppercase">{t('footer.quickLinks')}</h4>
            <div className="space-y-3">
              <Link to="/" className="block text-gray-500 text-sm hover:text-brand-cyan transition-colors">{t('footer.home')}</Link>
              <Link to="/class-ix" className="block text-gray-500 text-sm hover:text-brand-cyan transition-colors">{t('footer.classIX')}</Link>
              <Link to="/class-x" className="block text-gray-500 text-sm hover:text-brand-cyan transition-colors">{t('footer.classX')}</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm tracking-widest uppercase">{t('footer.contactTitle')}</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-amber to-brand-rose flex items-center justify-center text-white">
                  <School size={18} />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t('footer.schoolName')}</p>
                  <p className="text-gray-500 text-xs">{t('footer.schoolLoc')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-cyan to-brand-purple flex items-center justify-center text-white">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t('footer.teacher')}</p>
                  <p className="text-brand-cyan text-xs font-medium">{t('footer.phone')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-lime to-brand-teal flex items-center justify-center text-white">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t('footer.locationTitle')}</p>
                  <p className="text-gray-500 text-xs">{t('footer.location')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">{t('footer.madeWith')}</p>
          <p className="text-gray-600 text-xs">{t('footer.teacherLine')}</p>
        </div>
      </div>
    </footer>
  );
})