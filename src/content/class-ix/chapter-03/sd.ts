import type { ChapterContent } from '../../types';

const chapter03Sd: ChapterContent = {
  id: 'chapter-03',
  classId: 'class-ix',
  title: 'ڊائناميڪس',
  subtitle: 'قوت، نيوٽن جا قانون، رگڙ، سڪر، مادو، وزن۽ مومينٽم',
  objectives: [
    'نيوٽن جا ٽي قانون بيان ڪريو',
    'قوت جي تعريف ڏيو ۽ رابطي جي قوتون ۽ رابطي کان سواءِ قوتون ۾ فرق ڪريو',
    'رگڙ، ان جا قسم ۽ گهٽائڻ جا طريقي بيان ڪريو',
    'مادو ۽ وزن ۾ فرق ڪريو',
    'مومينٽم جي تعريف ڏيو ۽ مومينٽم جي بچاءُ جو قانون بيان ڪريو',
  ],
  sections: [
    {
      id: 'force',
      title: 'قوت',
      blocks: [
        { type: 'definition', term: 'قوت', definition: 'ڌڪو يا ڪڍڻ جيڪو شيءِ جي حركت جي حالت يا شڪل بدل سگهيٿي. اهو ويڪٽر مقدار آهي.', example: 'بال تي لٽ مارڻ، دروازو ڪڍڻ، ڪشش ثقل سان شين هيٺ ڪرڻ.' },
        { type: 'definition', term: 'قوت جا اثر', definition: 'قوت رفتار بدل سگهيٿي، سمت بدل سگهيٿي، يا شڪل بدل سگهيٿي.', example: 'گاڏي تيز ڪرڻ (رفتار بدلڻ)، اسٽيئرنگ ويل گھومنڊڻ (سمت بدلڻ)، بال ڏٻڻ (شڪل بدلڻ).' },
        { type: 'formula', name: 'قوت جي SI اڪائي', formula: '1 نيوٽن (N) = 1 kg × 1 m/s²', variables: [{ symbol: 'N', meaning: 'نيوٽن — قوت جي اڪائي' }] },
        { type: 'interactive', component: 'PushPullSim' },
      ],
    },
    {
      id: 'newtons-laws',
      title: 'نيوٽن جا قانونِ حركت',
      blocks: [
        { type: 'definition', term: 'نيوٽن جو پهلو قانون (قانونِ سڪر)', definition: 'ڪنھن شيءِ پنھنجي سڪون يا هڪجهڙي حركت جي حالت۾ اُهي وقت رهيٿي جيسري ڪنھن ٻاهرين قوت اُن تي نه لڳي.', example: 'ميز تي ڪتاب توهان جيئن نه ڌڪائي تائين ساڪن رهيٿي.' },
        { type: 'definition', term: 'نيوٽن جو ٻيو قانون', definition: 'قوت مادو۽ اسراع جي ضرب آهي: F = ma.', example: 'ڀاري باڪس کي ڌڪڻ هلڪي باڪس کان وڌيڪ قوت گهربل آهي.' },
        { type: 'definition', term: 'نيوٽن جو ٽيون قانون', definition: 'هر عمل لاءِ برابر۽ مخالف ردعمل آهي.', example: 'جڏو توهان ديوال کي ڌڪو ڏيوٿا تڏو ديوال به واپس ڌڪو ڏيڻٿي.' },
        { type: 'formula', name: 'نيوٽن جو ٻيو قانون', formula: 'F = m × a', variables: [{ symbol: 'F', meaning: 'قوت (N)' }, { symbol: 'm', meaning: 'مادو (kg)' }, { symbol: 'a', meaning: 'اسراع (m/s²)' }] },
        { type: 'interactive', component: 'CoinCardExperiment' },
        { type: 'interactive', component: 'FmaCalculator' },
        { type: 'interactive', component: 'ActionReactionGame' },
      ],
    },
    {
      id: 'friction',
      title: 'رگڙ',
      blocks: [
        { type: 'definition', term: 'رگڙ', definition: 'اُها قوت جيڪاٻ سطحن جي وچ۾ حركت کي مخالف آهي.', example: 'هٿ کي هڪ ٻئي تي رگڙڻ سان رگڙ گرمي پيدا ٿيٿي.' },
        { type: 'definition', term: 'ساڪن رگڙ', definition: 'رگڙ جيڪا حركت شروع ٿيڻ کان روڪيٿي. باڪس کي سلان کان بچائيٿي.', example: 'ڀاري باڪس فرش تي اُن لاءِ ساڪن رهيٿو ڇوڪيڪ ساڪن رگڙ اُن کي روڪيٿي.' },
        { type: 'definition', term: 'سلڊنگ (متحرڪ) رگڙ', definition: 'رگڙ جيڪا سلڊنگ حركت کي مخالف آهي. اُها ساڪن رگڙ کان گهٽ آهي.', example: 'سلڊ ڪتاب متحرڪ رگڙ جي سبب سست ٿيٿي.' },
        { type: 'definition', term: 'رولنگ رگڙ', definition: 'رگڙ جيڪا رولنگ حركت کي مخالف آهي. سلڊنگ رگڙ کان ڪيترائي گهٽ!', example: 'ٻال۽ ٻيلن ۾ رولنگ رگڙ آهي.' },
        { type: 'interactive', component: 'FrictionSlopeSim' },
        { type: 'interactive', component: 'StaticSlidingFrictionSim' },
      ],
    },
    {
      id: 'inertia',
      title: 'سڪر',
      blocks: [
        { type: 'definition', term: 'سڪر', definition: 'ڪنھن شيءِ جي حركت جي حالت۾ تبديلي کي روڪڻ جو رجحان. وڌيڪ مادو = وڌيڪ سڪر.', example: 'ڀاري ٽرڪ کي روڪڻ سائيڪل کان مشڪل آهي — ان ۾ وڌيڪ سڪر آهي.' },
        { type: 'interactive', component: 'InertiaRaceSim' },
      ],
    },
    {
      id: 'mass-weight',
      title: 'مادو۽ وزن',
      blocks: [
        { type: 'definition', term: 'مادو', definition: 'ڪنھن شيءِ ۾ مادي جي مقدار. اُها ڪٿي نه بدلندي. اڪائي: ڪلوگرام (kg).', example: 'توهانجو مادو زمين۽ چنڊ تي هڪجهڙو آهي.' },
        { type: 'definition', term: 'وزن', definition: 'مادو تي ڪشش ثقل جي قوت. مختلف سيارن تي بدلندي آهي. اڪائي: نيوٽن (N).', example: 'توهانجو وزن چنڊ تي گهٽ آهي ڇوڪيڪ اُتي ڪشش ثقل ڪمزور آهي.' },
        { type: 'formula', name: 'وزن جو فارمولا', formula: 'W = m × g', variables: [{ symbol: 'W', meaning: 'وزن (N)' }, { symbol: 'm', meaning: 'مادو (kg)' }, { symbol: 'g', meaning: 'ڪشش ثقل جي سبب اسراع (m/s²)' }] },
        { type: 'interactive', component: 'WeightCalculator' },
      ],
    },
    {
      id: 'momentum',
      title: 'مومينٽم',
      blocks: [
        { type: 'definition', term: 'مومينٽم', definition: 'ڪنھن جسم ۾ حركت جي مقدار. مومينٽم = مادو × سمت رفتار. اڪائي: kg·m/s.', example: 'تيز رفتار ڀاري ٽرڪ جو مومينٽم سست گاڏي کان وڌيڪ آهي.' },
        { type: 'formula', name: 'مومينٽم جو فارمولا', formula: 'p = m × v', variables: [{ symbol: 'p', meaning: 'مومينٽم (kg·m/s)' }, { symbol: 'm', meaning: 'مادو (kg)' }, { symbol: 'v', meaning: 'سمت رفتار (m/s)' }] },
        { type: 'definition', term: 'حفظ جو قانون', definition: 'ڪنھن به ٽڪر۾ ٽڪر کان اڳ ڪل مومينٽم = ٽڪر کان پوءِ ڪل مومينٽم. مومينٽم ڪڲي نٿو وڃي.', example: 'ڪار حادثي ۾ ٻين ڪارن جو ڪل مومينٽم ٽڪر کان اڳ۽ پوءِ هڪجهڙو آهي.' },
        { type: 'interactive', component: 'CollisionSim' },
        { type: 'interactive', component: 'ImpulseMomentumSim' },
      ],
    },
    {
      id: 'circular-motion',
      title: 'ڳڪو ۾ حركت',
      blocks: [
        { type: 'definition', term: 'مرڪزي قوت', definition: 'اُها قوت جيڪا شيءِ کي ڳڪي ۾ رکيٿي. اُها هميشه مرڪز طرف هوندي آهي.', example: 'ڪشش ثقل چنڊ کي مدار ۾ رکيٿي. تنش بال کي ڏوري تي ڳڪي ۾ رکيٿو.' },
        { type: 'formula', name: 'مرڪزي قوت', formula: 'Fc = mv²/r', variables: [{ symbol: 'Fc', meaning: 'مرڪزي قوت (N)' }, { symbol: 'm', meaning: 'مادو (kg)' }, { symbol: 'v', meaning: 'سمت رفتار (m/s)' }, { symbol: 'r', meaning: 'نصف قطر (m)' }] },
        { type: 'interactive', component: 'CircularMotionSim' },
        { type: 'interactive', component: 'FreeBodyDiagramSim' },
      ],
    },
    {
      id: 'quiz',
      title: 'ڪوئز',
      blocks: [
        {
          type: 'quiz',
          questions: [
            { id: 'q1', type: 'mcq', question: 'نيوٽن جو پهلو قانون ٻي نالي سان پڇو وڃيٿو:', options: ['قانونِ اسراع', 'قانونِ سڪر', 'قانونِ عمل۽ ردعمل', 'قانونِ ڪشش ثقل'], correctIndex: 1, explanation: 'نيوٽن جو پهلو قانون قانونِ سڪر ڇوڪيڪ اُها بيان ڪريٿو ته شيءون پنھنجي حركت۾ تبديلي جو مزاحمت ڪينٿيون.' },
            { id: 'q2', type: 'mcq', question: 'جيڪڏهن F = 20 N۽ m = 4 kg هجي ته اسراع ڪيترو هوندو؟', options: ['80 m/s²', '5 m/s²', '24 m/s²', '16 m/s²'], correctIndex: 1, explanation: 'a = F/m = 20/4 = 5 m/s².' },
            { id: 'q3', type: 'mcq', question: 'جڏو توهان ديوال کي ڌڪو ڏيوٿا تڏو ديوال ڌڪو وڌائيٿو:', options: ['وڌيڪ قوت سان', 'گهٽ قوت سان', 'برابر۽ مخالف قوت سان', 'ڪي قوت ناهي'], correctIndex: 2, explanation: 'نيوٽن جي ٽيون قانون موجب ديوال برابر۽ مخالف قوت سان واپس ڌڪو ڏيڻٿي.' },
            { id: 'q4', type: 'mcq', question: 'مومينٽم جي SI اڪائي آهي:', options: ['نيوٽن (N)', 'kg·m/s', 'm/s²', 'جول (J)'], correctIndex: 1, explanation: 'مومينٽم = مادو × سمت رفتار، اُن لاءِ اڪائي = kg × m/s = kg·m/s.' },
            { id: 'q5', type: 'mcq', question: 'مرڪزي قوت هميشه ڪنھن سمت۾ هوندي آهي:', options: ['مرڪز کان ڊور', 'مرڪز طرف', 'ڳڪي جي مماسي طرف', 'مٿي طرف'], correctIndex: 1, explanation: 'مرڪزي مطلب "مرڪز ڳولڻ" — اُها هميشه ڳڪي جي مرڪز طرف هوندي آهي.' },
          ],
        },
      ],
    },
  ],
};

export default chapter03Sd;
