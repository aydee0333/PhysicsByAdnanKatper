import { cn } from '../../utils/cn';

interface FormulaVariable {
  symbol: string;
  value: number | string;
  unit?: string;
  color?: string;
  active?: boolean;
}

interface FormulaVisualizerProps {
  formula: string;
  variables: FormulaVariable[];
  result?: { label: string; value: number | string; unit?: string };
  className?: string;
}

export default function FormulaVisualizer({
  formula,
  variables,
  result,
  className,
}: FormulaVisualizerProps) {
  return (
    <div className={cn('rounded-xl border border-white/10 bg-white/5 p-4', className)}>
      {/* Formula */}
      <div className="text-center mb-3">
        <span className="font-mono text-lg md:text-xl font-bold text-white tracking-wide">
          {formula}
        </span>
      </div>

      {/* Variable values */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-3">
        {variables.map((v) => (
          <div
            key={v.symbol}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm transition-all',
              v.active
                ? 'bg-brand-cyan/20 text-brand-cyan scale-105'
                : 'bg-white/5 text-gray-400'
            )}
          >
            <span className="font-mono font-bold">{v.symbol}</span>
            <span className="text-gray-500">=</span>
            <span className="font-mono">{v.value}</span>
            {v.unit && <span className="text-gray-500 text-xs">{v.unit}</span>}
          </div>
        ))}
      </div>

      {/* Result */}
      {result && (
        <div className="text-center pt-2 border-t border-white/10">
          <span className="text-xs text-gray-500 me-2">{result.label}:</span>
          <span className="font-mono text-lg font-bold text-brand-amber">
            {typeof result.value === 'number' ? result.value.toFixed(2) : result.value}
          </span>
          {result.unit && (
            <span className="text-gray-500 text-sm ms-1">{result.unit}</span>
          )}
        </div>
      )}
    </div>
  );
}
