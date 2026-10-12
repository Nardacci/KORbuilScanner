// Carimba uma versão em todos os endereços de arquivos da página (index.html e imports
// entre módulos), para o navegador baixar os arquivos novos a cada atualização.
// Uso: node scripts/versao.mjs [versão]   (padrão: data e hora UTC, ex.: 2026.10.12-1830)
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const now = new Date();
const p = (n) => String(n).padStart(2, '0');
const v = process.argv[2] || `${now.getUTCFullYear()}.${p(now.getUTCMonth() + 1)}.${p(now.getUTCDate())}-${p(now.getUTCHours())}${p(now.getUTCMinutes())}`;

const stamp = (s, re) => s.replace(re, (_, path) => `${path}?v=${v}`);

// imports relativos entre módulos: from './engine.js' -> from './engine.js?v=...'
const jsDir = join(root, 'assets/js');
for (const f of readdirSync(jsDir).filter((x) => x.endsWith('.js'))) {
  const file = join(jsDir, f);
  const s = readFileSync(file, 'utf8');
  writeFileSync(file, stamp(s, /(from '\.\/[\w-]+\.js)(?:\?v=[^']*)?(?=')/g));
}

// index.html: css, scripts e o número exibido no rodapé
const html = join(root, 'index.html');
let s = readFileSync(html, 'utf8');
s = stamp(s, /((?:href|src)="(?:assets|vendor)\/[\w./-]+\.(?:js|css))(?:\?v=[^"]*)?(?=")/g);
s = s.replace(/(<span id="versao">)[^<]*(<\/span>)/, `$1${v}$2`);
writeFileSync(html, s);
console.log('versão', v);
