import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
  Atom, Eye, EyeOff, Lock, User, ArrowRight, Loader2,
  Sparkles, Phone, MapPin, ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { useLang } from '../i18n/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { LANG_META } from '../i18n/translations';

const TEACHER_PHOTO_URL =
  'https://uploads.onecompiler.io/44hsxfpta/44kc9pfyq/1776198454345-019d8dad-17fc-7ce8-ad7d-29c365362acc.png';

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
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="blob w-[500px] h-[500px] bg-brand-purple -top-32 -left-32" />
      <div className="blob w-[420px] h-[420px] bg-brand-pink -bottom-32 -right-32" />
      <div className="blob w-[360px] h-[360px] bg-brand-cyan top-1/3 right-1/4" />
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
    </div>
  );
}

function Typewriter({ phrases }: { phrases: string[] }) {
  const [text, setText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setText('');
    setPhraseIdx(0);
    setDeleting(false);
  }, [phrases]);

  useEffect(() => {
    const current = phrases[phraseIdx % phrases.length] || '';
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timer = setTimeout(() => setDeleting(true), 1600);
    } else if (deleting && text === '') {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
    } else {
      timer = setTimeout(() => {
        setText((t) => deleting ? current.substring(0, t.length - 1) : current.substring(0, t.length + 1));
      }, deleting ? 28 : 55);
    }

    return () => clearTimeout(timer);
  }, [text, deleting, phraseIdx, phrases]);

  return (
    <span>
      {text}
      <span className="inline-block w-[2px] h-[1em] bg-brand-cyan align-middle ml-1 animate-pulse" />
    </span>
  );
}

export default function LoginPage() {
  const { loggedIn, login } = useAuth();
  const { t, lang, dir } = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const cardRef = useRef<HTMLDivElement>(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imgFailed, setImgFailed] = useState(false);

  if (loggedIn) {
    const from = (location.state as { from?: string } | null)?.from || '/';
    return <Navigate to={from} replace />;
  }

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
      cardRef.current?.classList.add('shake');
      setTimeout(() => cardRef.current?.classList.remove('shake'), 500);
    }
  };

  const typingPhrases = [
    t('login.typing.1'),
    t('login.typing.2'),
    t('login.typing.3'),
    t('login.typing.4'),
  ];

  return (
    <div dir={dir} className="relative min-h-screen w-full overflow-hidden bg-brand-dark text-gray-200">
      <LoginBackground />

      <header className="relative z-20 flex items-center justify-between px-8 py-6">
        <Link to="/login" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center">
            <Atom size={22} />
          </div>
          <div>
            <span className="font-bold text-xl">{t('brand.name')}</span>
            <span className="block text-xs text-brand-cyan">{t('brand.subtitle')}</span>
          </div>
        </Link>
        <LanguageSwitcher />
      </header>

      <main className="relative z-10 px-6 pb-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left side - Teacher info */}
          <div className="text-center lg:text-left">
            <div className="relative w-52 h-52 mx-auto lg:mx-0 mb-8">
              {!imgFailed ? (
                <img
                  src={TEACHER_PHOTO_URL}
                  alt="Adnan Katper"
                  onError={() => setImgFailed(true)}
                  className="w-full h-full object-cover rounded-full border-4 border-brand-dark"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-purple to-brand-pink rounded-full">
                  <span className="text-7xl font-black">AK</span>
                </div>
              )}
            </div>
            <h1 className="text-5xl font-black mb-3">
              {t('login.tagline')} <span className="gradient-text">{t('login.teacherName')}</span>
            </h1>
            <p className="text-brand-cyan text-lg mb-2">{t('login.teacherTitle')}</p>
            <div className="min-h-[2.5rem] text-gray-300">
              <Typewriter phrases={typingPhrases} />
            </div>
          </div>

          {/* Login Card */}
          <div ref={cardRef} className="glass-card-strong rounded-3xl p-9 max-w-md mx-auto w-full">
            <h2 className="text-3xl font-black mb-2">{t('login.heading')}</h2>
            <p className="text-gray-400 mb-8">{t('login.subheading')}</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{t('login.username')}</label>
                <div className="relative mt-2">
                  <User className="absolute left-4 top-4 text-gray-500" size={18} />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={t('login.usernamePh')}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:border-brand-cyan focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{t('login.password')}</label>
                <div className="relative mt-2">
                  <Lock className="absolute left-4 top-4 text-gray-500" size={18} />
                  <input
                    type={showPwd ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('login.passwordPh')}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-12 text-white placeholder-gray-500 focus:border-brand-cyan focus:outline-none"
                    required
                  />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-4 top-4 text-gray-400" aria-label={t('login.show')}>
                    {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && <div className="text-brand-rose text-sm bg-brand-rose/10 p-3 rounded-xl">{error}</div>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-purple via-brand-pink to-brand-cyan text-white font-bold text-lg flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all disabled:opacity-70"
              >
                {submitting ? (
                  <><Loader2 className="animate-spin" size={20} /> {t('login.signingIn')}</>
                ) : (
                  <>{t('login.signIn')} <ArrowRight size={20} /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}