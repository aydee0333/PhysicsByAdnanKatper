import type { ChapterContent } from '../../types';

const chapter07Sd: ChapterContent = {
  id: 'chapter-07',
  classId: 'class-ix',
  title: 'مادي جون خاصيتون',
  subtitle: 'مادي جون حالتون، لچڪ، سيالن ۾ دبائو، سطحي ڪشش ۽ وسڪوسيٽي',
  objectives: [
    'مادي جون ٽيون حالتون بيان ڪريو',
    'ارشميڊيز جا اصول بيان ڪريو ۽ تيران جا مسئلا حل ڪريو',
    'پاسڪال جو قانون ۽ هائيڊروليڪ نظامن ۾ ان جو استعمال بيان ڪريو',
    'وسڪوسيٽي جي تعريف ڏيو ۽ اثر پذير ڪرڻ ورا عوامل بيان ڪريو',
    'سطحي ڪشش ۽ سيالن جي روڀ تي ان جا اثرات بيان ڪريو',
    'P = ρgh استعمال ڪندي سيالن ۾ دبائو جا مسئلا حل ڪريو',
  ],
  sections: [
    {
      id: 'kinetic-molecular',
      title: 'مادي جو حرڪاتي مالیڪيولر ماڊل',
      blocks: [
        { type: 'definition', term: 'ٽيون حالتون', definition: 'مادو ٽيون حالتون ۾ موجود هوندو آهي: ٺوس (紧密 packed، مقرر شڪل)، مايع (سست packed، ٻرت جي شڪل وٺي ٿو)، ۽ گيس (تمام پري، ٻرت ڀري ٿو).' },
        { type: 'interactive', component: 'ParticleAnimation' },
      ],
    },
    {
      id: 'elasticity-review',
      title: 'لچڪ (جائيزو)',
      blocks: [
        { type: 'definition', term: 'لچڪ', definition: 'لچڪ ڪنھن مادي جي اُها خاصيت آهي جيڪا بگاڻ واري قوت ڪڍڻ کان پوءِ اصلي شڪل ۾ واپس ايندي آهي.' },
        { type: 'formula', name: 'لچڪ جي حد', formula: 'لچڪ جي حد ۾، توسیع ∝ قوت' },
        { type: 'interactive', component: 'SpringSim7' },
      ],
    },
    {
      id: 'pressure-in-liquids',
      title: 'سيالن ۾ دبائو',
      blocks: [
        { type: 'definition', term: 'سيال جو دبائو', definition: 'سيال ۾ دبائو ڏرائي سان وڌي ٿو وڃي ٿو. هڪ ڏرائي = هڪ دبائو ڀڃو ٻرت جي شڪل ڪي به هجي.' },
        { type: 'formula', name: 'سيال جو دبائو', formula: 'P = ρ × g × h', variables: [{ symbol: 'ρ', meaning: 'گهڻڪ (kg/m³)' }, { symbol: 'g', meaning: '9.8 m/s²' }, { symbol: 'h', meaning: 'ڏرائي (m)' }] },
        { type: 'interactive', component: 'LiquidPressureSim' },
      ],
    },
    {
      id: 'pascals-law',
      title: 'پاسڪل جو قانون',
      blocks: [
        { type: 'definition', term: 'پاسڪل جو قانون', definition: 'بند سيال تي لڳائيل دبائو سيال جي هر حصي ۽ ٻرت جي ڀتن تي يڪسان طور تي منتقل ٿي ٿو.' },
        { type: 'formula', name: 'پاسڪل جو فارمولا', formula: 'P = F₁/A₁ = F₂/A₂' },
        { type: 'interactive', component: 'PascalLawSim' },
      ],
    },
    {
      id: 'surface-tension',
      title: 'سطحي ڪشش',
      blocks: [
        { type: 'definition', term: 'سطحي ڪشش', definition: 'سطحي ڪشش سيال جي سطح کي ڪڍيل لچڪدار پردن جهڙو برتاؤ ڪرائي ٿي. سيال جي مالیڪيولن جي وچ ۾ cohesive قوتن کان پيدا ٿي ٿي.' },
        { type: 'interactive', component: 'SurfaceTensionSim' },
      ],
    },
    {
      id: 'viscosity',
      title: 'وسڪوسيٽي',
      blocks: [
        { type: 'definition', term: 'وسڪوسيٽي', definition: 'وسڪوسيٽي سيال جي اندروني رگڙ آهي جيڪا ان جي بہاء کي روڪي ٿي. وڌيڪ وسڪوسيٽي = سست بہاء.' },
        { type: 'interactive', component: 'ViscositySim' },
      ],
    },
    {
      id: 'bernoulli',
      title: 'برنولي جو اصول',
      blocks: [
        { type: 'definition', term: 'برنولي جو اصول', definition: 'جيتي سيال جي رفتار وڌيڪ هوندي آهي، دبائو گهٽ هوندو آهي — ۽ بلڪل الٽ. P + ½ρv² + ρgh = مستقل.' },
        { type: 'interactive', component: 'BernoulliSim' },
        { type: 'interactive', component: 'StreamlineFlowSim' },
      ],
    },
    {
      id: 'hooke-law-exp',
      title: 'هوڪ جو قانون تجربيو',
      blocks: [
        { type: 'definition', term: 'تجربيو', definition: 'هوڪ جي قانون جي تصديق لاءِ قوت بمقابلہ توسیع گراف ٻنايو. لچڪ جي حد ۾، گراف هڪ سڌي ليڪ آهي.' },
        { type: 'interactive', component: 'HookeLawExp' },
      ],
    },
    {
      id: 'quiz',
      title: 'ايم سي ڪوئز',
      blocks: [
        {
          type: 'quiz',
          questions: [
            { id: 'q1', question: 'ڪن حالت ۾ ذرات紧密 packed هوندا؟', options: ['گيس', 'مايع', 'ٺوس', 'پلازما'], correctIndex: 2, type: 'mcq',
              explanation: '',
},
            { id: 'q2', question: 'سيال جو دبائو منحصر آهي:', options: ['ٻرت جي شڪل تي', 'ڏرائي، گهڻڪ ۽ g تي', 'سيال جي حجم تي', 'صرف حرارت تي'], correctIndex: 1, type: 'mcq',
              explanation: '',
},
            { id: 'q3', question: 'پاسڪل جو قانون استعمال ٿي ٿو:', options: ['ٿرماميٽر ۾', 'هائيڊرولڪ پريس ۾', 'بيروميٽر ۾', 'سپيڊوميٽر ۾'], correctIndex: 1, type: 'mcq',
              explanation: '',
},
            { id: 'q4', question: 'سطحي ڪشش ڪن کان پيدا ٿي ٿي؟', options: ['ڪشش ثقل کان', 'cohesive قوتن کان', 'مقناطيسي قوتن کان', 'برقي رو کان'], correctIndex: 1, type: 'mcq',
              explanation: '',
},
            { id: 'q5', question: 'ڪن ۾ تمام وڌيڪ وسڪوسيٽي آهي؟', options: ['پاڻي', 'تيل', 'شاهدو', 'الڪحل'], correctIndex: 2, type: 'mcq',
              explanation: '',
},
          ],
        },
      ],
    },
  ],
};

export default chapter07Sd;
