import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PhysicsBackground from '../components/PhysicsBackground';
import {
  Ruler, Move, Gauge, RotateCcw, Magnet,
  Zap, Droplets, Thermometer
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const classIXUnits = [
  {
    number: '01',
    title: 'Physical Quantities and Measurement',
    icon: <Ruler size={40} />,
    color: 'from-[#7c3aed] to-[#a78bfa]',
    bgGlow: 'hover:shadow-[0_0_60px_rgba(124,58,237,0.2)]',
    borderGlow: 'hover:border-brand-purple/30',
    textColor: 'text-brand-purple',
    topics: ['Base & Derived Quantities', 'SI Units', 'Measuring Instruments', 'Significant Figures'],
  },
  {
    number: '02',
    title: 'Kinematics',
    icon: <Move size={40} />,
    color: 'from-[#06b6d4] to-[#22d3ee]',
    bgGlow: 'hover:shadow-[0_0_60px_rgba(6,182,212,0.2)]',
    borderGlow: 'hover:border-brand-cyan/30',
    textColor: 'text-brand-cyan',
    topics: ['Rest & Motion', 'Distance & Displacement', 'Speed & Velocity', 'Acceleration', 'Equations of Motion'],
  },
  {
    number: '03',
    title: 'Dynamics',
    icon: <Gauge size={40} />,
    color: 'from-[#ec4899] to-[#f472b6]',
    bgGlow: 'hover:shadow-[0_0_60px_rgba(236,72,153,0.2)]',
    borderGlow: 'hover:border-brand-pink/30',
    textColor: 'text-brand-pink',
    topics: ['Force & Laws of Motion', 'Newton\'s Laws', 'Momentum', 'Law of Conservation'],
  },
  {
    number: '04',
    title: 'Turning Effect of Forces',
    icon: <RotateCcw size={40} />,
    color: 'from-[#f59e0b] to-[#fbbf24]',
    bgGlow: 'hover:shadow-[0_0_60px_rgba(245,158,11,0.2)]',
    borderGlow: 'hover:border-brand-amber/30',
    textColor: 'text-brand-amber',
    topics: ['Moments', 'Couple', 'Equilibrium', 'Centre of Mass & Gravity'],
  },
  {
    number: '05',
    title: 'Forces and Matter',
    icon: <Droplets size={40} />,
    color: 'from-[#14b8a6] to-[#2dd4bf]',
    bgGlow: 'hover:shadow-[0_0_60px_rgba(20,184,166,0.2)]',
    borderGlow: 'hover:border-brand-teal/30',
    textColor: 'text-brand-teal',
    topics: ['Elasticity', 'Pressure', 'Stress & Strain', 'Density', 'Buoyancy', 'Atmospheric Pressure'],
  },
  {
    number: '06',
    title: 'Gravitation',
    icon: <Magnet size={40} />,
    color: 'from-[#f43f5e] to-[#fb7185]',
    bgGlow: 'hover:shadow-[0_0_60px_rgba(244,63,94,0.2)]',
    borderGlow: 'hover:border-brand-rose/30',
    textColor: 'text-brand-rose',
    topics: ['Newton\'s Law', 'Gravitational Field', 'Mass of Earth', 'Satellites', 'Weightlessness'],
  },
  {
    number: '07',
    title: 'Work and Energy',
    icon: <Zap size={40} />,
    color: 'from-[#7c3aed] to-[#06b6d4]',
    bgGlow: 'hover:shadow-[0_0_60px_rgba(124,58,237,0.2)]',
    borderGlow: 'hover:border-brand-purple/30',
    textColor: 'text-brand-purple',
    topics: ['Work Done', 'Kinetic Energy', 'Potential Energy', 'Power', 'Energy Conservation'],
  },
  {
    number: '07',
    title: 'Properties of Matter',
    icon: <Droplets size={40} />,
    color: 'from-[#7c3aed] to-[#06b6d4]',
    bgGlow: 'hover:shadow-[0_0_60px_rgba(124,58,237,0.2)]',
    borderGlow: 'hover:border-brand-purple/30',
    textColor: 'text-brand-purple',
    topics: ['States of Matter', 'Elasticity', 'Pressure', 'Surface Tension', 'Viscosity'],
  },
  {
    number: '08',
    title: 'Energy Sources and Transfer of Energy',
    icon: <Zap size={40} />,
    color: 'from-[#f59e0b] to-[#f43f5e]',
    bgGlow: 'hover:shadow-[0_0_60px_rgba(245,158,11,0.2)]',
    borderGlow: 'hover:border-brand-amber/30',
    textColor: 'text-brand-amber',
    topics: ['Forms of Energy', 'KE & PE', 'Energy Conversion', 'Power', 'Efficiency'],
  },
  {
    number: '09',
    title: 'Thermal Properties of Matter',
    icon: <Thermometer size={40} />,
    color: 'from-[#ec4899] to-[#f59e0b]',
    bgGlow: 'hover:shadow-[0_0_60px_rgba(236,72,153,0.2)]',
    borderGlow: 'hover:border-brand-pink/30',
    textColor: 'text-brand-pink',
    topics: ['Temperature', 'Thermal Expansion', 'Specific Heat', 'Latent Heat', 'Boyle\'s Law'],
  },
];

export default function ClassIXPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
        <div className="blob w-80 h-80 bg-brand-purple top-10 -left-10" style={{ animationDelay: '0s' }} />
        <div className="blob w-64 h-64 bg-brand-cyan bottom-10 -right-10" style={{ animationDelay: '5s' }} />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card mb-6 float-anim">
            <span className="w-2 h-2 rounded-full bg-brand-lime pulse-glow" />
            <span className="text-xs font-medium text-brand-cyan tracking-widest uppercase">Class IX Physics</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
            Class <span className="gradient-text-cyan">IX</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Explore all <strong className="text-white">10 Physics Units</strong> with detailed concepts, formulas, and practice problems.
          </p>
        </div>
      </section>

      {/* Units Grid */}
      <section className="relative py-20 md:py-28 grid-bg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="ix-reveal text-center mb-16" style={{ opacity: 0, transform: 'translateY(60px)' }}>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Physics <span className="gradient-text">Units</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Click on any unit to explore its content, formulas, and examples.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {classIXUnits.map((unit) => (
              <Link
                key={unit.number}
                to={`/class-ix/unit/${unit.number}`}
                className={`unit-card glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden cursor-pointer transition-all duration-500 block ${unit.bgGlow} ${unit.borderGlow}`}
              >
                <div className="unit-number" style={{ color: unit.textColor.replace('text-', '#') === '#text-brand-purple' ? '#7c3aed' : unit.textColor.replace('text-', '#') === '#text-brand-cyan' ? '#06b6d4' : unit.textColor.replace('text-', '#') === '#text-brand-pink' ? '#ec4899' : unit.textColor.replace('text-', '#') === '#text-brand-amber' ? '#f59e0b' : unit.textColor.replace('text-', '#') === '#text-brand-teal' ? '#14b8a6' : unit.textColor.replace('text-', '#') === '#text-brand-rose' ? '#f43f5e' : '#7c3aed' }}>
                  {unit.number}
                </div>

                <div className="relative z-10">
                  <div className="flex items-start gap-5 mb-5">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${unit.color} flex items-center justify-center text-white shrink-0`}>
                      {unit.icon}
                    </div>
                    <div>
                      <span className={`text-xs font-bold uppercase tracking-widest ${unit.textColor} mb-1 block`}>Unit {unit.number}</span>
                      <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{unit.title}</h3>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {unit.topics.map((topic, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 text-xs font-medium border border-white/5">
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-2">
                    <span className={`${unit.textColor} font-semibold text-sm`}>Explore Unit</span>
                    <svg className={`w-4 h-4 ${unit.textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Banner */}
      <section className="relative py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="ix-reveal glass-card-strong rounded-3xl p-8 md:p-12 text-center relative overflow-hidden" style={{ opacity: 0, transform: 'translateY(60px)' }}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-purple via-brand-pink to-brand-cyan" />
            <h3 className="text-2xl md:text-3xl font-black text-white mb-3">More Content Coming Soon!</h3>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Detailed notes, formulas, solved examples, and practice problems for each unit will be added soon. Stay tuned!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
