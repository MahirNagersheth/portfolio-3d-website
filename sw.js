// Simple offline-first service worker.
// Caches the shell on install and serves cache-first for fast reloads,
// falling back to network. Bump CACHE_VERSION when assets change.
const CACHE_VERSION = 'mn-portfolio-v2';
const SHELL = [
  './',
  './index.html',
  './styles.css',
  './main.js',
  './resume.pdf',
  './avatar.png',
  './og-image.svg',
  './icon-192.svg',
  './icon-512.svg',
  './manifest.json',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  // Only handle same-origin GETs — leave the GitHub API + CDN alone.
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    caches.match(e.request).then((cached) =>
      cached ||
      fetch(e.request).then((res) => {
        // Populate cache lazily for new same-origin requests
        const copy = res.clone();
        caches.open(CACHE_VERSION).then((c) => c.put(e.request, copy)).catch(() => {});
        return res;
      }).catch(() => cached)
    )
  );
});
