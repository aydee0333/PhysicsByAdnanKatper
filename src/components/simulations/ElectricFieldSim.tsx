import { useState, useCallback } from 'react';
import PhysicsCanvas from '../simulation/PhysicsCanvas';
import FormulaVisualizer from '../simulation/FormulaVisualizer';
import type { SimulationFactory, SimulationInstance, SimulationConfig, SliderConfig } from '../../simulation/types';
import { Vec2, drawGrid, drawText } from '../../simulation/physics';

export default function ElectricFieldSim() {
  const [charge1, setCharge1] = useState(2);
  const [charge2, setCharge2] = useState(-3);
  const [distance, setDistance] = useState(200);

  const k = 9e9;
  const force = k * Math.abs(charge1 * charge2) / (distance * 0.01) ** 2;

  const createSim: SimulationFactory = useCallback((_factoryCtx, _factoryConfig) => {
    const sim: SimulationInstance = {
      init: () => {},
      update: () => {},
      reset: () => {},
      destroy: () => {},
      draw: (ctx: CanvasRenderingContext2D, cfg: SimulationConfig) => {
        const w = cfg.width;
        const h = cfg.height;
        ctx.clearRect(0, 0, w, h);
        drawGrid(ctx, w, h, 40, 'rgba(255,255,255,0.03)');

        const centerY = h / 2;
        const q1X = w / 2 - distance / 2;
        const q2X = w / 2 + distance / 2;
        const chargeRadius = 20;

        // Draw electric field lines
        const fieldLines = 12;
        for (let i = 0; i < fieldLines; i++) {
          const angle = (i / fieldLines) * Math.PI * 2;
          const startX = q1X + chargeRadius * Math.cos(angle);
          const startY = centerY + chargeRadius * Math.sin(angle);

          ctx.strokeStyle = charge1 > 0 ? 'rgba(6,182,212,0.3)' : 'rgba(236,72,153,0.3)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(startX, startY);

          const steps = 50;
          let x = startX;
          let y = startY;
          for (let s = 0; s < steps; s++) {
            const dx1 = x - q1X;
            const dy1 = y - centerY;
            const r1 = Math.sqrt(dx1 * dx1 + dy1 * dy1) || 1;
            const e1x = k * charge1 * dx1 / (r1 * r1 * r1);
            const e1y = k * charge1 * dy1 / (r1 * r1 * r1);

            const dx2 = x - q2X;
            const dy2 = y - centerY;
            const r2 = Math.sqrt(dx2 * dx2 + dy2 * dy2) || 1;
            const e2x = k * charge2 * dx2 / (r2 * r2 * r2);
            const e2y = k * charge2 * dy2 / (r2 * r2 * r2);

            const ex = e1x + e2x;
            const ey = e1y + e2y;
            const eMag = Math.sqrt(ex * ex + ey * ey) || 1;

            x += (ex / eMag) * 8;
            y += (ey / eMag) * 8;

            if (x < 20 || x > w - 20 || y < 20 || y > h - 20) break;
            ctx.lineTo(x, y);
          }
          ctx.stroke();
        }

        // Draw charge 1
        ctx.fillStyle = charge1 > 0 ? '#06b6d4' : '#ec4899';
        ctx.beginPath();
        ctx.arc(q1X, centerY, chargeRadius, 0, Math.PI * 2);
        ctx.fill();
        drawText(ctx, charge1 > 0 ? '+' : '-', Vec2.from(q1X, centerY), 'white', 18);

        // Draw charge 2
        ctx.fillStyle = charge2 > 0 ? '#06b6d4' : '#ec4899';
        ctx.beginPath();
        ctx.arc(q2X, centerY, chargeRadius, 0, Math.PI * 2);
        ctx.fill();
        drawText(ctx, charge2 > 0 ? '+' : '-', Vec2.from(q2X, centerY), 'white', 18);

        // Draw distance line
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(q1X, centerY + chargeRadius + 20);
        ctx.lineTo(q2X, centerY + chargeRadius + 20);
        ctx.stroke();
        ctx.setLineDash([]);

        drawText(ctx, `d = ${(distance * 0.01).toFixed(2)} m`, Vec2.from(w / 2, centerY + chargeRadius + 40), 'rgba(255,255,255,0.6)', 12);

        // Draw force arrows
        const forceScale = Math.min(50, force / 1e9);
        if (charge1 * charge2 < 0) {
          ctx.strokeStyle = '#14b8a6';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(q1X + chargeRadius + 5, centerY);
          ctx.lineTo(q1X + chargeRadius + 5 + forceScale, centerY);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(q2X - chargeRadius - 5, centerY);
          ctx.lineTo(q2X - chargeRadius - 5 - forceScale, centerY);
          ctx.stroke();
          drawText(ctx, 'Attractive', Vec2.from(w / 2, 30), '#14b8a6', 14);
        } else {
          ctx.strokeStyle = '#f43f5e';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(q1X - chargeRadius - 5, centerY);
          ctx.lineTo(q1X - chargeRadius - 5 - forceScale, centerY);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(q2X + chargeRadius + 5, centerY);
          ctx.lineTo(q2X + chargeRadius + 5 + forceScale, centerY);
          ctx.stroke();
          drawText(ctx, 'Repulsive', Vec2.from(w / 2, 30), '#f43f5e', 14);
        }
      },
    };
    return sim;
  }, [charge1, charge2, distance, force]);

  const sliders: SliderConfig[] = [
    { label: 'Charge 1', value: charge1, min: -5, max: 5, step: 0.5, unit: 'μC', onChange: setCharge1 },
    { label: 'Charge 2', value: charge2, min: -5, max: 5, step: 0.5, unit: 'μC', onChange: setCharge2 },
    { label: 'Distance', value: distance, min: 50, max: 400, step: 10, unit: 'px', onChange: setDistance },
  ];

  return (
    <div className="space-y-4">
      <PhysicsCanvas
        createSimulation={createSim}
        aspectRatio={16 / 10}
        sliders={sliders}
      />
      <FormulaVisualizer
        formula="F = kq₁q₂/r²"
        variables={[
          { symbol: 'F', value: force, unit: 'N' },
          { symbol: 'k', value: 9e9, unit: 'Nm²/C²' },
          { symbol: 'q₁', value: charge1 * 1e-6, unit: 'C' },
          { symbol: 'q₂', value: charge2 * 1e-6, unit: 'C' },
          { symbol: 'r', value: distance * 0.01, unit: 'm' },
        ]}
      />
    </div>
  );
}
