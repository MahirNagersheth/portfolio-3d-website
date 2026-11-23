# Mahir Nagersheth — 3D Portfolio

![Three.js](https://img.shields.io/badge/Three.js-r160-black?logo=three.js)
![Vanilla JS](https://img.shields.io/badge/Vanilla-JS%2FCSS%2FHTML-f7df1e?logo=javascript&logoColor=black)
![No Build Step](https://img.shields.io/badge/Build-None-brightgreen)
![PWA](https://img.shields.io/badge/PWA-Installable-5a0fc8?logo=pwa)

A personal portfolio set inside a live 3D solar system. Each section is a planet, its sub-sections are moons, and the camera flies between them as you scroll. Plain HTML, CSS and JavaScript — no bundler, no framework, nothing to install.

**Live:** https://mahirnagersheth.github.io/portfolio-3d-website/

---

## Features

**The system**
- Procedurally textured planets, orbiting moons, rings, starfield and a pulsing sun (Three.js)
- Scroll-driven camera: hero dolly into the system, then a per-section planet tour
- Planet labels that hide behind the sun and fade once you leave the hero
- Comet flight paths when jumping between planets
- Day / night / focus (no-3D) themes, ambient orchestral audio, keyboard shortcuts (`?`)
- JARVIS mode — explore the system with hand gestures via the webcam (MediaPipe)

**For recruiters**
- **Mission briefing** (`B`, or the hero button) — one-screen summary: role, availability, work authorization, top wins, resume
- **Mission logs** — case studies behind each role and project (mission → flight plan → telemetry → instruments)
- **Flight recorder** — the career path as a timeline that flies the camera stop by stop
- **Constellation** — skills as stars, linked when used together; hovering lights up matching work and planets
- **Ask Mahir** — LLM assistant grounded in the portfolio facts, with memory, streaming replies and starter questions
- `⌘K` search palette, deep links (`#projects/web-apps`), installable PWA

**Friends & Family**
- Visitors add themselves as an asteroid; it streaks in as a comet
- Entries are moderated: they go to a pending queue and appear for everyone once approved on `moderate.html`

**Performance & accessibility**
- Planet textures painted in a Web Worker (OffscreenCanvas) so startup doesn't block
- Lighter geometry, fewer stars and lower pixel ratio on phones and low-memory devices
- **Lite mode** for `prefers-reduced-motion` / data-saver: no ambient motion, camera cuts, frames rendered only on change
- Falls back to the no-3D layout if WebGL is unavailable
- Dialogs move focus in, trap Tab, and restore focus on close; carousel pauses on hover/focus

---

## Run locally

ES modules aren't used, but the service worker and fetches need HTTP:

```bash
python3 -m http.server 5173     # then open http://localhost:5173
```

Or double-click `Preview.command` (macOS).

## Deploy

Static site — GitHub Pages serves `main` from the repo root. Bump `CACHE_VERSION` in `sw.js` when shipping changes to cached assets, and change the `?v=` tag on the resume link in `index.html` when replacing `resume.pdf`.

---

## Files

```
index.html            All sections, dialogs and config (Firebase, Ask proxy, analytics)
styles.css            Theme tokens, layout, animations, day/focus themes
main.js               3D scene, camera, navigation, audio, Ask Mahir, guestbook, gestures
features.js           Mission briefing, mission logs, constellation, flight recorder, a11y, analytics
worker.js             Cloudflare Worker: Groq chat proxy + Spotify now-playing
moderate.html         Guestbook moderation console (owner sign-in)
database.rules.json   Firebase Realtime Database rules
sw.js / manifest.json PWA
og-image.png/.svg     Link-preview card (PNG is what crawlers use)
resume.pdf, *.pdf     Resume and papers linked from the site
```

---

## Services

### Ask Mahir — Cloudflare Worker (`worker.js`)
- Secret: `GROQ_API_KEY`. Optional variable: `CHAT_MODEL` to pin a Groq model.
- The Worker only accepts requests from the live site and localhost, forces a small model with a capped token budget, validates message counts/lengths, and streams responses. If Groq retires a model it falls back to the next one in `CHAT_MODELS`.
- Deploy with `wrangler deploy` or paste into the Cloudflare dashboard.

### Spotify now-playing (same Worker)
Secrets `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`. Open `/spotify/callback` once after authorizing to obtain the refresh token.

### Friends & Family — Firebase Realtime Database
1. Publish [`database.rules.json`](database.rules.json) (Firebase console → Realtime Database → Rules).
   - `pending/` — visitors can add new entries (validated), only the owner can read/approve.
   - `asteroids/` — public read, owner-only write.
   - The owner is identified by the email in the rules — change it there if you sign in with a different Google account.
2. Enable **Google** sign-in (Authentication → Sign-in method) and add `mahirnagersheth.github.io` under Authentication → Settings → Authorized domains.
3. Moderate at `/moderate.html` — approve moves an entry from `pending/` to `asteroids/`.

### Analytics (optional)
Create a free site at [goatcounter.com](https://www.goatcounter.com) and set `window.GOATCOUNTER_CODE` in `index.html`. Page views plus events (resume download, email, LinkedIn, mission logs, briefing, Ask questions) are counted without cookies.

---

## License

MIT — feel free to fork and adapt for your own portfolio.

---

*Built by [Mahir Nagersheth](https://github.com/MahirNagersheth) · CMU MISM '26 · Goldman Sachs Risk Engineering Summer Analyst '26*
