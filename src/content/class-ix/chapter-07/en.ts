import type { ChapterContent } from '../../types';

const chapter07En: ChapterContent = {
  id: 'chapter-07',
  classId: 'class-ix',
  title: 'Properties of Matter',
  subtitle: 'States of matter, elasticity, pressure in liquids, surface tension, and viscosity',
  objectives: [
    'Describe the three states of matter using the kinetic molecular model',
    'Explain Archimedes\' principle and solve problems involving buoyancy',
    'State Pascal\'s law and explain its application in hydraulic systems',
    'Define viscosity and explain the factors affecting it',
    'Explain surface tension and its effects on liquid behaviour',
    'Solve problems involving pressure in liquids using P = ρgh',
  ],
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
            { id: 'q1', type: 'mcq', question: 'In which state are particles tightly packed?', options: ['Gas', 'Liquid', 'Solid', 'Plasma'], correctIndex: 2, explanation: 'In solids, particles are tightly packed in fixed positions, giving them a definite shape.' },
            { id: 'q2', type: 'mcq', question: 'Liquid pressure depends on:', options: ['Container shape', 'Depth, density, and g', 'Volume of liquid', 'Temperature only'], correctIndex: 1, explanation: 'Liquid pressure is given by P = ρgh, so it depends on density (ρ), depth (h), and acceleration due to gravity (g).' },
            { id: 'q3', type: 'mcq', question: "Pascal's Law is used in:", options: ['Thermometer', 'Hydraulic press', 'Barometer', 'Speedometer'], correctIndex: 1, explanation: 'A hydraulic press uses Pascal\'s law — pressure applied to an enclosed fluid is transmitted equally, allowing a small force to lift a heavy load.' },
            { id: 'q4', type: 'mcq', question: 'Surface tension is caused by:', options: ['Gravity', 'Cohesive forces', 'Magnetic forces', 'Electric current'], correctIndex: 1, explanation: 'Surface tension is caused by cohesive forces between liquid molecules at the surface, which pull them inward.' },
            { id: 'q5', type: 'mcq', question: 'Which has highest viscosity?', options: ['Water', 'Oil', 'Honey', 'Alcohol'], correctIndex: 2, explanation: 'Honey is the most viscous of these liquids — it flows much more slowly than water, oil, or alcohol.' },
            { id: 'slo1', type: 'mcq', question: 'According to Archimedes\' principle, the buoyant force on an object is equal to:', options: ['The weight of the object', 'The weight of the fluid displaced', 'The volume of the object', 'The mass of the object'], correctIndex: 1, explanation: 'Archimedes\' principle states that the buoyant force acting on a submerged object equals the weight of the fluid it displaces.' },
            { id: 'slo2', type: 'mcq', question: 'A hydraulic lift has a small piston of area 0.01 m² and a large piston of area 1 m². If 100 N is applied to the small piston, the force on the large piston is:', options: ['100 N', '1000 N', '10000 N', '10 N'], correctIndex: 2, explanation: 'By Pascal\'s law: F₁/A₁ = F₂/A₂, so F₂ = F₁ × A₂/A₁ = 100 × 1/0.01 = 10000 N.' },
            { id: 'slo3', type: 'mcq', question: 'Which factor does NOT affect the viscosity of a liquid?', options: ['Temperature', 'Nature of the liquid', 'Container colour', 'Pressure'], correctIndex: 2, explanation: 'Viscosity depends on temperature, the nature of the liquid, and pressure — but not on the colour of the container.' },
          ],
        },
      ],
    },
  ],
};

export default chapter07En;
