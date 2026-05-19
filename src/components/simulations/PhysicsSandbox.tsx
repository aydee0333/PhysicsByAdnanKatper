import { useState, useCallback, useRef } from 'react';
import PhysicsCanvas from '../simulation/PhysicsCanvas';
import FormulaVisualizer from '../simulation/FormulaVisualizer';
import type { SimulationFactory, SimulationInstance, SimulationState, SimulationConfig, SimInputState, SliderConfig } from '../../simulation/types';
import { Vec2, drawGrid, drawText, drawArrow } from '../../simulation/physics';

const MAX_BALLS = 20;
const BALL_RADIUS = 14;
const TRAIL_MAX = 40;

const BALL_COLORS = [
  '#06b6d4', '#a78bfa', '#f59e0b', '#ec4899', '#10b981',
  '#f97316', '#8b5cf6', '#14b8a6', '#e11d48', '#3b82f6',
];

interface Ball {
  pos: Vec2;
  vel: Vec2;
  radius: number;
  color: string;
  trail: Vec2[];
}

export default function PhysicsSandbox() {
  const [gravity, setGravity] = useState(9.8);
  const [restitution, setRestitution] = useState(0.7);
  const [ballCount, setBallCount] = useState(0);
  const [showVelArrows, setShowVelArrows] = useState(true);

  const stateRef = useRef({ gravity, restitution });
  stateRef.current = { gravity, restitution };

  const addBallTrigger = useRef(0);
  const clearTrigger = useRef(0);

  const createSim: SimulationFactory = useCallback((_ctx, config) => {
    const balls: Ball[] = [];
    let dragIndex = -1;
    let lastFrameTime = performance.now();
    let fps = 60;

    const spawnBall = (x: number, y: number) => {
      if (balls.length >= MAX_BALLS) return;
      const color = BALL_COLORS[balls.length % BALL_COLORS.length];
      balls.push({
        pos: Vec2.from(x, y),
        vel: Vec2.from(0, 0),
        radius: BALL_RADIUS,
        color,
        trail: [],
      });
    };

    const spawnRandom = () => {
      const x = 40 + Math.random() * (config.width - 80);
      const y = 40 + Math.random() * (config.height * 0.3);
      spawnBall(x, y);
    };

    const sim: SimulationInstance = {
      init: () => {
        balls.length = 0;
        dragIndex = -1;
        // Start with 3 balls
        for (let i = 0; i < 3; i++) spawnRandom();
        setBallCount(3);
      },
      update: (state: SimulationState, input: SimInputState) => {
        const { gravity: g, restitution: rest } = stateRef.current;

        // Check for add/clear triggers
        if (addBallTrigger.current > 0) {
          for (let i = 0; i < addBallTrigger.current; i++) spawnRandom();
          addBallTrigger.current = 0;
          setBallCount(balls.length);
        }
        if (clearTrigger.current > 0) {
          balls.length = 0;
          dragIndex = -1;
          clearTrigger.current = 0;
          setBallCount(0);
        }

        // FPS calculation
        const now = performance.now();
        const frameDelta = now - lastFrameTime;
        lastFrameTime = now;
        fps = fps * 0.95 + (1000 / Math.max(frameDelta, 1)) * 0.05;

        const w = config.width;
        const h = config.height;

        // --- Drag handling ---
        if (input.mouseDown) {
          if (dragIndex === -1) {
            // Find ball under cursor
            for (let i = balls.length - 1; i >= 0; i--) {
              const dist = Vec2.from(input.mouseX, input.mouseY).sub(balls[i].pos).mag();
              if (dist <= balls[i].radius + 5) {
                dragIndex = i;
                break;
              }
            }
            // If no ball found and clicking empty space, spawn one
            if (dragIndex === -1) {
              spawnBall(input.mouseX, input.mouseY);
              setBallCount(balls.length);
            }
          }
          if (dragIndex >= 0 && dragIndex < balls.length) {
            balls[dragIndex].pos = Vec2.from(input.mouseX, input.mouseY);
            balls[dragIndex].vel = Vec2.from(0, 0);
            balls[dragIndex].trail = [];
          }
        } else {
          if (dragIndex >= 0) {
            // Release: zero velocity (held in place)
            if (dragIndex < balls.length) {
              balls[dragIndex].vel = Vec2.from(0, 0);
            }
            dragIndex = -1;
          }
        }

        // --- Physics step (Euler) ---
        for (let i = 0; i < balls.length; i++) {
          if (i === dragIndex) continue;

          const b = balls[i];

          // Gravity
          b.vel = b.vel.add(Vec2.from(0, g * state.dt * 60));

          // Position
          b.pos = b.pos.add(b.vel.scale(state.dt * 60));

          // Trail
          b.trail.push(b.pos.copy());
          if (b.trail.length > TRAIL_MAX) b.trail.shift();

          // Wall collisions
          if (b.pos.x - b.radius < 0) {
            b.pos = Vec2.from(b.radius, b.pos.y);
            b.vel = Vec2.from(-b.vel.x * rest, b.vel.y);
          } else if (b.pos.x + b.radius > w) {
            b.pos = Vec2.from(w - b.radius, b.pos.y);
            b.vel = Vec2.from(-b.vel.x * rest, b.vel.y);
          }
          if (b.pos.y - b.radius < 0) {
            b.pos = Vec2.from(b.pos.x, b.radius);
            b.vel = Vec2.from(b.vel.x, -b.vel.y * rest);
          } else if (b.pos.y + b.radius > h) {
            b.pos = Vec2.from(b.pos.x, h - b.radius);
            b.vel = Vec2.from(b.vel.x, -b.vel.y * rest);
            // Friction on floor
            b.vel = Vec2.from(b.vel.x * 0.995, b.vel.y);
          }
        }

        // --- Ball-ball collisions ---
        for (let i = 0; i < balls.length; i++) {
          for (let j = i + 1; j < balls.length; j++) {
            const a = balls[i];
            const b = balls[j];
            const diff = b.pos.sub(a.pos);
            const dist = diff.mag();
            const minDist = a.radius + b.radius;

            if (dist < minDist && dist > 0.001) {
              const normal = diff.normalize();
              const overlap = minDist - dist;

              // Separate
              if (i === dragIndex) {
                b.pos = b.pos.add(normal.scale(overlap));
              } else if (j === dragIndex) {
                a.pos = a.pos.sub(normal.scale(overlap));
              } else {
                a.pos = a.pos.sub(normal.scale(overlap * 0.5));
                b.pos = b.pos.add(normal.scale(overlap * 0.5));
              }

              // Elastic collision response
              const relVel = a.vel.sub(b.vel);
              const velAlongNormal = relVel.dot(normal);

              if (velAlongNormal > 0) {
                const impulse = normal.scale(velAlongNormal * rest);
                if (i !== dragIndex) a.vel = a.vel.sub(impulse);
                if (j !== dragIndex) b.vel = b.vel.add(impulse);
              }
            }
          }
        }
      },
      draw: (ctx: CanvasRenderingContext2D, cfg: SimulationConfig) => {
        const w = cfg.width;
        const h = cfg.height;

        // Background
        ctx.clearRect(0, 0, w, h);
        drawGrid(ctx, w, h, 30, 'rgba(255,255,255,0.03)');

        // Floor line
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, h - 1);
        ctx.lineTo(w, h - 1);
        ctx.stroke();

        // Draw trails
        for (const ball of balls) {
          if (ball.trail.length < 2) continue;
          ctx.save();
          ctx.lineWidth = 1.5;
          ctx.lineCap = 'round';
          for (let i = 1; i < ball.trail.length; i++) {
            const alpha = (i / ball.trail.length) * 0.4;
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = ball.color;
            ctx.beginPath();
            ctx.moveTo(ball.trail[i - 1].x, ball.trail[i - 1].y);
            ctx.lineTo(ball.trail[i].x, ball.trail[i].y);
            ctx.stroke();
          }
          ctx.globalAlpha = 1;
          ctx.restore();
        }

        // Draw balls with glow
        for (const ball of balls) {
          const r = ball.radius;

          // Glow
          const gradient = ctx.createRadialGradient(
            ball.pos.x, ball.pos.y, r * 0.2,
            ball.pos.x, ball.pos.y, r * 2.2
          );
          gradient.addColorStop(0, ball.color + '40');
          gradient.addColorStop(1, ball.color + '00');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(ball.pos.x, ball.pos.y, r * 2.2, 0, Math.PI * 2);
          ctx.fill();

          // Ball body
          const bodyGrad = ctx.createRadialGradient(
            ball.pos.x - r * 0.3, ball.pos.y - r * 0.3, r * 0.1,
            ball.pos.x, ball.pos.y, r
          );
          bodyGrad.addColorStop(0, '#ffffff60');
          bodyGrad.addColorStop(0.4, ball.color);
          bodyGrad.addColorStop(1, ball.color + 'aa');
          ctx.fillStyle = bodyGrad;
          ctx.beginPath();
          ctx.arc(ball.pos.x, ball.pos.y, r, 0, Math.PI * 2);
          ctx.fill();

          // Highlight
          ctx.fillStyle = 'rgba(255,255,255,0.25)';
          ctx.beginPath();
          ctx.arc(ball.pos.x - r * 0.25, ball.pos.y - r * 0.25, r * 0.35, 0, Math.PI * 2);
          ctx.fill();
        }

        // Velocity arrows
        if (showVelArrows) {
          for (const ball of balls) {
            const speed = ball.vel.mag();
            if (speed < 0.5) continue;
            const arrowEnd = ball.pos.add(ball.vel.scale(0.8));
            drawArrow(ctx, ball.pos, arrowEnd, '#fbbf24', 1.5, 6);
          }
        }

        // HUD
        drawText(ctx, `Balls: ${balls.length}/${MAX_BALLS}`, Vec2.from(50, 16), '#94a3b8', 11, 'left');
        drawText(ctx, `FPS: ${Math.round(fps)}`, Vec2.from(50, 32), '#64748b', 10, 'left');
      },
      reset: () => {
        balls.length = 0;
        dragIndex = -1;
        for (let i = 0; i < 3; i++) spawnRandom();
        setBallCount(3);
      },
      destroy: () => {
        balls.length = 0;
      },
    };

    return sim;
  }, []);

  const sliders: SliderConfig[] = [
    { label: 'Gravity', min: 0, max: 20, step: 0.5, value: gravity, onChange: setGravity, unit: 'm/s²', color: '#a78bfa' },
    { label: 'Bounciness', min: 0, max: 1, step: 0.05, value: restitution, onChange: setRestitution, color: '#06b6d4' },
  ];

  return (
    <div className="space-y-4">
      <PhysicsCanvas
        createSimulation={createSim}
        aspectRatio={16 / 10}
        sliders={sliders}
      />

      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => { addBallTrigger.current += 1; }}
          disabled={ballCount >= MAX_BALLS}
          className="px-4 py-2 rounded-xl bg-brand-cyan/20 border border-brand-cyan/30 text-brand-cyan text-sm font-medium hover:bg-brand-cyan/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          + Add Ball
        </button>
        <button
          onClick={() => { clearTrigger.current += 1; }}
          className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/30 transition-colors"
        >
          Clear All
        </button>
        <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            checked={showVelArrows}
            onChange={(e) => setShowVelArrows(e.target.checked)}
            className="rounded accent-amber-400"
          />
          Velocity arrows
        </label>
        <span className="text-xs text-gray-500 ml-auto">Click empty space to add · Drag balls to move</span>
      </div>

      <FormulaVisualizer
        formula="F = mg"
        variables={[
          { symbol: 'm', value: 1, unit: 'kg' },
          { symbol: 'g', value: gravity, unit: 'm/s²', color: '#a78bfa', active: true },
        ]}
        result={{ label: 'Weight', value: gravity, unit: 'N' }}
      />
    </div>
  );
}
