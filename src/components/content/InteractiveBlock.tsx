import { INTERACTIVE_COMPONENTS } from './interactiveRegistry';
import type { InteractiveBlock as InteractiveBlockType } from '../../content/types';

export default function InteractiveBlock({ block }: { block: InteractiveBlockType }) {
  const Component = INTERACTIVE_COMPONENTS[block.component];

  if (!Component) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center">
        <p className="text-red-400 text-sm">
          Interactive component not found: <code className="font-mono">{block.component}</code>
        </p>
      </div>
    );
  }

  return <Component {...(block.props ?? {})} />;
}
