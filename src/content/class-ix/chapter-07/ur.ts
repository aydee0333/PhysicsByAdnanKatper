import type { ChapterContent } from '../../types';

const chapter07Ur: ChapterContent = {
  id: 'chapter-07',
  classId: 'class-ix',
  title: 'مادے کی خصوصیات',
  subtitle: 'مادے کی حالتیں، لچک، سیالوں میں دباؤ، سطحی کشیدگی اور وسکوسٹی',
  sections: [
    {
      id: 'kinetic-molecular',
      title: 'مادے کا حرکیاتی مالیکیولر ماڈل',
      blocks: [
        { type: 'definition', term: 'تین حالتیں', definition: 'مادہ تین حالتوں میں موجود ہوتا ہے: ٹھوس (紧密 packed، مقررہ شکل)، مائع (ڈھیلے سے packed، برتن کی شکل لیتا ہے)، اور گیس (بہت دور، برتن بھر دیتا ہے)۔' },
        { type: 'interactive', component: 'ParticleAnimation' },
      ],
    },
    {
      id: 'elasticity-review',
      title: 'لچک (جائزہ)',
      blocks: [
        { type: 'definition', term: 'لچک', definition: 'لچک کسی مادے کی وہ خاصیت ہے جس سے وہ بگاڑنے والی قوت ہٹانے کے بعد اصلی شکل میں واپس آ جاتا ہے۔' },
        { type: 'formula', name: 'لچک کی حد', formula: 'لچک کی حد کے اندر، توسیع ∝ قوت' },
        { type: 'interactive', component: 'SpringSim7' },
      ],
    },
    {
      id: 'pressure-in-liquids',
      title: 'سیالوں میں دباؤ',
      blocks: [
        { type: 'definition', term: 'سیال کا دباؤ', definition: 'سیال میں دباؤ گہرائی کے ساتھ بڑھتا ہے۔ ایک گہرائی = ایک دباؤ چاہے برتن کی شکل کوئی بھی ہو۔' },
        { type: 'formula', name: 'سیال کا دباؤ', formula: 'P = ρ × g × h', variables: [{ symbol: 'ρ', meaning: 'کثافت (kg/m³)' }, { symbol: 'g', meaning: '9.8 m/s²' }, { symbol: 'h', meaning: 'گہرائی (m)' }] },
        { type: 'interactive', component: 'LiquidPressureSim' },
      ],
    },
    {
      id: 'pascals-law',
      title: 'پاسکل کا قانون',
      blocks: [
        { type: 'definition', term: 'پاسکل کا قانون', definition: 'بند سیال پر لگایا گیا دباؤ سیال کے ہر حصے اور برتن کی دیواروں تک مساوی طور پر منتقل ہوتا ہے۔' },
        { type: 'formula', name: 'پاسکل کا فارمولا', formula: 'P = F₁/A₁ = F₂/A₂' },
        { type: 'interactive', component: 'PascalLawSim' },
      ],
    },
    {
      id: 'surface-tension',
      title: 'سطحی کشیدگی',
      blocks: [
        { type: 'definition', term: 'سطحی کشیدگی', definition: 'سطحی کشیدگی سیال کی سطح کو کھنچی ہوئی لچکدار جھلی کی طرح برتاؤ کرواتی ہے۔ سیال کے مالیکیولوں کے درمیان cohesive قوتوں سے پیدا ہوتی ہے۔' },
        { type: 'interactive', component: 'SurfaceTensionSim' },
      ],
    },
    {
      id: 'viscosity',
      title: 'وسکوسٹی',
      blocks: [
        { type: 'definition', term: 'وسکوسٹی', definition: 'وسکوسٹی سیال کی اندرونی رگڑ ہے جو اس کے بہاؤ کو روکتی ہے۔ زیادہ وسکوسٹی = سست بہاؤ۔' },
        { type: 'interactive', component: 'ViscositySim' },
      ],
    },
    {
      id: 'bernoulli',
      title: 'برنولی کا اصول',
      blocks: [
        { type: 'definition', term: 'برنولی کا اصول', definition: 'جہاں سیال کی رفتار زیادہ ہوتی ہے، دباؤ کم ہوتا ہے — اور بالکل الٹ۔ P + ½ρv² + ρgh = مستقل۔' },
        { type: 'interactive', component: 'BernoulliSim' },
        { type: 'interactive', component: 'StreamlineFlowSim' },
      ],
    },
    {
      id: 'hooke-law-exp',
      title: 'ہوک کا قانون تجربہ',
      blocks: [
        { type: 'definition', term: 'تجربہ', definition: 'ہوک کے قانون کی تصدیق کے لیے قوت بمقابلہ توسیع گراف بنائیں۔ لچک کی حد کے اندر، گراف ایک سیدھی لکیر ہے۔' },
        { type: 'interactive', component: 'HookeLawExp' },
      ],
    },
    {
      id: 'quiz',
      title: 'ایم سی کیو کوئز',
      blocks: [
        {
          type: 'quiz',
          questions: [
            { id: 'q1', question: 'کس حالت میں ذرات紧密 packed ہوتے ہیں؟', options: ['گیس', 'مائع', 'ٹھوس', 'پلازما'], correctIndex: 2 },
            { id: 'q2', question: 'سیال کا دباؤ منحصر ہے:', options: ['برتن کی شکل پر', 'گہرائی، کثافت اور g پر', 'سیال کے حجم پر', 'صرف درجہ حرارت پر'], correctIndex: 1 },
            { id: 'q3', question: 'پاسکل کا قانون استعمال ہوتا ہے:', options: ['تھرمامیٹر میں', 'ہائیڈرولک پریس میں', 'بیرومیٹر میں', 'سپیڈومیٹر میں'], correctIndex: 1 },
            { id: 'q4', question: 'سطحی کشیدگی کس سے پیدا ہوتی ہے؟', options: ['کشش ثقل سے', 'cohesive قوتوں سے', 'مقناطیسی قوتوں سے', 'برقی رو سے'], correctIndex: 1 },
            { id: 'q5', question: 'کس میں سب سے زیادہ وسکوسٹی ہے؟', options: ['پانی', 'تیل', 'شہد', 'الکحل'], correctIndex: 2 },
          ],
        },
      ],
    },
  ],
};

export default chapter07Ur;
