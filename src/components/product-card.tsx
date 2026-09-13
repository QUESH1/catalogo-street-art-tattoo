'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '@/src/data/products';
import { ProductImage } from './product-image';
import { prepareImages } from '@/src/lib/product-images';
import { useSwipe } from '@/src/hooks/use-swipe';

export type OpenProduct = (product: Product, variant?: number) => void;
export function formatPrice(price?: number) { return price == null ? 'Preço sob consulta' : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price); }
export const cardSizes = '(max-width: 760px) 44vw, (max-width: 1100px) 29vw, 18vw';
export function ProductCard({ product, tone = 0, onOpen }: { product: Product; tone?: number; onOpen: OpenProduct }) {
  const [variant, setVariant] = useState(tone), [view, setView] = useState(0);
  const root = useRef<HTMLElement>(null);
  const photos = product.variants?.[variant]?.images ?? product.images;
  const sources = product.variants?.flatMap(v => v.images) ?? product.images;
  const sourcesKey = sources.join('|');
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { if (entries.some(e => e.isIntersecting)) { prepareImages(sourcesKey.split('|'), cardSizes); observer.disconnect(); } }, { rootMargin: '100px' });
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, [sourcesKey]);
  const toggle = () => { if (photos.length > 1) setView(v => (v + 1) % photos.length); };
  const swipe = useSwipe(toggle);
  return <article className={`product-card ${product.category === 'Arte' ? 'art-card' : ''}`} ref={root}>
    <div className="product-stage" {...swipe}>
      <button className="product-image" onClick={() => onOpen(product, variant)} aria-label={`Ver ${product.name}${product.variants ? ` — ${product.variants[variant].name}` : ''}`}>
        <ProductImage key={view} className="cutout" src={photos[view]} alt={`${product.name}${product.variants ? ` ${product.variants[variant].name.toLowerCase()}` : ''}${photos.length > 1 ? ` — ${product.category === 'Camisetas' ? view === 0 ? 'costas' : 'frente' : view === 0 ? 'frente' : 'verso'}` : ''}`} sizes={cardSizes} loading="lazy" draggable={false}/>
        <span className="view-product"><ArrowUpRight size={18}/></span>
      </button>
      {photos.length > 1 && <div className="card-view-controls"><button onClick={toggle} aria-label={`Alternar frente e costas de ${product.name}`}><ChevronLeft size={15}/></button><span>{product.category === 'Camisetas' ? view === 0 ? 'Costas' : 'Frente' : view === 0 ? 'Frente' : 'Verso'}</span><button onClick={toggle} aria-label={`Próxima vista de ${product.name}`}><ChevronRight size={15}/></button></div>}
    </div>
    <div className="product-info"><h3><button onClick={() => onOpen(product, variant)}>{product.name}</button></h3><p className="price">{formatPrice(product.price)}</p>
      {product.variants && <div className="card-colors" aria-label={`Cores de ${product.name}`}>{product.variants.map((v, i) => <button key={v.name} aria-label={`${product.name} na cor ${v.name}`} aria-pressed={variant === i} onClick={() => setVariant(i)}><i className={i === 0 ? 'swatch-black' : 'swatch-gray'}/></button>)}<span>{product.variants[variant].name}</span></div>}
    </div>
  </article>;
}
