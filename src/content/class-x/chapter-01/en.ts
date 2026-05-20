import type { ChapterContent } from '../../types';

const chapter01En: ChapterContent = {
  id: 'chapter-01',
  classId: 'class-x',
  title: 'Simple Harmonic Motion and Waves',
  subtitle: 'Oscillations, Wave Motion, Sound Waves, and Applications',
  objectives: [
    'Define simple harmonic motion (SHM) and state its characteristics',
    'Describe the oscillation of a simple pendulum and apply T = 2π√(l/g)',
    'Define wave motion and distinguish between transverse and longitudinal waves',
    'Relate wavelength, frequency, speed, and amplitude using v = fλ',
    'Explain wave behaviors including reflection, refraction, and diffraction',
    'Solve numerical problems involving SHM and wave equations',
  ],
  sections: [
    {
      id: 'shm-introduction',
      title: 'Simple Harmonic Motion (SHM)',
      blocks: [
        {
          type: 'definition',
          term: 'Oscillatory Motion',
          definition: 'The to-and-fro motion of a body about its mean position is called oscillatory motion.',
          example: 'Motion of a pendulum, vibration of a tuning fork, motion of a mass on a spring',
        },
        {
          type: 'definition',
          term: 'Simple Harmonic Motion',
          definition: 'A type of oscillatory motion in which the acceleration of the body is directly proportional to its displacement from the mean position and is always directed towards the mean position.',
        },
        {
          type: 'definition',
          term: 'Amplitude',
          definition: 'The maximum displacement of a body from its mean position during SHM. Denoted by A.',
        },
        {
          type: 'definition',
          term: 'Time Period',
          definition: 'The time taken to complete one full oscillation. Denoted by T. Unit: second (s).',
        },
        {
          type: 'definition',
          term: 'Frequency',
          definition: 'The number of oscillations completed in one second. Denoted by f. Unit: hertz (Hz).',
        },
      ],
    },
    {
      id: 'shm-formulas',
      title: 'SHM Formulas',
      blocks: [
        {
          type: 'formula',
          name: 'Time Period of Simple Pendulum',
          formula: 'T = 2π √(L/g)',
          variables: [
            { symbol: 'T', meaning: 'Time period (s)' },
            { symbol: 'L', meaning: 'Length of pendulum (m)' },
            { symbol: 'g', meaning: 'Acceleration due to gravity (m/s²)' },
            { symbol: 'π', meaning: 'Pi ≈ 3.14159' },
          ],
        },
        {
          type: 'formula',
          name: 'Frequency',
          formula: 'f = 1/T',
          variables: [
            { symbol: 'f', meaning: 'Frequency (Hz)' },
            { symbol: 'T', meaning: 'Time period (s)' },
          ],
        },
        {
          type: 'formula',
          name: 'Displacement in SHM',
          formula: 'x = A sin(ωt)',
          variables: [
            { symbol: 'x', meaning: 'Displacement from mean position' },
            { symbol: 'A', meaning: 'Amplitude' },
            { symbol: 'ω', meaning: 'Angular frequency = 2πf' },
            { symbol: 't', meaning: 'Time (s)' },
          ],
        },
      ],
    },
    {
      id: 'wave-motion',
      title: 'Wave Motion',
      blocks: [
        {
          type: 'definition',
          term: 'Wave',
          definition: 'A disturbance that transfers energy from one place to another without transferring matter.',
        },
        {
          type: 'definition',
          term: 'Transverse Wave',
          definition: 'A wave in which the particles of the medium vibrate perpendicular to the direction of wave propagation.',
          example: 'Light waves, waves on a string',
        },
        {
          type: 'definition',
          term: 'Longitudinal Wave',
          definition: 'A wave in which the particles of the medium vibrate parallel to the direction of wave propagation.',
          example: 'Sound waves, compression waves in a spring',
        },
        {
          type: 'definition',
          term: 'Crest and Trough',
          definition: 'Crest is the highest point and trough is the lowest point of a transverse wave.',
        },
        {
          type: 'definition',
          term: 'Compression and Rarefaction',
          definition: 'Compression is the region of high pressure and rarefaction is the region of low pressure in a longitudinal wave.',
        },
      ],
    },
    {
      id: 'wave-formulas',
      title: 'Wave Formulas',
      blocks: [
        {
          type: 'formula',
          name: 'Wave Speed',
          formula: 'v = fλ',
          variables: [
            { symbol: 'v', meaning: 'Wave speed (m/s)' },
            { symbol: 'f', meaning: 'Frequency (Hz)' },
            { symbol: 'λ', meaning: 'Wavelength (m)' },
          ],
        },
        {
          type: 'formula',
          name: 'Wave Equation',
          formula: 'v = λ/T',
          variables: [
            { symbol: 'v', meaning: 'Wave speed (m/s)' },
            { symbol: 'λ', meaning: 'Wavelength (m)' },
            { symbol: 'T', meaning: 'Time period (s)' },
          ],
        },
      ],
    },
    {
      id: 'interactive-simulations',
      title: 'Interactive Simulations',
      blocks: [
        {
          type: 'interactive',
          component: 'SHMSimulation',
        },
        {
          type: 'interactive',
          component: 'WaveSimulation',
        },
        {
          type: 'interactive',
          component: 'TransverseLongitudinalSim',
        },
        {
          type: 'interactive',
          component: 'WaveBehaviorsSim',
        },
        {
          type: 'interactive',
          component: 'WaveInRopeSim',
        },
      ],
    },
    {
      id: 'sound-waves',
      title: 'Sound Waves',
      blocks: [
        {
          type: 'definition',
          term: 'Sound',
          definition: 'Sound is a form of energy that produces the sensation of hearing. It travels in the form of longitudinal waves.',
        },
        {
          type: 'definition',
          term: 'Speed of Sound',
          definition: 'The speed of sound depends on the medium. In air at 20°C, sound travels at approximately 343 m/s.',
          example: 'In water: ~1480 m/s, In steel: ~5960 m/s, In vacuum: 0 m/s (sound cannot travel)',
        },
        {
          type: 'definition',
          term: 'Echo',
          definition: 'The repetition of sound caused by the reflection of sound waves from a hard surface.',
        },
        {
          type: 'definition',
          term: 'Ultrasound',
          definition: 'Sound waves with frequencies higher than 20,000 Hz (above human hearing range). Used in medical imaging and industrial cleaning.',
        },
      ],
    },
    {
      id: 'numerical-examples',
      title: 'Solved Numericals',
      blocks: [
        {
          type: 'numerical',
          title: 'Pendulum Time Period',
          problem: 'Calculate the time period of a simple pendulum of length 1.0 m. (g = 10 m/s²)',
          given: [
            { label: 'Length', value: '1.0', unit: 'm' },
            { label: 'g', value: '10', unit: 'm/s²' },
          ],
          find: 'Time Period (T)',
          solution: [
            'T = 2π √(L/g)',
            'T = 2 × 3.14 × √(1.0/10)',
            'T = 6.28 × √(0.1)',
            'T = 6.28 × 0.316',
            'T = 1.98 ≈ 2.0 s',
          ],
          answer: 'T ≈ 2.0 s',
        },
        {
          type: 'numerical',
          title: 'Wave Speed',
          problem: 'A wave has a wavelength of 0.5 m and a frequency of 680 Hz. Calculate its speed.',
          given: [
            { label: 'Wavelength (λ)', value: '0.5', unit: 'm' },
            { label: 'Frequency (f)', value: '680', unit: 'Hz' },
          ],
          find: 'Wave Speed (v)',
          solution: [
            'v = fλ',
            'v = 680 × 0.5',
            'v = 340 m/s',
          ],
          answer: 'v = 340 m/s',
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
            { number: 1, question: 'Define simple harmonic motion. Give two examples.', answer: 'SHM is oscillatory motion where acceleration is proportional to displacement and directed towards mean position. Examples: pendulum, mass-spring system.' },
            { number: 2, question: 'What is the relationship between frequency and time period?', answer: 'f = 1/T (frequency is the reciprocal of time period)' },
            { number: 3, question: 'Differentiate between transverse and longitudinal waves.', answer: 'In transverse waves, particles vibrate perpendicular to wave direction. In longitudinal waves, particles vibrate parallel to wave direction.' },
            { number: 4, question: 'A pendulum has a time period of 2s. What is its frequency?', answer: 'f = 1/T = 1/2 = 0.5 Hz' },
            { number: 5, question: 'Why can sound not travel through vacuum?', answer: 'Sound needs a medium (solid, liquid, or gas) to travel because it propagates as longitudinal waves which require particle vibrations.' },
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
              type: 'mcq',
              question: 'In SHM, the acceleration is:',
              options: ['Constant', 'Proportional to displacement', 'Zero at all points', 'Proportional to velocity'],
              correctIndex: 1,
              explanation: 'In SHM, the restoring acceleration is directly proportional to the displacement from the mean position and always directed towards it (a ∝ −x).',
            },
            {
              id: 'q2',
              type: 'mcq',
              question: 'The time period of a simple pendulum depends on:',
              options: ['Mass of bob', 'Length of pendulum', 'Amplitude', 'Material of bob'],
              correctIndex: 1,
              explanation: 'The time period T = 2π√(L/g) depends only on the length L and gravitational acceleration g, not on mass or amplitude (for small oscillations).',
            },
            {
              id: 'q3',
              type: 'mcq',
              question: 'Sound waves are:',
              options: ['Transverse waves', 'Longitudinal waves', 'Electromagnetic waves', 'None of these'],
              correctIndex: 1,
              explanation: 'Sound waves are longitudinal waves where particles of the medium vibrate parallel to the direction of wave propagation, creating compressions and rarefactions.',
            },
            {
              id: 'q4',
              type: 'mcq',
              question: 'The speed of sound in air at 20°C is approximately:',
              options: ['143 m/s', '243 m/s', '343 m/s', '443 m/s'],
              correctIndex: 2,
              explanation: 'At 20°C in dry air, sound travels at approximately 343 m/s. The speed increases with temperature.',
            },
            {
              id: 'q5',
              type: 'mcq',
              question: 'If the frequency of a wave is 100 Hz and wavelength is 2 m, the wave speed is:',
              options: ['50 m/s', '100 m/s', '200 m/s', '400 m/s'],
              correctIndex: 2,
              explanation: 'Using v = fλ: v = 100 × 2 = 200 m/s.',
            },
            {
              id: 'slo1',
              type: 'mcq',
              question: 'Which of the following is an example of simple harmonic motion?',
              options: ['A car moving on a straight road', 'A ball rolling down a hill', 'A pendulum oscillating with small amplitude', 'A stone thrown vertically upward'],
              correctIndex: 2,
              explanation: 'A simple pendulum with small oscillations is a classic example of SHM where acceleration is proportional to displacement and directed towards the mean position.',
            },
            {
              id: 'slo2',
              type: 'mcq',
              question: 'A pendulum has a length of 1 m. What is its time period? (Take g = 10 m/s²)',
              options: ['1.0 s', '2.0 s', '3.14 s', '6.28 s'],
              correctIndex: 1,
              explanation: 'T = 2π√(L/g) = 2 × 3.14 × √(1/10) = 6.28 × 0.316 ≈ 2.0 s.',
            },
            {
              id: 'slo3',
              type: 'mcq',
              question: 'In a transverse wave, the particles of the vibrate:',
              options: ['Parallel to the wave direction', 'Perpendicular to the wave direction', 'In a circular path', 'They do not vibrate'],
              correctIndex: 1,
              explanation: 'In a transverse wave, particles of the medium vibrate at right angles (perpendicular) to the direction of wave propagation, forming crests and troughs.',
            },
          ],
        },
      ],
    },
  ],
};

export default chapter01En;
