import type { ChapterContent } from '../../types';

const chapter07En: ChapterContent = {
  id: 'chapter-07',
  classId: 'class-x',
  title: 'Basic Electronics',
  subtitle: 'Semiconductors, Diodes, Transistors, and Logic Gates',
  sections: [
    {
      id: 'introduction-to-electronics',
      title: 'Introduction to Electronics',
      blocks: [
        {
          type: 'definition',
          term: 'Electronics',
          definition: 'The branch of physics that deals with the study and control of the flow of electrons in devices such as semiconductors, transistors, and integrated circuits.',
        },
        {
          type: 'definition',
          term: 'Electrical vs Electronic Devices',
          definition: 'Electrical devices (like fans and heaters) convert electrical energy into other forms such as heat or light. Electronic devices (like computers and radios) control the flow of electrons to process information or signals.',
          example: 'A bulb is an electrical device. A transistor radio is an electronic device.',
        },
      ],
    },
    {
      id: 'conductors-insulators-semiconductors',
      title: 'Conductors, Insulators, and Semiconductors',
      blocks: [
        {
          type: 'definition',
          term: 'Conductors',
          definition: 'Materials that allow electric current to flow through them easily. They have a large number of free electrons. Examples include copper, silver, aluminium, and iron.',
          example: 'Copper wires are used in household wiring because copper is an excellent conductor.',
        },
        {
          type: 'definition',
          term: 'Insulators',
          definition: 'Materials that do not allow electric current to flow through them. They have very few or no free electrons. Examples include rubber, glass, plastic, and wood.',
          example: 'Plastic coating on wires prevents electric shock.',
        },
        {
          type: 'definition',
          term: 'Semiconductors',
          definition: 'Materials whose electrical conductivity lies between conductors and insulators. Their conductivity can be controlled by adding impurities, temperature, or electric field. Examples include silicon (Si) and germanium (Ge).',
          example: 'Silicon is the most commonly used semiconductor in modern electronics.',
        },
        {
          type: 'definition',
          term: 'Band Theory',
          definition: 'According to band theory, solids have energy bands: valence band (where electrons are bound to atoms) and conduction band (where electrons move freely). The gap between them is the energy gap.',
          example: 'In conductors, the valence and conduction bands overlap. In semiconductors, the energy gap is small (~1 eV). In insulators, the gap is very large.',
        },
      ],
    },
    {
      id: 'doping',
      title: 'Doping of Semiconductors',
      blocks: [
        {
          type: 'definition',
          term: 'Doping',
          definition: 'The process of adding a small amount of impurity to a pure semiconductor to increase its electrical conductivity. A pure semiconductor is called an intrinsic semiconductor, and a doped semiconductor is called an extrinsic semiconductor.',
        },
        {
          type: 'definition',
          term: 'N-Type Semiconductor',
          definition: 'When a small amount of pentavalent impurity (like phosphorus or arsenic with 5 valence electrons) is added to pure silicon, extra free electrons are produced. The majority charge carriers are electrons. This is called an n-type semiconductor.',
          example: 'Silicon doped with phosphorus (P) gives n-type semiconductor. The 5th electron of phosphorus is free to move.',
        },
        {
          type: 'definition',
          term: 'P-Type Semiconductor',
          definition: 'When a small amount of trivalent impurity (like boron or aluminium with 3 valence electrons) is added to pure silicon, holes (positive charge carriers) are created. The majority charge carriers are holes. This is called a p-type semiconductor.',
          example: 'Silicon doped with boron (B) gives p-type semiconductor. Boron creates a deficiency of electrons called a hole.',
        },
      ],
    },
    {
      id: 'p-n-junction',
      title: 'P-N Junction Diode',
      blocks: [
        {
          type: 'definition',
          term: 'P-N Junction',
          definition: 'When a p-type and n-type semiconductor are joined together, the junction formed between them is called a p-n junction. It is the basic building block of most electronic devices.',
        },
        {
          type: 'definition',
          term: 'Depletion Region',
          definition: 'At the junction, electrons from the n-side cross over to the p-side and combine with holes. This creates a thin region on both sides of the junction that has no free charge carriers. This region is called the depletion region.',
        },
        {
          type: 'definition',
          term: 'Forward Bias',
          definition: 'When the positive terminal of a battery is connected to the p-side and negative terminal to the n-side of a p-n junction, it is called forward bias. In forward bias, the depletion region becomes narrow and current flows easily.',
          example: 'A forward-biased diode acts like a closed switch — current flows through it.',
        },
        {
          type: 'definition',
          term: 'Reverse Bias',
          definition: 'When the positive terminal of a battery is connected to the n-side and negative terminal to the p-side of a p-n junction, it is called reverse bias. In reverse bias, the depletion region becomes wider and no current flows.',
          example: 'A reverse-biased diode acts like an open switch — no current flows through it.',
        },
        {
          type: 'definition',
          term: 'Diode',
          definition: 'An electronic component made from a p-n junction that allows current to flow in only one direction (from p to n). It has two terminals: anode (p-side) and cathode (n-side).',
          example: 'The symbol of a diode is an arrow pointing from anode to cathode with a vertical bar at the cathode end.',
        },
      ],
    },
    {
      id: 'rectification',
      title: 'Rectification',
      blocks: [
        {
          type: 'definition',
          term: 'Rectification',
          definition: 'The process of converting alternating current (AC) into direct current (DC) is called rectification. A diode is used as a rectifier.',
        },
        {
          type: 'definition',
          term: 'Half-Wave Rectifier',
          definition: 'A half-wave rectifier uses a single diode to convert AC into DC. It allows only one half-cycle (positive or negative) of the AC signal to pass through, blocking the other half. The output is pulsating DC.',
          example: 'In a half-wave rectifier, during the positive half-cycle, the diode is forward biased and current flows. During the negative half-cycle, the diode is reverse biased and no current flows.',
        },
        {
          type: 'definition',
          term: 'Full-Wave Rectifier',
          definition: 'A full-wave rectifier uses two or four diodes to convert both half-cycles of AC into DC. It provides a smoother output than a half-wave rectifier.',
          example: 'A bridge rectifier uses four diodes arranged in a bridge configuration to rectify both half-cycles.',
        },
      ],
    },
    {
      id: 'transistor',
      title: 'Transistor',
      blocks: [
        {
          type: 'definition',
          term: 'Transistor',
          definition: 'A transistor is a three-terminal electronic device made by joining three layers of semiconductor material. It can amplify signals and act as a switch. The three terminals are: emitter (E), base (B), and collector (C).',
          example: 'Transistors are the building blocks of computers, mobile phones, and all modern electronic devices.',
        },
        {
          type: 'definition',
          term: 'NPN Transistor',
          definition: 'An NPN transistor has a thin layer of p-type semiconductor sandwiched between two n-type semiconductors. The emitter is n-type, base is p-type, and collector is n-type. Current flows from collector to emitter.',
        },
        {
          type: 'definition',
          term: 'PNP Transistor',
          definition: 'A PNP transistor has a thin layer of n-type semiconductor sandwiched between two p-type semiconductors. The emitter is p-type, base is n-type, and collector is p-type. Current flows from emitter to collector.',
        },
      ],
    },
    {
      id: 'transistor-as-switch',
      title: 'Transistor as a Switch',
      blocks: [
        {
          type: 'definition',
          term: 'Transistor as Switch',
          definition: 'A transistor can act as an electronic switch. When no base current flows, the transistor is in cutoff state (OFF) and no current flows between collector and emitter. When sufficient base current flows, the transistor is in saturation state (ON) and current flows freely.',
        },
        {
          type: 'definition',
          term: 'Cutoff State',
          definition: 'When the base-emitter voltage is less than 0.7V (for silicon), the transistor is OFF. No collector current flows. The transistor acts as an open switch between collector and emitter.',
        },
        {
          type: 'definition',
          term: 'Saturation State',
          definition: 'When sufficient base current is supplied, the transistor is fully ON. Maximum collector current flows. The transistor acts as a closed switch between collector and emitter.',
          example: 'In digital circuits, transistors switch between OFF (representing 0) and ON (representing 1) states to process binary data.',
        },
      ],
    },
    {
      id: 'transistor-as-amplifier',
      title: 'Transistor as an Amplifier',
      blocks: [
        {
          type: 'definition',
          term: 'Amplifier',
          definition: 'An amplifier is a device that increases the strength (amplitude) of a weak signal. A transistor can amplify small input signals into larger output signals.',
        },
        {
          type: 'definition',
          term: 'Amplification',
          definition: 'When a small AC signal is applied to the base of a transistor through a coupling capacitor, the transistor produces a larger version of the signal at the collector. This is called amplification.',
          example: 'In a radio, the weak signal received by the antenna is amplified by transistors to produce a loud sound from the speaker.',
        },
        {
          type: 'formula',
          name: 'Current Gain (Beta)',
          formula: 'β = Ic / Ib',
          variables: [
            { symbol: 'β', meaning: 'Current gain of transistor' },
            { symbol: 'Ic', meaning: 'Collector current (A)' },
            { symbol: 'Ib', meaning: 'Base current (A)' },
          ],
        },
      ],
    },
    {
      id: 'logic-gates',
      title: 'Logic Gates',
      blocks: [
        {
          type: 'definition',
          term: 'Logic Gate',
          definition: 'A logic gate is an electronic circuit that has one or more inputs and one output. It performs a specific logical operation. Logic gates are the fundamental building blocks of digital electronics and computers.',
        },
        {
          type: 'definition',
          term: 'AND Gate',
          definition: 'An AND gate gives a HIGH output (1) only when ALL its inputs are HIGH (1). If any input is LOW (0), the output is LOW (0). Boolean expression: Y = A · B',
          example: 'Truth table: Inputs 0,0→0; 0,1→0; 1,0→0; 1,1→1',
        },
        {
          type: 'definition',
          term: 'OR Gate',
          definition: 'An OR gate gives a HIGH output (1) when ANY of its inputs is HIGH (1). It gives LOW (0) only when all inputs are LOW. Boolean expression: Y = A + B',
          example: 'Truth table: Inputs 0,0→0; 0,1→1; 1,0→1; 1,1→1',
        },
        {
          type: 'definition',
          term: 'NOT Gate',
          definition: 'A NOT gate has one input and one output. It inverts the input signal. If input is HIGH (1), output is LOW (0) and vice versa. It is also called an inverter. Boolean expression: Y = Ā',
          example: 'Truth table: Input 0→1; Input 1→0',
        },
        {
          type: 'definition',
          term: 'NAND Gate',
          definition: 'A NAND gate is a combination of an AND gate followed by a NOT gate. It gives LOW (0) output only when ALL inputs are HIGH. Otherwise, the output is HIGH. Boolean expression: Y = (A · B)̄',
          example: 'Truth table: Inputs 0,0→1; 0,1→1; 1,0→1; 1,1→0',
        },
        {
          type: 'definition',
          term: 'NOR Gate',
          definition: 'A NOR gate is a combination of an OR gate followed by a NOT gate. It gives HIGH (1) output only when ALL inputs are LOW. Otherwise, the output is LOW. Boolean expression: Y = (A + B)̄',
          example: 'Truth table: Inputs 0,0→1; 0,1→0; 1,0→0; 1,1→0',
        },
        {
          type: 'definition',
          term: 'XOR Gate',
          definition: 'An XOR (Exclusive OR) gate gives HIGH output when the inputs are DIFFERENT. If both inputs are the same, the output is LOW. Boolean expression: Y = A ⊕ B',
          example: 'Truth table: Inputs 0,0→0; 0,1→1; 1,0→1; 1,1→0',
        },
      ],
    },
    {
      id: 'applications',
      title: 'Applications of Electronics',
      blocks: [
        {
          type: 'definition',
          term: 'Computers',
          definition: 'Modern computers use millions of transistors on microprocessors to perform calculations and process data. Logic gates inside processors perform arithmetic and logical operations using binary numbers.',
        },
        {
          type: 'definition',
          term: 'Communication',
          definition: 'Electronic devices like mobile phones, radios, and televisions use transistors and integrated circuits to send, receive, and process signals for communication.',
        },
        {
          type: 'definition',
          term: 'Medical Equipment',
          definition: 'Electronic devices are used in medical equipment such as ECG machines, X-ray machines, ultrasound scanners, and digital thermometers for diagnosis and treatment.',
          example: 'A digital thermometer uses electronic sensors to measure body temperature accurately.',
        },
        {
          type: 'definition',
          term: 'Entertainment',
          definition: 'Electronic devices such as televisions, music players, gaming consoles, and smartphones are widely used for entertainment and multimedia applications.',
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
            { number: 1, question: 'What is the difference between electrical and electronic devices?', answer: 'Electrical devices convert electrical energy into other forms (heat, light). Electronic devices control the flow of electrons to process information or signals.' },
            { number: 2, question: 'Explain the difference between conductors, insulators, and semiconductors with examples.', answer: 'Conductors (copper) allow easy current flow. Insulators (rubber) do not allow current flow. Semiconductors (silicon) have conductivity between conductors and insulators.' },
            { number: 3, question: 'What is doping? Differentiate between n-type and p-type semiconductors.', answer: 'Doping is adding impurities to pure semiconductors. N-type has electrons as majority carriers (pentavalent impurity). P-type has holes as majority carriers (trivalent impurity).' },
            { number: 4, question: 'Explain forward bias and reverse bias of a p-n junction diode.', answer: 'Forward bias: positive to p-side, negative to n-side, current flows. Reverse bias: positive to n-side, negative to p-side, no current flows.' },
            { number: 5, question: 'What is rectification? Differentiate between half-wave and full-wave rectifiers.', answer: 'Rectification is converting AC to DC. Half-wave rectifier uses one diode and rectifies one half-cycle. Full-wave rectifier uses 2-4 diodes and rectifies both half-cycles.' },
            { number: 6, question: 'Explain the working of a transistor as a switch.', answer: 'In cutoff state (no base current), transistor is OFF — no collector current. In saturation state (sufficient base current), transistor is ON — maximum collector current flows.' },
            { number: 7, question: 'Write the truth table and Boolean expression for AND, OR, NOT, NAND, and NOR gates.', answer: 'AND: Y=A·B, OR: Y=A+B, NOT: Y=Ā, NAND: Y=(A·B)̄, NOR: Y=(A+B)̄' },
            { number: 8, question: 'Give two applications of electronics in daily life.', answer: '1. Computers use transistors for processing data. 2. Mobile phones use electronic circuits for communication.' },
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
              question: 'Which of the following is a semiconductor material?',
              options: ['Copper', 'Silicon', 'Rubber', 'Iron'],
              correctIndex: 1,
            },
            {
              id: 'q2',
              question: 'In an n-type semiconductor, the majority charge carriers are:',
              options: ['Holes', 'Electrons', 'Protons', 'Neutrons'],
              correctIndex: 1,
            },
            {
              id: 'q3',
              question: 'A p-n junction diode conducts current in:',
              options: ['Both directions', 'Forward bias only', 'Reverse bias only', 'Neither direction'],
              correctIndex: 1,
            },
            {
              id: 'q4',
              question: 'The process of converting AC into DC is called:',
              options: ['Amplification', 'Modulation', 'Rectification', 'Oscillation'],
              correctIndex: 2,
            },
            {
              id: 'q5',
              question: 'A transistor has how many terminals?',
              options: ['Two', 'Three', 'Four', 'Five'],
              correctIndex: 1,
            },
            {
              id: 'q6',
              question: 'In a transistor, the current gain β is defined as:',
              options: ['Ib / Ic', 'Ic / Ib', 'Ie / Ic', 'Ic / Ie'],
              correctIndex: 1,
            },
            {
              id: 'q7',
              question: 'The Boolean expression for an OR gate is:',
              options: ['Y = A · B', 'Y = A + B', 'Y = Ā', 'Y = A ⊕ B'],
              correctIndex: 1,
            },
            {
              id: 'q8',
              question: 'A NAND gate gives LOW output when:',
              options: ['Any input is HIGH', 'All inputs are LOW', 'All inputs are HIGH', 'Both inputs are different'],
              correctIndex: 2,
            },
            {
              id: 'q9',
              question: 'The depletion region in a p-n junction is formed because of:',
              options: ['External battery', 'Recombination of electrons and holes at the junction', 'Addition of impurities', 'Increase in temperature'],
              correctIndex: 1,
            },
            {
              id: 'q10',
              question: 'Which gate is the combination of OR gate followed by NOT gate?',
              options: ['AND', 'NAND', 'NOR', 'XOR'],
              correctIndex: 2,
            },
          ],
        },
      ],
    },
  ],
};

export default chapter07En;
