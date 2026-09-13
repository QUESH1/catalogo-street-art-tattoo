import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const source = path.resolve('../produtos PNG transparente');
const output = path.resolve('public/products');
await fs.mkdir(output, { recursive: true });
const stems = ['orelhao_02', 'lettering_laranja_03', 'lettering_branco_04', 'queijo_05', 'pombo_06'];
const oldStems = ['02_verso_orelhao', '03_verso_lettering_laranja', '04_verso_lettering_preto_branco', '05_verso_queijo', '06_verso_pombo'];
const mapping = [];
for (const [color, oldColor] of [['preto', 'preta'], ['cinza', 'cinza']]) {
  mapping.push({ file: `${color}_frente_01`, old: `${oldColor}-01_frente_${oldColor}.webp`, category: 'Camisetas', color, view: 'frente', artwork: 'compartilhada' });
  stems.forEach((stem, i) => mapping.push({ file: `${color}_verso_${stem}`, old: `${oldColor}-${oldStems[i]}.webp`, category: 'Camisetas', color, view: 'costas', artwork: stem.replace(/_\d+$/, '') }));
}
['orelhao_01', 'lettering_laranja_02', 'lettering_preto_branco_03', 'queijo_04', 'pombo_05'].forEach(stem => {
  const [art, num] = [stem.replace(/_\d+$/, ''), stem.slice(-2)];
  mapping.push({ file: `ecobag_${stem}`, old: `${num}_ecobag_${art}.webp`, category: 'Ecobags', artwork: art, view: 'frente', color: 'natural' });
});
['flor_verde_feliz', 'flor_dourado_feliz', 'console_cinza', 'tenis_cinza', 'menino_macaco_laranja'].forEach((name, i) => mapping.push({ file: `chaveiro_${name}`, old: `objeto-${i + 1}.webp`, category: 'Chaveiros' }));
for (let i = 1; i <= 3; i++) mapping.push({ file: `quadro_0${i}`, old: `objeto-${i + 5}.webp`, category: 'Arte' });
mapping.push({ file: 'piteira_frente_01', old: 'objeto-9.webp', category: 'Acessórios', view: 'frente' }, { file: 'piteira_verso_01', old: 'objeto-10.webp', category: 'Acessórios', view: 'verso' }, { file: 'seda_01', old: null, category: 'Acessórios' });
const files = await fs.readdir(source);
const unknown = files.filter(file => !mapping.some(item => item.file === file));
if (unknown.length) throw new Error(`Unmapped source files: ${unknown.join(', ')}`);
for (const item of mapping) {
  const file = path.join(source, item.file);
  const meta = await sharp(file).metadata();
  if (meta.format !== 'png' || !meta.hasAlpha) throw new Error(`Expected transparent PNG: ${item.file}`);
  item.source = `../produtos PNG transparente/${item.file}`;
  item.format = meta.format;
  item.originalSize = [meta.width, meta.height];
  item.outputs = [];
  for (const size of [320, 640, 960]) {
    const dest = `${item.file}-${size}.webp`;
    const info = await sharp(file).trim({ threshold: 0 }).resize({ width: size, height: size, fit: 'inside', withoutEnlargement: true }).webp({ lossless: true, effort: 5 }).toFile(path.join(output, dest));
    item.outputs.push({ file: `/products/${dest}`, width: info.width, height: info.height, bytes: info.size });
  }
}
await fs.mkdir('docs', { recursive: true });
await fs.writeFile('docs/product-asset-map.json', JSON.stringify(mapping, null, 2));
console.log(JSON.stringify({ sources: mapping.length, derivatives: mapping.length * 3, totalBytes: mapping.flatMap(item => item.outputs).reduce((sum, file) => sum + file.bytes, 0), oldAssetsUntouched: true }));
