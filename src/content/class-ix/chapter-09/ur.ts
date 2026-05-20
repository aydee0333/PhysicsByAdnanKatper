import type { ChapterContent } from '../../types';

const chapter09Ur: ChapterContent = {
  id: 'chapter-09',
  classId: 'class-ix',
  title: 'مادے کی حرارتی خصوصیات',
  subtitle: 'درجہ حرارت، حرارت، توسیع اور گیسوں کے قوانین',
  objectives: [
    'درجہ حرارت اور حرارت میں فرق بتائیں',
    'ٹھوس اور مائعوں کی حرارتی توسیع کی وضاحت کریں اور روزمرہ مثالیں دیں',
    'مخصوص حرارت صلاحیت کی وضاحت کریں اور Q = mcΔT سے مسائل حل کریں',
    'خفیف حرارت کی وضاحت کریں اور بغیر درجہ حرارت تبدیل کیے حالتیں بیان کریں',
    'حرارت کی منتقلی کے تین طریقوں کی وضاحت کریں: چالک، حرکی اور شعاعی',
    'بوائل کا قانون اور چارلس کا قانون بیان کریں اور لاگو کریں',
  ],
  sections: [
    {
      id: 'temperature',
      title: 'درجہ حرارت اور حرارت',
      blocks: [
        {
          type: 'definition',
          term: 'درجہ حرارت',
          definition: 'درجہ حرارت گرمی یا سردی کی پیمائش ہے۔ یہ کسی مادے میں ذرات کی اوسط حرکی توانائی ہے۔',
          example: '80°C پر چائے کا کپ 25°C پر پانی سے گرم تر ہے۔',
        },
        {
          type: 'definition',
          term: 'حرارت',
          definition: 'حرارت وہ توانائی ہے جو درجہ حرارت کے فرق کی وجہ سے اشیاء کے درمیان منتقل ہوتی ہے۔ یہ گرم سے ٹھنڈی طرف بہتی ہے۔',
          example: 'جب آپ گرم چولہے کو چھوتے ہیں تو حرارت چولہے سے آپ کے ہاتھ میں بہتی ہے۔',
        },
        {
          type: 'formula',
          name: 'درجہ حرارت کی تبدیلی',
          formula: 'K = °C + 273 | °F = (°C × 9/5) + 32',
          variables: [
            { symbol: 'K', meaning: 'کیلون' },
            { symbol: '°C', meaning: 'سیلسیس' },
            { symbol: '°F', meaning: 'فارن ہائیٹ' },
          ],
        },
        {
          type: 'interactive',
          component: 'VirtualThermometer',
        },
      ],
    },
    {
      id: 'thermometers',
      title: 'تھرمامیٹر',
      blocks: [
        {
          type: 'definition',
          term: 'تھرمامیٹر',
          definition: 'درجہ حرارت ناپنے کے لیے استعمال ہونے والا آلہ۔ عام اقسام میں شیشے میں سیال، ڈیجیٹل اور انفراریڈ تھرمامیٹر شامل ہیں۔',
          example: 'کلینیکل تھرمامیٹر پارے سے جسم کا درجہ حرارت ناپتا ہے۔',
        },
        {
          type: 'definition',
          term: 'مقررہ مقامات',
          definition: 'نچلا مقررہ مقام: برف کا نقطہ (0°C)۔ اوپری مقررہ مقام: بھاپ کا نقطہ (100°C)۔ یہ تھرمامیٹر کی درجہ بندی کے لیے استعمال ہوتے ہیں۔',
        },
      ],
    },
    {
      id: 'thermal-expansion',
      title: 'تھرمل توسیع',
      blocks: [
        {
          type: 'definition',
          term: 'تھرمل توسیع',
          definition: 'تھرمل توسیع گرم کرنے پر سائز میں اضافہ ہے۔ ذرات زیادہ حرکت کرتے ہیں اور زیادہ جگہ لیتے ہیں۔',
          example: 'ریلوے کی پٹریوں میں خلیے ہوتے ہیں تاکہ گرمی میں توسیع ہو سکے۔',
        },
        {
          type: 'formula',
          name: 'خطی توسیع',
          formula: 'ΔL = αL₀ΔT',
          variables: [
            { symbol: 'ΔL', meaning: 'لمبائی میں تبدیلی (m)' },
            { symbol: 'α', meaning: 'خطی توسیع کا گتانک (1/°C)' },
            { symbol: 'L₀', meaning: 'اصل لمبائی (m)' },
            { symbol: 'ΔT', meaning: 'درجہ حرارت میں تبدیلی (°C)' },
          ],
        },
        {
          type: 'interactive',
          component: 'ThermalExpansionSim',
        },
      ],
    },
    {
      id: 'specific-heat',
      title: 'مخصوص حرارت کی صلاحیت',
      blocks: [
        {
          type: 'definition',
          term: 'مخصوص حرارت کی صلاحیت',
          definition: 'وہ حرارت جو 1 kg مادے کا درجہ حرارت 1°C بڑھانے کے لیے درکار ہوتی ہے۔ پانی کی مخصوص حرارت بہت زیادہ ہے (4186 J/kg°C)۔',
          example: 'پانی کو ریت سے گرم کرنے میں زیادہ وقت لگتا ہے — اسی لیے ساحل جلدی گرم ہو جاتے ہیں۔',
        },
        {
          type: 'formula',
          name: 'حرارت کا فارمولا',
          formula: 'Q = mcΔT',
          variables: [
            { symbol: 'Q', meaning: 'حرارت کی توانائی (J)' },
            { symbol: 'm', meaning: 'کمیت (kg)' },
            { symbol: 'c', meaning: 'مخصوص حرارت کی صلاحیت (J/kg°C)' },
            { symbol: 'ΔT', meaning: 'درجہ حرارت میں تبدیلی (°C)' },
          ],
        },
        {
          type: 'interactive',
          component: 'SpecificHeatSim',
        },
      ],
    },
    {
      id: 'latent-heat',
      title: 'پوشیدہ حرارت',
      blocks: [
        {
          type: 'definition',
          term: 'پوشیدہ حرارت',
          definition: 'حالت کی تبدیلی کے دوران جذب ہونے والی یا خارج ہونے والی حرارت — بغیر درجہ حرارت میں تبدیلی کے۔ توانائی ذرات کے درمیان بند توڑنے یا بنانے میں جاتی ہے۔',
          example: '0°C پر برف پگھلنے کے لیے حرارت جذب کرتی ہے لیکن درجہ حرارت 0°C ہی رہتا ہے جب تک ساری برف نہ پگھل جائے۔',
        },
        {
          type: 'formula',
          name: 'پوشیدہ حرارت پگھلنے کی',
          formula: 'Q = mLf',
          variables: [
            { symbol: 'Q', meaning: 'حرارت کی توانائی (J)' },
            { symbol: 'm', meaning: 'کمیت (kg)' },
            { symbol: 'Lf', meaning: 'پوشیدہ حرارت پگھلنے کی (J/kg)' },
          ],
        },
        {
          type: 'formula',
          name: 'پوشیدہ حرارت بخارات کی',
          formula: 'Q = mLv',
          variables: [
            { symbol: 'Q', meaning: 'حرارت کی توانائی (J)' },
            { symbol: 'm', meaning: 'کمیت (kg)' },
            { symbol: 'Lv', meaning: 'پوشیدہ حرارت بخارات کی (J/kg)' },
          ],
        },
        {
          type: 'interactive',
          component: 'IceMeltingSim',
        },
      ],
    },
    {
      id: 'change-of-state',
      title: 'حالت کی تبدیلی',
      blocks: [
        {
          type: 'definition',
          term: 'حالت کی تبدیلی',
          definition: 'مادہ گرم کرنے یا ٹھنڈا کرنے سے ٹھوس، مائع اور گیس کی حالت میں بدل سکتا ہے۔ پگھلنا، جمندنا، بخارات، تقطیر، جبلت اور ترسیل — یہ سب حالت کی تبدیلی ہیں۔',
        },
        {
          type: 'interactive',
          component: 'WaterCycleDiagram',
        },
        {
          type: 'definition',
          term: 'جبلت',
          definition: 'ٹھوس براہ راست گیس میں بدل جاتا ہے بغیر مائع بنے۔ مثالیں: خشک برف، آیوڈین کرسٹل۔',
        },
        {
          type: 'definition',
          term: 'ترسیل',
          definition: 'گیس براہ راست ٹھوس میں بدل جاتی ہے بغیر مائع بنے۔ مثال: ٹھنڈی سطحوں پر پالا۔',
        },
      ],
    },
    {
      id: 'evaporation',
      title: 'بخارات',
      blocks: [
        {
          type: 'definition',
          term: 'بخارات',
          definition: 'بخارات کسی بھی درجہ حرارت پر مائع سے گیس میں تبدیلی ہے۔ یہ سطح کا مظاہرہ ہے — صرف سطح کے ذرات نکلتے ہیں۔',
          example: 'گرم اور ہوا والے دن میں گیلے کپڑے جلدی خشک ہو جاتے ہیں۔',
        },
        {
          type: 'definition',
          term: 'بخارات کو متاثر کرنے والے عوامل',
          definition: 'درجہ حرارت (زیادہ → تیز)، سطح کا رقبہ (بڑا → تیز)، نمی (کم → تیز)، ہوا کی رفتار (زیادہ → تیز)۔',
        },
        {
          type: 'interactive',
          component: 'WetClothSim',
        },
      ],
    },
    {
      id: 'gas-laws',
      title: 'گیسوں کے قوانین',
      blocks: [
        {
          type: 'definition',
          term: 'بوائل کا قانون',
          definition: 'مستقل درجہ حرارت پر گیس کا دباؤ اس کے حجم کے الٹا تناسب میں ہوتا ہے۔ اگر حجم کم ہو تو دباؤ بڑھتا ہے۔',
          example: 'سرنج کا پسٹن دھکانے سے اندر دباؤ بڑھتا ہے۔',
        },
        {
          type: 'formula',
          name: 'بوائل کا قانون',
          formula: 'P₁V₁ = P₂V₂',
          variables: [
            { symbol: 'P₁, P₂', meaning: 'ابتدائی اور آخری دباؤ (Pa)' },
            { symbol: 'V₁, V₂', meaning: 'ابتدائی اور آخری حجم (m³)' },
          ],
        },
        {
          type: 'interactive',
          component: 'BoylesLawSim',
        },
        {
          type: 'definition',
          term: 'چارلس کا قانون',
          definition: 'مستقل دباؤ پر گیس کا حجم اس کے مطلق درجہ حرارت (کیلون میں) کے براہ راست تناسب میں ہوتا ہے۔',
          example: 'گرم کرنے پر غبارہ پھیل جاتا ہے۔',
        },
        {
          type: 'formula',
          name: 'چارلس کا قانون',
          formula: 'V₁/T₁ = V₂/T₂',
          variables: [
            { symbol: 'V₁, V₂', meaning: 'ابتدائی اور آخری حجم' },
            { symbol: 'T₁, T₂', meaning: 'ابتدائی اور آخری درجہ حرارت (K)' },
          ],
        },
        {
          type: 'interactive',
          component: 'CharlesLawSim',
        },
        {
          type: 'interactive',
          component: 'HeatingCurveSim',
        },
        {
          type: 'interactive',
          component: 'HeatTransferSim',
        },
      ],
    },
    {
      id: 'quiz',
      title: 'یونٹ 9 کوئز',
      blocks: [
        {
          type: 'quiz',
          questions: [
            {
              id: 'q1',
              question: 'درجہ حرارت کی ایس آئی اکائی ہے:',
              options: ['سیلسیس (°C)', 'فارن ہائیٹ (°F)', 'کیلون (K)', 'جول (J)'],
              correctIndex: 2,
            },
            {
              id: 'q2',
              question: '0°C برابر ہے:',
              options: ['100 K', '273 K', '373 K', '0 K'],
              correctIndex: 1,
            },
            {
              id: 'q3',
              question: 'پوشیدہ حرارت جذب ہوتی ہے:',
              options: ['درجہ حرارت بڑھنے پر', 'حالت کی تبدیلی کے دوران', 'ٹھنڈا ہونے پر', 'کمپریشن پر'],
              correctIndex: 1,
            },
            {
              id: 'q4',
              question: 'بوائل کا قانون بتاتا ہے کہ مستقل درجہ حرارت پر:',
              options: ['P کا V سے تناسب ہے', 'P کا V سے الٹا تناسب ہے', 'P مستقل ہے', 'V مستقل ہے'],
              correctIndex: 1,
            },
            {
              id: 'q5',
              question: 'پانی کی مخصوص حرارت کی صلاحیت ہے:',
              options: ['450 J/kg°C', '830 J/kg°C', '4186 J/kg°C', '334 J/kg°C'],
              correctIndex: 2,
            },
          ],
        },
      ],
    },
  ],
};

export default chapter09Ur;
