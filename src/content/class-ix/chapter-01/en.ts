import type { ChapterContent } from '../../types';

const chapter01En: ChapterContent = {
  id: 'chapter-01',
  classId: 'class-ix',
  title: 'Physical Quantities and Measurement',
  subtitle: 'What is Physics, Quantities, Units, and Measurement',
  objectives: [
    'Define physics and explain its scope in understanding the natural world',
    'Classify physical quantities into base quantities and derived quantities with examples',
    'List the seven SI base quantities and their units',
    'Use scientific notation and SI prefixes to express very large and very small numbers',
    'Demonstrate the use of measuring instruments (metre rule, Vernier calipers, screw gauge)',
    'Apply significant figures rules in measurement and calculations',
  ],
  sections: [
    {
      id: 'what-is-physics',
      title: 'What is Physics?',
      blocks: [
        {
          type: 'definition',
          term: 'Physics',
          definition: 'Physics is the branch of science that studies matter, energy, and their interactions.',
        },
      ],
    },
    {
      id: 'physical-quantities',
      title: 'Physical Quantities',
      blocks: [
        {
          type: 'definition',
          term: 'Base Quantities (7)',
          definition: 'Quantities that are independent and cannot be derived from other quantities.',
          example: 'Length, Mass, Time, Temperature, Electric Current, Amount of Substance, Luminous Intensity',
        },
        {
          type: 'definition',
          term: 'Derived Quantities',
          definition: 'Quantities obtained by combining base quantities through multiplication or division.',
          example: 'Speed = Distance / Time, Force = Mass × Acceleration, Density = Mass / Volume',
        },
      ],
    },
    {
      id: 'si-units',
      title: 'SI Units',
      blocks: [
        {
          type: 'formula',
          name: 'SI Base Units',
          formula: '7 base quantities → 7 base units',
          variables: [
            { symbol: 'm', meaning: 'metre — unit of Length' },
            { symbol: 'kg', meaning: 'kilogram — unit of Mass' },
            { symbol: 's', meaning: 'second — unit of Time' },
            { symbol: 'A', meaning: 'ampere — unit of Electric Current' },
            { symbol: 'K', meaning: 'kelvin — unit of Temperature' },
            { symbol: 'mol', meaning: 'mole — unit of Amount of Substance' },
            { symbol: 'cd', meaning: 'candela — unit of Luminous Intensity' },
          ],
        },
      ],
    },
    {
      id: 'si-prefixes',
      title: 'SI Prefixes',
      blocks: [
        {
          type: 'definition',
          term: 'Prefixes',
          definition: 'Prefixes are used to express very large or very small quantities.',
          example: 'kilo (k) = 10³, mega (M) = 10⁶, milli (m) = 10⁻³, micro (μ) = 10⁻⁶, nano (n) = 10⁻⁹, centi (c) = 10⁻²',
        },
      ],
    },
    {
      id: 'scientific-notation',
      title: 'Scientific Notation',
      blocks: [
        {
          type: 'definition',
          term: 'Scientific Notation',
          definition: 'A way of writing very large or very small numbers using powers of 10.',
          example: 'Speed of Light: 3 × 10⁸ m/s, Mass of Electron: 9.1 × 10⁻³¹ kg',
        },
      ],
    },
    {
      id: 'measuring-instruments',
      title: 'Measuring Instruments',
      blocks: [
        {
          type: 'definition',
          term: 'Metre Rule',
          definition: 'Used to measure length up to 1 metre. Least Count: 1 mm (0.1 cm).',
        },
        {
          type: 'definition',
          term: 'Vernier Calipers',
          definition: 'Used for measuring small lengths like thickness of coins or wires. Least Count: 0.1 mm (0.01 cm).',
        },
        {
          type: 'definition',
          term: 'Screw Gauge',
          definition: 'Used to measure very small diameters (wire, sheet thickness). Least Count: 0.01 mm.',
        },
        {
          type: 'definition',
          term: 'Physical Balance',
          definition: 'Used to measure mass of objects by comparison method using standard weights. Least Count: 0.1 g.',
        },
      ],
    },
    {
      id: 'errors-sig-figs',
      title: 'Errors & Significant Figures',
      blocks: [
        {
          type: 'definition',
          term: 'Systematic Errors',
          definition: 'Errors that repeat in the same direction, usually caused by faulty instruments or incorrect methods.',
        },
        {
          type: 'definition',
          term: 'Random Errors',
          definition: 'Irregular errors caused by parallax, human mistakes, or unpredictable variations.',
        },
        {
          type: 'definition',
          term: 'Significant Figures Rules',
          definition: 'Rules for determining which digits in a measurement are meaningful.',
          example: '1. All non-zero digits are significant. 2. Zeros between non-zero digits are significant. 3. Leading zeros are NOT significant. 4. Trailing zeros after decimal ARE significant.',
        },
      ],
    },
    {
      id: 'matching-game',
      title: 'Match Quantity with Unit',
      blocks: [
        {
          type: 'interactive',
          component: 'MatchingGame',
          props: {
            gameType: 'quantity-unit',
          },
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
            {
              id: 'q1',
              type: 'mcq',
              question: 'The SI unit of length is:',
              options: ['Centimetre', 'Metre', 'Kilometre', 'Millimetre'],
              correctIndex: 1,
              explanation: 'The metre (m) is the SI base unit of length. Centimetre, kilometre, and millimetre are derived from the metre using prefixes.',
            },
            {
              id: 'q2',
              type: 'mcq',
              question: 'How many base quantities are there in the SI system?',
              options: ['5', '6', '7', '10'],
              correctIndex: 2,
              explanation: 'The SI system defines 7 base quantities: length, mass, time, temperature, electric current, amount of substance, and luminous intensity.',
            },
            {
              id: 'q3',
              type: 'mcq',
              question: 'The least count of a Vernier Calipers is:',
              options: ['0.01 mm', '0.1 mm', '1 mm', '0.001 mm'],
              correctIndex: 1,
              explanation: 'The least count of Vernier calipers is 0.1 mm (0.01 cm), which is the difference between one main scale division and one Vernier scale division.',
            },
            {
              id: 'q4',
              type: 'mcq',
              question: 'Which of the following is a derived quantity?',
              options: ['Mass', 'Length', 'Time', 'Speed'],
              correctIndex: 3,
              explanation: 'Speed is a derived quantity because it is obtained by dividing distance (base quantity) by time (base quantity). Mass, length, and time are all base quantities.',
            },
            {
              id: 'q5',
              type: 'mcq',
              question: "The prefix 'kilo' represents:",
              options: ['10⁻³', '10²', '10³', '10⁶'],
              correctIndex: 2,
              explanation: "The prefix 'kilo' (k) represents 10³ or 1000. For example, 1 kilometre = 1000 metres.",
            },
            {
              id: 'slo1',
              type: 'mcq',
              question: 'Which of the following is a base quantity?',
              options: ['Force', 'Velocity', 'Mass', 'Acceleration'],
              correctIndex: 2,
              explanation: 'Mass is one of the seven SI base quantities. Force (F = ma), velocity (v = d/t), and acceleration (a = v/t) are all derived quantities.',
            },
            {
              id: 'slo2',
              type: 'mcq',
              question: 'The diameter of a wire can be accurately measured using:',
              options: ['Metre rule', 'Vernier calipers', 'Screw gauge', 'Both B and C'],
              correctIndex: 3,
              explanation: 'Both Vernier calipers and screw gauge can accurately measure small diameters. The screw gauge has a smaller least count (0.01 mm) than Vernier calipers (0.1 mm), making it more precise for very thin wires.',
            },
            {
              id: 'slo3',
              type: 'mcq',
              question: 'The number 0.00340 has how many significant figures?',
              options: ['2', '3', '4', '5'],
              correctIndex: 1,
              explanation: '0.00340 has 3 significant figures. Leading zeros (0.00) are not significant. The digits 3, 4, and the trailing zero after the decimal point are significant.',
            },
          ],
        },
      ],
    },
  ],
};

export default chapter01En;
