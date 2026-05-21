import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Atom, Phone, MapPin, School } from 'lucide-react';
import EditableTranslation from '../i18n/tms/components/EditableTranslation';

export default memo(function Footer() {
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
                <EditableTranslation tKey="footer.brand" as="span" className="font-space font-bold text-white text-lg" />
              </div>
            </div>
            <EditableTranslation tKey="footer.desc" as="p" className="text-gray-500 text-sm leading-relaxed" />
          </div>

          {/* Quick Links */}
          <div>
            <EditableTranslation tKey="footer.quickLinks" as="h4" className="text-white font-bold mb-4 text-sm tracking-widest uppercase" />
            <div className="space-y-3">
              <Link to="/" className="block text-gray-500 text-sm hover:text-brand-cyan transition-colors"><EditableTranslation tKey="footer.home" as="span" /></Link>
              <Link to="/class-ix" className="block text-gray-500 text-sm hover:text-brand-cyan transition-colors"><EditableTranslation tKey="footer.classIX" as="span" /></Link>
              <Link to="/class-x" className="block text-gray-500 text-sm hover:text-brand-cyan transition-colors"><EditableTranslation tKey="footer.classX" as="span" /></Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <EditableTranslation tKey="footer.contactTitle" as="h4" className="text-white font-bold mb-4 text-sm tracking-widest uppercase" />
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-amber to-brand-rose flex items-center justify-center text-white">
                  <School size={18} />
                </div>
                <div>
                  <EditableTranslation tKey="footer.schoolName" as="p" className="text-white text-sm font-semibold" />
                  <EditableTranslation tKey="footer.schoolLoc" as="p" className="text-gray-500 text-xs" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-cyan to-brand-purple flex items-center justify-center text-white">
                  <Phone size={18} />
                </div>
                <div>
                  <EditableTranslation tKey="footer.teacher" as="p" className="text-white text-sm font-semibold" />
                  <EditableTranslation tKey="footer.phone" as="p" className="text-brand-cyan text-xs font-medium" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-lime to-brand-teal flex items-center justify-center text-white">
                  <MapPin size={18} />
                </div>
                <div>
                  <EditableTranslation tKey="footer.locationTitle" as="p" className="text-white text-sm font-semibold" />
                  <EditableTranslation tKey="footer.location" as="p" className="text-gray-500 text-xs" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <EditableTranslation tKey="footer.madeWith" as="p" className="text-gray-600 text-xs" />
          <EditableTranslation tKey="footer.teacherLine" as="p" className="text-gray-600 text-xs" />
        </div>
      </div>
    </footer>
  );
})