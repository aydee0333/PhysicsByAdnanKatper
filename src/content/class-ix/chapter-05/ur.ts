import type { ChapterContent } from '../../types';

const chapter05Ur: ChapterContent = {
  id: 'chapter-05',
  classId: 'class-ix',
  title: 'قوتیں اور مادہ',
  subtitle: 'قوتیں مادے کو کیسے متاثر کرتی ہیں — اسپرنگ، دباؤ، کثافت اور سیال',
  objectives: [
    'دباو کو فی اکائی رقبے پر قوت کے طور پر بیان کریں اور P = F/A سے مسائل حل کریں',
    'ہوک کا قانون بیان کریں اور اسپرنگ مستقل کی وضاحت کریں؛ F = kx سے مسائل حل کریں',
    'کثافت اور مخصوص کشادگی کی وضاحت کریں؛ ρ = m/V سے کثافت کا حساب لگائیں',
    'لچک اور لچک کی حد کی وضاحت کریں؛ تناؤ، تناؤ کی شرح اور یونگ کے ماڈیولس کی وضاحت کریں',
    'آرکیمیڈز کا اصول بیان کریں اور تیرنے اور تیرنے کی شرائط کی وضاحت کریں',
    'ماحولیاتی دباؤ اور اس کی پیمائش کی وضاحت کریں',
  ],
  sections: [
    {
      id: 'elasticity',
      title: 'لچک',
      blocks: [
        { type: 'definition', term: 'لچک', definition: 'لچک کسی مادے کی وہ خاصیت ہے جس سے وہ بیرونی قوت ہٹانے کے بعد اصلی شکل اور سائز میں واپس آ جاتا ہے۔' },
        { type: 'definition', term: 'لچک کی حد', definition: 'وہ زیادہ سے زیادہ حد جس تک کسی مادے کو کھینچا جا سکتا ہے بغیر مستقل تبدیلی کے۔ اس سے آگے مادہ اصلی شکل میں واپس نہیں آتا۔' },
        { type: 'formula', name: 'ہوک کا قانون', formula: 'F = k × x', variables: [{ symbol: 'F', meaning: 'لگائی گئی قوت (N)' }, { symbol: 'k', meaning: 'اسپرنگ مستقل (N/m)' }, { symbol: 'x', meaning: 'توسیع (m)' }] },
        { type: 'interactive', component: 'SpringSim5' },
        { type: 'interactive', component: 'HookeGraphPlotter' },
      ],
    },
    {
      id: 'pressure',
      title: 'دباؤ',
      blocks: [
        { type: 'definition', term: 'دباؤ', definition: 'دباؤ کسی سطح پر فی اکائی رقبے پر لگنے والی قوت ہے۔ یہ بتاتا ہے کہ ہر مربع میٹر پر کتنی قوت لگتی ہے۔' },
        { type: 'formula', name: 'دباؤ کا فارمولا', formula: 'P = F / A', variables: [{ symbol: 'P', meaning: 'دباؤ (Pa)' }, { symbol: 'F', meaning: 'قوت (N)' }, { symbol: 'A', meaning: 'رقبہ (m²)' }] },
        { type: 'interactive', component: 'PressureTester' },
        { type: 'interactive', component: 'HydraulicPressSim' },
      ],
    },
    {
      id: 'stress-strain',
      title: 'تناؤ اور تناؤ کی شرح',
      blocks: [
        { type: 'definition', term: 'تناؤ', definition: 'کسی مادے پر فی اکائی رقبے پر لگنے والی قوت۔ σ = F/A (Pa)' },
        { type: 'definition', term: 'تناؤ کی شرح', definition: 'ابعاد میں تبدیلی کا اصلی ابعاد سے تناسب۔ کوئی اکائی نہیں! ε = ΔL/L' },
        { type: 'formula', name: 'یانگ کا ماؤڈیولس', formula: 'E = Stress / Strain = (F/A) / (ΔL/L)', variables: [{ symbol: 'E', meaning: 'یانگ کا ماؤڈیولس (Pa)' }, { symbol: 'σ', meaning: 'تناؤ' }, { symbol: 'ε', meaning: 'تناؤ کی شرح' }] },
        { type: 'interactive', component: 'StressStrainGraph' },
      ],
    },
    {
      id: 'density',
      title: 'کثافت',
      blocks: [
        { type: 'definition', term: 'کثافت', definition: 'کثافت کسی مادے کی فی اکائی حجم کمیت ہے۔ یہ بتاتی ہے کہ مادہ کتنا گھنا ہے۔' },
        { type: 'formula', name: 'کثافت کا فارمولا', formula: 'ρ = m / V', variables: [{ symbol: 'ρ', meaning: 'کثافت (kg/m³)' }, { symbol: 'm', meaning: 'کمیت (kg)' }, { symbol: 'V', meaning: 'حجم (m³)' }] },
        { type: 'interactive', component: 'DensityCalculator' },
      ],
    },
    {
      id: 'buoyancy',
      title: 'تیرنے کی قوت اور ارقمیدس کا اصول',
      blocks: [
        { type: 'definition', term: 'ارقمیدس کا اصول', definition: 'جب کوئی چیز سیال میں ڈوبوی جاتی ہے تو اسے اوپر کی طرف ایک قوت (اپتھرسٹ) ملتی ہے جو سیال کے ہٹائے گئے وزن کے برابر ہوتی ہے۔' },
        { type: 'formula', name: 'اپتھرسٹ فارمولا', formula: 'اپتھرسٹ = ρ_سیال × V_ہٹایا گیا × g' },
        { type: 'interactive', component: 'BuoyancySim' },
      ],
    },
    {
      id: 'atmospheric-pressure',
      title: 'ماحولیاتی دباؤ',
      blocks: [
        { type: 'definition', term: 'ماحولیاتی دباؤ', definition: 'ماحولیاتی دباؤ زمین کی سطح پر ہوا کے مالیکیولوں کے وزن سے پیدا ہونے والا دباؤ ہے۔' },
        { type: 'formula', name: 'معیاری ماحولیات', formula: '1 atm = 101,325 Pa' },
        { type: 'interactive', component: 'AtmosphericPressureSim' },
      ],
    },
    {
      id: 'quiz',
      title: 'ایم سی کیو کوئز',
      blocks: [
        {
          type: 'quiz',
          questions: [
            { id: 'q1', question: 'ہوک کا قانون بیان کرتا ہے کہ:', options: ['F = ma', 'F = kx', 'P = F/A', 'E = mc²'], correctIndex: 1 },
            { id: 'q2', question: 'دباؤ کی ایس آئی اکائی ہے:', options: ['نیوٹن (N)', 'پاسکل (Pa)', 'جول (J)', 'واٹ (W)'], correctIndex: 1 },
            { id: 'q3', question: 'کوئی چیز تیرتی ہے جب اس کی کثافت ہو:', options: ['سیال کی کثافت سے زیادہ', 'سیال کی کثافت سے کم', 'سیال کی کثافت کے برابر', 'صفر'], correctIndex: 1 },
            { id: 'q4', question: 'یانگ کا ماؤڈیولس ناپتا ہے:', options: ['کثافت', 'دباؤ', 'مادے کی سختی', 'درجہ حرارت'], correctIndex: 2 },
            { id: 'q5', question: 'سطح بحر پر ماحولیاتی دباؤ تقریباً ہے:', options: ['101,325 Pa', '10,000 Pa', '1,000,000 Pa', '1,000 Pa'], correctIndex: 0 },
          ],
        },
      ],
    },
  ],
};

export default chapter05Ur;
