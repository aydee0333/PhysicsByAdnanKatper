import { useState } from 'react';
import { RotateCcw, Check, X } from 'lucide-react';

export interface QuizQuestion {
  id: string;
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

export default function UnitQuiz({ unitId, questions, onComplete }: UnitQuizProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

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
      onComplete?.(score, questions.length);
    }
  };

  const reset = () => {
    setCurrent(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
  };

  const q = questions[current];

  return (
    <div className="glass-card rounded-3xl p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">
          Unit Quiz • {current + 1}/{questions.length}
        </h3>
        <button onClick={reset} className="text-gray-400 hover:text-white flex items-center gap-1 text-sm">
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      <p className="text-lg text-gray-200 mb-6">{q.question}</p>

      <div className="space-y-3 mb-6">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.correctIndex;
          const isSelected = i === selected;
          const showState = showResult && isSelected;
          
          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={showResult}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all flex justify-between items-center ${
                showState
                  ? isCorrect
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                    : 'bg-red-500/20 border-red-500 text-red-400'
                  : 'glass-card border-white/10 hover:bg-white/5'
              }`}
            >
              <span>{opt}</span>
              {showState && (isCorrect ? <Check size={18} /> : isSelected && <X size={18} />)}
            </button>
          );
        })}
      </div>

      {showResult && (
        <>
          {q.explanation && (
            <div className="bg-white/5 rounded-xl p-4 mb-4">
              <p className="text-gray-300 text-sm">
                <strong className="text-brand-amber">Why?</strong> {q.explanation}
              </p>
            </div>
          )}
          <button 
            onClick={next}
            className="btn-primary px-6 py-3 rounded-xl text-white font-semibold flex items-center gap-2 mx-auto"
          >
            {current < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </>
      )}

      <div className="mt-4 text-center">
        <span className="text-gray-400 text-sm">
          Score: <span className="text-brand-cyan font-bold">{score}/{questions.length}</span>
        </span>
      </div>
    </div>
  );
}