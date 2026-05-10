import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const examples = [
  {
    num: '1',
    gradient: 'from-[#06b6d4] to-[#7c3aed]',
    decoColor: 'bg-[#06b6d4]/5',
    title: 'The Running Boy',
    tag: 'Distance & Displacement',
    tagColor: 'text-[#06b6d4]',
    problem: 'A boy runs 400 meters east along a straight track, then turns around and runs 100 meters west. What is his total distance and displacement?',
    solutions: [
      { label: '📍 Distance (Total Path)', color: 'text-[#06b6d4]', text: '400 m + 100 m = 500 m' },
      { label: '➡️ Displacement (Shortest Path)', color: 'text-[#ec4899]', text: '400 m - 100 m = 300 m East' },
    ],
    insight: 'Distance is always equal or larger than displacement. They are only equal when moving in a straight line without turning back!',
  },
  {
    num: '2',
    gradient: 'from-[#ec4899] to-[#f43f5e]',
    decoColor: 'bg-[#ec4899]/5',
    title: 'The Cycling Trip',
    tag: 'Speed & Velocity',
    tagColor: 'text-[#ec4899]',
    problem: 'A cyclist rides 15 km north in 1 hour, then 15 km south in 1 hour. What is her average speed and average velocity?',
    solutions: [
      { label: '🚀 Average Speed', color: 'text-[#ec4899]', text: '(15 + 15) / 2 = 15 km/h', sub: 'Total distance / Total time' },
      { label: '🚗 Average Velocity', color: 'text-[#06b6d4]', text: '(15 - 15) / 2 = 0 km/h', sub: 'Total displacement / Total time' },
    ],
    insight: 'She traveled a lot but ended up where she started! That\'s why velocity is zero, even though speed is 15 km/h.',
  },
  {
    num: '3',
    gradient: 'from-[#7c3aed] to-[#06b6d4]',
    decoColor: 'bg-[#7c3aed]/5',
    title: 'The Racing Car',
    tag: 'Acceleration',
    tagColor: 'text-[#7c3aed]',
    problem: 'A race car starts from rest and reaches a speed of 30 m/s in 6 seconds. What is its acceleration?',
    formula: 'a = (v - u) / t',
    steps: [
      'Initial velocity (u) = 0 m/s (starts from rest)',
      'Final velocity (v) = 30 m/s',
      'Time (t) = 6 seconds',
    ],
    result: 'a = (30 - 0) / 6 = 5 m/s²',
    insight: 'The car\'s speed increases by 5 meters per second, every second. That\'s what 5 m/s² means!',
  },
  {
    num: '4',
    gradient: 'from-[#f59e0b] to-[#f43f5e]',
    decoColor: 'bg-[#f59e0b]/5',
    title: 'The Falling Ball',
    tag: 'Free Fall & Gravity',
    tagColor: 'text-[#f59e0b]',
    problem: 'A ball is dropped from a height. It hits the ground after 3 seconds. How fast is it moving just before hitting the ground? (Use g = 10 m/s²)',
    formula: 'v = u + gt',
    steps: [
      'Initial velocity (u) = 0 m/s (dropped, not thrown)',
      'Gravity (g) = 10 m/s²',
      'Time (t) = 3 seconds',
    ],
    result: 'v = 0 + (10 × 3) = 30 m/s',
    insight: 'Gravity pulls everything down at 10 m/s² (on Earth). Every second, the ball falls 10 m/s faster!',
  },
];

export default function ExamplesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.example-reveal').forEach((el, i) => {
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
  }, []);

  return (
    <section id="examples" className="relative py-24 md:py-32 overflow-hidden" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="example-reveal text-center mb-20" style={{ opacity: 0, transform: 'translateY(60px)' }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-rose pulse-glow" />
            <span className="text-[11px] font-semibold text-gray-400 tracking-widest uppercase">Practice Problems</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Examples & <span className="gradient-text-cyan">Solutions</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">Let&apos;s solve some real problems together. Each example has a clear step-by-step solution!</p>
        </div>

        {examples.map((ex) => (
          <div key={ex.num} className="example-reveal glass-card rounded-3xl p-8 md:p-10 mb-8 relative overflow-hidden" style={{ opacity: 0, transform: 'translateY(60px)' }}>
            <div className={`absolute top-0 right-0 w-32 h-32 ${ex.decoColor} rounded-full -translate-y-1/2 translate-x-1/2`} />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${ex.gradient} flex items-center justify-center text-white font-black text-lg`}>
                  {ex.num}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{ex.title}</h3>
                  <p className={`${ex.tagColor} text-xs font-medium`}>{ex.tag}</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 mb-6">
                <p className="text-gray-300 text-sm leading-relaxed">
                  <strong className="text-brand-amber">Problem:</strong> {ex.problem}
                </p>
              </div>

              {ex.solutions ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {ex.solutions.map((sol, idx) => (
                    <div key={idx} className="formula-box rounded-2xl p-5">
                      <p className={`${sol.color} font-bold text-sm mb-2`}>{sol.label}</p>
                      {'sub' in sol && sol.sub && <p className="text-gray-400 text-xs mb-2">{sol.sub}</p>}
                      <p className="text-white font-space text-lg">{sol.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="formula-box rounded-2xl p-6 mb-4">
                  <p className="text-brand-purple font-bold text-sm mb-3">⚡ Using: {ex.formula}</p>
                  <div className="space-y-2 font-space text-sm">
                    {ex.steps?.map((step, idx) => (
                      <p key={idx} className="text-gray-400">{step}</p>
                    ))}
                    <div className="border-t border-white/10 pt-2 mt-2">
                      <p className="text-white text-lg">{ex.result}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 p-4 rounded-xl bg-brand-amber/10 border border-brand-amber/20">
                <p className="text-brand-amber text-sm font-medium">💡 Key Insight: {ex.insight}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
