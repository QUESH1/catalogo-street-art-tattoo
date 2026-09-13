'use client';
import { useState } from 'react';
import { products } from '@/src/data/products';
import { ProductCard, type OpenProduct } from './product-card';

export function CategoryCatalog({ kind, onOpen }: { kind: 'shirts' | 'bags' | 'objects'; onOpen: OpenProduct }) {
  const [tone, setTone] = useState(0);
  const shirts = kind === 'shirts', bags = kind === 'bags';
  const id = shirts ? 'camisetas' : bags ? 'ecobags' : 'acessorios';
  const group = products.filter(p => shirts ? p.category === 'Camisetas' : bags ? p.category === 'Ecobags' : !['Camisetas', 'Ecobags'].includes(p.category));
  return <section id={id} className={`category-catalog section-pad ${kind}`} aria-labelledby={`${id}-title`}>
    <div className="section-heading"><h2 className="display" id={`${id}-title`}>{shirts ? 'Camisetas' : bags ? 'Ecobags' : 'Arte & Objetos'}<span className="orange-text">.</span></h2><p>{shirts ? <>Cinco estampas. Duas cores.<br/>Encontre sua combinação.</> : bags ? <>A arte sai com você.<br/>Conheça todas as estampas.</> : <>Pequenos detalhes, outras superfícies.<br/>A identidade vai além da roupa.</>}</p></div>
    {shirts && <div className="catalog-toolbar"><div className="catalog-options" aria-label="Cor das camisetas"><span>Ver na cor</span>{['Preta', 'Cinza'].map((c, i) => <button key={c} aria-pressed={tone === i} onClick={() => setTone(i)}><i className={i === 0 ? 'swatch-black' : 'swatch-gray'}/>{c}</button>)}</div></div>}
    <div className={`product-grid ${kind === 'objects' ? 'objects-grid' : ''}`} key={tone}>{group.map(p => <ProductCard key={p.id} product={p} tone={tone} onOpen={onOpen}/>)}</div>
  </section>;
}
