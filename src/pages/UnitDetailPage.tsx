import { useParams, Link, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PhysicsBackground from '../components/PhysicsBackground';
import { ArrowLeft, BookOpen } from 'lucide-react';
import Unit1Content from '../components/units/Unit1Content';
import Unit2Content from '../components/units/Unit2Content';
import Unit3Content from '../components/units/Unit3Content';
import Unit4Content from '../components/units/Unit4Content';
import Unit5Content from '../components/units/Unit5Content';
import Unit6Content from '../components/units/Unit6Content';
import Unit7Content from '../components/units/Unit7Content';
import Unit8Content from '../components/units/Unit8Content';
import Unit9Content from '../components/units/Unit9Content';

gsap.registerPlugin(ScrollTrigger);

const unitInfo: Record<string, { title: string; subtitle: string }> = {
  '01': { title: 'Physical Quantities and Measurement', subtitle: 'What is Physics, Quantities, Units, and Measurement' },
  '02': { title: 'Kinematics', subtitle: 'Motion, Speed, Velocity, and Acceleration' },
  '03': { title: 'Dynamics', subtitle: 'Forces and Laws of Motion' },
  '04': { title: 'Turning Effect of Forces', subtitle: 'Moments, Couple, and Equilibrium' },
  '05': { title: 'Forces and Matter', subtitle: 'Elasticity, Pressure, Density, and Buoyancy' },
  '06': { title: 'Gravitation', subtitle: 'Gravity, Satellites, and Weightlessness' },
  '07': { title: 'Properties of Matter', subtitle: 'States of Matter, Elasticity, Pressure, and Viscosity' },
  '08': { title: 'Energy Sources and Transfer of Energy', subtitle: 'Forms of Energy, Conversion, Power, and Efficiency' },
  '09': { title: 'Thermal Properties of Matter', subtitle: 'Temperature, Expansion, Specific Heat, and Boyle\'s Law' },
};

export default function UnitDetailPage() {
  const { unitNumber } = useParams<{ unitNumber: string }>();
  const location = useLocation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const info = unitInfo[unitNumber || '01'] || { title: 'Unknown Unit', subtitle: '' };
  const isClassX = location.pathname.includes('/class-x/');
  const backLink = isClassX ? '/class-x' : '/class-ix';
  const backLabel = isClassX ? 'Back to Class X' : 'Back to Class IX';

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.unit-detail-reveal').forEach((el, i) => {
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
    }, sectionRef);
    return () => ctx.revert();
  }, [unitNumber]);

  return (
    <div ref={sectionRef}>
      {/* Hero Banner */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-24 pb-12">
        <PhysicsBackground />
        <div className="blob w-72 h-72 bg-brand-purple top-0 -left-10" style={{ animationDelay: '0s' }} />
        <div className="blob w-56 h-56 bg-brand-cyan bottom-0 -right-10" style={{ animationDelay: '5s' }} />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <Link to={backLink} className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-cyan transition-colors mb-6 text-sm">
            <ArrowLeft size={16} />
            <span>{backLabel}</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card mb-6">
            <BookOpen size={14} className="text-brand-cyan" />
            <span className="text-xs font-medium text-brand-cyan tracking-widest uppercase">{isClassX ? 'Class X' : 'Class IX'} Physics — Unit {unitNumber}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            {info.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            {info.subtitle}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6">
          {unitNumber === '01' && <Unit1Content />}
          {unitNumber === '02' && <Unit2Content />}
          {unitNumber === '03' && <Unit3Content />}
          {unitNumber === '04' && <Unit4Content />}
          {unitNumber === '05' && <Unit5Content />}
          {unitNumber === '06' && <Unit6Content />}
          {unitNumber === '07' && <Unit7Content />}
          {unitNumber === '08' && <Unit8Content />}
          {unitNumber === '09' && <Unit9Content />}
          {unitNumber !== '01' && unitNumber !== '02' && unitNumber !== '03' && unitNumber !== '04' && unitNumber !== '05' && unitNumber !== '06' && unitNumber !== '07' && unitNumber !== '08' && unitNumber !== '09' && (
            <div className="unit-detail-reveal glass-card-strong rounded-3xl p-12 text-center" style={{ opacity: 0, transform: 'translateY(60px)' }}>
              <h2 className="text-3xl font-black text-white mb-4">Content Coming Soon</h2>
              <p className="text-gray-400 text-lg">This unit content is being prepared. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
