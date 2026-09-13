'use client';

import { useState } from 'react';
import type { Product } from '@/src/data/products';

export type OpenProduct = (product: Product, variant?: number) => void;
export function formatPrice(price?: number) {
  return price == null ? 'Preço sob consulta' : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
}

export function ProductCard({ product, tone = 0, onOpen }: { product: Product; tone?: number; onOpen: OpenProduct }) {
  const [variant, setVariant] = useState(tone);
  const photos = product.variants?.[variant]?.images ?? product.images;
  return <article className="product-card">
    <button className="product-image" onClick={() => onOpen(product, variant)} aria-label={`Ver ${product.name}${product.variants ? ` — ${product.variants[variant].name}` : ''}`}>
      <img src={photos[0]} alt={`${product.name}${product.variants ? ` ${product.variants[variant].name.toLowerCase()}, verso` : ''}`} loading="lazy" width="600" height="600"/>
      {photos[1] && <img className="alternate" src={photos[1]} alt="" loading="lazy" width="600" height="600"/>}
      <span className="view-product">Ver detalhes <span>↗</span></span>
    </button>
    <div className="product-info">
      <div className="product-meta"><span>{product.category === 'Arte' ? 'Arte & Objetos' : product.category}</span>{product.variants && <span>2 cores</span>}</div>
      <h3><button onClick={() => onOpen(product, variant)}>{product.name}</button></h3>
      <p className="price">{formatPrice(product.price)}</p>
      {product.variants && <div className="card-colors" aria-label={`Cores de ${product.name}`}>
        {product.variants.map((v, i) => <button key={v.name} aria-label={`${product.name} na cor ${v.name}`} aria-pressed={variant === i} onClick={() => setVariant(i)}><i className={i === 0 ? 'swatch-black' : 'swatch-gray'}/></button>)}
        <span>{product.variants[variant].name}</span>
      </div>}
    </div>
  </article>;
}
