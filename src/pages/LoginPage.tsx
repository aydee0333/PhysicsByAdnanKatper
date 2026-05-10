import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import {
  Atom, Eye, EyeOff, Lock, User, ArrowRight, Loader2,
  Sparkles, Phone, MapPin, ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { useLang } from '../i18n/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { LANG_META } from '../i18n/translations';

const TEACHER_PHOTO_URL =
  'https://uploads.onecompiler.io/44hsxfpta/44jd2aw6x/Adobe%20Express%20-%20file.png';

/* ─────────────────────────────────────────────────────────
   Animated background: orbiting atoms, floating particles
   ───────────────────────────────────────────────────────── */
function LoginBackground() {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 6,
    dur: 8 + Math.random() * 8,
    color: ['#a78bfa', '#ec4899', '#06b6d4', '#f59e0b', '#14b8a6'][i % 5],
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Big blobs */}
      <div className="blob w-[500px] h-[500px] bg-brand-purple -top-32 -left-32" style={{ animationDelay: '0s' }} />
      <div className="blob w-[420px] h-[420px] bg-brand-pink -bottom-32 -right-32" style={{ animationDelay: '4s' }} />
      <div className="blob w-[360px] h-[360px] bg-brand-cyan top-1/3 right-1/4" style={{ animationDelay: '8s' }} />

      {/* Three orbiting atoms (top-left, top-right, bottom-center) */}
      <div className="absolute top-[12%] left-[8%] w-32 h-32 hidden md:block">
        <div className="absolute inset-0 rounded-full border border-brand-cyan/30" style={{ animation: 'orbit-spin 18s linear infinite' }}>
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-brand-cyan shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
        </div>
        <div className="absolute inset-2 rounded-full border border-brand-pink/30 rotate-45" style={{ animation: 'orbit-spin 12s linear infinite reverse' }}>
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-brand-pink shadow-[0_0_12px_rgba(236,72,153,0.8)]" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.9)]" />
      </div>

      <div className="absolute top-[18%] right-[10%] w-24 h-24 hidden lg:block">
        <div className="absolute inset-0 rounded-full border border-brand-amber/30" style={{ animation: 'orbit-spin 14s linear infinite reverse' }}>
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-brand-amber shadow-[0_0_12px_rgba(245,158,11,0.8)]" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.9)]" />
      </div>

      {/* Floating particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="physics-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        />
      ))}

      {/* Wave SVG at bottom */}
      <svg className="absolute bottom-0 left-0 w-full opacity-20" viewBox="0 0 1000 100" preserveAspectRatio="none" style={{ height: 100 }}>
        <defs>
          <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <path d="M0,50 Q250,0 500,50 T1000,50 V100 H0 Z" fill="url(#lg1)" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Typewriter — cycles through phrases (re-runs on lang change)
   ───────────────────────────────────────────────────────── */
function Typewriter({ phrases, speed = 55, pause = 1600 }: { phrases: string[]; speed?: number; pause?: number }) {
  const [text, setText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Reset when phrases (i.e., language) change
  useEffect(() => {
    setText('');
    setPhraseIdx(0);
    setDeleting(false);
  }, [phrases]);

  useEffect(() => {
    const current = phrases[phraseIdx % phrases.length] || '';
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timer = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === '') {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
    } else {
      timer = setTimeout(() => {
        setText((t) => deleting ? current.substring(0, t.length - 1) : current.substring(0, t.length + 1));
      }, deleting ? speed / 2 : speed);
    }

    return () => clearTimeout(timer);
  }, [text, deleting, phraseIdx, phrases, speed, pause]);

  return (
    <span>
      {text}
      <span className="inline-block w-[2px] h-[1em] bg-brand-cyan align-middle ml-1 animate-pulse" />
    </span>
  );
}

/* ─────────────────────────────────────────────────────────
   Main Login Page
   ───────────────────────────────────────────────────────── */
export default function LoginPage() {
  const { loggedIn, login } = useAuth();
  const { t, lang, dir } = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imgFailed, setImgFailed] = useState(false);

  // Already logged in? bounce to home
  if (loggedIn) {
    const from = (location.state as { from?: string } | null)?.from || '/';
    return <Navigate to={from} replace />;
  }

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(photoRef.current, {
        opacity: 0, scale: 0.6, y: -40, duration: 1, ease: 'back.out(1.6)',
      });
      gsap.from(headlineRef.current, {
        opacity: 0, y: 30, duration: 0.9, ease: 'power3.out', delay: 0.25,
      });
      gsap.from(cardRef.current, {
        opacity: 0, y: 50, duration: 1, ease: 'power3.out', delay: 0.45,
      });
      gsap.from('.login-stagger', {
        opacity: 0, y: 18, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.7,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    const res = await login(username, password, remember);
    setSubmitting(false);
    if (res.ok) {
      const from = (location.state as { from?: string } | null)?.from || '/';
      navigate(from, { replace: true });
    } else {
      setError(t('login.errorInvalid'));
      // shake animation
      cardRef.current?.classList.remove('shake');
      // force reflow
      void cardRef.current?.offsetWidth;
      cardRef.current?.classList.add('shake');
    }
  };

  const typingPhrases = [
    t('login.typing.1'),
    t('login.typing.2'),
    t('login.typing.3'),
    t('login.typing.4'),
  ];

  // Pick a comfortable input font: Latin for username, native for password? Use latin for inputs to keep typing predictable.
  const inputFontStyle = { fontFamily: "'Poppins', sans-serif" };

  return (
    <div
      ref={containerRef}
      dir={dir}
      className="relative min-h-screen w-full overflow-hidden bg-brand-dark text-gray-200"
      style={{ fontFamily: LANG_META[lang].font }}
    >
      <LoginBackground />

      {/* Top bar: brand + lang switcher */}
      <header className="relative z-20 flex items-center justify-between px-5 sm:px-8 py-5">
        <Link to="/login" className="flex items-center gap-3 group" dir="ltr">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
            <Atom size={22} />
          </div>
          <div>
            <span className="block font-space font-bold text-white text-lg leading-tight">Physics</span>
            <span className="block text-[10px] text-brand-cyan font-medium tracking-widest uppercase">
              By Adnan Katper
            </span>
          </div>
        </Link>

        <LanguageSwitcher />
      </header>

      {/* Main grid */}
      <main className="relative z-10 px-5 sm:px-8 pb-12 pt-2 md:pt-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[calc(100vh-160px)]">

          {/* ─── LEFT: Teacher portrait + headline + typewriter ─── */}
          <section className="flex flex-col items-center lg:items-start text-center lg:text-start">
            {/* Floating photo */}
            <div ref={photoRef} className="relative mb-8 float-anim" style={{ willChange: 'transform' }}>
              {/* Animated gradient ring */}
              <div className="absolute inset-0 -m-2 rounded-full opacity-90"
                   style={{
                     background: 'conic-gradient(from 0deg, #a78bfa, #ec4899, #06b6d4, #f59e0b, #a78bfa)',
                     animation: 'spin-gradient 6s linear infinite',
                     filter: 'blur(2px)',
                   }} />
              {/* Outer glow */}
              <div className="absolute inset-0 -m-8 rounded-full pointer-events-none"
                   style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)' }} />

              {/* The photo */}
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-brand-dark bg-gradient-to-br from-brand-navy to-brand-dark">
                {!imgFailed ? (
                  <img
                    src={TEACHER_PHOTO_URL}
                    alt="Adnan Katper"
                    onError={() => setImgFailed(true)}
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                ) : (
                  // Graceful fallback (works fully offline)
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-purple via-brand-pink to-brand-cyan">
                    <span className="font-space font-black text-7xl text-white drop-shadow-lg">AK</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent" />
              </div>

              {/* Floating mini-badges around photo */}
              <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-xl glass-card-strong text-xs font-bold text-brand-cyan shadow-lg float-anim-delay" dir="ltr">
                <Sparkles size={12} className="inline mr-1" /> Physics
              </div>
              <div className="absolute -bottom-2 -left-3 px-3 py-1.5 rounded-xl glass-card-strong text-xs font-bold text-brand-amber shadow-lg float-anim-delay2" dir="ltr">
                IX & X
              </div>
            </div>

            {/* Headline */}
            <div ref={headlineRef} className="max-w-md">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-5" dir="ltr">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-lime pulse-glow" />
                <span className="text-[11px] font-semibold text-gray-300 tracking-widest uppercase">
                  {t('login.welcome')}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-4">
                {t('login.tagline')}{' '}
                <span className="gradient-text block sm:inline">
                  {t('login.teacherName')}
                </span>
              </h1>

              <p className="text-brand-cyan font-semibold text-base sm:text-lg mb-2">
                {t('login.teacherTitle')}
              </p>

              {/* Typewriter line */}
              <div className="min-h-[2.5rem] text-gray-300 text-base sm:text-lg font-medium">
                <Typewriter phrases={typingPhrases} />
              </div>

              {/* Quick info chips */}
              <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start" dir="ltr">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl glass-card text-xs text-gray-300">
                  <MapPin size={14} className="text-brand-pink" />
                  <span>Naudero, Sindh</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl glass-card text-xs text-gray-300">
                  <Phone size={14} className="text-brand-cyan" />
                  <span>0333-7575953</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl glass-card text-xs text-gray-300">
                  <ShieldCheck size={14} className="text-brand-lime" />
                  <span>10+ Years Experience</span>
                </div>
              </div>
            </div>
          </section>

          {/* ─── RIGHT: Login card ─── */}
          <section className="flex justify-center lg:justify-end">
            <div
              ref={cardRef}
              className="w-full max-w-md glass-card-strong rounded-3xl p-7 sm:p-9 relative overflow-hidden"
              style={{ background: 'rgba(15, 15, 46, 0.75)', backdropFilter: 'blur(24px)' }}
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-purple via-brand-pink to-brand-cyan" />

              <div className="login-stagger mb-6">
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                  {t('login.heading')}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {t('login.subheading')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" dir={dir}>
                {/* Username */}
                <div className="login-stagger">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                    {t('login.username')}
                  </label>
                  <div className="relative">
                    <span className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'right-3' : 'left-3'} text-gray-500 pointer-events-none`}>
                      <User size={18} />
                    </span>
                    <input
                      type="text"
                      autoComplete="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={t('login.usernamePh')}
                      required
                      dir="ltr"
                      style={inputFontStyle}
                      className={`w-full bg-white/5 border border-white/10 rounded-xl py-3 ${
                        dir === 'rtl' ? 'pr-11 pl-4 text-right' : 'pl-11 pr-4'
                      } text-white placeholder-gray-500 outline-none focus:border-brand-cyan focus:bg-white/10 transition-all`}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="login-stagger">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                    {t('login.password')}
                  </label>
                  <div className="relative">
                    <span className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'right-3' : 'left-3'} text-gray-500 pointer-events-none`}>
                      <Lock size={18} />
                    </span>
                    <input
                      type={showPwd ? 'text' : 'password'}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t('login.passwordPh')}
                      required
                      dir="ltr"
                      style={inputFontStyle}
                      className={`w-full bg-white/5 border border-white/10 rounded-xl py-3 ${
                        dir === 'rtl' ? 'pr-11 pl-12 text-right' : 'pl-11 pr-12'
                      } text-white placeholder-gray-500 outline-none focus:border-brand-cyan focus:bg-white/10 transition-all`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd((s) => !s)}
                      aria-label={showPwd ? t('login.hide') : t('login.show')}
                      className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'left-3' : 'right-3'} text-gray-400 hover:text-white transition-colors p-1`}
                    >
                      {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Remember */}
                <div className="login-stagger flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer select-none group">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="peer sr-only"
                    />
                    <span className="w-5 h-5 rounded-md border-2 border-white/20 bg-white/5 flex items-center justify-center peer-checked:bg-brand-purple peer-checked:border-brand-purple transition-all">
                      <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                           fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"
                           style={{ opacity: remember ? 1 : 0 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">
                      {t('login.remember')}
                    </span>
                  </label>
                </div>

                {/* Error */}
                {error && (
                  <div className="login-stagger px-4 py-3 rounded-xl bg-brand-rose/10 border border-brand-rose/30 text-brand-rose text-sm font-medium">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="login-stagger btn-primary w-full py-3.5 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>{t('login.signingIn')}</span>
                    </>
                  ) : (
                    <>
                      <span>{t('login.signIn')}</span>
                      <ArrowRight size={18} className={dir === 'rtl' ? 'rotate-180' : ''} />
                    </>
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="login-stagger mt-7 pt-5 border-t border-white/5 text-center">
                <p className="text-xs text-gray-500">
                  {t('login.footer')}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
