import { useState } from 'react';
import { RotateCcw, Check, X, ChevronRight, Trophy, AlertCircle } from 'lucide-react';
import { useT } from '../i18n/LanguageContext';
import { cn } from '../utils/cn';
import { ProgressDots, ProgressBar } from './ui';

export interface QuizQuestion {
  id?: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

interface UnitQuizProps {
  unitId: string;
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
}

export default function UnitQuiz({ questions, onComplete }: UnitQuizProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const t = useT();

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);
    if (index === questions[current].correctIndex) {
      setScore(s => s + 1);
    }
  };

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setFinished(true);
      onComplete?.(score + (selected === questions[current].correctIndex ? 0 : 0), questions.length);
    }
  };

  const reset = () => {
    setCurrent(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
  };

  // Results screen
  if (finished) {
    const finalScore = score;
    const pct = Math.round((finalScore / questions.length) * 100);
    return (
      <div data-section-id="quiz" className="glass-card rounded-3xl p-6 md:p-8 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-brand-amber to-brand-orange flex items-center justify-center mb-4">
          <Trophy size={28} className="text-white" />
        </div>
        <h3 className="text-2xl font-black text-white mb-2">{t('quiz.resultTitle')}</h3>
        <p className="text-4xl font-black text-brand-cyan my-4 tabular-nums">{finalScore}/{questions.length}</p>
        <ProgressBar
          value={finalScore}
          max={questions.length}
          size="lg"
          label={t('quiz.resultScore')}
          className="max-w-xs mx-auto mb-4"
        />
        <p className="text-gray-400 mb-6">
          {pct >= 70 ? t('quiz.resultMsg') : t('quiz.resultMsgLow')}
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold transition-all"
        >
          <RotateCcw size={16} />
          {t('quiz.tryAgain')}
        </button>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div data-section-id="quiz" className="glass-card rounded-3xl p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold text-white">{t('quiz.title')}</h3>
        <button
          onClick={reset}
          className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors"
        >
          <RotateCcw size={14} />
          <span className="hidden sm:inline">{t('quiz.reset')}</span>
        </button>
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-3 mb-6">
        <ProgressDots total={questions.length} current={current} />
        <span className="text-xs text-gray-500 tabular-nums ms-auto">
          {current + 1} {t('quiz.questionOf')} {questions.length}
        </span>
      </div>

      {/* Question */}
      <p className="text-lg text-gray-100 mb-6 leading-relaxed">{q.question}</p>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.correctIndex;
          const isSelected = selected === i;

          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={showResult}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border text-start text-sm transition-all min-h-[48px]',
                showResult
                  ? isCorrect
                    ? 'bg-brand-lime/10 border-brand-lime/40 text-brand-lime'
                    : isSelected
                      ? 'bg-brand-rose/10 border-brand-rose/40 text-brand-rose'
                      : 'bg-white/[0.03] border-white/5 text-gray-500'
                  : 'bg-white/5 border-white/10 text-gray-200 hover:bg-white/10 hover:border-white/20 active:scale-[0.98]'
              )}
            >
              <span className={cn(
                'w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold transition-all',
                showResult
                  ? isCorrect
                    ? 'bg-brand-lime/20 text-brand-lime'
                    : isSelected
                      ? 'bg-brand-rose/20 text-brand-rose'
                      : 'bg-white/5 text-gray-600'
                  : 'bg-white/10 text-gray-400'
              )}>
                {showResult ? (
                  isCorrect ? <Check size={14} /> : isSelected ? <X size={14} /> : String.fromCharCode(65 + i)
                ) : (
                  String.fromCharCode(65 + i)
                )}
              </span>
              <span className="flex-1">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showResult && q.explanation && (
        <div className={cn(
          'rounded-xl border p-4 mb-6 text-sm flex items-start gap-3',
          selected === q.correctIndex
            ? 'bg-brand-lime/5 border-brand-lime/20 text-brand-lime/90'
            : 'bg-brand-amber/5 border-brand-amber/20 text-brand-amber/90'
        )}>
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-1">{t('quiz.why')}</span>
            {q.explanation}
          </div>
        </div>
      )}

      {/* Next button */}
      {showResult && (
        <button
          onClick={next}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {current < questions.length - 1 ? t('quiz.nextQuestion') : t('quiz.finishQuiz')}
          <ChevronRight size={18} />
        </button>
      )}

      {/* Live score */}
      {!showResult && (
        <div className="text-center">
          <span className="text-gray-500 text-sm">
            {t('quiz.score')}: <span className="text-brand-cyan font-bold tabular-nums">{score}/{questions.length}</span>
          </span>
        </div>
      )}
    </div>
  );
}
