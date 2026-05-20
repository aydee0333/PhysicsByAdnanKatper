import { useState, useCallback } from 'react';
import PhysicsCanvas from '../simulation/PhysicsCanvas';
import FormulaVisualizer from '../simulation/FormulaVisualizer';
import type { SimulationFactory, SimulationInstance, SimulationConfig, SliderConfig } from '../../simulation/types';
import { Vec2, drawGrid, drawText } from '../../simulation/physics';

export default function RadioactivitySim() {
  const [halfLife, setHalfLife] = useState(5);
  const [elapsedTime, setElapsedTime] = useState(0);

  const initialAtoms = 1000;
  const remainingAtoms = initialAtoms * Math.pow(0.5, elapsedTime / halfLife);
  const decayedAtoms = initialAtoms - remainingAtoms;
  const activity = (Math.log(2) / halfLife) * remainingAtoms;

  const createSim: SimulationFactory = useCallback((_factoryCtx, _factoryConfig) => {
    let particles: { x: number; y: number; vx: number; vy: number; life: number; type: 'alpha' | 'beta' | 'gamma' }[] = [];
    let spawnTimer = 0;

    const sim: SimulationInstance = {
      init: () => { particles = []; spawnTimer = 0; },
      update: (state) => {
        spawnTimer += state.dt;
        const spawnRate = Math.max(0.1, activity / 100);

        if (spawnTimer > 1 / spawnRate) {
          spawnTimer = 0;
          const types: ('alpha' | 'beta' | 'gamma')[] = ['alpha', 'beta', 'gamma'];
          const type = types[Math.floor(Math.random() * types.length)];

          particles.push({
            x: 100 + Math.random() * 100,
            y: 150 + (Math.random() - 0.5) * 100,
            vx: 1 + Math.random() * 2,
            vy: (Math.random() - 0.5) * 1,
            life: 1,
            type,
          });
        }

        particles = particles.filter((p) => {
          p.x += p.vx * 60 * state.dt;
          p.y += p.vy * 60 * state.dt;
          p.life -= state.dt * 0.5;
          return p.life > 0 && p.x < 600;
        });
      },
      reset: () => { particles = []; spawnTimer = 0; },
      destroy: () => {},
      draw: (ctx: CanvasRenderingContext2D, cfg: SimulationConfig) => {
        const w = cfg.width;
        const h = cfg.height;
        ctx.clearRect(0, 0, w, h);
        drawGrid(ctx, w, h, 40, 'rgba(255,255,255,0.03)');

        // Draw nucleus
        ctx.fillStyle = 'rgba(124, 58, 237, 0.3)';
        ctx.beginPath();
        ctx.arc(100, h / 2, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#a78bfa';
        ctx.lineWidth = 2;
        ctx.stroke();
        drawText(ctx, 'Nucleus', Vec2.from(100, h / 2 + 45), 'rgba(255,255,255,0.6)', 12);

        // Draw particles
        particles.forEach((p) => {
          const alpha = p.life;
          if (p.type === 'alpha') {
            ctx.fillStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
            ctx.fill();
            drawText(ctx, 'α', Vec2.from(p.x, p.y), `rgba(255,255,255,${alpha})`, 10);
          } else if (p.type === 'beta') {
            ctx.fillStyle = `rgba(236, 72, 153, ${alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
            ctx.fill();
            drawText(ctx, 'β', Vec2.from(p.x, p.y), `rgba(255,255,255,${alpha})`, 8);
          } else {
            ctx.strokeStyle = `rgba(245, 158, 11, ${alpha})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(p.x - 8, p.y);
            ctx.lineTo(p.x + 8, p.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(p.x, p.y - 8);
            ctx.lineTo(p.x, p.y + 8);
            ctx.stroke();
          }
        });

        // Legend
        const legendY = h - 60;
        drawText(ctx, 'α (Alpha)', Vec2.from(30, legendY), '#06b6d4', 11, 'left');
        drawText(ctx, 'β (Beta)', Vec2.from(30, legendY + 18), '#ec4899', 11, 'left');
        drawText(ctx, 'γ (Gamma)', Vec2.from(30, legendY + 36), '#f59e0b', 11, 'left');

        // Stats
        drawText(ctx, `Remaining: ${Math.round(remainingAtoms)}`, Vec2.from(w - 150, 30), 'rgba(255,255,255,0.7)', 13, 'left');
        drawText(ctx, `Activity: ${activity.toFixed(1)} decays/s`, Vec2.from(w - 150, 50), 'rgba(255,255,255,0.7)', 13, 'left');
      },
    };
    return sim;
  }, [halfLife, elapsedTime, remainingAtoms, activity]);

  const sliders: SliderConfig[] = [
    { label: 'Half-life', value: halfLife, min: 1, max: 20, step: 1, unit: 's', onChange: setHalfLife },
    { label: 'Time', value: elapsedTime, min: 0, max: 50, step: 0.5, unit: 's', onChange: setElapsedTime },
  ];

  return (
    <div className="space-y-4">
      <PhysicsCanvas
        createSimulation={createSim}
        aspectRatio={12 / 5}
        sliders={sliders}
      />
      <FormulaVisualizer
        formula="N = N₀(½)^(t/t½)"
        variables={[
          { symbol: 'N₀', value: initialAtoms, unit: 'atoms' },
          { symbol: 'N', value: Math.round(remainingAtoms), unit: 'atoms' },
          { symbol: 't', value: elapsedTime, unit: 's' },
          { symbol: 't½', value: halfLife, unit: 's' },
        ]}
      />
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-sm text-white/50">Remaining</div>
          <div className="text-xl font-bold text-brand-cyan">{Math.round(remainingAtoms)}</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-sm text-white/50">Decayed</div>
          <div className="text-xl font-bold text-brand-pink">{Math.round(decayedAtoms)}</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-sm text-white/50">Activity</div>
          <div className="text-xl font-bold text-brand-amber">{activity.toFixed(1)}/s</div>
        </div>
      </div>
    </div>
  );
}
