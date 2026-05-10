import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PhysicsBackground from '../components/PhysicsBackground';
import {
  Waves, Volume2, Eye, Zap, Battery,
  Magnet, Cpu, Radio, Atom
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const classXUnits = [
  {
    number: '01',
    title: 'Simple Harmonic Motion and Waves',
    icon: <Waves size={40} />,
    color: 'from-[#7c3aed] to-[#a78bfa]',
    bgGlow: 'hover:shadow-[0_0_60px_rgba(124,58,237,0.2)]',
    borderGlow: 'hover:border-brand-purple/30',
    textColor: 'text-brand-purple',
    topics: ['SHM', 'Pendulum', 'Wave Motion', 'Types of Waves'],
  },
  {
    number: '02',
    title: 'Sound',
    icon: <Volume2 size={40} />,
    color: 'from-[#06b6d4] to-[#22d3ee]',
    bgGlow: 'hover:shadow-[0_0_60px_rgba(6,182,212,0.2)]',
    borderGlow: 'hover:border-brand-cyan/30',
    textColor: 'text-brand-cyan',
    topics: ['Characteristics', 'Reflection', 'Resonance', 'Ultrasound'],
  },
  {
    number: '03',
    title: 'Geometrical Optics',
    icon: <Eye size={40} />,
    color: 'from-[#ec4899] to-[#f472b6]',
    bgGlow: 'hover:shadow-[0_0_60px_rgba(236,72,153,0.2)]',
    borderGlow: 'hover:border-brand-pink/30',
    textColor: 'text-brand-pink',
    topics: ['Reflection', 'Refraction', 'Lenses', 'Optical Instruments'],
  },
  {
    number: '04',
    title: 'Electrostatics',
    icon: <Zap size={40} />,
    color: 'from-[#f59e0b] to-[#fbbf24]',
    bgGlow: 'hover:shadow-[0_0_60px_rgba(245,158,11,0.2)]',
    borderGlow: 'hover:border-brand-amber/30',
    textColor: 'text-brand-amber',
    topics: ['Electric Charge', 'Coulomb\'s Law', 'Electric Field', 'Capacitors'],
  },
  {
    number: '05',
    title: 'Current Electricity',
    icon: <Battery size={40} />,
    color: 'from-[#14b8a6] to-[#2dd4bf]',
    bgGlow: 'hover:shadow-[0_0_60px_rgba(20,184,166,0.2)]',
    borderGlow: 'hover:border-brand-teal/30',
    textColor: 'text-brand-teal',
    topics: ['Ohm\'s Law', 'Resistance', 'Circuits', 'Electric Power'],
  },
  {
    number: '06',
    title: 'Electromagnetism',
    icon: <Magnet size={40} />,
    color: 'from-[#f43f5e] to-[#fb7185]',
    bgGlow: 'hover:shadow-[0_0_60px_rgba(244,63,94,0.2)]',
    borderGlow: 'hover:border-brand-rose/30',
    textColor: 'text-brand-rose',
    topics: ['Magnetic Field', 'Electromagnetic Induction', 'Transformer', 'AC & DC'],
  },
  {
    number: '07',
    title: 'Basic Electronics',
    icon: <Cpu size={40} />,
    color: 'from-[#7c3aed] to-[#06b6d4]',
    bgGlow: 'hover:shadow-[0_0_60px_rgba(124,58,237,0.2)]',
    borderGlow: 'hover:border-brand-purple/30',
    textColor: 'text-brand-purple',
    topics: ['Semiconductors', 'Diode', 'Transistor', 'Logic Gates'],
  },
  {
    number: '08',
    title: 'Information and Communication Technology',
    icon: <Radio size={40} />,
    color: 'from-[#f59e0b] to-[#f43f5e]',
    bgGlow: 'hover:shadow-[0_0_60px_rgba(245,158,11,0.2)]',
    borderGlow: 'hover:border-brand-amber/30',
    textColor: 'text-brand-amber',
    topics: ['ICT Basics', 'Communication Systems', 'Internet', 'Digital World'],
  },
  {
    number: '09',
    title: 'Atomic and Nuclear Physics',
    icon: <Atom size={40} />,
    color: 'from-[#ec4899] to-[#f59e0b]',
    bgGlow: 'hover:shadow-[0_0_60px_rgba(236,72,153,0.2)]',
    borderGlow: 'hover:border-brand-pink/30',
    textColor: 'text-brand-pink',
    topics: ['Atomic Structure', 'Radioactivity', 'Nuclear Reactions', 'Fission & Fusion'],
  },
];

const colorMap: Record<string, string> = {
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
        <div className="blob w-80 h-80 bg-brand-pink top-10 -left-10" style={{ animationDelay: '0s' }} />
        <div className="blob w-64 h-64 bg-brand-purple bottom-10 -right-10" style={{ animationDelay: '5s' }} />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card mb-6 float-anim">
            <span className="w-2 h-2 rounded-full bg-brand-lime pulse-glow" />
            <span className="text-xs font-medium text-brand-pink tracking-widest uppercase">Class X Physics</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
            Class <span className="gradient-text">X</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Explore all <strong className="text-white">9 Physics Units</strong> with detailed concepts, formulas, and practice problems.
          </p>
        </div>
      </section>

      {/* Units Grid */}
      <section className="relative py-20 md:py-28 grid-bg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="x-reveal text-center mb-16" style={{ opacity: 0, transform: 'translateY(60px)' }}>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Physics <span className="gradient-text-amber">Units</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Click on any unit to explore its content, formulas, and examples.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {classXUnits.map((unit) => (
              <Link
                key={unit.number}
                to={`/class-x/unit/${unit.number}`}
                className={`unit-card glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden cursor-pointer transition-all duration-500 block ${unit.bgGlow} ${unit.borderGlow}`}
              >
                <div className="unit-number" style={{ color: colorMap[unit.textColor] || '#7c3aed' }}>
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
          <div className="x-reveal glass-card-strong rounded-3xl p-8 md:p-12 text-center relative overflow-hidden" style={{ opacity: 0, transform: 'translateY(60px)' }}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-pink via-brand-amber to-brand-purple" />
            <h3 className="text-2xl md:text-3xl font-black text-white mb-3">Content Under Development</h3>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Detailed notes, formulas, solved examples, and practice problems for each unit will be added soon. Stay tuned!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
