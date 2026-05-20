import { useState, useCallback, useRef } from 'react';
import PhysicsCanvas from '../simulation/PhysicsCanvas';
import FormulaVisualizer from '../simulation/FormulaVisualizer';
import type { SimulationFactory, SimulationInstance, SimulationState, SimulationConfig } from '../../simulation/types';
import { Vec2, degToRad, drawArrow, drawTrail, drawGrid, drawCircle, drawText } from '../../simulation/physics';
import type { SliderConfig } from '../../simulation/types';

const G = 9.8;

export default function ProjectileMotion() {
  const [angle, setAngle] = useState(45);
  const [velocity, setVelocity] = useState(20);
  const [showVectors, setShowVectors] = useState(true);

  // Live values from simulation
  const [liveValues, setLiveValues] = useState({
    vx: 0, vy: 0, x: 0, y: 0, t: 0, range: 0, maxH: 0, flightTime: 0,
  });

  const valuesRef = useRef(liveValues);

  const createSim: SimulationFactory = useCallback((_ctx, config) => {
    const angleRad = degToRad(angle);
    const vx = velocity * Math.cos(angleRad);
    const vy = velocity * Math.sin(angleRad);
    const totalTime = (2 * vy) / G;
    const range = vx * totalTime;
    const maxHeight = (vy * vy) / (2 * G);

    // Scale: fit the trajectory into the canvas
    const margin = 60;
    const scaleX = (config.width - margin * 2) / Math.max(range, 1);
    const scaleY = (config.height - margin * 2) / Math.max(maxHeight, 1);
    const scale = Math.min(scaleX, scaleY, 8);

    const originX = margin;
    const originY = config.height - margin;

    const trail: Vec2[] = [];
    let ballPos = Vec2.from(originX, originY);
    let simTime = 0;
    let landed = false;

    const updateValues = (t: number, bx: number, by: number, cvx: number, cvy: number) => {
      const v = {
        vx: cvx,
        vy: cvy,
        x: bx,
        y: by,
        t,
        range,
        maxH: maxHeight,
        flightTime: totalTime,
      };
      valuesRef.current = v;
      setLiveValues(v);
    };

    const sim: SimulationInstance = {
      init: () => {
        trail.length = 0;
        simTime = 0;
        landed = false;
        ballPos = Vec2.from(originX, originY);
        updateValues(0, 0, 0, vx, vy);
      },
      update: (state: SimulationState) => {
        if (landed) return;

        simTime += state.dt;
        const px = vx * simTime;
        const py = vy * simTime - 0.5 * G * simTime * simTime;

        if (py < 0 && simTime > 0.01) {
          landed = true;
          ballPos = Vec2.from(originX + range * scale, originY);
          trail.push(ballPos.copy());
          updateValues(totalTime, range, 0, vx, 0);
          return;
        }

        const currentVy = vy - G * simTime;
        ballPos = Vec2.from(originX + px * scale, originY - py * scale);
        trail.push(ballPos.copy());

        if (trail.length > 500) trail.shift();
        updateValues(simTime, px, Math.max(0, py), vx, currentVy);
      },
      draw: (ctx: CanvasRenderingContext2D, cfg: SimulationConfig) => {
        const w = cfg.width;
        const h = cfg.height;

        // Clear
        ctx.clearRect(0, 0, w, h);

        // Background grid
        drawGrid(ctx, w, h, 40, 'rgba(255,255,255,0.03)');

        // Ground line
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(margin, originY);
        ctx.lineTo(w - margin / 2, originY);
        ctx.stroke();

        // Predicted path (dashed parabola)
        ctx.save();
        ctx.setLineDash([4, 6]);
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let t = 0; t <= totalTime; t += totalTime / 80) {
          const px = vx * t;
          const py = vy * t - 0.5 * G * t * t;
          const sx = originX + px * scale;
          const sy = originY - py * scale;
          t === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
        }
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        // Trail
        drawTrail(ctx, trail, '#06b6d4', 2);

        // Launch vector
        const launchEnd = Vec2.from(
          originX + Math.cos(angleRad) * 50,
          originY - Math.sin(angleRad) * 50
        );
        drawArrow(ctx, Vec2.from(originX, originY), launchEnd, '#a78bfa', 2, 8);

        // Velocity vectors at ball position
        if (showVectors && !landed) {
          const cvx = vx;
          const cvy = vy - G * simTime;
          const vScale = 1.5;

          // Vx component
          drawArrow(
            ctx,
            ballPos,
            Vec2.from(ballPos.x + cvx * vScale, ballPos.y),
            '#f59e0b',
            1.5,
            6
          );
          // Vy component
          drawArrow(
            ctx,
            ballPos,
            Vec2.from(ballPos.x, ballPos.y - cvy * vScale),
            '#ec4899',
            1.5,
            6
          );

          // Labels
          drawText(ctx, 'vx', Vec2.from(ballPos.x + cvx * vScale + 12, ballPos.y + 4), '#f59e0b', 10);
          drawText(ctx, 'vy', Vec2.from(ballPos.x + 12, ballPos.y - cvy * vScale - 4), '#ec4899', 10);
        }

        // Ball
        drawCircle(ctx, ballPos, 6, '#06b6d4', '#fff');

        // Range marker
        if (landed || simTime > totalTime * 0.5) {
          const rangeX = originX + range * scale;
          ctx.save();
          ctx.setLineDash([2, 3]);
          ctx.strokeStyle = 'rgba(245,158,11,0.3)';
          ctx.beginPath();
          ctx.moveTo(rangeX, originY);
          ctx.lineTo(rangeX, originY + 15);
          ctx.stroke();
          ctx.setLineDash([]);
          drawText(ctx, `R = ${range.toFixed(1)}m`, Vec2.from(rangeX, originY + 24), '#f59e0b', 10);
          ctx.restore();
        }

        // Max height marker
        if (landed || simTime > totalTime * 0.4) {
          const mhY = originY - maxHeight * scale;
          ctx.save();
          ctx.setLineDash([2, 3]);
          ctx.strokeStyle = 'rgba(236,72,153,0.3)';
          ctx.beginPath();
          ctx.moveTo(originX, mhY);
          ctx.lineTo(originX - 15, mhY);
          ctx.stroke();
          ctx.setLineDash([]);
          drawText(ctx, `H = ${maxHeight.toFixed(1)}m`, Vec2.from(originX - 20, mhY), '#ec4899', 10, 'right');
          ctx.restore();
        }
      },
      reset: () => {
        trail.length = 0;
        simTime = 0;
        landed = false;
        ballPos = Vec2.from(originX, originY);
        updateValues(0, 0, 0, vx, vy);
      },
      destroy: () => {
        trail.length = 0;
      },
    };

    return sim;
  }, [angle, velocity, showVectors]);

  const sliders: SliderConfig[] = [
    { label: 'Angle', min: 5, max: 85, step: 1, value: angle, onChange: setAngle, unit: '°', color: '#a78bfa' },
    { label: 'Velocity', min: 5, max: 50, step: 1, value: velocity, onChange: setVelocity, unit: 'm/s', color: '#06b6d4' },
  ];

  return (
    <div className="space-y-4">
      <PhysicsCanvas
        createSimulation={createSim}
        aspectRatio={16 / 10}
        sliders={sliders}
      />

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            checked={showVectors}
            onChange={(e) => setShowVectors(e.target.checked)}
            className="rounded accent-brand-cyan"
          />
          Show velocity vectors
        </label>
      </div>

      <FormulaVisualizer
        formula="y = x tanθ - gx² / (2v₀² cos²θ)"
        variables={[
          { symbol: 'θ', value: angle, unit: '°', color: '#a78bfa', active: true },
          { symbol: 'v₀', value: velocity, unit: 'm/s', color: '#06b6d4', active: true },
          { symbol: 'g', value: 9.8, unit: 'm/s²' },
        ]}
        result={{ label: 'Range', value: liveValues.range, unit: 'm' }}
      />
    </div>
  );
}
