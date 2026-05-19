import type { ChapterContent } from '../../types';

const chapter02En: ChapterContent = {
  id: 'chapter-02',
  classId: 'class-x',
  title: 'Sound',
  subtitle: 'Production, Propagation, and Properties of Sound Waves',
  sections: [
    {
      id: 'sound-production',
      title: 'Production of Sound',
      blocks: [
        {
          type: 'definition',
          term: 'Sound',
          definition: 'Sound is a form of energy that produces the sensation of hearing. It is produced by vibrating objects and travels in the form of longitudinal waves.',
          example: 'When you pluck a guitar string, it vibrates and produces sound. When you speak, your vocal cords vibrate to produce sound waves.',
        },
        {
          type: 'definition',
          term: 'Vibration',
          definition: 'The rapid to-and-fro motion of an object about its mean position is called vibration. All sound-producing objects vibrate.',
          example: 'A tuning fork vibrates when struck, a drum skin vibrates when hit, and a bell vibrates when struck.',
        },
        {
          type: 'definition',
          term: 'Sound Production',
          definition: 'Sound is produced when an object vibrates. The vibrations create compressions and rarefactions in the surrounding air, which travel as sound waves to our ears.',
        },
      ],
    },
    {
      id: 'sound-propagation',
      title: 'Propagation of Sound',
      blocks: [
        {
          type: 'definition',
          term: 'Medium',
          definition: 'Sound needs a material medium (solid, liquid, or gas) to travel. Sound cannot travel through vacuum because there are no particles to vibrate.',
          example: 'Sound travels faster in solids than in liquids, and faster in liquids than in gases. This is because particles are closer together in solids.',
        },
        {
          type: 'definition',
          term: 'Longitudinal Wave',
          definition: 'Sound travels as longitudinal waves where particles of the medium vibrate parallel to the direction of wave propagation. This creates compressions (high pressure) and rarefactions (low pressure).',
        },
        {
          type: 'definition',
          term: 'Compression and Rarefaction',
          definition: 'Compression is the region where particles are close together (high pressure). Rarefaction is the region where particles are spread apart (low pressure). Sound travels as alternating compressions and rarefactions.',
        },
        {
          type: 'definition',
          term: 'Vacuum',
          definition: 'A vacuum is an empty space with no particles. Sound cannot travel through vacuum because there are no particles to vibrate and carry the sound energy.',
          example: 'In outer space, astronauts cannot hear each other directly because space is a vacuum. They use radio waves to communicate.',
        },
      ],
    },
    {
      id: 'speed-of-sound',
      title: 'Speed of Sound',
      blocks: [
        {
          type: 'definition',
          term: 'Speed of Sound',
          definition: 'The speed of sound is the distance travelled by sound per unit time. In dry air at 20°C, the speed of sound is approximately 343 m/s.',
        },
        {
          type: 'definition',
          term: 'Factors Affecting Speed of Sound',
          definition: 'The speed of sound depends on: (1) Nature of the medium - fastest in solids, slowest in gases. (2) Temperature - speed increases with temperature. (3) Humidity - sound travels faster in moist air than dry air. (4) Density - speed generally decreases with increasing density in gases.',
        },
        {
          type: 'formula',
          name: 'Speed of Sound Formula',
          formula: 'v = d/t',
          variables: [
            { symbol: 'v', meaning: 'Speed of sound (m/s)' },
            { symbol: 'd', meaning: 'Distance travelled (m)' },
            { symbol: 't', meaning: 'Time taken (s)' },
          ],
        },
        {
          type: 'formula',
          name: 'Wave Speed Equation',
          formula: 'v = fλ',
          variables: [
            { symbol: 'v', meaning: 'Speed of wave (m/s)' },
            { symbol: 'f', meaning: 'Frequency (Hz)' },
            { symbol: 'λ', meaning: 'Wavelength (m)' },
          ],
        },
      ],
    },
    {
      id: 'sound-waves',
      title: 'Sound Waves',
      blocks: [
        {
          type: 'definition',
          term: 'Wavelength',
          definition: 'The distance between two consecutive compressions or two consecutive rarefactions is called wavelength. It is denoted by λ (lambda) and measured in metres (m).',
        },
        {
          type: 'definition',
          term: 'Frequency',
          definition: 'The number of vibrations or oscillations completed in one second is called frequency. It is denoted by f and measured in hertz (Hz). Higher frequency means higher pitch.',
        },
        {
          type: 'definition',
          term: 'Amplitude',
          definition: 'The maximum displacement of a particle from its mean position during wave motion is called amplitude. Larger amplitude means louder sound.',
        },
        {
          type: 'definition',
          term: 'Time Period',
          definition: 'The time taken to complete one full oscillation is called time period. It is denoted by T and measured in seconds (s). T = 1/f',
        },
      ],
    },
    {
      id: 'interactive-simulations',
      title: 'Interactive Simulations',
      blocks: [
        {
          type: 'interactive',
          component: 'SoundSimulation',
        },
      ],
    },
    {
      id: 'characteristics-of-sound',
      title: 'Characteristics of Sound',
      blocks: [
        {
          type: 'definition',
          term: 'Pitch',
          definition: 'Pitch is the characteristic of sound that depends on frequency. High frequency produces high pitch (shrill sound) and low frequency produces low pitch (grave sound).',
          example: 'A woman\'s voice has higher pitch than a man\'s voice. A mosquito produces a high-pitched sound.',
        },
        {
          type: 'definition',
          term: 'Loudness',
          definition: 'Loudness is the characteristic of sound that depends on amplitude. Larger amplitude means louder sound. Loudness is measured in decibels (dB).',
          example: 'Normal conversation is about 60 dB, a rock concert is about 120 dB, and a whisper is about 20 dB.',
        },
        {
          type: 'definition',
          term: 'Quality or Timbre',
          definition: 'Quality or timbre is the characteristic that distinguishes two sounds of the same pitch and loudness produced by different instruments. It depends on the waveform.',
          example: 'A guitar and a piano playing the same note sound different because of their different quality/timbre.',
        },
      ],
    },
    {
      id: 'echo-reverberation',
      title: 'Echo and Reverberation',
      blocks: [
        {
          type: 'definition',
          term: 'Echo',
          definition: 'An echo is the repetition of sound caused by the reflection of sound waves from a hard surface. For an echo to be heard clearly, the reflecting surface must be at least 17.2 metres away (at 20°C in air).',
        },
        {
          type: 'definition',
          term: 'Reverberation',
          definition: 'Reverberation is the persistence of sound due to multiple reflections from walls, ceiling, and other surfaces. It makes sound seem to continue even after the source stops.',
          example: 'In a large empty hall, you hear reverberation when you clap. Concert halls are designed to have controlled reverberation for better sound quality.',
        },
        {
          type: 'formula',
          name: 'Echo Distance Formula',
          formula: 'd = vt/2',
          variables: [
            { symbol: 'd', meaning: 'Distance to reflecting surface (m)' },
            { symbol: 'v', meaning: 'Speed of sound (m/s)' },
            { symbol: 't', meaning: 'Time between original sound and echo (s)' },
          ],
        },
        {
          type: 'definition',
          term: 'Uses of Echo',
          definition: 'Echo is used in SONAR (Sound Navigation and Ranging) to detect submarines and measure ocean depth. It is also used in medical ultrasound and in architecture for acoustic design.',
        },
      ],
    },
    {
      id: 'ultrasound',
      title: 'Ultrasound',
      blocks: [
        {
          type: 'definition',
          term: 'Ultrasound',
          definition: 'Ultrasound refers to sound waves with frequencies higher than 20,000 Hz (20 kHz), which is above the upper limit of human hearing. Humans can hear sounds in the range of 20 Hz to 20,000 Hz.',
        },
        {
          type: 'definition',
          term: 'Infrasound',
          definition: 'Infrasound refers to sound waves with frequencies lower than 20 Hz, which is below the lower limit of human hearing. Elephants and whales can produce infrasound.',
        },
        {
          type: 'definition',
          term: 'Applications of Ultrasound',
          definition: 'Ultrasound has many applications: (1) Medical imaging (sonography) to see inside the body. (2) SONAR for detecting submarines and measuring sea depth. (3) Industrial cleaning of delicate parts. (4) Detecting cracks in metal structures. (5) Breaking kidney stones without surgery.',
        },
      ],
    },
    {
      id: 'musical-instruments',
      title: 'Musical Instruments',
      blocks: [
        {
          type: 'definition',
          term: 'String Instruments',
          definition: 'In string instruments, sound is produced by vibrating strings. The pitch is changed by changing the length, tension, or thickness of the string. Examples: guitar, sitar, violin, sarangi.',
        },
        {
          type: 'definition',
          term: 'Wind Instruments',
          definition: 'In wind instruments, sound is produced by vibrating air columns inside a tube. The pitch is changed by changing the length of the air column. Examples: flute, trumpet, shehnai, bagpipes.',
        },
        {
          type: 'definition',
          term: 'Percussion Instruments',
          definition: 'In percussion instruments, sound is produced by striking or shaking. The vibrating membrane or object produces sound. Examples: tabla, dholak, drum, bells.',
        },
      ],
    },
    {
      id: 'noise-pollution',
      title: 'Noise Pollution',
      blocks: [
        {
          type: 'definition',
          term: 'Noise Pollution',
          definition: 'Noise pollution is the excessive and unwanted sound in the environment that is harmful to human health and the environment. Sound above 85 dB can cause hearing damage.',
        },
        {
          type: 'definition',
          term: 'Sources of Noise Pollution',
          definition: 'Major sources include: (1) Traffic - vehicles, horns, engines. (2) Industrial - factory machines, generators. (3) Construction - drilling, hammering. (4) Loudspeakers and firecrackers. (5) Aircraft.',
        },
        {
          type: 'definition',
          term: 'Effects of Noise Pollution',
          definition: 'Effects include: (1) Hearing loss or damage. (2) Stress and anxiety. (3) Sleep disturbance. (4) Headaches and fatigue. (5) Increased blood pressure. (6) Reduced concentration and productivity.',
        },
        {
          type: 'definition',
          term: 'Prevention of Noise Pollution',
          definition: 'Ways to reduce noise pollution: (1) Plant trees along roads (sound barriers). (2) Use ear protection in noisy workplaces. (3) Reduce use of loudspeakers and firecrackers. (4) Maintain vehicles to reduce noise. (5) Soundproof buildings near airports and highways.',
        },
      ],
    },
    {
      id: 'numerical-examples',
      title: 'Solved Numericals',
      blocks: [
        {
          type: 'numerical',
          title: 'Speed of Sound Calculation',
          problem: 'A person claps near a mountain and hears the echo after 2 seconds. If the speed of sound is 340 m/s, calculate the distance to the mountain.',
          given: [
            { label: 'Time for echo', value: '2', unit: 's' },
            { label: 'Speed of sound', value: '340', unit: 'm/s' },
          ],
          find: 'Distance to the mountain (d)',
          solution: [
            'The sound travels to the mountain and back, so total distance = 2d',
            'Using formula: d = vt/2',
            'd = (340 × 2) / 2',
            'd = 680 / 2',
            'd = 340 m',
          ],
          answer: 'The mountain is 340 m away.',
        },
        {
          type: 'numerical',
          title: 'Wavelength Calculation',
          problem: 'A sound wave has a frequency of 500 Hz and travels at 340 m/s. Calculate its wavelength.',
          given: [
            { label: 'Frequency', value: '500', unit: 'Hz' },
            { label: 'Speed', value: '340', unit: 'm/s' },
          ],
          find: 'Wavelength (λ)',
          solution: [
            'Using formula: v = fλ',
            'λ = v / f',
            'λ = 340 / 500',
            'λ = 0.68 m',
          ],
          answer: 'The wavelength is 0.68 m (68 cm).',
        },
        {
          type: 'numerical',
          title: 'Depth of Sea using SONAR',
          problem: 'A ship sends an ultrasound signal to the sea floor. The signal returns after 0.4 seconds. If the speed of sound in water is 1500 m/s, calculate the depth of the sea.',
          given: [
            { label: 'Time', value: '0.4', unit: 's' },
            { label: 'Speed in water', value: '1500', unit: 'm/s' },
          ],
          find: 'Depth of sea (d)',
          solution: [
            'Sound travels to bottom and back, so total distance = 2d',
            'd = vt/2',
            'd = (1500 × 0.4) / 2',
            'd = 600 / 2',
            'd = 300 m',
          ],
          answer: 'The depth of the sea is 300 m.',
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
            { number: 1, question: 'What is sound? How is it produced?', answer: 'Sound is a form of energy that produces the sensation of hearing. It is produced by vibrating objects. When an object vibrates, it creates compressions and rarefactions in the surrounding air, which travel as sound waves.' },
            { number: 2, question: 'Why can sound not travel through vacuum?', answer: 'Sound needs a material medium to travel because it propagates through vibrations of particles. In vacuum, there are no particles to vibrate, so sound cannot travel.' },
            { number: 3, question: 'What are the factors that affect the speed of sound?', answer: 'Factors affecting speed of sound: (1) Nature of medium - fastest in solids, slowest in gases. (2) Temperature - speed increases with temperature. (3) Humidity - faster in moist air. (4) Density - generally slower in denser gases.' },
            { number: 4, question: 'Differentiate between loudness and pitch.', answer: 'Loudness depends on amplitude - larger amplitude means louder sound, measured in decibels (dB). Pitch depends on frequency - higher frequency means higher pitch (shriller sound).' },
            { number: 5, question: 'What is an echo? What is the minimum distance for an echo to be heard?', answer: 'An echo is the repetition of sound caused by reflection from a hard surface. The minimum distance for an echo is 17.2 m (at 20°C) so that the reflected sound reaches the ear at least 0.1 seconds after the original sound.' },
            { number: 6, question: 'What is ultrasound? Give three applications.', answer: 'Ultrasound is sound with frequency above 20,000 Hz. Applications: (1) Medical imaging (sonography). (2) SONAR for detecting submarines and measuring depth. (3) Industrial cleaning and detecting cracks in metals.' },
            { number: 7, question: 'How can noise pollution be controlled?', answer: 'Noise pollution can be controlled by: planting trees as sound barriers, using ear protection in noisy areas, reducing loudspeaker and firecracker use, maintaining vehicles, and soundproofing buildings near airports.' },
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
              question: 'Sound cannot travel through:',
              options: ['Air', 'Water', 'Steel', 'Vacuum'],
              correctIndex: 3,
            },
            {
              id: 'q2',
              question: 'The speed of sound is maximum in:',
              options: ['Air', 'Water', 'Steel', 'Vacuum'],
              correctIndex: 2,
            },
            {
              id: 'q3',
              question: 'The unit of frequency is:',
              options: ['Metre', 'Second', 'Hertz', 'Decibel'],
              correctIndex: 2,
            },
            {
              id: 'q4',
              question: 'The loudness of sound depends on:',
              options: ['Frequency', 'Amplitude', 'Wavelength', 'Speed'],
              correctIndex: 1,
            },
            {
              id: 'q5',
              question: 'The pitch of sound depends on:',
              options: ['Amplitude', 'Frequency', 'Speed', 'Wavelength'],
              correctIndex: 1,
            },
            {
              id: 'q6',
              question: 'What is the range of audible sound for humans?',
              options: ['0 Hz to 20 Hz', '20 Hz to 20,000 Hz', '20,000 Hz to 40,000 Hz', 'Above 40,000 Hz'],
              correctIndex: 1,
            },
            {
              id: 'q7',
              question: 'SONAR works on the principle of:',
              options: ['Reflection of light', 'Reflection of sound', 'Refraction of light', 'Refraction of sound'],
              correctIndex: 1,
            },
            {
              id: 'q8',
              question: 'The speed of sound in air at 20°C is approximately:',
              options: ['143 m/s', '243 m/s', '343 m/s', '443 m/s'],
              correctIndex: 2,
            },
            {
              id: 'q9',
              question: 'Sound waves are:',
              options: ['Transverse waves', 'Longitudinal waves', 'Electromagnetic waves', 'None of these'],
              correctIndex: 1,
            },
            {
              id: 'q10',
              question: 'The persistence of sound due to multiple reflections is called:',
              options: ['Echo', 'Reverberation', 'Resonance', 'Interference'],
              correctIndex: 1,
            },
          ],
        },
      ],
    },
  ],
};

export default chapter02En;
