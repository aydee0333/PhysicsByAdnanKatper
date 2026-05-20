import { useState, useCallback } from 'react';
import PhysicsCanvas from '../simulation/PhysicsCanvas';
import FormulaVisualizer from '../simulation/FormulaVisualizer';
import type { SimulationFactory, SimulationInstance, SimulationConfig, SliderConfig } from '../../simulation/types';
import { Vec2, drawGrid, drawText, drawArrow } from '../../simulation/physics';

export default function LensSimulation() {
  const [objectDistance, setObjectDistance] = useState(200);
  const [focalLength, setFocalLength] = useState(80);
  const [lensType, setLensType] = useState<'convex' | 'concave'>('convex');

  const imageDistance = lensType === 'convex'
    ? (objectDistance * focalLength) / (objectDistance - focalLength)
    : (objectDistance * focalLength) / (objectDistance + focalLength);

  const magnification = -imageDistance / objectDistance;

  const createSim: SimulationFactory = useCallback((_factoryCtx, _factoryConfig) => {
    const sim: SimulationInstance = {
      init: () => {},
      update: () => {},
      draw: (ctx: CanvasRenderingContext2D, cfg: SimulationConfig) => {
        const w = cfg.width;
        const h = cfg.height;
        ctx.clearRect(0, 0, w, h);
        drawGrid(ctx, w, h, 40, 'rgba(255,255,255,0.03)');

        const centerY = h / 2;
        const lensX = w / 2;
        const scale = 0.8;

        // Draw optical axis
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(30, centerY);
        ctx.lineTo(w - 30, centerY);
        ctx.stroke();

        // Draw lens
        ctx.strokeStyle = '#a78bfa';
        ctx.lineWidth = 3;
        if (lensType === 'convex') {
          // Convex lens (thicker in middle)
          ctx.beginPath();
          ctx.moveTo(lensX, centerY - 80);
          ctx.quadraticCurveTo(lensX + 20, centerY, lensX, centerY + 80);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(lensX, centerY - 80);
          ctx.quadraticCurveTo(lensX - 20, centerY, lensX, centerY + 80);
          ctx.stroke();
        } else {
          // Concave lens (thinner in middle)
          ctx.beginPath();
          ctx.moveTo(lensX, centerY - 80);
          ctx.quadraticCurveTo(lensX - 20, centerY, lensX, centerY + 80);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(lensX, centerY - 80);
          ctx.quadraticCurveTo(lensX + 20, centerY, lensX, centerY + 80);
          ctx.stroke();
        }

        // Draw focal points
        const fPx = focalLength * scale;
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(lensX - fPx, centerY, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(lensX + fPx, centerY, 5, 0, Math.PI * 2);
        ctx.fill();

        drawText(ctx, 'F', Vec2.from(lensX - fPx, centerY + 20), '#f59e0b', 14);
        drawText(ctx, "F'", Vec2.from(lensX + fPx, centerY + 20), '#f59e0b', 14);

        // Draw object
        const objXPx = lensX - objectDistance * scale;
        const objHeight = 60;
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(objXPx, centerY);
        ctx.lineTo(objXPx, centerY - objHeight);
        ctx.stroke();
        // Arrow head
        drawArrow(ctx, Vec2.from(objXPx, centerY - objHeight), Vec2.from(objXPx, centerY - objHeight - 1), '#06b6d4', 2);
        drawText(ctx, 'Object', Vec2.from(objXPx, centerY + 20), '#06b6d4', 12);

        // Draw image
        const imgXPx = lensX + imageDistance * scale;
        const imgHeight = objHeight * Math.abs(magnification);
        const imgColor = magnification < 0 ? '#ec4899' : '#14b8a6';

        if (Math.abs(imageDistance) < w) {
          ctx.strokeStyle = imgColor;
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 5]);
          ctx.beginPath();
          ctx.moveTo(imgXPx, centerY);
          ctx.lineTo(imgXPx, centerY + (magnification < 0 ? -imgHeight : imgHeight));
          ctx.stroke();
          ctx.setLineDash([]);

          drawText(ctx, magnification < 0 ? 'Real Image' : 'Virtual Image', Vec2.from(imgXPx, centerY + 20), imgColor, 12);
        }

        // Draw light rays
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);

        // Ray through center
        ctx.beginPath();
        ctx.moveTo(objXPx, centerY - objHeight);
        ctx.lineTo(lensX, centerY - objHeight * (lensX - objXPx) / (objectDistance * scale));
        ctx.stroke();

        // Ray parallel to axis then through focus
        ctx.beginPath();
        ctx.moveTo(objXPx, centerY - objHeight);
        ctx.lineTo(lensX, centerY - objHeight);
        ctx.stroke();

        ctx.setLineDash([]);
      },
      reset: () => {},
      destroy: () => {},
    };
    return sim;
  }, [objectDistance, focalLength, lensType, imageDistance, magnification]);

  const sliders: SliderConfig[] = [
    { label: 'Object Distance', value: objectDistance, min: 100, max: 400, step: 10, unit: 'cm', onChange: setObjectDistance },
    { label: 'Focal Length', value: focalLength, min: 30, max: 150, step: 5, unit: 'cm', onChange: setFocalLength },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${lensType === 'convex' ? 'bg-brand-purple text-white' : 'bg-white/10 text-white/60'}`}
          onClick={() => setLensType('convex')}
        >
          Convex
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${lensType === 'concave' ? 'bg-brand-purple text-white' : 'bg-white/10 text-white/60'}`}
          onClick={() => setLensType('concave')}
        >
          Concave
        </button>
      </div>
      <PhysicsCanvas
        createSimulation={createSim}
        aspectRatio={16 / 10}
        sliders={sliders}
      />
      <FormulaVisualizer
        formula="1/f = 1/v - 1/u"
        variables={[
          { symbol: 'f', value: focalLength, unit: 'cm' },
          { symbol: 'u', value: objectDistance, unit: 'cm' },
          { symbol: 'v', value: imageDistance, unit: 'cm' },
        ]}
      />
      <div className="text-sm text-white/60">
        Magnification: {magnification.toFixed(2)} | Image: {imageDistance > 0 ? 'Real' : 'Virtual'}
      </div>
    </div>
  );
}
