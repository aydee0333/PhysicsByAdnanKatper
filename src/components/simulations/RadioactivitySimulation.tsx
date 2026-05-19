import { useState, useCallback, useRef } from 'react';
import PhysicsCanvas from '../simulation/PhysicsCanvas';
import FormulaVisualizer from '../simulation/FormulaVisualizer';
import type { SimulationFactory, SimulationInstance, SimulationConfig, SliderConfig } from '../../simulation/types';
import { drawGrid } from '../../simulation/physics';

export default function RadioactivitySimulation() {
  const [halfLife, setHalfLife] = useState(5);
  const [initialAtoms, setInitialAtoms] = useState(100);
  const [elapsedTime, setElapsedTime] = useState(0);

  const remainingAtoms = Math.round(initialAtoms * Math.pow(0.5, elapsedTime / halfLife));
  const decayedAtoms = initialAtoms - remainingAtoms;
  const decayConstant = Math.LN2 / halfLife;
  const activity = (decayConstant * remainingAtoms).toFixed(1);

  const atomsRef = useRef<{ x: number; y: number; alive: boolean; decayTime: number }[]>([]);

  const createSim: SimulationFactory = useCallback(() => {
    // Initialize atoms at random positions
    atomsRef.current = Array.from({ length: initialAtoms }, () => ({
      x: Math.random(),
      y: Math.random(),
      alive: true,
      decayTime: Math.random() * halfLife * 3,
    }));

    let simTime = 0;
    const sim: SimulationInstance = {
      init: () => { simTime = 0; },
      update: (state) => { simTime += state.dt; },
      reset: () => { simTime = 0; },
      draw: (ctx: CanvasRenderingContext2D, cfg: SimulationConfig) => {
        const w = cfg.width;
        const h = cfg.height;
        ctx.clearRect(0, 0, w, h);
        drawGrid(ctx, w, h, 40, 'rgba(255,255,255,0.03)');

        const atomsAreaX = 20;
        const atomsAreaY = 20;
        const atomsAreaW = w * 0.55;
        const atomsAreaH = h - 80;
        const graphX = atomsAreaW + 40;
        const graphW = w - graphX - 20;
        const graphH = atomsAreaH;
        const graphY = atomsAreaY;

        // Update atom states based on elapsed time
        atomsRef.current.forEach((atom) => {
          if (atom.alive && elapsedTime >= atom.decayTime) {
            atom.alive = false;
          }
        });

        // Draw atoms
        ctx.save();
        atomsRef.current.forEach((atom) => {
          const ax = atomsAreaX + atom.x * atomsAreaW;
          const ay = atomsAreaY + atom.y * atomsAreaH;
          ctx.beginPath();
          ctx.arc(ax, ay, 4, 0, Math.PI * 2);
          if (atom.alive) {
            ctx.fillStyle = '#22c55e';
            ctx.fill();
          } else {
            ctx.fillStyle = 'rgba(239,68,68,0.3)';
            ctx.fill();
          }
        });
        ctx.restore();

        // Labels
        ctx.save();
        ctx.fillStyle = '#22c55e';
        ctx.font = 'bold 12px Inter, system-ui';
        ctx.textAlign = 'left';
        ctx.fillText(`Remaining: ${remainingAtoms}`, atomsAreaX, atomsAreaH + 40);
        ctx.fillStyle = '#ef4444';
        ctx.fillText(`Decayed: ${decayedAtoms}`, atomsAreaX, atomsAreaH + 58);
        ctx.restore();

        // Decay curve graph
        ctx.save();
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 1;
        ctx.strokeRect(graphX, graphY, graphW, graphH);

        // Axes
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.beginPath();
        ctx.moveTo(graphX, graphY);
        ctx.lineTo(graphX, graphY + graphH);
        ctx.lineTo(graphX + graphW, graphY + graphH);
        ctx.stroke();

        // Labels
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px Inter, system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('Time', graphX + graphW / 2, graphY + graphH + 18);
        ctx.save();
        ctx.translate(graphX - 15, graphY + graphH / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('N', 0, 0);
        ctx.restore();

        // Y-axis ticks
        ctx.textAlign = 'right';
        ctx.fillText(`${initialAtoms}`, graphX - 5, graphY + 12);
        ctx.fillText('0', graphX - 5, graphY + graphH + 5);

        // X-axis ticks
        const maxTime = halfLife * 5;
        ctx.textAlign = 'center';
        for (let i = 0; i <= 5; i++) {
          const x = graphX + (i / 5) * graphW;
          ctx.fillText(`${(maxTime * i / 5).toFixed(0)}`, x, graphY + graphH + 15);
        }

        // Decay curve
        ctx.beginPath();
        ctx.strokeStyle = '#a78bfa';
        ctx.lineWidth = 2;
        for (let i = 0; i <= 100; i++) {
          const t = (i / 100) * maxTime;
          const n = initialAtoms * Math.pow(0.5, t / halfLife);
          const x = graphX + (t / maxTime) * graphW;
          const y = graphY + graphH - (n / initialAtoms) * graphH;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Current time marker
        const markerX = graphX + (Math.min(elapsedTime, maxTime) / maxTime) * graphW;
        const markerY = graphY + graphH - (remainingAtoms / initialAtoms) * graphH;
        ctx.beginPath();
        ctx.arc(markerX, markerY, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Half-life markers
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 1;
        for (let i = 1; i <= 4; i++) {
          const hlX = graphX + (i * halfLife / maxTime) * graphW;
          ctx.beginPath();
          ctx.moveTo(hlX, graphY);
          ctx.lineTo(hlX, graphY + graphH);
          ctx.stroke();
          ctx.fillStyle = '#64748b';
          ctx.font = '9px Inter, system-ui';
          ctx.textAlign = 'center';
          ctx.fillText(`${i}t½`, hlX, graphY - 5);
        }
        ctx.setLineDash([]);
        ctx.restore();
      },
      destroy: () => {},
    };
    return sim;
  }, [initialAtoms, halfLife, elapsedTime, remainingAtoms, decayedAtoms]);

  const sliders: SliderConfig[] = [
    { label: 'Half-life', min: 1, max: 20, step: 0.5, value: halfLife, onChange: setHalfLife, unit: 's', color: '#a78bfa' },
    { label: 'Initial atoms', min: 10, max: 200, step: 10, value: initialAtoms, onChange: setInitialAtoms, color: '#22c55e' },
    { label: 'Time', min: 0, max: 50, step: 0.5, value: elapsedTime, onChange: setElapsedTime, unit: 's', color: '#f59e0b' },
  ];

  return (
    <div className="space-y-4">
      <PhysicsCanvas createSimulation={createSim} aspectRatio={16 / 10} sliders={sliders} />
      <FormulaVisualizer
        formula="N = N₀ × (1/2)^(t/t½)"
        variables={[
          { symbol: 'N₀', value: initialAtoms },
          { symbol: 't', value: elapsedTime, unit: 's', active: true },
          { symbol: 't½', value: halfLife, unit: 's', active: true },
        ]}
        result={{ label: 'Remaining (N)', value: remainingAtoms }}
      />
      <div className="text-center text-sm text-white/60">
        Decay constant (λ) = {decayConstant.toFixed(4)} s⁻¹ | Activity = {activity} atoms/s
      </div>
    </div>
  );
}
