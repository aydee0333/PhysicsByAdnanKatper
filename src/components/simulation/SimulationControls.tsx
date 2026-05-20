import { Play, Pause, RotateCcw } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useT } from '../../i18n/LanguageContext';
import type { SliderConfig } from '../../simulation/types';

interface SimulationControlsProps {
  isRunning: boolean;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onToggle: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  sliders?: SliderConfig[];
  className?: string;
}

const SPEED_OPTIONS = [0.25, 0.5, 1, 2];

export default function SimulationControls({
  isRunning,
  speed,
  onPlay,
  onPause,
  onReset,
  onSpeedChange,
  sliders,
  className,
}: SimulationControlsProps) {
  const t = useT();
  return (
    <div className={cn('mt-3 space-y-3', className)}>
      {/* Main controls row */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Play/Pause */}
        <button
          onClick={isRunning ? onPause : onPlay}
          className="flex items-center justify-center w-11 h-11 rounded-xl bg-brand-cyan/20 text-brand-cyan hover:bg-brand-cyan/30 transition-colors"
          aria-label={isRunning ? t('common.pause') : t('common.play')}
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
        </button>

        {/* Reset */}
        <button
          onClick={onReset}
          className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
          aria-label={t('common.reset')}
        >
          <RotateCcw size={18} />
        </button>

        {/* Speed selector */}
        <div className="flex items-center gap-1 ms-2">
          <span className="text-xs text-gray-500 me-1">{t('common.speed')}</span>
          {SPEED_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={cn(
                'px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors',
                speed === s
                  ? 'bg-brand-purple/20 text-brand-purple'
                  : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-gray-300'
              )}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {/* Custom sliders */}
      {sliders && sliders.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {sliders.map((slider) => (
            <SliderControl key={slider.label} {...slider} />
          ))}
        </div>
      )}
    </div>
  );
}

function SliderControl({ label, min, max, step, value, onChange, unit, color }: SliderConfig) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex items-center gap-3">
      <label className="text-xs text-gray-400 w-20 shrink-0 truncate" title={label}>
        {label}
      </label>
      <div className="flex-1 relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${color || '#06b6d4'} ${percentage}%, rgba(255,255,255,0.1) ${percentage}%)`,
          }}
        />
      </div>
      <span className="text-xs text-white font-mono w-16 text-end">
        {Number.isInteger(step) ? value : value.toFixed(1)}
        {unit && <span className="text-gray-500 ms-0.5">{unit}</span>}
      </span>
    </div>
  );
}
