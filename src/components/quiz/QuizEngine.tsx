import { useState, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useProgress } from '../../hooks/useProgress';
import { useQuizStrings } from './QuizStrings';
import QuizCard from './QuizCard';
import ProgressTracker from './ProgressTracker';
import MCQEngine from './MCQEngine';
import NumericalSolver from './NumericalSolver';
import DragDropEngine from './DragDropEngine';
import ConceptTestEngine from './ConceptTestEngine';
import ResultSummary from './ResultSummary';
import type { QuizConfig, QuizQuestion, QuestionResult, QuizResult } from './types';

interface QuizEngineProps {
  config: QuizConfig;
}

export default function QuizEngine({ config }: QuizEngineProps) {
  const { unitId, quizKey, title, questions, showExplanations = true, onComplete } = config;
  const { qs } = useQuizStrings();
  const { saveQuizScore } = useProgress(unitId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, QuestionResult>>({});
  const [phase, setPhase] = useState<'quiz' | 'results'>('quiz');

  const questionIds = useMemo(() => questions.map((q) => q.id), [questions]);
  const currentQuestion = questions[currentIndex];
  const allAnswered = Object.keys(answers).length === questions.length;

  const handleAnswer = useCallback(
    (questionId: string, correct: boolean, userAnswer: string, correctAnswer: string) => {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: { correct, userAnswer, correctAnswer },
      }));
    },
    []
  );

  const goToNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const finishQuiz = () => {
    const score = Object.values(answers).filter((a) => a.correct).length;
    const total = questions.length;
    const percentage = total > 0 ? (score / total) * 100 : 0;

    const result: QuizResult = { score, total, percentage, answers };
    saveQuizScore(quizKey, score, total);
    onComplete?.(result);
    setPhase('results');
  };

  const handleRetry = () => {
    setAnswers({});
    setCurrentIndex(0);
    setPhase('quiz');
  };

  const answeredCorrectly: Record<string, boolean> = {};
  Object.entries(answers).forEach(([id, result]) => {
    answeredCorrectly[id] = result.correct;
  });

  if (phase === 'results') {
    const score = Object.values(answers).filter((a) => a.correct).length;
    const total = questions.length;
    const percentage = total > 0 ? (score / total) * 100 : 0;

    return (
      <QuizCard title={title || qs('quizComplete')}>
        <ResultSummary
          result={{ score, total, percentage, answers }}
          questions={questions}
          onRetry={handleRetry}
        />
      </QuizCard>
    );
  }

  return (
    <QuizCard title={title}>
      <ProgressTracker
        current={currentIndex}
        total={questions.length}
        answered={answeredCorrectly}
        questionIds={questionIds}
      />

      {/* Question renderer */}
      <div className="min-h-[200px]">
        {renderQuestion(currentQuestion, handleAnswer, showExplanations)}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className={cn(
            'flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all',
            currentIndex === 0
              ? 'text-gray-600 cursor-not-allowed'
              : 'text-gray-300 hover:text-white hover:bg-white/5'
          )}
        >
          <ChevronLeft size={16} /> {qs('previousQuestion')}
        </button>

        <div className="flex items-center gap-2">
          {allAnswered && currentIndex === questions.length - 1 ? (
            <button
              onClick={finishQuiz}
              className="btn-primary px-6 py-2.5 rounded-xl text-white font-semibold text-sm flex items-center gap-2"
            >
              {qs('finishQuiz')} <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={goToNext}
              disabled={currentIndex === questions.length - 1}
              className={cn(
                'flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all',
                currentIndex === questions.length - 1
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              )}
            >
              {qs('nextQuestion')} <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </QuizCard>
  );
}

// ─── Question renderer ───

function renderQuestion(
  question: QuizQuestion,
  onAnswer: (id: string, correct: boolean, userAnswer: string, correctAnswer: string) => void,
  showExplanations: boolean,
) {
  const handleQuestionAnswer = (correct: boolean, userAnswer: string, correctAnswer: string) => {
    onAnswer(question.id, correct, userAnswer, correctAnswer);
  };

  switch (question.type) {
    case 'mcq':
    case 'trueFalse':
      return (
        <MCQEngine
          key={question.id}
          question={question}
          onAnswer={handleQuestionAnswer}
          showExplanations={showExplanations}
        />
      );

    case 'numerical':
      return (
        <NumericalSolver
          key={question.id}
          question={question}
          onAnswer={handleQuestionAnswer}
          showExplanations={showExplanations}
        />
      );

    case 'dragDrop':
    case 'match':
      return (
        <DragDropEngine
          key={question.id}
          question={question}
          onAnswer={handleQuestionAnswer}
          showExplanations={showExplanations}
        />
      );

    case 'conceptTest':
      return (
        <ConceptTestEngine
          key={question.id}
          question={question}
          onAnswer={handleQuestionAnswer}
          showExplanations={showExplanations}
        />
      );

    default:
      return <p className="text-red-400">Unknown question type</p>;
  }
}
