const CACHE_NAME = 'movie-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/favorites.html',
  '/css/styles.css',
  '/js/app.js',
  // Agrega aquí otros recursos estáticos que deseas cachear
];

self.addEventListener('install', (event) => {
  // Realiza la instalación del Service Worker
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  // Intercepta las solicitudes de red y responde con los recursos cacheados si están disponibles
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Devuelve el recurso caché si está disponible; de lo contrario, realiza la solicitud de red
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  // Elimina las cachés antiguas cuando se activa un nuevo Service Worker
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando cache antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

