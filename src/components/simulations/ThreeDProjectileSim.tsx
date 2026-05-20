import { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const G = 9.8;

export default function ThreeDProjectileSim() {
  const [angle, setAngle] = useState(45);
  const [velocity, setVelocity] = useState(20);
  const [azimuth, setAzimuth] = useState(45);
  const [isRunning, setIsRunning] = useState(false);
  const [liveValues, setLiveValues] = useState({ x: 0, y: 0, z: 0, t: 0, range: 0, maxH: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animFrameRef = useRef<number>(0);
  const simTimeRef = useRef(0);
  const isRunningRef = useRef(false);
  const landedRef = useRef(false);
  const trailRef = useRef<THREE.Vector3[]>([]);
  const trailLineRef = useRef<THREE.Line | null>(null);
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const arrowGroupRef = useRef<THREE.Group | null>(null);

  const paramsRef = useRef({ angle, velocity, azimuth });
  paramsRef.current = { angle, velocity, azimuth };

  // Compute trajectory params
  const getTrajectoryParams = useCallback(() => {
    const { angle: a, velocity: v, azimuth: az } = paramsRef.current;
    const aRad = (a * Math.PI) / 180;
    const azRad = (az * Math.PI) / 180;
    const vx = v * Math.cos(aRad) * Math.sin(azRad);
    const vy = v * Math.sin(aRad);
    const vz = v * Math.cos(aRad) * Math.cos(azRad);
    const totalTime = (2 * vy) / G;
    const range = v * Math.cos(aRad) * totalTime;
    const maxHeight = (vy * vy) / (2 * G);
    return { vx, vy, vz, totalTime, range, maxHeight };
  }, []);

  // Build predicted path points
  const buildPredictedPath = useCallback(() => {
    const { vx, vy, vz, totalTime } = getTrajectoryParams();
    const pts: THREE.Vector3[] = [];
    const steps = 80;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * totalTime;
      const px = vx * t;
      const py = vy * t - 0.5 * G * t * t;
      const pz = vz * t;
      pts.push(new THREE.Vector3(px, Math.max(0, py), pz));
    }
    return pts;
  }, [getTrajectoryParams]);

  // Build scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(25, 18, 25);
    camera.lookAt(0, 3, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.target.set(0, 3, 0);
    controlsRef.current = controls;

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

    // Ground grid
    const gridHelper = new THREE.GridHelper(40, 20, 0x222222, 0x161616);
    scene.add(gridHelper);

    // Ground plane (semi-transparent)
    const groundGeo = new THREE.PlaneGeometry(40, 40);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      transparent: true,
      opacity: 0.4,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    scene.add(ground);

    // Axes labels (small spheres at axis ends)
    const axisLen = 5;
    const axisColors = [0xff4444, 0x44ff44, 0x4488ff]; // X=red, Y=green, Z=blue
    const axisDirs = [
      new THREE.Vector3(axisLen, 0, 0),
      new THREE.Vector3(0, axisLen, 0),
      new THREE.Vector3(0, 0, axisLen),
    ];
    axisDirs.forEach((dir, i) => {
      const arrow = new THREE.ArrowHelper(dir.clone().normalize(), new THREE.Vector3(0, 0, 0), axisLen, axisColors[i], 0.6, 0.4);
      scene.add(arrow);
    });

    // Origin marker
    const originGeo = new THREE.SphereGeometry(0.15, 12, 12);
    const originMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const originSphere = new THREE.Mesh(originGeo, originMat);
    scene.add(originSphere);

    // Projectile sphere
    const sphereGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const sphereMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x06b6d4, emissiveIntensity: 0.3 });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphere.position.set(0, 0, 0);
    scene.add(sphere);
    sphereRef.current = sphere;

    // Velocity arrows group
    const arrowGroup = new THREE.Group();
    scene.add(arrowGroup);
    arrowGroupRef.current = arrowGroup;

    // Predicted path (dashed)
    const predPts = buildPredictedPath();
    const predGeo = new THREE.BufferGeometry().setFromPoints(predPts);
    const predMat = new THREE.LineDashedMaterial({ color: 0x444444, dashSize: 0.5, gapSize: 0.3, linewidth: 1 });
    const predLine = new THREE.Line(predGeo, predMat);
    predLine.computeLineDistances();
    scene.add(predLine);

    // Trail line
    const trailGeo = new THREE.BufferGeometry();
    const trailMat = new THREE.LineBasicMaterial({ color: 0x06b6d4, linewidth: 2 });
    const trailLine = new THREE.Line(trailGeo, trailMat);
    scene.add(trailLine);
    trailLineRef.current = trailLine;

    // Resize handler
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Render loop
    let lastTime = performance.now();
    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (isRunningRef.current && !landedRef.current) {
        simTimeRef.current += dt;
        const { vx, vy, vz, totalTime } = getTrajectoryParams();
        const t = simTimeRef.current;

        const px = vx * t;
        const py = vy * t - 0.5 * G * t * t;
        const pz = vz * t;

        if (py < 0 && t > 0.01) {
          landedRef.current = true;
          isRunningRef.current = false;
          setIsRunning(false);
          sphere.position.set(vx * totalTime, 0, vz * totalTime);
        } else {
          sphere.position.set(px, Math.max(0, py), pz);
        }

        // Update trail
        trailRef.current.push(sphere.position.clone());
        if (trailRef.current.length > 500) trailRef.current.shift();
        const trailGeo2 = new THREE.BufferGeometry().setFromPoints(trailRef.current);
        trailLine.geometry.dispose();
        trailLine.geometry = trailGeo2;

        // Update velocity arrows
        arrowGroup.clear();
        const currentVx = vx;
        const currentVy = vy - G * t;
        const currentVz = vz;
        const arrowScale = 0.3;
        const pos = sphere.position;

        // Vx arrow (red)
        const vxDir = new THREE.Vector3(currentVx * arrowScale, 0, 0);
        if (vxDir.length() > 0.01) {
          arrowGroup.add(new THREE.ArrowHelper(vxDir.clone().normalize(), pos, vxDir.length(), 0xff4444, 0.3, 0.2));
        }
        // Vy arrow (green)
        const vyDir = new THREE.Vector3(0, currentVy * arrowScale, 0);
        if (vyDir.length() > 0.01) {
          arrowGroup.add(new THREE.ArrowHelper(vyDir.clone().normalize(), pos, vyDir.length(), 0x44ff44, 0.3, 0.2));
        }
        // Vz arrow (blue)
        const vzDir = new THREE.Vector3(0, 0, currentVz * arrowScale);
        if (vzDir.length() > 0.01) {
          arrowGroup.add(new THREE.ArrowHelper(vzDir.clone().normalize(), pos, vzDir.length(), 0x4488ff, 0.3, 0.2));
        }

        // Update live values
        setLiveValues({
          x: px,
          y: Math.max(0, py),
          z: pz,
          t,
          range: Math.sqrt(px * px + pz * pz),
          maxH: (vy * vy) / (2 * G),
        });
      }

      controls.update();
      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(loop);
    };
    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', onResize);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [buildPredictedPath, getTrajectoryParams]);

  // Update predicted path when params change
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Remove old predicted line (find by dashed material)
    const toRemove: THREE.Object3D[] = [];
    scene.traverse((child) => {
      if (child instanceof THREE.Line && child.material instanceof THREE.LineDashedMaterial) {
        toRemove.push(child);
      }
    });
    toRemove.forEach((c) => {
      scene.remove(c);
      const line = c as THREE.Line;
      line.geometry.dispose();
      const mat = line.material;
      if (Array.isArray(mat)) {
        mat.forEach((m) => m.dispose());
      } else {
        mat.dispose();
      }
    });

    // Add new predicted path
    const predPts = buildPredictedPath();
    const predGeo = new THREE.BufferGeometry().setFromPoints(predPts);
    const predMat = new THREE.LineDashedMaterial({ color: 0x444444, dashSize: 0.5, gapSize: 0.3 });
    const predLine = new THREE.Line(predGeo, predMat);
    predLine.computeLineDistances();
    scene.add(predLine);
  }, [angle, velocity, azimuth, buildPredictedPath]);

  const handlePlay = () => {
    if (landedRef.current) handleReset();
    isRunningRef.current = true;
    setIsRunning(true);
  };

  const handlePause = () => {
    isRunningRef.current = false;
    setIsRunning(false);
  };

  const handleReset = () => {
    isRunningRef.current = false;
    landedRef.current = false;
    simTimeRef.current = 0;
    setIsRunning(false);
    trailRef.current = [];

    if (sphereRef.current) sphereRef.current.position.set(0, 0, 0);
    if (arrowGroupRef.current) arrowGroupRef.current.clear();
    if (trailLineRef.current) {
      const emptyGeo = new THREE.BufferGeometry().setFromPoints([]);
      trailLineRef.current.geometry.dispose();
      trailLineRef.current.geometry = emptyGeo;
    }

    setLiveValues({ x: 0, y: 0, z: 0, t: 0, range: 0, maxH: 0 });
  };

  const btnClass = 'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors';

  return (
    <div className="space-y-4">
      <div className="relative">
        <div
          ref={containerRef}
          className="w-full rounded-2xl overflow-hidden border border-white/10 bg-black/40"
          style={{ aspectRatio: '16/10' }}
        />
        <span className="absolute top-3 left-3 text-xs text-gray-500 pointer-events-none select-none">
          3D View &mdash; Drag to rotate
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 flex-wrap">
        {!isRunning ? (
          <button onClick={handlePlay} className={`${btnClass} bg-emerald-600 hover:bg-emerald-500 text-white`}>
            Play
          </button>
        ) : (
          <button onClick={handlePause} className={`${btnClass} bg-amber-600 hover:bg-amber-500 text-white`}>
            Pause
          </button>
        )}
        <button onClick={handleReset} className={`${btnClass} bg-gray-700 hover:bg-gray-600 text-gray-200`}>
          Reset
        </button>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Launch Angle', value: angle, onChange: setAngle, min: 5, max: 85, step: 1, unit: '°', color: '#a78bfa' },
          { label: 'Velocity', value: velocity, onChange: setVelocity, min: 5, max: 50, step: 1, unit: 'm/s', color: '#06b6d4' },
          { label: 'Azimuth', value: azimuth, onChange: setAzimuth, min: 0, max: 360, step: 1, unit: '°', color: '#f59e0b' },
        ].map((s) => (
          <div key={s.label} className="space-y-1">
            <div className="flex justify-between text-xs text-gray-400">
              <span>{s.label}</span>
              <span style={{ color: s.color }}>{s.value}{s.unit}</span>
            </div>
            <input
              type="range"
              min={s.min}
              max={s.max}
              step={s.step}
              value={s.value}
              onChange={(e) => s.onChange(Number(e.target.value))}
              className="w-full accent-current"
              style={{ accentColor: s.color }}
            />
          </div>
        ))}
      </div>

      {/* Live values */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {[
          { label: 'x', value: liveValues.x.toFixed(1), unit: 'm', color: '#ff4444' },
          { label: 'y', value: liveValues.y.toFixed(1), unit: 'm', color: '#44ff44' },
          { label: 'z', value: liveValues.z.toFixed(1), unit: 'm', color: '#4488ff' },
          { label: 't', value: liveValues.t.toFixed(2), unit: 's', color: '#ffffff' },
          { label: 'Range', value: liveValues.range.toFixed(1), unit: 'm', color: '#a78bfa' },
          { label: 'Max H', value: liveValues.maxH.toFixed(1), unit: 'm', color: '#ec4899' },
        ].map((v) => (
          <div key={v.label} className="bg-white/5 rounded-lg px-2 py-1.5 text-center">
            <div className="text-[10px] text-gray-500">{v.label}</div>
            <div className="text-sm font-mono" style={{ color: v.color }}>
              {v.value}<span className="text-[10px] text-gray-600 ms-0.5">{v.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-[11px] text-gray-500">
        <span><span className="inline-block w-3 h-3 rounded-full bg-[#ff4444] me-1 align-middle" />Vx</span>
        <span><span className="inline-block w-3 h-3 rounded-full bg-[#44ff44] me-1 align-middle" />Vy</span>
        <span><span className="inline-block w-3 h-3 rounded-full bg-[#4488ff] me-1 align-middle" />Vz</span>
        <span><span className="inline-block w-3 h-0.5 bg-[#06b6d4] me-1 align-middle" />Trail</span>
        <span><span className="inline-block w-3 h-0.5 bg-[#444444] me-1 align-middle border-dashed border-t border-gray-500" />Predicted</span>
      </div>
    </div>
  );
}
