import type { ChapterContent } from '../../types';

const chapter01Sd: ChapterContent = {
  id: 'chapter-01',
  classId: 'class-x',
  title: 'ساده موزون حرڪت ۽ لهرون',
  subtitle: 'نوسانات، لهر جي حرڪت، آواز جون لهرون، ۽ اطلاقات',
  objectives: [
    'ساده موزون حرڪت (SHM) جي وصف ڏيو ۽ ان جون خصوصيتون بيان ڪريو',
    'ساده پينڊولم جي نوسان جي تشريح ڪريو ۽ T = 2π√(l/g) لاڳو ڪريو',
    'لهر جي حرڪت جي وصف ڏيو ۽ عرضي ۽ طولي لهرون وچ فرق ڪريو',
    'ولهن، تعدد، رفتار، ۽ لاء جي درميان v = fλ ذريعي تعلق قائم ڪريو',
    'لهري روياڪاري بيان ڪريو جن ۾ عڪاسي، شڪست، ۽ پراڪشش شامل آهي',
    'SHM ۽ لهر مساوات کي شامل عددي مسئلا حل ڪريو',
  ],
  sections: [
    {
      id: 'shm-introduction',
      title: 'ساده موزون حرڪت (SHM)',
      blocks: [
        {
          type: 'definition',
          term: 'نوساني حرڪت',
          definition: 'جسم جي اس جي اوسط پوزيشن بابت آڌو پٺي ڪرڻ جي حرڪت کي نوساني حرڪت چيون ٿا.',
          example: 'پينڊولم جي حرڪت، ٽيوننگ فورڪ جا ڪمپن، اسپرنگ تي ماس جي حرڪت',
        },
        {
          type: 'definition',
          term: 'ساده موزون حرڪت',
          definition: 'نوساني حرڪت جي هڪ قسم جيڪي ۾ جسم جو اسراع اوسط پوزيشن کان اس جي ڊسپلیسمنٹ سان سڌو متناسب هوندو آهي ۽ هميشه اوسط پوزيشن ڏانهن هوندو آهي.',
        },
        {
          type: 'definition',
          term: 'سيمپليٽيوڊ',
          definition: 'SHM دوران جسم جي اوسط پوزيشن کان وڌيڪ ۾ وڌيڪ ڊسپلیسمنٹ. A سان ظاہر ڪيو وڃي ٿو.',
        },
        {
          type: 'definition',
          term: 'مدت حرڪت',
          definition: 'هڪ مڪمل نوسان مڪمل ڪرڻ ۾ لڳندو وقت. T سان ظاہر ڪيو وڃي ٿو. اڪائي: سيڪنڊ (s).',
        },
        {
          type: 'definition',
          term: 'تعدد',
          definition: 'هڪ سيڪنڊ ۾ مڪمل ٿيندڙ نوسانن جي تعداد. f سان ظاہر ڪيو وڃي ٿو. اڪائي: هرٽز (Hz).',
        },
      ],
    },
    {
      id: 'shm-formulas',
      title: 'SHM جا فارمولا',
      blocks: [
        {
          type: 'formula',
          name: 'ساده پينڊولم جي مدت حرڪت',
          formula: 'T = 2π √(L/g)',
          variables: [
            { symbol: 'T', meaning: 'مدت حرڪت (s)' },
            { symbol: 'L', meaning: 'پينڊولم جي ڊيگهه (m)' },
            { symbol: 'g', meaning: 'gravitational acceleration (m/s²)' },
            { symbol: 'π', meaning: 'Pi ≈ 3.14159' },
          ],
        },
        {
          type: 'formula',
          name: 'تعدد',
          formula: 'f = 1/T',
          variables: [
            { symbol: 'f', meaning: 'تعدد (Hz)' },
            { symbol: 'T', meaning: 'مدت حرڪت (s)' },
          ],
        },
        {
          type: 'formula',
          name: 'SHM ۾ ڊسپلیسمنٹ',
          formula: 'x = A sin(ωt)',
          variables: [
            { symbol: 'x', meaning: 'اوسط پوزيشن کان ڊسپلیسمنٹ' },
            { symbol: 'A', meaning: 'سيمپليٽيوڊ' },
            { symbol: 'ω', meaning: 'ڪنڊي تعدد = 2πf' },
            { symbol: 't', meaning: 'وقت (s)' },
          ],
        },
      ],
    },
    {
      id: 'wave-motion',
      title: 'لهر جي حرڪت',
      blocks: [
        {
          type: 'definition',
          term: 'لهر',
          definition: 'هڪ اھڙو خلل جو مادي جي منتقل ڪرڻ بغير هڪ هنڌ کان ٻي هنڌ توانائي منتقل ڪري ٿو.',
        },
        {
          type: 'definition',
          term: 'آر پار لهر',
          definition: 'لهر جيڪي ۾ ميڊيئم ذرات لهر جي تشہير جي سمت کان عمودي ڪمپن ڪندا آهن.',
          example: 'روشني جون لهرون، تار تي لهرون',
        },
        {
          type: 'definition',
          term: 'ڊيگهه واري لهر',
          definition: 'لهر جيڪي ۾ ميڊيئم ذرات لهر جي تشہير جي سمت سان متوازي ڪمپن ڪندا آهن.',
          example: 'آواز جون لهرون، اسپرنگ ۾ ڪمپريشن لهرون',
        },
        {
          type: 'definition',
          term: 'ڪريسٽ ۽ ٽرف',
          definition: 'ڪريسٽ آر پار لهر جو سڀ کان مٿي نقطو ۽ ٽرف سڀ کان ٺٺو نقطو آهي.',
        },
        {
          type: 'definition',
          term: 'ڪمپريشن ۽ رئير فيڪشن',
          definition: 'ڪمپريشن وچي دٻاء وارو علاقو ۽ رئير فيڪشن گهٽ دٻاء وارو علاقو آهي ڊيگهه واري لهر ۾.',
        },
      ],
    },
    {
      id: 'wave-formulas',
      title: 'لهر جا فارمولا',
      blocks: [
        {
          type: 'formula',
          name: 'لهر جي رفتار',
          formula: 'v = fλ',
          variables: [
            { symbol: 'v', meaning: 'لهر جي رفتار (m/s)' },
            { symbol: 'f', meaning: 'تعدد (Hz)' },
            { symbol: 'λ', meaning: 'ولنگٿ (m)' },
          ],
        },
        {
          type: 'formula',
          name: 'لهر جو مساوات',
          formula: 'v = λ/T',
          variables: [
            { symbol: 'v', meaning: 'لهر جي رفتار (m/s)' },
            { symbol: 'λ', meaning: 'ولنگٿ (m)' },
            { symbol: 'T', meaning: 'مدت حرڪت (s)' },
          ],
        },
      ],
    },
    {
      id: 'interactive-simulations',
      title: 'انٽريڪٽو سموليشنز',
      blocks: [
        {
          type: 'interactive',
          component: 'SHMSimulation',
        },
        {
          type: 'interactive',
          component: 'WaveSimulation',
        },
      ],
    },
    {
      id: 'sound-waves',
      title: 'آواز جون لهرون',
      blocks: [
        {
          type: 'definition',
          term: 'آواز',
          definition: 'آواز توانائي جي هڪ شڪل آهي جيڪاٻڌڻ جو احساس پيدا ڪري ٿي. اهو ڊيگهه واري لهرن جي شڪل ۾ سفر ڪري ٿي.',
        },
        {
          type: 'definition',
          term: 'آواز جي رفتار',
          definition: 'آواز جي رفتار ميڊيئم تي منحصر آهي. 20°C تي هوا ۾ آواز لڳڀڳ 343 m/s جي رفتار سان سفر ڪري ٿي.',
          example: 'پاڻي ۾: ~1480 m/s، اسٽيل ۾: ~5960 m/s، خلاء ۾: 0 m/s (آواز سفر نٿي ڪري سگهي)',
        },
        {
          type: 'definition',
          term: 'ٻڌار (ايڪو)',
          definition: 'سخت سطح کان آواز جون لهرون عڪاسي سان آواز جي تڪرار.',
        },
        {
          type: 'definition',
          term: 'الٽرا سائونڊ',
          definition: '20,000 Hz کان وڌيڪ تعدد واري آواز جون لهرون (۾ انساني ٻڌڻ جي حد کان مٿي). طبي تصويري ۽ صنعتي صفائی ۾ استعمال ٿين ٿيون.',
        },
      ],
    },
    {
      id: 'numerical-examples',
      title: 'حل ٿيل نيومريڪلز',
      blocks: [
        {
          type: 'numerical',
          title: 'پينڊولم جي مدت حرڪت',
          problem: '1.0 m ڊيگهه واري ساده پينڊولم جي مدت حرڪتڳڻيڊو. (g = 10 m/s²)',
          given: [
            { label: 'ڊيگهه', value: '1.0', unit: 'm' },
            { label: 'g', value: '10', unit: 'm/s²' },
          ],
          find: 'مدت حرڪت (T)',
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
          title: 'لهر جي رفتار',
          problem: 'هڪ لهر جي ولنگٿ 0.5 m ۽ تعدد 680 Hz آهي. اس جي رفتارڳڻيڊو.',
          given: [
            { label: 'ولنگٿ (λ)', value: '0.5', unit: 'm' },
            { label: 'تعدد (f)', value: '680', unit: 'Hz' },
          ],
          find: 'لهر جي رفتار (v)',
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
      title: 'چيپٽر س۾ه',
      blocks: [
        {
          type: 'exercise',
          questions: [
            { number: 1, question: 'ساده موزون حرڪت بيان ڪريڊو. بہ مثالين ڏيو.', answer: 'SHM اها نوساني حرڪت آهي جيڪي ۾ اسراع ڊسپلیسمنٹ جو متناسب هوندو آهي ۽ اوسط پوزيشن ڏانهن هوندو آهي. مثالين: پينڊولم، ماس-اسپرنگ سيٽم.' },
            { number: 2, question: 'تعدد ۽ مدت حرڪت وچ ۾ ڇا تعلق آهي؟', answer: 'f = 1/T (تعدد مدت حرڪت جو الٹو آهي)' },
            { number: 3, question: 'آر پار ۽ ڊيگهه واري لهرن ۾ فرق بيان ڪريڊو.', answer: 'آر پار لهرن ۾ ذرات لهر جي سمت کان عمودي ڪمپن ڪندا آهن. ڊيگهه واري لهرن ۾ ذرات لهر جي سمت سان متوازي ڪمپن ڪندا آهن.' },
            { number: 4, question: 'هڪ پينڊولم جي مدت حرڪت 2s آهي. اس جي تعدد ڇا آهي؟', answer: 'f = 1/T = 1/2 = 0.5 Hz' },
            { number: 5, question: 'آواز خلاء ۾ ڇو نٿي سفر ڪري سگهي؟', answer: 'آواز کي سفر ڪرڻ لاءِ ميڊيئم (ٺوس، مايع، يا گيس) جي ضرورت آهي ڪيڇڪ اهو ڊيگهه واري لهرن جي شڪل ۾ پهري ٿي جن کي ذرات جي ڪمپن جي ضرورت آهي.' },
          ],
        },
      ],
    },
    {
      id: 'quiz',
      title: 'ايم سي ڪوئز',
      blocks: [
        {
          type: 'quiz',
          questions: [
            {
              id: 'q1',
              question: 'SHM ۾ اسراع:',
              options: ['مستقل آهي', 'ڊسپلیسمنٹ جو متناسب آهي', 'سڀ مقامن تي صفرو آهي', 'رفتار جو متناسب آهي'],
              correctIndex: 1,
            },
            {
              id: 'q2',
              question: 'ساده پينڊولم جي مدت حرڪت تي منحصر آهي:',
              options: ['بوب جي مادو', 'پينڊولم جي ڊيگهه', 'سيمپليٽيوڊ', 'بوب جي مادي'],
              correctIndex: 1,
            },
            {
              id: 'q3',
              question: 'آواز جون لهرون:',
              options: ['آر پار لهرون آهن', 'ڊيگهه واري لهرون آهن', 'الیڪٽرومغناطيسي لهرون آهن', 'ان مان ڪي نہ'],
              correctIndex: 1,
            },
            {
              id: 'q4',
              question: '20°C تي هوا ۾ آواز جي رفتار لڳڀڳ:',
              options: ['143 m/s', '243 m/s', '343 m/s', '443 m/s'],
              correctIndex: 2,
            },
            {
              id: 'q5',
              question: 'ڄي لهر جي تعدد 100 Hz ۽ ولنگٿ 2 m آهي ته لهر جي رفتار:',
              options: ['50 m/s', '100 m/s', '200 m/s', '400 m/s'],
              correctIndex: 2,
            },
          ],
        },
      ],
    },
  ],
};

export default chapter01Sd;
