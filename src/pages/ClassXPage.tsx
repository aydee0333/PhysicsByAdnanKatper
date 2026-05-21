import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../utils/gsap';
import { GSAP_REVEAL_STYLE, BLOB_DELAY_0S, BLOB_DELAY_5S } from '../utils/styles';
import PhysicsBackground from '../components/PhysicsBackground';
import {
  Waves, Volume2, Eye, Zap, Battery,
  Magnet, Cpu, Radio, Atom
} from 'lucide-react';
import EditableTranslation from '../i18n/tms/components/EditableTranslation';

const unitIcons = [Waves, Volume2, Eye, Zap, Battery, Magnet, Cpu, Radio, Atom];
const unitColors = [
  'from-[#7c3aed] to-[#a78bfa]',
  'from-[#06b6d4] to-[#22d3ee]',
  'from-[#ec4899] to-[#f472b6]',
  'from-[#f59e0b] to-[#fbbf24]',
  'from-[#14b8a6] to-[#2dd4bf]',
  'from-[#f43f5e] to-[#fb7185]',
  'from-[#7c3aed] to-[#06b6d4]',
  'from-[#f59e0b] to-[#f43f5e]',
  'from-[#ec4899] to-[#f59e0b]',
];
const unitBgs = [
  'hover:shadow-[0_0_60px_rgba(124,58,237,0.2)]',
  'hover:shadow-[0_0_60px_rgba(6,182,212,0.2)]',
  'hover:shadow-[0_0_60px_rgba(236,72,153,0.2)]',
  'hover:shadow-[0_0_60px_rgba(245,158,11,0.2)]',
  'hover:shadow-[0_0_60px_rgba(20,184,166,0.2)]',
  'hover:shadow-[0_0_60px_rgba(244,63,94,0.2)]',
  'hover:shadow-[0_0_60px_rgba(124,58,237,0.2)]',
  'hover:shadow-[0_0_60px_rgba(245,158,11,0.2)]',
  'hover:shadow-[0_0_60px_rgba(236,72,153,0.2)]',
];
const unitBorders = [
  'hover:border-brand-purple/30',
  'hover:border-brand-cyan/30',
  'hover:border-brand-pink/30',
  'hover:border-brand-amber/30',
  'hover:border-brand-teal/30',
  'hover:border-brand-rose/30',
  'hover:border-brand-purple/30',
  'hover:border-brand-amber/30',
  'hover:border-brand-pink/30',
];
const unitTextColors = [
  'text-brand-purple',
  'text-brand-cyan',
  'text-brand-pink',
  'text-brand-amber',
  'text-brand-teal',
  'text-brand-rose',
  'text-brand-purple',
  'text-brand-amber',
  'text-brand-pink',
];

const colorHexMap: Record<string, string> = {
  'text-brand-purple': '#7c3aed',
  'text-brand-cyan': '#06b6d4',
  'text-brand-pink': '#ec4899',
  'text-brand-amber': '#f59e0b',
  'text-brand-teal': '#14b8a6',
  'text-brand-rose': '#f43f5e',
};

export default function ClassXPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.x-reveal').forEach((el, i) => {
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
        <div className="blob w-80 h-80 bg-brand-pink top-10 -left-10" style={BLOB_DELAY_0S} />
        <div className="blob w-64 h-64 bg-brand-purple bottom-10 -right-10" style={BLOB_DELAY_5S} />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card mb-6 float-anim">
            <span className="w-2 h-2 rounded-full bg-brand-lime pulse-glow" />
            <EditableTranslation tKey="classX.badge" as="span" className="text-xs font-medium text-brand-pink tracking-widest uppercase" />
          </div>
          <EditableTranslation tKey="classX.title" as="h1" className="text-5xl md:text-7xl font-black text-white mb-4" />
          <EditableTranslation tKey="classX.subtitle" as="p" className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed" html />
        </div>
      </section>

      {/* Units Grid */}
      <section className="relative py-20 md:py-28 grid-bg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="x-reveal text-center mb-16" {...GSAP_REVEAL_STYLE}>
            <EditableTranslation tKey="classX.sectionTitle" as="h2" className="text-3xl md:text-5xl font-black text-white mb-4" />
            <EditableTranslation tKey="classX.sectionDesc" as="p" className="text-gray-400 text-lg max-w-xl mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {Array.from({ length: 9 }, (_, idx) => {
              const num = String(idx + 1).padStart(2, '0');
              const Icon = unitIcons[idx];

              return (
                <Link
                  key={num}
                  to={`/class-x/unit/${num}`}
                  className={`unit-card glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden cursor-pointer transition-all duration-500 block ${unitBgs[idx]} ${unitBorders[idx]}`}
                >
                  <div className="unit-number" style={{ color: colorHexMap[unitTextColors[idx]] || '#7c3aed' }}>
                    {num}
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-start gap-5 mb-5">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${unitColors[idx]} flex items-center justify-center text-white shrink-0`}>
                        <Icon size={40} />
                      </div>
                      <div>
                        <span className={`text-xs font-bold uppercase tracking-widest ${unitTextColors[idx]} mb-1 block`}>
                          <EditableTranslation tKey="classX.unitLabel" as="span" /> {num}
                        </span>
                        <EditableTranslation tKey={`classX.u${idx + 1}.title`} as="h3" className="text-xl md:text-2xl font-bold text-white leading-tight" />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {['t1', 't2', 't3', 't4'].map((tk, ti) => (
                        <EditableTranslation key={ti} tKey={`classX.u${idx + 1}.${tk}`} as="span" className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 text-xs font-medium border border-white/5" />
                      ))}
                    </div>

                    <div className="mt-6 flex items-center gap-2">
                      <EditableTranslation tKey="classX.exploreBtn" as="span" className={`${unitTextColors[idx]} font-semibold text-sm`} />
                      <svg className={`w-4 h-4 ${unitTextColors[idx]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
