import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, RotateCcw, RefreshCw, Waves, Rocket, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const motionTypes = [
  {
    num: 'I',
    icon: <ArrowRight size={28} />,
    bgClass: 'bg-[#06b6d4]/20',
    textClass: 'text-[#06b6d4]',
    tipBg: 'bg-[#06b6d4]/10',
    title: 'Linear Motion',
    description: 'Object moves in a straight line. Think of a car driving on a straight road or a ball rolling on a flat surface.',
    example: 'Train on straight tracks',
  },
  {
    num: 'II',
    icon: <RotateCcw size={28} />,
    bgClass: 'bg-[#ec4899]/20',
    textClass: 'text-[#ec4899]',
    tipBg: 'bg-[#ec4899]/10',
    title: 'Circular Motion',
    description: 'Object moves in a circular path. The object keeps going around a central point.',
    example: 'Fan blades spinning',
  },
  {
    num: 'III',
    icon: <RefreshCw size={28} />,
    bgClass: 'bg-[#7c3aed]/20',
    textClass: 'text-[#7c3aed]',
    tipBg: 'bg-[#7c3aed]/10',
    title: 'Rotational Motion',
    description: 'Object spins around its own axis. The object turns on itself without moving from its place.',
    example: 'Earth spinning on its axis',
  },
  {
    num: 'IV',
    icon: <Waves size={28} />,
    bgClass: 'bg-[#f59e0b]/20',
    textClass: 'text-[#f59e0b]',
    tipBg: 'bg-[#f59e0b]/10',
    title: 'Oscillatory Motion',
    description: 'Object moves back and forth repeatedly around a fixed point. It swings like a pendulum.',
    example: 'Swing on a playground',
  },
  {
    num: 'V',
    icon: <Rocket size={28} />,
    bgClass: 'bg-[#f43f5e]/20',
    textClass: 'text-[#f43f5e]',
    tipBg: 'bg-[#f43f5e]/10',
    title: 'Projectile Motion',
    description: 'Object is thrown or launched and moves along a curved path under gravity.',
    example: 'A ball thrown in the air',
  },
  {
    num: 'VI',
    icon: <Clock size={28} />,
    bgClass: 'bg-[#84cc16]/20',
    textClass: 'text-[#84cc16]',
    tipBg: 'bg-[#84cc16]/10',
    title: 'Periodic Motion',
    description: 'Motion that repeats itself after a fixed time interval. It happens over and over again.',
    example: 'Pendulum clock ticking',
  },
];

export default function MotionTypesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.motion-reveal').forEach((el, i) => {
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

      gsap.utils.toArray<HTMLElement>('.motion-card').forEach((card, i) => {
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
    <section id="motion-types" className="relative py-24 md:py-32 grid-bg" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Motion Definition */}
        <div className="motion-reveal text-center mb-20" style={{ opacity: 0, transform: 'translateY(60px)' }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-lime pulse-glow" />
            <span className="text-[11px] font-semibold text-gray-400 tracking-widest uppercase">Types of Motion</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            What is <span className="gradient-text-amber">Motion?</span>
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="definition-highlight rounded-3xl p-8 md:p-10 text-left">
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                <strong className="text-brand-amber text-xl">Motion</strong> is the change in position of an object with respect to time. When something moves from one place to another, we say it is in motion.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                An object is in motion if its <strong className="text-white">distance from a reference point</strong> changes over time. If the distance stays the same, the object is at <strong className="text-brand-cyan">rest</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Types Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {motionTypes.map((mt) => (
            <div key={mt.num} className="motion-card topic-card glass-card rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 text-6xl opacity-5 font-black font-space">{mt.num}</div>
              <div className={`type-icon ${mt.bgClass} ${mt.textClass} mb-5`}>{mt.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{mt.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {mt.description}
              </p>
              <div className={`${mt.tipBg} rounded-xl p-3`}>
                <p className={`${mt.textClass} text-xs font-medium`}>💡 Example: {mt.example}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
