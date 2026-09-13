'use client';
import { useRef, type PointerEvent } from 'react';

export function useSwipe(onLeft: () => void, onRight = onLeft) {
  const start = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);
  return {
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      
      start.current = { x: event.clientX, y: event.clientY }; dragged.current = false;
    },
    onPointerUp: (event: PointerEvent<HTMLElement>) => {
      if (!start.current) return;
      const dx = event.clientX - start.current.x, dy = event.clientY - start.current.y;
      start.current = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3) { dragged.current = true; dx < 0 ? onLeft() : onRight(); }
    },
    onPointerCancel: () => { start.current = null; },
    onClickCapture: (event: React.MouseEvent<HTMLElement>) => { if (dragged.current) { event.preventDefault(); event.stopPropagation(); dragged.current = false; } },
  };
}
