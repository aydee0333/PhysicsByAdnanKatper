import type { ChapterContent } from '../../types';

const chapter07En: ChapterContent = {
  id: 'chapter-07',
  classId: 'class-ix',
  title: 'Properties of Matter',
  subtitle: 'States of matter, elasticity, pressure in liquids, surface tension, and viscosity',
  sections: [
    {
      id: 'kinetic-molecular',
      title: 'Kinetic Molecular Model of Matter',
      blocks: [
        { type: 'definition', term: 'Three States', definition: 'Matter exists in three states: solid (tightly packed, fixed shape), liquid (loosely packed, takes container shape), and gas (far apart, fills container).' },
        { type: 'interactive', component: 'ParticleAnimation' },
      ],
    },
    {
      id: 'elasticity-review',
      title: 'Elasticity (Review)',
      blocks: [
        { type: 'definition', term: 'Elasticity', definition: 'Elasticity is the property of a material to regain its original shape after the removal of deforming force.' },
        { type: 'formula', name: 'Elastic Limit', formula: 'Within elastic limit, extension ∝ force' },
        { type: 'interactive', component: 'SpringSim7' },
      ],
    },
    {
      id: 'pressure-in-liquids',
      title: 'Pressure in Liquids',
      blocks: [
        { type: 'definition', term: 'Liquid Pressure', definition: 'Pressure in a liquid increases with depth. Same depth = same pressure regardless of container shape.' },
        { type: 'formula', name: 'Liquid Pressure', formula: 'P = ρ × g × h', variables: [{ symbol: 'ρ', meaning: 'Density (kg/m³)' }, { symbol: 'g', meaning: '9.8 m/s²' }, { symbol: 'h', meaning: 'Depth (m)' }] },
        { type: 'interactive', component: 'LiquidPressureSim' },
      ],
    },
    {
      id: 'pascals-law',
      title: "Pascal's Law",
      blocks: [
        { type: 'definition', term: "Pascal's Law", definition: 'Pressure applied to an enclosed fluid is transmitted equally to every part of the fluid and to the walls of the container.' },
        { type: 'formula', name: 'Pascal\'s Formula', formula: 'P = F₁/A₁ = F₂/A₂' },
        { type: 'interactive', component: 'PascalLawSim' },
      ],
    },
    {
      id: 'surface-tension',
      title: 'Surface Tension',
      blocks: [
        { type: 'definition', term: 'Surface Tension', definition: 'Surface tension makes a liquid surface behave like a stretched elastic membrane. Caused by cohesive forces between liquid molecules.' },
        { type: 'interactive', component: 'SurfaceTensionSim' },
      ],
    },
    {
      id: 'viscosity',
      title: 'Viscosity',
      blocks: [
        { type: 'definition', term: 'Viscosity', definition: 'Viscosity is the internal friction of a fluid that resists its flow. Higher viscosity = slower flow.' },
        { type: 'interactive', component: 'ViscositySim' },
      ],
    },
    {
      id: 'bernoulli',
      title: "Bernoulli's Principle",
      blocks: [
        { type: 'definition', term: "Bernoulli's Principle", definition: 'Where fluid speed is high, pressure is low — and vice versa. P + ½ρv² + ρgh = constant.' },
        { type: 'interactive', component: 'BernoulliSim' },
        { type: 'interactive', component: 'StreamlineFlowSim' },
      ],
    },
    {
      id: 'hooke-law-exp',
      title: "Hooke's Law Experiment",
      blocks: [
        { type: 'definition', term: 'Experiment', definition: 'Plot force vs extension graph to verify Hooke\'s Law. Within elastic limit, the graph is a straight line.' },
        { type: 'interactive', component: 'HookeLawExp' },
      ],
    },
    {
      id: 'quiz',
      title: 'MCQ Quiz',
      blocks: [
        {
          type: 'quiz',
          questions: [
            { id: 'q1', question: 'In which state are particles tightly packed?', options: ['Gas', 'Liquid', 'Solid', 'Plasma'], correctIndex: 2 },
            { id: 'q2', question: 'Liquid pressure depends on:', options: ['Container shape', 'Depth, density, and g', 'Volume of liquid', 'Temperature only'], correctIndex: 1 },
            { id: 'q3', question: "Pascal's Law is used in:", options: ['Thermometer', 'Hydraulic press', 'Barometer', 'Speedometer'], correctIndex: 1 },
            { id: 'q4', question: 'Surface tension is caused by:', options: ['Gravity', 'Cohesive forces', 'Magnetic forces', 'Electric current'], correctIndex: 1 },
            { id: 'q5', question: 'Which has highest viscosity?', options: ['Water', 'Oil', 'Honey', 'Alcohol'], correctIndex: 2 },
          ],
        },
      ],
    },
  ],
};

export default chapter07En;
