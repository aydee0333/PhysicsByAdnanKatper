import type { ChapterContent } from '../../types';

const chapter04En: ChapterContent = {
  id: 'chapter-04',
  classId: 'class-ix',
  title: 'Turning Effect of Forces',
  subtitle: 'Torque, equilibrium, and rotational mechanics',
  sections: [
    {
      id: 'torque',
      title: 'Torque (Moment of Force)',
      blocks: [
        {
          type: 'definition',
          term: 'Torque',
          definition: 'Torque (or moment) is the turning effect of a force. It depends on the force and the perpendicular distance from the pivot point.',
          example: 'Opening a door by pushing at the handle — the farther from the hinge, the easier it opens.',
        },
        {
          type: 'formula',
          name: 'Torque Formula',
          formula: 'τ = F × d',
          variables: [
            { symbol: 'τ', meaning: 'Torque (N·m)' },
            { symbol: 'F', meaning: 'Force applied (N)' },
            { symbol: 'd', meaning: 'Perpendicular distance from pivot (m)' },
          ],
        },
        {
          type: 'interactive',
          component: 'SeeSawSim',
        },
        {
          type: 'quiz',
          questions: [
            {
              id: 'q1',
              question: 'The turning effect of a force is called:',
              options: ['Force', 'Torque (Moment)', 'Pressure', 'Weight'],
              correctIndex: 1,
            },
            {
              id: 'q2',
              question: 'If a 10 N force acts at 2 m from pivot, the torque is:',
              options: ['5 Nm', '12 Nm', '20 Nm', '8 Nm'],
              correctIndex: 2,
            },
          ],
        },
      ],
    },
    {
      id: 'like-unlike-forces',
      title: 'Like and Unlike Parallel Forces',
      blocks: [
        {
          type: 'definition',
          term: 'Like Forces',
          definition: 'Forces acting in the same direction. The resultant is the sum of magnitudes.',
          example: 'Two people pushing a car from behind in the same direction.',
        },
        {
          type: 'definition',
          term: 'Unlike Forces',
          definition: 'Forces acting in opposite directions. The resultant is the difference.',
          example: 'A tug-of-war — the stronger side wins.',
        },
        {
          type: 'formula',
          name: 'Resultant of Like Forces',
          formula: 'R = F₁ + F₂',
        },
        {
          type: 'formula',
          name: 'Resultant of Unlike Forces',
          formula: 'R = |F₁ − F₂|',
        },
        {
          type: 'interactive',
          component: 'ForceCombineSim',
        },
      ],
    },
    {
      id: 'moment-arm',
      title: 'Moment Arm',
      blocks: [
        {
          type: 'definition',
          term: 'Moment Arm',
          definition: 'The perpendicular distance from the pivot to the line of action of the force. Only the perpendicular component of force produces torque.',
          example: 'Using a wrench at an angle — only the perpendicular component turns the bolt.',
        },
        {
          type: 'formula',
          name: 'Moment Arm',
          formula: 'MA = d × sin(θ)',
          variables: [
            { symbol: 'MA', meaning: 'Moment arm (m)' },
            { symbol: 'd', meaning: 'Distance from pivot (m)' },
            { symbol: 'θ', meaning: 'Angle between force and lever arm' },
          ],
        },
        {
          type: 'interactive',
          component: 'MomentArmSim',
        },
      ],
    },
    {
      id: 'principle-of-moments',
      title: 'Principle of Moments',
      blocks: [
        {
          type: 'definition',
          term: 'Principle of Moments',
          definition: 'For a body in equilibrium, the sum of clockwise moments equals the sum of anticlockwise moments about any point.',
          example: 'A balanced see-saw — heavier person sits closer to the pivot.',
        },
        {
          type: 'formula',
          name: 'Equilibrium Condition',
          formula: 'Σ Clockwise Moments = Σ Anticlockwise Moments',
        },
        {
          type: 'interactive',
          component: 'PrincipleOfMomentsSim',
        },
      ],
    },
    {
      id: 'center-of-mass',
      title: 'Centre of Mass and Centre of Gravity',
      blocks: [
        {
          type: 'definition',
          term: 'Centre of Mass (CM)',
          definition: 'The point where the mass of an object is concentrated. For symmetric objects, it is at the geometric center.',
          example: 'The CM of a uniform rod is at its middle.',
        },
        {
          type: 'definition',
          term: 'Centre of Gravity (CG)',
          definition: 'The point where the weight of an object acts. Usually the same as CM for small objects near Earth.',
          example: 'A triangular lamina has its CG at the intersection of medians.',
        },
        {
          type: 'interactive',
          component: 'CenterOfMassFinder',
        },
      ],
    },
    {
      id: 'equilibrium',
      title: 'Equilibrium',
      blocks: [
        {
          type: 'definition',
          term: 'Equilibrium',
          definition: 'An object is in equilibrium when it is at rest or moving with constant velocity (no acceleration).',
          example: 'A book lying on a table is in static equilibrium.',
        },
        {
          type: 'formula',
          name: 'First Condition',
          formula: 'ΣF = 0',
          variables: [{ symbol: 'ΣF', meaning: 'Net force on the object must be zero' }],
        },
        {
          type: 'formula',
          name: 'Second Condition',
          formula: 'Στ = 0',
          variables: [{ symbol: 'Στ', meaning: 'Net torque on the object must be zero' }],
        },
        {
          type: 'definition',
          term: 'Types of Equilibrium',
          definition: 'Stable: returns to original position (ball in a bowl). Unstable: moves further away (ball on hilltop). Neutral: remains in new position (ball on flat table).',
        },
        {
          type: 'interactive',
          component: 'BalancedBeamSim',
        },
        {
          type: 'interactive',
          component: 'EquilibriumPuzzle',
        },
        {
          type: 'interactive',
          component: 'BlockStabilitySim',
        },
      ],
    },
    {
      id: 'couple',
      title: 'Couple',
      blocks: [
        {
          type: 'definition',
          term: 'Couple',
          definition: 'A couple is two equal and opposite forces acting on a body, not through the same point. They produce rotation without translation (no linear movement).',
          example: 'Turning a steering wheel — both hands push in opposite directions on opposite sides.',
        },
        {
          type: 'formula',
          name: 'Torque of a Couple',
          formula: 'τ = F × d',
          variables: [
            { symbol: 'τ', meaning: 'Torque of couple (N·m)' },
            { symbol: 'F', meaning: 'Magnitude of one force (N)' },
            { symbol: 'd', meaning: 'Perpendicular distance between forces (m)' },
          ],
        },
      ],
    },
    {
      id: 'quiz',
      title: 'Unit 4 Quiz',
      blocks: [
        {
          type: 'quiz',
          questions: [
            {
              id: 'q1',
              question: 'The turning effect of a force is called:',
              options: ['Force', 'Torque (Moment)', 'Pressure', 'Weight'],
              correctIndex: 1,
            },
            {
              id: 'q2',
              question: 'If a 10 N force acts at 2 m from pivot, the torque is:',
              options: ['5 Nm', '12 Nm', '20 Nm', '8 Nm'],
              correctIndex: 2,
            },
            {
              id: 'q3',
              question: 'For equilibrium, which conditions must be satisfied?',
              options: ['ΣF = 0 only', 'Στ = 0 only', 'Both ΣF = 0 and Στ = 0', 'Neither'],
              correctIndex: 2,
            },
            {
              id: 'q4',
              question: 'A couple consists of:',
              options: ['Two equal forces in same direction', 'Two equal and opposite forces not in same line', 'A single force', 'Two unequal forces'],
              correctIndex: 1,
            },
            {
              id: 'q5',
              question: 'The center of gravity of a uniform rod is at:',
              options: ['One end', 'The middle', 'Depends on orientation', 'Outside the rod'],
              correctIndex: 1,
            },
          ],
        },
      ],
    },
  ],
};

export default chapter04En;
