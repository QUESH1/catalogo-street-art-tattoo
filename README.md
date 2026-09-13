# Street Art Tattoo — catálogo

Frontend Next.js 16 + React 19 + TypeScript + Tailwind CSS. Exportação estática; sem checkout e sem backend.

## Executar

npm ci
npm run dev

## Produção

npm run build
node scripts/preview-static.mjs

A exportação estática fica em out/.

## Editar conteúdo

- src/data/products.ts: produtos, imagens, cores, descrições e campos opcionais price, sizes, externalUrl.
- src/data/site.ts: identidade, Instagram e navegação.
- app/globals.css: composição, cores, breakpoints e movimento reduzido.
- src/components: experiência editorial e diálogo de produto.

## Inventário de origem

Os originais foram preservados na pasta acima do projeto.

- referencia: arquivo PNG 1024 × 1536, exclusivamente direção visual. Nenhuma imagem ou preço dele foi reutilizado.
- logo street art tattoo.png: identidade oficial, otimizada em WebP com remoção das margens transparentes, sem alterar proporções ou desenho.
- StreetArt_Camisetas_Site.zip: 12 PNGs (5 versos e 1 frente, em cada uma das cores preta e cinza). Cinco camisetas com duas cores e duas vistas.
- StreetArt_Ecobags_Site.zip: 5 PNGs, nas mesmas cinco estampas.
- StreetArt_Outros_Produtos_Site.pdf: 10 páginas sem camada de texto. Páginas 1–5: chaveiros (folhas verde/amarela, console, tênis, personagem laranja). Páginas 6–8: arte (lettering vermelho, ilustração amarela, máscara oriental). Páginas 9–10: material gráfico frente/verso, categoria comercial incerta, utilizado somente como identidade visual.
- Não foram localizadas fotografias independentes identificáveis de piteiras, isqueiros ou capas de isqueiro.

Nomes dos itens do PDF são descrições visuais, não títulos oficiais. Preços, tamanhos, dimensões, técnica, estoque e composição não foram informados. Os campos ficam opcionais e o catálogo apresenta consulta pelo Instagram. Não foram copiadas alegações comerciais da referência.

## Direção de arte

Composição editorial em preto, papel, cinza e laranja; tipografia condensada; fotografia de produto grande; dípticos por estampa; galeria assimétrica; catálogo de três colunas no desktop e duas no celular. Motion em CSS com transições de cor, recorte, escala, troca de imagem e respeito a prefers-reduced-motion. Diálogos Radix com foco e Escape.

## Validação

Build estático Next.js e TypeScript passaram. Revisão no navegador em desktop e larguras 320, 375, 390 e 430. Corrigidos título em 320 e overflow da faixa. Filtros, cor, frente/verso, detalhes, Escape e menu verificados. Imagens locais WebP. Site antigo e Instagram não puderam ser consultados; o link social é o fornecido no briefing.

## Ambiente Windows

O runtime Workers do starter falhou neste computador. O projeto usa execução nativa Next.js e exportação estática, preservando o suporte à publicação Sites. Se o shim npm local falhar, executar o npm-cli.js instalado com Node diretamente. A prévia estática pode ser iniciada após o build com o comando acima.

## Refinamento atual

A versão atual separa camisetas, ecobags e arte/objetos, com header comercial fixo, Orelhão no hero e campanha Pombo para ecobags. npm start abre a exportação estática após npm run build.
