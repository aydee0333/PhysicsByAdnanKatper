import { useState, useCallback, useRef } from 'react';
import PhysicsCanvas from '../simulation/PhysicsCanvas';
import type { SimulationFactory, SimulationInstance, SimulationState, SimulationConfig, SimInputState } from '../../simulation/types';
import type { SliderConfig } from '../../simulation/types';

// Grid and layout constants
const CELL = 40;
const PALETTE_W = 120;
const STATUS_H = 44;
const DOT_RADIUS = 2.5;

type ComponentKind = 'battery' | 'resistor' | 'bulb' | 'switch' | 'wire';

interface CircuitComponent {
  id: number;
  kind: ComponentKind;
  x: number; // grid col
  y: number; // grid row
  resistance: number; // ohms (0 for battery, wire)
  voltage: number; // volts (only for battery)
  closed: boolean; // only for switch
}

interface Wire {
  id: number;
  fromId: number;
  toId: number;
}

const PALETTE_ITEMS: { kind: ComponentKind; label: string }[] = [
  { kind: 'battery', label: 'Battery' },
  { kind: 'resistor', label: 'Resistor' },
  { kind: 'bulb', label: 'Bulb' },
  { kind: 'switch', label: 'Switch' },
];

export default function CircuitBuilderSim() {
  const [batteryVoltage, setBatteryVoltage] = useState(9);
  const [resistance, setResistance] = useState(10);

  const nextId = useRef(1);
  const components = useRef<CircuitComponent[]>([]);
  const wires = useRef<Wire[]>([]);
  const selectedPalette = useRef<ComponentKind | null>(null);
  const selectedComp = useRef<number | null>(null);
  const hoveredComp = useRef<number | null>(null);
  const currentPhase = useRef(0);
  const currentFlow = useRef(0);

  const buildDefaultCircuit = useCallback((w: number, h: number) => {
    components.current = [];
    wires.current = [];
    nextId.current = 1;

    const gridW = Math.floor((w - PALETTE_W) / CELL);
    const gridH = Math.floor((h - STATUS_H) / CELL);
    const cx = Math.floor(gridW / 2) + Math.floor(PALETTE_W / CELL);
    const cy = Math.floor(gridH / 2);

    // Pre-build a simple series circuit: Battery -> Wire -> Resistor -> Wire -> Bulb -> Wire -> Switch -> Wire -> back to Battery
    const battery: CircuitComponent = {
      id: nextId.current++, kind: 'battery', x: cx - 3, y: cy - 2,
      resistance: 0, voltage: batteryVoltage, closed: true,
    };
    const resistor: CircuitComponent = {
      id: nextId.current++, kind: 'resistor', x: cx + 3, y: cy - 2,
      resistance: resistance, voltage: 0, closed: true,
    };
    const bulb: CircuitComponent = {
      id: nextId.current++, kind: 'bulb', x: cx + 3, y: cy + 2,
      resistance: 5, voltage: 0, closed: true,
    };
    const sw: CircuitComponent = {
      id: nextId.current++, kind: 'switch', x: cx - 3, y: cy + 2,
      resistance: 0, voltage: 0, closed: true,
    };

    components.current = [battery, resistor, bulb, sw];

    // Wire them in a loop
    wires.current = [
      { id: nextId.current++, fromId: battery.id, toId: resistor.id },
      { id: nextId.current++, fromId: resistor.id, toId: bulb.id },
      { id: nextId.current++, fromId: bulb.id, toId: sw.id },
      { id: nextId.current++, fromId: sw.id, toId: battery.id },
    ];
  }, [batteryVoltage, resistance]);

  const computeCircuit = useCallback(() => {
    const comps = components.current;
    const sw = comps.find(c => c.kind === 'switch');
    if (sw && !sw.closed) {
      currentFlow.current = 0;
      return;
    }

    let totalR = 0;
    let totalV = 0;
    for (const c of comps) {
      if (c.kind === 'battery') {
        totalV += c.voltage;
      } else {
        totalR += c.resistance;
      }
    }

    // Update battery voltage and resistor resistance from sliders
    for (const c of comps) {
      if (c.kind === 'battery') c.voltage = batteryVoltage;
      if (c.kind === 'resistor') c.resistance = resistance;
    }

    totalR = 0;
    totalV = 0;
    for (const c of comps) {
      if (c.kind === 'battery') totalV += c.voltage;
      else totalR += c.resistance;
    }

    currentFlow.current = totalR > 0 ? totalV / totalR : 0;
  }, [batteryVoltage, resistance]);

  const getCompCenter = (c: CircuitComponent, _config: SimulationConfig): { x: number; y: number } => {
    return { x: PALETTE_W + c.x * CELL + CELL / 2, y: c.y * CELL + CELL / 2 };
  };

  const drawComponent = (ctx: CanvasRenderingContext2D, c: CircuitComponent, config: SimulationConfig, isHovered: boolean) => {
    const { x: cx, y: cy } = getCompCenter(c, config);

    // Highlight if hovered
    if (isHovered) {
      ctx.fillStyle = 'rgba(6, 182, 212, 0.08)';
      ctx.fillRect(cx - CELL / 2, cy - CELL / 2, CELL, CELL);
    }

    switch (c.kind) {
      case 'battery': {
        // Draw battery symbol: two parallel lines (long=+, short=-)
        ctx.strokeStyle = '#22d3ee';
        ctx.lineWidth = 2;
        // Long line (positive)
        ctx.beginPath();
        ctx.moveTo(cx - 4, cy - 10);
        ctx.lineTo(cx + 4, cy - 10);
        ctx.stroke();
        // Short line (negative)
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx - 2, cy - 3);
        ctx.lineTo(cx + 2, cy - 3);
        ctx.stroke();
        // Vertical leads
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 20);
        ctx.lineTo(cx, cy - 10);
        ctx.moveTo(cx, cy - 3);
        ctx.lineTo(cx, cy + 20);
        ctx.stroke();
        // + and - labels
        drawText(ctx, '+', { x: cx + 8, y: cy - 18 } as any, '#22d3ee', 10);
        drawText(ctx, '−', { x: cx + 8, y: cy + 2 } as any, '#94a3b8', 10);
        // Voltage label
        drawText(ctx, `${c.voltage}V`, { x: cx, y: cy + 30 } as any, '#22d3ee', 9);
        break;
      }
      case 'resistor': {
        // Zigzag resistor symbol
        ctx.strokeStyle = isHovered ? '#f59e0b' : '#f97316';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 20);
        ctx.lineTo(cx, cy - 12);
        const zigW = 8, zigH = 5;
        let zx = cx, zy = cy - 12;
        for (let i = 0; i < 4; i++) {
          ctx.lineTo(zx + zigW, zy + zigH / 2);
          ctx.lineTo(zx, zy + zigH);
          zx += 0; zy += zigH;
        }
        ctx.lineTo(cx, cy + 12);
        ctx.lineTo(cx, cy + 20);
        ctx.stroke();
        // Resistance label
        drawText(ctx, `${c.resistance}Ω`, { x: cx, y: cy + 30 } as any, '#f97316', 9);
        break;
      }
      case 'bulb': {
        // Circle with cross
        ctx.strokeStyle = '#eab308';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx - 7, cy - 7);
        ctx.lineTo(cx + 7, cy + 7);
        ctx.moveTo(cx + 7, cy - 7);
        ctx.lineTo(cx - 7, cy + 7);
        ctx.stroke();
        // Leads
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 20);
        ctx.lineTo(cx, cy - 10);
        ctx.moveTo(cx, cy + 10);
        ctx.lineTo(cx, cy + 20);
        ctx.stroke();
        // Glow effect when current flows
        if (currentFlow.current > 0.01) {
          const brightness = Math.min(currentFlow.current / 2, 1);
          ctx.fillStyle = `rgba(250, 204, 21, ${brightness * 0.3})`;
          ctx.beginPath();
          ctx.arc(cx, cy, 16, 0, Math.PI * 2);
          ctx.fill();
        }
        drawText(ctx, `${c.resistance}Ω`, { x: cx, y: cy + 30 } as any, '#eab308', 9);
        break;
      }
      case 'switch': {
        // Switch symbol: pivot + lever
        ctx.strokeStyle = c.closed ? '#22c55e' : '#ef4444';
        ctx.lineWidth = 2;
        // Left pivot
        ctx.beginPath();
        ctx.arc(cx - 10, cy, 3, 0, Math.PI * 2);
        ctx.fill();
        // Right contact
        ctx.beginPath();
        ctx.arc(cx + 10, cy, 3, 0, Math.PI * 2);
        ctx.stroke();
        // Lever
        ctx.beginPath();
        ctx.moveTo(cx - 10, cy);
        if (c.closed) {
          ctx.lineTo(cx + 10, cy);
        } else {
          ctx.lineTo(cx + 5, cy - 12);
        }
        ctx.stroke();
        // Leads
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx - 10, cy - 20);
        ctx.lineTo(cx - 10, cy);
        ctx.moveTo(cx + 10, cy);
        ctx.lineTo(cx + 10, cy + 20);
        ctx.stroke();
        // Label
        drawText(ctx, c.closed ? 'ON' : 'OFF', { x: cx, y: cy + 30 } as any, c.closed ? '#22c55e' : '#ef4444', 9);
        break;
      }
    }
  };

  const drawPalette = (ctx: CanvasRenderingContext2D, h: number) => {
    // Background
    ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
    ctx.fillRect(0, 0, PALETTE_W, h);

    // Title
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('PALETTE', PALETTE_W / 2, 20);

    // Divider
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(8, 28);
    ctx.lineTo(PALETTE_W - 8, 28);
    ctx.stroke();

    // Items
    PALETTE_ITEMS.forEach((item, i) => {
      const y = 44 + i * 52;
      const isSelected = selectedPalette.current === item.kind;

      // Background highlight
      if (isSelected) {
        ctx.fillStyle = 'rgba(6, 182, 212, 0.15)';
        ctx.fillRect(6, y, PALETTE_W - 12, 44);
        ctx.strokeStyle = '#22d3ee';
        ctx.lineWidth = 1;
        ctx.strokeRect(6, y, PALETTE_W - 12, 44);
      }

      // Icon (simplified)
      const icx = PALETTE_W / 2;
      const icy = y + 14;
      ctx.strokeStyle = isSelected ? '#22d3ee' : '#64748b';
      ctx.lineWidth = 1.5;

      if (item.kind === 'battery') {
        ctx.beginPath();
        ctx.moveTo(icx, icy - 8);
        ctx.lineTo(icx, icy + 8);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(icx - 4, icy - 4);
        ctx.lineTo(icx + 4, icy - 4);
        ctx.stroke();
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(icx - 2, icy + 2);
        ctx.lineTo(icx + 2, icy + 2);
        ctx.stroke();
      } else if (item.kind === 'resistor') {
        ctx.beginPath();
        ctx.moveTo(icx - 12, icy);
        for (let j = 0; j < 4; j++) {
          ctx.lineTo(icx - 6 + j * 4, icy - 4);
          ctx.lineTo(icx - 4 + j * 4, icy + 4);
        }
        ctx.lineTo(icx + 12, icy);
        ctx.stroke();
      } else if (item.kind === 'bulb') {
        ctx.beginPath();
        ctx.arc(icx, icy, 7, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(icx - 5, icy - 5);
        ctx.lineTo(icx + 5, icy + 5);
        ctx.stroke();
      } else if (item.kind === 'switch') {
        ctx.beginPath();
        ctx.arc(icx - 6, icy, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(icx + 6, icy, 2, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(icx - 6, icy);
        ctx.lineTo(icx + 3, icy - 8);
        ctx.stroke();
      }

      // Label
      ctx.fillStyle = isSelected ? '#e2e8f0' : '#94a3b8';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(item.label, PALETTE_W / 2, y + 36);
    });

    // Remove button at bottom
    const removeY = h - 50;
    ctx.fillStyle = 'rgba(239, 68, 68, 0.1)';
    ctx.fillRect(6, removeY, PALETTE_W - 12, 36);
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1;
    ctx.strokeRect(6, removeY, PALETTE_W - 12, 36);
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🗑 REMOVE', PALETTE_W / 2, removeY + 22);

    ctx.textAlign = 'left';
  };

  const drawWires = (ctx: CanvasRenderingContext2D, config: SimulationConfig) => {
    for (const wire of wires.current) {
      const from = components.current.find(c => c.id === wire.fromId);
      const to = components.current.find(c => c.id === wire.toId);
      if (!from || !to) continue;

      const p1 = getCompCenter(from, config);
      const p2 = getCompCenter(to, config);

      // Draw wire line
      ctx.strokeStyle = currentFlow.current > 0.01 ? 'rgba(34, 211, 238, 0.6)' : 'rgba(148, 163, 184, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();

      // Animated current dots
      if (currentFlow.current > 0.01) {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const dotSpacing = 20;
        const numDots = Math.floor(len / dotSpacing);

        for (let i = 0; i <= numDots; i++) {
          const t = ((i / Math.max(numDots, 1) + currentPhase.current) % 1);
          const px = p1.x + dx * t;
          const py = p1.y + dy * t;

          ctx.fillStyle = '#facc15';
          ctx.beginPath();
          ctx.arc(px, py, DOT_RADIUS, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  };

  const drawStatusBar = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const y = h - STATUS_H;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
    ctx.fillRect(0, y, w, STATUS_H);
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();

    const I = currentFlow.current;
    const totalR = components.current.filter(c => c.kind !== 'battery').reduce((s, c) => s + c.resistance, 0);
    const totalV = components.current.filter(c => c.kind === 'battery').reduce((s, c) => s + c.voltage, 0);

    ctx.font = '11px monospace';
    ctx.textAlign = 'left';

    ctx.fillStyle = '#22d3ee';
    ctx.fillText(`V = ${totalV.toFixed(1)} V`, PALETTE_W + 16, y + 26);

    ctx.fillStyle = '#facc15';
    ctx.fillText(`I = ${I.toFixed(2)} A`, PALETTE_W + 140, y + 26);

    ctx.fillStyle = '#f97316';
    ctx.fillText(`R = ${totalR.toFixed(1)} Ω`, PALETTE_W + 270, y + 26);

    if (I > 0.01) {
      ctx.fillStyle = '#22c55e';
      ctx.fillText(`P = ${(totalV * I).toFixed(2)} W`, PALETTE_W + 400, y + 26);
    }

    ctx.textAlign = 'left';
  };

  const handleClick = useCallback((x: number, y: number, config: SimulationConfig) => {
    const gx = Math.floor((x - PALETTE_W) / CELL);
    const gy = Math.floor(y / CELL);

    // Check palette clicks
    if (x < PALETTE_W) {
      PALETTE_ITEMS.forEach((item, i) => {
        const py = 44 + i * 52;
        if (y >= py && y <= py + 44) {
          selectedPalette.current = selectedPalette.current === item.kind ? null : item.kind;
        }
      });
      // Remove button
      if (y >= config.height - 50 && y <= config.height - 14) {
        selectedPalette.current = null;
        // Remove hovered component
        if (hoveredComp.current !== null) {
          const hId = hoveredComp.current;
          components.current = components.current.filter(c => c.id !== hId);
          wires.current = wires.current.filter(w => w.fromId !== hId && w.toId !== hId);
          hoveredComp.current = null;
        }
      }
      return;
    }

    // Check if clicking on existing component (toggle switch)
    const clickedComp = components.current.find(c => {
      const cc = getCompCenter(c, config);
      return Math.abs(x - cc.x) < CELL / 2 && Math.abs(y - cc.y) < CELL / 2;
    });

    if (clickedComp) {
      if (clickedComp.kind === 'switch') {
        clickedComp.closed = !clickedComp.closed;
        computeCircuit();
      }
      selectedComp.current = clickedComp.id;
      return;
    }

    // Place new component from palette
    if (selectedPalette.current && gx >= 0 && gy >= 0) {
      // Check no overlap
      const overlaps = components.current.some(c => c.x === gx && c.y === gy);
      if (overlaps) return;

      const newComp: CircuitComponent = {
        id: nextId.current++,
        kind: selectedPalette.current,
        x: gx,
        y: gy,
        resistance: selectedPalette.current === 'resistor' ? resistance :
          selectedPalette.current === 'bulb' ? 5 : 0,
        voltage: selectedPalette.current === 'battery' ? batteryVoltage : 0,
        closed: true,
      };

      components.current.push(newComp);

      // Auto-wire to nearest component
      if (components.current.length > 1) {
        let nearest: CircuitComponent | null = null;
        let minDist = Infinity;
        for (const c of components.current) {
          if (c.id === newComp.id) continue;
          const d = Math.abs(c.x - newComp.x) + Math.abs(c.y - newComp.y);
          if (d < minDist) {
            minDist = d;
            nearest = c;
          }
        }
        if (nearest) {
          wires.current.push({
            id: nextId.current++,
            fromId: nearest.id,
            toId: newComp.id,
          });
        }
      }

      computeCircuit();
    }
  }, [batteryVoltage, resistance, computeCircuit]);

  const createSim: SimulationFactory = useCallback((_ctx, config) => {
    buildDefaultCircuit(config.width, config.height);
    computeCircuit();

    const sim: SimulationInstance = {
      init: () => {},
      update: (state: SimulationState, input: SimInputState) => {
        // Animate current dots
        if (currentFlow.current > 0.01) {
          currentPhase.current += state.dt * currentFlow.current * 0.5;
          if (currentPhase.current > 1) currentPhase.current -= 1;
        }

        // Hover detection
        if (input.mouseX > PALETTE_W) {
          const gx = Math.floor((input.mouseX - PALETTE_W) / CELL);
          const gy = Math.floor(input.mouseY / CELL);
          const hovered = components.current.find(c => c.x === gx && c.y === gy);
          hoveredComp.current = hovered ? hovered.id : null;
        } else {
          hoveredComp.current = null;
        }

        // Handle click
        if (input.mouseDown && !(input as any)._lastMouseDown) {
          handleClick(input.mouseX, input.mouseY, config);
        }
        (input as any)._lastMouseDown = input.mouseDown;
      },
      draw: (ctx: CanvasRenderingContext2D, cfg: SimulationConfig) => {
        ctx.clearRect(0, 0, cfg.width, cfg.height);

        // Background grid dots
        ctx.fillStyle = 'rgba(255,255,255,0.04)';
        for (let gx = PALETTE_W; gx < cfg.width; gx += CELL) {
          for (let gy = 0; gy < cfg.height - STATUS_H; gy += CELL) {
            ctx.beginPath();
            ctx.arc(gx, gy, 1, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Hint text
        if (components.current.length <= 4) {
          ctx.fillStyle = 'rgba(148, 163, 184, 0.4)';
          ctx.font = '12px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('Select a component from the palette, then click the grid to place it', (cfg.width + PALETTE_W) / 2, cfg.height - STATUS_H - 16);
          ctx.textAlign = 'left';
        }

        drawWires(ctx, cfg);

        for (const comp of components.current) {
          drawComponent(ctx, comp, cfg, comp.id === hoveredComp.current);
        }

        drawPalette(ctx, cfg.height);
        drawStatusBar(ctx, cfg.width, cfg.height);
      },
      reset: () => {
        buildDefaultCircuit(_ctx.canvas.width, _ctx.canvas.height);
        computeCircuit();
        currentPhase.current = 0;
        selectedPalette.current = null;
        selectedComp.current = null;
      },
      destroy: () => {
        components.current = [];
        wires.current = [];
      },
    };

    return sim;
  }, [buildDefaultCircuit, computeCircuit, handleClick]);

  const sliders: SliderConfig[] = [
    { label: 'Battery', min: 1, max: 24, step: 0.5, value: batteryVoltage, onChange: setBatteryVoltage, unit: 'V', color: '#22d3ee' },
    { label: 'Resistance', min: 1, max: 100, step: 1, value: resistance, onChange: setResistance, unit: 'Ω', color: '#f97316' },
  ];

  return (
    <div className="space-y-3">
      <PhysicsCanvas
        createSimulation={createSim}
        aspectRatio={16 / 10}
        sliders={sliders}
      />
      <p className="text-xs text-gray-500 text-center">
        Click a component in the palette to select it, then click on the grid to place it. Click a switch to toggle it.
      </p>
    </div>
  );
}

// Local drawText helper (avoids Vec2 requirement from physics.ts)
function drawText(ctx: CanvasRenderingContext2D, text: string, pos: { x: number; y: number }, color: string, size: number, align: CanvasTextAlign = 'center') {
  ctx.fillStyle = color;
  ctx.font = `${size}px sans-serif`;
  ctx.textAlign = align;
  ctx.fillText(text, pos.x, pos.y);
  ctx.textAlign = 'left';
}
