import { useState, useCallback } from 'react';
import { Check, X, Lightbulb, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useQuizStrings } from './QuizStrings';
import type { NumericalQuestion } from './types';

interface NumericalSolverProps {
  question: NumericalQuestion;
  onAnswer: (correct: boolean, userAnswer: string, correctAnswer: string) => void;
  showExplanations?: boolean;
}

export default function NumericalSolver({ question, onAnswer, showExplanations = true }: NumericalSolverProps) {
  const { qs } = useQuizStrings();
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const checkAnswer = useCallback((value: string): boolean => {
    const num = parseFloat(value);
    if (isNaN(num)) return false;
    return Math.abs(num - question.correctAnswer) <= question.tolerance;
  }, [question.correctAnswer, question.tolerance]);

  const handleSubmit = () => {
    if (!input.trim() || submitted) return;
    const correct = checkAnswer(input);
    setIsCorrect(correct);
    setSubmitted(true);
    onAnswer(
      correct,
      `${input}${question.unit ? ' ' + question.unit : ''}`,
      `${question.correctAnswer}${question.unit ? ' ' + question.unit : ''}`
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim() && !submitted) {
      handleSubmit();
    }
  };

  const handleTryAgain = () => {
    setInput('');
    setSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <div>
      {/* Question text */}
      <p className="text-lg text-gray-200 mb-6 leading-relaxed">{question.question}</p>

      {/* Input area */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 relative">
          <input
            type="text"
            inputMode="decimal"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={submitted}
            placeholder={qs('enterAnswer')}
            className={cn(
              'w-full px-4 py-3 rounded-xl bg-white/5 border-2 text-white text-lg font-space outline-none transition-all',
              submitted
                ? isCorrect
                  ? 'border-emerald-500 bg-emerald-500/10'
                  : 'border-red-500 bg-red-500/10'
                : 'border-white/10 focus:border-brand-cyan'
            )}
          />
          {question.unit && (
            <span className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
              {question.unit}
            </span>
          )}
        </div>
      </div>

      {/* Hint */}
      {question.hint && !submitted && (
        <div className="mb-4">
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-sm text-brand-amber hover:text-brand-amber/80 flex items-center gap-1"
          >
            <Lightbulb size={14} /> {showHint ? qs('hint') + ':' : qs('showHint')}
          </button>
          {showHint && (
            <p className="mt-2 text-sm text-gray-400 bg-brand-amber/5 rounded-lg p-3 border border-brand-amber/10">
              {question.hint}
            </p>
          )}
        </div>
      )}

      {/* Submit button */}
      {input.trim() && !submitted && (
        <button
          onClick={handleSubmit}
          className="btn-primary px-6 py-3 rounded-xl text-white font-semibold flex items-center gap-2"
        >
          {qs('checkAnswer')} <ChevronRight size={16} />
        </button>
      )}

      {/* Feedback */}
      {submitted && (
        <div className="space-y-3">
          <div
            className={cn(
              'flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium',
              isCorrect
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-red-500/10 text-red-400'
            )}
          >
            {isCorrect ? <Check size={16} /> : <X size={16} />}
            {isCorrect ? qs('correct') : qs('incorrect')}
            {!isCorrect && (
              <span className="ms-auto text-gray-400">
                {qs('correctAnswer')}: <span className="text-white font-space">{question.correctAnswer}{question.unit ? ` ${question.unit}` : ''}</span>
              </span>
            )}
          </div>

          {/* Try again for wrong answers */}
          {!isCorrect && (
            <button
              onClick={handleTryAgain}
              className="text-sm text-brand-cyan hover:text-brand-cyan/80 flex items-center gap-1"
            >
              {qs('tryAgain')}
            </button>
          )}

          {/* Explanation */}
          {showExplanations && question.explanation && (
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <p className="text-gray-300 text-sm">
                <strong className="text-brand-amber">{qs('why')} </strong>
                {question.explanation}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
