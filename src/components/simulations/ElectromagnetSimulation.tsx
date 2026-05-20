import { useState, useCallback } from 'react';
import PhysicsCanvas from '../simulation/PhysicsCanvas';
import FormulaVisualizer from '../simulation/FormulaVisualizer';
import type { SimulationFactory, SimulationInstance, SimulationConfig, SliderConfig } from '../../simulation/types';
import { drawGrid } from '../../simulation/physics';

export default function ElectromagnetSimulation() {
  const [current, setCurrent] = useState(5);
  const [coils, setCoils] = useState(10);
  const [coreType, setCoreType] = useState<'air' | 'iron'>('iron');

  const strength = current * coils * (coreType === 'iron' ? 100 : 1);
  const fieldStrength = (strength / 100).toFixed(1);

  const createSim: SimulationFactory = useCallback(() => {
    let time = 0;
    const sim: SimulationInstance = {
      init: () => { time = 0; },
      update: (state) => { time += state.dt; },
      draw: (ctx: CanvasRenderingContext2D, cfg: SimulationConfig) => {
        const w = cfg.width;
        const h = cfg.height;
        ctx.clearRect(0, 0, w, h);
        drawGrid(ctx, w, h, 40, 'rgba(255,255,255,0.03)');

        const cx = w / 2;
        const cy = h / 2;
        const coilW = 160;
        const coilH = 100;

        // Core
        ctx.save();
        ctx.fillStyle = coreType === 'iron' ? '#78716c' : 'rgba(255,255,255,0.05)';
        ctx.fillRect(cx - coilW / 2, cy - 15, coilW, 30);
        ctx.strokeStyle = '#a8a29e';
        ctx.lineWidth = 1;
        ctx.strokeRect(cx - coilW / 2, cy - 15, coilW, 30);
        ctx.restore();

        // Coils (wire wrapping)
        ctx.save();
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        const coilSpacing = coilW / (coils + 1);
        for (let i = 1; i <= coils; i++) {
          const x = cx - coilW / 2 + i * coilSpacing;
          // Top wire
          ctx.beginPath();
          ctx.arc(x, cy - 15, 6, 0, Math.PI, true);
          ctx.stroke();
          // Bottom wire
          ctx.beginPath();
          ctx.arc(x, cy + 15, 6, 0, Math.PI, false);
          ctx.stroke();
        }

        // Connecting wires
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx - coilW / 2, cy - 15);
        ctx.lineTo(cx - coilW / 2 - 30, cy - 15);
        ctx.lineTo(cx - coilW / 2 - 30, cy + 60);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx + coilW / 2, cy - 15);
        ctx.lineTo(cx + coilW / 2 + 30, cy - 15);
        ctx.lineTo(cx + coilW / 2 + 30, cy + 60);
        ctx.stroke();

        // Battery
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(cx - 20, cy + 55, 40, 20);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 10px Inter, system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('🔋', cx, cy + 69);
        ctx.restore();

        // Magnetic field lines
        ctx.save();
        ctx.globalAlpha = 0.3 + Math.min(current / 20, 0.5);
        const fieldColor = '#a78bfa';
        ctx.strokeStyle = fieldColor;
        ctx.lineWidth = 1.5;

        for (let i = 0; i < 5; i++) {
          const offset = (i - 2) * 18;
          ctx.beginPath();
          ctx.moveTo(cx + coilW / 2 + 10, cy + offset);
          ctx.bezierCurveTo(
            cx + coilW / 2 + 80, cy + offset - 30,
            cx + coilW / 2 + 80, cy + offset + 30,
            cx + coilW / 2 + 10, cy + offset + 60
          );
          ctx.stroke();
        }
        for (let i = 0; i < 5; i++) {
          const offset = (i - 2) * 18;
          ctx.beginPath();
          ctx.moveTo(cx - coilW / 2 - 10, cy + offset);
          ctx.bezierCurveTo(
            cx - coilW / 2 - 80, cy + offset - 30,
            cx - coilW / 2 - 80, cy + offset + 30,
            cx - coilW / 2 - 10, cy + offset + 60
          );
          ctx.stroke();
        }

        // Arrows on field lines
        ctx.fillStyle = fieldColor;
        const arrowTime = (time * 2) % 1;
        for (let i = 0; i < 3; i++) {
          const t = (i / 3 + arrowTime) % 1;
          const ax = cx + coilW / 2 + 10 + t * 70;
          const ay = cy - 20 + t * 40;
          drawSmallArrow(ctx, ax, ay, Math.PI / 4);
        }
        ctx.restore();

        // Field direction label
        ctx.save();
        ctx.fillStyle = '#a78bfa';
        ctx.font = 'bold 12px Inter, system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('N ← → S', cx, cy - coilH / 2 - 10);
        ctx.fillText(`Field: ${fieldStrength} mT`, cx, h - 20);
        ctx.restore();
      },
      reset: () => {},
      destroy: () => {},
    };
    return sim;
  }, [current, coils, coreType, fieldStrength]);

  const sliders: SliderConfig[] = [
    { label: 'Current', min: 0, max: 20, step: 0.5, value: current, onChange: setCurrent, unit: 'A', color: '#f59e0b' },
    { label: 'Coils', min: 1, max: 30, step: 1, value: coils, onChange: setCoils, color: '#a78bfa' },
  ];

  return (
    <div className="space-y-4">
      <PhysicsCanvas createSimulation={createSim} aspectRatio={16 / 10} sliders={sliders} />
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setCoreType('air')}
          className={`px-3 py-1 rounded text-sm ${coreType === 'air' ? 'bg-purple-600 text-white' : 'bg-white/10 text-white/60'}`}
        >Air Core</button>
        <button
          onClick={() => setCoreType('iron')}
          className={`px-3 py-1 rounded text-sm ${coreType === 'iron' ? 'bg-purple-600 text-white' : 'bg-white/10 text-white/60'}`}
        >Iron Core</button>
      </div>
      <FormulaVisualizer
        formula="B = μ₀NI/L"
        variables={[
          { symbol: 'N', value: coils, active: true },
          { symbol: 'I', value: current, unit: 'A', active: true },
          { symbol: 'μᵣ', value: coreType === 'iron' ? '100' : '1' },
        ]}
        result={{ label: 'Field Strength', value: fieldStrength, unit: 'mT' }}
      />
    </div>
  );
}

function drawSmallArrow(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number) {
  const s = 5;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(s, 0);
  ctx.lineTo(-s, -s * 0.6);
  ctx.lineTo(-s, s * 0.6);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
