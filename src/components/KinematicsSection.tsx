import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Info, MapPin, ArrowRight, Rocket, Gauge, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const colorMap: Record<string, { bg: string; text: string; glow: string }> = {
  'brand-purple': { bg: 'bg-[#7c3aed]/20', text: 'text-[#7c3aed]', glow: 'glow-purple' },
  'brand-cyan': { bg: 'bg-[#06b6d4]/20', text: 'text-[#06b6d4]', glow: 'glow-cyan' },
  'brand-pink': { bg: 'bg-[#ec4899]/20', text: 'text-[#ec4899]', glow: 'glow-pink' },
  'brand-amber': { bg: 'bg-[#f59e0b]/20', text: 'text-[#f59e0b]', glow: 'glow-amber' },
};

const concepts = [
  {
    number: '02',
    colorKey: 'brand-purple',
    icon: <MapPin size={28} />,
    title: 'Distance',
    subtitle: 'Total path length',
    description: 'Distance is the total length of the path traveled by an object. It only tells us how much ground was covered, not the direction.',
    formula: 'Distance = Path Length',
    formulaNote: 'Scalar quantity (no direction)',
    exampleTitle: 'Example',
    exampleText: 'You walk 3 km east, then 4 km north. Your distance = 3 + 4 = 7 km',
  },
  {
    number: '03',
    colorKey: 'brand-cyan',
    icon: <ArrowRight size={28} />,
    title: 'Displacement',
    subtitle: 'Shortest path + direction',
    description: 'Displacement is the shortest distance from start to finish, with direction. It is a straight line from point A to point B.',
    formula: 'Displacement = Final - Initial',
    formulaNote: 'Vector quantity (has direction)',
    exampleTitle: 'Example',
    exampleText: 'You walk 3 km east, then 4 km north. Displacement = 5 km (using Pythagoras)',
  },
  {
    number: '04',
    colorKey: 'brand-pink',
    icon: <Rocket size={28} />,
    title: 'Speed',
    subtitle: 'How fast you go',
    description: 'Speed tells us how fast an object is moving. It is the distance traveled per unit of time.',
    formula: 'Speed = Distance / Time',
    formulaNote: 'Units: m/s or km/h',
    exampleTitle: 'Example',
    exampleText: 'A car travels 120 km in 2 hours. Speed = 120/2 = 60 km/h',
  },
  {
    number: '05',
    colorKey: 'brand-amber',
    icon: <Gauge size={28} />,
    title: 'Velocity',
    subtitle: 'Speed with direction',
    description: 'Velocity is speed with direction. Two cars can have the same speed but different velocities if they go in opposite directions!',
    formula: 'Velocity = Displacement / Time',
    formulaNote: 'Vector quantity (has direction)',
    exampleTitle: 'Example',
    exampleText: 'Car A: 60 km/h North. Car B: 60 km/h South. Same speed, different velocity!',
  },
];

export default function KinematicsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.kin-reveal').forEach((el, i) => {
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

      gsap.utils.toArray<HTMLElement>('.topic-card').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          scale: 0.95,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.08,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="kinematics" className="relative py-24 md:py-32 overflow-hidden" ref={sectionRef}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-full h-full motion-path-svg">
          <circle cx="200" cy="200" r="150" fill="none" stroke="#7c3aed" strokeWidth="1" />
          <circle cx="200" cy="200" r="100" fill="none" stroke="#ec4899" strokeWidth="1" style={{ animationDelay: '0.5s' }} />
          <circle cx="200" cy="200" r="50" fill="none" stroke="#06b6d4" strokeWidth="1" style={{ animationDelay: '1s' }} />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="kin-reveal text-center mb-20" style={{ opacity: 0, transform: 'translateY(60px)' }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-pink pulse-glow" />
            <span className="text-[11px] font-semibold text-gray-400 tracking-widest uppercase">The Main Topic</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            What is <span className="gradient-text">Kinematics?</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Kinematics is the branch of physics that studies the <strong className="text-brand-cyan">motion of objects</strong> without considering the forces that cause the motion.
          </p>
        </div>

        {/* Definition Card */}
        <div className="kin-reveal definition-highlight rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden" style={{ opacity: 0, transform: 'translateY(60px)' }}>
          <div className="topic-number text-brand-cyan">01</div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-cyan/20 flex items-center justify-center">
                <Info size={20} className="text-brand-cyan" />
              </div>
              <h3 className="text-xl font-bold text-white">Simple Definition</h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              <strong className="text-brand-cyan">Kinematics</strong> is the study of how objects move. It tells us about:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="glass-card rounded-2xl p-5 text-center">
                <div className="text-3xl mb-2">📍</div>
                <p className="text-white font-semibold text-sm">Where</p>
                <p className="text-gray-500 text-xs mt-1">the object goes</p>
              </div>
              <div className="glass-card rounded-2xl p-5 text-center">
                <div className="text-3xl mb-2">⏱️</div>
                <p className="text-white font-semibold text-sm">When</p>
                <p className="text-gray-500 text-xs mt-1">it gets there</p>
              </div>
              <div className="glass-card rounded-2xl p-5 text-center">
                <div className="text-3xl mb-2">🚀</div>
                <p className="text-white font-semibold text-sm">How Fast</p>
                <p className="text-gray-500 text-xs mt-1">it moves</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Concepts Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {concepts.map((c) => {
            const colors = colorMap[c.colorKey];
            return (
              <div key={c.number} className={`topic-card glass-card rounded-3xl p-8 relative overflow-hidden ${colors.glow}`}>
                <div className="topic-number" style={{ color: c.colorKey === 'brand-purple' ? '#7c3aed' : c.colorKey === 'brand-cyan' ? '#06b6d4' : c.colorKey === 'brand-pink' ? '#ec4899' : '#f59e0b' }}>{c.number}</div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`type-icon ${colors.bg} ${colors.text}`}>{c.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{c.title}</h3>
                      <p className={`${colors.text} text-xs font-medium`}>{c.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {c.description}
                  </p>
                  <div className="formula-box rounded-2xl p-4 mb-4">
                    <p className={`${colors.text} font-space font-bold text-lg text-center`}>{c.formula}</p>
                    <p className="text-gray-500 text-xs text-center mt-1">{c.formulaNote}</p>
                  </div>
                  <div className="example-card bg-white/5 rounded-xl p-4">
                    <p className="text-brand-amber text-xs font-bold uppercase tracking-wider mb-1">{c.exampleTitle}</p>
                    <p className="text-gray-300 text-sm">{c.exampleText}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Acceleration */}
        <div className="kin-reveal glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden glow-purple" style={{ opacity: 0, transform: 'translateY(60px)' }}>
          <div className="topic-number text-brand-purple">06</div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="type-icon bg-brand-purple/20 text-brand-purple">
                <Zap size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Acceleration</h3>
                <p className="text-brand-purple text-sm font-medium">Change in velocity over time</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-3xl">
              Acceleration tells us <strong className="text-white">how quickly</strong> velocity changes. When a car speeds up, slows down, or turns, it is accelerating!
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="formula-box rounded-2xl p-6">
                <p className="text-brand-purple font-space font-bold text-xl text-center mb-2">a = (v - u) / t</p>
                <div className="text-gray-500 text-xs text-center space-y-1">
                  <p>a = acceleration, v = final velocity</p>
                  <p>u = initial velocity, t = time</p>
                </div>
              </div>
              <div className="example-card bg-white/5 rounded-xl p-6">
                <p className="text-brand-amber text-xs font-bold uppercase tracking-wider mb-2">Example</p>
                <p className="text-gray-300 text-sm leading-relaxed">A car starts from rest (0 m/s) and reaches <strong>20 m/s</strong> in <strong>5 seconds</strong>.</p>
                <p className="text-brand-cyan font-bold mt-2">a = (20 - 0) / 5 = 4 m/s²</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
