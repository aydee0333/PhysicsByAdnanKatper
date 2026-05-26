import { useLang } from '../../i18n/LanguageContext';
import { getOverride } from '../../i18n/tms/overrideManager';

const STRINGS = {
  en: {
    nextQuestion: 'Next Question',
    previousQuestion: 'Previous',
    submitAnswer: 'Submit',
    checkAnswer: 'Check Answer',
    tryAgain: 'Try Again',
    retryQuiz: 'Retry Quiz',
    why: 'Why?',
    correct: 'Correct!',
    incorrect: 'Incorrect',
    yourAnswer: 'Your Answer',
    correctAnswer: 'Correct Answer',
    score: 'Score',
    questionOf: 'Question {current} of {total}',
    quizComplete: 'Quiz Complete!',
    excellent: 'Excellent! Great understanding!',
    good: 'Good effort! Review the explanations below.',
    needsPractice: 'Keep practicing! Read the explanations carefully.',
    dragItemsHere: 'Drag items here',
    tapToConnect: 'Tap to connect pairs',
    enterAnswer: 'Enter your answer',
    hint: 'Hint',
    matchPairs: 'Match the Following',
    dragAndDrop: 'Drag and Drop',
    conceptTest: 'Concept Test',
    finishQuiz: 'Finish Quiz',
    viewResults: 'View Results',
    backToUnit: 'Back to Unit',
    true: 'True',
    false: 'False',
    notAnswered: 'Not answered',
    showHint: 'Show Hint',
    connected: 'Connected',
    allMatched: 'All pairs matched!',
    dropHere: 'Drop here',
    checkAllAnswers: 'Check All Answers',
    step: 'Step',
    scenario: 'Scenario',
  },
  ur: {
    nextQuestion: 'اگلا سوال',
    previousQuestion: 'پچھلا',
    submitAnswer: 'جمع کریں',
    checkAnswer: 'جواب چیک کریں',
    tryAgain: 'دوبارہ کوشش کریں',
    retryQuiz: 'کوئز دہرائیں',
    why: 'کیوں؟',
    correct: 'درست!',
    incorrect: 'غلط',
    yourAnswer: 'آپ کا جواب',
    correctAnswer: 'درست جواب',
    score: 'سکور',
    questionOf: 'سوال {current} از {total}',
    quizComplete: 'کوئز مکمل!',
    excellent: 'بہت اچھا! بہترین سمجھ!',
    good: 'اچھی کوشش! نیچے وضاحتیں دیکھیں۔',
    needsPractice: 'مشق جاری رکھیں! وضاحتیں غور سے پڑھیں۔',
    dragItemsHere: 'یہاں گھسیٹیں',
    tapToConnect: 'جوڑنے کے لیے تھپتھپائیں',
    enterAnswer: 'اپنا جواب درج کریں',
    hint: 'اشارہ',
    matchPairs: 'جوڑا ملائیں',
    dragAndDrop: 'گھسیٹو اور چھوڑو',
    conceptTest: 'تصور ٹیسٹ',
    finishQuiz: 'کوئز ختم کریں',
    viewResults: 'نتائج دیکھیں',
    backToUnit: 'واپس یونٹ پر',
    true: 'سچ',
    false: 'جھوٹ',
    notAnswered: 'جواب نہیں دیا',
    showHint: 'اشارہ دکھائیں',
    connected: 'جوڑ دیا',
    allMatched: 'تمام جوڑے مل گئے!',
    dropHere: 'یہاں چھوڑیں',
    checkAllAnswers: 'تمام جوابات چیک کریں',
    step: 'قدم',
    scenario: 'منظر نامہ',
  },
  sd: {
    nextQuestion: 'اڳوڙو سوال',
    previousQuestion: 'پويانو',
    submitAnswer: 'جمع ڪريو',
    checkAnswer: 'جواب چيڪ ڪريو',
    tryAgain: 'ٻيهر ڪوشش ڪريو',
    retryQuiz: 'ڪوئز ٻيهر ڪريو',
    why: 'ڇو؟',
    correct: 'صحيح!',
    incorrect: 'غلط',
    yourAnswer: 'توهان جو جواب',
    correctAnswer: 'صحيح جواب',
    score: 'اسڪور',
    questionOf: 'سوال {current} جي {total}',
    quizComplete: 'ڪوئز مڪمل!',
    excellent: 'وڌيڪ سٺو! بهترين سمجھ!',
    good: 'سٺي ڪوشش! ٺيٺ وضاحتون ڏسو۔',
    needsPractice: 'مشق جاري رکو! وضاحتون ڌيان سان پڙهو۔',
    dragItemsHere: 'هتي گهسيٺو',
    tapToConnect: 'جڙڻ لاءِ ٽيپ ڪريو',
    enterAnswer: 'پنھنجو جواب داخل ڪريو',
    hint: 'اشارو',
    matchPairs: 'جوڙو ملائيو',
    dragAndDrop: 'گهسيٺو ۽ ڇڏيو',
    conceptTest: 'تصور ٽيسٽ',
    finishQuiz: 'ڪوئز ختم ڪريو',
    viewResults: ' نتيجا ڏسو',
    backToUnit: 'واپس يونٽ تي',
    true: 'سچ',
    false: 'ڌوڪو',
    notAnswered: 'جواب ڏنو نە',
    showHint: 'اشارو ڏيکاريو',
    connected: 'جوڙو ٿيو',
    allMatched: 'سڀ جوڙا مليا!',
    dropHere: 'هتي ڇڏيو',
    checkAllAnswers: 'سڀ جوابات چيڪ ڪريو',
    step: 'قدم',
    scenario: 'منظر نامو',
  },
} as const;

export type QuizStringKey = keyof typeof STRINGS.en;

export function useQuizStrings() {
  const { lang: language } = useLang();
  const lang = (language in STRINGS ? language : 'en') as keyof typeof STRINGS;

  const qs = (key: QuizStringKey, replacements?: Record<string, string | number>): string => {
    // Check for TMS override first
    const override = getOverride(`quiz.${key}`, lang);
    let text: string = override ?? STRINGS[lang][key] ?? STRINGS.en[key];
    if (replacements) {
      Object.entries(replacements).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  };

  return { qs, lang };
}
