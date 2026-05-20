import { useState, useCallback } from 'react';
import PhysicsCanvas from './PhysicsCanvas';
import type { SimulationFactory, SimulationInstance, SimulationState, SimulationConfig } from '../../simulation/types';
import { Vec2, drawArrow, drawTrail, drawGrid, drawCircle, drawText } from '../../simulation/physics';

interface MotionAnimatorProps {
  /** Path function: given t (0-1), return {x, y} in normalized coords */
  pathFn?: (t: number) => { x: number; y: number };
  /** Show velocity vector */
  showVelocity?: boolean;
  /** Show acceleration vector */
  showAcceleration?: boolean;
  /** Object color */
  color?: string;
  /** Animation speed */
  speed?: number;
  className?: string;
}

export default function MotionAnimator({
  pathFn = (t) => ({ x: t, y: 0.5 + 0.3 * Math.sin(t * Math.PI * 4) }),
  showVelocity = true,
  showAcceleration = false,
  color = '#06b6d4',
  speed = 1,
  className,
}: MotionAnimatorProps) {
  const [trailEnabled, setTrailEnabled] = useState(true);

  const createSim: SimulationFactory = useCallback((_ctx, config) => {
    const trail: Vec2[] = [];
    let t = 0;

    const margin = 40;

    const toCanvas = (nx: number, ny: number): Vec2 => {
      return Vec2.from(
        margin + nx * (config.width - margin * 2),
        margin + (1 - ny) * (config.height - margin * 2)
      );
    };

    const sim: SimulationInstance = {
      init: () => {
        trail.length = 0;
        t = 0;
      },
      update: (state: SimulationState) => {
        t = (t + state.dt * speed * 0.3) % 1;

        const pos = pathFn(t);
        const canvasPos = toCanvas(pos.x, pos.y);
        if (trailEnabled) {
          trail.push(canvasPos.copy());
          if (trail.length > 200) trail.shift();
        }
      },
      draw: (ctx: CanvasRenderingContext2D, cfg: SimulationConfig) => {
        const w = cfg.width;
        const h = cfg.height;
        ctx.clearRect(0, 0, w, h);
        drawGrid(ctx, w, h, 40, 'rgba(255,255,255,0.03)');

        // Draw path outline
        ctx.save();
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let pt = 0; pt <= 1; pt += 0.005) {
          const p = pathFn(pt);
          const cp = toCanvas(p.x, p.y);
          pt === 0 ? ctx.moveTo(cp.x, cp.y) : ctx.lineTo(cp.x, cp.y);
        }
        ctx.stroke();
        ctx.restore();

        // Trail
        if (trailEnabled && trail.length > 1) {
          drawTrail(ctx, trail, color, 2);
        }

        // Current position
        const pos = pathFn(t);
        const canvasPos = toCanvas(pos.x, pos.y);
        drawCircle(ctx, canvasPos, 8, color, '#fff');

        // Velocity vector (tangent)
        if (showVelocity) {
          const dt = 0.001;
          const p1 = pathFn((t + dt) % 1);
          const p2 = pathFn((t - dt + 1) % 1);
          const vx = (p1.x - p2.x) / (2 * dt);
          const vy = (p1.y - p2.y) / (2 * dt);
          const vMag = Math.sqrt(vx * vx + vy * vy);
          if (vMag > 0.01) {
            const vScale = 40 / Math.max(vMag, 0.1);
            const vEnd = Vec2.from(canvasPos.x + vx * vScale, canvasPos.y - vy * vScale);
            drawArrow(ctx, canvasPos, vEnd, '#f59e0b', 2, 7);
            drawText(ctx, 'v', Vec2.from(vEnd.x + 10, vEnd.y), '#f59e0b', 11);
          }
        }

        // Acceleration vector
        if (showAcceleration) {
          const dt = 0.001;
          const p0 = pathFn(t);
          const pf = pathFn((t + dt) % 1);
          const pb = pathFn((t - dt + 1) % 1);
          const ax = (pf.x - 2 * p0.x + pb.x) / (dt * dt);
          const ay = (pf.y - 2 * p0.y + pb.y) / (dt * dt);
          const aMag = Math.sqrt(ax * ax + ay * ay);
          if (aMag > 0.01) {
            const aScale = 20 / Math.max(aMag, 0.1);
            const aEnd = Vec2.from(canvasPos.x + ax * aScale, canvasPos.y - ay * aScale);
            drawArrow(ctx, canvasPos, aEnd, '#ec4899', 1.5, 6);
            drawText(ctx, 'a', Vec2.from(aEnd.x + 10, aEnd.y), '#ec4899', 11);
          }
        }
      },
      reset: () => {
        trail.length = 0;
        t = 0;
      },
      destroy: () => {
        trail.length = 0;
      },
    };

    return sim;
  }, [pathFn, showVelocity, showAcceleration, color, speed, trailEnabled]);

  return (
    <div className={className}>
      <PhysicsCanvas createSimulation={createSim} aspectRatio={16 / 10} />
      <div className="flex items-center gap-3 mt-2">
        <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            checked={trailEnabled}
            onChange={(e) => setTrailEnabled(e.target.checked)}
            className="rounded accent-brand-cyan"
          />
          Show trail
        </label>
      </div>
    </div>
  );
}
