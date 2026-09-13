'use client';
import { useEffect, useRef, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from '@/components/ui/carousel';
import { products, artworks } from '@/src/data/products';
import { panoramaBackground } from '@/src/data/visuals';
import { prepareImages } from '@/src/lib/product-images';
import { ProductImage } from './product-image';
import { Panorama } from './panorama';
import type { OpenProduct } from './product-card';

export function StampCarousel({ onOpen, background = panoramaBackground }: { onOpen: OpenProduct; background?: typeof panoramaBackground }) {
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0), [color, setColor] = useState(0), [near, setNear] = useState(false), [reduced, setReduced] = useState(false);
  const root = useRef<HTMLElement>(null), panorama = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches); update(); media.addEventListener('change', update);
    const observer = new IntersectionObserver(entries => { if (entries.some(e => e.isIntersecting)) { setNear(true); observer.disconnect(); } }, { rootMargin: '250px' });
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); media.removeEventListener('change', update); };
  }, []);
  useEffect(() => {
    if (!api) return;
    const select = () => setActive(api.selectedScrollSnap());
    const scroll = () => panorama.current?.style.setProperty('--panorama-progress', `${Math.max(0, Math.min(1, api.scrollProgress()))}`);
    select(); scroll(); api.on('select', select); api.on('scroll', scroll); api.on('reInit', scroll);
    return () => { api.off('select', select); api.off('scroll', scroll); api.off('reInit', scroll); };
  }, [api]);
  useEffect(() => {
    if (!near) return;
    const current = products.find(p => p.id === `camiseta-${artworks[active].id}`)!;
    const next = products.find(p => p.id === `camiseta-${artworks[Math.min(active + 1, artworks.length - 1)].id}`)!;
    prepareImages([...current.variants!.map(v => v.backImage), next.variants![color].backImage], '(max-width: 760px) 70vw, 38vw');
  }, [near, active, color]);
  return <section id="estampas" className="stamp-section" ref={root} aria-labelledby="stamp-title">
    <div className="section-heading section-pad"><h2 id="stamp-title" className="display">Um traço,<br/>dois caminhos<span className="orange-text">.</span></h2><p>Uma arte. A sua combinação.</p></div>
    <Carousel className="stamp-carousel" opts={{ align: 'start', loop: false, duration: reduced ? 0 : 18 }} setApi={setApi} aria-label="Combinações por estampa">
      <Panorama ref={panorama} background={background}/>
      <CarouselContent className="stamp-track ml-0">{artworks.map((artwork, i) => {
        const shirt = products.find(p => p.id === `camiseta-${artwork.id}`)!;
        const bag = products.find(p => p.id === `ecobag-${artwork.id}`)!;
        return <CarouselItem key={artwork.id} className="stamp-slide pl-0" aria-label={`${i + 1} de ${artworks.length}: ${artwork.name}`} aria-hidden={active !== i} inert={active !== i}>
          <div className="stamp-scene">
            {Math.abs(i - active) <= 1 && <><button className="paired-shirt" onClick={() => onOpen(shirt, color)} aria-label={`Ver ${shirt.name} na combinação`}><ProductImage className="cutout" src={shirt.variants![color].backImage} alt={`${shirt.name} ${color ? 'cinza' : 'preta'}`} sizes="(max-width: 760px) 70vw, 38vw" loading={near ? 'eager' : 'lazy'} draggable={false}/></button><button className="paired-bag" onClick={() => onOpen(bag)} aria-label={`Ver ${bag.name} na combinação`}><ProductImage className="cutout" src={bag.image} alt={bag.name} sizes="(max-width: 760px) 45vw, 25vw" loading={near ? 'eager' : 'lazy'} draggable={false}/></button></>}
            <div className="stamp-caption"><span>{artwork.name}</span><h3 className="display">{artwork.line}</h3></div>
          </div>
        </CarouselItem>;
      })}</CarouselContent>
      <div className="stamp-controls"><div className="stamp-current" aria-live="polite"><b>{String(active + 1).padStart(2, '0')}</b><span>/ 05</span><strong>{artworks[active].name}</strong></div><div className="stamp-color"><span>Camiseta</span>{['Preta', 'Cinza'].map((name, i) => <button key={name} aria-label={`Camiseta ${name.toLowerCase()} no carrossel`} aria-pressed={color === i} onClick={() => setColor(i)}><i className={i ? 'swatch-gray' : 'swatch-black'}/></button>)}</div><div className="carousel-arrows"><CarouselPrevious className="carousel-arrow translate-y-0" aria-label="Estampa anterior"/><CarouselNext className="carousel-arrow translate-y-0" aria-label="Próxima estampa"/></div></div>
    </Carousel>
  </section>;
}
