import type { ChapterContent } from '../../types';

const chapter02Sd: ChapterContent = {
  id: 'chapter-02',
  classId: 'class-ix',
  title: 'حرڪيات',
  subtitle: 'حرڪت جو مطالعو — فاصلي، جابجائي، رفتار، سمت رفتار۽ اسراع',
  objectives: [
    'فاصلو ۽ جابجائي ۾ فرق سمجھايو',
    'رفتار ۽ سمت رفتار جي تعريف ڏيو',
    'اسراع جي تعريف ڏيو ۽ حرڪت جي مساوات سان مسئلا حل ڪريو',
    'فاصلو-وقت ۽ رفتار-وقت جي گراف سمجھايو',
    'يڪساني تيز حرڪت ۽ آزاد سقوط بيان ڪريو',
  ],
  sections: [
    {
      id: 'rest-motion',
      title: 'سڪون۽ حركت',
      blocks: [
        { type: 'definition', term: 'سڪون', definition: 'ڪنھن شيءِ سڪون ۾ آهي جيڪڏهن اهو پنھنجي ماحول جي حوالي کان پنھنجي پوزيشن نه بدلڻ.', example: 'ميز تي رکيل ڪتاب سڪون ۾ آهي.' },
        { type: 'definition', term: 'حرڪت', definition: 'ڪنھن شيءِ حركت ۾ آهي جيڪڏهن اهو پنھنجي ماحول جي حوالي کان پنھنجي پوزيشن بدلڻ.', example: 'سڙڪ تي هلندڙ گاڏي حركت ۾ آهي.' },
        { type: 'definition', term: 'حرڪت جا قسم', definition: 'حرڪت سڌي، ڳڪي، ڦرندڙ، ٿڌڪندڙ يا بي ترتيب هئي سگهي ٿي.', example: 'سڌي سڙڪ تي گاڏي (سڌي)، گھومندا پهي (ڦرندڙ)، پينڊولم (ٿڌڪندڙ).' },
        { type: 'interactive', component: 'MotionTypesAnimation' },
      ],
    },
    {
      id: 'distance-displacement',
      title: 'فاصلو۽ جابجائي',
      blocks: [
        { type: 'definition', term: 'فاصلو', definition: 'ڪنھن شيءِ طي ٿيل ڪل رستو. اهو اسڪيلر مقدار آهي.', example: 'جيڪڏهن توهان 3 ميٽر مشرقي هلڻ پوءِ 4 ميٽر مغربي ته فاصلي = 7 ميٽر.' },
        { type: 'definition', term: 'جابجائي', definition: 'شروعاتي کان آخري مقام تائين سڀ کان ننڍڌو سڌو رستو. اهو ويڪٽر مقدار آهي.', example: 'جيڪڏهن توهان 3 ميٽر مشرقي هلڻ پوءِ 4 ميٽر مغربي ته جابجائي = 1 ميٽر مغربي.' },
        { type: 'formula', name: 'جابجائي جو فارمولا', formula: 'Δx = x₂ − x₁', variables: [{ symbol: 'Δx', meaning: 'جابجائي' }, { symbol: 'x₂', meaning: 'آخري مقام' }, { symbol: 'x₁', meaning: 'شروعاتي مقام' }] },
        { type: 'interactive', component: 'DistanceDisplacementExplainer' },
      ],
    },
    {
      id: 'speed-velocity',
      title: 'رفتار۽ سمت رفتار',
      blocks: [
        { type: 'definition', term: 'رفتار', definition: 'في واحدي وقت طي ٿيل فاصلي. اسڪيلر مقدار. رفتار = فاصلي / وقت.', example: 'گاڏي 2 ڪلاڪ ۾ 100 ڪلوميٽر هلي → رفتار = 50 ڪلوميٽر/ڪلاڪ.' },
        { type: 'definition', term: 'سمت رفتار', definition: 'في واحدي وقت جابجائي. ويڪٽر مقدار. سمت رفتار = جابجائي / وقت.', example: 'گاڏي 2 ڪلاڪ ۾ 100 ڪلوميٽر اتر هلي → سمت رفتار = 50 ڪلوميٽر/ڪلاڪ اتر.' },
        { type: 'formula', name: 'رفتار جو فارمولا', formula: 'v = d / t', variables: [{ symbol: 'v', meaning: 'رفتار (m/s)' }, { symbol: 'd', meaning: 'فاصلو (m)' }, { symbol: 't', meaning: 'وقت (s)' }] },
        { type: 'interactive', component: 'SpeedVelocityComparison' },
      ],
    },
    {
      id: 'acceleration',
      title: 'اسراع',
      blocks: [
        { type: 'definition', term: 'اسراع', definition: 'وقت سان گڏ سمت رفتار۾ تبديلي جي شرح. اهو ويڪٽر مقدار آهي.', example: 'گاڏي 5 سیکنڊ ۾ 0 کان 60 ڪلوميٽر/ڪلاڪ تائين تيز ٿيٿي — ان ۾ مثبت اسراع آهي.' },
        { type: 'formula', name: 'اسراع جو فارمولا', formula: 'a = (v − u) / t', variables: [{ symbol: 'a', meaning: 'اسراع (m/s²)' }, { symbol: 'v', meaning: 'آخري رفتار (m/s)' }, { symbol: 'u', meaning: 'شروعاتي رفتار (m/s)' }, { symbol: 't', meaning: 'وقت (s)' }] },
        { type: 'definition', term: 'مثبت بمقابله منفي اسراع', definition: 'مثبت اسراع مطلب رفتار وڌيٿي. منفي اسراع (سستي) مطلب رفتار گهٽجيٿي.', example: 'تيز ٿيڻ = مثبت. بريڪ لڳاڻ = منفي.' },
      ],
    },
    {
      id: 'equations-of-motion',
      title: 'حرڪت جا مساوات',
      blocks: [
        { type: 'formula', name: 'پهريون مساوات', formula: 'v = u + at', variables: [{ symbol: 'v', meaning: 'آخري رفتار' }, { symbol: 'u', meaning: 'شروعاتي رفتار' }, { symbol: 'a', meaning: 'اسراع' }, { symbol: 't', meaning: 'وقت' }] },
        { type: 'formula', name: 'ٻيون مساوات', formula: 's = ut + ½at²', variables: [{ symbol: 's', meaning: 'جابجائي' }, { symbol: 'u', meaning: 'شروعاتي رفتار' }, { symbol: 'a', meaning: 'اسراع' }, { symbol: 't', meaning: 'وقت' }] },
        { type: 'formula', name: 'ٽيون مساوات', formula: 'v² = u² + 2as', variables: [{ symbol: 'v', meaning: 'آخري رفتار' }, { symbol: 'u', meaning: 'شروعاتي رفتار' }, { symbol: 'a', meaning: 'اسراع' }, { symbol: 's', meaning: 'جابجائي' }] },
        { type: 'interactive', component: 'EquationsOfMotionCalc' },
      ],
    },
    {
      id: 'graphs',
      title: 'حرڪت جا گراف',
      blocks: [
        { type: 'definition', term: 'فاصلو-وقت گراف', definition: 'فاصلو-وقت گراف جي ڍلوان رفتار ڏيڻٿي. وڌيڪ ڍلوان = تيز رفتار.', example: 'سڌي لڪير مطلب مستقل رفتار.' },
        { type: 'definition', term: 'رفتار-وقت گراف', definition: 'رفتار-وقت گراف جي ڍلوان اسراع ڏيڻٿي. منحني تحت جي ايراضي جابجائي ڏيڻٿي.', example: 'مثبت ڍلوان واري سڌي لڪير = مستقل اسراع.' },
        { type: 'interactive', component: 'DistanceTimeGraph' },
        { type: 'interactive', component: 'VelocityTimeGraphAnalyzer' },
      ],
    },
    {
      id: 'uniform-motion',
      title: 'هڪ جهڙي حرڪت',
      blocks: [
        { type: 'definition', term: 'هڪ جهڙي رفتار', definition: 'ڪنھن شيءِ برابر وقت ۾ برابر فاصلي طي ڪريٿي.', example: 'سڌي هائيفي تي بالڪل 60 ڪلوميٽر/ڪلاڪ جي رفتار سان هلنداڙي گاڏي.' },
        { type: 'definition', term: 'هڪ جهڙي سمت رفتار', definition: 'ڪنھن شيءِ برابر وقت ۾ ههن سمتي ۾ برابر جابجائي طي ڪريٿي.', example: 'سمت نه بدلائيندڙ 80 ڪلوميٽر/ڪلاڪ اتر هلندڙ ريل.' },
        { type: 'definition', term: 'هڪ جهڙو اسراع', definition: 'سمت رفتار۾ برابر وقت ۾ برابر مقدار۾ تبديلي ٿيٿي.', example: 'ڪشش ثقل تحت ڪرندڙ بال — هر سیکنڊ ۾ رفتار 10 m/s وڌيٿي.' },
        { type: 'interactive', component: 'UniformMotionExplainer' },
      ],
    },
    {
      id: 'vectors',
      title: 'ويڪٽر جي نمائندگي',
      blocks: [
        { type: 'definition', term: 'ويڪٽر مقدار', definition: 'اها مقدار جيڪي ۾ مقدار۽ سمت ٻئي آهن. تير سان ڏيکاري وڃيٿي.', example: 'سمت رفتار، جابجائي، قوت ويڪٽر آهن.' },
        { type: 'definition', term: 'اسڪيلر مقدار', definition: 'اها مقدار جيڪي ۾ فقط مقدار آهي، سمت ناهي.', example: 'رفتار، فاصلي، مادو اسڪيلر آهن.' },
        { type: 'interactive', component: 'VectorRepresentation' },
      ],
    },
    {
      id: 'relative-motion',
      title: 'نسبي حرڪت',
      blocks: [
        { type: 'definition', term: 'نسبي حرڪت', definition: 'ڪنھن شيءِ جي حرڪت جيڪو ڪنھن مختلف حواله فريمن کان ڏسجي وڃيٿي.', example: 'هلندڙ بس ۾ هلندڙ شخص — زمين جي حوالي کان اهو تيز هليٿو.' },
        { type: 'interactive', component: 'RelativeMotionSim' },
      ],
    },
    {
      id: 'ticker-tape',
      title: 'ٽيڪر ٽيپ جو تجزيو',
      blocks: [
        { type: 'definition', term: 'ٽيڪر ٽيپ', definition: 'ٽيپ جيڪو باقاعده وقت۾ نقطا بنايوٿي. برابر فاصلي = مستقل رفتار. وڌندڙ فاصلي = اسراع.', example: 'لیب ۾ ٽرالي جي حرڪت جو تجزيو ڪرڻ لاءِ اڪو وڃيٿو.' },
        { type: 'interactive', component: 'TickerTapeSimulation' },
      ],
    },
    {
      id: 'quiz',
      title: 'ڪوئز',
      blocks: [
        {
          type: 'quiz',
          questions: [
            { id: 'q1', type: 'mcq', question: 'هيٺ ڏنل ۾ن کانھڪي ويڪٽر مقدار آهي؟', options: ['رفتار', 'فاصلو', 'سمت رفتار', 'وقت'], correctIndex: 2, explanation: 'سمت رفتار۾ مقدار۽ سمت ٻئي آهن جيڪو اُن کي ويڪٽر مقدار بنايوٿي.' },
            { id: 'q2', type: 'mcq', question: 'گاڏي 100 ميٽر مشرقي هليٿي پوءِ 50 ميٽر مغربي. جابجائي ڪا آهي؟', options: ['150 ميٽر', '50 ميٽر مشرقي', '50 ميٽر مغربي', '100 ميٽر'], correctIndex: 1, explanation: 'جابجائي = 100 - 50 = 50 ميٽر مشرقي (شروع کان آخر تائين سڀ کان ننڍڌو رستو).' },
            { id: 'q3', type: 'mcq', question: 'جيڪڏهن گاڏي سڪون کان 2 m/s² جي شرح سان 5 سیکنڊ تائين تيز ٿيٿي ته اُن جي آخري رفتار آهي:', options: ['10 m/s', '5 m/s', '2.5 m/s', '7 m/s'], correctIndex: 0, explanation: 'v = u + at = 0 + 2×5 = 10 m/s.' },
            { id: 'q4', type: 'mcq', question: 'رفتار-وقت گراف جي تحت جو ايراضي ظاهر ڪريٿو:', options: ['اسراع', 'رفتار', 'جابجائي', 'قوت'], correctIndex: 2, explanation: 'v-t گراف جي تحت = جابجائي.' },
            { id: 'q5', type: 'mcq', question: 'مستقل رفتار سان ڳڪي ۾ حرڪت ڪند�يءَ شيءِ ۾:', options: ['صفر اسراع', 'مستقل سمت رفتار', 'بدلندڙ سمت رفتار', 'ڪي قوت ناهي'], correctIndex: 2, explanation: 'سمتسلسل بدلندڙ آهي، اُن لاءِ سمت رفتار (ويڪٽر) بدلندڙ آهي حتي ته رفتار مستقل هجي.' },
          ],
        },
      ],
    },
  ],
};

export default chapter02Sd;
