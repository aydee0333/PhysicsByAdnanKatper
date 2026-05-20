import { useState, useCallback, useRef } from 'react';
import PhysicsCanvas from '../simulation/PhysicsCanvas';
import type { SimulationFactory, SimulationInstance, SimulationState, SimulationConfig } from '../../simulation/types';
import type { SliderConfig } from '../../simulation/types';

export default function WaveInterferenceSim() {
  const [frequency, setFrequency] = useState(2);
  const [wavelength, setWavelength] = useState(50);
  const [separation, setSeparation] = useState(150);
  const [showField, setShowField] = useState(true);
  const [singleSource, setSingleSource] = useState(false);

  const offscreenRef = useRef<HTMLCanvasElement | null>(null);

  const createSim: SimulationFactory = useCallback((_ctx, config) => {
    // Offscreen canvas for wave field (half resolution for perf)
    const scale = 2;
    const w = Math.ceil(config.width / scale);
    const h = Math.ceil(config.height / scale);
    const off = document.createElement('canvas');
    off.width = w;
    off.height = h;
    offscreenRef.current = off;

    const sim: SimulationInstance = {
      init: () => {},
      update: (_state: SimulationState) => {},
      draw: (ctx: CanvasRenderingContext2D, cfg: SimulationConfig) => {
        const cw = cfg.width;
        const ch = cfg.height;
        ctx.clearRect(0, 0, cw, ch);

        // Source positions
        const cx = cw / 2;
        const cy = ch / 2;
        const halfSep = separation / 2;
        const s1x = singleSource ? cx : cx - halfSep;
        const s1y = cy;
        const s2x = cx + halfSep;
        const s2y = cy;

        // Wave params
        const k = (2 * Math.PI) / Math.max(wavelength, 1);
        const omega = 2 * Math.PI * frequency;
        const t = performance.now() / 1000;

        // Draw wave field via offscreen ImageData
        if (showField && offscreenRef.current) {
          const offCtx = offscreenRef.current.getContext('2d');
          if (offCtx) {
            const ow = offscreenRef.current.width;
            const oh = offscreenRef.current.height;
            const imageData = offCtx.createImageData(ow, oh);
            const data = imageData.data;

            for (let py = 0; py < oh; py++) {
              for (let px = 0; px < ow; px++) {
                const wx = px * scale;
                const wy = py * scale;

                const dx1 = wx - s1x;
                const dy1 = wy - s1y;
                const r1 = Math.sqrt(dx1 * dx1 + dy1 * dy1) + 0.01;
                const w1 = (1 / Math.sqrt(r1)) * Math.sin(k * r1 - omega * t);

                let total = w1;
                if (!singleSource) {
                  const dx2 = wx - s2x;
                  const dy2 = wy - s2y;
                  const r2 = Math.sqrt(dx2 * dx2 + dy2 * dy2) + 0.01;
                  const w2 = (1 / Math.sqrt(r2)) * Math.sin(k * r2 - omega * t);
                  total += w2;
                }

                // Normalize and map to color
                const amp = Math.min(Math.abs(total) * 15, 1);
                const idx = (py * ow + px) * 4;

                if (total > 0.02) {
                  // Positive → cyan
                  data[idx] = 0;
                  data[idx + 1] = Math.round(180 * amp);
                  data[idx + 2] = Math.round(220 * amp);
                  data[idx + 3] = Math.round(200 * amp);
                } else if (total < -0.02) {
                  // Negative → purple
                  data[idx] = Math.round(140 * amp);
                  data[idx + 1] = Math.round(50 * amp);
                  data[idx + 2] = Math.round(200 * amp);
                  data[idx + 3] = Math.round(200 * amp);
                } else {
                  // Near zero → dark
                  data[idx] = 10;
                  data[idx + 1] = 10;
                  data[idx + 2] = 20;
                  data[idx + 3] = 80;
                }
              }
            }

            offCtx.putImageData(imageData, 0, 0);
            ctx.drawImage(offscreenRef.current, 0, 0, cw, ch);
          }
        }

        // Draw nodal lines (destructive interference curves)
        if (!singleSource && showField) {
          ctx.save();
          ctx.strokeStyle = 'rgba(255,255,255,0.25)';
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          // Nodal lines where path difference = (n+0.5)*lambda
          for (let n = 0; n < 5; n++) {
            const delta = (n + 0.5) * wavelength;
            // Hyperbola: |r1 - r2| = delta
            ctx.beginPath();
            let started = false;
            for (let angle = -Math.PI / 2 + 0.05; angle < Math.PI / 2 - 0.05; angle += 0.02) {
              // Parametric hyperbola approximation
              const d = separation;
              if (delta >= d) break;
              const a = delta / 2;
              const b = Math.sqrt((d / 2) * (d / 2) - a * a);
              const t_val = Math.tan(angle);
              const x = a * Math.sqrt(1 + t_val * t_val);
              const y = b * t_val;
              const sx = cx + x;
              const sy = cy + y;
              if (sx < 0 || sx > cw || sy < 0 || sy > ch) continue;
              if (!started) { ctx.moveTo(sx, sy); started = true; }
              else ctx.lineTo(sx, sy);
            }
            ctx.stroke();

            // Mirror on the other side
            ctx.beginPath();
            started = false;
            for (let angle = -Math.PI / 2 + 0.05; angle < Math.PI / 2 - 0.05; angle += 0.02) {
              const d = separation;
              if (delta >= d) break;
              const a = delta / 2;
              const b = Math.sqrt((d / 2) * (d / 2) - a * a);
              const t_val = Math.tan(angle);
              const x = a * Math.sqrt(1 + t_val * t_val);
              const y = b * t_val;
              const sx = cx - x;
              const sy = cy + y;
              if (sx < 0 || sx > cw || sy < 0 || sy > ch) continue;
              if (!started) { ctx.moveTo(sx, sy); started = true; }
              else ctx.lineTo(sx, sy);
            }
            ctx.stroke();
          }
          ctx.setLineDash([]);
          ctx.restore();
        }

        // Dashed line between sources
        if (!singleSource) {
          ctx.save();
          ctx.setLineDash([6, 4]);
          ctx.strokeStyle = 'rgba(255,255,255,0.2)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(s1x, s1y);
          ctx.lineTo(s2x, s2y);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.restore();

          // Separation label
          const sepLabel = `d = ${separation.toFixed(0)} px`;
          ctx.font = '11px sans-serif';
          ctx.fillStyle = 'rgba(255,255,255,0.5)';
          ctx.textAlign = 'center';
          ctx.fillText(sepLabel, cx, cy + 16);
        }

        // Source 1
        const pulse1 = 0.5 + 0.5 * Math.sin(omega * t);
        const r1 = 6 + 4 * pulse1;
        ctx.beginPath();
        ctx.arc(s1x, s1y, r1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 220, 255, ${0.6 + 0.4 * pulse1})`;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Source 2
        if (!singleSource) {
          const pulse2 = 0.5 + 0.5 * Math.sin(omega * t);
          const r2 = 6 + 4 * pulse2;
          ctx.beginPath();
          ctx.arc(s2x, s2y, r2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 220, 255, ${0.6 + 0.4 * pulse2})`;
          ctx.fill();
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Info display
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        const infoX = 12;
        let infoY = 20;
        ctx.fillText(`\u03BB = ${wavelength.toFixed(0)} px`, infoX, infoY);
        infoY += 18;
        ctx.fillText(`f = ${frequency.toFixed(1)} Hz`, infoX, infoY);
        infoY += 18;
        if (!singleSource) {
          const pathDiff = 0; // At center point
          ctx.fillText(`Path diff at center: ${pathDiff.toFixed(1)}`, infoX, infoY);
        }

        // Labels
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(0, 220, 255, 0.6)';
        ctx.fillText('S\u2081', s1x, s1y - 14);
        if (!singleSource) {
          ctx.fillText('S\u2082', s2x, s2y - 14);
        }
      },
      reset: () => {},
      destroy: () => {
        offscreenRef.current = null;
      },
    };

    return sim;
  }, [frequency, wavelength, separation, showField, singleSource]);

  const sliders: SliderConfig[] = [
    { label: 'Frequency', min: 0.5, max: 5, step: 0.1, value: frequency, onChange: setFrequency, unit: 'Hz', color: '#06b6d4' },
    { label: 'Wavelength', min: 20, max: 100, step: 1, value: wavelength, onChange: setWavelength, unit: 'px', color: '#a78bfa' },
    { label: 'Separation', min: 50, max: 300, step: 5, value: separation, onChange: setSeparation, unit: 'px', color: '#f59e0b' },
  ];

  return (
    <div className="space-y-4">
      <PhysicsCanvas
        createSimulation={createSim}
        aspectRatio={16 / 10}
        sliders={sliders}
      />

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            checked={showField}
            onChange={(e) => setShowField(e.target.checked)}
            className="rounded accent-brand-cyan"
          />
          Show wave field
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            checked={singleSource}
            onChange={(e) => setSingleSource(e.target.checked)}
            className="rounded accent-brand-cyan"
          />
          Single source mode
        </label>
      </div>
    </div>
  );
}
