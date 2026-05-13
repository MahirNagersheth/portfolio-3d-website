// Network-first for HTML/JS (always get the latest code).
// Cache-first for everything else (fonts, images, PDFs).
const CACHE_VERSION = 'mn-portfolio-v6';
const ALWAYS_FRESH = ['.html', '.js'];
const STATIC_SHELL = [
  './styles.css',
  './resume.pdf',
  './avatar.png',
  './og-image.svg',
  './icon-192.svg',
  './icon-512.svg',
  './manifest.json',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_VERSION).then((c) => c.addAll(STATIC_SHELL)).then(() => self.skipWaiting())
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
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;

  const url = new URL(e.request.url);
  const alwaysFresh = ALWAYS_FRESH.some((ext) => url.pathname.endsWith(ext)) || url.pathname === '/';

  if (alwaysFresh) {
    // Network-first: try network, fall back to cache if offline
    e.respondWith(
      fetch(e.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_VERSION).then((c) => c.put(e.request, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match(e.request))
    );
  } else {
    // Cache-first: serve from cache, populate lazily on miss
    e.respondWith(
      caches.match(e.request).then((cached) =>
        cached ||
        fetch(e.request).then((res) => {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(e.request, copy)).catch(() => {});
          return res;
        })
      )
    );
  }
});
