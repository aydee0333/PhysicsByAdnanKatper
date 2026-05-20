import type { ChapterContent } from '../../types';

const chapter03Ur: ChapterContent = {
  id: 'chapter-03',
  classId: 'class-ix',
  title: 'حرکیات (ڈائنامیکس)',
  subtitle: 'قوت، نیوٹن کے قوانین، مالش، جمود، کمیت، وزن اور مومینٹم',
  objectives: [
    'نیوٹن کی حرکت کے تین قوانین بیان کریں اور وضاحت کریں',
    'قوت کی وضاحت کریں اور رابطے اور غیر رابطے والی قوتوں میں فرق بتائیں',
    'مالش، اس کی اقسام اور کم کرنے کے طریقوں کی وضاحت کریں',
    'کمیت اور وزن میں فرق بتائیں',
    'مومینٹم کی وضاحت کریں اور مومینٹم کے تحفظ کا قانون بیان کریں',
  ],
  sections: [
    {
      id: 'force',
      title: 'قوت',
      blocks: [
        { type: 'definition', term: 'قوت', definition: 'دھکا یا کھینچ جو کسی چیز کی حرکت کی حالت یا شکل بدل سکتی ہے۔ یہ ویکٹر مقدار ہے۔', example: 'گیند کو لات مارنا، دروازہ کھینچنا، کشش ثقل سے چیزیں نیچے گرنا۔' },
        { type: 'definition', term: 'قوت کے اثرات', definition: 'قوت رفتار بدل سکتی ہے، سمت بدل سکتی ہے، یا شکل بدل سکتی ہے۔', example: 'گاڑی تیز کرنا (رفتار بدلنا)، اسٹیئرنگ وہیل گھومنا (سمت بدلنا)، گیند دبانا (شکل بدلنا)۔' },
        { type: 'formula', name: 'قوت کی ایس آئی اکائی', formula: '1 نیوٹن (N) = 1 kg × 1 m/s²', variables: [{ symbol: 'N', meaning: 'نیوٹن — قوت کی اکائی' }] },
        { type: 'interactive', component: 'PushPullSim' },
      ],
    },
    {
      id: 'newtons-laws',
      title: 'نیوٹن کے قوانینِ حرکت',
      blocks: [
        { type: 'definition', term: 'نیوٹن کا پہلا قانون (قانونِ جمود)', definition: 'کوئی چیز اپنی سکون یا یکساں حرکت کی حالت میں اس وقت تک رہتی ہے جب تک اس پر کوئی خارجی قوت نہ لگے۔', example: 'میز پر کتاب اس وقت تک ساکن رہتی ہے جب تک آپ اسے نہ دھکیلیں۔' },
        { type: 'definition', term: 'نیوٹن کا دوسرا قانون', definition: 'قوت کمیت اور اسراع کی ضرب ہے: F = ma۔', example: 'بھاری بکس کو دھکیلنا ہلکے بکس سے زیادہ قوت مانگتا ہے۔' },
        { type: 'definition', term: 'نیوٹن کا تیسرا قانون', definition: 'ہر عمل کے برابر اور مخالف ردِعمل ہوتا ہے۔', example: 'جب آپ دیوار کو دھکا دیتے ہیں تو دیوار واپس دھکا دیتی ہے۔' },
        { type: 'formula', name: 'نیوٹن کا دوسرا قانون', formula: 'F = m × a', variables: [{ symbol: 'F', meaning: 'قوت (N)' }, { symbol: 'm', meaning: 'کمیت (kg)' }, { symbol: 'a', meaning: 'اسراع (m/s²)' }] },
        { type: 'interactive', component: 'CoinCardExperiment' },
        { type: 'interactive', component: 'FmaCalculator' },
        { type: 'interactive', component: 'ActionReactionGame' },
      ],
    },
    {
      id: 'friction',
      title: 'مالش',
      blocks: [
        { type: 'definition', term: 'مالش', definition: 'وہ قوت جو دو سطحوں کے درمیان حرکت کو مخالف ہوتی ہے۔', example: 'ہاتھوں کو ایک دوسرے پر رگڑنے سے مالش سے گرمی پیدا ہوتی ہے۔' },
        { type: 'definition', term: 'جامد مالش', definition: 'مالش جو حرکت شروع ہونے سے روکتی ہے۔ بکس کو سلنے سے بچاتی ہے۔', example: 'بھاری بکس فرش پر اس لیے ساکن رہتا ہے کیونکہ جامد مالش اسے روکتی ہے۔' },
        { type: 'definition', term: 'سلائنگ (متحرک) مالش', definition: 'مالش جو سلائنگ حرکت کو مخالف ہوتی ہے۔ یہ جامد مالش سے کم ہوتی ہے۔', example: 'سلڈ کتاب متحرک مالش کی وجہ سے سست ہوتی ہے۔' },
        { type: 'definition', term: 'رولنگ مالش', definition: 'مالش جو رولنگ حرکت کو مخالف ہوتی ہے۔ سلائنگ مالش سے بہت کم!', example: 'گیندوں اور پہیوں میں رولنگ مالش ہوتی ہے۔' },
        { type: 'interactive', component: 'FrictionSlopeSim' },
        { type: 'interactive', component: 'StaticSlidingFrictionSim' },
      ],
    },
    {
      id: 'inertia',
      title: 'جمود',
      blocks: [
        { type: 'definition', term: 'جمود', definition: 'کسی چیز کی حرکت کی حالت میں تبدیلی کو روکنے کی رجحان۔ زیادہ کمیت = زیادہ جمود۔', example: 'بھاری ٹرک کو روکنا سائیکل سے مشکل ہے — اس میں زیادہ جمود ہے۔' },
        { type: 'interactive', component: 'InertiaRaceSim' },
      ],
    },
    {
      id: 'mass-weight',
      title: 'کمیت اور وزن',
      blocks: [
        { type: 'definition', term: 'کمیت', definition: 'کسی چیز میں مادے کی مقدار۔ یہ کہیں بھی نہیں بدلتی۔ اکائی: کلوگرام (kg)۔', example: 'آپ کی کمیت زمین اور چاند پر ایک جیسی ہے۔' },
        { type: 'definition', term: 'وزن', definition: 'کمیت پر کشش ثقل کی قوت۔ مختلف سیاروں پر بدلتی ہے۔ اکائی: نیوٹن (N)۔', example: 'آپ کا وزن چاند پر کم ہوتا ہے کیونکہ وہاں کشش ثقل کمزور ہے۔' },
        { type: 'formula', name: 'وزن کا فارمولا', formula: 'W = m × g', variables: [{ symbol: 'W', meaning: 'وزن (N)' }, { symbol: 'm', meaning: 'کمیت (kg)' }, { symbol: 'g', meaning: 'کشش ثقل کی وجہ سے اسراع (m/s²)' }] },
        { type: 'interactive', component: 'WeightCalculator' },
      ],
    },
    {
      id: 'momentum',
      title: 'مومینٹم',
      blocks: [
        { type: 'definition', term: 'مومینٹم', definition: 'کسی جسم میں حرکت کی مقدار۔ مومینٹم = کمیت × سمت رفتار۔ اکائی: kg·m/s۔', example: 'تیز رفتار بھاری ٹرک کا مومینٹم سست گاڑی سے زیادہ ہوتا ہے۔' },
        { type: 'formula', name: 'مومینٹم کا فارمولا', formula: 'p = m × v', variables: [{ symbol: 'p', meaning: 'مومینٹم (kg·m/s)' }, { symbol: 'm', meaning: 'کمیت (kg)' }, { symbol: 'v', meaning: 'سمت رفتار (m/s)' }] },
        { type: 'definition', term: 'تحفظ کا قانون', definition: 'کسی بھی ٹکر میں ٹکر سے پہلے کل مومینٹم = ٹکر کے بعد کل مومینٹم۔ مومینٹم کبھی ختم نہیں ہوتا۔', example: 'کار حادثے میں دونوں کاروں کا کل مومینٹم ٹکر سے پہلے اور بعد میں ایک جیسا ہوتا ہے۔' },
        { type: 'interactive', component: 'CollisionSim' },
        { type: 'interactive', component: 'ImpulseMomentumSim' },
      ],
    },
    {
      id: 'circular-motion',
      title: 'دائرے میں حرکت',
      blocks: [
        { type: 'definition', term: 'مرکزی قوت', definition: 'وہ قوت جو کسی چیز کو دائرے میں رکھتی ہے۔ یہ ہمیشہ مرکز کی طرف ہوتی ہے۔', example: 'کشش ثقل چاند کو مدار میں رکھتی ہے۔ تناؤ گیند کو ڈوری پر دائرے میں رکھتا ہے۔' },
        { type: 'formula', name: 'مرکزی قوت', formula: 'Fc = mv²/r', variables: [{ symbol: 'Fc', meaning: 'مرکزی قوت (N)' }, { symbol: 'm', meaning: 'کمیت (kg)' }, { symbol: 'v', meaning: 'سمت رفتار (m/s)' }, { symbol: 'r', meaning: 'نصف قطر (m)' }] },
        { type: 'interactive', component: 'CircularMotionSim' },
        { type: 'interactive', component: 'FreeBodyDiagramSim' },
      ],
    },
    {
      id: 'quiz',
      title: 'کوئز',
      blocks: [
        {
          type: 'quiz',
          questions: [
            { id: 'q1', type: 'mcq', question: 'نیوٹن کا پہلا قانون کس نام سے بھی جانا جاتا ہے؟', options: ['قانونِ اسراع', 'قانونِ جمود', 'قانونِ عمل و ردِعمل', 'قانونِ کشش ثقل'], correctIndex: 1, explanation: 'نیوٹن کا پہلا قانون قانونِ جمود کہلاتا ہے کیونکہ یہ بیان کرتا ہے کہ چیزیں اپنی حرکت میں تبدیلی کا مزاحمت کرتی ہیں۔' },
            { id: 'q2', type: 'mcq', question: 'اگر F = 20 N اور m = 4 kg ہو تو اسراع کیا ہوگا؟', options: ['80 m/s²', '5 m/s²', '24 m/s²', '16 m/s²'], correctIndex: 1, explanation: 'a = F/m = 20/4 = 5 m/s²۔' },
            { id: 'q3', type: 'mcq', question: 'جب آپ دیوار کو دھکا دیتے ہیں تو دیوار واپس دھکا دیتا ہے:', options: ['زیادہ قوت سے', 'کم قوت سے', 'برابر اور مخالف قوت سے', 'کوئی قوت نہیں'], correctIndex: 2, explanation: 'نیوٹن کے تیسرے قانون کے مطابق دیوار برابر اور مخالف قوت سے واپس دھکا دیتی ہے۔' },
            { id: 'q4', type: 'mcq', question: 'مومینٹم کی ایس آئی اکائی ہے:', options: ['نیوٹن (N)', 'kg·m/s', 'm/s²', 'جول (J)'], correctIndex: 1, explanation: 'مومینٹم = کمیت × سمت رفتار، اس لیے اکائی = kg × m/s = kg·m/s۔' },
            { id: 'q5', type: 'mcq', question: 'مرکزی قوت ہمیشہ کس سمت میں ہوتی ہے؟', options: ['مرکز سے دور', 'مرکز کی طرف', 'دائرے کی مماسی طرف', 'اوپر کی طرف'], correctIndex: 1, explanation: 'مرکزی کا مطلب ہے "مرکز طلب" — یہ ہمیشہ دائرے کے مرکز کی طرف ہوتی ہے۔' },
          ],
        },
      ],
    },
  ],
};

export default chapter03Ur;
