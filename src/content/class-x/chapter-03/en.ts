import type { ChapterContent } from '../../types';

const chapter03En: ChapterContent = {
  id: 'chapter-03',
  classId: 'class-x',
  title: 'Geometrical Optics',
  subtitle: 'Light, Reflection, Refraction, and Optical Instruments',
  sections: [
    {
      id: 'nature-of-light',
      title: 'Nature of Light',
      blocks: [
        {
          type: 'definition',
          term: 'Light',
          definition: 'Light is a form of energy that enables us to see objects. It travels in straight lines (rectilinear propagation).',
          example: 'Sunlight entering through a window, laser beams, torch light',
        },
        {
          type: 'definition',
          term: 'Speed of Light',
          definition: 'Light travels at approximately 3 × 10⁸ m/s in vacuum. This is the fastest speed in the universe. In other media (water, glass), light travels slower.',
          example: 'In water: ~2.25 × 10⁸ m/s, In glass: ~2 × 10⁸ m/s',
        },
        {
          type: 'definition',
          term: 'Luminous and Non-luminous Objects',
          definition: 'Luminous objects produce their own light (e.g., Sun, bulb, candle). Non-luminous objects do not produce light but reflect it (e.g., Moon, book, table).',
        },
      ],
    },
    {
      id: 'reflection-of-light',
      title: 'Reflection of Light',
      blocks: [
        {
          type: 'definition',
          term: 'Reflection',
          definition: 'When light hits a surface and bounces back, it is called reflection. The angle of incidence equals the angle of reflection.',
        },
        {
          type: 'definition',
          term: 'Laws of Reflection',
          definition: 'First Law: The incident ray, reflected ray, and normal at the point of incidence all lie in the same plane. Second Law: The angle of incidence is equal to the angle of reflection (∠i = ∠r).',
        },
        {
          type: 'definition',
          term: 'Regular Reflection',
          definition: 'When light reflects from a smooth surface (like a mirror), all reflected rays are parallel. This produces a clear image.',
          example: 'Plane mirrors, calm water surface, polished metal',
        },
        {
          type: 'definition',
          term: 'Diffuse Reflection',
          definition: 'When light reflects from a rough surface, reflected rays scatter in different directions. This is why we can see objects from all angles.',
          example: 'Paper, walls, clothing, unpolished wood',
        },
        {
          type: 'formula',
          name: 'Law of Reflection',
          formula: '∠i = ∠r',
          variables: [
            { symbol: '∠i', meaning: 'Angle of incidence' },
            { symbol: '∠r', meaning: 'Angle of reflection' },
          ],
        },
      ],
    },
    {
      id: 'plane-mirrors',
      title: 'Plane Mirrors',
      blocks: [
        {
          type: 'definition',
          term: 'Image in Plane Mirror',
          definition: 'A plane mirror forms a virtual, erect, and laterally inverted image. The image is the same size as the object and is located at the same distance behind the mirror as the object is in front.',
        },
        {
          type: 'definition',
          term: 'Lateral Inversion',
          definition: 'The left-right reversal in a mirror image is called lateral inversion. Your right hand appears as the left hand in a mirror.',
          example: 'The word AMBULANCE is written in reverse on the front of ambulances so it reads correctly in a car mirror.',
        },
        {
          type: 'definition',
          term: 'Characteristics of Image in Plane Mirror',
          definition: 'The image is: (1) Virtual (cannot be captured on screen), (2) Erect (upright), (3) Same size as object, (4) Laterally inverted, (5) As far behind the mirror as the object is in front.',
        },
      ],
    },
    {
      id: 'spherical-mirrors',
      title: 'Spherical Mirrors',
      blocks: [
        {
          type: 'definition',
          term: 'Concave Mirror',
          definition: 'A spherical mirror whose inner (concave) surface is reflecting. It converges parallel light rays to a focus. Also called a converging mirror.',
          example: 'Makeup mirrors, dentist mirrors, headlamps of cars, telescopes',
        },
        {
          type: 'definition',
          term: 'Convex Mirror',
          definition: 'A spherical mirror whose outer (convex) surface is reflecting. It diverges parallel light rays. Also called a diverging mirror.',
          example: 'Rear-view mirrors in vehicles, security mirrors in shops',
        },
        {
          type: 'definition',
          term: 'Principal Focus (F)',
          definition: 'The point where parallel rays of light converge (concave) or appear to diverge from (convex) after reflection. A concave mirror has a real focus; a convex mirror has a virtual focus.',
        },
        {
          type: 'definition',
          term: 'Focal Length (f)',
          definition: 'The distance between the pole (P) and the principal focus (F) of a spherical mirror. It is half the radius of curvature: f = R/2.',
        },
        {
          type: 'definition',
          term: 'Center of Curvature (C)',
          definition: 'The center of the sphere of which the mirror is a part. It lies at a distance R (radius of curvature) from the pole.',
        },
        {
          type: 'formula',
          name: 'Focal Length and Radius',
          formula: 'f = R/2',
          variables: [
            { symbol: 'f', meaning: 'Focal length' },
            { symbol: 'R', meaning: 'Radius of curvature' },
          ],
        },
      ],
    },
    {
      id: 'mirror-formula',
      title: 'Mirror Formula and Magnification',
      blocks: [
        {
          type: 'formula',
          name: 'Mirror Formula',
          formula: '1/f = 1/v + 1/u',
          variables: [
            { symbol: 'f', meaning: 'Focal length' },
            { symbol: 'v', meaning: 'Image distance (from mirror)' },
            { symbol: 'u', meaning: 'Object distance (from mirror)' },
          ],
        },
        {
          type: 'formula',
          name: 'Magnification',
          formula: "m = -v/u = h'/h",
          variables: [
            { symbol: 'm', meaning: 'Magnification (no units)' },
            { symbol: 'v', meaning: 'Image distance' },
            { symbol: 'u', meaning: 'Object distance' },
            { symbol: "h'", meaning: 'Height of image' },
            { symbol: 'h', meaning: 'Height of object' },
          ],
        },
        {
          type: 'definition',
          term: 'Sign Convention (New Cartesian)',
          definition: 'All distances are measured from the pole. Distances in the direction of incident light are positive; opposite to incident light are negative. Heights above the principal axis are positive; below are negative.',
        },
      ],
    },
    {
      id: 'refraction-of-light',
      title: 'Refraction of Light',
      blocks: [
        {
          type: 'definition',
          term: 'Refraction',
          definition: 'The bending of light when it passes from one medium to another is called refraction. Light bends because its speed changes in different media.',
          example: 'A pencil appears bent in a glass of water, a pool appears shallower than it is',
        },
        {
          type: 'definition',
          term: 'Laws of Refraction',
          definition: 'First Law: The incident ray, refracted ray, and normal all lie in the same plane. Second Law (Snell\'s Law): The ratio of the sine of the angle of incidence to the sine of the angle of refraction is constant for a given pair of media.',
        },
        {
          type: 'definition',
          term: 'Refractive Index (n)',
          definition: 'The ratio of the speed of light in vacuum to the speed of light in the medium. It tells us how much the light bends. n = c/v where c = speed in vacuum, v = speed in medium.',
          example: 'n(water) = 1.33, n(glass) = 1.5, n(diamond) = 2.42',
        },
        {
          type: 'formula',
          name: "Snell's Law",
          formula: 'n₁ sin θ₁ = n₂ sin θ₂',
          variables: [
            { symbol: 'n₁', meaning: 'Refractive index of medium 1' },
            { symbol: 'θ₁', meaning: 'Angle of incidence' },
            { symbol: 'n₂', meaning: 'Refractive index of medium 2' },
            { symbol: 'θ₂', meaning: 'Angle of refraction' },
          ],
        },
        {
          type: 'definition',
          term: 'Refraction from Rarer to Denser Medium',
          definition: 'When light goes from a rarer (less dense) to a denser medium, it bends towards the normal. The angle of refraction is smaller than the angle of incidence.',
          example: 'Light entering water from air — appears to bend downward',
        },
        {
          type: 'definition',
          term: 'Refraction from Denser to Rarer Medium',
          definition: 'When light goes from a denser to a rarer medium, it bends away from the normal. The angle of refraction is larger than the angle of incidence.',
          example: 'Light leaving water into air — appears to bend upward',
        },
      ],
    },
    {
      id: 'total-internal-reflection',
      title: 'Total Internal Reflection',
      blocks: [
        {
          type: 'definition',
          term: 'Critical Angle',
          definition: 'The angle of incidence in the denser medium for which the angle of refraction in the rarer medium is 90°. Denoted by θc.',
        },
        {
          type: 'definition',
          term: 'Total Internal Reflection (TIR)',
          definition: 'When light travelling from a denser to a rarer medium strikes the boundary at an angle greater than the critical angle, it is completely reflected back. No light passes into the rarer medium.',
        },
        {
          type: 'formula',
          name: 'Critical Angle',
          formula: 'sin θc = 1/n',
          variables: [
            { symbol: 'θc', meaning: 'Critical angle' },
            { symbol: 'n', meaning: 'Refractive index of denser medium' },
          ],
        },
        {
          type: 'definition',
          term: 'Applications of TIR',
          definition: 'Optical fibers carry light over long distances using TIR. Mirages occur in hot deserts due to TIR in air layers. Diamond sparkles because of TIR (critical angle is only 24°).',
          example: 'Fiber optic cables for internet, diamond jewelry, mirage on hot roads',
        },
      ],
    },
    {
      id: 'lenses',
      title: 'Lenses',
      blocks: [
        {
          type: 'definition',
          term: 'Convex Lens (Converging)',
          definition: 'A lens that is thicker in the middle and thinner at the edges. It converges parallel light rays to a focus. Forms real and inverted images (except when object is between F and lens).',
          example: 'Magnifying glass, camera lens, human eye lens, projector',
        },
        {
          type: 'definition',
          term: 'Concave Lens (Diverging)',
          definition: 'A lens that is thinner in the middle and thicker at the edges. It diverges parallel light rays. Always forms virtual, erect, and diminished images.',
          example: 'Peepholes in doors, correcting myopia (short-sightedness)',
        },
        {
          type: 'definition',
          term: 'Principal Focus of a Lens',
          definition: 'The point where parallel rays of light converge (convex) or appear to diverge from (concave) after passing through the lens.',
        },
        {
          type: 'formula',
          name: 'Lens Formula',
          formula: '1/f = 1/v - 1/u',
          variables: [
            { symbol: 'f', meaning: 'Focal length of the lens' },
            { symbol: 'v', meaning: 'Image distance from optical center' },
            { symbol: 'u', meaning: 'Object distance from optical center' },
          ],
        },
        {
          type: 'formula',
          name: 'Power of Lens',
          formula: 'P = 1/f',
          variables: [
            { symbol: 'P', meaning: 'Power (Diopters, D)' },
            { symbol: 'f', meaning: 'Focal length (meters)' },
          ],
        },
      ],
    },
    {
      id: 'optical-instruments',
      title: 'Optical Instruments',
      blocks: [
        {
          type: 'definition',
          term: 'Simple Microscope (Magnifying Glass)',
          definition: 'Uses a single convex lens to produce a magnified, virtual, and erect image of a small object placed within its focal length. Magnifying power M = 1 + D/f (for image at near point).',
          example: 'Reading small print, examining insects, jeweler\'s loupe',
        },
        {
          type: 'definition',
          term: 'Compound Microscope',
          definition: 'Uses two convex lenses (objective and eyepiece) to achieve very high magnification. The objective forms a real, enlarged, inverted image which the eyepiece further magnifies.',
          example: 'Used in biology labs to study cells, bacteria, and microorganisms',
        },
        {
          type: 'definition',
          term: 'Telescope',
          definition: 'Used to view distant objects. An astronomical refracting telescope uses two convex lenses. The objective forms a real, diminished, inverted image which the eyepiece magnifies. Magnifying power = fo/fe.',
          example: 'Viewing stars and planets, spyglasses, binoculars',
        },
        {
          type: 'definition',
          term: 'Human Eye',
          definition: 'A natural optical instrument. The eye lens is a convex lens whose focal length is adjusted by ciliary muscles. The retina acts as a screen where the image is formed. The image on the retina is real, inverted, and diminished.',
        },
        {
          type: 'definition',
          term: 'Defects of Vision',
          definition: 'Myopia (short-sightedness): distant objects are blurry — corrected with concave lens. Hypermetropia (long-sightedness): near objects are blurry — corrected with convex lens.',
        },
      ],
    },
    {
      id: 'numerical-examples',
      title: 'Solved Numericals',
      blocks: [
        {
          type: 'numerical',
          title: 'Mirror Formula - Image Distance',
          problem: 'An object is placed 30 cm in front of a concave mirror of focal length 15 cm. Find the position of the image.',
          given: [
            { label: 'Object distance (u)', value: '-30', unit: 'cm' },
            { label: 'Focal length (f)', value: '-15', unit: 'cm' },
          ],
          find: 'Image distance (v)',
          solution: [
            'Using mirror formula: 1/f = 1/v + 1/u',
            '1/(-15) = 1/v + 1/(-30)',
            '-1/15 = 1/v - 1/30',
            '1/v = -1/15 + 1/30',
            '1/v = (-2 + 1)/30',
            '1/v = -1/30',
            'v = -30 cm',
          ],
          answer: 'v = -30 cm (The image is formed 30 cm in front of the mirror, real and inverted)',
        },
        {
          type: 'numerical',
          title: 'Lens Formula - Focal Length',
          problem: 'A convex lens forms a real image 60 cm from the lens when the object is placed 20 cm from it. Find the focal length.',
          given: [
            { label: 'Object distance (u)', value: '-20', unit: 'cm' },
            { label: 'Image distance (v)', value: '+60', unit: 'cm' },
          ],
          find: 'Focal length (f)',
          solution: [
            'Using lens formula: 1/f = 1/v - 1/u',
            '1/f = 1/60 - 1/(-20)',
            '1/f = 1/60 + 1/20',
            '1/f = (1 + 3)/60',
            '1/f = 4/60',
            'f = 15 cm',
          ],
          answer: 'f = 15 cm',
        },
        {
          type: 'numerical',
          title: 'Power of a Lens',
          problem: 'Find the power of a concave lens of focal length 50 cm.',
          given: [
            { label: 'Focal length (f)', value: '-50', unit: 'cm = -0.5 m' },
          ],
          find: 'Power (P)',
          solution: [
            'P = 1/f',
            'P = 1/(-0.5)',
            'P = -2 D',
          ],
          answer: 'P = -2 Diopters (negative because it is a concave/diverging lens)',
        },
        {
          type: 'numerical',
          title: "Snell's Law",
          problem: 'Light passes from air (n₁ = 1.0) into glass (n₂ = 1.5). If the angle of incidence is 30°, find the angle of refraction.',
          given: [
            { label: 'n₁', value: '1.0' },
            { label: 'n₂', value: '1.5' },
            { label: 'Angle of incidence (θ₁)', value: '30°' },
          ],
          find: 'Angle of refraction (θ₂)',
          solution: [
            "Using Snell's law: n₁ sin θ₁ = n₂ sin θ₂",
            '1.0 × sin 30° = 1.5 × sin θ₂',
            '1.0 × 0.5 = 1.5 × sin θ₂',
            'sin θ₂ = 0.5/1.5',
            'sin θ₂ = 0.333',
            'θ₂ = sin⁻¹(0.333)',
            'θ₂ ≈ 19.5°',
          ],
          answer: 'θ₂ ≈ 19.5° (light bends towards the normal when entering a denser medium)',
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
            { number: 1, question: 'State the laws of reflection.', answer: '1) The incident ray, reflected ray and normal lie in the same plane. 2) The angle of incidence equals the angle of reflection.' },
            { number: 2, question: 'What is lateral inversion? Give an example.', answer: 'Lateral inversion is the left-right reversal in a mirror image. Example: The word AMBULANCE is written in reverse on ambulances.' },
            { number: 3, question: 'Differentiate between concave and convex mirrors.', answer: 'Concave mirror: inner surface reflects, converges light, can form real or virtual images. Convex mirror: outer surface reflects, diverges light, always forms virtual images.' },
            { number: 4, question: 'What is total internal reflection? State its conditions.', answer: 'TIR occurs when light travelling from denser to rarer medium hits the boundary at an angle greater than the critical angle. Conditions: 1) Light must go from denser to rarer medium. 2) Angle of incidence must exceed the critical angle.' },
            { number: 5, question: 'A convex lens has a focal length of 20 cm. What is its power?', answer: 'P = 1/f = 1/0.2 = +5 D' },
            { number: 6, question: 'Why does a swimming pool appear shallower than it actually is?', answer: 'Due to refraction of light. Light from the bottom of the pool bends away from the normal as it exits the water, making the pool appear shallower.' },
            { number: 7, question: 'What type of lens is used to correct myopia? Why?', answer: 'A concave (diverging) lens is used because myopia is caused by the eye lens focusing light in front of the retina. The concave lens diverges the light so it focuses correctly on the retina.' },
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
              question: 'The angle of incidence is equal to the angle of reflection. This is:',
              options: ['First law of reflection', 'Second law of reflection', "Snell's law", 'Law of refraction'],
              correctIndex: 1,
            },
            {
              id: 'q2',
              question: 'A concave mirror is also called:',
              options: ['Diverging mirror', 'Converging mirror', 'Plane mirror', 'None of these'],
              correctIndex: 1,
            },
            {
              id: 'q3',
              question: 'The focal length of a spherical mirror is:',
              options: ['Equal to R', 'Half of R', 'Double R', 'Three times R'],
              correctIndex: 1,
            },
            {
              id: 'q4',
              question: 'Light bends towards the normal when it goes from:',
              options: ['Denser to rarer medium', 'Rarer to denser medium', 'Vacuum to vacuum', 'None of these'],
              correctIndex: 1,
            },
            {
              id: 'q5',
              question: 'The refractive index of water is 1.33. This means:',
              options: ['Light travels faster in water than in vacuum', 'Light travels 1.33 times slower in water than in vacuum', 'Water is denser than glass', 'Light does not refract in water'],
              correctIndex: 1,
            },
            {
              id: 'q6',
              question: 'Total internal reflection occurs when light travels from:',
              options: ['Rarer to denser medium', 'Denser to rarer medium at angle > critical angle', 'Vacuum to glass', 'Air to water'],
              correctIndex: 1,
            },
            {
              id: 'q7',
              question: 'A convex lens has a focal length of 25 cm. Its power is:',
              options: ['+4 D', '+2.5 D', '-4 D', '+0.25 D'],
              correctIndex: 0,
            },
            {
              id: 'q8',
              question: 'Which lens is used to correct hypermetropia?',
              options: ['Concave lens', 'Convex lens', 'Cylindrical lens', 'Bifocal lens'],
              correctIndex: 1,
            },
            {
              id: 'q9',
              question: 'The image formed by a plane mirror is:',
              options: ['Real and inverted', 'Virtual and erect', 'Real and erect', 'Virtual and inverted'],
              correctIndex: 1,
            },
            {
              id: 'q10',
              question: 'An object is placed at the center of curvature of a concave mirror. The image formed is:',
              options: ['At infinity', 'At the center of curvature, same size', 'At the focus, enlarged', 'Behind the mirror, virtual'],
              correctIndex: 1,
            },
          ],
        },
      ],
    },
  ],
};

export default chapter03En;
