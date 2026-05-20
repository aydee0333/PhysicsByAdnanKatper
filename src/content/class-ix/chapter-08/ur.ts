import type { ChapterContent } from '../../types';

const chapter08Ur: ChapterContent = {
  id: 'chapter-08',
  classId: 'class-ix',
  title: 'کام اور توانائی',
  subtitle: 'کام، توانائی کی اقسام، تحفظ، طاقت اور کارکردگی',
  objectives: [
    'کام کی وضاحت کریں اور W = Fd استعمال کرتے ہوئے حساب لگائیں',
    'حرکی توانائی اور ممکنہ توانائی میں فرق بتائیں',
    'توانائی کے تحفظ کا قانون بیان کریں اور لاگو کریں',
    'طاقت اور اس کی ایس آئی اکائی کی وضاحت کریں، اور P = W/t سے مسائل حل کریں',
    'کارکردگی کی وضاحت کریں اور آسان مشینوں کے لیے حساب لگائیں',
    'کام، توانائی اور طاقت سے متعلق عددی مسائل حل کریں',
  ],
  sections: [
    {
      id: 'work',
      title: 'کام',
      blocks: [
        {
          type: 'definition',
          term: 'کام',
          definition: 'جب کسی جسم پر زور لگایا جائے اور وہ زور کی سمت میں حرکت کرے تو کام ہوتا ہے۔ کام = زور × فاصلہ۔',
          example: '5 میٹر فاصلے پر 10 N زور سے باکس دھکانا: W = 10 × 5 = 50 J',
        },
        {
          type: 'formula',
          name: 'کام',
          formula: 'W = F × d',
          variables: [
            { symbol: 'W', meaning: 'کام (جول، J)' },
            { symbol: 'F', meaning: 'زور (نیوٹن، N)' },
            { symbol: 'd', meaning: 'فاصلہ (میٹر، m)' },
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
      title: 'توانائی',
      blocks: [
        {
          type: 'definition',
          term: 'توانائی',
          definition: 'توانائی کام کرنے کی صلاحیت ہے۔ توانائی کی پیمائش جول (J) میں ہوتی ہے۔',
        },
        {
          type: 'definition',
          term: 'حرکی توانائی',
          definition: 'وہ توانائی جو کسی جسم کو اس کی حرکت کی وجہ سے حاصل ہوتی ہے۔',
          example: 'چلتی گاڑی، اڑتی گیند',
        },
        {
          type: 'definition',
          term: 'مخفی توانائی',
          definition: 'کشش ثقلی میدان میں مقام کی وجہ سے ذخیرہ شدہ توانائی۔',
          example: 'شیلف پر کتاب، ڈیم کے پیچھے پانی',
        },
        {
          type: 'definition',
          term: 'حرارتی توانائی',
          definition: 'درجہ حرارت کے فرق کی وجہ سے اشیاء کے درمیان منتقل ہونے والی توانائی۔',
        },
        {
          type: 'definition',
          term: 'روشنی کی توانائی',
          definition: 'شعاعی توانائی جو دیکھی جا سکتی ہے۔ لہروں میں سفر کرتی ہے۔',
        },
        {
          type: 'definition',
          term: 'آواز کی توانائی',
          definition: 'کمپن سے پیدا ہونے والی توانائی۔ کسی ذریعے سے لہروں میں سفر کرتی ہے۔',
        },
        {
          type: 'definition',
          term: 'برقی توانائی',
          definition: 'برقی بارے کے بہاؤ سے توانائی۔',
        },
        {
          type: 'interactive',
          component: 'EnergyMatchingGame',
        },
      ],
    },
    {
      id: 'kinetic-energy',
      title: 'حرکی توانائی',
      blocks: [
        {
          type: 'definition',
          term: 'حرکی توانائی',
          definition: 'وہ توانائی جو کسی جسم کو اس کی حرکت کی وجہ سے حاصل ہوتی ہے۔ کمیت اور رفتار پر منحصر ہے۔',
        },
        {
          type: 'formula',
          name: 'حرکی توانائی',
          formula: 'KE = ½mv²',
          variables: [
            { symbol: 'KE', meaning: 'حرکی توانائی (جول، J)' },
            { symbol: 'm', meaning: 'کمیت (kg)' },
            { symbol: 'v', meaning: 'رفتار (m/s)' },
          ],
        },
        {
          type: 'numerical',
          title: 'حرکی توانائی کا حساب',
          problem: '2 kg کا جسم 3 m/s سے چل رہا ہے۔ اس کی حرکی توانائی معلوم کریں۔',
          given: [
            { label: 'کمیت', value: '2', unit: 'kg' },
            { label: 'رفتار', value: '3', unit: 'm/s' },
          ],
          find: 'حرکی توانائی (KE)',
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
      title: 'کشش ثقلی مخفی توانائی',
      blocks: [
        {
          type: 'definition',
          term: 'مخفی توانائی',
          definition: 'کشش ثقلی میدان میں مقام کی وجہ سے ذخیرہ شدہ توانائی۔ کمیت، کشش ثقل اور اونچائی پر منحصر ہے۔',
        },
        {
          type: 'formula',
          name: 'مخفی توانائی',
          formula: 'PE = mgh',
          variables: [
            { symbol: 'PE', meaning: 'مخفی توانائی (جول، J)' },
            { symbol: 'm', meaning: 'کمیت (kg)' },
            { symbol: 'g', meaning: 'کشش ثقلی رفتار (9.8 m/s²)' },
            { symbol: 'h', meaning: 'اونچائی (m)' },
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
      title: 'توانائی کی تبدیلی',
      blocks: [
        {
          type: 'definition',
          term: 'توانائی کی تبدیلی',
          definition: 'توانائی ایک شکل سے دوسری شکل میں بدل جاتی ہے۔ توانائی نہ بنائی جا سکتی ہے نہ ختم، صرف تبدیل ہوتی ہے۔',
          example: 'برقی → روشنی (بلب)، کیمیائی → حرکی (گاڑی کا انجن)',
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
      title: 'توانائی کے تحفظ کا قانون',
      blocks: [
        {
          type: 'definition',
          term: 'توانائی کا تحفظ',
          definition: 'توانائی نہ بنائی جا سکتی ہے نہ ختم۔ یہ صرف ایک شکل سے دوسری شکل میں تبدیل ہوتی ہے۔ کل توانائی مستقل رہتی ہے۔',
          example: 'پینڈولم: مخفی (اوپر) → حرکی (نیچے) → مخفی (دوسری طرف)۔ کل توانائی وہی رہتی ہے۔',
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
      title: 'توانائی کے ذرائع',
      blocks: [
        {
          type: 'definition',
          term: 'قابل تجدید توانائی',
          definition: 'ذرائع سے توانائی جو فطری طور پر بھری جا سکتی ہے۔',
          example: 'سورج، ہوا، پانی، بائیوماس، جیو تھرمل',
        },
        {
          type: 'definition',
          term: 'غیر قابل تجدید توانائی',
          definition: 'محدود ذرائع سے توانائی جو بالآخر ختم ہو جائے گی۔',
          example: 'کوئلہ، تیل، قدرتی گیس، نیوکلیئر',
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
          definition: 'طاقت کام کرنے کی شرح یا توانائی کی منتقلی ہے۔',
          example: '100W بلب فی سیکنڈ 100 جول استعمال کرتا ہے',
        },
        {
          type: 'formula',
          name: 'طاقت',
          formula: 'P = W/t = E/t',
          variables: [
            { symbol: 'P', meaning: 'طاقت (واٹ، W)' },
            { symbol: 'W', meaning: 'کام (جول، J)' },
            { symbol: 't', meaning: 'وقت (سیکنڈ، s)' },
          ],
        },
        {
          type: 'definition',
          term: 'ہارس پاور',
          definition: '1 ہارس پاور (hp) = 746 واٹ',
        },
        {
          type: 'interactive',
          component: 'PowerComparison',
        },
      ],
    },
    {
      id: 'efficiency',
      title: 'کارکردگی',
      blocks: [
        {
          type: 'definition',
          term: 'کارکردگی',
          definition: 'مفید آؤٹ پٹ کا کل ان پٹ سے تناسب۔ ہمیشہ 100% سے کم — کچھ توانائی گرمی کے طور پر ضائع ہوتی ہے۔',
          example: 'کار کا انجن: ~25% کارکردگی، LED بلب: ~80% کارکردگی',
        },
        {
          type: 'formula',
          name: 'کارکردگی',
          formula: 'کارکردگی = (مفید آؤٹ پٹ / کل ان پٹ) × 100%',
          variables: [
            { symbol: 'η', meaning: 'کارکردگی (%)' },
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
      title: 'کوئز',
      blocks: [
        {
          type: 'quiz',
          questions: [
            { id: 'q1', question: 'توانائی کی ایس آئی اکائی ہے:', options: ['واٹ (W)', 'جول (J)', 'نیوٹن (N)', 'پاسکل (Pa)'], correctIndex: 1 },
            { id: 'q2', question: '2 kg کا جسم 3 m/s سے چل رہا ہے۔ اس کی حرکی توانائی ہے:', options: ['6 J', '9 J', '18 J', '12 J'], correctIndex: 1 },
            { id: 'q3', question: 'توانائی کا تحفظ مطلب ہے:', options: ['توانائی بنائی جا سکتی ہے', 'توانائی ختم ہو سکتی ہے', 'توانائی تبدیل ہوتی ہے لیکن کل مستقل رہتی ہے', 'توانائی ہمیشہ بڑھتی ہے'], correctIndex: 2 },
            { id: 'q4', question: 'طاقت کی پیمائش ہوتی ہے:', options: ['جول میں', 'نیوٹن میں', 'واٹ میں', 'پاسکل میں'], correctIndex: 2 },
            { id: 'q5', question: '40% کارکردگی والا انجن:', options: ['ان پٹ کا 40% مفید کام میں تبدیل کرتا ہے', '40% ایندھن استعمال کرتا ہے', '40% طاقت کا نقصان ہوتا ہے', '40% زیادہ توانائی پیدا کرتا ہے'], correctIndex: 0 },
          ],
        },
      ],
    },
  ],
};

export default chapter08Ur;
