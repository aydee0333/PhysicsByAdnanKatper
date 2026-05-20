import { useState, useCallback } from 'react';
import PhysicsCanvas from '../simulation/PhysicsCanvas';
import FormulaVisualizer from '../simulation/FormulaVisualizer';
import type { SimulationFactory, SimulationInstance, SimulationConfig, SliderConfig } from '../../simulation/types';
import { Vec2, drawArrow, drawGrid, drawText, drawDashedLine, drawAngleArc, drawCircle } from '../../simulation/physics';

export default function ReflectionSim() {
  const [incidenceAngle, setIncidenceAngle] = useState(40);
  const [mirrorType, setMirrorType] = useState<'plane' | 'concave' | 'convex'>('plane');

  const reflectionAngle = incidenceAngle;

  const createSim: SimulationFactory = useCallback((_factoryCtx, _factoryConfig) => {
    const sim: SimulationInstance = {
      init: () => {},
      update: () => {},
      draw: (ctx: CanvasRenderingContext2D, cfg: SimulationConfig) => {
        const w = cfg.width;
        const h = cfg.height;
        ctx.clearRect(0, 0, w, h);
        drawGrid(ctx, w, h, 40, 'rgba(255,255,255,0.03)');

        const mirrorX = w * 0.5;
        const mirrorY1 = h * 0.15;
        const mirrorY2 = h * 0.85;

        // Mirror surface
        ctx.save();
        if (mirrorType === 'plane') {
          ctx.strokeStyle = '#a78bfa';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(mirrorX, mirrorY1);
          ctx.lineTo(mirrorX, mirrorY2);
          ctx.stroke();
          ctx.fillStyle = 'rgba(167,139,250,0.05)';
          ctx.fillRect(mirrorX - 8, mirrorY1, 8, mirrorY2 - mirrorY1);
        } else {
          const curveDir = mirrorType === 'concave' ? -1 : 1;
          const curveAmount = 60;
          ctx.strokeStyle = '#a78bfa';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(mirrorX + curveDir * curveAmount, mirrorY1);
          ctx.quadraticCurveTo(mirrorX - curveDir * curveAmount, h / 2, mirrorX + curveDir * curveAmount, mirrorY2);
          ctx.stroke();
        }
        ctx.restore();

        // Normal line
        drawDashedLine(ctx, Vec2.from(mirrorX, mirrorY1), Vec2.from(mirrorX, mirrorY2), 'rgba(255,255,255,0.15)');
        drawText(ctx, 'Normal', Vec2.from(mirrorX + 15, mirrorY1 + 10), '#666', 10, 'left');

        const angRad = (incidenceAngle * Math.PI) / 180;
        const rayLen = Math.min(w, h) * 0.35;
        const poi = Vec2.from(mirrorX, h / 2);

        // Incident ray
        const incidentEnd = Vec2.from(poi.x - rayLen * Math.cos(angRad), poi.y - rayLen * Math.sin(angRad));
        drawArrow(ctx, incidentEnd, poi, '#06b6d4', 2.5, 10);
        drawText(ctx, 'Incident ray', Vec2.from(incidentEnd.x - 10, incidentEnd.y - 12), '#06b6d4', 11, 'right');

        // Reflected ray
        const reflectedEnd = Vec2.from(poi.x + rayLen * Math.cos(angRad), poi.y - rayLen * Math.sin(angRad));
        drawArrow(ctx, poi, reflectedEnd, '#ec4899', 2.5, 10);
        drawText(ctx, 'Reflected ray', Vec2.from(reflectedEnd.x + 10, reflectedEnd.y - 12), '#ec4899', 11, 'left');

        // Angle arcs
        const arcRadius = 50;
        drawAngleArc(ctx, poi, arcRadius, -Math.PI / 2, -Math.PI / 2 + angRad, '#06b6d4', `θᵢ = ${incidenceAngle}°`);
        drawAngleArc(ctx, poi, arcRadius, -Math.PI / 2 - angRad, -Math.PI / 2, '#ec4899', `θᵣ = ${reflectionAngle}°`);

        // Point of incidence marker
        drawCircle(ctx, poi, 4, '#f59e0b', '#fff');

        // Labels
        drawText(ctx, `θᵢ = θᵣ = ${incidenceAngle}°`, Vec2.from(w / 2, h - 25), '#f59e0b', 13);

        // Law box
        ctx.save();
        ctx.fillStyle = 'rgba(255,255,255,0.04)';
        ctx.beginPath();
        ctx.roundRect(w - 200, 15, 185, 45, 8);
        ctx.fill();
        drawText(ctx, 'Law of Reflection', Vec2.from(w - 108, 30), '#a78bfa', 11);
        drawText(ctx, 'θᵢ = θᵣ', Vec2.from(w - 108, 47), '#fff', 14);
        ctx.restore();
      },
      reset: () => {},
      destroy: () => {},
    };

    return sim;
  }, [incidenceAngle, mirrorType, reflectionAngle]);

  const sliders: SliderConfig[] = [
    { label: 'Angle θᵢ', min: 5, max: 80, step: 1, value: incidenceAngle, onChange: setIncidenceAngle, unit: '°', color: '#06b6d4' },
  ];

  return (
    <div className="space-y-4">
      <PhysicsCanvas createSimulation={createSim} aspectRatio={16 / 10} sliders={sliders} />

      <div className="flex items-center gap-2">
        {(['plane', 'concave', 'convex'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setMirrorType(type)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
              mirrorType === type
                ? 'bg-brand-purple/20 text-brand-purple'
                : 'bg-white/5 text-gray-500 hover:bg-white/10'
            }`}
          >
            {type} mirror
          </button>
        ))}
      </div>

      <FormulaVisualizer
        formula="θᵢ = θᵣ"
        variables={[
          { symbol: 'θᵢ', value: `${incidenceAngle}°`, active: true },
          { symbol: 'θᵣ', value: `${reflectionAngle}°`, active: true },
        ]}
        result={{ label: 'Angle difference', value: '0°' }}
      />
    </div>
  );
}
