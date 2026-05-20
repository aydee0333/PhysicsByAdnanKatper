import type { ChapterContent } from '../../types';

const chapter08Sd: ChapterContent = {
  id: 'chapter-08',
  classId: 'class-ix',
  title: 'ڪم ۽ توانائي',
  subtitle: 'ڪم، توانائي جا قسم، حفاظت، طاقت ۽ ڪارڪردگي',
  objectives: [
    'ڪم جي تعريف ڏيو ۽ W = Fd سان حساب ڪريو',
    'جنبشي توانائي ۽ ممکني توانائي ۾ فرق ڪريو',
    'توانائي جي بچاءُ جو قانون بيان ڪريو',
    'طاقت ۽ ان جي SI اڪائي جي تعريف ڏيو',
    'ڪارڪردگي بيان ڪريو ۽ ساده مشينن لاءِ حساب ڪريو',
    'ڪم، توانائي ۽ طاقت جي عددي مسئلا حل ڪريو',
  ],
  sections: [
    {
      id: 'work',
      title: 'ڪم',
      blocks: [
        {
          type: 'definition',
          term: 'ڪم',
          definition: 'جب ڪنھن شيء تي زور لڳائو ۽ اهو زور جي سمت ۾ حرڪت ڪري ته ڪم ٿي ٿو. ڪم = زور × فاصلو.',
          example: '5 ميٽر فاصلي تي 10 N زور سان باڪس ڌڪڻ: W = 10 × 5 = 50 J',
        },
        {
          type: 'formula',
          name: 'ڪم',
          formula: 'W = F × d',
          variables: [
            { symbol: 'W', meaning: 'ڪم (جول، J)' },
            { symbol: 'F', meaning: 'زور (نيوٽن، N)' },
            { symbol: 'd', meaning: 'فاصلو (ميٽر، m)' },
          ],
        },
        {
          type: 'interactive',
          component: 'WorkEnergyTheoremSim',
        },
      ],
    },
    {
      id: 'energy',
      title: 'توانائي',
      blocks: [
        {
          type: 'definition',
          term: 'توانائي',
          definition: 'توانائي ڪم ڪرڻ جي صلاحيت آهي. توانائي جي پيمائش جول (J) ۾ ٿي ٿي.',
        },
        {
          type: 'definition',
          term: 'حرڪي توانائي',
          definition: 'ها توانائي آهي جيڪو ڪنھن شيء کي هن جي حرڪت جي سبب حاصل ٿي ٿي.',
          example: 'هلندڙ ڪڙي، اڏندڙ بال',
        },
        {
          type: 'definition',
          term: 'مخفي توانائي',
          definition: 'ڪشش ثقلي ميدان ۾ مقام جي سبب ذخيرو ٿيل توانائي.',
          example: 'شيلف تي ڪتاب، ڊيم جي پٺيان پاڻي',
        },
        {
          type: 'definition',
          term: 'حرڪي توانائي',
          definition: 'درجہ حرارت جي فرق جي سبب شين جي وچ ۾ منتقلي ٿيڻ واري توانائي.',
        },
        {
          type: 'definition',
          term: 'روشني جي توانائي',
          definition: 'شعاعي توانائي جيڪو ڏکي سگهجي ٿي. لهرن ۾ سفر ڪري ٿي.',
        },
        {
          type: 'definition',
          term: 'آواز جي توانائي',
          definition: 'ڪمپن سان پيدا ٿيڻ واري توانائي. ڪنھن ذريعي لهرن ۾ سفر ڪري ٿي.',
        },
        {
          type: 'definition',
          term: 'برقي توانائي',
          definition: 'برقي باري جي بهاءِ کان توانائي.',
        },
        {
          type: 'interactive',
          component: 'EnergyMatchingGame',
        },
      ],
    },
    {
      id: 'kinetic-energy',
      title: 'حرڪي توانائي',
      blocks: [
        {
          type: 'definition',
          term: 'حرڪي توانائي',
          definition: 'ها توانائي آهي جيڪو ڪنھن شيء کي هن جي حرڪت جي سبب حاصل ٿي ٿي. مادو ۽ رفتار تي منحصر آهي.',
        },
        {
          type: 'formula',
          name: 'حرڪي توانائي',
          formula: 'KE = ½mv²',
          variables: [
            { symbol: 'KE', meaning: 'حرڪي توانائي (جول، J)' },
            { symbol: 'm', meaning: 'مادو (kg)' },
            { symbol: 'v', meaning: 'رفتار (m/s)' },
          ],
        },
        {
          type: 'numerical',
          title: 'حرڪي توانائي جو حساب',
          problem: '2 kg جو شيء 3 m/s تي هلندو آهي. هن جي حرڪي توانائي معلوم ڪريو.',
          given: [
            { label: 'مادو', value: '2', unit: 'kg' },
            { label: 'رفتار', value: '3', unit: 'm/s' },
          ],
          find: 'حرڪي توانائي (KE)',
          solution: [
            'KE = ½mv²',
            'KE = ½ × 2 × 3²',
            'KE = ½ × 2 × 9',
            'KE = 9 J',
          ],
          answer: '9 J',
        },
        {
          type: 'interactive',
          component: 'KECalculator',
        },
      ],
    },
    {
      id: 'potential-energy',
      title: 'ڪشش ثقلي مخفي توانائي',
      blocks: [
        {
          type: 'definition',
          term: 'مخفي توانائي',
          definition: 'ڪشش ثقلي ميدان ۾ مقام جي سبب ذخيرو ٿيل توانائي. مادو، ڪشش ثقل ۽ اوچائي تي منحصر آهي.',
        },
        {
          type: 'formula',
          name: 'مخفي توانائي',
          formula: 'PE = mgh',
          variables: [
            { symbol: 'PE', meaning: 'مخفي توانائي (جول، J)' },
            { symbol: 'm', meaning: 'مادو (kg)' },
            { symbol: 'g', meaning: 'ڪشش ثقلي رفتار (9.8 m/s²)' },
            { symbol: 'h', meaning: 'اوچائي (m)' },
          ],
        },
        {
          type: 'interactive',
          component: 'PESim',
        },
      ],
    },
    {
      id: 'energy-conversion',
      title: 'توانائي جي تبديلي',
      blocks: [
        {
          type: 'definition',
          term: 'توانائي جي تبديلي',
          definition: 'توانائي هڪ شڪل کان ٻي شڪل ۾ بدل ٿي وڃي ٿي. توانائي نه بنايو وڃي ٿو نه ختم، فقط بدل ٿي وڃي ٿي.',
          example: 'برقي → روشني (بلب)، ڪيميائي → حرڪي (ڪڙي جو انجن)',
        },
        {
          type: 'interactive',
          component: 'EnergyConversionChain',
        },
        {
          type: 'interactive',
          component: 'RollerCoasterSim',
        },
      ],
    },
    {
      id: 'conservation',
      title: 'توانائي جي حفاظت جو قانون',
      blocks: [
        {
          type: 'definition',
          term: 'توانائي جو تحفظ',
          definition: 'توانائي نه بنايو وڃي ٿو نه ختم. اهو فقط هڪ شڪل کان ٻي شڪل ۾ بدل ٿي وڃي ٿو. ڪل توانائي مستقل رهي ٿي.',
          example: 'پينڊولم: مخفي (مٿي) → حرڪي (هيٺ) → مخفي (ٻي طرف). ڪل توانائي ها رهي ٿي.',
        },
        {
          type: 'interactive',
          component: 'PendulumSim',
        },
        {
          type: 'interactive',
          component: 'ElasticCollisionSim',
        },
      ],
    },
    {
      id: 'energy-resources',
      title: 'توانائي جا ذريعا',
      blocks: [
        {
          type: 'definition',
          term: 'قابل تجديد توانائي',
          definition: 'ذريعن کان توانائي جيڪو فطري طور تي ڀري وڃي سگهي ٿي.',
          example: 'سُرج، هوا، پاڻي، بايوماس، جيئو ٿرمل',
        },
        {
          type: 'definition',
          term: 'غير قابل تجديد توانائي',
          definition: 'محدود ذريعن کان توانائي جيڪو بالڪل ختم ٿي ويندي.',
          example: 'ڪوئلو، تيل، قدرتي گيس، نيوڪلئر',
        },
      ],
    },
    {
      id: 'power',
      title: 'طاقت',
      blocks: [
        {
          type: 'definition',
          term: 'طاقت',
          definition: 'طاقت ڪم ڪرڻ جو شرح يا توانائي جي منتقلي آهي.',
          example: '100W بلب في سيڪنڊ 100 جول استعمال ڪري ٿو',
        },
        {
          type: 'formula',
          name: 'طاقت',
          formula: 'P = W/t = E/t',
          variables: [
            { symbol: 'P', meaning: 'طاقت (واٽ، W)' },
            { symbol: 'W', meaning: 'ڪم (جول، J)' },
            { symbol: 't', meaning: 'وقت (سيڪنڊ، s)' },
          ],
        },
        {
          type: 'definition',
          term: 'هارس پاور',
          definition: '١ هارس پاور (hp) = 746 واٽ',
        },
        {
          type: 'interactive',
          component: 'PowerComparison',
        },
      ],
    },
    {
      id: 'efficiency',
      title: 'ڪارڪردگي',
      blocks: [
        {
          type: 'definition',
          term: 'ڪارڪردگي',
          definition: 'مفيد آوٽ پٽ جو ڪل ان پٽ سان تناسب آهي. هميشه 100% کان گهٽ — ڪجھ توانائي گرمي جي طور تي ضائع ٿي ٿي.',
          example: 'ڪڙي جو انجن: ~25% ڪارڪردگي، LED بلب: ~80% ڪارڪردگي',
        },
        {
          type: 'formula',
          name: 'ڪارڪردگي',
          formula: 'ڪارڪردگي = (مفيد آوٽ پٽ / ڪل ان پٽ) × 100%',
          variables: [
            { symbol: 'η', meaning: 'ڪارڪردگي (%)' },
          ],
        },
        {
          type: 'interactive',
          component: 'EfficiencyCalculator',
        },
        {
          type: 'interactive',
          component: 'RubeGoldbergEnergySim',
        },
      ],
    },
    {
      id: 'quiz',
      title: 'ڪوئز',
      blocks: [
        {
          type: 'quiz',
          questions: [
            { id: 'q1', question: 'توانائي جي ايس آئي ايڪو آهي:', options: ['واٽ (W)', 'جول (J)', 'نيوٽن (N)', 'پاسڪل (Pa)'], correctIndex: 1, type: 'mcq',
              explanation: '',
},
            { id: 'q2', question: '2 kg جو شيء 3 m/s تي هلندو آهي. هن جي حرڪي توانائي آهي:', options: ['6 J', '9 J', '18 J', '12 J'], correctIndex: 1, type: 'mcq',
              explanation: '',
},
            { id: 'q3', question: 'توانائي جو تحفظ مطلب آهي:', options: ['توانائي بنايو وڃي سگهي ٿو', 'توانائي ختم ٿي سگهي ٿي', 'توانائي بدل ٿي وڃي ٿي پر ڪل مستقل رهي ٿي', 'توانائي هميشه وڌي ٿي'], correctIndex: 2, type: 'mcq',
              explanation: '',
},
            { id: 'q4', question: 'طاقت جي پيمائش ٿي ٿي:', options: ['جول ۾', 'نيوٽن ۾', 'واٽ ۾', 'پاسڪل ۾'], correctIndex: 2, type: 'mcq',
              explanation: '',
},
            { id: 'q5', question: '40% ڪارڪردگي وارو انجن:', options: ['ان پٽ جو 40% مفيد ڪم ۾ بدل ٿو', '40% فيول استعمال ڪري ٿو', '40% طاقت جو نقصان ٿي ٿو', '40% وڌيڪ توانائي پيدا ڪري ٿو'], correctIndex: 0, type: 'mcq',
              explanation: '',
},
          ],
        },
      ],
    },
  ],
};

export default chapter08Sd;
