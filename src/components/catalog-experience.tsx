'use client';
import { useRef, useState } from 'react';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import type { Product } from '@/src/data/products';
import { navigation, site } from '@/src/data/site';
import { brandContent } from '@/src/data/visuals';
import { withBasePath } from '@/lib/utils';
import { RetailHeader } from './retail-header';
import { CategoryCatalog } from './category-catalog';
import { ProductDetail } from './product-detail';
import { ProductCampaign } from './product-campaign';
import { StampCarousel } from './stamp-carousel';
export function CatalogExperience() {
 const [selected, setSelected] = useState<{product: Product; variant: number} | null>(null);
 const opener = useRef<HTMLElement | null>(null);
 const openProduct = (product: Product, variant = 0) => { if (!selected) opener.current = document.activeElement as HTMLElement; setSelected({product, variant}); };
 return <><a className="skip-link" href="#camisetas">Pular para o catálogo</a><RetailHeader/>
 <main id="inicio"><ProductCampaign kind="shirt" onOpen={openProduct}/><CategoryCatalog kind="shirts" onOpen={openProduct}/><ProductCampaign kind="bag" onOpen={openProduct}/><CategoryCatalog kind="bags" onOpen={openProduct}/><CategoryCatalog kind="objects" onOpen={openProduct}/><StampCarousel onOpen={openProduct}/>
 <section id="marca" className="brand-section section-pad"><img src={withBasePath('/assets/logo.webp')} alt={brandContent.title} width="240" height="100"/><div><p>{brandContent.text}</p><a className="text-link" href={site.instagram} target="_blank" rel="noreferrer">{site.handle}<ArrowUpRight size={16}/></a></div></section>
 </main><footer className="footer"><a href="#inicio" className="footer-logo"><img src={withBasePath('/assets/logo.webp')} alt="Street Art Tattoo" width="100" height="42"/></a><span>© {new Date().getFullYear()} Street Art Tattoo</span><nav aria-label="Navegação do rodapé">{navigation.slice(0,3).map(n => <a key={n.href} href={n.href}>{n.label}</a>)}<a href={site.instagram} target="_blank" rel="noreferrer">Instagram</a></nav><a href="#inicio">Topo<ArrowUp size={15}/></a></footer>
 <ProductDetail key={(selected?.product.id ?? 'closed') + '-' + (selected?.variant ?? 0)} product={selected?.product ?? null} initialVariant={selected?.variant} onClose={() => setSelected(null)} onRestoreFocus={() => opener.current?.focus({ preventScroll: true })} onOpen={openProduct}/>
 </>;
}

