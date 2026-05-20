import { memo } from 'react';
import {
  BookText,
  Sigma,
  Calculator,
  Lightbulb,
  PenLine,
  HelpCircle,
} from 'lucide-react';
import type { SearchResult } from '../../search/searchIndex';
import { useT } from '../../i18n/LanguageContext';

const BLOCK_ICONS: Record<string, typeof BookText> = {
  definition: BookText,
  formula: Sigma,
  numerical: Calculator,
  example: Lightbulb,
  exercise: PenLine,
  quiz: HelpCircle,
};

interface SearchResultItemProps {
  result: SearchResult;
  active: boolean;
  onClick: () => void;
  id: string;
}

export default memo(function SearchResultItem({
  result,
  active,
  onClick,
  id,
}: SearchResultItemProps) {
  const t = useT();
  const { entry, snippet } = result;
  const Icon = BLOCK_ICONS[entry.blockType] ?? BookText;
  const typeLabel = t(`search.${entry.blockType}`);

  // Highlight the match in the snippet (simple approach — mark first occurrence)
  const highlightSnippet = (text: string) => {
    // We don't have the query here, so just return plain text
    // The parent can pass highlighted HTML if needed
    return text;
  };

  return (
    <button
      id={id}
      role="option"
      aria-selected={active}
      onClick={onClick}
      className={`w-full text-start px-4 py-3 flex items-start gap-3 transition-colors rounded-xl ${
        active
          ? 'bg-brand-cyan/10 border border-brand-cyan/20'
          : 'hover:bg-white/5 border border-transparent'
      }`}
    >
      <div className="shrink-0 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mt-0.5">
        <Icon size={16} className="text-brand-cyan" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-cyan/70 bg-brand-cyan/10 px-1.5 py-0.5 rounded">
            {typeLabel}
          </span>
          <span className="text-sm font-semibold text-white truncate">
            {entry.label}
          </span>
        </div>
        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
          {highlightSnippet(snippet)}
        </p>
      </div>
    </button>
  );
});
