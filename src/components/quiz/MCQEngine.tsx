import { useState } from 'react';
import { Check, X, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useQuizStrings } from './QuizStrings';
import type { MCQQuestion, TrueFalseQuestion } from './types';

interface MCQEngineProps {
  question: MCQQuestion | TrueFalseQuestion;
  onAnswer: (correct: boolean, userAnswer: string, correctAnswer: string) => void;
  showExplanations?: boolean;
}

export default function MCQEngine({ question, onAnswer, showExplanations = true }: MCQEngineProps) {
  const { qs } = useQuizStrings();
  const [selected, setSelected] = useState<number | boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const isTrueFalse = question.type === 'trueFalse';

  const getOptions = (): { label: string; value: number | boolean }[] => {
    if (isTrueFalse) {
      return [
        { label: qs('true'), value: true },
        { label: qs('false'), value: false },
      ];
    }
    return (question as MCQQuestion).options.map((opt, i) => ({ label: opt, value: i }));
  };

  const getCorrectValue = (): number | boolean => {
    if (isTrueFalse) return (question as TrueFalseQuestion).correctAnswer;
    return (question as MCQQuestion).correctIndex;
  };

  const handleSelect = (value: number | boolean) => {
    if (submitted) return;
    setSelected(value);
  };

  const handleSubmit = () => {
    if (selected === null || submitted) return;
    setSubmitted(true);
    const correctValue = getCorrectValue();
    const isCorrect = selected === correctValue;

    const userLabel = getOptions().find(o => o.value === selected)?.label || '';
    const correctLabel = getOptions().find(o => o.value === correctValue)?.label || '';

    onAnswer(isCorrect, userLabel, correctLabel);
    if (showExplanations) setShowExplanation(true);
  };

  const options = getOptions();
  const correctValue = getCorrectValue();

  return (
    <div>
      {/* Question text */}
      <p className="text-lg text-gray-200 mb-6 leading-relaxed">{question.question}</p>

      {/* Options */}
      <div className={cn('gap-3 mb-6', isTrueFalse ? 'grid grid-cols-2' : 'flex flex-col')}>
        {options.map((opt) => {
          const isSelected = selected === opt.value;
          const isCorrect = opt.value === correctValue;
          const showState = submitted && isSelected;

          return (
            <button
              key={String(opt.value)}
              onClick={() => handleSelect(opt.value)}
              disabled={submitted}
              className={cn(
                'w-full p-4 text-start rounded-xl border-2 transition-all flex justify-between items-center min-h-[48px]',
                submitted
                  ? isCorrect
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                    : showState
                      ? 'bg-red-500/20 border-red-500 text-red-400 quiz-incorrect'
                      : 'glass-card border-white/5 text-gray-500'
                  : isSelected
                    ? 'bg-brand-purple/20 border-brand-purple text-white'
                    : 'glass-card border-white/10 hover:bg-white/5 text-gray-200'
              )}
            >
              <span className="flex-1">{opt.label}</span>
              {submitted && (
                isCorrect ? (
                  <Check size={18} className="shrink-0 ms-2" />
                ) : showState ? (
                  <X size={18} className="shrink-0 ms-2" />
                ) : null
              )}
            </button>
          );
        })}
      </div>

      {/* Submit button */}
      {selected !== null && !submitted && (
        <button
          onClick={handleSubmit}
          className="btn-primary px-6 py-3 rounded-xl text-white font-semibold flex items-center gap-2 mx-auto"
        >
          {qs('checkAnswer')} <ChevronRight size={16} />
        </button>
      )}

      {/* Feedback */}
      {submitted && (
        <div className="space-y-3">
          {/* Correct/Incorrect indicator */}
          <div
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium',
              selected === correctValue
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-red-500/10 text-red-400'
            )}
          >
            {selected === correctValue ? <Check size={16} /> : <X size={16} />}
            {selected === correctValue ? qs('correct') : qs('incorrect')}
          </div>

          {/* Explanation */}
          {showExplanations && question.explanation && (
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="w-full text-start"
            >
              <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-brand-amber/30 transition-colors">
                <p className="text-gray-300 text-sm">
                  <strong className="text-brand-amber">{qs('why')} </strong>
                  {showExplanation ? question.explanation : '...'}
                </p>
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
