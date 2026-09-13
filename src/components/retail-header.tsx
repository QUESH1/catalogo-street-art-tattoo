'use client';
import { useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { navigation, site } from '@/src/data/site';
import { withBasePath } from '@/lib/utils';

export function RetailHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const current = navigation.filter(n => (document.querySelector(n.href === '#ecobags' ? '#campanha-ecobags' : n.href)?.getBoundingClientRect().top ?? Infinity) <= innerHeight * .35).at(-1);
      setActive(current?.href ?? '');
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    update(); window.addEventListener('scroll', schedule, { passive: true }); window.addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, []);
  return <header className="retail-header">
    <a className="logo" href="#inicio" aria-label="Street Art Tattoo — início"><img src={withBasePath('/assets/logo.webp')} alt="Street Art Tattoo" width="170" height="68"/></a>
    <nav className="category-navigation" aria-label="Navegação principal">{navigation.map(n => <a key={n.href} href={n.href} aria-current={active === n.href ? 'location' : undefined}>{n.label}</a>)}</nav>
    <div className="header-actions"><a className="header-instagram" href={site.instagram} target="_blank" rel="noreferrer">Instagram<ArrowUpRight size={15}/></a><a className="buy-link" href="#camisetas">Comprar<ArrowUpRight size={16}/></a><button ref={menuButton} className="menu-button" onClick={() => setOpen(true)} aria-label="Abrir menu" aria-expanded={open}><Menu size={24}/></button></div>
    <Dialog open={open} onOpenChange={setOpen}><DialogContent className="mobile-menu translate-x-0 translate-y-0" showCloseButton={false} onCloseAutoFocus={event => { event.preventDefault(); menuButton.current?.focus({ preventScroll: true }); }}>
      <DialogTitle className="sr-only">Catálogo Street Art Tattoo</DialogTitle><DialogDescription className="sr-only">Navegue pelas categorias da marca.</DialogDescription>
      <div className="menu-top"><img src={withBasePath('/assets/logo.webp')} alt="Street Art Tattoo"/><DialogClose className="icon-button" aria-label="Fechar menu"><X size={24}/></DialogClose></div>
      <nav aria-label="Menu mobile">{navigation.map(n => <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}<ArrowUpRight size={20}/></a>)}</nav>
      <a className="menu-social" href={site.instagram} target="_blank" rel="noreferrer">{site.handle}<ArrowUpRight size={18}/></a>
    </DialogContent></Dialog>
  </header>;
}

