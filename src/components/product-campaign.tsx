'use client';
import { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '@/src/data/products';
import { prepareImages } from '@/src/lib/product-images';
import { ProductImage } from './product-image';
import { Panorama } from './panorama';
import { useSwipe } from '@/src/hooks/use-swipe';
import type { OpenProduct } from './product-card';

const campaignSizes = '(max-width: 760px) 85vw, 45vw';
export function ProductCampaign({ kind, onOpen }: { kind: 'shirt' | 'bag'; onOpen: OpenProduct }) {
  const shirt = kind === 'shirt';
  const product = products.find(p => p.id === (shirt ? 'camiseta-orelhao' : 'ecobag-pombo'))!;
  const [color, setColor] = useState(0), [view, setView] = useState(0);
  const photos = product.variants?.[color]?.images ?? product.images;
  useEffect(() => { if (shirt) prepareImages(product.variants!.flatMap(v => v.images), campaignSizes); }, [product, shirt]);
  const flip = () => { if (shirt) setView(v => 1 - v); };
  const swipe = useSwipe(flip);
  return <section id={shirt ? 'campanha-camisetas' : 'campanha-ecobags'} className={`product-campaign ${shirt ? 'shirt-campaign' : 'bag-campaign'}`} aria-labelledby={`${kind}-campaign-title`}>
    <Panorama progress={shirt ? 0 : 1} eager={shirt}/>
    <div className="campaign-copy"><span className="campaign-label">{shirt ? 'ORELHÃO / STREET ART TATTOO' : 'POMBO / ECOBAGS'}</span>{shirt ? <h1 id={`${kind}-campaign-title`} className="display">A RUA<br/><span>CHAMA.</span></h1> : <h2 id={`${kind}-campaign-title`} className="display">SEU CORRE.<br/>SUA <span>ARTE.</span></h2>}<p>{shirt ? <>Atenda do seu jeito.<br/>Vista a arte que fala com você.</> : <>Da rua pra rotina.<br/>Leve seu universo com você.</>}</p><a className="button dark" href={shirt ? '#camisetas' : '#ecobags'}>{shirt ? 'Ver camisetas' : 'Ver ecobags'}<ArrowUpRight size={19}/></a></div>
    <div className="campaign-product" {...swipe}>
      <button className="campaign-piece" onClick={() => onOpen(product, color)} aria-label={`Ver ${product.name}`}><ProductImage key={view} className="cutout campaign-cutout" src={photos[view]} alt={`${product.name}${shirt ? ` ${color ? 'cinza' : 'preta'} — ${view ? 'frente' : 'costas'}` : ''}`} sizes={campaignSizes} loading={shirt ? 'eager' : 'lazy'} fetchPriority={shirt ? 'high' : undefined} draggable={false}/></button>
      {shirt && <><button className="campaign-arrow previous" onClick={flip} aria-label="Alternar frente e costas da camiseta do hero"><ChevronLeft size={22}/></button><button className="campaign-arrow next" onClick={flip} aria-label="Próxima vista da camiseta do hero"><ChevronRight size={22}/></button></>}
      <div className="campaign-product-info"><div><strong>{product.name}</strong>{shirt && <span aria-live="polite">{view ? 'Frente' : 'Costas'}<i/>Arraste para alternar</span>}</div>{shirt ? <div className="hero-swatches" aria-label="Cor da camiseta do hero">{['Preta', 'Cinza'].map((name, i) => <button key={name} aria-pressed={color === i} aria-label={`Mostrar camiseta ${name.toLowerCase()}`} onClick={() => setColor(i)}><i className={i ? 'swatch-gray' : 'swatch-black'}/></button>)}</div> : <button className="icon-button" onClick={() => onOpen(product)} aria-label="Detalhes da ecobag Pombo"><ArrowUpRight size={21}/></button>}</div>
    </div>
  </section>;
}
