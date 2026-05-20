import type { ChapterContent } from '../../types';

const chapter02Ur: ChapterContent = {
  id: 'chapter-02',
  classId: 'class-ix',
  title: 'حرکیات',
  subtitle: 'حرکت کا مطالعہ — فاصلہ، جابجائی، رفتار، سمت رفتار اور اسراع',
  objectives: [
    'فاصلہ اور جابجائی کو مثالوں کے ساتھ الگ الگ بیان کریں',
    'رفتار اور سمت رفتار کی وضاحت کریں؛ اوسط اور فوری قدر میں فرق بتائیں',
    'تیزی کی وضاحت کریں اور حرکت کی مساوات سے مسائل حل کریں',
    'فاصلہ-وقت اور رفتار-وقت کے گراف کی تعبیر کریں',
    'یکساں تیز حرکت اور آزاد سقوط کی وضاحت کریں',
  ],
  sections: [
    {
      id: 'rest-motion',
      title: 'سکون اور حرکت',
      blocks: [
        { type: 'definition', term: 'سکون', definition: 'کوئی چیز سکون میں ہے اگر وہ اپنے ماحول کے حوالے سے اپنی پوزیشن نہ بدلے۔', example: 'میز پر رکھی کتاب سکون میں ہے۔' },
        { type: 'definition', term: 'حرکت', definition: 'کوئی چیز حرکت میں ہے اگر وہ اپنے ماحول کے حوالے سے اپنی پوزیشن بدلے۔', example: 'سڑک پر چلنے والی گاڑی حرکت میں ہے۔' },
        { type: 'definition', term: 'حرکات کی اقسام', definition: 'حرکت سیدھی، گول، گردشی، تھرتھراہٹ یا بے ترتیب ہو سکتی ہے۔', example: 'سیدھی سڑک پر گاڑی (سیدھی)، گھومنے والا پہیہ (گردشی)، پینڈولم (تھرتھراہٹ)۔' },
        { type: 'interactive', component: 'MotionTypesAnimation' },
      ],
    },
    {
      id: 'distance-displacement',
      title: 'فاصلہ اور جابجائی',
      blocks: [
        { type: 'definition', term: 'فاصلہ', definition: 'کسی چیز کا طے شدہ کل راستہ۔ یہ اسکیلر مقدار ہے۔', example: 'اگر آپ 3 میٹر مشرق چلیں پھر 4 میٹرمغرب تو فاصلہ = 7 میٹر۔' },
        { type: 'definition', term: 'جابجائی', definition: 'ابتدائی سے آخری مقام تک کا سب سے چھوٹا سیدھا راستہ۔ یہ ویکٹر مقدار ہے۔', example: 'اگر آپ 3 میٹر مشرق چلیں پھر 4 میٹر مغرب تو جابجائی = 1 میٹر مغرب۔' },
        { type: 'formula', name: 'جابائی کا فارمولا', formula: 'Δx = x₂ − x₁', variables: [{ symbol: 'Δx', meaning: 'جابائی' }, { symbol: 'x₂', meaning: 'آخری مقام' }, { symbol: 'x₁', meaning: 'ابتدائی مقام' }] },
        { type: 'interactive', component: 'DistanceDisplacementExplainer' },
      ],
    },
    {
      id: 'speed-velocity',
      title: 'رفتار اور سمت رفتار',
      blocks: [
        { type: 'definition', term: 'رفتار', definition: 'فی واحد وقت طے شدہ فاصلہ۔ اسکیلر مقدار۔ رفتار = فاصلہ / وقت۔', example: 'گاڑی 2 گھنٹے میں 100 کلومیٹر چلتی ہے → رفتار = 50 کلومیٹر/گھنٹہ۔' },
        { type: 'definition', term: 'سمت رفتار', definition: 'فی واحد وقت جابائی۔ ویکٹر مقدار۔ سمت رفتار = جابائی / وقت۔', example: 'گاڑی 2 گھنٹے میں 100 کلومیٹر شمال چلتی ہے → سمت رفتار = 50 کلومیٹر/گھنٹہ شمال۔' },
        { type: 'formula', name: 'رفتار کا فارمولا', formula: 'v = d / t', variables: [{ symbol: 'v', meaning: 'رفتار (m/s)' }, { symbol: 'd', meaning: 'فاصلہ (m)' }, { symbol: 't', meaning: 'وقت (s)' }] },
        { type: 'interactive', component: 'SpeedVelocityComparison' },
      ],
    },
    {
      id: 'acceleration',
      title: 'اسراع',
      blocks: [
        { type: 'definition', term: 'اسراع', definition: 'وقت کے ساتھ سمت رفتار میں تبدیلی کی شرح۔ یہ ویکٹر مقدار ہے۔', example: 'گاڑی 5 سیکنڈ میں 0 سے 60 کلومیٹر/گھنٹہ تک تیز ہوتی ہے — اس میں مثبت اسراع ہے۔' },
        { type: 'formula', name: 'اسراع کا فارمولا', formula: 'a = (v − u) / t', variables: [{ symbol: 'a', meaning: 'اسراع (m/s²)' }, { symbol: 'v', meaning: 'آخری رفتار (m/s)' }, { symbol: 'u', meaning: 'ابتدائی رفتار (m/s)' }, { symbol: 't', meaning: 'وقت (s)' }] },
        { type: 'definition', term: 'مثبت بمقابلہ منفی اسراع', definition: 'مثبت اسراع مطلب رفتار بڑھتی ہے۔ منفی اسراع (سستی) مطلب رفتار کم ہوتی ہے۔', example: 'تیز ہونا = مثبت۔ بریک لگانا = منفی۔' },
      ],
    },
    {
      id: 'equations-of-motion',
      title: 'حرکت کے مساوات',
      blocks: [
        { type: 'formula', name: 'پہلا مساوات', formula: 'v = u + at', variables: [{ symbol: 'v', meaning: 'آخری رفتار' }, { symbol: 'u', meaning: 'ابتدائی رفتار' }, { symbol: 'a', meaning: 'اسراع' }, { symbol: 't', meaning: 'وقت' }] },
        { type: 'formula', name: 'دوسرا مساوات', formula: 's = ut + ½at²', variables: [{ symbol: 's', meaning: 'جابائی' }, { symbol: 'u', meaning: 'ابتدائی رفتار' }, { symbol: 'a', meaning: 'اسراع' }, { symbol: 't', meaning: 'وقت' }] },
        { type: 'formula', name: 'تیسرا مساوات', formula: 'v² = u² + 2as', variables: [{ symbol: 'v', meaning: 'آخری رفتار' }, { symbol: 'u', meaning: 'ابتدائی رفتار' }, { symbol: 'a', meaning: 'اسراع' }, { symbol: 's', meaning: 'جابائی' }] },
        { type: 'interactive', component: 'EquationsOfMotionCalc' },
      ],
    },
    {
      id: 'graphs',
      title: 'حرکت کے گراف',
      blocks: [
        { type: 'definition', term: 'فاصلہ-وقت گراف', definition: 'فاصلہ-وقت گراف کی ڈھلوان رفتار دیتی ہے۔ تیز ڈھلوان = تیز رفتار۔', example: 'سیدھی لکیر مطلب مستقل رفتار۔' },
        { type: 'definition', term: 'رفتار-وقت گراف', definition: 'رفتار-وقت گراف کی ڈھلوان اسراع دیتی ہے۔ منحنی تحت کا رقبہ جابائی دیتا ہے۔', example: 'مثبت ڈھلوان والی سیدھی لکیر = مستقل اسراع۔' },
        { type: 'interactive', component: 'DistanceTimeGraph' },
        { type: 'interactive', component: 'VelocityTimeGraphAnalyzer' },
      ],
    },
    {
      id: 'uniform-motion',
      title: 'یکساں حرکت',
      blocks: [
        { type: 'definition', term: 'یکساں رفتار', definition: 'کوئی چیز برابر وقت میں برابر فاصلہ طے کرتی ہے۔', example: 'سیدھی ہائی وے پر بالکل 60 کلومیٹر/گھنٹہ کی رفتار سے چلنے والی گاڑی۔' },
        { type: 'definition', term: 'یکساں سمت رفتار', definition: 'کوئی چیز برابر وقت میں اسی سمت میں برابر جابائی طے کرتی ہے۔', example: 'بغیر سمت بدلے 80 کلومیٹر/گھنٹہ شمال چلنے والی ٹرین۔' },
        { type: 'definition', term: 'یکساں اسراع', definition: 'سمت رفتار برابر وقت میں برابر مقدار میں بدلتی ہے۔', example: 'کشش ثقل کے تحت گرنے والی گیند — ہر سیکنڈ میں رفتار 10 m/s بڑھتی ہے۔' },
        { type: 'interactive', component: 'UniformMotionExplainer' },
      ],
    },
    {
      id: 'vectors',
      title: 'ویکٹر کی نمائندگی',
      blocks: [
        { type: 'definition', term: 'ویکٹر مقدار', definition: 'وہ مقدار جس میں مقدار اور سمت دونوں ہوں۔ تیر سے ظاہر کی جاتی ہے۔', example: 'سمت رفتار، جابائی، قوت ویکٹر ہیں۔' },
        { type: 'definition', term: 'اسکیلر مقدار', definition: 'وہ مقدار جس میں صرف مقدار ہو، سمت نہ ہو۔', example: 'رفتار، فاصلہ، کمیت اسکیلر ہیں۔' },
        { type: 'interactive', component: 'VectorRepresentation' },
      ],
    },
    {
      id: 'relative-motion',
      title: 'نسبتی حرکت',
      blocks: [
        { type: 'definition', term: 'نسبتی حرکت', definition: 'کسی چیز کی حرکت جو کسی مختلف حوالہ فریم سے دیکھی جائے۔', example: 'چلتی ہوئی بس میں چلنے والا شخص — زمین کے حوالے سے وہ تیز چلتا ہے۔' },
        { type: 'interactive', component: 'RelativeMotionSim' },
      ],
    },
    {
      id: 'ticker-tape',
      title: 'ٹیکر ٹیپ کا تجزیہ',
      blocks: [
        { type: 'definition', term: 'ٹیکر ٹیپ', definition: 'ٹیپ جو باقاعدہ وقت میں نقطے بناتی ہے۔ برابر فاصلہ = مستقل رفتار۔ بڑھتا فاصلہ = اسراع۔', example: 'لیب میں ٹرالی کی حرکت کا تجزیہ کرنے کے لیے استعمال ہوتی ہے۔' },
        { type: 'interactive', component: 'TickerTapeSimulation' },
      ],
    },
    {
      id: 'quiz',
      title: 'کوئز',
      blocks: [
        {
          type: 'quiz',
          questions: [
            { id: 'q1', type: 'mcq', question: 'مندرجہ ذیل میں سے کون سی ویکٹر مقدار ہے؟', options: ['رفتار', 'فاصلہ', 'سمت رفتار', 'وقت'], correctIndex: 2, explanation: 'سمت رفتار میں مقدار اور سمت دونوں ہوتے ہیں جو اسے ویکٹر مقدار بناتی ہے۔' },
            { id: 'q2', type: 'mcq', question: 'گاڑی 100 میٹر مشرق چلتی ہے پھر 50 میٹر مغرب۔ جابائی کیا ہے؟', options: ['150 میٹر', '50 میٹر مشرق', '50 میٹر مغرب', '100 میٹر'], correctIndex: 1, explanation: 'جابائی = 100 - 50 = 50 میٹر مشرق (شروع سے آخر تک سب سے چھوٹا راستہ)۔' },
            { id: 'q3', type: 'mcq', question: 'اگر گاڑی سکون سے 2 m/s² کی شرح سے 5 سیکنڈ تک تیز ہو تو اس کی آخری رفتار ہے:', options: ['10 m/s', '5 m/s', '2.5 m/s', '7 m/s'], correctIndex: 0, explanation: 'v = u + at = 0 + 2×5 = 10 m/s۔' },
            { id: 'q4', type: 'mcq', question: 'رفتار-وقت گراف کے تحت کا رقبہ ظاہر کرتا ہے:', options: ['اسراع', 'رفتار', 'جابائی', 'قوت'], correctIndex: 2, explanation: 'v-t گراف کے تحت = جابائی۔' },
            { id: 'q5', type: 'mcq', question: 'مستقل رفتار سے دائرے میں حرکت کرنے والی چیز میں:', options: ['صفر اسراع', 'مستقل سمت رفتار', 'بدلنے والی سمت رفتار', 'کوئی قوت نہیں'], correctIndex: 2, explanation: 'سمت مسلسل بدلتی ہے، اس لیے سمت رفتار (ویکٹر) بدلتی ہے چاہے رفتار مستقل ہو۔' },
          ],
        },
      ],
    },
  ],
};

export default chapter02Ur;
