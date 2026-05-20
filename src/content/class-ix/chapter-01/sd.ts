import type { ChapterContent } from '../../types';

const chapter01Sd: ChapterContent = {
  id: 'chapter-01',
  classId: 'class-ix',
  title: 'طبعي مقدارون ۽ پيمائش',
  subtitle: 'فزڪس ڇا آهي، مقدارون، اڪائين ۽ پيمائش',
  objectives: [
    'فزڪس جي تعريف ڏيو ۽ قدرتي ڌرتي کي سمجھڻ ۾ ان جي حدون بيان ڪريو',
    'طبيعي مقدارون بنيادي مقدارون ۽ ماخوذ مقدارون ۾ درجه بندي ڪريو',
    'SI جون ٽي بنيادي مقدارون ۽ انهن جون اڪائين ياد ڪريو',
    'سائنسي تقرير ۽ SI پيشون استعمال ڪندي وڏي ۽ ننڍي مقدارون بيان ڪريو',
    'پيمائش جي اوزارن جو استعمال ڊيمونسٽريٽ ڪريو',
    'پيمائش ۽ حسابن ۾ اهم شڪلن جا قواعد لاڳو ڪريو',
  ],
  sections: [
    {
      id: 'what-is-physics',
      title: 'فزڪس ڇا آهي؟',
      blocks: [
        {
          type: 'definition',
          term: 'فزڪس',
          definition: 'فزڪس سائنس جي اها شاخ آهي جيڪا مادي، توانائي ۽ انهن جي باھمي لاڳاپي جو مطالعو ڪري ٿي.',
        },
      ],
    },
    {
      id: 'physical-quantities',
      title: 'طبيعي مقدارون',
      blocks: [
        {
          type: 'definition',
          term: 'بنيادي مقدارون (7)',
          definition: 'اها مقدارون جيڪا آپس ۾ مستقل هونديون آهي ۽ ٻين مقدارن مان حاصل نہ ٿي سگهن ٿيون.',
          example: 'ڊيگھ، مادو، وقت، گرمي پد، برقی وهڪرو، مادي جي مقدار، روشني جي شدت',
        },
        {
          type: 'definition',
          term: 'مشتق مقدارون',
          definition: 'اها مقدارون جيڪا بنيادي مقدارن کي ضرب يا تقسيم ڪرڻ سان حاصل ٿين ٿيون.',
          example: 'رفتار = فاصلو / وقت، قوت = مادو × تيزي، گهاٽائي = مادو / مقدار',
        },
      ],
    },
    {
      id: 'si-units',
      title: 'ايس آئي يونٽ',
      blocks: [
        {
          type: 'formula',
          name: 'ايس آئي بنيادي اڪائين',
          formula: '7 بنيادي مقدارون → 7 بنيادي اڪائين',
          variables: [
            { symbol: 'm', meaning: 'ميٽر — ڊيگهه جي اڪائي' },
            { symbol: 'kg', meaning: 'ڪلوگرام — مادو جي اڪائي' },
            { symbol: 's', meaning: 'سيڪنڊ — وقت جي اڪائي' },
            { symbol: 'A', meaning: 'ايمپيئر — برقی وهڪري جي اڪائي' },
            { symbol: 'K', meaning: 'ڪيلون — گرمي پد جي اڪائي' },
            { symbol: 'mol', meaning: 'مول — مادي جي مقدار جي اڪائي' },
            { symbol: 'cd', meaning: 'ڪينڊيلا — روشني جي شدت جي اڪائي' },
          ],
        },
      ],
    },
    {
      id: 'si-prefixes',
      title: 'ايس آئي پريفڪس',
      blocks: [
        {
          type: 'definition',
          term: 'پريفڪس',
          definition: 'پريفڪس وڏي يا ننڍي مقدارن کي ظاہر ڪرڻ لاءِ استعمال ٿين ٿا.',
          example: 'ڪلو (k) = 10³، ميگا (M) = 10⁶، ملی (m) = 10⁻³، مائيڪرو (μ) = 10⁻⁶، نينو (n) = 10⁻⁹، سينٽي (c) = 10⁻²',
        },
      ],
    },
    {
      id: 'scientific-notation',
      title: 'سائنسي اشاريہ',
      blocks: [
        {
          type: 'definition',
          term: 'سائنسي اشاريہ',
          definition: 'وڏي يا ننڍي تعدادن کي 10 جي قوتن سان لکڻ جو طريقو.',
          example: 'روشني جي رفتار: 3 × 10⁸ m/s، الیڪٽران جو مادو: 9.1 × 10⁻³¹ kg',
        },
      ],
    },
    {
      id: 'measuring-instruments',
      title: 'پيمائش جا اوزار',
      blocks: [
        {
          type: 'definition',
          term: 'ميٽر رول',
          definition: '1 ميٽر تائين ڊيگهه ماپڻ لاءِ استعمال ٿيندو آهي. ليٽ ڪائونٽ: 1 ملی ميٽر (0.1 سينٽي ميٽر).',
        },
        {
          type: 'definition',
          term: 'ورنير ڪيلپرز',
          definition: 'سڪن يا تار جي ٿلهائي جھڙي ننڍي ڊيگهه ماپڻ لاءِ استعمال ٿيندو آهي. ليٽ ڪائونٽ: 0.1 ملی ميٽر (0.01 سينٽي ميٽر).',
        },
        {
          type: 'definition',
          term: 'اسڪرو گيج',
          definition: 'تار يا شيٽ جي ٿلهائي جھڙي تمام ننڍي ڊيگهه ماپڻ لاءِ استعمال ٿيندو آهي. ليٽ ڪائونٽ: 0.01 ملی ميٽر.',
        },
        {
          type: 'definition',
          term: 'فيزيڪل بيلنس',
          definition: 'معياري وزن جي ڀيٽ واري طريقي سان شين جي ڪميت ماپڻ لاءِ استعمال ٿيندو آهي. ليٽ ڪائونٽ: 0.1 گرام.',
        },
      ],
    },
    {
      id: 'errors-sig-figs',
      title: 'غلطيون ۽ نمايان انگ',
      blocks: [
        {
          type: 'definition',
          term: 'منظم غلطيون',
          definition: 'غلطيون جيڪا هڪ سمتي ۾ دهرايون وڃن ٿيون، عام طور پر خراب آلا يا غلط طريقن سان.',
        },
        {
          type: 'definition',
          term: 'بے ترتيب غلطيون',
          definition: 'پيرالڪس، انساني غلطين، يا غير متوقع تبديلن سان ٿيندڙ غير منظم غلطيون.',
        },
        {
          type: 'definition',
          term: 'نمايان انگن جا قاعدا',
          definition: 'پيمائش ۾ ڪهڙا انگ بامعنی آهن اهو طي ڪرڻ جا قاعدا.',
          example: '1. سڀ غير صفري انگ نمايان هون ٿا. 2. غير صفري انگن جي وچ ۾ موجود صفر نمايان هون ٿا. 3. شروع ۾ ايندڙ صفر نمايان نہ هوندا. 4. اعشاريہ کان پوءِ ايندڙ صفر نمايان هوندا.',
        },
      ],
    },
    {
      id: 'matching-game',
      title: 'مقدار کي اڪائي سان ملائو',
      blocks: [
        {
          type: 'interactive',
          component: 'MatchingGame',
          props: {
            gameType: 'quantity-unit',
          },
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
              question: 'ڊيگهه جي ايس آئي اڪائي ڪهڙي آهي؟',
              options: ['سينٽي ميٽر', 'ميٽر', 'ڪلوميٽر', 'ملي ميٽر'],
              correctIndex: 1,
              type: 'mcq',
              explanation: '',
            },
            {
              id: 'q2',
              question: 'ايس آئي نظام ۾ بنيادي مقدارون ڪيتريون آهن؟',
              options: ['5', '6', '7', '10'],
              correctIndex: 2,
              type: 'mcq',
              explanation: '',
            },
            {
              id: 'q3',
              question: 'ورنير ڪيلپرز جو ليٽ ڪائونٽ ڇا آهي؟',
              options: ['0.01 ملي ميٽر', '0.1 ملي ميٽر', '1 ملي ميٽر', '0.001 ملي ميٽر'],
              correctIndex: 1,
                          type: 'mcq',
              explanation: '',
},
            {
              id: 'q4',
              question: 'هيٺ ڏنل مان ڪهڙي مشتق مقدار آهي؟',
              options: ['مادو', 'ڊيگھ', 'وقت', 'رفتار'],
              correctIndex: 3,
                          type: 'mcq',
              explanation: '',
},
            {
              id: 'q5',
              question: "پريفڪس 'ڪلو' ڪهڙي قدر کي ظاہر ڪري ٿو؟",
              options: ['10⁻³', '10²', '10³', '10⁶'],
              correctIndex: 2,
                          type: 'mcq',
              explanation: '',
},
          ],
        },
      ],
    },
  ],
};

export default chapter01Sd;
