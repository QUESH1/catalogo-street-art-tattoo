import { withBasePath } from '@/lib/utils';
export type Category = 'Camisetas' | 'Ecobags' | 'Chaveiros' | 'Arte' | 'Acessórios';
export type Variant = { name: string; color: 'preto' | 'cinza'; frontImage: string; backImage: string; images: string[] };
export type Product = { id: string; slug: string; name: string; category: Category; art?: string; artwork?: string; color?: string; image: string; frontImage?: string; backImage?: string; description: string; images: string[]; variants?: Variant[]; price?: number; sizes?: string[]; externalUrl?: string };
const asset = (name: string) => withBasePath(`/products/${name}-960.webp`);
export const artworks = [
  { id: 'orelhao', name: 'Orelhão', shirt: 'orelhao_02', bag: 'orelhao_01', line: 'A rua tem voz.' },
  { id: 'lettering-laranja', name: 'Lettering laranja', shirt: 'lettering_laranja_03', bag: 'lettering_laranja_02', line: 'Letra que ocupa espaço.' },
  { id: 'lettering-preto-branco', name: 'Lettering preto e branco', shirt: 'lettering_branco_04', bag: 'lettering_preto_branco_03', line: 'Contraste em cada traço.' },
  { id: 'queijo', name: 'Queijo', shirt: 'queijo_05', bag: 'queijo_04', line: 'O cotidiano vira desenho.' },
  { id: 'pombo', name: 'Pombo', shirt: 'pombo_06', bag: 'pombo_05', line: 'Outro olhar para a cidade.' },
];
const shirts: Product[] = artworks.map(a => {
  const variants: Variant[] = (['preto', 'cinza'] as const).map(color => {
    const frontImage = asset(`${color}_frente_01`), backImage = asset(`${color}_verso_${a.shirt}`);
    return { name: color === 'preto' ? 'Preta' : 'Cinza', color, frontImage, backImage, images: [backImage, frontImage] };
  });
  return { id: `camiseta-${a.id}`, slug: `camiseta-${a.id}`, name: `Camiseta ${a.name}`, category: 'Camisetas', art: a.id, artwork: a.id, color: 'preto', image: variants[0].backImage, frontImage: variants[0].frontImage, backImage: variants[0].backImage, images: variants[0].images, variants, description: `Estampa ${a.name} nas costas e assinatura da Street Art Tattoo na frente. Disponível nas versões preta e cinza.` };
});
const bags: Product[] = artworks.map(a => ({ id: `ecobag-${a.id}`, slug: `ecobag-${a.id}`, name: `Ecobag ${a.name}`, category: 'Ecobags', art: a.id, artwork: a.id, color: 'natural', image: asset(`ecobag_${a.bag}`), images: [asset(`ecobag_${a.bag}`)], description: `Ecobag de tom natural com a estampa ${a.name}. Consulte a marca para detalhes e disponibilidade.` }));
const keys: Product[] = [
  ['Folha verde', 'flor_verde_feliz'], ['Folha dourada', 'flor_dourado_feliz'], ['Console cinza', 'console_cinza'], ['Tênis cinza', 'tenis_cinza'], ['Personagem laranja', 'menino_macaco_laranja'],
].map(([name, file], index) => ({ id: `chaveiro-${index + 1}`, slug: `chaveiro-${file.replaceAll('_', '-')}`, name: `Chaveiro ${name}`, category: 'Chaveiros', image: asset(`chaveiro_${file}`), images: [asset(`chaveiro_${file}`)], description: 'Chaveiro do catálogo Street Art Tattoo. Consulte os detalhes com a marca.' }));
const art: Product[] = ['Lettering vermelho', 'Ilustração amarela', 'Máscara oriental'].map((name, i) => ({ id: `arte-${i + 1}`, slug: `quadro-${i + 1}`, name, category: 'Arte', image: asset(`quadro_0${i + 1}`), images: [asset(`quadro_0${i + 1}`)], description: 'Peça de arte do catálogo Street Art Tattoo. Técnica, dimensões e disponibilidade sob consulta.' }));
export const products: Product[] = [...shirts, ...bags, ...keys, ...art,
  { id: 'piteira-street-art', slug: 'piteira-street-art', name: 'Piteira Street Art Tattoo', category: 'Acessórios', image: asset('piteira_frente_01'), frontImage: asset('piteira_frente_01'), backImage: asset('piteira_verso_01'), images: [asset('piteira_frente_01'), asset('piteira_verso_01')], description: 'Piteira com identidade gráfica Street Art Tattoo. Confira frente e verso e consulte os detalhes com a marca.' },
  { id: 'seda-street-art', slug: 'seda-street-art', name: 'Seda Street Art Tattoo', category: 'Acessórios', image: asset('seda_01'), images: [asset('seda_01')], description: 'Seda com identidade gráfica Street Art Tattoo. Detalhes e disponibilidade sob consulta.' },
];
export const categories = ['Todos', 'Camisetas', 'Ecobags', 'Chaveiros', 'Arte', 'Acessórios'] as const;
