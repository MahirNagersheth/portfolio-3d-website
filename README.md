# Mahir Nagersheth — 3D Portfolio

![Three.js](https://img.shields.io/badge/Three.js-r169-black?logo=three.js)
![Vanilla JS](https://img.shields.io/badge/Vanilla-JS%2FCSS%2FHTML-f7df1e?logo=javascript&logoColor=black)
![No Build Step](https://img.shields.io/badge/Build-None-brightgreen)
![PWA](https://img.shields.io/badge/PWA-Installable-5a0fc8?logo=pwa)
![License](https://img.shields.io/badge/License-MIT-blue)

A scroll-driven **3D personal portfolio** built with pure Three.js — no bundler, no framework, no dependencies to install. Open the folder and serve it.

> **Live:** [mahirnagersheth.com](https://mahirnagersheth.com) <!-- update when deployed -->

---

## Preview

| Hero — 3D icosahedron + starfield | Section tinting + scroll dolly |
|---|---|
| *(screenshot)* | *(screenshot)* |

---

## Features

- **Persistent Three.js canvas** behind every section — icosahedron centerpiece, orbit rings, animated starfield
- **Scroll-driven camera** — smooth dolly + per-section accent color tinting
- **Mouse parallax** — subtle camera drift following cursor movement
- **Loading screen** — mini animated solar system while assets warm up
- **PWA-ready** — installable on phones & desktops, custom manifest + service worker
- **Dark / Light mode** — `prefers-color-scheme` + manual toggle with bokeh layer in light mode
- **Mobile-first** — fully responsive down to 360 px, hamburger nav
- **Reveal-on-scroll** — `IntersectionObserver` entrance animations
- **Animated counters** — non-profit impact dashboard numbers
- **Reduced-motion support** — respects `prefers-reduced-motion`

### Sections

| Section | What's inside |
|---|---|
| Hero | Name, tagline, CTA buttons, animated 3D centerpiece |
| Work | Goldman Sachs Risk Division card + role timeline |
| Education | CMU MISM with tartan badge, coursework, GPA |
| Projects | Grid from resume; GitHub + demo link slots |
| Piano | Three YouTube embed slots for performances |
| Ventures | Entrepreneurship timeline |
| Non-Profit | TIDE Foundation impact dashboard |
| Friends & Family | Live asteroid belt — visitors add themselves via Firebase |
| Contact | Email, LinkedIn, phone, GitHub cards |

---

## Tech Stack

| Layer | Technology |
|---|---|
| 3D rendering | [Three.js r169](https://threejs.org/) via CDN import-map |
| Typography | [Inter](https://fonts.google.com/specimen/Inter) + [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (Google Fonts) |
| Icons | SVG — no icon library |
| Analytics | None (Plausible/Umami placeholders commented in HTML) |
| Build | **None** — pure ES modules + import-map |

---

## Getting Started

Because the site uses ES modules and an `importmap`, you must serve it over HTTP — opening `index.html` directly via `file://` will fail in most browsers.

### Option 1 — Python (zero install)
```bash
python3 -m http.server 5173
# open http://localhost:5173
```

### Option 2 — Node
```bash
npx serve .
# or: npx http-server . -p 5173
```

### Option 3 — VS Code
Install the **Live Server** extension → click **Go Live** in the status bar.

---

## Deployment

This is a **100% static site** — no server, no build step.

| Host | How |
|---|---|
| **GitHub Pages** | Push to `main`, enable Pages on root `/` |
| **Netlify** | Drag & drop the folder onto netlify.com |
| **Vercel** | `npx vercel` from this folder |
| **Cloudflare Pages** | Connect repo, leave build command empty |

---

## File Structure

```
portfolio-3d-website/
├── index.html          # All sections + content (single page)
├── styles.css          # Theme variables, layout, animations
├── main.js             # Three.js scene, scroll logic, UI interactions
├── config.js           # !! NOT committed — API keys (see below)
├── sw.js               # Service worker (PWA offline cache)
├── manifest.json       # PWA manifest
├── avatar.png          # Headshot used in Contact section
├── icon-192.svg        # PWA icon (small)
├── icon-512.svg        # PWA icon (large)
├── og-image.svg        # Open Graph / Twitter card preview image
├── resume.pdf          # Linked from the site
└── *.pdf               # Research papers linked from Projects section
```

---

## Customization

### Theme colors
All colors are CSS variables at the top of `styles.css`:

```css
--cmu:     #c41e3a;   /* CMU tartan red */
--goldman: #d6b25e;   /* Goldman gold */
--bg:      #07080d;   /* Dark background */
```

### 3D accent colors per section
Edit `SECTION_COLORS` near the top of `main.js`:

```js
const SECTION_COLORS = {
  hero:        new THREE.Color(0x6e8efb),
  work:        new THREE.Color(0xd6b25e),
  education:   new THREE.Color(0xc41e3a),
  // …
};
```

### Content placeholders to fill in

Search `index.html` for these markers:

| Marker | Location | What to add |
|---|---|---|
| `dQw4w9WgXcQ` | Piano iframes | Your actual YouTube video IDs |
| `Performance Title — Composer` | Piano section | Real performance titles |
| `Story 01 · Placeholder` | Ventures section | Your entrepreneurship stories |
| `href="#"` on `#github-link` | Contact section | Your GitHub profile URL |

---

## Friends & Family — Live Asteroid Belt (Planet 9)

Visitors who reach the Friends & Family section can add themselves as a named asteroid. New asteroids appear **live for every viewer** via Firebase Realtime Database. The feature falls back to `localStorage` gracefully if Firebase is not configured.

### Setting up Firebase

1. Go to [console.firebase.google.com](https://console.firebase.google.com) and create a project.
2. Enable **Realtime Database** (Start in test mode or set rules — see below).
3. Copy your project's web config (Project Settings → Your apps → SDK setup).
4. Create `config.js` in the project root (this file is gitignored):

```js
// config.js  — never commit this file
window.CLAUDE_API_KEY  = 'sk-ant-...';   // optional: powers the "Ask Mahir" widget
window.FIREBASE_CONFIG = {
  apiKey:            'AIza...',
  authDomain:        'your-project.firebaseapp.com',
  databaseURL:       'https://your-project-default-rtdb.firebaseio.com',
  projectId:         'your-project',
  storageBucket:     'your-project.appspot.com',
  messagingSenderId: '...',
  appId:             '...',
};
```

5. Add `<script src="./config.js"></script>` to the `<head>` of `index.html` **before** the closing `</head>` tag (it's already there as a placeholder).

### Recommended Realtime Database rules

```json
{
  "rules": {
    "portfolio-friends-v1": {
      "asteroids": {
        ".read": true,
        ".write": true,
        "$asteroid": {
          ".validate": "newData.hasChildren(['name','emoji','msg','ts','seed','angle','orbitR','color'])"
        }
      }
    }
  }
}
```

> Without `config.js`, the feature still works — additions are saved to `localStorage` and visible only on that device.

---

## Roadmap

- [ ] Replace YouTube placeholder IDs with real performances
- [ ] Add GitHub + live-demo links to project cards
- [ ] Fill in Ventures / Entrepreneurship stories
- [ ] Hook up a contact form (Formspree / Web3Forms)
- [ ] Add a custom domain to GitHub Pages

---

## License

MIT — feel free to fork and adapt for your own portfolio.

---

*Built by [Mahir Nagersheth](https://github.com/MahirNagersheth) · CMU MISM · Incoming Goldman Sachs Engineering Summer Analyst*
