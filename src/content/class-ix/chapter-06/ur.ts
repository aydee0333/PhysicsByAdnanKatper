import type { ChapterContent } from '../../types';

const chapter06Ur: ChapterContent = {
  id: 'chapter-06',
  classId: 'class-ix',
  title: 'کشش ثقل',
  subtitle: 'نیوٹن کا قانون، کششی میدان، سیٹلائٹ اور بے وزنی',
  sections: [
    {
      id: 'newtons-law',
      title: 'نیوٹن کا عالمگیر کشش کا قانون',
      blocks: [
        { type: 'definition', term: 'عالمگیر کشش', definition: 'کائنات میں ہر چیز ہر دوسری چیز کو ایسی قوت سے جذب کرتی ہے جو ان کے ماس کے حاصل ضرب کے تناسب اور ان کے درمیان فاصلے کے مربع کے الٹ تناسب میں ہوتی ہے۔' },
        { type: 'formula', name: 'کششی قوت', formula: 'F = G × m₁ × m₂ / r²', variables: [{ symbol: 'G', meaning: '6.67 × 10⁻¹¹ Nm²/kg²' }, { symbol: 'm₁, m₂', meaning: 'ماس (kg)' }, { symbol: 'r', meaning: 'فاصلہ (m)' }] },
        { type: 'interactive', component: 'GravForceCalc' },
      ],
    },
    {
      id: 'gravitational-field',
      title: 'کششی میدان',
      blocks: [
        { type: 'definition', term: 'کششی میدان', definition: 'کششی میدان کسی ماس کے ارد گرد وہ علاقہ ہے جہاں کشش محسوس کی جا سکتی ہے۔ میدان کی شدت g = فی اکائی ماس پر قوت۔' },
        { type: 'formula', name: 'میدان کی شدت', formula: 'g = F/m = GM/r²' },
        { type: 'interactive', component: 'PlanetWeightCalc' },
        { type: 'interactive', component: 'GravitationalFieldLinesSim' },
      ],
    },
    {
      id: 'mass-of-earth',
      title: 'زمین کا ماس',
      blocks: [
        { type: 'definition', term: 'زمین کا ماس', definition: 'g = GM/R² استعمال کرتے ہوئے، ہم زمین کا ماس حساب کر سکتے ہیں!' },
        { type: 'formula', name: 'زمین کا ماس', formula: 'M = gR² / G ≈ 6 × 10²⁴ kg' },
        { type: 'interactive', component: 'EarthMassCalc' },
      ],
    },
    {
      id: 'variation-of-g',
      title: 'g میں تبدیلی — اونچائی اور گہرائی',
      blocks: [
        { type: 'definition', term: 'اونچائی کے ساتھ', definition: 'g اونچائی بڑھنے کے ساتھ کم ہوتا ہے۔ g(h) = g × (1 − 2h/R)' },
        { type: 'definition', term: 'گہرائی کے ساتھ', definition: 'g زمین کے مرکز کی طرف کم ہوتا ہے۔ g(d) = g × (1 − d/R)' },
        { type: 'interactive', component: 'GVariationGraph' },
        { type: 'interactive', component: 'GVsDepthGraph' },
      ],
    },
    {
      id: 'orbital-motion',
      title: 'مداری حرکت',
      blocks: [
        { type: 'definition', term: 'مداری حرکت', definition: 'سیٹلائٹ مدار میں رہتی ہیں کیونکہ کشش دائرے کی حرکت کے لیے مرکزی قوت فراہم کرتی ہے۔' },
        { type: 'formula', name: 'مداری رفتار', formula: 'v = √(GM/r)' },
        { type: 'interactive', component: 'SatelliteOrbitSim' },
        { type: 'interactive', component: 'OrbitShapeVisualizer' },
      ],
    },
    {
      id: 'artificial-satellites',
      title: 'مصنوعی سیٹلائٹ',
      blocks: [
        { type: 'definition', term: 'سیٹلائٹ', definition: 'مصنوعی سیٹلائٹ وہ اشیاء ہیں جو مواصلات، مشاہدہ اور نیویگیشن کے لیے زمین کے مدار میں رکھی جاتی ہیں۔' },
        { type: 'interactive', component: 'SatelliteTypesInfo' },
      ],
    },
    {
      id: 'weightlessness',
      title: 'بے وزنی',
      blocks: [
        { type: 'definition', term: 'بے وزنی', definition: 'مدار میں خلابان بے وزنی محسوس کرتے ہیں کیونکہ وہ آزاد سقوط میں ہیں، نہ کہ کیونکہ کوئی کشش نہیں ہے۔' },
        { type: 'interactive', component: 'WeightlessnessSim' },
        { type: 'interactive', component: 'EscapeVelocityCalc' },
      ],
    },
    {
      id: 'quiz',
      title: 'ایم سی کیو کوئز',
      blocks: [
        {
          type: 'quiz',
          questions: [
            { id: 'q1', question: 'کششی قوت:', options: ['ہمیشہ کششی', 'ہمیشہ دافعہ', 'کبھی کبھی کششی', 'خلاء میں صفر'], correctIndex: 0 },
            { id: 'q2', question: 'زمین پر g = 9.8 m/s² ہے۔ چاند پر g ≈:', options: ['9.8 m/s²', '1.6 m/s²', '0 m/s²', '24.8 m/s²'], correctIndex: 1 },
            { id: 'q3', question: '200 km اونچائی پر مداری رفتار تقریباً ہے:', options: ['3 km/s', '7.8 km/s', '11.2 km/s', '15 km/s'], correctIndex: 1 },
            { id: 'q4', question: 'زمین کے مرکز میں g =', options: ['9.8 m/s²', '4.9 m/s²', '0 m/s²', '19.6 m/s²'], correctIndex: 2 },
            { id: 'q5', question: 'خلابان بے وزنی محسوس کرتے ہیں کیونکہ:', options: ['خلاء میں کوئی کشش نہیں', 'وہ آزاد سقوط میں ہیں', 'اسپیس اسٹیشن بہت بھاری ہے', 'وہ خاص لباس پہنتے ہیں'], correctIndex: 1 },
          ],
        },
      ],
    },
  ],
};

export default chapter06Ur;
