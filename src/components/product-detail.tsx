'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { products, type Product } from '@/src/data/products';
import { site } from '@/src/data/site';
import { formatPrice, type OpenProduct } from './product-card';

export function ProductDetail({ product, initialVariant = 0, onClose, onOpen }: { product: Product | null; initialVariant?: number; onClose: () => void; onOpen: OpenProduct }) {
  const [variant, setVariant] = useState(initialVariant);
  const [view, setView] = useState(0);
  const photos = product?.variants?.[variant]?.images ?? product?.images ?? [];
  const related = product ? products.filter(p => p.id !== product.id && (product.art ? p.art === product.art : p.category === product.category)).slice(0, 3) : [];

  return <Dialog open={!!product} onOpenChange={open => { if (!open) onClose(); }}>
    <DialogContent className="product-dialog" showCloseButton={false}>
      {product && <>
        <DialogClose className="close-button" aria-label="Fechar detalhes">Fechar ×</DialogClose>
        <div className="detail-gallery">
          <img className="detail-photo" src={photos[view]} alt={`${product.name}${product.variants ? ` — ${product.variants[variant].name}` : ''}${photos.length > 1 ? view === 0 ? ' — verso' : ' — frente' : ''}`} width="800" height="800"/>
          {photos.length > 1 && <div className="thumbnails" aria-label="Galeria do produto">{photos.map((p, i) => <button key={p} aria-pressed={view === i} onClick={() => setView(i)} aria-label={i === 0 ? 'Ver verso' : 'Ver frente'}><img src={p} alt="" width="80" height="80"/><span>{i === 0 ? 'Verso' : 'Frente'}</span></button>)}</div>}
        </div>
        <div className="detail-copy">
          <span className="eyebrow">{product.category} / STREET ART TATTOO</span>
          <DialogTitle className="display">{product.name}</DialogTitle>
          <p className="detail-price">{formatPrice(product.price)}</p>
          {product.variants && <fieldset><legend>Escolha a cor <strong>{product.variants[variant].name}</strong></legend><div className="colors">{product.variants.map((v, i) => <button key={v.name} aria-pressed={variant === i} onClick={() => { setVariant(i); setView(0); }}><i className={i === 0 ? 'swatch-black' : 'swatch-gray'}/>{v.name}</button>)}</div></fieldset>}
          <DialogDescription className="description">{product.description}</DialogDescription>
          <dl className="product-facts">
            <div><dt>Disponibilidade</dt><dd>Consulte a marca</dd></div>
            {product.category === 'Camisetas' && <div><dt>Tamanhos</dt><dd>{product.sizes?.join(' · ') || 'Consulte as opções'}</dd></div>}
            {product.category === 'Arte' && <div><dt>Dimensões e técnica</dt><dd>Sob consulta</dd></div>}
          </dl>
          <a className="button orange" href={product.externalUrl || site.instagram} target="_blank" rel="noreferrer">Quero conhecer esta peça <span>↗</span></a>
          <p className="detail-note">Fale com a marca pelo Instagram. Informe “{product.name}”{product.variants ? ` na cor ${product.variants[variant].name.toLowerCase()}` : ''}.</p>
          {related.length > 0 && <div className="related-products"><h3>{product.art ? 'A mesma estampa, outro jeito de levar' : 'Conheça também'}</h3><div>{related.map(p => <button key={p.id} onClick={() => onOpen(p)}><img src={p.images[0]} alt="" width="90" height="90"/><span>{p.name}<small>Ver detalhes ↗</small></span></button>)}</div></div>}
        </div>
      </>}
    </DialogContent>
  </Dialog>;
}
