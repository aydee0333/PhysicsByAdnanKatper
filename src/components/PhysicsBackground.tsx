import { useEffect, useRef } from 'react';

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

    let animId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#7c3aed', '#ec4899', '#06b6d4', '#f59e0b', '#a78bfa', '#14b8a6'];
    const particleCount = Math.min(120, Math.floor(width / 12));

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
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
    window.addEventListener('mousemove', onMouseMove);

    function drawGrid() {
      ctx!.strokeStyle = 'rgba(124,58,237,0.03)';
      ctx!.lineWidth = 0.5;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx!.beginPath();
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, height);
        ctx!.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(width, y);
        ctx!.stroke();
      }
    }

    function drawSineWaves(time: number) {
      const waveColors = ['rgba(124,58,237,0.06)', 'rgba(236,72,153,0.05)', 'rgba(6,182,212,0.05)'];
      waveColors.forEach((color, idx) => {
        ctx!.strokeStyle = color;
        ctx!.lineWidth = 1.5;
        ctx!.beginPath();
        for (let x = 0; x < width; x += 2) {
          const y = height * 0.3 + idx * 80 + Math.sin((x * 0.008) + time * 0.5 + idx) * 30 + Math.sin((x * 0.015) + time * 0.3) * 15;
          if (x === 0) ctx!.moveTo(x, y);
          else ctx!.lineTo(x, y);
        }
        ctx!.stroke();
      });
    }

    function drawAtomOrbit(time: number, cx: number, cy: number, radius: number, color: string, speed: number, tilt: number) {
      ctx!.save();
      ctx!.translate(cx, cy);
      ctx!.rotate(tilt);
      ctx!.strokeStyle = color;
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.ellipse(0, 0, radius, radius * 0.3, 0, 0, Math.PI * 2);
      ctx!.stroke();

      const angle = time * speed;
      const ex = Math.cos(angle) * radius;
      const ey = Math.sin(angle) * radius * 0.3;
      ctx!.fillStyle = color;
      ctx!.beginPath();
      ctx!.arc(ex, ey, 3, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();
    }

    function animate(time: number) {
      animId = requestAnimationFrame((t) => animate(t * 0.001));
      const t = time;

      ctx!.clearRect(0, 0, width, height);

      drawGrid();
      drawSineWaves(t);

      // Atom orbits in background
      drawAtomOrbit(t, width * 0.15, height * 0.2, 60, 'rgba(124,58,237,0.15)', 0.3, 0.2);
      drawAtomOrbit(t, width * 0.15, height * 0.2, 80, 'rgba(236,72,153,0.12)', -0.2, -0.3);
      drawAtomOrbit(t, width * 0.85, height * 0.75, 70, 'rgba(6,182,212,0.15)', 0.25, 0.4);
      drawAtomOrbit(t, width * 0.85, height * 0.75, 95, 'rgba(245,158,11,0.1)', -0.15, -0.2);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx!.strokeStyle = `rgba(124,58,237,${0.06 * (1 - dist / 120)})`;
            ctx!.lineWidth = 0.5;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const pulseRadius = p.radius + Math.sin(p.pulse) * 0.5;
        const alpha = p.alpha + Math.sin(p.pulse) * 0.15;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, pulseRadius, 0, Math.PI * 2);
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = Math.max(0.1, Math.min(0.8, alpha));
        ctx!.fill();
        ctx!.globalAlpha = 1;

        // Glow
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, pulseRadius * 3, 0, Math.PI * 2);
        const grad = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulseRadius * 3);
        grad.addColorStop(0, p.color + '20');
        grad.addColorStop(1, 'transparent');
        ctx!.fillStyle = grad;
        ctx!.fill();
      });

      // Mouse interaction - attract nearby particles
      particles.forEach((p) => {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.vx += dx * 0.00005;
          p.vy += dy * 0.00005;
        }
      });
    }

    animate(0);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
    />
  );
}
