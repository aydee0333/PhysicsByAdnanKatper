import { QuizEngine } from '../quiz';
import type { QuizBlock as QuizBlockType } from '../../content/types';

export default function QuizBlockRenderer({ block, unitId }: { block: QuizBlockType; unitId?: string }) {
  const resolvedUnitId = unitId ?? 'default';
  const quizKey = `${resolvedUnitId}-quiz`;

  return (
    <QuizEngine
      config={{
        unitId: resolvedUnitId,
        quizKey,
        questions: block.questions,
        showExplanations: true,
      }}
    />
  );
}
