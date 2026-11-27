/* NEOFORGE · lógica común del sitio */
{
const D = window.NF;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const PAGE = document.body.dataset.page;
const store = {get(k){try{return sessionStorage.getItem(k)}catch(e){return null}}, set(k,v){try{sessionStorage.setItem(k,v)}catch(e){}}};
const PAGES = {inicio:'index.html', nosotros:'quienes-somos.html', proyectos:'proyectos.html', contacto:'contacto.html'};

/* =============== 1. Cabecera, menú, progreso =============== */
const nav = $('nav.main'), burger = $('.burger'), header = $('header.site'), prog = $('.progress'), totop = $('.totop');
$$('nav.main a').forEach(a => { if (a.dataset.page === PAGE) a.setAttribute('aria-current', 'page'); });
burger?.addEventListener('click', () => { const o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', o); });
const onScroll = () => {
  const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
  if (prog) prog.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
  header?.classList.toggle('scrolled', y > 10);
  totop?.classList.toggle('on', y > 700);
};
addEventListener('scroll', onScroll, {passive:true}); onScroll();
totop?.addEventListener('click', () => scrollTo({top:0, behavior: reduce ? 'auto' : 'smooth'}));

/* transición suave entre páginas */
document.addEventListener('click', e => {
  const a = e.target.closest('a[href]');
  if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target) return;
  const href = a.getAttribute('href');
  if (!/^[a-z-]+\.html(#[a-z0-9-]+)?$/.test(href)) return;
  if (href.split('#')[0] === PAGES[PAGE] && href.includes('#')) return;
  if (reduce) return;
  e.preventDefault(); document.body.classList.add('leaving');
  setTimeout(() => { location.href = href; }, 220);
});
addEventListener('pageshow', () => document.body.classList.remove('leaving'));

/* brillo que sigue al ratón en paneles */
document.addEventListener('pointermove', e => {
  const el = e.target.closest?.('.glow'); if (!el) return;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', (e.clientX - r.left) + 'px'); el.style.setProperty('--my', (e.clientY - r.top) + 'px');
}, {passive:true});

/* efecto "descifrado" en títulos */
const GLY = '!<>-_\\/[]{}=+*^?#01';
$$('[data-scramble]').forEach(el => {
  if (reduce) return;
  const fin = el.textContent; let f = 0; const total = 22;
  const run = () => {
    el.textContent = [...fin].map((ch, i) => ch === ' ' ? ' ' : (i < (f / total) * fin.length ? ch : GLY[(Math.random() * GLY.length) | 0])).join('');
    if (++f <= total) requestAnimationFrame(run); else el.textContent = fin;
  };
  run();
});

/* =============== 2. Portadas procedurales =============== */
let coverN = 0;
function rnd(seed){ let s = seed % 2147483647 || 7; return () => (s = s * 16807 % 2147483647) / 2147483647; }
function cover(p){
  const [h1, h2] = p.hue, r = rnd([...p.id].reduce((a, c) => a * 31 + c.charCodeAt(0), 7)), id = 'g' + p.id + (++coverN);
  const c1 = `hsl(${h1} 95% 58%)`, c2 = `hsl(${h2} 95% 60%)`;
  let art = '';
  if (p.m === 'grid'){
    for (let i = 0; i < 14; i++){ const y = 150 + i * i * .9; art += `<line x1="0" x2="400" y1="${y}" y2="${y}" stroke="${c1}" stroke-opacity="${.25 + i * .04}"/>`; }
    for (let i = -10; i <= 10; i++) art += `<line x1="200" y1="150" x2="${200 + i * 60}" y2="250" stroke="${c1}" stroke-opacity=".5"/>`;
    art = `<rect width="400" height="250" fill="url(#${id}l)"/><circle cx="200" cy="130" r="62" fill="url(#${id}s)"/>` + [0,1,2,3,4].map(i => `<rect x="130" y="${120 + i * 9}" width="140" height="${2 + i}" fill="#120a1e"/>`).join('') + `<path d="M0 150 60 112 110 136 170 96 240 132 300 104 400 150Z" fill="#1a0b2b"/><rect y="150" width="400" height="100" fill="#07070d"/>` + art;
  } else if (p.m === 'waves'){
    for (let k = 0; k < 7; k++){ let d = `M0 ${70 + k * 28}`; for (let x = 0; x <= 400; x += 20) d += ` L${x} ${70 + k * 28 + Math.sin(x / 40 + k) * 10 * (1 + k * .2)}`; art += `<path d="${d} L400 250 L0 250Z" fill="hsl(${h2} 80% ${30 - k * 3.5}%)" opacity=".9"/>`; }
    for (let i = 0; i < 40; i++) art += `<circle cx="${r() * 400}" cy="${r() * 250}" r="${r() * 2 + .6}" fill="${c1}" opacity="${r() * .7 + .2}"/>`;
    art = `<rect width="400" height="250" fill="url(#${id}l)"/>` + art + `<path d="M260 0 200 250h80L300 0Z" fill="#fff" opacity=".06"/><ellipse cx="240" cy="168" rx="26" ry="12" fill="#0b1820" stroke="${c1}" stroke-width="1.5"/><circle cx="252" cy="166" r="4" fill="${c1}"/>`;
  } else if (p.m === 'mount'){
    for (let k = 0; k < 4; k++){ let d = `M0 250 L0 ${130 + k * 28}`; for (let x = 0; x <= 400; x += 25) d += ` L${x} ${110 + k * 30 - r() * 40}`; art += `<path d="${d} L400 250Z" fill="hsl(${h1} ${40 + k * 10}% ${22 - k * 4}%)"/>`; }
    art = `<rect width="400" height="250" fill="url(#${id}l)"/><circle cx="300" cy="80" r="34" fill="${c2}" opacity=".9"/>` + art + `<path d="M150 200V128h12v-10h10v10h12v-24h16l8-14 8 14h16v24h12v-10h10v10h12v72Z" fill="#0b0705" stroke="${c1}" stroke-width="1.5"/>`;
    for (let i = 0; i < 30; i++) art += `<rect x="${r() * 400}" y="${120 + r() * 130}" width="2" height="2" fill="${c2}" opacity="${r()}"/>`;
  } else if (p.m === 'hex'){
    for (let y = -1; y < 8; y++) for (let x = -1; x < 12; x++){ const cx = x * 38 + (y % 2) * 19, cy = y * 33, o = r(); art += `<path d="M${cx} ${cy - 20}l17 10v20l-17 10-17-10v-20Z" fill="${o > .86 ? c2 : 'none'}" fill-opacity=".25" stroke="${o > .6 ? c1 : '#233'}" stroke-opacity="${o * .8 + .1}"/>`; }
    art = `<rect width="400" height="250" fill="#06070c"/>` + art + `<circle cx="200" cy="125" r="56" fill="#06070c" stroke="${c2}" stroke-width="2"/><circle cx="200" cy="125" r="30" fill="none" stroke="${c1}" stroke-width="6" stroke-dasharray="20 8"/><circle cx="200" cy="125" r="9" fill="${c2}"/>`;
  } else if (p.m === 'rings'){
    art = `<rect width="400" height="250" fill="url(#${id}l)"/>`;
    for (let i = 0; i < 9; i++) art += `<circle cx="200" cy="125" r="${18 + i * 15}" fill="none" stroke="${i % 2 ? c1 : c2}" stroke-width="${i % 3 ? 1.2 : 3}" stroke-dasharray="${4 + i * 6} ${3 + i * 2}" opacity="${1 - i * .08}"/>`;
    for (let i = 0; i < 12; i++){ const a = i / 12 * Math.PI * 2; art += `<line x1="${200 + Math.cos(a) * 140}" y1="${125 + Math.sin(a) * 140}" x2="${200 + Math.cos(a) * 152}" y2="${125 + Math.sin(a) * 152}" stroke="${c2}" stroke-width="3"/>`; }
    art += `<line x1="200" y1="125" x2="200" y2="58" stroke="#fff" stroke-width="3"/><line x1="200" y1="125" x2="246" y2="140" stroke="${c1}" stroke-width="3"/><circle cx="200" cy="125" r="5" fill="#fff"/>`;
  } else {
    art = `<rect width="400" height="250" fill="#07090d"/>`;
    for (let i = 0; i < 16; i++){ const w = 30 + r() * 190, x = 24 + Math.floor(r() * 4) * 18; art += `<rect x="${x}" y="${18 + i * 14}" width="${w}" height="6" rx="3" fill="${r() > .7 ? c2 : r() > .5 ? c1 : '#2a3644'}" opacity=".85"/>`; }
    art += `<path d="M292 70 262 125l30 55M338 70l30 55-30 55" fill="none" stroke="${c1}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><path d="M322 62 308 188" stroke="${c2}" stroke-width="8" stroke-linecap="round"/>`;
  }
  return `<svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="${id}l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="hsl(${h1} 60% 14%)"/><stop offset="1" stop-color="hsl(${h2} 60% 6%)"/></linearGradient><linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c2}"/><stop offset="1" stop-color="${c1}"/></linearGradient><linearGradient id="${id}f" x1="0" y1="0" x2="0" y2="1"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".7"/></linearGradient></defs>${art}<rect width="400" height="250" fill="url(#${id}f)"/></svg>`;
}
const ST = D.estados;
const card = (p, i = 0) => `<button class="card" data-id="${p.id}" style="animation-delay:${i * 60}ms" aria-label="Ver ficha de ${esc(p.t)}"><div class="cover">${cover(p)}<span class="tag ${ST[p.st][1]}">● ${ST[p.st][0]}</span></div><div class="cbody"><h3>${esc(p.t)}</h3><p>${esc(p.d)}</p><div class="meta"><span>${esc(p.g)}</span><span>${esc(p.y)}</span><span>${esc(p.plat.split(',')[0])}${p.plat.includes(',') ? ' +' : ''}</span></div></div></button>`;
const fill = (sel, html) => { const el = $(sel); if (el) el.innerHTML = html; return el; };

/* =============== 3. Contenido de cada página =============== */
fill('#svc', D.servicios.map((s, i) => `<div class="box glow"><span class="k">0${i + 1}</span><svg class="ic" viewBox="0 0 44 44" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${s[2]}</svg><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join(''));
fill('#feat', ['nyx','ferrum','drift'].map((id, i) => card(D.proyectos.find(p => p.id === id), i)).join(''));
fill('#marq', [...D.tech, ...D.tech].map(t => `<span>${t}</span>`).join(''));
fill('#bench', D.bench.map(b => `<div class="bench-row${b[3] ? ' us' : ''}"><span>${b[0]}</span><b>${b[1]}</b><div class="meter"><i style="--w:${b[2] * 100}%"></i></div></div>`).join(''));
const fmtF = f => new Date(f + 'T12:00:00').toLocaleDateString('es-ES', {day:'numeric', month:'long', year:'numeric'});
fill('#news', D.diario.map(n => `<article class="post glow" style="position:relative;overflow:hidden"><time datetime="${n.f}">${fmtF(n.f)}</time><h3>${esc(n.t)}</h3><p>${esc(n.d)}</p><span class="mono">${esc(n.a)} · ${n.min} min de lectura</span></article>`).join(''));
fill('#tl', D.historia.map(e => `<div class="ev"><b>${e[0]}</b><i></i><div><h3>${e[1]}</h3><p>${e[2]}</p></div></div>`).join(''));
fill('#vals', D.valores.map(v => `<div class="box glow"><span class="k">${v[0]}</span><h3>${v[1]}</h3><p style="margin-top:10px">${v[2]}</p></div>`).join(''));
fill('#team', D.equipo.map(m => { const ini = m[0].split(' ').map(w => w[0]).join(''); return `<div class="mem glow"><svg viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" fill="hsl(${m[3]} 50% 12%)"/><path d="M0 64 32 30 64 64Z" fill="hsl(${m[3]} 80% 55%)" opacity=".35"/><path d="M32 6 54 19v26L32 58 10 45V19Z" fill="none" stroke="hsl(${m[3]} 90% 62%)" stroke-width="1.5"/><text x="32" y="38" text-anchor="middle" font-family="Chakra Petch,sans-serif" font-weight="700" font-size="18" fill="#fff">${ini}</text></svg><div><h3>${m[0]}</h3><p>${m[1]}</p><span class="mono">${m[2]}</span></div></div>`; }).join(''));
function skyline(hue, seed){
  const r = rnd(seed); let s = `<rect width="600" height="200" fill="hsl(${hue} 50% 7%)"/>`;
  for (let i = 0; i < 26; i++) s += `<circle cx="${r() * 600}" cy="${r() * 90}" r="${r() + .4}" fill="#fff" opacity="${r() * .6}"/>`;
  for (let L = 0; L < 3; L++){ let x = -10; while (x < 610){ const w = 24 + r() * 46, h = 40 + r() * (60 + L * 30); s += `<rect x="${x}" y="${200 - h}" width="${w}" height="${h}" fill="hsl(${hue} ${30 + L * 15}% ${8 + L * 5}%)"/>`; if (L === 2) for (let wy = 200 - h + 8; wy < 194; wy += 10) for (let wx = x + 5; wx < x + w - 6; wx += 9) if (r() > .72) s += `<rect x="${wx}" y="${wy}" width="4" height="4" fill="hsl(${hue} 95% 62%)" opacity="${.4 + r() * .6}"/>`; x += w + 2; } }
  return `<svg viewBox="0 0 600 200" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${s}<rect y="196" width="600" height="4" fill="hsl(${hue} 95% 58%)"/></svg>`;
}
fill('#sedes', D.sedes.map((s, i) => `<div class="sede"><div class="art">${skyline(s.hue, 99 + i * 7)}</div><div class="in"><h3>${s.n}</h3><span class="mono" style="font-size:13px;color:var(--hot2)">${s.r}</span><p>${s.d}</p><div class="tags">${s.t.map(t => `<span>${t}</span>`).join('')}</div></div></div>`).join(''));
fill('#roles', D.empleo.map(r => `<a class="role" href="contacto.html#empleo"><div><b>${r[0]}</b><small>${r[1]}</small></div><span class="loc">${r[2]}</span><em>aplicar →</em></a>`).join(''));
fill('#faq-list', D.faq.map((f, i) => `<details${i ? '' : ' open'}><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join(''));
fill('#pipe', `<ul class="pipe">${D.pipeline.map(s => `<li><b>${s[0]}</b><span>${s[1]}</span></li>`).join('')}</ul>`);
$$('[data-count-roles]').forEach(el => el.textContent = D.empleo.length);

/* =============== 4. Contadores =============== */
$$('[data-n]').forEach(el => {
  const n = +el.dataset.n, s = el.dataset.s || '';
  if (reduce){ el.textContent = n + s; return; }
  const t0 = performance.now() + 300;
  const step = t => { const k = Math.max(0, Math.min(1, (t - t0) / 1500)), v = Math.round(n * (1 - (1 - k) ** 3)); el.textContent = v + s; if (k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
});

/* =============== 5. Cuenta atrás de lanzamiento =============== */
const cd = $('#countdown');
if (cd){
  const L = D.proyectos.find(p => p.id === D.lanzamiento.id), target = new Date(D.lanzamiento.fecha).getTime();
  fill('#launch-cover', cover(L) + `<span class="tag dev">● Próximo lanzamiento</span>`);
  const tick = () => {
    let s = Math.max(0, Math.floor((target - Date.now()) / 1000));
    const v = [Math.floor(s / 86400), Math.floor(s % 86400 / 3600), Math.floor(s % 3600 / 60), s % 60];
    cd.innerHTML = ['días','horas','min','seg'].map((l, i) => `<div><b>${String(v[i]).padStart(2, '0')}</b><span>${l}</span></div>`).join('');
  };
  tick(); setInterval(tick, 1000);
}

/* =============== 6. Proyectos: filtros, buscador, ficha =============== */
const plist = $('#plist'), modal = $('#modal');
let filt = 'all', q = '', cur = null, lastFocus = null;
const F = [['all','Todos'],['live','Lanzados'],['dev','En desarrollo'],['tool','Herramientas']];
function renderP(){
  if (!plist) return;
  fill('#chips', F.map(f => `<button class="chip" data-f="${f[0]}" aria-pressed="${filt === f[0]}">${f[1]}<em>${f[0] === 'all' ? D.proyectos.length : D.proyectos.filter(p => p.st === f[0]).length}</em></button>`).join(''));
  const n = q.toLowerCase();
  const list = D.proyectos.filter(p => (filt === 'all' || p.st === filt) && (!n || (p.t + ' ' + p.g + ' ' + p.plat + ' ' + p.d).toLowerCase().includes(n)));
  plist.innerHTML = list.length ? list.map(card).join('') : `<div class="empty">0 resultados para "${esc(q)}". Prueba con "estrategia", "PS5" o "motor".</div>`;
}
renderP();
$('#chips')?.addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; filt = b.dataset.f; renderP(); });
$('#q')?.addEventListener('input', e => { q = e.target.value.trim(); renderP(); });

function openP(id, push = true){
  const i = D.proyectos.findIndex(x => x.id === id); if (i < 0 || !modal) return;
  const p = D.proyectos[i], prev = D.proyectos[(i + D.proyectos.length - 1) % D.proyectos.length], next = D.proyectos[(i + 1) % D.proyectos.length];
  if (modal.hidden) lastFocus = document.activeElement;
  cur = id;
  $('#mbox').innerHTML = `<button class="x" data-act="close" aria-label="Cerrar ficha">×</button><div class="cover">${cover(p)}<span class="tag ${ST[p.st][1]}">● ${ST[p.st][0]}</span></div><div class="mcont"><div><p class="prompt">open ./${p.id}</p><h2 id="mtitle">${esc(p.t)}</h2><p class="lead">${esc(p.long)}</p><ul class="feats">${p.feats.map(f => `<li>${esc(f)}</li>`).join('')}</ul></div><div><div class="spec"><div><span>género</span><b>${esc(p.g)}</b></div><div><span>${p.st === 'tool' ? 'versión' : p.st === 'dev' ? 'lanzamiento' : 'año'}</span><b>${esc(p.y)}</b></div><div><span>plataformas</span><b>${esc(p.plat)}</b></div><div><span>tecnología</span><b>${esc(p.mot)}</b></div><div><span>equipo</span><b>${p.team} personas</b></div><div style="display:block"><span>progreso del desarrollo</span><b style="float:right">${p.prog}%</b><div class="meter"><i style="--w:${p.prog}%"></i></div></div></div><div class="btns" style="margin-top:18px"><a class="btn main" href="contacto.html">${p.st === 'dev' ? 'Avísame del lanzamiento' : 'Hablar con el equipo'} →</a></div></div></div><div class="mnav"><button class="btn sm" data-go="${prev.id}">← ${esc(prev.t)}</button><button class="btn sm" data-go="${next.id}">${esc(next.t)} →</button></div>`;
  modal.hidden = false; document.body.style.overflow = 'hidden';
  $('#mbox').scrollTop = 0; $('.x', modal).focus();
  if (push && PAGE === 'proyectos') history.replaceState(null, '', '#' + id);
}
function closeP(){
  if (!modal || modal.hidden) return;
  modal.hidden = true; document.body.style.overflow = ''; cur = null;
  if (PAGE === 'proyectos' && location.hash) history.replaceState(null, '', location.pathname + location.search);
  lastFocus?.focus?.();
}
document.addEventListener('click', e => { const c = e.target.closest('.card'); if (c) openP(c.dataset.id); });
modal?.addEventListener('click', e => {
  if (e.target === modal || e.target.closest('[data-act=close]')) return closeP();
  const g = e.target.closest('[data-go]'); if (g) openP(g.dataset.go);
});
document.addEventListener('keydown', e => {
  if (!modal || modal.hidden) return;
  if (e.key === 'Escape') closeP();
  const i = D.proyectos.findIndex(x => x.id === cur);
  if (e.key === 'ArrowRight') openP(D.proyectos[(i + 1) % D.proyectos.length].id);
  if (e.key === 'ArrowLeft') openP(D.proyectos[(i + D.proyectos.length - 1) % D.proyectos.length].id);
});
const fromHash = () => { const h = location.hash.slice(1); if (PAGE === 'proyectos' && D.proyectos.some(p => p.id === h)) openP(h, false); };
fromHash(); addEventListener('hashchange', fromHash);

/* =============== 7. Terminal que escribe solo =============== */
const tb = $('#tb');
if (tb){
  const LINES = [
    ['g','$ forja build nyx_protocol --target=ps5'],['n'],
    ['','  compilando shaders ...... '],['c','4.812 ok'],['n'],
    ['','  empaquetando assets ..... '],['c','12,4 GB'],['n'],
    ['','  test de rendimiento ..... '],['c','60 fps'],['n'],
    ['o','✔ build #2088 lista en 41,7 s'],['n'],
    ['g','$ forja deploy --canal=beta'],['n'],
    ['','  jugadores conectados: '],['c','18 342'],['n']
  ];
  if (reduce){ tb.innerHTML = LINES.map(l => l[0] === 'n' ? '\n' : `<span class="${l[0]}">${esc(l[1])}</span>`).join('') + '<span class="cur"></span>'; }
  else {
    let li = 0, ci = 0, html = '';
    const tick = () => {
      if (li >= LINES.length){ tb.innerHTML = html + '<span class="cur"></span>'; setTimeout(() => { li = 0; ci = 0; html = ''; tick(); }, 4200); return; }
      const [c, txt] = LINES[li];
      if (c === 'n'){ html += '\n'; li++; return setTimeout(tick, 160); }
      ci++; const part = `<span class="${c}">${esc(txt.slice(0, ci))}</span>`;
      tb.innerHTML = html + part + '<span class="cur"></span>';
      if (ci >= txt.length){ html += part; li++; ci = 0; setTimeout(tick, c === 'c' ? 260 : 110); } else setTimeout(tick, c === 'g' ? 36 : 12);
    };
    setTimeout(tick, store.get('nf-boot') ? 300 : 1700);
  }
}

/* =============== 8. Escena de la forja (canvas) =============== */
const cv = $('#forge');
if (cv){
  const ctx = cv.getContext('2d'), fpsEl = $('#fps');
  const phi = (1 + Math.sqrt(5)) / 2;
  const V = [[-1,phi,0],[1,phi,0],[-1,-phi,0],[1,-phi,0],[0,-1,phi],[0,1,phi],[0,-1,-phi],[0,1,-phi],[phi,0,-1],[phi,0,1],[-phi,0,-1],[-phi,0,1]];
  const E = []; for (let i = 0; i < 12; i++) for (let j = i + 1; j < 12; j++){ const d = Math.hypot(V[i][0]-V[j][0], V[i][1]-V[j][1], V[i][2]-V[j][2]); if (Math.abs(d - 2) < .01) E.push([i, j]); }
  let W = 0, H = 0, sparks = [], last = performance.now(), acc = 0, n = 0, visible = true;
  let rotA = 0, rotB = 0, velA = .35, velB = .22, drag = null;
  const size = () => { const dpr = Math.min(2, devicePixelRatio || 1); W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); if (reduce) frame(0); };
  const ro = new ResizeObserver(size); ro.observe(cv);
  const io = new IntersectionObserver(es => { visible = es[0].isIntersecting; }); io.observe(cv);
  cv.addEventListener('pointerdown', e => { drag = {x:e.clientX, y:e.clientY}; cv.setPointerCapture(e.pointerId); });
  cv.addEventListener('pointermove', e => { if (!drag) return; velA = (e.clientX - drag.x) * .02; velB = (e.clientY - drag.y) * .02; rotA += velA * .1; rotB += velB * .1; drag = {x:e.clientX, y:e.clientY}; if (reduce) frame(0); });
  const up = () => { drag = null; }; cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
  function frame(dt){
    if (!drag){ velA += (.35 - velA) * .02; velB += (.22 - velB) * .02; }
    if (!reduce){ rotA += velA * dt; rotB += velB * dt; }
    const t = performance.now() / 1000;
    ctx.clearRect(0, 0, W, H);
    const hz = H * .62, cx = W / 2, cy = H * .36, R = Math.min(W, H) * .17;
    ctx.lineWidth = 1;
    const off = reduce ? 0 : (t * .5) % 1;
    for (let i = 0; i < 16; i++){ const k = ((i + off) / 16), y = hz + (H - hz) * k * k; ctx.strokeStyle = `rgba(255,110,40,${.05 + k * .28})`; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    for (let i = -14; i <= 14; i++){ ctx.strokeStyle = 'rgba(54,226,255,.15)'; ctx.beginPath(); ctx.moveTo(cx + i * 8, hz); ctx.lineTo(cx + i * (W / 9), H); ctx.stroke(); }
    const gl = ctx.createLinearGradient(0, hz - 2, 0, hz + 2); gl.addColorStop(0, 'rgba(255,90,31,0)'); gl.addColorStop(.5, 'rgba(255,140,60,.9)'); gl.addColorStop(1, 'rgba(255,90,31,0)'); ctx.fillStyle = gl; ctx.fillRect(0, hz - 2, W, 4);
    const rg = ctx.createRadialGradient(cx, hz, 0, cx, hz, R * 2.6); rg.addColorStop(0, 'rgba(255,100,30,.45)'); rg.addColorStop(1, 'rgba(255,100,30,0)'); ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H);
    const ca = Math.cos(rotA), sa = Math.sin(rotA), cb = Math.cos(rotB), sb = Math.sin(rotB), bob = reduce ? 0 : Math.sin(t * 1.2) * 6;
    const pr = V.map(([x, y, z]) => { let X = x * ca - z * sa, Z = x * sa + z * ca, Y = y * cb - Z * sb; Z = y * sb + Z * cb; const k = 3.6 / (3.6 + Z * .35); return [cx + X * R * k, cy + bob + Y * R * k, Z]; });
    E.forEach(([i, j]) => { const z = (pr[i][2] + pr[j][2]) / 2, al = .35 + (1 - (z + 2) / 4) * .65; ctx.strokeStyle = z < 0 ? `rgba(255,174,43,${al})` : `rgba(54,226,255,${al * .6})`; ctx.lineWidth = z < 0 ? 1.8 : 1; ctx.beginPath(); ctx.moveTo(pr[i][0], pr[i][1]); ctx.lineTo(pr[j][0], pr[j][1]); ctx.stroke(); });
    pr.forEach(p => { ctx.fillStyle = p[2] < 0 ? '#ffd9a0' : 'rgba(54,226,255,.7)'; ctx.beginPath(); ctx.arc(p[0], p[1], p[2] < 0 ? 2.6 : 1.6, 0, 7); ctx.fill(); });
    ctx.strokeStyle = 'rgba(255,174,43,.25)'; ctx.beginPath(); ctx.ellipse(cx, hz + 8, R * 1.3, R * .16, 0, 0, 7); ctx.stroke();
    if (!reduce && sparks.length < 150) for (let i = 0; i < 3; i++) sparks.push({x: cx + (Math.random() - .5) * R * 2.4, y: hz, vx: (Math.random() - .5) * 1.4, vy: -(1 + Math.random() * 2.6), l: 1});
    if (reduce && !sparks.length){ const r = rnd(42); for (let i = 0; i < 60; i++) sparks.push({x: cx + (r() - .5) * W * .7, y: hz - r() * H * .6, vx: 0, vy: 0, l: r()}); }
    sparks.forEach(s => { if (!reduce){ s.x += s.vx; s.y += s.vy; s.vy += .012; s.l -= .008; } ctx.fillStyle = `rgba(255,${120 + s.l * 100 | 0},40,${Math.max(0, s.l)})`; ctx.fillRect(s.x, s.y, 2, 2); });
    if (!reduce) sparks = sparks.filter(s => s.l > 0);
  }
  const loop = now => {
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    if (visible && !document.hidden){ frame(dt); acc += dt; n++; if (acc > .8){ fpsEl && (fpsEl.textContent = Math.round(n / acc)); acc = 0; n = 0; } }
    requestAnimationFrame(loop);
  };
  if (!reduce) requestAnimationFrame(loop);
}

/* =============== 9. Formularios =============== */
const form = $('#form');
if (form){
  const log = $('#log'), msg = $('#mensaje'), cnt = $('#cnt'), rng = $('#presu'), out = $('#presu-out');
  const P = ['Menos de 50 000 €','50 000 - 150 000 €','150 000 - 500 000 €','500 000 € - 1 M€','Más de 1 M€'];
  const upR = () => { rng.style.setProperty('--p', (rng.value / 4 * 100) + '%'); out.textContent = P[rng.value]; };
  rng.addEventListener('input', upR); upR();
  msg.addEventListener('input', () => { cnt.textContent = `${msg.value.length}/1000`; });
  if (location.hash === '#empleo'){ const r = $('#m-empleo'); if (r) r.checked = true; }
  form.addEventListener('submit', e => {
    e.preventDefault();
    const v = {nombre: $('#nombre').value.trim(), email: $('#email').value.trim(), mensaje: msg.value.trim()};
    const errs = {
      nombre: v.nombre.length < 2 ? 'Escribe tu nombre.' : '',
      email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email) ? '' : 'Introduce un email válido, por ejemplo ana@estudio.com.',
      mensaje: v.mensaje.length < 10 ? 'El mensaje necesita al menos 10 caracteres.' : '',
      priv: $('#priv').checked ? '' : 'Debes aceptar la política de privacidad.'
    };
    let ok = true;
    for (const k in errs){ $('#e-' + k).textContent = errs[k]; const inp = $(k === 'priv' ? '#priv' : '#' + k); inp.classList.toggle('bad', !!errs[k]); inp.setAttribute('aria-invalid', !!errs[k]); if (errs[k] && ok){ ok = false; inp.focus(); } }
    if (!ok) return;
    const motivo = ($('input[name=motivo]:checked') || {}).value || 'General';
    const steps = [['g','$ neoforge-mail --cifrar --enviar'],['','  validando campos ........ ok'],['','  cifrando con TLS 1.3 .... ok'],['','  canal asignado: ' + motivo],['','  presupuesto: ' + P[rng.value]],['o','✔ Mensaje registrado. Gracias, ' + v.nombre.split(' ')[0] + '.'],['m','  (web de demostración: el mensaje no se envía a ningún servidor)']];
    log.hidden = false; log.innerHTML = ''; $('#send').disabled = true;
    steps.forEach((s, i) => setTimeout(() => {
      log.innerHTML += `<span class="${s[0]}">${esc(s[1])}</span>\n`;
      if (i === steps.length - 1){ $('#send').disabled = false; form.reset(); upR(); cnt.textContent = '0/1000'; }
    }, reduce ? 0 : i * 340));
  });
  ['nombre','email','mensaje'].forEach(k => $('#' + k).addEventListener('input', () => { $('#' + k).classList.remove('bad'); $('#e-' + k).textContent = ''; }));
  $('#priv').addEventListener('change', () => { $('#priv').classList.remove('bad'); $('#e-priv').textContent = ''; });
  /* abierto / cerrado según la hora de Madrid */
  const st = $('#abierto');
  if (st){
    const parts = new Intl.DateTimeFormat('es-ES', {timeZone:'Europe/Madrid', weekday:'short', hour:'numeric', hour12:false}).formatToParts(new Date());
    const wd = parts.find(p => p.type === 'weekday').value, h = +parts.find(p => p.type === 'hour').value;
    const open = !/sáb|dom/.test(wd) && h >= 9 && h < 18;
    st.innerHTML = `<i class="dot" style="background:${open ? 'var(--ok)' : 'var(--hot)'};box-shadow:0 0 10px ${open ? 'var(--ok)' : 'var(--hot)'}"></i>${open ? 'Abierto ahora' : 'Cerrado ahora, te responderemos el próximo día laborable'}`;
  }
}
const nf = $('#newsform');
nf?.addEventListener('submit', e => {
  e.preventDefault();
  const em = $('#nemail'), okE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em.value.trim());
  em.classList.toggle('bad', !okE);
  $('#nmsg').innerHTML = okE ? '<span class="g">✔ Suscripción registrada (demo, no se envía nada).</span>' : '<span class="r">Introduce un email válido.</span>';
  if (okE) em.value = '';
});

/* copiar al portapapeles */
document.addEventListener('click', async e => {
  const b = e.target.closest('.copy'); if (!b) return;
  try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent = 'copiado ✔'; }
  catch (err) { b.textContent = 'selecciónalo'; }
  setTimeout(() => { b.textContent = 'copiar'; }, 1800);
});

/* =============== 10. Consola interactiva =============== */
const fab = $('.fab'), con = $('#console'), cout = $('#con-out'), cin = $('#con-in');
const hist = []; let hi = 0;
const print = (html) => { cout.insertAdjacentHTML('beforeend', html + '\n'); cout.scrollTop = cout.scrollHeight; };
const CMDS = {
  help: () => print(`Comandos disponibles:
  <span class="c">ls</span>               lista las páginas del sitio
  <span class="c">cd</span> &lt;página&gt;      ir a inicio, nosotros, proyectos o contacto
  <span class="c">proyectos</span>        lista todos los proyectos
  <span class="c">open</span> &lt;proyecto&gt;   abre la ficha (ej: open ferrum)
  <span class="c">equipo</span>           muestra el equipo directivo
  <span class="c">empleo</span>           vacantes abiertas
  <span class="c">neofetch</span>         información del estudio
  <span class="c">date</span>             fecha y hora
  <span class="c">clear</span>            limpia la consola
  <span class="c">exit</span>             cierra la consola`),
  ls: () => print(Object.entries(PAGES).map(([k, v]) => `<span class="c">${k}/</span>  <span class="m">${v}</span>`).join('\n')),
  cd: a => { const k = {inicio:'inicio', home:'inicio', nosotros:'nosotros', 'quienes-somos':'nosotros', proyectos:'proyectos', contacto:'contacto'}[a]; if (!k) return print(`<span class="r">cd: no existe la página "${esc(a || '')}"</span>. Prueba: ls`); print(`<span class="g">→ abriendo ${k}...</span>`); setTimeout(() => { location.href = PAGES[k]; }, 350); },
  proyectos: () => print(D.proyectos.map(p => `<span class="${ST[p.st][1] === 'live' ? 'g' : ST[p.st][1] === 'dev' ? 'o' : 'c'}">●</span> ${p.id.padEnd(8)} ${esc(p.t).padEnd(16)} <span class="m">${esc(p.g)} · ${p.y}</span>`).join('\n') + '\n<span class="m">Usa: open &lt;id&gt;</span>'),
  open: a => { const p = D.proyectos.find(x => x.id === a || x.t.toLowerCase() === (a || '').toLowerCase()); if (!p) return print(`<span class="r">open: proyecto "${esc(a || '')}" no encontrado</span>. Prueba: proyectos`); if (PAGE === 'proyectos'){ closeCon(); openP(p.id); } else { print(`<span class="g">→ abriendo ficha de ${esc(p.t)}...</span>`); setTimeout(() => { location.href = 'proyectos.html#' + p.id; }, 350); } },
  equipo: () => print(D.equipo.map(m => `${m[0].padEnd(15)} <span class="m">${m[1]}</span>`).join('\n')),
  empleo: () => print(D.empleo.map(r => `<span class="o">▸</span> ${r[0]} <span class="m">(${r[2]})</span>`).join('\n') + '\n<span class="m">Escribe "cd contacto" para aplicar.</span>'),
  neofetch: () => print(`<span class="r">   ▲▲▲   </span> <span class="g">neoforge</span>@<span class="g">studio</span>
<span class="r">  ▲▲ ▲▲  </span> ----------------
<span class="r"> ▲▲ ◆ ▲▲ </span> <span class="c">Fundado</span>: 2016, Valencia
<span class="r">  ▲▲ ▲▲  </span> <span class="c">Equipo</span>: 140 personas
<span class="r">   ▲▲▲   </span> <span class="c">Motor</span>: Forja Engine v4.2
          <span class="c">Juegos</span>: ${D.proyectos.filter(p => p.st !== 'tool').length}
          <span class="c">Jugadores</span>: 12 M`),
  date: () => print(new Date().toLocaleString('es-ES', {dateStyle:'full', timeStyle:'medium'})),
  whoami: () => print('visitante@neoforge · nivel 1 · ¿te unes al equipo? escribe "empleo"'),
  sudo: () => print('<span class="o">Buen intento.</span> Aquí el único root es la forja.'),
  clear: () => { cout.innerHTML = ''; },
  exit: () => closeCon()
};
function run(line){
  const [c, ...rest] = line.trim().split(/\s+/); if (!c) return;
  print(`<span class="g">visitante@neoforge</span>:<span class="c">~/${PAGE}</span>$ ${esc(line)}`);
  const f = CMDS[c.toLowerCase()];
  f ? f(rest.join(' ').toLowerCase()) : print(`<span class="r">comando no encontrado: ${esc(c)}</span>. Escribe <span class="c">help</span>.`);
}
function openCon(){ con.hidden = false; fab.setAttribute('aria-expanded', 'true'); if (!cout.innerHTML) print(`<span class="o">NeoForge Shell v4.2</span> · escribe <span class="c">help</span> para ver los comandos.\n`); setTimeout(() => cin.focus(), 50); }
function closeCon(){ con.hidden = true; fab.setAttribute('aria-expanded', 'false'); fab.focus(); }
fab?.addEventListener('click', () => con.hidden ? openCon() : closeCon());
$('#con-x')?.addEventListener('click', closeCon);
$$('[data-open-console]').forEach(b => b.addEventListener('click', openCon));
$('#con-form')?.addEventListener('submit', e => { e.preventDefault(); const v = cin.value; if (v.trim()){ hist.push(v); hi = hist.length; } cin.value = ''; run(v); });
cin?.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp' && hi > 0){ e.preventDefault(); cin.value = hist[--hi]; }
  if (e.key === 'ArrowDown'){ e.preventDefault(); hi = Math.min(hist.length, hi + 1); cin.value = hist[hi] || ''; }
  if (e.key === 'Tab'){ e.preventDefault(); const m = Object.keys(CMDS).filter(k => k.startsWith(cin.value)); if (m.length === 1) cin.value = m[0] + ' '; else if (m.length) print('<span class="m">' + m.join('  ') + '</span>'); }
  if (e.key === 'Escape') closeCon();
});
document.addEventListener('keydown', e => {
  const t = e.target.tagName;
  if ((e.key === '`' || e.key === 'º' || e.key === '~') && !/INPUT|TEXTAREA|SELECT/.test(t)){ e.preventDefault(); con.hidden ? openCon() : closeCon(); }
});

/* =============== 11. Secuencia de arranque (una vez por visita) =============== */
if (PAGE === 'inicio' && !reduce && !store.get('nf-boot')){
  store.set('nf-boot', '1');
  const d = document.createElement('div'); d.className = 'boot'; d.setAttribute('aria-hidden', 'true');
  const L = ['<span class="g">NEOFORGE BIOS v4.2</span>', '> cargando núcleo ............ ok', '> montando Forja Engine ...... ok', '> calentando la forja ........ <span class="o">1450 °C</span>', '> bienvenido.'];
  d.innerHTML = '<div style="width:min(520px,100%)"><pre></pre><div class="barb"><i></i></div><small>toca para saltar</small></div>';
  document.body.appendChild(d);
  const pre = $('pre', d); let i = 0;
  const end = () => { clearInterval(it); d.style.opacity = '0'; setTimeout(() => d.remove(), 450); };
  d.addEventListener('click', end);
  const it = setInterval(() => { pre.innerHTML += L[i] + '\n'; i++; if (i >= L.length){ clearInterval(it); setTimeout(end, 350); } }, 230);
}
}
