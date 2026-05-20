import { cn } from '../../utils/cn';
import { useQuizStrings } from './QuizStrings';

interface ProgressTrackerProps {
  current: number;
  total: number;
  answered: Record<string, boolean>; // questionId → correct/incorrect
  questionIds: string[];
}

export default function ProgressTracker({ current, total, answered, questionIds }: ProgressTrackerProps) {
  const { qs } = useQuizStrings();
  const progress = ((current) / total) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-gray-400">
          {qs('questionOf', { current: current + 1, total })}
        </span>
        <span className="text-sm text-gray-400">
          {Object.keys(answered).length}/{total} answered
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-3">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #7c3aed, #06b6d4)',
          }}
        />
      </div>

      {/* Question dots */}
      <div className="flex gap-1.5 justify-center flex-wrap">
        {questionIds.map((id, i) => {
          const isAnswered = id in answered;
          const isCorrect = answered[id];
          const isCurrent = i === current;

          return (
            <div
              key={id}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-300',
                isAnswered
                  ? isCorrect
                    ? 'bg-brand-lime'
                    : 'bg-brand-rose'
                  : isCurrent
                    ? 'bg-brand-purple ring-2 ring-brand-purple/40 ring-offset-2 ring-offset-brand-dark'
                    : 'bg-white/10'
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
