import type { ChapterContent } from '../../types';

const chapter08En: ChapterContent = {
  id: 'chapter-08',
  classId: 'class-x',
  title: 'Atomic and Nuclear Physics',
  subtitle: 'Atomic Structure, Radioactivity, and Nuclear Energy',
  objectives: [
    'Describe the structure of an atom including protons, neutrons, and electrons',
    'Define radioactive decay and identify alpha, beta, and gamma radiation',
    'Explain half-life and solve problems involving radioactive decay',
    'Describe nuclear fission and fusion with examples',
    'Explain the working of a nuclear reactor and its safety measures',
    'Describe applications of radioactivity in medicine, industry, and energy production',
  ],
  sections: [
    {
      id: 'atomic-structure',
      title: 'Atomic Structure',
      blocks: [
        {
          type: 'definition',
          term: 'Atom',
          definition: 'The smallest particle of an element that can take part in a chemical reaction. It consists of a nucleus (protons and neutrons) surrounded by electrons.',
        },
        {
          type: 'definition',
          term: "Rutherford's Atomic Model",
          definition: 'Rutherford proposed that an atom has a small, dense, positively charged nucleus at its center. Electrons orbit the nucleus in circular paths. Most of the atom is empty space.',
          example: 'In the gold foil experiment, alpha particles were fired at a thin gold foil. Most passed straight through, some were deflected, and a few bounced back — proving the nucleus is small, dense, and positive.',
        },
        {
          type: 'definition',
          term: "Bohr's Atomic Model",
          definition: 'Bohr proposed that electrons move in fixed circular orbits (energy levels) around the nucleus. Each orbit has a fixed energy. Electrons can jump between orbits by absorbing or emitting energy.',
        },
        {
          type: 'definition',
          term: 'Atomic Number (Z)',
          definition: 'The number of protons in the nucleus of an atom. It determines the element. For example, hydrogen has Z = 1, carbon has Z = 6, and oxygen has Z = 8.',
        },
        {
          type: 'definition',
          term: 'Mass Number (A)',
          definition: 'The total number of protons and neutrons in the nucleus of an atom. Mass Number = Number of Protons + Number of Neutrons.',
        },
        {
          type: 'definition',
          term: 'Isotopes',
          definition: 'Atoms of the same element that have the same atomic number but different mass numbers. They have the same number of protons but different numbers of neutrons.',
          example: 'Carbon-12, Carbon-13, and Carbon-14 are isotopes of carbon. All have 6 protons but 6, 7, and 8 neutrons respectively.',
        },
      ],
    },
    {
      id: 'radioactivity',
      title: 'Radioactivity',
      blocks: [
        {
          type: 'definition',
          term: 'Radioactivity',
          definition: 'The spontaneous emission of radiation from the nucleus of an unstable atom. This process continues until a stable nucleus is formed.',
        },
        {
          type: 'definition',
          term: 'Alpha Particles (α)',
          definition: 'Helium nuclei consisting of 2 protons and 2 neutrons. They are positively charged (+2e) and have medium penetrating power. They are stopped by a sheet of paper.',
        },
        {
          type: 'definition',
          term: 'Beta Particles (β)',
          definition: 'Fast-moving electrons emitted from the nucleus when a neutron changes into a proton. They are negatively charged (-1e) and have more penetrating power than alpha particles. They are stopped by a thin sheet of aluminum.',
        },
        {
          type: 'definition',
          term: 'Gamma Rays (γ)',
          definition: 'High-energy electromagnetic waves emitted from the nucleus. They have no charge and no mass. They have the highest penetrating power and are only stopped by thick lead or concrete.',
        },
        {
          type: 'definition',
          term: 'Detection of Radiation',
          definition: 'Radiation can be detected using a Geiger-Muller counter (GM counter), photographic film, or a cloud chamber. The GM counter produces a click for each particle detected.',
        },
      ],
    },
    {
      id: 'half-life',
      title: 'Half-Life',
      blocks: [
        {
          type: 'definition',
          term: 'Half-Life',
          definition: 'The time taken for half the number of radioactive nuclei in a sample to decay. Different radioactive elements have different half-lives.',
          example: 'The half-life of Carbon-14 is 5730 years. If you start with 100g of Carbon-14, after 5730 years you will have 50g remaining.',
        },
        {
          type: 'formula',
          name: 'Half-Life Formula',
          formula: 'N = N₀ (1/2)^(t/t½)',
          variables: [
            { symbol: 'N', meaning: 'Number of nuclei remaining' },
            { symbol: 'N₀', meaning: 'Initial number of nuclei' },
            { symbol: 't', meaning: 'Time elapsed' },
            { symbol: 't½', meaning: 'Half-life of the substance' },
          ],
        },
        {
          type: 'definition',
          term: 'Decay Curve',
          definition: 'A graph showing how the amount of radioactive substance decreases over time. The curve never reaches zero — it approaches zero exponentially.',
        },
      ],
    },
    {
      id: 'nuclear-reactions',
      title: 'Nuclear Reactions',
      blocks: [
        {
          type: 'definition',
          term: 'Nuclear Fission',
          definition: 'The splitting of a heavy nucleus into two lighter nuclei with the release of a large amount of energy. This is the principle behind nuclear power stations and atomic bombs.',
          example: 'When Uranium-235 is hit by a neutron, it splits into Barium-141 and Krypton-92, releasing 3 neutrons and a large amount of energy.',
        },
        {
          type: 'definition',
          term: 'Chain Reaction',
          definition: 'A self-sustaining reaction in which the products of one reaction trigger further reactions. In nuclear fission, the neutrons released cause more fissions, creating a chain reaction.',
        },
        {
          type: 'definition',
          term: 'Nuclear Fusion',
          definition: 'The joining of two light nuclei to form a heavier nucleus with the release of a large amount of energy. This is the process that powers the Sun and other stars.',
          example: 'In the Sun, hydrogen nuclei fuse together at extremely high temperatures to form helium, releasing enormous amounts of energy.',
        },
        {
          type: 'definition',
          term: 'Critical Mass',
          definition: 'The minimum mass of fissile material needed to sustain a chain reaction. If the mass is below critical mass, the chain reaction will not be sustained.',
        },
      ],
    },
    {
      id: 'nuclear-energy',
      title: 'Nuclear Energy',
      blocks: [
        {
          type: 'definition',
          term: 'Mass-Energy Equivalence',
          definition: 'Einstein showed that mass and energy are interconvertible. A small amount of mass can be converted into a very large amount of energy.',
        },
        {
          type: 'formula',
          name: "Einstein's Mass-Energy Equation",
          formula: 'E = mc²',
          variables: [
            { symbol: 'E', meaning: 'Energy released (Joules)' },
            { symbol: 'm', meaning: 'Mass converted (kg)' },
            { symbol: 'c', meaning: 'Speed of light (3 × 10⁸ m/s)' },
          ],
        },
        {
          type: 'definition',
          term: 'Nuclear Power Plant',
          definition: 'A facility that uses nuclear fission to generate electricity. Uranium fuel rods undergo controlled fission in a reactor. The heat produced converts water to steam, which drives turbines to generate electricity.',
        },
        {
          type: 'definition',
          term: 'Nuclear Reactor',
          definition: 'A device in which a controlled nuclear chain reaction is carried out. It contains fuel rods (uranium), a moderator (graphite or water), control rods (cadmium), and a coolant.',
        },
      ],
    },
    {
      id: 'uses-and-hazards',
      title: 'Uses and Hazards of Radioactivity',
      blocks: [
        {
          type: 'definition',
          term: 'Medical Uses',
          definition: 'Radioactive materials are used in medicine for diagnosis and treatment. Cobalt-60 is used to treat cancer (radiotherapy). Radioactive tracers help detect diseases in organs.',
        },
        {
          type: 'definition',
          term: 'Industrial Uses',
          definition: 'Radioactivity is used in industry for checking welds and joints (radiography), measuring thickness of materials, and sterilizing equipment.',
        },
        {
          type: 'definition',
          term: 'Agricultural Uses',
          definition: 'Radioactive isotopes are used to study plant nutrition, develop new crop varieties through mutation breeding, and control pests.',
        },
        {
          type: 'definition',
          term: 'Hazards of Radiation',
          definition: 'Exposure to radiation can cause burns, cancer, genetic mutations, and radiation sickness. Safety measures include using lead shields, wearing protective clothing, and limiting exposure time.',
        },
        {
          type: 'definition',
          term: 'Safety Measures',
          definition: 'Radiation safety follows three principles: Time (minimize exposure time), Distance (maximize distance from source), and Shielding (use appropriate shielding material).',
        },
      ],
    },
    {
      id: 'numerical-examples',
      title: 'Solved Numericals',
      blocks: [
        {
          type: 'numerical',
          title: 'Half-Life Calculation',
          problem: 'The half-life of a radioactive substance is 8 days. If you start with 200g, how much will remain after 24 days?',
          given: [
            { label: 'Initial mass (N₀)', value: '200', unit: 'g' },
            { label: 'Half-life (t½)', value: '8', unit: 'days' },
            { label: 'Time (t)', value: '24', unit: 'days' },
          ],
          find: 'Remaining mass (N)',
          solution: [
            'Number of half-lives = t / t½ = 24 / 8 = 3',
            'N = N₀ (1/2)^(t/t½)',
            'N = 200 × (1/2)³',
            'N = 200 × 1/8',
            'N = 25 g',
          ],
          answer: '25 g remains after 24 days',
        },
        {
          type: 'numerical',
          title: 'Mass-Energy Calculation',
          problem: 'Calculate the energy released when 1 kg of mass is completely converted into energy. (c = 3 × 10⁸ m/s)',
          given: [
            { label: 'Mass (m)', value: '1', unit: 'kg' },
            { label: 'Speed of light (c)', value: '3 × 10⁸', unit: 'm/s' },
          ],
          find: 'Energy released (E)',
          solution: [
            'E = mc²',
            'E = 1 × (3 × 10⁸)²',
            'E = 1 × 9 × 10¹⁶',
            'E = 9 × 10¹⁶ J',
          ],
          answer: 'E = 9 × 10¹⁶ J (90 petajoules)',
        },
        {
          type: 'numerical',
          title: 'Isotope Identification',
          problem: 'An element has 92 protons and 146 neutrons. Identify the element, its atomic number, and mass number.',
          given: [
            { label: 'Protons', value: '92' },
            { label: 'Neutrons', value: '146' },
          ],
          find: 'Element, Z, and A',
          solution: [
            'Atomic number Z = number of protons = 92',
            'Mass number A = protons + neutrons = 92 + 146 = 238',
            'Element with Z = 92 is Uranium',
            'This isotope is Uranium-238 (²³⁸U)',
          ],
          answer: 'Uranium-238 (Z = 92, A = 238)',
        },
      ],
    },
    {
      id: 'interactive-simulations',
      title: 'Interactive Simulations',
      blocks: [
        {
          type: 'interactive',
          component: 'RadioactivitySim',
        },
      ],
    },
    {
      id: 'exercises',
      title: 'Chapter Exercises',
      blocks: [
        {
          type: 'exercise',
          questions: [
            { number: 1, question: "Describe Rutherford's atomic model.", answer: "Rutherford's model states that an atom has a small, dense, positively charged nucleus at its center with electrons orbiting around it. Most of the atom is empty space." },
            { number: 2, question: 'Differentiate between alpha, beta, and gamma rays.', answer: 'Alpha particles are helium nuclei (+2 charge, heavy, stopped by paper). Beta particles are electrons (-1 charge, light, stopped by aluminum). Gamma rays are electromagnetic waves (no charge, no mass, stopped by lead).' },
            { number: 3, question: 'Define half-life. The half-life of Iodine-131 is 8 days. How much of a 64g sample remains after 32 days?', answer: 'Half-life is the time for half the nuclei to decay. Number of half-lives = 32/8 = 4. Remaining = 64 × (1/2)⁴ = 64 × 1/16 = 4g.' },
            { number: 4, question: 'Explain the difference between nuclear fission and nuclear fusion.', answer: 'Fission splits heavy nuclei into lighter ones (used in nuclear reactors). Fusion joins light nuclei into heavier ones (occurs in the Sun). Both release large amounts of energy.' },
            { number: 5, question: 'What is meant by a chain reaction? Why is critical mass important?', answer: 'A chain reaction is a self-sustaining reaction where products trigger further reactions. Critical mass is the minimum mass needed to sustain the chain reaction. Below critical mass, too many neutrons escape.' },
            { number: 6, question: "State Einstein's mass-energy equation and explain its significance.", answer: 'E = mc² shows that a small mass (m) can be converted into a huge amount of energy (E) because c² is very large. This explains the enormous energy released in nuclear reactions.' },
            { number: 7, question: 'Describe three uses of radioactivity in medicine.', answer: '1) Radiotherapy using Cobalt-60 to treat cancer. 2) Radioactive tracers to diagnose diseases. 3) Sterilization of medical equipment using gamma rays.' },
            { number: 8, question: 'What safety measures should be followed when handling radioactive materials?', answer: 'Follow three principles: Time (minimize exposure), Distance (stay far from source), Shielding (use lead/concrete barriers). Also wear protective clothing and use Geiger counters to monitor radiation levels.' },
          ],
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
              question: 'The atomic number of an element is equal to the number of:',
              options: ['Neutrons', 'Protons', 'Electrons', 'Nucleons'],
              correctIndex: 1,
              type: 'mcq',
              explanation: '',
            },
            {
              id: 'q2',
              question: 'Alpha particles are:',
              options: ['Electrons', 'Helium nuclei', 'Gamma rays', 'Neutrons'],
              correctIndex: 1,
              type: 'mcq',
              explanation: '',
            },
            {
              id: 'q3',
              question: 'Which type of radiation has the highest penetrating power?',
              options: ['Alpha', 'Beta', 'Gamma', 'All equal'],
              correctIndex: 2,
                          type: 'mcq',
              explanation: '',
},
            {
              id: 'q4',
              question: 'The half-life of a radioactive substance is 5 days. After 15 days, what fraction remains?',
              options: ['1/2', '1/4', '1/8', '1/16'],
              correctIndex: 2,
                          type: 'mcq',
              explanation: '',
},
            {
              id: 'q5',
              question: 'Nuclear fission is used in:',
              options: ['Stars', 'Nuclear power stations', 'Solar panels', 'Batteries'],
              correctIndex: 1,
                          type: 'mcq',
              explanation: '',
},
            {
              id: 'q6',
              question: "Einstein's mass-energy equation is:",
              options: ['E = mc', 'E = mc²', 'E = m²c', 'E = m/c²'],
              correctIndex: 1,
                          type: 'mcq',
              explanation: '',
},
            {
              id: 'q7',
              question: 'Isotopes have the same:',
              options: ['Mass number', 'Number of neutrons', 'Atomic number', 'Number of nucleons'],
              correctIndex: 2,
                          type: 'mcq',
              explanation: '',
},
            {
              id: 'q8',
              question: 'Gamma rays are:',
              options: ['Positively charged', 'Negatively charged', 'Neutral', 'Helium nuclei'],
              correctIndex: 2,
                          type: 'mcq',
              explanation: '',
},
            {
              id: 'q9',
              question: 'Nuclear fusion occurs in:',
              options: ['Nuclear reactors', 'Atomic bombs', 'The Sun', 'Batteries'],
              correctIndex: 2,
                          type: 'mcq',
              explanation: '',
},
            {
              id: 'q10',
              question: 'The device used to detect radiation is:',
              options: ['Ammeter', 'Voltmeter', 'Geiger-Muller counter', 'Thermometer'],
              correctIndex: 2,
                          type: 'mcq',
              explanation: '',
},
          ],
        },
      ],
    },
  ],
};

export default chapter08En;
