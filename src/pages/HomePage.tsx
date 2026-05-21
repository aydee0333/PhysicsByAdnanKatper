import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../utils/gsap';
import PhysicsBackground from '../components/PhysicsBackground';
import { BookOpen, FlaskConical, Atom, ChevronRight, Star, Award, Users, Phone, MapPin } from 'lucide-react';
import EditableTranslation from '../i18n/tms/components/EditableTranslation';
import { GSAP_REVEAL_STYLE, BLOB_DELAY_0S, BLOB_DELAY_5S, BLOB_DELAY_10S, BLOB_DELAY_2S, BLOB_DELAY_7S } from '../utils/styles';

export default function HomePage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [schoolImgFailed, setSchoolImgFailed] = useState(false);
  const [teacherImgFailed, setTeacherImgFailed] = useState(false);

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
        <div className="blob w-96 h-96 bg-brand-purple top-20 -left-20" style={BLOB_DELAY_0S} />
        <div className="blob w-80 h-80 bg-brand-pink bottom-20 -right-20" style={BLOB_DELAY_5S} />
        <div className="blob w-64 h-64 bg-brand-cyan top-1/2 left-1/3" style={BLOB_DELAY_10S} />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card mb-8 float-anim">
            <span className="w-2 h-2 rounded-full bg-brand-lime pulse-glow" />
            <EditableTranslation tKey="home.badge" as="span" className="text-xs font-medium text-brand-cyan tracking-widest uppercase" />
          </div>

          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <EditableTranslation tKey="home.heroTitle1" as="span" className="block text-white" />
            <EditableTranslation tKey="home.heroTitle2" as="span" className="gradient-text" />
          </h1>

          <EditableTranslation tKey="home.heroDesc" as="p" className="hero-subtitle text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed" html />

          <div className="hero-buttons flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link to="/class-ix" className="btn-class px-10 py-5 rounded-2xl text-white font-bold text-lg tracking-wide inline-flex items-center gap-3">
              <BookOpen size={24} /> <EditableTranslation tKey="home.btnIX" as="span" /> <ChevronRight size={20} />
            </Link>
            <Link to="/class-x" className="btn-primary px-10 py-5 rounded-2xl text-white font-bold text-lg tracking-wide inline-flex items-center gap-3">
              <FlaskConical size={24} /> <EditableTranslation tKey="home.btnX" as="span" /> <ChevronRight size={20} />
            </Link>
          </div>

          {/* School info pill */}
          <div className="hero-badge mt-16 inline-flex items-center gap-4 school-badge px-6 py-4 rounded-2xl">
            <div className="w-14 h-14 rounded-xl overflow-hidden float-anim shadow-lg">
              {!schoolImgFailed ? (
                <img src="/images/school-logo.png" alt="School Logo" className="w-full h-full object-cover" loading="lazy" decoding="async" onError={() => setSchoolImgFailed(true)} />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-amber to-brand-orange text-2xl font-black">G</div>
              )}
            </div>
            <div className="text-start">
              <EditableTranslation tKey="home.schoolName" as="p" className="text-sm md:text-base text-brand-amber font-bold" />
              <EditableTranslation tKey="home.schoolLoc" as="p" className="text-xs text-gray-400" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <EditableTranslation tKey="home.scroll" as="span" className="text-[10px] text-gray-500 tracking-widest uppercase" />
          <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex justify-center pt-2">
            <div className="w-1 h-2 bg-brand-purple rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* About Teacher Section */}
      <section className="relative py-24 md:py-32 grid-bg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="home-reveal text-center mb-16" {...GSAP_REVEAL_STYLE}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-lime" />
              <EditableTranslation tKey="home.aboutBadge" as="span" className="text-[11px] font-semibold text-gray-400 tracking-widest uppercase" />
            </div>
            <EditableTranslation tKey="home.aboutTitle" as="h2" className="text-4xl md:text-6xl font-black text-white mb-4" html />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Photo side with quote */}
            <div className="home-reveal relative flex justify-center" {...GSAP_REVEAL_STYLE}>
              <div className="relative">
                {/* Quote card */}
                <div className="glass-card-strong rounded-3xl p-8 md:p-10 relative max-w-md">
                  <div className="quote-mark">"</div>
                  <div className="teacher-photo-ring mx-auto mb-6" style={{ width: 'fit-content' }}>
                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden bg-gradient-to-br from-brand-navy to-brand-dark border-4 border-white/10 relative">
                      {!teacherImgFailed ? (
                        <img
                          src="/images/teacher.png"
                          alt="Adnan Katper - Physics Teacher"
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                          onError={() => setTeacherImgFailed(true)}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-purple to-brand-pink">
                          <span className="text-5xl font-black">AK</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent" />
                    </div>
                  </div>
                  <EditableTranslation tKey="home.quote" as="p" className="text-gray-300 text-lg md:text-xl leading-relaxed text-center italic relative z-10" />
                  <div className="mt-6 flex items-center justify-center gap-2">
                    <div className="h-px w-8 bg-brand-purple/50" />
                    <EditableTranslation tKey="home.teacherName" as="p" className="text-brand-cyan font-semibold text-sm" />
                    <div className="h-px w-8 bg-brand-purple/50" />
                  </div>
                  <EditableTranslation tKey="home.teacherRole" as="p" className="text-gray-500 text-xs text-center mt-1" />
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 md:right-0 glass-card-strong px-4 py-2 rounded-xl float-anim">
                  <EditableTranslation tKey="home.badge1" as="span" className="text-brand-cyan font-bold text-sm" />
                </div>
                <div className="absolute -bottom-2 -left-4 md:left-4 glass-card-strong px-4 py-2 rounded-xl float-anim-delay">
                  <EditableTranslation tKey="home.badge2" as="span" className="text-brand-pink font-bold text-sm" />
                </div>
                <div className="absolute top-1/3 -right-6 md:-right-8 glass-card-strong px-4 py-2 rounded-xl float-anim-delay2">
                  <EditableTranslation tKey="home.badge3" as="span" className="text-brand-amber font-bold text-sm" />
                </div>
              </div>
            </div>

            {/* Info side */}
            <div className="home-reveal" {...GSAP_REVEAL_STYLE}>
              <EditableTranslation tKey="home.dedicatedTitle" as="h3" className="text-3xl md:text-4xl font-black text-white mb-4" html />
              <EditableTranslation tKey="home.dedicatedSub" as="p" className="text-brand-cyan font-medium text-xl mb-6" />

              <EditableTranslation tKey="home.desc1" as="p" className="text-gray-400 leading-relaxed mb-6 text-lg" html />
              <EditableTranslation tKey="home.desc2" as="p" className="text-gray-400 leading-relaxed mb-8 text-lg" />

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="glass-card rounded-2xl p-5 text-center">
                  <div className="text-3xl font-black gradient-text-cyan">10+</div>
                  <EditableTranslation tKey="home.stat1" as="div" className="text-xs text-gray-500 mt-1" />
                </div>
                <div className="glass-card rounded-2xl p-5 text-center">
                  <div className="text-3xl font-black gradient-text">500+</div>
                  <EditableTranslation tKey="home.stat2" as="div" className="text-xs text-gray-500 mt-1" />
                </div>
                <div className="glass-card rounded-2xl p-5 text-center">
                  <div className="text-3xl font-black gradient-text-amber">100%</div>
                  <EditableTranslation tKey="home.stat3" as="div" className="text-xs text-gray-500 mt-1" />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full glass-card text-sm text-gray-300">
                  <Star size={14} className="text-brand-amber" /> <EditableTranslation tKey="home.tag1" as="span" />
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full glass-card text-sm text-gray-300">
                  <Award size={14} className="text-brand-cyan" /> <EditableTranslation tKey="home.tag2" as="span" />
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full glass-card text-sm text-gray-300">
                  <Users size={14} className="text-brand-pink" /> <EditableTranslation tKey="home.tag3" as="span" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Class Selection Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="blob w-80 h-80 bg-brand-purple top-0 right-0" style={BLOB_DELAY_2S} />
        <div className="blob w-64 h-64 bg-brand-cyan bottom-0 left-0" style={BLOB_DELAY_7S} />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="home-reveal text-center mb-16" {...GSAP_REVEAL_STYLE}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-pink pulse-glow" />
              <EditableTranslation tKey="home.chooseBadge" as="span" className="text-[11px] font-semibold text-gray-400 tracking-widest uppercase" />
            </div>
            <EditableTranslation tKey="home.chooseTitle" as="h2" className="text-4xl md:text-6xl font-black text-white mb-6" html />
            <EditableTranslation tKey="home.chooseDesc" as="p" className="text-gray-400 max-w-xl mx-auto text-lg" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Class IX Card */}
            <Link to="/class-ix" className="home-reveal group" {...GSAP_REVEAL_STYLE}>
              <div className="glass-card rounded-3xl p-10 md:p-12 text-center relative overflow-hidden transition-all duration-500 hover:border-brand-cyan/30 group-hover:shadow-[0_0_60px_rgba(6,182,212,0.15)]">
                <EditableTranslation tKey="home.classIXBadge" as="div" className="absolute top-4 right-4 text-8xl font-black font-space opacity-5 text-brand-cyan" />
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-cyan to-brand-purple flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                  <BookOpen size={36} />
                </div>
                <EditableTranslation tKey="home.classIXTitle" as="h3" className="text-3xl md:text-4xl font-black text-white mb-3" />
                <EditableTranslation tKey="home.classIXUnits" as="p" className="text-brand-cyan font-semibold text-lg mb-4" />
                <EditableTranslation tKey="home.classIXDesc" as="p" className="text-gray-400 text-base leading-relaxed mb-6" />
                <span className="inline-flex items-center gap-2 text-brand-cyan font-semibold text-sm group-hover:gap-4 transition-all">
                  <EditableTranslation tKey="home.exploreBtn" as="span" /> <ChevronRight size={18} />
                </span>
              </div>
            </Link>

            {/* Class X Card */}
            <Link to="/class-x" className="home-reveal group" {...GSAP_REVEAL_STYLE}>
              <div className="glass-card rounded-3xl p-10 md:p-12 text-center relative overflow-hidden transition-all duration-500 hover:border-brand-pink/30 group-hover:shadow-[0_0_60px_rgba(236,72,153,0.15)]">
                <EditableTranslation tKey="home.classXBadge" as="div" className="absolute top-4 right-4 text-8xl font-black font-space opacity-5 text-brand-pink" />
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-pink to-brand-rose flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                  <FlaskConical size={36} />
                </div>
                <EditableTranslation tKey="home.classXTitle" as="h3" className="text-3xl md:text-4xl font-black text-white mb-3" />
                <EditableTranslation tKey="home.classXUnits" as="p" className="text-brand-pink font-semibold text-lg mb-4" />
                <EditableTranslation tKey="home.classXDesc" as="p" className="text-gray-400 text-base leading-relaxed mb-6" />
                <span className="inline-flex items-center gap-2 text-brand-pink font-semibold text-sm group-hover:gap-4 transition-all">
                  <EditableTranslation tKey="home.exploreBtn" as="span" /> <ChevronRight size={18} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Banner */}
      <section className="relative py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="home-reveal glass-card-strong rounded-3xl p-8 md:p-12 text-center relative overflow-hidden" {...GSAP_REVEAL_STYLE}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-purple via-brand-pink to-brand-cyan" />
            <Atom size={48} className="text-brand-cyan mx-auto mb-4" />
            <EditableTranslation tKey="home.contactTitle" as="h3" className="text-2xl md:text-3xl font-black text-white mb-3" />
            <EditableTranslation tKey="home.contactDesc" as="p" className="text-gray-400 text-lg mb-6 max-w-xl mx-auto" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="glass-card px-6 py-3 rounded-xl inline-flex items-center gap-3">
                <Phone size={18} className="text-brand-cyan" />
                <EditableTranslation tKey="home.phone" as="span" className="text-white font-semibold text-lg" />
              </div>
              <div className="glass-card px-6 py-3 rounded-xl inline-flex items-center gap-3">
                <MapPin size={18} className="text-brand-amber" />
                <EditableTranslation tKey="home.schoolContact" as="span" className="text-white font-semibold text-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}