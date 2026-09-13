import mapping from '../../docs/product-asset-map.json';
import { withBasePath } from '@/lib/utils';

export function imageSources(image: string) {
  const entry = mapping.find(item => image.endsWith(`/${item.file}-960.webp`));
  if (!entry) return undefined;
  const widths = new Set<number>();
  return entry.outputs.filter(out => { if (widths.has(out.width)) return false; widths.add(out.width); return true; })
    .map(out => `${withBasePath(out.file)} ${out.width}w`).join(', ');
}
const prepared = new Map<string, Promise<void>>();
export function prepareImages(images: string[], sizes: string) {
  if (typeof window === 'undefined') return;
  images.forEach(src => {
    const key = `${src}:${sizes}`;
    if (prepared.has(key)) return;
    const promise = new Promise<void>(resolve => {
      const image = new window.Image();
      image.sizes = sizes;
      image.srcset = imageSources(src) ?? '';
      image.src = src;
      image.decode().catch(() => {}).finally(resolve);
    });
    prepared.set(key, promise);
  });
}
