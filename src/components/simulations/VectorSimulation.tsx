import { useState, useCallback } from 'react';
import PhysicsCanvas from '../simulation/PhysicsCanvas';
import FormulaVisualizer from '../simulation/FormulaVisualizer';
import type { SimulationFactory, SimulationInstance, SimulationConfig, SliderConfig } from '../../simulation/types';
import { Vec2, drawArrow, drawGrid, drawText, drawDashedLine } from '../../simulation/physics';

export default function VectorSimulation() {
  const [magA, setMagA] = useState(100);
  const [angA, setAngA] = useState(30);
  const [magB, setMagB] = useState(80);
  const [angB, setAngB] = useState(120);

  const toRad = (d: number) => (d * Math.PI) / 180;

  const ax = magA * Math.cos(toRad(angA));
  const ay = magA * Math.sin(toRad(angA));
  const bx = magB * Math.cos(toRad(angB));
  const by = magB * Math.sin(toRad(angB));
  const rx = ax + bx;
  const ry = ay + by;
  const rMag = Math.sqrt(rx * rx + ry * ry);

  const createSim: SimulationFactory = useCallback((_factoryCtx, _factoryConfig) => {
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
        const origin = Vec2.from(cx, cy);

        // Axes
        ctx.save();
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, 20);
        ctx.lineTo(cx, h - 20);
        ctx.moveTo(20, cy);
        ctx.lineTo(w - 20, cy);
        ctx.stroke();
        ctx.restore();

        // Vector A
        const endA = Vec2.from(cx + ax, cy - ay);
        drawArrow(ctx, origin, endA, '#06b6d4', 2.5, 10);
        drawText(ctx, `A (${magA.toFixed(0)})`, Vec2.from(endA.x + 15, endA.y - 10), '#06b6d4', 12);

        // Vector B
        const endB = Vec2.from(cx + bx, cy - by);
        drawArrow(ctx, origin, endB, '#ec4899', 2.5, 10);
        drawText(ctx, `B (${magB.toFixed(0)})`, Vec2.from(endB.x + 15, endB.y + 10), '#ec4899', 12);

        // Parallelogram (dashed)
        const endR = Vec2.from(cx + rx, cy - ry);
        drawDashedLine(ctx, endA, endR, 'rgba(255,255,255,0.15)', 1);
        drawDashedLine(ctx, endB, endR, 'rgba(255,255,255,0.15)', 1);

        // Resultant
        drawArrow(ctx, origin, endR, '#f59e0b', 3, 12);
        drawText(ctx, `R (${rMag.toFixed(1)})`, Vec2.from(endR.x + 15, endR.y - 15), '#f59e0b', 13);

        // Component projections
        drawDashedLine(ctx, endA, Vec2.from(cx + ax, cy), 'rgba(6,182,212,0.3)');
        drawDashedLine(ctx, endA, Vec2.from(cx, cy - ay), 'rgba(6,182,212,0.3)');
        drawDashedLine(ctx, endB, Vec2.from(cx + bx, cy), 'rgba(236,72,153,0.3)');
        drawDashedLine(ctx, endB, Vec2.from(cx, cy - by), 'rgba(236,72,153,0.3)');

        drawText(ctx, 'x', Vec2.from(w - 15, cy + 15), '#666', 11);
        drawText(ctx, 'y', Vec2.from(cx + 15, 20), '#666', 11);
      },
      reset: () => {},
      destroy: () => {},
    };

    return sim;
  }, [ax, ay, bx, by, rx, ry, magA, magB]);

  const sliders: SliderConfig[] = [
    { label: '|A|', min: 20, max: 200, step: 5, value: magA, onChange: setMagA, color: '#06b6d4' },
    { label: 'θA', min: 0, max: 360, step: 1, value: angA, onChange: setAngA, unit: '°', color: '#06b6d4' },
    { label: '|B|', min: 20, max: 200, step: 5, value: magB, onChange: setMagB, color: '#ec4899' },
    { label: 'θB', min: 0, max: 360, step: 1, value: angB, onChange: setAngB, unit: '°', color: '#ec4899' },
  ];

  return (
    <div className="space-y-4">
      <PhysicsCanvas createSimulation={createSim} aspectRatio={16 / 10} sliders={sliders} />
      <FormulaVisualizer
        formula="R = A + B"
        variables={[
          { symbol: '|A|', value: magA.toFixed(0), active: true },
          { symbol: '|B|', value: magB.toFixed(0), active: true },
          { symbol: 'θA', value: `${angA}°` },
          { symbol: 'θB', value: `${angB}°` },
        ]}
        result={{ label: '|R|', value: rMag.toFixed(1), unit: 'units' }}
      />
    </div>
  );
}
