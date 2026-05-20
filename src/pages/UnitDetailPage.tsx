import { useParams, useLocation, Link } from 'react-router-dom';
import React, { Suspense, useEffect, useRef } from 'react';
import { gsap } from '../utils/gsap';
import { GSAP_REVEAL_STYLE, BLOB_DELAY_0S, BLOB_DELAY_5S } from '../utils/styles';
import PhysicsBackground from '../components/PhysicsBackground';
import { BookOpen, AlertTriangle } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import { useT } from '../i18n/LanguageContext';
import UnitSidebar from '../components/UnitSidebar';
import { Breadcrumb, ProgressBar } from '../components/ui';

const lazyUnitComponents: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  '01': React.lazy(() => import('../components/units/Unit1Content')),
  '02': React.lazy(() => import('../components/units/Unit2Content')),
  '03': React.lazy(() => import('../components/units/Unit3Content')),
  '04': React.lazy(() => import('../components/units/Unit4Content')),
  '05': React.lazy(() => import('../components/units/Unit5Content')),
  '06': React.lazy(() => import('../components/units/Unit6Content')),
  '07': React.lazy(() => import('../components/units/Unit7Content')),
  '08': React.lazy(() => import('../components/units/Unit8Content')),
  '09': React.lazy(() => import('../components/units/Unit9Content')),
};

// Content system imports
import { useChapter } from '../content/useChapter';
import { hasChapter } from '../content/index';
import { formatChapterId } from '../content/helpers';
import ChapterRenderer from '../components/content/ChapterRenderer';

/** Sidebar section definitions per unit */
const unitSections: Record<string, { id: string; label: string }[]> = {
  '01': [
    { id: 'what-is-physics', label: 'What is Physics' },
    { id: 'physical-quantities', label: 'Physical Quantities' },
    { id: 'si-units', label: 'SI Units' },
    { id: 'measuring-tools', label: 'Measuring Tools' },
    { id: 'significant-figures', label: 'Significant Figures' },
    { id: 'matching-game', label: 'Matching Game' },
    { id: 'quiz', label: 'Quiz' },
  ],
  '02': [
    { id: 'rest-motion', label: 'Rest and Motion' },
    { id: 'types-of-motion', label: 'Types of Motion' },
    { id: 'distance-displacement', label: 'Distance & Displacement' },
    { id: 'speed-velocity', label: 'Speed & Velocity' },
    { id: 'acceleration', label: 'Acceleration' },
    { id: 'graphs', label: 'Motion Graphs' },
    { id: 'equations', label: 'Equations of Motion' },
    { id: 'quiz', label: 'Quiz' },
  ],
  '03': [
    { id: 'force', label: 'Force' },
    { id: 'newton-laws', label: "Newton's Laws" },
    { id: 'friction', label: 'Friction' },
    { id: 'inertia', label: 'Inertia' },
    { id: 'mass-weight', label: 'Mass & Weight' },
    { id: 'momentum', label: 'Momentum' },
    { id: 'quiz', label: 'Quiz' },
  ],
  '04': [
    { id: 'torque', label: 'Torque' },
    { id: 'moment-arm', label: 'Moment Arm' },
    { id: 'principle-of-moments', label: 'Principle of Moments' },
    { id: 'equilibrium', label: 'Equilibrium' },
    { id: 'center-of-mass', label: 'Centre of Mass' },
    { id: 'stability', label: 'Stability' },
    { id: 'quiz', label: 'Quiz' },
  ],
  '05': [
    { id: 'hooks-law', label: "Hooke's Law" },
    { id: 'spring-constant', label: 'Spring Constant' },
    { id: 'pressure', label: 'Pressure' },
    { id: 'stress-strain', label: 'Stress and Strain' },
    { id: 'density', label: 'Density' },
    { id: 'buoyancy', label: 'Buoyancy' },
    { id: 'atmospheric-pressure', label: 'Atmospheric Pressure' },
    { id: 'hydraulic-press', label: 'Hydraulic Press' },
    { id: 'quiz', label: 'Quiz' },
  ],
  '06': [
    { id: 'gravitational-force', label: 'Gravitational Force' },
    { id: 'newtons-law-gravitation', label: "Newton's Law of Gravitation" },
    { id: 'gravitational-constant', label: 'Gravitational Constant' },
    { id: 'mass-weight', label: 'Mass and Weight' },
    { id: 'orbital-motion', label: 'Orbital Motion' },
    { id: 'satellites', label: 'Satellites' },
    { id: 'weightlessness', label: 'Weightlessness' },
    { id: 'quiz', label: 'Quiz' },
  ],
  '07': [
    { id: 'states-of-matter', label: 'States of Matter' },
    { id: 'density', label: 'Density' },
    { id: 'elasticity', label: 'Elasticity' },
    { id: 'pressure-in-liquids', label: 'Pressure in Liquids' },
    { id: 'pascals-law', label: "Pascal's Law" },
    { id: 'surface-tension', label: 'Surface Tension' },
    { id: 'viscosity', label: 'Viscosity' },
    { id: 'bernoulli', label: "Bernoulli's Principle" },
    { id: 'quiz', label: 'Quiz' },
  ],
  '08': [
    { id: 'work', label: 'Work' },
    { id: 'energy-types', label: 'Types of Energy' },
    { id: 'kinetic-energy', label: 'Kinetic Energy' },
    { id: 'potential-energy', label: 'Potential Energy' },
    { id: 'energy-conversion', label: 'Energy Conversion' },
    { id: 'conservation', label: 'Conservation of Energy' },
    { id: 'power', label: 'Power' },
    { id: 'efficiency', label: 'Efficiency' },
    { id: 'quiz', label: 'Quiz' },
  ],
  '09': [
    { id: 'temperature', label: 'Temperature and Heat' },
    { id: 'thermometers', label: 'Thermometers' },
    { id: 'thermal-expansion', label: 'Thermal Expansion' },
    { id: 'specific-heat', label: 'Specific Heat Capacity' },
    { id: 'latent-heat', label: 'Latent Heat' },
    { id: 'change-of-state', label: 'Change of State' },
    { id: 'evaporation', label: 'Evaporation' },
    { id: 'gas-laws', label: 'Gas Laws' },
    { id: 'quiz', label: 'Quiz' },
  ],
};

export default function UnitDetailPage() {
  const { unitNumber } = useParams<{ unitNumber: string }>();
  const location = useLocation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const t = useT();
  const isClassX = location.pathname.includes('/class-x/');
  const backLink = isClassX ? '/class-x' : '/class-ix';
  const classLabel = isClassX ? t('nav.classX') : t('nav.classIX');
  const isValidUnit = unitNumber && /^(0[1-9]|[1-9][0-9])$/.test(unitNumber) && Number(unitNumber) >= 1 && Number(unitNumber) <= 9;
  const unitNum = isValidUnit ? unitNumber! : '01';
  const unitTitle = t(`unitDetail.${unitNum}.title`);
  const unitSubtitle = t(`unitDetail.${unitNum}.subtitle`);

  const unitId = `class-${isClassX ? 'x' : 'ix'}-unit-${unitNumber}`;
  const { getUnitProgress, markSectionComplete } = useProgress(unitId);
  const sections = unitSections[unitNumber || '01'] || [];

  // Content system: check if this chapter has new content-driven data
  const classId = isClassX ? 'class-x' : 'class-ix';
  const chapterId = formatChapterId(unitNumber || '01');
  const useNewContent = hasChapter(classId, chapterId);
  const { chapter, loading: chapterLoading, error: chapterError } = useChapter(classId, chapterId);

  // Use a ref for markSectionComplete to avoid re-running the effect on every progress change
  const markSectionCompleteRef = useRef(markSectionComplete);
  markSectionCompleteRef.current = markSectionComplete;

  useEffect(() => {
    window.scrollTo(0, 0);

    // Auto-mark sections as complete when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const sectionId = entry.target.getAttribute('data-section-id');
            if (sectionId) markSectionCompleteRef.current(sectionId);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('[data-section-id]').forEach(el => observer.observe(el));

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

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, [unitNumber, chapter, chapterLoading]);

  if (!isValidUnit) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <PhysicsBackground />
        <div className="relative z-10 text-center px-6 max-w-lg mx-auto">
          <div className="glass-card-strong rounded-3xl p-10 md:p-14">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-6">
              <AlertTriangle size={32} className="text-red-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-3">{t('unitDetail.comingSoon')}</h1>
            <p className="text-lg text-gray-400 mb-8">{t('unitDetail.comingSoonDesc')}</p>
            <Link
              to={backLink}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-cyan/20 text-brand-cyan font-semibold hover:bg-brand-cyan/30 transition-colors"
            >
              <BookOpen size={18} />
              {t('nav.home')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef}>
      {/* Hero Banner */}
      <section className="relative min-h-[35vh] md:min-h-[40vh] flex items-center justify-center overflow-hidden pt-20 pb-12">
        <PhysicsBackground />
        <div className="blob w-72 h-72 bg-brand-purple top-0 -left-10" style={BLOB_DELAY_0S} />
        <div className="blob w-56 h-56 bg-brand-cyan bottom-0 -right-10" style={BLOB_DELAY_5S} />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: t('nav.home'), to: '/' },
              { label: classLabel, to: backLink },
              { label: `${t('classIX.unitLabel')} ${unitNumber}` },
            ]}
            className="justify-center mb-5"
          />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-4">
            <BookOpen size={14} className="text-brand-cyan" />
            <span className="text-xs font-medium text-brand-cyan tracking-widest uppercase">{classLabel} — {t('classIX.unitLabel')} {unitNumber}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-3 leading-tight">
            {unitTitle}
          </h1>
          <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto">
            {unitSubtitle}
          </p>

          {/* Progress Bar */}
          <div className="mt-6 max-w-sm mx-auto">
            <ProgressBar
              value={getUnitProgress(sections.length)}
              label={t('unitDetail.yourProgress')}
              size="md"
            />
          </div>
        </div>
      </section>

      {/* Content with sidebar */}
      <section className="relative py-10 md:py-16">
        <div className="max-w-5xl xl:max-w-[calc(64rem-18rem)] mx-auto px-4 sm:px-6">
          {sections.length > 0 && (
            <UnitSidebar sections={sections} unitId={unitId} />
          )}

          {/* New content-driven rendering (takes priority) */}
          {useNewContent && chapter && !chapterLoading && (
            <ChapterRenderer chapter={chapter} unitId={unitId} />
          )}
          {useNewContent && chapterLoading && (
            <div className="unit-detail-reveal glass-card rounded-3xl p-10 text-center" {...GSAP_REVEAL_STYLE}>
              <p className="text-gray-400 text-lg">Loading chapter content...</p>
            </div>
          )}
          {useNewContent && !chapterLoading && !chapter && (
            <div className="unit-detail-reveal glass-card rounded-3xl p-10 text-center" {...GSAP_REVEAL_STYLE}>
              <p className="text-red-400 text-lg">{chapterError || 'Failed to load chapter content.'}</p>
            </div>
          )}
          {/* Legacy component rendering (fallback for unmigrated units) */}
          {!useNewContent && unitNumber && lazyUnitComponents[unitNumber] && (
            <Suspense fallback={
              <div className="unit-detail-reveal glass-card rounded-3xl p-10 text-center" {...GSAP_REVEAL_STYLE}>
                <p className="text-gray-400 text-lg">Loading...</p>
              </div>
            }>
              {React.createElement(lazyUnitComponents[unitNumber])}
            </Suspense>
          )}
          {!useNewContent && unitNumber && !lazyUnitComponents[unitNumber] && (
            <div className="unit-detail-reveal glass-card-strong rounded-3xl p-10 md:p-12 text-center" {...GSAP_REVEAL_STYLE}>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-3">{t('unitDetail.comingSoon')}</h2>
              <p className="text-gray-400 text-base md:text-lg">{t('unitDetail.comingSoonDesc')}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
