import { type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { GSAP_REVEAL_STYLE } from '../../utils/styles';

interface SectionCardProps {
  children: ReactNode;
  icon?: ReactNode;
  title?: string;
  subtitle?: string;
  sectionId?: string;
  className?: string;
  /** Brand color for the icon accent */
  accent?: 'purple' | 'cyan' | 'pink' | 'amber' | 'teal' | 'rose';
}

const accentColors = {
  purple: 'text-brand-purple',
  cyan: 'text-brand-cyan',
  pink: 'text-brand-pink',
  amber: 'text-brand-amber',
  teal: 'text-brand-teal',
  rose: 'text-brand-rose',
};

export default function SectionCard({
  children,
  icon,
  title,
  subtitle,
  sectionId,
  accent = 'cyan',
  className,
}: SectionCardProps) {
  return (
    <div
      data-section-id={sectionId}
      className={cn(
        'unit-detail-reveal glass-card rounded-3xl p-6 md:p-8',
        className
      )}
      {...GSAP_REVEAL_STYLE}
    >
      {(icon || title) && (
        <div className="flex items-start gap-4 mb-6">
          {icon && (
            <div className={cn('shrink-0', accentColors[accent])}>
              {icon}
            </div>
          )}
          {title && (
            <div className="min-w-0">
              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                {title}
              </h2>
              {subtitle && (
                <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
              )}
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

/** Sub-section within a SectionCard */
export function SubSection({ children, title, className }: { children: ReactNode; title?: string; className?: string }) {
  return (
    <div className={cn('mt-6 first:mt-0', className)}>
      {title && (
        <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
      )}
      {children}
    </div>
  );
}

/** Info box for definitions and key facts */
export function InfoBox({
  children,
  variant = 'default',
  className,
}: {
  children: ReactNode;
  variant?: 'default' | 'highlight' | 'warning';
  className?: string;
}) {
  const variants = {
    default: 'bg-white/5 border-white/10',
    highlight: 'bg-brand-cyan/5 border-brand-cyan/20',
    warning: 'bg-brand-amber/5 border-brand-amber/20',
  };

  return (
    <div className={cn('rounded-xl border p-4 text-sm leading-relaxed', variants[variant], className)}>
      {children}
    </div>
  );
}
