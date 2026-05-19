import { useState, useCallback, useRef } from 'react';
import PhysicsCanvas from '../simulation/PhysicsCanvas';
import type {
  SimulationFactory,
  SimulationInstance,
  SimulationState,
  SimulationConfig,
  SimInputState,
  SliderConfig,
} from '../../simulation/types';
import {
  Vec2,
  drawGrid,
  drawCircle,
  drawText,
  drawDashedLine,
  degToRad,
} from '../../simulation/physics';

// --- Types ---

type ElementType =
  | 'convex-lens'
  | 'concave-lens'
  | 'plane-mirror'
  | 'concave-mirror'
  | 'convex-mirror';

interface OpticalElement {
  id: number;
  type: ElementType;
  x: number;
  focalLength: number; // px, positive for converging, negative for diverging
}

interface RaySegment {
  from: Vec2;
  to: Vec2;
}

// --- Constants ---

const MAX_BOUNCES = 6;
const RAY_LENGTH_LIMIT = 3000;
const ELEMENT_HALF_HEIGHT = 60;
const HIT_TOLERANCE = 12;

const ELEMENT_LABELS: Record<ElementType, string> = {
  'convex-lens': 'Convex',
  'concave-lens': 'Concave',
  'plane-mirror': 'Plane',
  'concave-mirror': 'C.Mirror',
  'convex-mirror': 'V.Mirror',
};

const ELEMENT_COLORS: Record<ElementType, string> = {
  'convex-lens': '#22d3ee',
  'concave-lens': '#38bdf8',
  'plane-mirror': '#a78bfa',
  'concave-mirror': '#c084fc',
  'convex-mirror': '#818cf8',
};

// --- Ray Tracing ---

function traceRays(
  sourceX: number,
  sourceY: number,
  numRays: number,
  spreadDeg: number,
  elements: OpticalElement[],
  axisY: number
): RaySegment[][] {
  const rays: RaySegment[][] = [];
  const spreadRad = degToRad(spreadDeg);
  const baseAngle = 0; // pointing right
  const startAngle = baseAngle - spreadRad / 2;
  const step = numRays > 1 ? spreadRad / (numRays - 1) : 0;

  for (let i = 0; i < numRays; i++) {
    const angle = numRays === 1 ? baseAngle : startAngle + step * i;
    const dir = Vec2.polar(1, angle);
    const segments = traceSingleRay(Vec2.from(sourceX, sourceY), dir, elements, axisY);
    rays.push(segments);
  }

  return rays;
}

function traceSingleRay(
  origin: Vec2,
  dir: Vec2,
  elements: OpticalElement[],
  axisY: number
): RaySegment[] {
  const segments: RaySegment[] = [];
  let current = origin.copy();
  let d = dir.normalize();

  // Sort elements by x-position for consistent traversal
  const sorted = [...elements].sort((a, b) => a.x - b.x);

  for (let bounce = 0; bounce < MAX_BOUNCES; bounce++) {
    // Find the next element the ray intersects
    let hitElem: OpticalElement | null = null;
    let hitT = RAY_LENGTH_LIMIT;

    for (const elem of sorted) {
      // Element is a vertical line at x = elem.x
      if (Math.abs(d.x) < 1e-6) continue; // ray parallel to element line
      const t = (elem.x - current.x) / d.x;
      if (t > 0.5 && t < hitT) {
        hitT = t;
        hitElem = elem;
      }
    }

    const endPoint = current.add(d.scale(hitT));
    segments.push({ from: current.copy(), to: endPoint.copy() });

    if (!hitElem || hitT >= RAY_LENGTH_LIMIT - 1) break;

    // Calculate hit height above axis
    const h = endPoint.y - axisY;

    // Calculate new direction
    const newD = computeNewDirection(d, h, hitElem, axisY);
    current = endPoint.copy();
    d = newD.normalize();
  }

  return segments;
}

function computeNewDirection(
  inDir: Vec2,
  h: number,
  elem: OpticalElement,
  _axisY: number
): Vec2 {
  const f = elem.focalLength;

  switch (elem.type) {
    case 'convex-lens':
    case 'concave-lens': {
      // Thin lens approximation: θ_out = θ_in - h/f
      const thetaIn = Math.atan2(inDir.y, inDir.x);
      const thetaOut = thetaIn - h / f;
      return Vec2.polar(1, thetaOut);
    }

    case 'plane-mirror': {
      // Reflect horizontally: reverse x-component
      return Vec2.from(-inDir.x, inDir.y).normalize();
    }

    case 'concave-mirror':
    case 'convex-mirror': {
      // Reflect horizontally first
      const reflected = Vec2.from(-inDir.x, inDir.y);
      // Then apply curvature effect: θ_out = θ_reflected - 2h/R, where R = 2f
      const thetaRef = Math.atan2(reflected.y, reflected.x);
      const R = 2 * f;
      const thetaOut = thetaRef - (2 * h) / R;
      return Vec2.polar(1, thetaOut);
    }

    default:
      return inDir;
  }
}

// --- Drawing ---

function drawOpticalElement(
  ctx: CanvasRenderingContext2D,
  elem: OpticalElement,
  axisY: number,
  _config: SimulationConfig
) {
  const x = elem.x;
  const hh = ELEMENT_HALF_HEIGHT;
  const color = ELEMENT_COLORS[elem.type];

  ctx.save();

  switch (elem.type) {
    case 'convex-lens': {
      // Draw as a double-convex lens shape
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x, axisY - hh);
      ctx.quadraticCurveTo(x + 12, axisY, x, axisY + hh);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, axisY - hh);
      ctx.quadraticCurveTo(x - 12, axisY, x, axisY + hh);
      ctx.stroke();

      // Focal points
      const fl = Math.abs(elem.focalLength);
      drawCircle(ctx, Vec2.from(x + fl, axisY), 4, color, undefined);
      drawCircle(ctx, Vec2.from(x - fl, axisY), 4, color, undefined);
      drawText(ctx, 'F', Vec2.from(x + fl, axisY + 16), color, 10);
      drawText(ctx, "F'", Vec2.from(x - fl, axisY + 16), color, 10);
      break;
    }

    case 'concave-lens': {
      // Draw as a double-concave lens shape
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x, axisY - hh);
      ctx.quadraticCurveTo(x - 12, axisY, x, axisY + hh);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, axisY - hh);
      ctx.quadraticCurveTo(x + 12, axisY, x, axisY + hh);
      ctx.stroke();

      // Virtual focal points (dashed)
      const fl = Math.abs(elem.focalLength);
      drawCircle(ctx, Vec2.from(x + fl, axisY), 4, 'rgba(56,189,248,0.4)', undefined);
      drawCircle(ctx, Vec2.from(x - fl, axisY), 4, 'rgba(56,189,248,0.4)', undefined);
      drawText(ctx, 'F', Vec2.from(x + fl, axisY + 16), 'rgba(56,189,248,0.5)', 10);
      drawText(ctx, "F'", Vec2.from(x - fl, axisY + 16), 'rgba(56,189,248,0.5)', 10);
      break;
    }

    case 'plane-mirror': {
      // Draw as a thick vertical line with hatching
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(x, axisY - hh);
      ctx.lineTo(x, axisY + hh);
      ctx.stroke();

      // Hatching on the reflective side (left)
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(167,139,250,0.4)';
      for (let y = axisY - hh + 8; y < axisY + hh; y += 8) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - 8, y + 6);
        ctx.stroke();
      }
      break;
    }

    case 'concave-mirror': {
      // Draw as a concave arc (curving toward incoming light)
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x + 80, axisY, 80, Math.PI * 0.75, Math.PI * 1.25);
      ctx.stroke();

      // Hatching
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(192,132,252,0.4)';
      for (let a = Math.PI * 0.78; a < Math.PI * 1.22; a += 0.12) {
        const px = x + 80 + 80 * Math.cos(a);
        const py = axisY + 80 * Math.sin(a);
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px + 6, py + 4);
        ctx.stroke();
      }

      // Focal point
      const fl = Math.abs(elem.focalLength);
      drawCircle(ctx, Vec2.from(x - fl, axisY), 4, color, undefined);
      drawText(ctx, 'F', Vec2.from(x - fl, axisY + 16), color, 10);
      break;
    }

    case 'convex-mirror': {
      // Draw as a convex arc (curving away from incoming light)
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x - 80, axisY, 80, -Math.PI * 0.25, Math.PI * 0.25);
      ctx.stroke();

      // Hatching
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(129,140,248,0.4)';
      for (let a = -Math.PI * 0.22; a < Math.PI * 0.22; a += 0.12) {
        const px = x - 80 + 80 * Math.cos(a);
        const py = axisY + 80 * Math.sin(a);
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px - 6, py + 4);
        ctx.stroke();
      }

      // Virtual focal point
      const fl = Math.abs(elem.focalLength);
      drawCircle(ctx, Vec2.from(x + fl, axisY), 4, 'rgba(129,140,248,0.4)', undefined);
      drawText(ctx, "F'", Vec2.from(x + fl, axisY + 16), 'rgba(129,140,248,0.5)', 10);
      break;
    }
  }

  // Label
  drawText(ctx, ELEMENT_LABELS[elem.type], Vec2.from(x, axisY - hh - 14), color, 11);

  ctx.restore();
}

function drawRaySegments(
  ctx: CanvasRenderingContext2D,
  rays: RaySegment[][],
  _config: SimulationConfig
) {
  for (const ray of rays) {
    for (const seg of ray) {
      // Glow layer
      ctx.save();
      ctx.strokeStyle = 'rgba(250,204,21,0.15)';
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(seg.from.x, seg.from.y);
      ctx.lineTo(seg.to.x, seg.to.y);
      ctx.stroke();
      ctx.restore();

      // Main ray
      ctx.save();
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(seg.from.x, seg.from.y);
      ctx.lineTo(seg.to.x, seg.to.y);
      ctx.stroke();
      ctx.restore();
    }
  }
}

// --- Component ---

export default function OpticsRayTracer() {
  const [numRays, setNumRays] = useState(7);
  const [spread, setSpread] = useState(30);
  const [focalLength, setFocalLength] = useState(100);
  const [selectedType, setSelectedType] = useState<ElementType>('convex-lens');
  const [hint] = useState(
    'Select an optic from the toolbar, click to place. Drag to move.'
  );

  const elementsRef = useRef<OpticalElement[]>([]);
  const raysRef = useRef<RaySegment[][]>([]);
  const nextIdRef = useRef(1);
  const dragRef = useRef<{ elemId: number; offsetX: number } | null>(null);
  const dirtyRef = useRef(true);
  const sourceRef = useRef({ x: 60, y: 0 }); // y will be set to axisY

  const createSim: SimulationFactory = useCallback(
    (_ctx, config) => {
      const axisY = config.height / 2;
      sourceRef.current.y = axisY;

      const sim: SimulationInstance = {
        init: () => {
          // Pre-place one element
          if (elementsRef.current.length === 0) {
            elementsRef.current.push({
              id: nextIdRef.current++,
              type: 'convex-lens',
              x: config.width * 0.5,
              focalLength: 100,
            });
          }
          dirtyRef.current = true;
        },

        update: (_state: SimulationState, input: SimInputState) => {
          const axisY = config.height / 2;
          const mx = input.mouseX;

          // Handle drag
          if (dragRef.current) {
            if (input.mouseDown) {
              const elem = elementsRef.current.find(
                (e) => e.id === dragRef.current!.elemId
              );
              if (elem) {
                elem.x = Math.max(100, Math.min(config.width - 40, mx));
                dirtyRef.current = true;
              }
            } else {
              dragRef.current = null;
            }
          }

          // Recalculate rays if dirty
          if (dirtyRef.current) {
            raysRef.current = traceRays(
              sourceRef.current.x,
              sourceRef.current.y,
              numRays,
              spread,
              elementsRef.current,
              axisY
            );
            dirtyRef.current = false;
          }
        },

        draw: (ctx: CanvasRenderingContext2D, cfg: SimulationConfig) => {
          const w = cfg.width;
          const h = cfg.height;
          const axisY = h / 2;

          // Clear
          ctx.clearRect(0, 0, w, h);

          // Background
          drawGrid(ctx, w, h, 40, 'rgba(255,255,255,0.03)');

          // Principal axis
          drawDashedLine(
            ctx,
            Vec2.from(0, axisY),
            Vec2.from(w, axisY),
            'rgba(255,255,255,0.1)',
            1
          );

          // Draw rays
          drawRaySegments(ctx, raysRef.current, cfg);

          // Draw elements
          for (const elem of elementsRef.current) {
            drawOpticalElement(ctx, elem, axisY, cfg);
          }

          // Draw light source
          drawCircle(ctx, Vec2.from(sourceRef.current.x, axisY), 6, '#facc15', '#fff');
          drawText(
            ctx,
            'Source',
            Vec2.from(sourceRef.current.x, axisY - 20),
            '#facc15',
            10
          );

          // Toolbar background
          ctx.save();
          ctx.fillStyle = 'rgba(0,0,0,0.6)';
          ctx.fillRect(0, 0, w, 44);
          ctx.strokeStyle = 'rgba(255,255,255,0.1)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, 44);
          ctx.lineTo(w, 44);
          ctx.stroke();

          // Toolbar items
          const types: ElementType[] = [
            'convex-lens',
            'concave-lens',
            'plane-mirror',
            'concave-mirror',
            'convex-mirror',
          ];
          const itemWidth = w / types.length;

          for (let i = 0; i < types.length; i++) {
            const t = types[i];
            const cx = itemWidth * i + itemWidth / 2;
            const isSelected = t === selectedType;

            if (isSelected) {
              ctx.fillStyle = 'rgba(34,211,238,0.15)';
              ctx.fillRect(itemWidth * i, 0, itemWidth, 44);
            }

            drawText(
              ctx,
              ELEMENT_LABELS[t],
              Vec2.from(cx, 22),
              isSelected ? ELEMENT_COLORS[t] : 'rgba(255,255,255,0.5)',
              11
            );
          }
          ctx.restore();

          // Hint
          drawText(
            ctx,
            hint,
            Vec2.from(w / 2, h - 16),
            'rgba(255,255,255,0.3)',
            10
          );
        },

        reset: () => {
          elementsRef.current = [];
          raysRef.current = [];
          nextIdRef.current = 1;
          dragRef.current = null;
          dirtyRef.current = true;
        },

        destroy: () => {
          elementsRef.current = [];
          raysRef.current = [];
        },
      };

      // Store click handler reference for the canvas
      const handleClick = (e: MouseEvent | TouchEvent) => {
        const canvas = _ctx.canvas;
        const rect = canvas.getBoundingClientRect();
        let clientX: number, clientY: number;

        if ('touches' in e) {
          if (e.touches.length === 0) return;
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else {
          clientX = e.clientX;
          clientY = e.clientY;
        }

        const mx = (clientX - rect.left);
        const my = (clientY - rect.top);

        // Check toolbar click
        if (my < 44) {
          const types: ElementType[] = [
            'convex-lens',
            'concave-lens',
            'plane-mirror',
            'concave-mirror',
            'convex-mirror',
          ];
          const itemWidth = rect.width / types.length;
          const idx = Math.floor(mx / itemWidth);
          if (idx >= 0 && idx < types.length) {
            setSelectedType(types[idx]);
          }
          return;
        }

        // Check if clicking on existing element (for drag start)
        const axisY = rect.height / 2;
        for (const elem of elementsRef.current) {
          if (
            Math.abs(mx - elem.x) < HIT_TOLERANCE &&
            Math.abs(my - axisY) < ELEMENT_HALF_HEIGHT + 10
          ) {
            dragRef.current = { elemId: elem.id, offsetX: mx - elem.x };
            return;
          }
        }

        // Place new element
        const newElem: OpticalElement = {
          id: nextIdRef.current++,
          type: selectedType,
          x: Math.max(100, Math.min(rect.width - 40, mx)),
          focalLength:
            selectedType === 'plane-mirror'
              ? 0
              : selectedType === 'concave-mirror' || selectedType === 'convex-mirror'
                ? focalLength
                : (selectedType === 'concave-lens' ? -focalLength : focalLength),
        };
        elementsRef.current.push(newElem);
        dirtyRef.current = true;
      };

      const handleDblClick = (e: MouseEvent) => {
        const canvas = _ctx.canvas;
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const axisY = rect.height / 2;

        // Remove element on double-click
        for (let i = elementsRef.current.length - 1; i >= 0; i--) {
          const elem = elementsRef.current[i];
          if (
            Math.abs(mx - elem.x) < HIT_TOLERANCE + 10 &&
            Math.abs(my - axisY) < ELEMENT_HALF_HEIGHT + 10
          ) {
            elementsRef.current.splice(i, 1);
            dirtyRef.current = true;
            return;
          }
        }
      };

      const canvas = _ctx.canvas;
      canvas.addEventListener('click', handleClick);
      canvas.addEventListener('touchend', handleClick as EventListener);
      canvas.addEventListener('dblclick', handleDblClick);

      // Store cleanup refs
      (sim as any)._cleanup = () => {
        canvas.removeEventListener('click', handleClick);
        canvas.removeEventListener('touchend', handleClick as EventListener);
        canvas.removeEventListener('dblclick', handleDblClick);
      };

      const origDestroy = sim.destroy;
      sim.destroy = () => {
        origDestroy();
        (sim as any)._cleanup?.();
      };

      return sim;
    },
    [numRays, spread, focalLength, selectedType]
  );

  const sliders: SliderConfig[] = [
    {
      label: 'Rays',
      min: 3,
      max: 20,
      step: 1,
      value: numRays,
      onChange: (v) => {
        setNumRays(v);
        dirtyRef.current = true;
      },
      color: '#facc15',
    },
    {
      label: 'Spread',
      min: 10,
      max: 180,
      step: 5,
      value: spread,
      onChange: (v) => {
        setSpread(v);
        dirtyRef.current = true;
      },
      unit: '°',
      color: '#f59e0b',
    },
    {
      label: 'Focal Length',
      min: 50,
      max: 200,
      step: 10,
      value: focalLength,
      onChange: (v) => {
        setFocalLength(v);
        // Update existing elements' focal lengths
        for (const elem of elementsRef.current) {
          if (elem.type !== 'plane-mirror') {
            elem.focalLength =
              elem.type === 'concave-lens' || elem.type === 'convex-mirror'
                ? -v
                : v;
          }
        }
        dirtyRef.current = true;
      },
      unit: 'px',
      color: '#22d3ee',
    },
  ];

  return (
    <div className="space-y-3">
      <PhysicsCanvas
        createSimulation={createSim}
        aspectRatio={16 / 9}
        sliders={sliders}
      />
    </div>
  );
}
