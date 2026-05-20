import type { ChapterContent } from '../../types';

const chapter06Sd: ChapterContent = {
  id: 'chapter-06',
  classId: 'class-ix',
  title: 'ڪشش ثقل',
  subtitle: 'نيوٽن جو قانون، ڪششي ميدان، سیٽلائيٽ ۽ بي وزني',
  objectives: [
    'نيوٽن جو عالمگير ڪشش جو قانون بيان ڪريو',
    'ڪششي ميدان جي طاقت بيان ڪريو',
    'زمين جو ماس ڳڻيو',
    'مداري حرڪت ۽ مداري رفتار جو فارمولا بيان ڪريو',
    'مادو ۽ وزن ۾ فرق ڪريو',
    'بي وزني ۽ مصنوعي سیٽلائيٽ جي تصور بيان ڪريو',
  ],
  sections: [
    {
      id: 'newtons-law',
      title: 'نيوٽن جو عالمگير ڪشش جو قانون',
      blocks: [
        { type: 'definition', term: 'عالمگير ڪشش', definition: 'ڪائنات ۾ هر شيء هرٻين شيء کي هڪ ائين قوت سان جذب ڪري ٿي جيڪا انهن جي ماسن جي حاصل ضرب جي تناسب ۽ انهن جي وچ جي فاصلي جي مربع جي الٽ تناسب ۾ هوندي آهي.' },
        { type: 'formula', name: 'ڪششي قوت', formula: 'F = G × m₁ × m₂ / r²', variables: [{ symbol: 'G', meaning: '6.67 × 10⁻¹¹ Nm²/kg²' }, { symbol: 'm₁, m₂', meaning: 'ماس (kg)' }, { symbol: 'r', meaning: 'فاصلو (m)' }] },
        { type: 'interactive', component: 'GravForceCalc' },
      ],
    },
    {
      id: 'gravitational-field',
      title: 'ڪششي ميدان',
      blocks: [
        { type: 'definition', term: 'ڪششي ميدان', definition: 'ڪششي ميدان ڪنھن ماس جي گرد وڀر ڏاڍو علائقو آهي جتي ڪشش محسوس ڪئي وڃي ٿي. ميدان جي شدت g = في ايڪي ماس تي قوت.' },
        { type: 'formula', name: 'ميدان جي شدت', formula: 'g = F/m = GM/r²' },
        { type: 'interactive', component: 'PlanetWeightCalc' },
        { type: 'interactive', component: 'GravitationalFieldLinesSim' },
      ],
    },
    {
      id: 'mass-of-earth',
      title: 'زمين جو مادو',
      blocks: [
        { type: 'definition', term: 'زمين جو مادو', definition: 'g = GM/R² استعمال ڪندي، اسان زمين جو مادو حساب ڪري سگهون ٿا!' },
        { type: 'formula', name: 'زمين جو مادو', formula: 'M = gR² / G ≈ 6 × 10²⁴ kg' },
        { type: 'interactive', component: 'EarthMassCalc' },
      ],
    },
    {
      id: 'variation-of-g',
      title: 'g ۾ تبديلي — اوچائي ۽ ڏرائي',
      blocks: [
        { type: 'definition', term: 'اوچائي سان', definition: 'g اوچائي وڌڻ سان گهٽي ٿو وڃي ٿو. g(h) = g × (1 − 2h/R)' },
        { type: 'definition', term: 'ڏرائي سان', definition: 'g زمين جي مرڪز طرف گهٽي ٿو وڃي ٿو. g(d) = g × (1 − d/R)' },
        { type: 'interactive', component: 'GVariationGraph' },
        { type: 'interactive', component: 'GVsDepthGraph' },
      ],
    },
    {
      id: 'orbital-motion',
      title: 'مداري حرڪت',
      blocks: [
        { type: 'definition', term: 'مداري حرڪت', definition: 'سیٽلائيٽ مدار ۾ رهن ٿيون ڇوڪه ڪشش دائرن جي حرڪت لاءِ مركزي قوت فراهم ڪري ٿي.' },
        { type: 'formula', name: 'مداري رفتار', formula: 'v = √(GM/r)' },
        { type: 'interactive', component: 'SatelliteOrbitSim' },
        { type: 'interactive', component: 'OrbitShapeVisualizer' },
      ],
    },
    {
      id: 'artificial-satellites',
      title: 'مصنوعي سیٽلائيٽ',
      blocks: [
        { type: 'definition', term: 'سیٽلائيٽ', definition: 'مصنوعي سیٽلائيٽ ائين شيون آهن جيڪا مواصلات، مشاهدو ۽ نيوڪيگيشن لاءِ زمين جي مدار ۾ رکيون وڃن ٿيون.' },
        { type: 'interactive', component: 'SatelliteTypesInfo' },
      ],
    },
    {
      id: 'weightlessness',
      title: 'بي وزني',
      blocks: [
        { type: 'definition', term: 'بي وزني', definition: 'مدار ۾ خلابان بي وزني محسوس ڪن ٿا ڇوڪه اهي آزاد سقوط ۾ هون ٿا، نه ته ڇوڪه ڪوئي ڪشش ناهي.' },
        { type: 'interactive', component: 'WeightlessnessSim' },
        { type: 'interactive', component: 'EscapeVelocityCalc' },
      ],
    },
    {
      id: 'quiz',
      title: 'ايم سي ڪوئز',
      blocks: [
        {
          type: 'quiz',
          questions: [
            { id: 'q1', question: 'ڪششي قوت:', options: ['هميشه ڪششي', 'هميشه دافعه', 'ڪڀي ڪڀي ڪششي', 'خلاء ۾ صفر'], correctIndex: 0, type: 'mcq',
              explanation: '',
},
            { id: 'q2', question: 'زمين تي g = 9.8 m/s² آهي. چانڊ تي g ≈:', options: ['9.8 m/s²', '1.6 m/s²', '0 m/s²', '24.8 m/s²'], correctIndex: 1, type: 'mcq',
              explanation: '',
},
            { id: 'q3', question: '200 km اوچائي تي مداري رفتار تقريباً آهي:', options: ['3 km/s', '7.8 km/s', '11.2 km/s', '15 km/s'], correctIndex: 1, type: 'mcq',
              explanation: '',
},
            { id: 'q4', question: 'زمين جي مرڪز ۾ g =', options: ['9.8 m/s²', '4.9 m/s²', '0 m/s²', '19.6 m/s²'], correctIndex: 2, type: 'mcq',
              explanation: '',
},
            { id: 'q5', question: 'خلابان بي وزني محسوس ڪن ٿا ڇوڪه:', options: ['خلاء ۾ ڪوئي ڪشش ناهي', 'اهي آزاد سقوط ۾ هون ٿا', 'اسپيس اسٽيشن تمام ڳنڍو آهي', 'اهي خاص لباس پاهنديا'], correctIndex: 1, type: 'mcq',
              explanation: '',
},
          ],
        },
      ],
    },
  ],
};

export default chapter06Sd;
