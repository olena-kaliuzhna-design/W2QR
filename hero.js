/* W2QR home — animated hero.
   Four flows (tabs), four steps each. Copy is taken verbatim from the
   animations on w2qr.com (w2qr-anim-1…4). Auto-plays; tabs, steps and
   ?how= in the URL switch the flow. Respects prefers-reduced-motion. */

(function () {
  const { icon } = window.W2QR;
  const STEP_MS = 2800;

  /* decorative QR-like pattern (not a real QR) */
  function qr(seed = 7, fill = '#0f0f1a') {
    const N = 25; let s = seed;
    const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
    const M = [...Array(N)].map(() => Array(N).fill(0));
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) M[y][x] = rnd() > 0.52 ? 1 : 0;
    const finder = (ox, oy) => { for (let y = -1; y < 8; y++) for (let x = -1; x < 8; x++) { const X = ox + x, Y = oy + y; if (X < 0 || Y < 0 || X >= N || Y >= N) continue; M[Y][X] = x >= 0 && x < 7 && y >= 0 && y < 7 && (x === 0 || x === 6 || y === 0 || y === 6 || (x >= 2 && x <= 4 && y >= 2 && y <= 4)) ? 1 : 0; } };
    finder(0, 0); finder(N - 7, 0); finder(0, N - 7);
    let d = ''; for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (M[y][x]) d += `M${x} ${y}h1v1h-1z`;
    return `<svg class="qr" viewBox="0 0 ${N} ${N}" shape-rendering="crispEdges" aria-hidden="true"><path d="${d}" fill="${fill}"/></svg>`;
  }

  const WORDS = ['robot', 'diary', 'tumble', 'oxygen', 'velvet', 'harbor', 'canyon', 'spider', 'ritual', 'tank', 'action', 'marble'];
  const status = '<div class="phone__island"></div><div class="phone__status"><span>9:41</span><span>•ıl ◔ ▭</span></div>';
  const kbd = `<div class="kbd">${['qwertyuiop', 'asdfghjkl', 'zxcvbnm'].map(r => `<div>${r.split('').map(c => `<span>${c}</span>`).join('')}</div>`).join('')}<div><span class="wide">space</span></div></div>`;

  /* ---------- phone screens ---------- */
  const S = {
    lock: () => `<div class="screen scr-lock"><div class="date">Wednesday, 4 November</div><div class="time">9:41</div>
      <div class="dock"><i>${icon('bulb')}</i><i>${icon('camera')}</i></div></div>`,
    cam: (seed, label = 'Scan with any camera') => `<div class="screen scr-cam"><div class="hint">${label}</div>
      <div class="vf"><div class="qrbox">${qr(seed)}</div><div class="scanline"></div></div>
      <div class="url-pill">${icon('globe')}w2qr.com</div>
      <div class="cam-modes"><span>VIDEO</span><b>PHOTO</b><span>PORTRAIT</span></div><div class="shutter"></div></div>`,
    unlock: (title, pwdMode) => `<div class="screen scr-web">
      <div class="web-url">${icon('lock')}w2qr.com</div>
      <div class="web-brand">${icon('logo')}W2QR</div>
      <div class="w-row"><span class="mini-qr">${qr(3)}</span><div><b>${title}</b><small>From your camera</small></div><span class="ok">${icon('check')}</span></div>
      <div class="w-label">Password</div>
      ${pwdMode === 'scan'
        ? `<div class="seg-mini"><span>Type</span><span class="on">Scan QR</span></div>
           <div class="w-row"><span class="mini-qr">${qr(29)}</span><div><b>Password QR</b><small>No typing: it unlocks the wallet locally</small></div><span class="ok">${icon('check')}</span></div>`
        : `<div class="w-input">••••••••••<span style="opacity:.7">${icon('lock')}</span></div>`}
      <div class="w-hint">${icon('shieldcheck')}Decrypted locally, never uploaded</div>
      <div class="w-btn">Unlock</div>
      ${pwdMode === 'scan' ? '' : kbd}</div>`,
    wallet: () => `<div class="screen wallet-screen">
      <div class="acct"><i></i><div><b>Account 1</b><small>0x7a3F…c91E</small></div></div>
      <div class="bal"><small>Total balance</small><strong>$12,480.36</strong><em>$291.40 (2.4%) today</em></div>
      <div class="acts"><span>Send</span><span>Receive</span><span>Swap</span><span>Scan</span></div>
      <div class="assets-h">Assets <small>4 networks</small></div>
      ${[['Ethereum', '2.4815 ETH', '$8,214.20', '+3.1%', '#8a92ff'], ['Bitcoin', '0.04120 BTC', '$2,780.11', '+1.2%', '#f7931a'], ['Tether', '1,250.00 USDT', '$1,250.00', '0.0%', '#26a17b'], ['Solana', '1.5810 SOL', '$236.05', '−0.8%', '#14f195']]
        .map(([n, a, v, c, col]) => `<div class="asset"><i style="background:${col}"></i><div><b>${n}</b><small>${a}</small></div><div class="r"><b>${v}</b><small class="${c.startsWith('−') ? 'down' : 'up'}">${c}</small></div></div>`).join('')}</div>`,
    webHome: () => `<div class="screen scr-web">
      <div class="web-url">${icon('lock')}w2qr.com</div>
      <div class="web-brand">${icon('logo')}W2QR</div>
      <div style="font-size:1.7em;line-height:1.1;letter-spacing:-.03em;margin-top:.4em">Your wallet,<br>sealed in a QR</div>
      <div style="font-size:.85em;color:#9a99b8">Encrypted in your browser.<br>Unlocked only by your password.</div>
      <div style="margin-top:auto;display:grid;gap:.5em"><div class="w-btn ghost">Open Wallet</div><div class="w-btn white">Create encrypted QR</div><div class="w-btn ghost">Password generator</div></div></div>`,
    seed: () => `<div class="screen scr-web">
      <div class="web-url">${icon('lock')}w2qr.com</div>
      <div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:1.1em">Enter your seed phrase</b><small style="color:#9a99b8">1 / 2</small></div>
      <div class="seg-mini"><span class="on">12 words</span><span>24 words</span></div>
      <div class="word-grid">${WORDS.map((w, i) => `<span><i>${i + 1}</i>${w}</span>`).join('')}</div>
      <div class="w-hint">${icon('check')}Valid BIP-39 seed phrase</div>
      <div class="w-btn" style="margin-top:auto">Continue</div>
      <div class="tiny-note">Encrypted locally · never uploaded</div></div>`,
    setPwd: () => `<div class="screen scr-web">
      <div class="web-url">${icon('lock')}w2qr.com</div>
      <div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:1.1em">Set a password</b><small style="color:#9a99b8">2 / 2</small></div>
      <div style="font-size:.8em;color:#9a99b8">Your seed is encrypted in this browser</div>
      <div class="w-label">Password</div><div class="w-input">••••••••••••</div>
      <div class="meter"><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i></div>
      <div class="w-hint">Strength · <b style="color:var(--ok)">Very strong</b></div>
      <div class="w-label">Confirm password</div><div class="w-input plain">••••••••••••</div>
      <div class="w-btn" style="margin-top:auto">Encrypt &amp; create QR</div></div>`,
    ready: () => `<div class="screen scr-web" style="text-align:center">
      <div class="web-url">${icon('lock')}w2qr.com</div>
      <b style="font-size:1.2em;margin-top:.4em">Your encrypted QR is ready</b>
      <small style="color:#9a99b8">12-word seed · password protected</small>
      <div class="big-qr">${qr(11)}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5em;margin-top:auto"><div class="w-btn white">Download</div><div class="w-btn ghost">Print</div></div>
      <div class="tiny-note">Store it apart from your password</div></div>`,
    gen1: () => `<div class="screen scr-web">
      <b style="font-size:1.15em">Strong Password Generator</b>
      <div style="font-size:.78em;color:#9a99b8">Processed only on this device and never sent to W2QR.</div>
      <div class="w-label">Secret Phrase</div>
      <div class="w-input plain">Enter your memorable secret phrase…</div>
      <div style="display:flex;gap:.5em"><div class="w-btn ghost" style="flex:1">Show</div><div class="w-btn ghost" style="flex:1">Paste</div></div>
      <div class="w-label">Estimated phrase resistance</div>
      <div class="meter"><i class="on"></i><i class="on"></i><i class="on"></i><i></i></div>
      <div class="meter-labels"><span>WEAK</span><span>FAIR</span><span>STRONG</span><span>VERY STRONG</span></div>
      ${kbd}</div>`,
    gen2: () => `<div class="screen scr-web">
      <b style="font-size:1.15em">Strong Password Generator</b>
      <div class="w-label">Password Length</div>
      <div class="seg-mini"><span>16</span><span>20</span><span class="on">24</span><span>32</span></div>
      <div class="w-btn">Generate Strong Password</div>
      <div class="w-hint">${icon('check')}Password generated successfully · 189 ms</div>
      <div class="w-input plain" style="font-family:var(--mono);font-size:.82em;color:#fff">pO#$nC-1?!4EakoKm5b!OAYG</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:.35em;font-size:.8em">${['Hide', 'Copy', 'Regenerate', 'Clear'].map(t => `<div class="w-btn ghost" style="padding:.6em 0">${t}</div>`).join('')}</div>
      <div class="w-label">Important</div>
      <div style="font-size:.75em;color:#9a99b8">Use a long, unpredictable phrase. A predictable phrase can still be guessed.</div></div>`,
    gen3: () => `<div class="screen scr-web">
      <b style="font-size:1.15em">Estimated Attack Resistance</b>
      <div class="res-grid"><div><span>Search space</span><b>10^47.5</b></div><div><span>Powerful PC/GPU</span><b>&gt;10^36 years</b></div><div><span>Quantum computer</span><b>~10–30M years</b></div></div>
      <div style="font-size:.66em;color:var(--warn);letter-spacing:.06em">THEORETICAL: no such quantum computer exists</div>
      <div class="w-label">How is this calculated?</div>
      <div style="font-size:.75em;color:#9a99b8;line-height:1.5">8× high-end GPUs, optimized Argon2id<br>~160 guesses per second<br>Average search: half the space</div>
      <div class="tiny-note" style="margin-top:auto">Argon2id 64MB, 3 iterations · 24 chars</div></div>`,
    gen4: () => `<div class="screen scr-web" style="text-align:center">
      <b style="font-size:1.15em">Create QR</b>
      <small style="color:#9a99b8">Password QR</small>
      <div class="big-qr">${qr(29)}</div>
      <div style="font-size:.85em;color:#cfcde6">Lost it? The same phrase restores the same password</div>
      <div class="w-btn white" style="margin-top:auto">Download</div></div>`
  };

  /* ---------- centre visuals ---------- */
  const qrCard = (head, tag, foot, seed, cls = '') => `<div class="qr-card ${cls}"><div class="qr-card__head"><span>W2QR</span><small>${tag}</small></div>${qr(seed)}<div class="qr-card__foot">${foot}</div></div>`;
  const V = {
    open: () => `<div><div class="glow-dot"></div><div class="v-label" style="margin-bottom:10px">your encrypted QR</div>
      ${qrCard('W2QR', 'ENCRYPTED BACKUP', 'Scan with any camera · password required', 7)}
      <div class="v-caption"><b>Safe to print, store and back up</b><span>Useless to anyone without your password</span></div></div>`,
    two: () => `<div><div class="glow-dot"></div><div class="qr-pair">
      <div>${qrCard('W2QR', 'ENCRYPTED SEED', 'Scan with any camera', 7)}<div class="v-tag">seed QR</div></div>
      <div>${qrCard('W2QR', 'PASSWORD QR', 'Scan with any camera', 29, 'qr-card--pwd')}<div class="v-tag">password QR</div></div></div>
      <div class="v-caption" style="margin-top:26px"><b>Store the two QRs in different places</b><span>Neither one can open the wallet alone</span></div></div>`,
    seed: () => `<div style="display:grid;justify-items:center"><div class="seed-card"><div class="seed-card__head"><span>Seed phrase · 12 words</span><span class="risk">plain text = risk</span></div>
      <div class="seed-grid">${WORDS.map((w, i) => (i > 3 && i < 9) ? `<span class="mask"><i>${i + 1}</i>•••••</span>` : `<span><i>${i + 1}</i>${w}</span>`).join('')}</div></div>
      <div class="flow-arrow">${icon('arrow')}<span>ENCRYPTED</span></div>
      <div style="position:relative"><div class="glow-dot"></div>${qrCard('W2QR', 'ENCRYPTED BACKUP', 'Useless without the password', 11).replace('qr-card', 'qr-card qr-card--sm')}</div></div>`,
    pwd: () => `<div style="display:grid;justify-items:center;gap:4px"><div class="phrase-card"><small>Secret Phrase</small>A sentence about your own life</div>
      <div class="flow-arrow">${icon('arrow')}<span>ARGON2ID</span></div>
      <div class="pwd-pill">${icon('lock')}pO#$nC-1?!4EakoKm5b!OAYG</div>
      <div class="flow-arrow">${icon('arrow')}<span>PASSWORD QR</span></div>
      <div style="position:relative"><div class="glow-dot"></div>${qrCard('W2QR', 'PASSWORD QR', 'Password QR', 29, 'qr-card--pwd').replace('qr-card qr-card--pwd', 'qr-card qr-card--pwd qr-card--sm')}</div></div>`
  };

  const devices = `<div class="devices"><div class="devices__label">SAME QR · ANY DEVICE</div>
    ${[['phone', 'Phone', 'iOS · Android'], ['card', 'Tablet', 'iPad · Android'], ['globe', 'Desktop', 'Any browser']].map(([i, b, s]) => `<div class="device">${icon(i)}<div><b>${b}</b><span>${s}</span></div></div>`).join('')}</div>`;
  const note = (t) => `<div class="local-note">${icon('shieldcheck')}<span>${t}</span></div>`;

  /* ---------- flows (verbatim copy from w2qr.com animations) ---------- */
  const FLOWS = [
    { id: 'open-password', tab: 'QR + password', group: 'open', tabIcon: 'lock',
      eyebrow: 'OPEN WALLET · QR + PASSWORD', title: 'Seal your wallet in a QR.<br>Open it on <em>any device.</em>',
      sub: 'Encrypted offline in your browser. Only your password unlocks it.',
      steps: [['Open your camera', 'No app needed, any phone camera works'], ['Scan your QR', 'Your encrypted QR opens w2qr.com instantly'], ['Enter your password', 'Decryption happens locally, on your device'], ['Your wallet is loaded and unlocked', 'Assets and balances appear instantly']],
      screens: [S.lock(), S.cam(7), S.unlock('Encrypted QR'), S.wallet()], visual: V.open(), side: devices,
      cta: ['Open Wallet', 'restore.html'] },
    { id: 'open-two-qrs', tab: 'Two QRs', group: 'open', tabIcon: 'twoqr',
      eyebrow: 'OPEN WALLET · TWO QRS', title: 'Seed QR + password QR.<br>Unlocked in <em>two scans.</em>',
      sub: 'No typing. Keep the two QRs apart: neither opens the wallet alone.',
      steps: [['Open your camera', 'No app needed, any phone camera works'], ['Scan your seed QR', 'It opens w2qr.com with your encrypted wallet'], ['Scan your password QR', 'No typing: it unlocks the wallet locally'], ['Your wallet is loaded and unlocked', 'Assets and balances appear instantly']],
      screens: [S.lock(), S.cam(7), S.unlock('Encrypted seed QR', 'scan'), S.wallet()], visual: V.two(), side: devices,
      cta: ['Open Wallet', 'restore.html'] },
    { id: 'create-seed', tab: 'Seed QR', group: 'create', tabIcon: 'plus',
      eyebrow: 'CREATE · ENCRYPTED SEED QR', title: 'Turn your seed phrase<br>into an <em>encrypted QR.</em>',
      sub: 'Encrypted offline in your browser. Your seed is never uploaded.',
      steps: [['Open w2qr.com', 'Tap Create encrypted QR'], ['Enter your seed phrase', '12 or 24 words, checked as you type'], ['Set a strong password', 'Your seed is encrypted locally, in the browser'], ['Your encrypted QR is ready', 'Print it or save it: useless without the password']],
      screens: [S.webHome(), S.seed(), S.setPwd(), S.ready()], visual: V.seed(), side: note('Encrypted locally · never uploaded'),
      cta: ['Create Encrypted Wallet', 'create.html'] },
    { id: 'create-password', tab: 'Strong password', group: 'create', tabIcon: 'pwd',
      eyebrow: 'CREATE · STRONG PASSWORD', title: 'Remember a phrase,<br>get a <em>strong password.</em>',
      sub: 'Your phrase is the key: the same phrase always restores the same password.',
      steps: [["Write a phrase you'll never forget", 'A sentence about your own life'], ['Generate a strong password', 'Argon2id hashes it into 24 strong characters'], ['Check its attack resistance', 'Search space and estimated time to crack'], ['Create the password QR', 'Lost it? The same phrase restores the same password']],
      screens: [S.gen1(), S.gen2(), S.gen3(), S.gen4()], visual: V.pwd(), side: note('Processed only on this device and never sent to W2QR.'),
      cta: ['Strong Password Generator', 'strong-password.html'] }
  ];

  /* ---------- render ---------- */
  const $ = (s) => document.querySelector(s);
  const tabsEl = $('#flow-tabs'), storyEl = $('#story'), visualEl = $('#visual'), screenEl = $('#phone-screen'), sideEl = $('#side'), ctaEl = $('#hero-cta'), stage = $('#stage');

  const tabBtn = (f) => `<button class="flow-tab" role="tab" id="tab-${f.id}" aria-controls="stage" aria-selected="false" data-flow="${f.id}">${icon(f.tabIcon)}${f.tab}</button>`;
  tabsEl.innerHTML = `<span class="flow-tabs__group">OPEN A WALLET</span>${FLOWS.filter(f => f.group === 'open').map(tabBtn).join('')}
    <span class="flow-tabs__sep" aria-hidden="true"></span><span class="flow-tabs__group">CREATE</span>${FLOWS.filter(f => f.group === 'create').map(tabBtn).join('')}`;
  visualEl.innerHTML = FLOWS.map(f => `<div class="visual" data-flow="${f.id}">${f.visual}</div>`).join('');
  screenEl.innerHTML = status + FLOWS.map(f => f.screens.map((s, i) => s.replace('class="screen', `data-flow="${f.id}" data-step="${i}" class="screen`)).join('')).join('');

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let flowIdx = 0, step = 0, timer = null, paused = false;
  stage.style.setProperty('--step-ms', STEP_MS + 'ms');

  function renderStory(f) {
    storyEl.innerHTML = `<div class="story__eyebrow">${f.eyebrow}</div><h2 class="story__title">${f.title}</h2><p class="story__sub">${f.sub}</p>
      <ol class="steps">${f.steps.map(([t, d], i) => `<li class="step" data-i="${i}"><span class="step__n">${i + 1}</span><div><div class="step__t">${t}</div><div class="step__d">${d}</div></div><span class="step__bar"></span></li>`).join('')}</ol>`;
    storyEl.querySelectorAll('.step').forEach(li => li.addEventListener('click', () => { go(+li.dataset.i); }));
  }
  function show() {
    const f = FLOWS[flowIdx];
    storyEl.querySelectorAll('.step').forEach((li, i) => { li.classList.toggle('is-active', i === step); li.classList.toggle('is-done', i < step); });
    // restart bar animation
    const bar = storyEl.querySelector('.step.is-active .step__bar'); if (bar) { bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = ''; }
    screenEl.querySelectorAll('.screen').forEach(s => s.classList.toggle('is-on', s.dataset.flow === f.id && +s.dataset.step === step));
  }
  function schedule() { clearTimeout(timer); if (reduce || paused) return; timer = setTimeout(() => go((step + 1) % 4), step === 3 ? STEP_MS + 900 : STEP_MS); }
  function go(i) { step = i; show(); schedule(); }
  function setFlow(i, push) {
    flowIdx = i; step = 0; const f = FLOWS[i];
    tabsEl.querySelectorAll('.flow-tab').forEach(b => b.setAttribute('aria-selected', String(b.dataset.flow === f.id)));
    visualEl.querySelectorAll('.visual').forEach(v => v.classList.toggle('is-on', v.dataset.flow === f.id));
    sideEl.innerHTML = f.side;
    ctaEl.innerHTML = `<a class="btn btn--white" href="${f.cta[1]}">${f.cta[0]}${icon('arrow')}</a>`;
    renderStory(f);
    if (reduce) step = 3;
    show(); schedule();
    if (push) { const u = new URL(location.href); u.searchParams.set('how', f.id); history.replaceState(null, '', u); }
  }
  tabsEl.addEventListener('click', e => { const b = e.target.closest('.flow-tab'); if (b) setFlow(FLOWS.findIndex(f => f.id === b.dataset.flow), true); });
  tabsEl.addEventListener('keydown', e => {
    if (!['ArrowRight', 'ArrowLeft'].includes(e.key)) return;
    const n = (flowIdx + (e.key === 'ArrowRight' ? 1 : 3)) % 4; setFlow(n, true); document.getElementById('tab-' + FLOWS[n].id).focus();
  });
  stage.addEventListener('mouseenter', () => { paused = true; stage.classList.add('is-paused'); clearTimeout(timer); });
  stage.addEventListener('mouseleave', () => { paused = false; stage.classList.remove('is-paused'); schedule(); });

  // scale the centre visual to the stage height
  const fit = () => stage.style.setProperty('--s', Math.min(1, stage.clientHeight / 430).toFixed(3));
  if ('ResizeObserver' in window) new ResizeObserver(fit).observe(stage); fit();

  const start = Math.max(0, FLOWS.findIndex(f => f.id === new URLSearchParams(location.search).get('how')));
  setFlow(start, false);
})();
