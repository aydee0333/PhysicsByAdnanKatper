import type { ChapterContent } from '../../types';

const chapter02En: ChapterContent = {
  id: 'chapter-02',
  classId: 'class-ix',
  title: 'Kinematics',
  subtitle: 'Study of motion — distance, displacement, speed, velocity, and acceleration',
  objectives: [
    'Distinguish between distance and displacement with examples',
    'Define speed and velocity; explain the difference between average and instantaneous velocity',
    'Define acceleration and solve problems using equations of uniformly accelerated motion',
    'Interpret distance-time, displacement-time, and velocity-time graphs',
    'Describe uniformly accelerated motion and derive v = u + at, s = ut + ½at²',
    'Solve numerical problems involving speed, velocity, and acceleration',
  ],
  sections: [
    {
      id: 'rest-motion',
      title: 'Rest and Motion',
      blocks: [
        { type: 'definition', term: 'Rest', definition: 'An object is at rest if it does not change its position with respect to its surroundings.', example: 'A book lying on a table is at rest.' },
        { type: 'definition', term: 'Motion', definition: 'An object is in motion if it changes its position with respect to its surroundings.', example: 'A car moving on a road is in motion.' },
        { type: 'definition', term: 'Types of Motion', definition: 'Motion can be linear, circular, rotatory, vibratory, or random.', example: 'A car on a straight road (linear), a spinning wheel (rotatory), a pendulum (vibratory).' },
        { type: 'interactive', component: 'MotionTypesAnimation' },
      ],
    },
    {
      id: 'distance-displacement',
      title: 'Distance and Displacement',
      blocks: [
        { type: 'definition', term: 'Distance', definition: 'Total path length traveled by an object. It is a scalar quantity.', example: 'If you walk 3 m east then 4 m west, distance = 7 m.' },
        { type: 'definition', term: 'Displacement', definition: 'Shortest straight-line distance from initial to final position. It is a vector quantity.', example: 'If you walk 3 m east then 4 m west, displacement = 1 m west.' },
        { type: 'formula', name: 'Displacement Formula', formula: 'Δx = x₂ − x₁', variables: [{ symbol: 'Δx', meaning: 'Displacement' }, { symbol: 'x₂', meaning: 'Final position' }, { symbol: 'x₁', meaning: 'Initial position' }] },
        { type: 'interactive', component: 'DistanceDisplacementExplainer' },
      ],
    },
    {
      id: 'speed-velocity',
      title: 'Speed and Velocity',
      blocks: [
        { type: 'definition', term: 'Speed', definition: 'Distance traveled per unit time. Scalar quantity. Speed = Distance / Time.', example: 'A car travels 100 km in 2 hours → speed = 50 km/h.' },
        { type: 'definition', term: 'Velocity', definition: 'Displacement per unit time. Vector quantity. Velocity = Displacement / Time.', example: 'A car moves 100 km north in 2 hours → velocity = 50 km/h north.' },
        { type: 'formula', name: 'Speed Formula', formula: 'v = d / t', variables: [{ symbol: 'v', meaning: 'Speed (m/s)' }, { symbol: 'd', meaning: 'Distance (m)' }, { symbol: 't', meaning: 'Time (s)' }] },
        { type: 'interactive', component: 'SpeedVelocityComparison' },
      ],
    },
    {
      id: 'acceleration',
      title: 'Acceleration',
      blocks: [
        { type: 'definition', term: 'Acceleration', definition: 'Rate of change of velocity with time. It is a vector quantity.', example: 'A car speeds up from 0 to 60 km/h in 5 seconds — it has positive acceleration.' },
        { type: 'formula', name: 'Acceleration Formula', formula: 'a = (v − u) / t', variables: [{ symbol: 'a', meaning: 'Acceleration (m/s²)' }, { symbol: 'v', meaning: 'Final velocity (m/s)' }, { symbol: 'u', meaning: 'Initial velocity (m/s)' }, { symbol: 't', meaning: 'Time (s)' }] },
        { type: 'definition', term: 'Positive vs Negative Acceleration', definition: 'Positive acceleration means velocity increases. Negative acceleration (deceleration) means velocity decreases.', example: 'Speeding up = positive. Braking = negative.' },
      ],
    },
    {
      id: 'equations-of-motion',
      title: 'Equations of Motion',
      blocks: [
        { type: 'formula', name: 'First Equation', formula: 'v = u + at', variables: [{ symbol: 'v', meaning: 'Final velocity' }, { symbol: 'u', meaning: 'Initial velocity' }, { symbol: 'a', meaning: 'Acceleration' }, { symbol: 't', meaning: 'Time' }] },
        { type: 'formula', name: 'Second Equation', formula: 's = ut + ½at²', variables: [{ symbol: 's', meaning: 'Displacement' }, { symbol: 'u', meaning: 'Initial velocity' }, { symbol: 'a', meaning: 'Acceleration' }, { symbol: 't', meaning: 'Time' }] },
        { type: 'formula', name: 'Third Equation', formula: 'v² = u² + 2as', variables: [{ symbol: 'v', meaning: 'Final velocity' }, { symbol: 'u', meaning: 'Initial velocity' }, { symbol: 'a', meaning: 'Acceleration' }, { symbol: 's', meaning: 'Displacement' }] },
        { type: 'interactive', component: 'EquationsOfMotionCalc' },
      ],
    },
    {
      id: 'graphs',
      title: 'Motion Graphs',
      blocks: [
        { type: 'definition', term: 'Distance-Time Graph', definition: 'Slope of distance-time graph gives speed. Steeper slope = faster speed.', example: 'A straight line means constant speed.' },
        { type: 'definition', term: 'Velocity-Time Graph', definition: 'Slope of velocity-time graph gives acceleration. Area under the curve gives displacement.', example: 'A straight line with positive slope = constant acceleration.' },
        { type: 'interactive', component: 'DistanceTimeGraph' },
        { type: 'interactive', component: 'VelocityTimeGraphAnalyzer' },
      ],
    },
    {
      id: 'uniform-motion',
      title: 'Uniform Motion',
      blocks: [
        { type: 'definition', term: 'Uniform Speed', definition: 'An object covers equal distances in equal intervals of time.', example: 'A car moving at exactly 60 km/h on a straight highway.' },
        { type: 'definition', term: 'Uniform Velocity', definition: 'An object covers equal displacements in equal intervals of time in the same direction.', example: 'A train moving at 80 km/h North without changing direction.' },
        { type: 'definition', term: 'Uniform Acceleration', definition: 'Velocity changes by equal amounts in equal intervals of time.', example: 'A ball falling under gravity — speed increases by 10 m/s every second.' },
        { type: 'interactive', component: 'UniformMotionExplainer' },
      ],
    },
    {
      id: 'vectors',
      title: 'Vector Representation',
      blocks: [
        { type: 'definition', term: 'Vector Quantity', definition: 'A quantity that has both magnitude and direction. Represented by an arrow.', example: 'Velocity, displacement, force are vectors.' },
        { type: 'definition', term: 'Scalar Quantity', definition: 'A quantity that has only magnitude, no direction.', example: 'Speed, distance, mass are scalars.' },
        { type: 'interactive', component: 'VectorRepresentation' },
      ],
    },
    {
      id: 'relative-motion',
      title: 'Relative Motion',
      blocks: [
        { type: 'definition', term: 'Relative Motion', definition: 'Motion of an object as observed from a different reference frame.', example: 'A person walking inside a moving bus — relative to the ground, they move faster.' },
        { type: 'interactive', component: 'RelativeMotionSim' },
      ],
    },
    {
      id: 'ticker-tape',
      title: 'Ticker Tape Analysis',
      blocks: [
        { type: 'definition', term: 'Ticker Tape', definition: 'A tape that records motion by making dots at regular time intervals. Equal spacing = constant velocity. Increasing spacing = acceleration.', example: 'Used in labs to analyze motion of trolleys.' },
        { type: 'interactive', component: 'TickerTapeSimulation' },
      ],
    },
    {
      id: 'quiz',
      title: 'Quiz',
      blocks: [
        {
          type: 'quiz',
          questions: [
            { id: 'q1', type: 'mcq', question: 'Which of the following is a vector quantity?', options: ['Speed', 'Distance', 'Velocity', 'Time'], correctIndex: 2, explanation: 'Velocity has both magnitude and direction, making it a vector quantity.' },
            { id: 'q2', type: 'mcq', question: 'A car travels 100 m east, then 50 m west. What is the displacement?', options: ['150 m', '50 m east', '50 m west', '100 m'], correctIndex: 1, explanation: 'Displacement = 100 - 50 = 50 m east (shortest path from start to end).' },
            { id: 'q3', type: 'mcq', question: 'If a car accelerates from rest at 2 m/s² for 5 seconds, its final velocity is:', options: ['10 m/s', '5 m/s', '2.5 m/s', '7 m/s'], correctIndex: 0, explanation: 'v = u + at = 0 + 2×5 = 10 m/s.' },
            { id: 'q4', type: 'mcq', question: 'The area under a velocity-time graph represents:', options: ['Acceleration', 'Speed', 'Displacement', 'Force'], correctIndex: 2, explanation: 'Area under v-t graph = displacement.' },
            { id: 'q5', type: 'mcq', question: 'An object moving in a circle at constant speed has:', options: ['Zero acceleration', 'Constant velocity', 'Changing velocity', 'No force acting on it'], correctIndex: 2, explanation: 'Direction changes continuously, so velocity (a vector) changes even though speed is constant.' },
          ],
        },
      ],
    },
  ],
};

export default chapter02En;
