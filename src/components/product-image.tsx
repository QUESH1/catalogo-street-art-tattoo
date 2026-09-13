import type { ImgHTMLAttributes } from 'react';
import { imageSources } from '@/src/lib/product-images';

export function ProductImage({ src, sizes = '(max-width: 760px) 45vw, 22vw', ...props }: ImgHTMLAttributes<HTMLImageElement> & { src: string }) {
  return <img src={src} srcSet={imageSources(src)} sizes={sizes} width={960} height={960} decoding="async" {...props}/>;
}
