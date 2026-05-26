import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../utils/gsap';
import { GSAP_REVEAL_STYLE, BLOB_DELAY_0S, BLOB_DELAY_5S } from '../utils/styles';
import PhysicsBackground from '../components/PhysicsBackground';
import {
  Ruler, Move, Gauge, RotateCcw, Magnet,
  Zap, Droplets, Thermometer
} from 'lucide-react';
import EditableTranslation from '../i18n/tms/components/EditableTranslation';
import { useLang } from '../i18n/LanguageContext';

export default function ClassIXPage() {
  const { adminState } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);

  const classIXUnits = [
    {
      number: '01',
      titleKey: 'classIX.u1.title',
      icon: <Ruler size={40} />,
      color: 'from-[#7c3aed] to-[#a78bfa]',
      colorHex: '#7c3aed',
      bgGlow: 'hover:shadow-[0_0_60px_rgba(124,58,237,0.2)]',
      borderGlow: 'hover:border-brand-purple/30',
      textColor: 'text-brand-purple',
      topicsKeys: ['classIX.u1.t1', 'classIX.u1.t2', 'classIX.u1.t3', 'classIX.u1.t4'],
    },
    {
      number: '02',
      titleKey: 'classIX.u2.title',
      icon: <Move size={40} />,
      color: 'from-[#06b6d4] to-[#22d3ee]',
      colorHex: '#06b6d4',
      bgGlow: 'hover:shadow-[0_0_60px_rgba(6,182,212,0.2)]',
      borderGlow: 'hover:border-brand-cyan/30',
      textColor: 'text-brand-cyan',
      topicsKeys: ['classIX.u2.t1', 'classIX.u2.t2', 'classIX.u2.t3', 'classIX.u2.t4', 'classIX.u2.t5'],
    },
    {
      number: '03',
      titleKey: 'classIX.u3.title',
      icon: <Gauge size={40} />,
      color: 'from-[#ec4899] to-[#f472b6]',
      colorHex: '#ec4899',
      bgGlow: 'hover:shadow-[0_0_60px_rgba(236,72,153,0.2)]',
      borderGlow: 'hover:border-brand-pink/30',
      textColor: 'text-brand-pink',
      topicsKeys: ['classIX.u3.t1', 'classIX.u3.t2', 'classIX.u3.t3', 'classIX.u3.t4', 'classIX.u3.t5'],
    },
    {
      number: '04',
      titleKey: 'classIX.u4.title',
      icon: <RotateCcw size={40} />,
      color: 'from-[#f59e0b] to-[#fbbf24]',
      colorHex: '#f59e0b',
      bgGlow: 'hover:shadow-[0_0_60px_rgba(245,158,11,0.2)]',
      borderGlow: 'hover:border-brand-amber/30',
      textColor: 'text-brand-amber',
      topicsKeys: ['classIX.u4.t1', 'classIX.u4.t2', 'classIX.u4.t3', 'classIX.u4.t4'],
    },
    {
      number: '05',
      titleKey: 'classIX.u5.title',
      icon: <Droplets size={40} />,
      color: 'from-[#14b8a6] to-[#2dd4bf]',
      colorHex: '#14b8a6',
      bgGlow: 'hover:shadow-[0_0_60px_rgba(20,184,166,0.2)]',
      borderGlow: 'hover:border-brand-teal/30',
      textColor: 'text-brand-teal',
      topicsKeys: ['classIX.u5.t1', 'classIX.u5.t2', 'classIX.u5.t3', 'classIX.u5.t4'],
    },
    {
      number: '06',
      titleKey: 'classIX.u6.title',
      icon: <Magnet size={40} />,
      color: 'from-[#f43f5e] to-[#fb7185]',
      colorHex: '#f43f5e',
      bgGlow: 'hover:shadow-[0_0_60px_rgba(244,63,94,0.2)]',
      borderGlow: 'hover:border-brand-rose/30',
      textColor: 'text-brand-rose',
      topicsKeys: ['classIX.u6.t1', 'classIX.u6.t2', 'classIX.u6.t3', 'classIX.u6.t4'],
    },
    {
      number: '07',
      titleKey: 'classIX.u7.title',
      icon: <Zap size={40} />,
      color: 'from-[#7c3aed] to-[#06b6d4]',
      colorHex: '#7c3aed',
      bgGlow: 'hover:shadow-[0_0_60px_rgba(124,58,237,0.2)]',
      borderGlow: 'hover:border-brand-purple/30',
      textColor: 'text-brand-purple',
      topicsKeys: ['classIX.u7.t1', 'classIX.u7.t2', 'classIX.u7.t3', 'classIX.u7.t4'],
    },
    {
      number: '08',
      titleKey: 'classIX.u8.title',
      icon: <Zap size={40} />,
      color: 'from-[#f59e0b] to-[#f43f5e]',
      colorHex: '#f59e0b',
      bgGlow: 'hover:shadow-[0_0_60px_rgba(245,158,11,0.2)]',
      borderGlow: 'hover:border-brand-amber/30',
      textColor: 'text-brand-amber',
      topicsKeys: ['classIX.u8.t1', 'classIX.u8.t2', 'classIX.u8.t3', 'classIX.u8.t4', 'classIX.u8.t5'],
    },
    {
      number: '09',
      titleKey: 'classIX.u9.title',
      icon: <Thermometer size={40} />,
      color: 'from-[#ec4899] to-[#f59e0b]',
      colorHex: '#ec4899',
      bgGlow: 'hover:shadow-[0_0_60px_rgba(236,72,153,0.2)]',
      borderGlow: 'hover:border-brand-pink/30',
      textColor: 'text-brand-pink',
      topicsKeys: ['classIX.u9.t1', 'classIX.u9.t2', 'classIX.u9.t3', 'classIX.u9.t4', 'classIX.u9.t5'],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.ix-reveal').forEach((el, i) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: (i % 3) * 0.1,
        });
      });

      gsap.utils.toArray<HTMLElement>('.unit-card').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          scale: 0.95,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.06,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      {/* Hero Banner */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20">
        <PhysicsBackground />
        <div className="blob w-80 h-80 bg-brand-purple top-10 -left-10" style={BLOB_DELAY_0S} />
        <div className="blob w-64 h-64 bg-brand-cyan bottom-10 -right-10" style={BLOB_DELAY_5S} />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card mb-6 float-anim">
            <span className="w-2 h-2 rounded-full bg-brand-lime pulse-glow" />
            <EditableTranslation tKey="classIX.badge" as="span" className="text-xs font-medium text-brand-cyan tracking-widest uppercase" />
          </div>
          <EditableTranslation tKey="classIX.title" as="h1" className="text-5xl md:text-7xl font-black text-white mb-4" />
          <EditableTranslation tKey="classIX.subtitle" as="p" className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed" html />
        </div>
      </section>

      {/* Units Grid */}
      <section className="relative py-20 md:py-28 grid-bg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="ix-reveal text-center mb-16" {...GSAP_REVEAL_STYLE}>
            <EditableTranslation tKey="classIX.sectionTitle" as="h2" className="text-3xl md:text-5xl font-black text-white mb-4" />
            <EditableTranslation tKey="classIX.sectionDesc" as="p" className="text-gray-400 text-lg max-w-xl mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {classIXUnits.map((unit) => {
              const cardClasses = `unit-card glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden cursor-pointer transition-all duration-500 block ${unit.bgGlow} ${unit.borderGlow}`;
              const cardContent = (
                <>
                  <div className="unit-number" style={{ color: unit.colorHex }}>
                    {unit.number}
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-start gap-5 mb-5">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${unit.color} flex items-center justify-center text-white shrink-0`}>
                        {unit.icon}
                      </div>
                      <div>
                        <span className={`text-xs font-bold uppercase tracking-widest ${unit.textColor} mb-1 block`}><EditableTranslation tKey="classIX.unitLabel" as="span" /> {unit.number}</span>
                        <EditableTranslation tKey={unit.titleKey} as="h3" className="text-xl md:text-2xl font-bold text-white leading-tight" />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {unit.topicsKeys.map((topicKey, idx) => (
                        <EditableTranslation key={idx} tKey={topicKey} as="span" className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 text-xs font-medium border border-white/5" />
                      ))}
                    </div>

                    <div className="mt-6 flex items-center gap-2">
                      <EditableTranslation tKey="classIX.exploreBtn" as="span" className={`${unit.textColor} font-semibold text-sm`} />
                      <svg className={`w-4 h-4 ${unit.textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </>
              );

              return adminState.enabled ? (
                <div key={unit.number} className={cardClasses}>{cardContent}</div>
              ) : (
                <Link key={unit.number} to={`/class-ix/unit/${unit.number}`} className={cardClasses}>{cardContent}</Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coming Soon Banner */}
      <section className="relative py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="ix-reveal glass-card-strong rounded-3xl p-8 md:p-12 text-center relative overflow-hidden" {...GSAP_REVEAL_STYLE}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-purple via-brand-pink to-brand-cyan" />
            <EditableTranslation tKey="classIX.comingSoon" as="h3" className="text-2xl md:text-3xl font-black text-white mb-3" />
            <EditableTranslation tKey="classIX.comingSoonDesc" as="p" className="text-gray-400 text-lg max-w-xl mx-auto" />
          </div>
        </div>
      </section>
    </div>
  );
}