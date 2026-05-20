import type { ChapterContent } from '../../types';

const chapter05En: ChapterContent = {
  id: 'chapter-05',
  classId: 'class-ix',
  title: 'Forces and Matter',
  subtitle: 'How forces affect matter — springs, pressure, density, and fluids',
  objectives: [
    'Define pressure as force per unit area and solve problems using P = F/A',
    "State Hooke's law and explain the spring constant; use F = kx to solve problems",
    'Define density and specific gravity; calculate density using ρ = m/V',
    'Explain elasticity and elastic limit; describe stress, strain, and Young\'s modulus',
    'State Archimedes\' principle and explain buoyancy and floating conditions',
    'Describe atmospheric pressure and its measurement',
  ],
  sections: [
    {
      id: 'elasticity',
      title: 'Elasticity',
      blocks: [
        {
          type: 'definition',
          term: 'Elasticity',
          definition: 'Elasticity is the property of a material to regain its original shape and size after the external force is removed.',
        },
        {
          type: 'definition',
          term: 'Elastic Limit',
          definition: 'The maximum extent to which a material can be stretched without permanent deformation. Beyond this, the material won\'t return to its original shape.',
        },
        {
          type: 'formula',
          name: "Hooke's Law",
          formula: 'F = k × x',
          variables: [
            { symbol: 'F', meaning: 'Force applied (N)' },
            { symbol: 'k', meaning: 'Spring constant (N/m)' },
            { symbol: 'x', meaning: 'Extension (m)' },
          ],
        },
        {
          type: 'interactive',
          component: 'SpringSim5',
        },
        {
          type: 'interactive',
          component: 'HookeGraphPlotter',
        },
      ],
    },
    {
      id: 'pressure',
      title: 'Pressure',
      blocks: [
        {
          type: 'definition',
          term: 'Pressure',
          definition: 'Pressure is the force acting per unit area on a surface. It tells us how much force is applied on each square meter.',
        },
        {
          type: 'formula',
          name: 'Pressure Formula',
          formula: 'P = F / A',
          variables: [
            { symbol: 'P', meaning: 'Pressure (Pa)' },
            { symbol: 'F', meaning: 'Force (N)' },
            { symbol: 'A', meaning: 'Area (m²)' },
          ],
        },
        {
          type: 'interactive',
          component: 'PressureTester',
        },
        {
          type: 'interactive',
          component: 'HydraulicPressSim',
        },
      ],
    },
    {
      id: 'stress-strain',
      title: 'Stress and Strain',
      blocks: [
        {
          type: 'definition',
          term: 'Stress',
          definition: 'Force per unit area applied to a material. σ = F/A (Pa)',
        },
        {
          type: 'definition',
          term: 'Strain',
          definition: 'Ratio of change in dimension to original dimension. No units! ε = ΔL/L',
        },
        {
          type: 'formula',
          name: "Young's Modulus",
          formula: 'E = Stress / Strain = (F/A) / (ΔL/L)',
          variables: [
            { symbol: 'E', meaning: "Young's Modulus (Pa)" },
            { symbol: 'σ', meaning: 'Stress' },
            { symbol: 'ε', meaning: 'Strain' },
          ],
        },
        {
          type: 'interactive',
          component: 'StressStrainGraph',
        },
      ],
    },
    {
      id: 'density',
      title: 'Density',
      blocks: [
        {
          type: 'definition',
          term: 'Density',
          definition: 'Density is the mass per unit volume of a substance. It tells how tightly packed the matter is.',
        },
        {
          type: 'formula',
          name: 'Density Formula',
          formula: 'ρ = m / V',
          variables: [
            { symbol: 'ρ', meaning: 'Density (kg/m³)' },
            { symbol: 'm', meaning: 'Mass (kg)' },
            { symbol: 'V', meaning: 'Volume (m³)' },
          ],
        },
        {
          type: 'interactive',
          component: 'DensityCalculator',
        },
      ],
    },
    {
      id: 'buoyancy',
      title: 'Buoyancy and Archimedes Principle',
      blocks: [
        {
          type: 'definition',
          term: 'Archimedes Principle',
          definition: 'When an object is immersed in a fluid, it experiences an upward force (upthrust) equal to the weight of the fluid displaced.',
        },
        {
          type: 'formula',
          name: 'Upthrust Formula',
          formula: 'Upthrust = ρ_fluid × V_displaced × g',
        },
        {
          type: 'interactive',
          component: 'BuoyancySim',
        },
      ],
    },
    {
      id: 'atmospheric-pressure',
      title: 'Atmospheric Pressure',
      blocks: [
        {
          type: 'definition',
          term: 'Atmospheric Pressure',
          definition: 'Atmospheric pressure is the pressure exerted by the weight of air molecules on Earth\'s surface.',
        },
        {
          type: 'formula',
          name: 'Standard Atmosphere',
          formula: '1 atm = 101,325 Pa',
        },
        {
          type: 'interactive',
          component: 'AtmosphericPressureSim',
        },
      ],
    },
    {
      id: 'quiz',
      title: 'MCQ Quiz',
      blocks: [
        {
          type: 'quiz',
          questions: [
            { id: 'q1', type: 'mcq', question: "Hooke's Law states that:", options: ['F = ma', 'F = kx', 'P = F/A', 'E = mc²'], correctIndex: 1, explanation: "Hooke's Law states that the force needed to extend or compress a spring is proportional to the displacement: F = kx." },
            { id: 'q2', type: 'mcq', question: 'The SI unit of pressure is:', options: ['Newton (N)', 'Pascal (Pa)', 'Joule (J)', 'Watt (W)'], correctIndex: 1, explanation: 'Pressure is measured in Pascal (Pa), where 1 Pa = 1 N/m².' },
            { id: 'q3', type: 'mcq', question: 'An object floats when its density is:', options: ['Greater than fluid density', 'Less than fluid density', 'Equal to fluid density', 'Zero'], correctIndex: 1, explanation: 'An object floats when its density is less than the density of the fluid it is placed in, as the upthrust exceeds its weight.' },
            { id: 'q4', type: 'mcq', question: "Young's Modulus measures:", options: ['Density', 'Pressure', 'Stiffness of material', 'Temperature'], correctIndex: 2, explanation: "Young's Modulus (E) is the ratio of stress to strain and measures how stiff a material is — higher E means stiffer material." },
            { id: 'q5', type: 'mcq', question: 'Atmospheric pressure at sea level is approximately:', options: ['101,325 Pa', '10,000 Pa', '1,000,000 Pa', '1,000 Pa'], correctIndex: 0, explanation: 'Standard atmospheric pressure at sea level is approximately 101,325 Pa (1 atm).' },
            { id: 'slo1', type: 'mcq', question: 'A force of 200 N acts on an area of 0.5 m². The pressure is:', options: ['100 Pa', '200 Pa', '400 Pa', '500 Pa'], correctIndex: 2, explanation: 'Using P = F/A = 200 N / 0.5 m² = 400 Pa.' },
            { id: 'slo2', type: 'mcq', question: 'A spring with spring constant 500 N/m is compressed by 0.04 m. The force required is:', options: ['12.5 N', '20 N', '200 N', '500 N'], correctIndex: 1, explanation: "Using Hooke's Law: F = kx = 500 N/m × 0.04 m = 20 N." },
          ],
        },
      ],
    },
  ],
};

export default chapter05En;
