import type { ChapterContent } from '../../types';

const chapter03En: ChapterContent = {
  id: 'chapter-03',
  classId: 'class-ix',
  title: 'Dynamics',
  subtitle: 'Force, Newton\'s laws, friction, inertia, mass, weight, and momentum',
  objectives: [
    'Define force and describe its effects on the state of motion of an object',
    'State and explain Newton\'s three laws of motion with examples',
    'Distinguish between mass and weight; solve problems using W = mg',
    'Define momentum and state the law of conservation of momentum',
    'Explain types of friction (static, kinetic, rolling) and methods to reduce friction',
    'Solve numerical problems involving force, mass, acceleration, and momentum',
  ],
  sections: [
    {
      id: 'force',
      title: 'Force',
      blocks: [
        { type: 'definition', term: 'Force', definition: 'A push or pull that can change the state of motion or shape of an object. It is a vector quantity (has direction).', example: 'Kicking a ball, pulling a door, gravity pulling objects down.' },
        { type: 'definition', term: 'Effects of Force', definition: 'Force can change speed, change direction, or change shape of an object.', example: 'Speeding up a car (change speed), turning a steering wheel (change direction), squeezing a ball (change shape).' },
        { type: 'formula', name: 'SI Unit of Force', formula: '1 Newton (N) = 1 kg × 1 m/s²', variables: [{ symbol: 'N', meaning: 'Newton — unit of force' }] },
        { type: 'interactive', component: 'PushPullSim' },
      ],
    },
    {
      id: 'newtons-laws',
      title: "Newton's Laws of Motion",
      blocks: [
        { type: 'definition', term: "Newton's First Law (Law of Inertia)", definition: 'An object remains in its state of rest or uniform motion unless acted upon by an external force.', example: 'A book on a table stays still until you push it. A ball keeps rolling until friction stops it.' },
        { type: 'definition', term: "Newton's Second Law", definition: 'Force equals mass times acceleration: F = ma.', example: 'Pushing a heavy box requires more force than a light box for the same acceleration.' },
        { type: 'definition', term: "Newton's Third Law", definition: 'For every action, there is an equal and opposite reaction.', example: 'When you push a wall, the wall pushes back with equal force.' },
        { type: 'formula', name: "Newton's Second Law", formula: 'F = m × a', variables: [{ symbol: 'F', meaning: 'Force (N)' }, { symbol: 'm', meaning: 'Mass (kg)' }, { symbol: 'a', meaning: 'Acceleration (m/s²)' }] },
        { type: 'interactive', component: 'CoinCardExperiment' },
        { type: 'interactive', component: 'FmaCalculator' },
        { type: 'interactive', component: 'ActionReactionGame' },
      ],
    },
    {
      id: 'friction',
      title: 'Friction',
      blocks: [
        { type: 'definition', term: 'Friction', definition: 'The force that opposes motion between two surfaces in contact.', example: 'Rubbing your hands together generates heat from friction.' },
        { type: 'definition', term: 'Static Friction', definition: 'Friction that prevents motion from starting. It keeps a box from sliding.', example: 'A heavy box stays still on the floor because static friction holds it.' },
        { type: 'definition', term: 'Sliding (Kinetic) Friction', definition: 'Friction that opposes sliding motion. It is less than static friction.', example: 'A sliding book slows down because of kinetic friction.' },
        { type: 'definition', term: 'Rolling Friction', definition: 'Friction that opposes rolling motion. Much smaller than sliding friction.', example: 'Balls and wheels have rolling friction.' },
        { type: 'interactive', component: 'FrictionSlopeSim' },
        { type: 'interactive', component: 'StaticSlidingFrictionSim' },
      ],
    },
    {
      id: 'inertia',
      title: 'Inertia',
      blocks: [
        { type: 'definition', term: 'Inertia', definition: 'The tendency of an object to resist changes in its state of motion. More mass = more inertia.', example: 'A heavy truck is harder to stop than a bicycle — it has more inertia.' },
        { type: 'interactive', component: 'InertiaRaceSim' },
      ],
    },
    {
      id: 'mass-weight',
      title: 'Mass and Weight',
      blocks: [
        { type: 'definition', term: 'Mass', definition: 'Quantity of matter in an object. It never changes wherever you go. Unit: kilogram (kg).', example: 'Your mass is the same on Earth and on the Moon.' },
        { type: 'definition', term: 'Weight', definition: 'Force of gravity on mass. It changes on different planets. Unit: Newton (N).', example: 'You weigh less on the Moon because gravity is weaker there.' },
        { type: 'formula', name: 'Weight Formula', formula: 'W = m × g', variables: [{ symbol: 'W', meaning: 'Weight (N)' }, { symbol: 'm', meaning: 'Mass (kg)' }, { symbol: 'g', meaning: 'Acceleration due to gravity (m/s²)' }] },
        { type: 'interactive', component: 'WeightCalculator' },
      ],
    },
    {
      id: 'momentum',
      title: 'Momentum',
      blocks: [
        { type: 'definition', term: 'Momentum', definition: 'The quantity of motion in a body. Momentum = mass × velocity. Unit: kg·m/s.', example: 'A heavy truck moving fast has more momentum than a light car moving slowly.' },
        { type: 'formula', name: 'Momentum Formula', formula: 'p = m × v', variables: [{ symbol: 'p', meaning: 'Momentum (kg·m/s)' }, { symbol: 'm', meaning: 'Mass (kg)' }, { symbol: 'v', meaning: 'Velocity (m/s)' }] },
        { type: 'definition', term: 'Law of Conservation of Momentum', definition: 'In any collision, total momentum before = total momentum after. Momentum is never lost, only transferred.', example: 'In a car crash, the total momentum of both cars is the same before and after.' },
        { type: 'interactive', component: 'CollisionSim' },
        { type: 'interactive', component: 'ImpulseMomentumSim' },
      ],
    },
    {
      id: 'circular-motion',
      title: 'Circular Motion',
      blocks: [
        { type: 'definition', term: 'Centripetal Force', definition: 'The force that keeps an object moving in a circular path. It always points toward the center.', example: 'Gravity keeps the Moon in orbit. Tension keeps a ball on a string moving in a circle.' },
        { type: 'formula', name: 'Centripetal Force', formula: 'Fc = mv²/r', variables: [{ symbol: 'Fc', meaning: 'Centripetal force (N)' }, { symbol: 'm', meaning: 'Mass (kg)' }, { symbol: 'v', meaning: 'Velocity (m/s)' }, { symbol: 'r', meaning: 'Radius (m)' }] },
        { type: 'interactive', component: 'CircularMotionSim' },
        { type: 'interactive', component: 'FreeBodyDiagramSim' },
      ],
    },
    {
      id: 'quiz',
      title: 'Quiz',
      blocks: [
        {
          type: 'quiz',
          questions: [
            { id: 'q1', type: 'mcq', question: "Newton's First Law is also known as:", options: ['Law of Acceleration', 'Law of Inertia', 'Law of Action-Reaction', 'Law of Gravity'], correctIndex: 1, explanation: "Newton's First Law is called the Law of Inertia because it describes how objects resist changes in motion." },
            { id: 'q2', type: 'mcq', question: 'If F = 20 N and m = 4 kg, what is the acceleration?', options: ['80 m/s²', '5 m/s²', '24 m/s²', '16 m/s²'], correctIndex: 1, explanation: 'a = F/m = 20/4 = 5 m/s².' },
            { id: 'q3', type: 'mcq', question: 'When you push a wall, the wall pushes back with:', options: ['Greater force', 'Less force', 'Equal and opposite force', 'No force'], correctIndex: 2, explanation: "By Newton's Third Law, the wall pushes back with equal and opposite force." },
            { id: 'q4', type: 'mcq', question: 'The SI unit of momentum is:', options: ['Newton (N)', 'kg·m/s', 'm/s²', 'Joule (J)'], correctIndex: 1, explanation: 'Momentum = mass × velocity, so unit = kg × m/s = kg·m/s.' },
            { id: 'q5', type: 'mcq', question: 'Centripetal force always points:', options: ['Away from center', 'Toward the center', 'Tangential to the circle', 'Upward'], correctIndex: 1, explanation: 'Centripetal means "center-seeking" — it always points toward the center of the circle.' },
          ],
        },
      ],
    },
  ],
};

export default chapter03En;
