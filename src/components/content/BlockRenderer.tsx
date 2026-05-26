import { memo } from 'react';
import type { ContentBlock } from '../../content/types';
import DefinitionBlock from './DefinitionBlock';
import FormulaBlock from './FormulaBlock';
import ExampleBlock from './ExampleBlock';
import NumericalBlock from './NumericalBlock';
import ExerciseBlock from './ExerciseBlock';
import InteractiveBlock from './InteractiveBlock';
import QuizBlockRenderer from './QuizBlockRenderer';

interface BlockRendererProps {
  block: ContentBlock;
  unitId?: string;
  contentKeyPrefix?: string;
}

export default memo(function BlockRenderer({ block, unitId, contentKeyPrefix }: BlockRendererProps) {
  switch (block.type) {
    case 'definition':
      return <DefinitionBlock block={block} contentKeyPrefix={contentKeyPrefix} />;
    case 'formula':
      return <FormulaBlock block={block} contentKeyPrefix={contentKeyPrefix} />;
    case 'example':
      return <ExampleBlock block={block} contentKeyPrefix={contentKeyPrefix} />;
    case 'quiz':
      return <QuizBlockRenderer block={block} unitId={unitId} contentKeyPrefix={contentKeyPrefix} />;
    case 'numerical':
      return <NumericalBlock block={block} contentKeyPrefix={contentKeyPrefix} />;
    case 'exercise':
      return <ExerciseBlock block={block} contentKeyPrefix={contentKeyPrefix} />;
    case 'interactive':
      return <InteractiveBlock block={block} />;
    default:
      return null;
  }
})
