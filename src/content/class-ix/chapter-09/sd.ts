import type { ChapterContent } from '../../types';

const chapter09Sd: ChapterContent = {
  id: 'chapter-09',
  classId: 'class-ix',
  title: 'مادي جي ٿرمل خاصيتون',
  subtitle: 'درجہ حرارت، گرمي، توسیع ۽ گيسن جا قانون',
  objectives: [
    'درجہ حرارت ۽ گرمي ۾ فرق ڪريو',
    'ٽورن ۽ مايعن جي ٿرمل توسیع بيان ڪريو',
    'مخصوص ٿرمل صلاحيت جي تعريف ڏيو ۽ Q = mcΔT سان مسئلا حل ڪريو',
    'خفيه گرمي بيان ڪريو',
    'ٿرمل منتقلی جا ٽي طريقي بيان ڪريو',
    'بوائل جو قانون ۽ چارلس جو قانون لاڳو ڪريو',
  ],
  sections: [
    {
      id: 'temperature',
      title: 'درجہ حرارت ۽ گرمي',
      blocks: [
        {
          type: 'definition',
          term: 'درجہ حرارت',
          definition: 'درجہ حرارت گرمي يا ٿڌي جي پيمائش آهي. اهو ڪنھن مادي ۾ ذرات جي اوسط حرڪي توانائي آهي.',
          example: '80°C تي چائي جو ڪپ 25°C تي پاڻي کان گرم آهي.',
        },
        {
          type: 'definition',
          term: 'گرمي',
          definition: 'گرمي اها توانائي آهي جيڪو درجہ حرارت جي فرق جي سبب شيءن جي وچ ۾ منقلي ٿي. اهو گرم کان ٿڌي طرف وهي ٿي.',
          example: 'جڏو توهان گرم چولهي ڍاسو ته گرمي چولهي کان توهان جي هٿ ۾ وهي ٿي.',
        },
        {
          type: 'formula',
          name: 'درجہ حرارت جي تبديلي',
          formula: 'K = °C + 273 | °F = (°C × 9/5) + 32',
          variables: [
            { symbol: 'K', meaning: 'ڪيلون' },
            { symbol: '°C', meaning: 'سيلسيس' },
            { symbol: '°F', meaning: 'فارن هيٽ' },
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
      title: 'ٿرماميٽر',
      blocks: [
        {
          type: 'definition',
          term: 'ٿرماميٽر',
          definition: 'درجہ حرارت ميڻ لاءِ استعمال ٿيندڙ آله. عام قسمن ۾ شيشه ۾ سيال، ڊيجيٽل ۽ انفراريڊ ٿرماميٽر شامل آهن.',
          example: 'ڪلينيڪل ٿرماميٽر پاريءَ سان جسم جو درجہ حرارت ميڻي ٿو.',
        },
        {
          type: 'definition',
          term: 'مقرر ٿيل مقامن',
          definition: 'هيٺ مقرر ٿيل مقام: برف جو نقطو (0°C). مٿي مقرر ٿيل مقام: بخارت جو نقطو (100°C). اهي ٿرماميٽر جي درجه بندي لاءِ استعمال ٿي ٿن.',
        },
      ],
    },
    {
      id: 'thermal-expansion',
      title: 'ٿرمل توسیع',
      blocks: [
        {
          type: 'definition',
          term: 'ٿرمل توسیع',
          definition: 'ٿرمل توسیع گرم ڪرڻ تي سائيڊ ۾ اضافو آهي. ذرات وڌيڪ حرڪت ڪين ٿيون ۽ وڌيڪ ڄگهه لين ٿيون.',
          example: 'ريلوي جي پٽين ۾ خالي هجن ته تاب ۾ توسیع ٿي سگهي.',
        },
        {
          type: 'formula',
          name: 'خطي توسیع',
          formula: 'ΔL = αL₀ΔT',
          variables: [
            { symbol: 'ΔL', meaning: 'لمبائي ۾ تبديلي (m)' },
            { symbol: 'α', meaning: 'خطي توسیع جو گٿانڪ (1/°C)' },
            { symbol: 'L₀', meaning: 'اصلي لمبائي (m)' },
            { symbol: 'ΔT', meaning: 'درجہ حرارت ۾ تبديلي (°C)' },
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
      title: 'مخصوص گرمي جي صلاحيت',
      blocks: [
        {
          type: 'definition',
          term: 'مخصوص گرمي جي صلاحيت',
          definition: 'اها گرمي آهي جيڪو 1 kg مادي جو درجہ حرارت 1°C وڌائڻ لاءِ گهربل آهي. پاڻي جي مخصوص گرمي تمام وڌيڪ آهي (4186 J/kg°C).',
          example: 'پاڻي کي ريت کان گرم ڪرڻ ۾ وڌيڪ وقت لڳي ٿو — هن لاءِ ساحل تيزيءَ سان گرم ٿي وڃن ٿن.',
        },
        {
          type: 'formula',
          name: 'گرمي جو فارمولا',
          formula: 'Q = mcΔT',
          variables: [
            { symbol: 'Q', meaning: 'گرمي جي توانائي (J)' },
            { symbol: 'm', meaning: 'مادو (kg)' },
            { symbol: 'c', meaning: 'مخصوص گرمي جي صلاحيت (J/kg°C)' },
            { symbol: 'ΔT', meaning: 'درجہ حرارت ۾ تبديلي (°C)' },
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
      title: 'پوشیدہ گرمي',
      blocks: [
        {
          type: 'definition',
          term: 'پوشیدہ گرمي',
          definition: 'حالت جي تبديلي دوران جذب ٿيڻ واري يا خارج ٿيڻ واري گرمي — بنا درجہ حرارت ۾ تبديلي جي. توانائي ذرات جي وچ ۾ بند توڻ يا بڻائڻ ۾ وڃي ٿي.',
          example: '0°C تي برف پگھلڻ لاءِ گرمي جذب ڪري ٿي پر درجہ حرارت 0°C ئي رهي ٿو جيسين سڀ برف نه پگھلي.',
        },
        {
          type: 'formula',
          name: 'پوشیدہ گرمي پگھلڻ جي',
          formula: 'Q = mLf',
          variables: [
            { symbol: 'Q', meaning: 'گرمي جي توانائي (J)' },
            { symbol: 'm', meaning: 'مادو (kg)' },
            { symbol: 'Lf', meaning: 'پوشیدہ گرمي پگھلڻ جي (J/kg)' },
          ],
        },
        {
          type: 'formula',
          name: 'پوشیدہ گرمي بخارت جي',
          formula: 'Q = mLv',
          variables: [
            { symbol: 'Q', meaning: 'گرمي جي توانائي (J)' },
            { symbol: 'm', meaning: 'مادو (kg)' },
            { symbol: 'Lv', meaning: 'پوشیدہ گرمي بخارت جي (J/kg)' },
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
      title: 'حالت جي تبديلي',
      blocks: [
        {
          type: 'definition',
          term: 'حالت جي تبديلي',
          definition: 'مادو گرم ڪرڻ يا ٿڌو ڪرڻ سان ٿوس، مايع ۽ گيس جي حالت ۾ بدل سگهي ٿو. پگھلڻ، جمڻ، بخارت، تقطير، جبلت ۽ ترسيل — ائين سڀ حالت جي تبديلي آهي.',
        },
        {
          type: 'interactive',
          component: 'WaterCycleDiagram',
        },
        {
          type: 'definition',
          term: 'جبلت',
          definition: 'ٿوس سڌو گيس ۾ بدلجي ٿو بنا مايع ٿيي. مثالون: خشڪ برف، آيودين ڪرسٽل.',
        },
        {
          type: 'definition',
          term: 'ترسيل',
          definition: 'گيس سڌو ٿوس ۾ بدلجي ٿي بنا مايع ٿيي. مثال: ٿڌي سطحين تي پالو.',
        },
      ],
    },
    {
      id: 'evaporation',
      title: 'بخارت',
      blocks: [
        {
          type: 'definition',
          term: 'بخارت',
          definition: 'بخارت ڪنھن به درجہ حرارت تي مايع کان گيس ۾ تبديلي آهي. اهو سطحي مظاهرو آهي — فقط سطح جا ذرات نڪلن ٿن.',
          example: 'گرم ۽ هوا واري ڏينهه ۾ ٻلو ڪپڙو تيزيءَ سان سوڪي وڃي ٿو.',
        },
        {
          type: 'definition',
          term: 'بخارت کي اثر رسائي ڪرڻ وارا عام',
          definition: 'درجہ حرارت (وڌيڪ → تيز)، سطح جو رقبو (وڏو → تيز)، نمي (گهٽ → تيز)، هوا جي رفتار (وڌيڪ → تيز).',
        },
        {
          type: 'interactive',
          component: 'WetClothSim',
        },
      ],
    },
    {
      id: 'gas-laws',
      title: 'گيسن جا قانون',
      blocks: [
        {
          type: 'definition',
          term: 'بوائل جو قانون',
          definition: 'مستقل درجہ حرارت تي گيس جو دٻاءِ هن جي حجم جي الٽو تناسب ۾ هوندو آهي. جيڪڏهن حجم گهٽي ته دٻاءِ وڌي ٿو.',
          example: 'سرنج جو پسٽن ڌڪائڻ سان اندر دٻاءِ وڌي ٿو.',
        },
        {
          type: 'formula',
          name: 'بوائل جو قانون',
          formula: 'P₁V₁ = P₂V₂',
          variables: [
            { symbol: 'P₁, P₂', meaning: 'ابتدائي ۽ آخري دٻاءِ (Pa)' },
            { symbol: 'V₁, V₂', meaning: 'ابتدائي ۽ آخري حجم (m³)' },
          ],
        },
        {
          type: 'interactive',
          component: 'BoylesLawSim',
        },
        {
          type: 'definition',
          term: 'چارلس جو قانون',
          definition: 'مستقل دٻاءِ تي گيس جو حجم هن جي مطلق درجہ حرارت (ڪيلون ۾) جي سڌي تناسب ۾ هوندو آهي.',
          example: 'گرم ڪرڻ تي غبارو پهلجي وڃي ٿو.',
        },
        {
          type: 'formula',
          name: 'چارلس جو قانون',
          formula: 'V₁/T₁ = V₂/T₂',
          variables: [
            { symbol: 'V₁, V₂', meaning: 'ابتدائي ۽ آخري حجم' },
            { symbol: 'T₁, T₂', meaning: 'ابتدائي ۽ آخري درجہ حرارت (K)' },
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
      title: 'يونٽ ٩ ڪوئز',
      blocks: [
        {
          type: 'quiz',
          questions: [
            {
              id: 'q1',
              question: 'درجہ حرارت جي ايس آئي ايڪو آهي:',
              options: ['سيلسيس (°C)', 'فارن هيٽ (°F)', 'ڪيلون (K)', 'جول (J)'],
              correctIndex: 2,
              type: 'mcq',
              explanation: '',
            },
            {
              id: 'q2',
              question: '0°C برابر آهي:',
              options: ['100 K', '273 K', '373 K', '0 K'],
              correctIndex: 1,
              type: 'mcq',
              explanation: '',
            },
            {
              id: 'q3',
              question: 'پوشیدہ گرمي جذب ٿي ٿي:',
              options: ['درجہ حرارت وڌڻ تي', 'حالت جي تبديلي دوران', 'ٿڌو ٿيڻ تي', 'ڪمپريشن تي'],
              correctIndex: 1,
                          type: 'mcq',
              explanation: '',
},
            {
              id: 'q4',
              question: 'بوائل جو قانون چوي ٿو ته مستقل درجہ حرارت تي:',
              options: ['P جو V سان تناسب آهي', 'P جو V سان الٽو تناسب آهي', 'P مستقل آهي', 'V مستقل آهي'],
              correctIndex: 1,
                          type: 'mcq',
              explanation: '',
},
            {
              id: 'q5',
              question: 'پاڻي جي مخصوص گرمي جي صلاحيت آهي:',
              options: ['450 J/kg°C', '830 J/kg°C', '4186 J/kg°C', '334 J/kg°C'],
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

export default chapter09Sd;
