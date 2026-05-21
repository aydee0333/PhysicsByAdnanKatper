// === Translation Management System — Admin Toggle ===
// Floating button to toggle admin/edit mode.
// Only visible when user is logged in.

import { Settings, X } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface AdminToggleProps {
  enabled: boolean;
  onToggle: () => void;
  onGlossary?: () => void;
  overrideCount?: number;
}

export default function AdminToggle({
  enabled,
  onToggle,
  onGlossary,
  overrideCount = 0,
}: AdminToggleProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {/* Expanded panel when admin mode is active */}
      {enabled && (
        <div className="flex flex-col gap-2 animate-in slide-in-from-bottom-2 duration-200">
          {onGlossary && (
            <button
              onClick={onGlossary}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium',
                'bg-white/90 dark:bg-gray-800/90 backdrop-blur-md',
                'border border-purple-200 dark:border-purple-700',
                'text-purple-700 dark:text-purple-300',
                'shadow-lg hover:shadow-xl transition-all duration-200',
                'hover:scale-105 active:scale-95'
              )}
            >
              <span className="text-xs">Glossary</span>
            </button>
          )}
          {overrideCount > 0 && (
            <div
              className={cn(
                'px-3 py-1 rounded-lg text-xs font-medium',
                'bg-amber-100 dark:bg-amber-900/30',
                'text-amber-700 dark:text-amber-300',
                'border border-amber-200 dark:border-amber-700'
              )}
            >
              {overrideCount} override{overrideCount !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      )}

      {/* Main toggle button */}
      <button
        onClick={onToggle}
        title={enabled ? 'Exit Edit Mode' : 'Enter Edit Mode'}
        className={cn(
          'flex items-center justify-center w-12 h-12 rounded-full',
          'shadow-lg hover:shadow-xl transition-all duration-200',
          'hover:scale-110 active:scale-95',
          enabled
            ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
            : 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-md text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
        )}
      >
        {enabled ? <X size={20} /> : <Settings size={20} />}
      </button>
    </div>
  );
}
