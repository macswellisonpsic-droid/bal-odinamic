'use strict';
/* ===== DADOS (independentes da lógica) ===== */
const PAL = {
  azul: ['#7cc8ff', '#1d63c9'], verde: ['#8fe3a0', '#1e8f4e'], amarelo: ['#ffe98a', '#d49400'], laranja: ['#ffc07a', '#e8661c'],
  vermelho: ['#ff8f8f', '#c92a3a'], rosa: ['#ffb3d6', '#d6408b'], roxo: ['#c9a6ff', '#6a35c9'], turquesa: ['#8ff0e6', '#0e9a95']
};
const NOMES = Object.keys(PAL);
const RAW = [
  ['Retrospectiva', 'pergunta', 'O que o ano pediu', 'Alguns períodos parecem girar em torno de um tema, mesmo que não o tenhamos escolhido. Olhando para os últimos meses, que palavra ou situação resumiria o que este tempo exigiu de você, e de que maneira você foi respondendo a essa exigência?'],
  ['Emoções', 'pergunta', 'Um sentimento sem espaço', 'Muitas vezes seguimos cumprindo tarefas enquanto algumas emoções ficam sem nome. Existe algum sentimento deste ano que ainda não teve espaço para ser reconhecido? Como seria dar a ele alguns minutos de atenção, sem pressa de resolvê-lo?'],
  ['Autoestima', 'desafio', 'O esforço invisível', 'Lembre de algo que exigiu de você coragem, paciência ou cuidado neste ano, ainda que pareça pequeno diante de outras conquistas. Reconheça silenciosamente o esforço envolvido. Se desejar, compartilhe o que esse gesto revela sobre você.'],
  ['Relacionamentos', 'pergunta', 'Presenças que importam', 'Algumas pessoas permanecem por perto sem fazer alarde, e só percebemos o valor dessa presença quando paramos para observar. Quem esteve ao seu lado de um modo que fez diferença neste período, e o que você gostaria que essa pessoa soubesse?'],
  ['Escolhas', 'pergunta', 'Esperado e desejado', 'Às vezes tentamos corresponder às expectativas externas a ponto de não perceber o que realmente faz sentido para nós. Em alguma decisão recente, você notou a diferença entre o que esperavam de você e o que você desejava?'],
  ['Autocuidado', 'pergunta', 'Necessidades adiadas', 'Quando a rotina aperta, é comum dedicar tanta energia às obrigações que as próprias necessidades ficam para depois. Em quais momentos você percebeu que precisava de cuidado, e o que tornou difícil atender a essa necessidade?'],
  ['Sentido e propósito', 'pergunta', 'Alinhamento', 'Em meio a tarefas e expectativas, nem sempre é simples perceber se estamos vivendo de acordo com o que consideramos importante. Em que momentos deste ano suas escolhas pareceram coerentes com aquilo que tem valor para você?'],
  ['Próximo ciclo', 'pergunta', 'Um modo de viver', 'Ao pensar no próximo ano, é comum listar metas. Além do que você deseja conquistar, que jeito de viver, de tratar a si mesmo ou de lidar com as dificuldades gostaria de cultivar ao longo do novo ciclo?'],
  ['Retrospectiva', 'desafio', 'Linha do tempo', 'Percorra mentalmente o ano, do início até agora, e escolha um momento que mudou o rumo das coisas, para melhor ou nem tanto. Observe o que você sentia naquele instante. Se quiser, conte ao grupo apenas o que se sentir confortável em dizer.'],
  ['Emoções', 'pergunta', 'Quando foi difícil', 'Nem tudo acontece como planejamos, e algumas experiências deixam frustração ou dúvidas. Ao recordar uma situação difícil deste ano, existe algo que hoje você compreende de forma diferente da que tinha enquanto ela acontecia?'],
  ['Autoestima', 'pergunta', 'Palavras para si', 'Costumamos falar com os outros de modo mais gentil do que falamos conosco. Que frase você mais repete para si diante de um erro ou de uma dificuldade, e como soaria se ela fosse dita a alguém que você valoriza?'],
  ['Relacionamentos', 'pergunta', 'O limite que faltou', 'Em certos momentos aceitamos demandas ou expectativas para evitar conflito ou decepcionar alguém. Houve uma situação neste período em que você percebeu que precisava respeitar melhor seus próprios limites? O que tornaria isso possível?'],
  ['Escolhas', 'pergunta', 'Dentro do alcance', 'Nem sempre controlamos as circunstâncias, mas podemos refletir sobre como respondemos a elas. Existe uma escolha deste ano que você gostaria de compreender melhor, não para se culpar, mas para reconhecer o que deseja fazer de outro modo?'],
  ['Autocuidado', 'desafio', 'Uma pausa possível', 'Pense em um gesto simples de cuidado que caberia na sua semana: um intervalo, uma refeição com calma, uma conversa, um silêncio. Escolha um que seja realista, sem exigir que a vida mude antes. Se desejar, diga ao grupo qual escolheu.'],
  ['Sentido e propósito', 'pergunta', 'O que sustenta', 'Em períodos longos, algo costuma nos ajudar a continuar: uma pessoa, uma crença, uma rotina, um compromisso. O que tem sustentado você nos dias mais exigentes, e como você poderia dar a isso mais espaço no próximo ciclo?'],
  ['Próximo ciclo', 'desafio', 'Carta ao futuro', 'Imagine que, daqui a um ano, você leia uma carta escrita por você hoje. Pense em uma única coisa que gostaria de ouvir de si mesmo ao reler. Não precisa anotar nem compartilhar; basta formular em silêncio.'],
  ['Retrospectiva', 'pergunta', 'Surpresas', 'Alguns acontecimentos chegam sem aviso e revelam recursos que não sabíamos ter. Houve algo neste ano para o qual você não se sentia preparado e que, ao enfrentar, mostrou um aspecto seu que você ainda não conhecia?'],
  ['Emoções', 'desafio', 'Dar nome', 'Escolha uma emoção que esteve presente com frequência nos últimos meses e tente descrevê-la com mais precisão do que "bem" ou "mal". Onde ela aparece no corpo? O que ela parece tentar indicar? Compartilhar é opcional.'],
  ['Autoestima', 'pergunta', 'Sem plateia', 'Nem toda conquista é percebida por outras pessoas. Continuar tentando, estabelecer um limite ou enfrentar uma conversa difícil também é avanço. Que conquista pessoal sua merece ser reconhecida, mesmo que ninguém tenha notado o esforço?'],
  ['Relacionamentos', 'pergunta', 'Vínculos em movimento', 'Ao longo do tempo, algumas relações se fortalecem, outras pedem conversas difíceis ou mudam de lugar. O que suas experiências com outras pessoas ajudaram você a perceber sobre o tipo de relação que deseja construir e preservar?'],
  ['Escolhas', 'desafio', 'Dizer não, dizer sim', 'Pense em algo a que você disse sim por hábito ou obrigação e em algo que gostaria de ter dito sim com mais convicção. Perceba o que diferencia os dois casos. Se quiser, comente com o grupo o que notou.'],
  ['Autocuidado', 'pergunta', 'Descanso de verdade', 'Descansar nem sempre é parar: às vezes continuamos ocupados mesmo nos intervalos. O que, para você, funciona como descanso de fato, e em que momentos deste ano você conseguiu, ou não, permitir-se isso?'],
  ['Sentido e propósito', 'pergunta', 'O que importa', 'Quando o ritmo desacelera, algumas coisas que pareciam urgentes perdem peso e outras ficam evidentes. Olhando para este ano, o que parecia essencial e já não parece? E o que passou a importar mais do que você imaginava?'],
  ['Próximo ciclo', 'pergunta', 'Ponto de apoio', 'Mudanças dependem de condições que as sustentem. Pensando no próximo ciclo, que apoio, pessoa, rotina ou ambiente poderia facilitar aquilo que você deseja viver, e o que você poderia fazer desde já para se aproximar disso?'],
  ['Retrospectiva', 'pergunta', 'Aprendizado sem pressa', 'Nem todo aprendizado aparece logo. Algumas compreensões chegam meses depois, quando olhamos com mais distância. Existe algo que você só entendeu agora sobre um acontecimento ou decisão de algum tempo atrás?'],
  ['Emoções', 'pergunta', 'Apoio', 'Atravessar períodos difíceis costuma ser mais leve com apoio, mas pedir ajuda nem sempre é fácil. Em um momento exigente deste ano, o que você precisava ouvir ou receber, e o que dificultou procurar isso?'],
  ['Autoestima', 'desafio', 'Qualidades em uso', 'Pense em uma qualidade sua que apareceu em situações recentes, como persistência, humor, escuta ou criatividade. Lembre de um momento em que ela fez diferença. Se desejar, compartilhe com o grupo sem a necessidade de justificar.'],
  ['Relacionamentos', 'desafio', 'Um agradecimento', 'Pense em alguém cuja atitude, mesmo breve, tornou algum momento deste ano mais fácil. Considere como poderia expressar reconhecimento a essa pessoa, em palavras ou gestos, quando fizer sentido para você. Não há obrigação de fazê-lo.'],
  ['Sentido e propósito', 'desafio', 'Uma prática de valor', 'Escolha um valor que deseja honrar mais, como respeito, presença, honestidade ou cuidado. Pense em uma pequena ação, possível nas próximas semanas, que o colocaria em prática. Se quiser, compartilhe qual ação imaginou.'],
  ['Próximo ciclo', 'pergunta', 'Deixar para trás', 'Encerrar um ciclo não significa esquecer ou deixar de sentir algo sobre o que passou. Pode significar reconhecer o que aconteceu e decidir como seguir. Existe alguma situação, expectativa ou hábito que você sente que precisa começar a deixar para trás?']
];
const CONTEUDOS = RAW.map((r, i) => ({ id: i + 1, categoria: r[0], tipo: r[1], titulo: r[2], conteudo: r[3], cor: NOMES[(i * 3) % NOMES.length] }));
const TEXTO_FIM = 'Chegar ao fim desta dinâmica não significa ter todas as respostas. Talvez algumas reflexões precisem de tempo, outras despertem novas perguntas e algumas apenas ajudem você a olhar para a própria trajetória com mais atenção. Que o próximo ciclo seja construído com consciência, respeito aos seus limites e espaço para aquilo que realmente tem valor para você.';
const TEXTO_ADEUS = 'Obrigado por reservar este tempo para você. Você pode voltar quando quiser.';

/* ===== ESTADO ===== */
const $ = s => document.querySelector(s);
const state = { used: new Set(), sel: null, busy: false, sound: false };
const AH = 100; // altura da flecha
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const arrow = $('#arrow'), fireBtn = $('#fire');

/* ===== ÁUDIO (Web Audio sintetizado) ===== */
const Audio_ = {
  ctx: null, buf: null,
  init() {
    if (this.ctx) return this.ctx.resume();
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return;
    this.ctx = new C();
    const n = this.ctx.sampleRate * 0.6;
    this.buf = this.ctx.createBuffer(1, n, this.ctx.sampleRate);
    const d = this.buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
  },
  noise(type, f0, f1, q, peak, dur, delay = 0) {
    const c = this.ctx, t = c.currentTime + delay;
    const s = c.createBufferSource(); s.buffer = this.buf;
    const f = c.createBiquadFilter(); f.type = type; f.Q.value = q;
    f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f).connect(g).connect(c.destination); s.start(t); s.stop(t + dur + 0.05);
  },
  tone(type, f0, f1, peak, dur) {
    const c = this.ctx, t = c.currentTime, o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    g.gain.setValueAtTime(peak, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + 0.02);
  },
  play(kind) {
    if (!state.sound || !this.ctx) return;
    if (kind === 'pop') { this.noise('highpass', 1500, 900, 0.7, 0.95, 0.09); this.noise('bandpass', 3500, 1200, 1, 0.5, 0.05); this.tone('sine', 220, 60, 0.45, 0.12); }
    else if (kind === 'whoosh') this.noise('bandpass', 500, 2600, 1.2, 0.16, 0.45);
    else if (kind === 'select') this.tone('triangle', 660, 880, 0.04, 0.12);
  }
};
function toggleSound() {
  state.sound = !state.sound;
  if (state.sound) Audio_.init();
  const b = $('#snd');
  b.setAttribute('aria-pressed', state.sound);
  b.textContent = state.sound ? '🔊 Som ligado' : '🔇 Som desligado';
  Audio_.play('select');
}

/* ===== RENDER ===== */
function render() {
  const grid = $('#grid'); grid.innerHTML = '';
  CONTEUDOS.forEach((c, i) => {
    const [c1, c2] = PAL[c.cor];
    const b = document.createElement('button');
    b.className = 'balloon'; b.id = 'b' + c.id; b.type = 'button';
    b.setAttribute('aria-pressed', 'false');
    b.setAttribute('aria-label', 'Balão ' + c.id + ', ' + c.cor);
    b.style.cssText = `--c1:${c1};--c2:${c2};--d:${(4 + (i * 7 % 10) / 5).toFixed(1)}s;--dl:-${((i * 13 % 10) / 3).toFixed(1)}s`;
    b.innerHTML = `<span class="wrap"><span class="body">${c.id}</span><span class="string"></span></span>`;
    b.addEventListener('click', () => select(c.id));
    grid.appendChild(b);
  });
}

/* ===== SELEÇÃO E MIRA ===== */
function select(id) {
  if (state.busy || state.used.has(id) || !$('#panel').hidden) return;
  state.sel = id;
  document.querySelectorAll('.balloon').forEach(b => b.setAttribute('aria-pressed', b.id === 'b' + id));
  $('#selinfo').textContent = 'Balão selecionado: ' + id;
  fireBtn.disabled = false;
  Audio_.play('select');
  aim();
}
function geo() {
  const o = $('#bow').getBoundingClientRect();
  const S = { x: o.left + o.width / 2, y: o.top + o.height / 2 };
  if (state.sel == null) return { S, C: { x: S.x, y: S.y - 60 }, E: { x: S.x, y: S.y - 200 } };
  const r = $('#b' + state.sel + ' .body').getBoundingClientRect();
  const E = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  const dx = E.x - S.x, dy = E.y - S.y, d = Math.hypot(dx, dy) || 1;
  return { S, C: { x: S.x + dx / 2, y: S.y + dy / 2 - d * 0.12 }, E };
}
const ang = (dx, dy) => Math.atan2(dx, -dy) * 180 / Math.PI;
function place(tx, ty, a) {
  const r = a * Math.PI / 180, cx = tx - Math.sin(r) * AH / 2, cy = ty + Math.cos(r) * AH / 2;
  arrow.style.transform = `translate(${cx - 7}px,${cy - AH / 2}px) rotate(${a}deg)`;
}
function restTip(g) {
  const a = ang(g.C.x - g.S.x, g.C.y - g.S.y), r = a * Math.PI / 180;
  return { a, x: g.S.x + Math.sin(r) * AH / 2, y: g.S.y - Math.cos(r) * AH / 2 };
}
function aim() {
  if (state.busy) return;
  const t = restTip(geo()); place(t.x, t.y, t.a);
}

/* ===== DISPARO ===== */
function fire() {
  if (state.busy || state.sel == null) return;
  state.busy = true; fireBtn.disabled = true;
  const id = state.sel, g = geo(), t0 = restTip(g), E = g.E, C = g.C;
  Audio_.play('whoosh');
  const D = reduce ? 250 : 650, start = performance.now();
  (function step(now) {
    const u = Math.min(1, (now - start) / D), t = u * u, m = 1 - t;
    const x = m * m * t0.x + 2 * m * t * C.x + t * t * E.x;
    const y = m * m * t0.y + 2 * m * t * C.y + t * t * E.y;
    const tx = 2 * m * (C.x - t0.x) + 2 * t * (E.x - C.x), ty = 2 * m * (C.y - t0.y) + 2 * t * (E.y - C.y);
    place(x, y, ang(tx, ty));
    if (u < 1) requestAnimationFrame(step); else impact(id, E);
  })(start);
}
function impact(id, E) {
  Audio_.play('pop');
  const el = $('#b' + id), c = CONTEUDOS[id - 1], col = PAL[c.cor];
  el.classList.add('popping');
  burst(E, col);
  setTimeout(() => { arrow.style.opacity = 0; }, 150);
  setTimeout(() => {
    el.classList.add('gone'); el.disabled = true; el.setAttribute('aria-pressed', 'false');
    state.used.add(id); progress(); openPanel(c);
  }, 360);
}
function burst(E, col) {
  const fx = $('#fx'), n = reduce ? 0 : 12, made = [];
  const wave = document.createElement('i');
  wave.style.cssText = `left:${E.x - 25}px;top:${E.y - 25}px;width:50px;height:50px;border-radius:50%;border:3px solid ${col[0]}`;
  fx.appendChild(wave); made.push(wave);
  wave.animate([{ transform: 'scale(.3)', opacity: .8 }, { transform: 'scale(2.4)', opacity: 0 }], { duration: 420, easing: 'ease-out' });
  for (let i = 0; i < n; i++) {
    const p = document.createElement('i'), a = i / n * Math.PI * 2 + Math.random() * .5, d = 40 + Math.random() * 50;
    p.style.cssText = `left:${E.x - 5}px;top:${E.y - 7}px;width:10px;height:14px;border-radius:50% 50% 40% 40%;background:${i % 2 ? col[0] : col[1]}`;
    fx.appendChild(p); made.push(p);
    p.animate([{ transform: 'translate(0,0) rotate(0)', opacity: 1 },
      { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d + 18}px) rotate(${Math.random() * 360}deg) scale(.5)`, opacity: 0 }],
      { duration: 450, easing: 'ease-out' });
  }
  setTimeout(() => made.forEach(p => p.remove()), 480);
}

/* ===== PAINEL ===== */
function openPanel(c) {
  const p = $('#panel'); if (!p.hidden) return;
  const col = PAL[c.cor];
  p.style.setProperty('--c1', col[0]); p.style.setProperty('--c2', col[1]);
  p.querySelector('.card').style.setProperty('--c1', col[0]);
  $('#pnum').textContent = 'Balão ' + c.id;
  $('#pcat').textContent = c.categoria + ' · ' + (c.tipo === 'desafio' ? 'Desafio' : 'Pergunta');
  $('#ptitle').textContent = c.titulo;
  $('#ptext').textContent = c.conteudo;
  p.hidden = false; $('#pnext').focus();
}
function closePanel() {
  const p = $('#panel'); if (p.hidden) return;
  p.hidden = true;
  state.sel = null; state.busy = false;
  $('#selinfo').textContent = 'Nenhum balão selecionado';
  arrow.style.opacity = 1; aim();
  if (state.used.size >= CONTEUDOS.length) showEnd(true);
}
function progress() { $('#prog').textContent = `Balões estourados: ${state.used.size} de ${CONTEUDOS.length}`; }

/* ===== ENCERRAMENTO E REINÍCIO ===== */
function showEnd(full) {
  if (state.busy) return;
  $('#etext').textContent = TEXTO_FIM; $('#endclose').hidden = false;
  $('#end').hidden = false; $('#restart').focus();
}
function farewell() { $('#etext').textContent = TEXTO_ADEUS; $('#endclose').hidden = true; }
function restart() {
  state.used.clear(); state.sel = null; state.busy = false;
  $('#end').hidden = true; $('#panel').hidden = true;
  render(); progress(); fireBtn.disabled = true;
  $('#selinfo').textContent = 'Nenhum balão selecionado';
  arrow.style.opacity = 1; aim();
}

/* ===== EVENTOS ===== */
function init() {
  render(); progress(); aim();
  fireBtn.addEventListener('click', fire);
  $('#snd').addEventListener('click', toggleSound);
  $('#stop').addEventListener('click', () => showEnd(false));
  $('#pnext').addEventListener('click', closePanel);
  $('#pclose').addEventListener('click', closePanel);
  $('#restart').addEventListener('click', restart);
  $('#endclose').addEventListener('click', farewell);
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (!$('#panel').hidden) closePanel(); else if (!$('#end').hidden && state.used.size < CONTEUDOS.length) $('#end').hidden = true;
  });
  let q = false;
  const sched = () => { if (q) return; q = true; requestAnimationFrame(() => { q = false; aim(); }); };
  addEventListener('resize', sched); addEventListener('scroll', sched, { passive: true });
  document.addEventListener('visibilitychange', () => document.body.classList.toggle('paused', document.hidden));
}
init();
