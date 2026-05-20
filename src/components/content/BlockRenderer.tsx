import { memo } from 'react';
import type { ContentBlock } from '../../content/types';
import DefinitionBlock from './DefinitionBlock';
import FormulaBlock from './FormulaBlock';
import ExampleBlock from './ExampleBlock';
import NumericalBlock from './NumericalBlock';
import ExerciseBlock from './ExerciseBlock';
import InteractiveBlock from './InteractiveBlock';
import QuizBlockRenderer from './QuizBlockRenderer';

export default memo(function BlockRenderer({ block, unitId }: { block: ContentBlock; unitId?: string }) {
  switch (block.type) {
    case 'definition':
      return <DefinitionBlock block={block} />;
    case 'formula':
      return <FormulaBlock block={block} />;
    case 'example':
      return <ExampleBlock block={block} />;
    case 'quiz':
      return <QuizBlockRenderer block={block} unitId={unitId} />;
    case 'numerical':
      return <NumericalBlock block={block} />;
    case 'exercise':
      return <ExerciseBlock block={block} />;
    case 'interactive':
      return <InteractiveBlock block={block} />;
    default:
      return null;
  }
})
