import { useState } from 'react';
import { FlaskConical } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useQuizStrings } from './QuizStrings';
import MCQEngine from './MCQEngine';
import NumericalSolver from './NumericalSolver';
import type { ConceptTestQuestion, MCQQuestion, TrueFalseQuestion, NumericalQuestion } from './types';

interface ConceptTestEngineProps {
  question: ConceptTestQuestion;
  onAnswer: (correct: boolean, userAnswer: string, correctAnswer: string) => void;
  showExplanations?: boolean;
}

export default function ConceptTestEngine({ question, onAnswer, showExplanations = true }: ConceptTestEngineProps) {
  const { qs } = useQuizStrings();
  const [currentSub, setCurrentSub] = useState(0);
  const [subResults, setSubResults] = useState<boolean[]>([]);
  const [completed, setCompleted] = useState(false);

  const totalSubs = question.subQuestions.length;
  const subQuestion = question.subQuestions[currentSub];

  const handleSubAnswer = (correct: boolean) => {
    const newResults = [...subResults, correct];
    setSubResults(newResults);

    if (currentSub < totalSubs - 1) {
      setTimeout(() => setCurrentSub(currentSub + 1), 800);
    } else {
      setCompleted(true);
      const correctCount = newResults.filter(Boolean).length;
      const allCorrect = correctCount === totalSubs;
      onAnswer(
        allCorrect,
        `${correctCount}/${totalSubs} sub-questions correct`,
        `${totalSubs}/${totalSubs} sub-questions correct`
      );
    }
  };

  const renderSubQuestion = (sub: MCQQuestion | TrueFalseQuestion | NumericalQuestion, _index: number) => {
    if (sub.type === 'numerical') {
      return (
        <NumericalSolver
          key={sub.id}
          question={sub}
          onAnswer={(correct) => handleSubAnswer(correct)}
          showExplanations={showExplanations}
        />
      );
    }
    // MCQ or TrueFalse
    return (
      <MCQEngine
        key={sub.id}
        question={sub as MCQQuestion | TrueFalseQuestion}
        onAnswer={(correct) => handleSubAnswer(correct)}
        showExplanations={showExplanations}
      />
    );
  };

  return (
    <div>
      {/* Question title */}
      <p className="text-lg text-gray-200 mb-4 leading-relaxed">{question.question}</p>

      {/* Scenario */}
      <div className="bg-brand-cyan/5 border border-brand-cyan/20 rounded-xl p-5 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <FlaskConical size={16} className="text-brand-cyan" />
          <span className="text-sm font-semibold text-brand-cyan">{qs('scenario')}</span>
        </div>
        <div
          className="text-gray-300 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: question.scenario }}
        />
      </div>

      {/* Sub-question progress */}
      <div className="flex items-center gap-2 mb-4">
        {question.subQuestions.map((_, i) => (
          <div
            key={i}
            className={cn(
              'flex items-center gap-1.5 text-xs px-2 py-1 rounded-full',
              i < subResults.length
                ? subResults[i]
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-red-500/20 text-red-400'
                : i === currentSub
                  ? 'bg-brand-purple/20 text-brand-purple'
                  : 'bg-white/5 text-gray-500'
            )}
          >
            {qs('step')} {i + 1}
          </div>
        ))}
      </div>

      {/* Current sub-question */}
      {!completed && renderSubQuestion(subQuestion, currentSub)}

      {/* Completion */}
      {completed && (
        <div className="bg-white/5 rounded-xl p-5 text-center">
          <p className="text-gray-300 mb-2">
            {subResults.filter(Boolean).length}/{totalSubs} {qs('correct').toLowerCase()}
          </p>

          {/* Main question explanation */}
          {showExplanations && question.explanation && (
            <div className="bg-white/5 rounded-xl p-4 border border-white/5 mt-4 text-start">
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
