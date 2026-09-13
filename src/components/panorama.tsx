import { forwardRef, type CSSProperties } from 'react';
import { panoramaBackground } from '@/src/data/visuals';

export const Panorama = forwardRef<HTMLDivElement, { progress?: number; eager?: boolean; background?: typeof panoramaBackground }>(function Panorama({ progress = 0, eager = false, background = panoramaBackground }, ref) {
  return <div className="panorama" ref={ref} style={{ '--panorama-progress': progress } as CSSProperties} aria-hidden="true"><picture className="panorama-layer"><source media="(max-width: 760px)" srcSet={background.mobile}/><img src={background.desktop} alt="" width="2172" height="724" loading={eager ? 'eager' : 'lazy'} draggable={false}/></picture></div>;
});
