# W2QR — Dusk-style UI (static prototype)

Redesign of [w2qr.com](https://www.w2qr.com/) in the "Dusk" visual style: night sky with stars, an arch glow, the Geist typeface, glass cards and white pill buttons.

- **Text:** all visible copy follows the live site word for word (checked November 2026).
- **Structure:** the app follows the live site: a single-screen home page plus the four navigation sections.

This is a **design prototype** in plain HTML, CSS and JS. There is no build step and no dependencies. Nothing is encrypted, uploaded or sent anywhere.

## Run / publish

- **Locally:** open `index.html` in a browser, or run `npx serve .`
- **GitHub Pages:** push this folder to a repo, then go to Settings → Pages → *Deploy from branch* → `/ (root)`. All files sit in the repo root.

## Pages

| Nav | File | Live original |
|---|---|---|
| Home (one screen, animated hero) | `index.html` | `/` |
| 📁 Open Wallet | `restore.html` | `/restore` |
| ↳ Scan with Camera | `restore-camera.html` | camera view |
| ↳ Scan with Mobile | `restore-bridge.html` | `/restore/bridge` |
| ↳ Upload File | `restore-upload.html` | `/restore/upload` |
| ↳ Restore from Google Drive | `restore-drive.html` | `/restore/drive` |
| ↳ Create New | `create.html` | `/create` (3 steps) |
| ↳ Import Seed Phrase | `restore-import.html` | inline panel on `/restore` |
| 🔧 Tools | `tools.html` | `/tools` |
| ↳ QR Rotation | `rotation.html` | `/wallet/rotation` |
| ↳ Plastic Card | `card.html` | `/card` |
| ↳ Strong Password | `strong-password.html` | `/wallet/strong-password` |
| ↳ Check Password | `check-password.html` | `/check-password` |
| ↳ Cloud Backup | `cloud-backup.html` | `/cloud-backup` |
| ↳ BIP39 Simulator | `accounts.html` | `/wallet/accounts` |
| ↳ Find my Assets | `scanner.html` | `/wallet/scanner` |
| ↳ Restore my Mnemonic | `recover-mnemonic.html` | `/wallet/recover-mnemonic` |
| ⚙️ Settings (General / Networks & Assets) | `settings.html` | `/settings` |
| ❔ Help | `help.html` | `/help`; its cards link to the live docs |

On every page there is a **Master Key** button in the bottom-right corner. It also opens with `Ctrl+0`.

## Home hero animation

`hero.js` contains the four flows from the live site's tabs. The text comes from the site's animation files `w2qr-anim-1…4`.

| Tab | Flow | CTA |
|---|---|---|
| QR + password | Open wallet | Open Wallet |
| Two QRs | Open wallet | Open Wallet |
| Seed QR | Create | Create Encrypted Wallet |
| Strong password | Create | Strong Password Generator |

How the animation behaves:

- **Playback:** each flow has 4 steps. A step lasts 2.8 s, and the hero loops on its own.
- **Phone:** the screen changes with every step.
- **Centre visual:** each flow has its own: the encrypted QR, the two QRs, seed → QR, or phrase → password → QR.
- **Controls:**
  - Clicking a step jumps to it.
  - Hovering over the stage pauses the animation.
  - Arrow keys switch tabs.
  - `?how=open-password | open-two-qrs | create-seed | create-password` opens a specific flow.
- **Reduced motion:** with `prefers-reduced-motion`, the hero stops on the last step and does not auto-play.
- **Fit:** the layout scales to the viewport height, so on desktop the home page fits one screen without scrolling. On narrow and short screens it falls back to normal scrolling.

## Theme

**Settings → Appearance → Dark / Light** switches between the night and day palettes. The choice is stored in `localStorage`, on this device only, just like on the real site. All colours are CSS variables in `styles.css`.

## Notes for developers

- **The QR codes are decorative patterns, not real QR codes.**
- **Sample values come from the site's own animations:**
  - "Generate Random" fills the sample words: robot diary tumble …
  - the strong password output: `pO#$nC-1?!4EakoKm5b!OAYG`
  - the attack-resistance figures
- **Copy written for the prototype:** a few states had no copy I could capture from the live site, so I wrote short text for them:
  - the camera view;
  - the Drive connect state;
  - the Create step 3 result, which reuses copy from the animation.

  Each is visually consistent with the live site, but please replace it with the real copy.
- **Structure:**
  - Header and footer are injected by `app.js`.
  - Each page sets `data-section` to highlight the active nav icon.
  - Page-specific behaviour lives in `pages.js`.

```
index.html, restore*.html, create.html, tools pages, settings.html, help.html
styles.css   tokens, header, buttons, cards, forms, footer, Master Key
home.css     single-screen hero + phone mock
pages.css    inner-page components (wizard, card designer, settings…)
app.js        icons, header/footer, theme, Master Key, shared controls
hero.js       animated hero (4 flows × 4 steps)
pages.js      page interactions
```

© 2026 Norionsoft OÜ — design prototype.
