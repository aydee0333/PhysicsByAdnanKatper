import type { ChapterContent } from '../../types';

const chapter04Ur: ChapterContent = {
  id: 'chapter-04',
  classId: 'class-ix',
  title: 'قوت کا گردشی اثر',
  subtitle: 'ٹارک، توازن اور گردشی میکانکس',
  objectives: [
    'ٹارک (قوت کا مومنٹ) کی وضاحت کریں اور بیان کریں کہ یہ قوت اور عمودی فاصلے پر کیسے منحصر ہے',
    'مومنٹس کا اصول بیان کریں اور مسائل حل کرنے میں لاگو کریں',
    'جوڑ کی وضاحت کریں اور جوڑ سے پیدا ہونے والے ٹارک کا حساب لگائیں',
    'سخت جسم کے توازن کی دو شرائط بیان کریں',
    'باقاعدہ اور بے قاعدہ اشیاء کا کثافت مرکز متعین کریں',
    'مستقل، غیر مستقل اور غیر جانبدار توازن کو مثالوں کے ساتھ الگ الگ بیان کریں',
  ],
  sections: [
    {
      id: 'torque',
      title: 'ٹارک (قوت کا مومنٹ)',
      blocks: [
        {
          type: 'definition',
          term: 'ٹارک',
          definition: 'ٹارک (یا مومنٹ) قوت کا گردشی اثر ہے۔ یہ قوت اور نقطۂ محور سے عمودی فاصلے پر منحصر ہے۔',
          example: 'دروازے کو ہینڈل سے دھکا دینا — لولے سے جتنی دور ہوگی، اتنی آسانی سے کھلے گا۔',
        },
        {
          type: 'formula',
          name: 'ٹارک کا فارمولا',
          formula: 'τ = F × d',
          variables: [
            { symbol: 'τ', meaning: 'ٹارک (N·m)' },
            { symbol: 'F', meaning: 'لاگو قوت (N)' },
            { symbol: 'd', meaning: 'نقطۂ محور سے عمودی فاصلہ (m)' },
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
              question: 'قوت کے گردشی اثر کو کہتے ہیں:',
              options: ['قوت', 'ٹارک (مومنٹ)', 'دباؤ', 'وزن'],
              correctIndex: 1,
            },
            {
              id: 'q2',
              question: 'اگر 10 N کی قوت 2 m فاصلے پر لگے تو ٹارک ہوگا:',
              options: ['5 Nm', '12 Nm', '20 Nm', '8 Nm'],
              correctIndex: 2,
            },
          ],
        },
      ],
    },
    {
      id: 'like-unlike-forces',
      title: 'ملتی اور مخالف متوازی قوتیں',
      blocks: [
        {
          type: 'definition',
          term: 'ملتی قوتیں',
          definition: 'قوتیں ایک ہی سمت میں کام کرتی ہیں۔ مجموعی قوت مقداروں کا مجموعہ ہوتی ہے۔',
          example: 'دو لوگ گاڑی کو پیچھے سے ایک ہی سمت میں دھکاتے ہیں۔',
        },
        {
          type: 'definition',
          term: 'مخالف قوتیں',
          definition: 'قوتیں مخالف سمتوں میں کام کرتی ہیں۔ مجموعی قوت فرق ہوتی ہے۔',
          example: 'رستے کا کھیل — مضبوط طرف جیتتا ہے۔',
        },
        {
          type: 'formula',
          name: 'ملتی قوتوں کا مجموعی',
          formula: 'R = F₁ + F₂',
        },
        {
          type: 'formula',
          name: 'مخالف قوتوں کا مجموعی',
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
      title: 'مومنٹ آرم',
      blocks: [
        {
          type: 'definition',
          term: 'مومنٹ آرم',
          definition: 'نقطۂ محور سے قوت کی کارروائی کی لکیر تک عمودی فاصلہ۔ صرف قوت کا عمودی حصہ ٹارک پیدا کرتا ہے۔',
          example: 'رینچ کو کونے پر استعمال کرنا — صرف عمودی حصہ بولٹ گھماؤ۔',
        },
        {
          type: 'formula',
          name: 'مومنٹ آرم',
          formula: 'MA = d × sin(θ)',
          variables: [
            { symbol: 'MA', meaning: 'مومنٹ آرم (m)' },
            { symbol: 'd', meaning: 'نقطۂ محور سے فاصلہ (m)' },
            { symbol: 'θ', meaning: 'قوت اور لیور آرم کے درمیان زاویہ' },
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
      title: 'مومنٹ کا اصول',
      blocks: [
        {
          type: 'definition',
          term: 'مومنٹ کا اصول',
          definition: 'توازن میں کسی جسم کے لیے، کسی بھی نقطے کے بارے میں گھڑی سمت مومنٹوں کا مجموعہ مخالف سمت مومنٹوں کے مجموعے کے برابر ہوتا ہے۔',
          example: 'متوازن سیسا — بھاری شخص نقطۂ محور کے قریب بیٹھتا ہے۔',
        },
        {
          type: 'formula',
          name: 'توازن کی شرط',
          formula: 'Σ گھڑی سمت مومنٹ = Σ مخالف سمت مومنٹ',
        },
        {
          type: 'interactive',
          component: 'PrincipleOfMomentsSim',
        },
      ],
    },
    {
      id: 'center-of-mass',
      title: 'کثیر کا مرکز اور کشش ثقل کا مرکز',
      blocks: [
        {
          type: 'definition',
          term: 'کثیر کا مرکز (CM)',
          definition: 'وہ نقطہ جہاں کسی چیز کی کمیت مرکوز ہوتی ہے۔ متناظر چیزوں کے لیے یہ ہندسی مرکز میں ہوتا ہے۔',
          example: 'یکساں چھڑی کا CM اس کے بیچ میں ہے۔',
        },
        {
          type: 'definition',
          term: 'کشش ثقل کا مرکز (CG)',
          definition: 'وہ نقطہ جہاں کسی چیز کا وزن کام کرتا ہے۔ عام طور پر زمین کے قریب چھوٹی چیزوں کے لیے CM جیسا ہوتا ہے۔',
          example: 'مثلثی ورق کا CG میڈینز کے تقاطع پر ہوتا ہے۔',
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
          definition: 'کوئی چیز توازن میں ہوتی ہے جب وہ سکون میں ہو یا مستقل رفتار سے حرکت کر رہی ہو (کوئی رفتار نہ ہو)۔',
          example: 'میز پر رکھی کتاب ساکن توازن میں ہے۔',
        },
        {
          type: 'formula',
          name: 'پہلی شرط',
          formula: 'ΣF = 0',
          variables: [{ symbol: 'ΣF', meaning: 'جسم پر خالص قوت صفر ہونی چاہیے' }],
        },
        {
          type: 'formula',
          name: 'دوسری شرط',
          formula: 'Στ = 0',
          variables: [{ symbol: 'Στ', meaning: 'جسم پر خالص ٹارک صفر ہونا چاہیے' }],
        },
        {
          type: 'definition',
          term: 'توازن کی اقسام',
          definition: 'مستحکم: اصل پوزیشن پر واپس آتا ہے (کٹورے میں گیند)۔ غیر مستحکم: مزید دور ہوتا ہے (پہاڑی پر گیند)۔ غیر جانبدار: نئی پوزیشن میں رہتا ہے (میز پر گیند)۔',
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
      title: 'کپل',
      blocks: [
        {
          type: 'definition',
          term: 'کپل',
          definition: 'کپل دو برابر اور مخالف قوتیں ہیں جو کسی جسم پر ایک ہی نقطے سے نہیں گزرتیں۔ یہ بغیر حرکت کے گردش پیدا کرتی ہیں۔',
          example: 'اسٹیئرنگ وہیل گھمانا — دونوں ہاتھ مخالف طرفوں پر دھکا لگاتے ہیں۔',
        },
        {
          type: 'formula',
          name: 'کپل کا ٹارک',
          formula: 'τ = F × d',
          variables: [
            { symbol: 'τ', meaning: 'کپل کا ٹارک (N·m)' },
            { symbol: 'F', meaning: 'ایک قوت کی مقدار (N)' },
            { symbol: 'd', meaning: 'قوتوں کے درمیان عمودی فاصلہ (m)' },
          ],
        },
      ],
    },
    {
      id: 'quiz',
      title: 'یونٹ 4 کوئز',
      blocks: [
        {
          type: 'quiz',
          questions: [
            {
              id: 'q1',
              question: 'قوت کے گردشی اثر کو کہتے ہیں:',
              options: ['قوت', 'ٹارک (مومنٹ)', 'دباؤ', 'وزن'],
              correctIndex: 1,
            },
            {
              id: 'q2',
              question: 'اگر 10 N کی قوت 2 m فاصلے پر لگے تو ٹارک ہوگا:',
              options: ['5 Nm', '12 Nm', '20 Nm', '8 Nm'],
              correctIndex: 2,
            },
            {
              id: 'q3',
              question: 'توازن کے لیے کون سی شرطیں پوری ہونی چاہئیں؟',
              options: ['صرف ΣF = 0', 'صرف Στ = 0', 'ΣF = 0 اور Στ = 0 دونوں', 'کوئی نہیں'],
              correctIndex: 2,
            },
            {
              id: 'q4',
              question: 'کپل میں ہوتا ہے:',
              options: ['دو برابر قوتیں ایک ہی سمت میں', 'دو برابر اور مخالف قوتیں ایک لکیر میں نہیں', 'ایک واحد قوت', 'دو غیر برابر قوتیں'],
              correctIndex: 1,
            },
            {
              id: 'q5',
              question: 'یکساں چھڑی کے کشش ثقل کا مرکز ہے:',
              options: ['ایک سر پر', 'بیچ میں', 'سمت پر منحصر', 'چھڑی کے باہر'],
              correctIndex: 1,
            },
          ],
        },
      ],
    },
  ],
};

export default chapter04Ur;
