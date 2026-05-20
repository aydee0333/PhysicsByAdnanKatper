import type { ReactNode } from 'react';
import { GSAP_REVEAL_STYLE } from '../utils/styles';

interface SectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  color?: string;
}

const colorClasses: Record<string, { bg: string; text: string }> = {
  'brand-cyan': { bg: 'bg-[#06b6d4]/20', text: 'text-[#06b6d4]' },
  'brand-purple': { bg: 'bg-[#7c3aed]/20', text: 'text-[#7c3aed]' },
  'brand-pink': { bg: 'bg-[#ec4899]/20', text: 'text-[#ec4899]' },
  'brand-amber': { bg: 'bg-[#f59e0b]/20', text: 'text-[#f59e0b]' },
  'brand-rose': { bg: 'bg-[#f43f5e]/20', text: 'text-[#f43f5e]' },
  'brand-teal': { bg: 'bg-[#14b8a6]/20', text: 'text-[#14b8a6]' },
  'brand-lime': { bg: 'bg-[#84cc16]/20', text: 'text-[#84cc16]' },
};

export default function Section({ title, icon, children, color = 'brand-cyan' }: SectionProps) {
  const c = colorClasses[color] || colorClasses['brand-cyan'];
  const sectionId = title.toLowerCase().replace(/[^a-z0-9\u0600-\u06FF\u0750-\u077F\s]/g, '').replace(/\s+/g, '-');

  return (
    <div
      className="unit-detail-reveal mb-16"
      {...GSAP_REVEAL_STYLE}
      data-section-id={sectionId}
    >
      <div className="glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden">
        <div className="flex items-center gap-4 mb-8">
          <div className={`w-12 h-12 rounded-2xl ${c.bg} flex items-center justify-center ${c.text}`}>
            {icon}
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}
