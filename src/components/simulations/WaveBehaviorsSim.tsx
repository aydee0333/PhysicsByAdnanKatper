import { useState, useCallback } from 'react';
import PhysicsCanvas from '../simulation/PhysicsCanvas';
import type { SimulationFactory, SimulationInstance, SimulationState, SimulationConfig, SliderConfig } from '../../simulation/types';
import { Vec2, drawGrid, drawText, drawDashedLine, drawAngleArc } from '../../simulation/physics';

export default function WaveBehaviorsSim() {
  const [mode, setMode] = useState<'reflection' | 'refraction' | 'diffraction'>('reflection');
  const [incidenceAngle, setIncidenceAngle] = useState(45);
  const [speedRatio, setSpeedRatio] = useState(0.7);
  const [gapWidth, setGapWidth] = useState(80);
  const [wavelength, setWavelength] = useState(60);

  const createSim: SimulationFactory = useCallback((_ctx, _config) => {
    let localElapsed = 0;

    const sim: SimulationInstance = {
      init: () => { localElapsed = 0; },
      update: (state: SimulationState) => { localElapsed += state.dt; },
      draw: (ctx: CanvasRenderingContext2D, cfg: SimulationConfig) => {
        const w = cfg.width;
        const h = cfg.height;
        ctx.clearRect(0, 0, w, h);
        drawGrid(ctx, w, h, 40, 'rgba(255,255,255,0.03)');

        if (mode === 'reflection') {
          drawReflection(ctx, w, h, localElapsed);
        } else if (mode === 'refraction') {
          drawRefraction(ctx, w, h, localElapsed);
        } else {
          drawDiffraction(ctx, w, h, localElapsed);
        }

        // Mode label
        drawText(ctx, mode.charAt(0).toUpperCase() + mode.slice(1), Vec2.from(w / 2, 18), '#666', 11);
      },
      reset: () => { localElapsed = 0; },
      destroy: () => {},
    };

    return sim;
  }, [mode, incidenceAngle, speedRatio, gapWidth, wavelength]);

  // ─── Reflection ────────────────────────────────────────────────
  function drawReflection(ctx: CanvasRenderingContext2D, w: number, h: number, elapsed: number) {
    const angRad = (incidenceAngle * Math.PI) / 180;
    const wallX = w * 0.7;
    const poiY = h * 0.5;
    const waveLen = 60;
    const speed = 80;
    // Wall (barrier)
    ctx.save();
    ctx.strokeStyle = '#a78bfa';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(wallX, h * 0.1);
    ctx.lineTo(wallX, h * 0.9);
    ctx.stroke();

    // Hatching on wall
    ctx.strokeStyle = 'rgba(167,139,250,0.3)';
    ctx.lineWidth = 1;
    for (let y = h * 0.1; y < h * 0.9; y += 12) {
      ctx.beginPath();
      ctx.moveTo(wallX, y);
      ctx.lineTo(wallX - 10, y + 8);
      ctx.stroke();
    }
    ctx.restore();

    // Normal line (horizontal through POI)
    drawDashedLine(ctx, Vec2.from(wallX - w * 0.6, poiY), Vec2.from(wallX, poiY), 'rgba(167,139,250,0.3)', 1);
    drawText(ctx, 'Normal', Vec2.from(wallX - w * 0.6 + 25, poiY - 10), 'rgba(167,139,250,0.5)', 9);

    // Incident wave fronts (parallel lines approaching the wall)
    const normalDir = Vec2.from(-Math.cos(angRad), -Math.sin(angRad));
    const tangentDir = Vec2.from(-Math.sin(angRad), Math.cos(angRad));
    const numFronts = 8;
    const phaseOffset = (elapsed * speed) % waveLen;

    ctx.save();
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2;
    const poi = Vec2.from(wallX, poiY);

    for (let i = 0; i < numFronts; i++) {
      const dist = phaseOffset + i * waveLen;
      const center = poi.add(normalDir.scale(dist));
      const halfLen = Math.min(w * 0.3, 120);
      const p1 = center.add(tangentDir.scale(halfLen));
      const p2 = center.add(tangentDir.scale(-halfLen));

      if (p1.x > 0 && p1.x < wallX) {
        ctx.globalAlpha = 0.4 + 0.6 * (1 - i / numFronts);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
    ctx.restore();

    // Incident ray arrow
    const rayLen = w * 0.4;
    const rayEnd = poi.add(normalDir.scale(rayLen));
    ctx.save();
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(rayEnd.x, rayEnd.y);
    ctx.lineTo(poi.x, poi.y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
    drawText(ctx, 'Incident', Vec2.from(rayEnd.x - 10, rayEnd.y - 14), '#06b6d4', 10, 'right');

    // Reflected wave fronts
    const reflNormalDir = Vec2.from(Math.cos(angRad), -Math.sin(angRad));
    const reflTangentDir = Vec2.from(Math.sin(angRad), Math.cos(angRad));

    ctx.save();
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 2;

    for (let i = 0; i < numFronts; i++) {
      const dist = phaseOffset + i * waveLen;
      const center = poi.add(reflNormalDir.scale(dist));
      const halfLen = Math.min(w * 0.3, 120);
      const p1 = center.add(reflTangentDir.scale(halfLen));
      const p2 = center.add(reflTangentDir.scale(-halfLen));

      if (p1.x < w && p1.x > wallX) {
        ctx.globalAlpha = 0.4 + 0.6 * (1 - i / numFronts);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
    ctx.restore();

    // Reflected ray arrow
    const reflRayEnd = poi.add(reflNormalDir.scale(rayLen));
    ctx.save();
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(poi.x, poi.y);
    ctx.lineTo(reflRayEnd.x, reflRayEnd.y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
    drawText(ctx, 'Reflected', Vec2.from(reflRayEnd.x + 10, reflRayEnd.y - 14), '#ec4899', 10, 'left');

    // Angle arcs
    const arcR = 45;
    drawAngleArc(ctx, poi, arcR, -Math.PI, -Math.PI + angRad, '#06b6d4', `θᵢ=${incidenceAngle}°`);
    drawAngleArc(ctx, poi, arcR, -Math.PI - angRad, -Math.PI, '#ec4899', `θᵣ=${incidenceAngle}°`);

    // Law label
    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.beginPath();
    (ctx as any).roundRect(w * 0.02, h * 0.82, 180, 35, 6);
    ctx.fill();
    drawText(ctx, 'Law of Reflection: θᵢ = θᵣ', Vec2.from(w * 0.02 + 90, h * 0.82 + 17), '#f59e0b', 10);
    ctx.restore();
  }

  // ─── Refraction ────────────────────────────────────────────────
  function drawRefraction(ctx: CanvasRenderingContext2D, w: number, h: number, elapsed: number) {
    const boundaryX = w * 0.5;
    const angRad1 = (incidenceAngle * Math.PI) / 180;

    // Snell's law: sin(θ₂) = (v₂/v₁) * sin(θ₁) = speedRatio * sin(θ₁)
    const sinTheta2 = speedRatio * Math.sin(angRad1);
    const angRad2 = Math.asin(Math.min(1, Math.max(0, sinTheta2)));
    const refractedAngleDeg = Math.round((angRad2 * 180) / Math.PI);

    const waveLen1 = 70; // longer wavelength in faster medium
    const waveLen2 = waveLen1 * speedRatio; // shorter in slower medium
    const speed = 80;
    const poiY = h * 0.5;

    // Medium shading
    ctx.save();
    ctx.fillStyle = 'rgba(6,182,212,0.03)';
    ctx.fillRect(0, 0, boundaryX, h);
    ctx.fillStyle = 'rgba(236,72,153,0.03)';
    ctx.fillRect(boundaryX, 0, w - boundaryX, h);
    ctx.restore();

    // Boundary line
    ctx.save();
    ctx.strokeStyle = '#a78bfa';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(boundaryX, 0);
    ctx.lineTo(boundaryX, h);
    ctx.stroke();
    ctx.restore();

    // Normal line
    drawDashedLine(ctx, Vec2.from(boundaryX, 0), Vec2.from(boundaryX, h), 'rgba(167,139,250,0.25)', 1);
    drawText(ctx, 'Normal', Vec2.from(boundaryX + 8, 15), 'rgba(167,139,250,0.4)', 9, 'left');

    // Medium labels
    drawText(ctx, 'Medium 1 (faster)', Vec2.from(boundaryX * 0.5, 18), 'rgba(6,182,212,0.4)', 10);
    drawText(ctx, 'Medium 2 (slower)', Vec2.from(boundaryX + (w - boundaryX) * 0.5, 18), 'rgba(236,72,153,0.4)', 10);

    const poi = Vec2.from(boundaryX, poiY);

    // Incident wave fronts in medium 1
    const normalDir1 = Vec2.from(-Math.cos(angRad1), -Math.sin(angRad1));
    const tangentDir1 = Vec2.from(-Math.sin(angRad1), Math.cos(angRad1));
    const numFronts = 10;
    const phaseOffset1 = (elapsed * speed) % waveLen1;

    ctx.save();
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2;
    for (let i = 0; i < numFronts; i++) {
      const dist = phaseOffset1 + i * waveLen1;
      const center = poi.add(normalDir1.scale(dist));
      const halfLen = 100;
      const p1 = center.add(tangentDir1.scale(halfLen));
      const p2 = center.add(tangentDir1.scale(-halfLen));
      if (p1.x > 0 && p2.x > 0) {
        ctx.globalAlpha = 0.3 + 0.7 * (1 - i / numFronts);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
    ctx.restore();

    // Incident ray
    const rayLen = w * 0.35;
    const rayEnd1 = poi.add(normalDir1.scale(rayLen));
    ctx.save();
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(rayEnd1.x, rayEnd1.y);
    ctx.lineTo(poi.x, poi.y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
    drawText(ctx, 'Incident ray', Vec2.from(rayEnd1.x - 8, rayEnd1.y - 12), '#06b6d4', 10, 'right');

    // Refracted wave fronts in medium 2
    const normalDir2 = Vec2.from(Math.cos(angRad2), Math.sin(angRad2));
    const tangentDir2 = Vec2.from(-Math.sin(angRad2), Math.cos(angRad2));
    const phaseOffset2 = (elapsed * speed * speedRatio) % waveLen2;

    ctx.save();
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 2;
    for (let i = 0; i < numFronts; i++) {
      const dist = phaseOffset2 + i * waveLen2;
      const center = poi.add(normalDir2.scale(dist));
      const halfLen = 100;
      const p1 = center.add(tangentDir2.scale(halfLen));
      const p2 = center.add(tangentDir2.scale(-halfLen));
      if (p1.x < w && p2.x < w) {
        ctx.globalAlpha = 0.3 + 0.7 * (1 - i / numFronts);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
    ctx.restore();

    // Refracted ray
    const rayEnd2 = poi.add(normalDir2.scale(rayLen));
    ctx.save();
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(poi.x, poi.y);
    ctx.lineTo(rayEnd2.x, rayEnd2.y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
    drawText(ctx, 'Refracted ray', Vec2.from(rayEnd2.x + 8, rayEnd2.y - 12), '#ec4899', 10, 'left');

    // Angle arcs
    const arcR = 45;
    drawAngleArc(ctx, poi, arcR, -Math.PI / 2 - angRad1, -Math.PI / 2, '#06b6d4', `θ₁=${incidenceAngle}°`);
    drawAngleArc(ctx, poi, arcR, -Math.PI / 2, -Math.PI / 2 + angRad2, '#ec4899', `θ₂=${refractedAngleDeg}°`);

    // Snell's law label
    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.beginPath();
    (ctx as any).roundRect(w * 0.02, h * 0.82, 220, 35, 6);
    ctx.fill();
    const n1 = (1).toFixed(2);
    const n2 = (1 / speedRatio).toFixed(2);
    drawText(ctx, `n₁=${n1} sinθ₁ = n₂=${n2} sinθ₂`, Vec2.from(w * 0.02 + 110, h * 0.82 + 17), '#f59e0b', 9);
    ctx.restore();
  }

  // ─── Diffraction ───────────────────────────────────────────────
  function drawDiffraction(ctx: CanvasRenderingContext2D, w: number, h: number, elapsed: number) {
    const barrierY = h * 0.5;
    const gapCenter = w * 0.4;
    const gapHalf = gapWidth / 2;
    const waveLen2 = wavelength;
    const speed = 60;

    // Barrier lines (top and bottom with gap)
    ctx.save();
    ctx.strokeStyle = '#a78bfa';
    ctx.lineWidth = 4;

    // Top barrier
    ctx.beginPath();
    ctx.moveTo(gapCenter - 150, barrierY - gapHalf);
    ctx.lineTo(gapCenter + 150, barrierY - gapHalf);
    ctx.stroke();

    // Bottom barrier
    ctx.beginPath();
    ctx.moveTo(gapCenter - 150, barrierY + gapHalf);
    ctx.lineTo(gapCenter + 150, barrierY + gapHalf);
    ctx.stroke();

    // Hatching
    ctx.strokeStyle = 'rgba(167,139,250,0.2)';
    ctx.lineWidth = 1;
    for (let x = gapCenter - 150; x < gapCenter + 150; x += 10) {
      ctx.beginPath();
      ctx.moveTo(x, barrierY - gapHalf);
      ctx.lineTo(x + 6, barrierY - gapHalf - 8);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, barrierY + gapHalf);
      ctx.lineTo(x + 6, barrierY + gapHalf + 8);
      ctx.stroke();
    }
    ctx.restore();

    // Gap label
    drawText(ctx, 'Gap', Vec2.from(gapCenter, barrierY - gapHalf - 14), '#a78bfa', 10);
    drawText(ctx, `w = ${gapWidth}px`, Vec2.from(gapCenter, barrierY + gapHalf + 16), '#a78bfa', 9);

    // Incident plane wave fronts (vertical lines moving right)
    const numFronts = 12;
    const phaseOffset = (elapsed * speed) % waveLen2;

    ctx.save();
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2;
    for (let i = 0; i < numFronts; i++) {
      const x = gapCenter - 20 - phaseOffset - i * waveLen2;
      if (x > 20 && x < gapCenter - 5) {
        ctx.globalAlpha = 0.3 + 0.7 * (1 - i / numFronts);
        ctx.beginPath();
        ctx.moveTo(x, barrierY - gapHalf - 60);
        ctx.lineTo(x, barrierY - gapHalf - 5);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, barrierY + gapHalf + 5);
        ctx.lineTo(x, barrierY + gapHalf + 60);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
    ctx.restore();

    // Incident direction arrow
    ctx.save();
    ctx.strokeStyle = 'rgba(6,182,212,0.4)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(gapCenter - 140, barrierY);
    ctx.lineTo(gapCenter - 30, barrierY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
    drawText(ctx, '→ Incident', Vec2.from(gapCenter - 100, barrierY - 10), 'rgba(6,182,212,0.5)', 9);

    // Diffracted circular wave fronts emerging from the gap
    const circleSpeed = speed;
    const maxRadius = w * 0.6;
    const numCircles = 10;

    ctx.save();
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 2;

    const phaseOffsetC = (elapsed * circleSpeed) % waveLen2;

    for (let i = 0; i < numCircles; i++) {
      const r = phaseOffsetC + i * waveLen2;
      if (r > 5 && r < maxRadius) {
        ctx.globalAlpha = 0.2 + 0.6 * (1 - i / numCircles);

        // Only draw the arcs that are beyond the gap (right side)
        // and not blocked by the barriers
        ctx.beginPath();

        // Calculate the angular extent that passes through the gap
        const gapAngle = Math.asin(Math.min(1, gapHalf / Math.max(r, gapHalf)));
        const startAngle = -gapAngle;
        const endAngle = gapAngle;

        ctx.arc(gapCenter, barrierY, r, startAngle, endAngle);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
    ctx.restore();

    // Diffraction label
    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.beginPath();
    (ctx as any).roundRect(w * 0.55, h * 0.05, 200, 50, 6);
    ctx.fill();
    drawText(ctx, 'Diffraction', Vec2.from(w * 0.55 + 100, h * 0.05 + 14), '#ec4899', 11);
    drawText(ctx, 'Wave spreads through gap', Vec2.from(w * 0.55 + 100, h * 0.05 + 32), '#999', 9);
    ctx.restore();

    // Wavelength label
    drawText(ctx, `λ = ${wavelength}px`, Vec2.from(w * 0.02, h - 18), '#06b6d4', 10, 'left');

    // Spreading indicator
    const spreadRatio = gapWidth / wavelength;
    const spreadText = spreadRatio < 1.5 ? 'Large spreading' : spreadRatio < 3 ? 'Moderate spreading' : 'Small spreading';
    const spreadColor = spreadRatio < 1.5 ? '#f59e0b' : spreadRatio < 3 ? '#ec4899' : '#06b6d4';
    drawText(ctx, `gap/λ = ${spreadRatio.toFixed(1)} — ${spreadText}`, Vec2.from(w * 0.02, h - 36), spreadColor, 10, 'left');
  }

  // ─── Dynamic sliders based on mode ─────────────────────────────
  const sliders: SliderConfig[] = mode === 'reflection'
    ? [{ label: 'Angle θᵢ', min: 10, max: 80, step: 1, value: incidenceAngle, onChange: setIncidenceAngle, unit: '°', color: '#06b6d4' }]
    : mode === 'refraction'
      ? [
        { label: 'Angle θ₁', min: 10, max: 80, step: 1, value: incidenceAngle, onChange: setIncidenceAngle, unit: '°', color: '#06b6d4' },
        { label: 'Speed ratio (v₂/v₁)', min: 0.3, max: 1.0, step: 0.05, value: speedRatio, onChange: setSpeedRatio, unit: '', color: '#ec4899' },
      ]
      : [
        { label: 'Gap width', min: 20, max: 200, step: 5, value: gapWidth, onChange: setGapWidth, unit: 'px', color: '#a78bfa' },
        { label: 'Wavelength', min: 30, max: 150, step: 5, value: wavelength, onChange: setWavelength, unit: 'px', color: '#06b6d4' },
      ];

  return (
    <div className="space-y-4">
      <PhysicsCanvas createSimulation={createSim} aspectRatio={16 / 10} sliders={sliders} />

      <div className="flex items-center gap-2">
        {(['reflection', 'refraction', 'diffraction'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
              mode === m
                ? 'bg-brand-purple/20 text-brand-purple'
                : 'bg-white/5 text-gray-500 hover:bg-white/10'
            }`}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
}
