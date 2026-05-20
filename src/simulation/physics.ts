// === Physics Math Helpers ===

export class Vec2 {
  constructor(public x: number = 0, public y: number = 0) {}

  static from(x: number, y: number): Vec2 {
    return new Vec2(x, y);
  }

  static polar(mag: number, angle: number): Vec2 {
    return new Vec2(mag * Math.cos(angle), mag * Math.sin(angle));
  }

  add(v: Vec2): Vec2 {
    return new Vec2(this.x + v.x, this.y + v.y);
  }

  sub(v: Vec2): Vec2 {
    return new Vec2(this.x - v.x, this.y - v.y);
  }

  scale(s: number): Vec2 {
    return new Vec2(this.x * s, this.y * s);
  }

  mag(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize(): Vec2 {
    const m = this.mag();
    return m === 0 ? new Vec2(0, 0) : this.scale(1 / m);
  }

  dot(v: Vec2): number {
    return this.x * v.x + this.y * v.y;
  }

  rotate(angle: number): Vec2 {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return new Vec2(this.x * c - this.y * s, this.x * s + this.y * c);
  }

  angle(): number {
    return Math.atan2(this.y, this.x);
  }

  copy(): Vec2 {
    return new Vec2(this.x, this.y);
  }
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

export function mapRange(
  val: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return outMin + ((val - inMin) / (inMax - inMin)) * (outMax - outMin);
}

export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function radToDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

// === Canvas Drawing Helpers ===

export function drawArrow(
  ctx: CanvasRenderingContext2D,
  from: Vec2,
  to: Vec2,
  color: string,
  lineWidth = 2,
  headLength = 10
): void {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const angle = Math.atan2(dy, dx);
  const len = Math.sqrt(dx * dx + dy * dy);

  if (len < 2) return;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';

  // Shaft
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x - Math.cos(angle) * headLength, to.y - Math.sin(angle) * headLength);
  ctx.stroke();

  // Arrowhead
  ctx.beginPath();
  ctx.moveTo(to.x, to.y);
  ctx.lineTo(
    to.x - headLength * Math.cos(angle - Math.PI / 6),
    to.y - headLength * Math.sin(angle - Math.PI / 6)
  );
  ctx.lineTo(
    to.x - headLength * Math.cos(angle + Math.PI / 6),
    to.y - headLength * Math.sin(angle + Math.PI / 6)
  );
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

export function drawDashedLine(
  ctx: CanvasRenderingContext2D,
  from: Vec2,
  to: Vec2,
  color: string,
  lineWidth = 1
): void {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
}

export function drawTrail(
  ctx: CanvasRenderingContext2D,
  points: Vec2[],
  color: string,
  lineWidth = 2
): void {
  if (points.length < 2) return;

  ctx.save();
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  for (let i = 1; i < points.length; i++) {
    const alpha = i / points.length;
    ctx.strokeStyle = color;
    ctx.globalAlpha = alpha * 0.6;
    ctx.beginPath();
    ctx.moveTo(points[i - 1].x, points[i - 1].y);
    ctx.lineTo(points[i].x, points[i].y);
    ctx.stroke();
  }

  ctx.globalAlpha = 1;
  ctx.restore();
}

export function drawGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  spacing = 40,
  color = 'rgba(255,255,255,0.05)'
): void {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.5;

  for (let x = 0; x <= width; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  ctx.restore();
}

export function drawCircle(
  ctx: CanvasRenderingContext2D,
  center: Vec2,
  radius: number,
  fillColor: string,
  strokeColor?: string
): void {
  ctx.save();
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
  ctx.fillStyle = fillColor;
  ctx.fill();
  if (strokeColor) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  ctx.restore();
}

export function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  pos: Vec2,
  color = '#fff',
  fontSize = 14,
  align: CanvasTextAlign = 'center'
): void {
  ctx.save();
  ctx.fillStyle = color;
  ctx.font = `${fontSize}px "Inter", system-ui, sans-serif`;
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  ctx.fillText(text, pos.x, pos.y);
  ctx.restore();
}

export function drawAngleArc(
  ctx: CanvasRenderingContext2D,
  center: Vec2,
  radius: number,
  startAngle: number,
  endAngle: number,
  color: string,
  label?: string
): void {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, startAngle, endAngle);
  ctx.stroke();

  if (label) {
    const midAngle = (startAngle + endAngle) / 2;
    const labelPos = Vec2.from(
      center.x + (radius + 14) * Math.cos(midAngle),
      center.y + (radius + 14) * Math.sin(midAngle)
    );
    drawText(ctx, label, labelPos, color, 11);
  }

  ctx.restore();
}
