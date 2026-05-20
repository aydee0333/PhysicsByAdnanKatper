import type { ChapterContent } from '../../types';

const chapter09En: ChapterContent = {
  id: 'chapter-09',
  classId: 'class-ix',
  title: 'Thermal Properties of Matter',
  subtitle: 'Temperature, heat, expansion, and gas laws',
  objectives: [
    'Distinguish between temperature and heat',
    'Explain thermal expansion of solids and liquids and give everyday examples',
    'Define specific heat capacity and solve problems using Q = mcΔT',
    'Describe latent heat and explain phase changes without temperature change',
    'Explain the three modes of heat transfer: conduction, convection, and radiation',
    'State and apply Boyle\'s law and Charles\'s law for gases',
  ],
  sections: [
    {
      id: 'temperature',
      title: 'Temperature and Heat',
      blocks: [
        {
          type: 'definition',
          term: 'Temperature',
          definition: 'Temperature is a measure of hotness or coldness. It is the average kinetic energy of particles in a substance.',
          example: 'A cup of tea at 80°C is hotter than water at 25°C.',
        },
        {
          type: 'definition',
          term: 'Heat',
          definition: 'Heat is the energy transferred between objects due to temperature difference. It flows from hotter to cooler objects.',
          example: 'When you touch a hot stove, heat flows from the stove to your hand.',
        },
        {
          type: 'formula',
          name: 'Temperature Conversion',
          formula: 'K = °C + 273 | °F = (°C × 9/5) + 32',
          variables: [
            { symbol: 'K', meaning: 'Kelvin' },
            { symbol: '°C', meaning: 'Celsius' },
            { symbol: '°F', meaning: 'Fahrenheit' },
          ],
        },
        {
          type: 'interactive',
          component: 'VirtualThermometer',
        },
      ],
    },
    {
      id: 'thermometers',
      title: 'Thermometers',
      blocks: [
        {
          type: 'definition',
          term: 'Thermometer',
          definition: 'A device used to measure temperature. Common types include liquid-in-glass, digital, and infrared thermometers.',
          example: 'A clinical thermometer measures body temperature using mercury.',
        },
        {
          type: 'definition',
          term: 'Fixed Points',
          definition: 'Lower fixed point: ice point (0°C). Upper fixed point: steam point (100°C). These are used to calibrate thermometers.',
        },
      ],
    },
    {
      id: 'thermal-expansion',
      title: 'Thermal Expansion',
      blocks: [
        {
          type: 'definition',
          term: 'Thermal Expansion',
          definition: 'Thermal expansion is the increase in size when heated. Particles move more and take up more space.',
          example: 'Railway tracks have gaps to allow expansion in summer heat.',
        },
        {
          type: 'formula',
          name: 'Linear Expansion',
          formula: 'ΔL = αL₀ΔT',
          variables: [
            { symbol: 'ΔL', meaning: 'Change in length (m)' },
            { symbol: 'α', meaning: 'Coefficient of linear expansion (1/°C)' },
            { symbol: 'L₀', meaning: 'Original length (m)' },
            { symbol: 'ΔT', meaning: 'Change in temperature (°C)' },
          ],
        },
        {
          type: 'interactive',
          component: 'ThermalExpansionSim',
        },
      ],
    },
    {
      id: 'specific-heat',
      title: 'Specific Heat Capacity',
      blocks: [
        {
          type: 'definition',
          term: 'Specific Heat Capacity',
          definition: 'The heat required to raise the temperature of 1 kg of a substance by 1°C. Water has a very high specific heat (4186 J/kg°C).',
          example: 'Water takes longer to heat than sand — that is why beaches get hot quickly.',
        },
        {
          type: 'formula',
          name: 'Heat Formula',
          formula: 'Q = mcΔT',
          variables: [
            { symbol: 'Q', meaning: 'Heat energy (J)' },
            { symbol: 'm', meaning: 'Mass (kg)' },
            { symbol: 'c', meaning: 'Specific heat capacity (J/kg°C)' },
            { symbol: 'ΔT', meaning: 'Temperature change (°C)' },
          ],
        },
        {
          type: 'interactive',
          component: 'SpecificHeatSim',
        },
      ],
    },
    {
      id: 'latent-heat',
      title: 'Latent Heat',
      blocks: [
        {
          type: 'definition',
          term: 'Latent Heat',
          definition: 'Heat absorbed or released during a change of state WITHOUT temperature change. The energy goes into breaking or forming intermolecular bonds.',
          example: 'Ice at 0°C absorbs heat to melt but temperature stays at 0°C until all ice melts.',
        },
        {
          type: 'formula',
          name: 'Latent Heat of Fusion',
          formula: 'Q = mLf',
          variables: [
            { symbol: 'Q', meaning: 'Heat energy (J)' },
            { symbol: 'm', meaning: 'Mass (kg)' },
            { symbol: 'Lf', meaning: 'Latent heat of fusion (J/kg)' },
          ],
        },
        {
          type: 'formula',
          name: 'Latent Heat of Vaporization',
          formula: 'Q = mLv',
          variables: [
            { symbol: 'Q', meaning: 'Heat energy (J)' },
            { symbol: 'm', meaning: 'Mass (kg)' },
            { symbol: 'Lv', meaning: 'Latent heat of vaporization (J/kg)' },
          ],
        },
        {
          type: 'interactive',
          component: 'IceMeltingSim',
        },
      ],
    },
    {
      id: 'change-of-state',
      title: 'Change of State',
      blocks: [
        {
          type: 'definition',
          term: 'Change of State',
          definition: 'Matter can change between solid, liquid, and gas states by heating or cooling. Melting, freezing, evaporation, condensation, sublimation, and deposition are all changes of state.',
        },
        {
          type: 'interactive',
          component: 'WaterCycleDiagram',
        },
        {
          type: 'definition',
          term: 'Sublimation',
          definition: 'Solid changes directly to gas without becoming liquid. Examples: dry ice, iodine crystals.',
        },
        {
          type: 'definition',
          term: 'Deposition',
          definition: 'Gas changes directly to solid without becoming liquid. Example: frost formation on cold surfaces.',
        },
      ],
    },
    {
      id: 'evaporation',
      title: 'Evaporation',
      blocks: [
        {
          type: 'definition',
          term: 'Evaporation',
          definition: 'Evaporation is the change from liquid to gas at any temperature. It is a surface phenomenon — only particles at the surface escape.',
          example: 'Wet clothes dry faster on a hot, windy day.',
        },
        {
          type: 'definition',
          term: 'Factors Affecting Evaporation',
          definition: 'Temperature (higher → faster), Surface area (larger → faster), Humidity (lower → faster), Wind speed (more → faster).',
        },
        {
          type: 'interactive',
          component: 'WetClothSim',
        },
      ],
    },
    {
      id: 'gas-laws',
      title: 'Gas Laws',
      blocks: [
        {
          type: 'definition',
          term: "Boyle's Law",
          definition: 'At constant temperature, the pressure of a gas is inversely proportional to its volume. If volume decreases, pressure increases.',
          example: 'Pushing a syringe plunger increases pressure inside.',
        },
        {
          type: 'formula',
          name: "Boyle's Law",
          formula: 'P₁V₁ = P₂V₂',
          variables: [
            { symbol: 'P₁, P₂', meaning: 'Initial and final pressure (Pa)' },
            { symbol: 'V₁, V₂', meaning: 'Initial and final volume (m³)' },
          ],
        },
        {
          type: 'interactive',
          component: 'BoylesLawSim',
        },
        {
          type: 'definition',
          term: "Charles's Law",
          definition: 'At constant pressure, the volume of a gas is directly proportional to its absolute temperature (in Kelvin).',
          example: 'A balloon expands when heated.',
        },
        {
          type: 'formula',
          name: "Charles's Law",
          formula: 'V₁/T₁ = V₂/T₂',
          variables: [
            { symbol: 'V₁, V₂', meaning: 'Initial and final volume' },
            { symbol: 'T₁, T₂', meaning: 'Initial and final temperature (K)' },
          ],
        },
        {
          type: 'interactive',
          component: 'CharlesLawSim',
        },
        {
          type: 'interactive',
          component: 'HeatingCurveSim',
        },
        {
          type: 'interactive',
          component: 'HeatTransferSim',
        },
      ],
    },
    {
      id: 'quiz',
      title: 'Unit 9 Quiz',
      blocks: [
        {
          type: 'quiz',
          questions: [
            {
              id: 'q1',
              type: 'mcq',
              question: 'The SI unit of temperature is:',
              options: ['Celsius (°C)', 'Fahrenheit (°F)', 'Kelvin (K)', 'Joule (J)'],
              correctIndex: 2,
              explanation: 'The kelvin (K) is the SI base unit of temperature. 0 K is absolute zero, the lowest possible temperature.',
            },
            {
              id: 'q2',
              type: 'mcq',
              question: '0°C equals:',
              options: ['100 K', '273 K', '373 K', '0 K'],
              correctIndex: 1,
              explanation: 'To convert Celsius to Kelvin: K = °C + 273. So 0°C = 273 K (the ice point).',
            },
            {
              id: 'q3',
              type: 'mcq',
              question: 'Latent heat is absorbed during:',
              options: ['Temperature rise', 'Change of state', 'Cooling', 'Compression'],
              correctIndex: 1,
              explanation: 'Latent heat is the energy absorbed or released during a change of state (melting, boiling, etc.) without any change in temperature.',
            },
            {
              id: 'q4',
              type: 'mcq',
              question: "Boyle's Law states that at constant temperature:",
              options: ['P is proportional to V', 'P is inversely proportional to V', 'P is constant', 'V is constant'],
              correctIndex: 1,
              explanation: 'Boyle\'s Law: at constant temperature, pressure is inversely proportional to volume (P ∝ 1/V), so PV = constant.',
            },
            {
              id: 'q5',
              type: 'mcq',
              question: 'Water has a specific heat capacity of:',
              options: ['450 J/kg°C', '830 J/kg°C', '4186 J/kg°C', '334 J/kg°C'],
              correctIndex: 2,
              explanation: 'Water has a very high specific heat capacity of 4186 J/kg°C, which means it takes a lot of energy to heat up — making it an excellent coolant.',
            },
            {
              id: 'slo1',
              type: 'mcq',
              question: 'A 2 kg metal block is heated from 20°C to 70°C. If its specific heat capacity is 500 J/kg°C, the heat absorbed is:',
              options: ['5000 J', '50000 J', '70000 J', '10000 J'],
              correctIndex: 1,
              explanation: 'Q = mcΔT = 2 × 500 × (70 - 20) = 2 × 500 × 50 = 50000 J = 50 kJ.',
            },
            {
              id: 'slo2',
              type: 'mcq',
              question: 'Which method of heat transfer does NOT require a medium?',
              options: ['Conduction', 'Convection', 'Radiation', 'All require a medium'],
              correctIndex: 2,
              explanation: 'Radiation is the transfer of heat by electromagnetic waves — it can travel through a vacuum (e.g., heat from the Sun reaches Earth through empty space).',
            },
            {
              id: 'slo3',
              type: 'mcq',
              question: 'A gas at 2 atm pressure occupies 4 L. At constant temperature, if the volume is reduced to 2 L, the new pressure is:',
              options: ['1 atm', '4 atm', '8 atm', '2 atm'],
              correctIndex: 1,
              explanation: 'By Boyle\'s law: P₁V₁ = P₂V₂, so P₂ = P₁V₁/V₂ = 2 × 4 / 2 = 4 atm.',
            },
          ],
        },
      ],
    },
  ],
};

export default chapter09En;
