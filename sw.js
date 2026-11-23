// Network-first for code + documents (HTML/JS/CSS/PDF) so updates — like a
// new resume — reach returning visitors immediately; cache is the offline
// fallback. Cache-first for heavy static media (images, fonts, video).
const CACHE_VERSION = 'mn-portfolio-v11';
const ALWAYS_FRESH = ['.html', '.js', '.css', '.pdf', '.json'];
const STATIC_SHELL = [
  './styles.css',
  './resume.pdf',
  './avatar.png',
  './og-image.png',
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

// Only cache complete, successful responses (no 404s, no 206 partials)
function cachePut(req, res) {
  if (!res || res.status !== 200 || res.type !== 'basic') return;
  const copy = res.clone();
  caches.open(CACHE_VERSION).then((c) => c.put(req, copy)).catch(() => {});
}

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  // Let the browser handle media range requests (video seeking) natively
  if (e.request.headers.has('range')) return;

  const url = new URL(e.request.url);
  const alwaysFresh = ALWAYS_FRESH.some((ext) => url.pathname.endsWith(ext)) || url.pathname.endsWith('/');

  if (alwaysFresh) {
    e.respondWith(
      fetch(e.request)
        .then((res) => { cachePut(e.request, res); return res; })
        .catch(() => caches.match(e.request))
    );
  } else {
    e.respondWith(
      caches.match(e.request).then((cached) =>
        cached || fetch(e.request).then((res) => { cachePut(e.request, res); return res; })
      )
    );
  }
});
