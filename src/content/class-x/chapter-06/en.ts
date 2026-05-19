import type { ChapterContent } from '../../types';

const chapter06En: ChapterContent = {
  id: 'chapter-06',
  classId: 'class-x',
  title: 'Electromagnetism',
  subtitle: 'Magnetic Fields, Electromagnets, Motors, Generators, and Transformers',
  sections: [
    {
      id: 'magnetism-basics',
      title: 'Magnetism and Magnetic Fields',
      blocks: [
        {
          type: 'definition',
          term: 'Magnet',
          definition: 'A substance that attracts iron, nickel, and cobalt. Every magnet has two poles — North (N) and South (S).',
          example: 'Bar magnet, horseshoe magnet, compass needle',
        },
        {
          type: 'definition',
          term: 'Magnetic Field',
          definition: 'The region around a magnet where its magnetic force can be detected. Magnetic field lines go from North pole to South pole outside the magnet.',
        },
        {
          type: 'definition',
          term: 'Magnetic Field Lines',
          definition: 'Imaginary lines that represent the direction and strength of a magnetic field. They are closer together where the field is stronger. They never cross each other.',
        },
      ],
    },
    {
      id: 'magnetic-field-current',
      title: 'Magnetic Field Due to Electric Current',
      blocks: [
        {
          type: 'definition',
          term: 'Oersted\'s Experiment',
          definition: 'Hans Christian Oersted discovered in 1820 that a current-carrying conductor produces a magnetic field around it. A compass needle placed near the conductor deflects when current flows.',
        },
        {
          type: 'definition',
          term: 'Right Hand Grip Rule',
          definition: 'To find the direction of the magnetic field around a straight conductor: hold the conductor with your right hand with the thumb pointing in the direction of current. Your fingers curl in the direction of the magnetic field.',
        },
        {
          type: 'definition',
          term: 'Magnetic Field Around a Straight Conductor',
          definition: 'The magnetic field lines around a straight current-carrying conductor are concentric circles centred on the conductor. The strength of the field decreases with distance from the conductor.',
        },
        {
          type: 'definition',
          term: 'Magnetic Field Inside a Solenoid',
          definition: 'A solenoid is a long coil of wire carrying current. The magnetic field inside a solenoid is uniform and parallel to its axis. It acts like a bar magnet.',
        },
      ],
    },
    {
      id: 'electromagnet',
      title: 'Electromagnets',
      blocks: [
        {
          type: 'definition',
          term: 'Electromagnet',
          definition: 'A temporary magnet made by passing electric current through a coil of wire wound around a soft iron core. It loses magnetism when current is switched off.',
        },
        {
          type: 'definition',
          term: 'Factors Affecting Strength of Electromagnet',
          definition: 'The strength of an electromagnet can be increased by: (1) increasing the current, (2) increasing the number of turns of the coil, (3) using a soft iron core, (4) decreasing the air gap.',
        },
        {
          type: 'definition',
          term: 'Uses of Electromagnets',
          definition: 'Electromagnets are used in electric bells, cranes for lifting scrap iron, magnetic separators, loudspeakers, relays, and hospital MRI machines.',
        },
      ],
    },
    {
      id: 'motor-effect',
      title: 'Motor Effect (Force on a Current-Carrying Conductor)',
      blocks: [
        {
          type: 'definition',
          term: 'Motor Effect',
          definition: 'When a current-carrying conductor is placed in a magnetic field, it experiences a force. This is called the motor effect. The force is maximum when the conductor is perpendicular to the field.',
        },
        {
          type: 'formula',
          name: 'Force on a Conductor',
          formula: 'F = B I L',
          variables: [
            { symbol: 'F', meaning: 'Force on the conductor (N)' },
            { symbol: 'B', meaning: 'Magnetic flux density (T)' },
            { symbol: 'I', meaning: 'Current through the conductor (A)' },
            { symbol: 'L', meaning: 'Length of the conductor in the field (m)' },
          ],
        },
        {
          type: 'definition',
          term: 'Fleming\'s Left Hand Rule',
          definition: 'Stretch the thumb, forefinger, and middle finger of your left hand so they are mutually perpendicular. Forefinger points in the direction of Field, middle finger in the direction of Current, then thumb gives the direction of Force (motion).',
        },
      ],
    },
    {
      id: 'dc-motor',
      title: 'D.C. Motor',
      blocks: [
        {
          type: 'definition',
          term: 'D.C. Motor',
          definition: 'A device that converts electrical energy into mechanical energy using the motor effect. It works on the principle that a current-carrying coil in a magnetic field experiences a torque.',
        },
        {
          type: 'definition',
          term: 'Construction of D.C. Motor',
          definition: 'A D.C. motor consists of: (1) a rectangular coil of insulated copper wire called the armature, (2) a commutator (split ring) that reverses current direction every half rotation, (3) carbon brushes that connect the coil to the external circuit, (4) permanent magnets or electromagnets to provide the magnetic field.',
        },
        {
          type: 'definition',
          term: 'Working of D.C. Motor',
          definition: 'When current flows through the coil placed in a magnetic field, forces act on opposite sides of the coil in opposite directions, creating a torque. The commutator reverses current every half turn to keep the coil rotating in one direction.',
        },
        {
          type: 'definition',
          term: 'Uses of D.C. Motor',
          definition: 'D.C. motors are used in fans, washing machines, electric vehicles, cranes, elevators, and toys.',
        },
      ],
    },
    {
      id: 'electromagnetic-induction',
      title: 'Electromagnetic Induction',
      blocks: [
        {
          type: 'definition',
          term: 'Electromagnetic Induction',
          definition: 'The process of producing an induced EMF (voltage) in a conductor by changing the magnetic field around it. Discovered by Michael Faraday in 1831.',
        },
        {
          type: 'definition',
          term: 'Faraday\'s Law',
          definition: 'The induced EMF in a coil is directly proportional to the rate of change of magnetic flux through the coil. More rapid the change, greater the induced EMF.',
        },
        {
          type: 'definition',
          term: 'Factors Affecting Induced EMF',
          definition: 'The induced EMF can be increased by: (1) increasing the number of turns in the coil, (2) increasing the speed of the magnet or coil, (3) using a stronger magnet, (4) increasing the area of the coil.',
        },
        {
          type: 'definition',
          term: 'Lenz\'s Law',
          definition: 'The direction of the induced current is such that it opposes the change that causes it. This is a consequence of the law of conservation of energy.',
        },
      ],
    },
    {
      id: 'ac-generator',
      title: 'A.C. Generator',
      blocks: [
        {
          type: 'definition',
          term: 'A.C. Generator',
          definition: 'A device that converts mechanical energy into electrical energy (alternating current) using electromagnetic induction. Also called an alternator.',
        },
        {
          type: 'definition',
          term: 'Construction of A.C. Generator',
          definition: 'An A.C. generator consists of: (1) a rectangular coil (armature) that rotates in a magnetic field, (2) strong permanent magnets or electromagnets, (3) slip rings connected to the coil ends, (4) carbon brushes that take current to the external circuit.',
        },
        {
          type: 'definition',
          term: 'Working of A.C. Generator',
          definition: 'When the coil rotates in the magnetic field, the magnetic flux through it changes continuously. According to Faraday\'s law, this induces an alternating EMF. The current changes direction every half rotation, producing A.C.',
        },
        {
          type: 'definition',
          term: 'Uses of A.C. Generators',
          definition: 'A.C. generators are used in power stations to produce electricity, in cars as alternators to charge batteries, and in emergency backup systems.',
        },
      ],
    },
    {
      id: 'transformer',
      title: 'Transformer',
      blocks: [
        {
          type: 'definition',
          term: 'Transformer',
          definition: 'A device that changes the voltage of an alternating current. It works on the principle of mutual electromagnetic induction between two coils wound on the same soft iron core.',
        },
        {
          type: 'definition',
          term: 'Construction of Transformer',
          definition: 'A transformer has two coils — primary coil (input) and secondary coil (output) — wound on a laminated soft iron core. The primary coil is connected to the A.C. supply.',
        },
        {
          type: 'definition',
          term: 'Step-Up Transformer',
          definition: 'A transformer that increases voltage from primary to secondary. It has more turns on the secondary coil than the primary coil (Ns > Np).',
        },
        {
          type: 'definition',
          term: 'Step-Down Transformer',
          definition: 'A transformer that decreases voltage from primary to secondary. It has fewer turns on the secondary coil than the primary coil (Ns < Np).',
        },
        {
          type: 'formula',
          name: 'Transformer Equation',
          formula: 'Vs / Vp = Ns / Np',
          variables: [
            { symbol: 'Vs', meaning: 'Secondary voltage (V)' },
            { symbol: 'Vp', meaning: 'Primary voltage (V)' },
            { symbol: 'Ns', meaning: 'Number of turns in secondary coil' },
            { symbol: 'Np', meaning: 'Number of turns in primary coil' },
          ],
        },
        {
          type: 'formula',
          name: 'Ideal Transformer (Power Equation)',
          formula: 'Vp × Ip = Vs × Is',
          variables: [
            { symbol: 'Vp', meaning: 'Primary voltage (V)' },
            { symbol: 'Ip', meaning: 'Primary current (A)' },
            { symbol: 'Vs', meaning: 'Secondary voltage (V)' },
            { symbol: 'Is', meaning: 'Secondary current (A)' },
          ],
        },
        {
          type: 'definition',
          term: 'Energy Loss in Transformer',
          definition: 'Real transformers are not 100% efficient. Energy is lost due to: (1) heating of coils (copper loss), (2) eddy currents in the core, (3) incomplete magnetic flux linkage, (4) hysteresis in the iron core.',
        },
      ],
    },
    {
      id: 'interactive-simulations',
      title: 'Interactive Simulations',
      blocks: [
        {
          type: 'interactive',
          component: 'ElectromagnetSimulation',
        },
      ],
    },
    {
      id: 'numerical-examples',
      title: 'Solved Numericals',
      blocks: [
        {
          type: 'numerical',
          title: 'Force on a Conductor',
          problem: 'A conductor of length 0.5 m carrying a current of 4 A is placed in a magnetic field of flux density 0.2 T. Find the force on the conductor when it is perpendicular to the field.',
          given: [
            { label: 'Length (L)', value: '0.5', unit: 'm' },
            { label: 'Current (I)', value: '4', unit: 'A' },
            { label: 'Flux density (B)', value: '0.2', unit: 'T' },
          ],
          find: 'Force (F)',
          solution: [
            'F = B × I × L',
            'F = 0.2 × 4 × 0.5',
            'F = 0.4 N',
          ],
          answer: 'F = 0.4 N',
        },
        {
          type: 'numerical',
          title: 'Transformer Calculation',
          problem: 'A step-up transformer has 100 turns on the primary coil and 500 turns on the secondary coil. If the primary voltage is 12 V, find the secondary voltage.',
          given: [
            { label: 'Primary turns (Np)', value: '100', unit: '' },
            { label: 'Secondary turns (Ns)', value: '500', unit: '' },
            { label: 'Primary voltage (Vp)', value: '12', unit: 'V' },
          ],
          find: 'Secondary voltage (Vs)',
          solution: [
            'Vs / Vp = Ns / Np',
            'Vs / 12 = 500 / 100',
            'Vs / 12 = 5',
            'Vs = 12 × 5',
            'Vs = 60 V',
          ],
          answer: 'Vs = 60 V',
        },
        {
          type: 'numerical',
          title: 'Transformer Current',
          problem: 'A transformer converts 240 V supply to 12 V. If the current in the secondary coil is 2 A, find the current in the primary coil (assume ideal transformer).',
          given: [
            { label: 'Primary voltage (Vp)', value: '240', unit: 'V' },
            { label: 'Secondary voltage (Vs)', value: '12', unit: 'V' },
            { label: 'Secondary current (Is)', value: '2', unit: 'A' },
          ],
          find: 'Primary current (Ip)',
          solution: [
            'Vp × Ip = Vs × Is',
            '240 × Ip = 12 × 2',
            '240 × Ip = 24',
            'Ip = 24 / 240',
            'Ip = 0.1 A',
          ],
          answer: 'Ip = 0.1 A',
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
            { number: 1, question: 'State Oersted\'s experiment and its significance.', answer: 'Oersted discovered that a current-carrying conductor produces a magnetic field around it. A compass needle placed near the conductor deflects when current flows. This established the relationship between electricity and magnetism.' },
            { number: 2, question: 'State Fleming\'s Left Hand Rule.', answer: 'Stretch the thumb, forefinger, and middle finger of your left hand mutually perpendicular. Forefinger = Field, middle finger = Current, thumb = Force (motion).' },
            { number: 3, question: 'Explain the working of a D.C. motor.', answer: 'A current-carrying coil in a magnetic field experiences a torque. The commutator reverses current every half turn, keeping the coil rotating in one direction. It converts electrical energy to mechanical energy.' },
            { number: 4, question: 'What is electromagnetic induction? State Faraday\'s law.', answer: 'Electromagnetic induction is the production of EMF in a conductor due to changing magnetic flux. Faraday\'s law: induced EMF is proportional to the rate of change of magnetic flux.' },
            { number: 5, question: 'Differentiate between a step-up and step-down transformer.', answer: 'Step-up transformer increases voltage (Ns > Np). Step-down transformer decreases voltage (Ns < Np).' },
            { number: 6, question: 'A transformer has 200 primary turns and 800 secondary turns. If the primary voltage is 50 V, find the secondary voltage.', answer: 'Vs = Vp × (Ns/Np) = 50 × (800/200) = 50 × 4 = 200 V' },
            { number: 7, question: 'What is Lenz\'s law? Give an example.', answer: 'Lenz\'s law states that the induced current opposes the change causing it. When a magnet moves towards a coil, the induced current creates a magnetic field that repels the magnet.' },
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
              question: 'The magnetic field inside a solenoid is:',
              options: ['Zero', 'Uniform and parallel to axis', 'Non-uniform', 'Perpendicular to axis'],
              correctIndex: 1,
              explanation: 'The magnetic field inside a solenoid is uniform and parallel to its axis, making it act like a bar magnet.',
            },
            {
              id: 'q2',
              question: 'Fleming\'s Left Hand Rule is used to find the direction of:',
              options: ['Induced current', 'Force on a conductor', 'Magnetic field', 'Electric current'],
              correctIndex: 1,
              explanation: 'Fleming\'s Left Hand Rule gives the direction of force on a current-carrying conductor in a magnetic field.',
            },
            {
              id: 'q3',
              question: 'The force on a conductor of length 0.5 m carrying 3 A in a field of 0.4 T is:',
              options: ['0.3 N', '0.6 N', '0.9 N', '1.2 N'],
              correctIndex: 1,
              explanation: 'F = BIL = 0.4 × 3 × 0.5 = 0.6 N',
            },
            {
              id: 'q4',
              question: 'A D.C. motor converts:',
              options: ['Mechanical to electrical energy', 'Electrical to mechanical energy', 'Chemical to electrical energy', 'Heat to electrical energy'],
              correctIndex: 1,
              explanation: 'A D.C. motor converts electrical energy into mechanical energy.',
            },
            {
              id: 'q5',
              question: 'Electromagnetic induction was discovered by:',
              options: ['Oersted', 'Faraday', 'Fleming', 'Newton'],
              correctIndex: 1,
              explanation: 'Michael Faraday discovered electromagnetic induction in 1831.',
            },
            {
              id: 'q6',
              question: 'Lenz\'s law is based on the law of conservation of:',
              options: ['Charge', 'Mass', 'Energy', 'Momentum'],
              correctIndex: 2,
              explanation: 'Lenz\'s law is a consequence of the law of conservation of energy.',
            },
            {
              id: 'q7',
              question: 'A step-up transformer has:',
              options: ['Ns > Np', 'Ns < Np', 'Ns = Np', 'No secondary coil'],
              correctIndex: 0,
              explanation: 'A step-up transformer has more turns on the secondary coil than the primary coil.',
            },
            {
              id: 'q8',
              question: 'An A.C. generator produces:',
              options: ['Direct current', 'Alternating current', 'Static electricity', 'No current'],
              correctIndex: 1,
              explanation: 'An A.C. generator produces alternating current using electromagnetic induction.',
            },
            {
              id: 'q9',
              question: 'The factor that does NOT affect the strength of an electromagnet is:',
              options: ['Number of turns', 'Current', 'Colour of wire', 'Type of core'],
              correctIndex: 2,
              explanation: 'The colour of wire does not affect the strength of an electromagnet.',
            },
            {
              id: 'q10',
              question: 'If a transformer has Vp = 100V, Np = 50, Ns = 200, then Vs is:',
              options: ['25 V', '200 V', '400 V', '100 V'],
              correctIndex: 2,
              explanation: 'Vs = Vp × (Ns/Np) = 100 × (200/50) = 100 × 4 = 400 V',
            },
          ],
        },
      ],
    },
  ],
};

export default chapter06En;
