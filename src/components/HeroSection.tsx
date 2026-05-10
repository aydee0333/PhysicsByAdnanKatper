import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 18;
    camera.position.y = 2;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particles
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const colorPalette = [
      new THREE.Color(0x7c3aed),
      new THREE.Color(0xec4899),
      new THREE.Color(0x06b6d4),
      new THREE.Color(0xf59e0b),
      new THREE.Color(0xa78bfa),
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 3 + 1;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMat = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Floating shapes
    const shapes: THREE.Mesh[] = [];
    const shapeGeos = [
      new THREE.IcosahedronGeometry(0.6, 0),
      new THREE.OctahedronGeometry(0.5, 0),
      new THREE.TetrahedronGeometry(0.5, 0),
      new THREE.SphereGeometry(0.4, 16, 16),
    ];

    const shapeMats = [
      new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.3, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0xec4899, transparent: true, opacity: 0.3, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.3, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.3, wireframe: true }),
    ];

    for (let i = 0; i < 12; i++) {
      const geo = shapeGeos[i % shapeGeos.length];
      const mat = shapeMats[i % shapeMats.length].clone();
      const mesh = new THREE.Mesh(geo, mat);

      mesh.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15 - 5
      );

      (mesh as any).userData = {
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.01,
        },
        floatSpeed: Math.random() * 0.005 + 0.002,
        floatOffset: Math.random() * Math.PI * 2,
        initialY: mesh.position.y,
      };

      shapes.push(mesh);
      scene.add(mesh);
    }

    // Connection lines
    const lineMat = new THREE.LineBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.08 });
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * 6);
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    document.addEventListener('mousemove', onMouseMove);

    const clock = new THREE.Clock();
    let animId: number;

    function animate() {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      camera.position.x = mouseX * 2;
      camera.position.y = 2 + mouseY * 1;
      camera.lookAt(0, 0, 0);

      // Animate particles
      const posArray = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 1] += Math.sin(time * 0.5 + i * 0.1) * 0.003;
        posArray[i * 3] += Math.cos(time * 0.3 + i * 0.05) * 0.002;
      }
      particles.geometry.attributes.position.needsUpdate = true;
      particles.rotation.y = time * 0.02;

      // Animate shapes
      shapes.forEach((shape) => {
        const ud = (shape as any).userData;
        shape.rotation.x += ud.rotSpeed.x;
        shape.rotation.y += ud.rotSpeed.y;
        shape.rotation.z += ud.rotSpeed.z;
        shape.position.y = ud.initialY + Math.sin(time * ud.floatSpeed * 100 + ud.floatOffset) * 1.5;
      });

      // Update connection lines
      const linePos = lines.geometry.attributes.position.array as Float32Array;
      let lineIdx = 0;
      const maxDist = 4;

      for (let i = 0; i < Math.min(particleCount, 60); i++) {
        for (let j = i + 1; j < Math.min(particleCount, 60); j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDist && lineIdx < linePositions.length - 6) {
            linePos[lineIdx++] = posArray[i * 3];
            linePos[lineIdx++] = posArray[i * 3 + 1];
            linePos[lineIdx++] = posArray[i * 3 + 2];
            linePos[lineIdx++] = posArray[j * 3];
            linePos[lineIdx++] = posArray[j * 3 + 1];
            linePos[lineIdx++] = posArray[j * 3 + 2];
          }
        }
      }

      for (let i = lineIdx; i < linePositions.length; i++) {
        linePos[i] = 0;
      }
      lines.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    }

    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      shapeGeos.forEach((g) => g.dispose());
      shapeMats.forEach((m) => m.dispose());
    };
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
      />

      {/* Decorative blobs */}
      <div className="blob w-96 h-96 bg-brand-purple top-20 -left-20" style={{ animationDelay: '0s' }} />
      <div className="blob w-80 h-80 bg-brand-pink bottom-20 -right-20" style={{ animationDelay: '5s' }} />
      <div className="blob w-64 h-64 bg-brand-cyan top-1/2 left-1/3" style={{ animationDelay: '10s' }} />

      {/* Orbit rings */}
      <div
        className="orbit-ring w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block"
        style={{ animationDuration: '25s' }}
      >
        <div className="absolute w-2 h-2 rounded-full bg-[#a78bfa] shadow-[0_0_12px_#a78bfa]" style={{ top: 0, left: '50%', transform: 'translate(-50%, -50%)' }} />
      </div>
      <div
        className="orbit-ring w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block"
        style={{ animationDuration: '35s', animationDirection: 'reverse' }}
      >
        <div className="absolute w-2 h-2 rounded-full bg-[#ec4899] shadow-[0_0_12px_#ec4899]" style={{ top: '50%', right: 0, transform: 'translate(50%, -50%)' }} />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card mb-8 float-anim">
          <span className="w-2 h-2 rounded-full bg-brand-lime pulse-glow" />
          <span className="text-xs font-medium text-brand-cyan tracking-widest uppercase">Class IX Physics</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
          <span className="block text-white">Discover</span>
          <span className="gradient-text">Kinematics</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          The beautiful science of motion. Learn how things move, why they move, and the math that describes it all. Simple words, big ideas!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#kinematics" onClick={(e) => handleScroll(e, '#kinematics')} className="btn-primary px-8 py-4 rounded-2xl text-white font-semibold text-sm tracking-wide inline-flex items-center gap-2">
            <span>Start Learning</span>
            <ArrowDown size={16} />
          </a>
          <a href="#about" onClick={(e) => handleScroll(e, '#about')} className="glass-card px-8 py-4 rounded-2xl text-gray-300 font-semibold text-sm tracking-wide hover:text-white hover:border-brand-purple/40 transition-all inline-flex items-center gap-2">
            <span>Meet Your Teacher</span>
          </a>
        </div>

        {/* School info pill */}
        <div className="mt-16 inline-flex items-center gap-4 school-badge px-6 py-3 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-amber to-brand-rose flex items-center justify-center text-white text-lg font-bold">G</div>
          <div className="text-left">
            <p className="text-xs text-brand-amber font-semibold">Govt. Boys Higher Secondary School</p>
            <p className="text-[10px] text-gray-400">Naudero, Pakistan</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] text-gray-500 tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex justify-center pt-2">
          <div className="w-1 h-2 bg-brand-purple rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
