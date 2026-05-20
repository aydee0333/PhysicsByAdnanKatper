import { type ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface FormulaCardProps {
  formula: string;
  label?: string;
  description?: string;
  color?: 'purple' | 'cyan' | 'pink' | 'amber' | 'teal' | 'rose';
  className?: string;
}

const colorMap = {
  purple: {
    border: 'border-brand-purple/30',
    glow: 'shadow-[0_0_30px_rgba(124,58,237,0.1)]',
    bg: 'from-brand-purple/10 to-transparent',
    text: 'text-brand-purple',
    accent: 'bg-brand-purple/20',
  },
  cyan: {
    border: 'border-brand-cyan/30',
    glow: 'shadow-[0_0_30px_rgba(6,182,212,0.1)]',
    bg: 'from-brand-cyan/10 to-transparent',
    text: 'text-brand-cyan',
    accent: 'bg-brand-cyan/20',
  },
  pink: {
    border: 'border-brand-pink/30',
    glow: 'shadow-[0_0_30px_rgba(236,72,153,0.1)]',
    bg: 'from-brand-pink/10 to-transparent',
    text: 'text-brand-pink',
    accent: 'bg-brand-pink/20',
  },
  amber: {
    border: 'border-brand-amber/30',
    glow: 'shadow-[0_0_30px_rgba(245,158,11,0.1)]',
    bg: 'from-brand-amber/10 to-transparent',
    text: 'text-brand-amber',
    accent: 'bg-brand-amber/20',
  },
  teal: {
    border: 'border-brand-teal/30',
    glow: 'shadow-[0_0_30px_rgba(20,184,166,0.1)]',
    bg: 'from-brand-teal/10 to-transparent',
    text: 'text-brand-teal',
    accent: 'bg-brand-teal/20',
  },
  rose: {
    border: 'border-brand-rose/30',
    glow: 'shadow-[0_0_30px_rgba(244,63,94,0.1)]',
    bg: 'from-brand-rose/10 to-transparent',
    text: 'text-brand-rose',
    accent: 'bg-brand-rose/20',
  },
};

export default function FormulaCard({ formula, label, description, color = 'cyan', className }: FormulaCardProps) {
  const c = colorMap[color];

  return (
    <div
      className={cn(
        'relative rounded-2xl border bg-gradient-to-br p-5 transition-all duration-300 hover:scale-[1.02]',
        c.border,
        c.glow,
        c.bg,
        className
      )}
    >
      {label && (
        <span className={cn('text-xs font-bold uppercase tracking-widest mb-2 block', c.text)}>
          {label}
        </span>
      )}
      <div className="font-space text-xl md:text-2xl font-bold text-white tracking-wide text-center py-2">
        {formula}
      </div>
      {description && (
        <p className="text-sm text-gray-400 mt-2 text-center">{description}</p>
      )}
    </div>
  );
}

interface FormulaGroupProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function FormulaGroup({ children, title, className }: FormulaGroupProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {title && (
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
          {title}
        </h3>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        {children}
      </div>
    </div>
  );
}
