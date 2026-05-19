import type { ChapterContent } from '../../types';

const chapter09En: ChapterContent = {
  id: 'chapter-09',
  classId: 'class-x',
  title: 'Atomic and Nuclear Physics',
  subtitle: 'Atomic Structure, Radioactivity, and Nuclear Energy',
  sections: [
    {
      id: 'structure-of-atom',
      title: 'Structure of Atom',
      blocks: [
        {
          type: 'definition',
          term: 'Atomic Model',
          definition: 'The model of an atom describes how protons, neutrons, and electrons are arranged. The Bohr model shows electrons in fixed orbits around the nucleus, each with a specific energy level.',
        },
        {
          type: 'definition',
          term: 'Bohr Model',
          definition: 'Niels Bohr proposed that electrons revolve around the nucleus in specific circular orbits called energy levels or shells. Each orbit has a fixed amount of energy. Electrons can jump between orbits by absorbing or emitting energy.',
          example: 'In a hydrogen atom, the electron in the first orbit (n=1) has the lowest energy. When it absorbs energy, it jumps to a higher orbit. When it falls back, it emits light.',
        },
        {
          type: 'definition',
          term: 'Energy Levels',
          definition: 'The fixed orbits in which electrons move around the nucleus are called energy levels. They are labeled as K, L, M, N or n=1, n=2, n=3, n=4. The maximum number of electrons in each shell is given by 2n\u00B2.',
        },
        {
          type: 'definition',
          term: 'Electron Configuration',
          definition: 'The arrangement of electrons in different shells of an atom is called electron configuration. The first shell holds up to 2 electrons, the second up to 8, the third up to 18, and the fourth up to 32.',
          example: 'Sodium (Z=11) has electron configuration 2, 8, 1. This means 2 electrons in K shell, 8 in L shell, and 1 in M shell.',
        },
        {
          type: 'definition',
          term: 'Atomic Number (Z)',
          definition: 'The number of protons in the nucleus of an atom. It determines the identity of the element. All atoms of the same element have the same atomic number.',
        },
        {
          type: 'definition',
          term: 'Mass Number (A)',
          definition: 'The total number of protons and neutrons in the nucleus. Mass Number = Protons + Neutrons. The number of neutrons is calculated as A - Z.',
        },
        {
          type: 'definition',
          term: 'Isotopes',
          definition: 'Atoms of the same element with the same atomic number but different mass numbers. They have the same number of protons but different numbers of neutrons.',
          example: 'Hydrogen has three isotopes: Protium (\u00B9H, 0 neutrons), Deuterium (\u00B2H, 1 neutron), and Tritium (\u00B3H, 2 neutrons). All have 1 proton.',
        },
      ],
    },
    {
      id: 'radioactive-decay',
      title: 'Radioactive Decay',
      blocks: [
        {
          type: 'definition',
          term: 'Radioactivity',
          definition: 'The spontaneous emission of radiation from the nucleus of an unstable atom. The nucleus loses energy by emitting alpha, beta, or gamma radiation until it becomes stable.',
        },
        {
          type: 'definition',
          term: 'Alpha Decay',
          definition: 'When a nucleus emits an alpha particle (helium nucleus with 2 protons and 2 neutrons). The atomic number decreases by 2 and the mass number decreases by 4.',
          example: 'Radium-226 decays by emitting an alpha particle: \u00B2\u00B2\u2076Ra \u2192 \u00B2\u00B2\u00B2Rn + \u2074\u2078He. The new element is Radon-222.',
        },
        {
          type: 'definition',
          term: 'Beta Decay',
          definition: 'When a neutron in the nucleus changes into a proton and an electron (beta particle) is emitted. The atomic number increases by 1 but the mass number stays the same.',
          example: 'Carbon-14 decays by beta emission: \u00B9\u2074C \u2192 \u00B9\u2074N + \u207B\u00B9e. Carbon becomes Nitrogen.',
        },
        {
          type: 'definition',
          term: 'Gamma Radiation',
          definition: 'High-energy electromagnetic waves emitted from the nucleus when it has excess energy after alpha or beta decay. Gamma rays have no charge and no mass. They do not change the atomic number or mass number.',
        },
        {
          type: 'definition',
          term: 'Nuclear Equation',
          definition: 'A balanced nuclear equation shows the atomic number (subscript) and mass number (superscript) on both sides. The total atomic number and total mass number must be equal on both sides.',
        },
      ],
    },
    {
      id: 'half-life-and-activity',
      title: 'Half-Life and Activity',
      blocks: [
        {
          type: 'definition',
          term: 'Half-Life',
          definition: 'The time taken for half the radioactive nuclei in a sample to decay. Each radioactive isotope has a characteristic half-life that cannot be changed by temperature, pressure, or chemical reactions.',
          example: 'Iodine-131 has a half-life of 8 days. If you start with 100g, after 8 days you have 50g, after 16 days you have 25g, after 24 days you have 12.5g.',
        },
        {
          type: 'formula',
          name: 'Half-Life Formula',
          formula: 'N = N\u2080 (1/2)^(t/t\u00BD)',
          variables: [
            { symbol: 'N', meaning: 'Number of undecayed nuclei remaining' },
            { symbol: 'N\u2080', meaning: 'Initial number of nuclei' },
            { symbol: 't', meaning: 'Time elapsed' },
            { symbol: 't\u00BD', meaning: 'Half-life of the substance' },
          ],
        },
        {
          type: 'definition',
          term: 'Decay Constant (\u03BB)',
          definition: 'The probability of a nucleus decaying per unit time. It is related to half-life by the equation: \u03BB = 0.693 / t\u00BD. A larger decay constant means faster decay.',
        },
        {
          type: 'definition',
          term: 'Activity (A)',
          definition: 'The rate at which a radioactive source decays, measured in Becquerel (Bq). One Becquerel means one nucleus decays per second. Activity is calculated using the formula A = \u03BBN.',
        },
        {
          type: 'formula',
          name: 'Activity Formula',
          formula: 'A = \u03BBN',
          variables: [
            { symbol: 'A', meaning: 'Activity (Becquerel, Bq)' },
            { symbol: '\u03BB', meaning: 'Decay constant (per second)' },
            { symbol: 'N', meaning: 'Number of undecayed nuclei' },
          ],
        },
      ],
    },
    {
      id: 'nuclear-fission-and-fusion',
      title: 'Nuclear Fission and Fusion',
      blocks: [
        {
          type: 'definition',
          term: 'Nuclear Fission',
          definition: 'The splitting of a heavy nucleus into two or more lighter nuclei with the release of energy and neutrons. Fission of uranium-235 is used in nuclear power plants to generate electricity.',
          example: 'Uranium-235 absorbs a neutron and splits into Barium-141 and Krypton-92, releasing 3 neutrons and a large amount of energy.',
        },
        {
          type: 'definition',
          term: 'Chain Reaction',
          definition: 'A self-sustaining series of nuclear reactions. The neutrons released from one fission event cause further fissions. If controlled, it produces steady energy (reactor). If uncontrolled, it releases enormous energy (bomb).',
        },
        {
          type: 'definition',
          term: 'Nuclear Reactor',
          definition: 'A device that uses controlled nuclear fission to generate heat. Key components: fuel rods (uranium), moderator (slows down neutrons), control rods (absorb neutrons to regulate the reaction), and coolant (removes heat).',
        },
        {
          type: 'definition',
          term: 'Nuclear Fusion',
          definition: 'The joining of two light nuclei to form a heavier nucleus with the release of enormous energy. Fusion requires extremely high temperatures (millions of degrees) to overcome the electrostatic repulsion between nuclei.',
          example: 'In the Sun, hydrogen nuclei fuse to form helium at about 15 million \u00B0C. This releases the energy that powers the Sun.',
        },
        {
          type: 'definition',
          term: 'Fission vs Fusion',
          definition: 'Fission splits heavy nuclei (used in reactors). Fusion joins light nuclei (occurs in stars). Both release energy according to E = mc\u00B2, but fusion releases about 4 times more energy per unit mass than fission.',
        },
      ],
    },
    {
      id: 'applications-of-radioactivity',
      title: 'Applications of Radioactivity',
      blocks: [
        {
          type: 'definition',
          term: 'Carbon Dating',
          definition: 'A method to determine the age of ancient objects using Carbon-14. Living organisms absorb Carbon-14. After death, the Carbon-14 decays with a half-life of 5730 years. By measuring the remaining Carbon-14, scientists can calculate the age.',
          example: 'If an ancient wooden tool has only 25% of the original Carbon-14 remaining, it is about 11,460 years old (2 half-lives).',
        },
        {
          type: 'definition',
          term: 'Medical Applications',
          definition: 'Radioactive isotopes are used in medicine for diagnosis and treatment. Cobalt-60 is used in radiotherapy to kill cancer cells. Technetium-99m is used as a tracer to image organs. Iodine-131 treats thyroid disorders.',
        },
        {
          type: 'definition',
          term: 'Industrial Applications',
          definition: 'Radioactivity is used in industry for testing welds and joints (radiography), measuring thickness of materials, detecting leaks in pipes, and sterilizing medical equipment using gamma rays.',
        },
        {
          type: 'definition',
          term: 'Agricultural Applications',
          definition: 'Radioactive isotopes help study nutrient absorption by plants, develop disease-resistant crop varieties through mutation breeding, and control insect pests using the sterile insect technique.',
        },
        {
          type: 'definition',
          term: 'Safety Precautions',
          definition: 'When handling radioactive materials, three principles must be followed: Time (minimize exposure time), Distance (maximize distance from source), and Shielding (use lead, concrete, or thick barriers). Always wear protective clothing and use film badges to monitor exposure.',
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
          problem: 'The half-life of Strontium-90 is 28 years. How much of a 200g sample will remain after 112 years?',
          given: [
            { label: 'Initial mass (N\u2080)', value: '200', unit: 'g' },
            { label: 'Half-life (t\u00BD)', value: '28', unit: 'years' },
            { label: 'Time (t)', value: '112', unit: 'years' },
          ],
          find: 'Remaining mass (N)',
          solution: [
            'Number of half-lives = t / t\u00BD = 112 / 28 = 4',
            'N = N\u2080 \u00D7 (1/2)^4',
            'N = 200 \u00D7 1/16',
            'N = 12.5 g',
          ],
          answer: '12.5 g remains after 112 years',
        },
        {
          type: 'numerical',
          title: 'Mass-Energy Conversion',
          problem: 'Calculate the energy released when 0.002 kg (2 grams) of mass is completely converted into energy. (c = 3 \u00D7 10\u2078 m/s)',
          given: [
            { label: 'Mass (m)', value: '0.002', unit: 'kg' },
            { label: 'Speed of light (c)', value: '3 \u00D7 10\u2078', unit: 'm/s' },
          ],
          find: 'Energy released (E)',
          solution: [
            'E = mc\u00B2',
            'E = 0.002 \u00D7 (3 \u00D7 10\u2078)\u00B2',
            'E = 0.002 \u00D7 9 \u00D7 10\u00B9\u2076',
            'E = 1.8 \u00D7 10\u00B9\u2074 J',
          ],
          answer: 'E = 1.8 \u00D7 10\u00B9\u2074 J (18 terajoules)',
        },
        {
          type: 'numerical',
          title: 'Nuclear Equation Balance',
          problem: 'Complete the nuclear equation: \u00B2\u00B3\u2078U \u2192 \u00B2\u00B3\u2074Th + ? Identify the emitted particle.',
          given: [
            { label: 'Parent nucleus', value: '\u00B2\u00B3\u2078U (Z=92, A=238)' },
            { label: 'Daughter nucleus', value: '\u00B2\u00B3\u2074Th (Z=90, A=234)' },
          ],
          find: 'Emitted particle',
          solution: [
            'Change in atomic number = 92 - 90 = 2',
            'Change in mass number = 238 - 234 = 4',
            'A particle with Z=2 and A=4 is an alpha particle (\u2074\u2078He)',
            'Equation: \u00B2\u00B3\u2078U \u2192 \u00B2\u00B3\u2074Th + \u2074\u2078\u03B1',
          ],
          answer: 'Alpha particle (\u2074\u2078He) is emitted',
        },
        {
          type: 'numerical',
          title: 'Activity Calculation',
          problem: 'A sample contains 6 \u00D7 10\u00B9\u2078 undecayed nuclei. The decay constant is 2 \u00D7 10\u207B\u2076 per second. Calculate the activity.',
          given: [
            { label: 'Number of nuclei (N)', value: '6 \u00D7 10\u00B9\u2078' },
            { label: 'Decay constant (\u03BB)', value: '2 \u00D7 10\u207B\u2076', unit: 'per second' },
          ],
          find: 'Activity (A)',
          solution: [
            'A = \u03BBN',
            'A = 2 \u00D7 10\u207B\u2076 \u00D7 6 \u00D7 10\u00B9\u2078',
            'A = 12 \u00D7 10\u00B9\u00B2',
            'A = 1.2 \u00D7 10\u00B9\u00B3 Bq',
          ],
          answer: 'Activity = 1.2 \u00D7 10\u00B9\u00B3 Bq (1.2 TBq)',
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
            { number: 1, question: 'Describe the Bohr model of the atom. How does it explain the stability of atoms?', answer: 'The Bohr model states that electrons orbit the nucleus in fixed energy levels. Electrons can only exist in specific orbits, not between them. This explains why atoms are stable \u2014 electrons do not spiral into the nucleus because they cannot lose energy continuously.' },
            { number: 2, question: 'What are isotopes? Give two examples of isotopes used in medicine.', answer: 'Isotopes are atoms of the same element with the same atomic number but different mass numbers. Examples: Cobalt-60 (used in cancer radiotherapy) and Iodine-131 (used to treat thyroid disorders and as a tracer).' },
            { number: 3, question: 'Explain the difference between alpha, beta, and gamma radiation in terms of charge, mass, and penetrating power.', answer: 'Alpha: +2 charge, mass of 4 u, stopped by paper. Beta: -1 charge, mass nearly 0, stopped by aluminum. Gamma: no charge, no mass, stopped by thick lead or concrete. Gamma has the highest penetrating power.' },
            { number: 4, question: 'The half-life of a radioactive substance is 10 days. What fraction of the original sample remains after 40 days?', answer: 'Number of half-lives = 40/10 = 4. Fraction remaining = (1/2)^4 = 1/16. So 1/16 of the original sample remains.' },
            { number: 5, question: 'Write the nuclear equation for the alpha decay of Polonium-210 (\u00B2\u00B9\u2070Po, Z=84).', answer: '\u00B2\u00B9\u2070Po \u2192 \u00B2\u2070\u2076Pb + \u2074\u2078He. Polonium-210 emits an alpha particle and becomes Lead-206. Atomic number changes from 84 to 82, mass number from 210 to 206.' },
            { number: 6, question: 'Explain the difference between nuclear fission and nuclear fusion. Which releases more energy per unit mass?', answer: 'Fission splits heavy nuclei into lighter ones (used in nuclear reactors). Fusion joins light nuclei into heavier ones (occurs in stars). Fusion releases about 4 times more energy per unit mass than fission.' },
            { number: 7, question: 'What is a chain reaction? How is it controlled in a nuclear reactor?', answer: 'A chain reaction is a self-sustaining series of fission reactions where released neutrons cause further fissions. In a reactor, control rods (made of cadmium or boron) absorb excess neutrons to maintain a steady rate of fission.' },
            { number: 8, question: 'Explain how Carbon-14 dating is used to determine the age of ancient objects. What is its maximum usable range?', answer: 'Living things absorb Carbon-14 from the atmosphere. After death, C-14 decays with a half-life of 5730 years. By measuring the ratio of C-14 to C-12, scientists calculate the age. It is reliable for objects up to about 50,000 years old.' },
            { number: 9, question: 'Describe three safety measures when working with radioactive materials.', answer: '1) Time: Minimize the time spent near the source. 2) Distance: Stay as far as possible from the source. 3) Shielding: Use appropriate barriers (lead for gamma, paper for alpha). Also wear protective clothing and use dosimeters to monitor exposure.' },
            { number: 10, question: 'A sample has an activity of 500 Bq and a decay constant of 0.01 per second. How many undecayed nuclei are present?', answer: 'Using A = \u03BBN, we get N = A/\u03BB = 500/0.01 = 50,000 undecayed nuclei.' },
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
              question: 'In the Bohr model, electrons move in:',
              options: ['Random paths', 'Fixed orbits', 'Straight lines', 'Spiral paths'],
              correctIndex: 1,
            },
            {
              id: 'q2',
              question: 'The maximum number of electrons in the second shell (n=2) is:',
              options: ['2', '6', '8', '18'],
              correctIndex: 2,
            },
            {
              id: 'q3',
              question: 'In alpha decay, the atomic number:',
              options: ['Increases by 2', 'Decreases by 2', 'Increases by 4', 'Decreases by 4'],
              correctIndex: 1,
            },
            {
              id: 'q4',
              question: 'Which radiation has no charge and no mass?',
              options: ['Alpha', 'Beta', 'Gamma', 'Neutron'],
              correctIndex: 2,
            },
            {
              id: 'q5',
              question: 'The half-life of a substance is 5 hours. After 20 hours, the fraction remaining is:',
              options: ['1/4', '1/8', '1/16', '1/32'],
              correctIndex: 2,
            },
            {
              id: 'q6',
              question: 'Nuclear fusion in the Sun converts:',
              options: ['Helium to hydrogen', 'Hydrogen to helium', 'Uranium to barium', 'Carbon to nitrogen'],
              correctIndex: 1,
            },
            {
              id: 'q7',
              question: 'In a nuclear reactor, control rods are used to:',
              options: ['Speed up neutrons', 'Absorb excess neutrons', 'Provide fuel', 'Cool the reactor'],
              correctIndex: 1,
            },
            {
              id: 'q8',
              question: 'Carbon-14 dating is useful for dating objects up to about:',
              options: ['5,000 years', '50,000 years', '500,000 years', '5 million years'],
              correctIndex: 1,
            },
            {
              id: 'q9',
              question: 'The decay constant is related to half-life by:',
              options: ['\u03BB = t\u00BD \u00D7 0.693', '\u03BB = 0.693 / t\u00BD', '\u03BB = t\u00BD / 0.693', '\u03BB = 1 / t\u00BD'],
              correctIndex: 1,
            },
            {
              id: 'q10',
              question: 'Which of the following is NOT a safety principle for radiation?',
              options: ['Time', 'Temperature', 'Distance', 'Shielding'],
              correctIndex: 1,
            },
          ],
        },
      ],
    },
  ],
};

export default chapter09En;
