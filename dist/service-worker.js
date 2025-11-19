// Service Worker - Offline caching & performance
// Version: 1.0.0
// Usage: Registered in main HTML files

const CACHE_NAME = 'gate7-v1';
const CACHE_VERSION = 'v1';

// Critical assets to cache on install
const urlsToCache = [
    '/',
    '/index.html',
    '/menu/',
    '/menu/index.html',
    '/music/spotify.html',
    '/hiring/',
    '/hiring/index.html',
    '/css/style-global.css',
    '/css/style-footer.css',
    '/css/style-index.css',
    '/css/style-menu.css',
    '/css/style-music.css',
    '/js/language-switcher.js',
    '/js/scroll-animations.js',
    '/images/logo-color-black-bg1.png',
    '/images/logo-only-white.png'
];

// Install event - Pre-cache critical assets
self.addEventListener('install', event => {
    console.log('[Service Worker] Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('[Service Worker] Caching app shell');
            return cache.addAll(urlsToCache);
        }).catch(error => {
            console.error('[Service Worker] Cache failed:', error);
        })
    );
    
    // Force the new service worker to activate
    self.skipWaiting();
});

// Activate event - Clean up old caches
self.addEventListener('activate', event => {
    console.log('[Service Worker] Activating...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    
    // Take control of clients immediately
    self.clients.claim();
});

// Fetch event - Network first, fallback to cache
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip external requests
    if (url.origin !== location.origin) {
        return;
    }
    
    // Cache first for images
    if (request.destination === 'image') {
        event.respondWith(
            caches.match(request).then(response => {
                return response || fetch(request).then(response => {
                    // Cache successful image responses
                    if (response && response.status === 200) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(request, responseClone);
                        });
                    }
                    return response;
                }).catch(() => {
                    // Return offline fallback
                    return new Response('Image offline', {
                        status: 503,
                        statusText: 'Service Unavailable'
                    });
                });
            })
        );
        return;
    }
    
    // Network first for HTML/CSS/JS
    event.respondWith(
        fetch(request)
            .then(response => {
                // Cache successful responses
                if (response && response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(request, responseClone);
                    });
                }
                return response;
            })
            .catch(() => {
                // Fallback to cached version
                return caches.match(request).then(response => {
                    if (response) {
                        return response;
                    }
                    
                    // Return offline page for HTML requests
                    if (request.destination === 'document') {
                        return caches.match('/index.html');
                    }
                    
                    // Return offline fallback for others
                    return new Response('Offline - content unavailable', {
                        status: 503,
                        statusText: 'Service Unavailable'
                    });
                });
            })
    );
});

// Message handling for cache updates
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
