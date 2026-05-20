import { useState, useCallback } from 'react';
import PhysicsCanvas from '../simulation/PhysicsCanvas';
import FormulaVisualizer from '../simulation/FormulaVisualizer';
import type { SimulationFactory, SimulationInstance, SimulationConfig, SliderConfig } from '../../simulation/types';
import { Vec2, drawGrid, drawText } from '../../simulation/physics';

export default function SoundSimulation() {
  const [frequency, setFrequency] = useState(440);
  const [amplitude, setAmplitude] = useState(50);

  const wavelength = 343 / frequency;

  const createSim: SimulationFactory = useCallback((_factoryCtx, _factoryConfig) => {
    let time = 0;

    const sim: SimulationInstance = {
      init: () => { time = 0; },
      update: (state) => { time += state.dt; },
      reset: () => { time = 0; },
      destroy: () => {},
      draw: (ctx: CanvasRenderingContext2D, cfg: SimulationConfig) => {
        const w = cfg.width;
        const h = cfg.height;
        ctx.clearRect(0, 0, w, h);
        drawGrid(ctx, w, h, 40, 'rgba(255,255,255,0.03)');

        const centerY = h / 2;
        const startX = 50;
        const endX = w - 50;
        const waveLength = endX - startX;

        // Draw sound wave
        ctx.save();
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let x = startX; x <= endX; x++) {
          const progress = (x - startX) / waveLength;
          const y = centerY + amplitude * Math.sin(2 * Math.PI * frequency * progress - time * 5);
          if (x === startX) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Draw compression and rarefaction regions
        const regions = 5;
        for (let i = 0; i < regions; i++) {
          const x = startX + (i + 0.5) * (waveLength / regions);
          const y = centerY + amplitude * Math.sin(2 * Math.PI * frequency * ((x - startX) / waveLength) - time * 5);

          ctx.fillStyle = i % 2 === 0 ? 'rgba(6, 182, 212, 0.2)' : 'rgba(236, 72, 153, 0.2)';
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, Math.PI * 2);
          ctx.fill();

          drawText(ctx, i % 2 === 0 ? 'C' : 'R', Vec2.from(x, y - 15), 'rgba(255,255,255,0.7)', 12);
        }

        // Labels
        drawText(ctx, 'Compression (C)', Vec2.from(startX, 30), 'rgba(6,182,212,0.7)', 12, 'left');
        drawText(ctx, 'Rarefaction (R)', Vec2.from(startX + 100, 30), 'rgba(236,72,153,0.7)', 12, 'left');

        // Wavelength indicator
        const wlPx = waveLength * (wavelength / (343 / frequency));
        if (wlPx < waveLength) {
          ctx.strokeStyle = 'rgba(255,255,255,0.3)';
          ctx.setLineDash([5, 5]);
          ctx.beginPath();
          ctx.moveTo(startX, centerY + amplitude + 30);
          ctx.lineTo(startX + wlPx, centerY + amplitude + 30);
          ctx.stroke();
          ctx.setLineDash([]);

          drawText(ctx, `λ = ${wavelength.toFixed(2)} m`, Vec2.from(startX + wlPx / 2, centerY + amplitude + 50), 'rgba(255,255,255,0.6)', 12);
        }

        ctx.restore();
      },
    };
    return sim;
  }, [frequency, amplitude, wavelength]);

  const sliders: SliderConfig[] = [
    { label: 'Frequency', value: frequency, min: 100, max: 1000, step: 10, unit: 'Hz', onChange: setFrequency },
    { label: 'Amplitude', value: amplitude, min: 10, max: 100, step: 5, unit: 'px', onChange: setAmplitude },
  ];

  return (
    <div className="space-y-4">
      <PhysicsCanvas
        createSimulation={createSim}
        aspectRatio={2}
        sliders={sliders}
      />
      <FormulaVisualizer
        formula="v = fλ"
        variables={[
          { symbol: 'v', value: 343, unit: 'm/s' },
          { symbol: 'f', value: frequency, unit: 'Hz' },
          { symbol: 'λ', value: wavelength, unit: 'm' },
        ]}
      />
    </div>
  );
}
