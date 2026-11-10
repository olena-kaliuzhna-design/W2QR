/* Page-specific interactions (design prototype — no real cryptography). */
(function () {
  const page = document.body.dataset.page;
  const $ = (s, r = document) => r.querySelector(s);

  function qr(seed = 7, fill = '#0f0f1a') {
    const N = 25; let s = seed; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
    const M = [...Array(N)].map(() => Array(N).fill(0));
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) M[y][x] = rnd() > 0.52 ? 1 : 0;
    const f = (ox, oy) => { for (let y = -1; y < 8; y++) for (let x = -1; x < 8; x++) { const X = ox + x, Y = oy + y; if (X < 0 || Y < 0 || X >= N || Y >= N) continue; M[Y][X] = x >= 0 && x < 7 && y >= 0 && y < 7 && (x === 0 || x === 6 || y === 0 || y === 6 || (x >= 2 && x <= 4 && y >= 2 && y <= 4)) ? 1 : 0; } };
    f(0, 0); f(N - 7, 0); f(0, N - 7);
    let d = ''; for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (M[y][x]) d += `M${x} ${y}h1v1h-1z`;
    return `<svg viewBox="0 0 ${N} ${N}" shape-rendering="crispEdges" aria-hidden="true"><path d="${d}" fill="${fill}"/></svg>`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (page === 'bridge') {
      $('#bridge-qr').innerHTML = qr(41);
      let t = 119; const el = $('#bridge-timer');
      setInterval(() => { t = t > 0 ? t - 1 : 119; el.textContent = `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`; }, 1000);
    }

    if (page === 'upload') {
      const dz = $('#dropzone');
      ['dragenter', 'dragover'].forEach(e => dz.addEventListener(e, ev => { ev.preventDefault(); dz.classList.add('is-over'); }));
      ['dragleave', 'drop'].forEach(e => dz.addEventListener(e, ev => { ev.preventDefault(); dz.classList.remove('is-over'); }));
    }

    if (page === 'drive') {
      $('#drive-btn').addEventListener('click', () => { $('#drive-err').hidden = false; });
    }

    if (page === 'create') {
      const steps = [...document.querySelectorAll('.wiz')], lis = [...document.querySelectorAll('#stepper li')];
      let cur = 1;
      const show = (n) => {
        cur = n; steps.forEach(s => (s.hidden = +s.dataset.step !== n));
        lis.forEach((li, i) => { li.toggleAttribute('aria-current', i + 1 === n); if (i + 1 === n) li.setAttribute('aria-current', 'step'); li.classList.toggle('done', i + 1 < n); });
        if (n === 3) $('#result-qr').innerHTML = qr(11);
      };
      document.querySelectorAll('[data-next]').forEach(b => b.addEventListener('click', () => show(Math.min(3, cur + 1))));
      document.querySelectorAll('[data-prev]').forEach(b => b.addEventListener('click', () => show(Math.max(1, cur - 1))));
      const seed = $('#seed'), count = $('#seed-count');
      const upd = () => { const n = seed.value.trim() ? seed.value.trim().split(/\s+/).length : 0; count.textContent = `${n} word${n === 1 ? '' : 's'}${n === 12 || n === 24 ? ' — valid' : ''}`; count.classList.toggle('helper--ok', n === 12 || n === 24); };
      seed.addEventListener('input', upd);
      // Demo only: fills sample words from the W2QR animation. NOT a secure random seed.
      $('#gen-random').addEventListener('click', () => { seed.value = 'robot diary tumble oxygen velvet harbor canyon spider ritual tank action marble'; upd(); });
      $('#words-seg').addEventListener('change', e => { seed.placeholder = `Enter your ${e.detail}-word BIP-39 mnemonic or generate one below...`; });
    }

    if (page === 'strong') {
      const out = $('#gen-out'), box = $('#pw-box'); const SAMPLE = 'pO#$nC-1?!4EakoKm5b!OAYG'; let shown = false;
      $('#gen-pw').addEventListener('click', () => { out.hidden = false; shown = false; box.textContent = '•'.repeat(24); $('#pw-show').textContent = 'Show'; });
      $('#pw-show').addEventListener('click', () => { shown = !shown; box.textContent = shown ? SAMPLE : '•'.repeat(24); $('#pw-show').textContent = shown ? 'Hide' : 'Show'; });
      $('#pw-clear').addEventListener('click', () => { out.hidden = true; });
    }

    if (page === 'check') {
      const inp = $('#chk'), m = $('#meter');
      inp.addEventListener('input', () => {
        const v = inp.value; let sc = 0;
        if (v.length >= 8) sc++; if (v.length >= 14) sc++; if (/[^A-Za-z0-9]/.test(v) && /\d/.test(v)) sc++; if (v.length >= 20 || v.split(/\s+/).length >= 5) sc++;
        if (/^(123456|qwerty|password)/i.test(v)) sc = Math.min(sc, 1);
        m.className = 'meter-lg lvl-' + sc; [...m.children].forEach((i, k) => i.classList.toggle('on', k < sc));
      });
    }

    if (page === 'recover') {
      const ins = [...document.querySelectorAll('#words input')];
      const upd = () => { const blank = ins.filter(i => !i.value.trim()).length; $('#blank-n').textContent = blank; $('#blank-s').textContent = blank === 1 ? '' : 's'; };
      ins.forEach(i => i.addEventListener('input', upd));
    }

    if (page === 'card') {
      $('#card-qr').innerHTML = qr(11);
      $('#side-seg').addEventListener('change', e => $('#w2card').classList.toggle('is-back', e.detail === 'back'));
      const nick = $('#nick'), code = $('#wcode');
      nick.addEventListener('input', () => { $('#card-name').textContent = (nick.value || 'ALEX WALLET').toUpperCase(); $('#nick-count').textContent = `${nick.value.length}/20`; });
      code.addEventListener('input', () => { $('#card-code').textContent = code.value || 'W2QR-01'; });
      $('#show-code').addEventListener('change', e => { $('#card-code').style.visibility = e.target.checked ? 'visible' : 'hidden'; });
    }

    if (page === 'settings') {
      const cur = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      $('#theme-seg').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.value === cur)));
      $('#theme-seg').addEventListener('change', e => window.W2QR.setTheme(e.detail));
      $('#settings-tabs').addEventListener('change', e => { $('#tab-general').hidden = e.detail !== 'general'; $('#tab-networks').hidden = e.detail !== 'networks'; });
    }
  });
})();
