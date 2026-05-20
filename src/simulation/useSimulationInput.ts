import { useEffect, useRef } from 'react';
import type { SimInputState } from './types';

export function useSimulationInput(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const inputRef = useRef<SimInputState>({
    mouseX: 0,
    mouseY: 0,
    mouseDown: false,
    touchActive: false,
    dragging: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getPos = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const onMouseMove = (e: MouseEvent) => {
      const pos = getPos(e.clientX, e.clientY);
      inputRef.current.mouseX = pos.x;
      inputRef.current.mouseY = pos.y;
      if (inputRef.current.mouseDown) {
        inputRef.current.dragging = true;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      const pos = getPos(e.clientX, e.clientY);
      inputRef.current.mouseX = pos.x;
      inputRef.current.mouseY = pos.y;
      inputRef.current.mouseDown = true;
    };

    const onMouseUp = () => {
      inputRef.current.mouseDown = false;
      inputRef.current.dragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const pos = getPos(touch.clientX, touch.clientY);
      inputRef.current.mouseX = pos.x;
      inputRef.current.mouseY = pos.y;
      inputRef.current.touchActive = true;
      inputRef.current.mouseDown = true;
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const pos = getPos(touch.clientX, touch.clientY);
      inputRef.current.mouseX = pos.x;
      inputRef.current.mouseY = pos.y;
      inputRef.current.dragging = true;
    };

    const onTouchEnd = () => {
      inputRef.current.touchActive = false;
      inputRef.current.mouseDown = false;
      inputRef.current.dragging = false;
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseleave', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd);

    // Attach input ref to canvas for the animation loop to read
    (canvas as any).__simInput = inputRef.current;

    return () => {
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mouseleave', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
    };
  }, [canvasRef]);

  return inputRef;
}
