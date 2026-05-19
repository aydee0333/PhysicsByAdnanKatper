import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../utils/gsap';
import PhysicsBackground from '../components/PhysicsBackground';
import { BookOpen, FlaskConical, Atom, ChevronRight, Star, Award, Users, Phone, MapPin } from 'lucide-react';
import { useT } from '../i18n/LanguageContext';

export default function HomePage() {
  const t = useT();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.home-reveal').forEach((el, i) => {
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
          delay: (i % 3) * 0.1,
        });
      });
      gsap.from('.hero-title', { opacity: 0, y: 60, duration: 1.2, ease: 'power3.out', delay: 0.3 });
      gsap.from('.hero-subtitle', { opacity: 0, y: 40, duration: 1, ease: 'power3.out', delay: 0.6 });
      gsap.from('.hero-buttons', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out', delay: 0.9 });
      gsap.from('.hero-badge', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', delay: 1.2 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <PhysicsBackground />
        <div className="blob w-96 h-96 bg-brand-purple top-20 -left-20" style={{ animationDelay: '0s' }} />
        <div className="blob w-80 h-80 bg-brand-pink bottom-20 -right-20" style={{ animationDelay: '5s' }} />
        <div className="blob w-64 h-64 bg-brand-cyan top-1/2 left-1/3" style={{ animationDelay: '10s' }} />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card mb-8 float-anim">
            <span className="w-2 h-2 rounded-full bg-brand-lime pulse-glow" />
            <span className="text-xs font-medium text-brand-cyan tracking-widest uppercase">{t('home.badge')}</span>
          </div>

          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="block text-white">{t('home.heroTitle1')}</span>
            <span className="gradient-text">{t('home.heroTitle2')}</span>
          </h1>

          <p className="hero-subtitle text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('home.heroDesc') }} />

          <div className="hero-buttons flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link to="/class-ix" className="btn-class px-10 py-5 rounded-2xl text-white font-bold text-lg tracking-wide inline-flex items-center gap-3">
              <BookOpen size={24} /> <span>{t('home.btnIX')}</span> <ChevronRight size={20} />
            </Link>
            <Link to="/class-x" className="btn-primary px-10 py-5 rounded-2xl text-white font-bold text-lg tracking-wide inline-flex items-center gap-3">
              <FlaskConical size={24} /> <span>{t('home.btnX')}</span> <ChevronRight size={20} />
            </Link>
          </div>

          {/* School info pill */}
          <div className="hero-badge mt-16 inline-flex items-center gap-4 school-badge px-6 py-4 rounded-2xl">
            <div className="w-14 h-14 rounded-xl overflow-hidden float-anim shadow-lg">
              <img src="https://uploads.onecompiler.io/44hsxfpta/44jd2aw6x/Adobe%20Express%20-%20file.png" alt="School Logo" className="w-full h-full object-cover" loading="lazy" decoding="async" />
            </div>
            <div className="text-start">
              <p className="text-sm md:text-base text-brand-amber font-bold">{t('home.schoolName')}</p>
              <p className="text-xs text-gray-400">{t('home.schoolLoc')}</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] text-gray-500 tracking-widest uppercase">{t('home.scroll')}</span>
          <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex justify-center pt-2">
            <div className="w-1 h-2 bg-brand-purple rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* About Teacher Section */}
      <section className="relative py-24 md:py-32 grid-bg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="home-reveal text-center mb-16" style={{ opacity: 0, transform: 'translateY(60px)' }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-lime" />
              <span className="text-[11px] font-semibold text-gray-400 tracking-widest uppercase">{t('home.aboutBadge')}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4" dangerouslySetInnerHTML={{ __html: t('home.aboutTitle') }} />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Photo side with quote */}
            <div className="home-reveal relative flex justify-center" style={{ opacity: 0, transform: 'translateY(60px)' }}>
              <div className="relative">
                {/* Quote card */}
                <div className="glass-card-strong rounded-3xl p-8 md:p-10 relative max-w-md">
                  <div className="quote-mark">"</div>
                  <div className="teacher-photo-ring mx-auto mb-6" style={{ width: 'fit-content' }}>
                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden bg-gradient-to-br from-brand-navy to-brand-dark border-4 border-white/10 relative">
                      <img
                        src="https://uploads.onecompiler.io/44hsxfpta/44kc9pfyq/1776198454345-019d8dad-17fc-7ce8-ad7d-29c365362acc.png"
                        alt="Adnan Katper - Physics Teacher"
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent" />
                    </div>
                  </div>
                  <p className="text-gray-300 text-lg md:text-xl leading-relaxed text-center italic relative z-10">
                    {t('home.quote')}
                  </p>
                  <div className="mt-6 flex items-center justify-center gap-2">
                    <div className="h-px w-8 bg-brand-purple/50" />
                    <p className="text-brand-cyan font-semibold text-sm">{t('home.teacherName')}</p>
                    <div className="h-px w-8 bg-brand-purple/50" />
                  </div>
                  <p className="text-gray-500 text-xs text-center mt-1">{t('home.teacherRole')}</p>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 md:right-0 glass-card-strong px-4 py-2 rounded-xl float-anim">
                  <span className="text-brand-cyan font-bold text-sm">{t('home.badge1')}</span>
                </div>
                <div className="absolute -bottom-2 -left-4 md:left-4 glass-card-strong px-4 py-2 rounded-xl float-anim-delay">
                  <span className="text-brand-pink font-bold text-sm">{t('home.badge2')}</span>
                </div>
                <div className="absolute top-1/3 -right-6 md:-right-8 glass-card-strong px-4 py-2 rounded-xl float-anim-delay2">
                  <span className="text-brand-amber font-bold text-sm">{t('home.badge3')}</span>
                </div>
              </div>
            </div>

            {/* Info side */}
            <div className="home-reveal" style={{ opacity: 0, transform: 'translateY(60px)' }}>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4" dangerouslySetInnerHTML={{ __html: t('home.dedicatedTitle') }} />
              <p className="text-brand-cyan font-medium text-xl mb-6">{t('home.dedicatedSub')}</p>

              <p className="text-gray-400 leading-relaxed mb-6 text-lg" dangerouslySetInnerHTML={{ __html: t('home.desc1') }} />
              <p className="text-gray-400 leading-relaxed mb-8 text-lg">{t('home.desc2')}</p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="glass-card rounded-2xl p-5 text-center">
                  <div className="text-3xl font-black gradient-text-cyan">10+</div>
                  <div className="text-xs text-gray-500 mt-1">{t('home.stat1')}</div>
                </div>
                <div className="glass-card rounded-2xl p-5 text-center">
                  <div className="text-3xl font-black gradient-text">500+</div>
                  <div className="text-xs text-gray-500 mt-1">{t('home.stat2')}</div>
                </div>
                <div className="glass-card rounded-2xl p-5 text-center">
                  <div className="text-3xl font-black gradient-text-amber">100%</div>
                  <div className="text-xs text-gray-500 mt-1">{t('home.stat3')}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full glass-card text-sm text-gray-300">
                  <Star size={14} className="text-brand-amber" /> {t('home.tag1')}
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full glass-card text-sm text-gray-300">
                  <Award size={14} className="text-brand-cyan" /> {t('home.tag2')}
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full glass-card text-sm text-gray-300">
                  <Users size={14} className="text-brand-pink" /> {t('home.tag3')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Class Selection Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="blob w-80 h-80 bg-brand-purple top-0 right-0" style={{ animationDelay: '2s' }} />
        <div className="blob w-64 h-64 bg-brand-cyan bottom-0 left-0" style={{ animationDelay: '7s' }} />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="home-reveal text-center mb-16" style={{ opacity: 0, transform: 'translateY(60px)' }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-pink pulse-glow" />
              <span className="text-[11px] font-semibold text-gray-400 tracking-widest uppercase">{t('home.chooseBadge')}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6" dangerouslySetInnerHTML={{ __html: t('home.chooseTitle') }} />
            <p className="text-gray-400 max-w-xl mx-auto text-lg">{t('home.chooseDesc')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Class IX Card */}
            <Link to="/class-ix" className="home-reveal group" style={{ opacity: 0, transform: 'translateY(60px)' }}>
              <div className="glass-card rounded-3xl p-10 md:p-12 text-center relative overflow-hidden transition-all duration-500 hover:border-brand-cyan/30 group-hover:shadow-[0_0_60px_rgba(6,182,212,0.15)]">
                <div className="absolute top-4 right-4 text-8xl font-black font-space opacity-5 text-brand-cyan">{t('home.classIXBadge')}</div>
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-cyan to-brand-purple flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                  <BookOpen size={36} />
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-3">{t('home.classIXTitle')}</h3>
                <p className="text-brand-cyan font-semibold text-lg mb-4">{t('home.classIXUnits')}</p>
                <p className="text-gray-400 text-base leading-relaxed mb-6">{t('home.classIXDesc')}</p>
                <span className="inline-flex items-center gap-2 text-brand-cyan font-semibold text-sm group-hover:gap-4 transition-all">
                  {t('home.exploreBtn')} <ChevronRight size={18} />
                </span>
              </div>
            </Link>

            {/* Class X Card */}
            <Link to="/class-x" className="home-reveal group" style={{ opacity: 0, transform: 'translateY(60px)' }}>
              <div className="glass-card rounded-3xl p-10 md:p-12 text-center relative overflow-hidden transition-all duration-500 hover:border-brand-pink/30 group-hover:shadow-[0_0_60px_rgba(236,72,153,0.15)]">
                <div className="absolute top-4 right-4 text-8xl font-black font-space opacity-5 text-brand-pink">{t('home.classXBadge')}</div>
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-pink to-brand-rose flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                  <FlaskConical size={36} />
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-3">{t('home.classXTitle')}</h3>
                <p className="text-brand-pink font-semibold text-lg mb-4">{t('home.classXUnits')}</p>
                <p className="text-gray-400 text-base leading-relaxed mb-6">{t('home.classXDesc')}</p>
                <span className="inline-flex items-center gap-2 text-brand-pink font-semibold text-sm group-hover:gap-4 transition-all">
                  {t('home.exploreBtn')} <ChevronRight size={18} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Banner */}
      <section className="relative py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="home-reveal glass-card-strong rounded-3xl p-8 md:p-12 text-center relative overflow-hidden" style={{ opacity: 0, transform: 'translateY(60px)' }}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-purple via-brand-pink to-brand-cyan" />
            <Atom size={48} className="text-brand-cyan mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-black text-white mb-3">{t('home.contactTitle')}</h3>
            <p className="text-gray-400 text-lg mb-6 max-w-xl mx-auto">{t('home.contactDesc')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="glass-card px-6 py-3 rounded-xl inline-flex items-center gap-3">
                <Phone size={18} className="text-brand-cyan" />
                <span className="text-white font-semibold text-lg">{t('home.phone')}</span>
              </div>
              <div className="glass-card px-6 py-3 rounded-xl inline-flex items-center gap-3">
                <MapPin size={18} className="text-brand-amber" />
                <span className="text-white font-semibold text-lg">{t('home.schoolContact')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}