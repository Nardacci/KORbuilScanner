// Publica uma análise de gráfico (gerada pela skill /analisar-grafico) na aba "Análises" do site.
// Uso: node scripts/analises.mjs publicar <id>      valida, atualiza o índice, carimba versão, commit + push
//      node scripts/analises.mjs indice             só reconstrói analises/index.json
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const dir = join(root, 'analises');
const OBRIG = ['id', 'geradoEm', 'imagem', 'ativo', 'tf', 'veredito', 'direcao', 'classe', 'nota', 'plano', 'etapas', 'tese', 'invalidacao', 'checklist', 'aviso'];
const VEREDITOS = new Set(['operar', 'aguardar', 'nao-operar']);

function validar(a) {
  const faltam = OBRIG.filter((k) => !(k in a));
  if (faltam.length) throw new Error(`Campos faltando: ${faltam.join(', ')}`);
  if (!VEREDITOS.has(a.veredito)) throw new Error(`veredito inválido: ${a.veredito}`);
  if (!['compra', 'venda', 'nenhuma'].includes(a.direcao)) throw new Error(`direcao inválida: ${a.direcao}`);
  if (a.etapas.length !== 6) throw new Error('precisa das 6 etapas');
  const p = a.plano;
  if (a.veredito !== 'nao-operar') {
    const risco = Math.abs(p.entrada - p.stop);
    if (!(risco > 0)) throw new Error('plano: stop igual à entrada');
    const rr = Math.abs(p.alvo1 - p.entrada) / risco;
    if (Math.abs(rr - p.rr) > 0.15) throw new Error(`plano.rr (${p.rr}) não bate com o calculado (${rr.toFixed(2)})`);
  }
  if (!existsSync(join(dir, a.imagem))) throw new Error(`imagem não encontrada: analises/${a.imagem}`);
}

function indice() {
  const itens = readdirSync(dir).filter((f) => f.endsWith('.json') && f !== 'index.json').map((f) => {
    const a = JSON.parse(readFileSync(join(dir, f), 'utf8'));
    return { id: a.id, geradoEm: a.geradoEm, ativo: a.ativo, tf: a.tf, veredito: a.veredito, direcao: a.direcao, classe: a.classe, nota: a.nota, rr: a.plano?.rr ?? null, imagem: a.imagem };
  }).sort((x, y) => (x.geradoEm < y.geradoEm ? 1 : -1));
  writeFileSync(join(dir, 'index.json'), JSON.stringify(itens, null, 1) + '\n');
  return itens.length;
}

const [cmd, id] = process.argv.slice(2);
if (cmd === 'indice') { console.log(`${indice()} análise(s) no índice`); process.exit(0); }
if (cmd !== 'publicar' || !id) { console.error('Uso: node scripts/analises.mjs publicar <id> | indice'); process.exit(1); }
const file = join(dir, `${id}.json`);
if (!existsSync(file)) { console.error(`não achei ${file}`); process.exit(1); }
validar(JSON.parse(readFileSync(file, 'utf8')));
const n = indice();
const run = (c) => execSync(c, { cwd: root, stdio: 'inherit' });
run('node scripts/versao.mjs');
run(`git add analises index.html assets/js`);
run(`git commit -m "Análise: ${id}"`);
run('git push origin HEAD:main');
console.log(`publicado: ${id} (${n} análises). Site: https://nardacci.github.io/KORbuilScanner/#analises`);
