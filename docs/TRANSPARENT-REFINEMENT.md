# Refinamento com produtos transparentes

Atualização de 13/09/2026. Substitui as pendências visuais registradas em refinamentos anteriores.

- 28 PNGs oficiais mapeados em `product-asset-map.json`, formando 20 produtos únicos (5 camisetas com duas cores, 5 ecobags, 5 chaveiros, 3 quadros, piteira e seda).
- Frente das camisetas compartilhada por cor. Piteira com frente e verso. Não foram encontrados arquivos separados de isqueiro ou capa de isqueiro na pasta fornecida.
- Originais e antigos `public/assets` preservados. O frontend usa derivados WebP com transparência e compressão sem perdas, em três tamanhos, sem misturar fotos antigas nos produtos.
- Regeneração: `node scripts/prepare-products.mjs`, a partir de `../produtos PNG transparente`. O script detecta o conteúdo PNG mesmo nos arquivos sem extensão.
- Fundo panorâmico original gerado com ImageGen integrado, sem produtos incorporados. Prompt salvo em `panorama-prompt.txt`. Versões desktop/mobile em `public/scenes`.
- Cenário e texto da marca substituíveis em `src/data/visuals.ts`. Dados comerciais em `src/data/products.ts`. Valores não fornecidos permanecem sob consulta; CTA direciona ao Instagram existente.
- Header único, campanhas Orelhão e Pombo, catálogo contínuo, carrossel de cinco estampas com pares correspondentes e cenário sincronizado. Pré-carregamento seletivo de cores/vistas e produtos próximos; srcset para imagens e miniaturas.
- Frente/costas com setas, swipe e teclado; carrossel Embla com setas, arraste e teclado. Movimento reduzido desliga o panorama.
- Validado: TypeScript e build estático Next; 20 cards sem duplicação; nenhuma imagem antiga de produto renderizada; cores/vistas; arraste do carrossel; galeria e Escape; larguras 320, 375, 390 e 430 px sem overflow horizontal; desktop.
- Mantidos `withBasePath`, configuração Next e fluxo GitHub Pages. A atualização privada do Sites usa o mesmo resultado estático, sem publicar alterações no GitHub automaticamente.
