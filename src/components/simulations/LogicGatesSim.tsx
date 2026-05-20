import { useState, useCallback } from 'react';
import PhysicsCanvas from '../simulation/PhysicsCanvas';
import type { SimulationFactory, SimulationInstance, SimulationConfig } from '../../simulation/types';
import { Vec2, drawGrid, drawText } from '../../simulation/physics';

type GateType = 'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR';

export default function LogicGatesSim() {
  const [gateType, setGateType] = useState<GateType>('AND');
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);

  const getOutput = (a: boolean, b: boolean, gate: GateType): boolean => {
    switch (gate) {
      case 'AND': return a && b;
      case 'OR': return a || b;
      case 'NOT': return !a;
      case 'NAND': return !(a && b);
      case 'NOR': return !(a || b);
      case 'XOR': return a !== b;
    }
  };

  const output = getOutput(inputA, inputB, gateType);

  const createSim: SimulationFactory = useCallback((_factoryCtx, _factoryConfig) => {
    const sim: SimulationInstance = {
      init: () => {},
      update: () => {},
      reset: () => {},
      destroy: () => {},
      draw: (ctx: CanvasRenderingContext2D, cfg: SimulationConfig) => {
        const w = cfg.width;
        const h = cfg.height;
        ctx.clearRect(0, 0, w, h);
        drawGrid(ctx, w, h, 40, 'rgba(255,255,255,0.03)');

        const gateX = w / 2;
        const gateY = h / 2;
        const gateWidth = 120;
        const gateHeight = 80;

        // Draw gate body
        ctx.fillStyle = 'rgba(124, 58, 237, 0.2)';
        ctx.strokeStyle = '#a78bfa';
        ctx.lineWidth = 2;

        if (gateType === 'NOT') {
          ctx.beginPath();
          ctx.moveTo(gateX - gateWidth / 2, gateY - gateHeight / 2);
          ctx.lineTo(gateX + gateWidth / 2, gateY);
          ctx.lineTo(gateX - gateWidth / 2, gateY + gateHeight / 2);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(gateX + gateWidth / 2 + 10, gateY, 8, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.roundRect(gateX - gateWidth / 2, gateY - gateHeight / 2, gateWidth, gateHeight, 10);
          ctx.fill();
          ctx.stroke();
        }

        // Draw gate label
        drawText(ctx, gateType, Vec2.from(gateX, gateY), '#a78bfa', 18);

        // Draw input wires
        const inputAX = gateX - gateWidth / 2 - 60;
        const inputAY = gateY - 20;
        const inputBX = gateX - gateWidth / 2 - 60;
        const inputBY = gateY + 20;

        // Input A wire
        ctx.strokeStyle = inputA ? '#06b6d4' : 'rgba(255,255,255,0.3)';
        ctx.lineWidth = inputA ? 3 : 1;
        ctx.beginPath();
        ctx.moveTo(inputAX, inputAY);
        ctx.lineTo(gateX - gateWidth / 2, gateY - 20);
        ctx.stroke();

        // Input B wire (only for 2-input gates)
        if (gateType !== 'NOT') {
          ctx.strokeStyle = inputB ? '#06b6d4' : 'rgba(255,255,255,0.3)';
          ctx.lineWidth = inputB ? 3 : 1;
          ctx.beginPath();
          ctx.moveTo(inputBX, inputBY);
          ctx.lineTo(gateX - gateWidth / 2, gateY + 20);
          ctx.stroke();
        }

        // Output wire
        const outputX = gateX + gateWidth / 2 + (gateType === 'NOT' ? 18 : 0);
        ctx.strokeStyle = output ? '#14b8a6' : 'rgba(255,255,255,0.3)';
        ctx.lineWidth = output ? 3 : 1;
        ctx.beginPath();
        ctx.moveTo(outputX, gateY);
        ctx.lineTo(outputX + 60, gateY);
        ctx.stroke();

        // Input labels
        drawText(ctx, `A = ${inputA ? '1' : '0'}`, Vec2.from(inputAX - 20, inputAY), inputA ? '#06b6d4' : 'rgba(255,255,255,0.5)', 14, 'right');

        if (gateType !== 'NOT') {
          drawText(ctx, `B = ${inputB ? '1' : '0'}`, Vec2.from(inputBX - 20, inputBY), inputB ? '#06b6d4' : 'rgba(255,255,255,0.5)', 14, 'right');
        }

        // Output label
        drawText(ctx, `Out = ${output ? '1' : '0'}`, Vec2.from(outputX + 80, gateY), output ? '#14b8a6' : 'rgba(255,255,255,0.5)', 14, 'left');

        // Draw truth table
        const tableX = w - 160;
        const tableY = 30;
        drawText(ctx, 'Truth Table', Vec2.from(tableX + 60, tableY), 'rgba(255,255,255,0.7)', 14);

        const rows = gateType === 'NOT'
          ? [{ a: false, out: getOutput(false, false, gateType) }, { a: true, out: getOutput(true, false, gateType) }]
          : [
            { a: false, b: false, out: getOutput(false, false, gateType) },
            { a: false, b: true, out: getOutput(false, true, gateType) },
            { a: true, b: false, out: getOutput(true, false, gateType) },
            { a: true, b: true, out: getOutput(true, true, gateType) },
          ];

        rows.forEach((row, i) => {
          const y = tableY + 25 + i * 22;
          const isCurrentRow = gateType === 'NOT'
            ? row.a === inputA
            : 'b' in row && row.a === inputA && row.b === inputB;

          ctx.fillStyle = isCurrentRow ? 'rgba(124,58,237,0.2)' : 'transparent';
          ctx.fillRect(tableX - 10, y - 12, 140, 20);

          const text = gateType === 'NOT'
            ? `A=${row.a ? 1 : 0}  →  ${row.out ? 1 : 0}`
            : `A=${row.a ? 1 : 0} B=${'b' in row && row.b ? 1 : 0}  →  ${row.out ? 1 : 0}`;

          drawText(ctx, text, Vec2.from(tableX + 60, y), isCurrentRow ? '#a78bfa' : 'rgba(255,255,255,0.5)', 12);
        });
      },
    };
    return sim;
  }, [gateType, inputA, inputB, output]);

  const gates: GateType[] = ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR'];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {gates.map((gate) => (
          <button
            key={gate}
            className={`px-3 py-1.5 rounded-lg text-sm font-mono font-medium transition-colors ${gateType === gate ? 'bg-brand-purple text-white' : 'bg-white/10 text-white/60'}`}
            onClick={() => setGateType(gate)}
          >
            {gate}
          </button>
        ))}
      </div>
      <div className="flex gap-4">
        <button
          className={`px-4 py-2 rounded-lg text-sm font-mono font-medium transition-colors ${inputA ? 'bg-brand-cyan text-white' : 'bg-white/10 text-white/60'}`}
          onClick={() => setInputA(!inputA)}
        >
          A = {inputA ? '1' : '0'}
        </button>
        {gateType !== 'NOT' && (
          <button
            className={`px-4 py-2 rounded-lg text-sm font-mono font-medium transition-colors ${inputB ? 'bg-brand-cyan text-white' : 'bg-white/10 text-white/60'}`}
            onClick={() => setInputB(!inputB)}
          >
            B = {inputB ? '1' : '0'}
          </button>
        )}
      </div>
      <PhysicsCanvas
        createSimulation={createSim}
        aspectRatio={12 / 5}
      />
    </div>
  );
}
