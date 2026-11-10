/* W2QR — shared UI: header, footer, Master Key, theme, small controls.
   Pages declare <body data-section="home|restore|tools|settings|help">
   and include <div id="site-header"></div> / <div id="site-footer"></div>. */

const ICONS = {
  logo: '<svg class="logo-mark" viewBox="0 0 28 28" aria-hidden="true"><rect x="2" y="2" width="11" height="11" rx="3" fill="#ff8a7a"/><rect x="15" y="2" width="11" height="11" rx="3" fill="#ffc861"/><rect x="2" y="15" width="11" height="11" rx="3" fill="#5ee2a0"/><rect x="15" y="15" width="11" height="11" rx="3" fill="#8f7bff"/><rect x="5.5" y="5.5" width="4" height="4" rx="1" fill="#fff"/><rect x="18.5" y="5.5" width="4" height="4" rx="1" fill="#fff"/><rect x="5.5" y="18.5" width="4" height="4" rx="1" fill="#fff"/><rect x="18.5" y="18.5" width="4" height="4" rx="1" fill="#fff"/></svg>',
  folder: '<path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l8-8M16 7l2 2M14 9l2 2"/>',
  wrench: '<path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 005.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 015 0c0 1.7-2.5 2-2.5 3.5M12 17h.01"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  phone: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>',
  upload: '<path d="M12 16V4M7 9l5-5 5 5M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3"/>',
  drive: '<path d="M8 4h8l6 10-4 6H6l-4-6z"/><path d="M8 4l6 10M16 4l-6 10M2 14h20"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  doc: '<path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  rotate: '<path d="M20 12a8 8 0 01-14.3 4.9M4 12A8 8 0 0118.3 7.1"/><path d="M18 3v4.5h-4.5M6 21v-4.5h4.5"/>',
  card: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',
  shieldcheck: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
  shieldwarn: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M12 8v5M12 16h.01"/>',
  cloud: '<path d="M7 18a4 4 0 01-.5-8 6 6 0 0111.5 1.5A3.5 3.5 0 0117.5 18z"/><path d="M12 15v-4M10 13l2-2 2 2"/>',
  terminal: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M12 15h5"/>',
  search: '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',
  filesearch: '<path d="M6 3h8l5 5v13H6z"/><circle cx="11.5" cy="14" r="2.5"/><path d="M13.5 16l2 2"/>',
  bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0012 3z"/>',
  book: '<path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z"/><path d="M4 19a2 2 0 012-2h13v4H6a2 2 0 01-2-2z"/>',
  qr: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h2v2h-2zM18 18h2v2h-2zM18 14h2M14 18v2"/>',
  twoqr: '<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/><path d="M13 7h4v4M11 17H7v-4"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>',
  pwd: '<path d="M2.5 12a4 4 0 014-4h11a4 4 0 010 8h-11a4 4 0 01-4-4z"/><path d="M7 12h.01M11 12h.01M15 12h.01"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/>',
  eye: '<path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  paste: '<rect x="8" y="3" width="8" height="4" rx="1"/><path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>',
  moon: '<path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  check: '<path d="M5 12.5l4 4 10-10"/>',
  download: '<path d="M12 4v12M7 11l5 5 5-5M4 20h16"/>',
  print: '<path d="M7 9V4h10v5M7 17H5a1 1 0 01-1-1v-5a2 2 0 012-2h12a2 2 0 012 2v5a1 1 0 01-1 1h-2"/><rect x="7" y="14" width="10" height="6"/>',
  dice: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 9h.01M15 15h.01M15 9h.01M9 15h.01M12 12h.01"/>'
};

function icon(name, cls = '') {
  if (name === 'logo') return ICONS.logo;
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
}
window.W2QR = { icon };

/* ---------- Theme (stored on this device only, like the real Settings) ---------- */
(function applyTheme() {
  let t = 'dark';
  try { t = localStorage.getItem('w2qr-theme') || 'dark'; } catch (e) {}
  if (t === 'light') document.documentElement.setAttribute('data-theme', 'light');
})();
function setTheme(t) {
  if (t === 'light') document.documentElement.setAttribute('data-theme', 'light');
  else document.documentElement.removeAttribute('data-theme');
  try { localStorage.setItem('w2qr-theme', t); } catch (e) {}
}
window.W2QR.setTheme = setTheme;

/* ---------- Header / footer ---------- */
function renderChrome() {
  const section = document.body.dataset.section || '';
  const nav = [
    ['restore', 'restore.html', 'folder', 'Open Wallet'],
    ['tools', 'tools.html', 'wrench', 'Tools'],
    ['settings', 'settings.html', 'gear', 'Settings'],
    ['help', 'help.html', 'help', 'Help']
  ];
  const h = document.getElementById('site-header');
  if (h) {
    h.outerHTML = `
      <header class="site-header">
        <a class="logo-pill" href="index.html" aria-label="W2QR home">${icon('logo')}<span>W2QR</span></a>
        <nav class="nav-icons" aria-label="Main">
          ${nav.map(([key, href, ic, title]) => `
            <a class="nav-icon" href="${href}" title="${title}" aria-label="${title}" ${section === key ? 'aria-current="page"' : ''}>
              ${icon(ic)}<span class="tip">${title}</span>
            </a>`).join('')}
        </nav>
      </header>`;
  }
  const f = document.getElementById('site-footer');
  if (f) {
    f.outerHTML = `
      <footer class="site-footer">
        <nav aria-label="Footer">
          <a href="help.html">About</a>
          <a href="https://www.w2qr.com/terms">Terms</a>
          <a href="https://www.w2qr.com/privacy">Privacy</a>
          <a href="mailto:bin@norionsoft.com">Contact Us</a>
        </nav>
        <span>© 2026 Norionsoft OÜ. All rights reserved.</span>
      </footer>`;
  }
  // Master Key FAB + modal (every page)
  document.body.insertAdjacentHTML('beforeend', `
    <button class="fab" id="mk-open" title="Master Key (Ctrl+0)" aria-label="Master Key (Ctrl+0)">${icon('key')}</button>
    <div class="modal" id="mk-modal" role="dialog" aria-modal="true" aria-labelledby="mk-title">
      <div class="modal__card">
        <div class="modal__head"><h3 id="mk-title">Master Key</h3><button class="icon-btn" data-close aria-label="Close">${icon('close')}</button></div>
        <p class="helper" style="margin:0 0 20px">Stored locally. Click → main, Shift+click → Shift, Ctrl+click → Ctrl.</p>
        <div class="field"><label class="label" for="mk-1">Click</label>
          <input class="input" id="mk-1" type="password" placeholder="Main password">
          <button class="ghost-btn" type="button">${icon('qr')}or use Password QR</button></div>
        <div class="field"><label class="label" for="mk-2">Shift + Click</label>
          <input class="input" id="mk-2" type="password" placeholder="Shift password (optional)">
          <button class="ghost-btn" type="button">${icon('qr')}or use Password QR</button></div>
        <div class="field"><label class="label" for="mk-3">Ctrl + Click</label>
          <input class="input" id="mk-3" type="password" placeholder="Ctrl password (optional)">
          <button class="ghost-btn" type="button">${icon('qr')}or use Password QR</button></div>
        <div class="actions" style="justify-content:flex-end">
          <button class="btn btn--glass btn--sm" type="button" data-clear>Clear</button>
          <button class="btn btn--white btn--sm" type="button" data-close>Save</button>
        </div>
      </div>
    </div>`);
  const modal = document.getElementById('mk-modal');
  const open = () => { modal.classList.add('is-open'); document.getElementById('mk-1').focus(); };
  const close = () => modal.classList.remove('is-open');
  document.getElementById('mk-open').addEventListener('click', open);
  modal.addEventListener('click', (e) => { if (e.target === modal || e.target.closest('[data-close]')) close(); });
  modal.querySelector('[data-clear]').addEventListener('click', () => modal.querySelectorAll('input').forEach(i => (i.value = '')));
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === '0') { e.preventDefault(); open(); }
    if (e.key === 'Escape') close();
  });
}

/* ---------- Small shared controls ---------- */
function wireControls(root = document) {
  // inject icons: <i data-icon="name"></i>
  root.querySelectorAll('[data-icon]').forEach(el => { el.outerHTML = icon(el.dataset.icon, el.className); });
  // segmented buttons
  root.querySelectorAll('.seg').forEach(seg => seg.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b || !seg.contains(b)) return;
    seg.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    seg.dispatchEvent(new CustomEvent('change', { detail: b.dataset.value || b.textContent.trim() }));
  }));
  // switches
  root.querySelectorAll('.switch').forEach(s => s.addEventListener('click', () => s.setAttribute('aria-checked', String(s.getAttribute('aria-checked') !== 'true'))));
  // show/hide password
  root.querySelectorAll('[data-toggle-visibility]').forEach(b => b.addEventListener('click', () => {
    const input = document.getElementById(b.dataset.toggleVisibility);
    const show = input.type === 'password'; input.type = show ? 'text' : 'password'; b.textContent = show ? 'Hide' : 'Show';
  }));
  // paste from clipboard
  root.querySelectorAll('[data-paste]').forEach(b => b.addEventListener('click', async () => {
    try { const t = await navigator.clipboard.readText(); document.getElementById(b.dataset.paste).value = t; } catch (e) {}
  }));
}

document.addEventListener('DOMContentLoaded', () => { renderChrome(); wireControls(); });
