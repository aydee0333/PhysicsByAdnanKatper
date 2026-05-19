import type { ChapterContent } from '../../types';

const chapter04En: ChapterContent = {
  id: 'chapter-04',
  classId: 'class-x',
  title: 'Electrostatics',
  subtitle: 'Electric Charge, Coulomb\'s Law, and Electric Fields',
  sections: [
    {
      id: 'electric-charge',
      title: 'Electric Charge',
      blocks: [
        {
          type: 'definition',
          term: 'Electric Charge',
          definition: 'Electric charge is a fundamental property of matter. There are two types of electric charges: positive (+) and negative (-). Like charges repel each other and unlike charges attract each other.',
        },
        {
          type: 'definition',
          term: 'Conservation of Charge',
          definition: 'The total electric charge in an isolated system remains constant. Charge can neither be created nor destroyed, only transferred from one body to another.',
        },
        {
          type: 'definition',
          term: 'Unit of Charge',
          definition: 'The SI unit of electric charge is the coulomb (C). The charge of one electron is -1.6 x 10^-19 C and the charge of one proton is +1.6 x 10^-19 C.',
        },
        {
          type: 'definition',
          term: 'Elementary Charge',
          definition: 'The smallest unit of charge is called elementary charge. e = 1.6 x 10^-19 C. Any charge is an integer multiple of this elementary charge.',
        },
      ],
    },
    {
      id: 'charging-methods',
      title: 'Methods of Charging',
      blocks: [
        {
          type: 'definition',
          term: 'Charging by Friction',
          definition: 'When two different materials are rubbed together, electrons transfer from one material to the other. The material that loses electrons becomes positively charged and the material that gains electrons becomes negatively charged.',
          example: 'Rubbing a glass rod with silk cloth: glass rod becomes positive, silk becomes negative. Rubbing a plastic rod with fur: plastic rod becomes negative, fur becomes positive.',
        },
        {
          type: 'definition',
          term: 'Charging by Conduction',
          definition: 'When a charged body is brought in contact with an uncharged body, charge transfers from the charged body to the uncharged body. Both bodies get the same type of charge.',
        },
        {
          type: 'definition',
          term: 'Charging by Induction',
          definition: 'When a charged body is brought near an uncharged body without touching it, the charges in the uncharged body rearrange. The near end gets opposite charge and the far end gets the same charge. If the body is grounded, it gets a net charge opposite to the inducing charge.',
        },
      ],
    },
    {
      id: 'conductors-insulators',
      title: 'Conductors and Insulators',
      blocks: [
        {
          type: 'definition',
          term: 'Conductors',
          definition: 'Materials that allow electric charge to flow through them easily are called conductors. They have free electrons that can move easily. Examples: metals like copper, aluminum, silver, and human body.',
        },
        {
          type: 'definition',
          term: 'Insulators',
          definition: 'Materials that do not allow electric charge to flow through them are called insulators. Their electrons are tightly bound to atoms and cannot move freely. Examples: rubber, glass, plastic, wood, and dry air.',
        },
        {
          type: 'definition',
          term: 'Semiconductors',
          definition: 'Materials whose conductivity is between conductors and insulators are called semiconductors. Their conductivity increases with temperature. Examples: silicon, germanium.',
        },
      ],
    },
    {
      id: 'coulombs-law',
      title: 'Coulomb\'s Law',
      blocks: [
        {
          type: 'definition',
          term: 'Coulomb\'s Law',
          definition: 'The electrostatic force between two point charges is directly proportional to the product of the charges and inversely proportional to the square of the distance between them.',
        },
        {
          type: 'formula',
          name: 'Coulomb\'s Law',
          formula: 'F = kq₁q₂ / r²',
          variables: [
            { symbol: 'F', meaning: 'Electrostatic force (N)' },
            { symbol: 'k', meaning: 'Coulomb\'s constant = 9 x 10^9 Nm²/C²' },
            { symbol: 'q₁, q₂', meaning: 'Magnitudes of the two charges (C)' },
            { symbol: 'r', meaning: 'Distance between the charges (m)' },
          ],
        },
        {
          type: 'definition',
          term: 'Coulomb\'s Constant',
          definition: 'The Coulomb\'s constant k = 1/(4πε₀) = 9 x 10^9 Nm²/C². Here ε₀ is the permittivity of free space = 8.85 x 10^-12 C²/Nm².',
        },
        {
          type: 'example',
          title: 'Force Between Two Charges',
          problem: 'Two charges of +3 μC and -5 μC are placed 0.2 m apart. Find the force between them. (k = 9 x 10^9 Nm²/C²)',
          solution: [
            'Given: q₁ = 3 x 10^-6 C, q₂ = -5 x 10^-6 C, r = 0.2 m',
            'Using F = kq₁q₂ / r²',
            'F = (9 x 10^9)(3 x 10^-6)(5 x 10^-6) / (0.2)²',
            'F = (9 x 10^9)(15 x 10^-12) / 0.04',
            'F = 135 x 10^-3 / 0.04',
            'F = 3.375 N (attractive force)',
          ],
          answer: 'F = 3.375 N (attractive)',
        },
      ],
    },
    {
      id: 'electric-field',
      title: 'Electric Field',
      blocks: [
        {
          type: 'definition',
          term: 'Electric Field',
          definition: 'The region around a charged body where another charged body experiences an electrostatic force is called an electric field. It is a vector quantity.',
        },
        {
          type: 'formula',
          name: 'Electric Field Intensity',
          formula: 'E = F / q',
          variables: [
            { symbol: 'E', meaning: 'Electric field intensity (N/C)' },
            { symbol: 'F', meaning: 'Force experienced by test charge (N)' },
            { symbol: 'q', meaning: 'Magnitude of test charge (C)' },
          ],
        },
        {
          type: 'formula',
          name: 'Electric Field Due to Point Charge',
          formula: 'E = kQ / r²',
          variables: [
            { symbol: 'E', meaning: 'Electric field intensity (N/C)' },
            { symbol: 'k', meaning: 'Coulomb\'s constant = 9 x 10^9 Nm²/C²' },
            { symbol: 'Q', meaning: 'Source charge (C)' },
            { symbol: 'r', meaning: 'Distance from charge (m)' },
          ],
        },
        {
          type: 'definition',
          term: 'Electric Field Lines',
          definition: 'Electric field lines are imaginary lines that represent the direction and strength of an electric field. They start from positive charges and end at negative charges. They never cross each other.',
        },
        {
          type: 'definition',
          term: 'Properties of Electric Field Lines',
          definition: '1) Field lines start from positive charge and end at negative charge. 2) Field lines never cross each other. 3) The density of field lines represents the strength of the field. 4) Field lines are perpendicular to the surface of a conductor.',
        },
      ],
    },
    {
      id: 'electric-potential',
      title: 'Electric Potential',
      blocks: [
        {
          type: 'definition',
          term: 'Electric Potential',
          definition: 'Electric potential at a point in an electric field is the work done in bringing a unit positive charge from infinity to that point. It is a scalar quantity.',
        },
        {
          type: 'formula',
          name: 'Electric Potential',
          formula: 'V = W / q',
          variables: [
            { symbol: 'V', meaning: 'Electric potential (V)' },
            { symbol: 'W', meaning: 'Work done (J)' },
            { symbol: 'q', meaning: 'Charge (C)' },
          ],
        },
        {
          type: 'formula',
          name: 'Potential Due to Point Charge',
          formula: 'V = kQ / r',
          variables: [
            { symbol: 'V', meaning: 'Electric potential (V)' },
            { symbol: 'k', meaning: 'Coulomb\'s constant = 9 x 10^9 Nm²/C²' },
            { symbol: 'Q', meaning: 'Source charge (C)' },
            { symbol: 'r', meaning: 'Distance from charge (m)' },
          ],
        },
        {
          type: 'definition',
          term: 'Potential Difference',
          definition: 'The potential difference between two points is the work done in moving a unit positive charge from one point to the other. Unit: volt (V). 1V = 1 J/C.',
        },
      ],
    },
    {
      id: 'capacitance',
      title: 'Capacitance',
      blocks: [
        {
          type: 'definition',
          term: 'Capacitor',
          definition: 'A capacitor is a device that stores electric charge and energy. It consists of two conductors separated by an insulating material called dielectric.',
        },
        {
          type: 'definition',
          term: 'Capacitance',
          definition: 'Capacitance is the ability of a capacitor to store charge. It is defined as the ratio of charge stored to the potential difference across the capacitor.',
        },
        {
          type: 'formula',
          name: 'Capacitance',
          formula: 'C = Q / V',
          variables: [
            { symbol: 'C', meaning: 'Capacitance (F)' },
            { symbol: 'Q', meaning: 'Charge stored (C)' },
            { symbol: 'V', meaning: 'Potential difference (V)' },
          ],
        },
        {
          type: 'definition',
          term: 'Unit of Capacitance',
          definition: 'The SI unit of capacitance is farad (F). 1 farad = 1 coulomb/volt. Common sub-units: microfarad (μF), nanofarad (nF), picofarad (pF).',
        },
        {
          type: 'formula',
          name: 'Parallel Plate Capacitor',
          formula: 'C = ε₀A / d',
          variables: [
            { symbol: 'C', meaning: 'Capacitance (F)' },
            { symbol: 'ε₀', meaning: 'Permittivity of free space = 8.85 x 10^-12 C²/Nm²' },
            { symbol: 'A', meaning: 'Area of each plate (m²)' },
            { symbol: 'd', meaning: 'Distance between plates (m)' },
          ],
        },
      ],
    },
    {
      id: 'applications',
      title: 'Applications of Electrostatics',
      blocks: [
        {
          type: 'definition',
          term: 'Lightning Rod',
          definition: 'A lightning rod is a metal rod installed on top of buildings to protect them from lightning. It provides a low-resistance path for the lightning current to flow safely into the ground.',
        },
        {
          type: 'definition',
          term: 'Photocopier',
          definition: 'A photocopier uses electrostatic charges to copy documents. A drum is charged, light reflected from the document creates an image on the drum, toner sticks to the charged areas, and then transfers to paper.',
        },
        {
          type: 'definition',
          term: 'Electrostatic Precipitator',
          definition: 'An electrostatic precipitator removes smoke and dust particles from factory chimneys. The particles are charged and then attracted to collection plates, reducing air pollution.',
        },
        {
          type: 'definition',
          term: 'Paint Spraying',
          definition: 'In electrostatic painting, the paint droplets are given an electric charge. They are attracted to the object being painted, which is given the opposite charge. This gives a uniform coating and reduces paint wastage.',
        },
      ],
    },
    {
      id: 'interactive-simulations',
      title: 'Interactive Simulations',
      blocks: [
        {
          type: 'interactive',
          component: 'ChargeSimulation',
        },
        {
          type: 'interactive',
          component: 'ElectricFieldSim',
        },
      ],
    },
    {
      id: 'numerical-examples',
      title: 'Solved Numericals',
      blocks: [
        {
          type: 'numerical',
          title: 'Coulomb\'s Law Calculation',
          problem: 'Two-point charges of +4 μC and -6 μC are placed 30 cm apart in air. Find the force between them. (k = 9 x 10^9 Nm²/C²)',
          given: [
            { label: 'q₁', value: '+4 x 10^-6', unit: 'C' },
            { label: 'q₂', value: '-6 x 10^-6', unit: 'C' },
            { label: 'r', value: '0.30', unit: 'm' },
            { label: 'k', value: '9 x 10^9', unit: 'Nm²/C²' },
          ],
          find: 'Electrostatic force (F)',
          solution: [
            'F = kq₁q₂ / r²',
            'F = (9 x 10^9)(4 x 10^-6)(6 x 10^-6) / (0.30)²',
            'F = (9 x 10^9)(24 x 10^-12) / 0.09',
            'F = 216 x 10^-3 / 0.09',
            'F = 2.4 N',
          ],
          answer: 'F = 2.4 N (attractive force since charges are opposite)',
        },
        {
          type: 'numerical',
          title: 'Electric Field Calculation',
          problem: 'A charge of 5 μC experiences a force of 0.2 N in an electric field. Find the electric field intensity.',
          given: [
            { label: 'q', value: '5 x 10^-6', unit: 'C' },
            { label: 'F', value: '0.2', unit: 'N' },
          ],
          find: 'Electric field intensity (E)',
          solution: [
            'E = F / q',
            'E = 0.2 / (5 x 10^-6)',
            'E = 40,000 N/C',
            'E = 4 x 10^4 N/C',
          ],
          answer: 'E = 4 x 10^4 N/C',
        },
        {
          type: 'numerical',
          title: 'Capacitor Charge',
          problem: 'A capacitor of capacitance 100 μF is connected across a 12V battery. Find the charge stored.',
          given: [
            { label: 'C', value: '100 x 10^-6', unit: 'F' },
            { label: 'V', value: '12', unit: 'V' },
          ],
          find: 'Charge stored (Q)',
          solution: [
            'Q = CV',
            'Q = (100 x 10^-6)(12)',
            'Q = 1200 x 10^-6',
            'Q = 1.2 x 10^-3 C',
          ],
          answer: 'Q = 1.2 x 10^-3 C = 1.2 mC',
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
            { number: 1, question: 'State Coulomb\'s law and write its mathematical formula.', answer: 'The electrostatic force between two point charges is directly proportional to the product of charges and inversely proportional to the square of distance between them. F = kq₁q₂/r²' },
            { number: 2, question: 'What is the difference between conductors and insulators? Give two examples of each.', answer: 'Conductors allow charge to flow easily (copper, aluminum). Insulators do not allow charge to flow (rubber, glass).' },
            { number: 3, question: 'Explain charging by induction.', answer: 'When a charged body is brought near an uncharged body without touching, charges rearrange. Near end gets opposite charge, far end gets same charge. If grounded, body gets net opposite charge.' },
            { number: 4, question: 'What is an electric field? How is its direction determined?', answer: 'The region around a charge where force is experienced. Direction is the direction of force on a positive test charge.' },
            { number: 5, question: 'Define capacitance and state its SI unit.', answer: 'Capacitance is the ratio of charge stored to potential difference. SI unit is farad (F).' },
            { number: 6, question: 'Two charges of +5 μC and +8 μC repel each other with a force of 10 N. Find the distance between them.', answer: 'Using F = kq₁q₂/r²: r² = kq₁q₂/F = (9×10^9)(5×10^-6)(8×10^-6)/10 = 0.036. r = 0.19 m = 19 cm' },
            { number: 7, question: 'How does a lightning rod protect a building?', answer: 'A lightning rod provides a low-resistance path for lightning current to flow safely into the ground, protecting the building from damage.' },
            { number: 8, question: 'Calculate the capacitance of a parallel plate capacitor with plate area 0.5 m² and plate separation 2 mm. (ε₀ = 8.85 x 10^-12 C²/Nm²)', answer: 'C = ε₀A/d = (8.85×10^-12)(0.5)/(0.002) = 2.21 × 10^-12 F = 2.21 pF' },
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
              question: 'The SI unit of electric charge is:',
              options: ['Ampere', 'Volt', 'Coulomb', 'Farad'],
              correctIndex: 2,
              explanation: 'The SI unit of electric charge is the coulomb (C), named after Charles-Augustin de Coulomb.',
            },
            {
              id: 'q2',
              question: 'When a glass rod is rubbed with silk cloth:',
              options: ['Both become positive', 'Both become negative', 'Glass becomes positive, silk becomes negative', 'Glass becomes negative, silk becomes positive'],
              correctIndex: 2,
              explanation: 'Glass loses electrons and becomes positive. Silk gains electrons and becomes negative.',
            },
            {
              id: 'q3',
              question: 'Coulomb\'s law is valid for:',
              options: ['Only positive charges', 'Only negative charges', 'Point charges only', 'All types of charges'],
              correctIndex: 2,
              explanation: 'Coulomb\'s law is strictly valid for point charges. For extended bodies, it can be applied when the distance is much larger than the size of the bodies.',
            },
            {
              id: 'q4',
              question: 'The value of Coulomb\'s constant k is:',
              options: ['9 x 10^6 Nm²/C²', '9 x 10^9 Nm²/C²', '9 x 10^12 Nm²/C²', '9 x 10^3 Nm²/C²'],
              correctIndex: 1,
              explanation: 'k = 1/(4πε₀) = 9 x 10^9 Nm²/C²',
            },
            {
              id: 'q5',
              question: 'Electric field lines:',
              options: ['Start from negative charges', 'Start from positive charges', 'Can cross each other', 'Are always curved'],
              correctIndex: 1,
              explanation: 'Electric field lines start from positive charges and end at negative charges. They never cross each other.',
            },
            {
              id: 'q6',
              question: 'The SI unit of electric potential is:',
              options: ['Newton', 'Joule', 'Volt', 'Watt'],
              correctIndex: 2,
              explanation: 'The SI unit of electric potential is volt (V). 1V = 1 J/C.',
            },
            {
              id: 'q7',
              question: 'Capacitance is measured in:',
              options: ['Coulombs', 'Volts', 'Amperes', 'Farads'],
              correctIndex: 3,
              explanation: 'Capacitance is measured in farads (F). C = Q/V.',
            },
            {
              id: 'q8',
              question: 'Which of the following is a good conductor?',
              options: ['Rubber', 'Glass', 'Copper', 'Plastic'],
              correctIndex: 2,
              explanation: 'Copper is a metal with free electrons that can move easily, making it a good conductor.',
            },
            {
              id: 'q9',
              question: 'If the distance between two charges is doubled, the force becomes:',
              options: ['Double', 'Half', 'One-fourth', 'Four times'],
              correctIndex: 2,
              explanation: 'From Coulomb\'s law, F ∝ 1/r². If r is doubled, F becomes 1/(2²) = 1/4 of the original force.',
            },
            {
              id: 'q10',
              question: 'An electrostatic precipitator is used to:',
              options: ['Generate electricity', 'Remove dust from factory chimneys', 'Store electric charge', 'Measure electric current'],
              correctIndex: 1,
              explanation: 'An electrostatic precipitator uses electrostatic charges to remove smoke and dust particles from factory emissions, reducing air pollution.',
            },
          ],
        },
      ],
    },
  ],
};

export default chapter04En;
