import { useState, useCallback } from 'react';
import PhysicsCanvas from '../simulation/PhysicsCanvas';
import FormulaVisualizer from '../simulation/FormulaVisualizer';
import type { SimulationFactory, SimulationInstance, SimulationState, SimulationConfig, SliderConfig } from '../../simulation/types';
import { Vec2, drawGrid, drawText, drawDashedLine, drawArrow } from '../../simulation/physics';

export default function SHMSimulation() {
  const [amplitude, setAmplitude] = useState(80);
  const [springK, setSpringK] = useState(4);
  const [mass, setMass] = useState(2);

  const omega = Math.sqrt(springK / mass);
  const period = (2 * Math.PI) / omega;

  const createSim: SimulationFactory = useCallback((_factoryCtx, _factoryConfig) => {
    const trail: { y: number; t: number }[] = [];
    let localElapsed = 0;

    const sim: SimulationInstance = {
      init: () => {
        trail.length = 0;
        localElapsed = 0;
      },
      update: (state: SimulationState) => {
        localElapsed += state.dt;
        const y = amplitude * Math.cos(omega * localElapsed);
        trail.push({ y, t: localElapsed });
        if (trail.length > 300) trail.shift();
      },
      draw: (ctx: CanvasRenderingContext2D, cfg: SimulationConfig) => {
        const w = cfg.width;
        const h = cfg.height;
        ctx.clearRect(0, 0, w, h);
        drawGrid(ctx, w, h, 40, 'rgba(255,255,255,0.03)');

        const anchorX = w * 0.25;
        const anchorY = 40;
        const eqY = h / 2;
        const currentY = eqY + amplitude * Math.cos(omega * localElapsed);

        // Spring coils
        const coilCount = 12;
        const springTop = anchorY + 30;
        const springBottom = currentY - 20;
        const springLen = springBottom - springTop;

        ctx.save();
        ctx.strokeStyle = '#a78bfa';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(anchorX, anchorY);
        ctx.lineTo(anchorX, springTop);

        const coilWidth = 20;
        for (let i = 0; i <= coilCount; i++) {
          const t = i / coilCount;
          const y = springTop + t * springLen;
          const x = anchorX + (i % 2 === 0 ? -coilWidth : coilWidth);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(anchorX, springBottom);
        ctx.stroke();
        ctx.restore();

        // Mass block
        const blockSize = 36;
        ctx.save();
        ctx.fillStyle = '#06b6d4';
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(anchorX - blockSize / 2, currentY - blockSize / 2, blockSize, blockSize, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 11px Inter, system-ui';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('m', anchorX, currentY);
        ctx.restore();

        // Equilibrium line
        drawDashedLine(ctx, Vec2.from(anchorX + 40, eqY), Vec2.from(w - 20, eqY), 'rgba(255,255,255,0.1)');
        drawText(ctx, 'equilibrium', Vec2.from(w - 70, eqY - 10), '#666', 10);

        // Displacement arrow
        const displacement = currentY - eqY;
        if (Math.abs(displacement) > 3) {
          drawArrow(
            ctx,
            Vec2.from(anchorX + blockSize / 2 + 10, eqY),
            Vec2.from(anchorX + blockSize / 2 + 10, currentY),
            displacement > 0 ? '#ec4899' : '#f59e0b',
            1.5,
            6
          );
          drawText(
            ctx,
            `x = ${displacement.toFixed(0)}`,
            Vec2.from(anchorX + blockSize / 2 + 40, (eqY + currentY) / 2),
            displacement > 0 ? '#ec4899' : '#f59e0b',
            10
          );
        }

        // Displacement-time graph
        const graphX = w * 0.5;
        const graphW = w * 0.45;
        const graphH = h * 0.7;
        const graphY = h * 0.15;

        ctx.save();
        ctx.fillStyle = 'rgba(255,255,255,0.02)';
        ctx.fillRect(graphX, graphY, graphW, graphH);
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1;
        ctx.strokeRect(graphX, graphY, graphW, graphH);
        ctx.restore();

        const graphCenterY = graphY + graphH / 2;
        drawDashedLine(ctx, Vec2.from(graphX, graphCenterY), Vec2.from(graphX + graphW, graphCenterY), 'rgba(255,255,255,0.1)');
        drawText(ctx, 't', Vec2.from(graphX + graphW + 10, graphCenterY), '#666', 10);
        drawText(ctx, 'x', Vec2.from(graphX + 5, graphY - 5), '#666', 10, 'left');

        // Plot trail
        if (trail.length > 1) {
          const timeWindow = period * 3;
          const endTime = localElapsed;
          const startTime = endTime - timeWindow;

          ctx.save();
          ctx.strokeStyle = '#06b6d4';
          ctx.lineWidth = 1.5;
          ctx.beginPath();

          let started = false;
          for (const point of trail) {
            if (point.t < startTime) continue;
            const px = graphX + ((point.t - startTime) / timeWindow) * graphW;
            const py = graphCenterY - (point.y / amplitude) * (graphH / 2 - 10);
            if (!started) {
              ctx.moveTo(px, py);
              started = true;
            } else {
              ctx.lineTo(px, py);
            }
          }
          ctx.stroke();
          ctx.restore();
        }
      },
      reset: () => {
        trail.length = 0;
        localElapsed = 0;
      },
      destroy: () => {
        trail.length = 0;
      },
    };

    return sim;
  }, [amplitude, springK, mass, omega, period]);

  const sliders: SliderConfig[] = [
    { label: 'Amplitude', min: 20, max: 150, step: 5, value: amplitude, onChange: setAmplitude, unit: 'px', color: '#06b6d4' },
    { label: 'Spring k', min: 1, max: 20, step: 0.5, value: springK, onChange: setSpringK, unit: 'N/m', color: '#a78bfa' },
    { label: 'Mass', min: 0.5, max: 10, step: 0.5, value: mass, onChange: setMass, unit: 'kg', color: '#ec4899' },
  ];

  return (
    <div className="space-y-4">
      <PhysicsCanvas createSimulation={createSim} aspectRatio={16 / 10} sliders={sliders} />
      <FormulaVisualizer
        formula="T = 2π√(m/k)"
        variables={[
          { symbol: 'm', value: mass, unit: 'kg', active: true },
          { symbol: 'k', value: springK, unit: 'N/m', active: true },
          { symbol: 'ω', value: omega.toFixed(2), unit: 'rad/s' },
        ]}
        result={{ label: 'Period T', value: period.toFixed(2), unit: 's' }}
      />
    </div>
  );
}
