import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.about-reveal').forEach((el, i) => {
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
    <section id="about" className="relative py-24 md:py-32 grid-bg" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo side */}
          <div className="about-reveal relative flex justify-center lg:justify-start" style={{ opacity: 0, transform: 'translateY(60px)' }}>
            <div className="teacher-photo-ring">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden bg-gradient-to-br from-brand-navy to-brand-dark border-4 border-white/10 relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                  alt="Adnan Katper"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent" />
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 md:right-8 glass-card-strong px-4 py-2 rounded-xl float-anim">
              <span className="text-brand-cyan font-bold text-sm">Physics</span>
            </div>
            <div className="absolute -bottom-2 -left-4 md:left-0 glass-card-strong px-4 py-2 rounded-xl float-anim-delay">
              <span className="text-brand-pink font-bold text-sm">Class IX</span>
            </div>
            <div className="absolute top-1/2 -right-8 md:-right-4 glass-card-strong px-4 py-2 rounded-xl float-anim-delay2">
              <span className="text-brand-amber font-bold text-sm">10+ Years</span>
            </div>
          </div>

          {/* Info side */}
          <div className="about-reveal" style={{ opacity: 0, transform: 'translateY(60px)' }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-lime" />
              <span className="text-[11px] font-semibold text-gray-400 tracking-widest uppercase">About Your Teacher</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Adnan <span className="gradient-text">Katper</span>
            </h2>

            <p className="text-brand-cyan font-medium text-lg mb-6">Physics Teacher & Kinematics Enthusiast</p>

            <p className="text-gray-400 leading-relaxed mb-6 text-[15px]">
              Hello, dear students! I am your physics teacher at <strong className="text-brand-amber">Govt. Boys Higher Secondary School Naudero</strong>. I have been teaching physics for over 10 years, and I absolutely love making complex topics simple and fun!
            </p>

            <p className="text-gray-400 leading-relaxed mb-8 text-[15px]">
              Kinematics is one of my favorite topics because it explains the motion we see every day. From a car driving on the road to a ball flying through the air, kinematics helps us understand it all. Let&apos;s explore this amazing world together!
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div className="glass-card rounded-2xl p-4 text-center">
                <div className="text-2xl font-black gradient-text-cyan">10+</div>
                <div className="text-[10px] text-gray-500 mt-1">Years Teaching</div>
              </div>
              <div className="glass-card rounded-2xl p-4 text-center">
                <div className="text-2xl font-black gradient-text">500+</div>
                <div className="text-[10px] text-gray-500 mt-1">Students Taught</div>
              </div>
              <div className="glass-card rounded-2xl p-4 text-center">
                <div className="text-2xl font-black gradient-text-amber">100%</div>
                <div className="text-[10px] text-gray-500 mt-1">Passion</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
