import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface QuizCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function QuizCard({ children, className, title, subtitle }: QuizCardProps) {
  return (
    <div className={cn('glass-card rounded-3xl p-6 md:p-8', className)}>
      {title && (
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
