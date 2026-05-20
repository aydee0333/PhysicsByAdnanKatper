import { useState, useCallback } from 'react';
import PhysicsCanvas from '../simulation/PhysicsCanvas';
import type { SimulationFactory, SimulationInstance, SimulationState, SimulationConfig, SliderConfig } from '../../simulation/types';
import { Vec2, drawGrid, drawText, drawArrow, drawDashedLine, drawCircle } from '../../simulation/physics';

export default function TransverseLongitudinalSim() {
  const [frequency, setFrequency] = useState(1.5);
  const [amplitude, setAmplitude] = useState(40);
  const [wavelength, setWavelength] = useState(200);

  const timePeriod = 1 / frequency;
  const waveSpeed = frequency * wavelength;

  const createSim: SimulationFactory = useCallback((_ctx, _config) => {
    let elapsed = 0;

    const sim: SimulationInstance = {
      init: () => { elapsed = 0; },
      update: (state: SimulationState) => {
        elapsed += state.dt;
      },
      draw: (ctx: CanvasRenderingContext2D, cfg: SimulationConfig) => {
        const w = cfg.width;
        const h = cfg.height;
        ctx.clearRect(0, 0, w, h);
        drawGrid(ctx, w, h, 40, 'rgba(255,255,255,0.03)');

        const midX = w / 2;
        const margin = 30;
        const centerY = h / 2;

        const k = (2 * Math.PI) / wavelength;
        const omega = 2 * Math.PI * frequency;

        // ── Vertical divider ──
        ctx.save();
        ctx.strokeStyle = 'rgba(255,255,255,0.12)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(midX, margin);
        ctx.lineTo(midX, h - margin);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        // ══════════════════════════════════════════
        // LEFT PANEL — TRANSVERSE WAVE
        // ══════════════════════════════════════════
        const leftW = midX - margin;
        const leftCenterY = centerY;
        const waveLeft = margin;
        const waveRight = leftW;

        // Header
        drawText(ctx, 'TRANSVERSE WAVE', Vec2.from((waveLeft + waveRight) / 2, 22), '#06b6d4', 12);
        drawText(ctx, '\u2195 Perpendicular vibration', Vec2.from((waveLeft + waveRight) / 2, 38), 'rgba(6,182,212,0.6)', 10);

        // Equilibrium line
        ctx.save();
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(waveLeft, leftCenterY);
        ctx.lineTo(waveRight, leftCenterY);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        // Draw sine wave
        ctx.save();
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let px = 0; px <= waveRight - waveLeft; px += 2) {
          const x = waveLeft + px;
          const y = leftCenterY - amplitude * Math.sin(k * px - omega * elapsed);
          px === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.restore();

        // Particles on the wave (dots that move only vertically)
        const numParticles = 18;
        const particleSpacing = (waveRight - waveLeft) / numParticles;
        for (let i = 0; i <= numParticles; i++) {
          const baseX = waveLeft + i * particleSpacing;
          const displacement = amplitude * Math.sin(k * (baseX - waveLeft) - omega * elapsed);
          const py = leftCenterY - displacement;

          // Vertical motion trail
          ctx.save();
          ctx.strokeStyle = 'rgba(6,182,212,0.15)';
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 2]);
          ctx.beginPath();
          ctx.moveTo(baseX, leftCenterY - amplitude);
          ctx.lineTo(baseX, leftCenterY + amplitude);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.restore();

          // Particle dot
          drawCircle(ctx, Vec2.from(baseX, py), 3, '#06b6d4', 'rgba(6,182,212,0.5)');
        }

        // Highlight one particle with arrow showing motion
        const highlightIdx = 5;
        const hlBaseX = waveLeft + highlightIdx * particleSpacing;
        const hlDisp = amplitude * Math.sin(k * (hlBaseX - waveLeft) - omega * elapsed);
        const hlY = leftCenterY - hlDisp;
        const velocity = -amplitude * omega * Math.cos(k * (hlBaseX - waveLeft) - omega * elapsed);
        const arrowLen = Math.min(Math.abs(velocity) * 0.3, 30) * Math.sign(velocity);
        drawArrow(ctx, Vec2.from(hlBaseX + 10, hlY), Vec2.from(hlBaseX + 10, hlY + arrowLen), '#f59e0b', 2, 6);
        drawText(ctx, 'particle moves \u2195', Vec2.from(hlBaseX + 10, hlY + arrowLen + 14 * Math.sign(arrowLen)), 'rgba(245,158,11,0.7)', 8);

        // ── Crest & Trough labels ──
        // Find first crest (max) in visible range
        const crestX = waveLeft + (Math.PI / 2 + omega * elapsed / k) % wavelength;
        if (crestX >= waveLeft && crestX <= waveRight) {
          const crestY = leftCenterY - amplitude;
          drawCircle(ctx, Vec2.from(crestX, crestY), 4, 'transparent', '#a78bfa');
          ctx.save();
          ctx.fillStyle = '#a78bfa';
          ctx.font = '10px "Inter", system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('Crest', crestX, crestY - 12);
          ctx.restore();
        }

        // Find first trough in visible range
        const troughX = waveLeft + ((3 * Math.PI / 2 + omega * elapsed / k) % wavelength);
        if (troughX >= waveLeft && troughX <= waveRight) {
          const troughY = leftCenterY + amplitude;
          drawCircle(ctx, Vec2.from(troughX, troughY), 4, 'transparent', '#a78bfa');
          ctx.save();
          ctx.fillStyle = '#a78bfa';
          ctx.font = '10px "Inter", system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('Trough', troughX, troughY + 14);
          ctx.restore();
        }

        // ── Amplitude indicator ──
        const ampX = waveLeft + 20;
        drawDashedLine(ctx, Vec2.from(ampX, leftCenterY), Vec2.from(ampX, leftCenterY - amplitude), 'rgba(6,182,212,0.4)', 1);
        // Double-headed arrow
        ctx.save();
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(ampX - 4, leftCenterY);
        ctx.lineTo(ampX + 4, leftCenterY);
        ctx.moveTo(ampX - 4, leftCenterY - amplitude);
        ctx.lineTo(ampX + 4, leftCenterY - amplitude);
        ctx.stroke();
        ctx.restore();
        drawText(ctx, 'A', Vec2.from(ampX + 12, leftCenterY - amplitude / 2), '#06b6d4', 12);

        // ── Wavelength indicator ──
        const wlY = leftCenterY + amplitude + 30;
        const wlStart = waveLeft + ((omega * elapsed / k) % wavelength);
        const wlEnd = wlStart + wavelength;
        if (wlEnd <= waveRight + 5) {
          ctx.save();
          ctx.strokeStyle = '#a78bfa';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(wlStart, wlY);
          ctx.lineTo(wlEnd, wlY);
          ctx.stroke();
          // Ticks
          ctx.beginPath();
          ctx.moveTo(wlStart, wlY - 4);
          ctx.lineTo(wlStart, wlY + 4);
          ctx.moveTo(wlEnd, wlY - 4);
          ctx.lineTo(wlEnd, wlY + 4);
          ctx.stroke();
          ctx.restore();
          drawText(ctx, '\u03BB', Vec2.from((wlStart + wlEnd) / 2, wlY + 14), '#a78bfa', 12);
        }

        // ══════════════════════════════════════════
        // RIGHT PANEL — LONGITUDINAL WAVE
        // ══════════════════════════════════════════
        const rightStart = midX + margin;
        const rightEnd = w - margin;
        const rightCenterY = centerY;
        const rightWidth = rightEnd - rightStart;

        // Header
        drawText(ctx, 'LONGITUDINAL WAVE', Vec2.from((rightStart + rightEnd) / 2, 22), '#ec4899', 12);
        drawText(ctx, '\u2194 Parallel vibration', Vec2.from((rightStart + rightEnd) / 2, 38), 'rgba(236,72,153,0.6)', 10);

        // Equilibrium line
        ctx.save();
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(rightStart, rightCenterY);
        ctx.lineTo(rightEnd, rightCenterY);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        // Draw longitudinal dots
        const numDots = 25;
        const dotSpacing = rightWidth / (numDots + 1);
        // Use smaller amplitude for longitudinal displacement so dots don't overlap weirdly
        const longAmplitude = amplitude * 0.4;

        const dotPositions: number[] = [];
        for (let i = 0; i < numDots; i++) {
          const baseX = rightStart + (i + 1) * dotSpacing;
          const displacement = longAmplitude * Math.sin(k * baseX - omega * elapsed);
          const dx = baseX + displacement;
          dotPositions.push(dx);

          // Dot
          drawCircle(ctx, Vec2.from(dx, rightCenterY), 5, '#ec4899', 'rgba(236,72,153,0.4)');

          // Horizontal motion trail
          ctx.save();
          ctx.strokeStyle = 'rgba(236,72,153,0.1)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(baseX - longAmplitude, rightCenterY);
          ctx.lineTo(baseX + longAmplitude, rightCenterY);
          ctx.stroke();
          ctx.restore();

          // Small motion arrow for a few dots
          if (i % 4 === 2) {
            const vel = -longAmplitude * omega * Math.cos(k * baseX - omega * elapsed);
            const aLen = Math.min(Math.abs(vel) * 0.15, 15) * Math.sign(vel);
            drawArrow(ctx, Vec2.from(dx, rightCenterY + 12), Vec2.from(dx + aLen, rightCenterY + 12), 'rgba(236,72,153,0.5)', 1.5, 5);
          }
        }

        // ── Compression & Rarefaction labels ──
        // Compression: where dots are densest (displacement gradient is negative)
        // Find regions of high density by looking at dot spacing
        let minSpacing = Infinity;
        let maxSpacing = 0;
        let compressionIdx = 0;
        let rarefactionIdx = 0;

        for (let i = 1; i < dotPositions.length; i++) {
          const sp = dotPositions[i] - dotPositions[i - 1];
          if (sp < minSpacing) { minSpacing = sp; compressionIdx = i - 1; }
          if (sp > maxSpacing) { maxSpacing = sp; rarefactionIdx = i - 1; }
        }

        // Compression label
        const compX = (dotPositions[compressionIdx] + dotPositions[compressionIdx + 1]) / 2;
        ctx.save();
        ctx.strokeStyle = 'rgba(236,72,153,0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(compX, rightCenterY - 35);
        ctx.lineTo(compX, rightCenterY - 15);
        ctx.stroke();
        // bracket
        const bracketLeft = dotPositions[compressionIdx] - 5;
        const bracketRight = dotPositions[Math.min(compressionIdx + 2, dotPositions.length - 1)] + 5;
        ctx.beginPath();
        ctx.moveTo(bracketLeft, rightCenterY - 35);
        ctx.lineTo(bracketRight, rightCenterY - 35);
        ctx.stroke();
        ctx.restore();
        drawText(ctx, 'Compression', Vec2.from((bracketLeft + bracketRight) / 2, rightCenterY - 45), '#ec4899', 9);
        drawText(ctx, '(high pressure)', Vec2.from((bracketLeft + bracketRight) / 2, rightCenterY - 56), 'rgba(236,72,153,0.6)', 8);

        // Rarefaction label
        const rareX = (dotPositions[rarefactionIdx] + dotPositions[rarefactionIdx + 1]) / 2;
        ctx.save();
        ctx.strokeStyle = 'rgba(236,72,153,0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(rareX, rightCenterY + 15);
        ctx.lineTo(rareX, rightCenterY + 35);
        ctx.stroke();
        const rareLeft = dotPositions[rarefactionIdx] - 5;
        const rareRight = dotPositions[Math.min(rarefactionIdx + 2, dotPositions.length - 1)] + 5;
        ctx.beginPath();
        ctx.moveTo(rareLeft, rightCenterY + 35);
        ctx.lineTo(rareRight, rightCenterY + 35);
        ctx.stroke();
        ctx.restore();
        drawText(ctx, 'Rarefaction', Vec2.from((rareLeft + rareRight) / 2, rightCenterY + 47), '#ec4899', 9);
        drawText(ctx, '(low pressure)', Vec2.from((rareLeft + rareRight) / 2, rightCenterY + 58), 'rgba(236,72,153,0.6)', 8);

        // ── Wavelength indicator for longitudinal ──
        const longWlY = rightCenterY + 75;
        // Mark between two compression peaks (approx one wavelength apart)
        const wlMarkStart = compX;
        const wlMarkEnd = compX + wavelength;
        if (wlMarkEnd <= rightEnd + 5) {
          ctx.save();
          ctx.strokeStyle = '#a78bfa';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(wlMarkStart, longWlY);
          ctx.lineTo(wlMarkEnd, longWlY);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(wlMarkStart, longWlY - 4);
          ctx.lineTo(wlMarkStart, longWlY + 4);
          ctx.moveTo(wlMarkEnd, longWlY - 4);
          ctx.lineTo(wlMarkEnd, longWlY + 4);
          ctx.stroke();
          ctx.restore();
          drawText(ctx, '\u03BB', Vec2.from((wlMarkStart + wlMarkEnd) / 2, longWlY + 14), '#a78bfa', 12);
        }
      },
      reset: () => { elapsed = 0; },
      destroy: () => {},
    };

    return sim;
  }, [frequency, amplitude, wavelength]);

  const sliders: SliderConfig[] = [
    { label: 'Frequency', min: 0.5, max: 4, step: 0.1, value: frequency, onChange: setFrequency, unit: 'Hz', color: '#f59e0b' },
    { label: 'Amplitude', min: 10, max: 80, step: 5, value: amplitude, onChange: setAmplitude, unit: 'px', color: '#06b6d4' },
    { label: 'Wavelength', min: 100, max: 400, step: 10, value: wavelength, onChange: setWavelength, unit: 'px', color: '#a78bfa' },
  ];

  return (
    <div className="space-y-4">
      <PhysicsCanvas createSimulation={createSim} aspectRatio={16 / 10} sliders={sliders} />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
        <div className="bg-white/5 rounded-lg p-2.5">
          <span className="text-gray-400 text-xs">Frequency (f)</span>
          <div className="text-amber-400 font-medium">{frequency} Hz</div>
        </div>
        <div className="bg-white/5 rounded-lg p-2.5">
          <span className="text-gray-400 text-xs">Time Period (T = 1/f)</span>
          <div className="text-amber-400 font-medium">{timePeriod.toFixed(2)} s</div>
        </div>
        <div className="bg-white/5 rounded-lg p-2.5">
          <span className="text-gray-400 text-xs">Wavelength (&lambda;)</span>
          <div className="text-amber-400 font-medium">{wavelength} px</div>
        </div>
        <div className="bg-white/5 rounded-lg p-2.5">
          <span className="text-gray-400 text-xs">Wave Speed (v = f&lambda;)</span>
          <div className="text-amber-400 font-medium">{waveSpeed.toFixed(0)} px/s</div>
        </div>
      </div>
    </div>
  );
}
