'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from '@/components/ui/carousel';
import { products } from '@/src/data/products';
import { prepareImages } from '@/src/lib/product-images';
import { ProductImage } from './product-image';
import { Panorama } from './panorama';
import type { OpenProduct } from './product-card';

const campaignSizes = '(max-width: 760px) 85vw, 45vw';
const shirts = products.filter(product => product.category === 'Camisetas');

function ShirtHero({ onOpen }: { onOpen: OpenProduct }) {
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);
  const [color, setColor] = useState(0);
  const [view, setView] = useState(0);
  const [reduced, setReduced] = useState(false);
  const panorama = useRef<HTMLDivElement>(null);
  const product = shirts[active];

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update(); media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!api) return;
    const select = () => setActive(api.selectedScrollSnap());
    const scroll = () => panorama.current?.style.setProperty('--panorama-progress', String(Math.max(0, Math.min(1, api.scrollProgress()))));
    select(); scroll();
    api.on('select', select); api.on('scroll', scroll); api.on('reInit', scroll);
    return () => { api.off('select', select); api.off('scroll', scroll); api.off('reInit', scroll); };
  }, [api]);

  useEffect(() => {
    const neighbors = [shirts[active - 1], shirts[active + 1]].filter(Boolean);
    prepareImages([
      ...product.variants!.flatMap(variant => variant.images),
      ...neighbors.map(neighbor => neighbor.variants![color].images[view]),
    ], campaignSizes);
  }, [active, color, view, product]);

  return <section id="campanha-camisetas" className="product-campaign shirt-campaign" aria-labelledby="shirt-campaign-title">
    <Panorama ref={panorama} eager/>
    <div className="campaign-copy"><span className="campaign-label">{product.artwork === 'orelhao' ? 'ORELHÃO' : product.name.replace('Camiseta ', '').toUpperCase()} / STREET ART TATTOO</span><h1 id="shirt-campaign-title" className="display">A RUA<br/><span>CHAMA.</span></h1><p>Atenda do seu jeito.<br/>Vista a arte que fala com você.</p><a className="button dark" href="#camisetas">Ver camisetas<ArrowUpRight size={19}/></a></div>
    <Carousel className="campaign-product hero-carousel" opts={{ align: 'start', loop: false, duration: reduced ? 0 : 18 }} setApi={setApi} aria-label="Camisetas do hero">
      <CarouselContent className="hero-track ml-0">{shirts.map((shirt, index) => <CarouselItem className="hero-slide pl-0" key={shirt.id} aria-label={`${index + 1} de ${shirts.length}: ${shirt.name}`} aria-hidden={index !== active} inert={index !== active}>
        <button className="campaign-piece" onClick={() => onOpen(shirt, color)} aria-label={`Ver ${shirt.name} no hero`}>
          {Math.abs(index - active) <= 1 && <ProductImage key={view} className="cutout campaign-cutout" src={shirt.variants![color].images[view]} alt={`${shirt.name} ${color ? 'cinza' : 'preta'} — ${view ? 'frente' : 'costas'}`} sizes={campaignSizes} loading="eager" fetchPriority={index === active ? 'high' : 'low'} draggable={false}/>}
        </button>
      </CarouselItem>)}</CarouselContent>
      <CarouselPrevious className="campaign-arrow previous translate-y-0" aria-label="Camiseta anterior no hero"/>
      <CarouselNext className="campaign-arrow next translate-y-0" aria-label="Próxima camiseta no hero"/>
      <div className="campaign-product-info hero-product-info">
        <div className="hero-current" aria-live="polite" aria-atomic="true"><strong>{product.name}</strong><span>{String(active + 1).padStart(2, '0')} / {String(shirts.length).padStart(2, '0')}<i/>Arraste para trocar a estampa</span></div>
        <div className="hero-secondary-controls">
          <div className="hero-views" aria-label="Visualização da camiseta do hero">{['Costas', 'Frente'].map((label, index) => <button key={label} aria-pressed={view === index} aria-label={`Mostrar ${label.toLowerCase()} da camiseta do hero`} onClick={() => setView(index)}>{label}</button>)}</div>
          <div className="hero-swatches" aria-label="Cor da camiseta do hero">{['Preta', 'Cinza'].map((name, index) => <button key={name} aria-pressed={color === index} aria-label={`Mostrar camiseta ${name.toLowerCase()}`} onClick={() => setColor(index)}><i className={index ? 'swatch-gray' : 'swatch-black'}/></button>)}</div>
        </div>
      </div>
    </Carousel>
  </section>;
}

export function ProductCampaign({ kind, onOpen }: { kind: 'shirt' | 'bag'; onOpen: OpenProduct }) {
  if (kind === 'shirt') return <ShirtHero onOpen={onOpen}/>;
  const product = products.find(product => product.id === 'ecobag-pombo')!;
  return <section id="campanha-ecobags" className="product-campaign bag-campaign" aria-labelledby="bag-campaign-title">
    <Panorama progress={1}/>
    <div className="campaign-copy"><span className="campaign-label">POMBO / ECOBAGS</span><h2 id="bag-campaign-title" className="display">SEU CORRE.<br/>SUA <span>ARTE.</span></h2><p>Da rua pra rotina.<br/>Leve seu universo com você.</p><a className="button dark" href="#ecobags">Ver ecobags<ArrowUpRight size={19}/></a></div>
    <div className="campaign-product">
      <button className="campaign-piece" onClick={() => onOpen(product, 0)} aria-label={`Ver ${product.name}`}><ProductImage className="cutout campaign-cutout" src={product.images[0]} alt={product.name} sizes={campaignSizes} loading="lazy" draggable={false}/></button>
      <div className="campaign-product-info"><div><strong>{product.name}</strong></div><button className="icon-button" onClick={() => onOpen(product)} aria-label="Detalhes da ecobag Pombo"><ArrowUpRight size={21}/></button></div>
    </div>
  </section>;
}
