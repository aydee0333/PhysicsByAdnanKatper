import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useLang } from '../../i18n/LanguageContext';
import { cn } from '../../utils/cn';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  const { dir } = useLang();
  const isRtl = dir === 'rtl';
  const Chevron = isRtl ? ChevronLeft : ChevronRight;

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1.5 flex-wrap', className)}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <Chevron size={14} className="text-gray-600 shrink-0" />}
            {item.to && !isLast ? (
              <Link
                to={item.to}
                className="text-sm text-gray-400 hover:text-brand-cyan transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={cn('text-sm', isLast ? 'text-brand-cyan font-medium' : 'text-gray-400')}>
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
