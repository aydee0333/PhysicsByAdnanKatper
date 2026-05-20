import type { ChapterContent } from '../../types';

const chapter06En: ChapterContent = {
  id: 'chapter-06',
  classId: 'class-ix',
  title: 'Gravitation',
  subtitle: "Newton's law, gravitational field, satellites, and weightlessness",
  objectives: [
    "State Newton's law of universal gravitation and write its mathematical form F = GMm/r²",
    'Define gravitational field strength and explain how g varies with altitude and depth',
    'Calculate the mass of Earth using g = GM/R²',
    'Explain orbital motion and derive the orbital velocity formula v = √(GM/r)',
    'Distinguish between mass and weight; describe the difference on Earth and Moon',
    'Explain the concept of weightlessness and artificial satellites',
  ],
  sections: [
    {
      id: 'newtons-law',
      title: "Newton's Law of Universal Gravitation",
      blocks: [
        { type: 'definition', term: 'Universal Gravitation', definition: 'Every object in the universe attracts every other object with a force proportional to the product of their masses and inversely proportional to the square of the distance between them.' },
        { type: 'formula', name: 'Gravitational Force', formula: 'F = G × m₁ × m₂ / r²', variables: [{ symbol: 'G', meaning: '6.67 × 10⁻¹¹ Nm²/kg²' }, { symbol: 'm₁, m₂', meaning: 'Masses (kg)' }, { symbol: 'r', meaning: 'Distance (m)' }] },
        { type: 'interactive', component: 'GravForceCalc' },
      ],
    },
    {
      id: 'gravitational-field',
      title: 'Gravitational Field',
      blocks: [
        { type: 'definition', term: 'Gravitational Field', definition: 'A gravitational field is the region around a mass where gravity can be felt. Field strength g = force per unit mass.' },
        { type: 'formula', name: 'Field Strength', formula: 'g = F/m = GM/r²' },
        { type: 'interactive', component: 'PlanetWeightCalc' },
        { type: 'interactive', component: 'GravitationalFieldLinesSim' },
      ],
    },
    {
      id: 'mass-of-earth',
      title: 'Mass of Earth',
      blocks: [
        { type: 'definition', term: 'Mass of Earth', definition: 'Using g = GM/R², we can calculate the mass of Earth!' },
        { type: 'formula', name: 'Earth Mass', formula: 'M = gR² / G ≈ 6 × 10²⁴ kg' },
        { type: 'interactive', component: 'EarthMassCalc' },
      ],
    },
    {
      id: 'variation-of-g',
      title: 'Variation of g with Altitude and Depth',
      blocks: [
        { type: 'definition', term: 'With Altitude', definition: 'g decreases as height increases. g(h) = g × (1 − 2h/R)' },
        { type: 'definition', term: 'With Depth', definition: 'g decreases toward Earth\'s center. g(d) = g × (1 − d/R)' },
        { type: 'interactive', component: 'GVariationGraph' },
        { type: 'interactive', component: 'GVsDepthGraph' },
      ],
    },
    {
      id: 'orbital-motion',
      title: 'Orbital Motion',
      blocks: [
        { type: 'definition', term: 'Orbital Motion', definition: 'Satellites stay in orbit because gravity provides the centripetal force needed for circular motion.' },
        { type: 'formula', name: 'Orbital Velocity', formula: 'v = √(GM/r)' },
        { type: 'interactive', component: 'SatelliteOrbitSim' },
        { type: 'interactive', component: 'OrbitShapeVisualizer' },
      ],
    },
    {
      id: 'artificial-satellites',
      title: 'Artificial Satellites',
      blocks: [
        { type: 'definition', term: 'Satellites', definition: 'Artificial satellites are objects placed in orbit around Earth for communication, observation, and navigation.' },
        { type: 'interactive', component: 'SatelliteTypesInfo' },
      ],
    },
    {
      id: 'weightlessness',
      title: 'Weightlessness',
      blocks: [
        { type: 'definition', term: 'Weightlessness', definition: 'Astronauts in orbit feel weightless because they\'re in free fall, not because there\'s no gravity.' },
        { type: 'interactive', component: 'WeightlessnessSim' },
        { type: 'interactive', component: 'EscapeVelocityCalc' },
      ],
    },
    {
      id: 'quiz',
      title: 'MCQ Quiz',
      blocks: [
        {
          type: 'quiz',
          questions: [
            { id: 'q1', type: 'mcq', question: 'Gravitational force is:', options: ['Always attractive', 'Always repulsive', 'Sometimes attractive', 'Zero in space'], correctIndex: 0, explanation: 'Gravitational force is always attractive — masses attract each other, never repel.' },
            { id: 'q2', type: 'mcq', question: 'On Earth, g = 9.8 m/s². On Moon, g ≈:', options: ['9.8 m/s²', '1.6 m/s²', '0 m/s²', '24.8 m/s²'], correctIndex: 1, explanation: 'The Moon has about 1/6th the mass and 1/4th the radius of Earth, giving g ≈ 1.6 m/s² on its surface.' },
            { id: 'q3', type: 'mcq', question: 'Orbital velocity at 200 km altitude is approximately:', options: ['3 km/s', '7.8 km/s', '11.2 km/s', '15 km/s'], correctIndex: 1, explanation: 'At ~200 km altitude (low Earth orbit), orbital velocity is approximately 7.8 km/s.' },
            { id: 'q4', type: 'mcq', question: 'At the center of Earth, g =', options: ['9.8 m/s²', '4.9 m/s²', '0 m/s²', '19.6 m/s²'], correctIndex: 2, explanation: 'At Earth\'s centre, gravitational forces from all directions cancel out, so g = 0.' },
            { id: 'q5', type: 'mcq', question: 'Astronauts feel weightless because:', options: ['No gravity in space', 'They are in free fall', 'Space station is too heavy', 'They wear special suits'], correctIndex: 1, explanation: 'Astronauts feel weightless because they and their spacecraft are both in free fall around Earth — gravity still acts but there\'s no normal reaction force.' },
            { id: 'slo1', type: 'mcq', question: "Newton's law of universal gravitation gives F = GMm/r². If the distance between two masses is doubled, the gravitational force becomes:", options: ['Double', 'Half', 'One quarter', 'Four times'], correctIndex: 2, explanation: 'Since F ∝ 1/r², doubling the distance makes the force (1/2)² = 1/4 of the original.' },
            { id: 'slo2', type: 'mcq', question: 'The orbital velocity of a satellite depends on:', options: ['Mass of satellite only', 'Mass of planet and orbital radius', 'Only the radius', 'Only the planet mass'], correctIndex: 1, explanation: 'From v = √(GM/r), orbital velocity depends on the mass of the central body (M) and the orbital radius (r), not on the satellite\'s mass.' },
          ],
        },
      ],
    },
  ],
};

export default chapter06En;
