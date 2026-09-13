'use client';

import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { navigation, site } from '@/src/data/site';
import { withBasePath } from '@/lib/utils';

export function RetailHeader() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const sections = navigation.map(item => ({
      href: item.href,
      element: document.querySelector(item.href === '#ecobags' ? '#campanha-ecobags' : item.href),
    }));
    let frame = 0;
    const update = () => {
      setCompact(window.scrollY > 70);
      const current = sections.filter(section => section.element && section.element.getBoundingClientRect().top <= window.innerHeight * 0.38).at(-1);
      setActive(current?.href ?? '');
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, []);

  return <>
    <div className="announcement"><span>STREETWEAR × ARTE × CULTURA URBANA</span><a href={site.instagram} target="_blank" rel="noreferrer">Conheça nosso universo <ArrowUpRight size={13}/></a></div>
    <header className={`retail-header ${compact ? 'is-compact' : ''}`}>
      <div className="header-main">
        <a className="header-caption" href="#camisetas">Arte para vestir.<br/><span>Identidade para levar.</span></a>
        <a href="#inicio" className="logo" aria-label="Street Art Tattoo — início"><img src={withBasePath("/assets/logo.webp")} alt="Street Art Tattoo" width="180" height="75"/></a>
        <a className="header-contact" href={site.instagram} target="_blank" rel="noreferrer">Fale com a marca <ArrowUpRight size={17}/></a>
        <button className="menu-button" onClick={() => setOpen(true)} aria-label="Abrir menu" aria-expanded={open}><span>Menu</span><Menu size={23}/></button>
      </div>
      <nav className="category-navigation" aria-label="Navegação por categoria">
        {navigation.map(item => <a key={item.href} href={item.href} aria-current={active === item.href ? 'location' : undefined}>{item.label}{item.count && <sup>{item.count}</sup>}</a>)}
      </nav>
    </header>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="mobile-menu translate-x-0 translate-y-0" showCloseButton={false}>
        <DialogTitle className="sr-only">Explore o catálogo</DialogTitle>
        <DialogDescription className="sr-only">Navegue por camisetas, ecobags, arte e objetos.</DialogDescription>
        <div className="menu-top"><img src={withBasePath("/assets/logo.webp")} alt="Street Art Tattoo"/><DialogClose className="icon-button" aria-label="Fechar menu"><X size={25}/></DialogClose></div>
        <span className="eyebrow">ESCOLHA SEU UNIVERSO</span>
        <nav aria-label="Menu mobile">{navigation.map(item => <a key={item.href} href={item.href} onClick={() => setOpen(false)}><span>{item.label}</span>{item.count ? <small>{item.count} peças</small> : <ArrowUpRight size={19}/>}</a>)}</nav>
        <a className="menu-feature" href="#ecobags" onClick={() => setOpen(false)}><img src={withBasePath("/assets/05_ecobag_pombo.webp")} alt="Ecobag Pombo"/><span><small>EM DESTAQUE</small>Arte que acompanha.<b>Explore as ecobags ↗</b></span></a>
        <a className="menu-social" href={site.instagram} target="_blank" rel="noreferrer">{site.handle}<ArrowUpRight size={17}/></a>
      </DialogContent>
    </Dialog>
  </>;
}
