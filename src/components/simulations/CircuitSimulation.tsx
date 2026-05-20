import { useState, useCallback } from 'react';
import PhysicsCanvas from '../simulation/PhysicsCanvas';
import FormulaVisualizer from '../simulation/FormulaVisualizer';
import type { SimulationFactory, SimulationInstance, SimulationState, SimulationConfig, SliderConfig } from '../../simulation/types';
import { Vec2, drawGrid, drawText } from '../../simulation/physics';

export default function CircuitSimulation() {
  const [voltage, setVoltage] = useState(12);
  const [resistance, setResistance] = useState(4);

  const current = voltage / resistance;
  const power = voltage * current;

  const createSim: SimulationFactory = useCallback((_factoryCtx, _factoryConfig) => {
    let dotPhase = 0;

    const sim: SimulationInstance = {
      init: () => { dotPhase = 0; },
      update: (state: SimulationState) => {
        dotPhase += current * state.dt * 0.5;
      },
      draw: (ctx: CanvasRenderingContext2D, cfg: SimulationConfig) => {
        const w = cfg.width;
        const h = cfg.height;
        ctx.clearRect(0, 0, w, h);
        drawGrid(ctx, w, h, 40, 'rgba(255,255,255,0.03)');

        const cx = w / 2;
        const cy = h / 2;
        const r = Math.min(w, h) * 0.3;

        // Circuit path coordinates
        const top = { x: cx, y: cy - r };
        const bottom = { x: cx, y: cy + r };
        const left = { x: cx - r * 1.2, y: cy };
        const right = { x: cx + r * 1.2, y: cy };

        // Wires
        ctx.save();
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(right.x, right.y);
        ctx.lineTo(cx + 30, top.y);
        ctx.moveTo(cx - 30, top.y);
        ctx.lineTo(left.x, left.y);
        ctx.moveTo(left.x, left.y);
        ctx.lineTo(bottom.x - 30, bottom.y);
        ctx.moveTo(bottom.x + 30, bottom.y);
        ctx.lineTo(right.x, right.y);
        ctx.moveTo(left.x, left.y);
        ctx.lineTo(left.x, top.y + 20);
        ctx.moveTo(left.x, bottom.y - 20);
        ctx.lineTo(left.x, left.y);
        ctx.moveTo(right.x, right.y);
        ctx.lineTo(right.x, top.y + 20);
        ctx.moveTo(right.x, bottom.y - 20);
        ctx.lineTo(right.x, right.y);
        ctx.stroke();
        ctx.restore();

        // Battery (top center)
        const batW = 50;
        const batH = 30;
        ctx.save();
        ctx.fillStyle = 'rgba(245,158,11,0.2)';
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(cx - batW / 2, top.y - batH / 2, batW, batH, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 14px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('+', cx - 15, top.y);
        ctx.fillText('−', cx + 15, top.y);

        drawText(ctx, `${voltage}V`, Vec2.from(cx, top.y - batH / 2 - 12), '#f59e0b', 12);
        ctx.restore();

        // Resistor (bottom center)
        const resW = 60;
        const resH = 24;
        ctx.save();
        ctx.fillStyle = 'rgba(236,72,153,0.2)';
        ctx.strokeStyle = '#ec4899';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(cx - resW / 2, bottom.y - resH / 2, resW, resH, 4);
        ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = '#ec4899';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        const zigCount = 5;
        const zigW = resW / zigCount;
        for (let i = 0; i < zigCount; i++) {
          const x1 = cx - resW / 2 + i * zigW;
          const x2 = x1 + zigW / 2;
          const x3 = x1 + zigW;
          const y1 = bottom.y - 6;
          const y2 = bottom.y + 6;
          ctx.moveTo(x1, bottom.y);
          ctx.lineTo(x2, i % 2 === 0 ? y1 : y2);
          ctx.lineTo(x3, bottom.y);
        }
        ctx.stroke();

        drawText(ctx, `${resistance}Ω`, Vec2.from(cx, bottom.y + resH / 2 + 14), '#ec4899', 12);
        ctx.restore();

        // Animated current dots
        const dotSpacing = 30;
        const dotRadius = 3;
        ctx.save();
        ctx.fillStyle = '#06b6d4';

        const totalPath = 2 * (r * 2 + r * 2.4);
        const numDots = Math.floor(totalPath / dotSpacing);

        for (let i = 0; i < numDots; i++) {
          const t = ((i / numDots + dotPhase) % 1 + 1) % 1;
          const pathT = t * totalPath;

          let px: number, py: number;
          const segLen = [r * 2.4, r * 2, r * 2.4, r * 2];
          let d = pathT;

          if (d < segLen[0]) {
            const st = d / segLen[0];
            px = cx - 30 + st * (right.x - cx + 30);
            py = top.y;
          } else if (d < segLen[0] + segLen[1]) {
            const st = (d - segLen[0]) / segLen[1];
            px = right.x;
            py = top.y + 20 + st * (bottom.y - 20 - top.y - 20);
          } else if (d < segLen[0] + segLen[1] + segLen[2]) {
            const st = (d - segLen[0] - segLen[1]) / segLen[2];
            px = bottom.x + 30 - st * (bottom.x + 30 - left.x);
            py = bottom.y;
          } else {
            const st = (d - segLen[0] - segLen[1] - segLen[2]) / segLen[3];
            px = left.x;
            py = bottom.y - 20 - st * (bottom.y - 20 - top.y - 20);
          }

          ctx.beginPath();
          ctx.arc(px, py, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        // Current label
        drawText(ctx, `I = ${current.toFixed(2)}A`, Vec2.from(cx + r * 0.6, cy - 15), '#06b6d4', 13);
        // Power label
        drawText(ctx, `P = ${power.toFixed(1)}W`, Vec2.from(cx - r * 0.6, cy + 15), '#a78bfa', 12);
      },
      reset: () => { dotPhase = 0; },
      destroy: () => {},
    };

    return sim;
  }, [voltage, resistance, current, power]);

  const sliders: SliderConfig[] = [
    { label: 'Voltage', min: 1, max: 24, step: 0.5, value: voltage, onChange: setVoltage, unit: 'V', color: '#f59e0b' },
    { label: 'Resistance', min: 1, max: 20, step: 0.5, value: resistance, onChange: setResistance, unit: 'Ω', color: '#ec4899' },
  ];

  return (
    <div className="space-y-4">
      <PhysicsCanvas createSimulation={createSim} aspectRatio={16 / 10} sliders={sliders} />
      <FormulaVisualizer
        formula="V = IR"
        variables={[
          { symbol: 'V', value: voltage, unit: 'V', active: true },
          { symbol: 'R', value: resistance, unit: 'Ω', active: true },
          { symbol: 'I', value: current.toFixed(2), unit: 'A' },
        ]}
        result={{ label: 'Power P', value: power.toFixed(1), unit: 'W' }}
      />
    </div>
  );
}
