import { useEffect, useRef } from 'react';
import { isLowEndDevice } from '../utils/performance';
import { CANVAS_OPACITY_60 } from '../utils/styles';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  pulse: number;
  pulseSpeed: number;
}

export default function PhysicsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Performance detection
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowEnd = isLowEndDevice();
    const shouldAnimate = !prefersReducedMotion;

    let animId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Offscreen canvas for static grid (drawn once, composited each frame)
    let gridCanvas: OffscreenCanvas | null = null;
    let gridCtx: OffscreenCanvasRenderingContext2D | null = null;

    function buildGrid() {
      gridCanvas = new OffscreenCanvas(width, height);
      gridCtx = gridCanvas.getContext('2d');
      if (!gridCtx) return;
      gridCtx.strokeStyle = 'rgba(124,58,237,0.03)';
      gridCtx.lineWidth = 0.5;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        gridCtx.beginPath();
        gridCtx.moveTo(x, 0);
        gridCtx.lineTo(x, height);
        gridCtx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        gridCtx.beginPath();
        gridCtx.moveTo(0, y);
        gridCtx.lineTo(width, y);
        gridCtx.stroke();
      }
    }

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      buildGrid();
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#7c3aed', '#ec4899', '#06b6d4', '#f59e0b', '#a78bfa', '#14b8a6'];

    // Reduce particles on low-end devices
    const particleDivisor = lowEnd ? 24 : 12;
    const maxParticles = lowEnd ? 40 : 120;
    const particleCount = Math.min(maxParticles, Math.floor(width / particleDivisor));

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (lowEnd ? 0.2 : 0.4),
        vy: (Math.random() - 0.5) * (lowEnd ? 0.2 : 0.4),
        radius: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    if (!lowEnd) {
      window.addEventListener('mousemove', onMouseMove);
    }

    // Spatial grid for O(n) connection lookups instead of O(n^2)
    const CONNECTION_DIST = 120;
    const CELL_SIZE = CONNECTION_DIST;

    function buildSpatialGrid() {
      const cols = Math.ceil(width / CELL_SIZE) + 1;
      const rows = Math.ceil(height / CELL_SIZE) + 1;
      // Flat array of particle index lists
      const grid: number[][] = new Array(cols * rows);
      for (let i = 0; i < grid.length; i++) grid[i] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const col = Math.floor(p.x / CELL_SIZE);
        const row = Math.floor(p.y / CELL_SIZE);
        const idx = row * cols + col;
        if (idx >= 0 && idx < grid.length) {
          grid[idx].push(i);
        }
      }
      return { grid, cols, rows };
    }

    function drawWaves(time: number) {
      ctx!.strokeStyle = 'rgba(124,58,237,0.06)';
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      for (let x = 0; x < width; x += 3) {
        const y = height / 2 + Math.sin(x * 0.005 + time * 0.0008) * 50 + Math.sin(x * 0.01 + time * 0.001) * 30;
        x === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y);
      }
      ctx!.stroke();

      // Second wave
      ctx!.strokeStyle = 'rgba(6,182,212,0.04)';
      ctx!.beginPath();
      for (let x = 0; x < width; x += 3) {
        const y = height / 2 + Math.cos(x * 0.004 + time * 0.0006) * 60 + Math.sin(x * 0.008 + time * 0.0009) * 20;
        x === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y);
      }
      ctx!.stroke();
    }

    function drawOrbits(time: number) {
      const cx = width / 2;
      const cy = height / 2;
      const orbits = [
        { radius: 80, speed: 0.0008, color: '#7c3aed' },
        { radius: 120, speed: -0.0006, color: '#06b6d4' },
        { radius: 160, speed: 0.0004, color: '#ec4899' },
      ];

      for (let oi = 0; oi < orbits.length; oi++) {
        const orbit = orbits[oi];
        ctx!.strokeStyle = `${orbit.color}08`;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.ellipse(cx, cy, orbit.radius, orbit.radius * 0.6, 0, 0, Math.PI * 2);
        ctx!.stroke();

        // Electron dot
        const angle = time * orbit.speed;
        const ex = cx + Math.cos(angle) * orbit.radius;
        const ey = cy + Math.sin(angle) * orbit.radius * 0.6;
        ctx!.fillStyle = orbit.color + '40';
        ctx!.beginPath();
        ctx!.arc(ex, ey, 3, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function drawParticles(_time: number) {
      // Update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        // Bounce
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse attraction (only on non-low-end)
        if (!lowEnd) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 22500) { // 150^2
            p.vx += dx * 0.0001;
            p.vy += dy * 0.0001;
          }
        }

        // Clamp velocity
        const maxVel = 0.5;
        p.vx = Math.max(-maxVel, Math.min(maxVel, p.vx));
        p.vy = Math.max(-maxVel, Math.min(maxVel, p.vy));

        // Draw
        const pulseAlpha = p.alpha + Math.sin(p.pulse) * 0.2;
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = pulseAlpha;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fill();
      }

      ctx!.globalAlpha = 1;

      // Draw connections using spatial grid (skip on low-end for performance)
      if (!lowEnd) {
        const { grid, cols, rows } = buildSpatialGrid();
        const connectionDistSq = CONNECTION_DIST * CONNECTION_DIST;

        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const cell = grid[row * cols + col];
            if (!cell || cell.length === 0) continue;

            // Check this cell and 4 neighbors (right, bottom, bottom-left, bottom-right)
            const neighborIndices = [
              row * cols + (col + 1),           // right
              (row + 1) * cols + col,            // bottom
              (row + 1) * cols + (col - 1),      // bottom-left
              (row + 1) * cols + (col + 1),      // bottom-right
            ];

            // Process current cell
            for (let ai = 0; ai < cell.length; ai++) {
              const i = cell[ai];
              const pi = particles[i];
              for (let bj = ai + 1; bj < cell.length; bj++) {
                const j = cell[bj];
                const pj = particles[j];
                const dx = pi.x - pj.x;
                const dy = pi.y - pj.y;
                const distSq = dx * dx + dy * dy;
                if (distSq < connectionDistSq) {
                  const dist = Math.sqrt(distSq);
                  const alpha = (1 - dist / CONNECTION_DIST) * 0.08;
                  ctx!.strokeStyle = `rgba(124,58,237,${alpha})`;
                  ctx!.lineWidth = 0.5;
                  ctx!.beginPath();
                  ctx!.moveTo(pi.x, pi.y);
                  ctx!.lineTo(pj.x, pj.y);
                  ctx!.stroke();
                }
              }
            }

            // Process neighbor cells
            for (const ni of neighborIndices) {
              const neighborCell = grid[ni] || [];
              for (let ai = 0; ai < cell.length; ai++) {
                const i = cell[ai];
                const pi = particles[i];
                for (let bj = 0; bj < neighborCell.length; bj++) {
                  const j = neighborCell[bj];
                  const pj = particles[j];
                  const dx = pi.x - pj.x;
                  const dy = pi.y - pj.y;
                  const distSq = dx * dx + dy * dy;
                  if (distSq < connectionDistSq) {
                    const dist = Math.sqrt(distSq);
                    const alpha = (1 - dist / CONNECTION_DIST) * 0.08;
                    ctx!.strokeStyle = `rgba(124,58,237,${alpha})`;
                    ctx!.lineWidth = 0.5;
                    ctx!.beginPath();
                    ctx!.moveTo(pi.x, pi.y);
                    ctx!.lineTo(pj.x, pj.y);
                    ctx!.stroke();
                  }
                }
              }
            }
          }
        }
      }
    }

    function animate(time: number) {
      ctx!.clearRect(0, 0, width, height);

      // Composite cached grid (no per-frame redraw)
      if (gridCanvas && gridCtx) {
        ctx!.drawImage(gridCanvas, 0, 0);
      }

      if (shouldAnimate) {
        drawWaves(time);
        drawOrbits(time);
        drawParticles(time);
      } else {
        // Static render for reduced motion
        drawParticles(0);
      }

      animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      if (!lowEnd) {
        window.removeEventListener('mousemove', onMouseMove);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={CANVAS_OPACITY_60}
      aria-hidden="true"
    />
  );
}
