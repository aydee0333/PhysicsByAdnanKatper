import { useState, useCallback } from 'react';
import PhysicsCanvas from '../simulation/PhysicsCanvas';
import FormulaVisualizer from '../simulation/FormulaVisualizer';
import type { SimulationFactory, SimulationInstance, SimulationConfig, SliderConfig } from '../../simulation/types';
import { drawGrid } from '../../simulation/physics';

const K = 9e9;

export default function ChargeSimulation() {
  const [charge1, setCharge1] = useState(10);
  const [charge2, setCharge2] = useState(10);
  const [distance, setDistance] = useState(2);

  const force = (K * charge1 * 1e-6 * charge2 * 1e-6) / (distance * distance);

  const createSim: SimulationFactory = useCallback(() => {
    const sim: SimulationInstance = {
      init: () => {},
      update: () => {},
      draw: (ctx: CanvasRenderingContext2D, cfg: SimulationConfig) => {
        const w = cfg.width;
        const h = cfg.height;
        ctx.clearRect(0, 0, w, h);
        drawGrid(ctx, w, h, 40, 'rgba(255,255,255,0.03)');

        const cx = w / 2;
        const cy = h / 2;
        const scale = Math.min(w, h) * 0.12;
        const q1x = cx - distance * scale * 0.5;
        const q2x = cx + distance * scale * 0.5;
        const r1 = 18 + charge1 * 0.5;
        const r2 = 18 + charge2 * 0.5;

        // Electric field lines
        ctx.save();
        ctx.globalAlpha = 0.15;
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          const startX = q1x + Math.cos(angle) * (r1 + 4);
          const startY = cy + Math.sin(angle) * (r1 + 4);
          ctx.strokeStyle = charge1 > 0 ? '#ef4444' : '#3b82f6';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          const cpX = (q1x + q2x) / 2;
          const cpY = cy + Math.sin(angle) * 40;
          ctx.quadraticCurveTo(cpX, cpY, q2x - Math.cos(angle) * (r2 + 4), cy + Math.sin(angle) * (r2 + 4));
          ctx.stroke();
        }
        ctx.restore();

        // Charge 1
        ctx.save();
        const grad1 = ctx.createRadialGradient(q1x, cy, 0, q1x, cy, r1);
        grad1.addColorStop(0, charge1 > 0 ? '#fca5a5' : '#93c5fd');
        grad1.addColorStop(1, charge1 > 0 ? '#ef4444' : '#3b82f6');
        ctx.fillStyle = grad1;
        ctx.beginPath();
        ctx.arc(q1x, cy, r1, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 16px Inter, system-ui';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(charge1 > 0 ? '+' : '−', q1x, cy);
        ctx.restore();

        // Charge 2
        ctx.save();
        const grad2 = ctx.createRadialGradient(q2x, cy, 0, q2x, cy, r2);
        grad2.addColorStop(0, charge2 > 0 ? '#fca5a5' : '#93c5fd');
        grad2.addColorStop(1, charge2 > 0 ? '#ef4444' : '#3b82f6');
        ctx.fillStyle = grad2;
        ctx.beginPath();
        ctx.arc(q2x, cy, r2, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 16px Inter, system-ui';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(charge2 > 0 ? '+' : '−', q2x, cy);
        ctx.restore();

        // Force arrows
        const forceLen = Math.min(force * 50, 80);
        const sameSign = (charge1 > 0 && charge2 > 0) || (charge1 < 0 && charge2 < 0);

        ctx.save();
        ctx.strokeStyle = '#f59e0b';
        ctx.fillStyle = '#f59e0b';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';

        // Force on q1
        const f1Dir = sameSign ? -1 : 1;
        drawArrowLine(ctx, q1x + f1Dir * (r1 + 5), cy, q1x + f1Dir * (r1 + 5 + forceLen), cy, 8);

        // Force on q2
        const f2Dir = sameSign ? 1 : -1;
        drawArrowLine(ctx, q2x + f2Dir * (r2 + 5), cy, q2x + f2Dir * (r2 + 5 + forceLen), cy, 8);
        ctx.restore();

        // Labels
        ctx.save();
        ctx.fillStyle = '#fff';
        ctx.font = '12px Inter, system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(`q₁ = ${charge1} μC`, q1x, cy + r1 + 20);
        ctx.fillText(`q₂ = ${charge2} μC`, q2x, cy + r2 + 20);
        ctx.fillText(`d = ${distance} m`, cx, cy + 50);

        const forceType = sameSign ? 'Repulsive' : 'Attractive';
        const forceColor = sameSign ? '#ef4444' : '#22c55e';
        ctx.fillStyle = forceColor;
        ctx.font = 'bold 13px Inter, system-ui';
        ctx.fillText(`${forceType} Force: ${force.toFixed(2)} N`, cx, h - 30);
        ctx.restore();
      },
      reset: () => {},
      destroy: () => {},
    };
    return sim;
  }, [charge1, charge2, distance, force]);

  const sliders: SliderConfig[] = [
    { label: 'Charge q₁', min: -50, max: 50, step: 1, value: charge1, onChange: setCharge1, unit: 'μC', color: '#ef4444' },
    { label: 'Charge q₂', min: -50, max: 50, step: 1, value: charge2, onChange: setCharge2, unit: 'μC', color: '#3b82f6' },
    { label: 'Distance', min: 0.5, max: 10, step: 0.1, value: distance, onChange: setDistance, unit: 'm', color: '#f59e0b' },
  ];

  return (
    <div className="space-y-4">
      <PhysicsCanvas createSimulation={createSim} aspectRatio={16 / 10} sliders={sliders} />
      <FormulaVisualizer
        formula="F = kq₁q₂/r²"
        variables={[
          { symbol: 'k', value: '9×10⁹', unit: 'Nm²/C²' },
          { symbol: 'q₁', value: charge1, unit: 'μC', active: true },
          { symbol: 'q₂', value: charge2, unit: 'μC', active: true },
          { symbol: 'r', value: distance, unit: 'm', active: true },
        ]}
        result={{ label: 'Force', value: force.toFixed(2), unit: 'N' }}
      />
    </div>
  );
}

function drawArrowLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, headLen: number) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2 - Math.cos(angle) * headLen, y2 - Math.sin(angle) * headLen);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - headLen * Math.cos(angle - Math.PI / 6), y2 - headLen * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(x2 - headLen * Math.cos(angle + Math.PI / 6), y2 - headLen * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();
}
