import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Atom, LogOut, User } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { useT } from '../i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { loggedIn, username, logout } = useAuth();
  const t = useT();

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/class-ix', label: t('nav.classIX') },
    { to: '/class-x', label: t('nav.classX') },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(10, 10, 26, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 group" dir="ltr">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
            <Atom size={22} />
          </div>
          <div>
            <span className="font-space font-bold text-lg text-white tracking-tight">Physics</span>
            <span className="block text-[10px] text-brand-cyan font-medium tracking-widest uppercase">By Adnan Katper</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link text-sm font-medium transition-colors ${
                location.pathname === link.to ? 'text-brand-cyan' : 'text-gray-300'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <LanguageSwitcher variant="compact" />

          {loggedIn && (
            <div className="flex items-center gap-2">
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <User size={14} className="text-brand-cyan" />
                <span className="text-xs text-gray-300 font-medium" dir="ltr">{username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-rose/10 hover:bg-brand-rose/20 border border-brand-rose/30 text-brand-rose text-xs font-bold transition-all"
                title={t('nav.logout')}
              >
                <LogOut size={14} />
                <span className="hidden xl:inline">{t('nav.logout')}</span>
              </button>
            </div>
          )}
        </div>

        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-6 pb-4 bg-brand-dark/95 backdrop-blur-xl border-t border-white/5">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`block py-3 text-sm border-b border-white/5 ${
                location.pathname === link.to ? 'text-brand-cyan font-semibold' : 'text-gray-300'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="py-3 border-b border-white/5">
            <LanguageSwitcher align="left" />
          </div>
          {loggedIn && (
            <div className="py-3 flex items-center justify-between">
              <span className="text-xs text-gray-400" dir="ltr">
                {t('nav.signedInAs')} <span className="text-brand-cyan font-bold">{username}</span>
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-rose/10 border border-brand-rose/30 text-brand-rose text-xs font-bold"
              >
                <LogOut size={14} />
                {t('nav.logout')}
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
