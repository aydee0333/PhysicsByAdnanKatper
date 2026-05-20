import { useRef, useEffect, useCallback, useState } from 'react';
import type { SimulationState, SimulationConfig, SimulationInstance, SimulationFactory } from './types';
import { isLowEndDevice } from '../utils/performance';

export interface SimulationControls {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  reset: () => void;
  setSpeed: (speed: number) => void;
}

export function useSimulationCanvas(factory: SimulationFactory) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const simRef = useRef<SimulationInstance | null>(null);
  const animRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const stateRef = useRef<SimulationState>({
    running: false,
    speed: 1,
    elapsed: 0,
    dt: 0,
  });

  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeedState] = useState(1);

  const controls: SimulationControls = {
    play: useCallback(() => {
      stateRef.current.running = true;
      setIsRunning(true);
    }, []),
    pause: useCallback(() => {
      stateRef.current.running = false;
      setIsRunning(false);
    }, []),
    toggle: useCallback(() => {
      stateRef.current.running = !stateRef.current.running;
      setIsRunning(stateRef.current.running);
    }, []),
    reset: useCallback(() => {
      stateRef.current.elapsed = 0;
      stateRef.current.running = false;
      setIsRunning(false);
      simRef.current?.reset();
    }, []),
    setSpeed: useCallback((s: number) => {
      stateRef.current.speed = s;
      setSpeedState(s);
    }, []),
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowEnd = isLowEndDevice();
    let dpr = Math.min(window.devicePixelRatio || 1, lowEnd ? 1.5 : 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, lowEnd ? 1.5 : 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      if (simRef.current) {
        simRef.current.destroy();
      }

      const config: SimulationConfig = {
        width: rect.width,
        height: rect.height,
        dpr,
        reducedMotion,
      };

      simRef.current = factory(ctx, config);
      simRef.current.init(ctx, config);
    };

    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(canvas);

    // Animation loop
    const animate = (timestamp: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = timestamp;
      }

      const rawDt = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      const state = stateRef.current;
      state.dt = Math.min(rawDt, 0.05) * state.speed; // cap dt, apply speed

      if (state.running) {
        state.elapsed += state.dt;
      }

      // Input state is managed separately via useSimulationInput
      const inputState = (canvas as any).__simInput || {
        mouseX: 0, mouseY: 0, mouseDown: false, touchActive: false, dragging: false,
      };

      if (simRef.current) {
        if (state.running) {
          simRef.current.update(state, inputState);
        }
        const rect = canvas.getBoundingClientRect();
        const config: SimulationConfig = {
          width: rect.width,
          height: rect.height,
          dpr,
          reducedMotion,
        };
        simRef.current.draw(ctx, config);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      resizeObserver.disconnect();
      simRef.current?.destroy();
    };
  }, [factory]);

  return { canvasRef, isRunning, speed, controls };
}
