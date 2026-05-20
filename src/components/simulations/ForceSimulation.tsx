import { useState, useCallback } from 'react';
import PhysicsCanvas from '../simulation/PhysicsCanvas';
import FormulaVisualizer from '../simulation/FormulaVisualizer';
import type { SimulationFactory, SimulationInstance, SimulationState, SimulationConfig, SliderConfig } from '../../simulation/types';
import { Vec2, drawGrid, drawText } from '../../simulation/physics';

const G = 9.8;

export default function ForceSimulation() {
  const [appliedForce, setAppliedForce] = useState(50);
  const [mass, setMass] = useState(5);
  const [frictionCoeff, setFrictionCoeff] = useState(0.2);

  const weight = mass * G;
  const normal = weight;
  const friction = frictionCoeff * normal;
  const netForce = appliedForce - friction;
  const acceleration = netForce > 0 ? netForce / mass : 0;

  const createSim: SimulationFactory = useCallback((_factoryCtx, config) => {
    let blockX = config.width * 0.3;
    let blockVx = 0;

    const sim: SimulationInstance = {
      init: () => {
        blockX = config.width * 0.3;
        blockVx = 0;
      },
      update: (state: SimulationState) => {
        if (netForce > 0) {
          blockVx += acceleration * state.dt * 30;
          blockX += blockVx * state.dt;
        }
      },
      draw: (ctx: CanvasRenderingContext2D, cfg: SimulationConfig) => {
        const w = cfg.width;
        const h = cfg.height;
        ctx.clearRect(0, 0, w, h);
        drawGrid(ctx, w, h, 40, 'rgba(255,255,255,0.03)');

        if (blockX > w - 80 || blockX < 80) {
          blockX = w * 0.3;
          blockVx = 0;
        }

        const groundY = h * 0.7;
        const blockSize = 40 + mass * 3;
        const blockCenterY = groundY - blockSize / 2;

        // Ground
        ctx.save();
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(40, groundY);
        ctx.lineTo(w - 40, groundY);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.lineWidth = 1;
        for (let x = 40; x < w - 40; x += 15) {
          ctx.beginPath();
          ctx.moveTo(x, groundY);
          ctx.lineTo(x - 8, groundY + 8);
          ctx.stroke();
        }
        ctx.restore();

        // Block
        ctx.save();
        ctx.fillStyle = '#06b6d4';
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(blockX - blockSize / 2, blockCenterY - blockSize / 2, blockSize, blockSize, 4);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px Inter, system-ui';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${mass}kg`, blockX, blockCenterY);
        ctx.restore();

        const origin = Vec2.from(blockX, blockCenterY);

        // Applied force
        if (appliedForce > 0) {
          const fLen = Math.min(appliedForce * 2, 150);
          drawArrowSimple(ctx, origin, Vec2.from(blockX + fLen, blockCenterY), '#06b6d4', 2.5, 8);
          drawText(ctx, `F = ${appliedForce}N`, Vec2.from(blockX + fLen / 2, blockCenterY - 15), '#06b6d4', 11);
        }

        // Friction
        const frictionDisplay = Math.min(friction, appliedForce);
        if (frictionDisplay > 0) {
          const fLen = Math.min(frictionDisplay * 2, 120);
          drawArrowSimple(ctx, origin, Vec2.from(blockX - fLen, blockCenterY), '#ec4899', 2, 7);
          drawText(ctx, `f = ${frictionDisplay.toFixed(1)}N`, Vec2.from(blockX - fLen / 2, blockCenterY - 15), '#ec4899', 10);
        }

        // Weight
        const wLen = Math.min(weight * 1.5, 100);
        drawArrowSimple(ctx, origin, Vec2.from(blockX, blockCenterY + wLen), '#f59e0b', 2, 7);
        drawText(ctx, `W = ${weight.toFixed(0)}N`, Vec2.from(blockX + 20, blockCenterY + wLen / 2), '#f59e0b', 10, 'left');

        // Normal
        const normalTop = Vec2.from(blockX, blockCenterY - blockSize / 2 - wLen);
        drawArrowSimple(ctx, Vec2.from(blockX, blockCenterY - blockSize / 2), normalTop, '#a78bfa', 2, 7);
        drawText(ctx, `N = ${normal.toFixed(0)}N`, Vec2.from(blockX + 20, blockCenterY - blockSize / 2 - wLen / 2), '#a78bfa', 10, 'left');

        // Net force
        if (netForce !== 0) {
          const netColor = netForce > 0 ? '#14b8a6' : '#f87171';
          const netLen = Math.min(Math.abs(netForce) * 2, 100);
          const netDir = netForce > 0 ? 1 : -1;
          const netY = groundY + 40;
          drawArrowSimple(ctx, Vec2.from(blockX, netY), Vec2.from(blockX + netLen * netDir, netY), netColor, 2.5, 8);
          drawText(ctx, `Fnet = ${netForce.toFixed(1)}N`, Vec2.from(blockX + (netLen * netDir) / 2, netY + 18), netColor, 11);
        }

        // Acceleration
        if (acceleration > 0) {
          drawText(ctx, `a = ${acceleration.toFixed(2)} m/s²`, Vec2.from(w / 2, h - 30), '#14b8a6', 13);
        } else {
          drawText(ctx, 'Block at rest (F ≤ friction)', Vec2.from(w / 2, h - 30), '#f87171', 12);
        }
      },
      reset: () => {
        blockVx = 0;
      },
      destroy: () => {},
    };

    return sim;
  }, [appliedForce, mass, frictionCoeff, netForce, acceleration, weight, normal, friction]);

  const sliders: SliderConfig[] = [
    { label: 'Applied F', min: 0, max: 200, step: 5, value: appliedForce, onChange: setAppliedForce, unit: 'N', color: '#06b6d4' },
    { label: 'Mass', min: 1, max: 20, step: 1, value: mass, onChange: setMass, unit: 'kg', color: '#f59e0b' },
    { label: 'Friction μ', min: 0, max: 1, step: 0.05, value: frictionCoeff, onChange: setFrictionCoeff, color: '#ec4899' },
  ];

  return (
    <div className="space-y-4">
      <PhysicsCanvas createSimulation={createSim} aspectRatio={16 / 10} sliders={sliders} />
      <FormulaVisualizer
        formula="F_net = F_applied - f"
        variables={[
          { symbol: 'F', value: appliedForce, unit: 'N', active: true },
          { symbol: 'm', value: mass, unit: 'kg', active: true },
          { symbol: 'μ', value: frictionCoeff.toFixed(2), active: true },
          { symbol: 'f', value: friction.toFixed(1), unit: 'N' },
        ]}
        result={{ label: 'Acceleration', value: acceleration.toFixed(2), unit: 'm/s²' }}
      />
    </div>
  );
}

function drawArrowSimple(ctx: CanvasRenderingContext2D, from: Vec2, to: Vec2, color: string, lineWidth = 2, headLength = 10) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const angle = Math.atan2(dy, dx);

  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';

  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x - Math.cos(angle) * headLength, to.y - Math.sin(angle) * headLength);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(to.x, to.y);
  ctx.lineTo(to.x - headLength * Math.cos(angle - Math.PI / 6), to.y - headLength * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(to.x - headLength * Math.cos(angle + Math.PI / 6), to.y - headLength * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}
