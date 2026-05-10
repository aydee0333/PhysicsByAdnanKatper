import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const formulas = [
  { name: 'Speed', formula: 'v = d / t' },
  { name: 'Velocity', formula: 'v = Δx / t' },
  { name: 'Acceleration', formula: 'a = (v - u) / t' },
  { name: 'Final Velocity', formula: 'v = u + at' },
];

export default function QuickReferenceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.ref-reveal').forEach((el, i) => {
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
          delay: i * 0.1,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-24 md:py-32 grid-bg" ref={sectionRef}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="ref-reveal text-center mb-16" style={{ opacity: 0, transform: 'translateY(60px)' }}>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Quick <span className="gradient-text">Reference</span>
          </h2>
          <p className="text-gray-400">All the important formulas in one place</p>
        </div>

        <div className="ref-reveal glass-card-strong rounded-3xl p-8 md:p-12" style={{ opacity: 0, transform: 'translateY(60px)' }}>
          <div className="grid md:grid-cols-2 gap-6">
            {formulas.map((f) => (
              <div key={f.name} className="formula-box rounded-2xl p-6 text-center">
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">{f.name}</p>
                <p className="text-white font-space font-bold text-xl">{f.formula}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              <span className="text-brand-cyan font-semibold">v</span> = velocity/speed &nbsp;|&nbsp;
              <span className="text-brand-pink font-semibold">d</span> = distance &nbsp;|&nbsp;
              <span className="text-brand-purple font-semibold">t</span> = time &nbsp;|&nbsp;
              <span className="text-brand-amber font-semibold">a</span> = acceleration &nbsp;|&nbsp;
              <span className="text-brand-lime font-semibold">u</span> = initial velocity
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
