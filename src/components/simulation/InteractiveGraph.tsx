import { useEffect, useRef } from 'react';
import { cn } from '../../utils/cn';

interface DataPoint {
  x: number;
  y: number;
}

interface PlotLine {
  data: DataPoint[];
  color: string;
  label?: string;
}

interface InteractiveGraphProps {
  xLabel?: string;
  yLabel?: string;
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
  lines: PlotLine[];
  className?: string;
  aspectRatio?: number;
}

export default function InteractiveGraph({
  xLabel = 'x',
  yLabel = 'y',
  xMin = 0,
  xMax = 10,
  yMin = -1,
  yMax = 1,
  lines,
  className,
  aspectRatio = 16 / 9,
}: InteractiveGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const margin = { top: 20, right: 20, bottom: 35, left: 45 };
    const plotW = w - margin.left - margin.right;
    const plotH = h - margin.top - margin.bottom;

    ctx.clearRect(0, 0, w, h);

    // Background
    ctx.fillStyle = 'rgba(255,255,255,0.02)';
    ctx.fillRect(margin.left, margin.top, plotW, plotH);

    // Grid lines
    const gridColor = 'rgba(255,255,255,0.06)';
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 0.5;

    const xSteps = 5;
    const ySteps = 5;
    for (let i = 0; i <= xSteps; i++) {
      const x = margin.left + (i / xSteps) * plotW;
      ctx.beginPath();
      ctx.moveTo(x, margin.top);
      ctx.lineTo(x, margin.top + plotH);
      ctx.stroke();
    }
    for (let i = 0; i <= ySteps; i++) {
      const y = margin.top + (i / ySteps) * plotH;
      ctx.beginPath();
      ctx.moveTo(margin.left, y);
      ctx.lineTo(margin.left + plotW, y);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1;
    // X axis at y=0 or bottom
    const zeroY = yMin >= 0 ? margin.top + plotH : margin.top + ((0 - yMin) / (yMax - yMin)) * plotH;
    ctx.beginPath();
    ctx.moveTo(margin.left, zeroY);
    ctx.lineTo(margin.left + plotW, zeroY);
    ctx.stroke();
    // Y axis at x=0 or left
    const zeroX = xMin >= 0 ? margin.left : margin.left + ((0 - xMin) / (xMax - xMin)) * plotW;
    ctx.beginPath();
    ctx.moveTo(zeroX, margin.top);
    ctx.lineTo(zeroX, margin.top + plotH);
    ctx.stroke();

    // Tick labels
    ctx.fillStyle = '#666';
    ctx.font = '10px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (let i = 0; i <= xSteps; i++) {
      const val = xMin + (i / xSteps) * (xMax - xMin);
      const x = margin.left + (i / xSteps) * plotW;
      ctx.fillText(val.toFixed(1), x, margin.top + plotH + 5);
    }
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let i = 0; i <= ySteps; i++) {
      const val = yMin + (i / ySteps) * (yMax - yMin);
      const y = margin.top + plotH - (i / ySteps) * plotH;
      ctx.fillText(val.toFixed(1), margin.left - 5, y);
    }

    // Axis labels
    ctx.fillStyle = '#888';
    ctx.font = '11px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(xLabel, margin.left + plotW / 2, h - 12);
    ctx.save();
    ctx.translate(12, margin.top + plotH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(yLabel, 0, 0);
    ctx.restore();

    // Plot lines
    const toPixelX = (val: number) => margin.left + ((val - xMin) / (xMax - xMin)) * plotW;
    const toPixelY = (val: number) => margin.top + plotH - ((val - yMin) / (yMax - yMin)) * plotH;

    for (const line of lines) {
      if (line.data.length < 2) continue;

      ctx.strokeStyle = line.color;
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';
      ctx.beginPath();

      let started = false;
      for (const point of line.data) {
        const px = toPixelX(point.x);
        const py = toPixelY(point.y);
        if (!started) {
          ctx.moveTo(px, py);
          started = true;
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.stroke();
    }

    // Legend
    const legendItems = lines.filter((l) => l.label);
    if (legendItems.length > 0) {
      let lx = margin.left + 10;
      const ly = margin.top + 10;
      for (const item of legendItems) {
        ctx.fillStyle = item.color;
        ctx.fillRect(lx, ly, 12, 3);
        ctx.fillStyle = '#888';
        ctx.font = '10px Inter, system-ui, sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.label!, lx + 16, ly + 1.5);
        lx += ctx.measureText(item.label!).width + 30;
      }
    }
  }, [lines, xLabel, yLabel, xMin, xMax, yMin, yMax]);

  return (
    <div
      className={cn(
        'rounded-xl border border-white/10 bg-black/40 overflow-hidden',
        className
      )}
      style={{ aspectRatio }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
