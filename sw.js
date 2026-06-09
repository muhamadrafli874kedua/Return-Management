const CACHE_NAME = 'return-management-v1';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// Tahap Instalasi & Menyimpan Cache
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    }).then(() => self.skipWaiting())
  );
});

// Tahap Aktivasi
self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

// Tahap Fetching (Syarat Mutlak Chrome)
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
