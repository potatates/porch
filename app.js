const CFG = window.PORCH_CONFIG || {};
const WRITE_SECONDS = 5 * 60;
const ME_KEY = 'porch.me';

// ---------- profile pictures ----------
const ICONS = {
  cloud: '<path d="M7 18h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.2 11 3.5 3.5 0 0 0 7 18z"/>',
  house: '<path d="M4 11l8-6.5 8 6.5v9H4z"/><path d="M10 20v-5h4v5"/>',
  moon: '<path d="M19.5 14.5A8 8 0 1 1 9.5 4.5a6.2 6.2 0 0 0 10 10z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/>',
  tree: '<path d="M12 3l6 8h-3.5l4.5 6H5l4.5-6H6z"/><path d="M12 17v4"/>',
  mushroom: '<path d="M3.5 12a8.5 7 0 0 1 17 0z"/><path d="M9.5 12v6a2.5 2.5 0 0 0 5 0v-6"/><circle cx="9" cy="8.5" r=".6" fill="currentColor"/><circle cx="14.5" cy="7.5" r=".6" fill="currentColor"/>',
  fish: '<path d="M3 12c3-5 9.5-6 13.5 0-4 6-10.5 5-13.5 0z"/><path d="M16.5 12L21 8.5v7z"/><circle cx="8" cy="11" r=".7" fill="currentColor"/>',
  cat: '<path d="M5 9.5L6 4l4 3h4l4-3 1 5.5V13a7 6.5 0 0 1-14 0z"/><circle cx="9.5" cy="12" r=".7" fill="currentColor"/><circle cx="14.5" cy="12" r=".7" fill="currentColor"/><path d="M11 15h2l-1 1z"/>',
  frog: '<circle cx="8" cy="7.5" r="2.5"/><circle cx="16" cy="7.5" r="2.5"/><path d="M5.5 9.5C4 11 3.5 12.5 3.5 14c0 3.5 3.8 5.5 8.5 5.5s8.5-2 8.5-5.5c0-1.5-.5-3-2-4.5"/><path d="M8.5 14.5c2 1.5 5 1.5 7 0"/>',
  flower: '<circle cx="12" cy="10" r="2"/><path d="M12 8a2.5 2.5 0 1 1 0-5 2.5 2.5 0 1 1 0 5M14 10a2.5 2.5 0 1 1 5 0 2.5 2.5 0 1 1-5 0M12 12a2.5 2.5 0 1 1 0 5 2.5 2.5 0 1 1 0-5M10 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0"/><path d="M12 17v4.5"/>',
  boat: '<path d="M3 15.5h18l-3 4.5H6z"/><path d="M12 15.5V3.5l6.5 9.5H12"/>',
  snail: '<circle cx="14" cy="12" r="5"/><path d="M14 12a2 2 0 1 0-2-2"/><path d="M3 17h15"/><path d="M5 17c-.5-2-1-4-1.5-6M3.5 11l-1-1.5M3.5 11l.5-2"/>',
  bunny: '<path d="M9 9C8 6 8 3 9.5 2.5S12 5 11.5 9M15 9c1-3 1-6-.5-6.5S12 5 12.5 9"/><ellipse cx="12" cy="14" rx="6" ry="5.5"/><circle cx="10" cy="13.5" r=".7" fill="currentColor"/><circle cx="14" cy="13.5" r=".7" fill="currentColor"/>',
  leaf: '<path d="M5 19C5 10 10 5 20 4c-1 10-6 15-15 15z"/><path d="M5 19l9-9"/>',
  star: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8L3.5 9.7l5.9-.9z"/>',
  bee: '<ellipse cx="12" cy="14" rx="5" ry="6"/><path d="M7.5 12h9M7.5 15.5h9"/><path d="M10 8.5C8 5 4.5 5.5 5 8s3 2 5 1.5M14 8.5c2-3.5 5.5-3 5-.5s-3 2-5 1.5"/>',
};
const ICON_NAMES = Object.keys(ICONS);
const TINTS = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6'];
const tint = name => TINTS[ICON_NAMES.indexOf(name) % TINTS.length];
const icon = (name, cls = '') => {
  const n = ICONS[name] ? name : 'cloud';
  return `<span class="av ${cls}" style="background:var(--${tint(n)})" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[n]}</svg></span>`;
};
const member = id => state.members[id] || { name: 'Someone', pfp: 'cloud' };
const av = (id, cls) => icon(member(id).pfp, cls);

// ---------- default prompts (used when the bank is empty) ----------
const DEFAULTS = [
  'What’s something you’ve completely changed your mind about in the last few years?',
  'Should you tell a friend if you don’t like the person they’re dating?',
  'Do you think people actually change, or just get better at hiding things?',
  'Is it better to be really good at one thing or decent at a lot of things?',
  'What’s an opinion you have that most people our age would disagree with?',
  'Is it rude to cancel plans last minute just because you don’t feel like going?',
  'What do you think we’ll be embarrassed about in ten years that seems normal now?',
  'Is it okay to stay friends with someone mostly out of habit?',
  'What’s something everyone says is important that you think is overrated?',
  'Would you rather be liked or respected? Why?',
  'Is social media making your friendships better or worse?',
  'What do you think makes someone a good friend, really?',
  'Is it worth going to college if you don’t know what you want to do yet?',
  'Should you always tell the truth, even when it hurts someone for no real reason?',
  'What’s a rule you were raised with that you don’t agree with anymore?',
  'Is ambition a good thing or does it make people miserable?',
  'Do you think it’s possible to be fully happy without being in a relationship?',
  'What’s something adults get wrong about people our age?',
  'Is it selfish to move far away from your family?',
  'When is it okay to give up on something?',
  'Do you think money can buy happiness? How much?',
  'What do you think is the most underrated quality in a person?',
  'Is it better to have a few close friends or a lot of casual ones?',
  'What do you think you’ll regret not doing in your twenties?',
];

// ---------- dates ----------
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const pad = n => String(n).padStart(2, '0');
const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parse = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const startOfDay = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());
function currentSlot() {
  let d = startOfDay(new Date());
  while (d.getDay() !== 1 && d.getDay() !== 4) d = addDays(d, -1);
  return d;
}
const nextSlot = d => addDays(d, d.getDay() === 1 ? 3 : 4);
const prevSlot = d => addDays(d, d.getDay() === 1 ? -4 : -3);
const slotLabel = d => `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`;
function defaultFor(d) {
  const days = Math.round((d - new Date(2026, 0, 5)) / 864e5);
  const i = Math.floor(days / 7) * 2 + (d.getDay() === 4 ? 1 : 0);
  return DEFAULTS[((i % DEFAULTS.length) + DEFAULTS.length) % DEFAULTS.length];
}
function dayName(ts) {
  const d = startOfDay(new Date(ts)), today = startOfDay(new Date());
  const diff = Math.round((today - d) / 864e5);
  return diff === 0 ? 'Today' : diff === 1 ? 'Yesterday' : DAYS[d.getDay()];
}
const timeOf = ts => new Date(ts).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase();

// ---------- helpers ----------
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const words = t => (t.trim().match(/\S+/g) || []).length;
const fmt = s => `${Math.floor(s / 60)}:${pad(s % 60)}`;
const draft = id => esc(state.drafts[id] || '');
function store(fn) { try { return fn(); } catch { return null; } }
function toast(msg) {
  const t = $('toast');
  t.textContent = msg; t.hidden = false;
  clearTimeout(toast.h); toast.h = setTimeout(() => t.hidden = true, 2000);
}

// ---------- state ----------
const state = {
  meId: store(() => localStorage.getItem(ME_KEY)),
  members: {},
  view: 'home',
  drafts: {},
  open: new Set(),
  timer: { started: false, left: WRITE_SECONDS, h: null },
  pick: ICON_NAMES[Math.floor(Math.random() * ICON_NAMES.length)],
  slot: currentSlot(),
  prompt: null,
  answers: [],
  posts: [],
  bank: [],
  past: [],
  comments: {},
  busy: false,
  loaded: false,
};
const me = () => state.members[state.meId];

let sb = null;
if (CFG.url && CFG.anonKey && window.supabase) sb = window.supabase.createClient(CFG.url, CFG.anonKey);

function must(res) { if (res.error) throw res.error; return res.data; }

async function load() {
  const slot = currentSlot();
  state.slot = slot;
  const since = prevSlot(slot);
  const [members, prompt] = await Promise.all([
    sb.from('members').select('*').order('created_at'),
    sb.rpc('issue_prompt', { p_slot: iso(slot), p_default: defaultFor(slot) }),
  ]);
  state.members = Object.fromEntries(must(members).map(m => [m.id, m]));
  state.prompt = must(prompt);
  const [answers, posts, bank, past] = await Promise.all([
    sb.from('answers').select('*').eq('slot', iso(slot)).order('created_at'),
    sb.from('posts').select('*').gte('created_at', since.toISOString()).order('created_at', { ascending: false }),
    sb.from('bank').select('*').is('used_on', null).order('created_at').order('id'),
    sb.from('prompts').select('*, answers(*)').lt('slot', iso(slot)).order('slot', { ascending: false }).limit(12),
  ]);
  state.answers = must(answers);
  state.posts = must(posts);
  state.bank = must(bank);
  state.past = must(past);
  state.past.forEach(p => p.answers.sort((a, b) => a.created_at.localeCompare(b.created_at)));

  const postIds = state.posts.map(p => p.id);
  const answerIds = [...state.answers, ...state.past.flatMap(p => p.answers)].map(a => a.id);
  const [pc, ac] = await Promise.all([
    postIds.length ? sb.from('comments').select('*').eq('kind', 'post').in('target_id', postIds).order('created_at') : { data: [] },
    answerIds.length ? sb.from('comments').select('*').eq('kind', 'answer').in('target_id', answerIds).order('created_at') : { data: [] },
  ]);
  state.comments = {};
  for (const c of [...must(pc), ...must(ac)]) (state.comments[c.kind + c.target_id] ||= []).push(c);
  state.loaded = true;
}

// ---------- views ----------
function thread(kind, id) {
  const key = kind + id;
  const list = state.comments[key] || [];
  const isOpen = state.open.has(key);
  const who = [...new Set(list.map(x => x.member_id))];
  const names = who.map(i => i === state.meId ? 'You' : member(i).name);
  const said = names.length === 1 ? names[0] : names.length === 2 ? `${names[0]} and ${names[1]}` : `${names[0]} and ${names.length - 1} others`;
  const label = isOpen ? 'Hide' : list.length
    ? `<span class="stack">${who.slice(0, 3).map(i => av(i)).join('')}</span>${esc(said)} said something`
    : 'Say something';
  return `<button class="ctoggle" data-toggle="${key}" aria-expanded="${isOpen}">${label}</button>
    ${isOpen ? `<div class="thread fade">
      ${list.map((x, i) => `<div class="bubble ${x.member_id === state.meId ? 'mine' : ''} ${i && list[i - 1].member_id === x.member_id ? 'same' : ''}"><span class="from">${esc(member(x.member_id).name)}</span><span class="msg">${esc(x.body)}</span></div>`).join('')}
      <form class="reply" data-kind="${kind}" data-target="${id}"><input type="text" id="c-${key}" placeholder="Say something" value="${draft('c-' + key)}" maxlength="500" autocomplete="off"><button aria-label="Send"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button></form>
    </div>` : ''}`;
}

function pieces(list) {
  return `<div class="pieces">${list.map(a => `
    <div class="piece">
      <div class="piece-head">${av(a.member_id, 'sm')}<span class="name">${esc(a.member_id === state.meId ? 'You' : member(a.member_id).name)}</span><span class="words">${words(a.body)} words</span></div>
      <p class="text">${esc(a.body)}</p>
      ${thread('answer', a.id)}
    </div>`).join('')}</div>`;
}

function source(by) {
  if (!by) return `<span class="src">From Porch’s default list</span>`;
  return `<span class="src">${av(by, 'sm')}From ${esc(by === state.meId ? 'you' : member(by).name)}</span>`;
}

function promptCard() {
  const pr = state.prompt, tm = state.timer, slot = state.slot;
  const next = nextSlot(slot);
  const head = `<div class="prompt-top"><span class="label">${DAYS[slot.getDay()]} prompt</span><span class="label">Next one ${DAYS[next.getDay()]}</span></div>
    <q>${esc(pr.question)}</q>${source(pr.member_id)}`;
  const total = Object.keys(state.members).length;
  const mine = state.answers.find(a => a.member_id === state.meId);
  if (mine) {
    return `<section class="prompt">${head}
      <div class="answered-row">${state.answers.length} of ${total} answered</div>${pieces(state.answers)}</section>`;
  }
  const ids = state.answers.map(a => a.member_id);
  const status = ids.length
    ? `<div class="answered-row"><span class="stack">${ids.slice(0, 6).map(i => av(i, 'sm')).join('')}</span>${ids.length} ${ids.length === 1 ? 'person has' : 'people have'} answered. Write yours to read theirs.</div>
       <div class="locked" aria-hidden="true"><div class="ghost" style="width:92%"></div><div class="ghost" style="width:70%"></div><div class="ghost" style="width:84%"></div></div>`
    : `<div class="answered-row">Nobody has answered yet. You could be first.</div>`;
  if (!tm.started) {
    return `<section class="prompt">${head}${status}
      <div class="row"><span class="hint">Take five minutes. Say what you actually think.</span><button class="btn" id="start-btn">Start writing</button></div></section>`;
  }
  const done = tm.left === 0;
  const n = words(state.drafts.answer || '');
  return `<section class="prompt">${head}
    <div class="timer-row"><span class="timer ${done ? 'done' : ''}" id="timer">${done ? 'Time' : fmt(tm.left)}</span><span class="hint" id="timer-hint">${done ? 'Finish your thought, then share.' : 'No wrong answers. Just yours.'}</span></div>
    <div class="tbar"><i id="tbar" style="width:${tm.left / WRITE_SECONDS * 100}%"></i></div>
    <textarea class="write" id="answer" placeholder="What do you think?" maxlength="5000">${draft('answer')}</textarea>
    <div class="row"><span class="count" id="answer-count">${n} word${n === 1 ? '' : 's'}</span><button class="btn" id="answer-btn" ${n ? '' : 'disabled'}>Share answer</button></div>
  </section>`;
}

function home() {
  let lastDay = null;
  const feed = state.posts.map(p => {
    const day = dayName(p.created_at);
    const dayHead = day !== lastDay ? `<div class="day label">${day}</div>` : '';
    lastDay = day;
    return `${dayHead}<article class="post">${av(p.member_id)}<div class="post-body">
      <div class="meta"><span class="name">${esc(p.member_id === state.meId ? 'You' : member(p.member_id).name)}</span><span class="time">${timeOf(p.created_at)}</span></div>
      <p>${esc(p.body)}</p>${thread('post', p.id)}
    </div></article>`;
  }).join('');
  const since = DAYS[prevSlot(state.slot).getDay()];
  return `${promptCard()}
    <section class="composer">
      <textarea id="post" placeholder="What's on your mind?" maxlength="280">${draft('post')}</textarea>
      <div class="row"><span class="count" id="post-count">${(state.drafts.post || '').length} / 280</span><button class="btn" id="post-btn" ${(state.drafts.post || '').trim() ? '' : 'disabled'}>Post</button></div>
    </section>
    <section class="feed" aria-label="Feed">
      ${feed || `<div class="empty">No posts since ${since} yet.</div>`}
      <div class="end"><div class="dot"></div><strong>You're all caught up</strong><span>That's everything since ${since}. Go outside for a bit.</span></div>
    </section>`;
}

function prompts() {
  let d = state.slot;
  const rows = state.bank.map(b => {
    d = nextSlot(d);
    const mine = b.member_id === state.meId;
    return `<li><div class="qwhen">${slotLabel(d)}</div>
      <div class="qbody"><div class="qtext">${esc(b.question)}</div><div class="src">${av(b.member_id, 'sm')}${mine ? 'You added this' : esc(member(b.member_id).name)}${mine ? ` · <button class="link" data-remove="${b.id}">Remove</button>` : ''}</div></div></li>`;
  }).join('');
  const past = state.past.map(p => `
    <details ${state.open.has('past-' + p.slot) ? 'open' : ''} data-past="${p.slot}"><summary><span class="label">${slotLabel(parse(p.slot))} · ${p.answers.length} answered · ${p.member_id ? 'from ' + esc(member(p.member_id).name) : 'default'}</span><span class="pq">${esc(p.question)}</span></summary>${p.answers.length ? pieces(p.answers) : '<div class="empty">Nobody answered this one.</div>'}</details>`).join('');
  return `<section class="bank">
      <div class="row"><span class="label">Prompt bank</span><span class="count">${state.bank.length} waiting</span></div>
      <p class="hint" style="margin:0">Anyone can add a question. They go out in order, every Monday and Thursday. When the bank is empty, Porch picks one from its default list.</p>
      <ol class="queue">${rows}
        <li class="fallback"><div class="qwhen">${state.bank.length ? 'After that' : slotLabel(nextSlot(state.slot))}</div><div class="qbody"><div class="qtext">A prompt from Porch’s default list</div></div></li>
      </ol>
      <form class="add" id="add-form">
        <textarea id="newq" placeholder="What do you want to hear everyone's take on?" maxlength="200">${draft('newq')}</textarea>
        <div class="row"><span class="hint">Good prompts ask for an opinion, not a fun fact.</span><button class="btn" id="add-btn" ${(state.drafts.newq || '').trim() ? '' : 'disabled'}>Add to bank</button></div>
      </form>
    </section>
    ${past ? `<section class="past"><div class="label" style="padding-bottom:12px">Past prompts</div>${past}</section>` : ''}`;
}

function join() {
  return `<section class="join">
    <h1>Pull up a chair.</h1>
    <p>Porch is a small place for your friends. Pick a name and a picture so people know it's you.</p>
    <div class="field"><label class="label" for="name">Your name</label>
      <input type="text" id="name" maxlength="30" placeholder="What your friends call you" value="${draft('name')}" autocomplete="nickname"></div>
    <div class="field"><div class="row"><span class="label">Your picture</span><button class="link" id="shuffle-btn">Surprise me</button></div>
      <div class="picks">${ICON_NAMES.map(n => `<button class="pick" data-pick="${n}" aria-pressed="${n === state.pick}" aria-label="${n}">${icon(n, 'lg')}</button>`).join('')}</div></div>
    <div class="row"><span class="chosen">${icon(state.pick)}<span>${esc((state.drafts.name || '').trim() || 'You')}</span></span><button class="btn" id="join-btn" ${(state.drafts.name || '').trim() ? '' : 'disabled'}>Join Porch</button></div>
  </section>`;
}

function setup() {
  return `<section class="notice"><strong>Almost ready</strong><p>Porch isn't connected to its database yet. Add the Supabase URL and anon key to config.js.</p></section>`;
}

const views = { home, prompts };
function render() {
  const header = $('header');
  let html;
  if (!sb) { header.hidden = true; html = setup(); }
  else if (!state.loaded) { header.hidden = true; html = `<div class="hint">Loading…</div>`; }
  else if (!me()) { header.hidden = true; html = join(); }
  else {
    header.hidden = false;
    const ids = Object.keys(state.members);
    $('people').innerHTML = `<span class="stack">${ids.slice(0, 5).map(i => av(i, 'sm')).join('')}</span>${ids.length} here`;
    $('people').title = ids.map(i => member(i).name).join(', ');
    document.querySelectorAll('nav button').forEach(b => b.setAttribute('aria-selected', b.dataset.view === state.view));
    html = views[state.view]();
  }
  $('view').innerHTML = `<div class="col">${html}</div>`;
}

// ---------- actions ----------
async function act(fn, ok) {
  if (state.busy) return;
  state.busy = true;
  try { await fn(); await load(); render(); if (ok) toast(ok); }
  catch (err) { console.error(err); toast('That didn’t go through. Check your connection and try again.'); }
  finally { state.busy = false; }
}

function tick() {
  const tm = state.timer;
  tm.left = Math.max(0, tm.left - 1);
  const el = $('timer');
  if (el) {
    el.textContent = tm.left ? fmt(tm.left) : 'Time';
    $('tbar').style.width = (tm.left / WRITE_SECONDS * 100) + '%';
    if (!tm.left) { el.classList.add('done'); $('timer-hint').textContent = 'Finish your thought, then share.'; }
  }
  if (!tm.left) clearInterval(tm.h);
}

document.addEventListener('click', e => {
  const tab = e.target.closest('nav button');
  if (tab) { state.view = tab.dataset.view; render(); return; }
  const tog = e.target.closest('[data-toggle]');
  if (tog) {
    const k = tog.dataset.toggle;
    state.open.has(k) ? state.open.delete(k) : state.open.add(k);
    render(); $('c-' + k)?.focus(); return;
  }
  const pick = e.target.closest('[data-pick]');
  if (pick) { state.pick = pick.dataset.pick; render(); return; }
  if (e.target.id === 'shuffle-btn') {
    const others = ICON_NAMES.filter(n => n !== state.pick);
    state.pick = others[Math.floor(Math.random() * others.length)]; render(); return;
  }
  if (e.target.id === 'join-btn') {
    const name = (state.drafts.name || '').trim(); if (!name) return;
    act(async () => {
      const m = must(await sb.from('members').insert({ name, pfp: state.pick }).select().single());
      state.meId = m.id;
      store(() => localStorage.setItem(ME_KEY, m.id));
      delete state.drafts.name;
    }, `Welcome, ${name}`);
    return;
  }
  if (e.target.id === 'start-btn') {
    state.timer.started = true; state.timer.h = setInterval(tick, 1000);
    render(); $('answer').focus(); return;
  }
  if (e.target.id === 'answer-btn') {
    const body = (state.drafts.answer || '').trim(); if (!body) return;
    act(async () => {
      must(await sb.from('answers').insert({ slot: iso(state.slot), member_id: state.meId, body }));
      clearInterval(state.timer.h); delete state.drafts.answer;
    }, 'Answer shared');
    return;
  }
  if (e.target.id === 'post-btn') {
    const body = (state.drafts.post || '').trim(); if (!body) return;
    act(async () => {
      must(await sb.from('posts').insert({ member_id: state.meId, body }));
      delete state.drafts.post;
    }, 'Posted');
    return;
  }
  const rm = e.target.closest('[data-remove]');
  if (rm) {
    act(async () => { must(await sb.from('bank').delete().eq('id', rm.dataset.remove)); }, 'Removed from the bank');
  }
});

document.addEventListener('submit', e => {
  e.preventDefault();
  if (e.target.id === 'add-form') {
    const question = (state.drafts.newq || '').trim(); if (!question) return;
    act(async () => {
      must(await sb.from('bank').insert({ member_id: state.meId, question }));
      delete state.drafts.newq;
    }, 'Added to the prompt bank');
    return;
  }
  const { kind, target } = e.target.dataset;
  if (!kind) return;
  const key = 'c-' + kind + target;
  const body = (state.drafts[key] || '').trim(); if (!body) return;
  act(async () => {
    must(await sb.from('comments').insert({ kind, target_id: Number(target), member_id: state.meId, body }));
    delete state.drafts[key];
  }).then(() => $(key)?.focus());
});

document.addEventListener('toggle', e => {
  const d = e.target.closest && e.target.closest('[data-past]');
  if (d) d.open ? state.open.add('past-' + d.dataset.past) : state.open.delete('past-' + d.dataset.past);
}, true);

document.addEventListener('input', e => {
  const id = e.target.id; if (!id) return;
  state.drafts[id] = e.target.value;
  const has = !!e.target.value.trim();
  if (id === 'answer') {
    const n = words(e.target.value);
    $('answer-count').textContent = `${n} word${n === 1 ? '' : 's'}`;
    $('answer-btn').disabled = !n;
  }
  if (id === 'post') { $('post-count').textContent = `${e.target.value.length} / 280`; $('post-btn').disabled = !has; }
  if (id === 'newq') $('add-btn').disabled = !has;
  if (id === 'name') {
    $('join-btn').disabled = !has;
    document.querySelector('.chosen span:last-child').textContent = e.target.value.trim() || 'You';
  }
});

// Refresh quietly every 30 seconds, but never while someone is typing.
async function refresh() {
  if (!sb || state.busy || document.visibilityState !== 'visible') return;
  const a = document.activeElement;
  if (a && (a.tagName === 'TEXTAREA' || a.tagName === 'INPUT')) return;
  try { await load(); render(); } catch (err) { console.error(err); }
}
setInterval(refresh, 30000);
document.addEventListener('visibilitychange', refresh);

render();
if (sb) load().then(render).catch(err => {
  console.error(err);
  $('view').innerHTML = `<section class="notice"><strong>Couldn’t load Porch</strong><p>Check your connection and refresh the page.</p></section>`;
});
