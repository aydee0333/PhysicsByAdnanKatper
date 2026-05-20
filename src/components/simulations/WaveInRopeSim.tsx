import { useState, useCallback } from 'react';
import PhysicsCanvas from '../simulation/PhysicsCanvas';
import FormulaVisualizer from '../simulation/FormulaVisualizer';
import type { SimulationFactory, SimulationInstance, SimulationState, SimulationConfig, SliderConfig } from '../../simulation/types';
import { Vec2, drawGrid, drawText } from '../../simulation/physics';

const NUM_DOTS = 45;
const DOT_RADIUS = 3.5;

export default function WaveInRopeSim() {
  const [wavelength, setWavelength] = useState(200);
  const [amplitude, setAmplitude] = useState(50);
  const [speed, setSpeed] = useState(1.0);

  const frequency = speed > 0 ? speed / wavelength * 100 : 0;
  const waveSpeed = frequency * wavelength;

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
        const margin = 50;
        const drawW = w - margin * 2;
        const spacing = drawW / (NUM_DOTS - 1);

        const k = (2 * Math.PI) / wavelength;
        const omega = 2 * Math.PI * frequency;

        // Equilibrium line
        ctx.save();
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(margin - 10, centerY);
        ctx.lineTo(w - margin + 10, centerY);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        // Draw dots (particles)
        for (let i = 0; i < NUM_DOTS; i++) {
          const baseX = margin + i * spacing;
          const yOffset = amplitude * Math.sin(k * i * spacing - omega * localElapsed);
          const dotY = centerY - yOffset;

          // Motion trail (vertical line showing range of motion)
          ctx.save();
          ctx.strokeStyle = 'rgba(6,182,212,0.12)';
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 2]);
          ctx.beginPath();
          ctx.moveTo(baseX, centerY - amplitude);
          ctx.lineTo(baseX, centerY + amplitude);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.restore();

          // Highlighted particle (index 10) — shows no horizontal movement
          if (i === 10) {
            // Vertical arrow showing up-down only
            ctx.save();
            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(baseX, centerY - amplitude - 8);
            ctx.lineTo(baseX, centerY + amplitude + 8);
            ctx.stroke();
            // Arrow heads
            ctx.fillStyle = '#f59e0b';
            ctx.beginPath();
            ctx.moveTo(baseX, centerY - amplitude - 12);
            ctx.lineTo(baseX - 4, centerY - amplitude - 4);
            ctx.lineTo(baseX + 4, centerY - amplitude - 4);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(baseX, centerY + amplitude + 12);
            ctx.lineTo(baseX - 4, centerY + amplitude + 4);
            ctx.lineTo(baseX + 4, centerY + amplitude + 4);
            ctx.fill();

            // Label
            drawText(ctx, '↕ No mass transfer', Vec2.from(baseX, centerY - amplitude - 22), '#f59e0b', 10);
            ctx.restore();

            // Glow dot
            ctx.save();
            ctx.shadowColor = '#f59e0b';
            ctx.shadowBlur = 12;
            ctx.fillStyle = '#f59e0b';
            ctx.beginPath();
            ctx.arc(baseX, dotY, DOT_RADIUS + 1.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.restore();
          } else {
            // Normal dot
            ctx.save();
            ctx.fillStyle = '#06b6d4';
            ctx.shadowColor = '#06b6d4';
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.arc(baseX, dotY, DOT_RADIUS, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.restore();
          }
        }

        // Wave shape line (dim, connecting dots)
        ctx.save();
        ctx.strokeStyle = 'rgba(6,182,212,0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < NUM_DOTS; i++) {
          const baseX = margin + i * spacing;
          const yOffset = amplitude * Math.sin(k * i * spacing - omega * localElapsed);
          const dotY = centerY - yOffset;
          i === 0 ? ctx.moveTo(baseX, dotY) : ctx.lineTo(baseX, dotY);
        }
        ctx.stroke();
        ctx.restore();

        // Energy arrow along the top
        ctx.save();
        const arrowY = 30;
        const arrowStartX = margin + 20;
        const arrowEndX = w - margin - 20;
        ctx.strokeStyle = '#ec4899';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(arrowStartX, arrowY);
        ctx.lineTo(arrowEndX, arrowY);
        ctx.stroke();
        // Arrow head
        ctx.fillStyle = '#ec4899';
        ctx.beginPath();
        ctx.moveTo(arrowEndX + 8, arrowY);
        ctx.lineTo(arrowEndX - 4, arrowY - 5);
        ctx.lineTo(arrowEndX - 4, arrowY + 5);
        ctx.fill();
        drawText(ctx, 'Energy transfer direction →', Vec2.from((arrowStartX + arrowEndX) / 2, arrowY - 12), '#ec4899', 11);
        ctx.restore();

        // Wavelength markers below the wave
        const wlEnd = margin + wavelength;
        if (wlEnd < w - margin) {
          const markerY = centerY + amplitude + 35;
          ctx.save();
          ctx.strokeStyle = '#a78bfa';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(margin, markerY);
          ctx.lineTo(wlEnd, markerY);
          ctx.stroke();
          // Ticks
          ctx.beginPath();
          ctx.moveTo(margin, markerY - 6);
          ctx.lineTo(margin, markerY + 6);
          ctx.moveTo(wlEnd, markerY - 6);
          ctx.lineTo(wlEnd, markerY + 6);
          ctx.stroke();
          drawText(ctx, 'λ (wavelength)', Vec2.from(margin + wavelength / 2, markerY + 18), '#a78bfa', 11);
          ctx.restore();
        }

        // Title
        drawText(ctx, 'Wave in a Rope — Particles move up/down, wave moves right', Vec2.from(w / 2, h - 18), 'rgba(255,255,255,0.4)', 10);

        // Speed indicator
        ctx.save();
        ctx.fillStyle = 'rgba(255,255,255,0.04)';
        ctx.beginPath();
        ctx.roundRect(w - 170, h - 65, 155, 40, 6);
        ctx.fill();
        drawText(ctx, `Wave speed: ${speed.toFixed(1)} m/s`, Vec2.from(w - 93, h - 45), '#ec4899', 11);
        ctx.restore();
      },
      reset: () => { localElapsed = 0; },
      destroy: () => {},
    };

    return sim;
  }, [wavelength, amplitude, speed, frequency]);

  const sliders: SliderConfig[] = [
    { label: 'Wave Speed', min: 0.1, max: 5.0, step: 0.1, value: speed, onChange: setSpeed, unit: 'm/s', color: '#ec4899' },
    { label: 'Wavelength', min: 100, max: 400, step: 10, value: wavelength, onChange: setWavelength, unit: 'px', color: '#a78bfa' },
    { label: 'Amplitude', min: 10, max: 80, step: 5, value: amplitude, onChange: setAmplitude, unit: 'px', color: '#06b6d4' },
  ];

  return (
    <div className="space-y-4">
      <PhysicsCanvas createSimulation={createSim} aspectRatio={16 / 10} sliders={sliders} />

      <div className="rounded-lg bg-white/[0.03] border border-white/10 p-3 text-xs text-gray-400 leading-relaxed">
        <span className="text-brand-cyan font-medium">Key idea:</span> Each dot represents a particle of the medium.
        Watch how dots only move <span className="text-amber-400">up and down</span> (perpendicular to the rope),
        while the wave pattern travels <span className="text-pink-400">horizontally</span>.
        This proves that <span className="text-white font-medium">waves transfer energy, not matter</span>.
        Set speed very low (0.1–0.3) to see each particle oscillate individually.
      </div>

      <FormulaVisualizer
        formula="v = fλ"
        variables={[
          { symbol: 'f', value: frequency.toFixed(2), unit: 'Hz', active: true },
          { symbol: 'λ', value: wavelength, unit: 'px', active: true },
        ]}
        result={{ label: 'Speed v', value: waveSpeed.toFixed(0), unit: 'px/s' }}
      />
    </div>
  );
}
