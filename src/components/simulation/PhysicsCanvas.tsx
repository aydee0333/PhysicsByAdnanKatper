import type { SimulationFactory, SliderConfig } from '../../simulation/types';
import { useSimulationCanvas } from '../../simulation/useSimulationCanvas';
import { useSimulationInput } from '../../simulation/useSimulationInput';
import SimulationControls from './SimulationControls';

interface PhysicsCanvasProps {
  createSimulation: SimulationFactory;
  className?: string;
  aspectRatio?: number;
  showControls?: boolean;
  sliders?: SliderConfig[];
  children?: React.ReactNode;
}

export default function PhysicsCanvas({
  createSimulation,
  className = '',
  aspectRatio = 16 / 9,
  showControls = true,
  sliders,
  children,
}: PhysicsCanvasProps) {
  const { canvasRef, isRunning, speed, controls } = useSimulationCanvas(createSimulation);
  useSimulationInput(canvasRef);

  return (
    <div className={className}>
      <div
        className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-black/40"
        style={{ aspectRatio }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-crosshair"
          style={{ touchAction: 'none' }}
        />
        {children}
      </div>
      {showControls && (
        <SimulationControls
          isRunning={isRunning}
          speed={speed}
          onPlay={controls.play}
          onPause={controls.pause}
          onToggle={controls.toggle}
          onReset={controls.reset}
          onSpeedChange={controls.setSpeed}
          sliders={sliders}
        />
      )}
    </div>
  );
}
