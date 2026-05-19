import { useState, useRef, useEffect } from 'react';

export default function CenterOfMassFinder() {
  const [selectedHang, setSelectedHang] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const shapes: Record<string, { name: string; vertices: [number, number][]; hangPoints: [number, number][] }> = {
    L: { name: 'L-Shape', vertices: [[60, 40], [120, 40], [120, 100], [90, 100], [90, 160], [60, 160]], hangPoints: [[60, 40], [120, 40], [60, 160]] },
    T: { name: 'T-Shape', vertices: [[50, 40], [150, 40], [150, 70], [115, 70], [115, 160], [85, 160], [85, 70], [50, 70]], hangPoints: [[50, 40], [150, 40], [100, 160]] },
  };
  const [shapeKey, setShapeKey] = useState<'L' | 'T'>('L');
  const shape = shapes[shapeKey];

  const computeCentroid = (verts: [number, number][]): [number, number] => {
    let cx = 0, cy = 0, area = 0;
    for (let i = 0; i < verts.length; i++) {
      const j = (i + 1) % verts.length;
      const cross = verts[i][0] * verts[j][1] - verts[j][0] * verts[i][1];
      area += cross; cx += (verts[i][0] + verts[j][0]) * cross; cy += (verts[i][1] + verts[j][1]) * cross;
    }
    area /= 2; cx /= (6 * area); cy /= (6 * area);
    return [cx, cy];
  };

  const centroid = computeCentroid(shape.vertices);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const ox = 80, oy = 20;

    ctx.fillStyle = 'rgba(124,58,237,0.2)'; ctx.strokeStyle = '#a78bfa'; ctx.lineWidth = 2;
    ctx.beginPath(); shape.vertices.forEach(([x, y], i) => i === 0 ? ctx.moveTo(ox + x, oy + y) : ctx.lineTo(ox + x, oy + y));
    ctx.closePath(); ctx.fill(); ctx.stroke();

    shape.hangPoints.forEach(([x, y], i) => {
      ctx.fillStyle = selectedHang === i ? '#f59e0b' : 'rgba(245,158,11,0.4)';
      ctx.beginPath(); ctx.arc(ox + x, oy + y, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#f59e0b'; ctx.font = '10px Poppins'; ctx.textAlign = 'center';
      ctx.fillText(`H${i + 1}`, ox + x, oy + y - 10);
    });

    if (selectedHang !== null) {
      const [hx, hy] = shape.hangPoints[selectedHang];
      ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(ox + hx, oy + hy); ctx.lineTo(ox + centroid[0], oy + centroid[1] + 100); ctx.stroke(); ctx.setLineDash([]);
      shape.hangPoints.forEach(([x, y], i) => {
        if (i !== selectedHang) {
          ctx.strokeStyle = 'rgba(245,158,11,0.3)'; ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
          ctx.beginPath(); ctx.moveTo(ox + x, oy + y); ctx.lineTo(ox + centroid[0], oy + centroid[1] + 100); ctx.stroke(); ctx.setLineDash([]);
        }
      });
    }

    ctx.fillStyle = '#f43f5e'; ctx.beginPath(); ctx.arc(ox + centroid[0], oy + centroid[1], 7, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f43f5e'; ctx.font = 'bold 11px Poppins'; ctx.textAlign = 'left';
    ctx.fillText(`CM (${centroid[0].toFixed(0)}, ${centroid[1].toFixed(0)})`, ox + centroid[0] + 12, oy + centroid[1] + 4);
  }, [selectedHang, shapeKey, shape, centroid]);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {Object.entries(shapes).map(([key, s]) => (
          <button key={key} onClick={() => { setShapeKey(key as 'L' | 'T'); setSelectedHang(null); }}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${shapeKey === key ? 'bg-brand-purple/20 text-brand-purple border border-brand-purple/30' : 'glass-card text-gray-400'}`}>{s.name}</button>
        ))}
      </div>
      <div className="flex gap-2 mb-4">
        {shape.hangPoints.map((_, i) => (
          <button key={i} onClick={() => setSelectedHang(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${selectedHang === i ? 'bg-brand-amber/20 text-brand-amber border border-brand-amber/30' : 'glass-card text-gray-400'}`}>Hang H{i + 1}</button>
        ))}
      </div>
      <div className="bg-brand-dark/60 rounded-2xl overflow-hidden border border-white/5 mb-4">
        <canvas ref={canvasRef} width={300} height={220} className="w-full" style={{ maxWidth: 300, margin: '0 auto', display: 'block' }} />
      </div>
      <div className="glass-card rounded-xl p-4">
        <p className="text-gray-300 text-sm">Click a hang point to draw the plumb line. All plumb lines intersect at the <strong className="text-brand-rose">center of mass</strong>.</p>
      </div>
    </div>
  );
}
