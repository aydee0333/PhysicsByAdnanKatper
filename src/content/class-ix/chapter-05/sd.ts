import type { ChapterContent } from '../../types';

const chapter05Sd: ChapterContent = {
  id: 'chapter-05',
  classId: 'class-ix',
  title: 'قوتون ۽ مادو',
  subtitle: 'قوتون مادي کي ڪيئن اثر ڪري ٿي — اسپرنگ، دبائو، گهڻڪ ۽ سيال',
  objectives: [
    'دبائو جي تعريف ڏيو ۽ P = F/A سان مسئلا حل ڪريو',
    'هوڪ جو قانون ۽ اسپرنگ مستقل بيان ڪريو',
    'گهڻڪ ۽ مخصوص ڪشيت جي تعريف ڏيو',
    'لچڪ، لچڪ جي حد، تناؤ، تناس ۽ ينگ جي ماڊيولس بيان ڪريو',
    'ارشميڊيز جا اصول ۽ تيران جي حالتون بيان ڪريو',
    'ماحولياتي دبائو ۽ پيمائش بيان ڪريو',
  ],
  sections: [
    {
      id: 'elasticity',
      title: 'لچڪ',
      blocks: [
        { type: 'definition', term: 'لچڪ', definition: 'لچڪ ڪنھن مادي جي اُها خاصيت آهي جيڪا ٻاهرين قوت ڪڍڻ کان پوءِ اصلي شڪل ۽ سائيزي ۾ واپس ايندي آهي.' },
        { type: 'definition', term: 'لچڪ جي حد', definition: 'وڌيڪ کان وڌيڪ حد جيتري ڪنھن مادي کي ڪڍي سگهجي ٿو بنا مستحڪم تبديلي جي. ان کان اڳي مادو اصلي شڪل ۾ واپس نٿو اچي.' },
        { type: 'formula', name: 'هوڪ جو قانون', formula: 'F = k × x', variables: [{ symbol: 'F', meaning: 'لڳائي قوت (N)' }, { symbol: 'k', meaning: 'اسپرنگ مستقل (N/m)' }, { symbol: 'x', meaning: 'توسیع (m)' }] },
        { type: 'interactive', component: 'SpringSim5' },
        { type: 'interactive', component: 'HookeGraphPlotter' },
      ],
    },
    {
      id: 'pressure',
      title: 'دبائو',
      blocks: [
        { type: 'definition', term: 'دبائو', definition: 'دبائو ڪنھن سطح تي في ايڪي رقعي تي لڳندڙ قوت آهي. اهو ٻڌائي ٿو ته هر مربع ميٽر تي ڪيتري قوت لڳي ٿي.' },
        { type: 'formula', name: 'دبائو جو فارمولا', formula: 'P = F / A', variables: [{ symbol: 'P', meaning: 'دبائو (Pa)' }, { symbol: 'F', meaning: 'قوت (N)' }, { symbol: 'A', meaning: 'رقعي (m²)' }] },
        { type: 'interactive', component: 'PressureTester' },
        { type: 'interactive', component: 'HydraulicPressSim' },
      ],
    },
    {
      id: 'stress-strain',
      title: 'تنائو ۽ تنائو جي شرح',
      blocks: [
        { type: 'definition', term: 'تنائو', definition: 'ڪنھن مادي تي في ايڪي رقعي تي لڳندڙ قوت. σ = F/A (Pa)' },
        { type: 'definition', term: 'تنائو جي شرح', definition: 'ابعاد ۾ تبديلي جو اصلي ابعاد سان تناسب. ڪي ايڪو ناهي! ε = ΔL/L' },
        { type: 'formula', name: 'يانگ جو مائڊيولس', formula: 'E = Stress / Strain = (F/A) / (ΔL/L)', variables: [{ symbol: 'E', meaning: 'يانگ جو مائڊيولس (Pa)' }, { symbol: 'σ', meaning: 'تنائو' }, { symbol: 'ε', meaning: 'تنائو جي شرح' }] },
        { type: 'interactive', component: 'StressStrainGraph' },
      ],
    },
    {
      id: 'density',
      title: 'گهڻڪ',
      blocks: [
        { type: 'definition', term: 'گهڻڪ', definition: 'گهڻڪ ڪنھن مادي جي في ايڪي حجم مادو آهي. اهو ٻڌائي ٿو ته مادو ڪيترو گهنو آهي.' },
        { type: 'formula', name: 'گهڻڪ جو فارمولا', formula: 'ρ = m / V', variables: [{ symbol: 'ρ', meaning: 'گهڻڪ (kg/m³)' }, { symbol: 'm', meaning: 'مادو (kg)' }, { symbol: 'V', meaning: 'حجم (m³)' }] },
        { type: 'interactive', component: 'DensityCalculator' },
      ],
    },
    {
      id: 'buoyancy',
      title: 'تيرڻ جي قوت ۽ ارقيمس جو اصول',
      blocks: [
        { type: 'definition', term: 'ارقيمس جو اصول', definition: 'جڏو ڪنھن شيء کي سيال ۾ ٻوڙيو وڃي ٿو ته اُن کي مٿي طرف هڪ قوت (اپٿرسٽ) ملدي آهي جيڪا سيال جي هٽائيل وزن جي برابر هوندي آهي.' },
        { type: 'formula', name: 'اپٿرسٽ فارمولا', formula: 'اپٿرسٽ = ρ_سيال × V_هٽائيل × g' },
        { type: 'interactive', component: 'BuoyancySim' },
      ],
    },
    {
      id: 'atmospheric-pressure',
      title: 'ماحولي دبائو',
      blocks: [
        { type: 'definition', term: 'ماحولي دبائو', definition: 'ماحولي دبائو زمين جي سطح تي هوا جي مالیڪيولن جي وزن کان پيدا ٿيڻ وارو دبائو آهي.' },
        { type: 'formula', name: 'معياري ماحوليات', formula: '1 atm = 101,325 Pa' },
        { type: 'interactive', component: 'AtmosphericPressureSim' },
      ],
    },
    {
      id: 'quiz',
      title: 'ايم سي ڪوئز',
      blocks: [
        {
          type: 'quiz',
          questions: [
            { id: 'q1', question: 'هوڪ جو قانون ٻڌائي ٿو ته:', options: ['F = ma', 'F = kx', 'P = F/A', 'E = mc²'], correctIndex: 1, type: 'mcq',
              explanation: '',
},
            { id: 'q2', question: 'دبائو جي ايس آئي ايڪو آهي:', options: ['نيوٽن (N)', 'پاسڪل (Pa)', 'جول (J)', 'واٽ (W)'], correctIndex: 1, type: 'mcq',
              explanation: '',
},
            { id: 'q3', question: 'ڪنھن شيء تيرندي آهي جڏو اُن جي گهڻڪ هجي:', options: ['سيال جي گهڻڪ کان وڌيڪ', 'سيال جي گهڻڪ کان گهٽ', 'سيال جي گهڻڪ جي برابر', 'صفر'], correctIndex: 1, type: 'mcq',
              explanation: '',
},
            { id: 'q4', question: 'يانگ جو مائڊيولس ناپي ٿو:', options: ['گهڻڪ', 'دبائو', 'مادي جي سختي', 'حرارت'], correctIndex: 2, type: 'mcq',
              explanation: '',
},
            { id: 'q5', question: 'سطح بحر تي ماحولي دبائو تقريباً آهي:', options: ['101,325 Pa', '10,000 Pa', '1,000,000 Pa', '1,000 Pa'], correctIndex: 0, type: 'mcq',
              explanation: '',
},
          ],
        },
      ],
    },
  ],
};

export default chapter05Sd;
