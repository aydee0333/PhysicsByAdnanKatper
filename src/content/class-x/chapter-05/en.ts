import type { ChapterContent } from '../../types';

const chapter05En: ChapterContent = {
  id: 'chapter-05',
  classId: 'class-x',
  title: 'Current Electricity',
  subtitle: 'Electric Current, Ohm\'s Law, and Circuit Analysis',
  sections: [
    {
      id: 'electric-current',
      title: 'Electric Current',
      blocks: [
        {
          type: 'definition',
          term: 'Electric Current',
          definition: 'The rate of flow of electric charge through a conductor is called electric current. It is measured in amperes (A).',
          example: 'When you turn on a light switch, electrons flow through the wire and produce light — this flow is electric current.',
        },
        {
          type: 'definition',
          term: 'Ampere',
          definition: 'One ampere is the current flowing when one coulomb of charge passes through a cross-section of a conductor in one second.',
        },
        {
          type: 'definition',
          term: 'Conventional Current',
          definition: 'The direction of flow of positive charges is called conventional current. It flows from the positive terminal to the negative terminal of a battery. In reality, electrons flow in the opposite direction.',
        },
      ],
    },
    {
      id: 'current-formulas',
      title: 'Current Formulas',
      blocks: [
        {
          type: 'formula',
          name: 'Electric Current',
          formula: 'I = Q / t',
          variables: [
            { symbol: 'I', meaning: 'Electric current (A)' },
            { symbol: 'Q', meaning: 'Electric charge (C)' },
            { symbol: 't', meaning: 'Time (s)' },
          ],
        },
        {
          type: 'formula',
          name: 'Charge',
          formula: 'Q = It',
          variables: [
            { symbol: 'Q', meaning: 'Electric charge (C)' },
            { symbol: 'I', meaning: 'Current (A)' },
            { symbol: 't', meaning: 'Time (s)' },
          ],
        },
      ],
    },
    {
      id: 'potential-difference',
      title: 'Potential Difference',
      blocks: [
        {
          type: 'definition',
          term: 'Potential Difference (Voltage)',
          definition: 'The work done in moving a unit positive charge from one point to another in an electric circuit is called potential difference. It is measured in volts (V).',
          example: 'A battery provides the potential difference that pushes electrons through a circuit, just like a water pump pushes water through pipes.',
        },
        {
          type: 'definition',
          term: 'Volt',
          definition: 'One volt is the potential difference when one joule of work is done to move one coulomb of charge between two points.',
        },
        {
          type: 'definition',
          term: 'Voltmeter',
          definition: 'A voltmeter is used to measure the potential difference between two points in a circuit. It is always connected in parallel with the component.',
        },
      ],
    },
    {
      id: 'potential-formulas',
      title: 'Potential Difference Formulas',
      blocks: [
        {
          type: 'formula',
          name: 'Potential Difference',
          formula: 'V = W / Q',
          variables: [
            { symbol: 'V', meaning: 'Potential difference (V)' },
            { symbol: 'W', meaning: 'Work done (J)' },
            { symbol: 'Q', meaning: 'Charge (C)' },
          ],
        },
      ],
    },
    {
      id: 'ohms-law',
      title: 'Ohm\'s Law',
      blocks: [
        {
          type: 'definition',
          term: 'Ohm\'s Law',
          definition: 'Ohm\'s law states that the current flowing through a conductor is directly proportional to the potential difference across its ends, provided the temperature remains constant.',
        },
        {
          type: 'definition',
          term: 'Ohmic Conductor',
          definition: 'A conductor that obeys Ohm\'s law is called an ohmic conductor. Its V-I graph is a straight line passing through the origin. Example: metals like copper, silver.',
        },
        {
          type: 'definition',
          term: 'Non-Ohmic Conductor',
          definition: 'A conductor that does not obey Ohm\'s law is called a non-ohmic conductor. Its V-I graph is curved. Example: filament lamp, diode.',
        },
        {
          type: 'definition',
          term: 'Ammeter',
          definition: 'An ammeter is used to measure the current flowing in a circuit. It is always connected in series with the component.',
        },
      ],
    },
    {
      id: 'ohm-formulas',
      title: 'Ohm\'s Law Formulas',
      blocks: [
        {
          type: 'formula',
          name: 'Ohm\'s Law',
          formula: 'V = IR',
          variables: [
            { symbol: 'V', meaning: 'Potential difference (V)' },
            { symbol: 'I', meaning: 'Current (A)' },
            { symbol: 'R', meaning: 'Resistance (Ω)' },
          ],
        },
        {
          type: 'formula',
          name: 'Current (from Ohm\'s Law)',
          formula: 'I = V / R',
          variables: [
            { symbol: 'I', meaning: 'Current (A)' },
            { symbol: 'V', meaning: 'Potential difference (V)' },
            { symbol: 'R', meaning: 'Resistance (Ω)' },
          ],
        },
        {
          type: 'formula',
          name: 'Resistance (from Ohm\'s Law)',
          formula: 'R = V / I',
          variables: [
            { symbol: 'R', meaning: 'Resistance (Ω)' },
            { symbol: 'V', meaning: 'Potential difference (V)' },
            { symbol: 'I', meaning: 'Current (A)' },
          ],
        },
      ],
    },
    {
      id: 'resistance',
      title: 'Resistance',
      blocks: [
        {
          type: 'definition',
          term: 'Resistance',
          definition: 'The opposition offered by a conductor to the flow of electric current is called resistance. It is measured in ohms (Ω).',
        },
        {
          type: 'definition',
          term: 'Factors Affecting Resistance',
          definition: 'Resistance depends on: (1) Length of conductor — longer wire has more resistance. (2) Cross-sectional area — thicker wire has less resistance. (3) Nature of material — different materials have different resistivities. (4) Temperature — resistance of metals increases with temperature.',
        },
        {
          type: 'definition',
          term: 'Resistivity',
          definition: 'Resistivity is a property of the material that describes how strongly it opposes the flow of current. Its unit is ohm-meter (Ω·m). Lower resistivity means better conductor.',
        },
      ],
    },
    {
      id: 'resistance-formulas',
      title: 'Resistance Formulas',
      blocks: [
        {
          type: 'formula',
          name: 'Resistance',
          formula: 'R = ρl / A',
          variables: [
            { symbol: 'R', meaning: 'Resistance (Ω)' },
            { symbol: 'ρ', meaning: 'Resistivity of material (Ω·m)' },
            { symbol: 'l', meaning: 'Length of conductor (m)' },
            { symbol: 'A', meaning: 'Cross-sectional area (m²)' },
          ],
        },
      ],
    },
    {
      id: 'series-circuits',
      title: 'Series Circuits',
      blocks: [
        {
          type: 'definition',
          term: 'Series Circuit',
          definition: 'In a series circuit, components are connected end-to-end so that there is only one path for current to flow. The same current flows through all components.',
          example: 'Old-style Christmas lights are connected in series — if one bulb burns out, all bulbs go off.',
        },
        {
          type: 'definition',
          term: 'Properties of Series Circuit',
          definition: '(1) Same current flows through all components. (2) Total resistance is the sum of individual resistances. (3) Total voltage is the sum of voltages across each component. (4) If one component fails, the entire circuit stops working.',
        },
      ],
    },
    {
      id: 'series-formulas',
      title: 'Series Circuit Formulas',
      blocks: [
        {
          type: 'formula',
          name: 'Total Resistance (Series)',
          formula: 'R_total = R₁ + R₂ + R₃',
          variables: [
            { symbol: 'R_total', meaning: 'Total resistance (Ω)' },
            { symbol: 'R₁, R₂, R₃', meaning: 'Individual resistances (Ω)' },
          ],
        },
        {
          type: 'formula',
          name: 'Total Voltage (Series)',
          formula: 'V_total = V₁ + V₂ + V₃',
          variables: [
            { symbol: 'V_total', meaning: 'Total voltage (V)' },
            { symbol: 'V₁, V₂, V₃', meaning: 'Voltage across each component (V)' },
          ],
        },
      ],
    },
    {
      id: 'parallel-circuits',
      title: 'Parallel Circuits',
      blocks: [
        {
          type: 'definition',
          term: 'Parallel Circuit',
          definition: 'In a parallel circuit, components are connected across the same two points, providing multiple paths for current to flow. The voltage across each component is the same.',
          example: 'The electrical wiring in your house is a parallel circuit — each appliance gets the same voltage and can be switched on/off independently.',
        },
        {
          type: 'definition',
          term: 'Properties of Parallel Circuit',
          definition: '(1) Same voltage across all components. (2) Total current is the sum of currents through each branch. (3) Reciprocal of total resistance equals the sum of reciprocals of individual resistances. (4) If one component fails, others continue to work.',
        },
      ],
    },
    {
      id: 'parallel-formulas',
      title: 'Parallel Circuit Formulas',
      blocks: [
        {
          type: 'formula',
          name: 'Total Resistance (Parallel)',
          formula: '1/R_total = 1/R₁ + 1/R₂ + 1/R₃',
          variables: [
            { symbol: 'R_total', meaning: 'Total resistance (Ω)' },
            { symbol: 'R₁, R₂, R₃', meaning: 'Individual resistances (Ω)' },
          ],
        },
        {
          type: 'formula',
          name: 'Total Current (Parallel)',
          formula: 'I_total = I₁ + I₂ + I₃',
          variables: [
            { symbol: 'I_total', meaning: 'Total current (A)' },
            { symbol: 'I₁, I₂, I₃', meaning: 'Current through each branch (A)' },
          ],
        },
      ],
    },
    {
      id: 'electrical-power',
      title: 'Electrical Power and Energy',
      blocks: [
        {
          type: 'definition',
          term: 'Electrical Power',
          definition: 'The rate at which electrical energy is consumed or converted into other forms of energy is called electrical power. It is measured in watts (W).',
          example: 'A 100W bulb converts 100 joules of electrical energy into light and heat every second.',
        },
        {
          type: 'definition',
          term: 'Kilowatt-hour (kWh)',
          definition: 'One kilowatt-hour is the energy consumed by a 1000W appliance running for one hour. It is the unit used by electric companies to charge for electricity. 1 kWh = 3,600,000 J = 3.6 MJ.',
        },
      ],
    },
    {
      id: 'power-formulas',
      title: 'Power and Energy Formulas',
      blocks: [
        {
          type: 'formula',
          name: 'Electrical Power',
          formula: 'P = VI',
          variables: [
            { symbol: 'P', meaning: 'Power (W)' },
            { symbol: 'V', meaning: 'Voltage (V)' },
            { symbol: 'I', meaning: 'Current (A)' },
          ],
        },
        {
          type: 'formula',
          name: 'Power (using resistance)',
          formula: 'P = I²R = V²/R',
          variables: [
            { symbol: 'P', meaning: 'Power (W)' },
            { symbol: 'I', meaning: 'Current (A)' },
            { symbol: 'R', meaning: 'Resistance (Ω)' },
            { symbol: 'V', meaning: 'Voltage (V)' },
          ],
        },
        {
          type: 'formula',
          name: 'Electrical Energy',
          formula: 'E = Pt',
          variables: [
            { symbol: 'E', meaning: 'Energy (J or kWh)' },
            { symbol: 'P', meaning: 'Power (W or kW)' },
            { symbol: 't', meaning: 'Time (s or h)' },
          ],
        },
      ],
    },
    {
      id: 'safety-devices',
      title: 'Safety Devices',
      blocks: [
        {
          type: 'definition',
          term: 'Fuse',
          definition: 'A fuse is a safety device made of a thin wire with a low melting point. It is connected in series with the circuit. If the current exceeds a safe value, the fuse wire melts and breaks the circuit, protecting appliances from damage.',
        },
        {
          type: 'definition',
          term: 'Circuit Breaker',
          definition: 'A circuit breaker is a modern safety device that automatically switches off the circuit when the current exceeds a safe value. Unlike a fuse, it can be reset and reused.',
        },
        {
          type: 'definition',
          term: 'Earthing',
          definition: 'Earthing is the process of connecting the metal body of an appliance to the ground using a wire. If a live wire touches the metal body, the current flows to the ground instead of through a person, preventing electric shock.',
        },
      ],
    },
    {
      id: 'interactive-simulations',
      title: 'Interactive Simulations',
      blocks: [
        {
          type: 'interactive',
          component: 'CircuitSimulation',
        },
      ],
    },
    {
      id: 'numerical-examples',
      title: 'Solved Numericals',
      blocks: [
        {
          type: 'numerical',
          title: 'Finding Current',
          problem: 'A potential difference of 12V is applied across a resistor of 4Ω. Find the current flowing through it.',
          given: [
            { label: 'Voltage (V)', value: '12', unit: 'V' },
            { label: 'Resistance (R)', value: '4', unit: 'Ω' },
          ],
          find: 'Current (I)',
          solution: [
            'Using Ohm\'s Law: V = IR',
            'I = V / R',
            'I = 12 / 4',
            'I = 3 A',
          ],
          answer: 'I = 3 A',
        },
        {
          type: 'numerical',
          title: 'Series Resistance',
          problem: 'Three resistors of 2Ω, 3Ω, and 5Ω are connected in series. Find the total resistance and the current when connected to a 10V battery.',
          given: [
            { label: 'R₁', value: '2', unit: 'Ω' },
            { label: 'R₂', value: '3', unit: 'Ω' },
            { label: 'R₃', value: '5', unit: 'Ω' },
            { label: 'Voltage', value: '10', unit: 'V' },
          ],
          find: 'Total resistance and current',
          solution: [
            'R_total = R₁ + R₂ + R₃',
            'R_total = 2 + 3 + 5 = 10 Ω',
            'I = V / R_total',
            'I = 10 / 10',
            'I = 1 A',
          ],
          answer: 'R_total = 10 Ω, I = 1 A',
        },
        {
          type: 'numerical',
          title: 'Electrical Energy Cost',
          problem: 'A 2000W electric heater is used for 3 hours. If the cost of electricity is Rs. 15 per kWh, find the total cost.',
          given: [
            { label: 'Power (P)', value: '2000', unit: 'W = 2 kW' },
            { label: 'Time (t)', value: '3', unit: 'hours' },
            { label: 'Rate', value: '15', unit: 'Rs/kWh' },
          ],
          find: 'Total cost',
          solution: [
            'Energy consumed = P × t',
            'E = 2 kW × 3 h = 6 kWh',
            'Cost = Energy × Rate',
            'Cost = 6 × 15',
            'Cost = Rs. 90',
          ],
          answer: 'Total cost = Rs. 90',
        },
        {
          type: 'numerical',
          title: 'Parallel Resistance',
          problem: 'Two resistors of 6Ω and 12Ω are connected in parallel. Find the total resistance.',
          given: [
            { label: 'R₁', value: '6', unit: 'Ω' },
            { label: 'R₂', value: '12', unit: 'Ω' },
          ],
          find: 'Total resistance',
          solution: [
            '1/R_total = 1/R₁ + 1/R₂',
            '1/R_total = 1/6 + 1/12',
            '1/R_total = 2/12 + 1/12',
            '1/R_total = 3/12 = 1/4',
            'R_total = 4 Ω',
          ],
          answer: 'R_total = 4 Ω',
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
            { number: 1, question: 'Define electric current. What is its SI unit?', answer: 'Electric current is the rate of flow of electric charge through a conductor. Its SI unit is ampere (A).' },
            { number: 2, question: 'State Ohm\'s law. Write its mathematical expression.', answer: 'Ohm\'s law states that the current through a conductor is directly proportional to the potential difference across its ends at constant temperature. V = IR.' },
            { number: 3, question: 'What is resistance? On what factors does it depend?', answer: 'Resistance is the opposition to current flow. It depends on length, cross-sectional area, nature of material, and temperature of the conductor.' },
            { number: 4, question: 'Differentiate between series and parallel circuits.', answer: 'In series circuits, components share the same current and total resistance is the sum of individual resistances. In parallel circuits, components share the same voltage and total resistance is less than the smallest individual resistance.' },
            { number: 5, question: 'What is the function of a fuse in an electrical circuit?', answer: 'A fuse protects the circuit by melting when current exceeds a safe value, thereby breaking the circuit and preventing damage to appliances.' },
            { number: 6, question: 'Calculate the resistance of a copper wire 100m long and 0.5mm² cross-section. (Resistivity of copper = 1.7 × 10⁻⁸ Ω·m)', answer: 'R = ρl/A = (1.7 × 10⁻⁸ × 100) / (0.5 × 10⁻⁶) = 3.4 Ω' },
            { number: 7, question: 'Why is earthing important in electrical installations?', answer: 'Earthing prevents electric shock by providing a low-resistance path for current to flow to the ground if a live wire touches the metal body of an appliance.' },
            { number: 8, question: 'Three resistors of 4Ω, 6Ω, and 12Ω are connected in parallel across a 12V supply. Find the total current drawn from the supply.', answer: '1/R = 1/4 + 1/6 + 1/12 = 3/12 + 2/12 + 1/12 = 6/12 = 1/2, R = 2 Ω. I = V/R = 12/2 = 6 A.' },
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
              question: 'The SI unit of electric current is:',
              options: ['Volt', 'Ampere', 'Ohm', 'Watt'],
              correctIndex: 1,
            },
            {
              id: 'q2',
              question: 'Ohm\'s law is expressed as:',
              options: ['P = VI', 'V = IR', 'R = It', 'I = VR'],
              correctIndex: 1,
            },
            {
              id: 'q3',
              question: 'In a series circuit, the quantity that remains the same is:',
              options: ['Voltage', 'Resistance', 'Current', 'Power'],
              correctIndex: 2,
            },
            {
              id: 'q4',
              question: 'The resistance of a conductor depends on:',
              options: ['Length only', 'Area only', 'Material only', 'Length, area, material, and temperature'],
              correctIndex: 3,
            },
            {
              id: 'q5',
              question: 'A fuse wire should have:',
              options: ['High melting point', 'Low melting point', 'High resistance', 'Thick diameter'],
              correctIndex: 1,
            },
            {
              id: 'q6',
              question: 'In a parallel circuit with two equal resistors R, the total resistance is:',
              options: ['2R', 'R', 'R/2', '4R'],
              correctIndex: 2,
            },
            {
              id: 'q7',
              question: '1 kilowatt-hour equals:',
              options: ['3.6 × 10³ J', '3.6 × 10⁶ J', '3.6 × 10⁹ J', '3.6 × 10⁴ J'],
              correctIndex: 1,
            },
            {
              id: 'q8',
              question: 'An ammeter is always connected in:',
              options: ['Parallel', 'Series', 'Either way', 'Not connected in circuit'],
              correctIndex: 1,
            },
            {
              id: 'q9',
              question: 'If the voltage across a 10Ω resistor is 5V, the current is:',
              options: ['50 A', '2 A', '0.5 A', '5 A'],
              correctIndex: 2,
            },
            {
              id: 'q10',
              question: 'Earthing is provided to:',
              options: ['Increase current', 'Save electricity', 'Prevent electric shock', 'Increase voltage'],
              correctIndex: 2,
            },
          ],
        },
      ],
    },
  ],
};

export default chapter05En;
