import { cn } from '../../utils/cn';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'purple' | 'cyan' | 'pink' | 'amber';
  className?: string;
}

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
};

const gradientColors = {
  default: 'from-brand-cyan to-brand-purple',
  purple: 'from-brand-purple to-brand-pink',
  cyan: 'from-brand-cyan to-brand-teal',
  pink: 'from-brand-pink to-brand-rose',
  amber: 'from-brand-amber to-brand-orange',
};

export default function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = true,
  size = 'md',
  color = 'default',
  className,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className={cn('w-full', className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs text-gray-400 mb-1.5">
          {label && <span>{label}</span>}
          {showPercentage && (
            <span className="text-brand-cyan font-bold tabular-nums">{percentage}%</span>
          )}
        </div>
      )}
      <div className={cn('w-full bg-white/10 rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className={cn('h-full bg-gradient-to-r rounded-full transition-all duration-700 ease-out', gradientColors[color])}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}

/** Small inline progress indicator (dot-based) */
export function ProgressDots({ total, current, className }: { total: number; current: number; className?: string }) {
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={cn(
            'w-2 h-2 rounded-full transition-all duration-300',
            i < current
              ? 'bg-brand-cyan scale-100'
              : i === current
                ? 'bg-brand-cyan/60 scale-110'
                : 'bg-white/15 scale-90'
          )}
        />
      ))}
    </div>
  );
}
