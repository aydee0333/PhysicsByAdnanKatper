import type { ChapterContent } from '../../types';

const chapter08En: ChapterContent = {
  id: 'chapter-08',
  classId: 'class-ix',
  title: 'Work and Energy',
  subtitle: 'Work, energy types, conservation, power, and efficiency',
  objectives: [
    'Define work and calculate it using W = Fd',
    'Distinguish between kinetic energy and potential energy',
    'State and apply the law of conservation of energy',
    'Define power and its SI unit, and solve problems using P = W/t',
    'Explain efficiency and calculate it for simple machines',
    'Solve numerical problems involving work, energy, and power',
  ],
  sections: [
    {
      id: 'work',
      title: 'Work',
      blocks: [
        {
          type: 'definition',
          term: 'Work',
          definition: 'Work is done when a force acts on a body and moves it in the direction of the force. Work = Force × Distance.',
          example: 'Pushing a box 5 m with 10 N force: W = 10 × 5 = 50 J',
        },
        {
          type: 'formula',
          name: 'Work Done',
          formula: 'W = F × d',
          variables: [
            { symbol: 'W', meaning: 'Work done (Joules, J)' },
            { symbol: 'F', meaning: 'Force applied (Newtons, N)' },
            { symbol: 'd', meaning: 'Distance moved (metres, m)' },
          ],
        },
        {
          type: 'interactive',
          component: 'WorkEnergyTheoremSim',
        },
      ],
    },
    {
      id: 'energy',
      title: 'Energy',
      blocks: [
        {
          type: 'definition',
          term: 'Energy',
          definition: 'Energy is the capacity to do work. Energy is measured in Joules (J).',
        },
        {
          type: 'definition',
          term: 'Kinetic Energy',
          definition: 'The energy possessed by a body due to its motion.',
          example: 'A moving car, a flying ball',
        },
        {
          type: 'definition',
          term: 'Potential Energy',
          definition: 'Energy stored due to position in a gravitational field.',
          example: 'A book on a shelf, water behind a dam',
        },
        {
          type: 'definition',
          term: 'Heat Energy',
          definition: 'Thermal energy transferred between objects due to temperature difference.',
        },
        {
          type: 'definition',
          term: 'Light Energy',
          definition: 'Radiant energy that can be seen. Travels in waves.',
        },
        {
          type: 'definition',
          term: 'Sound Energy',
          definition: 'Energy produced by vibrations. Travels in waves through a medium.',
        },
        {
          type: 'definition',
          term: 'Electrical Energy',
          definition: 'Energy from the flow of electric charge.',
        },
        {
          type: 'interactive',
          component: 'EnergyMatchingGame',
        },
      ],
    },
    {
      id: 'kinetic-energy',
      title: 'Kinetic Energy',
      blocks: [
        {
          type: 'definition',
          term: 'Kinetic Energy',
          definition: 'The energy possessed by a body due to its motion. Depends on mass and velocity.',
        },
        {
          type: 'formula',
          name: 'Kinetic Energy',
          formula: 'KE = ½mv²',
          variables: [
            { symbol: 'KE', meaning: 'Kinetic Energy (Joules, J)' },
            { symbol: 'm', meaning: 'Mass (kg)' },
            { symbol: 'v', meaning: 'Velocity (m/s)' },
          ],
        },
        {
          type: 'numerical',
          title: 'Calculate Kinetic Energy',
          problem: 'A 2 kg object moves at 3 m/s. Find its kinetic energy.',
          given: [
            { label: 'Mass', value: '2', unit: 'kg' },
            { label: 'Velocity', value: '3', unit: 'm/s' },
          ],
          find: 'Kinetic Energy (KE)',
          solution: [
            'KE = ½mv²',
            'KE = ½ × 2 × 3²',
            'KE = ½ × 2 × 9',
            'KE = 9 J',
          ],
          answer: '9 J',
        },
        {
          type: 'interactive',
          component: 'KECalculator',
        },
      ],
    },
    {
      id: 'potential-energy',
      title: 'Gravitational Potential Energy',
      blocks: [
        {
          type: 'definition',
          term: 'Potential Energy',
          definition: 'Energy stored due to position in a gravitational field. Depends on mass, gravity, and height.',
        },
        {
          type: 'formula',
          name: 'Potential Energy',
          formula: 'PE = mgh',
          variables: [
            { symbol: 'PE', meaning: 'Potential Energy (Joules, J)' },
            { symbol: 'm', meaning: 'Mass (kg)' },
            { symbol: 'g', meaning: 'Acceleration due to gravity (9.8 m/s²)' },
            { symbol: 'h', meaning: 'Height (m)' },
          ],
        },
        {
          type: 'interactive',
          component: 'PESim',
        },
      ],
    },
    {
      id: 'energy-conversion',
      title: 'Energy Conversion',
      blocks: [
        {
          type: 'definition',
          term: 'Energy Conversion',
          definition: 'Energy changes from one form to another. Energy cannot be created or destroyed, only converted.',
          example: 'Electrical → Light (light bulb), Chemical → Kinetic (car engine)',
        },
        {
          type: 'interactive',
          component: 'EnergyConversionChain',
        },
        {
          type: 'interactive',
          component: 'RollerCoasterSim',
        },
      ],
    },
    {
      id: 'conservation',
      title: 'Law of Conservation of Energy',
      blocks: [
        {
          type: 'definition',
          term: 'Conservation of Energy',
          definition: 'Energy cannot be created or destroyed. It can only be transformed from one form to another. Total energy remains constant.',
          example: 'Pendulum: PE (top) → KE (bottom) → PE (other side). Total energy stays the same.',
        },
        {
          type: 'interactive',
          component: 'PendulumSim',
        },
        {
          type: 'interactive',
          component: 'ElasticCollisionSim',
        },
      ],
    },
    {
      id: 'energy-resources',
      title: 'Energy Resources',
      blocks: [
        {
          type: 'definition',
          term: 'Renewable Energy',
          definition: 'Energy from sources that can be replenished naturally.',
          example: 'Solar, Wind, Hydro, Biomass, Geothermal',
        },
        {
          type: 'definition',
          term: 'Non-renewable Energy',
          definition: 'Energy from finite sources that will eventually run out.',
          example: 'Coal, Oil, Natural Gas, Nuclear',
        },
      ],
    },
    {
      id: 'power',
      title: 'Power',
      blocks: [
        {
          type: 'definition',
          term: 'Power',
          definition: 'Power is the rate of doing work or transferring energy.',
          example: 'A 100W bulb uses 100 Joules per second',
        },
        {
          type: 'formula',
          name: 'Power',
          formula: 'P = W/t = E/t',
          variables: [
            { symbol: 'P', meaning: 'Power (Watts, W)' },
            { symbol: 'W', meaning: 'Work done (Joules, J)' },
            { symbol: 't', meaning: 'Time (seconds, s)' },
          ],
        },
        {
          type: 'definition',
          term: 'Horsepower',
          definition: '1 horsepower (hp) = 746 Watts',
        },
        {
          type: 'interactive',
          component: 'PowerComparison',
        },
      ],
    },
    {
      id: 'efficiency',
      title: 'Efficiency',
      blocks: [
        {
          type: 'definition',
          term: 'Efficiency',
          definition: 'The ratio of useful output to total input. Always less than 100% — some energy is lost as heat.',
          example: 'Car engine: ~25% efficient, LED bulb: ~80% efficient',
        },
        {
          type: 'formula',
          name: 'Efficiency',
          formula: 'Efficiency = (Useful Output / Total Input) × 100%',
          variables: [
            { symbol: 'η', meaning: 'Efficiency (%)' },
          ],
        },
        {
          type: 'interactive',
          component: 'EfficiencyCalculator',
        },
        {
          type: 'interactive',
          component: 'RubeGoldbergEnergySim',
        },
      ],
    },
    {
      id: 'quiz',
      title: 'Quiz',
      blocks: [
        {
          type: 'quiz',
          questions: [
            { id: 'q1', type: 'mcq', question: 'The SI unit of energy is:', options: ['Watt (W)', 'Joule (J)', 'Newton (N)', 'Pascal (Pa)'], correctIndex: 1, explanation: 'The joule (J) is the SI unit of energy and work. 1 J = 1 N × 1 m.' },
            { id: 'q2', type: 'mcq', question: 'A 2 kg object moves at 3 m/s. Its kinetic energy is:', options: ['6 J', '9 J', '18 J', '12 J'], correctIndex: 1, explanation: 'KE = ½mv² = ½ × 2 × 3² = ½ × 2 × 9 = 9 J.' },
            { id: 'q3', type: 'mcq', question: 'Energy conservation means:', options: ['Energy can be created', 'Energy can be destroyed', 'Energy transforms but total stays constant', 'Energy always increases'], correctIndex: 2, explanation: 'The law of conservation of energy states that energy cannot be created or destroyed — it only transforms from one form to another. Total energy remains constant.' },
            { id: 'q4', type: 'mcq', question: 'Power is measured in:', options: ['Joules', 'Newtons', 'Watts', 'Pascals'], correctIndex: 2, explanation: 'The watt (W) is the SI unit of power. 1 W = 1 J/s — one joule of energy transferred per second.' },
            { id: 'q5', type: 'mcq', question: 'An engine with 40% efficiency:', options: ['Converts 40% of input to useful work', 'Uses 40% of fuel', 'Has 40% power loss', 'Produces 40% more energy'], correctIndex: 0, explanation: 'Efficiency = (useful output / total input) × 100%. A 40% efficient engine converts 40% of the input energy into useful work; the rest is lost as heat.' },
            { id: 'slo1', type: 'mcq', question: 'A 5 kg book is lifted 2 m off the ground. The work done against gravity is: (g = 10 m/s²)', options: ['10 J', '25 J', '100 J', '50 J'], correctIndex: 2, explanation: 'Work = Force × distance = mg × d = 5 × 10 × 2 = 100 J.' },
            { id: 'slo2', type: 'mcq', question: 'At the highest point of a pendulum\'s swing, the energy is mostly:', options: ['Kinetic energy', 'Potential energy', 'Heat energy', 'Sound energy'], correctIndex: 1, explanation: 'At the highest point, the pendulum is momentarily at rest, so KE = 0 and all energy is stored as gravitational PE. At the lowest point, PE converts to KE.' },
            { id: 'slo3', type: 'mcq', question: 'A 60 W bulb is used for 5 hours. The energy consumed is:', options: ['300 J', '300 Wh', '12 Wh', '300 kWh'], correctIndex: 1, explanation: 'Energy = Power × time = 60 W × 5 h = 300 Wh = 0.3 kWh.' },
          ],
        },
      ],
    },
  ],
};

export default chapter08En;
