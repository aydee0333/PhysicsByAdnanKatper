import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Atom, LogOut, User, Home, BookOpen, FlaskConical, Search } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { useT, useLang } from '../i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import SearchModal from './search/SearchModal';
import { cn } from '../utils/cn';

const NAV_ICONS = { '/': Home, '/class-ix': BookOpen, '/class-x': FlaskConical } as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { loggedIn, username, logout } = useAuth();
  const t = useT();
  const { dir } = useLang();
  const drawerRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/class-ix', label: t('nav.classIX') },
    { to: '/class-x', label: t('nav.classX') },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  // Close drawer on Escape key
  useEffect(() => {
    if (!drawerOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [drawerOpen]);

  // Ctrl+K / Cmd+K to open search
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const handleLogout = () => {
    logout();
    setDrawerOpen(false);
    navigate('/login', { replace: true });
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        scrolled
          ? 'bg-brand-dark/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/10'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0" dir="ltr">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
            <Atom size={20} />
          </div>
          <div className="hidden sm:block">
            <span className="font-space font-bold text-base text-white tracking-tight">Physics</span>
            <span className="block text-[10px] text-brand-cyan font-medium tracking-widest uppercase leading-tight">By Adnan Katper</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = NAV_ICONS[link.to as keyof typeof NAV_ICONS];
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                  active
                    ? 'text-brand-cyan bg-brand-cyan/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                )}
              >
                {Icon && <Icon size={16} />}
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-brand-cyan rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 border border-white/10 transition-all text-xs"
            aria-label={t('search.open')}
          >
            <Search size={14} />
            <span className="hidden lg:inline">{t('search.open')}</span>
            <kbd className="hidden lg:inline px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-gray-500 ms-1">Ctrl+K</kbd>
          </button>
          <LanguageSwitcher variant="compact" />
          {loggedIn && (
            <>
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
            </>
          )}
        </div>

        {/* Mobile search + hamburger */}
        <div className="flex items-center gap-1 md:hidden">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center justify-center w-11 h-11 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={t('search.open')}
          >
            <Search size={20} />
          </button>
          <button
            className="flex items-center justify-center w-11 h-11 rounded-xl text-white hover:bg-white/10 transition-colors"
            onClick={() => setDrawerOpen(!drawerOpen)}
            aria-label={drawerOpen ? t('common.closeMenu') : t('common.openMenu')}
            aria-expanded={drawerOpen}
          >
            {drawerOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      {/* Mobile drawer overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden',
          drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <div
        ref={drawerRef}
        className={cn(
          'fixed top-0 h-full w-72 max-w-[85vw] z-50 bg-brand-dark/95 backdrop-blur-2xl border-l border-white/5',
          'flex flex-col transition-transform duration-300 ease-out md:hidden',
          dir === 'rtl' ? 'left-0' : 'right-0',
          drawerOpen
            ? 'translate-x-0'
            : dir === 'rtl' ? '-translate-x-full' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-2.5" dir="ltr">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center text-white">
              <Atom size={18} />
            </div>
            <span className="font-space font-bold text-sm text-white">Physics</span>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={t('common.closeMenu')}
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer nav links */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = NAV_ICONS[link.to as keyof typeof NAV_ICONS];
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                    active
                      ? 'text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  )}
                >
                  {Icon && <Icon size={18} />}
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="my-4 border-t border-white/5" />

          {/* Language switcher */}
          <div className="px-1">
            <LanguageSwitcher align="left" />
          </div>
        </div>

        {/* Drawer footer */}
        {loggedIn && (
          <div className="shrink-0 border-t border-white/5 p-4 space-y-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5">
              <User size={14} className="text-brand-cyan" />
              <span className="text-xs text-gray-300 font-medium" dir="ltr">{username}</span>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-rose/10 border border-brand-rose/30 text-brand-rose text-sm font-bold transition-all hover:bg-brand-rose/20"
            >
              <LogOut size={16} />
              {t('nav.logout')}
            </button>
          </div>
        )}
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </nav>
  );
}
