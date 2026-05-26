import { QuizEngine } from '../quiz';
import type { QuizBlock as QuizBlockType } from '../../content/types';

interface QuizBlockRendererProps {
  block: QuizBlockType;
  unitId?: string;
  contentKeyPrefix?: string;
}

export default function QuizBlockRenderer({ block, unitId, contentKeyPrefix }: QuizBlockRendererProps) {
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
      contentKeyPrefix={contentKeyPrefix}
    />
  );
}
