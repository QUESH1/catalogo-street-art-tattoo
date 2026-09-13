'use client';

import { useEffect, useState } from 'react';
import { products, artworks, type Product } from '@/src/data/products';
import { navigation, site } from '@/src/data/site';
import { RetailHeader } from './retail-header';
import { CategoryCatalog } from './category-catalog';
import { ProductDetail } from './product-detail';
import { withBasePath } from '@/lib/utils';

export function CatalogExperience() {
  const [selected, setSelected] = useState<{ product: Product; variant: number } | null>(null);
  const [heroTone, setHeroTone] = useState(0);
  const [art, setArt] = useState(0);
  const orelhao = products.find(p => p.id === 'camiseta-orelhao')!;
  const pombo = products.find(p => p.id === 'ecobag-pombo')!;
  const openProduct = (product: Product, variant = 0) => setSelected({ product, variant });

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return <>
    <a className="skip-link" href="#camisetas">Pular para o catálogo</a>
    <RetailHeader/>
    <main id="inicio">
      <section className="orelhao-hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="eyebrow">CAMISETAS / ESTAMPA ORELHÃO</span>
          <h1 id="hero-title" className="display">A RUA<br/><span>CHAMA.</span></h1>
          <p>Atenda do seu jeito.<br/>Vista a arte que fala com você.</p>
          <a className="button orange" href="#camisetas">Explore as camisetas <span>↗</span></a>
          <div className="hero-edition"><span>STREET ART TATTOO</span><span>ARTE PRA VESTIR.</span></div>
        </div>
        <div className="hero-product">
          <button className="hero-image" onClick={() => openProduct(orelhao, heroTone)} aria-label="Ver Camiseta Orelhão">
            <img src={orelhao.variants![heroTone].images[0]} alt={`Camiseta Orelhão ${heroTone === 0 ? 'preta' : 'cinza'}, com estampa azul nas costas`} width="1200" height="1200" fetchPriority="high"/>
            <span className="hero-image-label">ORELHÃO <b>↗</b></span>
          </button>
          <div className="hero-product-bar"><div><strong>Camiseta Orelhão</strong><span>Preta ou cinza. A mesma atitude.</span></div><div className="hero-swatches" aria-label="Cor da camiseta em destaque">{['Preta', 'Cinza'].map((c, i) => <button key={c} aria-label={`Mostrar camiseta ${c.toLowerCase()}`} aria-pressed={heroTone === i} onClick={() => setHeroTone(i)}><i className={i === 0 ? 'swatch-black' : 'swatch-gray'}/></button>)}</div></div>
        </div>
      </section>
      <div className="brand-strip"><p><strong>Arte no traço. Identidade na peça.</strong><span>A Street Art Tattoo leva a cultura da rua para o seu dia.</span></p><a href="#marca">Conheça a marca ↗</a></div>
      <span id="catalogo" className="anchor-target"/>
      <CategoryCatalog kind="shirts" onOpen={openProduct}/>
      <section id="campanha-ecobags" className="ecobag-campaign" aria-labelledby="ecobag-title">
        <div className="bag-campaign-copy"><span className="eyebrow">ECOBAGS / ESTAMPA POMBO</span><h2 id="ecobag-title" className="display">SEU CORRE.<br/>SUA <span>ARTE.</span></h2><p>Da rua pra rotina.<br/>Leve seu universo com você.</p><a className="button orange" href="#ecobags">Explore as ecobags <span>↗</span></a><span className="campaign-footnote">STREET ART TATTOO / ARTE EM MOVIMENTO</span></div>
        <button className="bag-campaign-image" onClick={() => openProduct(pombo)} aria-label="Ver Ecobag Pombo"><img src={withBasePath("/assets/05_ecobag_pombo.webp")} alt="Ecobag de tom natural com estampa de pombo no skate, em cenário urbano" loading="lazy" width="1200" height="1200"/><span>EM FOCO: ECOBAG POMBO <b>↗</b></span></button>
        <div className="campaign-word" aria-hidden="true">POMBO</div>
      </section>
      <CategoryCatalog kind="bags" onOpen={openProduct}/>
      <CategoryCatalog kind="objects" onOpen={openProduct}/>
      <section id="estampas" className="collection section-pad" aria-labelledby="collection-title">
        <div className="section-heading"><div><span className="eyebrow">04 / ESCOLHA SUA ESTAMPA</span><h2 id="collection-title" className="display">UM TRAÇO.<br/>DOIS CAMINHOS.</h2></div><p>Na camiseta ou na ecobag.<br/>A sua expressão acompanha você.</p></div>
        <div className="art-tabs" aria-label="Escolher estampa">{artworks.map((a, i) => <button key={a.id} aria-pressed={art === i} onClick={() => setArt(i)}>{a.name}</button>)}</div>
        <div className="collection-spread" key={art}>
          <button className="collection-shirt" onClick={() => openProduct(products[art], 1)}><img src={products[art].variants![1].images[0]} alt={`${products[art].name} cinza`} loading="lazy" width="600" height="600"/><span>Camiseta {artworks[art].name}<b>↗</b></span></button>
          <div className="collection-caption"><span className="eyebrow">{String(art + 1).padStart(2, '0')} / {artworks[art].name}</span><h3 className="display">{artworks[art].line}</h3><span className="collection-line"/></div>
          <button className="collection-bag" onClick={() => openProduct(products[art + 5])}><img src={products[art + 5].images[0]} alt={products[art + 5].name} loading="lazy" width="600" height="600"/><span>Ecobag {artworks[art].name}<b>↗</b></span></button>
        </div>
      </section>
      <section id="marca" className="brand-social section-pad">
        <div className="social-visual"><img src={withBasePath("/assets/objeto-9.webp")} alt="Material gráfico Street Art Tattoo com a identidade da marca" loading="lazy" width="543" height="724"/><span>ARTE. RUA. IDENTIDADE.</span></div>
        <div className="social-copy" data-reveal><span className="eyebrow">05 / A MARCA</span><h2 className="display">A GENTE VESTE<br/>O QUE <span className="outline">VIVE.</span></h2><p>A cidade deixa marcas. Nas paredes, nas ideias e no jeito de se vestir. A Street Art Tattoo transforma esse universo em peças para acompanhar o seu dia.</p><p>Conheça o que vem por aí e acompanhe a marca em movimento.</p><a className="text-link" href={site.instagram} target="_blank" rel="noreferrer">{site.handle} ↗</a></div>
      </section>
      <section className="final-cta"><div><span className="eyebrow">ENCONTROU SUA PEÇA?</span><h2 className="display">O PRÓXIMO PASSO É SEU.</h2></div><a className="button orange" href={site.instagram} target="_blank" rel="noreferrer">Fale com a marca <span>↗</span></a></section>
    </main>
    <footer className="footer"><div className="footer-top"><a className="logo" href="#inicio"><img src={withBasePath("/assets/logo.webp")} alt="Street Art Tattoo" width="180" height="75"/></a><nav aria-label="Navegação do rodapé">{navigation.slice(0, 3).map(n => <a key={n.href} href={n.href}>{n.label}</a>)}</nav><a href="#inicio">Voltar ao topo ↑</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Street Art Tattoo</span><span>STREETWEAR × ARTE × CULTURA URBANA</span><a href={site.instagram} target="_blank" rel="noreferrer">Instagram ↗</a></div></footer>
    <ProductDetail key={`${selected?.product.id ?? 'closed'}-${selected?.variant ?? 0}`} product={selected?.product ?? null} initialVariant={selected?.variant} onClose={() => setSelected(null)} onOpen={openProduct}/>
  </>;
}
