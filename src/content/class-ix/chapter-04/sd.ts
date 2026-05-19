import type { ChapterContent } from '../../types';

const chapter04Sd: ChapterContent = {
  id: 'chapter-04',
  classId: 'class-ix',
  title: 'قوت جو گردشي اثر',
  subtitle: 'ٽارڪ، توازن ۽ گردشي ميڪانيڪس',
  sections: [
    {
      id: 'torque',
      title: 'ٽارڪ (قوت جو مومنٽ)',
      blocks: [
        {
          type: 'definition',
          term: 'ٽارڪ',
          definition: 'ٽارڪ (يا مومنٽ) قوت جو گردشي اثر آهي. اهو قوت ۽ نقطي محور کان عمودي فاصلي تي منحصر آهي.',
          example: 'دروازي کي هينڊل کان ڌڪو ڏيڻ — لولي کان جتي ڊور هوندو، اتي سهلايي کان کليلي ويندي.',
        },
        {
          type: 'formula',
          name: 'ٽارڪ جو فارمولا',
          formula: 'τ = F × d',
          variables: [
            { symbol: 'τ', meaning: 'ٽارڪ (N·m)' },
            { symbol: 'F', meaning: 'لاڳو قوت (N)' },
            { symbol: 'd', meaning: 'نقطي محور کان عمودي فاصلو (m)' },
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
              question: 'قوت جي گردشي اثر کي چيوٿن ٿا:',
              options: ['قوت', 'ٽارڪ (مومنٽ)', 'دبائو', 'وزن'],
              correctIndex: 1,
            },
            {
              id: 'q2',
              question: 'جيڪڏهن 10 N جي قوت 2 m فاصلي تي لڳي ته ٽارڪ هوندو:',
              options: ['5 Nm', '12 Nm', '20 Nm', '8 Nm'],
              correctIndex: 2,
            },
          ],
        },
      ],
    },
    {
      id: 'like-unlike-forces',
      title: 'ميل ۽ مخالف متوازي قوتن',
      blocks: [
        {
          type: 'definition',
          term: 'ميل واريون قوتن',
          definition: 'قوتن هڪ ئي سمت ۾ ڪم ڪين ٿيون. مجموعي قوت مقدارن جو مجموعو هوندو آهي.',
          example: 'ٻه ماڻهو گاڏي کي پٺي کان هڪ ئي سمت ۾ ڌڪو لڳائين ٿا.',
        },
        {
          type: 'definition',
          term: 'مخالف قوتن',
          definition: 'قوتن مخالف سمتن ۾ ڪم ڪين ٿيون. مجموعي قوت فرق هوندو آهي.',
          example: 'ٻسي جو راند — طاقتور پاسو جيتي ٿو.',
        },
        {
          type: 'formula',
          name: 'ميل واري قوتن جو مجموعي',
          formula: 'R = F₁ + F₂',
        },
        {
          type: 'formula',
          name: 'مخالف قوتن جو مجموعي',
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
      title: 'مومنٽ آرم',
      blocks: [
        {
          type: 'definition',
          term: 'مومنٽ آرم',
          definition: 'نقطي محور کان قوت جي ڪارروائي جي ليڪ تائين عمودي فاصلو. فقط قوت جو عمودي حصو ٽارڪ پيدا ڪري ٿو.',
          example: 'رينچ کي زاويي تي استعمال ڪرڻ — فقط عمودي حصو بولٽ گھمائي ٿو.',
        },
        {
          type: 'formula',
          name: 'مومنٽ آرم',
          formula: 'MA = d × sin(θ)',
          variables: [
            { symbol: 'MA', meaning: 'مومنٽ آرم (m)' },
            { symbol: 'd', meaning: 'نقطي محور کان فاصلو (m)' },
            { symbol: 'θ', meaning: 'قوت ۽ ليور آرم جي وچ ۾ زاويو' },
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
      title: 'مومنٽ جو اصول',
      blocks: [
        {
          type: 'definition',
          term: 'مومنٽ جو اصول',
          definition: 'توازن ۾ ڪنھن شيء لاءِ، ڪنھن به نقطي جي باري ۾ گھڙي سمت مومنٽن جو مجموعو مخالف سمت مومنٽن جي مجموعي برابر هوندو آهي.',
          example: 'متوازن سيٽا — ڳڻهو ماڻهو نقطي محور جي قريبي بيھي ٿو.',
        },
        {
          type: 'formula',
          name: 'توازن جي شرط',
          formula: 'Σ گھڙي سمت مومنٽ = Σ مخالف سمت مومنٽ',
        },
        {
          type: 'interactive',
          component: 'PrincipleOfMomentsSim',
        },
      ],
    },
    {
      id: 'center-of-mass',
      title: 'مادي جو مرڪز ۽ ڪشش ثقل جو مرڪز',
      blocks: [
        {
          type: 'definition',
          term: 'مادي جو مرڪز (CM)',
          definition: 'اُھو نقطو جتي ڪنھن شيء جي مادو مركوز هوندو آهي. متوازن شيءن لاءِ اهو ھندسي مرڪز ۾ هوندو آهي.',
          example: 'يڪسان ڏنگر جو CM هن جي وچ ۾ آهي.',
        },
        {
          type: 'definition',
          term: 'ڪشش ثقل جو مرڪز (CG)',
          definition: 'اُھو نقطو جتي ڪنھن شيء جو وزن ڪم ڪري ٿو. عام طور تي زمين جي قريبي ننڍيء شيءن لاءِ CM وانگو هوندو آهي.',
          example: 'مثلثي ورق جو CG ميڊينز جي تقاطع تي هوندو آهي.',
        },
        {
          type: 'interactive',
          component: 'CenterOfMassFinder',
        },
      ],
    },
    {
      id: 'equilibrium',
      title: 'توازن',
      blocks: [
        {
          type: 'definition',
          term: 'توازن',
          definition: 'ڪنھن شيء توازن ۾ هوندي آهي جڏو اهو سڪون ۾ هجي يا مستقل رفتار سان حرڪت ڪري رهيو هجي (ڪي رفتار نه هجي).',
          example: 'ميز تي رکيل ڪتاب ساکن توازن ۾ آهي.',
        },
        {
          type: 'formula',
          name: 'پهلو شرط',
          formula: 'ΣF = 0',
          variables: [{ symbol: 'ΣF', meaning: ' شيء تي خالص قوت صفر هئڻ گهرجي' }],
        },
        {
          type: 'formula',
          name: 'ٻيو شرط',
          formula: 'Στ = 0',
          variables: [{ symbol: 'Στ', meaning: ' شيء تي خالص ٽارڪ صفر هئڻ گهرجي' }],
        },
        {
          type: 'definition',
          term: 'توازن جا قسم',
          definition: 'مستحڪم: اصلي پوزيشن تي واپس ايندو آهي (ڪٻور ۾ گينڊ). غير مستحڪم: وڌيڪ ڊور وڃي ٿو (ڏنگر تي گينڊ). بيطرف: نئين پوزيشن ۾ رهي ٿو (ميز تي گينڊ).',
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
      title: 'ڪپل',
      blocks: [
        {
          type: 'definition',
          term: 'ڪپل',
          definition: 'ڪپل بَه برابر ۽ مخالف قوتن آهن جيڪون ڪنھن شيء تي هڪ ئي نقطي کان نه گزرجن. اهي بنا حرڪت جي گردش پيدا ڪين ٿيون.',
          example: 'اسٽيئرنگ ويل گھمڻ — ٻن هٿ مخالف پاسي تي ڌڪو لڳائين ٿا.',
        },
        {
          type: 'formula',
          name: 'ڪپل جو ٽارڪ',
          formula: 'τ = F × d',
          variables: [
            { symbol: 'τ', meaning: 'ڪپل جو ٽارڪ (N·m)' },
            { symbol: 'F', meaning: 'هڪ قوت جي مقدار (N)' },
            { symbol: 'd', meaning: 'قوتن جي وچ ۾ عمودي فاصلو (m)' },
          ],
        },
      ],
    },
    {
      id: 'quiz',
      title: 'يونٽ ٤ ڪوئز',
      blocks: [
        {
          type: 'quiz',
          questions: [
            {
              id: 'q1',
              question: 'قوت جي گردشي اثر کي چيوٿن ٿا:',
              options: ['قوت', 'ٽارڪ (مومنٽ)', 'دبائو', 'وزن'],
              correctIndex: 1,
            },
            {
              id: 'q2',
              question: 'جيڪڏهن 10 N جي قوت 2 m فاصلي تي لڳي ته ٽارڪ هوندو:',
              options: ['5 Nm', '12 Nm', '20 Nm', '8 Nm'],
              correctIndex: 2,
            },
            {
              id: 'q3',
              question: 'توازن لاءِ ڪهڙيون شرطون پوريون ٿيڻ گهرجن؟',
              options: ['فقط ΣF = 0', 'فقط Στ = 0', 'ΣF = 0 ۽ Στ = 0 ٻنهي', 'ڪي نه'],
              correctIndex: 2,
            },
            {
              id: 'q4',
              question: 'ڪپل ۾ هوندو آهي:',
              options: ['ٻه برابر قوتن هڪ ئي سمت ۾', 'ٻه برابر ۽ مخالف قوتن هڪ ليڪ ۾ نه', 'هڪ واحد قوت', 'ٻه غير برابر قوتن'],
              correctIndex: 1,
            },
            {
              id: 'q5',
              question: 'يڪسان ڏنگر جي ڪشش ثقل جو مرڪز آهي:',
              options: ['هڪ سر تي', 'وچ ۾', 'سمت تي منحصر', 'ڏنگر جي ٻاهر'],
              correctIndex: 1,
            },
          ],
        },
      ],
    },
  ],
};

export default chapter04Sd;
