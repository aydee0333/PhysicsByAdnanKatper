import type { ChapterContent } from '../../types';

const chapter01Ur: ChapterContent = {
  id: 'chapter-01',
  classId: 'class-x',
  title: 'سادہ موزون حرکت اور لہریں',
  subtitle: 'نوسانات، لہر کی حرکت، آواز کی لہریں، اور اطلاقات',
  objectives: [
    'سادہ موزون حرکت (SHM) کی تعریف بیان کریں اور اسے پینڈولم کی حرکت سے متعلق کریں',
    'پینڈولم کی مدتِ حرکت کا فارمولا T = 2π√(L/g) استعمال کر کے مسائل حل کریں',
    'ٹریورس اور طولی لہروں میں فرق بیان کریں',
    'ولنگتھ، تعدد، رفتار اور سیمپلیٹیوڈ کے درمیان تعلق v = fλ بیان کریں',
    'آواز کی لہروں کی خصوصیات اور خلاء میں سفر نہ کرنے کی وضاحت کریں',
  ],
  sections: [
    {
      id: 'shm-introduction',
      title: 'سادہ موزون حرکت (SHM)',
      blocks: [
        {
          type: 'definition',
          term: 'نوسانی حرکت',
          definition: 'کسی جسم کی اپنی اوسط پوزیشن کے بارے میں آگے پیچھے کی حرکت کو نوسانی حرکت کہتے ہیں۔',
          example: 'پینڈولم کی حرکت، ٹیوننگ فورک کے کمپن، اسپرنگ پر ماس کی حرکت',
        },
        {
          type: 'definition',
          term: 'سادہ موزون حرکت',
          definition: 'نوسانی حرکت کی ایک قسم جس میں جسم کا اسراع اوسط پوزیشن سے اس کی ڈسپلیسمنٹ کے براہ راست متناسب ہوتا ہے اور ہمیشہ اوسط پوزیشن کی طرف ہوتا ہے۔',
        },
        {
          type: 'definition',
          term: 'سیمپلیٹیوڈ',
          definition: 'SHM کے دوران جسم کی اوسط پوزیشن سے زیادہ سے زیادہ ڈسپلیسمنٹ۔ A سے ظاہر کیا جاتا ہے۔',
        },
        {
          type: 'definition',
          term: 'مدتِ حرکت',
          definition: 'ایک مکمل نوسان مکمل کرنے میں لگنے والا وقت۔ T سے ظاہر کیا جاتا ہے۔ اکائی: سیکنڈ (s)۔',
        },
        {
          type: 'definition',
          term: 'تعدد',
          definition: 'ایک سیکنڈ میں مکمل ہونے والے نوسانات کی تعداد۔ f سے ظاہر کیا جاتا ہے۔ اکائی: ہرٹز (Hz)۔',
        },
      ],
    },
    {
      id: 'shm-formulas',
      title: 'SHM کے فارمولے',
      blocks: [
        {
          type: 'formula',
          name: 'سادہ پینڈولم کی مدتِ حرکت',
          formula: 'T = 2π √(L/g)',
          variables: [
            { symbol: 'T', meaning: 'مدتِ حرکت (s)' },
            { symbol: 'L', meaning: 'پینڈولم کی لمبائی (m)' },
            { symbol: 'g', meaning: 'gravitational acceleration (m/s²)' },
            { symbol: 'π', meaning: 'Pi ≈ 3.14159' },
          ],
        },
        {
          type: 'formula',
          name: 'تعدد',
          formula: 'f = 1/T',
          variables: [
            { symbol: 'f', meaning: 'تعدد (Hz)' },
            { symbol: 'T', meaning: 'مدتِ حرکت (s)' },
          ],
        },
        {
          type: 'formula',
          name: 'SHM میں ڈسپلیسمنٹ',
          formula: 'x = A sin(ωt)',
          variables: [
            { symbol: 'x', meaning: 'وسط پوزیشن سے ڈسپلیسمنٹ' },
            { symbol: 'A', meaning: 'سیمپلیٹیوڈ' },
            { symbol: 'ω', meaning: 'زاویوی تعدد = 2πf' },
            { symbol: 't', meaning: 'وقت (s)' },
          ],
        },
      ],
    },
    {
      id: 'wave-motion',
      title: 'لہر کی حرکت',
      blocks: [
        {
          type: 'definition',
          term: 'لہر',
          definition: 'ایک ایسی خلل جو مادے کے منتقل کیے بغیر ایک جگہ سے دوسری جگہ توانائی منتقل کرتی ہے۔',
        },
        {
          type: 'definition',
          term: 'ٹریورس لہر',
          definition: 'لہر جس میں میڈیم کے ذرات لہر کی تشہیر کی سمت کے عمودی کمپن کرتے ہیں۔',
          example: 'روشنی کی لہریں، تار پر لہریں',
        },
        {
          type: 'definition',
          term: 'طولی لہر',
          definition: 'لہر جس میں میڈیم کے ذرات لہر کی تشہیر کی سمت کے متوازی کمپن کرتے ہیں۔',
          example: 'آواز کی لہریں، اسپرنگ میں کمپریشن لہریں',
        },
        {
          type: 'definition',
          term: 'کریسٹ اور ٹرف',
          definition: 'کریسٹ ٹریورس لہر کا اونچا ترین نقطہ اور ٹرف سب سے نیچا نقطہ ہے۔',
        },
        {
          type: 'definition',
          term: 'کمپریشن اور ریئر فیکشن',
          definition: 'کمپریشن اونچے دباؤ کا علاقہ اور ریئر فیکشن کم دباؤ کا علاقہ ہے طولی لہر میں۔',
        },
      ],
    },
    {
      id: 'wave-formulas',
      title: 'لہر کے فارمولے',
      blocks: [
        {
          type: 'formula',
          name: 'لہر کی رفتار',
          formula: 'v = fλ',
          variables: [
            { symbol: 'v', meaning: 'لہر کی رفتار (m/s)' },
            { symbol: 'f', meaning: 'تعدد (Hz)' },
            { symbol: 'λ', meaning: 'ولنگتھ (m)' },
          ],
        },
        {
          type: 'formula',
          name: 'لہر کا مساوات',
          formula: 'v = λ/T',
          variables: [
            { symbol: 'v', meaning: 'لہر کی رفتار (m/s)' },
            { symbol: 'λ', meaning: 'ولنگتھ (m)' },
            { symbol: 'T', meaning: 'مدتِ حرکت (s)' },
          ],
        },
      ],
    },
    {
      id: 'interactive-simulations',
      title: 'انٹرایکٹو سمولیشنز',
      blocks: [
        {
          type: 'interactive',
          component: 'SHMSimulation',
        },
        {
          type: 'interactive',
          component: 'WaveSimulation',
        },
        {
          type: 'interactive',
          component: 'TransverseLongitudinalSim',
        },
        {
          type: 'interactive',
          component: 'WaveBehaviorsSim',
        },
        {
          type: 'interactive',
          component: 'WaveInRopeSim',
        },
      ],
    },
    {
      id: 'sound-waves',
      title: 'آواز کی لہریں',
      blocks: [
        {
          type: 'definition',
          term: 'آواز',
          definition: 'آواز توانائی کی ایک شکل ہے جو سننے کا احساس پیدا کرتی ہے۔ یہ طولی لہروں کی شکل میں سفر کرتی ہے۔',
        },
        {
          type: 'definition',
          term: 'آواز کی رفتار',
          definition: 'آواز کی رفتار میڈیم پر منحصر ہے۔ 20°C پر ہوا میں آواز تقریباً 343 m/s کی رفتار سے سفر کرتی ہے۔',
          example: 'پانی میں: ~1480 m/s، سٹیل میں: ~5960 m/s، خلاء میں: 0 m/s (آواز سفر نہیں کر سکتی)',
        },
        {
          type: 'definition',
          term: 'بازگشت (ایکو)',
          definition: 'سخت سطح سے آواز کی لہروں کی عکاسی کی وجہ سے آواز کی تکرار۔',
        },
        {
          type: 'definition',
          term: 'الٹرا ساؤنڈ',
          definition: '20,000 Hz سے زیادہ تعدد والی آواز کی لہریں (انسانی سننے کی حد سے اوپر)۔ طبی تصویری اور صنعتی صفائی میں استعمال ہوتی ہیں۔',
        },
      ],
    },
    {
      id: 'numerical-examples',
      title: 'حل شدہ نیومریکلز',
      blocks: [
        {
          type: 'numerical',
          title: 'پینڈولم کی مدتِ حرکت',
          problem: '1.0 m لمبائی کے سادہ پینڈولم کی مدتِ حرکت معلوم کریں۔ (g = 10 m/s²)',
          given: [
            { label: 'لمبائی', value: '1.0', unit: 'm' },
            { label: 'g', value: '10', unit: 'm/s²' },
          ],
          find: 'مدتِ حرکت (T)',
          solution: [
            'T = 2π √(L/g)',
            'T = 2 × 3.14 × √(1.0/10)',
            'T = 6.28 × √(0.1)',
            'T = 6.28 × 0.316',
            'T = 1.98 ≈ 2.0 s',
          ],
          answer: 'T ≈ 2.0 s',
        },
        {
          type: 'numerical',
          title: 'لہر کی رفتار',
          problem: 'ایک لہر کی ولنگتھ 0.5 m اور تعدد 680 Hz ہے۔ اس کی رفتار معلوم کریں۔',
          given: [
            { label: 'ولنگتھ (λ)', value: '0.5', unit: 'm' },
            { label: 'تعدد (f)', value: '680', unit: 'Hz' },
          ],
          find: 'لہر کی رفتار (v)',
          solution: [
            'v = fλ',
            'v = 680 × 0.5',
            'v = 340 m/s',
          ],
          answer: 'v = 340 m/s',
        },
      ],
    },
    {
      id: 'exercises',
      title: 'چیپٹر مشقیں',
      blocks: [
        {
          type: 'exercise',
          questions: [
            { number: 1, question: 'سادہ موزون حرکت بیان کریں۔ دو مثالیں دیں۔', answer: 'SHM وہ نوسانی حرکت ہے جس میں اسراع ڈسپلیسمنٹ کے متناسب ہوتا ہے اور اوسط پوزیشن کی طرف ہوتا ہے۔ مثالیں: پینڈولم، ماس-اسپرنگ نظام۔' },
            { number: 2, question: 'تعدد اور مدتِ حرکت کے درمیان کیا تعلق ہے؟', answer: 'f = 1/T (تعدد مدتِ حرکت کا معکوس ہے)' },
            { number: 3, question: 'ٹریورس اور طولی لہروں میں فرق بیان کریں۔', answer: 'ٹریورس لہروں میں ذرات لہر کی سمت کے عمودی کمپن کرتے ہیں۔ طولی لہروں میں ذرات لہر کی سمت کے متوازی کمپن کرتے ہیں۔' },
            { number: 4, question: 'ایک پینڈولم کی مدتِ حرکت 2s ہے۔ اس کی تعدد کیا ہے؟', answer: 'f = 1/T = 1/2 = 0.5 Hz' },
            { number: 5, question: 'آواز خلاء میں کیوں نہیں سفر کر سکتی؟', answer: 'آواز کو سفر کرنے کے لیے میڈیم (ٹھوس، مائع، یا گیس) کی ضرورت ہوتی ہے کیونکہ یہ طولی لہروں کی شکل میں پھیلتی ہے جنہیں ذرات کے کمپن کی ضرورت ہوتی ہے۔' },
          ],
        },
      ],
    },
    {
      id: 'quiz',
      title: 'ایم سی کیو کوئز',
      blocks: [
        {
          type: 'quiz',
          questions: [
            {
              id: 'q1',
              question: 'SHM میں اسراع:',
              options: ['مستقل ہے', 'ڈسپلیسمنٹ کے متناسب ہے', 'تمام مقامات پر صفر ہے', 'رفتار کے متناسب ہے'],
              correctIndex: 1,
              type: 'mcq',
              explanation: '',
            },
            {
              id: 'q2',
              question: 'سادہ پینڈولم کی مدتِ حرکت پر منحصر ہے:',
              options: ['بوب کے مass', 'پینڈولم کی لمبائی', 'سیمپلیٹیوڈ', 'بوب کی مادے'],
              correctIndex: 1,
              type: 'mcq',
              explanation: '',
            },
            {
              id: 'q3',
              question: 'آواز کی لہریں:',
              options: ['ٹریورس لہریں ہیں', 'طولی لہریں ہیں', 'الیکٹرومغناطیسی لہریں ہیں', 'ان میں سے کوئی نہیں'],
              correctIndex: 1,
                          type: 'mcq',
              explanation: '',
},
            {
              id: 'q4',
              question: '20°C پر ہوا میں آواز کی رفتار تقریباً:',
              options: ['143 m/s', '243 m/s', '343 m/s', '443 m/s'],
              correctIndex: 2,
                          type: 'mcq',
              explanation: '',
},
            {
              id: 'q5',
              question: 'اگر لہر کی تعدد 100 Hz اور ولنگتھ 2 m ہے تو لہر کی رفتار:',
              options: ['50 m/s', '100 m/s', '200 m/s', '400 m/s'],
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

export default chapter01Ur;
