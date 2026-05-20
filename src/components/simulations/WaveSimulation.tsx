import { useState, useCallback } from 'react';
import PhysicsCanvas from '../simulation/PhysicsCanvas';
import FormulaVisualizer from '../simulation/FormulaVisualizer';
import type { SimulationFactory, SimulationInstance, SimulationState, SimulationConfig, SliderConfig } from '../../simulation/types';
import { Vec2, drawGrid, drawText } from '../../simulation/physics';

export default function WaveSimulation() {
  const [wavelength, setWavelength] = useState(200);
  const [amplitude, setAmplitude] = useState(50);
  const [frequency, setFrequency] = useState(1);
  const [showSuperposition, setShowSuperposition] = useState(false);

  const waveSpeed = wavelength * frequency;

  const createSim: SimulationFactory = useCallback((_ctx, _config) => {
    let localElapsed = 0;

    const sim: SimulationInstance = {
      init: () => { localElapsed = 0; },
      update: (state: SimulationState) => {
        localElapsed += state.dt;
      },
      draw: (ctx: CanvasRenderingContext2D, cfg: SimulationConfig) => {
        const w = cfg.width;
        const h = cfg.height;
        ctx.clearRect(0, 0, w, h);
        drawGrid(ctx, w, h, 40, 'rgba(255,255,255,0.03)');

        const centerY = h / 2;
        const margin = 40;
        const drawW = w - margin * 2;

        // Equilibrium line
        ctx.save();
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(margin, centerY);
        ctx.lineTo(w - margin, centerY);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        const k = (2 * Math.PI) / wavelength;
        const omega = 2 * Math.PI * frequency;

        // Wave 1
        ctx.save();
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let px = 0; px <= drawW; px += 2) {
          const x = margin + px;
          const y = centerY - amplitude * Math.sin(k * px - omega * localElapsed);
          px === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.restore();

        // Superposition with second wave
        if (showSuperposition) {
          const k2 = (2 * Math.PI) / (wavelength * 0.7);
          const omega2 = 2 * Math.PI * frequency * 1.3;

          // Wave 2 (dimmer)
          ctx.save();
          ctx.strokeStyle = 'rgba(236,72,153,0.4)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          for (let px = 0; px <= drawW; px += 2) {
            const x = margin + px;
            const y = centerY - (amplitude * 0.7) * Math.sin(k2 * px - omega2 * localElapsed);
            px === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.stroke();
          ctx.restore();

          // Resultant wave
          ctx.save();
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          for (let px = 0; px <= drawW; px += 2) {
            const x = margin + px;
            const y1 = amplitude * Math.sin(k * px - omega * localElapsed);
            const y2 = (amplitude * 0.7) * Math.sin(k2 * px - omega2 * localElapsed);
            const y = centerY - (y1 + y2);
            px === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.stroke();
          ctx.restore();
        }

        // Wavelength indicator
        const wlEnd = margin + wavelength;
        if (wlEnd < w - margin) {
          ctx.save();
          ctx.strokeStyle = 'rgba(167,139,250,0.5)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(margin, centerY + amplitude + 20);
          ctx.lineTo(wlEnd, centerY + amplitude + 20);
          ctx.stroke();

          // Ticks
          ctx.beginPath();
          ctx.moveTo(margin, centerY + amplitude + 15);
          ctx.lineTo(margin, centerY + amplitude + 25);
          ctx.moveTo(wlEnd, centerY + amplitude + 15);
          ctx.lineTo(wlEnd, centerY + amplitude + 25);
          ctx.stroke();

          drawText(ctx, 'λ', Vec2.from(margin + wavelength / 2, centerY + amplitude + 34), '#a78bfa', 12);
          ctx.restore();
        }

        // Amplitude indicator
        ctx.save();
        ctx.strokeStyle = 'rgba(6,182,212,0.4)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(margin + 20, centerY);
        ctx.lineTo(margin + 20, centerY - amplitude);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(margin + 15, centerY - amplitude);
        ctx.lineTo(margin + 25, centerY - amplitude);
        ctx.stroke();
        drawText(ctx, 'A', Vec2.from(margin + 35, centerY - amplitude / 2), '#06b6d4', 11);
        ctx.restore();

        // Labels
        drawText(ctx, showSuperposition ? 'Superposition' : 'Transverse Wave', Vec2.from(w / 2, 20), '#999', 11);
      },
      reset: () => { localElapsed = 0; },
      destroy: () => {},
    };

    return sim;
  }, [wavelength, amplitude, frequency, showSuperposition]);

  const sliders: SliderConfig[] = [
    { label: 'Wavelength', min: 80, max: 400, step: 10, value: wavelength, onChange: setWavelength, unit: 'px', color: '#a78bfa' },
    { label: 'Amplitude', min: 10, max: 100, step: 5, value: amplitude, onChange: setAmplitude, unit: 'px', color: '#06b6d4' },
    { label: 'Frequency', min: 0.2, max: 4, step: 0.1, value: frequency, onChange: setFrequency, unit: 'Hz', color: '#ec4899' },
  ];

  return (
    <div className="space-y-4">
      <PhysicsCanvas createSimulation={createSim} aspectRatio={16 / 10} sliders={sliders} />

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            checked={showSuperposition}
            onChange={(e) => setShowSuperposition(e.target.checked)}
            className="rounded accent-brand-cyan"
          />
          Show superposition (two waves)
        </label>
      </div>

      <FormulaVisualizer
        formula="v = fλ"
        variables={[
          { symbol: 'f', value: frequency.toFixed(1), unit: 'Hz', active: true },
          { symbol: 'λ', value: wavelength, unit: 'px', active: true },
          { symbol: 'A', value: amplitude, unit: 'px' },
        ]}
        result={{ label: 'Speed v', value: waveSpeed.toFixed(0), unit: 'px/s' }}
      />
    </div>
  );
}

