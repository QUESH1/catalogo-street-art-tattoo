'use client';

import { useState } from 'react';
import { products } from '@/src/data/products';
import { ProductCard, type OpenProduct } from './product-card';

export function CategoryCatalog({ kind, onOpen }: { kind: 'shirts' | 'bags' | 'objects'; onOpen: OpenProduct }) {
  const [tone, setTone] = useState(0);
  const [filter, setFilter] = useState('Todos');
  const isShirts = kind === 'shirts';
  const isBags = kind === 'bags';
  const id = isShirts ? 'camisetas' : isBags ? 'ecobags' : 'acessorios';
  const group = products.filter(p => isShirts ? p.category === 'Camisetas' : isBags ? p.category === 'Ecobags' : ['Chaveiros', 'Arte'].includes(p.category));
  const visible = group.filter(p => filter === 'Todos' || p.category === filter);
  return <section id={id} className={`category-catalog section-pad ${kind}`} aria-labelledby={`${id}-title`}>
    <div className="section-heading">
      <div><span className="eyebrow">{isShirts ? '01 / ARTE PRA VESTIR' : isBags ? '02 / PRA LEVAR COM VOCÊ' : '03 / ALÉM DO VESTIR'}</span><h2 className="display" id={`${id}-title`}>{isShirts ? 'CAMISETAS' : isBags ? 'ECOBAGS' : 'ARTE & OBJETOS'}<span className="orange-text">.</span></h2></div>
      <p>{isShirts ? <>Cinco estampas. Duas cores.<br/>Encontre a sua combinação.</> : isBags ? <>A arte sai com você.<br/>Conheça todas as estampas.</> : <>Pequenos detalhes. Outras superfícies.<br/>A identidade vai além da roupa.</>}</p>
    </div>
    <div className="catalog-toolbar">
      <span className="catalog-count" aria-live="polite">{visible.length} {isShirts || isBags ? 'estampas' : 'peças'}</span>
      {isShirts ? <div className="catalog-options" aria-label="Cor das camisetas"><span>Ver na cor:</span>{['Preta', 'Cinza'].map((c, i) => <button key={c} aria-pressed={tone === i} onClick={() => setTone(i)}><i className={i === 0 ? 'swatch-black' : 'swatch-gray'}/>{c}</button>)}</div> : !isBags ? <div className="object-filters" aria-label="Filtrar arte e objetos">{['Todos', 'Chaveiros', 'Arte'].map(c => <button key={c} aria-pressed={filter === c} onClick={() => setFilter(c)}>{c === 'Arte' ? 'Quadros & Arte' : c}</button>)}</div> : <span className="catalog-subtitle">Orelhão · Lettering · Queijo · Pombo</span>}
    </div>
    <div className={`product-grid ${kind === 'objects' ? 'objects-grid' : ''}`} key={`${tone}-${filter}`}>
      {visible.map(p => <ProductCard key={p.id} product={p} tone={tone} onOpen={onOpen}/>)}
    </div>
    <a className="next-category" href={isShirts ? '#campanha-ecobags' : isBags ? '#acessorios' : '#estampas'}><span>{isShirts ? 'A mesma arte. Outro jeito de levar.' : isBags ? 'Seu estilo também está nos detalhes.' : 'Uma estampa, diferentes possibilidades.'}</span><b>{isShirts ? 'Conheça as ecobags' : isBags ? 'Explore arte & objetos' : 'Explore as estampas'} ↗</b></a>
  </section>;
}
