import { useState } from 'react';
import { RotateCcw, ChevronDown, ChevronUp, Check, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useQuizStrings } from './QuizStrings';
import type { QuizQuestion, QuizResult } from './types';

interface ResultSummaryProps {
  result: QuizResult;
  questions: QuizQuestion[];
  onRetry: () => void;
}

export default function ResultSummary({ result, questions, onRetry }: ResultSummaryProps) {
  const { qs } = useQuizStrings();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const percentage = result.percentage;
  const gradeColor =
    percentage >= 80
      ? 'text-brand-lime'
      : percentage >= 50
        ? 'text-brand-amber'
        : 'text-brand-rose';
  const gradeMessage =
    percentage >= 80
      ? qs('excellent')
      : percentage >= 50
        ? qs('good')
        : qs('needsPractice');

  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="space-y-6">
      {/* Score circle */}
      <div className="text-center">
        <div className="relative inline-flex items-center justify-center mb-4">
          <svg width="140" height="140" className="-rotate-90">
            <circle
              cx="70"
              cy="70"
              r="54"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="8"
            />
            <circle
              cx="70"
              cy="70"
              r="54"
              fill="none"
              stroke={percentage >= 80 ? '#84cc16' : percentage >= 50 ? '#f59e0b' : '#f43f5e'}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className={cn('text-3xl font-black font-space', gradeColor)}>
              {result.score}/{result.total}
            </span>
            <span className="text-sm text-gray-400">{Math.round(percentage)}%</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-1">{qs('quizComplete')}</h3>
        <p className="text-gray-400 text-sm">{gradeMessage}</p>
      </div>

      {/* Question review */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
          {qs('viewResults')}
        </h4>

        {questions.map((q) => {
          const answer = result.answers[q.id];
          if (!answer) return null;
          const isExpanded = expanded[q.id];

          return (
            <div
              key={q.id}
              className="rounded-xl border border-white/5 overflow-hidden"
            >
              <button
                onClick={() => toggleExpand(q.id)}
                className="w-full flex items-center gap-3 p-4 text-start hover:bg-white/3 transition-colors"
              >
                <div
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center shrink-0',
                    answer.correct ? 'bg-emerald-500/20' : 'bg-red-500/20'
                  )}
                >
                  {answer.correct ? (
                    <Check size={14} className="text-emerald-400" />
                  ) : (
                    <X size={14} className="text-red-400" />
                  )}
                </div>
                <span className="flex-1 text-sm text-gray-200 line-clamp-1">{q.question}</span>
                {isExpanded ? (
                  <ChevronUp size={16} className="text-gray-400 shrink-0" />
                ) : (
                  <ChevronDown size={16} className="text-gray-400 shrink-0" />
                )}
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 space-y-2 border-t border-white/5 pt-3">
                  <div className="flex gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">{qs('yourAnswer')}: </span>
                      <span
                        className={cn(
                          'font-medium',
                          answer.correct ? 'text-emerald-400' : 'text-red-400'
                        )}
                      >
                        {answer.userAnswer || qs('notAnswered')}
                      </span>
                    </div>
                    {!answer.correct && (
                      <div>
                        <span className="text-gray-500">{qs('correctAnswer')}: </span>
                        <span className="font-medium text-emerald-400">{answer.correctAnswer}</span>
                      </div>
                    )}
                  </div>

                  {q.explanation && (
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-gray-300 text-sm">
                        <strong className="text-brand-amber">{qs('why')} </strong>
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Retry button */}
      <button
        onClick={onRetry}
        className="btn-primary px-6 py-3 rounded-xl text-white font-semibold flex items-center gap-2 mx-auto"
      >
        <RotateCcw size={16} /> {qs('retryQuiz')}
      </button>
    </div>
  );
}
